"use client";

/**
 * /pay/[pi_number]/PayClient.tsx
 *
 * Customer-facing PI view. Renders the PI in print-friendly format + two payment options:
 *   1. Card (Stripe Payment Element) — instant, recommended
 *   2. Bank Transfer (T/T) — for customers preferring wire transfer
 *
 * Data flow:
 *   1. On mount, fetch /api/pi/{pi_number} to get PI details + stripe client_secret
 *   2. Render PI in a print-styled layout (same look as the PDF your sales team sends)
 *   3. At bottom: two clear payment sections, default to card
 */

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { loadStripe, type Stripe as StripeJs } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import jsPDF from "jspdf";
import { PIDisplay, type PIDisplayData } from "@/components/pi/PIDisplay";
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

  // Stripe
  stripe_client_secret?: string;
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

  // PDF download — uses jsPDF on client
  const downloadPDF = useCallback(() => {
    if (!pi) return;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 40;
    let y = margin;

    // Header
    doc.setFontSize(18).setFont("helvetica", "bold");
    doc.text("PROFORMA INVOICE", margin, y);
    y += 8;
    doc.setFontSize(10).setFont("helvetica", "normal");
    doc.text(`PI Number: ${pi.pi_number}`, margin, (y += 18));
    doc.text(`Issue Date: ${fmtDate(pi.issue_date)}`, margin, (y += 14));
    if (pi.valid_until) doc.text(`Valid Until: ${fmtDate(pi.valid_until)}`, margin, (y += 14));
    y += 18;

    // From
    doc.setFontSize(11).setFont("helvetica", "bold");
    doc.text("FROM:", margin, y);
    doc.setFont("helvetica", "normal").setFontSize(9);
    doc.text("YIWU HOMEDORM COMMODITY MANUFACTURING CO., LTD", margin, y + 14);
    doc.text("2nd Floor, No.11 Anshang Road, Yiwu, China", margin, y + 26);
    doc.text("Contact: chris@sublimapparel.com / +86 19817930190", margin, y + 38);
    y += 60;

    // To
    doc.setFontSize(11).setFont("helvetica", "bold");
    doc.text("TO:", margin, y);
    doc.setFont("helvetica", "normal").setFontSize(9);
    doc.text(pi.customer_name, margin, y + 14);
    if (pi.customer_company) doc.text(pi.customer_company, margin, y + 26);
    if (pi.customer_address) {
      const lines = doc.splitTextToSize(pi.customer_address, 480);
      doc.text(lines, margin, y + 38);
      y += 14 * lines.length;
    }
    y += 60;

    // Items table
    doc.setFontSize(11).setFont("helvetica", "bold");
    doc.text("ITEMS", margin, y);
    y += 16;
    doc.setFontSize(9).setFont("helvetica", "bold");
    doc.text("Description", margin, y);
    doc.text("Qty", margin + 320, y, { align: "right" });
    doc.text("Unit", margin + 400, y, { align: "right" });
    doc.text("Total", margin + 510, y, { align: "right" });
    y += 4;
    doc.line(margin, y, 555, y);
    y += 12;

    doc.setFont("helvetica", "normal").setFontSize(9);
    for (const item of pi.items) {
      const descLines = doc.splitTextToSize(item.description, 300);
      doc.text(descLines, margin, y);
      doc.text(String(item.qty), margin + 320, y, { align: "right" });
      doc.text(fmtMoney(item.unit_price_cents, pi.currency), margin + 400, y, { align: "right" });
      doc.text(fmtMoney(item.total_cents, pi.currency), margin + 510, y, { align: "right" });
      y += Math.max(14, 12 * descLines.length);
      if (item.fabric) {
        doc.setFontSize(8).setTextColor(120);
        const fabricLines = doc.splitTextToSize(`Fabric: ${item.fabric}`, 300);
        doc.text(fabricLines, margin, y);
        y += 12 * fabricLines.length;
        doc.setFontSize(9).setTextColor(0);
      }
      if (Array.isArray(item.sizes) && item.sizes.length > 0) {
        const sizeText = item.sizes
          .map((s) => `${s.label}×${s.qty}`)
          .join("  ·  ");
        doc.setFontSize(8).setTextColor(180, 0, 0);
        const sizeLines = doc.splitTextToSize(`Sizes: ${sizeText}`, 480);
        doc.text(sizeLines, margin, y);
        y += 12 * sizeLines.length;
        doc.setFontSize(9).setTextColor(0);
      }
    }

    // Totals
    y += 12;
    doc.line(350, y, 555, y);
    y += 14;
    doc.text("Subtotal:", 400, y);
    doc.text(fmtMoney(pi.subtotal_cents, pi.currency), 555, y, { align: "right" });
    y += 14;
    doc.text("Shipping (DDP):", 400, y);
    doc.text(fmtMoney(pi.shipping_cents, pi.currency), 555, y, { align: "right" });
    y += 14;
    doc.setFont("helvetica", "bold").setFontSize(11);
    doc.text("TOTAL:", 400, y);
    doc.text(fmtMoney(pi.total_cents, pi.currency), 555, y, { align: "right" });
    y += 30;

    // Payment terms
    doc.setFontSize(9).setFont("helvetica", "normal");
    doc.text(`Payment Terms: ${pi.payment_terms}`, margin, y);
    y += 14;
    doc.text(`Lead Time: ${pi.lead_time_days} days`, margin, y);
    y += 14;
    doc.text(`Production Time: ${pi.production_time_days} days after payment + PP sample approval`, margin, y);

    // Footer
    y = 780;
    doc.setFontSize(8).setTextColor(120);
    doc.text(
      "This is a proforma invoice. Production begins after payment receipt and PP sample approval.",
      margin,
      y
    );

    doc.save(`${pi.pi_number}.pdf`);
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

  if (pi.status === "paid") {
    return (
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
            className="mt-5 inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white"
          >
            <Download className="h-4 w-4" strokeWidth={3} />
            Download PI PDF
          </button>
        </div>
      </div>
    );
  }

  if (pi.status === "pending_bank" || bankSubmitted) {
    return (
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
            className="mt-5 inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white"
          >
            <Download className="h-4 w-4" strokeWidth={3} />
            Download PI PDF
          </button>
        </div>
      </div>
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
            className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white"
          >
            <Download className="h-4 w-4" strokeWidth={3} />
            Download PDF
          </button>
        </div>

        {/* PI Document */}
        <article className="border-2 border-black bg-white p-6 shadow-[6px_6px_0_0_rgba(10,10,10,1)] sm:p-10 print:border-0 print:shadow-none">

          <PIDisplay
            pi={{
              pi_number: pi.pi_number,
              issue_date: pi.issue_date,
              valid_until: pi.valid_until,
              lead_time_text: pi.lead_time_text,
              payment_terms_text: pi.payment_terms_text,
              customer_name: pi.customer_name,
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

// ---------- Card payment (Stripe Payment Element) ----------

function CardPaymentMethod({ pi }: { pi: PIData }) {
  if (!pi.stripe_client_secret) {
    return (
      <div className="border-2 border-black bg-white p-6">
        <div className="flex items-center gap-2 text-sm font-bold text-black/70">
          <Loader2 className="h-4 w-4 animate-spin" />
          Initializing secure payment…
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-black bg-white p-6 shadow-[6px_6px_0_0_rgba(10,10,10,1)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-[#ff4d00]">Pay with card</div>
          <div className="mt-1 text-2xl font-black tabular-nums">
            {fmtMoney(pi.amount_due_cents, pi.currency)}
          </div>
        </div>
        <div className="text-right text-xs text-black/70">
          <div>Secured by Stripe</div>
          <div className="mt-1 inline-flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> SSL encrypted
          </div>
        </div>
      </div>

      <Elements
        stripe={getStripe()}
        options={{
          clientSecret: pi.stripe_client_secret,
          appearance: {
            theme: "flat",
            variables: {
              colorPrimary: "#ff4d00",
              colorBackground: "#ffffff",
              colorText: "#0a0a0a",
              fontFamily: "Inter, system-ui, sans-serif",
              borderRadius: "0px",
            },
          },
        }}
      >
        <CardPaymentForm pi={pi} />
      </Elements>
    </div>
  );
}

function CardPaymentForm({ pi }: { pi: PIData }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order/success/?scenario=pi_payment&pi_number=${encodeURIComponent(pi.pi_number)}`,
      },
    });

    if (stripeError) {
      setError(stripeError.message ?? "Payment failed");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={{ layout: "tabs" }} />
      {error && (
        <div className="border-2 border-[#ff4d00] bg-[#fff5f0] p-3 text-sm text-[#cc3d00]">{error}</div>
      )}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full border-2 border-black bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wider text-black shadow-[4px_4px_0_0_rgba(10,10,10,1)] transition-all hover:bg-[#cc3d00] hover:shadow-[6px_6px_0_0_rgba(10,10,10,1)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing…
          </span>
        ) : (
          `Pay ${fmtMoney(pi.amount_due_cents, pi.currency)}`
        )}
      </button>
      <p className="text-center text-[10px] uppercase tracking-wider text-black/70">
        By paying, you confirm acceptance of PI {pi.pi_number} terms
      </p>
    </form>
  );
}

// ---------- Bank transfer (T/T) ----------

const BANK_INFO = {
  beneficiary: "YIWU HOMEDORM COMMODITY MANUFACTURING CO., LTD",
  account: "19648014040108531",
  swift: "ABOCCNBJ110",
  bankName: "Agricultural Bank of China",
  bankAddress: "No. 181 Binwang Road, Yiwu City, Jinhua, Zhejiang, China",
};

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
          <dd className="text-right font-bold">{BANK_INFO.beneficiary}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="shrink-0 text-xs font-bold uppercase tracking-wider text-black/60">Account #</dt>
          <dd className="flex items-center gap-2 font-mono font-bold">
            {BANK_INFO.account}
            <button
              type="button"
              onClick={() => copy(BANK_INFO.account)}
              className="text-[10px] uppercase tracking-wider text-[#ff4d00] hover:underline"
            >
              Copy
            </button>
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="shrink-0 text-xs font-bold uppercase tracking-wider text-black/60">SWIFT Code</dt>
          <dd className="font-mono font-bold">{BANK_INFO.swift}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="shrink-0 text-xs font-bold uppercase tracking-wider text-black/60">Bank</dt>
          <dd className="text-right">{BANK_INFO.bankName}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="shrink-0 text-xs font-bold uppercase tracking-wider text-black/60">Bank Address</dt>
          <dd className="text-right text-xs">{BANK_INFO.bankAddress}</dd>
        </div>
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

// ---------- Stripe singleton ----------

let stripePromise: Promise<StripeJs | null> | null = null;
function getStripe(): Promise<StripeJs | null> {
  if (stripePromise) return stripePromise;
  const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!pk) {
    console.error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
    return Promise.resolve(null);
  }
  stripePromise = loadStripe(pk);
  return stripePromise;
}
