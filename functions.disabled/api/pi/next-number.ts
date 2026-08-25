/**
 * GET /api/pi/next-number?prefix=SA20260825
 *
 * Returns the next available 4-digit PI number for a given date prefix.
 * Example response: { next: "SA202608250007", count: 6 }
 *
 * Looks at existing PIs starting with `SA{YYYYMMDD}` and returns the next
 * sequential number (zero-padded to 4 digits).
 */

import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

export const onRequestGet: (context: EventContext<Env, string, Record<string, unknown>>) => Promise<Response> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const prefix = url.searchParams.get("prefix") || defaultTodayPrefix();

    if (!/^SA\d{8}$/.test(prefix)) {
      return jsonResponse({ error: "Invalid prefix. Must match SA + YYYYMMDD (e.g. SA20260825)" }, 400);
    }

    const { COZE_SUPABASE_URL, COZE_SUPABASE_SERVICE_ROLE_KEY } = context.env;
    if (!COZE_SUPABASE_URL || !COZE_SUPABASE_SERVICE_ROLE_KEY) {
      return jsonResponse({ error: "Database not configured" }, 500);
    }

    // Fetch all PIs with this prefix, ordered by pi_number desc
    const res = await fetch(
      `${COZE_SUPABASE_URL}/rest/v1/proforma_invoices?pi_number=like.${prefix}*&select=pi_number&order=pi_number.desc&limit=50`,
      {
        headers: {
          apikey: COZE_SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${COZE_SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    );

    if (!res.ok) {
      return jsonResponse({ error: `Database query failed: ${res.status}` }, 500);
    }

    const rows = (await res.json()) as Array<{ pi_number: string }>;

    // Find the max 4-digit suffix
    let maxSuffix = 0;
    for (const row of rows) {
      const suffixStr = row.pi_number.slice(prefix.length);
      const suffix = parseInt(suffixStr, 10);
      if (!isNaN(suffix) && suffix > maxSuffix) {
        maxSuffix = suffix;
      }
    }

    const nextSuffix = String(maxSuffix + 1).padStart(4, "0");
    const next = `${prefix}${nextSuffix}`;

    return jsonResponse({
      next,
      prefix,
      count: rows.length,
      maxSuffix,
    });
  } catch (err) {
    return jsonResponse(
      { error: err instanceof Error ? err.message : "Unknown error" },
      500
    );
  }
};

function defaultTodayPrefix(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `SA${yyyy}${mm}${dd}`;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
