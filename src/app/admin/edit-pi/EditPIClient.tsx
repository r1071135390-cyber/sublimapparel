"use client";

/**
 * /admin/edit-pi/?pi=SA...
 *
 * 2026-10-04 (R84): page that loads an existing PI from
 *   GET /api/pi/{pi_number}
 * and pre-fills the same PIPreview form used by /admin/new-pi/.
 *
 * State machine:
 *   1. `loading`         → fetching the row + checking if editable
 *   2. `editable`        → form is mounted with the row's fields
 *   3. `readOnly`        → server returned a status outside
 *                          {draft, sent}; show a banner + a "go back"
 *                          link instead of a save button
 *   4. `notFound`        → 404 from the server
 *   5. `saved`           → PATCH /api/pi/update/ returned OK; show the
 *                          success panel with revisionNumber
 *
 * Why we share PIPreview (vs duplicating it): every form field, every
 * helper (BlackCell/RedInput/...) already lives in NewPIClient. The only
 * differences between "new" and "edit" are:
 *   - Initial state: populated from the DB instead of empty
 *   - Save handler:  PATCH /api/pi/update instead of POST /api/pi/create
 *   - piNumber:      locked (immutable; see update.ts header comment)
 *
 * Sharing the rendering code keeps both pages in sync automatically —
 * any future field added to the form shows up here with zero extra work.
 */

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Save,
  RefreshCw,
  ArrowLeft,
  Lock,
  AlertTriangle,
  CheckCircle2,
  History,
  X,
  Check,
} from "lucide-react";
import { PIPreview } from "../new-pi/NewPIClient";
import {
  getBankAccount,
  bankAccountFromRow,
  type BankAccount,
  type BankAccountRow,
  SUPPORTED_CURRENCIES,
  type SupportedCurrency,
} from "@/lib/bank-accounts";

// ─── Local types (mirror of NewPIClient's LineItem) ──────────────────────
type SizeRow = { label: string; qty: number };
type LineItem = {
  description: string;
  fabric: string;
  qty: number;
  unit: string;
  unitPrice: number;
  imageUrl: string;
  hasSizeBreakdown: boolean;
  sizes: SizeRow[];
};

// ─── Page wrapper (Suspense for useSearchParams) ──────────────────────────
export default function EditPIClient() {
  return (
    <Suspense fallback={<EditPILoadingShell />}>
      <EditPIClientInner />
    </Suspense>
  );
}

function EditPILoadingShell() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 py-8 px-4">
      <h1 className="sr-only">Edit Proforma Invoice</h1>
      <div className="max-w-5xl mx-auto text-center text-sm text-neutral-500">
        Loading PI…
      </div>
    </div>
  );
}

