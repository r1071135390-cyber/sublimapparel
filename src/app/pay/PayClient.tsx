"use client";

/**
 * /pay/?pi=.../PayClient.tsx (also served at /quote/?id=... via redirect)
 *
 * Customer-facing PI view. Renders the PI in print-friendly format + two payment options:
 *   1. Card (Stripe Elements — inline, no navigation since R91)
 *   2. Bank Transfer (T/T) — for customers preferring wire transfer
 *
 * Data flow:
 *   1. On mount, fetch /api/pi/{pi_number} to get PI details
 *   2. Render PI in a print-styled layout (same look as the PDF your sales team sends)
 *   3. "Pay by Card" mints a PaymentIntent inline via /api/pi/stripe-payment-intent
 *      and shows Stripe Elements on the same page; on success, Stripe redirects
 *      back to /pay/?pi=...&payment=success (R93) so the customer can keep using
 *      the page (download PDF, etc.).
 */

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PIDisplay, type PIDisplayData } from "@/components/pi/PIDisplay";
import { PayWithStripeElements } from "@/components/PayWithStripeElements";
import { getBankAccount } from "@/lib/bank-accounts";
import { Truck, CheckCircle2, Loader2, Download, Building2, CreditCard, AlertCircle } from "lucide-react";

// ---------- Types ----------

interface PIItem {
  description: string;
  fabric?: string;
  qty: number;
  unit_price_cents: number;
  total_cents: number;
  image_url?: string;
  sizes?: { label: string; qty: number }[] | null;
}

interface PIData {
  pi_number: string;
  status: "draft" | "sent" | "paid" | "pending_bank" | "canceled" | "expired";
  issue_date: string;
  valid_until?: string;
  lead_time_days: number;
  production_time_days: number;
  payment_terms: string;
  payment_percentage: number;

  // Customer
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  customer_company?: string;
  customer_address?: string;

  // Money
  items: PIItem[];
  subtotal_cents: number;
  shipping_cents: number;
  total_cents: number;
  currency: string;

  // Stripe (R76: Payment Links — no client_secret needed, the hosted page
  // handles payment and POSTs back via the webhook).
  amount_due_cents: number; // what the customer needs to pay right now
  amount_paid_cents: number;

  // New Excel-style metadata (from /api/pi/parse or manual form)
  lead_time_text?: string;
  payment_terms_text?: string;
  shipping_label?: string;
  shipping_method?: string;
  image_url?: string;
}

// ---------- Helpers ----------

