"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import Link from "next/link";
import { Lock, AlertTriangle } from "lucide-react";
import {
  ADMIN_TOKEN_REJECTED_EVENT,
  OWNER_PASSWORD,
  clearAdminToken,
  getAdminToken,
  hasPasswordSession,
  setAdminToken,
  setPasswordSession,
  verifyAdminToken,
} from "@/lib/admin-token";

/**
 * One gate for every /admin/* page.
 *
 * Two things have to be true before an admin page talks to the API:
 *   1. the owner knows the owner password (the local UI gate that has
 *      always protected these pages), and
 *   2. the browser holds a token the server accepts (ADMIN_TOKEN, checked
 *      by functions/api/_admin-auth.ts).
 *
 * The password alone is not enough any more — the API rejects every
 * request without a valid bearer token. The token alone is not enough
 * either, because the owner password is what stops a borrowed laptop
 * from silently opening the admin area.
 *
 * Both are remembered in sessionStorage, so the owner types them once per
 * browser tab and every admin page in that tab opens straight away.
 */
export interface AdminGateApi {
  unlocked: boolean;
  gate: ReactElement;
}

export function useAdminGate(
  title = "Admin",
  backHref = "/admin/",
): AdminGateApi {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  // Auto-unlock when this tab already holds both credentials. We unlock
  // optimistically and let the server have the final word: a stale token
  // re-locks the page a moment later (the API call 403s, or verify fails).
  useEffect(() => {
    const stored = getAdminToken();
    if (!stored || !hasPasswordSession()) return;
    setUnlocked(true);
    let cancelled = false;
    void (async () => {
      const result = await verifyAdminToken(stored);
      if (cancelled) return;
      if (result.ok) return;
      clearAdminToken();
      setUnlocked(false);
      setError(result.message ?? "Your admin token was rejected. Sign in again.");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // The server rejected the stored token (rotated, or never configured).
  // Drop it and send the operator back to the gate.
  useEffect(() => {
    const onRejected = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string }>).detail;
      setUnlocked(false);
      setError(
        detail?.message ??
          "Your admin token was rejected. Sign in again with a valid token.",
      );
    };
    window.addEventListener(ADMIN_TOKEN_REJECTED_EVENT, onRejected);
    return () => window.removeEventListener(ADMIN_TOKEN_REJECTED_EVENT, onRejected);
  }, []);

  const submit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      if (checking) return;

      // The password is only asked for once per tab. After that the
      // session flag stands in for it.
      if (!hasPasswordSession() && password !== OWNER_PASSWORD) {
        setError("Wrong password.");
        return;
      }

      const value = token.trim();
      if (!value) {
        setError("Enter the admin token.");
        return;
      }

      setChecking(true);
      setError(null);
      const result = await verifyAdminToken(value);
      setChecking(false);

      if (!result.ok) {
        setError(result.message ?? "The admin token was rejected.");
        return;
      }

      setAdminToken(value);
      setPasswordSession();
      setUnlocked(true);
    },
    [checking, password, token],
  );

  const gate: ReactElement = (
    <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-4 py-12">
      <div className="w-full max-w-md border-2 border-black bg-white p-8 shadow-[6px_6px_0_0_rgba(10,10,10,1)]">
        <div className="mb-5 flex h-12 w-12 items-center justify-center border-2 border-black bg-[#0a0a0a] text-white">
          <Lock className="h-6 w-6" strokeWidth={2.5} />
        </div>
        <h1 className="mb-1 text-2xl font-black uppercase leading-tight tracking-tight">
          {title}
        </h1>
        <p className="mb-5 text-sm text-[#6b6b6b]">
          Owner-only. Enter the owner password and your admin token to continue.
        </p>
        <form onSubmit={submit}>
          <label
            htmlFor="admin-owner-password"
            className="mb-1 block text-xs font-black uppercase tracking-wider text-[#6b6b6b]"
          >
            Owner password
          </label>
          <input
            id="admin-owner-password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            placeholder="Password"
            className="mb-4 w-full border-2 border-black bg-white px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/40"
          />
          <label
            htmlFor="admin-token"
            className="mb-1 block text-xs font-black uppercase tracking-wider text-[#6b6b6b]"
          >
            Admin token
          </label>
          <input
            id="admin-token"
            type="password"
            autoComplete="off"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              setError(null);
            }}
            placeholder="ADMIN_TOKEN"
            className="mb-2 w-full border-2 border-black bg-white px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/40"
          />
          {error && (
            <div className="mb-2 flex items-start gap-1.5 text-xs font-bold text-[#ff4d00]">
              <AlertTriangle className="mt-px h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
              <span>{error}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={checking}
            className="w-full bg-[#0a0a0a] px-4 py-2 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-[#ff4d00] disabled:opacity-50"
          >
            {checking ? "Checking…" : "Unlock"}
          </button>
        </form>
        <div className="mt-5 border-t border-[#e5e5e5] pt-4 text-xs text-[#6b6b6b]">
          <Link
            href={backHref}
            className="font-bold uppercase tracking-wider text-black hover:text-[#ff4d00]"
          >
            ← Back to admin
          </Link>
        </div>
      </div>
    </main>
  );

  return { unlocked, gate };
}

/**
 * Page-level wrapper. Renders the lock screen until the owner has entered
 * the password and the server has accepted the token, so the wrapped page
 * never mounts — and therefore never fires an API call — before it is
 * allowed to talk to the admin endpoints.
 */
export function AdminGate({
  title,
  backHref,
  children,
}: {
  title: string;
  backHref?: string;
  children: ReactNode;
}) {
  const { unlocked, gate } = useAdminGate(title, backHref);
  if (!unlocked) return gate;
  return <>{children}</>;
}
