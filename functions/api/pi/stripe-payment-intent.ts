/**
 * POST /api/pi/stripe-payment-intent
 *
 * Customer-facing card-payment flow that keeps the customer on the /pay/
 * page (R91). PayWithStripeElements.tsx posts here with a PI number; we
 * mint a Stripe PaymentIntent and return its client_secret so the React
 * side can mount <Elements> + <PaymentElement> in place. On submit the
 * client calls stripe.confirmPayment() with the same client_secret and a
 * return_url pointing back to /quote/?id=..., so the customer never leaves
 * sublimapparel.com.
 *
 * Body:
 *   { piNumber: string }
 *
 * Returns:
 *   { clientSecret, paymentIntentId, amount, currency }
 *   on missing input / unknown PI → 4xx with { error }
 *   on Stripe failure → 500 with { error }
 *
 * The webhook handler (/api/stripe/webhook) reads metadata.pi_id and
 * metadata.site_slug from payment_intent.succeeded events and marks the
 * PI as paid, so we always attach both keys.
 *
 * Routing precedence (Cloudflare Pages Functions):
 *   /api/pi/stripe-payment-intent       → THIS file (static segment wins)
 *   /api/pi/{anything}/confirm-bank     → [pi_number]/confirm-bank.ts
 *   /api/pi/{anything}/{anything}       → [[pi_number]].ts (catch-all)
 */

import { createPaymentIntent, type StripePaymentIntent } from "../../lib/stripe";
import { normalizeSupabaseUrl } from "../_utils";
import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  STRIPE_SECRET_KEY: string;
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

// Mirror the whitelist used by stripe-payment-link.ts / webhook.ts so the
// site_slug that lands in Stripe metadata is always one we recognise.
const ALLOWED_SITE_SLUGS: ReadonlySet<string> = new Set(["sublimapparel"]);
const DEFAULT_SITE_SLUG = "sublimapparel";
function resolveSiteSlug(input: unknown): string {
  if (typeof input !== "string" || input.length === 0) return DEFAULT_SITE_SLUG;
  return ALLOWED_SITE_SLUGS.has(input) ? input : DEFAULT_SITE_SLUG;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders });
}

interface RequestBody {
  piNumber?: string;
}

export const onRequestOptions = async () =>
  new Response(null, { status: 204, headers: corsHeaders });

export const onRequestPost = async (
  context: EventContext<Env, string, Record<string, unknown>>,
): Promise<Response> => {
  const { request, env } = context;

  if (!env.STRIPE_SECRET_KEY) {
    return json({ error: "Stripe is not configured on the server" }, 500);
  }
  if (!env.COZE_SUPABASE_URL || !env.COZE_SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: "Supabase credentials not configured" }, 500);
  }

  // 1. Parse body
  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }
  const piNumber = body.piNumber;
  if (!piNumber || typeof piNumber !== "string") {
    return json({ error: "piNumber is required" }, 400);
  }

  const supabaseUrl = normalizeSupabaseUrl(env.COZE_SUPABASE_URL);

  // 2. Look up PI — same shape as stripe-payment-link.ts
  const lookupRes = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?pi_number=eq.${encodeURIComponent(piNumber)}&select=id,pi_number,status,amount_due_cents,total_cents,subtotal_cents,currency,customer_email,customer_name,payment_site&limit=1`,
    {
      headers: {
        apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
      },
    },
  );
  if (!lookupRes.ok) {
    const text = await lookupRes.text();
    return json({ error: "Supabase query failed", detail: text }, 500);
  }
  const rows = (await lookupRes.json()) as Array<Record<string, unknown>>;
  if (rows.length === 0) {
    return json({ error: `PI ${piNumber} not found` }, 404);
  }
  const row = rows[0];
  const status = (row.status as string | null) ?? null;
  if (status === "paid") {
    return json({ error: "PI is already fully paid" }, 400);
  }
  if (status === "canceled" || status === "expired") {
    return json({ error: `PI is ${status}, cannot accept payment` }, 400);
  }

  // 3. Pick canonical amount
  const amountCents = pickAmountCents(row);
  if (amountCents === null || amountCents < 100) {
    return json({ error: "PI has no payable amount" }, 400);
  }
  const currency = ((row.currency as string) ?? "usd").toLowerCase();
  const site_slug = resolveSiteSlug(
    (row as any).payment_site ??
      ((row.metadata as Record<string, unknown> | null)?.site_slug ?? null),
  );

  // 4. Mint PaymentIntent. payment_intent.options must include pi_id +
  //    site_slug so the webhook can attribute it back to the PI.
  let intent: StripePaymentIntent;
  try {
    intent = await createPaymentIntent(env.STRIPE_SECRET_KEY, {
      amount: amountCents,
      currency,
      description: buildDescription(row),
      receipt_email: (row.customer_email as string | null) ?? undefined,
      payment_method_types: ["card"],
      metadata: {
        pi_id: String((row.id as string | number) ?? ""),
        pi_number: String(piNumber),
        scenario: "pi_payment",
        site_slug,
        customer_email: (row.customer_email as string | null) ?? "",
        customer_name: (row.customer_name as string | null) ?? "",
      },
    });
  } catch (err: any) {
    console.error("[stripe-payment-intent] Stripe error:", err);
    return json(
      { error: `Stripe error: ${err?.message ?? "unknown"}` },
      500,
    );
  }

  const clientSecret = intent.client_secret;
  if (!clientSecret) {
    return json(
      { error: "Stripe did not return a client_secret" },
      500,
    );
  }

  console.log(
    `[stripe-payment-intent] PI ${piNumber} → PaymentIntent ${intent.id} (${amountCents} ${currency})`,
  );

  return json({
    clientSecret,
    paymentIntentId: intent.id,
    amount: amountCents,
    currency,
    site_slug,
  });
};

// ── helpers (mirror stripe-payment-link.ts) ──────────

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