/**
 * Server-side Stripe client using the REST API directly (no npm package).
 *
 * Why not use the `stripe` npm package?
 *   - The official `stripe` SDK is ~600KB minified.
 *   - When Cloudflare Workers/Pages Functions tries to bundle it, the
 *     chunk exceeds the per-function limit and the deploy fails with
 *     "Separator is not found, and chunk exceed the limit".
 *   - The REST API is small enough to call via fetch().
 *
 * This module exposes just the surface area we need:
 *   - createPaymentIntent
 *   - cancelPaymentIntent
 *   - createCheckoutSession
 *   - constructWebhookEvent   (signature verification via Web Crypto)
 */

const STRIPE_API_BASE = "https://api.stripe.com/v1";

// ── Low-level helper ──────────────────────────────────────────────
async function stripeFetch(
  path: string,
  secretKey: string,
  init: RequestInit = {},
): Promise<any> {
  const url = `${STRIPE_API_BASE}${path}`;
  const headers = new Headers(init.headers || {});
  headers.set("Authorization", `Bearer ${secretKey}`);
  // Don't set Content-Type for GET; for POST with form body, let the
  // helper set it explicitly via the caller.
  const res = await fetch(url, { ...init, headers });
  if (!res.ok) {
    const text = await res.text();
    let detail: any = text;
    try {
      detail = JSON.parse(text);
    } catch {
      /* keep raw text */
    }
    throw new Error(
      `Stripe API ${init.method || "GET"} ${path} failed: ${res.status} ${JSON.stringify(detail)}`,
    );
  }
  return res.json();
}

// Stripe form body needs urlencoded params
function formBody(
  params: Record<string, string | number | boolean | undefined | null>,
): string {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    usp.append(k, String(v));
  }
  return usp.toString();
}

// ── Payment Intents ───────────────────────────────────────────────
export interface CreatePaymentIntentParams {
  amount: number; // in cents
  currency: string; // e.g. "usd"
  description?: string;
  receipt_email?: string;
  automatic_payment_methods?: boolean;
  metadata?: Record<string, string>;
}

export async function createPaymentIntent(
  secretKey: string,
  params: CreatePaymentIntentParams,
): Promise<{ id: string; client_secret: string; status: string }> {
  const body = formBody({
    amount: params.amount,
    currency: params.currency,
    description: params.description,
    receipt_email: params.receipt_email,
    "automatic_payment_methods[enabled]": params.automatic_payment_methods ?? true,
    ...flattenMetadata(params.metadata),
  });
  return stripeFetch("/payment_intents", secretKey, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
}

export async function cancelPaymentIntent(
  secretKey: string,
  paymentIntentId: string,
): Promise<{ id: string; status: string }> {
  return stripeFetch(`/payment_intents/${paymentIntentId}/cancel`, secretKey, {
    method: "POST",
  });
}

// ── Checkout Sessions ─────────────────────────────────────────────
export interface CreateCheckoutSessionParams {
  amount: number;
  currency: string;
  success_url: string;
  cancel_url: string;
  customer_email?: string;
  description?: string;
  metadata?: Record<string, string>;
  payment_method_types?: string[];
}

export async function createCheckoutSession(
  secretKey: string,
  params: CreateCheckoutSessionParams,
): Promise<{ id: string; url: string }> {
  const body = formBody({
    "payment_method_types[]": params.payment_method_types ?? ["card"],
    "line_items[0][price_data][currency]": params.currency,
    "line_items[0][price_data][unit_amount]": params.amount,
    "line_items[0][price_data][product_data][name]": params.description ?? "Order",
    "line_items[0][quantity]": 1,
    mode: "payment",
    success_url: params.success_url,
    cancel_url: params.cancel_url,
    customer_email: params.customer_email,
    ...flattenMetadata(params.metadata),
  });
  return stripeFetch("/checkout/sessions", secretKey, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
}

// ── Webhook signature verification (Web Crypto) ───────────────────
// Stripe webhook format:  t=<timestamp>,v1=<sig>  where
//   sig = HMAC-SHA256(secret, "<timestamp>.<payload>")
export async function constructWebhookEvent(
  payload: string,
  signatureHeader: string,
  webhookSecret: string,
  toleranceSeconds = 300,
): Promise<any> {
  if (!signatureHeader) {
    throw new Error("Missing Stripe-Signature header");
  }
  // Parse header
  const parts = signatureHeader.split(",").reduce<Record<string, string>>(
    (acc, kv) => {
      const [k, v] = kv.split("=");
      if (k && v) acc[k.trim()] = v.trim();
      return acc;
    },
    {},
  );
  const t = parts["t"];
  const v1 = parts["v1"];
  if (!t || !v1) {
    throw new Error("Malformed Stripe-Signature header");
  }
  // Tolerance check
  const age = Math.abs(Math.floor(Date.now() / 1000) - parseInt(t, 10));
  if (age > toleranceSeconds) {
    throw new Error(`Webhook timestamp outside tolerance window (${age}s)`);
  }
  // Compute expected signature
  const signedPayload = `${t}.${payload}`;
  const enc = new TextEncoder();
  const keyData = enc.encode(webhookSecret);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBuf = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(signedPayload));
  const expected = Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  if (expected !== v1) {
    throw new Error("Webhook signature verification failed");
  }
  return JSON.parse(payload);
}

// ── Util ──────────────────────────────────────────────────────────
function flattenMetadata(
  metadata: Record<string, string> | undefined,
): Record<string, string> {
  if (!metadata) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(metadata)) {
    out[`metadata[${k}]`] = v;
  }
  return out;
}
