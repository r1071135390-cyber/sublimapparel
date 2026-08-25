"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type ExtractResult = {
  pi_number?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  customer_company?: string;
  customer_address?: string;
  items?: Array<{
    description?: string;
    fabric?: string;
    qty?: number;
    unit_price_usd?: number;
  }>;
  shipping_usd?: number;
  total_usd?: number;
  payment_terms?: string;
  lead_time_days?: number;
  notes?: string;
};

export default function UploadPIClient() {
  const router = useRouter();
  const [mode, setMode] = useState<"text" | "image">("text");
  const [text, setText] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [result, setResult] = useState<ExtractResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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

    setExtracting(true);
    try {
      const response = await fetch("/api/pi/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "text" ? { text } : { imageData, imageName },
        ),
      });

      const data: { ok?: boolean; data?: ExtractResult; error?: string } =
        await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      setResult(data.data || {});
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(`Extraction failed: ${msg}`);
    } finally {
      setExtracting(false);
    }
  }, [mode, text, imageData, imageName]);

  const handleContinue = useCallback(() => {
    if (!result) return;
    // Encode extracted data as base64 URL param, then go to new-pi
    const json = JSON.stringify(result);
    const encoded = btoa(unescape(encodeURIComponent(json)));
    router.push(`/admin/new-pi/?from=upload&data=${encodeURIComponent(encoded)}`);
  }, [result, router]);

  const clearAll = useCallback(() => {
    setText("");
    setImageData(null);
    setImageName(null);
    setResult(null);
    setError(null);
  }, []);

  const hasInput =
    (mode === "text" && text.trim().length > 0) ||
    (mode === "image" && imageData !== null);

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      {/* Header */}
      <header className="border-b-2 border-black bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="inline-block bg-[#ff4d00] px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
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
            Paste or upload a PI.
            <br />
            Get a payment link in 30 seconds.
          </h2>
          <p className="max-w-2xl text-base text-black/70">
            Drop a screenshot of your Proforma Invoice or paste the text.
            AI extracts the customer info, items, and total — you review
            and confirm, then send the link to your customer.
          </p>
        </section>

        {/* Mode tabs */}
        <section className="mb-6">
          <div className="inline-flex border-2 border-black bg-white p-1">
            <button
              type="button"
              onClick={() => setMode("text")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors ${
                mode === "text"
                  ? "bg-[#0a0a0a] text-white"
                  : "text-black/60 hover:text-black"
              }`}
            >
              <FileText className="h-4 w-4" /> Paste text
            </button>
            <button
              type="button"
              onClick={() => setMode("image")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors ${
                mode === "image"
                  ? "bg-[#0a0a0a] text-white"
                  : "text-black/60 hover:text-black"
              }`}
            >
              <ImageIcon className="h-4 w-4" /> Upload screenshot
            </button>
          </div>
        </section>

        {/* Input area */}
        <section className="mb-6">
          {mode === "text" ? (
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
                placeholder="INVOICE NO.: SA20260825001&#10;TO: John Smith, Acme Sports, 123 Main St NY&#10;ISSUE DATE: 25/Aug/2026&#10;LEAD TIME: Within 30 days&#10;&#10;men tank tops + shorts (15 sets) - $19.90 each - $298.50&#10;Shipping DDP by air - $118.00&#10;TOTAL: $416.50"
                rows={14}
                className="w-full border-2 border-black bg-white p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d00]"
                disabled={extracting}
              />
              <p className="mt-2 text-xs text-black/50">
                Copy from Word / Excel / PDF / email. Include customer info,
                items, prices, and total.
              </p>
            </div>
          ) : (
            <div>
              <label
                htmlFor="pi-image"
                className="mb-2 block text-xs font-black uppercase tracking-wider text-black"
              >
                Upload a screenshot of the PI
              </label>
              <div
                className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center border-2 border-dashed border-black bg-white p-6 transition-colors hover:bg-[#faf9f6]"
                onClick={() =>
                  document.getElementById("pi-image")?.click()
                }
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
                    <p className="mt-1 text-xs text-black/50">
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
              <p className="mt-2 text-xs text-black/50">
                Screenshot the PI from your email / Word / PDF reader. For
                PDFs, take a screenshot of the rendered page.
              </p>
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
            className="inline-flex items-center gap-2 border-2 border-black bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wider text-white shadow-[4px_4px_0_0_rgba(10,10,10,1)] transition-all hover:bg-[#cc3d00] hover:shadow-[6px_6px_0_0_rgba(10,10,10,1)] disabled:cursor-not-allowed disabled:bg-black/20 disabled:shadow-none"
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

            <div className="grid gap-4 text-sm sm:grid-cols-2">
              <Field label="PI Number" value={result.pi_number} mono />
              <Field
                label="Customer"
                value={result.customer_name}
                sub={result.customer_company}
              />
              <Field label="Email" value={result.customer_email} />
              <Field label="Phone" value={result.customer_phone} />
              <Field
                label="Address"
                value={result.customer_address}
                className="sm:col-span-2"
              />
              <Field
                label="Total (USD)"
                value={
                  result.total_usd !== undefined
                    ? `$${result.total_usd.toFixed(2)}`
                    : undefined
                }
                mono
              />
              <Field
                label="Shipping (USD)"
                value={
                  result.shipping_usd !== undefined
                    ? `$${result.shipping_usd.toFixed(2)}`
                    : undefined
                }
                mono
              />
              <Field
                label="Lead Time (days)"
                value={result.lead_time_days?.toString()}
              />
              <Field
                label="Payment Terms"
                value={result.payment_terms}
                className="sm:col-span-2"
              />
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
                        {it.unit_price_usd !== undefined
                          ? it.unit_price_usd.toFixed(2)
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

function Field({
  label,
  value,
  sub,
  mono,
  className = "",
}: {
  label: string;
  value?: string;
  sub?: string;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-black/50">
        {label}
      </p>
      {value ? (
        <p
          className={`text-sm font-bold text-black ${
            mono ? "font-mono" : ""
          }`}
        >
          {value}
        </p>
      ) : (
        <p className="text-sm italic text-black/30">not detected</p>
      )}
      {sub && <p className="text-xs text-black/60">{sub}</p>}
    </div>
  );
}
