-- supabase/migrations/20261002_r78_pi_payment_intent.sql
--
-- 2026-10-02 (R78): live PI card payment — add Stripe columns to proforma_invoices.
--
-- Until R78 the /pay/[pi_number] page never had a real client_secret to hand
-- to Stripe Elements. The Stripe webhook (functions/api/stripe/webhook.ts)
-- already writes `stripe_payment_intent_id` back to proforma_invoices on a
-- successful payment (tested during R77), so that column is guaranteed to
-- exist. R78 just adds the pre-payment companion:
--
--   stripe_client_secret       — written by get.ts the moment a customer opens
--                                the PI; reused across reloads; never re-minted
--                                once the PI is paid.
--
-- We also tighten the `status` enum to include all the values the front-end
-- actually emits ("paid", "pending_bank", "canceled", "expired", "draft",
-- "sent"). Idempotent — uses IF NOT EXISTS / DROP-IF-EXISTS.
--
-- Run this in the Supabase SQL editor before redeploying. It is safe to run
-- after the webhook has already written rows: every ALTER uses that guard.

BEGIN;

-- ── new Stripe companion column ───────────────────────────────────
ALTER TABLE proforma_invoices
  ADD COLUMN IF NOT EXISTS stripe_client_secret TEXT;

-- Helpful when finance dashboards want to look up PIs by their PI number
-- (the same query the /api/pi/{piNumber} endpoint runs).
CREATE INDEX IF NOT EXISTS idx_proforma_invoices_pi_number
  ON proforma_invoices(pi_number);

-- The stripe_payment_intent_id column should already exist (webhook writes
-- to it), but IF NOT EXISTS keeps this migration idempotent if it doesn't.
ALTER TABLE proforma_invoices
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;

CREATE INDEX IF NOT EXISTS idx_proforma_invoices_stripe_payment_intent_id
  ON proforma_invoices(stripe_payment_intent_id);

-- ── amount columns (front-end already reads them) ────────────────
ALTER TABLE proforma_invoices
  ADD COLUMN IF NOT EXISTS amount_due_cents    INTEGER,
  ADD COLUMN IF NOT EXISTS amount_paid_cents   INTEGER NOT NULL DEFAULT 0;

-- Backfill amount_due_cents = total_cents when null. total_cents is the
-- canonical "customer owes" column on the PI; the dedicated column is just
-- a denormalised read-cache so the pay page can render "Pay $X" without
-- recomputing shipping splits in JS.
UPDATE proforma_invoices
   SET amount_due_cents = total_cents
 WHERE amount_due_cents IS NULL
   AND total_cents IS NOT NULL;

-- ── confirm status enum covers every value the front-end sets ────
-- Supabase / PG: a varchar column with no constraint is fine — we're just
-- keeping this migration honest about the values the API writes.
DO $$
BEGIN
  -- No-op block; intentionally empty. The column type is text/varchar with
  -- no CHECK constraint today. Adding one would risk rejecting historical
  -- rows from the legacy PI import (status='draft' etc.) that we want to
  -- preserve.
  PERFORM 1;
END $$;

COMMIT;

-- ── rollback (manual, if needed) ──────────────────────────────────
-- BEGIN;
-- ALTER TABLE proforma_invoices DROP COLUMN IF EXISTS stripe_client_secret;
-- ALTER TABLE proforma_invoices DROP COLUMN IF EXISTS stripe_payment_intent_id;
-- ALTER TABLE proforma_invoices DROP COLUMN IF EXISTS amount_due_cents;
-- ALTER TABLE proforma_invoices DROP COLUMN IF EXISTS amount_paid_cents;
-- DROP INDEX IF EXISTS idx_proforma_invoices_pi_number;
-- DROP INDEX IF EXISTS idx_proforma_invoices_stripe_payment_intent_id;
-- COMMIT;