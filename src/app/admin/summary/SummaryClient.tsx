"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  RefreshCw,
  FileText,
  Calendar,
  TrendingUp,
  Eye,
  Lock,
  Trash2,
  AlertTriangle,
  X,
  Coins,
  Pencil,
  Filter,
} from "lucide-react";
import type { FxRates } from "@/lib/fx-rates";

// Owner-only access. Change this string to whatever you'd like — it's the
// only thing standing between anyone who finds the URL and your sales data.
// We do NOT rely on this for real security; the assumption is that no one
// outside the owner knows this page exists. The password just keeps a
// curious teammate from casually opening /admin/summary/.
const OWNER_PASSWORD = "HOMEdorm521$$$";
const SESSION_KEY = "pi_summary_unlocked";

interface PiListItem {
  id: number | string;
  piNumber: string;
  customerName: string | null;
  customerCompany: string | null;
  totalCents: number | null;
  currency: string | null;
  totalDisplay: string;
  status: string | null;
  createdAt: string;
}

interface CurrencyBucket {
  cents: number;
  display: string;
}

interface SummaryStats {
  totalCount: number;
  shownCount: number;
  monthCount: number;
  // 2026-10-04 (R83): per-currency real-exposure totals + USD-equivalent
  // aggregates. Replaces the single-page "USD-eq" sum we had before.
  totalsByCurrency: Record<string, CurrencyBucket>;
  monthTotalsByCurrency: Record<string, CurrencyBucket>;
  totalValueUsdCents: number;
  totalValueUsdDisplay: string;
  monthValueUsdCents: number;
  monthValueUsdDisplay: string;
  fx: FxRates;
  // 2026-10-13 (Phase A.2): echoed customer id filter from the server, so
  // the dropdown can sync to the URL on first paint without re-parsing.
  customerFilter: string;
}

// 2026-10-13 (Phase A.2): a row from the customer archive used to
// populate the customer-filter dropdown.
interface CustomerOption {
  id: string;
  customer_name: string;
  company: string | null;
  email: string | null;
  pi_count: number | null;
  last_used_at: string | null;
}

// 2026-10-13 (Phase A.3): per-currency aggregate computed client-side
// from the currently-visible PI list. Used to render the Amount
// sub-header directly above the data rows.
interface CurrencyAggregate {
  currency: string;
  count: number;
  // totals excluding cancelled PIs (i.e. "real" exposure)
  totalCents: number;
  paidCents: number;
  pendingCents: number;
  cancelledCents: number;
  totalDisplay: string;
  paidDisplay: string;
  pendingDisplay: string;
  cancelledDisplay: string;
}

// 2026-10-13 (Phase A.3): payment status helpers. We accept several
// aliases because the Stripe webhook and the manual-mark-paid flow write
// different strings into proforma_invoices.status.
function isPaidStatus(status: string | null): boolean {
  if (!status) return false;
  const s = status.toLowerCase();
  return s === "paid" || s === "succeeded" || s === "completed" || s === "true";
}

function isCancelledStatus(status: string | null): boolean {
  if (!status) return false;
  const s = status.toLowerCase();
  return s === "cancelled" || s === "canceled";
}

// 2026-10-13 (Phase A.3): compute one row per currency that appears in
// the current PI list. Currencies are NOT converted — we show real
// exposure per currency. Cancelled PIs are counted but excluded from
// "total" because they're not real revenue.
function aggregateByCurrency(items: PiListItem[]): CurrencyAggregate[] {
  const buckets = new Map<string, CurrencyAggregate>();
  for (const p of items) {
    const cur = (p.currency || "USD").toUpperCase();
    let agg = buckets.get(cur);
    if (!agg) {
      agg = {
        currency: cur,
        count: 0,
        totalCents: 0,
        paidCents: 0,
        pendingCents: 0,
        cancelledCents: 0,
        totalDisplay: "—",
        paidDisplay: "—",
        pendingDisplay: "—",
        cancelledDisplay: "—",
      };
      buckets.set(cur, agg);
    }
    agg.count += 1;
    const cents = typeof p.totalCents === "number" ? p.totalCents : 0;
    if (isCancelledStatus(p.status)) {
      agg.cancelledCents += cents;
    } else {
      agg.totalCents += cents;
      if (isPaidStatus(p.status)) agg.paidCents += cents;
      else agg.pendingCents += cents;
    }
  }
  for (const agg of buckets.values()) {
    agg.totalDisplay = formatCurrency(agg.totalCents, agg.currency);
    agg.paidDisplay = formatCurrency(agg.paidCents, agg.currency);
    agg.pendingDisplay = formatCurrency(agg.pendingCents, agg.currency);
    agg.cancelledDisplay = formatCurrency(agg.cancelledCents, agg.currency);
  }
  // Stable sort: USD first, then alphabetical.
  return Array.from(buckets.values()).sort((a, b) => {
    if (a.currency === "USD" && b.currency !== "USD") return -1;
    if (b.currency === "USD" && a.currency !== "USD") return 1;
    return a.currency.localeCompare(b.currency);
  });
}

