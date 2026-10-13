// functions/api/admin/customers/[id].ts
//
// 2026-10-13 (Phase C.1): Returns a single customer profile + their PI history.
// Used by /admin/customers/[id]/ (CustomerDetailClient).
//
// GET /api/admin/customers/[id]
//   Response: { customer: CustomerRow, pis: PiRow[] }
//   - customer: full profile row from `customers`
//   - pis: most recent 200 PIs from `proforma_invoices` where
//     customer_name (case-insensitive) matches the customer's name

import { normalizeSupabaseUrl } from "../../_utils";

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

interface CustomerRow {
  id: number | string;
  customer_name: string;
  company: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  pi_count: number | null;
  last_used_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface PiRow {
  id: number | string;
  pi_number: string;
  customer_name: string | null;
  customer_company: string | null;
  total_cents: number | null;
  currency: string | null;
  status: string | null;
  paid_at: string | null;
  created_at: string | null;
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
  params: { id?: string | string[] };
}): Promise<Response> {
  const { env, params } = context;

  if (!env.COZE_SUPABASE_URL || !env.COZE_SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse(
      { error: "Supabase credentials not configured" },
      500,
    );
  }

  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!rawId) {
    return jsonResponse({ error: "Missing customer id" }, 400);
  }

  const supabaseUrl = normalizeSupabaseUrl(env.COZE_SUPABASE_URL);
  const headers = {
    apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
  };

  const custRes = await fetch(
    `${supabaseUrl}/rest/v1/customers?id=eq.${encodeURIComponent(rawId)}` +
      `&select=id,customer_name,company,address,phone,email,pi_count,last_used_at,created_at,updated_at` +
      `&limit=1`,
    { headers },
  );

  if (!custRes.ok) {
    const text = await custRes.text();
    return jsonResponse(
      { error: "Customer query failed", detail: text },
      500,
    );
  }

  const custRows = (await custRes.json()) as CustomerRow[];
  if (custRows.length === 0) {
    return jsonResponse({ error: "Customer not found" }, 404);
  }
  const customer = custRows[0];

  const piRes = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices` +
      `?customer_name=ilike.${encodeURIComponent(customer.customer_name)}` +
      `&select=id,pi_number,customer_name,customer_company,total_cents,currency,status,paid_at,created_at` +
      `&order=created_at.desc` +
      `&limit=200`,
    { headers },
  );

  if (!piRes.ok) {
    const text = await piRes.text();
    return jsonResponse(
      { error: "PI query failed", detail: text },
      500,
    );
  }

  const piRows = (await piRes.json()) as PiRow[];

  return jsonResponse({ customer, pis: piRows });
}