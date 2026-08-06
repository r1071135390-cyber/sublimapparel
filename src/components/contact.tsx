"use client";

import { useRef, useState } from "react";

const MAX_FILES = 5;
const MAX_SIZE_MB = 25;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ACCEPTED = [".jpg", ".jpeg", ".png", ".pdf", ".ai", ".eps", ".psd", ".svg", ".tif", ".tiff"];
const ACCEPT_ATTR = ACCEPTED.join(",");

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

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    product: "Custom T-Shirts",
    quantity: "",
    shipCountry: "",
    shipZip: "",
    deadline: "",
    message: "",
  });
  const [files, setFiles] = useState<Attached[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

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
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      files.forEach((a) => fd.append("artwork", a.file, a.name));

      const res = await fetch("/api/inquiry", { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Request failed");
      }
      setStatus("ok");
      setForm({
        name: "",
        email: "",
        company: "",
        product: "Custom T-Shirts",
        quantity: "",
        shipCountry: "",
        shipZip: "",
        deadline: "",
        message: "",
      });
      setFiles([]);
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

            <div className="mt-10 space-y-4 border-t-2 border-black pt-6 text-sm">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-black/50">
                  WhatsApp
                </div>
                <div className="mt-1 text-base font-bold text-black">
                  +86 138 XXXX XXXX
                </div>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-black/50">
                  Email
                </div>
                <div className="mt-1 text-base font-bold text-black">
                  hello@sublimprint.com
                </div>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-black/50">
                  Address
                </div>
                <div className="mt-1 text-base font-bold leading-snug text-black">
                  35 Lingyun Road, Yiwu, Zhejiang
                  <br />
                  Zhejiang, China
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
                    <option>Sports Jerseys</option>
                    <option>Hoodies &amp; Sweatshirts</option>
                    <option>Tank Tops &amp; Vests</option>
                    <option>Pants &amp; Shorts</option>
                    <option>Polo Shirts</option>
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
                <Field label="Required delivery date *">
                  <input
                    type="text"
                    name="deadline"
                    required
                    value={form.deadline}
                    onChange={onChange}
                    placeholder="e.g. Need by Sept 15, 2026"
                    className="w-full border-b-2 border-black bg-transparent py-2 text-base font-medium text-black placeholder:text-black/30 focus:border-[#ff4d00] focus:outline-none"
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
                  ✓ Thanks! We&apos;ll be in touch within 24 hours with a quote and a free mockup.
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
