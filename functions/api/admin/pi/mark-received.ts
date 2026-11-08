// functions/api/admin/pi/mark-received.ts
//
// 2026-11-08 (R133): register a payment that arrived OUTSIDE Stripe.
//
// Why this exists
// ---------------
// R133 split the PI amount into three independent numbers:
//
//   total_cents       the FULL contract value — always what the PI document
//                     shows on its Total line
//   amount_due_cents  what we are still asking the customer for
//   amount_paid_cents what has actually been collected so far
//
// Stripe maintains those numbers for card payments: the webhook adds the
// received amount to amount_paid_cents and rewrites amount_due_cents as
// "total − collected".
//
// A wire transfer (T/T) never touches Stripe, so nothing maintained them.
// The customer-side endpoint /api/pi/{pi_number}/confirm-bank only flips
// the status to 'pending_bank' — it records that the customer SAYS they
// have sent the money, not that the money arrived. Until somebody tells
// the system that the wire actually landed, amount_paid_cents stays 0 and
// amount_due_cents stays frozen at the deposit amount, so the balance can
// never be collected.
//
// Until now the only way out was to hand-edit the row in the Supabase
// Dashboard and set status='paid' by hand — which also did NOT set
// amount_paid_cents, so the instalment maths stayed broken.
//
// This endpoint is the missing writer.
//
// POST /api/admin/pi/mark-received
//   Authorization: Bearer <admin token>
//
//   {
//     piNumber: "SA20261108-0001",
//     amountCents: 300000,          // REQUIRED — integer, minor units
//     currency?: "USD",              // optional — must match the PI
//     reference?: "MT103-88213",     // optional — the wire reference
//     notes?: "paid via OCBC",      // optional — free-text audit note
//     receivedAt?: "2026-11-08T10:00:00.000Z"  // optional — when it landed
//   }
//
// What it does
// ------------
//   1. Reads the PI and computes the new instalment position.
//   2. Writes a ledger row into `payments` with method='bank_transfer' and
//      stripe_payment_intent_id = NULL. NULL is deliberate:
//        * sumSucceededAmounts() in the Stripe webhook counts it, so a
//          deposit paid by wire + a balance paid by card add up correctly;
//        * v_duplicate_pi_payments filters on `stripe_payment_intent_id IS
//          NOT NULL`, so a wire receipt never shows up as a double charge;
//        * flagDuplicateCharge() only considers rows that HAVE an intent
//          id, so it never mistakes a wire receipt for a second charge.
//   3. Updates the PI: amount_paid_cents, amount_due_cents, and the
//      status ('paid' when the invoice is settled, 'partially_paid'
//      otherwise). paid_at is written only when the invoice is settled.
//
// Auth: owner only. This endpoint moves money state, which the admin
// roster reserves for the owner (same rule as editing the bank accounts
// and deleting invoices).

import { normalizeSupabaseUrl } from "../../_utils";
import { requireRole } from "../../_admin-auth";
import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  ADMIN_TOKEN?: string;
  OWNER_PASSWORD_HASH?: string;
  ADMIN_USERS?: string;
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders });
}

export const onRequestOptions = async () =>
  new Response(null, { status: 204, headers: corsHeaders });

interface MarkReceivedBody {
  piNumber?: string;
  amountCents?: number;
  currency?: string;
  reference?: string;
  notes?: string;
  receivedAt?: string;
}

interface PiRow {
  id: number | string;
  pi_number: string;
  status: string | null;
  total_cents: number | null;
  amount_due_cents: number | null;
  amount_paid_cents: number | null;
  currency: string | null;
  customer_name: string | null;
  customer_email: string | null;
}

