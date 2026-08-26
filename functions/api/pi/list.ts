// functions/api/pi/list.ts
// Returns a list of Proforma Invoices + summary stats for the admin dashboard.
// Includes the most recent 100 PIs (sorted by created_at desc) and
// aggregate counts / values for all-time and this-month.

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

interface PiRow {
  id: number | string;
  pi_number: string;
  customer_name: string | null;
  customer_company: string | null;
  total_cents: number | null;
  currency: string | null;
  status: string | null;
  created_at: string;
}

function startOfMonthIso(): string {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
}

function formatMoney(amountCents: number | null, currency: string | null): string {
  if (amountCents == null) return "—";
  const c = currency || "USD";
  const dollars = amountCents / 100;
  return `${c} ${dollars.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { env } = context;

  if (!env.COZE_SUPABASE_URL || !env.COZE_SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse(
      { error: "Supabase credentials not configured" },
      500
    );
  }

  const supabaseUrl = normalizeSupabaseUrl(env.COZE_SUPABASE_URL);
  const headers = {
    apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
  };

  // Fetch the most recent 100 PIs.
  const listRes = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?select=id,pi_number,customer_name,customer_company,total_cents,currency,status,created_at&order=created_at.desc&limit=100`,
    { headers }
  );

  if (!listRes.ok) {
    const text = await listRes.text();
    return jsonResponse({ error: "Supabase query failed", detail: text }, 500);
  }

  const rows = (await listRes.json()) as PiRow[];

  // Compute summary stats in JS — simpler than two extra aggregate queries
  // and the dataset is small (admin-internal page, capped at 100 in the list).
  let totalCount = 0;
  let monthCount = 0;
  let totalValueCents = 0;
  let monthValueCents = 0;
  const monthStart = new Date(startOfMonthIso()).getTime();

  for (const r of rows) {
    totalCount++;
    const createdMs = new Date(r.created_at).getTime();
    const isThisMonth = createdMs >= monthStart;
    if (isThisMonth) monthCount++;
    // Treat all totals as USD-equivalent for the summary.
    // (If we add multi-currency conversion later, do it here.)
    const amt = typeof r.total_cents === "number" ? r.total_cents : 0;
    totalValueCents += amt;
    if (isThisMonth) monthValueCents += amt;
  }

  // If the table has more than 100 PIs, the counts above are only for the
  // list. Run a single count() query to get the real total.
  const countRes = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?select=id&limit=0`,
    {
      headers: { ...headers, Prefer: "count=exact" },
    }
  );
  let realTotalCount = totalCount;
  if (countRes.ok) {
    const cr = countRes.headers.get("content-range"); // e.g. "0-99/247"
    if (cr) {
      const m = cr.match(/\/(\d+)/);
      if (m) realTotalCount = parseInt(m[1], 10);
    }
  }

  // Enrich rows for display.
  const enriched = rows.map((r) => ({
    id: r.id,
    piNumber: r.pi_number,
    customerName: r.customer_name,
    customerCompany: r.customer_company,
    totalCents: r.total_cents,
    currency: r.currency,
    totalDisplay: formatMoney(r.total_cents, r.currency),
    status: r.status,
    createdAt: r.created_at,
  }));

  return jsonResponse({
    summary: {
      totalCount: realTotalCount,
      shownCount: enriched.length,
      monthCount,
      totalValueCents,
      monthValueCents,
      totalValueDisplay: formatMoney(totalValueCents, "USD"),
      monthValueDisplay: formatMoney(monthValueCents, "USD"),
    },
    pis: enriched,
  });
}
