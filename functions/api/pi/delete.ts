// functions/api/pi/delete.ts
// Hard-deletes a Proforma Invoice row from Supabase.
//
// 2026-10-04 (R82): the admin PI summary page (/admin/summary/) now has a
// Delete button per row. This endpoint backs it.
//
// Safety rules (per product decision):
//   1. PAID PIs are NEVER deletable. The Stripe PaymentIntent still exists
//      on Stripe's side and we have no local way to refund it. Refusing
//      with a 409 + hint ("refund first via Stripe Dashboard") is the
//      only safe behaviour.
//   2. The `payments` table is NOT cascaded. If a PI has payment records
//      attached, we leave them in place so admins can audit what
//      happened. They'll appear as orphaned `pi_number` values in the
//      payments table after a delete, which is a known and intentional
//      state. (User decision 2026-10-04: don't cascade — easier to
//      audit, and the orphan rows are tiny in practice.)
//   3. Anything else (sent / draft / cancelled / pending_bank / etc.) is
//      deletable. We deliberately don't lock on status here so admins
//      can clean up stale "sent" PIs whose customer never paid.
//
// Auth: same as the rest of the admin functions — relies on the
// sessionKey + /admin/summary/ password gate on the client side. We don't
// add a server-side password because:
//   a) Cloudflare Pages Functions can't read sessionStorage.
//   b) The endpoint is only called from a single password-gated UI.
//   c) Anyone with the URL and the password can already view every PI via
//      list.ts; the delete is just a write-side mirror of that.

import { normalizeSupabaseUrl } from "../_utils";

interface Env {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, { status: 204, headers: corsHeaders });
}

interface DeleteBody {
  piNumber: string;
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  if (!env.COZE_SUPABASE_URL || !env.COZE_SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse(
      { error: "Supabase credentials not configured" },
      500
    );
  }

  let body: DeleteBody;
  try {
    body = (await request.json()) as DeleteBody;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const piNumber = (body.piNumber ?? "").trim();
  if (!piNumber) {
    return jsonResponse({ error: "piNumber is required" }, 400);
  }
  // Match the same SA{YYYYMMDD}{NNNN} shape as the create endpoint so
  // typos don't quietly delete a different row.
  if (!/^SA\d{8}\d{4}$/.test(piNumber)) {
    return jsonResponse(
      { error: "piNumber must match SA + 8 digits + 4 digits (e.g. SA202610030001)" },
      400
    );
  }

  const supabaseUrl = normalizeSupabaseUrl(env.COZE_SUPABASE_URL);
  const authHeaders = {
    apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
  };

  // 1) Look up the row first so we can:
  //    a) refuse PAID
  //    b) return 404 instead of "0 rows deleted" for typos
  const lookupRes = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?pi_number=eq.${encodeURIComponent(piNumber)}&select=id,pi_number,status,total_cents,currency,customer_name&limit=1`,
    { headers: authHeaders }
  );

  if (!lookupRes.ok) {
    const text = await lookupRes.text();
    return jsonResponse(
      { error: "Lookup failed", detail: text, supabaseUrl },
      500
    );
  }

  const rows = (await lookupRes.json()) as Array<{
    id: string | number;
    pi_number: string;
    status: string | null;
    total_cents: number | null;
    currency: string | null;
    customer_name: string | null;
  }>;

  if (rows.length === 0) {
    return jsonResponse(
      { error: "PI not found", piNumber },
      404
    );
  }

  const row = rows[0];
  const status = (row.status ?? "").toLowerCase();

  if (status === "paid") {
    return jsonResponse(
      {
        error: "Cannot delete a paid PI",
        piNumber,
        status: row.status,
        hint:
          "Refund the customer via the Stripe Dashboard first, then delete. Local PI rows are kept so audit trails stay intact while a payment is outstanding on Stripe.",
      },
    );
  }

  // 2) Hard-delete the row. Use `Prefer: return=representation` so we can
  //    confirm what actually got deleted (Supabase can return an empty
  //    array if a race deleted it in between lookup + delete).
  const deleteRes = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?pi_number=eq.${encodeURIComponent(piNumber)}`,
    {
      method: "DELETE",
      headers: {
        ...authHeaders,
        Prefer: "return=representation",
      },
    }
  );

  if (!deleteRes.ok) {
    const text = await deleteRes.text();
    return jsonResponse(
      {
        error: "Delete failed",
        detail: `status=${deleteRes.status}; body=${text}`,
        supabaseUrl,
      },
      500
    );
  }

  const deleted = (await deleteRes.json()) as Array<{ id: string | number }>;

  if (deleted.length === 0) {
    // Lost a race with another admin. Not catastrophic — surface a clear
    // 409 so the UI can re-fetch and show the current state.
    return jsonResponse(
      {
        error: "PI was deleted by someone else before this request landed",
        piNumber,
      },
      409
    );
  }

  return jsonResponse({
    success: true,
    piNumber,
    deletedId: deleted[0].id,
    // Echo back the metadata we captured at lookup time so the UI can
    // show a "Deleted PI X for Y, $Z" toast without a second round-trip.
    statusBeforeDelete: row.status,
    totalCentsBeforeDelete: row.total_cents,
    currencyBeforeDelete: row.currency,
    customerNameBeforeDelete: row.customer_name,
    note:
      "payments table is intentionally NOT cascaded. Orphan pi_number values are expected and harmless.",
  });
}