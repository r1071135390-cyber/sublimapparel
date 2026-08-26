"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Plus, Trash2, Save, ExternalLink, RefreshCw, Upload, X, Check, Copy } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────
type LineItem = {
  description: string;
  fabric: string;
  qty: number;
  unit: string;       // editable, e.g. "set" / "pcs" / "pair" / "dozen"
  unitPriceCents: number;
  imageUrl: string;
};

type PrefillPayload = {
  pi_number?: string;
  issue_date?: string;
  lead_time_text?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_address?: string;
      items?: Array<{
      description?: string;
      fabric?: string;
      qty?: number;
      unit?: string;
      unit_price_cents?: number;
      image_url?: string;
    }>;
  shipping_label?: string;
  shipping_method?: string;
  shipping_cents?: number;
  payment_terms_text?: string;
  total_cents?: number;
};

const DEFAULT_TERMS_PAYMENT =
  "The buyer should pay 100% of payment amount 3 days after confirmation of the PI. The seller should arrange production after receiving the payment and approval of PP samples.";

function todayPiNumber() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `SA${yyyy}${mm}${dd}0001`;
}

// ---------------------------------------------------------------------------
// Module-level UI helpers. Defining them OUTSIDE NewPIPage is critical:
// each render of NewPIPage otherwise re-creates these function identities,
// and React treats them as different component types — which unmounts and
// remounts the underlying <input>, stealing focus after every keystroke.
// ---------------------------------------------------------------------------
function BlackCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-2 py-1 text-sm ${className}`}>{children}</div>;
}

const RedInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full bg-white dark:bg-neutral-900 border-2 border-[#ff4d00] dark:border-[#ff4d00] rounded px-2 py-1 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/30 ${props.className || ""}`}
  />
);

function BlueText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`text-[#0a6cff] font-medium ${className}`}>{children}</span>;
}

function RedReminder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mt-1 text-xs italic text-[#ff4d00] ${className}`}>
      {children}
    </div>
  );
}

function todayIsoDate() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

const fmt = (cents: number) => `$${(cents / 100).toFixed(2)}`;

// ─── Fixed bank info (in real PIs these are blue, pre-filled) ──────────────
const BANK_INFO = {
  beneficiary: "YIWU HOMEDORM COMMODITY MANUFACTURING CO.,LTD",
  companyAddress: "2nd Floor, No.11 Anshang Road, Yiwu City, China",
  bankName: "Agricultural Bank of China, Zhejiang Branch",
  bankAccount: "19648014040108531",
  bankSwift: "ABOCCNBJ110",
  bankAddress: "No. 181 Binwang Road, Yiwu City, Jinhua, Zhejiang Province, China",
};

