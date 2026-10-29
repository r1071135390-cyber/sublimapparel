"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  RefreshCw,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Hash,
  AlertTriangle,
  User,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-token";

interface CustomerDetail {
  id: string;
  customer_name: string;
  company: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  pi_count: number | null;
  last_used_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// 2026-10-13 (Phase C.5): minimal shape we need from the list endpoint
// when resolving a ?name= to an id. Mirrors CustomersClient's row shape.
interface CustomerOption {
  id: string;
  customer_name: string;
  company: string | null;
}

interface PiRow {
  id: string;
  pi_number: string;
  customer_name: string | null;
  customer_company: string | null;
  total_cents: number | null;
  currency: string | null;
  status: string | null;
  paid_at: string | null;
  created_at: string | null;
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

function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${y}-${m}-${day} ${hh}:${mm} UTC`;
}

function formatAmount(cents: number | null, currency: string | null): string {
  if (cents == null) return "—";
  const amount = cents / 100;
  const cur = (currency || "USD").toUpperCase();
  return `${cur} ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function statusBadge(status: string | null) {
  const s = (status || "draft").toLowerCase();
  const base =
    "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-black uppercase tracking-wider";
  if (s === "paid") {
    return (
      <span className={`${base} bg-[#0a0a0a] text-white`}>
        <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
        Paid
      </span>
    );
  }
  if (s === "sent") {
    return (
      <span className={`${base} bg-[#ff4d00] text-black`}>
        <Clock className="h-3 w-3" strokeWidth={3} />
        Sent
      </span>
    );
  }
  if (s === "pending_bank") {
    return (
      <span className={`${base} bg-[#ff4d00] text-black`}>
        <Clock className="h-3 w-3" strokeWidth={3} />
        Wire pending
      </span>
    );
  }
  if (s === "canceled" || s === "expired") {
    return (
      <span className={`${base} border border-[#0a0a0a] bg-white text-[#0a0a0a]`}>
        <XCircle className="h-3 w-3" strokeWidth={3} />
        {s === "canceled" ? "Canceled" : "Expired"}
      </span>
    );
  }
  return (
    <span className={`${base} border border-[#6b6b6b] bg-white text-[#6b6b6b]`}>
      Draft
    </span>
  );
}

// 2026-10-13 (Phase C): read the customer id from the ?id= search
// param instead of a route segment. The site uses Next.js
// `output: "export"` (Cloudflare Pages static export), which does
// not support dynamic [id] routes without `generateStaticParams()`
// returning all possible ids — which we can't know at build time.
// Falling through to /administered/customers/?id=<n> is the simplest fix.
//
// 2026-10-13 (Phase C.5 link fallback): also accept ?name=<encoded>.
// When the summary table links to a PI whose customer_name does not
// exactly match a row in the customers archive (whitespace / casing
// drift), we still want to land on a real detail page. The flow:
//   1. /administered/customers/?name=Foo hits this component.
//   2. fetchData() looks up "Foo" via /api/admin/customers/list/?search=Foo
//      and resolves it to an id (case-insensitive + trim match).
//   3. We then load /api/admin/customers/<id>/ as usual.
//   4. The URL bar is rewritten to ?id=<n> so subsequent refreshes
//      don't re-run the name lookup.
export default function CustomerDetailClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const name = searchParams.get("name") || "";

