"use client";

/**
 * PayWithStripeElements — inline card payment on /pay/ (R91)
 *
 * Replaces PayWithStripeLinkButton (which opens Stripe in a new tab). The
 * customer requested paying inside the page without navigating away, so
 * we use Stripe Elements + PaymentElement:
 *
 *   1. POST /api/pi/stripe-payment-intent → { clientSecret, ... }
 *   2. Mount <Elements stripe={stripePromise} options={{ clientSecret }}>
 *   3. Mount <PaymentElement /> — Stripe renders the card form inline
 *   4. Submit → stripe.confirmPayment({ elements, confirmParams: { return_url } })
 *      — Stripe handles card validation, 3DS, and PI status updates
 *      — On success, redirects back to /quote/?id={PAYMENT_INTENT_ID}
 *
 * The webhook (/api/stripe/webhook) sees payment_intent.succeeded with
 * metadata.pi_id / metadata.site_slug and marks the PI as paid.
 */

import { useEffect, useMemo, useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader2, AlertCircle, CreditCard, Lock } from "lucide-react";
import { getStripeJs } from "@/lib/stripe-client";

const fmtMoney = (cents: number, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(cents / 100);

interface PayWithStripeElementsProps {
  piNumber: string;
  amountCents: number;
  currency: string;
}

interface IntentResponse {
  clientSecret?: string;
  paymentIntentId?: string;
  amount?: number;
  currency?: string;
  error?: string;
}

export function PayWithStripeElements({
  piNumber,
  amountCents,
  currency,
}: PayWithStripeElementsProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Step 1: ask the server for a client_secret for this PI.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/pi/stripe-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ piNumber }),
        });
        const data = (await res.json().catch(() => ({}))) as IntentResponse;
        if (cancelled) return;
        if (!res.ok || !data.clientSecret) {
          throw new Error(
            data.error || `Failed to initialize payment (HTTP ${res.status})`,
          );
        }
        setClientSecret(data.clientSecret);
      } catch (e) {
        if (cancelled) return;
        setLoadError(
          e instanceof Error ? e.message : "Failed to initialize payment",
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [piNumber]);

  if (loadError) {
    return (
      <div className="border-2 border-[#ff4d00] bg-[#fff5f0] p-4 text-sm text-[#cc3d00]">
        <div className="flex items-start gap-2">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.5} />
          <span>{loadError}</span>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="border-2 border-black bg-white p-6 shadow-[6px_6px_0_0_rgba(10,10,10,1)]">
        <div className="flex items-center justify-center gap-2 py-6 text-sm text-black/70">
          <Loader2 className="h-4 w-4 animate-spin" />
          Preparing secure payment…
        </div>
      </div>
    );
  }

  return (
    <Elements
      stripe={getStripeJs()}
      options={{
        clientSecret,
        appearance: {
          theme: "flat",
          variables: {
            colorPrimary: "#ff4d00",
            colorBackground: "#ffffff",
            colorText: "#0a0a0a",
            colorDanger: "#cc3d00",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            spacingUnit: "4px",
            borderRadius: "0px",
          },
        },
      }}
    >
      <InnerForm
        piNumber={piNumber}
        amountCents={amountCents}
        currency={currency}
      />
    </Elements>
  );
}

// ── Inner form (mounted inside <Elements>) ──────────────

interface InnerFormProps {
  piNumber: string;
  amountCents: number;
  currency: string;
}

function InnerForm({ piNumber, amountCents, currency }: InnerFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const ready = useMemo(
    () => Boolean(stripe && elements),
    [stripe, elements],
  );

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setSubmitError(null);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/pay/?pi=${encodeURIComponent(piNumber)}&payment=success`,
      },
    });
    // If we reach here (no redirect) the payment failed inline.
    if (error) {
      setSubmitError(error.message ?? "Payment failed");
      setSubmitting(false);
    }
    // On success Stripe redirects to return_url; this line is only reached
    // if Stripe cannot redirect (e.g. cancellation on the confirm step).
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-black bg-white p-6 shadow-[6px_6px_0_0_rgba(10,10,10,1)]"
    >
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
            <Lock className="h-3 w-3" /> Card details stay on Stripe
          </div>
        </div>
      </div>

      <p className="mb-4 text-xs text-black/70">
        Enter your card details below. Payment is processed on Stripe&apos;s
        servers; this site never sees or stores your card number.
      </p>

      <div className="mb-4 rounded-sm border border-black/30 bg-white p-3">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      {submitError && (
        <div className="mb-4 flex items-start gap-2 border-2 border-[#ff4d00] bg-[#fff5f0] p-3 text-sm text-[#cc3d00]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.5} />
          <span>{submitError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!ready || submitting}
        className="w-full border-2 border-black bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wider text-black shadow-[4px_4px_0_0_rgba(10,10,10,1)] transition-all hover:bg-[#cc3d00] hover:shadow-[6px_6px_0_0_rgba(10,10,10,1)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing…
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <CreditCard className="h-4 w-4" strokeWidth={3} />
            Pay {fmtMoney(amountCents, currency)}
          </span>
        )}
      </button>

      <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-black/70">
        By paying, you confirm acceptance of PI {piNumber} terms
      </p>
    </form>
  );
}