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

export const ADMIN_TOKEN_STORAGE_KEY = "sa_admin_token";
export const ADMIN_PASSWORD_STORAGE_KEY = "sa_admin_password_unlocked";

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
}

export function hasPasswordSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(ADMIN_PASSWORD_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setPasswordSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(ADMIN_PASSWORD_STORAGE_KEY, "1");
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
 * A 403 means the stored token is stale (ADMIN_TOKEN was rotated on the
 * server). We drop the token and tell the gate to re-lock.
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
    clearAdminToken();
    const message = await readErrorMessage(res);
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

/**
 * Ask the server whether a token is the right one. Uses the dedicated
 * /api/admin/verify endpoint so the check does not depend on Supabase
 * being reachable.
 */
export async function verifyAdminToken(
  token: string,
): Promise<{ ok: boolean; message?: string }> {
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

  if (res.ok) return { ok: true };

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
 * Ask the server whether the owner password is correct.
 *
 * R128: the password is no longer compared in the browser. It used to be
 * checked against a constant exported from this module, and because this
 * module is imported by "use client" components, that constant ended up in
 * the public JS chunk where anybody could read it. The password now travels
 * over TLS to /api/admin/verify, where the server compares its SHA-256
 * digest against the OWNER_PASSWORD_HASH environment variable.
 *
 * The request carries the ADMIN_TOKEN too: without it this endpoint would
 * be a password oracle that anyone on the internet could grind against.
 */
export async function verifyOwnerPassword(
  password: string,
  token: string,
): Promise<{ ok: boolean; message?: string }> {
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

  if (res.ok) return { ok: true };

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

/**
 * Turn a server-side auth error into something an operator can act on.
 */
export function describeAuthFailure(serverMessage: string): string {
  if (serverMessage.includes("not configured")) {
    return serverMessage;
  }
  return "Your admin token was rejected. It must match the ADMIN_TOKEN environment variable in Cloudflare Pages → Settings → Environment variables (set it for both Production and Preview).";
}
