// functions/api/admin/payment-reconciliation.ts
//
// 2026-10-26 (R124): Stripe-side duplicate-payment reconciliation.
//
// Why this exists
// ---------------
// Until R124 the `payments` ledger only ever recorded the intent that the
// LAZY mint path created. The intent that actually took the money (the one
// minted by /api/pi/stripe-payment-intent) was never written to `payments`
// at all, because the webhook's UPDATE is keyed on stripe_payment_intent_id
// and matched zero rows. Every successful payment since 2026-10-02 is
// therefore invisible in the database, and a customer charged twice leaves
// no trace there either.
//
// The database cannot recover those historical charges — the PI row keeps
// only the LAST successful intent id, so an earlier second charge is gone.
// Stripe is the only system that still knows. This endpoint asks Stripe.
//
// GET /api/admin/payment-reconciliation
//   ?token=<ADMIN_TOKEN>            (or Authorization: Bearer <ADMIN_TOKEN>)
//   &days=90                        how far back to scan (default 90, max 365)
//   &action=report|repair           default `report` (read-only)
//
//   action=report → every PI with the number of successful charges Stripe
//                   recorded, the amount collected, and the open (still
//                   confirmable) intents per PI.
//
//   action=repair → additionally:
//                   * writes the missing `payments` rows for successful
//                     charges, so the ledger becomes truthful;
//                   * cancels the intents that are still open on a PI that
//                     was already paid — those are the ones that can turn
//                     into a SECOND charge tomorrow.
//
// Auth: ADMIN_TOKEN must exist as an environment variable. The endpoint
// fails closed when it is missing — there is no default and no bypass.

import { listPaymentIntents, cancelPaymentIntent } from "../../lib/stripe";
import { normalizeSupabaseUrl } from "../_utils";
import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  STRIPE_SECRET_KEY: string;
  ADMIN_TOKEN?: string;
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders });
}

export const onRequestOptions = async () =>
  new Response(null, { status: 204, headers: corsHeaders });

/**
 * Length-independent string comparison. Not a substitute for a real
 * secret manager, but it keeps the token check from leaking its length
 * through response timing.
 */
