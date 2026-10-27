-- supabase/migrations/20261026_r124_duplicate_payment_guard.sql
--
-- 2026-10-26 (R124): duplicate-payment guard rails.
--
-- Background: a customer was charged twice on the same Proforma Invoice.
-- Root cause was two independent PaymentIntent mint paths (the lazy mint
-- in functions/api/pi/[[pi_number]].ts and the explicit mint in
-- functions/api/pi/stripe-payment-intent.ts) with no reuse / idempotency
-- between them, so one PI could hold two live intents and the customer
-- could confirm both.
--
-- The code fix (R124-A..F) removes the second mint path, reuses the
-- existing intent, adds a Stripe idempotency key, and cancels sibling
-- intents as soon as one of them succeeds. This migration adds the
-- DATABASE side of that guard:
--
--   1. Indexes so the webhook can find "every other intent on this PI"
--      without a sequential scan on the payments table.
--   2. Relax the payments.status CHECK so 'canceled' is accepted — the
--      sibling-cancellation writes that value.
--   3. v_duplicate_pi_payments — a report of PIs that were paid more than
--      once, with the total actually collected. This is the query to run
--      when a customer says "I was charged twice".
--   4. v_pending_pi_intents — the live double-charge risk list: every PI
--      that still has an unpaid intent hanging off it.
--
-- The `payments` table itself predates this migration history (it was
-- created directly in the Supabase dashboard), so nothing here assumes a
-- column type that the application does not already write.
--
-- Every statement is idempotent: IF NOT EXISTS / CREATE OR REPLACE, and
-- the constraint work preserves whatever the existing constraint allowed.

-- ══════════════════════════════════════════════════════════════════
-- PART 1 — indexes + status constraint
-- ══════════════════════════════════════════════════════════════════
-- Kept in its own transaction on purpose: if the views in PART 2 fail
-- to build (they depend on columns the application writes but that this
-- repository cannot prove exist), PART 1 stays committed and the
-- webhook-side protection still works.

BEGIN;

-- ── 1. indexes ────────────────────────────────────────────────────
-- The webhook's sibling-cancellation and duplicate-detection queries
-- filter by pi_id + status. Without this index they degrade into full
-- scans of `payments`, which grows by one row per payment attempt.
CREATE INDEX IF NOT EXISTS idx_payments_pi_id_status
  ON payments(pi_id, status);

-- One intent id → one payments row lookup (webhook UPDATE + the
-- existence check in stripe-payment-intent.ts).
CREATE INDEX IF NOT EXISTS idx_payments_stripe_payment_intent_id
  ON payments(stripe_payment_intent_id);

-- The duplicate report filters on status alone.
CREATE INDEX IF NOT EXISTS idx_payments_status
  ON payments(status);

-- ── 2. payments.status must allow 'canceled' ─────────────────────
-- The duplicate guard cancels sibling intents and writes status =
-- 'canceled' on their payments rows. If a status CHECK constraint
-- exists and does not permit that value, the UPDATE fails and the
-- sibling is never marked — which is exactly the state we need to
-- record.
--
-- The constraint is NOT rebuilt from a hardcoded value list. Its
-- existing expression is preserved verbatim and 'canceled' is OR-ed in,
-- so:
--   * no historical row can start failing the constraint;
--   * any other condition the constraint expressed (not just a value
--     list) keeps working.
--
-- The constraint is located through pg_constraint + pg_attribute
-- rather than by constraint name, because the payments table predates
-- this migration history and the name is not known.
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
     WHERE c.conrelid = 'payments'::regclass
       AND c.contype = 'c'
       AND a.attname = 'status'
  LOOP
    hits := hits + 1;
    EXECUTE format('ALTER TABLE payments DROP CONSTRAINT %I', cname);
    EXECUTE format(
      'ALTER TABLE payments ADD CONSTRAINT %I CHECK ((%s) OR status::text = %L)',
      cname,
      cexpr,
      'canceled'
    );
    RAISE NOTICE 'payments.status: relaxed constraint % to also allow ''canceled''', cname;
  END LOOP;

  IF hits = 0 THEN
    RAISE NOTICE 'payments.status: no CHECK constraint found — nothing to relax';
  END IF;
END $$;

COMMIT;

-- ══════════════════════════════════════════════════════════════════
-- PART 2 — reporting views
-- ══════════════════════════════════════════════════════════════════
-- Separate transaction: a failure here cannot undo PART 1.

BEGIN;

