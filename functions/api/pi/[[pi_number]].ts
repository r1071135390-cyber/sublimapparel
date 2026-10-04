// functions/api/pi/[[pi_number]].ts
// Fetches a Proforma Invoice by path pi_number (or legacy query params),
// and dispatches per-PI action POSTs to dedicated handlers.
//
// 2026-10-02 (R78): renamed from `get.ts` → `[pi_number].ts` → `[[pi_number]].ts`
// (catch-all). The double-bracket `[[pi_number]]` form is what Cloudflare
// Pages Functions actually supports for dynamic routing — single brackets
// are a Pages Router convention that crashed the connection here with no
// response body. Catch-all captures the entire remaining path, so we split
// on `/` and take the last segment as the PI.
//
// 2026-10-04 (R85): the catch-all previously intercepted POSTs to
// `/api/pi/{pi_number}/confirm-bank` and returned 405 (it only exported
// GET + OPTIONS). Two fixes are layered:
//   1. The dedicated handler now lives at
//      `functions/api/pi/[pi_number]/confirm-bank.ts` so a more specific
//      static-segment route wins under Cloudflare's normal precedence.
//   2. THIS file also re-exports onRequestPost so that if (1) is ever
//      bypassed — Cloudflare CDN edge cache, a stale deploy, anything —
//      POST still reaches the handler instead of falling through to a
//      405. The dispatch is based on the path's last segment, so
//      anything we add later (`/api/pi/{n}/<action>`) can hook in here.
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
import { handleConfirmBank } from "./_actions/confirm-bank";

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
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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
  // 2026-10-02 (R78): Cloudflare Pages Functions passes `params.pi_number`
  // as a string ARRAY `["SA..."]` (not a plain string) for catch-all
  // `[[pi_number]]` routes. The base Record<string,string> type CF gives
  // us lies about this — accept the union so TypeScript doesn't narrow
  // away the array branch.
  params?: Record<string, string | string[] | undefined>;
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
  // url.pathname is the ultimate fallback for the rare case neither
  // catches.
  const paramRaw = params?.pi_number;
  const paramPi =
    typeof paramRaw === "string"
      ? paramRaw
      : Array.isArray(paramRaw)
        ? paramRaw[paramRaw.length - 1] ?? ""
        : "";
  const pathSegments = url.pathname.replace(/\/+$/, "").split("/");
  const fallbackPathPi = pathSegments[pathSegments.length - 1] || "";
  const rawPathPi = paramPi || fallbackPathPi;
  const pathPi = rawPathPi.split("/").filter(Boolean).pop() ?? "";
  const piNumber = url.searchParams.get("piNumber") ?? (pathPi || undefined);

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
  // 2026-10-02 (R78): compute the canonical amount once so the response
  // and the PaymentIntent agree — and so the page header on the
  // /pay/[pi]/ route (which reads pi.amount_due_cents) shows the
  // correct figure even on the very first request, before any PATCH
  // has refreshed the row.
  let resolvedAmountCents = pickAmountCents(row);

  if (
    status === "sent" &&
    !existingClientSecret &&
    env.STRIPE_SECRET_KEY
  ) {
    try {
      const amountCents = resolvedAmountCents;
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

        // 2026-10-02 (R78): also INSERT a pending payments row so the
        // webhook's UPDATE on payment_intent.succeeded has something to
        // match against (where stripe_payment_intent_id = 'pi_...').
        // Without this, the webhook fires successfully but 0 rows are
        // updated — payments table stays empty and admin dashboards
        // showing "total payments this month" miss the row.
        const paymentsInsertRes = await fetch(
          `${supabaseUrl}/rest/v1/payments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
              Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
              Prefer: "return=minimal",
            },
            body: JSON.stringify({
              stripe_payment_intent_id: pi.id,
              scenario: "pi_payment",
              status: "pending",
              amount_cents: amountCents,
              currency,
              customer_name: (row.customer_name as string | null) ?? null,
              customer_email: (row.customer_email as string | null) ?? null,
              pi_id: String((row.id as string | number) ?? ""),
              metadata: {
                pi_number: String((row.pi_number as string | null) ?? ""),
                site_slug,
              },
              payment_site: site_slug,
            }),
          },
        );
        if (!paymentsInsertRes.ok && paymentsInsertRes.status !== 409) {
          console.error(
            `[pi/get] payments INSERT failed: ${paymentsInsertRes.status} ${await paymentsInsertRes.text()}`,
          );
        }

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
      // 2026-10-02 (R78): override with the canonical amount we just
      // resolved so the /pay/ page header (which reads
      // pi.amount_due_cents) shows the correct figure even on the
      // very first request, before the PATCH refreshes the row.
      amount_due_cents: resolvedAmountCents ?? row.amount_due_cents ?? 0,
      stripe_client_secret: clientSecret,
      stripe_payment_intent_id: paymentIntentId,
      paymentUrl: null,
    },
  });
}

// 2026-10-04 (R85): POST dispatch — covers actions like
//   /api/pi/{pi_number}/confirm-bank
// that would otherwise fall through to a 405 if Cloudflare's route
// precedence didn't pick the dedicated file. The dispatch key is the LAST
// path segment after the pi_number, so add new per-PI POSTs here too.
export async function onRequestPost(context: {
  request: Request;
  env: Env;
  params?: Record<string, string | string[] | undefined>;
}): Promise<Response> {
  const url = new URL(context.request.url);
  // pathname looks like /api/pi/<pi_number>/<action> (or with extra
  // segments in front for catch-all [[pi_number]]). Take the LAST
  // non-empty segment as the action name.
  const segments = url.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  const action = segments[segments.length - 1] ?? "";

  switch (action) {
    case "confirm-bank":
      return handleConfirmBank(context);
    default:
      return jsonResponse(
        { error: `Unknown PI action: ${action || "(none)"}` },
        405,
      );
  }
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
