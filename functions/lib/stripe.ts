/**
 * Server-side Stripe client.
 *
 * Used by Cloudflare Pages Functions (in functions/api/stripe/*).
 * Reads STRIPE_SECRET_KEY from process.env — set in Cloudflare Pages dashboard.
 *
 * NEVER import this file from client components — it would leak the secret key.
 */
import Stripe from "stripe";

let cachedClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (cachedClient) return cachedClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to Cloudflare Pages env vars (encrypted).",
    );
  }

  // Pin API version so behavior is stable across SDK upgrades.
  // 2025-09-30.clover is the current stable version (as of late 2025).
  cachedClient = new Stripe(secretKey, {
    apiVersion: "2025-09-30.clover" as Stripe.LatestApiVersion,
    typescript: true,
    appInfo: {
      name: "sublimapparel.com",
      version: "1.0.0",
    },
  });

  return cachedClient;
}

/**
 * Read the public key for use in PaymentIntent responses.
 * The frontend already has this from build-time, but exposing it
 * in the PaymentIntent response lets the client confirm without
 * a second config call.
 */
export function getStripePublishableKey(): string {
  const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!pk) {
    throw new Error(
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set. Add it to Cloudflare Pages env vars.",
    );
  }
  return pk;
}

/**
 * Payment scenarios — passed in metadata.scenario for unified tracking.
 * Use these constants instead of strings to avoid typos.
 */
export const PAYMENT_SCENARIOS = {
  /** Scenario A: $99 inquiry deposit (skip the queue) */
  INQUIRY_DEPOSIT: "inquiry_deposit",
  /** Scenario B: $50 sample fee */
  SAMPLE_FEE: "sample_fee",
  /** Scenario C: 30% deposit on bulk order */
  BULK_DEPOSIT: "bulk_deposit",
  /** Scenario D: Small order direct purchase (Stripe Checkout) */
  SHOP_ORDER: "shop_order",
} as const;

export type PaymentScenario =
  (typeof PAYMENT_SCENARIOS)[keyof typeof PAYMENT_SCENARIOS];

/**
 * Pricing in USD cents for fixed-price scenarios.
 * Variable scenarios (bulk_deposit, shop_order) are computed at call time.
 */
export const FIXED_PRICES_USD_CENTS = {
  [PAYMENT_SCENARIOS.INQUIRY_DEPOSIT]: 9900, // $99.00
  [PAYMENT_SCENARIOS.SAMPLE_FEE]: 5000, // $50.00
} as const;
