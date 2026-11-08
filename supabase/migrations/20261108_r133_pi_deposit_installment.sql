-- supabase/migrations/20261108_r133_pi_deposit_installment.sql
--
-- 2026-11-08 (R133): deposit / installment support for Proforma Invoices.
--
-- Background: the PI document always shows the FULL contract value
-- (`total_cents`), and Stripe charged that same full value, so a customer
-- who wanted to pay a deposit first had no way to do it — the checkout
-- page showed 100% and that was the only chargeable amount.
--
-- The fix keeps the two numbers apart:
--
--   total_cents       the FULL contract value. Always shown on the PI.
--   amount_due_cents  the amount still payable RIGHT NOW.
--                     - at creation: the deposit (first installment)
--                     - after a partial payment: the remaining balance
--   amount_paid_cents the cumulative amount collected so far
--   payment_percentage the first-installment ratio (100 = pay in full)
--
-- Stripe already charges `amount_due_cents` first (see pickAmountCents in
-- functions/api/pi/stripe-payment-intent.ts), so no Stripe-side change is
-- needed: writing a deposit amount here is enough.
--
-- This migration does three things:
--
--   1. Adds the 'partially_paid' state to proforma_invoices.status so a
--      PI that collected its deposit but not its balance is distinguishable
--      from one that was never touched.
--   2. Backfills amount_due_cents for existing rows (they were all
--      full-payment PIs, because the column was never written on insert
--      and the amount therefore fell back to total_cents).
--   3. Backfills payment_percentage so it matches what was actually
--      charged, instead of the stale hard-coded 30.
--
-- Safe to re-run: every statement is idempotent.

BEGIN;

-- ── 1. status: allow 'partially_paid' ──────────────────────────────────
-- The constraint is NOT rebuilt from a hardcoded value list. Its existing
-- expression is preserved verbatim and 'partially_paid' is OR-ed in, so no
-- historical row can start failing the constraint and any other condition
-- the constraint expressed keeps working.
--
-- Located through pg_constraint + pg_attribute because the constraint was
-- declared inline in CREATE TABLE and its name is not guaranteed.
DO $$
DECLARE
  cname text;
  cexpr text;
  hits  int := 0;
BEGIN
  FOR cname, cexpr IN
    SELECT c.conname,
           pg_get_expr(c.conbin, c.conrelid)
      FROM pg_constraint c
      JOIN pg_attribute a
        ON a.attrelid = c.conrelid
       AND a.attnum = ANY(c.conkey)
     WHERE c.conrelid = 'proforma_invoices'::regclass
       AND c.contype = 'c'
       AND a.attname = 'status'
  LOOP
    hits := hits + 1;
    EXECUTE format('ALTER TABLE proforma_invoices DROP CONSTRAINT %I', cname);
    EXECUTE format(
      'ALTER TABLE proforma_invoices ADD CONSTRAINT %I CHECK ((%s) OR status::text = %L)',
      cname,
      cexpr,
      'partially_paid'
    );
    RAISE NOTICE 'proforma_invoices.status: relaxed constraint % to also allow ''partially_paid''', cname;
  END LOOP;

  IF hits = 0 THEN
    RAISE NOTICE 'proforma_invoices.status: no CHECK constraint found — nothing to relax';
  END IF;
END $$;

-- ── 2. backfill amount_due_cents ──────────────────────────────────────
-- Every PI created before R133 was a full-payment PI: the insert path
-- never wrote amount_due_cents, so the amount charged was the fallback
-- `total_cents`. Write that explicitly so the new code path (which reads
-- amount_due_cents first) cannot accidentally charge a deposit on an old
-- PI.
UPDATE proforma_invoices
   SET amount_due_cents = total_cents
 WHERE amount_due_cents IS NULL;

-- ── 3. backfill payment_percentage ────────────────────────────────────
-- payment_percentage used to be written as a hard-coded 30 on every
-- insert and was never read by anything, so it did not describe reality.
-- Derive it from the amount that was actually payable:
--   * amount_due_cents == total_cents  -> 100 (paid in full up front)
--   * amount_due_cents <  total_cents  -> the deposit ratio
-- Rows with a zero total keep 100 (nothing to split).
UPDATE proforma_invoices
   SET payment_percentage = CASE
         WHEN COALESCE(total_cents, 0) <= 0 THEN 100
         WHEN COALESCE(amount_due_cents, total_cents) >= COALESCE(total_cents, 0) THEN 100
         ELSE GREATEST(1, LEAST(99,
               ROUND(COALESCE(amount_due_cents, total_cents)::numeric
                     * 100 / COALESCE(total_cents, 0))::int))
       END
 WHERE payment_percentage IS NULL
    OR (payment_percentage <> 100
        AND COALESCE(amount_due_cents, total_cents) >= COALESCE(total_cents, 0));

-- ── 4. index ───────────────────────────────────────────────────────────
-- The admin summary now sorts/filters by payment progress, and the
-- reconciliation endpoint scans for partially-paid PIs.
CREATE INDEX IF NOT EXISTS idx_proforma_invoices_amount_paid_cents
  ON proforma_invoices(amount_paid_cents);

COMMIT;

-- ── rollback (manual, if needed) ────────────────────────────────────────
-- BEGIN;
--   UPDATE proforma_invoices SET amount_due_cents = NULL WHERE amount_due_cents = total_cents;
--   ALTER TABLE proforma_invoices DROP CONSTRAINT IF EXISTS proforma_invoices_status_check;
--   ALTER TABLE proforma_invoices ADD CONSTRAINT proforma_invoices_status_check
--     CHECK (status IN ('draft','sent','paid','pending_bank','canceled','expired'));
--   DROP INDEX IF EXISTS idx_proforma_invoices_amount_paid_cents;
-- COMMIT;
