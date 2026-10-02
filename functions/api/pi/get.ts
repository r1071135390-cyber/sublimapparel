// functions/api/pi/get.ts
// Fetches a Proforma Invoice by id or pi_number from Supabase.
//
// 2026-10-02 (R78): live PI card payment — when a customer opens a PI that
// is still in "sent" status and Stripe has not yet been minted a
// PaymentIntent for it, this endpoint now creates one (via the REST helper
// in lib/stripe.ts), persists `stripe_client_secret` back onto the
// proforma_invoices row, and returns it so the /pay page can render Stripe
// Elements without a second round-trip.
//
// State machine:
//   PI status           | what get.ts does
//   ───────────────────────────────────────────────────────────────────
//   draft, canceled,     | return row verbatim; clientSecret = null
//   expired             | (front-end shows "Invoice Not Found" / expired UX)
//   paid                | return row verbatim; clientSecret = null
//   pending_bank        | return row verbatim; clientSecret = null
//   sent (no client_secret yet) | mint a PaymentIntent, PATCH the row,
//                               | clientSecret = new pi.client_secret
//   sent (client_secret set)   | return existing; clientSecret = existing
//
// We deliberately reuse an existing client_secret rather than rotating on
// every reload: a customer refreshing the page shouldn't trigger 20
// PaymentIntents. Cancellation of a stale PI is the customer's job (they
// can leave the page; the PI itself expires 24h after creation via the
// PI's valid_until date — Stripe will not charge after that since we
// never confirm it).

import { normalizeSupabaseUrl } from "../_utils";
import { createPaymentIntent } from "../../lib/stripe";

interface Env {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
  STRIPE_SECRET_KEY: string; // 2026-10-02 (R78)
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
}): Promise<Response> {
  const { request, env } = context;

  if (!env.COZE_SUPABASE_URL || !env.COZE_SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse(
      { error: "Supabase credentials not configured" },
      500,
    );
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const piNumber = url.searchParams.get("piNumber");

  if (!id && !piNumber) {
    return jsonResponse(
      { error: "Provide ?id=<id> or ?piNumber=<SA...>" },
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

  // 2026-10-02 (R78): only PIs in `sent` state need a fresh PaymentIntent.
  // Every other state has clientSecret = null on purpose — the front-end
  // already short-circuits on status (paid → success screen,
  // pending_bank → "we'll confirm within 1-2 business days", etc.).
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
        // Don't mint a PaymentIntent for a zero/under-minimum row — return
        // the row as-is and let the front-end show a friendly message.
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

        // Persist both back to the PI row so a refresh reuses them.
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
          // Log but don't fail the customer-facing response — Stripe still
          // has a valid PaymentIntent. Next request will mint a new one,
          // and Stripe Dashboard will show the orphan (finance reconciles
          // via payment_intent.metadata.pi_number).
          console.error(
            `[pi/get] PATCH proforma_invoices failed: ${patchRes.status} ${await patchRes.text()}`,
          );
        }
      }
    } catch (err: any) {
      console.error("[pi/get] Stripe PaymentIntent mint failed:", err);
      // Fall through: return row with clientSecret=null so the page renders
      // its "Initializing secure payment…" spinner rather than a 500. The
      // customer can refresh to retry.
    }
  }

  return jsonResponse({
    ...row,
    clientSecret,
    paymentIntentId,
    paymentUrl: null,
  });
}

// ── helpers ──────────────────────────────────────────────────────

/**
 * Pick the canonical "amount due" for a PI.
 *
 * Preference order:
 *   1. `amount_due_cents` — already denormalised by R78 migration
 *   2. `total_cents`      — the total the customer owes including shipping
 *   3. `subtotal_cents`   — last resort; deprecated once amount_due_cents
 *                           is backfilled everywhere
 *
 * Returns null when no plausible number is available.
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