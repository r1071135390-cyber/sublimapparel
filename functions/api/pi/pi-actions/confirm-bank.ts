/**
 * Shared handler for POST /api/pi/{pi_number}/confirm-bank
 *
 * Customer confirms they have initiated a bank wire transfer (T/T).
 * Updates PI status to 'pending_bank' so the factory knows to watch for the wire.
 *
 * Body:
 *   {
 *     bank_reference?: string,   // SWIFT MT103 / wire reference number
 *     bank_notes?: string,       // optional: which bank, send date, etc.
 *     customer_name?: string,    // for audit trail
 *     pi_number?: string,        // required if not in path
 *   }
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
  const lookupUrl = `${env.COZE_SUPABASE_URL}/rest/v1/proforma_invoices?pi_number=eq.${encodeURIComponent(piNumber)}&select=id,status,customer_name,customer_email`;

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
      bank_reference: body.bank_reference ?? null,
      bank_notes: body.bank_notes ?? null,
    }),
  });

  if (!updateRes.ok) {
    const errText = await updateRes.text();
    console.error(`[confirm-bank] Supabase update failed: ${errText}`);
    return json({ error: "Database update failed" }, 500);
  }

  console.log(`[confirm-bank] PI ${piNumber} marked as pending_bank`);

  // 3. TODO: Send notification email to factory (Chris Ma)
  // This will be added in a future iteration when the notification service is set up.

  return json({
    ok: true,
    pi_number: piNumber,
    status: "pending_bank",
    message:
      "Bank transfer confirmation recorded. The factory will verify the wire and confirm your order.",
  });
}

export const CONFIRM_BANK_CORS_HEADERS = CORS_HEADERS;