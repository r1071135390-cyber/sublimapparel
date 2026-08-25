"use client";

import { useState, useTransition } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

interface SamplePaymentFormProps {
  amountCents: number;
  amountDisplay: string;
  customerName: string;
  customerEmail: string;
  customerCompany?: string;
  shippingAddress?: string;
  productType: string;
  designNotes?: string;
  onSuccess: (paymentIntentId: string) => void;
}

export function SamplePaymentForm(props: SamplePaymentFormProps) {
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
          scenario: "sample_fee",
          customer_email: props.customerEmail,
          customer_name: props.customerName,
          customer_company: props.customerCompany,
          metadata: {
            product_type: props.productType,
            design_notes: props.designNotes || "",
            shipping_address: props.shippingAddress || "",
          },
        }),
      });

      const createData = await createRes.json();
      if (!createData.ok) {
        setError(createData.error || "Failed to initialize payment");
        return;
      }

      // 2. Confirm payment with Payment Element
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret: createData.clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/order/success/?scenario=sample_fee&piid=${createData.paymentIntentId}`,
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
        className="w-full bg-[#ff4d00] px-6 py-3 text-base font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#cc3d00] disabled:opacity-50"
      >
        {isPending ? "Processing..." : `Pay ${props.amountDisplay}`}
      </button>
      <p className="text-xs text-[#6b6b6b]">
        Sample fee is non-refundable. After payment, our team will contact you
        within 1 business day to confirm specs and provide a shipping quote.
      </p>
    </form>
  );
}
