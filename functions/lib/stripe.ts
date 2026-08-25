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

// ── Webhook event types (minimal subset we actually handle) ───────
export interface StripePaymentIntent {
  id: string;
  object?: string;
  amount: number;
  amount_received?: number;
  amount_capturable?: number;
  currency: string;
  status: string;
  client_secret?: string;
  customer?: string;
  description?: string;
  receipt_email?: string;
  metadata?: Record<string, string>;
  charges?: { data: StripeCharge[] };
  payment_method_types?: string[];
  next_action?: Record<string, any>;
  latest_charge?: string;
  last_payment_error?: { code?: string; message?: string; type?: string };
}
export interface StripeCheckoutSession {
  id: string;
  url: string | null;
  amount_total?: number;
  currency?: string;
  payment_status: string;
  status?: string;
  customer?: string;
  customer_email?: string;
  customer_details?: { email?: string; name?: string; phone?: string };
  metadata?: Record<string, string>;
  payment_intent?: string | StripePaymentIntent;
}
export interface StripeCharge {
  id: string;
  amount: number;
  amount_captured?: number;
  amount_refunded?: number;
  paid: boolean;
  status: string;
  receipt_url?: string;
  payment_intent?: string;
  metadata?: Record<string, string>;
}
export interface StripeEvent {
  id: string;
  type: string;
  created: number;
  data: { object: StripePaymentIntent | StripeCheckoutSession | StripeCharge | Record<string, any> };
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
): Promise<StripePaymentIntent> {
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
export interface CheckoutSessionLineItem {
  quantity: number;
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      description?: string;
      images?: string[];
    };
  };
}
export interface CreateCheckoutSessionParams {
  mode?: "payment" | "setup" | "subscription";
  payment_method_types?: string[];
  customer_email?: string;
  // Either provide line_items OR (amount + currency + description)
  line_items?: CheckoutSessionLineItem[];
  amount?: number;
  currency?: string;
  description?: string;
  success_url: string;
  cancel_url: string;
  metadata?: Record<string, string>;
}

export async function createCheckoutSession(
  secretKey: string,
  params: CreateCheckoutSessionParams,
): Promise<StripeCheckoutSession> {
  const body = new URLSearchParams();
  body.append("mode", params.mode ?? "payment");
  for (const pm of params.payment_method_types ?? ["card"]) {
    body.append("payment_method_types[]", pm);
  }
  if (params.customer_email) {
    body.append("customer_email", params.customer_email);
  }
  if (params.line_items && params.line_items.length > 0) {
    params.line_items.forEach((item, idx) => {
      body.append(`line_items[${idx}][quantity]`, String(item.quantity));
      body.append(`line_items[${idx}][price_data][currency]`, item.price_data.currency);
      body.append(`line_items[${idx}][price_data][unit_amount]`, String(item.price_data.unit_amount));
      body.append(`line_items[${idx}][price_data][product_data][name]`, item.price_data.product_data.name);
      if (item.price_data.product_data.description) {
        body.append(`line_items[${idx}][price_data][product_data][description]`, item.price_data.product_data.description);
      }
      if (item.price_data.product_data.images) {
        item.price_data.product_data.images.forEach((img, j) => {
          body.append(`line_items[${idx}][price_data][product_data][images][${j}]`, img);
        });
      }
    });
  } else if (params.amount && params.currency) {
    body.append("line_items[0][quantity]", "1");
    body.append("line_items[0][price_data][currency]", params.currency);
    body.append("line_items[0][price_data][unit_amount]", String(params.amount));
    body.append("line_items[0][price_data][product_data][name]", params.description ?? "Order");
  } else {
    throw new Error("createCheckoutSession requires either line_items or (amount + currency)");
  }
  body.append("success_url", params.success_url);
  body.append("cancel_url", params.cancel_url);
  for (const [k, v] of Object.entries(flattenMetadata(params.metadata))) {
    body.append(k, v);
  }
  return stripeFetch("/checkout/sessions", secretKey, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
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
): Promise<StripeEvent> {
  if (!signatureHeader) {
    throw new Error("Missing Stripe-Signature header");
  }
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
  const age = Math.abs(Math.floor(Date.now() / 1000) - parseInt(t, 10));
  if (age > toleranceSeconds) {
    throw new Error(`Webhook timestamp outside tolerance window (${age}s)`);
  }
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
  return JSON.parse(payload) as StripeEvent;
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
