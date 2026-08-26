"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  RefreshCw,
  FileText,
  DollarSign,
  Calendar,
  TrendingUp,
  Eye,
  Lock,
} from "lucide-react";

// Owner-only access. Change this string to whatever you'd like — it's the
// only thing standing between anyone who finds the URL and your sales data.
// We do NOT rely on this for real security; the assumption is that no one
// outside the owner knows this page exists. The password just keeps a
// curious teammate from casually opening /admin/summary/.
const OWNER_PASSWORD = "vividprint-owner-2026";
const SESSION_KEY = "pi_summary_unlocked";

interface PiListItem {
  id: number | string;
  piNumber: string;
  customerName: string | null;
  customerCompany: string | null;
  total: number | null;
  currency: string | null;
  totalDisplay: string;
  status: string | null;
  createdAt: string;
}

interface SummaryStats {
  totalCount: number;
  shownCount: number;
  monthCount: number;
  totalValueUsd: number;
  monthValueUsd: number;
}

function statusColor(status: string | null): {
  bg: string;
  text: string;
  border: string;
  label: string;
} {
  const s = (status || "draft").toLowerCase();
  switch (s) {
    case "paid":
      return {
        bg: "bg-[#0a0a0a]",
        text: "text-white",
        border: "border-[#0a0a0a]",
        label: "PAID",
      };
    case "sent":
      return {
        bg: "bg-[#00c2ff]",
        text: "text-[#0a0a0a]",
        border: "border-[#00c2ff]",
        label: "SENT",
      };
    case "cancelled":
    case "canceled":
      return {
        bg: "bg-white",
        text: "text-[#6b6b6b]",
        border: "border-[#6b6b6b]",
        label: "CANCELLED",
      };
    case "draft":
    default:
      return {
        bg: "bg-[#ff4d00]",
        text: "text-white",
        border: "border-[#ff4d00]",
        label: "DRAFT",
      };
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatUsd(amount: number): string {
  return `USD ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function SummaryClient() {
  // Locked until the owner enters the password. We initialize from
  // sessionStorage so the owner only has to type it once per browser tab.
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false); // avoid hydration flash

  const [stats, setStats] = useState<SummaryStats | null>(null);
  const [pis, setPis] = useState<PiListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Password gate state
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);

  useEffect(() => {
    // Read unlock flag from sessionStorage after mount (avoids SSR mismatch).
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        setUnlocked(true);
      }
    } catch {
      // sessionStorage may be unavailable (e.g. private mode quirks) — ignore.
    }
    setReady(true);
  }, []);

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

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/pi/list/", { cache: "no-store" });
      if (!res.ok) {
        const t = await res.text();
        setError(`Load failed (${res.status}): ${t}`);
        return;
      }
      const data = (await res.json()) as {
        summary: SummaryStats;
        pis: PiListItem[];
      };
      setStats(data.summary);
      setPis(data.pis);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (unlocked) {
      void fetchData();
    }
  }, [unlocked]);

  // ---------- Locked view ----------

  if (ready && !unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-4 py-12">
        <div className="w-full max-w-md border-2 border-black bg-white p-8 shadow-[6px_6px_0_0_rgba(10,10,10,1)]">
          <div className="mb-5 flex h-12 w-12 items-center justify-center border-2 border-black bg-[#0a0a0a] text-white">
            <Lock className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <h1 className="mb-1 text-2xl font-black uppercase leading-tight tracking-tight">
            PI Summary
          </h1>
          <p className="mb-5 text-sm text-[#6b6b6b]">
            Owner-only. Enter the password to view sales overview.
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

  // ---------- Main summary view ----------

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
              <div className="text-lg font-black leading-none">PI Summary</div>
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
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl">
            PI Overview
          </h1>
          <p className="max-w-2xl text-lg text-[#6b6b6b]">
            All proforma invoices in one place. Showing the {pis.length} most
            recent PIs.
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 border-2 border-[#ff4d00] bg-white p-4 text-sm font-bold text-[#ff4d00]">
            {error}
          </div>
        )}

        {/* Stat cards */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<FileText className="h-6 w-6" strokeWidth={2.5} />}
            label="Total PIs"
            value={stats ? String(stats.totalCount) : "—"}
            sub={
              stats && stats.totalCount > stats.shownCount
                ? `Showing ${stats.shownCount} here`
                : "All time"
            }
            accent="#0a0a0a"
          />
          <StatCard
            icon={<Calendar className="h-6 w-6" strokeWidth={2.5} />}
            label="This Month"
            value={stats ? String(stats.monthCount) : "—"}
            sub="PIs created"
            accent="#00c2ff"
          />
          <StatCard
            icon={<DollarSign className="h-6 w-6" strokeWidth={2.5} />}
            label="Total Value"
            value={stats ? formatUsd(stats.totalValueUsd) : "—"}
            sub="All time, USD-eq."
            accent="#ff4d00"
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6" strokeWidth={2.5} />}
            label="This Month Value"
            value={stats ? formatUsd(stats.monthValueUsd) : "—"}
            sub="USD-equivalent"
            accent="#ff4d00"
          />
        </div>

        {/* PI list */}
        <div className="border-2 border-black bg-white">
          <div className="flex items-center justify-between border-b-2 border-black bg-[#0a0a0a] px-6 py-4 text-white">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" strokeWidth={2.5} />
              <h2 className="text-lg font-black uppercase tracking-tight">
                Recent PIs
              </h2>
            </div>
            <Link
              href="/admin/new-pi/"
              className="bg-[#ff4d00] px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#e64500]"
            >
              + New PI
            </Link>
          </div>

          {loading && !stats ? (
            <div className="px-6 py-16 text-center text-sm text-[#6b6b6b]">
              <RefreshCw
                className="mx-auto mb-2 h-6 w-6 animate-spin"
                strokeWidth={2.5}
              />
              Loading…
            </div>
          ) : pis.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mb-2 text-base font-black uppercase tracking-tight">
                No PIs yet
              </div>
              <div className="mb-4 text-sm text-[#6b6b6b]">
                Create your first proforma invoice to see it here.
              </div>
              <Link
                href="/admin/new-pi/"
                className="inline-block bg-[#ff4d00] px-4 py-2 text-sm font-black uppercase tracking-wider text-white hover:bg-[#e64500]"
              >
                + Create a PI
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-black bg-[#faf9f6] text-xs font-black uppercase tracking-wider text-[#6b6b6b]">
                    <th className="px-4 py-3">PI Number</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Total</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">View</th>
                  </tr>
                </thead>
                <tbody>
                  {pis.map((p) => {
                    const sc = statusColor(p.status);
                    return (
                      <tr
                        key={String(p.id)}
                        className="border-b border-[#e5e5e5] transition-colors last:border-b-0 hover:bg-[#faf9f6]"
                      >
                        <td className="px-4 py-3 font-black tracking-tight">
                          {p.piNumber}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold">
                            {p.customerName || "—"}
                          </div>
                          {p.customerCompany && (
                            <div className="text-xs text-[#6b6b6b]">
                              {p.customerCompany}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-[#6b6b6b]">
                          {formatDate(p.createdAt)}
                        </td>
                        <td className="px-4 py-3 text-right font-bold">
                          {p.totalDisplay}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block border-2 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${sc.bg} ${sc.text} ${sc.border}`}
                          >
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Link
                            href={`/pay/?pi=${encodeURIComponent(p.piNumber)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-black hover:text-[#ff4d00]"
                            title="Open public PI page"
                          >
                            <Eye className="h-3.5 w-3.5" strokeWidth={2.5} />
                            Open
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footnote */}
        <div className="mt-8 text-xs text-[#6b6b6b]">
          Values are USD-equivalent. Currencies other than USD are summed at
          face value without conversion — fine for an internal overview, not for
          financial reporting.
        </div>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent: string;
}) {
  return (
    <div className="border-2 border-black bg-white p-5 shadow-[4px_4px_0_0_rgba(10,10,10,1)]">
      <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#6b6b6b]">
        <span style={{ color: accent }}>{icon}</span>
        <span>{label}</span>
      </div>
      <div className="text-2xl font-black tracking-tight text-black md:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs text-[#6b6b6b]">{sub}</div>
    </div>
  );
}
