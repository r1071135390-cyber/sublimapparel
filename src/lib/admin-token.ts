// src/lib/admin-token.ts
//
// 2026-10-28 (R125): client-side channel for the ADMIN_TOKEN that guards
// every admin API endpoint (see functions/api/_admin-auth.ts).
//
// The site is a Next.js static export (output: "export"), so there is no
// server-side session, no server middleware, and no way to attach an
// Authorization header from the server. The browser has to carry the token
// itself — we keep it in sessionStorage so it lives exactly as long as the
// admin tab does, and send it as `Authorization: Bearer ...` on every
// admin request.
//
// 2026-10-31 (R132): multi-user accounts with roles.
//
// The server now answers "who is this?" as well as "is this token good?" —
// /api/admin/verify returns the account's id, e-mail and role. We keep
// that identity in sessionStorage so the UI can hide owner-only actions
// (editing the bank accounts, deleting an invoice) before the operator
// clicks something that the server would reject anyway.

export type AdminRole = "owner" | "admin";

export interface AdminUserIdentity {
  id: string;
  email: string;
  role: AdminRole;
}

export const ADMIN_TOKEN_STORAGE_KEY = "sa_admin_token";
// R132: the value is the id of the account whose password was already
// checked in this tab, not a flat "1" flag. Without it, one colleague's
// unlocked tab would silently unlock the next colleague's session.
export const ADMIN_PASSWORD_STORAGE_KEY = "sa_admin_password_unlocked";
export const ADMIN_USER_STORAGE_KEY = "sa_admin_user";

// Fired when the server rejects the stored token, so the admin gate can
// re-lock instead of leaving the operator staring at empty tables.
export const ADMIN_TOKEN_REJECTED_EVENT = "admin-token-rejected";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
    return value && value.length > 0 ? value : null;
  } catch {
    return null;
  }
}

export function setAdminToken(token: string): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
  } catch {
    // ignore
  }
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
  } catch {
    // ignore
  }
  clearAdminUser();
}

export function getAdminUser(): AdminUserIdentity | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(ADMIN_USER_STORAGE_KEY);
    if (!raw) return null;
    return parseAdminUser(raw);
  } catch {
    return null;
  }
}

export function setAdminUser(user: AdminUserIdentity): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(ADMIN_USER_STORAGE_KEY, JSON.stringify(user));
  } catch {
    // ignore
  }
}

export function clearAdminUser(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(ADMIN_USER_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Human-readable name of the signed-in account. */
export function adminUserLabel(user: AdminUserIdentity | null): string {
  if (!user) return "";
  return user.email || user.id;
}

/** True when the signed-in account may perform owner-only actions. */
export function isOwnerUser(user: AdminUserIdentity | null): boolean {
  return user?.role === "owner";
}

/**
 * Was the password already checked for this account in this tab?
 *
 * The account id is part of the key on purpose: the password gate is
 * per-person, not per-browser.
 */
export function hasPasswordSession(userId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(ADMIN_PASSWORD_STORAGE_KEY) === userId;
  } catch {
    return false;
  }
}

export function setPasswordSession(userId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(ADMIN_PASSWORD_STORAGE_KEY, userId);
  } catch {
    // ignore
  }
}

export function clearPasswordSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(ADMIN_PASSWORD_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Merge the bearer token into a header set. Callers that already pass
 * Content-Type keep it — the token is added, never substituted.
 */
export function adminHeaders(extra?: HeadersInit): Headers {
  const headers = new Headers(extra);
  const token = getAdminToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}

/**
 * fetch() with the admin bearer token attached. Use this for every call
 * that targets /api/admin/* or the admin-only /api/pi/* endpoints.
 *
 * A 403 means the stored token is stale (the credential was rotated on
 * the server). We drop the token and tell the gate to re-lock.
 */
export async function adminFetch(
  input: string,
  init?: RequestInit,
): Promise<Response> {
  const res = await fetch(input, {
    ...init,
    headers: adminHeaders(init?.headers),
  });
  if (res.status === 403 && getAdminToken()) {
    const body = (await res.clone().json().catch(() => null)) as {
      error?: string;
      code?: string;
    } | null;
    // R132: a role refusal ("only the owner may edit bank accounts") is
    // not a stale credential — keep the session so the operator can
    // carry on with the work their role does allow.
    if (body?.code === "forbidden_role") return res;
    const message =
      typeof body?.error === "string" ? body.error : await readErrorMessage(res);
    clearAdminToken();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent(ADMIN_TOKEN_REJECTED_EVENT, { detail: { message } }),
      );
    }
  }
  return res;
}

