// src/lib/fx-rates.ts
// Foreign-exchange rate table for the PI Summary overview.
//
// Scope: small, manually-maintained FX table used ONLY for the internal
// admin overview at /admin/summary/. It is NOT used for:
//   - Stripe payment amounts (Stripe is the source of truth there)
//   - The customer-facing PI document (the page already shows the actual
//     currency used, no conversion needed)
//   - Financial reporting (the page explicitly notes "not for financial
//     reporting" in its footnote)
//
// Why hardcoded instead of a live API?
//   The summary is internal-only and runs at admin-level. A 5-10%
//     intra-day FX drift does not change any business decision the page
//     supports (which PIs exist, total invoiced value at-a-glance, month-
//     over-month comparison). The trade-off favours zero external
//     dependencies, zero failure modes, and zero added latency. The
//     "asOf" date in the footer is the contract with the admin: when
//     that gets stale, refresh the numbers below.
//
// If you want live rates later, replace FX_RATES with a fetcher and add
// a cache. Keep the FxRates shape so the call sites don't change.

// ─── Types ────────────────────────────────────────────────────────────

export interface FxRates {
  /** The "1 unit of baseCurrency equals..." reference. Always "USD". */
  baseCurrency: "USD";
  /** Map: ISO currency code (uppercase) -> number of foreign units per 1 USD. */
  rates: Record<string, number>;
  /** YYYY-MM-DD when the rates were last reviewed. Shown in the UI. */
  asOf: string;
  /** Provenance marker. Currently always "manual"; will be "live" if we wire an API. */
  source: "manual" | "live";
}

// ─── The table ────────────────────────────────────────────────────────

/**
 * FX rates, expressed as "1 USD = N foreign". Examples:
 *   - rates.EUR = 0.92   →  $1 = €0.92   →   €100 = $100/0.92 ≈ $108.70
 *   - rates.GBP = 0.78   →  $1 = £0.78
 *   - rates.CNY = 7.15   →  $1 = ¥7.15
 *
 * To refresh: pick a stable reference (e.g. open.er-api.com snapshot,
 * or X-Rates.com daily table), update the four numbers + `asOf`, commit,
 * deploy. The UI auto-displays the new date.
 *
 * Last reviewed: 2026-10-04. Currencies here mirror SUPPORTED_CURRENCIES
 * in src/lib/bank-accounts.ts — keep the two in lockstep.
 */
export const FX_RATES: FxRates = {
  baseCurrency: "USD",
  rates: {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.78,
    CNY: 7.15,
  },
  asOf: "2026-10-04",
  source: "manual",
};

// ─── Helpers ──────────────────────────────────────────────────────────

/**
 * Convert an amount in cents of a foreign currency to USD cents.
 *
 * @param amountCents  e.g. 10000 (= €100.00 at 2 decimal places)
 * @param currency     ISO code, case-insensitive. Unknown codes fall back
 *                     to a 1:1 rate so we never silently swallow money.
 * @param rates        FX table to use.
 * @returns            amount in USD cents, rounded to the nearest cent.
 */
export function toUsdCents(
  amountCents: number,
  currency: string | null | undefined,
  rates: FxRates = FX_RATES,
): number {
  const code = (currency ?? "USD").toUpperCase();
  const rate = rates.rates[code];
  if (!rate || rate <= 0) {
    // Unknown / broken currency — treat as 1:1 so the page shows SOMETHING
    // rather than silently dropping the value from the USD total. The
    // per-row display already uses the raw currency, so admins can spot
    // and fix the bad row.
    return Math.round(amountCents);
  }
  return Math.round(amountCents / rate);
}

/**
 * Format a cents amount in a given currency's display convention.
 * Used by the server to ship ready-to-render strings alongside the raw
 * cents, so the client doesn't have to replicate the formatter.
 */
export function formatCentsInCurrency(
  amountCents: number | null,
  currency: string | null,
): string {
  if (amountCents == null) return "—";
  const code = (currency ?? "USD").toUpperCase();
  const dollars = amountCents / 100;
  return `${code} ${dollars.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Currencies we actually expect to see in proforma_invoices.currency.
 * Mirrors src/lib/bank-accounts.ts SUPPORTED_CURRENCIES.
 */
export const TRACKED_CURRENCIES: ReadonlyArray<string> = [
  "USD",
  "EUR",
  "GBP",
  "CNY",
];