"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DatePickerEn } from "@/components/date-picker-en";
import { X, FileText, Send, Loader2, Upload } from "lucide-react";
import {
  SizeQuantityPicker,
  DEFAULT_SIZES,
  SIZE_PRESETS,
  PRINT_METHODS,
  FABRIC_OPTIONS,
  DESIGN_STATUSES,
  type SizeRow,
} from "@/components/size-quantity-picker";

const MAX_FILES = 5;
const MAX_SIZE_MB = 25;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ACCEPTED = [".jpg", ".jpeg", ".png", ".pdf", ".ai", ".eps", ".psd", ".svg", ".tif", ".tiff"];
const ACCEPT_ATTR = ACCEPTED.join(",");

// Min delivery date: 7 days from module load (stable across renders)
const MIN_DELIVERY_DATE = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
})();
const MIN_DELIVERY_DATE_OBJ = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  d.setHours(0, 0, 0, 0);
  return d;
})();

type Attached = {
  file: File;
  name: string;
  size: number;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export type QuoteSource = {
  label: string;
  path: string;
  prefill?: {
    productName?: string;
    productCategory?: string;
    productNumber?: string;
  };
};

type QuoteState = {
  open: boolean;
  source: QuoteSource;
};

type QuoteContextValue = {
  state: QuoteState;
  openQuote: (source?: Partial<QuoteSource>) => void;
  closeQuote: () => void;
};

const defaultSource: QuoteSource = {
  label: "this page",
  path: "/",
};

const QuoteContext = React.createContext<QuoteContextValue | null>(null);

export function useRequestQuote() {
  const ctx = React.useContext(QuoteContext);
  if (!ctx) {
    throw new Error("useRequestQuote must be used within <RequestQuoteProvider>");
  }
  return ctx;
}

export function RequestQuoteProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = React.useState<QuoteState>({
    open: false,
    source: { ...defaultSource, path: pathname || "/" },
  });

  React.useEffect(() => {
    setState((prev) => ({ ...prev, source: { ...prev.source, path: pathname || "/" } }));
  }, [pathname]);

  const openQuote = React.useCallback(
    (source?: Partial<QuoteSource>) => {
      setState((prev) => ({
        open: true,
        source: {
          label: source?.label || prev.source.label,
          path: source?.path || pathname || "/",
          prefill: source?.prefill || prev.source.prefill,
        },
      }));
    },
    [pathname]
  );

  const closeQuote = React.useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <QuoteContext.Provider value={{ state, openQuote, closeQuote }}>
      {children}
      <RequestQuoteModal />
    </QuoteContext.Provider>
  );
}

