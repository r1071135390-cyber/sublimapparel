/**
 * Bank account types + currency metadata (CLIENT-SAFE).
 *
 * 2026-10-29 (R128): this module used to hold the factory's real receiving
 * accounts — account number, SWIFT/BIC, CNAPS code. That made it a secret
 * in the wrong place: every "use client" component that imported it
 * (PIDisplay, PayClient, NewPIClient, EditPIClient, BankAccountsClient)
 * pulled those literals into the public static JS bundle. Under
 * `output: "export"` the chunk lands at /_next/static/chunks/*.js and can be
 * downloaded by anyone — including from the *.pages.dev deployment
 * hostname, which sits outside the zone and therefore outside the
 * Cloudflare Access policy that guards the custom domain.
 *
 * The real accounts now live ONLY in the Supabase bank_accounts table. The
 * server resolves the row and ships it to the browser inside the PI
 * payload (see functions/api/pi/[[pi_number]].ts), so the client never
 * needs its own copy. There is no server-side fallback map either — a
 * missing row means the details are unknown, not that we should guess.
 *
 * What stays here:
 *   - the BankAccount / BankAccountRow shapes
 *   - SUPPORTED_CURRENCIES (needed by the admin <select>)
 *   - bankAccountFromRow (a pure snake_case -> camelCase converter)
 *
 * What is gone:
 *   - BANK_ACCOUNTS (the hardcoded real-account map)
 *   - getBankAccount (it would have had to return real data)
 *
 * If you need a real account, read it from bank_accounts through the
 * admin API — never from a module constant.
 */

export interface BankAccount {
  /** ISO 4217 currency code in lowercase (matches proforma_invoices.currency) */
  currency: string;
  /** Display label for the admin <select>, e.g. "USD — US Dollar" */
  label: string;
  /** Currency symbol shown next to numbers in the PI (USD→$, EUR→€, etc.) */
  symbol: string;
  /** Beneficiary name as it appears on the wire — MUST match the
   *  corporate registration on the receiving bank's records. */
  beneficiary: string;
  /** Beneficiary's registered company address (matches incorporation docs). */
  companyAddress: string;
  /** Receiving bank's full name (matches SWIFT directory). */
  bankName: string;
  /** Full bank account number / IBAN — NEVER log this. */
  account: string;
  /** SWIFT / BIC code for international wires. */
  swift: string;
  /** Receiving bank's postal address (needed by some originating banks). */
  bankAddress: string;
  /** Optional IBAN field for EUR accounts (some EU corridors require it). */
  iban?: string;
  /** Optional bank country code (ISO-3166-1 alpha-2) — matches reference Excel layout. */
  bankCountry?: string;
  /** Routing number (US only; for USD wires via Fed/ACH). */
  routingNumber?: string;
  /** CNAPS / China-specific code (CNY only; required for CNY domestic wires). */
  cnaps?: string;
  /** Intermediary bank (optional; some currency corridors need one). */
  intermediaryBank?: string;
  /** Notes shown to admin / customer (e.g. "Add reference: PI number"). */
  notes?: string;
}

export const SUPPORTED_CURRENCIES = ["usd", "eur", "gbp", "cny"] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

/**
 * Static labels for the admin currency picker. These are display strings
 * only — no account data.
 */
export const CURRENCY_LABELS: Record<SupportedCurrency, string> = {
  usd: "USD — US Dollar",
  eur: "EUR — Euro",
  gbp: "GBP — British Pound",
  cny: "CNY — Chinese Yuan (RMB)",
};

/**
 * Currency symbols for price rendering. Pure display data — not secret.
 */
export const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  usd: "$",
  eur: "€",
  gbp: "£",
  cny: "¥",
};

/**
 * Pretty label for the admin <select> option, e.g. "USD — US Dollar".
 */
export function formatCurrencyOption(currency: SupportedCurrency): string {
  return CURRENCY_LABELS[currency] ?? currency.toUpperCase();
}

// ─────────────────────────────────────────────────────────────────────────
// R103: dynamic loading from Supabase bank_accounts table
// ─────────────────────────────────────────────────────────────────────────

/**
 * Shape of a row as stored in Supabase (snake_case). Used by the
 * Cloudflare function /api/admin/bank-accounts and the /api/pi/{n}
 * GET handler, which forward the row as-is to the browser.
 */
export interface BankAccountRow {
  id: number;
  site_slug: string;
  currency: string;
  label: string;
  symbol: string;
  beneficiary: string;
  company_address: string;
  bank_name: string;
  account: string;
  swift: string;
  bank_address: string;
  iban: string | null;
  bank_country: string | null;
  routing_number: string | null;
  cnaps: string | null;
  intermediary_bank: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Convert a Supabase bank_accounts row (snake_case) into the
 * BankAccount shape the rest of the app uses (camelCase).
 *
 * R128: there is no hardcoded fallback any more. When the row is missing
 * the caller has no bank details to show — that is the honest outcome,
 * and it is better than inventing an account number that may be wrong.
 */
export function bankAccountFromRow(
  row: BankAccountRow | null | undefined,
  currency: string,
): BankAccount | null {
  if (!row) return null;
  return {
    currency: row.currency || currency.toLowerCase(),
    label: row.label,
    symbol: row.symbol,
    beneficiary: row.beneficiary,
    companyAddress: row.company_address,
    bankName: row.bank_name,
    account: row.account,
    swift: row.swift,
    bankAddress: row.bank_address,
    iban: row.iban ?? undefined,
    bankCountry: row.bank_country ?? undefined,
    routingNumber: row.routing_number ?? undefined,
    cnaps: row.cnaps ?? undefined,
    intermediaryBank: row.intermediary_bank ?? undefined,
    notes: row.notes ?? undefined,
  };
}
