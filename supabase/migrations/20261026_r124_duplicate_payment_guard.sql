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
--   2. v_duplicate_pi_payments — a report of PIs that were paid more than
--      once, with the total actually collected. This is the query to run
--      when a customer says "I was charged twice".
--   3. v_pending_pi_intents — the live double-charge risk list: every PI
--      that still has an unpaid intent hanging off it.
--
-- Idempotent: every statement uses IF NOT EXISTS / CREATE OR REPLACE.

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
-- exists it must permit that value, otherwise the UPDATE fails.
--
-- The check is rebuilt from the values actually present in the table
-- (plus 'canceled'), so no historical row can make this statement fail.
DO $$
DECLARE
  allowed  text[];
  literals text;
  cname    text;
BEGIN
  -- Locate the CHECK constraint governing payments.status by definition
  -- rather than by name — the constraint may predate this migration
  -- history and carry a different name.
  SELECT c.conname
    INTO cname
    FROM pg_constraint c
   WHERE c.conrelid = 'payments'::regclass
     AND c.contype = 'c'
     AND pg_get_constraintdef(c.oid) ILIKE '%status%'
   LIMIT 1;

  IF cname IS NULL THEN
    RETURN;
  END IF;

  SELECT array_agg(DISTINCT status::text)
    INTO allowed
    FROM payments
   WHERE status IS NOT NULL;

  IF allowed IS NULL THEN
    allowed := ARRAY[]::text[];
  END IF;

  -- Union with every status the application writes. Rebuilding the check
  -- from the rows that happen to exist today could SHRINK the allowed set —
  -- 'pending' would vanish if no pending row existed at migration time, and
  -- the very next payment attempt would then fail the constraint.
  allowed := (
    SELECT array_agg(DISTINCT s)
      FROM unnest(
        allowed || ARRAY[
          'pending','succeeded','failed','refunded','canceled'
        ]::text[]
      ) AS s
  );

  -- A CHECK constraint may not reference a PL/pgSQL variable (PostgreSQL
  -- rejects parameters inside a check expression), so the allowed set is
  -- rendered into a literal array and applied through EXECUTE.
  SELECT string_agg(quote_literal(s), ', ' ORDER BY s)
    INTO literals
    FROM unnest(allowed) AS s;

  EXECUTE format('ALTER TABLE payments DROP CONSTRAINT %I', cname);
  EXECUTE format(
    'ALTER TABLE payments ADD CONSTRAINT %I CHECK (status::text = ANY (ARRAY[%s]::text[]))',
    cname,
    literals
  );
END $$;

-- ── 3. duplicate-payment report ──────────────────────────────────
-- One row per PI that was paid by MORE THAN ONE PaymentIntent, with the
-- total amount actually collected so finance can compute the refund.
--
-- Rows are de-duplicated per intent id first: a rare concurrent insert
-- can leave two rows pointing at the same intent, and that is NOT a
-- duplicate charge.
CREATE OR REPLACE VIEW v_duplicate_pi_payments AS
WITH per_intent AS (
  SELECT DISTINCT ON (stripe_payment_intent_id)
         pi_id,
         stripe_payment_intent_id,
         amount_cents,
         currency,
         metadata->>'pi_number'  AS pi_number,
         created_at,
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
-- Check the invoice total against what was collected:
--
--   SELECT pi.pi_number,
--          pi.total_cents          AS invoice_cents,
--          d.total_paid_cents     AS collected_cents,
--          d.total_paid_cents - pi.total_cents AS overcharged_cents,
--          d.intent_ids
--     FROM v_duplicate_pi_payments d
--     JOIN proforma_invoices pi ON pi.id = d.pi_id
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
-- ── rollback (manual, if needed) ──────────────────────────────────
-- DROP VIEW IF EXISTS v_pending_pi_intents;
-- DROP VIEW IF EXISTS v_duplicate_pi_payments;
-- DROP INDEX IF EXISTS idx_payments_pi_id_status;
-- DROP INDEX IF EXISTS idx_payments_stripe_payment_intent_id;
-- DROP INDEX IF EXISTS idx_payments_status;
