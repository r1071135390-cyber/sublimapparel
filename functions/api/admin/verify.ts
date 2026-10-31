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
// POST /api/admin/verify
//   Authorization: Bearer <ADMIN_TOKEN>
//   Body: { password: "<plaintext owner password>" }
//   → 200 { ok: true }
//   → 401 { error: "Wrong password." }              password is wrong
//   → 403 { error: "Unauthorized" }                  token is wrong
//   → 403 { error: "OWNER_PASSWORD_HASH is not configured…" }  env var missing
//
// R128: the owner password used to be compared inside the browser against a
// constant that shipped in the public JS bundle — anyone could download the
// chunk and read it. The comparison now happens here: the client posts the
// password over TLS and we check its SHA-256 digest against the
// OWNER_PASSWORD_HASH environment variable. The plaintext is never stored.
//
// The ADMIN_TOKEN is required on POST as well. Without it this endpoint
// would be an open password oracle — reachable by anyone on the internet,
// who could grind passwords against it.
//
// Auth: fails closed. If the matching environment variable is not set on the
// deployment, this endpoint reports that instead of accepting anything.

import { passwordMatches, requireAdmin } from "../_admin-auth";
import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  ADMIN_TOKEN?: string;
  OWNER_PASSWORD_HASH?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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

export const onRequestPost = async (
  context: EventContext<Env, string, Record<string, unknown>>,
): Promise<Response> => {
  const { request, env } = context;
  const url = new URL(request.url);

  const guard = requireAdmin(request, url, env);
  if (guard) return guard;

  if (!env.OWNER_PASSWORD_HASH) {
    return json(
      {
        error:
          "OWNER_PASSWORD_HASH is not configured on this deployment. Add it as a Cloudflare Pages environment variable to use this endpoint.",
      },
      403,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const password =
    typeof body === "object" &&
    body !== null &&
    "password" in body &&
    typeof (body as { password: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";

  const ok = await passwordMatches(password, env.OWNER_PASSWORD_HASH);

  if (!ok) {
    return json({ error: "Wrong password." }, 401);
  }

  return json({ ok: true });
};
