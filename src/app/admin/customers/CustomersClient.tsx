"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  RefreshCw,
  Search,
  X,
  Building2,
  Mail,
  Calendar,
  Hash,
  Lock,
  AlertTriangle,
} from "lucide-react";

// Owner-only access. Same gate as SummaryClient — see that file for the
// security model. We duplicate the constant rather than share a module so
// the summary page remains self-contained and easy to reason about.
const OWNER_PASSWORD = "HOMEdorm521\$\$\$";
const SESSION_KEY = "pi_customers_unlocked";

interface CustomerRow {
  id: string;
  customer_name: string;
  company: string | null;
  email: string | null;
  pi_count: number | null;
  last_used_at: string | null;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function CustomersClient() {
  // ---------- Lock state ----------
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);

  // ---------- Data state ----------
  const [rows, setRows] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        setUnlocked(true);
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "500" });
      if (search.trim()) params.set("search", search.trim());
      const res = await fetch(
        `/api/admin/customers/list/?${params.toString()}`,
        { cache: "no-store" },
      );
      if (!res.ok) {
        const t = await res.text();
        setError(`Load failed (${res.status}): ${t}`);
        return;
      }
      const data = (await res.json()) as { customers: CustomerRow[] };
      setRows(data.customers);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    if (unlocked) {
      void fetchData();
    }
  }, [unlocked, fetchData]);

  function tryUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (pwInput === OWNER_PASSWORD) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
      setUnlocked(true);
      setPwError(null);
    } else {
      setPwError("Wrong password.");
    }
  }

  // ---------- Locked view ----------
  if (ready && !unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-4 py-12">
        <div className="w-full max-w-md border-2 border-black bg-white p-8 shadow-[6px_6px_0_0_rgba(10,10,10,1)]">
          <div className="mb-5 flex h-12 w-12 items-center justify-center border-2 border-black bg-[#0a0a0a] text-white">
            <Lock className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <h1 className="mb-1 text-2xl font-black uppercase leading-tight tracking-tight">
            Customers
          </h1>
          <p className="mb-5 text-sm text-[#6b6b6b]">
            Owner-only. Enter the password to view the customer archive.
          </p>
          <form onSubmit={tryUnlock}>
            <input
              type="password"
              autoFocus
              autoComplete="off"
              value={pwInput}
              onChange={(e) => {
                setPwInput(e.target.value);
                setPwError(null);
              }}
              placeholder="Password"
              className="mb-2 w-full border-2 border-black bg-white px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/40"
            />
            {pwError && (
              <div className="mb-2 text-xs font-bold text-[#ff4d00]">
                {pwError}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#0a0a0a] px-4 py-2 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-[#ff4d00]"
            >
              Unlock
            </button>
          </form>
          <div className="mt-5 border-t border-[#e5e5e5] pt-4 text-xs text-[#6b6b6b]">
            <Link
              href="/admin/"
              className="font-bold uppercase tracking-wider text-black hover:text-[#ff4d00]"
            >
              ← Back to admin
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ---------- Main view ----------
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      {/* Header */}
      <header className="border-b-2 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#0a0a0a] font-black text-white">
              SA
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#6b6b6b]">
                Internal · Owner Only
              </div>
              <div className="text-lg font-black leading-none">Customers</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => void fetchData()}
              disabled={loading}
              className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-black hover:text-[#ff4d00] disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                strokeWidth={2.5}
              />
              Refresh
            </button>
            <Link
              href="/admin/"
              className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-black hover:text-[#ff4d00]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
              Back to admin
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="mb-3 text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl">
            Customer Archive
          </h1>
          <p className="max-w-2xl text-lg text-[#6b6b6b]">
            Every customer who has ever received a PI. Click a row to see
            full details and their PI history.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-6 flex items-center gap-3 border-2 border-black bg-white p-3">
          <Search
            className="h-5 w-5 text-[#6b6b6b]"
            strokeWidth={2.5}
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void fetchData();
            }}
            placeholder="Search by name, company, or email…"
            className="flex-1 border-none bg-transparent text-sm font-bold focus:outline-none"
          />
          {search ? (
            <button
              type="button"
              onClick={() => {
                setSearch("");
              }}
              className="text-[#6b6b6b] hover:text-black"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void fetchData()}
              className="text-xs font-black uppercase tracking-wider text-black hover:text-[#ff4d00]"
            >
              Search
            </button>
          )}
        </div>

        {/* Stats strip */}
        <div className="mb-6 flex items-center gap-2 border-2 border-black bg-white px-4 py-2">
          <Users className="h-4 w-4" strokeWidth={2.5} />
          <span className="text-xs font-black uppercase tracking-wider">
            {loading ? "…" : rows.length} customer{rows.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 flex items-start gap-2 border-2 border-[#ff4d00] bg-white p-4 text-sm font-bold text-[#ff4d00]">
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0"
              strokeWidth={2.5}
            />
            <span>{error}</span>
          </div>
        )}

        {/* Table */}
        <div className="border-2 border-black bg-white">
          <div className="flex items-center border-b-2 border-black bg-[#0a0a0a] px-6 py-3 text-white">
            <Users className="mr-2 h-4 w-4" strokeWidth={2.5} />
            <h2 className="text-sm font-black uppercase tracking-tight">
              All Customers
            </h2>
          </div>

          {loading && rows.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-[#6b6b6b]">
              <RefreshCw
                className="mx-auto mb-2 h-6 w-6 animate-spin"
                strokeWidth={2.5}
              />
              Loading…
            </div>
          ) : rows.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-[#6b6b6b]">
              No customers found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-black bg-[#faf9f6] text-xs font-black uppercase tracking-wider text-[#6b6b6b]">
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3 text-right">PIs</th>
                    <th className="px-4 py-3">Last Used</th>
                    <th className="px-4 py-3 text-right">View</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((c) => (
                    <tr
                      key={c.id}
                      className="cursor-pointer border-b border-[#e5e5e5] transition-colors last:border-b-0 hover:bg-[#faf9f6]"
                      onClick={() => {
                        window.location.href = `/admin/customers/?id=${c.id}`;
                      }}
                    >
                      <td className="px-4 py-3">
                        <div className="font-black tracking-tight">
                          {c.customer_name}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#6b6b6b]">
                        {c.company ? (
                          <span className="inline-flex items-center gap-1">
                            <Building2
                              className="h-3.5 w-3.5"
                              strokeWidth={2.5}
                            />
                            {c.company}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#6b6b6b]">
                        {c.email ? (
                          <span className="inline-flex items-center gap-1">
                            <Mail
                              className="h-3.5 w-3.5"
                              strokeWidth={2.5}
                            />
                            {c.email}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-black">
                        <span className="inline-flex items-center gap-1">
                          <Hash
                            className="h-3.5 w-3.5 text-[#6b6b6b]"
                            strokeWidth={2.5}
                          />
                          {c.pi_count ?? 0}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#6b6b6b]">
                        <span className="inline-flex items-center gap-1">
                          <Calendar
                            className="h-3.5 w-3.5"
                            strokeWidth={2.5}
                          />
                          {formatDate(c.last_used_at)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/customers/?id=${c.id}`}
                          className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-black hover:text-[#ff4d00]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Open →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