function RequestQuoteModal() {
  const { state, closeQuote } = useRequestQuote();
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Full form state (mirrors the contact form)
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    product: "Custom T-Shirts (Polyester)",
    process: "Sublimation",
    fabric: "Polyester",
    designStatus: "Have design ready",
    quantity: "",
    shipCountry: "",
    shipZip: "",
    deadline: "",
    message: "",
  });
  const [sizeRows, setSizeRows] = React.useState<SizeRow[]>(DEFAULT_SIZES);
  const [files, setFiles] = React.useState<Attached[]>([]);

  // Prefill product from source (e.g., product detail page)
  React.useEffect(() => {
    if (state.open && state.source.prefill?.productName) {
      setForm((prev) => ({
        ...prev,
        product: prev.product || state.source.prefill!.productName || prev.product,
      }));
    }
  }, [state.open, state.source]);

  // Reset on close
  React.useEffect(() => {
    if (!state.open) {
      setSubmitted(false);
      setErrorMsg("");
    }
  }, [state.open]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Size row helpers
  const setRowQty = (id: string, qty: number) => {
    const clamped = Math.max(0, Math.min(99999, Math.floor(qty || 0)));
    setSizeRows((rows) => rows.map((r) => (r.id === id ? { ...r, qty: clamped } : r)));
  };
  const bumpRowQty = (id: string, delta: number) => {
    setSizeRows((rows) =>
      rows.map((r) =>
        r.id === id ? { ...r, qty: Math.max(0, Math.min(99999, r.qty + delta)) } : r
      )
    );
  };
  const addCustomSize = () => {
    setSizeRows((rows) => [
      ...rows,
      { id: `sz-c-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, size: "", qty: 0, fixed: false },
    ]);
  };
  const removeCustomSize = (id: string) => {
    setSizeRows((rows) => rows.filter((r) => r.id !== id));
  };
  const renameCustomSize = (id: string, size: string) => {
    const trimmed = size.replace(/\s+/g, "").slice(0, 8);
    setSizeRows((rows) => rows.map((r) => (r.id === id ? { ...r, size: trimmed } : r)));
  };
  const totalPieces = sizeRows.reduce((sum, r) => sum + r.qty, 0);
  const sizeBreakdownText = sizeRows
    .filter((r) => r.size && r.qty > 0)
    .map((r) => `${r.size} ${r.qty}`)
    .join(" / ");

  // File helpers
  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    setErrorMsg("");
    if (picked.length === 0) return;
    const toAttached = (f: File): Attached => ({ file: f, name: f.name, size: f.size });
    const combined = [...files, ...picked.map(toAttached)];
    if (combined.length > MAX_FILES) {
      setErrorMsg(`Maximum ${MAX_FILES} files. You have ${files.length} already and tried to add ${picked.length} more.`);
      e.target.value = "";
      return;
    }
    const validExts = new Set(ACCEPTED.map((s) => s.toLowerCase()));
    for (const f of picked) {
      const ext = "." + (f.name.split(".").pop() ?? "").toLowerCase();
      if (!validExts.has(ext)) {
        setErrorMsg(`"${f.name}" — unsupported type. Use ${ACCEPTED.join(", ")}.`);
        e.target.value = "";
        return;
      }
      if (f.size > MAX_SIZE_BYTES) {
        setErrorMsg(`"${f.name}" is ${formatSize(f.size)} — over the ${MAX_SIZE_MB} MB per-file limit.`);
        e.target.value = "";
        return;
      }
    }
    setFiles(combined);
    e.target.value = "";
  };
  const removeFile = (idx: number) => setFiles((arr) => arr.filter((_, i) => i !== idx));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    if (!form.name || !form.email) {
      setSubmitting(false);
      setErrorMsg("Name and email are required.");
      return;
    }
    if (!form.deadline) {
      setSubmitting(false);
      setErrorMsg("Required delivery date is required for a DDP quote.");
      return;
    }

    const lines = [
      `Hi SublimApparel team,`,
      ``,
      `I'd like to request a quote for the following project:`,
      ``,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company || "—"}`,
      ``,
      `Product: ${form.product}`,
      `Quantity: ${form.quantity || "—"}`,
      `Print method: ${form.process}`,
      `Fabric: ${form.fabric}`,
      `Design status: ${form.designStatus}`,
      `Size breakdown: ${sizeBreakdownText || "—"} (Total ${totalPieces} pcs)`,
      ``,
      `Ship to:`,
      `  Country: ${form.shipCountry || "—"}`,
      `  ZIP / postal code: ${form.shipZip || "—"}`,
      ``,
      `Required delivery: ${form.deadline}`,
      ``,
      `Project details:`,
      form.message || "(please add details)",
      ``,
      `Artwork files: ${files.length} file(s) ready to attach (${files.map((f) => f.name).join(", ") || "none"})`,
      ``,
      `Browsing from: ${state.source.label}`,
      `Source page: ${state.source.path}`,
      state.source.prefill?.productName
        ? `Product viewed: ${state.source.prefill.productName}${state.source.prefill.productNumber ? ` (No. ${state.source.prefill.productNumber})` : ""}`
        : "",
      ``,
      `Best regards,`,
      `${form.name}`,
    ].filter(Boolean) as string[];

    const subject = `Inquiry: ${form.product} — ${form.quantity || "TBD"} pcs — ${form.name}`;
    const mailto = `mailto:info@sublimapparel.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

    await new Promise((r) => setTimeout(r, 300));
    window.location.href = mailto;
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <Dialog open={state.open} onOpenChange={(open) => !open && closeQuote()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto bg-white p-0 text-[#0a0a0a]">
        <DialogHeader className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] p-6 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#ff4d00]">
                [ Get a Quote · 24h reply ]
              </div>
              <DialogTitle className="mt-2 text-2xl font-black leading-tight md:text-3xl">
                Request a quote
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-white/70">
                You are requesting a quote for:{" "}
                <span className="font-bold text-[#00C2FF]">{state.source.label}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ff4d00] text-white">
              <Send className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-2xl font-black">Your email client opened.</h3>
            <p className="mb-6 text-sm text-[#3a3a3a]">
              Please click &quot;Send&quot; in your email app to send the request to{" "}
              <span className="font-bold text-[#0a0a0a]">info@sublimapparel.com</span>.
              We will reply within 1 business day.
            </p>
            <Button
              onClick={closeQuote}
              className="bg-[#0a0a0a] px-6 py-3 text-white hover:bg-[#ff4d00]"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-6">
            <input type="hidden" name="source" value={state.source.path} />
            <input type="hidden" name="sourceLabel" value={state.source.label} />
            {state.source.prefill?.productName && (
              <input type="hidden" name="productName" value={state.source.prefill.productName} />
            )}
            {state.source.prefill?.productNumber && (
              <input
                type="hidden"
                name="productNumber"
                value={state.source.prefill.productNumber}
              />
            )}

            {/* Quote context banner */}
            <div className="mb-5 flex items-start gap-3 border-2 border-[#ff4d00] bg-[#fff5f0] p-3">
              <FileText className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ff4d00]" />
              <div className="text-xs">
                <div className="font-black uppercase tracking-widest text-[#ff4d00]">
                  Quote context
                </div>
                <div className="mt-1 font-bold text-[#0a0a0a]">{state.source.label}</div>
                <div className="mt-0.5 text-[10px] text-[#6B6B6B]">
                  Source: <code className="bg-white px-1">{state.source.path}</code>
                  {state.source.prefill?.productName && (
                    <> · Quoting for{" "}
                      <span className="font-bold text-[#0a0a0a]">{state.source.prefill.productName}</span>
                      {state.source.prefill.productNumber && (
                        <span className="text-[#6B6B6B]"> (No. {state.source.prefill.productNumber})</span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Name / Email / Company / Phone */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Name *" required>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name"
                  className="w-full border-b-2 border-[#0a0a0a] bg-transparent py-2 text-sm font-medium text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#ff4d00] focus:outline-none"
                />
              </Field>
              <Field label="Email *" required>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  placeholder="you@company.com"
                  className="w-full border-b-2 border-[#0a0a0a] bg-transparent py-2 text-sm font-medium text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#ff4d00] focus:outline-none"
                />
              </Field>
              <Field label="Company">
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  placeholder="Company / brand"
                  className="w-full border-b-2 border-[#0a0a0a] bg-transparent py-2 text-sm font-medium text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#ff4d00] focus:outline-none"
                />
              </Field>
              <Field label="Phone / WhatsApp">
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="+1 555 123 4567"
                  className="w-full border-b-2 border-[#0a0a0a] bg-transparent py-2 text-sm font-medium text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#ff4d00] focus:outline-none"
                />
              </Field>
            </div>

            {/* Product + Quantity */}
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Product *">
                <select
                  name="product"
                  value={form.product}
                  onChange={onChange}
                  className="w-full border-b-2 border-[#0a0a0a] bg-transparent py-2 text-sm font-medium text-[#0a0a0a] focus:border-[#ff4d00] focus:outline-none"
                >
                  {SIZE_PRESETS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Quantity">
                <input
                  type="text"
                  name="quantity"
                  value={form.quantity}
                  onChange={onChange}
                  placeholder="e.g. 300 pcs"
                  className="w-full border-b-2 border-[#0a0a0a] bg-transparent py-2 text-sm font-medium text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#ff4d00] focus:outline-none"
                />
              </Field>
            </div>

            {/* Project specs */}
            <div className="mt-5 border-t-2 border-[#0a0a0a] pt-4">
              <div className="mb-3 flex items-baseline justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#0a0a0a]">
                  Project specs
                </label>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#0a0a0a]/50">
                  Helps us quote faster & more accurately
                </span>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <Field label="Print method">
                  <select
                    name="process"
                    value={form.process}
                    onChange={onChange}
                    className="w-full border-b-2 border-[#0a0a0a] bg-transparent py-2 text-sm font-medium text-[#0a0a0a] focus:border-[#ff4d00] focus:outline-none"
                  >
                    {PRINT_METHODS.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Fabric">
                  <select
                    name="fabric"
                    value={form.fabric}
                    onChange={onChange}
                    className="w-full border-b-2 border-[#0a0a0a] bg-transparent py-2 text-sm font-medium text-[#0a0a0a] focus:border-[#ff4d00] focus:outline-none"
                  >
                    {FABRIC_OPTIONS.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Design status">
                  <select
                    name="designStatus"
                    value={form.designStatus}
                    onChange={onChange}
                    className="w-full border-b-2 border-[#0a0a0a] bg-transparent py-2 text-sm font-medium text-[#0a0a0a] focus:border-[#ff4d00] focus:outline-none"
                  >
                    {DESIGN_STATUSES.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Size breakdown */}
              <div className="mt-4">
                <Field label="Size breakdown (optional — can be confirmed in the formal order)">
                  <SizeQuantityPicker
                    rows={sizeRows}
                    onBump={bumpRowQty}
                    onSetQty={setRowQty}
                    onAdd={addCustomSize}
                    onRemove={removeCustomSize}
                    onRename={renameCustomSize}
                    totalPieces={totalPieces}
                  />
                </Field>
              </div>
            </div>

            {/* Ship to (DDP) */}
            <div className="mt-5 border-t-2 border-[#0a0a0a] pt-4">
              <div className="mb-3 flex items-baseline justify-between">
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#0a0a0a]">
                  Ship to <span className="text-[#0a0a0a]/50">— for DDP quote</span>
                </label>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#0a0a0a]/50">
                  Country + ZIP / postal code at minimum
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="shipCountry"
                  value={form.shipCountry}
                  onChange={onChange}
                  placeholder="Country (e.g. United States)"
                  className="w-full border-b-2 border-[#0a0a0a] bg-transparent py-2 text-sm font-medium text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#ff4d00] focus:outline-none"
                />
                <input
                  type="text"
                  name="shipZip"
                  value={form.shipZip}
                  onChange={onChange}
                  placeholder="ZIP / postal code"
                  className="w-full border-b-2 border-[#0a0a0a] bg-transparent py-2 text-sm font-medium text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#ff4d00] focus:outline-none"
                />
              </div>
              <p className="mt-2 text-[10px] leading-snug text-[#0a0a0a]/60">
                We need the destination country + postal code to calculate the
                accurate <strong>landed, duty-paid price</strong>. Street address can be added in the project details below if known.
              </p>
            </div>

            {/* Required delivery date */}
            <div className="mt-5 grid grid-cols-1 gap-4 border-t-2 border-[#0a0a0a] pt-4 md:grid-cols-2">
              <Field label="Required delivery date (to your door) *" required>
                <DatePickerEn
                  name="deadline"
                  required
                  minDate={MIN_DELIVERY_DATE_OBJ}
                  value={form.deadline}
                  onChange={(v) => onChange({ target: { name: "deadline", value: v } } as React.ChangeEvent<HTMLInputElement>)}
                />
              </Field>
            </div>

            {/* Project details */}
            <div className="mt-4">
              <Field label="Project details">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={3}
                  placeholder="Tell us about your project, design, deadline..."
                  className="w-full border-2 border-[#0a0a0a] bg-transparent p-3 text-sm font-medium text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#ff4d00] focus:outline-none"
                />
              </Field>
            </div>

            {/* Artwork upload */}
            <div className="mt-5 border-t-2 border-[#0a0a0a] pt-4">
              <div className="mb-2 flex items-baseline justify-between">
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#0a0a0a]">
                  Artwork / Logo files
                </label>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#0a0a0a]/50">
                  Max {MAX_FILES} files · {MAX_SIZE_MB} MB each
                </span>
              </div>

              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const dropped = Array.from(e.dataTransfer.files);
                  if (dropped.length === 0) return;
                  const fake = {
                    target: { files: dropped, value: "" },
                  } as unknown as React.ChangeEvent<HTMLInputElement>;
                  onPickFiles(fake);
                }}
                className="flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[#0a0a0a] bg-[#faf9f6] px-4 py-4 text-center transition-colors hover:bg-[#ff4d00]/5"
              >
                <Upload className="mb-1.5 h-5 w-5 text-[#0a0a0a]/60" />
                <div className="text-xs font-bold text-[#0a0a0a]">
                  Drop files here or <span className="text-[#ff4d00] underline">browse</span>
                </div>
                <div className="mt-1 text-[9px] font-medium text-[#0a0a0a]/50">
                  JPG · PNG · PDF · AI · EPS · PSD · SVG · TIFF
                </div>
              </div>

              <input
                ref={inputRef}
                type="file"
                multiple
                accept={ACCEPT_ATTR}
                onChange={onPickFiles}
                className="hidden"
              />

              {files.length > 0 && (
                <ul className="mt-2 space-y-1.5">
                  {files.map((a, i) => (
                    <li
                      key={`${a.name}-${i}`}
                      className="flex items-center justify-between border border-[#0a0a0a] bg-white px-3 py-1.5"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate text-xs font-bold text-[#0a0a0a]">{a.name}</span>
                        <span className="shrink-0 text-[10px] font-medium text-[#0a0a0a]/50">
                          {formatSize(a.size)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="shrink-0 text-xs font-black text-[#ff4d00] hover:text-[#0a0a0a]"
                        aria-label={`Remove ${a.name}`}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-2 text-[10px] leading-snug text-[#0a0a0a]/60">
                Once we receive your files, we&apos;ll send back a <strong>free mockup</strong> within 1 business day so you can see how your design looks on the product before we produce.
              </p>
            </div>

            {/* Error */}
            {errorMsg && (
              <div className="mt-4 border-2 border-[#ff4d00] bg-[#ff4d00]/10 p-2 text-xs font-bold text-[#0a0a0a]">
                ✗ {errorMsg}
              </div>
            )}

            {/* Submit row */}
            <div className="mt-6 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-[10px] text-[#6B6B6B] md:max-w-md">
                By clicking send, your email client opens with the form pre-filled. We will reply within 1 business day from info@sublimapparel.com.
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={closeQuote}
                  className="border-2 border-[#0a0a0a] bg-white text-[#0a0a0a] hover:bg-[#f5f5f5]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#ff4d00] px-6 text-white hover:bg-black"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Opening...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send quote request
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}

        <button
          onClick={closeQuote}
          className="absolute right-3 top-3 rounded-sm p-1 text-white/60 transition-all hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-[#0a0a0a]">
        {label}
        {required && <span className="text-[#ff4d00]"> *</span>}
      </span>
      {children}
    </label>
  );
}
