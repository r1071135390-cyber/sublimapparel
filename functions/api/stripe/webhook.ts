/**
 * POST /api/stripe/webhook
 *
 * Handles Stripe webhook events:
 *   - payment_intent.succeeded     → mark payment as succeeded, send notification email
 *   - payment_intent.payment_failed → mark payment as failed
 *   - payment_intent.canceled      → mark payment as canceled
 *   - charge.refunded               → mark payment as refunded
 *   - checkout.session.completed    → for Stripe Checkout (scenario D), link session to intent
 *
 * Stripe calls this endpoint directly. Must verify signature using STRIPE_WEBHOOK_SECRET.
 *
 * Setup: Stripe Dashboard → Developers → Webhooks → Add endpoint
 *   URL: https://sublimapparel.com/api/stripe/webhook
 *   Events: payment_intent.succeeded, payment_intent.payment_failed,
 *           payment_intent.canceled, charge.refunded, checkout.session.completed
 *
 * 2026-10-01 (R77): multi-site support — every handler now reads
 * `site_slug` from the Stripe event metadata and persists it to the
 * dedicated `payment_site` column on both `payments` and
 * `proforma_invoices` rows. This lets the factory reconcile which
 * site each transaction came from without scanning the freeform
 * metadata JSON.
 *
 * The site_slug coming back from Stripe is itself whitelisted inside
 * `resolveSiteSlug` to defend against bad-actor metadata tampering
 * (a Stripe webhook is trusted, but defense in depth costs nothing).
 *
 * 2026-10-26 (R124) — duplicate-payment fix. When a PI gets charged
 * twice it is always because two PaymentIntents existed on the same PI
 * and the customer confirmed both. The mint-side fixes live in
 * functions/api/pi/stripe-payment-intent.ts (single mint path + intent
 * reuse + idempotency key); this file adds the two safety nets that
 * only the webhook can perform:
 *
 *   1. SIBLING CANCELLATION — the moment one intent on a PI succeeds we
 *      cancel every other still-pending intent on that PI, so a second
 *      card confirmation cannot become a second charge.
 *   2. DUPLICATE DETECTION — if a second intent on the same PI ever
 *      DOES succeed, we flag it loudly, record it on both payments
 *      rows, and make `amount_paid_cents` reflect the true total paid
 *      so finance can see the overcharge and refund it.
 */

import {
  constructWebhookEvent,
  cancelPaymentIntent,
  type StripePaymentIntent,
  type StripeCheckoutSession,
  type StripeCharge,
  type StripeEvent,
} from "../../lib/stripe";
import { formatDeclineMessageServer } from "../../lib/decline-codes";
import { normalizeSupabaseUrl } from "../_utils";
import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

// 2026-10-01 (R77): whitelist mirrored from create-payment-intent.ts /
// checkout-session.ts. Any site_slug arriving in webhook metadata that
// isn't on this list is coerced to DEFAULT_SITE_SLUG.
const ALLOWED_SITE_SLUGS: ReadonlySet<string> = new Set([
  "sublimapparel",
]);
const DEFAULT_SITE_SLUG = "sublimapparel";

// Mirrors the payments_scenario_check constraint declared in
// supabase/migrations/20261002_r78_payments_scenario_pi.sql. A value
// outside this set would make the INSERT below fail, so unknown
// scenarios fall back to 'pi_payment'.
const PAYMENT_SCENARIOS: ReadonlySet<string> = new Set([
  "inquiry_deposit",
  "sample_fee",
  "bulk_deposit",
  "pi_payment",
]);

function resolveSiteSlug(input: unknown): string {
  if (typeof input !== "string" || input.length === 0) return DEFAULT_SITE_SLUG;
  return ALLOWED_SITE_SLUGS.has(input) ? input : DEFAULT_SITE_SLUG;
}