// 2026-10-13 (Phase A.3): simple currency formatter for the sub-header.
// Uses Intl.NumberFormat so the comma-separator + 2 decimals match
// formatCentsInCurrency() on the server side.
function formatCurrency(cents: number, currency: string): string {
  if (!cents) return `${currency} 0.00`;
  const value = cents / 100;
  return `${currency} ${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
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

  // 2026-10-04 (R82): per-row Delete UI state. `confirmTarget` holds the
  // PI the admin is currently being asked to confirm deletion of; null
  // means the modal is closed. `deleting` is true while the network
  // request is in flight (disables the confirm button, shows a spinner).
  const [confirmTarget, setConfirmTarget] = useState<PiListItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // 2026-10-13 (Phase A.2): customer filter state. `customerFilter`
  // holds the customer id (NOT the name) — the dropdown values are
  // customer ids and the server resolves the id -> name. Empty string
  // means "no filter".
  const [customerFilter, setCustomerFilter] = useState<string>("");
  // 2026-10-13 (Phase A.2): dropdown options. Loaded once on first
  // unlock, ordered by last_used_at DESC NULLS LAST (matches the
  // server-side default in /api/admin/customers/list).
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>(
    [],
  );

  // 2026-10-13 (Phase C.4): case-insensitive lookup from customer name
  // -> customers.id so the PI list rows can link to /admin/customers/[id]/.
  // Multiple customers can share a name when their emails differ; the
  // first one in the dropdown wins. Stable across renders (no useMemo
  // needed — the list rarely has duplicates and the cost is trivial).
  const customerIdByName: Map<string, string> = new Map(
    customerOptions.map((c) => [c.customer_name.toLowerCase(), c.id]),
  );

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

  async function fetchData(customerId: string) {
    setLoading(true);
    setError(null);
    try {
      const url = customerId
        ? `/api/pi/list/?customer=${encodeURIComponent(customerId)}`
        : "/api/pi/list/";
      const res = await fetch(url, { cache: "no-store" });
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

  // 2026-10-13 (Phase A.2): load the customer archive once on unlock.
  // Errors here are non-fatal — the dropdown just shows "All customers".
  async function fetchCustomers() {
    try {
      const res = await fetch("/api/admin/customers/list/", {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = (await res.json()) as { customers: CustomerOption[] };
      setCustomerOptions(data.customers || []);
    } catch {
      // non-fatal
    }
  }

  // 2026-10-13 (Phase A.2): read ?customer=<id> from the URL on first
  // unlock so deep-links / refreshes stay sticky.
  useEffect(() => {
    if (!unlocked) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("customer") || "";
      setCustomerFilter(id);
      void fetchData(id);
      void fetchCustomers();
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked]);

  // 2026-10-13 (Phase A.2): when the dropdown changes (and we're
  // already unlocked), re-fetch and push to the URL. We use
  // history.replaceState instead of router.push so a filter tweak
  // doesn't bloat the browser history.
  function onCustomerFilterChange(id: string) {
    setCustomerFilter(id);
    void fetchData(id);
    try {
      const url = new URL(window.location.href);
      if (id) {
        url.searchParams.set("customer", id);
      } else {
        url.searchParams.delete("customer");
      }
      window.history.replaceState({}, "", url.toString());
    } catch {
      // ignore
    }
  }

  // 2026-10-04 (R82): Delete flow. The flow is:
  //   1. Admin clicks the trash icon → setConfirmTarget(p) opens the modal.
  //   2. Admin types the exact PI number into the input.
  //   3. The "Delete permanently" button enables only when input === p.piNumber.
  //   4. POST /api/pi/delete/. On success, close modal + re-fetch the list.
  //   5. On failure, surface the error inline; modal stays open.
  function requestDelete(p: PiListItem) {
    setDeleteError(null);
    setConfirmTarget(p);
  }

  function cancelDelete() {
    if (deleting) return; // never close mid-flight
    setConfirmTarget(null);
    setDeleteError(null);
  }

  async function confirmDelete() {
    if (!confirmTarget || deleting) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch("/api/pi/delete/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ piNumber: confirmTarget.piNumber }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
        hint?: string;
      };
      if (!res.ok || !data.success) {
        const msg = data.hint
          ? `${data.error || "Delete failed"} — ${data.hint}`
          : data.error || `Delete failed (${res.status})`;
        setDeleteError(msg);
        return;
      }
      // success — close modal and refresh the list
      setConfirmTarget(null);
      await fetchData(customerFilter);
    } catch (e) {
      setDeleteError(
        e instanceof Error ? e.message : "Network error"
      );
    } finally {
      setDeleting(false);
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
              onClick={() => void fetchData(customerFilter)}
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
          <ByCurrencyCard
            icon={<Coins className="h-6 w-6" strokeWidth={2.5} />}
            label="By Currency"
            stats={stats}
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6" strokeWidth={2.5} />}
            label="USD Equivalent"
            value={stats ? stats.totalValueUsdDisplay : "—"}
            sub={
              stats
                ? `Rates as of ${stats.fx.asOf} · ${stats.fx.source}`
                : "Rates as of —"
            }
            accent="#ff4d00"
          />
        </div>

        {/* PI list */}
        <div className="border-2 border-black bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black bg-[#0a0a0a] px-6 py-4 text-white">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" strokeWidth={2.5} />
              <h2 className="text-lg font-black uppercase tracking-tight">
                Recent PIs
              </h2>
            </div>
            {/* 2026-10-13 (Phase A.2): customer filter dropdown. Shows
                "All customers" by default. When a customer is picked we
                re-fetch and update the URL via onCustomerFilterChange. */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="customer-filter"
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#9a9a9a]"
              >
                <Filter className="h-3.5 w-3.5" strokeWidth={2.5} />
                Customer
              </label>
              <div className="relative">
                <select
                  id="customer-filter"
                  value={customerFilter}
                  onChange={(e) => onCustomerFilterChange(e.target.value)}
                  className="appearance-none border-2 border-[#0a0a0a] bg-white py-1.5 pl-3 pr-8 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/40"
                >
                  <option value="">
                    All customers ({customerOptions.length})
                  </option>
                  {customerOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.customer_name}
                      {c.company ? ` · ${c.company}` : ""}
                      {c.pi_count != null && c.pi_count > 0
                        ? ` (${c.pi_count})`
                        : ""}
                    </option>
                  ))}
                </select>
                {customerFilter ? (
                  <button
                    type="button"
                    onClick={() => onCustomerFilterChange("")}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-[#6b6b6b] hover:text-[#ff4d00]"
                    aria-label="Clear customer filter"
                    title="Clear filter"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>
                ) : (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#6b6b6b]"
                  >
                    ▾
                  </span>
                )}
              </div>
              <Link
                href="/admin/new-pi/"
                className="bg-[#ff4d00] px-3 py-1.5 text-xs font-black uppercase tracking-wider text-black hover:bg-[#e64500]"
              >
                + New PI
              </Link>
              <Link
                href="/admin/customers/"
                className="border-2 border-[#0a0a0a] bg-white px-3 py-1.5 text-xs font-black uppercase tracking-wider text-black hover:bg-[#0a0a0a] hover:text-white"
                target="_blank"
              >
                View all customers →
              </Link>
            </div>
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
                {customerFilter ? "No PIs for this customer" : "No PIs yet"}
              </div>
              <div className="mb-4 text-sm text-[#6b6b6b]">
                {customerFilter
                  ? "Try a different customer or clear the filter."
                  : "Create your first proforma invoice to see it here."}
              </div>
              {customerFilter ? (
                <button
                  type="button"
                  onClick={() => onCustomerFilterChange("")}
                  className="inline-block border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wider text-black hover:bg-neutral-100"
                >
                  Clear filter
                </button>
              ) : (
                <Link
                  href="/admin/new-pi/"
                  className="inline-block bg-[#ff4d00] px-4 py-2 text-sm font-black uppercase tracking-wider text-black hover:bg-[#e64500]"
                >
                  + Create a PI
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-black bg-[#faf9f6] text-xs font-black uppercase tracking-wider text-[#6b6b6b]">
                    <th className="px-4 py-3">PI Number</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Date</th>
                    {/* 2026-10-13 (Phase A.3): renamed "Total" -> "Amount"
                        because the column now reads against a sub-header
                        that displays total / paid / pending / cancelled
                        per currency directly above it. */}
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">View</th>
                    <th className="px-4 py-3 text-right">Edit</th>
                    <th className="px-4 py-3 text-right">Delete</th>
                  </tr>
                </thead>
                {/* 2026-10-13 (Phase A.3): per-currency sub-header.
                    Sits between thead and the data rows. One row per
                    currency that appears in the current PI list, with
                    total / paid / pending / cancelled breakdown. The
                    sub-header visually anchors to the "Amount" column
                    via a right-aligned grid that starts at that column. */}
                {(() => {
                  const aggs = aggregateByCurrency(pis);
                  if (aggs.length === 0) return null;
                  return (
                    <tbody>
                      {aggs.map((agg) => (
                        <tr
                          key={agg.currency}
                          className="border-b-2 border-[#f0b400] bg-[#fff8e1] text-xs"
                        >
                          <td
                            colSpan={3}
                            className="px-4 py-2 align-top"
                          >
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 border-2 border-[#0a0a0a] bg-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-black">
                                <Coins
                                  className="h-3 w-3"
                                  strokeWidth={2.5}
                                />
                                {agg.currency}
                              </span>
                              <span className="font-black uppercase tracking-wider text-[#6b6b6b]">
                                {agg.count}{" "}
                                {agg.count === 1 ? "PI" : "PIs"}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-right align-top">
                            <div className="flex flex-col items-end gap-0.5">
                              <span className="font-black text-black">
                                {agg.totalDisplay}
                              </span>
                              <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-0.5 text-[10px] font-bold">
                                {agg.paidCents > 0 && (
                                  <span
                                    className="text-[#388e3c]"
                                    title="Paid"
                                  >
                                    paid {agg.paidDisplay}
                                  </span>
                                )}
                                {agg.pendingCents > 0 && (
                                  <span
                                    className="text-[#cc3d00]"
                                    title="Pending / unpaid"
                                  >
                                    pending {agg.pendingDisplay}
                                  </span>
                                )}
                                {agg.cancelledCents > 0 && (
                                  <span
                                    className="text-[#999]"
                                    title="Cancelled (not counted in total)"
                                  >
                                    cancelled {agg.cancelledDisplay}
                                  </span>
                                )}
                                <span
                                  className="text-[#1976d2]"
                                  title="Total across all statuses"
                                >
                                  total {agg.totalDisplay}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-2 align-top" />
                          <td className="px-4 py-2 text-right align-top" />
                          <td className="px-4 py-2 text-right align-top" />
                          <td className="px-4 py-2 text-right align-top" />
                        </tr>
                      ))}
                    </tbody>
                  );
                })()}
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
                          {p.customerName && customerIdByName.has(p.customerName.toLowerCase()) ? (
                            <Link
                              href={`/admin/customers/?id=${customerIdByName.get(p.customerName.toLowerCase())}`}
                              className="font-bold text-black underline-offset-2 hover:text-[#ff4d00] hover:underline"
                              title={`Open ${p.customerName} profile`}
                            >
                              {p.customerName}
                            </Link>
                          ) : (
                            <div className="font-bold">
                              {p.customerName || "—"}
                            </div>
                          )}
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
                        <td className="px-4 py-3 text-right">
                          {sc.label === "DRAFT" || sc.label === "SENT" ? (
                            <Link
                              href={`/admin/edit-pi/?pi=${encodeURIComponent(p.piNumber)}`}
                              className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-black hover:text-[#ff4d00]"
                              title={`Edit PI ${p.piNumber}`}
                            >
                              <Pencil className="h-3.5 w-3.5" strokeWidth={2.5} />
                              Edit
                            </Link>
                          ) : (
                            <span
                              className="inline-flex cursor-not-allowed items-center gap-1 text-xs font-black uppercase tracking-wider text-[#c0c0c0]"
                              title={`PI status "${sc.label}" is locked for editing.`}
                            >
                              <Lock className="h-3.5 w-3.5" strokeWidth={2.5} />
                              Locked
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {sc.label === "PAID" ? (
                            <span
                              className="inline-flex cursor-not-allowed items-center gap-1 text-xs font-black uppercase tracking-wider text-[#c0c0c0]"
                              title="Paid PIs cannot be deleted. Refund via Stripe Dashboard first."
                            >
                              <Lock className="h-3.5 w-3.5" strokeWidth={2.5} />
                              Locked
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => requestDelete(p)}
                              className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#6b6b6b] hover:text-[#ff4d00]"
                              title={`Delete PI ${p.piNumber}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                              Delete
                            </button>
                          )}
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
        <div className="mt-8 space-y-2 text-xs text-[#6b6b6b]">
          <p>
            Per-row amounts are the PI’s actual currency. Per-currency totals
            show real exposure. The &ldquo;USD Equivalent&rdquo; card uses a hardcoded
            FX table for a single headline number — fine for an internal
            overview, not for financial reporting.
          </p>
          {stats?.fx && (
            <p>
              Rates as of <span className="font-bold">{stats.fx.asOf}</span>
              {" "}({stats.fx.source}):{" "}
              {Object.entries(stats.fx.rates)
                .map(
                  ([code, rate]) =>
                    `1 ${stats.fx.baseCurrency} = ${rate} ${code}`,
                )
                .join(" · ")}
              .
            </p>
          )}
        </div>
      </div>

      {confirmTarget && (
        <DeleteConfirmModal
          target={confirmTarget}
          deleting={deleting}
          error={deleteError}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
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


// ─── Delete confirm modal ────────────────────────────────────────────────
// 2026-10-04 (R82): confirmation UI for the per-row Delete button.
// Renders only when `target` is non-null (parent owns the open/close state).
//
// The "Delete permanently" button is disabled until the admin types the
// exact PI number. This is the cheapest possible safeguard against an
// accidental mis-click — far better than a `window.confirm()` they can
// tab-past in 0.5s, and avoids the bulk of any custom keyboard trap logic.
function DeleteConfirmModal({
  target,
  deleting,
  error,
  onCancel,
  onConfirm,
}: {
  target: PiListItem;
  deleting: boolean;
  error: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [typed, setTyped] = useState("");
  // Reset the input every time a new target is opened.
  useEffect(() => {
    setTyped("");
  }, [target.piNumber]);

  const matches = typed.trim() === target.piNumber;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !deleting) onCancel();
      }}
    >
      <div className="w-full max-w-md border-2 border-black bg-white shadow-[8px_8px_0_0_rgba(255,77,0,1)]">
        <div className="flex items-start justify-between border-b-2 border-black bg-[#ff4d00] px-5 py-3 text-black">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" strokeWidth={2.5} />
            <h2 id="delete-modal-title" className="text-base font-black uppercase tracking-tight">
              Delete this PI?
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="text-black hover:opacity-70 disabled:opacity-30"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-5 py-5">
          <p className="mb-4 text-sm text-[#0a0a0a]">
            You are about to permanently delete this proforma invoice. This
            cannot be undone.
          </p>

          <dl className="mb-5 space-y-1 border-l-2 border-[#ff4d00] bg-[#fff7f3] px-3 py-2 text-xs">
            <div className="flex justify-between gap-3">
              <dt className="font-black uppercase tracking-wider text-[#6b6b6b]">PI Number</dt>
              <dd className="font-bold">{target.piNumber}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="font-black uppercase tracking-wider text-[#6b6b6b]">Customer</dt>
              <dd className="font-bold">{target.customerName || "—"}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="font-black uppercase tracking-wider text-[#6b6b6b]">Total</dt>
              <dd className="font-bold">{target.totalDisplay}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="font-black uppercase tracking-wider text-[#6b6b6b]">Status</dt>
              <dd className="font-bold uppercase">{target.status || "draft"}</dd>
            </div>
          </dl>

          <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#6b6b6b]">
            Type <code className="rounded bg-[#0a0a0a] px-1.5 py-0.5 text-[10px] text-white">{target.piNumber}</code> to confirm
          </label>
          <input
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            disabled={deleting}
            autoFocus
            autoComplete="off"
            spellCheck={false}
            placeholder={target.piNumber}
            className="mb-2 w-full border-2 border-black bg-white px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/40 disabled:opacity-50"
          />

          {error && (
            <div className="mb-3 border-2 border-[#ff4d00] bg-white px-3 py-2 text-xs font-bold text-[#ff4d00]">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={deleting}
              className="border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-black hover:bg-neutral-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={!matches || deleting}
              className="inline-flex items-center gap-1.5 bg-[#ff4d00] px-4 py-2 text-xs font-black uppercase tracking-wider text-black hover:bg-[#e64500] disabled:opacity-40"
            >
              {deleting ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" strokeWidth={2.5} />
                  Deleting…
                </>
              ) : (
                <>
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Delete permanently
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ──── By-currency totals card ─────────────────────────────────────────
// 2026-10-04 (R83): renders one row per currency, showing the real total
// for that currency. Currencies with $0 are rendered as muted "no
// activity" so the admin can see at-a-glance which currencies have been
// used vs. which are just available.
//
// We rely on the server pre-seeding TRACKED_CURRENCIES (USD/EUR/GBP/CNY)
// so the card always shows the same set of rows in the same order.
function ByCurrencyCard({
  icon,
  label,
  stats,
}: {
  icon: React.ReactNode;
  label: string;
  stats: SummaryStats | null;
}) {
  // Stable display order: USD, EUR, GBP, CNY, then anything the server
  // sent that we don't explicitly track (e.g. a PI in JPY). Anything
  // we don't recognise shows up at the bottom.
  const PREFERRED_ORDER = ["USD", "EUR", "GBP", "CNY"];
  const entries = stats
    ? Object.entries(stats.totalsByCurrency).sort(([a], [b]) => {
        const ai = PREFERRED_ORDER.indexOf(a);
        const bi = PREFERRED_ORDER.indexOf(b);
        if (ai === -1 && bi === -1) return a.localeCompare(b);
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      })
    : [];

  return (
    <div className="border-2 border-black bg-white p-5 shadow-[4px_4px_0_0_rgba(10,10,10,1)]">
      <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#6b6b6b]">
        <span style={{ color: "#00c2ff" }}>{icon}</span>
        <span>{label}</span>
      </div>
      {!stats ? (
        <div className="text-2xl font-black tracking-tight text-black md:text-3xl">
          —
        </div>
      ) : entries.length === 0 ? (
        <div className="text-2xl font-black tracking-tight text-black md:text-3xl">
          —
        </div>
      ) : (
        <ul className="space-y-1.5">
          {entries.map(([code, bucket]) => {
            const isActive = bucket.cents > 0;
            return (
              <li
                key={code}
                className={
                  "flex items-baseline justify-between gap-3 " +
                  (isActive ? "" : "opacity-40")
                }
              >
                <span className="font-black uppercase tracking-wider text-[10px] text-[#6b6b6b]">
                  {code}
                </span>
                <span
                  className={
                    "font-bold tracking-tight " +
                    (isActive ? "text-black" : "text-[#9a9a9a]")
                  }
                >
                  {isActive ? bucket.display : "no activity"}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