function tokenMatches(provided: string, expected: string): boolean {
  if (provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

function readToken(
  request: { headers: { get(name: string): string | null } },
  url: URL,
): string | null {
  const header = request.headers.get("Authorization") ?? "";
  if (header.toLowerCase().startsWith("bearer ")) {
    return header.slice(7).trim();
  }
  return url.searchParams.get("token");
}

// ── data shapes ──────────────────────────────────────────────────

interface StripeIntentLite {
  id: string;
  status: string;
  amount: number;
  amount_received?: number;
  currency: string;
  created?: number;
  metadata?: Record<string, string>;
  latest_charge?: string;
}

interface IntentSummary {
  id: string;
  amount: number;
  amount_received: number;
  created?: number;
  charge: string | null;
}

interface OpenIntentSummary {
  id: string;
  status: string;
  amount: number;
  created?: number;
}

interface PiEntry {
  pi_number: string;
  pi_id: number | string | null;
  customer_name: string | null;
  customer_email: string | null;
  currency: string | null;
  invoice_cents: number | null;
  collected_cents: number;
  overcharged_cents: number | null;
  succeeded_intents: IntentSummary[];
  open_intents: OpenIntentSummary[];
  ledger_amount_paid_cents: number | null;
  pi_status: string | null;
}

interface PiRow {
  id: number | string;
  pi_number: string;
  status: string | null;
  total_cents?: number | null;
  amount_due_cents?: number | null;
  amount_paid_cents?: number | null;
  currency?: string | null;
  customer_name?: string | null;
  customer_email?: string | null;
  stripe_payment_intent_id?: string | null;
}

const OPEN_STATUSES = new Set([
  "requires_payment_method",
  "requires_confirmation",
  "requires_action",
  "processing",
]);

// payments.payment_site has a CHECK constraint limited to the known site
// slugs (see migrations/20261001_r77_payment_site.sql). Writing an
// arbitrary metadata value would fail the INSERT, so resolve it here.
const ALLOWED_SITE_SLUGS: ReadonlySet<string> = new Set(["sublimapparel"]);
const DEFAULT_SITE_SLUG = "sublimapparel";

function resolveSiteSlug(input: unknown): string {
  if (typeof input !== "string" || input.length === 0) return DEFAULT_SITE_SLUG;
  return ALLOWED_SITE_SLUGS.has(input) ? input : DEFAULT_SITE_SLUG;
}

export const onRequestGet = async (
  context: EventContext<Env, string, Record<string, unknown>>,
): Promise<Response> => handle(context);

export const onRequestPost = async (
  context: EventContext<Env, string, Record<string, unknown>>,
): Promise<Response> => handle(context);

async function handle(
  context: EventContext<Env, string, Record<string, unknown>>,
): Promise<Response> {
  const { request, env } = context;
  const url = new URL(request.url);

  // ── auth ───────────────────────────────────────────────────────
  if (!env.ADMIN_TOKEN) {
    return json(
      {
        error:
          "ADMIN_TOKEN is not configured on this deployment. Add it as a Cloudflare Pages environment variable to use this endpoint.",
      },
      403,
    );
  }
  const provided = readToken(request, url);
  if (!provided || !tokenMatches(provided, env.ADMIN_TOKEN)) {
    return json({ error: "Unauthorized" }, 403);
  }

  if (!env.STRIPE_SECRET_KEY) {
    return json({ error: "Stripe is not configured on the server" }, 500);
  }
  if (!env.COZE_SUPABASE_URL || !env.COZE_SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: "Supabase credentials not configured" }, 500);
  }

  const action = (url.searchParams.get("action") ?? "report").toLowerCase();
  const daysParam = parseInt(url.searchParams.get("days") ?? "90", 10);
  const days = Number.isFinite(daysParam)
    ? Math.min(365, Math.max(1, daysParam))
    : 90;
  const since = Math.floor((Date.now() - days * 86400_000) / 1000);

  const supabaseUrl = normalizeSupabaseUrl(env.COZE_SUPABASE_URL);

  // ── 1. ask Stripe which intents exist ──────────────────────────
  let intents: StripeIntentLite[];
  try {
    intents = await listPaymentIntents(env.STRIPE_SECRET_KEY, {
      createdGte: since,
      limit: 100,
      maxPages: 20,
    });
  } catch (err: any) {
    console.error("[payment-reconciliation] Stripe list failed:", err);
    return json(
      { error: `Stripe list failed: ${err?.message ?? "unknown"}` },
      500,
    );
  }

  // Only the PI flows carry pi_number; the scenario flows (sample fee,
  // inquiry deposit, bulk deposit) have their own invoice reference.
  const piIntents = intents.filter((i) => !!i.metadata?.pi_number);

  // ── 2. group by PI ─────────────────────────────────────────────
  const byPi = new Map<string, StripeIntentLite[]>();
  for (const intent of piIntents) {
    const key = intent.metadata!.pi_number;
    const list = byPi.get(key);
    if (list) list.push(intent);
    else byPi.set(key, [intent]);
  }

  // ── 3. the invoice each PI refers to ───────────────────────────
  const piNumbers = Array.from(byPi.keys());
  const piRows = piNumbers.length
    ? await fetchPiRows(supabaseUrl, env, piNumbers)
    : new Map<string, PiRow>();

  const duplicates: PiEntry[] = [];
  const singleCharges: PiEntry[] = [];
  const openSiblings: PiEntry[] = [];

  let repairedRows = 0;
  let canceledIntents = 0;

  for (const [piNumber, list] of byPi) {
    const succeeded = list.filter((i) => i.status === "succeeded");
    const open = list.filter((i) => OPEN_STATUSES.has(i.status));
    const pi = piRows.get(piNumber);
    const collectedCents = succeeded.reduce(
      (sum, i) => sum + (i.amount_received ?? i.amount),
      0,
    );
    const invoiceCents =
      (pi?.amount_due_cents ?? pi?.total_cents ?? null) as number | null;

    const entry = {
      pi_number: piNumber,
      pi_id: pi?.id ?? null,
      customer_name: pi?.customer_name ?? null,
      customer_email: pi?.customer_email ?? null,
      currency: succeeded[0]?.currency ?? pi?.currency ?? null,
      invoice_cents: invoiceCents,
      collected_cents: collectedCents,
      overcharged_cents:
        invoiceCents !== null ? collectedCents - invoiceCents : null,
      succeeded_intents: succeeded.map((i) => ({
        id: i.id,
        amount: i.amount,
        amount_received: i.amount_received ?? i.amount,
        created: i.created,
        charge: i.latest_charge ?? null,
      })),
      open_intents: open.map((i) => ({
        id: i.id,
        status: i.status,
        amount: i.amount,
        created: i.created,
      })),
      ledger_amount_paid_cents: pi?.amount_paid_cents ?? null,
      pi_status: pi?.status ?? null,
    };

    if (succeeded.length > 1) {
      duplicates.push(entry);
    } else {
      singleCharges.push(entry);
    }

    if (open.length > 0) {
      openSiblings.push(entry);
    }

    // ── 4. optional repair ───────────────────────────────────────
    if (action === "repair") {
      // The ledger has to know about every charge that actually landed.
      for (const intent of succeeded) {
        const inserted = await ensurePaymentRow(
          env,
          supabaseUrl,
          intent,
          pi,
          piNumber,
        );
        if (inserted) repairedRows++;
      }

      // An intent that is still open on an already-paid invoice is a live
      // double-charge: whoever holds its client_secret can still pay it.
      if (succeeded.length > 0) {
        for (const intent of open) {
          try {
            await cancelPaymentIntent(env.STRIPE_SECRET_KEY, intent.id);
            canceledIntents++;
            await markPaymentCanceled(env, supabaseUrl, intent.id);
          } catch (err) {
            console.error(
              `[payment-reconciliation] could not cancel ${intent.id}:`,
              err,
            );
          }
        }
      }
    }
  }

  duplicates.sort(
    (a, b) => Number(b.collected_cents) - Number(a.collected_cents),
  );
  openSiblings.sort(
    (a, b) => Number(b.open_intents?.length) - Number(a.open_intents?.length),
  );

  return json({
    action,
    window_days: days,
    scanned_intents: intents.length,
    pi_intents: piIntents.length,
    pi_count: byPi.size,
    duplicates,
    open_sibling_intents: openSiblings,
    repair: {
      payment_rows_inserted: repairedRows,
      intents_canceled: canceledIntents,
    },
    hint:
      "duplicates = invoices Stripe charged more than once. Refund collected_cents - invoice_cents on each row.",
  });
}