function EditPIClientInner() {
  const params = useSearchParams();
  const piNumberFromUrl = (params.get("pi") ?? "").trim();

  type LoadState =
    | { kind: "loading" }
    | { kind: "not_found"; piNumber: string }
    | { kind: "read_only"; piNumber: string; status: string }
    | { kind: "editable"; piNumber: string; revisionNumber: number }
    | { kind: "saved"; piNumber: string; revisionNumber: number };

  const [loadState, setLoadState] = useState<LoadState>({ kind: "loading" });
  const [error, setError] = useState<string | null>(null);

  // Form state ────────────────────────────────────────────────────────────
  const [issueDate, setIssueDate] = useState("");
  const [leadTimeText, setLeadTimeText] = useState("Within 30 days");
  const [currency, setCurrency] = useState<SupportedCurrency>("usd");
  // R103: live bank info from /api/admin/bank-accounts (dynamic) with
  // hardcoded BANK_ACCOUNTS fallback until the fetch resolves.
  const [bankInfo, setBankInfo] = useState<BankAccount>(() => getBankAccount(currency));
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/bank-accounts", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { ok: boolean; accounts?: BankAccountRow[] };
        if (cancelled || !data.accounts) return;
        const row = data.accounts.find((r) => r.currency === currency) ?? null;
        setBankInfo(bankAccountFromRow(row, currency));
      } catch {
        // keep hardcoded fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currency]);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [items, setItems] = useState<LineItem[]>([
    { description: "", fabric: "", qty: 1, unit: "set", unitPrice: 0, imageUrl: "", hasSizeBreakdown: false, sizes: [] },
  ]);
  const [shippingLabel, setShippingLabel] = useState("Shipping Cost");
  const [shippingMethod, setShippingMethod] = useState("DDP by AIR");
  const [shippingQty, setShippingQty] = useState(1);
  const [shippingCost, setShippingCost] = useState(118);

  const [termsPaymentText, setTermsPaymentText] = useState("");
  const [shippingTerm, setShippingTerm] = useState("DDP");

  // Saving state
  const [saving, setSaving] = useState(false);
  const [changeNote, setChangeNote] = useState("");

  const fileInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Load PI on mount ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!piNumberFromUrl) {
      setLoadState({ kind: "not_found", piNumber: "" });
      return;
    }
    void loadPi(piNumberFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [piNumberFromUrl]);

  async function loadPi(piNumber: string) {
    setLoadState({ kind: "loading" });
    setError(null);
    try {
      const res = await fetch(
        `/api/pi/${encodeURIComponent(piNumber)}`,
        { method: "GET" },
      );
      if (res.status === 404) {
        setLoadState({ kind: "not_found", piNumber });
        return;
      }
      if (!res.ok) {
        const txt = await res.text();
        setError(`Load failed (${res.status}): ${txt}`);
        setLoadState({ kind: "not_found", piNumber });
        return;
      }
      const data = (await res.json()) as { pi?: Record<string, unknown> };
      const row = data.pi;
      if (!row) {
        setLoadState({ kind: "not_found", piNumber });
        return;
      }

      const status = String(row.status ?? "").toLowerCase();
      if (status !== "draft" && status !== "sent") {
        setLoadState({ kind: "read_only", piNumber, status });
        return;
      }

      hydrateForm(row);
      setLoadState({ kind: "editable", piNumber, revisionNumber: 1 });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
      setLoadState({ kind: "not_found", piNumber });
    }
  }

  function hydrateForm(row: Record<string, unknown>) {
    const cur = String(row.currency ?? "usd").toLowerCase();
    const supported = (SUPPORTED_CURRENCIES as readonly string[]).includes(cur)
      ? (cur as SupportedCurrency)
      : "usd";
    setCurrency(supported);

    setIssueDate(
      typeof row.issue_date === "string" && row.issue_date.length > 0
        ? row.issue_date.slice(0, 10)
        : "",
    );
    setLeadTimeText(
      typeof row.lead_time_text === "string"
        ? row.lead_time_text
        : "Within 30 days",
    );
    setCustomerName(typeof row.customer_name === "string" ? row.customer_name : "");
    setCustomerEmail(typeof row.customer_email === "string" ? row.customer_email : "");
    setCustomerCompany(typeof row.customer_company === "string" ? row.customer_company : "");
    setCustomerAddress(typeof row.customer_address === "string" ? row.customer_address : "");
    setCustomerPhone(typeof row.customer_phone === "string" ? row.customer_phone : "");

    const rawItems = Array.isArray(row.items) ? (row.items as Array<Record<string, unknown>>) : [];
    if (rawItems.length > 0) {
      setItems(
        rawItems.map((it) => ({
          description: typeof it.description === "string" ? it.description : "",
          fabric: typeof it.fabric === "string" ? it.fabric : "",
          qty: Number(it.qty) || 0,
          unit: typeof it.unit === "string" ? it.unit : "pcs",
          unitPrice:
            typeof it.unit_price_cents === "number"
              ? it.unit_price_cents / 100
              : Number(it.unitPrice) || 0,
          imageUrl: typeof it.image_url === "string" ? it.image_url : "",
          hasSizeBreakdown: Array.isArray(it.sizes) && it.sizes.length > 0,
          sizes: Array.isArray(it.sizes)
            ? (it.sizes as Array<Record<string, unknown>>).map((s) => ({
                label: typeof s.label === "string" ? s.label : "",
                qty: Number(s.qty) || 0,
              }))
            : [],
        })),
      );
    }

    setShippingLabel(typeof row.shipping_label === "string" ? row.shipping_label : "Shipping Cost");
    setShippingMethod(typeof row.shipping_method === "string" ? row.shipping_method : "DDP by AIR");

    const shippingCents = Number(row.shipping_cents ?? 0) || 0;
    setShippingCost(shippingCents / 100);
    setShippingQty(1);

    setTermsPaymentText(
      typeof row.payment_terms_text === "string"
        ? row.payment_terms_text
        : typeof row.payment_terms === "string"
          ? row.payment_terms
          : "",
    );

    // shippingTerm is implicit from shipping_method / metadata; default to DDP.
    const methodText = typeof row.shipping_method === "string" ? row.shipping_method : "";
    const incotermMatch = methodText.match(/\b(DDP|FOB|EXW|CIF|DAP|DDU|CFR|CPT|CIP|DPU)\b/);
    setShippingTerm(incotermMatch ? incotermMatch[1] : "DDP");
  }

  // Derived totals ────────────────────────────────────────────────────────
  function getItemQty(it: LineItem): number {
    if (!it.hasSizeBreakdown) return it.qty;
    return it.sizes.reduce((sum, s) => sum + (Number(s.qty) || 0), 0);
  }
  const itemsSubtotal = useMemo(
    () => items.reduce((sum, it) => sum + getItemQty(it) * it.unitPrice, 0),
    [items],
  );
  const grandTotal = itemsSubtotal + shippingCost;

  // Form-state helpers (mirror NewPIClient) ───────────────────────────────
  function addItem() {
    setItems([
      ...items,
      { description: "", fabric: "", qty: 1, unit: "set", unitPrice: 0, imageUrl: "", hasSizeBreakdown: false, sizes: [] },
    ]);
  }
  function removeItem(idx: number) {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== idx));
  }
  function updateItem(idx: number, patch: Partial<LineItem>) {
    setItems(items.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  }
  function onItemImageFile(idx: number, file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result;
      if (typeof url === "string") updateItem(idx, { imageUrl: url });
    };
    reader.readAsDataURL(file);
  }

  async function onSave() {
    if (loadState.kind !== "editable") return;

    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/pi/update/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          piNumber: loadState.piNumber,
          changeNote: changeNote || undefined,
          issueDate: issueDate || undefined,
          leadTimeText: leadTimeText || undefined,
          paymentTermsText: termsPaymentText || undefined,
          shippingLabel: shippingLabel || undefined,
          shippingMethod: shippingMethod || undefined,
          shippingCost: Number(shippingCost) || 0,
          currency,
          customer: {
            name: customerName.trim(),
            phone: customerPhone.trim(),
            email: customerEmail.trim() || undefined,
            company: customerCompany.trim() || undefined,
            address: customerAddress.trim() || undefined,
          },
          items: items
            .filter((it) => it.description.trim())
            .map((it) => ({
              description: it.description.trim(),
              fabric: it.fabric.trim() || undefined,
              quantity: getItemQty(it),
              unit: it.unit.trim() || undefined,
              unitPrice: Number(it.unitPrice) || 0,
              imageUrl: it.imageUrl || undefined,
              sizes:
                it.hasSizeBreakdown && it.sizes.length > 0
                  ? it.sizes.map((s) => ({ label: s.label, qty: Number(s.qty) || 0 }))
                  : undefined,
            })),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
        hint?: string;
        revisionNumber?: number;
        updatedFields?: string[];
      };

      if (!res.ok || !data.success) {
        const msg = data.hint
          ? `${data.error || "Update failed"} — ${data.hint}`
          : data.error || `Update failed (${res.status})`;
        setError(msg);
        return;
      }

      setLoadState({
        kind: "saved",
        piNumber: loadState.piNumber,
        revisionNumber: data.revisionNumber ?? loadState.revisionNumber + 1,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setSaving(false);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 py-8 px-4">
      <h1 className="sr-only">Edit Proforma Invoice</h1>
      <div className="max-w-5xl mx-auto">
        {/* Top bar */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link
            href="/admin/summary/"
            className="inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-[#ff4d00]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to summary
          </Link>
          {loadState.kind === "editable" && (
            <div className="inline-flex items-center gap-2 text-xs text-neutral-500">
              <History className="w-3.5 h-3.5" />
              Editing PI — pre-edit state will be snapshotted to the revisions table.
            </div>
          )}
        </div>

        {/* Header strip */}
        {loadState.kind === "editable" && (
          <div className="mb-3 p-3 border border-blue-300 bg-blue-50 text-blue-900 rounded flex items-center gap-2">
            <History className="w-4 h-4 shrink-0" />
            <div className="text-sm">
              Editing <span className="font-bold">{loadState.piNumber}</span>{" "}
              (revision {loadState.revisionNumber}). PI number is locked —
              create a new PI if you need a different number.
            </div>
          </div>
        )}

        {loadState.kind === "read_only" && (
          <ReadOnlyBanner piNumber={loadState.piNumber} status={loadState.status} />
        )}
        {loadState.kind === "not_found" && (
          <NotFoundBanner piNumber={piNumberFromUrl} />
        )}
        {loadState.kind === "loading" && (
          <div className="mb-3 p-3 border border-neutral-300 bg-white text-neutral-500 rounded text-sm flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" /> Loading PI…
          </div>
        )}
        {loadState.kind === "saved" && (
          <SavedBanner piNumber={loadState.piNumber} revisionNumber={loadState.revisionNumber} />
        )}

        {error && (
          <div className="mt-4 mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 rounded text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Form (only when editable) */}
        {loadState.kind === "editable" && (
          <>
            <PIPreview
              piNumber={loadState.piNumber}
              piSource="uploaded"
              piNumberLocked
              onPiNumberChange={() => {
                /* immutable — see update.ts header */
              }}
              onRefreshPi={() => {
                /* no-op in edit mode */
              }}
              issueDate={issueDate}
              onIssueDateChange={setIssueDate}
              leadTimeText={leadTimeText}
              onLeadTimeChange={setLeadTimeText}
              currency={currency}
              onCurrencyChange={setCurrency}
              bank={bankInfo}
              customerName={customerName}
              onCustomerNameChange={setCustomerName}
              customerEmail={customerEmail}
              onCustomerEmailChange={setCustomerEmail}
              customerCompany={customerCompany}
              onCustomerCompanyChange={setCustomerCompany}
              customerAddress={customerAddress}
              onCustomerAddressChange={setCustomerAddress}
              customerPhone={customerPhone}
              onCustomerPhoneChange={setCustomerPhone}
              items={items}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onUpdateItem={updateItem}
              onItemImageFile={onItemImageFile}
              fileInputRefs={fileInputRefs}
              shippingLabel={shippingLabel}
              onShippingLabelChange={setShippingLabel}
              shippingMethod={shippingMethod}
              onShippingMethodChange={setShippingMethod}
              shippingQty={shippingQty}
              onShippingQtyChange={setShippingQty}
              shippingCost={shippingCost}
              onShippingCostChange={setShippingCost}
              itemsSubtotal={itemsSubtotal}
              grandTotal={grandTotal}
              termsPaymentText={termsPaymentText}
              onTermsPaymentTextChange={setTermsPaymentText}
              shippingTerm={shippingTerm}
              onShippingTermChange={setShippingTerm}
              BlackCell={undefined as any}
              RedInput={undefined as any}
              BlueText={undefined as any}
              RedReminder={undefined as any}
            />

            {/* Optional change-note input + Save bar */}
            <div className="mt-6 p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 space-y-3">
              <label className="block">
                <span className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Change note (optional)
                </span>
                <input
                  type="text"
                  value={changeNote}
                  onChange={(e) => setChangeNote(e.target.value)}
                  placeholder='e.g. "Updated shipping to DDP after customer requested air freight"'
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded text-sm bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/40"
                />
              </label>

              <div className="flex items-center justify-end gap-3 sticky bottom-4 bg-white dark:bg-neutral-900 p-3 rounded shadow border border-neutral-200 dark:border-neutral-800">
                <Link
                  href="/admin/summary/"
                  className="px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  onClick={onSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#ff4d00] hover:bg-[#e64500] disabled:opacity-50 text-black rounded font-semibold"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving…" : "Save changes"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Read-only banner ────────────────────────────────────────────────────
function ReadOnlyBanner({ piNumber, status }: { piNumber: string; status: string }) {
  return (
    <div className="mb-4 p-4 border-2 border-[#ff4d00] bg-white rounded">
      <div className="flex items-start gap-3">
        <Lock className="w-5 h-5 text-[#ff4d00] shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="font-bold text-base">
            PI {piNumber || "(unknown)"} is locked for editing
          </div>
          <p className="text-sm text-neutral-700 mt-1">
            Status <code className="bg-neutral-100 px-1.5 py-0.5 rounded">{status || "unknown"}</code>{" "}
            is not editable. Only <code className="bg-neutral-100 px-1.5 py-0.5 rounded">draft</code>{" "}
            and <code className="bg-neutral-100 px-1.5 py-0.5 rounded">sent</code> PIs can be edited.
          </p>
          <p className="text-xs text-neutral-600 mt-2">
            Paid PIs: refund via the Stripe Dashboard first. Canceled / expired PIs: create a new PI
            with the corrected details.
          </p>
        </div>
        <Link
          href="/admin/summary/"
          className="px-3 py-1.5 text-xs border border-neutral-300 rounded hover:bg-neutral-50"
        >
          ← Back to summary
        </Link>
      </div>
    </div>
  );
}

// ── Not found banner ────────────────────────────────────────────────────
function NotFoundBanner({ piNumber }: { piNumber: string }) {
  return (
    <div className="mb-4 p-4 border-2 border-[#ff4d00] bg-white rounded">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#ff4d00] shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="font-bold text-base">PI not found</div>
          <p className="text-sm text-neutral-700 mt-1">
            No PI matches{" "}
            <code className="bg-neutral-100 px-1.5 py-0.5 rounded">
              {piNumber || "(no pi=...)"}
            </code>
            . Check the URL and try again.
          </p>
        </div>
        <Link
          href="/admin/summary/"
          className="px-3 py-1.5 text-xs border border-neutral-300 rounded hover:bg-neutral-50"
        >
          ← Back to summary
        </Link>
      </div>
    </div>
  );
}

// ── Saved banner ────────────────────────────────────────────────────────
function SavedBanner({ piNumber, revisionNumber }: { piNumber: string; revisionNumber: number }) {
  return (
    <div className="mb-4 p-4 border-2 border-green-500 bg-green-50 rounded">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="font-bold text-base text-green-900">
            PI {piNumber} saved (revision {revisionNumber})
          </div>
          <p className="text-sm text-green-800 mt-1">
            The pre-edit state was snapshotted to <code>proforma_invoices_revisions</code>.
            The public /pay link still works — refresh it to see the updated copy.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={`/pay/?pi=${encodeURIComponent(piNumber)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs border border-green-700 text-green-900 rounded hover:bg-green-100"
            >
              Open /pay/?pi={piNumber}
            </Link>
            <Link
              href="/admin/summary/"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs border border-green-700 text-green-900 rounded hover:bg-green-100"
            >
              <Check className="w-3.5 h-3.5" /> Back to summary
            </Link>
          </div>
        </div>
        <Link
          href="/admin/summary/"
          className="px-3 py-1.5 text-xs border border-green-700 text-green-900 rounded hover:bg-green-100 self-start"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}