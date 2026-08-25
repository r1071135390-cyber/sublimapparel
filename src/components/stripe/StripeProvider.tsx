"use client";

import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useMemo } from "react";

/**
 * Stripe Elements provider wrapper.
 *
 * Read publishable key from NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (build-time env).
 * If the env var is missing (e.g. before user adds it in Cloudflare Pages),
 * we render a soft warning instead of crashing the page.
 */
export function StripeProvider({
  children,
  amountCents,
  customerEmail,
}: {
  children: React.ReactNode;
  amountCents?: number;
  customerEmail?: string;
}) {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  const stripePromise = useMemo<Promise<Stripe | null> | null>(() => {
    if (!publishableKey) return null;
    return loadStripe(publishableKey);
  }, [publishableKey]);

  if (!publishableKey) {
    return (
      <div className="border-2 border-dashed border-[#ff4d00] bg-[#fff5e6] p-4 text-sm text-[#0a0a0a]">
        <strong>Stripe is not configured.</strong> Add{" "}
        <code className="rounded bg-white px-1">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>{" "}
        to your Cloudflare Pages environment variables, then redeploy.
      </div>
    );
  }

  if (!stripePromise) return null;

  if (amountCents !== undefined) {
    // amount is in the options below
  }
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: amountCents ?? 0,
        currency: "usd",
        appearance: {
          theme: "flat",
          variables: {
            colorPrimary: "#ff4d00",
            colorBackground: "#ffffff",
            colorText: "#0a0a0a",
            colorDanger: "#dc2626",
            fontFamily: "Inter, system-ui, sans-serif",
            borderRadius: "4px",
            spacingUnit: "4px",
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}