-- ── 3. duplicate-payment report ──────────────────────────────────
-- One row per PI that was paid by MORE THAN ONE PaymentIntent, with the
-- total amount actually collected so finance can compute the refund.
--
-- Rows are de-duplicated per intent id first: a rare concurrent insert
-- can leave two rows pointing at the same intent, and that is NOT a
-- duplicate charge.
--
-- pi_number is read from the row's metadata rather than by joining
-- proforma_invoices: payments.pi_id holds the PI id as written by the
-- application (a text value), and proforma_invoices.id is a BIGSERIAL.
-- Joining them directly would need a cast on both sides; keeping the
-- join out of the view avoids that entirely.
CREATE OR REPLACE VIEW v_duplicate_pi_payments AS
WITH per_intent AS (
  SELECT DISTINCT ON (stripe_payment_intent_id)
         pi_id,
         stripe_payment_intent_id,
         amount_cents,
         currency,
         metadata->>'pi_number'  AS pi_number,
         paid_at
    FROM payments
   WHERE status = 'succeeded'
     AND pi_id IS NOT NULL
     AND stripe_payment_intent_id IS NOT NULL
   ORDER BY stripe_payment_intent_id, created_at DESC
)
SELECT pi_id,
       MIN(pi_number)                    AS pi_number,
       COUNT(*)                          AS succeeded_intent_count,
       SUM(amount_cents)                 AS total_paid_cents,
       MIN(currency)                     AS currency,
       MIN(paid_at)                      AS first_paid_at,
       MAX(paid_at)                      AS last_paid_at,
       ARRAY_AGG(stripe_payment_intent_id) AS intent_ids
  FROM per_intent
 GROUP BY pi_id
HAVING COUNT(*) > 1;

-- ── 4. live double-charge risk list ──────────────────────────────
-- Every PI that still has an unpaid intent attached. After R124 there
-- should be at most ONE of these per PI; more than one means two
-- PaymentIntents are still confirmable on the same invoice.
CREATE OR REPLACE VIEW v_pending_pi_intents AS
SELECT pi_id,
       metadata->>'pi_number'  AS pi_number,
       stripe_payment_intent_id,
       amount_cents,
       currency,
       customer_name,
       customer_email,
       created_at
  FROM payments
 WHERE status = 'pending'
   AND stripe_payment_intent_id IS NOT NULL
 ORDER BY created_at DESC;

COMMIT;

-- ── how to use ────────────────────────────────────────────────────
--
-- IMPORTANT: before these views tell you anything, the ledger has to
-- contain the charges that actually landed. Until 2026-10-26 a
-- successful payment was written to the payments table only when the
-- LAZY mint path had created the row — the intent that actually took
-- the money was never recorded, so the ledger was blind. Populate it
-- from Stripe with:
--
--   GET /api/admin/payment-reconciliation?action=repair
--
-- (requires ADMIN_TOKEN; see functions/api/admin/payment-reconciliation.ts).
-- That call writes the missing payments rows and cancels the intents
-- that are still open on an already-paid invoice.
--
-- Find every duplicate charge (this is the "customer says they were
-- charged twice" query):
--
--   SELECT * FROM v_duplicate_pi_payments ORDER BY last_paid_at DESC;
--
-- Just today's:
--
--   SELECT * FROM v_duplicate_pi_payments
--    WHERE last_paid_at >= (CURRENT_DATE AT TIME ZONE 'Asia/Shanghai')
--    ORDER BY last_paid_at DESC;
--
-- Check the invoice total against what was collected.
-- pi_id in the view is the PI id as stored on the payments row (text),
-- while proforma_invoices.id is a BIGSERIAL — cast both sides:
--
--   SELECT pi.pi_number,
--          pi.total_cents          AS invoice_cents,
--          d.total_paid_cents      AS collected_cents,
--          d.total_paid_cents - pi.total_cents AS overcharged_cents,
--          d.intent_ids
--     FROM v_duplicate_pi_payments d
--     JOIN proforma_invoices pi ON pi.id::text = d.pi_id::text
--    WHERE d.total_paid_cents > pi.total_cents;
--
-- Live risk list (PIs with more than one pending intent = two
-- confirmable PaymentIntents on one invoice):
--
--   SELECT pi_id, COUNT(DISTINCT stripe_payment_intent_id) AS open_intents
--     FROM v_pending_pi_intents
--    GROUP BY pi_id
--   HAVING COUNT(DISTINCT stripe_payment_intent_id) > 1;
--
-- ── optional follow-up (NOT run by this script) ───────────────────
-- A partial UNIQUE index on the intent id would make a double ledger
-- row impossible. It cannot be created here because the blind period
-- very likely left duplicate rows behind, and creating it would fail.
-- Run this only after inspecting for duplicates:
--
--   SELECT stripe_payment_intent_id, COUNT(*)
--     FROM payments
--    WHERE stripe_payment_intent_id IS NOT NULL
--    GROUP BY stripe_payment_intent_id
--   HAVING COUNT(*) > 1;
--
-- After cleaning those up:
--
--   CREATE UNIQUE INDEX IF NOT EXISTS uq_payments_intent
--     ON payments(stripe_payment_intent_id)
--    WHERE stripe_payment_intent_id IS NOT NULL;
--
-- ── rollback (manual, if needed) ──────────────────────────────────
-- DROP VIEW IF EXISTS v_pending_pi_intents;
-- DROP VIEW IF EXISTS v_duplicate_pi_payments;
-- DROP INDEX IF EXISTS idx_payments_pi_id_status;
-- DROP INDEX IF EXISTS idx_payments_stripe_payment_intent_id;
-- DROP INDEX IF EXISTS idx_payments_status;
