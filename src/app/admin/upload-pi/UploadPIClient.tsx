"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  File as FileIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";

type ExtractResult = {
  pi_number?: string | null;
  issue_date?: string | null;
  lead_time_text?: string | null;
  payment_terms_text?: string | null;
  customer?: {
    name?: string | null;
    phone?: string | null;
    address?: string | null;
  };
  items?: Array<{
    description?: string;
    fabric?: string | null;
    qty?: number;
    unit_price_cents?: number;
  }>;
  shipping_label?: string | null;
  shipping_method?: string | null;
  shipping_cents?: number;
  currency?: string;
  notes?: string | null;
};

type Mode = "text" | "image" | "file";

export default function UploadPIClient() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("text");
  const [text, setText] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [fileData, setFileData] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [result, setResult] = useState<ExtractResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file (PNG, JPG, or WebP)");
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        setError("Image must be under 8MB");
        return;
      }

      setError(null);
      setImageName(file.name);

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImageData(dataUrl);
      };
      reader.onerror = () => {
        setError("Failed to read the file");
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const name = file.name.toLowerCase();
      const ok =
        name.endsWith(".pdf") ||
        name.endsWith(".xlsx") ||
        name.endsWith(".xls");
      if (!ok) {
        setError("Please upload a PDF or Excel file (.pdf, .xlsx, .xls)");
        return;
      }
      if (file.size > 12 * 1024 * 1024) {
        setError("File must be under 12MB");
        return;
      }
      setError(null);
      setFileData(file);
    },
    [],
  );

  // ── Client-side parsers ──
  // PDF: extract text using pdfjs-dist
  async function extractPdfText(file: File): Promise<string> {
    const pdfjs = await import("pdfjs-dist");
    // Use a data-URL fake worker to avoid network fetch in browser
    const buffer = await file.arrayBuffer();
    const doc = await pdfjs.getDocument({ data: buffer, useSystemFonts: true, disableFontFace: true }).promise;
    let text = "";
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((it) => ("str" in it ? it.str : "")).join(" ") + "\n";
    }
    return text;
  }

  // Excel: extract cells with color info, mark red/blue/black
  async function extractExcelText(file: File): Promise<string> {
    const XLSX = await import("xlsx");
    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer, { type: "array", cellStyles: true });
    let out = "";
    for (const sheetName of wb.SheetNames) {
      const sheet = wb.Sheets[sheetName];
      if (!sheet) continue;
      out += `[Sheet: ${sheetName}]\n`;
      const range = XLSX.utils.decode_range(sheet["!ref"] || "A1");
      for (let r = range.s.r; r <= range.e.r; r++) {
        for (let c = range.s.c; c <= range.e.c; c++) {
          const addr = XLSX.utils.encode_cell({ r, c });
          const cell = sheet[addr];
          if (cell && cell.v != null) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const font = (cell as any).s?.font;
            const color = font?.color?.rgb || "";
            let marker = "";
            if (color && typeof color === "string") {
              if (color.toUpperCase().includes("FF0000") || color.toUpperCase().includes("FFFF0000")) marker = " [RED-SALES-INPUT]";
              else if (color.toUpperCase().includes("0000FF") || color.toUpperCase().includes("FF0000FF")) marker = " [BLUE-BANK]";
            }
            out += `${addr}=${String(cell.v).replace(/\n/g, " ")}${marker}\n`;
          }
        }
      }
      out += "\n";
    }
    return out;
  }

  // Image: convert to base64 data URL
  function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result || ""));
      r.onerror = () => reject(new Error("Failed to read file"));
      r.readAsDataURL(file);
    });
  }

  const handleExtract = useCallback(async () => {
    setError(null);
    setResult(null);

    if (mode === "text" && !text.trim()) {
      setError("Please paste the PI text first");
      return;
    }
    if (mode === "image" && !imageData) {
      setError("Please upload an image first");
      return;
    }
    if (mode === "file" && !fileData) {
      setError("Please upload a PDF, Excel, or image first");
      return;
    }

    setExtracting(true);
    try {
      let response: Response;
      if (mode === "file") {
        // Client-side parsing → send text/image to /api/pi/parse
        const name = fileData!.name.toLowerCase();
        let payload: { text?: string; imageData?: string; imageName?: string };
        if (name.endsWith(".pdf")) {
          const extracted = await extractPdfText(fileData!);
          payload = { text: extracted };
        } else if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
          const extracted = await extractExcelText(fileData!);
          payload = { text: extracted };
        } else {
          // image
          const dataUrl = await fileToDataUrl(fileData!);
          payload = { imageData: dataUrl, imageName: fileData!.name };
        }
        response = await fetch("/api/pi/parse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Text or image → /api/pi/parse
        response = await fetch("/api/pi/parse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            mode === "text" ? { text } : { imageData, imageName },
          ),
        });
      }

      const data: { success?: boolean; ok?: boolean; data?: ExtractResult; error?: string } =
        await response.json();

      if (!response.ok || !(data.success || data.ok)) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      setResult(data.data || {});
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(`Extraction failed: ${msg}`);
    } finally {
      setExtracting(false);
    }
  }, [mode, text, imageData, imageName, fileData]);

  const handleContinue = useCallback(() => {
    if (!result) return;
    // Convert ExtractResult → PrefillPayload (shape new-pi expects)
    const prefill = {
      pi_number: result.pi_number || undefined,
      issue_date: result.issue_date || undefined,
      lead_time_text: result.lead_time_text || undefined,
      customer_name: result.customer?.name || undefined,
      customer_phone: result.customer?.phone || undefined,
      customer_address: result.customer?.address || undefined,
      items: (result.items || []).map((it) => ({
        description: it.description,
        fabric: it.fabric || "",
        qty: it.qty || 1,
        unit_price_cents: it.unit_price_cents || 0,
      })),
      shipping_label: result.shipping_label || "Shipping Cost",
      shipping_method: result.shipping_method || "DDP by AIR",
      shipping_cents: result.shipping_cents || 0,
      payment_terms_text: result.payment_terms_text || undefined,
    };
    const json = JSON.stringify(prefill);
    const encoded = btoa(unescape(encodeURIComponent(json)));
    router.push(`/admin/new-pi/?from=upload&data=${encodeURIComponent(encoded)}`);
  }, [result, router]);

  const clearAll = useCallback(() => {
    setText("");
    setImageData(null);
    setImageName(null);
    setFileData(null);
    setResult(null);
    setError(null);
  }, []);

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
  };

  const hasInput =
    (mode === "text" && text.trim().length > 0) ||
    (mode === "image" && imageData !== null) ||
    (mode === "file" && fileData !== null);

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      {/* Header */}
      <header className="border-b-2 border-black bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="inline-block bg-[#ff4d00] px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-black">
              Sales
            </span>
            <h1 className="text-base font-black uppercase tracking-tight text-black">
              Upload PI
            </h1>
          </div>
          <Link
            href="/admin/"
            className="text-xs font-bold uppercase tracking-wider text-black/60 hover:text-black"
          >
            ← Back
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Hero */}
        <section className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#00c2ff]">
            <Sparkles className="h-3 w-3" /> AI-powered
          </div>
          <h2 className="mb-3 text-3xl font-black leading-tight tracking-tight text-[#0a0a0a] sm:text-4xl">
            Upload your PI file.
            <br />
            Get a payment link in 30 seconds.
          </h2>
          <p className="max-w-2xl text-base text-black/70">
            Drop a PDF or Excel file, or paste a screenshot or text.
            AI extracts the customer info, items, and total — you review
            and confirm, then send the link to your customer.
          </p>
        </section>

        {/* Mode tabs */}
        <section className="mb-6">
          <div className="inline-flex flex-wrap border-2 border-black bg-white p-1">
            <ModeTab active={mode === "text"} onClick={() => switchMode("text")}>
              <FileText className="h-4 w-4" /> Paste text
            </ModeTab>
            <ModeTab active={mode === "image"} onClick={() => switchMode("image")}>
              <ImageIcon className="h-4 w-4" /> Image
            </ModeTab>
            <ModeTab active={mode === "file"} onClick={() => switchMode("file")}>
              <FileSpreadsheet className="h-4 w-4" /> PDF / Excel
            </ModeTab>
          </div>
        </section>

        {/* Input area */}
        <section className="mb-6">
          {mode === "text" && (
            <div>
              <label
                htmlFor="pi-text"
                className="mb-2 block text-xs font-black uppercase tracking-wider text-black"
              >
                Paste your PI text here
              </label>
              <textarea
                id="pi-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your PI content here. Example fields it may include:&#10;  INVOICE NO. / ISSUE DATE / LEAD TIME / TO (name + address + phone)&#10;  Item rows: description, fabric, qty + unit, price&#10;  Shipping line, total amount, payment terms"
                rows={14}
                className="w-full border-2 border-black bg-white p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d00]"
                disabled={extracting}
              />
            </div>
          )}

          {mode === "image" && (
            <div>
              <label
                htmlFor="pi-image"
                className="mb-2 block text-xs font-black uppercase tracking-wider text-black"
              >
                Upload a screenshot of the PI
              </label>
              <div
                className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center border-2 border-dashed border-black bg-white p-6 transition-colors hover:bg-[#faf9f6]"
                onClick={() => document.getElementById("pi-image")?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    document.getElementById("pi-image")?.click();
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {imageData ? (
                  <div className="w-full">
                    <img
                      src={imageData}
                      alt="PI preview"
                      className="mx-auto max-h-[300px] border border-black"
                    />
                    <p className="mt-3 text-center text-xs text-black/60">
                      {imageName} · click to change
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="mb-3 h-8 w-8 text-black/40" />
                    <p className="text-sm font-bold text-black">
                      Click to upload or drag and drop
                    </p>
                    <p className="mt-1 text-xs text-black/70">
                      PNG, JPG, WebP up to 8MB
                    </p>
                  </>
                )}
              </div>
              <input
                id="pi-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={extracting}
              />
            </div>
          )}

          {mode === "file" && (
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-wider text-black">
                Upload PI as PDF or Excel
              </label>
              <div
                className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center border-2 border-dashed border-black bg-white p-6 transition-colors hover:bg-[#faf9f6]"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    fileInputRef.current?.click();
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {fileData ? (
                  <div className="flex items-center gap-3">
                    {fileData.name.toLowerCase().endsWith(".pdf") ? (
                      <FileIcon className="h-10 w-10 text-[#ff4d00]" />
                    ) : (
                      <FileSpreadsheet className="h-10 w-10 text-[#00c2ff]" />
                    )}
                    <div className="text-left">
                      <p className="font-bold text-black">{fileData.name}</p>
                      <p className="text-xs text-black/60">
                        {(fileData.size / 1024).toFixed(1)} KB · click to change
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFileData(null);
                      }}
                      className="ml-3 text-black/40 hover:text-black"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mb-3 h-8 w-8 text-black/40" />
                    <p className="text-sm font-bold text-black">
                      Click to upload or drag and drop
                    </p>
                    <p className="mt-1 text-xs text-black/70">
                      PDF or Excel (.pdf, .xlsx, .xls) up to 12MB
                    </p>
                    <p className="mt-3 text-[10px] text-black/40">
                      Excel parsing preserves the red / blue / black colors so the
                      AI knows which cells are customer-fillable.
                    </p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.xlsx,.xls,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                onChange={handleFileUpload}
                className="hidden"
                disabled={extracting}
              />
            </div>
          )}
        </section>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start gap-3 border-2 border-[#ff4d00] bg-[#fff5f0] p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ff4d00]" />
            <p className="text-sm text-[#0a0a0a]">{error}</p>
          </div>
        )}

        {/* Action buttons */}
        <section className="mb-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleExtract}
            disabled={!hasInput || extracting}
            className="inline-flex items-center gap-2 border-2 border-black bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wider text-black shadow-[4px_4px_0_0_rgba(10,10,10,1)] transition-all hover:bg-[#cc3d00] hover:shadow-[6px_6px_0_0_rgba(10,10,10,1)] disabled:cursor-not-allowed disabled:bg-black/20 disabled:shadow-none"
          >
            {extracting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Extracting...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Extract PI data
              </>
            )}
          </button>
          {hasInput && !extracting && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-bold uppercase tracking-wider text-black/60 hover:text-black"
            >
              Clear
            </button>
          )}
        </section>

        {/* Result */}
        {result && (
          <section className="border-2 border-black bg-white p-6 shadow-[6px_6px_0_0_rgba(10,10,10,1)]">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#00c2ff]" />
              <h3 className="text-lg font-black uppercase tracking-tight text-black">
                Extracted data — please review
              </h3>
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <Field label="PI Number" value={result.pi_number} mono />
              <Field
                label="Issue Date"
                value={result.issue_date}
              />
              <Field label="Lead Time" value={result.lead_time_text} className="sm:col-span-2" />
              <Field
                label="Customer"
                value={result.customer?.name}
              />
              <Field label="Phone" value={result.customer?.phone} />
              <Field
                label="Address"
                value={result.customer?.address}
                className="sm:col-span-2"
              />
              <Field
                label="Shipping"
                value={
                  result.shipping_cents !== undefined
                    ? `${result.shipping_method || "—"} (${(result.shipping_cents / 100).toFixed(2)} USD)`
                    : undefined
                }
              />
              <Field
                label="Total (USD)"
                value={
                  result.items && result.shipping_cents !== undefined
                    ? `$${(
                        (result.items.reduce(
                          (s, it) => s + (it.qty || 0) * (it.unit_price_cents || 0),
                          0,
                        ) +
                          (result.shipping_cents || 0)) /
                        100
                      ).toFixed(2)}`
                    : undefined
                }
                mono
              />
              {result.payment_terms_text && (
                <Field
                  label="Payment Terms"
                  value={result.payment_terms_text}
                  className="sm:col-span-2"
                />
              )}
            </div>

            {result.items && result.items.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-black uppercase tracking-wider text-black">
                  Items ({result.items.length})
                </p>
                <div className="border-2 border-black">
                  {result.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 border-b border-black/10 p-2 text-xs last:border-b-0"
                    >
                      <div className="flex-1">
                        <p className="font-bold text-black">
                          {it.description || "(no description)"}
                        </p>
                        {it.fabric && (
                          <p className="text-black/60">{it.fabric}</p>
                        )}
                      </div>
                      <div className="text-right font-mono text-black">
                        {it.qty ?? "?"} × $
                        {it.unit_price_cents !== undefined
                          ? (it.unit_price_cents / 100).toFixed(2)
                          : "?"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.notes && (
              <div className="mt-4 border-l-4 border-[#ff4d00] bg-[#fff5f0] p-3 text-xs text-black/80">
                <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#ff4d00]">
                  Notes
                </p>
                {result.notes}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex items-center gap-2 border-2 border-black bg-[#0a0a0a] px-6 py-3 text-sm font-black uppercase tracking-wider text-white shadow-[4px_4px_0_0_rgba(255,77,0,1)] transition-all hover:bg-black hover:shadow-[6px_6px_0_0_rgba(255,77,0,1)]"
              >
                Continue to review & create
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  setError(null);
                }}
                className="text-xs font-bold uppercase tracking-wider text-black/60 hover:text-black"
              >
                Re-extract
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function ModeTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors ${
        active
          ? "bg-[#0a0a0a] text-white"
          : "text-black/60 hover:text-black"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  mono,
  sub,
  className = "",
}: {
  label: string;
  value?: string | null;
  mono?: boolean;
  sub?: string | null;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-black/70">
        {label}
      </p>
      {value ? (
        <>
          <p className={`text-black ${mono ? "font-mono" : ""}`}>{value}</p>
          {sub && <p className="text-xs text-black/60">{sub}</p>}
        </>
      ) : (
        <p className="text-xs italic text-black/40">(not detected)</p>
      )}
    </div>
  );
}
