// functions/api/pi-v2/list.ts
// Phase A.3 replacement for /api/pi/list, served from a fresh path so
// it can coexist with the legacy /api/pi/list route while the
// OneDrive-locked functions/api/pi/ folder is being recovered.
// Once the legacy route is restored, this file should be deleted and
// SummaryClient should call /api/pi/list/ again.

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
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
  ).toISOString();
}

function formatMoney(
  amountCents: number | null,
  currency: string | null
): string {
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
  const { env, request } = context;

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

  const url = new URL(request.url);
  const customerParam = (url.searchParams.get("customer") || "").trim();

  const baseParams = new URLSearchParams({
    select:
      "id,pi_number,customer_name,customer_company,total_cents,currency,status,created_at",
    order: "created_at.desc",
    limit: "100",
  });
  if (customerParam) {
    const custRes = await fetch(
      `${supabaseUrl}/rest/v1/customers?id=eq.${encodeURIComponent(
        customerParam
      )}&select=customer_name`,
      { headers }
    );
    if (!custRes.ok) {
      const text = await custRes.text();
      return jsonResponse(
        { error: "Customer lookup failed", detail: text },
        500
      );
    }
    const custRows = (await custRes.json()) as { customer_name: string }[];
    if (custRows.length === 0) {
      return jsonResponse({
        summary: {
          totalCount: 0,
          shownCount: 0,
          monthCount: 0,
          totalValueCents: 0,
          monthValueCents: 0,
          totalValueDisplay: formatMoney(0, "USD"),
          monthValueDisplay: formatMoney(0, "USD"),
        },
        pis: [],
      });
    }
    baseParams.set(
      "customer_name",
      `ilike.${encodeURIComponent(custRows[0].customer_name)}`
    );
  }

  const listRes = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?${baseParams.toString()}`,
    { headers }
  );

  if (!listRes.ok) {
    const text = await listRes.text();
    return jsonResponse(
      { error: "Supabase query failed", detail: text },
      500
    );
  }

  const rows = (await listRes.json()) as PiRow[];

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
    const amt = typeof r.total_cents === "number" ? r.total_cents : 0;
    totalValueCents += amt;
    if (isThisMonth) monthValueCents += amt;
  }

  let realTotalCount = totalCount;
  if (!customerParam) {
    const countRes = await fetch(
      `${supabaseUrl}/rest/v1/proforma_invoices?select=id&limit=0`,
      {
        headers: { ...headers, Prefer: "count=exact" },
      }
    );
    if (countRes.ok) {
      const cr = countRes.headers.get("content-range");
      if (cr) {
        const m = cr.match(/\/(\d+)/);
        if (m) realTotalCount = parseInt(m[1], 10);
      }
    }
  }

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