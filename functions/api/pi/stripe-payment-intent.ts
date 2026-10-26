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
 *
 * 2026-10-26 (R124) — duplicate-payment fix. This endpoint used to mint a
 * BRAND NEW PaymentIntent on every POST, and a second mint path existed
 * in [[pi_number]].ts. Two intents on the same PI = two charges. The
 * guard is now threefold:
 *
 *   1. SINGLE MINT PATH — the lazy mint in [[pi_number]].ts is gone.
 *      This endpoint is the only place a PI intent is created.
 *   2. REUSE — if the PI already points at a live, unpaid intent with the
 *      right amount, we hand back its EXISTING client_secret instead of
 *      creating a second one. A page refresh or a second browser tab
 *      therefore reuses the same intent.
 *   3. IDEMPOTENCY KEY — concurrent POSTs that race past step 2 send the
 *      same Stripe Idempotency-Key, so Stripe returns ONE intent for both.
 *      The key is suffixed with the cancelled predecessor's id so that a
 *      legitimately new intent (previous one canceled / amount changed)
 *      gets a fresh key.
 */

import {
  cancelPaymentIntent,
  createPaymentIntent,
  listPaymentIntents,
  retrievePaymentIntent,
  type StripePaymentIntent,
} from "../../lib/stripe";
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

  // 2. Look up PI — now including the Stripe companion columns, because
  //    the reuse decision below depends on them.
  const lookupRes = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?pi_number=eq.${encodeURIComponent(piNumber)}&select=id,pi_number,status,amount_due_cents,total_cents,subtotal_cents,currency,customer_email,customer_name,customer_company,payment_site,stripe_payment_intent_id,stripe_client_secret&limit=1`,
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
    // 2026-10-26 (R124): 409 + alreadyPaid so the browser can swap the
    // card form for the "already paid" confirmation instead of showing a
    // scary error the customer cannot act on.
    return json(
      {
        error: "PI is already fully paid",
        alreadyPaid: true,
        paymentIntentId:
          (row.stripe_payment_intent_id as string | null) ?? null,
      },
      409,
    );
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

  const piId = String((row.id as string | number) ?? "");
  const existingIntentId =
    (row.stripe_payment_intent_id as string | null) ?? null;

  // 4. Decide: reuse the intent this PI already has, or mint a new one.
  let intent: StripePaymentIntent | null = null;
  let predecessorId: string | null = null;
  let reuseReason = "no existing intent";

  if (existingIntentId) {
    let live: StripePaymentIntent | null = null;
    try {
      live = await retrievePaymentIntent(env.STRIPE_SECRET_KEY, existingIntentId);
    } catch (err) {
      console.warn(
        `[stripe-payment-intent] could not retrieve ${existingIntentId}:`,
        err,
      );
    }

    if (live && live.status === "succeeded") {
      // The PI row lagged behind the webhook. Sync it and stop — charging
      // again here is exactly the bug we are fixing.
      await patchPiRow(env, supabaseUrl, piId, {
        status: "paid",
        paid_at: new Date().toISOString(),
        stripe_payment_intent_id: live.id,
        amount_paid_cents: live.amount,
      });
      return json(
        {
          error: "PI is already fully paid",
          alreadyPaid: true,
          paymentIntentId: live.id,
        },
        409,
      );
    }

    if (live && live.status !== "canceled" && live.amount === amountCents) {
      // Still payable and the amount matches → hand back the SAME intent.
      intent = live;
      reuseReason = `reusing live intent ${live.id} (${live.status})`;
    } else if (live && live.status === "canceled") {
      predecessorId = existingIntentId;
      reuseReason = `previous intent ${existingIntentId} was canceled`;
    } else if (live) {
      // Amount changed since the intent was minted — that intent would
      // charge the wrong figure, so retire it and mint a fresh one.
      predecessorId = existingIntentId;
      reuseReason = `amount changed ${live.amount} → ${amountCents}`;
      await cancelQuietly(env, existingIntentId, "amount changed");
    } else {
      predecessorId = existingIntentId;
      reuseReason = `previous intent ${existingIntentId} is no longer retrievable`;
    }
  }

  if (!intent) {
    // 5. Mint — with an Idempotency-Key so two racing requests produce
    //    ONE PaymentIntent instead of two.
    const idempotencyKey = buildIdempotencyKey(
      piNumber,
      amountCents,
      predecessorId,
    );
    try {
      intent = await mintIntent(env, {
        amountCents,
        currency,
        piId,
        piNumber,
        site_slug,
        row,
        idempotencyKey,
      });
    } catch (err: any) {
      // Stripe caches the RESPONSE against an idempotency key — including
      // errors. A cached 500 would be replayed to every retry for 24h.
      //
      // But we must NOT simply drop the key and mint again: if Stripe
      // actually created the intent and only the response was lost (network
      // blip between Stripe and us), a keyless retry creates a SECOND
      // chargeable intent — exactly the bug R124 exists to stop.
      //
      // So: first look for an intent Stripe already holds for this PI
      // (the lost-response case), and only if there is none, retry with a
      // DIFFERENT deterministic key. That retry is still safe for
      // concurrent callers, because every one of them derives the same
      // fallback key from the same PI state.
      console.warn(
        `[stripe-payment-intent] mint with idempotency key failed for PI ${piNumber}:`,
        err?.message ?? err,
      );

      const recovered = await findRecentIntentForPi(env, piNumber);
      if (recovered) {
        intent = recovered;
        reuseReason = `recovered intent ${recovered.id} after a failed mint`;
      } else {
        try {
          intent = await mintIntent(env, {
            amountCents,
            currency,
            piId,
            piNumber,
            site_slug,
            row,
            idempotencyKey: `${idempotencyKey}-r1`,
          });
        } catch (retryErr: any) {
          console.error("[stripe-payment-intent] Stripe error:", retryErr);
          return json(
            { error: `Stripe error: ${retryErr?.message ?? "unknown"}` },
            500,
          );
        }
      }
    }
  }

  const clientSecret = intent.client_secret;
  if (!clientSecret) {
    return json({ error: "Stripe did not return a client_secret" }, 500);
  }

  // 6. Persist — the PI row carries the canonical intent reference, and a
  //    pending payments row gives the webhook something to update when the
  //    charge lands.
  await patchPiRow(env, supabaseUrl, piId, {
    stripe_client_secret: clientSecret,
    stripe_payment_intent_id: intent.id,
    amount_due_cents: amountCents,
    payment_site: site_slug,
  });
  await ensurePendingPaymentRow(env, supabaseUrl, {
    intent,
    amountCents,
    currency,
    piId,
    piNumber,
    site_slug,
    row,
  });

  console.log(
    `[stripe-payment-intent] PI ${piNumber} → PaymentIntent ${intent.id} (${amountCents} ${currency}) [${reuseReason}]`,
  );

  return json({
    clientSecret,
    paymentIntentId: intent.id,
    amount: amountCents,
    currency,
    site_slug,
  });
};

// ── helpers ─────────────────────────────────────────────────────

interface MintArgs {
  amountCents: number;
  currency: string;
  piId: string;
  piNumber: string;
  site_slug: string;
  row: Record<string, unknown>;
  idempotencyKey: string | null;
}

/**
 * Create the PaymentIntent. metadata.pi_id / metadata.site_slug are what
 * the webhook uses to attribute the charge back to this PI.
 */
async function mintIntent(env: Env, args: MintArgs): Promise<StripePaymentIntent> {
  return createPaymentIntent(
    env.STRIPE_SECRET_KEY,
    {
      amount: args.amountCents,
      currency: args.currency,
      description: buildDescription(args.row),
      receipt_email: (args.row.customer_email as string | null) ?? undefined,
      payment_method_types: ["card"],
      metadata: {
        pi_id: args.piId,
        pi_number: args.piNumber,
        scenario: "pi_payment",
        site_slug: args.site_slug,
        customer_email: (args.row.customer_email as string | null) ?? "",
        customer_name: (args.row.customer_name as string | null) ?? "",
      },
    },
    args.idempotencyKey ? { idempotencyKey: args.idempotencyKey } : {},
  );
}

/**
 * Deterministic Stripe idempotency key.
 *
 * The `predecessor` segment is what keeps the key meaningful across
 * generations: the first intent of a PI uses "new", and every later
 * intent uses the id of the intent it replaces. Two requests racing from
 * the same state therefore share a key (one intent), while a genuinely
 * new intent (previous one canceled / amount changed) gets a fresh one.
 */
function buildIdempotencyKey(
  piNumber: string,
  amountCents: number,
  predecessorId: string | null,
): string {
  const safePi = piNumber.replace(/[^A-Za-z0-9_-]/g, "");
  const gen = predecessorId
    ? predecessorId.replace(/[^A-Za-z0-9]/g, "")
    : "new";
  return `pi-${safePi}-${amountCents}-${gen}`;
}

/**
 * Find an intent Stripe already holds for this PI.
 *
 * Used when a mint call fails: the request may have reached Stripe and
 * created the intent while only the HTTP response was lost. Re-minting
 * blindly would then leave two chargeable intents on one invoice. Asking
 * Stripe what it already has is the only reliable answer.
 *
 * Only intents created in the last few minutes are considered, and an
 * already-canceled one is ignored (that is the predecessor we replaced).
 */
async function findRecentIntentForPi(
  env: Env,
  piNumber: string,
): Promise<StripePaymentIntent | null> {
  try {
    const since = Math.floor((Date.now() - 10 * 60_000) / 1000);
    const intents = await listPaymentIntents(env.STRIPE_SECRET_KEY, {
      createdGte: since,
      limit: 100,
      maxPages: 3,
    });
    const candidates = intents.filter(
      (i) =>
        i.metadata?.pi_number === piNumber &&
        i.status !== "canceled" &&
        !!i.client_secret,
    );
    if (candidates.length === 0) return null;
    // Stripe lists newest first, but do not rely on that.
    candidates.sort(
      (a, b) => (b.created ?? 0) - (a.created ?? 0),
    );
    return candidates[0];
  } catch (err) {
    console.warn(
      `[stripe-payment-intent] could not scan for existing intents of PI ${piNumber}:`,
      err,
    );
    return null;
  }
}

async function cancelQuietly(
  env: Env,
  intentId: string,
  reason: string,
): Promise<void> {
  try {
    await cancelPaymentIntent(env.STRIPE_SECRET_KEY, intentId);
    console.log(
      `[stripe-payment-intent] canceled stale intent ${intentId} (${reason})`,
    );
  } catch (err) {
    console.warn(
      `[stripe-payment-intent] could not cancel stale intent ${intentId}:`,
      err,
    );
  }
}

async function patchPiRow(
  env: Env,
  supabaseUrl: string,
  piId: string,
  patch: Record<string, unknown>,
): Promise<void> {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?id=eq.${encodeURIComponent(piId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(patch),
    },
  );
  if (!res.ok) {
    console.error(
      `[stripe-payment-intent] PATCH proforma_invoices failed: ${res.status} ${await res.text()}`,
    );
  }
}

/**
 * Make sure a pending `payments` row exists for this intent so the
 * webhook's UPDATE has a row to land on. Read-then-insert: a rare
 * concurrent race can leave two rows for the same intent id, which is
 * harmless (the webhook PATCHes by intent id and the duplicate-charge
 * report counts DISTINCT intent ids).
 */
async function ensurePendingPaymentRow(
  env: Env,
  supabaseUrl: string,
  args: {
    intent: StripePaymentIntent;
    amountCents: number;
    currency: string;
    piId: string;
    piNumber: string;
    site_slug: string;
    row: Record<string, unknown>;
  },
): Promise<void> {
  const headers = {
    "Content-Type": "application/json",
    apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
  };

  try {
    const existingRes = await fetch(
      `${supabaseUrl}/rest/v1/payments?stripe_payment_intent_id=eq.${encodeURIComponent(args.intent.id)}&select=stripe_payment_intent_id&limit=1`,
      { headers },
    );
    if (existingRes.ok) {
      const existing = (await existingRes.json()) as unknown[];
      if (existing.length > 0) return;
    }
  } catch (err) {
    console.warn(
      "[stripe-payment-intent] payments existence check failed:",
      err,
    );
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/payments`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({
      stripe_payment_intent_id: args.intent.id,
      scenario: "pi_payment",
      status: "pending",
      amount_cents: args.amountCents,
      currency: args.currency,
      customer_name: (args.row.customer_name as string | null) ?? null,
      customer_email: (args.row.customer_email as string | null) ?? null,
      pi_id: args.piId,
      metadata: {
        pi_number: args.piNumber,
        site_slug: args.site_slug,
      },
      payment_site: args.site_slug,
    }),
  });
  if (!res.ok) {
    console.error(
      `[stripe-payment-intent] payments INSERT failed: ${res.status} ${await res.text()}`,
    );
  }
}

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