// ─── Page ─────────────────────────────────────────────────────────────────
export default function NewPIPage() {
  // Header / metadata
  const [piNumber, setPiNumber] = useState(todayPiNumber());
  const [piNumberLocked, setPiNumberLocked] = useState(false);
  const [piSource, setPiSource] = useState<"auto" | "uploaded" | "manual">("auto");
  const [issueDate, setIssueDate] = useState(todayIsoDate());
  const [leadTimeText, setLeadTimeText] = useState("Within 30 days");

  // TO: block
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Items
  const [items, setItems] = useState<LineItem[]>([
    { description: "", fabric: "", qty: 1, unit: "set", unitPriceCents: 0, imageUrl: "" },
  ]);
  // Shipping row (always present, like in the Excel)
  const [shippingLabel, setShippingLabel] = useState("Shipping Cost");
  const [shippingMethod, setShippingMethod] = useState("DDP by AIR");
  const [shippingQty, setShippingQty] = useState(1);
  const [shippingCents, setShippingCents] = useState(11800);

  // Terms (only the (4) Terms of Payment text is editable)
  const [termsPaymentText, setTermsPaymentText] = useState(DEFAULT_TERMS_PAYMENT);

  // Saving
  const [saving, setSaving] = useState(false);
  const [savedLink, setSavedLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Item picture upload (per-row)
  const fileInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Tracks whether the user has typed in the PI number field. Once true,
  // the initial auto-fetch must NOT clobber the user's keystrokes.
  const hasEditedPiRef = useRef(false);

  // (3) Shipping Term (Incoterm). Editable; defaults to DDP.
  const [shippingTerm, setShippingTerm] = useState("DDP");

  // ── Mount: fetch next PI number + handle prefill from upload ────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1) Prefill from upload-pi
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    const encoded = params.get("data");
    if (from === "upload" && encoded) {
      try {
        const json = decodeURIComponent(escape(atob(decodeURIComponent(encoded))));
        const payload = JSON.parse(json) as PrefillPayload;
        applyPrefill(payload);
        // Clean URL
        window.history.replaceState({}, "", "/admin/new-pi/");
      } catch (e) {
        console.error("Prefill parse failed:", e);
      }
      return;
    }

    // 2) Auto-fetch next PI number (works in production with cloudflare function)
    void fetchNextPiNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyPrefill(p: PrefillPayload) {
    if (p.pi_number) {
      setPiNumber(p.pi_number);
      setPiNumberLocked(true);
      setPiSource("uploaded");
    }
    if (p.issue_date) setIssueDate(p.issue_date);
    if (p.lead_time_text) setLeadTimeText(p.lead_time_text);
    if (p.customer_name) setCustomerName(p.customer_name);
    if (p.customer_address) setCustomerAddress(p.customer_address);
    if (p.customer_phone) setCustomerPhone(p.customer_phone);
    if (Array.isArray(p.items) && p.items.length > 0) {
      setItems(
        p.items.map((it) => ({
          description: it.description || "",
          fabric: it.fabric || "",
          qty: it.qty || 1,
          unit: it.unit || "set",
          unitPriceCents: it.unit_price_cents || 0,
          imageUrl: it.image_url || "",
        })),
      );
    }
    if (p.shipping_label) setShippingLabel(p.shipping_label);
    if (p.shipping_method) setShippingMethod(p.shipping_method);
    if (typeof p.shipping_cents === "number") setShippingCents(p.shipping_cents);
    if (p.payment_terms_text) setTermsPaymentText(p.payment_terms_text);
  }

  async function fetchNextPiNumber() {
    try {
      const res = await fetch("/api/pi/next-number/", { method: "GET" });
      if (!res.ok) return;
      const data = (await res.json()) as { ok?: boolean; pi_number?: string };
      if (data.ok && data.pi_number && !hasEditedPiRef.current) {
        setPiNumber(data.pi_number);
      }
    } catch {
      // dev environment — Cloudflare Functions not running. Local fallback is fine.
    }
  }

  // ── Derived totals ──────────────────────────────────────────────────────
  const itemsSubtotalCents = useMemo(
    () => items.reduce((sum, it) => sum + it.qty * it.unitPriceCents, 0),
    [items],
  );
  const grandTotalCents = itemsSubtotalCents + shippingCents;

  // ── Handlers ────────────────────────────────────────────────────────────
  function onPiNumberChange(v: string) {
    hasEditedPiRef.current = true;
    setPiNumber(v);
    setPiSource("manual");
    setPiNumberLocked(false);
  }

  function addItem() {
    setItems([
      ...items,
      { description: "", fabric: "", qty: 1, unit: "set", unitPriceCents: 0, imageUrl: "" },
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
    // In production this would upload to Supabase storage / S3.
    // For now, generate a data URL so the preview works.
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result;
      if (typeof url === "string") {
        updateItem(idx, { imageUrl: url });
      }
    };
    reader.readAsDataURL(file);
  }

  async function onSave() {
    setError(null);
    setSavedLink(null);

    if (!customerName.trim()) {
      setError("Customer name is required");
      return;
    }
    if (!piNumber.trim()) {
      setError("PI number is required");
      return;
    }
    if (items.length === 0 || items.every((it) => !it.description.trim())) {
      setError("At least one item with a description is required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/pi/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pi_number: piNumber,
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_address: customerAddress,
          issue_date: issueDate,
          lead_time_text: leadTimeText,
          items: items
            .filter((it) => it.description.trim())
            .map((it) => ({
              description: it.description,
              fabric: it.fabric,
              qty: it.qty,
              unit_price_cents: it.unitPriceCents,
              total_cents: it.qty * it.unitPriceCents,
              image_url: it.imageUrl,
            })),
          shipping_label: shippingLabel,
          shipping_method: shippingMethod,
          shipping_cents: shippingCents,
          payment_terms_text: termsPaymentText,
          total_cents: grandTotalCents,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        setError(`Save failed (${res.status}): ${txt}`);
        return;
      }

      const data = (await res.json()) as {
        ok?: boolean;
        payment_url?: string;
        error?: string;
      };

      if (!data.ok) {
        setError(data.error || "Save failed");
        return;
      }

      setSavedLink(data.payment_url || `/pay/?pi=${piNumber}`);
    } catch (e) {
      setError(`Network error: ${e instanceof Error ? e.message : "unknown"}`);
    } finally {
      setSaving(false);
    }
  }

  function copyLink() {
    if (!savedLink) return;
    const full = `${window.location.origin}${savedLink}`;
    void navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {savedLink ? (
          <SuccessPanel
            link={savedLink}
            copied={copied}
            onCopy={copyLink}
            onNew={() => window.location.reload()}
          />
        ) : (
          <PIPreview
            piNumber={piNumber}
            piSource={piSource}
            piNumberLocked={piNumberLocked}
            onPiNumberChange={onPiNumberChange}
            onRefreshPi={fetchNextPiNumber}
            issueDate={issueDate}
            onIssueDateChange={setIssueDate}
            leadTimeText={leadTimeText}
            onLeadTimeChange={setLeadTimeText}
            customerName={customerName}
            onCustomerNameChange={setCustomerName}
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
            shippingCents={shippingCents}
            onShippingCentsChange={setShippingCents}
            itemsSubtotalCents={itemsSubtotalCents}
            grandTotalCents={grandTotalCents}
            termsPaymentText={termsPaymentText}
            onTermsPaymentTextChange={setTermsPaymentText}
            shippingTerm={shippingTerm}
            onShippingTermChange={setShippingTerm}
            BlackCell={BlackCell}
            RedInput={RedInput}
            BlueText={BlueText}
            RedReminder={RedReminder}
          />
        )}

        {/* Save bar */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 rounded text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        {!savedLink && (
          <div className="mt-6 flex items-center justify-end gap-3 sticky bottom-4 bg-white dark:bg-neutral-900 p-4 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800">
            <Link
              href="/admin/upload-pi/"
              className="px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              Upload PI instead
            </Link>
            <button
              onClick={onSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#ff4d00] hover:bg-[#e64500] disabled:opacity-50 text-white rounded font-semibold"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving…" : "Save PI & get payment link"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PI Preview (matches the Excel layout) ─────────────────────────────────
function PIPreview(props: {
  piNumber: string;
  piSource: "auto" | "uploaded" | "manual";
  piNumberLocked: boolean;
  onPiNumberChange: (v: string) => void;
  onRefreshPi: () => void;
  issueDate: string;
  onIssueDateChange: (v: string) => void;
  leadTimeText: string;
  onLeadTimeChange: (v: string) => void;
  customerName: string;
  onCustomerNameChange: (v: string) => void;
  customerAddress: string;
  onCustomerAddressChange: (v: string) => void;
  customerPhone: string;
  onCustomerPhoneChange: (v: string) => void;
  items: LineItem[];
  onAddItem: () => void;
  onRemoveItem: (idx: number) => void;
  onUpdateItem: (idx: number, patch: Partial<LineItem>) => void;
  onItemImageFile: (idx: number, file: File) => void;
  fileInputRefs: React.MutableRefObject<Array<HTMLInputElement | null>>;
  shippingLabel: string;
  onShippingLabelChange: (v: string) => void;
  shippingMethod: string;
  onShippingMethodChange: (v: string) => void;
  shippingQty: number;
  onShippingQtyChange: (v: number) => void;
  shippingCents: number;
  onShippingCentsChange: (v: number) => void;
  itemsSubtotalCents: number;
  grandTotalCents: number;
  termsPaymentText: string;
  onTermsPaymentTextChange: (v: string) => void;
  shippingTerm: string;
  onShippingTermChange: (v: string) => void;
  BlackCell: React.FC<{ children: React.ReactNode; className?: string }>;
  RedInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
  BlueText: React.FC<{ children: React.ReactNode }>;
  RedReminder: React.FC<{ children: React.ReactNode }>;
}) {
  const {
    piNumber, piSource, piNumberLocked, onPiNumberChange, onRefreshPi,
    issueDate, onIssueDateChange, leadTimeText, onLeadTimeChange,
    customerName, onCustomerNameChange, customerAddress, onCustomerAddressChange, customerPhone, onCustomerPhoneChange,
    items, onAddItem, onRemoveItem, onUpdateItem, onItemImageFile, fileInputRefs,
    shippingLabel, onShippingLabelChange, shippingMethod, onShippingMethodChange,
    shippingQty, onShippingQtyChange, shippingCents, onShippingCentsChange,
    itemsSubtotalCents, grandTotalCents,
    termsPaymentText, onTermsPaymentTextChange,
    shippingTerm, onShippingTermChange,
    BlackCell, RedInput, BlueText, RedReminder,
  } = props;

  return (
    <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
      {/* ── HEADER (rows 1-3) ── logo on left, company info indented to align with the "Miss" column (column C in Excel) */}
      <div className="px-6 py-6 border-b-2 border-black dark:border-white">
        <div className="flex items-start gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sublimapparel-logo.webp"
            alt="SublimApparel"
            className="h-14 w-auto shrink-0"
          />
          <div className="flex-1 pl-[20%]">
            <div className="text-lg font-bold tracking-wide">
              YIWU HOMEDORM COMMODITY MANUFACTURING CO.,LTD
            </div>
            <div className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">
              ADD: 2nd Floor, No.11 Anshang Road, Yiwu City, China
            </div>
            <div className="text-3xl font-extrabold tracking-widest mt-4">
              PROFORMA INVOICE
            </div>
          </div>
        </div>
      </div>

      {/* ── FM + INVOICE INFO (rows 5-8) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 p-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="space-y-1">
          <div className="flex gap-2">
            <BlackCell>FM:</BlackCell>
            <BlackCell>SUBLIMAPPAREL.com</BlackCell>
          </div>
          <BlackCell>YIWU HOMEDORM COMMODITY MANUFACTURING CO.,LTD</BlackCell>
          <BlackCell>2ND FLOOR, NO.11 ANSHANG ROAD, YIWU, CHINA</BlackCell>
          <BlackCell>Annt.: Miss Chris Ma / +86 19817930190 / chris@sublimapparel.com</BlackCell>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BlackCell className="w-32 shrink-0">INVOICE NO.:</BlackCell>
            <div className="flex-1 flex items-center gap-2">
              <RedInput
                value={piNumber}
                onChange={(e) => onPiNumberChange(e.target.value)}
                placeholder="SA202608250001"
                disabled={piNumberLocked}
                className={piNumberLocked ? "opacity-70 cursor-not-allowed" : ""}
              />
              <button
                onClick={onRefreshPi}
                title="Get next available PI number"
                className="p-1.5 text-neutral-500 hover:text-[#ff4d00] border border-neutral-300 dark:border-neutral-700 rounded"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <PISourceBadge source={piSource} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BlackCell className="w-32 shrink-0">ISSUE DATE:</BlackCell>
            <RedInput
              type="date"
              value={issueDate}
              onChange={(e) => onIssueDateChange(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <BlackCell className="w-32 shrink-0">LEAD TIME:</BlackCell>
            <RedInput
              value={leadTimeText}
              onChange={(e) => onLeadTimeChange(e.target.value)}
              placeholder="Within 30 days"
            />
          </div>
        </div>
      </div>

      {/* ── TO: block (rows 10-12) ── */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex gap-2 items-start">
          <BlackCell className="w-16 shrink-0 pt-1">TO:</BlackCell>
          <div className="flex-1 space-y-1.5">
            <RedInput
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
              placeholder="Customer name"
            />
            <RedInput
              value={customerAddress}
              onChange={(e) => onCustomerAddressChange(e.target.value)}
              placeholder="Address"
            />
            <RedInput
              value={customerPhone}
              onChange={(e) => onCustomerPhoneChange(e.target.value)}
              placeholder="Phone"
            />
          </div>
        </div>
      </div>

      {/* ── Items table (rows 14-17) ── */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="overflow-x-auto">
          <table className="w-full border-2 border-black dark:border-white text-sm">
            <thead>
              <tr className="bg-neutral-100 dark:bg-neutral-800">
                <th className="border border-black dark:border-white p-2 w-32 text-left">PRODUCT PICTURE</th>
                <th className="border border-black dark:border-white p-2 text-left">DESCRIPTION</th>
                <th className="border border-black dark:border-white p-2 text-left">FABRIC CONTENT</th>
                <th className="border border-black dark:border-white p-2 w-28 text-left">QTY / UNIT</th>
                <th className="border border-black dark:border-white p-2 w-24 text-left">PRICE</th>
                <th className="border border-black dark:border-white p-2 w-28 text-left">TOTAL USD</th>
                <th className="border border-black dark:border-white p-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={idx}>
                  <td className="border border-black dark:border-white p-1.5 align-top">
                    <div className="w-24 h-24 border border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center bg-neutral-50 dark:bg-neutral-800 relative overflow-hidden">
                      {it.imageUrl ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={it.imageUrl} alt="" className="object-cover w-full h-full" />
                          <button
                            onClick={() => onUpdateItem(idx, { imageUrl: "" })}
                            className="absolute top-0.5 right-0.5 p-0.5 bg-black/60 text-white rounded"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => fileInputRefs.current[idx]?.click()}
                          className="text-xs text-neutral-500 hover:text-[#ff4d00] flex flex-col items-center gap-1"
                        >
                          <Upload className="w-5 h-5" />
                          upload
                        </button>
                      )}
                      <input
                        ref={(el) => { fileInputRefs.current[idx] = el; }}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onItemImageFile(idx, file);
                          e.target.value = "";
                        }}
                      />
                    </div>
                  </td>
                  <td className="border border-black dark:border-white p-1.5 align-top">
                    <textarea
                      value={it.description}
                      onChange={(e) => onUpdateItem(idx, { description: e.target.value })}
                      placeholder=""
                      rows={4}
                      className="w-full bg-white dark:bg-neutral-900 border border-[#ff4d00] rounded px-1.5 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/40"
                    />
                  </td>
                  <td className="border border-black dark:border-white p-1.5 align-top">
                    <textarea
                      value={it.fabric}
                      onChange={(e) => onUpdateItem(idx, { fabric: e.target.value })}
                      placeholder=""
                      rows={4}
                      className="w-full bg-white dark:bg-neutral-900 border border-[#ff4d00] rounded px-1.5 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/40"
                    />
                  </td>
                  <td className="border border-black dark:border-white p-1.5 align-top">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={1}
                        value={it.qty}
                        onChange={(e) => onUpdateItem(idx, { qty: parseInt(e.target.value) || 0 })}
                        className="w-24 bg-white dark:bg-neutral-900 border border-[#ff4d00] rounded px-1.5 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/40"
                      />
                      <input
                        type="text"
                        value={it.unit}
                        onChange={(e) => onUpdateItem(idx, { unit: e.target.value })}
                        placeholder="set"
                        className="w-16 bg-white dark:bg-neutral-900 border border-[#ff4d00] rounded px-1.5 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/40"
                      />
                    </div>
                  </td>
                  <td className="border border-black dark:border-white p-1.5 align-top">
                    <div className="flex items-center">
                      <span className="text-sm mr-0.5">$</span>
                      <input
                        type="number"
                        step="0.01"
                        min={0}
                        value={(it.unitPriceCents / 100).toFixed(2)}
                        onChange={(e) => onUpdateItem(idx, { unitPriceCents: Math.round(parseFloat(e.target.value || "0") * 100) })}
                        className="w-full bg-white dark:bg-neutral-900 border border-[#ff4d00] rounded px-1.5 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/40"
                      />
                    </div>
                  </td>
                  <td className="border border-black dark:border-white p-1.5 align-top text-sm font-semibold">
                    {fmt(it.qty * it.unitPriceCents)}
                  </td>
                  <td className="border border-black dark:border-white p-1.5 align-top text-center">
                    {items.length > 1 && (
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-neutral-400 hover:text-red-500"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {/* Shipping row */}
              <tr>
                <td className="border border-black dark:border-white p-1.5 align-top text-center text-xs text-neutral-500">
                  —
                </td>
                <td className="border border-black dark:border-white p-1.5 align-top">
                  <input
                    value={shippingLabel}
                    onChange={(e) => onShippingLabelChange(e.target.value)}
                    placeholder="Shipping Cost"
                    className="w-full bg-white dark:bg-neutral-900 border border-[#ff4d00] rounded px-1.5 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/40"
                  />
                </td>
                <td className="border border-black dark:border-white p-1.5 align-top">
                  <input
                    value={shippingMethod}
                    onChange={(e) => onShippingMethodChange(e.target.value)}
                    placeholder="DDP by AIR"
                    className="w-full bg-white dark:bg-neutral-900 border border-[#ff4d00] rounded px-1.5 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/40"
                  />
                </td>
                <td className="border border-black dark:border-white p-1.5 align-top">
                  <input
                    type="number"
                    min={1}
                    value={shippingQty}
                    onChange={(e) => onShippingQtyChange(parseInt(e.target.value) || 1)}
                    className="w-full bg-white dark:bg-neutral-900 border border-[#ff4d00] rounded px-1.5 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/40"
                  />
                </td>
                <td className="border border-black dark:border-white p-1.5 align-top">
                  <div className="flex items-center">
                    <span className="text-sm mr-0.5">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min={0}
                      value={(shippingCents / 100).toFixed(2)}
                      onChange={(e) => onShippingCentsChange(Math.round(parseFloat(e.target.value || "0") * 100))}
                      className="w-full bg-white dark:bg-neutral-900 border border-[#ff4d00] rounded px-1.5 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4d00]/40"
                    />
                  </div>
                </td>
                <td className="border border-black dark:border-white p-1.5 align-top text-sm font-semibold">
                  {fmt(shippingQty * shippingCents)}
                </td>
                <td className="border border-black dark:border-white p-1.5 align-top"></td>
              </tr>

              {/* TOTAL row */}
              <tr className="bg-neutral-100 dark:bg-neutral-800 font-bold">
                <td colSpan={5} className="border border-black dark:border-white p-2 text-right">TOTAL:</td>
                <td className="border border-black dark:border-white p-2 text-base">{fmt(grandTotalCents)}</td>
                <td className="border border-black dark:border-white p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex justify-between items-center text-sm">
          <button
            onClick={onAddItem}
            className="inline-flex items-center gap-1 text-[#ff4d00] hover:text-[#e64500] font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add item
          </button>
          <div className="text-neutral-500 text-xs">
            Subtotal: {fmt(itemsSubtotalCents)} + Shipping: {fmt(shippingCents)} = <strong className="text-black dark:text-white">{fmt(grandTotalCents)}</strong>
          </div>
        </div>
      </div>

      {/* ── Terms (rows 19-24) ── */}
      <div className="p-6 space-y-1 border-b border-neutral-200 dark:border-neutral-800 text-sm">
        <div><strong>(1) Port of Loading:</strong> Yiwu / Ningbo / Shanghai or any designated Chinese ports</div>
        <div><strong>(2) Port of Destination:</strong> As Buyer address above</div>
        <div><strong>(3) Shipping Term:</strong>{" "}
        <select
          value={shippingTerm}
          onChange={(e) => onShippingTermChange(e.target.value)}
          className="ml-1 bg-white dark:bg-neutral-900 border-2 border-[#00c2ff] rounded px-2 py-0.5 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c2ff]/30"
        >
          <option value="DDP">DDP</option>
          <option value="FOB">FOB</option>
          <option value="EXW">EXW</option>
          <option value="CIF">CIF</option>
          <option value="DAP">DAP</option>
          <option value="DDU">DDU</option>
          <option value="CFR">CFR</option>
          <option value="CPT">CPT</option>
          <option value="CIP">CIP</option>
          <option value="DPU">DPU</option>
        </select>
      </div>
        <div className="pt-2">
          <strong>(4) Terms of Payment:</strong>
          <textarea
            value={termsPaymentText}
            onChange={(e) => onTermsPaymentTextChange(e.target.value)}
            rows={2}
            className="w-full mt-1 bg-white dark:bg-neutral-900 border-2 border-[#ff4d00] rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/30"
          />
        </div>
      </div>

      {/* ── Bank Info (rows 25-33) ── */}
      <div className="p-6 space-y-2 border-b border-neutral-200 dark:border-neutral-800 text-sm">
        <div className="font-bold">BANK INFO:</div>
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 items-start">
          <BlackCell>BENEFICIARY (COMPANY NAME):</BlackCell>
          <div>
            <BlueText>{BANK_INFO.beneficiary}</BlueText>
            <RedReminder>
              The company name must be written in full. If it does not fit in the designated space, the full name should be written on the next line.
            </RedReminder>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 items-start">
          <BlackCell>COMPANY ADDRESS:</BlackCell>
          <BlueText>{BANK_INFO.companyAddress}</BlueText>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1">
          <BlackCell>BANK NAME:</BlackCell>
          <BlackCell>{BANK_INFO.bankName}</BlackCell>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1">
          <BlackCell>BANK ACCOUNT:</BlackCell>
          <BlackCell>{BANK_INFO.bankAccount}</BlackCell>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1">
          <BlackCell>BANK SWIFT CODE:</BlackCell>
          <BlackCell>{BANK_INFO.bankSwift}</BlackCell>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1">
          <BlackCell>BANK ADDRESS:</BlackCell>
          <BlackCell>{BANK_INFO.bankAddress}</BlackCell>
        </div>
      </div>

      {/* ── Clauses (5)-(7) — fixed black text ── */}
      <div className="p-6 space-y-2 border-b border-neutral-200 dark:border-neutral-800 text-sm leading-relaxed">
        <div>
          <strong>(5) Production Time:</strong> Normally about 45 days after order payment received and approval of PP samples. Seller will not take any responsibility for any delivery delay caused by force majeure or unexpected events.
        </div>
        <div className="pt-2">
          <strong>(6) Tolerance:</strong>
          <div className="pl-4 space-y-0.5">
            <div>Knitted Fabric GSM tolerance of +10gram and Size Measurement of +1.5 inch can be allowed and accepted.</div>
            <div>Quantity Tolerance: +5% can be accepted, seller should make up if the quantity less is more than 5%.</div>
            <div>2% - 3% of the defective products can be allowed and accepted.</div>
          </div>
        </div>
        <div className="pt-2">
          <strong>(7) Additional Clause:</strong>
          <div className="pl-4 space-y-0.5">
            <div>(a). Buyer confirm to have the commercial rights to reproduce the design. If for any reason the legal owner of the design contacts fulfillment house, they will be directed to the buyer and buyer should bear all the losses of the seller.</div>
            <div>(b). Any loss caused by buyer's change in connection with the agreed contract will be on buyer's account.</div>
            <div>(c). The Seller should inform buyer to arrange the balance ONE week before the goods ready for shipment. The buyers should arrange the balance payment within 5 business days after seller's notice, of any loss occurred hereof will be on Buyer's account.</div>
            <div>(d). The contract effective date will be started since the seller receives the deposit from the buyer. The contract will be invalid if the payment is delayed by 5 working days after the contract date.</div>
            <div>(e). Force Majeure: In case of Force Majeure the Sellers shall not be responsible for delay in delivery or non-delivery of the goods but shall notify immediately the Buyers and deliver to the Buyers by registered mail a certificate issued by government authorities.</div>
          </div>
        </div>
      </div>

      {/* ── Footer contract note + signatures ── */}
      <div className="p-6 space-y-4 text-sm">
        <div>
          This contract is made out in two original copies, one copy to be held by each party in witness thereof.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div>
            <div className="font-bold">Seller Stamp / Signature:</div>
            <div className="mt-8 border-b border-black dark:border-white w-3/4" />
            <div className="mt-1 text-sm">YIWU HOMEDORM COMMODITY MANUFACTURING CO.,LTD</div>
          </div>
          <div>
            <div className="font-bold">Buyer Stamp / Signature:</div>
            <div className="mt-8 border-b border-black dark:border-white w-3/4" />
            <div className="mt-1 text-sm">{customerName || "(customer name)"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PISourceBadge({ source }: { source: "auto" | "uploaded" | "manual" }) {
  const map = {
    auto: { label: "auto-suggested", cls: "bg-neutral-200 text-neutral-700" },
    uploaded: { label: "← from upload", cls: "bg-blue-100 text-blue-700" },
    manual: { label: "manual", cls: "bg-orange-100 text-orange-700" },
  } as const;
  const m = map[source];
  return <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${m.cls}`}>{m.label}</span>;
}

function SuccessPanel({
  link, copied, onCopy, onNew,
}: {
  link: string;
  copied: boolean;
  onCopy: () => void;
  onNew: () => void;
}) {
  return (
    <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-8 border border-neutral-200 dark:border-neutral-800 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">PI saved successfully</h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">Share this link with your customer to receive payment:</p>
      <div className="flex items-center gap-2 max-w-2xl mx-auto mb-6">
        <input
          readOnly
          value={typeof window !== "undefined" ? `${window.location.origin}${link}` : link}
          className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded bg-neutral-50 dark:bg-neutral-800 text-sm"
        />
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1 px-4 py-2 bg-[#ff4d00] hover:bg-[#e64500] text-white rounded text-sm font-semibold"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="flex justify-center gap-3">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
        >
          <ExternalLink className="w-4 h-4" />
          Open payment page
        </a>
        <button
          onClick={onNew}
          className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
        >
          Create another PI
        </button>
      </div>
    </div>
  );
}
