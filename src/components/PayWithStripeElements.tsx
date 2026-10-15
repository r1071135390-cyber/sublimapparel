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
 *
 * 2026-10-15 (R120): decline-friendly UX.
 *   - When confirmPayment() rejects (e.g. card declined with
 *     decline_code=do_not_honor), show a Chinese sentence tailored to
 *     the specific decline code instead of Stripe's raw error.message.
 *   - Surface two actions after a failure:
 *       1. Retry payment — re-calls confirmPayment on the SAME clientSecret
 *          (Stripe allows this without re-minting). No page reload needed.
 *       2. Switch to bank transfer (T/T) — handed up via callback so the
 *          parent PayClient can flip its paymentMethod toggle.
 *   - Previously the customer was stranded on a red banner with a single
 *     submit button; now they can either retry or fall back without ever
 *     leaving the /pay/ page.
 */

import { useEffect, useMemo, useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader2, AlertCircle, CreditCard, Lock, RefreshCw, Building2 } from "lucide-react";
import { getStripeJs } from "@/lib/stripe-client";
import { formatDeclineMessage, pickDeclineCode, getDeclineInfo } from "@/lib/decline-codes";

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
  // 2026-10-15 (R120): optional callback fired when the user clicks the
  // "Switch to bank transfer" CTA after a decline. When omitted, that CTA
  // is not rendered (e.g. on the test harness where the toggle isn't
  // available). The parent owns the `card | bank` toggle state.
  onSwitchToBank?: () => void;
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
  onSwitchToBank,
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
        if (!cancelled) return;
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
        {onSwitchToBank && (
          <button
            type="button"
            onClick={onSwitchToBank}
            className="mt-3 inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white"
          >
            <Building2 className="h-4 w-4" strokeWidth={3} />
            Switch to bank transfer
          </button>
        )}
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
        onSwitchToBank={onSwitchToBank}
      />
    </Elements>
  );
}

// ── Inner form (mounted inside <Elements>) ──────────────

interface InnerFormProps {
  piNumber: string;
  amountCents: number;
  currency: string;
  onSwitchToBank?: () => void;
}

interface DeclineState {
  message: string;
  code: string | null;
  retryable: boolean;
}

function InnerForm({ piNumber, amountCents, currency, onSwitchToBank }: InnerFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // 2026-10-15 (R120): richer decline state — kept alongside submitError
  // so we can render a tailored retryable / switch-to-bank CTA.
  const [decline, setDecline] = useState<DeclineState | null>(null);

  const ready = useMemo(
    () => Boolean(stripe && elements),
    [stripe, elements],
  );

  // Single submit path; the retry button calls this same handler with a
  // clearError flag so we wipe decline + submitError before retrying.
  const runSubmit = async (): Promise<void> => {
    if (!stripe || !elements) return;
    setSubmitting(true);
    setSubmitError(null);
    setDecline(null);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/pay/?pi=${encodeURIComponent(piNumber)}&payment=success`,
      },
    });
    if (error) {
      // 2026-10-15 (R120): pull decline_code / code off the typed error.
      // `code` carries machine codes (card_declined, validation_error),
      // `decline_code` carries issuer-rejected codes (do_not_honor,
      // insufficient_funds, ...). pickDeclineCode picks the most
      // specific one.
      const code = pickDeclineCode(error as unknown as {
        decline_code?: string | null;
        code?: string | null;
      });
      const info = getDeclineInfo(code);
      setSubmitError(error.message ?? info.message);
      setDecline({
        message: info.message,
        code,
        retryable: info.retryable,
      });
      setSubmitting(false);
    }
    // On success Stripe redirects to return_url; this line is only reached
    // if Stripe cannot redirect (e.g. cancellation on the confirm step).
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    void runSubmit();
  };

  const handleRetry = () => {
    void runSubmit();
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

      {decline && (
        <div className="mb-4 space-y-3 border-2 border-[#ff4d00] bg-[#fff5f0] p-3 text-sm text-[#cc3d00]">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.5} />
            <div className="flex-1">
              <div className="font-black">{decline.message}</div>
              {/* Submit-error is the raw Stripe.message fallback — only show
                  it when it differs from the friendly text, otherwise we
                  are duplicating the same sentence twice. */}
              {submitError && submitError !== decline.message && (
                <div className="mt-1 text-xs text-[#cc3d00]/80">{submitError}</div>
              )}
              {decline.code && (
                <div className="mt-1 text-[10px] uppercase tracking-wider text-[#cc3d00]/60">
                  Code: {decline.code}
                </div>
              )}
            </div>
          </div>
          {/* 2026-10-15 (R120): explicit retry CTA + switch-to-bank CTA.
              Both are always visible after a failure; the retry button
              simply re-invokes stripe.confirmPayment on the SAME
              clientSecret (Stripe permits this — no new PI minted). */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleRetry}
              disabled={!ready || submitting}
              className="inline-flex items-center justify-center gap-2 border-2 border-black bg-white px-3 py-2 text-xs font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw className="h-4 w-4" strokeWidth={3} />
              Retry payment
            </button>
            {onSwitchToBank && (
              <button
                type="button"
                onClick={onSwitchToBank}
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 border-2 border-[#00c2ff] bg-white px-3 py-2 text-xs font-black uppercase tracking-wider text-black transition-colors hover:bg-[#00c2ff] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Building2 className="h-4 w-4" strokeWidth={3} />
                Pay by bank transfer
              </button>
            )}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={!ready || submitting || !!decline}
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