async function readErrorMessage(res: Response): Promise<string> {
  const text = await res.clone().text().catch(() => "");
  try {
    const parsed = JSON.parse(text) as { error?: string };
    if (parsed && typeof parsed.error === "string") return parsed.error;
  } catch {
    // not JSON — fall through
  }
  return text.slice(0, 200);
}

function parseAdminUser(raw: string): AdminUserIdentity | null {
  try {
    const parsed = JSON.parse(raw) as Partial<AdminUserIdentity>;
    const id = typeof parsed.id === "string" ? parsed.id : "";
    const email = typeof parsed.email === "string" ? parsed.email : "";
    const role: AdminRole = parsed.role === "owner" ? "owner" : "admin";
    if (!id && !email) return null;
    return { id, email, role };
  } catch {
    return null;
  }
}

/**
 * Ask the server whether a token is the right one. Uses the dedicated
 * /api/admin/verify endpoint so the check does not depend on Supabase
 * being reachable.
 *
 * R132: on success the server also tells us which account the token
 * belongs to and what role it has.
 */
export async function verifyAdminToken(
  token: string,
): Promise<{ ok: boolean; user?: AdminUserIdentity; message?: string }> {
  let res: Response;
  try {
    res = await fetch("/api/admin/verify", {
      method: "GET",
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    return {
      ok: false,
      message: "Could not reach the server. Check your connection and try again.",
    };
  }

  if (res.ok) {
    const body = (await res.json().catch(() => null)) as {
      user?: unknown;
    } | null;
    return { ok: true, user: parseAdminUserFromJson(body?.user) };
  }

  if (res.status === 404) {
    return {
      ok: false,
      message:
        "Admin verification endpoint not found. The Cloudflare Functions deployment looks out of date.",
    };
  }

  const body = await res.text().catch(() => "");
  let serverMessage = "";
  try {
    const parsed = JSON.parse(body) as { error?: string };
    if (parsed && typeof parsed.error === "string") serverMessage = parsed.error;
  } catch {
    serverMessage = body.slice(0, 200);
  }

  return { ok: false, message: describeAuthFailure(serverMessage) };
}

/**
 * Ask the server whether the account's password is correct.
 *
 * R128: the password is no longer compared in the browser. It used to be
 * checked against a constant exported from this module, and because this
 * module is imported by "use client" components, that constant ended up in
 * the public JS chunk where anybody could read it. The password now travels
 * over TLS to /api/admin/verify, where the server compares its SHA-256
 * digest against the hash configured for that account.
 *
 * The request carries the admin token too: without it this endpoint would
 * be a password oracle that anyone on the internet could grind against.
 */
export async function verifyOwnerPassword(
  password: string,
  token: string,
): Promise<{ ok: boolean; user?: AdminUserIdentity; message?: string }> {
  let res: Response;
  try {
    res = await fetch("/api/admin/verify", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    });
  } catch {
    return {
      ok: false,
      message: "Could not reach the server. Check your connection and try again.",
    };
  }

  if (res.ok) {
    const body = (await res.json().catch(() => null)) as {
      user?: unknown;
    } | null;
    return { ok: true, user: parseAdminUserFromJson(body?.user) };
  }

  if (res.status === 404) {
    return {
      ok: false,
      message:
        "Admin verification endpoint not found. The Cloudflare Functions deployment looks out of date.",
    };
  }

  if (res.status === 401) {
    return { ok: false, message: "Wrong password." };
  }

  const body = await res.text().catch(() => "");
  let serverMessage = "";
  try {
    const parsed = JSON.parse(body) as { error?: string };
    if (parsed && typeof parsed.error === "string") serverMessage = parsed.error;
  } catch {
    serverMessage = body.slice(0, 200);
  }

  return { ok: false, message: describeAuthFailure(serverMessage) };
}

function parseAdminUserFromJson(value: unknown): AdminUserIdentity | undefined {
  if (!value || typeof value !== "object") return undefined;
  const raw = value as Record<string, unknown>;
  const id = typeof raw.id === "string" ? raw.id : "";
  const email = typeof raw.email === "string" ? raw.email : "";
  const role: AdminRole = raw.role === "owner" ? "owner" : "admin";
  if (!id && !email) return undefined;
  return { id, email, role };
}

/**
 * Turn a server-side auth error into something an operator can act on.
 */
export function describeAuthFailure(serverMessage: string): string {
  if (serverMessage.includes("not configured")) {
    return serverMessage;
  }
  return "Your admin token was rejected. It must match the admin token of your account (ADMIN_USERS) or the ADMIN_TOKEN environment variable in Cloudflare Pages → Settings → Environment variables (set it for both Production and Preview).";
}
