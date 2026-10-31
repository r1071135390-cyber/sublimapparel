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
// Every one of those endpoints now requires an admin credential and fails
// closed when it is not configured — a missing credential means no access,
// never open access.
//
// The credential is accepted either as `Authorization: Bearer <token>` (what
// the admin UI sends) or `?token=<token>` (handy for curl).
//
// 2026-10-31 (R132): multi-user roster + roles.
//
// One shared token meant one password for everybody: anyone holding it could
// edit the corporate bank details and delete invoices, and rotating it locked
// every colleague out at the same time.
//
// ADMIN_USERS now holds a roster of individual accounts. Each entry carries
// its own admin token, its own second-factor password and a role:
//
//   owner — everything an admin can do, PLUS editing the corporate bank
//           accounts and deleting invoices.
//   admin — create / edit / upload invoices, read the PI summary and the
//           customer archive. No bank-account writes, no invoice deletes.
//
// The roster is optional. With no ADMIN_USERS configured the previous
// single-token behaviour is unchanged, so an existing deployment keeps
// working while the roster is being filled in — the deployment-wide
// ADMIN_TOKEN keeps working as an owner account.

export type AdminRole = "owner" | "admin";

export interface AdminEnv {
  ADMIN_TOKEN?: string;
  // SHA-256 (hex) of the owner password, or the password itself — see
  // passwordMatches(). R128: the password used to be a constant in the
  // public client bundle; only the server-side value lives here now.
  OWNER_PASSWORD_HASH?: string;
  // R132: JSON roster of individual admin accounts. See parseAdminUsers()
  // for the accepted shapes.
  ADMIN_USERS?: string;
}

/** One account from the ADMIN_USERS roster. */
export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  /** The account's personal admin token. Never leaves the server. */
  token: string;
  /**
   * The account's second-factor password, as a SHA-256 hex digest or as
   * the plaintext password. Undefined means "this account has no password
   * configured" — see passwordMatches().
   */
  passwordHash?: string;
}

/** The part of an account that is safe to hand back to the browser. */
export interface AdminUserPublic {
  id: string;
  email: string;
  role: AdminRole;
}

const ROLE_OWNER: AdminRole = "owner";
const ROLE_ADMIN: AdminRole = "admin";

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
 * Constant-time comparison that does not bail out on a length mismatch.
 *
 * tokenMatches() returns early when the lengths differ, which leaks the
 * length of the expected secret. That is harmless for one fixed global
 * token, but the R132 roster holds several tokens of possibly different
 * lengths, so comparing against them would leak which account a candidate
 * token was aiming at. This variant always walks the longer string.
 */
