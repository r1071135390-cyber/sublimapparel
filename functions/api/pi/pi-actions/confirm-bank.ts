/**
 * Shared handler for POST /api/pi/{pi_number}/confirm-bank
 *
 * Customer confirms they have initiated a bank wire transfer (T/T).
 * Updates PI status to 'pending_bank' so the factory knows to watch for the wire.
 *
 * Body:
 *   {
 *     wire_reference?: string,   // SWIFT MT103 / wire reference number
 *     bank_reference?: string,   // legacy alias for wire_reference
 *     amount_sent?: number,      // MAJOR units (e.g. 3000.00) the customer says they sent
 *     currency?: string,         // currency of the transfer
 *     bank_notes?: string,       // optional: which bank, send date, etc.
 *     customer_name?: string,    // for audit trail
 *     pi_number?: string,        // required if not in path
 *   }
 *
 * 2026-11-08 (R133): the /pay/ page has always sent `wire_reference`,
 * `amount_sent` and `currency` — but this handler only knew about
 * `bank_reference` and silently dropped all three. Finance therefore
 * never saw the reference number the customer gave them, nor the amount
 * they declared they had sent, even though the customer-side screen
 * asked for both. The declared amount is now recorded in bank_notes so
 * it can be cross-checked against the bank statement when the wire
 * actually lands (see /api/admin/pi/mark-received).
 *
 * Returns: { ok: true, pi_number, status: "pending_bank" }
 *
 * 2026-10-04 (R86): refactored handleConfirmBank to take `{ request: any;
 * env: any }` instead of a wrapper interface. The wrapper approach failed
 * `next build`'s tsc pass because the Cloudflare-flavored EventContext
 * `request` type (`Request<unknown, IncomingRequestCfProperties<unknown>>`)
 * and the standard lib.dom `Request` are NOT structurally assignable —
 * even with `request: any` on our wrapper, `next build` still insisted on
 * comparing the property shape and complained. Passing the two fields
 * separately sidesteps the entire structural check; the function only
 * ever calls `await request.json()` and reads `env.COZE_SUPABASE_URL` /
 * `env.COZE_SUPABASE_SERVICE_ROLE_KEY`, so we don't need any structural
 * type info.
 *
 * Note: This does NOT mark the PI as fully paid. The factory must verify
 * the wire in their bank account and then mark the PI as 'paid' via
 * the admin page (future endpoint) or directly in Supabase Dashboard.
 */

interface ConfirmBankEnv {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: CORS_HEADERS });
}

interface ConfirmBankBody {
  pi_number?: string;
  bank_reference?: string;
  // 2026-11-08 (R133): what the /pay/ page actually sends.
  wire_reference?: string;
  amount_sent?: number;
  currency?: string;
  bank_notes?: string;
  customer_name?: string;
}

export async function handleConfirmBank(args: {
  request: any;
  env: any;
}): Promise<Response> {
  const request = args.request;
  const env = args.env as ConfirmBankEnv;

  let body: ConfirmBankBody;
  try {
    body = (await request.json()) as ConfirmBankBody;
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const piNumber = body.pi_number;
  if (!piNumber) {
    return json({ error: "pi_number is required in body" }, 400);
  }

  // 1. Verify PI exists and is in a state that allows bank confirmation
  const lookupUrl = `${env.COZE_SUPABASE_URL}/rest/v1/proforma_invoices?pi_number=eq.${encodeURIComponent(piNumber)}&select=id,status,customer_name,customer_email,bank_reference,bank_notes,amount_due_cents,total_cents,currency`;

  const lookupRes = await fetch(lookupUrl, {
    headers: {
      apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });

  if (!lookupRes.ok) {
    return json({ error: "Database lookup failed" }, 500);
  }

  const records = (await lookupRes.json()) as Array<{
    id: string;
    status: string;
    customer_name: string;
    customer_email: string | null;
    bank_reference: string | null;
    bank_notes: string | null;
    amount_due_cents: number | null;
    total_cents: number | null;
    currency: string | null;
  }>;

  if (records.length === 0) {
    return json({ error: "PI not found" }, 404);
  }

  const pi = records[0];

  if (pi.status === "paid") {
    return json({ error: "PI is already fully paid" }, 400);
  }

  if (pi.status === "canceled" || pi.status === "expired") {
    return json({ error: `PI is ${pi.status}, cannot accept payment` }, 400);
  }

  // 2. Update PI to pending_bank
  const updateUrl = `${env.COZE_SUPABASE_URL}/rest/v1/proforma_invoices?id=eq.${pi.id}`;

  // 2026-11-08 (R133): keep what is already on the row unless the customer
  // sent a new value. The old code wrote `null` for every missing field,
  // so a second confirmation wiped the reference number of the first one.
  const reference =
    (typeof body.wire_reference === "string" && body.wire_reference.trim()) ||
    (typeof body.bank_reference === "string" && body.bank_reference.trim()) ||
    pi.bank_reference ||
    null;

  // The declared amount is what the customer SAYS they sent — it is not
  // proof of payment, but it is what finance reconciles the bank
  // statement against, so it is written next to the reference.
  const declaredAmount = Number(body.amount_sent);
  const declaredCents =
    Number.isFinite(declaredAmount) && declaredAmount > 0
      ? Math.round(declaredAmount * 100)
      : null;
  const declaredCurrency =
    typeof body.currency === "string" && body.currency.trim()
      ? body.currency.trim().toUpperCase()
      : (pi.currency ?? "USD").toUpperCase();

  const noteLines: string[] = [];
  const existingNotes = (pi.bank_notes ?? "").trim();
  if (existingNotes) noteLines.push(existingNotes);
  if (typeof body.bank_notes === "string" && body.bank_notes.trim()) {
    if (!existingNotes.includes(body.bank_notes.trim())) {
      noteLines.push(body.bank_notes.trim());
    }
  }
  if (declaredCents !== null) {
    noteLines.push(
      `Customer declared ${(declaredCents / 100).toFixed(2)} ${declaredCurrency} sent.`,
    );
  }
  const expectedCents = Number(pi.amount_due_cents ?? pi.total_cents ?? 0);
  if (Number.isFinite(expectedCents) && expectedCents > 0) {
    noteLines.push(
      `Amount requested at confirmation time: ${(expectedCents / 100).toFixed(2)} ${declaredCurrency}.`,
    );
  }
  const bankNotes = noteLines.length > 0 ? noteLines.join(" ") : null;

  const updateRes = await fetch(updateUrl, {
    method: "PATCH",
    headers: {
      apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "pending_bank",
      bank_confirmed_at: new Date().toISOString(),
      bank_confirmed_by: body.customer_name ?? pi.customer_name,
      bank_reference: reference,
      bank_notes: bankNotes,
    }),
  });

  if (!updateRes.ok) {
    const errText = await updateRes.text();
    console.error(`[confirm-bank] Supabase update failed: ${errText}`);
    return json({ error: "Database update failed" }, 500);
  }

  console.log(
    `[confirm-bank] PI ${piNumber} marked as pending_bank (reference=${reference ?? "-"}, declared=${declaredCents ?? "-"})`,
  );

  // 3. TODO: Send notification email to factory (Chris Ma)
  // This will be added in a future iteration when the notification service is set up.

  return json({
    ok: true,
    pi_number: piNumber,
    status: "pending_bank",
    wire_reference: reference,
    amount_sent_cents: declaredCents,
    currency: declaredCurrency,
    message:
      "Bank transfer confirmation recorded. The factory will verify the wire and confirm your order.",
  });
}

export const CONFIRM_BANK_CORS_HEADERS = CORS_HEADERS;