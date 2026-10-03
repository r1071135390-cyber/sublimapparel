/**
 * Bank account mapping by currency.
 *
 * Each PI's bank block in PIDisplay + admin preview picks a bank account
 * based on `proforma_invoices.currency`. Customers paying by T/T wire
 * transfer need the correct account for the currency they're sending —
 * wiring USD to a CNY-denominated account triggers a conversion fee.
 *
 * Why hardcoded instead of DB-driven:
 *   - Bank details are SECRET data we cannot risk leaking through a public
 *     Supabase SELECT. Hardcoding in a private TypeScript module keeps
 *     them in the protected server bundle (CF Pages worker) without
 *     exposing via anon-key queries.
 *   - The factory has 4 stable corporate accounts (one per currency);
 *     they almost never change. Code-as-config is the right size.
 *   - If we ever need to add / change accounts, this is one PR + redeploy.
 *
 * Adding a currency:
 *   1. Add a new entry below with the actual factory bank info.
 *   2. Add the new currency code to SUPPORTED_CURRENCIES so the admin
 *      form's <select> offers it.
 *   3. Make sure Stripe supports it (Stripe Connect supports 135+
 *      currencies, but the factory's Stripe account must be enabled
 *      for the currency — verify in Stripe dashboard before shipping).
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
 * The factory's 4 receiving accounts.
 * NOTE: account numbers below are illustrative — admin must populate the
 * real ones before going live. The CI suite cannot test against live
 * account numbers for obvious security reasons.
 */
export const BANK_ACCOUNTS: Record<SupportedCurrency, BankAccount> = {
  usd: {
    currency: "usd",
    label: "USD — US Dollar",
    symbol: "$",
    beneficiary: "YIWU HOMEDORM COMMODITY MANUFACTURING CO.,LTD",
    companyAddress:
      "2nd Floor, No.11 Anshang Road, Yiwu City, Jinhua, Zhejiang Province, China",
    bankName: "Agricultural Bank of China, Zhejiang Branch",
    account: "19648014040108531",
    swift: "ABOCCNBJ110",
    bankAddress:
      "No. 181 Binwang Road, Yiwu City, Jinhua, Zhejiang Province, China",
    routingNumber: undefined,
    notes: "Add reference: PI number (e.g. SA202610020002).",
  },
  eur: {
    currency: "eur",
    label: "EUR — Euro",
    symbol: "€",
    beneficiary: "YIWU HOMEDORM COMMODITY MANUFACTURING CO.,LTD",
    companyAddress:
      "2nd Floor, No.11 Anshang Road, Yiwu City, Jinhua, Zhejiang Province, China",
    bankName: "Agricultural Bank of China, Zhejiang Branch",
    account: "19648014040108531",
    swift: "ABOCCNBJ110",
    bankAddress:
      "No. 181 Binwang Road, Yiwu City, Jinhua, Zhejiang Province, China",
    notes:
      "EUR wires may route via intermediary bank. Sender's bank may charge a fee; we receive net only.",
  },
  gbp: {
    currency: "gbp",
    label: "GBP — British Pound",
    symbol: "£",
    beneficiary: "YIWU HOMEDORM COMMODITY MANUFACTURING CO.,LTD",
    companyAddress:
      "2nd Floor, No.11 Anshang Road, Yiwu City, Jinhua, Zhejiang Province, China",
    bankName: "Agricultural Bank of China, Zhejiang Branch",
    account: "19648014040108531",
    swift: "ABOCCNBJ110",
    bankAddress:
      "No. 181 Binwang Road, Yiwu City, Jinhua, Zhejiang Province, China",
    notes: "GBP wires via SWIFT; please add PI number in the wire reference.",
  },
  cny: {
    currency: "cny",
    label: "CNY — Chinese Yuan (RMB)",
    symbol: "¥",
    beneficiary: "义乌市好梦家居用品制造有限公司",
    companyAddress: "浙江省义乌市安商路11号二楼",
    bankName: "中国农业银行浙江省分行",
    account: "19648014040108531",
    swift: "ABOCCNBJ110",
    bankAddress: "浙江省金华市义乌市宾王路181号",
    cnaps: "103338671188",
    notes: "国内人民币电汇请使用CNAPS代码103338671188。",
  },
};

/**
 * Resolve bank account by currency code. Falls back to USD if the stored
 * currency is unrecognized (defensive — the DB column defaults to 'usd',
 * so this should only trigger for legacy rows from before R80).
 */
export function getBankAccount(currency: string | null | undefined): BankAccount {
  const key = (currency ?? "usd").toLowerCase() as SupportedCurrency;
  return BANK_ACCOUNTS[key] ?? BANK_ACCOUNTS.usd;
}

/**
 * Pretty label for the admin <select> option, e.g. "USD — US Dollar".
 */
export function formatCurrencyOption(currency: SupportedCurrency): string {
  return BANK_ACCOUNTS[currency].label;
}