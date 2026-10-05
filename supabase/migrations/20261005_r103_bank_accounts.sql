-- supabase/migrations/20261005_r103_bank_accounts.sql
--
-- 2026-10-05 (R103): add bank_accounts table so admin can manage
-- receiving accounts per currency via /admin/bank-accounts/ instead of
-- editing src/lib/bank-accounts.ts and redeploying.
--
-- Design:
--   * One row per currency. Currency is the natural unique key and matches
--     proforma_invoices.currency so we can JOIN at query time.
--   * Mirrors the BankAccount TypeScript interface 1:1 (snake_case for
--     DB columns per project convention). The library wraps rows back into
--     the camelCase shape on read.
--   * RLS deny-all matches proforma_invoices — only the Cloudflare service
--     role key (used by functions/api/admin/bank-accounts) can read or
--     write. Anonymous clients never see bank details.
--   * updated_at triggers via a tiny stored procedure so admin save calls
--     don't have to remember to set it.
--   * Seed rows for the 4 supported currencies using the hardcoded values
--     from src/lib/bank-accounts.ts. That way the dynamic reader falls
--     back to real data on first run; old PIs stay consistent with new
--     ones.
--   * site_slug defaults to 'sublimapparel' per project convention. The
--     future wholesale site may add a second row with a different slug.

BEGIN;

CREATE TABLE IF NOT EXISTS bank_accounts (
  -- ── identity ────────────────────────────────────────────────────────
  id                  BIGSERIAL PRIMARY KEY,
  site_slug           TEXT NOT NULL DEFAULT 'sublimapparel',
  currency            TEXT NOT NULL,                                   -- 'usd' | 'eur' | 'gbp' | 'cny' (lowercase)
  label               TEXT NOT NULL,                                   -- "USD — US Dollar"
  symbol              TEXT NOT NULL,                                   -- '$' | '€' | '£' | '¥'

  -- ── beneficiary ─────────────────────────────────────────────────────
  beneficiary         TEXT NOT NULL,
  company_address     TEXT NOT NULL,

  -- ── receiving bank ──────────────────────────────────────────────────
  bank_name           TEXT NOT NULL,
  account             TEXT NOT NULL,
  swift               TEXT NOT NULL,
  bank_address        TEXT NOT NULL,

  -- ── currency-specific fields (nullable) ─────────────────────────────
  iban                TEXT,
  bank_country        TEXT,
  routing_number      TEXT,
  cnaps               TEXT,
  intermediary_bank   TEXT,

  -- ── free-form ───────────────────────────────────────────────────────
  notes               TEXT,

  -- ── audit ───────────────────────────────────────────────────────────
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- One row per currency per site. Admin edits update in place.
  CONSTRAINT bank_accounts_site_currency_unique UNIQUE (site_slug, currency)
);

-- Auto-bump updated_at on UPDATE so admin form doesn't need to set it.
CREATE OR REPLACE FUNCTION bank_accounts_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS bank_accounts_updated_at ON bank_accounts;
CREATE TRIGGER bank_accounts_updated_at
  BEFORE UPDATE ON bank_accounts
  FOR EACH ROW
  EXECUTE FUNCTION bank_accounts_set_updated_at();

-- RLS deny-all. service_role bypasses; anon and authenticated cannot read.
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS bank_accounts_deny_all ON bank_accounts;
CREATE POLICY bank_accounts_deny_all ON bank_accounts
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Seed rows for the 4 supported currencies. Values mirror
-- src/lib/bank-accounts.ts BANK_ACCOUNTS as of 2026-10-05 so first-time
-- reads return the same numbers the hardcoded file did.
INSERT INTO bank_accounts (
  site_slug, currency, label, symbol,
  beneficiary, company_address,
  bank_name, account, swift, bank_address,
  iban, bank_country, routing_number, cnaps, intermediary_bank, notes
) VALUES
  ('sublimapparel', 'usd', 'USD — US Dollar', '$',
   'YIWU HOMEDORM COMMODITY MANUFACTURING CO.,LTD',
   '2nd Floor, No.11 Anshang Road, Yiwu City, Jinhua, Zhejiang Province, China',
   'Agricultural Bank of China, Zhejiang Branch',
   '19648014040108531',
   'ABOCCNBJ110',
   'No. 181 Binwang Road, Yiwu City, Jinhua, Zhejiang Province, China',
   NULL, 'US', NULL, NULL, NULL,
   'Add reference: PI number (e.g. SA202610020002).'),
  ('sublimapparel', 'eur', 'EUR — Euro', '€',
   'YIWU HOMEDORM COMMODITY MANUFACTURING CO.,LTD',
   '2nd Floor, No.11 Anshang Road, Yiwu City, Jinhua, Zhejiang Province, China',
   'Agricultural Bank of China, Zhejiang Branch',
   '19648014040108531',
   'ABOCCNBJ110',
   'No. 181 Binwang Road, Yiwu City, Jinhua, Zhejiang Province, China',
   NULL, 'CN', NULL, NULL, NULL,
   'EUR wires may route via intermediary bank. Sender''s bank may charge a fee; we receive net only.'),
  ('sublimapparel', 'gbp', 'GBP — British Pound', '£',
   'YIWU HOMEDORM COMMODITY MANUFACTURING CO.,LTD',
   '2nd Floor, No.11 Anshang Road, Yiwu City, Jinhua, Zhejiang Province, China',
   'Agricultural Bank of China, Zhejiang Branch',
   '19648014040108531',
   'ABOCCNBJ110',
   'No. 181 Binwang Road, Yiwu City, Jinhua, Zhejiang Province, China',
   NULL, 'CN', NULL, NULL, NULL,
   'GBP wires via SWIFT; please add PI number in the wire reference.'),
  ('sublimapparel', 'cny', 'CNY — Chinese Yuan (RMB)', '¥',
   '义乌市好梦家居用品制造有限公司',
   '浙江省义乌市安商路11号二楼',
   '中国农业银行浙江省分行',
   '19648014040108531',
   'ABOCCNBJ110',
   '浙江省金华市义乌市宾王路181号',
   NULL, 'CN', NULL, '103338671188', NULL,
   '国内人民币电汇请使用CNAPS代码103338671188。')
ON CONFLICT (site_slug, currency) DO NOTHING;

COMMIT;
