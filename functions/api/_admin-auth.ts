// functions/api/_admin-auth.ts
//
// 2026-10-27 (R125): shared ADMIN_TOKEN guard for every admin-only
// endpoint.
//
// Until R125 the admin surface was reachable by anyone who guessed a URL.
// /api/admin/customers/list leaked customer names + e-mail addresses,
// /api/admin/customers/[id] leaked full customer profiles,
// /api/admin/bank-accounts leaked the factory's receiving bank details,
// /api/pi/list leaked the whole sales ledger, and /api/pi/{create,update,
// delete} let a stranger mint, rewrite or delete invoices. The only thing
// in the way was a password hardcoded in the public JavaScript bundle.
//
// Every one of those endpoints now requires the ADMIN_TOKEN environment
// variable and fails closed when it is not configured — a missing token
// means no access, never open access.
//
// The token is accepted either as `Authorization: Bearer <token>` (what
// the admin UI sends) or `?token=<token>` (handy for curl).

export interface AdminEnv {
  ADMIN_TOKEN?: string;
  // SHA-256 (hex) of the owner password. R128: the password itself used to
  // be a constant in the public client bundle; only the digest lives here.
  OWNER_PASSWORD_HASH?: string;
}

/**
 * Length-independent comparison so the token check leaks no length
 * through response timing.
 */
export function tokenMatches(provided: string, expected: string): boolean {
  if (provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * SHA-256 of a string, hex encoded.
 *
 * Used to turn the owner password into something we can store in an
 * environment variable and compare without ever holding the plaintext.
 */
export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Constant-time comparison for secrets whose length we must not leak.
 *
 * tokenMatches() bails out as soon as the lengths differ, which is fine for
 * the fixed-length ADMIN_TOKEN but would reveal how long a candidate
 * password is. Here both sides are hashed first, so the comparison always
 * runs over 32 fixed bytes no matter what the inputs look like.
 */
export async function secretEquals(
  provided: string,
  expected: string,
): Promise<boolean> {
  const [a, b] = await Promise.all([
    sha256Hex(provided),
    sha256Hex(expected),
  ]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * The little bit of a Request we actually read.
 *
 * We deliberately do NOT type this as the DOM `Request`: Cloudflare's
 * EventContext hands us a workers-types Request, which is a different
 * (enhanced) type and is not assignable to the DOM one. Accepting the
 * narrowest structural shape keeps the guard usable from every handler.
 */
export interface AdminRequestLike {
  headers: { get(name: string): string | null };
}

/**
 * Read the bearer token from the Authorization header, falling back to
 * the ?token= query param (handy for curl and for the reconciliation
 * endpoint's existing callers).
 */
export function readToken(request: AdminRequestLike, url: URL): string | null {
  const header = request.headers.get("Authorization") ?? "";
  if (header.toLowerCase().startsWith("bearer ")) {
    return header.slice(7).trim();
  }
  return url.searchParams.get("token");
}

/**
 * Enforce ADMIN_TOKEN or return a 403. Call this at the top of every
 * admin handler. Returns null on success so callers can use:
 *   const guard = requireAdmin(...); if (guard) return guard;
 */
export function requireAdmin(
  request: AdminRequestLike,
  url: URL,
  env: AdminEnv,
): Response | null {
  if (!env.ADMIN_TOKEN) {
    return new Response(
      JSON.stringify({
        error:
          "ADMIN_TOKEN is not configured on this deployment. Add it as a Cloudflare Pages environment variable to use this endpoint.",
      }),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    );
  }

  const provided = readToken(request, url);
  if (!provided || !tokenMatches(provided, env.ADMIN_TOKEN)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  return null;
}