export function constantTimeEquals(provided: string, expected: string): boolean {
  const length = Math.max(provided.length, expected.length);
  let diff = provided.length ^ expected.length;
  for (let i = 0; i < length; i++) {
    // charCodeAt() returns NaN past the end of the string; fold that to 0.
    diff |= (provided.charCodeAt(i) || 0) ^ (expected.charCodeAt(i) || 0);
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

const SHA256_HEX = /^[0-9a-fA-F]{64}$/;

/**
 * Compare a typed password against the configured secret.
 *
 * The variable is called OWNER_PASSWORD_HASH and is documented to hold a
 * SHA-256 digest, but operators paste the password itself — it is the only
 * value they have, and ADMIN_TOKEN is configured exactly that way. A
 * plaintext value stored there can never match a digest comparison, so the
 * operator is locked out behind "Wrong password." with nothing to show
 * why.
 *
 * Both representations are accepted: a 64-character hex string is read as a
 * digest, anything else as the plaintext password. Either way the
 * plaintext stays on the server and never reaches the client bundle.
 */
export async function passwordMatches(
  provided: string,
  configured: string,
): Promise<boolean> {
  const value = configured.trim();
  if (SHA256_HEX.test(value)) {
    return secretEquals(await sha256Hex(provided), value.toLowerCase());
  }
  return secretEquals(provided, value);
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
 * Turn one roster entry into an AdminUser, or null when it is unusable.
 *
 * Accepted key spellings: `token`, `passwordHash` / `password_hash`,
 * `email`, `id`, `role`. A missing or misspelled role degrades to
 * "admin" — the lower privilege — so a typo can never accidentally
 * promote an account to owner.
 */
function toAdminUser(entry: unknown): AdminUser | null {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
  const raw = entry as Record<string, unknown>;

  const token = typeof raw.token === "string" ? raw.token.trim() : "";
  if (!token) return null;

  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const id =
    typeof raw.id === "string" && raw.id.trim() ? raw.id.trim() : email;
  if (!id) return null;

  const passwordHash =
    typeof raw.passwordHash === "string" && raw.passwordHash.trim()
      ? raw.passwordHash.trim()
      : typeof raw.password_hash === "string" && raw.password_hash.trim()
        ? raw.password_hash.trim()
        : undefined;

  return {
    id,
    email,
    role: normalizeRole(raw.role),
    token,
    passwordHash,
  };
}

function normalizeRole(value: unknown): AdminRole {
  if (typeof value !== "string") return ROLE_ADMIN;
  return value.trim().toLowerCase() === ROLE_OWNER ? ROLE_OWNER : ROLE_ADMIN;
}

/**
 * Parse the ADMIN_USERS environment variable into a list of accounts.
 *
 * Two shapes are accepted:
 *
 *   1. A JSON array — one line, one object per account:
 *      [{"id":"a@x.com","email":"a@x.com","role":"owner","token":"…","passwordHash":"…"}]
 *
 *   2. JSON Lines — one JSON object per line:
 *      {"id":"a@x.com","email":"a@x.com","role":"owner","token":"…","passwordHash":"…"}
 *      {"id":"b@x.com","email":"b@x.com","role":"admin","token":"…","passwordHash":"…"}
 *
 * Unparseable entries are skipped rather than taking the whole roster
 * down with them. A malformed roster therefore denies access instead of
 * granting it.
 */
export function parseAdminUsers(raw: string | undefined): AdminUser[] {
  if (!raw) return [];
  const text = raw.trim();
  if (!text) return [];

  let entries: unknown[] = [];

  if (text.startsWith("[")) {
    try {
      const parsed: unknown = JSON.parse(text);
      if (Array.isArray(parsed)) entries = parsed;
    } catch {
      entries = [];
    }
  }

  if (entries.length === 0) {
    entries = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        try {
          return JSON.parse(line) as unknown;
        } catch {
          return null;
        }
      })
      .filter((entry): entry is unknown => entry !== null);
  }

  const users: AdminUser[] = [];
  const seen = new Set<string>();
  for (const entry of entries) {
    const user = toAdminUser(entry);
    if (!user) continue;
    if (seen.has(user.id)) continue;
    seen.add(user.id);
    users.push(user);
  }
  return users;
}

/**
 * Find the account a request's token belongs to.
 *
 * The roster is checked first. The deployment-wide ADMIN_TOKEN is still
 * accepted afterwards as an owner account, so adding a roster never
 * locks the existing owner out mid-rollout. Returns null when the token
 * belongs to nobody.
 */
export function resolveAdminUser(
  request: AdminRequestLike,
  url: URL,
  env: AdminEnv,
): AdminUser | null {
  const provided = readToken(request, url);
  if (!provided) return null;

  for (const user of parseAdminUsers(env.ADMIN_USERS)) {
    if (constantTimeEquals(provided, user.token)) return user;
  }

  if (env.ADMIN_TOKEN && constantTimeEquals(provided, env.ADMIN_TOKEN)) {
    return {
      id: "owner",
      email: "",
      role: ROLE_OWNER,
      token: env.ADMIN_TOKEN,
      passwordHash: env.OWNER_PASSWORD_HASH,
    };
  }

  return null;
}

/**
 * True when `actual` is allowed to perform an action that requires
 * `required`. Owners can do everything; admins can only do admin work.
 */
export function roleAtLeast(actual: AdminRole, required: AdminRole): boolean {
  if (required === ROLE_OWNER) return actual === ROLE_OWNER;
  return actual === ROLE_OWNER || actual === ROLE_ADMIN;
}

/** The browser-safe projection of an account. */
export function publicUser(user: AdminUser): AdminUserPublic {
  return { id: user.id, email: user.email, role: user.role };
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

/**
 * Enforce an admin credential or return a 403. Call this at the top of
 * every admin handler. Returns null on success so callers can use:
 *   const guard = requireAdmin(...); if (guard) return guard;
 */
export function requireAdmin(
  request: AdminRequestLike,
  url: URL,
  env: AdminEnv,
): Response | null {
  const users = parseAdminUsers(env.ADMIN_USERS);

  if (users.length === 0) {
    if (env.ADMIN_USERS && env.ADMIN_USERS.trim()) {
      return jsonResponse(
        {
          error:
            "ADMIN_USERS is configured but no valid account could be read from it. Check the JSON syntax in Cloudflare Pages → Settings → Environment variables.",
        },
        403,
      );
    }
    if (!env.ADMIN_TOKEN) {
      return jsonResponse(
        {
          error:
            "ADMIN_TOKEN is not configured on this deployment. Add it as a Cloudflare Pages environment variable to use this endpoint.",
        },
        403,
      );
    }
  }

  const user = resolveAdminUser(request, url, env);
  if (!user) {
    return jsonResponse({ error: "Unauthorized" }, 403);
  }

  return null;
}

/**
 * Enforce an admin credential AND a minimum role.
 *
 * Used by the handful of endpoints that change money-relevant data:
 * writing the corporate bank accounts and deleting invoices. Those stay
 * owner-only no matter how many admins are on the roster.
 */
export function requireRole(
  request: AdminRequestLike,
  url: URL,
  env: AdminEnv,
  required: AdminRole,
): Response | null {
  const guard = requireAdmin(request, url, env);
  if (guard) return guard;

  const user = resolveAdminUser(request, url, env);
  if (!user) {
    return jsonResponse({ error: "Unauthorized" }, 403);
  }

  if (!roleAtLeast(user.role, required)) {
    return jsonResponse(
      {
        error: `This action requires the ${required} role. Your account (${user.email || user.id}) has the ${user.role} role.`,
        // `code` lets the client tell a role refusal apart from a stale
        // token — only the latter should drop the session and re-lock.
        code: "forbidden_role",
      },
      403,
    );
  }

  return null;
}
