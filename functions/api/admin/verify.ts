// functions/api/admin/verify.ts
//
// 2026-10-28 (R125): lightweight ADMIN_TOKEN check for the admin UI.
//
// The admin pages need to know whether the token the operator typed is
// the one the server expects — before they start loading data. Without
// this, the first real request would have to fail (403) to tell the
// operator their token is wrong, which is a confusing way to learn it.
//
// This endpoint touches no database and no Stripe account: it only runs
// the same constant-time comparison the guarded endpoints run, so it
// stays fast and cannot leak anything.
//
// GET /api/admin/verify
//   Authorization: Bearer <ADMIN_TOKEN>
//   → 200 { ok: true }
//   → 403 { error: "Unauthorized" }                  token is wrong
//   → 403 { error: "ADMIN_TOKEN is not configured…" }  env var missing
//
// Auth: fails closed. If ADMIN_TOKEN is not set on the deployment, this
// endpoint reports that instead of accepting anything.

import { requireAdmin } from "../_admin-auth";
import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  ADMIN_TOKEN?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders });
}

export const onRequestOptions = async () =>
  new Response(null, { status: 204, headers: corsHeaders });

export const onRequestGet = async (
  context: EventContext<Env, string, Record<string, unknown>>,
): Promise<Response> => {
  const { request, env } = context;
  const url = new URL(request.url);

  const guard = requireAdmin(request, url, env);
  if (guard) return guard;

  return json({ ok: true });
};