export const onRequestPost = async (
  context: EventContext<Env, string, Record<string, unknown>>
): Promise<Response> => {
  const sig = context.request.headers.get("stripe-signature");
  if (!sig) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  // 1. Read raw body (required for signature verification)
  const rawBody = await context.request.text();

  // 2. Verify signature
  let event: StripeEvent;
  try {
    event = await constructWebhookEvent(
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
        await handlePaymentSucceeded(context.env, event.data.object as StripePaymentIntent);
        break;
      case "payment_intent.payment_failed":
        await handlePaymentFailed(context.env, event.data.object as StripePaymentIntent);
        break;
      case "payment_intent.canceled":
        await handlePaymentCanceled(context.env, event.data.object as StripePaymentIntent);
        break;
      case "charge.refunded":
        await handleRefund(context.env, event.data.object as StripeCharge);
        break;
      case "checkout.session.completed":
        await handleCheckoutCompleted(context.env, event.data.object as StripeCheckoutSession);
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

async function handlePaymentSucceeded(env: Env, intent: StripePaymentIntent) {
  console.log(`[webhook] payment_intent.succeeded: ${intent.id} amount=${intent.amount}`);

  const piId = intent.metadata?.pi_id ?? null;
  const isPiPayment = !!piId;
  const site_slug = resolveSiteSlug(intent.metadata?.site_slug); // 2026-10-01 (R77)

  // 2026-10-26 (R124): the ledger needs a row for this intent BEFORE it
  // can be promoted. The webhook updates by intent id, so a missing row
  // means the charge is never recorded at all —invisible to the
  // duplicate report, to the sibling cancellation, and to the revenue
  // totals. A Payment Link payment or a PI whose earlier INSERT failed
  // both land here.
  await ensurePaymentRow(env, intent, piId, site_slug);

  // 1. Update payments table
  const { error } = await supabasePatch(env, "payments", {
    stripe_payment_intent_id: `eq.${intent.id}`,
  }, {
    status: "succeeded",
    paid_at: new Date().toISOString(),
    pi_id: piId,
    stripe_customer_id: typeof intent.customer === "string" ? intent.customer : null,
    payment_site: site_slug, // 2026-10-01 (R77)
    metadata: {
      ...(intent.metadata ?? {}),
      stripe_charge_id: typeof intent.latest_charge === "string" ? intent.latest_charge : null,
      payment_method: intent.payment_method_types?.[0] ?? null,
    },
  });

  if (error) {
    throw new Error(`Supabase update failed: ${error}`);
  }

  // 2. If this is a PI payment, also mark the PI as paid
  if (isPiPayment) {
    console.log(`[webhook] PI ${piId} marked as paid via payment_intent ${intent.id} (site=${site_slug})`);

    // 2026-10-26 (R124): stop the bleeding BEFORE marking the PI paid.
    // Any other still-pending intent on this PI is a live double-charge
    // risk — cancel it now, while the customer has only paid once.
    await cancelSiblingIntents(env, piId, intent.id);

    // 2026-10-26 (R124): if another intent on the same PI already
    // succeeded, the customer was charged twice. Record it on both
    // payments rows and make amount_paid_cents reflect the real total
    // so finance can refund the surplus.
    const duplicate = await flagDuplicateCharge(env, piId, intent);
    const totalPaidCents = await sumSucceededAmounts(env, piId);

    const { error: piError } = await supabasePatch(env, "proforma_invoices", {
      id: `eq.${piId}`,
    }, {
      status: "paid",
      paid_at: new Date().toISOString(),
      stripe_payment_intent_id: intent.id,
      payment_site: site_slug, // 2026-10-01 (R77)
      // 2026-10-26 (R124): the true amount collected for this PI. With a
      // duplicate charge this is 2x the invoice total, which is exactly
      // what finance needs to see to issue the refund.
      amount_paid_cents: totalPaidCents ?? intent.amount,
    });

    if (piError) {
      throw new Error(`Supabase PI update failed: ${piError}`);
    }

    if (duplicate) {
      console.error(
        `[webhook] ⚠️ DUPLICATE CHARGE on PI ${piId}: intent ${intent.id} succeeded on top of ${duplicate.otherIntentId}. Refund ${duplicate.otherAmountCents} cents.`,
      );
    }
  }

  // TODO: send notification email for successful payment
  // await sendPaymentNotificationEmail(env, intent, "succeeded");
}

async function handlePaymentFailed(env: Env, intent: StripePaymentIntent) {
  // 2026-10-15 (R120): capture the decline_code (e.g. do_not_honor,
  // insufficient_funds) so admin dashboards can later show a histogram of
  // why cards are being declined, and persist a friendly Chinese sentence
  // so future email notifications + admin views do not have to re-translate.
  const lastErr = intent.last_payment_error as
    | { decline_code?: string | null; code?: string | null; message?: string | null }
    | null
    | undefined;
  const declineCode: string | null =
    (lastErr?.decline_code ?? lastErr?.code ?? null) as string | null;
  const friendlyMessage = formatDeclineMessageServer(declineCode);

  console.log(
    `[webhook] payment_intent.payment_failed: ${intent.id} reason=${
      intent.last_payment_error?.code ?? "(none)"
    } decline=${declineCode ?? "(none)"}`,
  );

  const site_slug = resolveSiteSlug(intent.metadata?.site_slug); // 2026-10-01 (R77)

  const { error } = await supabasePatch(env, "payments", {
    stripe_payment_intent_id: `eq.${intent.id}`,
  }, {
    status: "failed",
    last_error: intent.last_payment_error?.message ?? "Unknown failure",
    decline_code: declineCode,                   // 2026-10-15 (R120)
    friendly_message: friendlyMessage,           // 2026-10-15 (R120)
    payment_site: site_slug, // 2026-10-01 (R77)
  });

  if (error) {
    throw new Error(`Supabase update failed: ${error}`);
  }

  // Note: PI status stays as 'sent' — customer can retry payment with same PI link
}

/**
 * 2026-10-26 (R124): the intent was cancelled in Stripe — either by us
 * (the duplicate-payment guard cancelling a sibling intent) or by the
 * customer in the Stripe Dashboard. Keep the ledger honest so a stale
 * "pending" row doesn't look like money in flight.
 */
async function handlePaymentCanceled(env: Env, intent: StripePaymentIntent) {
  console.log(`[webhook] payment_intent.canceled: ${intent.id}`);

  const { error } = await supabasePatch(env, "payments", {
    stripe_payment_intent_id: `eq.${intent.id}`,
  }, {
    status: "canceled",
    last_error: "PaymentIntent canceled",
  });

  if (error) {
    console.error(`[webhook] cancel update failed: ${error}`);
  }
}

async function handleRefund(env: Env, charge: StripeCharge) {
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

async function handleCheckoutCompleted(env: Env, session: StripeCheckoutSession) {
  console.log(`[webhook] checkout.session.completed: ${session.id} payment_intent=${session.payment_intent}`);

  const site_slug = resolveSiteSlug(session.metadata?.site_slug); // 2026-10-01 (R77)

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
    payment_site: site_slug, // 2026-10-01 (R77)
  });

  if (error) {
    throw new Error(`Supabase update failed: ${error}`);
  }
}

// ── R124: duplicate-payment guards ────────────────────────────────

interface PaymentRow {
  stripe_payment_intent_id?: string | null;
  status?: string | null;
  amount_cents?: number | null;
  metadata?: Record<string, unknown> | null;
}

/**
 * Cancel every still-pending PaymentIntent that belongs to the same PI as
 * the intent that just succeeded. Those are exactly the intents that could
 * become a second charge.
 */
async function cancelSiblingIntents(
  env: Env,
  piId: string,
  keepIntentId: string,
): Promise<void> {
  if (!env.STRIPE_SECRET_KEY) return;

  const siblings = await selectPayments(env, {
    pi_id: `eq.${piId}`,
    status: "eq.pending",
  });
  if (siblings.length === 0) return;

  for (const row of siblings) {
    const intentId = row.stripe_payment_intent_id;
    if (!intentId || intentId === keepIntentId) continue;

    try {
      await cancelPaymentIntent(env.STRIPE_SECRET_KEY, intentId);
      console.log(
        `[webhook] canceled sibling intent ${intentId} on PI ${piId} (payment already settled by ${keepIntentId})`,
      );
      await supabasePatch(env, "payments", {
        stripe_payment_intent_id: `eq.${intentId}`,
      }, {
        status: "canceled",
        last_error: "Canceled automatically: this PI was already paid by another PaymentIntent",
        metadata: {
          ...(row.metadata ?? {}),
          canceled_by_intent: keepIntentId,
          canceled_at: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.error(
        `[webhook] failed to cancel sibling intent ${intentId}:`,
        err,
      );
    }
  }
}

/**
 * Detect that a SECOND intent on the same PI has also been paid. When
 * that happens the customer was charged twice and finance has to refund
 * the surplus — so record it on both payments rows.
 */
async function flagDuplicateCharge(
  env: Env,
  piId: string,
  intent: StripePaymentIntent,
): Promise<{ otherIntentId: string; otherAmountCents: number } | null> {
  const others = await selectPayments(env, {
    pi_id: `eq.${piId}`,
    status: "eq.succeeded",
    stripe_payment_intent_id: `neq.${intent.id}`,
  });
  const other = others.find(
    (r) => r.stripe_payment_intent_id && r.stripe_payment_intent_id !== intent.id,
  );
  if (!other || !other.stripe_payment_intent_id) return null;

  const detectedAt = new Date().toISOString();

  // Read the row that just landed back. handlePaymentSucceeded wrote
  // stripe_charge_id / payment_method into its metadata a moment ago, and
  // a PostgREST PATCH replaces the whole jsonb value — so the flag has to
  // be merged into what is actually stored, not into the raw intent
  // metadata.
  const landed = await selectPayments(env, {
    stripe_payment_intent_id: `eq.${intent.id}`,
    status: "eq.succeeded",
  });

  // Mark the payment that just landed.
  await supabasePatch(env, "payments", {
    stripe_payment_intent_id: `eq.${intent.id}`,
  }, {
    metadata: {
      ...(landed[0]?.metadata ?? intent.metadata ?? {}),
      duplicate_charge: {
        other_intent_id: other.stripe_payment_intent_id,
        detected_at: detectedAt,
      },
    },
  });

  // And mark the earlier one, so the flag is visible from either row.
  await supabasePatch(env, "payments", {
    stripe_payment_intent_id: `eq.${other.stripe_payment_intent_id}`,
  }, {
    metadata: {
      ...(other.metadata ?? {}),
      duplicate_charge: {
        other_intent_id: intent.id,
        detected_at: detectedAt,
      },
    },
  });

  return {
    otherIntentId: other.stripe_payment_intent_id,
    otherAmountCents: Number(other.amount_cents ?? intent.amount ?? 0),
  };
}

/**
 * Total actually collected for this PI. Normally equals one invoice
 * amount; with a duplicate charge it is double, which is the number
 * finance needs.
 */
async function sumSucceededAmounts(
  env: Env,
  piId: string,
): Promise<number | null> {
  const rows = await selectPayments(env, {
    pi_id: `eq.${piId}`,
    status: "eq.succeeded",
  });
  if (rows.length === 0) return null;
  const seen = new Set<string>();
  let total = 0;
  for (const row of rows) {
    const key = row.stripe_payment_intent_id ?? `#${seen.size}`;
    if (seen.has(key)) continue; // same intent recorded twice — count once
    seen.add(key);
    total += Number(row.amount_cents ?? 0);
  }
  return total;
}

/**
 * Make sure a `payments` row exists for a succeeded intent.
 *
 * The webhook's UPDATE is keyed on stripe_payment_intent_id, so a missing
 * row means the charge is never recorded. That is not cosmetic: without
 * the row the duplicate report cannot see the charge, the sibling
 * cancellation cannot find the intent to cancel, and the PI's
 * amount_paid_cents stays at zero.
 */
async function ensurePaymentRow(
  env: Env,
  intent: StripePaymentIntent,
  piId: string | null,
  site_slug: string,
): Promise<void> {
  const existing = await selectPayments(env, {
    stripe_payment_intent_id: `eq.${intent.id}`,
  });
  if (existing.length > 0) return;

  const rawScenario = intent.metadata?.scenario ?? "";
  const scenario = PAYMENT_SCENARIOS.has(rawScenario)
    ? rawScenario
    : "pi_payment";

  const res = await fetch(
    `${normalizeSupabaseUrl(env.COZE_SUPABASE_URL)}/rest/v1/payments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        stripe_payment_intent_id: intent.id,
        scenario,
        status: "pending",
        amount_cents: intent.amount,
        currency: intent.currency,
        customer_name: intent.metadata?.customer_name ?? null,
        customer_email: intent.metadata?.customer_email ?? null,
        pi_id: piId,
        metadata: intent.metadata ?? {},
        payment_site: site_slug,
      }),
    },
  );
  if (!res.ok) {
    console.error(
      `[webhook] payments INSERT failed for ${intent.id}: ${res.status} ${await res.text()}`,
    );
  }
}

async function selectPayments(
  env: Env,
  filters: Record<string, string>,
): Promise<PaymentRow[]> {
  const qs = new URLSearchParams(filters).toString();
  const res = await fetch(
    `${normalizeSupabaseUrl(env.COZE_SUPABASE_URL)}/rest/v1/payments?${qs}&select=stripe_payment_intent_id,status,amount_cents,metadata`,
    {
      headers: {
        apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
      },
    },
  );
  if (!res.ok) {
    console.warn(
      `[webhook] payments query failed: ${res.status} ${await res.text()}`,
    );
    return [];
  }
  const rows = (await res.json()) as PaymentRow[];
  return Array.isArray(rows) ? rows : [];
}

async function supabasePatch(
  env: Env,
  table: string,
  query: Record<string, string>,
  body: Record<string, any>,
): Promise<{ error: string | null }> {
  const qs = new URLSearchParams(query).toString();
  const res = await fetch(
    `${normalizeSupabaseUrl(env.COZE_SUPABASE_URL)}/rest/v1/${table}?${qs}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) {
    return { error: `${res.status} ${await res.text()}` };
  }
  return { error: null };
}
