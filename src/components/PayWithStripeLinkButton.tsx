"use client";

/**
 * Pay-with-Stripe-Link button.
 *
 * R76: Posts to /api/pi/stripe-payment-link (Cloudflare Pages Function)
 * which creates a Stripe Payment Link on demand, stores it back on the PI
 * row, and returns the hosted checkout URL. Clicking the button opens
 * that URL in a new tab so the customer never leaves the Stripe domain.
 *
 * If the PI already has a stored payment link, the same endpoint returns
 * it idempotently — no duplicate links.
 */

import { useState } from "react";
import { Loader2, ExternalLink, AlertCircle, CreditCard } from "lucide-react";

const fmtMoney = (cents: number, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(cents / 100);

interface PayWithStripeLinkButtonProps {
  piNumber: string;
  amountCents: number;
  currency: string;
}

export function PayWithStripeLinkButton({
  piNumber,
  amountCents,
  currency,
}: PayWithStripeLinkButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/pi/stripe-payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ piNumber }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        paymentLinkUrl?: string;
        error?: string;
      };
      if (!res.ok || !data.paymentLinkUrl) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setPaymentUrl(data.paymentLinkUrl);
      // Open Stripe-hosted checkout in a new tab. Using window.open so the
      // customer's browser context is preserved if they want to come back
      // and download the PI PDF.
      window.open(data.paymentLinkUrl, "_blank", "noopener,noreferrer");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create payment link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-2 border-black bg-white p-6 shadow-[6px_6px_0_0_rgba(10,10,10,1)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-[#ff4d00]">
            Pay with card
          </div>
          <div className="mt-1 text-2xl font-black tabular-nums">
            {fmtMoney(amountCents, currency)}
          </div>
        </div>
        <div className="text-right text-xs text-black/70">
          <div>Secured by Stripe</div>
          <div className="mt-1 inline-flex items-center gap-1">
            <CreditCard className="h-3 w-3" /> SSL encrypted
          </div>
        </div>
      </div>

      <p className="mb-4 text-xs text-black/70">
        Click below to open a secure Stripe-hosted payment page. You can pay
        with any major credit or debit card. After payment, this page will
        automatically update.
      </p>

      {error && (
        <div className="mb-4 flex items-start gap-2 border-2 border-[#ff4d00] bg-[#fff5f0] p-3 text-sm text-[#cc3d00]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.5} />
          <span>{error}</span>
        </div>
      )}

      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="w-full border-2 border-black bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wider text-black shadow-[4px_4px_0_0_rgba(10,10,10,1)] transition-all hover:bg-[#cc3d00] hover:shadow-[6px_6px_0_0_rgba(10,10,10,1)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Preparing…
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            Pay {fmtMoney(amountCents, currency)}
            <ExternalLink className="h-4 w-4" strokeWidth={3} />
          </span>
        )}
      </button>

      {paymentUrl && !loading && (
        <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-black/70">
          Stripe checkout:{" "}
          <a
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[#ff4d00] underline"
          >
            open again
          </a>
        </p>
      )}

      <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-black/70">
        By paying, you confirm acceptance of PI {piNumber} terms
      </p>
    </div>
  );
}