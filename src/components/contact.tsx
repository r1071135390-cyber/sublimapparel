"use client";

import { useRef, useState } from "react";
import { Plus, Minus, X } from "lucide-react";

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

type Attached = {
  file: File;
  name: string;
  size: number;
};

type SizeRow = {
  /** Stable id so React keys stay stable when adding/removing rows */
  id: string;
  /** The size label shown in the column header, e.g. "S", "M", "3XL", "Tall" */
  size: string;
  /** Quantity for this size; 0 means "not needed" */
  qty: number;
  /** True for the 6 default rows that can't be removed; false for user-added rows */
  fixed: boolean;
};

const DEFAULT_SIZES: SizeRow[] = [
  { id: "sz-xs", size: "XS", qty: 0, fixed: true },
  { id: "sz-s", size: "S", qty: 0, fixed: true },
  { id: "sz-m", size: "M", qty: 0, fixed: true },
  { id: "sz-l", size: "L", qty: 0, fixed: true },
  { id: "sz-xl", size: "XL", qty: 0, fixed: true },
  { id: "sz-xxl", size: "2XL", qty: 0, fixed: true },
];

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    product: "Custom T-Shirts",
    process: "Sublimation",
    fabric: "Polyester",
    designStatus: "Have design ready",
    quantity: "",
    shipCountry: "",
    shipZip: "",
    deadline: "",
    message: "",
  });
  const [sizeRows, setSizeRows] = useState<SizeRow[]>(DEFAULT_SIZES);
  const [files, setFiles] = useState<Attached[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // --- Size row helpers ---
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
    // Limit to a few characters so it doesn't blow up the column header
    const trimmed = size.replace(/\s+/g, "").slice(0, 8);
    setSizeRows((rows) => rows.map((r) => (r.id === id ? { ...r, size: trimmed } : r)));
  };
  const totalPieces = sizeRows.reduce((sum, r) => sum + r.qty, 0);
  /** Render the size breakdown as a compact string for the email body */
  const sizeBreakdownText = sizeRows
    .filter((r) => r.size && r.qty > 0)
    .map((r) => `${r.size} ${r.qty}`)
    .join(" / ");

  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    setErrorMsg("");
    if (picked.length === 0) return;

    // Combine current + new
    const toAttached = (f: File): Attached => ({
      file: f,
      name: f.name,
      size: f.size,
    });
    const combined = [...files, ...picked.map(toAttached)];

    // Validate count
    if (combined.length > MAX_FILES) {
      setErrorMsg(`Maximum ${MAX_FILES} files. You have ${files.length} already and tried to add ${picked.length} more.`);
      e.target.value = "";
      return;
    }

    // Validate each file
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

  const removeFile = (idx: number) => {
    setFiles((arr) => arr.filter((_, i) => i !== idx));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    // Validate required fields
    if (!form.name || !form.email) {
      setStatus("err");
      setErrorMsg("Name and email are required.");
      return;
    }
    if (!form.deadline) {
      setStatus("err");
      setErrorMsg("Required delivery date is required for a DDP quote.");
      return;
    }

    try {
      // Build a structured email body from form data.
      // mailto: opens the customer's email client with a new message addressed to us.
      // The customer can review, attach artwork manually, and hit Send.
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
        `Size breakdown: ${sizeBreakdownText || "—"}`,
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
        `Artwork files: ${files.length} file(s) ready to attach (${files.map(f => f.name).join(", ") || "none"})`,
        ``,
        `Best regards,`,
        `${form.name}`,
      ];

      const subject = `Inquiry: ${form.product} — ${form.quantity || "TBD"} pcs — ${form.name}`;
      const mailto = `mailto:info@sublimapparel.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

      // Open the user's email client
      window.location.href = mailto;

      setStatus("ok");
      // Don't clear the form — the user might want to retry or screenshot
    } catch (err) {
      setStatus("err");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section className="border-b-2 border-black bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Left: bold statement */}
          <div className="md:col-span-5">
            <div className="mb-3 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Get in touch
            </div>
            <h2 className="text-5xl font-black leading-[0.95] tracking-tight text-black md:text-7xl">
              Got a
              <br />
              <span className="text-[#ff4d00]">project?</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-black/70">
              Send us your design, your quantity, and your deadline. We&apos;ll reply with a
              quote within 24 hours.
            </p>

            <div className="mt-10 space-y-8 border-t-2 border-black pt-8 text-sm">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-black/50">
                  WhatsApp
                </div>
                <div className="mt-1 text-base font-bold text-black">
                  <a href="https://wa.me/8619817930190" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff4d00]">
                    +86 198 1793 0190
                  </a>
                </div>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-black/50">
                  Email
                </div>
                <div className="mt-1 text-base font-bold text-black">
                  <a href="mailto:info@sublimapparel.com" className="hover:text-[#ff4d00]">
                    info@sublimapparel.com
                  </a>
                </div>
              </div>
              {/* Factory — China */}
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-black/50">
                  <span className="mr-1.5">🇨🇳</span>Factory · China
                </div>
                <div className="mt-1 text-base font-bold leading-snug text-black">
                  35 Lingyun Road, Yiwu
                  <br />
                  Zhejiang, China
                </div>
              </div>

              {/* Warehouse — US (Los Angeles) */}
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-black/50">
                  <span className="mr-1.5">🇺🇸</span>Warehouse · USA
                </div>
                <div className="mt-1 text-base font-bold leading-snug text-black">
                  13052 Jurupa Ave
                  <br />
                  Fontana, CA 92335
                  <br />
                  United States
                </div>
                <div className="mt-1 text-xs font-medium text-black/50">
                  US local pickup · no customs · 2–5 day ground
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="md:col-span-7">
            <form
              onSubmit={onSubmit}
              className="border-2 border-black bg-white p-8 md:p-10"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Name *">
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                    className="w-full border-b-2 border-black bg-transparent py-2 text-base font-medium text-black placeholder:text-black/30 focus:border-[#ff4d00] focus:outline-none"
                  />
                </Field>
                <Field label="Email *">
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@company.com"
                    className="w-full border-b-2 border-black bg-transparent py-2 text-base font-medium text-black placeholder:text-black/30 focus:border-[#ff4d00] focus:outline-none"
                  />
                </Field>
                <Field label="Company">
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={onChange}
                    placeholder="Company / brand"
                    className="w-full border-b-2 border-black bg-transparent py-2 text-base font-medium text-black placeholder:text-black/30 focus:border-[#ff4d00] focus:outline-none"
                  />
                </Field>
                <Field label="Product *">
                  <select
                    name="product"
                    value={form.product}
                    onChange={onChange}
                    className="w-full border-b-2 border-black bg-transparent py-2 text-base font-medium text-black focus:border-[#ff4d00] focus:outline-none"
                  >
                    <option>Custom T-Shirts (Polyester)</option>
                    <option>Custom T-Shirts (Cotton)</option>
                    <option>Cycling Kits</option>
                    <option>Racing Kits</option>
                    <option>Hoodies &amp; Sweatshirts</option>
                    <option>Jerseys &amp; Vests</option>
                    <option>Pants &amp; Shorts</option>
                    <option>Golf / Bowling Shirts</option>
                    <option>Hats &amp; Caps</option>
                    <option>Bags &amp; Backpacks</option>
                    <option>Flags &amp; Banners</option>
                    <option>Home Textiles (Pillows, Throws, Curtains)</option>
                    <option>Mousepads &amp; Coasters</option>
                    <option>Phone Cases &amp; Small Accessories</option>
                    <option>Custom Project (Other)</option>
                  </select>
                </Field>
                <Field label="Quantity">
                  <input
                    type="text"
                    name="quantity"
                    value={form.quantity}
                    onChange={onChange}
                    placeholder="e.g. 300 pcs"
                    className="w-full border-b-2 border-black bg-transparent py-2 text-base font-medium text-black placeholder:text-black/30 focus:border-[#ff4d00] focus:outline-none"
                  />
                </Field>
              </div>

              {/* Project specs — process / fabric / design status / size breakdown */}
              <div className="mt-6">
                <div className="mb-3 flex items-baseline justify-between">
                  <label className="text-xs font-black uppercase tracking-widest text-black">
                    Project specs
                  </label>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black/50">
                    Helps us quote faster &amp; more accurately
                  </span>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  <Field label="Print method">
                    <select
                      name="process"
                      value={form.process}
                      onChange={onChange}
                      className="w-full border-b-2 border-black bg-transparent py-2 text-sm font-medium text-black focus:border-[#ff4d00] focus:outline-none"
                    >
                      <option>Sublimation</option>
                      <option>DTG (Direct to garment)</option>
                      <option>DTF (Heat transfer)</option>
                      <option>Screen print</option>
                      <option>Embroidery</option>
                      <option>Not sure — please advise</option>
                    </select>
                  </Field>
                  <Field label="Fabric">
                    <select
                      name="fabric"
                      value={form.fabric}
                      onChange={onChange}
                      className="w-full border-b-2 border-black bg-transparent py-2 text-sm font-medium text-black focus:border-[#ff4d00] focus:outline-none"
                    >
                      <option>Polyester</option>
                      <option>100% cotton</option>
                      <option>Poly-cotton blend</option>
                      <option>Recycled / rPET</option>
                      <option>Not sure — please advise</option>
                    </select>
                  </Field>
                  <Field label="Design status">
                    <select
                      name="designStatus"
                      value={form.designStatus}
                      onChange={onChange}
                      className="w-full border-b-2 border-black bg-transparent py-2 text-sm font-medium text-black focus:border-[#ff4d00] focus:outline-none"
                    >
                      <option>Have design ready</option>
                      <option>Have sketch / concept</option>
                      <option>Need design help</option>
                      <option>Use a template</option>
                    </select>
                  </Field>
                </div>
                <Field
                  label="Size breakdown (optional — can be confirmed in the formal order)"
                  className="mt-6"
                >
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

              {/* Shipping address — required for DDP quote */}
              <div className="mt-6">
                <div className="mb-1 flex items-baseline justify-between">
                  <label className="block text-xs font-black uppercase tracking-widest text-black">
                    Ship to <span className="text-black/50">— for DDP quote</span>
                  </label>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black/50">
                    Country + ZIP / postal code at minimum
                  </span>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <input
                    type="text"
                    name="shipCountry"
                    value={form.shipCountry}
                    onChange={onChange}
                    placeholder="Country (e.g. United States)"
                    className="w-full border-b-2 border-black bg-transparent py-2 text-base font-medium text-black placeholder:text-black/30 focus:border-[#ff4d00] focus:outline-none"
                  />
                  <input
                    type="text"
                    name="shipZip"
                    value={form.shipZip}
                    onChange={onChange}
                    placeholder="ZIP / postal code"
                    className="w-full border-b-2 border-black bg-transparent py-2 text-base font-medium text-black placeholder:text-black/30 focus:border-[#ff4d00] focus:outline-none"
                  />
                </div>
                <p className="mt-2 text-[11px] leading-snug text-black/60">
                  We need the destination country + postal code to calculate the
                  accurate <strong>landed, duty-paid price</strong>. Street address can be added in the project details below if known.
                </p>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <Field label="Required delivery date (to your door) *">
                  <input
                    type="date"
                    name="deadline"
                    required
                    min={MIN_DELIVERY_DATE}
                    value={form.deadline}
                    onChange={onChange}
                    className="w-full border-b-2 border-black bg-transparent py-2 text-base font-medium text-black focus:border-[#ff4d00] focus:outline-none"
                  />
                </Field>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-xs font-black uppercase tracking-widest text-black">
                  Project details
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={4}
                  placeholder="Tell us about your project, design, deadline..."
                  className="w-full border-2 border-black bg-transparent p-3 text-base font-medium text-black placeholder:text-black/30 focus:border-[#ff4d00] focus:outline-none"
                />
              </div>

              {/* Artwork upload */}
              <div className="mt-6">
                <div className="mb-2 flex items-baseline justify-between">
                  <label className="block text-xs font-black uppercase tracking-widest text-black">
                    Artwork / Logo files
                  </label>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black/50">
                    Max {MAX_FILES} files · {MAX_SIZE_MB} MB each
                  </span>
                </div>

                <div
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const dropped = Array.from(e.dataTransfer.files);
                    if (dropped.length === 0) return;
                    const fake = { target: { files: dropped, value: "" } } as unknown as React.ChangeEvent<HTMLInputElement>;
                    onPickFiles(fake);
                  }}
                  className="flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-black bg-[#faf9f6] px-4 py-6 text-center transition-colors hover:bg-[#ff4d00]/5"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mb-2 text-black/60"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <div className="text-sm font-bold text-black">
                    Drop files here or <span className="text-[#ff4d00] underline">browse</span>
                  </div>
                  <div className="mt-1 text-[10px] font-medium text-black/50">
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
                  <ul className="mt-3 space-y-1.5">
                    {files.map((a, i) => (
                      <li
                        key={`${a.name}-${i}`}
                        className="flex items-center justify-between border-2 border-black bg-white px-3 py-1.5"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <span className="truncate text-xs font-bold text-black">
                            {a.name}
                          </span>
                          <span className="shrink-0 text-[10px] font-medium text-black/50">
                            {formatSize(a.size)}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="shrink-0 text-xs font-black text-[#ff4d00] hover:text-black"
                          aria-label={`Remove ${a.name}`}
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-2 text-[11px] leading-snug text-black/60">
                  Once we receive your files, we&apos;ll send back a <strong>free mockup</strong> within 1 business day so you can see how your design looks on the product before we produce.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-xs text-black/50">
                  We reply within 24 hours. No spam.
                </p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center justify-center gap-2 bg-[#ff4d00] px-8 py-4 text-base font-black uppercase tracking-wider text-white transition-colors hover:bg-black disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send inquiry"}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>

              {status === "ok" && (
                <div className="mt-4 border-2 border-[#00c2ff] bg-[#00c2ff]/10 p-3 text-sm font-bold text-black">
                  ✓ Your email client should have opened with the inquiry pre-filled.
                  Attach your artwork files and hit send — we&apos;ll reply within 24 hours.
                  If nothing opened, please email us directly at{" "}
                  <a href="mailto:info@sublimapparel.com" className="underline">
                    info@sublimapparel.com
                  </a>
                  .
                </div>
              )}
              {status === "err" && (
                <div className="mt-4 border-2 border-[#ff4d00] bg-[#ff4d00]/10 p-3 text-sm font-bold text-black">
                  ✗ {errorMsg || "Something went wrong. Please try again."}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs font-black uppercase tracking-widest text-black">
        {label}
      </label>
      {children}
    </div>
  );
}

/**
 * Stepper for a single size column.
 *  - [-] [ qty ] [+]
 *  - The +/- buttons bump the qty
 *  - The number can also be typed directly
 */
function SizeQtyStepper({
  qty,
  onBump,
  onSet,
}: {
  qty: number;
  onBump: (delta: number) => void;
  onSet: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-black/15 bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onBump(-1)}
        className="flex h-9 w-9 items-center justify-center text-black/60 transition-colors hover:bg-black/5 hover:text-[#ff4d00] disabled:cursor-not-allowed disabled:opacity-30"
        disabled={qty <= 0}
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={99999}
        value={qty}
        onChange={(e) => onSet(parseInt(e.target.value, 10))}
        onFocus={(e) => e.currentTarget.select()}
        className="w-full bg-transparent text-center text-sm font-bold tabular-nums text-black focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onBump(1)}
        className="flex h-9 w-9 items-center justify-center text-black/60 transition-colors hover:bg-[#ff4d00]/10 hover:text-[#ff4d00]"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>
    </div>
  );
}

/**
 * Structured "Size breakdown" picker:
 *   - Default 6 columns: XS / S / M / L / XL / 2XL (cannot be removed)
 *   - "+ Add special size" button appends a removable, renamable row (e.g. 3XL, 4XL, Tall, Kids-8)
 *   - Live "N pcs" total below the picker
 *   - leave 0 if not needed
 */
function SizeQuantityPicker({
  rows,
  onBump,
  onSetQty,
  onAdd,
  onRemove,
  onRename,
  totalPieces,
}: {
  rows: SizeRow[];
  onBump: (id: string, delta: number) => void;
  onSetQty: (id: string, n: number) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onRename: (id: string, label: string) => void;
  totalPieces: number;
}) {
  const fixedRows = rows.filter((r) => r.fixed);
  const customRows = rows.filter((r) => !r.fixed);

  return (
    <div className="space-y-4">
      {/* Default 6-column grid */}
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {fixedRows.map((r) => (
          <div key={r.id} className="flex flex-col">
            <div className="mb-1.5 text-center text-xs font-black uppercase tracking-widest text-black">
              {r.size}
            </div>
            <SizeQtyStepper qty={r.qty} onBump={(d) => onBump(r.id, d)} onSet={(n) => onSetQty(r.id, n)} />
          </div>
        ))}
      </div>

      {/* Custom rows (3XL, 4XL, Tall, etc.) */}
      {customRows.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {customRows.map((r) => (
            <div key={r.id} className="flex flex-col">
              <div className="mb-1.5 flex items-center gap-1.5">
                <input
                  type="text"
                  value={r.size}
                  onChange={(e) => onRename(r.id, e.target.value)}
                  placeholder="e.g. 3XL"
                  maxLength={8}
                  aria-label="Custom size label"
                  className="w-full border-b-2 border-black/30 bg-transparent py-1 text-center text-xs font-black uppercase tracking-widest text-black placeholder:text-black/30 focus:border-[#ff4d00] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => onRemove(r.id)}
                  aria-label={`Remove ${r.size || "custom size"}`}
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-black/40 transition-colors hover:bg-black/5 hover:text-[#ff4d00]"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
              </div>
              <SizeQtyStepper qty={r.qty} onBump={(d) => onBump(r.id, d)} onSet={(n) => onSetQty(r.id, n)} />
            </div>
          ))}
        </div>
      )}

      {/* Add special size button */}
      <button
        type="button"
        onClick={onAdd}
        className="w-full rounded-md border border-dashed border-black/20 px-3 py-2.5 text-xs font-bold text-[#ff4d00] transition-colors hover:border-[#ff4d00] hover:bg-[#ff4d00]/5"
      >
        + Add special size (e.g. 3XL, 4XL, Tall) — add as many rows as you need
      </button>

      {/* Live total */}
      <div className="flex items-baseline justify-between border-t border-black/10 pt-3">
        <div className="text-xs font-bold uppercase tracking-widest text-black/60">
          Total <span className="ml-1 text-base font-black tabular-nums text-black">{totalPieces.toLocaleString()}</span> pcs
        </div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-black/40">
          leave 0 if not needed
        </div>
      </div>
    </div>
  );
}
