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
  clearAdminToken,
  getAdminToken,
  hasPasswordSession,
  setAdminToken,
  setAdminUser,
  setPasswordSession,
  verifyAdminToken,
  verifyOwnerPassword,
} from "@/lib/admin-token";

/**
 * One gate for every /administered/* page.
 *
 * Two things have to be true before an admin page talks to the API:
 *   1. the owner knows the owner password, and
 *   2. the browser holds a token the server accepts (ADMIN_TOKEN, checked
 *      by functions/api/_admin-auth.ts).
 *
 * Both are now checked by the server. The owner password used to be
 * compared here in the browser against a constant that shipped inside the
 * public JS bundle, which handed it to anyone who downloaded the chunk. It
 * is posted to /api/admin/verify instead, where the server compares its
 * SHA-256 digest against the OWNER_PASSWORD_HASH environment variable.
 *
 * The password alone is not enough any more — the API rejects every
 * request without a valid bearer token. The token alone is not enough
 * either, because the owner password is what stops a borrowed laptop
 * from silently opening the admin area.
 *
 * Both are remembered in sessionStorage, so the operator types them once per
 * browser tab and every admin page in that tab opens straight away.
 *
 * R132: each colleague has their own token and their own password, and the
 * server tells us which account signed in (and with which role). The
 * password gate is remembered per account, not per browser, so a shared
 * machine does not hand one person's unlocked session to the next person.
 */
export interface AdminGateApi {
  unlocked: boolean;
  gate: ReactElement;
}

export function useAdminGate(
  title = "Admin",
  backHref = "/administered/",
  backLabel = "← Back to admin",
): AdminGateApi {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  // Auto-unlock when this tab already holds both credentials. The token is
  // checked first, because only the server knows which account it belongs
  // to — the password session is stored per account, so it can only be
  // looked up once the account is known. A stale token re-locks the page a
  // moment later (the API call 403s, or verify fails).
  useEffect(() => {
    const stored = getAdminToken();
    if (!stored) return;
    let cancelled = false;
    void (async () => {
      const result = await verifyAdminToken(stored);
      if (cancelled) return;
      if (!result.ok) {
        clearAdminToken();
        setError(result.message ?? "Your admin token was rejected. Sign in again.");
        return;
      }
      const accountId = result.user?.id || result.user?.email || "";
      if (!accountId || !hasPasswordSession(accountId)) {
        return;
      }
      if (result.user) setAdminUser(result.user);
      setUnlocked(true);
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

      const value = token.trim();
      if (!value) {
        setError("Enter the admin token.");
        return;
      }

      setChecking(true);
      setError(null);

      const tokenResult = await verifyAdminToken(value);
      if (!tokenResult.ok) {
        setChecking(false);
        setError(tokenResult.message ?? "The admin token was rejected.");
        return;
      }

      // R132: the server now tells us who this token belongs to. The
      // password gate is remembered per account, so one person's unlocked
      // tab never unlocks the next person's session on a shared machine.
      let activeUser = tokenResult.user ?? null;
      const accountId = activeUser?.id || activeUser?.email || "";

      if (!accountId || !hasPasswordSession(accountId)) {
        const passwordResult = await verifyOwnerPassword(password, value);
        if (!passwordResult.ok) {
          setChecking(false);
          setError(passwordResult.message ?? "Wrong password.");
          return;
        }
        if (passwordResult.user) activeUser = passwordResult.user;
      }

      const sessionId =
        activeUser?.id || activeUser?.email || accountId || "unknown";
      setChecking(false);
      setAdminToken(value);
      if (activeUser) setAdminUser(activeUser);
      setPasswordSession(sessionId);
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
          Staff only. Enter your admin token and your account password to continue.
        </p>
        <form onSubmit={submit}>
          <label
            htmlFor="admin-owner-password"
            className="mb-1 block text-xs font-black uppercase tracking-wider text-[#6b6b6b]"
          >
            Account password
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
            placeholder="Your admin token"
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
            {backLabel}
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
  backLabel,
  children,
}: {
  title: string;
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
}) {
  const { unlocked, gate } = useAdminGate(title, backHref, backLabel);
  if (!unlocked) return gate;
  return <>{children}</>;
}
