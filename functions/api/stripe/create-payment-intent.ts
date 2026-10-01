/**
 * POST /api/stripe/create-payment-intent
 *
 * Creates a Stripe PaymentIntent for embedded payments (scenarios A, B, C).
 * Returns clientSecret for use with Stripe Elements on the frontend.
 *
 * Request body:
 * {
 *   scenario: "inquiry_deposit" | "sample_fee" | "bulk_deposit",
 *   amount_cents?: number,        // required for bulk_deposit, otherwise uses FIXED_PRICES
 *   customer_email: string,
 *   customer_name?: string,
 *   customer_company?: string,
 *   customer_phone?: string,
 *   metadata?: { [key: string]: string },
 *   inquiry_id?: string,
 *   quote_id?: string,
 *   site_slug?: string,           // 2026-10-01 (R77): multi-site tracking
 * }
 *
 * Response:
 * { ok: true, clientSecret, paymentIntentId, amount, currency }
 * or
 * { ok: false, error: string }
 *
 * 2026-10-01 (R77): added `site_slug` parameter for multi-site tracking.
 * Each site (sublimapparel, future US/EU sister sites) gets its own slug,
 * which is stored on (a) the Stripe PaymentIntent.metadata for Dashboard
 * filtering, and (b) the Supabase `payments` row for cross-site
 * reconciliation. Whitelist-validated to prevent arbitrary metadata
 * pollution. Defaults to "sublimapparel" when omitted (single-site MVP).
 */

import type { EventContext } from "@cloudflare/workers-types";
import { createPaymentIntent } from "../../lib/stripe";

interface Env {
  STRIPE_SECRET_KEY: string;
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

interface CreateIntentBody {
  scenario: "inquiry_deposit" | "sample_fee" | "bulk_deposit";
  amount_cents?: number;
  customer_email: string;
  customer_name?: string;
  customer_company?: string;
  customer_phone?: string;
  metadata?: Record<string, string>;
  inquiry_id?: string;
  quote_id?: string;
  site_slug?: string;
}

const FIXED_PRICES: Record<string, number> = {
  inquiry_deposit: 9900, // $99
  sample_fee: 5000, // $50
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 2026-10-01 (R77): whitelist of site slugs allowed in metadata.
// To add a sister site, append its slug here and redeploy.
const ALLOWED_SITE_SLUGS: ReadonlySet<string> = new Set([
  "sublimapparel",
  // "sublimapparel_us",
  // "sublimapparel_eu",
]);

const DEFAULT_SITE_SLUG = "sublimapparel";

function resolveSiteSlug(input: unknown): string {
  if (typeof input !== "string" || input.length === 0) return DEFAULT_SITE_SLUG;
  return ALLOWED_SITE_SLUGS.has(input) ? input : DEFAULT_SITE_SLUG;
}

export const onRequestPost = async (
  context: EventContext<Env, string, Record<string, unknown>>
): Promise<Response> => {
  // 1. Parse + validate body
  let body: CreateIntentBody;
  try {
    body = (await context.request.json()) as CreateIntentBody;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON body" }, 400);
  }

  if (!body.scenario || !["inquiry_deposit", "sample_fee", "bulk_deposit"].includes(body.scenario)) {
    return jsonResponse({ ok: false, error: "Invalid scenario" }, 400);
  }
  if (!body.customer_email || !EMAIL_RE.test(body.customer_email)) {
    return jsonResponse({ ok: false, error: "Valid customer_email required" }, 400);
  }

  // 2. Compute amount
  let amount_cents: number;
  if (body.scenario === "bulk_deposit") {
    if (!body.amount_cents || body.amount_cents < 100) {
      return jsonResponse(
        { ok: false, error: "bulk_deposit requires amount_cents >= 100 ($1 minimum)" },
        400,
      );
    }
    amount_cents = Math.round(body.amount_cents);
  } else {
    amount_cents = FIXED_PRICES[body.scenario];
  }

  // 3. 2026-10-01 (R77): resolve site_slug (whitelist-validated).
  const site_slug = resolveSiteSlug(body.site_slug);

  // 4. Create Stripe PaymentIntent (via REST API, no SDK)
  let paymentIntent: { id: string; client_secret: string; amount: number; currency: string };
  try {
    const descParts: string[] = [];
    if (body.customer_company) descParts.push(body.customer_company);
    if (body.customer_name) descParts.push(body.customer_name);
    descParts.push(`— ${body.scenario.replace("_", " ")}`);

    const pi = await createPaymentIntent(context.env.STRIPE_SECRET_KEY, {
      amount: amount_cents,
      currency: "usd",
      automatic_payment_methods: true,
      receipt_email: body.customer_email,
      description: descParts.join(" "),
      metadata: {
        scenario: body.scenario,
        site_slug, // 2026-10-01 (R77): multi-site marker
        ...(body.inquiry_id ? { inquiry_id: body.inquiry_id } : {}),
        ...(body.quote_id ? { quote_id: body.quote_id } : {}),
        ...(body.metadata ?? {}),
      },
    });
    paymentIntent = {
      id: pi.id,
      client_secret: pi.client_secret ?? "",
      amount: pi.amount,
      currency: pi.currency,
    };
  } catch (err: any) {
    console.error("[create-payment-intent] Stripe error:", err);
    return jsonResponse(
      { ok: false, error: `Stripe error: ${err?.message ?? "unknown"}` },
      500,
    );
  }

  // 5. Insert pending row in Supabase
  try {
    await insertPendingPayment(context.env, {
      stripe_payment_intent_id: paymentIntent.id,
      scenario: body.scenario,
      amount_cents,
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      customer_company: body.customer_company,
      inquiry_id: body.inquiry_id,
      quote_id: body.quote_id,
      metadata: body.metadata ?? {},
      site_slug, // 2026-10-01 (R77): multi-site marker
    });
  } catch (err: any) {
    // Don't fail the request — payment intent is created. Webhook will catch state drift.
    console.error("[create-payment-intent] Supabase insert error:", err);
  }

  // 6. Return client secret to frontend
  return jsonResponse({
    ok: true,
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    site_slug, // 2026-10-01 (R77): echoed back for client-side debugging
  });
};

function jsonResponse(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function insertPendingPayment(
  env: Env,
  data: {
    stripe_payment_intent_id: string;
    scenario: string;
    amount_cents: number;
    customer_name?: string;
    customer_email: string;
    customer_phone?: string;
    customer_company?: string;
    inquiry_id?: string;
    quote_id?: string;
    metadata: Record<string, string>;
    site_slug: string; // 2026-10-01 (R77)
  },
): Promise<void> {
  const res = await fetch(`${env.COZE_SUPABASE_URL}/rest/v1/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      stripe_payment_intent_id: data.stripe_payment_intent_id,
      scenario: data.scenario,
      status: "pending",
      amount_cents: data.amount_cents,
      currency: "usd",
      customer_name: data.customer_name ?? null,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone ?? null,
      customer_company: data.customer_company ?? null,
      inquiry_id: data.inquiry_id ?? null,
      quote_id: data.quote_id ?? null,
      metadata: { ...data.metadata, site_slug: data.site_slug },
      payment_site: data.site_slug, // 2026-10-01 (R77): dedicated column for fast queries
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase insert failed: ${res.status} ${text}`);
  }
}
