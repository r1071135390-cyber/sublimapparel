// functions/api/admin/customers/list.ts
//
// 2026-10-13 (Phase A.2): Returns the customer archive used by the
// `/admin/summary` page's customer-filter dropdown.

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
  email: string | null;
  pi_count: number | null;
  last_used_at: string | null;
}

const DEFAULT_LIMIT = 500;

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
  const limitParam = url.searchParams.get("limit");
  const search = (url.searchParams.get("search") || "").trim();
  let limit = DEFAULT_LIMIT;
  if (limitParam) {
    const n = parseInt(limitParam, 10);
    if (Number.isFinite(n) && n > 0) limit = Math.min(1000, n);
  }

  const params = new URLSearchParams({
    select: "id,customer_name,company,email,pi_count,last_used_at",
    order: "last_used_at.desc.nullslast,customer_name.asc",
    limit: String(limit),
  });
  if (search) {
    params.set("customer_name", `ilike.%${search}%`);
  }

  const res = await fetch(
    `${supabaseUrl}/rest/v1/customers?${params.toString()}`,
    { headers }
  );

  if (!res.ok) {
    const text = await res.text();
    return jsonResponse(
      { error: "Supabase query failed", detail: text },
      500
    );
  }

  const rows = (await res.json()) as CustomerRow[];
  return jsonResponse({ customers: rows });
}