/**
 * POST /api/stripe/webhook
 *
 * Handles Stripe webhook events:
 *   - payment_intent.succeeded     → mark payment as succeeded, send notification email
 *   - payment_intent.payment_failed → mark payment as failed
 *   - charge.refunded               → mark payment as refunded
 *   - checkout.session.completed    → for Stripe Checkout (scenario D), link session to intent
 *
 * Stripe calls this endpoint directly. Must verify signature using STRIPE_WEBHOOK_SECRET.
 *
 * Setup: Stripe Dashboard → Developers → Webhooks → Add endpoint
 *   URL: https://sublimapparel.com/api/stripe/webhook
 *   Events: payment_intent.succeeded, payment_intent.payment_failed,
 *           charge.refunded, checkout.session.completed
 */

import Stripe from "stripe";
import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

export const onRequestPost = async (
  context: EventContext<Env, string, Record<string, unknown>>
): Promise<Response> => {
  const sig = context.request.headers.get("stripe-signature");
  if (!sig) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const stripe = new Stripe(context.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-09-30.clover" as Stripe.LatestApiVersion,
    typescript: true,
  });

  // 1. Read raw body (required for signature verification)
  const rawBody = await context.request.text();

  // 2. Verify signature
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      context.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err: any) {
    console.error("[webhook] Signature verification failed:", err.message);
    return new Response(`Webhook signature failed: ${err.message}`, { status: 400 });
  }

  // 3. Handle event
  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentSucceeded(context.env, event.data.object as Stripe.PaymentIntent);
        break;
      case "payment_intent.payment_failed":
        await handlePaymentFailed(context.env, event.data.object as Stripe.PaymentIntent);
        break;
      case "charge.refunded":
        await handleRefund(context.env, event.data.object as Stripe.Charge);
        break;
      case "checkout.session.completed":
        await handleCheckoutCompleted(context.env, event.data.object as Stripe.Checkout.Session);
        break;
      default:
        console.log(`[webhook] Unhandled event type: ${event.type}`);
    }
  } catch (err: any) {
    console.error(`[webhook] Handler error for ${event.type}:`, err);
    // Return 500 so Stripe retries — but we don't want to retry on logical errors.
    // For now return 200 to avoid retry storms; admin can reconcile via Stripe Dashboard.
    return new Response("ok", { status: 200 });
  }

  return new Response("ok", { status: 200 });
};

async function handlePaymentSucceeded(env: Env, intent: Stripe.PaymentIntent) {
  console.log(`[webhook] payment_intent.succeeded: ${intent.id} amount=${intent.amount}`);

  const { error } = await supabasePatch(env, "payments", {
    stripe_payment_intent_id: `eq.${intent.id}`,
  }, {
    status: "succeeded",
    paid_at: new Date().toISOString(),
    stripe_customer_id: typeof intent.customer === "string" ? intent.customer : null,
    metadata: {
      ...(intent.metadata ?? {}),
      stripe_charge_id: typeof intent.latest_charge === "string" ? intent.latest_charge : null,
      payment_method: intent.payment_method_types?.[0] ?? null,
    },
  });

  if (error) {
    throw new Error(`Supabase update failed: ${error}`);
  }

  // TODO: send notification email for successful payment
  // await sendPaymentNotificationEmail(env, intent, "succeeded");
}

async function handlePaymentFailed(env: Env, intent: Stripe.PaymentIntent) {
  console.log(`[webhook] payment_intent.payment_failed: ${intent.id} reason=${intent.last_payment_error?.code}`);

  const { error } = await supabasePatch(env, "payments", {
    stripe_payment_intent_id: `eq.${intent.id}`,
  }, {
    status: "failed",
    last_error: intent.last_payment_error?.message ?? "Unknown failure",
  });

  if (error) {
    throw new Error(`Supabase update failed: ${error}`);
  }
}

async function handleRefund(env: Env, charge: Stripe.Charge) {
  console.log(`[webhook] charge.refunded: ${charge.id} amount_refunded=${charge.amount_refunded}`);

  const paymentIntentId = typeof charge.payment_intent === "string" ? charge.payment_intent : null;
  if (!paymentIntentId) {
    console.warn("[webhook] refund missing payment_intent, skipping");
    return;
  }

  const { error } = await supabasePatch(env, "payments", {
    stripe_payment_intent_id: `eq.${paymentIntentId}`,
  }, {
    status: "refunded",
    refunded_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Supabase update failed: ${error}`);
  }
}

async function handleCheckoutCompleted(env: Env, session: Stripe.Checkout.Session) {
  console.log(`[webhook] checkout.session.completed: ${session.id} payment_intent=${session.payment_intent}`);

  // For Stripe Checkout, the webhook event is checkout.session.completed
  // We need to update the row using the session ID, then store the payment_intent ID
  // for later refund/reconciliation.
  const { error } = await supabasePatch(env, "payments", {
    stripe_checkout_session_id: `eq.${session.id}`,
  }, {
    status: "succeeded",
    paid_at: new Date().toISOString(),
    stripe_payment_intent_id:
      typeof session.payment_intent === "string" ? session.payment_intent : null,
    stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
    customer_email: session.customer_details?.email ?? session.customer_email ?? undefined,
    customer_name: session.customer_details?.name ?? undefined,
  });

  if (error) {
    throw new Error(`Supabase update failed: ${error}`);
  }
}

async function supabasePatch(
  env: Env,
  table: string,
  query: Record<string, string>,
  body: Record<string, any>,
): Promise<{ error: string | null }> {
  const qs = new URLSearchParams(query).toString();
  const res = await fetch(`${env.COZE_SUPABASE_URL}/rest/v1/${table}?${qs}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    return { error: `${res.status} ${await res.text()}` };
  }
  return { error: null };
}
