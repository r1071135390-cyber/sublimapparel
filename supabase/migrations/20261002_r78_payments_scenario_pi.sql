-- supabase/migrations/20261002_r78_payments_scenario_pi.sql
--
-- 2026-10-02 (R78 fix): extend the payments.scenario CHECK constraint to
-- accept 'pi_payment'. Until R78 the only scenarios were 'inquiry_deposit',
-- 'sample_fee', and 'bulk_deposit' (from create-payment-intent.ts), so the
-- initial CHECK constraint baked those in. With R78's live PI card flow
-- (`[[pi_number]].ts` lazily mints a PaymentIntent on first page load), a
-- new scenario 'pi_payment' is now written. The [[pi_number]] insert
-- previously failed silently inside a try/catch, which is why the webhook
-- had nothing to UPDATE and `payments` rows for paid PIs were missing.
--
-- Idempotent: DROP IF EXISTS + ADD.

BEGIN;

ALTER TABLE payments
  DROP CONSTRAINT IF EXISTS payments_scenario_check;

ALTER TABLE payments
  ADD CONSTRAINT payments_scenario_check
  CHECK (scenario IN (
    'inquiry_deposit',
    'sample_fee',
    'bulk_deposit',
    'pi_payment'
  ));

COMMIT;

-- ── rollback (manual, if needed) ──────────────────────────────────
-- BEGIN;
-- ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_scenario_check;
-- ALTER TABLE payments
--   ADD CONSTRAINT payments_scenario_check
--   CHECK (scenario IN (
--     'inquiry_deposit',
--     'sample_fee',
--     'bulk_deposit'
--   ));
-- COMMIT;