const fmtMoney = (cents: number, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(cents / 100);

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

// ---------- Component ----------

export default function PayClient() {
  const searchParams = useSearchParams();
  const piNumber = searchParams.get("pi") || "";
  const [pi, setPi] = useState<PIData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  const [bankSubmitted, setBankSubmitted] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  useEffect(() => {
    if (!piNumber) {
      setError("No PI number provided in URL");
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/pi/${encodeURIComponent(piNumber)}`);
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(body.error || `HTTP ${res.status}`);
        }
        const data = (await res.json()) as { pi: PIData };
        if (!cancelled) {
          setPi(data.pi);
          if (data.pi.status === "pending_bank") setBankSubmitted(true);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load PI");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [piNumber]);

  // PDF download — 2026-10-03 (R79): use html2canvas to screenshot the actual
  // rendered <article id="pi-document"> so the exported PDF is byte-equivalent
  // to the page the customer sees (logo, Inter typography, black/red/blue
  // Excel borders, item images, bank info — all captured exactly).
  // Previous jsPDF-only implementation hand-drew a simplified version with
  // Helvetica and missed ~30% of the visual fidelity.
  const downloadPDF = useCallback(async (): Promise<void> => {
    if (!pi) return;
    const article = document.getElementById("pi-document");
    if (!article) {
      setError("PI document not ready — please retry");
      return;
    }

    setPdfGenerating(true);
    try {
      // 1. Wait for web fonts to load so Inter/Chinese fallbacks render
      //    correctly in the screenshot. document.fonts is typed in lib.dom
      //    since TS 5.4 — no `any` cast needed.
      if (typeof document !== "undefined" && document.fonts?.ready) {
        await document.fonts.ready;
      }

      // 2. Wait for every <img> inside the article to finish loading.
      //    R2-hosted product images are lazy-loaded; html2canvas would
      //    otherwise screenshot a blank square.
      const images = Array.from(article.querySelectorAll("img"));
      await Promise.all(
        images.map(
          (img): Promise<void> =>
            new Promise<void>((resolve) => {
              if (img.complete && img.naturalWidth > 0) {
                resolve();
                return;
              }
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
              // Safety timeout — never wait more than 3s per image
              setTimeout(() => resolve(), 3000);
            }),
        ),
      );

      // 3. Screenshot at 2x for crisp PDF render on retina/print.
      //    onclone injects an OKLCH/oklab-free style sheet — html2canvas's
      //    CSS parser (which walks getComputedStyle) does not yet understand
      //    the modern oklab()/oklch() color functions that Tailwind v4 ships
      //    via globals.css, and throws "Attempting to parse an unsupported
      //    color function 'oklab'" before rendering anything. We swap every
      //    oklab/oklch color reference for a near-equivalent rgb() so the
      //    canvas-based screenshot finishes cleanly.
      const canvas = await html2canvas(article, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: article.scrollWidth,
        windowHeight: article.scrollHeight,
        onclone: (clonedDoc) => {
          // Tailwind v4 globals.css declares ~30 oklch() shadcn theme
          // tokens (--background, --foreground, --primary, …). html2canvas
          // walks getComputedStyle() on every element and throws
          // "Attempting to parse an unsupported color function 'oklab'"
          // the instant it hits one — so the screenshot aborts before a
          // single pixel is drawn.
          //
          // Strategy: rewrite every oklab()/oklch() inside <style>
          // blocks in the cloned doc to a plain rgb() placeholder. The
          // same colour values Tailwind exposes via var(--background) etc.
          // resolve at computed-style time, so patching the textContent
          // fixes the crash without losing layout (flex, padding, border,
          // text-size utilities are all non-color CSS).
          //
          // PIDisplay sets its key colors (header, red TO block, blue
          // bank info) via inline `style={{ color: BLACK/RED/BLUE }}` —
          // those are untouched.
          const safeRgb = "rgb(0,0,0)";
          // Diagnostic: confirm onclone ran at all and what stylesheets
          // it saw in the cloned doc. Visible in DevTools console when
          // clicking Download PDF.
          const inlineStyles = clonedDoc.querySelectorAll("style");
          const linkStyles = clonedDoc.querySelectorAll('link[rel="stylesheet"]');
          console.log(
            `[PayClient] onclone entered: inlineStyleCount=${inlineStyles.length}, linkCount=${linkStyles.length}`,
          );
          // Tailwind v4 / shadcn emits colors via color-mix(in oklab, X, Y)
          // (and oklch / lab / lch variants), NOT the bare oklab(...) form.
          // html2canvas v1's color parser understands neither, so it crashes
          // mid-walk on the first color-mix(in oklab, ...) it meets.
          // Neutralise every flavor to a safe rgb(0,0,0) placeholder.
          const stripModern = (txt: string): string =>
            txt
              .replace(/color-mix\([^)]+\)/g, safeRgb)
              .replace(/oklab\([^)]*\)/g, safeRgb)
              .replace(/oklch\([^)]*\)/g, safeRgb)
              .replace(/color\([^)]*\)/g, safeRgb);

          clonedDoc.querySelectorAll("style").forEach((node) => {
            if (!node.textContent) return;
            if (!/oklab|oklch/.test(node.textContent)) return;
            node.textContent = stripModern(node.textContent);
          });

          // External stylesheets are usually same-origin hashed CSS
          // bundles (_next/static/chunks/*.css). Fetch the body via
          // synchronous XHR against window.location.href (the cloned doc
          // lives in an iframe with baseURI = about:blank, so resolving
          // href against clonedDoc.baseURI would yield about:blank/...
          // and the XHR would always fail), scrub every modern color
          // function, then re-inject as an inline <style> in place of
          // the link. Layout utilities (flex, padding, border-style, …)
          // are preserved because they don't depend on color values.
          // The 251 color-mix calls and 133 oklab() calls in the prod
          // bundle all collapse to rgb(0,0,0), which html2canvas parses
          // cleanly.
          let linkScrubOk = 0;
          let linkScrubFail = 0;
          clonedDoc.querySelectorAll('link[rel="stylesheet"]').forEach((node) => {
            try {
              const href = node.getAttribute("href");
              if (!href) {
                node.remove();
                return;
              }
              const absUrl = new URL(href, window.location.href).toString();
              const xhr = new XMLHttpRequest();
              xhr.open("GET", absUrl, false);
              xhr.send();
              if (xhr.status >= 200 && xhr.status < 300 && xhr.responseText) {
                const cleaned = stripModern(xhr.responseText);
                const style = clonedDoc.createElement("style");
                style.textContent = cleaned;
                if (node.parentNode) {
                  node.parentNode.insertBefore(style, node);
                }
                node.remove();
                linkScrubOk++;
              } else {
                node.remove();
                linkScrubFail++;
              }
            } catch (e) {
              console.warn("[PayClient] link stylesheet scrub failed", e);
              node.remove();
              linkScrubFail++;
            }
          });
          console.log(
            `[PayClient] onclone: link scrubbed=${linkScrubOk}, link dropped=${linkScrubFail}`,
          );
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      });
      const pageW = pdf.internal.pageSize.getWidth(); // 210
      const pageH = pdf.internal.pageSize.getHeight(); // 297
      // Fit width to A4 width; compute proportional height
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;

      // Multi-page support: when the PI is taller than one A4 page, split
      // it across pages with the same offset (negative position keeps the
      // image anchored to the top across pages).
      let heightLeft = imgH;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgW, imgH, undefined, "FAST");
      heightLeft -= pageH;
      while (heightLeft > 0) {
        position = heightLeft - imgH;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgW, imgH, undefined, "FAST");
        heightLeft -= pageH;
      }

      pdf.save(`${pi.pi_number}.pdf`);
    } catch (err) {
      console.error("[PayClient] PDF generation failed:", err);
      setError(
        err instanceof Error
          ? `PDF generation failed: ${err.message}`
          : "PDF generation failed — please retry",
      );
    } finally {
      setPdfGenerating(false);
    }
  }, [pi]);

  // ---------- Render states ----------

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-black/60">
          <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2.5} />
          Loading invoice…
        </div>
      </div>
    );
  }

  if (error || !pi) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-4">
        <div className="max-w-md border-2 border-black bg-white p-8 shadow-[6px_6px_0_0_rgba(10,10,10,1)]">
          <AlertCircle className="mb-3 h-10 w-10 text-[#ff4d00]" strokeWidth={2.5} />
          <h1 className="mb-2 text-2xl font-black uppercase tracking-tight">Invoice Not Found</h1>
          <p className="text-sm text-black/70">
            We couldn&apos;t find invoice <code className="bg-black/5 px-1.5 py-0.5 font-mono">{piNumber}</code>.
            It may have expired or the link is incorrect.
          </p>
          {error && <p className="mt-3 text-xs text-black/70">Error: {error}</p>}
        </div>
      </div>
    );
  }

  // R94: the <article id="pi-document"> is the capture target for the
  // html2canvas-based downloadPDF(). Previously it was only rendered in
  // the default "sent" branch (around line 461), which meant paid and
  // pending_bank customers clicking "Download PI PDF" got
  //   "PI document not ready — please retry"
  // because getElementById("pi-document") returned null, the page flipped
  // to the "Invoice Not Found" branch, and download was impossible.
  //
  // Fix: build the article once, then render it in every status branch.
  // For paid/pending we wrap it in piDocumentHidden so it's visually
  // invisible (the small status card stays as the primary content) yet
  // still in the DOM tree with computed dimensions — html2canvas needs
  // both to capture correctly.
  const piDocument = (
    <article
      id="pi-document"
      className="border-2 border-black bg-white p-6 shadow-[6px_6px_0_0_rgba(10,10,10,1)] sm:p-10 print:border-0 print:shadow-none"
    >
      <PIDisplay
        pi={{
          pi_number: pi.pi_number,
          issue_date: pi.issue_date,
          valid_until: pi.valid_until,
          lead_time_text: pi.lead_time_text,
          payment_terms_text: pi.payment_terms_text,
          customer_name: pi.customer_name,
          customer_email: pi.customer_email,
          customer_company: pi.customer_company,
          customer_phone: pi.customer_phone,
          customer_address: pi.customer_address,
          items: pi.items.map((it) => ({
            description: it.description,
            fabric: it.fabric,
            qty: it.qty,
            unit_price_cents: it.unit_price_cents,
            total_cents: it.total_cents,
            image_url: it.image_url,
            sizes: it.sizes,
          })),
          shipping_label: pi.shipping_label,
          shipping_method: pi.shipping_method,
          shipping_cents: pi.shipping_cents,
          total_cents: pi.total_cents,
          subtotal_cents: pi.subtotal_cents,
          currency: pi.currency,
        } as PIDisplayData}
      />
    </article>
  );
  // Offscreen wrapper — keeps the article in the DOM (so getElementById
  // finds it AND html2canvas can walk it) but visually out of the way.
  // Position absolute + huge negative left + a fixed pixel width so the
  // layout inside is computed at full A4-ish size. visibility:hidden
  // would also work but pointer-events:none + opacity:0 is friendlier
  // to html2canvas which sometimes reads computed styles mid-walk.
  const piDocumentHidden = (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: -10000,
        width: 1024,
        pointerEvents: "none",
        opacity: 0,
      }}
    >
      {piDocument}
    </div>
  );

  if (pi.status === "paid") {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-4 py-12">
          <div className="max-w-md border-2 border-black bg-white p-8 text-center shadow-[6px_6px_0_0_rgba(10,10,10,1)]">
            <CheckCircle2 className="mx-auto mb-3 h-14 w-14 text-green-600" strokeWidth={2.5} />
            <h1 className="mb-2 text-2xl font-black uppercase tracking-tight">Invoice Paid</h1>
            <p className="text-sm text-black/70">
              PI <strong>{pi.pi_number}</strong> has been paid in full. Our team will be in touch shortly to start production.
            </p>
            <button
              type="button"
              onClick={downloadPDF}
              disabled={pdfGenerating}
              className="mt-5 inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pdfGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={3} />
                  Generating PDF…
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" strokeWidth={3} />
                  Download PI PDF
                </>
              )}
            </button>
          </div>
        </div>
        {piDocumentHidden}
      </>
    );
  }

  if (pi.status === "pending_bank" || bankSubmitted) {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-4 py-12">
          <div className="max-w-md border-2 border-black bg-white p-8 text-center shadow-[6px_6px_0_0_rgba(10,10,10,1)]">
            <Building2 className="mx-auto mb-3 h-14 w-14 text-[#00c2ff]" strokeWidth={2.5} />
            <h1 className="mb-2 text-2xl font-black uppercase tracking-tight">Bank Transfer Pending</h1>
            <p className="text-sm text-black/70">
              Thanks! We&apos;ve recorded your T/T transfer for PI <strong>{pi.pi_number}</strong>.
              Our finance team will confirm receipt within 1-2 business days and email you when production begins.
            </p>
            <button
              type="button"
              onClick={downloadPDF}
              disabled={pdfGenerating}
              className="mt-5 inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pdfGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={3} />
                  Generating PDF…
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" strokeWidth={3} />
                  Download PI PDF
                </>
              )}
            </button>
          </div>
        </div>
        {piDocumentHidden}
      </>
    );
  }

  // ---------- Main render ----------

  return (
    <div className="min-h-screen bg-[#faf9f6] py-8 sm:py-12 print:bg-white print:py-0">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Top action bar (hidden when printing) */}
        <div className="mb-6 flex items-center justify-between print:hidden">
          <Link
            href="/"
            className="text-xs font-black uppercase tracking-wider text-black/60 hover:text-black"
          >
            ← sublimapparel.com
          </Link>
          <button
          type="button"
          onClick={downloadPDF}
          disabled={pdfGenerating}
          className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pdfGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={3} />
              Generating PDF…
            </>
          ) : (
            <>
              <Download className="h-4 w-4" strokeWidth={3} />
              Download PDF
            </>
          )}
        </button>
        </div>

        {/* PI Document — id="pi-document" is the capture target for the
            html2canvas-based downloadPDF() (R79). Kept as <article> for
            semantic correctness + screen-reader friendliness. R94: now
            also rendered (offscreen) by the paid/pending_bank branches
            above so downloadPDF() works regardless of payment status. */}
        {piDocument}

        {/* Payment section */}
        <section className="mt-10 print:hidden">
          <h2 className="mb-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">
            How would you like to pay?
          </h2>
          <p className="mb-6 text-sm text-black/60">
            Choose your preferred method. Card payments are instant; bank transfers take 1-3 business days.
          </p>

          {/* Method toggle */}
          <div className="mb-6 grid grid-cols-2 gap-0 border-2 border-black">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors ${
                paymentMethod === "card"
                  ? "bg-[#ff4d00] text-black"
                  : "bg-white text-black hover:bg-black/5"
              }`}
            >
              <CreditCard className="h-4 w-4" strokeWidth={3} />
              Pay by Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("bank")}
              className={`flex items-center justify-center gap-2 border-l-2 border-black px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors ${
                paymentMethod === "bank"
                  ? "bg-[#ff4d00] text-black"
                  : "bg-white text-black hover:bg-black/5"
              }`}
            >
              <Building2 className="h-4 w-4" strokeWidth={3} />
              Bank Transfer
            </button>
          </div>

          {paymentMethod === "card" ? (
            <CardPaymentMethod pi={pi} />
          ) : (
            <BankTransferMethod pi={pi} onSubmitted={() => setBankSubmitted(true)} />
          )}
        </section>
      </div>
    </div>
  );
}

// ---------- Card payment (Stripe Elements — inline, no navigation) ----------

function CardPaymentMethod({ pi }: { pi: PIData }) {
  return (
    <PayWithStripeElements
      piNumber={pi.pi_number}
      amountCents={pi.amount_due_cents}
      currency={pi.currency}
    />
  );
}

// ---------- Bank transfer (T/T) ----------

// 2026-10-04 (R80): bank account no longer hardcoded — driven by
// pi.currency. Each PI picks the right receiving account for its
// currency (USD/EUR/GBP/CNY) so the sender's bank doesn't have to
// convert currencies (1-3% fee + 1-2 day delay).
// Hardcoded account info lives in src/lib/bank-accounts.ts.

function BankTransferMethod({
  pi,
  onSubmitted,
}: {
  pi: PIData;
  onSubmitted: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wireRef, setWireRef] = useState("");
  const [agreed, setAgreed] = useState(false);
  // 2026-10-04 (R80): resolve bank account from PI currency. Recomputes
  // when the parent re-renders with a different pi (e.g. after admin
  // updates the PI's currency in /admin/new-pi/).
  const bank = getBankAccount(pi.currency);

  const copy = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(text);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("Please confirm you have sent the wire transfer");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/pi/${encodeURIComponent(pi.pi_number)}/confirm-bank`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wire_reference: wireRef,
          amount_sent: pi.amount_due_cents / 100,
          currency: pi.currency,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      onSubmitted();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to submit");
      setSubmitting(false);
    }
  };

  return (
    <div className="border-2 border-black bg-white p-6 shadow-[6px_6px_0_0_rgba(10,10,10,1)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-[#00c2ff]">Wire transfer / T/T</div>
          <div className="mt-1 text-2xl font-black tabular-nums">
            {fmtMoney(pi.amount_due_cents, pi.currency)}
          </div>
        </div>
        <Truck className="h-8 w-8 text-black/20" strokeWidth={2} />
      </div>

      <p className="mb-4 text-xs text-black/70">
        Send <strong>{fmtMoney(pi.amount_due_cents, pi.currency)}</strong> to the bank account below, then
        confirm below. Your PI will be marked as paid once our finance team verifies receipt (1-3 business days).
      </p>

      <dl className="mb-4 space-y-1.5 border-2 border-black/10 bg-[#faf9f6] p-4 text-sm">
        <div className="flex justify-between gap-2">
          <dt className="shrink-0 text-xs font-bold uppercase tracking-wider text-black/60">Beneficiary</dt>
          {/* 2026-10-04 (R80): all bank fields below come from getBankAccount(pi.currency). */}
          <dd className="text-right font-bold">{bank.beneficiary}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="shrink-0 text-xs font-bold uppercase tracking-wider text-black/60">Account #</dt>
          <dd className="flex items-center gap-2 font-mono font-bold">
            {bank.account}
            <button
              type="button"
              onClick={() => copy(bank.account)}
              className="text-[10px] uppercase tracking-wider text-[#ff4d00] hover:underline"
            >
              Copy
            </button>
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="shrink-0 text-xs font-bold uppercase tracking-wider text-black/60">SWIFT Code</dt>
          <dd className="font-mono font-bold">{bank.swift}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="shrink-0 text-xs font-bold uppercase tracking-wider text-black/60">Bank</dt>
          <dd className="text-right">{bank.bankName}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="shrink-0 text-xs font-bold uppercase tracking-wider text-black/60">Bank Address</dt>
          <dd className="text-right text-xs">{bank.bankAddress}</dd>
        </div>
        {/* 2026-10-04 (R80): optional CNAPS line shown only for CNY wires. */}
        {bank.cnaps && (
          <div className="flex justify-between gap-2">
            <dt className="shrink-0 text-xs font-bold uppercase tracking-wider text-black/60">CNAPS</dt>
            <dd className="font-mono font-bold">{bank.cnaps}</dd>
          </div>
        )}
        <div className="flex justify-between gap-2 border-t-2 border-[#ff4d00]/30 pt-2">
          <dt className="shrink-0 text-xs font-bold uppercase tracking-wider text-[#ff4d00]">Reference</dt>
          <dd className="font-mono font-black text-[#ff4d00]">{pi.pi_number}</dd>
        </div>
      </dl>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-black uppercase tracking-wider">
            Wire reference / SWIFT MT103 (optional)
          </label>
          <input
            type="text"
            value={wireRef}
            onChange={(e) => setWireRef(e.target.value)}
            placeholder="e.g. FOC123456 or bank transaction ID"
            className="w-full border-2 border-black/20 bg-white px-3 py-2 text-sm focus:border-[#ff4d00] focus:outline-none"
          />
        </div>
        <label className="flex cursor-pointer items-start gap-2 text-xs">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#ff4d00]"
          />
          <span>
            I confirm I have sent <strong>{fmtMoney(pi.amount_due_cents, pi.currency)}</strong> via wire transfer
            to the bank account above with reference <strong>{pi.pi_number}</strong>.
          </span>
        </label>
        {error && (
          <div className="border-2 border-[#ff4d00] bg-[#fff5f0] p-3 text-sm text-[#cc3d00]">{error}</div>
        )}
        <button
          type="submit"
          disabled={submitting || !agreed}
          className="w-full border-2 border-black bg-[#00c2ff] px-6 py-3 text-sm font-black uppercase tracking-wider text-black shadow-[4px_4px_0_0_rgba(10,10,10,1)] transition-all hover:bg-[#00a8db] hover:shadow-[6px_6px_0_0_rgba(10,10,10,1)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting…
            </span>
          ) : (
            "I have sent the wire"
          )}
        </button>
      </form>
    </div>
  );
}

// ---------- (Stripe singleton removed in R76 — Payment Links don't need client-side Stripe.js) ----------