export const onRequestPost = async (
  context: EventContext<Env, string, Record<string, unknown>>,
): Promise<Response> => {
  const { request, env } = context;
  const url = new URL(request.url);

  // ── auth ───────────────────────────────────────────────────────
  // Money state is owner-only.
  const guard = requireRole(request, url, env, "owner");
  if (guard) return guard;

  if (!env.COZE_SUPABASE_URL || !env.COZE_SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: "Supabase credentials not configured" }, 500);
  }

  // ── body ───────────────────────────────────────────────────────
  let body: MarkReceivedBody;
  try {
    body = (await request.json()) as MarkReceivedBody;
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const piNumber = typeof body.piNumber === "string" ? body.piNumber.trim() : "";
  if (!piNumber) {
    return json({ error: "piNumber is required" }, 400);
  }

  const amountCents = Number(body.amountCents);
  if (!Number.isFinite(amountCents) || !Number.isInteger(amountCents)) {
    return json({ error: "amountCents must be an integer (minor units)" }, 400);
  }
  if (amountCents <= 0) {
    return json({ error: "amountCents must be greater than zero" }, 400);
  }

  const supabaseUrl = normalizeSupabaseUrl(env.COZE_SUPABASE_URL);
  const headers = {
    "Content-Type": "application/json",
    apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
  };

  // ── 1. read the PI ─────────────────────────────────────────────
  const lookupUrl =
    `${supabaseUrl}/rest/v1/proforma_invoices?pi_number=eq.${encodeURIComponent(piNumber)}` +
    `&select=id,pi_number,status,total_cents,amount_due_cents,amount_paid_cents,currency,customer_name,customer_email&limit=1`;

  const lookupRes = await fetch(lookupUrl, { headers });
  if (!lookupRes.ok) {
    const detail = await lookupRes.text();
    console.error(`[mark-received] PI lookup failed: ${lookupRes.status} ${detail}`);
    return json({ error: "Database lookup failed" }, 500);
  }

  const rows = (await lookupRes.json()) as PiRow[];
  const pi = rows[0];
  if (!pi) {
    return json({ error: `PI ${piNumber} not found` }, 404);
  }

  const status = (pi.status ?? "").toLowerCase();
  if (status === "canceled" || status === "cancelled" || status === "expired") {
    return json(
      { error: `PI ${piNumber} is ${status} and cannot receive a payment` },
      400,
    );
  }

  // The invoice value is the FULL contract total. amount_due_cents is
  // only the current instalment, so it cannot be used to tell whether the
  // invoice is settled.
  const totalCents = Number(pi.total_cents ?? pi.amount_due_cents ?? 0);
  if (!Number.isFinite(totalCents) || totalCents <= 0) {
    return json(
      { error: `PI ${piNumber} has no amount recorded, so a receipt cannot be matched to it` },
      400,
    );
  }

  const alreadyPaid = Number(pi.amount_paid_cents ?? 0) || 0;
  const remaining = totalCents - alreadyPaid;
  if (remaining <= 0) {
    return json(
      { error: `PI ${piNumber} is already fully paid` },
      400,
    );
  }
  if (amountCents > remaining) {
    return json(
      {
        error: `amountCents exceeds the remaining balance of PI ${piNumber}`,
        remaining_cents: remaining,
        total_cents: totalCents,
        amount_paid_cents: alreadyPaid,
      },
      400,
    );
  }

  const piCurrency = (pi.currency ?? "USD").toUpperCase();
  if (typeof body.currency === "string" && body.currency.trim()) {
    const wanted = body.currency.trim().toUpperCase();
    if (wanted !== piCurrency) {
      return json(
        { error: `Currency mismatch: PI ${piNumber} is in ${piCurrency}, not ${wanted}` },
        400,
      );
    }
  }

  // ── 2. write the ledger row FIRST ──────────────────────────────
  // If the ledger write fails we bail out before touching the PI, so the
  // two never disagree.
  const receivedAt =
    typeof body.receivedAt === "string" && body.receivedAt.trim()
      ? body.receivedAt.trim()
      : new Date().toISOString();

  const paymentInsert = await fetch(`${supabaseUrl}/rest/v1/payments`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({
      // NULL on purpose — see the file header.
      stripe_payment_intent_id: null,
      scenario: "pi_payment",
      status: "succeeded",
      amount_cents: amountCents,
      currency: piCurrency.toLowerCase(),
      customer_name: pi.customer_name ?? null,
      customer_email: pi.customer_email ?? null,
      // Every other writer stores pi_id as text; keep it a string so the
      // webhook's pi_id=eq.<id> filter finds this row.
      pi_id: String(pi.id),
      metadata: {
        pi_number: pi.pi_number,
        method: "bank_transfer",
        reference: typeof body.reference === "string" ? body.reference.trim() : null,
        notes: typeof body.notes === "string" ? body.notes.trim() : null,
        recorded_by: "admin",
        recorded_at: new Date().toISOString(),
      },
      payment_site: "sublimapparel",
      paid_at: receivedAt,
    }),
  });
  if (!paymentInsert.ok) {
    const detail = await paymentInsert.text();
    console.error(
      `[mark-received] payments INSERT failed for PI ${piNumber}: ${paymentInsert.status} ${detail}`,
    );
    return json(
      { error: "Could not write the payment record", detail: detail.slice(0, 300) },
      500,
    );
  }

  // ── 3. update the PI ───────────────────────────────────────────
  const newPaid = alreadyPaid + amountCents;
  const newDue = Math.max(0, totalCents - newPaid);
  const settled = newPaid >= totalCents;

  const piPatch: Record<string, unknown> = {
    amount_paid_cents: newPaid,
    amount_due_cents: newDue,
    status: settled ? "paid" : "partially_paid",
  };
  if (settled) {
    piPatch.paid_at = receivedAt;
  }

  const piUpdate = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?id=eq.${encodeURIComponent(String(pi.id))}`,
    {
      method: "PATCH",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify(piPatch),
    },
  );
  if (!piUpdate.ok) {
    const detail = await piUpdate.text();
    console.error(
      `[mark-received] PI update failed for ${piNumber}: ${piUpdate.status} ${detail}`,
    );
    return json(
      {
        error:
          "The payment was recorded in the ledger but the PI could not be updated. Run the payment reconciliation to fix the invoice.",
        detail: detail.slice(0, 300),
      },
      500,
    );
  }

  console.log(
    `[mark-received] PI ${piNumber}: received ${amountCents} cents (${piCurrency}), ` +
      `collected ${newPaid}/${totalCents}, balance ${newDue}, status ${settled ? "paid" : "partially_paid"}`,
  );

  return json({
    ok: true,
    pi_number: pi.pi_number,
    received_cents: amountCents,
    amount_paid_cents: newPaid,
    amount_due_cents: newDue,
    total_cents: totalCents,
    currency: piCurrency,
    status: settled ? "paid" : "partially_paid",
    settled,
  });
};
