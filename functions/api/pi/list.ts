// functions/api/pi/list.ts
// Returns a list of Proforma Invoices + summary stats for the admin dashboard.
// Includes the most recent 100 PIs (sorted by created_at desc) and
// aggregate counts / values for all-time and this-month.
//
// 2026-10-04 (R83): summary ships BOTH a per-currency totals block and a
// USD-equivalent aggregate. The per-currency totals use each PI's own
// currency (no conversion), so the admin can see real exposure. The
// USD aggregate uses the hardcoded FX_RATES table for a single
// at-a-glance headline number. See functions/lib/fx-rates.ts for why
// we don't pull live rates.

import { normalizeSupabaseUrl } from "../_utils";
import {
  FX_RATES,
  TRACKED_CURRENCIES,
  formatCentsInCurrency,
  toUsdCents,
} from "../../lib/fx-rates";

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

interface CurrencyBucket {
  cents: number;
  display: string;
}

function startOfMonthIso(): string {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
}

/**
 * Build a per-currency totals map.
 * Pre-seeds TRACKED_CURRENCIES so the UI sees all the buckets it cares
 * about even if no PI has used a currency yet (otherwise the page would
 * hide a currency that just hasn't been used this period).
 */
function emptyCurrencyMap(): Record<string, CurrencyBucket> {
  const m: Record<string, CurrencyBucket> = {};
  for (const code of TRACKED_CURRENCIES) {
    m[code] = { cents: 0, display: formatCentsInCurrency(0, code) };
  }
  return m;
}

function bumpBucket(
  map: Record<string, CurrencyBucket>,
  currency: string | null,
  amountCents: number | null,
): void {
  const code = (currency ?? "USD").toUpperCase();
  const bucket =
    map[code] ?? (map[code] = { cents: 0, display: formatCentsInCurrency(0, code) });
  const amt = typeof amountCents === "number" ? amountCents : 0;
  bucket.cents += amt;
  bucket.display = formatCentsInCurrency(bucket.cents, code);
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

  // ── Aggregate stats ────────────────────────────────────────────────
  // R83: previously we summed total_cents across all currencies and
  // called it "USD-equivalent". That was wrong (€1 ≠ $1). Now we:
  //   1) Bucket totals by currency (real exposure per currency).
  //   2) Convert each bucket to USD cents via FX_RATES and sum for a
  //      single headline USD number.
  let totalCount = 0;
  let monthCount = 0;
  const totalsByCurrency = emptyCurrencyMap();
  const monthTotalsByCurrency = emptyCurrencyMap();
  let totalValueUsdCents = 0;
  let monthValueUsdCents = 0;
  const monthStart = new Date(startOfMonthIso()).getTime();

  for (const r of rows) {
    totalCount++;
    const createdMs = new Date(r.created_at).getTime();
    const isThisMonth = createdMs >= monthStart;
    if (isThisMonth) monthCount++;

    const amt = typeof r.total_cents === "number" ? r.total_cents : 0;
    bumpBucket(totalsByCurrency, r.currency, amt);
    if (isThisMonth) {
      bumpBucket(monthTotalsByCurrency, r.currency, amt);
    }

    // USD equivalents — use the PI's own currency (not "USD") so a
    // £1000 PI converts to ~$1282 instead of being silently treated as
    // $1000.
    totalValueUsdCents += toUsdCents(amt, r.currency);
    if (isThisMonth) {
      monthValueUsdCents += toUsdCents(amt, r.currency);
    }
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
    totalDisplay: formatCentsInCurrency(r.total_cents, r.currency),
    status: r.status,
    createdAt: r.created_at,
  }));

  return jsonResponse({
    summary: {
      totalCount: realTotalCount,
      shownCount: enriched.length,
      monthCount,

      // R83: per-currency real-exposure totals (no conversion).
      totalsByCurrency,
      monthTotalsByCurrency,

      // R83: USD-equivalent headlines, computed via FX_RATES.
      totalValueUsdCents,
      totalValueUsdDisplay: formatCentsInCurrency(totalValueUsdCents, "USD"),
      monthValueUsdCents,
      monthValueUsdDisplay: formatCentsInCurrency(monthValueUsdCents, "USD"),

      // R83: ship the rates + provenance so the UI can render
      // "Based on rates as of YYYY-MM-DD" without re-deriving.
      fx: {
        baseCurrency: FX_RATES.baseCurrency,
        rates: FX_RATES.rates,
        asOf: FX_RATES.asOf,
        source: FX_RATES.source,
      },
    },
    pis: enriched,
  });
}