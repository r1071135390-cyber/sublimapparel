// functions/api/_admin/check-payments-list.ts
// TEMPORARY admin debug endpoint to verify the `payments` table
// contents after a R78 end-to-end Stripe payment.
//
// DELETE this file once R78 verification is complete — it's only here
// because /api/pi/list/ only returns proforma_invoices and we wanted
// to confirm the webhook also wrote the payments row.

import { normalizeSupabaseUrl } from "../_utils";

interface Env {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
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

export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { env, request } = context;

  if (!env.COZE_SUPABASE_URL || !env.COZE_SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse(
      { error: "Supabase credentials not configured" },
      500,
    );
  }

  const supabaseUrl = normalizeSupabaseUrl(env.COZE_SUPABASE_URL);
  const headers = {
    apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY`,
  };

  const url = new URL(request.url);
  const action = url.searchParams.get("action");
  console.log(`[check-payments-list] request.url=${request.url} action=${action}`);

  // Always return debug info at top level for easy inspection.
  // TEMP backfill — insert pending payments rows for any PI that has a
  // stripe_payment_intent_id but no matching payments row. Idempotent.
  if (action === "backfill") {
    const piRes = await fetch(
      `${supabaseUrl}/rest/v1/proforma_invoices?select=id,pi_number,stripe_payment_intent_id,amount_due_cents,total_cents,currency,customer_name,customer_email,payment_site,status&status=eq.paid&stripe_payment_intent_id=not.is.null&limit=50`,
      { headers },
    );
    if (!piRes.ok) {
      const text = await piRes.text();
      return jsonResponse({ error: "PI query failed", detail: text }, 500);
    }
    const piRows = (await piRes.json()) as Array<Record<string, unknown>>;
    const inserts: Array<Record<string, unknown>> = [];
    for (const pi of piRows) {
      const piStripeId = pi.stripe_payment_intent_id as string;
      // check if payments row already exists
      const existsRes = await fetch(
        `${supabaseUrl}/rest/v1/payments?stripe_payment_intent_id=eq.${encodeURIComponent(piStripeId)}&limit=1`,
        { headers },
      );
      const existsRows = existsRes.ok
        ? ((await existsRes.json()) as unknown[])
        : [];
      if (existsRows.length > 0) continue;

      inserts.push({
        stripe_payment_intent_id: piStripeId,
        scenario: "pi_payment",
        status: pi.status === "paid" ? "succeeded" : "pending",
        amount_cents:
          (pi.amount_due_cents as number | null) ??
          (pi.total_cents as number | null) ??
          0,
        currency: ((pi.currency as string | null) ?? "USD").toLowerCase(),
        customer_name: pi.customer_name ?? null,
        customer_email: pi.customer_email ?? null,
        pi_id: String(pi.id),
        metadata: {
          pi_number: pi.pi_number,
          backfilled: true,
          backfilled_at: new Date().toISOString(),
        },
        payment_site: (pi.payment_site as string | null) ?? "sublimapparel",
        paid_at:
          pi.status === "paid" ? new Date().toISOString() : null,
      });
    }

    if (inserts.length > 0) {
      const ins = await fetch(`${supabaseUrl}/rest/v1/payments`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(inserts),
      });
      if (!ins.ok) {
        const text = await ins.text();
        return jsonResponse(
          { error: "insert failed", detail: text, attempted: inserts.length },
          500,
        );
      }
    }
    return jsonResponse({
      ok: true,
      scanned: piRows.length,
      inserted: inserts.length,
      inserts,
    });
  }

  const res = await fetch(
    `${supabaseUrl}/rest/v1/payments?select=*&order=created_at.desc&limit=20`,
    { headers },
  );

  if (!res.ok) {
    const text = await res.text();
    return jsonResponse({ error: "Supabase query failed", detail: text }, 500);
  }

  const rows = (await res.json()) as Array<Record<string, unknown>>;
  return jsonResponse({ count: rows.length, payments: rows });
}