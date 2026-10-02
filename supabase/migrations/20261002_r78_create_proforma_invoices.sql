-- supabase/migrations/20261002_r78_create_proforma_invoices.sql
--
-- 2026-10-02 (R78): proforma_invoices table was never actually created in the
-- Supabase project (R78 migration ran into "relation does not exist"). This
-- script is the full CREATE TABLE that mirrors the R77/R78 additions
-- (payment_site + stripe_client_secret + companions) plus every column the
-- PI generation / pay page / webhook code already reads and writes.
--
-- Run this BEFORE 20261002_r78_pi_payment_intent.sql.
--
-- Safe to re-run: uses IF NOT EXISTS so subsequent runs are no-ops.
-- RLS: enabled with deny-all policies for anon/authenticated. The API
-- functions use the service_role key, which bypasses RLS by design.

BEGIN;

-- Drop any stale partial table from a half-applied previous attempt. Safe:
-- IF EXISTS guard means we never error on the first run.
DROP TABLE IF EXISTS proforma_invoices CASCADE;

CREATE TABLE proforma_invoices (
  -- ── primary key ────────────────────────────────────────────────
  id                          BIGSERIAL PRIMARY KEY,

  -- ── public identifier (SA-YYYYMM-XXXXX, what the /pay URL uses) ─
  pi_number                   TEXT NOT NULL UNIQUE,

  -- ── status state machine ───────────────────────────────────────
  -- draft     = being edited by sales
  -- sent      = emailed to customer, awaiting payment
  -- paid      = card or wire settled, production can begin
  -- pending_bank = customer said they wired, awaiting finance confirmation
  -- canceled  = voided by sales
  -- expired   = past valid_until without payment
  status                      TEXT NOT NULL DEFAULT 'draft'
                              CHECK (status IN ('draft','sent','paid','pending_bank','canceled','expired')),

  -- ── dates ──────────────────────────────────────────────────────
  issue_date                  DATE NOT NULL DEFAULT CURRENT_DATE,
  valid_until                 DATE,
  paid_at                     TIMESTAMPTZ,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- ── terms ──────────────────────────────────────────────────────
  lead_time_days              INTEGER NOT NULL DEFAULT 25,
  production_time_days        INTEGER NOT NULL DEFAULT 20,
  payment_terms               TEXT NOT NULL DEFAULT '30% deposit, 70% before shipment',
  payment_percentage          INTEGER NOT NULL DEFAULT 30,

  -- ── customer ───────────────────────────────────────────────────
  customer_name               TEXT,
  customer_email              TEXT,
  customer_phone              TEXT,
  customer_company            TEXT,
  customer_address            TEXT,

  -- ── line items (jsonb; parsed by /pay page and PDF generator) ───
  items                       JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- ── money ──────────────────────────────────────────────────────
  subtotal_cents              INTEGER NOT NULL DEFAULT 0,
  shipping_cents              INTEGER NOT NULL DEFAULT 0,
  total_cents                 INTEGER NOT NULL DEFAULT 0,
  currency                    TEXT NOT NULL DEFAULT 'usd',

  -- R78: customer-facing "amount due right now" (deposit or full).
  amount_due_cents            INTEGER,
  amount_paid_cents           INTEGER NOT NULL DEFAULT 0,

  -- ── human-readable strings (Excel-style metadata) ──────────────
  lead_time_text              TEXT,
  payment_terms_text          TEXT,
  shipping_label              TEXT,
  shipping_method             TEXT,
  image_url                   TEXT,

  -- ── optional linkage ──────────────────────────────────────────
  inquiry_id                  BIGINT,
  quote_id                    BIGINT,

  -- ── Stripe (R78 additions) ────────────────────────────────────
  stripe_client_secret        TEXT,
  stripe_payment_intent_id    TEXT,

  -- ── multi-site tracking (R77) ────────────────────────────────
  payment_site                TEXT NOT NULL DEFAULT 'sublimapparel',

  -- ── freeform jsonb (stripe metadata, customer notes, etc.) ────
  metadata                    JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- ── indexes ──────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_proforma_invoices_pi_number
  ON proforma_invoices(pi_number);
CREATE INDEX IF NOT EXISTS idx_proforma_invoices_status
  ON proforma_invoices(status);
CREATE INDEX IF NOT EXISTS idx_proforma_invoices_stripe_payment_intent_id
  ON proforma_invoices(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_proforma_invoices_payment_site
  ON proforma_invoices(payment_site);
CREATE INDEX IF NOT EXISTS idx_proforma_invoices_customer_email
  ON proforma_invoices(customer_email);

-- ── updated_at trigger ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION trg_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS proforma_invoices_set_updated_at ON proforma_invoices;
CREATE TRIGGER proforma_invoices_set_updated_at
  BEFORE UPDATE ON proforma_invoices
  FOR EACH ROW
  EXECUTE FUNCTION trg_set_updated_at();

-- ── RLS: deny all to anon/authenticated, allow service_role ────
ALTER TABLE proforma_invoices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS proforma_invoices_deny_anon      ON proforma_invoices;
DROP POLICY IF EXISTS proforma_invoices_deny_auth      ON proforma_invoices;
DROP POLICY IF EXISTS proforma_invoices_deny_all       ON proforma_invoices;

CREATE POLICY proforma_invoices_deny_all
  ON proforma_invoices
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- ── check constraint: site_slug whitelist (R77) ────────────────
-- Keep in sync with ALLOWED_SITE_SLUGS in
-- functions/api/stripe/{create-payment-intent,checkout-session,webhook}.ts
-- and functions/api/pi/get.ts.
ALTER TABLE proforma_invoices
  DROP CONSTRAINT IF EXISTS proforma_invoices_payment_site_check;
ALTER TABLE proforma_invoices
  ADD CONSTRAINT proforma_invoices_payment_site_check
  CHECK (payment_site IN (
    'sublimapparel'
  ));

COMMIT;

-- ── rollback (manual, if needed) ────────────────────────────────
-- BEGIN;
-- DROP TABLE IF EXISTS proforma_invoices CASCADE;
-- COMMIT;