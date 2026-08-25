/**
 * POST /api/stripe/checkout-session
 *
 * Creates a Stripe Checkout Session for hosted-page payments (scenario D — small orders).
 * Returns the session URL to redirect the customer to.
 *
 * Request body:
 * {
 *   items: [{ name: string, description?: string, amount_cents: number, quantity: number, image_url?: string }],
 *   customer_email: string,
 *   customer_name?: string,
 *   customer_company?: string,
 *   metadata?: { [key: string]: string },
 * }
 *
 * Response:
 * { ok: true, url, sessionId }
 * or
 * { ok: false, error: string }
 */

import { createCheckoutSession } from "../../lib/stripe";
import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  STRIPE_SECRET_KEY: string;
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

interface CartItem {
  name: string;
  description?: string;
  amount_cents: number;
  quantity: number;
  image_url?: string;
}

interface CheckoutBody {
  items: CartItem[];
  customer_email: string;
  customer_name?: string;
  customer_company?: string;
  metadata?: Record<string, string>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_ORIGIN = "https://sublimapparel.com";

export const onRequestPost = async (
  context: EventContext<Env, string, Record<string, unknown>>
): Promise<Response> => {
  // 1. Parse + validate body
  let body: CheckoutBody;
  try {
    body = (await context.request.json()) as CheckoutBody;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON body" }, 400);
  }

  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return jsonResponse({ ok: false, error: "items array required (1+ items)" }, 400);
  }
  if (!body.customer_email || !EMAIL_RE.test(body.customer_email)) {
    return jsonResponse({ ok: false, error: "Valid customer_email required" }, 400);
  }
  for (const it of body.items) {
    if (!it.name || typeof it.name !== "string" || it.name.length > 200) {
      return jsonResponse({ ok: false, error: "Each item needs a name (max 200 chars)" }, 400);
    }
    if (!it.amount_cents || it.amount_cents < 100) {
      return jsonResponse({ ok: false, error: "Each item needs amount_cents >= 100" }, 400);
    }
    if (!it.quantity || it.quantity < 1) {
      return jsonResponse({ ok: false, error: "Each item needs quantity >= 1" }, 400);
    }
  }

  // 2. Compute total for Supabase record
  const amount_cents = body.items.reduce((sum, it) => sum + it.amount_cents * it.quantity, 0);

  // 3. Create Stripe Checkout Session
  let session: { id: string; url: string | null };
  try {
    session = await createCheckoutSession(context.env.STRIPE_SECRET_KEY, {
      // @ts-ignore -- Cloudflare Functions bundler uses a stale view of the CreateCheckoutSessionParams type; runtime call is correct.
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: body.customer_email,
      line_items: body.items.map((it) => ({
        quantity: it.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(it.amount_cents),
          product_data: {
            name: it.name,
            ...(it.description ? { description: it.description } : {}),
            ...(it.image_url ? { images: [it.image_url] } : {}),
          },
        },
      })),
      success_url: `${SITE_ORIGIN}/order/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_ORIGIN}/order/canceled/?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        scenario: "shop_order",
        ...(body.customer_name ? { customer_name: body.customer_name } : {}),
        ...(body.customer_company ? { customer_company: body.customer_company } : {}),
        ...(body.metadata ?? {}),
      },
    });
  } catch (err: any) {
    console.error("[checkout-session] Stripe error:", err);
    return jsonResponse(
      { ok: false, error: `Stripe error: ${err?.message ?? "unknown"}` },
      500,
    );
  }

  // 4. Insert pending row in Supabase
  try {
    await insertPendingPayment(context.env, {
      stripe_checkout_session_id: session.id,
      scenario: "shop_order",
      amount_cents,
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_company: body.customer_company,
      order_items: body.items,
      metadata: body.metadata ?? {},
    });
  } catch (err: any) {
    console.error("[checkout-session] Supabase insert error:", err);
  }

  // 5. Return checkout URL
  if (!session.url) {
    return jsonResponse({ ok: false, error: "Stripe did not return a session URL" }, 500);
  }

  return jsonResponse({
    ok: true,
    url: session.url,
    sessionId: session.id,
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
    stripe_checkout_session_id: string;
    scenario: string;
    amount_cents: number;
    customer_name?: string;
    customer_email: string;
    customer_company?: string;
    order_items: CartItem[];
    metadata: Record<string, string>;
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
      stripe_checkout_session_id: data.stripe_checkout_session_id,
      scenario: data.scenario,
      status: "pending",
      amount_cents: data.amount_cents,
      currency: "usd",
      customer_name: data.customer_name ?? null,
      customer_email: data.customer_email,
      customer_company: data.customer_company ?? null,
      order_items: data.order_items,
      metadata: data.metadata,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase insert failed: ${res.status} ${text}`);
  }
}
