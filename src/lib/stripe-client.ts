/**
 * Client-side Stripe helpers.
 * Reads NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY at build time (inlined by Next.js).
 *
 * For Cloudflare Pages: set this in the dashboard env vars before building.
 * For local dev: add to .env.local (gitignored).
 */
import { loadStripe, Stripe } from "@stripe/stripe-js";

let cachedPromise: Promise<Stripe | null> | null = null;

export function getStripeJs(): Promise<Stripe | null> {
  if (cachedPromise) return cachedPromise;

  const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!pk) {
    console.warn(
      "[stripe] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set. " +
        "Payments will not work. Set it in Cloudflare Pages env vars or .env.local.",
    );
    cachedPromise = Promise.resolve(null);
    return cachedPromise;
  }

  cachedPromise = loadStripe(pk);
  return cachedPromise;
}

/**
 * Format USD cents to display string, e.g. 1999 → "$19.99"
 */
export function formatUsd(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
