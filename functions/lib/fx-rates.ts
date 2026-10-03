// functions/lib/fx-rates.ts
// MIRROR of src/lib/fx-rates.ts — Cloudflare Pages Functions live in
// their own compile unit and can't reach into src/ directly, so we keep
// a copy here. Keep the two files in sync.
//
// Last reviewed: 2026-10-04. See src/lib/fx-rates.ts for the full
// rationale on why these are hardcoded instead of pulled from a live API.

export interface FxRates {
  baseCurrency: "USD";
  rates: Record<string, number>;
  asOf: string;
  source: "manual" | "live";
}

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

export function toUsdCents(
  amountCents: number,
  currency: string | null | undefined,
  rates: FxRates = FX_RATES,
): number {
  const code = (currency ?? "USD").toUpperCase();
  const rate = rates.rates[code];
  if (!rate || rate <= 0) return Math.round(amountCents);
  return Math.round(amountCents / rate);
}

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

export const TRACKED_CURRENCIES: ReadonlyArray<string> = [
  "USD",
  "EUR",
  "GBP",
  "CNY",
];