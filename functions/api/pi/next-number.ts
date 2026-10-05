/**
 * GET /api/pi/next-number?prefix=SA20260825
 *
 * Returns the next available 4-digit PI number for a given date prefix.
 * Example response: { next: "SA202608250007", count: 6 }
 *
 * 2026-10-05 (R113): replaced the inline LIKE + ORDER BY DESC + LIMIT 50
 * scan with a call to the Supabase RPC `next_pi_number(prefix)`. The RPC
 * runs an indexed range scan with LIMIT 1 server-side, which avoids the
 * Supabase free-tier statement timeout (57014) that the previous
 * implementation hit once the table grew.
 *
 * `count` is still returned for backwards compatibility with any caller
 * that shows it in the admin UI — we approximate it as `maxSuffix` (i.e.
 * how many PIs we believe exist under this prefix). If you need an exact
 * count, run a separate query.
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

    // Delegate to the RPC — runs as an indexed range scan with LIMIT 1,
    // so it's bounded by log(N) regardless of how big the table gets.
    const rpcRes = await fetch(`${COZE_SUPABASE_URL}/rest/v1/rpc/next_pi_number`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${COZE_SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ p_prefix: prefix }),
    });

    if (!rpcRes.ok) {
      const detail = await rpcRes.text().catch(() => "");
      return jsonResponse(
        { error: `Database query failed: status=${rpcRes.status} body=${detail}` },
        500,
      );
    }

    const next = (await rpcRes.json()) as string;
    if (typeof next !== "string" || !next) {
      return jsonResponse(
        { error: `next_pi_number RPC returned non-string: ${JSON.stringify(next)}` },
        500,
      );
    }

    // The RPC returned e.g. "SA202608250007". The last 4 chars are the
    // suffix; derive maxSuffix + count for UI compatibility.
    const suffixStr = next.slice(prefix.length);
    const maxSuffix = parseInt(suffixStr, 10);
    const safeMaxSuffix = Number.isFinite(maxSuffix) ? maxSuffix : 0;

    return jsonResponse({
      next,
      prefix,
      // Best-effort: count of PIs we believe exist under this prefix.
      // equals the max suffix because each PI under a prefix occupies
      // a unique 4-digit slot.
      count: safeMaxSuffix,
      maxSuffix: safeMaxSuffix - 1 >= 0 ? safeMaxSuffix - 1 : 0,
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
