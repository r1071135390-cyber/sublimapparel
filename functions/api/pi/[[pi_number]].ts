// functions/api/pi/[[pi_number]].ts
// Fetches a Proforma Invoice by path pi_number (or legacy query params).
//
// 2026-10-02 (R78): renamed from `get.ts` → `[pi_number].ts` → `[[pi_number]].ts`
// (catch-all). The double-bracket `[[pi_number]]` form is what Cloudflare
// Pages Functions actually supports for dynamic routing — single brackets
// are a Pages Router convention that crashed the connection here with no
// response body. Catch-all captures the entire remaining path, so we split
// on `/` and take the last segment as the PI.
//
// Live PI card payment flow:
//   - When a customer opens a PI in "sent" status with no Stripe
//     client_secret yet, this handler mints a PaymentIntent, persists
//     `stripe_client_secret` back to the row, and ships it with the response.
//   - When the row already has a client_secret, we reuse it (a page refresh
//     must not create 20 PaymentIntents).
//
// State machine:
//   PI status | what this handler does
//   ───────────────────────────────────────────────────────────────────
//   draft, canceled, expired   | return row verbatim; clientSecret = null
//   paid                       | return row verbatim; clientSecret = null
//   pending_bank               | return row verbatim; clientSecret = null
//   sent (no client_secret)    | mint a PaymentIntent, PATCH the row,
//                              | return row + new clientSecret
//   sent (client_secret set)   | return row + existing clientSecret

import { normalizeSupabaseUrl } from "../_utils";
import { createPaymentIntent } from "../../lib/stripe";

interface Env {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
  STRIPE_SECRET_KEY: string;
}

