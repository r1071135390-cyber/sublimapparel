"use client";

import { useState, useTransition, useMemo, useEffect } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

interface BulkDepositFormProps {
  amountCents: number;
  amountDisplay: string;
  customerName: string;
  customerEmail: string;
  customerCompany?: string;
  quoteId: string;
  totalAmountCents: number;
  onSuccess: (paymentIntentId: string) => void;
}

export function BulkDepositForm(props: BulkDepositFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setError(null);
    startTransition(async () => {
      // 1. Create payment intent on backend
      const createRes = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: "bulk_deposit",
          amount_cents: props.amountCents,
          customer_email: props.customerEmail,
          customer_name: props.customerName,
          customer_company: props.customerCompany,
          quote_id: props.quoteId,
          metadata: {
            total_amount_cents: String(props.totalAmountCents),
            deposit_amount_cents: String(props.amountCents),
            deposit_percent: "30",
          },
        }),
      });

      const createData = (await createRes.json()) as { ok: boolean; error?: string; clientSecret?: string; paymentIntentId?: string };
      if (!createData.ok) {
        setError(createData.error || "Failed to initialize payment");
        return;
      }

      // 2. Confirm payment with Payment Element
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret: createData.clientSecret!,
        confirmParams: {
          return_url: `${window.location.origin}/order/success/?scenario=bulk_deposit&piid=${createData.paymentIntentId!}&quote_id=${encodeURIComponent(props.quoteId)}`,
        },
        redirect: "if_required",
      });

      if (stripeError) {
        setError(stripeError.message || "Payment failed");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        props.onSuccess(paymentIntent.id);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && (
        <div className="border-2 border-[#dc2626] bg-red-50 p-3 text-sm text-[#dc2626]">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || isPending}
        className="w-full bg-[#ff4d00] px-6 py-3 text-base font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#cc3d00] disabled:opacity-50"
      >
        {isPending
          ? "Processing..."
          : `Pay 30% deposit (${props.amountDisplay})`}
      </button>
      <p className="text-xs text-[#6b6b6b]">
        The remaining 70% is due before shipment (after photos and QC).
        Production starts within 24 hours of deposit.
      </p>
    </form>
  );
}