// ── helpers ──────────────────────────────────────────────────────

async function fetchPiRows(
  supabaseUrl: string,
  env: Env,
  piNumbers: string[],
): Promise<Map<string, PiRow>> {
  const out = new Map<string, PiRow>();
  // PostgREST `in` filters are capped; 50 per request is safe.
  for (let i = 0; i < piNumbers.length; i += 50) {
    const chunk = piNumbers.slice(i, i + 50);
    const qs = new URLSearchParams({
      select:
        "id,pi_number,status,total_cents,amount_due_cents,amount_paid_cents,currency,customer_name,customer_email,stripe_payment_intent_id",
      pi_number: `in.(${chunk.join(",")})`,
    });
    const res = await fetch(`${supabaseUrl}/rest/v1/proforma_invoices?${qs}`, {
      headers: {
        apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
      },
    });
    if (!res.ok) {
      console.warn(
        `[payment-reconciliation] PI query failed: ${res.status} ${await res.text()}`,
      );
      continue;
    }
    const rows = (await res.json()) as PiRow[];
    for (const row of rows) out.set(row.pi_number, row);
  }
  return out;
}

async function ensurePaymentRow(
  env: Env,
  supabaseUrl: string,
  intent: StripeIntentLite,
  pi: PiRow | undefined,
  piNumber: string,
): Promise<boolean> {
  const headers = {
    "Content-Type": "application/json",
    apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
  };

  const existsRes = await fetch(
    `${supabaseUrl}/rest/v1/payments?stripe_payment_intent_id=eq.${encodeURIComponent(intent.id)}&select=stripe_payment_intent_id&limit=1`,
    { headers },
  );
  if (existsRes.ok) {
    const existing = (await existsRes.json()) as unknown[];
    if (existing.length > 0) return false;
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/payments`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({
      stripe_payment_intent_id: intent.id,
      scenario: "pi_payment",
      status: "succeeded",
      amount_cents: intent.amount_received ?? intent.amount,
      currency: intent.currency,
      customer_name: pi?.customer_name ?? null,
      customer_email: pi?.customer_email ?? null,
      // The webhook's sibling query filters with pi_id=eq.<pi_number-id>,
      // and every other writer stores it as text. Keep it a string so the
      // duplicate detection can find these rows.
      pi_id: pi?.id != null ? String(pi.id) : null,
      metadata: {
        ...(intent.metadata ?? {}),
        pi_number: piNumber,
        stripe_charge_id: intent.latest_charge ?? null,
        reconciled_at: new Date().toISOString(),
      },
      payment_site: resolveSiteSlug(intent.metadata?.site_slug),
      paid_at: intent.created
        ? new Date(intent.created * 1000).toISOString()
        : new Date().toISOString(),
    }),
  });
  if (!res.ok) {
    console.error(
      `[payment-reconciliation] payments INSERT failed for ${intent.id}: ${res.status} ${await res.text()}`,
    );
    return false;
  }
  return true;
}

async function markPaymentCanceled(
  env: Env,
  supabaseUrl: string,
  intentId: string,
): Promise<void> {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/payments?stripe_payment_intent_id=eq.${encodeURIComponent(intentId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        status: "canceled",
        last_error:
          "Canceled during R124 reconciliation: this invoice was already paid by another PaymentIntent",
      }),
    },
  );
  if (!res.ok) {
    console.warn(
      `[payment-reconciliation] could not mark ${intentId} canceled: ${res.status} ${await res.text()}`,
    );
  }
}