// 2026-10-01 (R77): whitelist mirrored from stripe/create-payment-intent.ts
// and stripe/webhook.ts. Any site_slug arriving in PI metadata that isn't
// on this list is coerced to DEFAULT_SITE_SLUG.
const ALLOWED_SITE_SLUGS: ReadonlySet<string> = new Set(["sublimapparel"]);
const DEFAULT_SITE_SLUG = "sublimapparel";
function resolveSiteSlug(input: unknown): string {
  if (typeof input !== "string" || input.length === 0) return DEFAULT_SITE_SLUG;
  return ALLOWED_SITE_SLUGS.has(input) ? input : DEFAULT_SITE_SLUG;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
  params?: Record<string, string | undefined>;
}): Promise<Response> {
  const { request, env, params } = context;

  if (!env.COZE_SUPABASE_URL || !env.COZE_SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse(
      { error: "Supabase credentials not configured" },
      500,
    );
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  // 2026-10-02 (R78): Cloudflare Pages Functions passes params.pi_number
  // as an ARRAY ["SA..."] for the catch-all [[pi_number]] route, NOT a
  // plain string. Normalise here — accept string | string[] | undefined.
  const paramRaw = params?.pi_number;
  const paramPi =
    typeof paramRaw === "string"
      ? paramRaw
      : Array.isArray(paramRaw)
        ? paramRaw[paramRaw.length - 1] ?? ""
        : "";
  // url.pathname fallback covers the edge where Cloudflare hasn't yet
  // populated params (some routing edge cases). Take the last non-empty
  // segment after /api/pi/.
  const pathSegments = url.pathname.replace(/\/+$/, "").split("/");
  const fallbackPathPi = pathSegments[pathSegments.length - 1] || "";
  const rawPathPi = paramPi || fallbackPathPi;
  const pathPi = rawPathPi.split("/").filter(Boolean).pop() ?? "";
  const piNumber = url.searchParams.get("piNumber") ?? (pathPi || undefined);

  if (!id && !piNumber) {
    return jsonResponse(
      {
        error: "Provide ?id=<id> or ?piNumber=<SA...> or path /api/pi/<pi_number>",
        debug: {
          request_url: request.url,
          pathname: url.pathname,
          params_keys: params ? Object.keys(params) : null,
          param_pi: paramPi,
          fallback_path_pi: fallbackPathPi,
          resolved_path_pi: pathPi,
        },
      },
      400,
    );
  }

  const filter = id
    ? `id=eq.${encodeURIComponent(id)}`
    : `pi_number=eq.${encodeURIComponent(piNumber!)}`;

  const supabaseUrl = normalizeSupabaseUrl(env.COZE_SUPABASE_URL);
  const res = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?${filter}&limit=1`,
    {
      headers: {
        apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
      },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    return jsonResponse({ error: "Supabase query failed", detail: text }, 500);
  }

  const rows = (await res.json()) as Array<Record<string, unknown>>;
  if (rows.length === 0) {
    return jsonResponse({ error: "Not found" }, 404);
  }

  const row = rows[0];
  const status = (row.status as string | null) ?? null;
  const existingClientSecret = (row.stripe_client_secret as string | null) ?? null;
  const existingPaymentIntentId =
    (row.stripe_payment_intent_id as string | null) ?? null;

  let clientSecret: string | null = existingClientSecret;
  let paymentIntentId: string | null = existingPaymentIntentId;

  if (
    status === "sent" &&
    !existingClientSecret &&
    env.STRIPE_SECRET_KEY
  ) {
    try {
      const amountCents = pickAmountCents(row);
      if (amountCents === null || amountCents < 100) {
        console.warn(
          `[pi/get] PI ${String(row.pi_number)} has no amount; skipping PaymentIntent mint`,
        );
      } else {
        const currency = ((row.currency as string) ?? "usd").toLowerCase();
        const site_slug = resolveSiteSlug(
          (row as any).payment_site ??
            ((row.metadata as Record<string, unknown> | null)?.site_slug ?? null),
        );

        const pi = await createPaymentIntent(env.STRIPE_SECRET_KEY, {
          amount: amountCents,
          currency,
          automatic_payment_methods: true,
          receipt_email: (row.customer_email as string | null) ?? undefined,
          description: buildDescription(row),
          metadata: {
            pi_id: String((row.id as string | number) ?? ""),
            pi_number: String((row.pi_number as string | null) ?? ""),
            scenario: "pi_payment",
            site_slug,
            customer_email:
              (row.customer_email as string | null) ?? "",
            customer_name:
              (row.customer_name as string | null) ?? "",
          },
        });

        clientSecret = pi.client_secret ?? null;
        paymentIntentId = pi.id;

        const patchRes = await fetch(
          `${supabaseUrl}/rest/v1/proforma_invoices?id=eq.${encodeURIComponent(String(row.id))}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
              Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
              Prefer: "return=minimal",
            },
            body: JSON.stringify({
              stripe_client_secret: clientSecret,
              stripe_payment_intent_id: paymentIntentId,
              amount_due_cents: amountCents,
              payment_site: site_slug,
            }),
          },
        );
        if (!patchRes.ok) {
          console.error(
            `[pi/get] PATCH proforma_invoices failed: ${patchRes.status} ${await patchRes.text()}`,
          );
        }
      }
    } catch (err: any) {
      console.error("[pi/get] Stripe PaymentIntent mint failed:", err);
      // Fall through: return row with clientSecret=null so the page renders
      // its "Initializing secure payment…" spinner rather than a 500.
    }
  }

  return jsonResponse({
    pi: {
      ...row,
      stripe_client_secret: clientSecret,
      stripe_payment_intent_id: paymentIntentId,
      paymentUrl: null,
    },
  });
}

// ── helpers ──────────────────────────────────────────────────────

/**
 * Pick the canonical "amount due" for a PI.
 * Preference order: amount_due_cents → total_cents → subtotal_cents.
 */
function pickAmountCents(row: Record<string, unknown>): number | null {
  const candidates = [
    row.amount_due_cents,
    row.total_cents,
    row.subtotal_cents,
  ];
  for (const candidate of candidates) {
    const n = typeof candidate === "number" ? candidate : Number(candidate);
    if (Number.isFinite(n) && n > 0) return Math.round(n);
  }
  return null;
}

function buildDescription(row: Record<string, unknown>): string {
  const company = (row.customer_company as string | null) ?? "";
  const piNum = (row.pi_number as string | null) ?? "";
  const parts: string[] = [];
  if (company) parts.push(company);
  if (piNum) parts.push(`PI ${piNum}`);
  parts.push("payment card payment");
  return parts.join(" — ");
}