  // ---------- Data state ----------
  const [customer, setCustomer] = useState<CustomerDetail | null>(null);
  const [pis, setPis] = useState<PiRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2026-10-13 (Phase C.5): resolve a ?name= lookup to a customer id
  // via the list endpoint. Returns the resolved id, or null if no
  // exact (case-insensitive + trim) match was found.
  const resolveNameToId = useCallback(
    async (rawName: string): Promise<string | null> => {
      const target = rawName.trim().toLowerCase();
      if (!target) return null;
      const res = await adminFetch(
        `/api/admin/customers/list/?search=${encodeURIComponent(
          rawName.trim(),
        )}&limit=20`,
        { cache: "no-store" },
      );
      if (!res.ok) return null;
      const data = (await res.json()) as {
        customers?: CustomerOption[];
      };
      const list = data.customers || [];
      // Prefer an exact case-insensitive + trim match, fall back to
      // the first result if the search was unique enough.
      const exact = list.find(
        (c) => c.customer_name.trim().toLowerCase() === target,
      );
      if (exact) return String(exact.id);
      if (list.length === 1) return String(list[0].id);
      return null;
    },
    [],
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let effectiveId = id;
      // If we were given ?name= instead of ?id=, run the lookup first.
      if (!effectiveId && name) {
        const resolved = await resolveNameToId(name);
        if (!resolved) {
          setError(
            `Customer "${name}" not found in the archive. ` +
              `(They may not have been added to the customers table yet.)`,
          );
          return;
        }
        effectiveId = resolved;
        // 2026-10-13 (Phase C.5): rewrite the URL bar to use ?id= so
        // refreshes don't re-run the name lookup. We use the same
        // history.replaceState pattern as the summary filter so it
        // doesn't bloat browser history.
        try {
          const u = new URL(window.location.href);
          u.searchParams.delete("name");
          u.searchParams.set("id", resolved);
          window.history.replaceState({}, "", u.toString());
        } catch {
          // ignore
        }
      }
      if (!effectiveId) {
        setError("Missing customer id or name in the URL.");
        return;
      }
      const res = await adminFetch(
        `/api/admin/customers/${encodeURIComponent(effectiveId)}/`,
        { cache: "no-store" },
      );
      if (!res.ok) {
        const t = await res.text();
        setError(`Load failed (${res.status}): ${t}`);
        return;
      }
      const data = (await res.json()) as {
        customer: CustomerDetail;
        pis: PiRow[];
      };
      setCustomer(data.customer);
      setPis(data.pis);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [id, name, resolveNameToId]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  // ---------- Loading state ----------
  if (loading && !customer) {
    return (
      <main className="min-h-screen bg-[#faf9f6]">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <RefreshCw
            className="mx-auto mb-3 h-8 w-8 animate-spin text-[#6b6b6b]"
            strokeWidth={2.5}
          />
          <p className="text-sm text-[#6b6b6b]">Loading customer…</p>
        </div>
      </main>
    );
  }

  // ---------- Error / not found ----------
  if (error || !customer) {
    return (
      <main className="min-h-screen bg-[#faf9f6]">
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
                <div className="text-lg font-black leading-none">
                  Customer Detail
                </div>
              </div>
            </div>
            <Link
              href="/administered/customers/"
              className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-black hover:text-[#ff4d00]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
              Back to customers
            </Link>
          </div>
        </header>
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-6 flex items-start gap-2 border-2 border-[#ff4d00] bg-white p-4 text-sm font-bold text-[#ff4d00]">
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0"
              strokeWidth={2.5}
            />
            <span>{error || "Customer not found."}</span>
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
              <div className="text-lg font-black leading-none">
                Customer Detail
              </div>
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
              href="/administered/customers/"
              className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-black hover:text-[#ff4d00]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
              Back to customers
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl">
            {customer.customer_name}
          </h1>
          {customer.company && (
            <p className="text-lg text-[#6b6b6b]">{customer.company}</p>
          )}
        </div>

        {/* Profile + Stats grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          {/* Profile card */}
          <div className="border-2 border-black bg-white">
            <div className="flex items-center border-b-2 border-black bg-[#0a0a0a] px-5 py-3 text-white">
              <User className="mr-2 h-4 w-4" strokeWidth={2.5} />
              <h2 className="text-sm font-black uppercase tracking-tight">
                Profile
              </h2>
            </div>
            <dl className="divide-y divide-[#e5e5e5]">
              {customer.company && (
                <div className="flex items-start gap-3 px-5 py-3">
                  <Building2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#6b6b6b]"
                    strokeWidth={2.5}
                  />
                  <div className="min-w-0 flex-1">
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                      Company
                    </dt>
                    <dd className="text-sm font-bold">{customer.company}</dd>
                  </div>
                </div>
              )}
              {customer.email && (
                <div className="flex items-start gap-3 px-5 py-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#6b6b6b]"
                    strokeWidth={2.5}
                  />
                  <div className="min-w-0 flex-1">
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                      Email
                    </dt>
                    <dd className="break-all text-sm font-bold">
                      <a
                        href={`mailto:${customer.email}`}
                        className="hover:text-[#ff4d00]"
                      >
                        {customer.email}
                      </a>
                    </dd>
                  </div>
                </div>
              )}
              {customer.phone && (
                <div className="flex items-start gap-3 px-5 py-3">
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#6b6b6b]"
                    strokeWidth={2.5}
                  />
                  <div className="min-w-0 flex-1">
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                      Phone
                    </dt>
                    <dd className="text-sm font-bold">{customer.phone}</dd>
                  </div>
                </div>
              )}
              {customer.address && (
                <div className="flex items-start gap-3 px-5 py-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#6b6b6b]"
                    strokeWidth={2.5}
                  />
                  <div className="min-w-0 flex-1">
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                      Address
                    </dt>
                    <dd className="whitespace-pre-line text-sm font-bold">
                      {customer.address}
                    </dd>
                  </div>
                </div>
              )}
              {!customer.email &&
                !customer.phone &&
                !customer.address &&
                !customer.company && (
                  <div className="px-5 py-6 text-center text-sm text-[#6b6b6b]">
                    No profile details on file.
                  </div>
                )}
            </dl>
          </div>

          {/* Stats card */}
          <div className="border-2 border-black bg-white">
            <div className="flex items-center border-b-2 border-black bg-[#0a0a0a] px-5 py-3 text-white">
              <Hash className="mr-2 h-4 w-4" strokeWidth={2.5} />
              <h2 className="text-sm font-black uppercase tracking-tight">
                Activity
              </h2>
            </div>
            <dl className="divide-y divide-[#e5e5e5]">
              <div className="flex items-start gap-3 px-5 py-3">
                <FileText
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#6b6b6b]"
                  strokeWidth={2.5}
                />
                <div className="min-w-0 flex-1">
                  <dt className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                    Total PIs
                  </dt>
                  <dd className="text-sm font-black">
                    {customer.pi_count ?? pis.length}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3 px-5 py-3">
                <Calendar
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#6b6b6b]"
                  strokeWidth={2.5}
                />
                <div className="min-w-0 flex-1">
                  <dt className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                    Last PI
                  </dt>
                  <dd className="text-sm font-bold">
                    {formatDate(customer.last_used_at)}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3 px-5 py-3">
                <Calendar
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#6b6b6b]"
                  strokeWidth={2.5}
                />
                <div className="min-w-0 flex-1">
                  <dt className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                    Added
                  </dt>
                  <dd className="text-sm font-bold">
                    {formatDate(customer.created_at)}
                  </dd>
                </div>
              </div>
              {customer.updated_at && customer.updated_at !== customer.created_at && (
                <div className="flex items-start gap-3 px-5 py-3">
                  <RefreshCw
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#6b6b6b]"
                    strokeWidth={2.5}
                  />
                  <div className="min-w-0 flex-1">
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                      Last updated
                    </dt>
                    <dd className="text-sm font-bold">
                      {formatDateTime(customer.updated_at)}
                    </dd>
                  </div>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* PI History */}
        <div className="border-2 border-black bg-white">
          <div className="flex items-center justify-between border-b-2 border-black bg-[#0a0a0a] px-6 py-3 text-white">
            <div className="flex items-center">
              <FileText className="mr-2 h-4 w-4" strokeWidth={2.5} />
              <h2 className="text-sm font-black uppercase tracking-tight">
                PI History
              </h2>
              <span className="ml-3 text-xs font-bold text-[#9a9a9a]">
                {pis.length} record{pis.length === 1 ? "" : "s"}
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9a9a9a]">
              Newest first
            </span>
          </div>

          {pis.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-[#6b6b6b]">
              No PIs found for this customer yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-black bg-[#faf9f6] text-xs font-black uppercase tracking-wider text-[#6b6b6b]">
                    <th className="px-4 py-3">PI Number</th>
                    <th className="px-4 py-3">Issued</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3">Paid At</th>
                    <th className="px-4 py-3 text-right">Open</th>
                  </tr>
                </thead>
                <tbody>
                  {pis.map((pi) => (
                    <tr
                      key={pi.id}
                      className="border-b border-[#e5e5e5] transition-colors last:border-b-0 hover:bg-[#faf9f6]"
                    >
                      <td className="px-4 py-3">
                        <div className="font-black tracking-tight">
                          {pi.pi_number}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#6b6b6b]">
                        {formatDate(pi.created_at)}
                      </td>
                      <td className="px-4 py-3">{statusBadge(pi.status)}</td>
                      <td className="px-4 py-3 text-right font-black">
                        {formatAmount(pi.total_cents, pi.currency)}
                      </td>
                      <td className="px-4 py-3 text-[#6b6b6b]">
                        {formatDate(pi.paid_at)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/pay/?pi=${encodeURIComponent(pi.pi_number)}`}
                          className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-black hover:text-[#ff4d00]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open
                          <ExternalLink className="h-3 w-3" strokeWidth={3} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer link */}
        <div className="mt-8 flex items-center justify-between border-t-2 border-black pt-6">
          <Link
            href="/administered/customers/"
            className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-black hover:text-[#ff4d00]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            Back to all customers
          </Link>
          <Link
            href="/administered/new-pi/"
            className="inline-flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-[#ff4d00]"
          >
            Create new PI for {customer.customer_name.split(" ")[0]}
          </Link>
        </div>
      </div>
    </main>
  );
}