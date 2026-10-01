-- supabase/migrations/20261001_r77_payment_site.sql
--
-- 2026-10-01 (R77): add multi-site tracking column to payments + proforma_invoices.
--
-- Both tables already carry site_slug inside the freeform `metadata` JSONB
-- column, but querying/filtering by site from the Dashboard or via the REST API
-- is awkward (PostgREST can't index into JSONB without expression indexes, and
-- every dashboard filter would need a `metadata->>site_slug` selector).
--
-- Adding a dedicated `payment_site` column:
--   - makes `?payment_site=eq.sublimapparel` queries trivial
--   - gives us a real B-tree index for cross-site reporting
--   - keeps a `NOT NULL DEFAULT 'sublimapparel'` backstop so existing rows
--     stay valid before the application writes anything
--
-- The application (functions/api/stripe/create-payment-intent.ts,
-- checkout-session.ts, webhook.ts) writes to BOTH `metadata->site_slug` AND
-- `payment_site` so a future rollback to JSONB-only is still possible.

BEGIN;

-- ── payments table ───────────────────────────────────────────────
ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS payment_site TEXT NOT NULL DEFAULT 'sublimapparel';

-- Backfill: copy any pre-existing metadata.site_slug values into the new column.
-- Idempotent — only touches rows where metadata is set and contains site_slug.
UPDATE payments
   SET payment_site = metadata->>'site_slug'
 WHERE payment_site = 'sublimapparel'
   AND metadata ? 'site_slug'
   AND metadata->>'site_slug' IS NOT NULL
   AND metadata->>'site_slug' <> ''
   AND metadata->>'site_slug' IN (
     'sublimapparel',
     -- 'sublimapparel_us',
     -- 'sublimapparel_eu',
   );

CREATE INDEX IF NOT EXISTS idx_payments_payment_site
  ON payments(payment_site);

CREATE INDEX IF NOT EXISTS idx_payments_payment_site_status
  ON payments(payment_site, status);

-- ── proforma_invoices table ──────────────────────────────────────
ALTER TABLE proforma_invoices
  ADD COLUMN IF NOT EXISTS payment_site TEXT;

-- Backfill from PI's own metadata if present.
UPDATE proforma_invoices
   SET payment_site = metadata->>'site_slug'
 WHERE payment_site IS NULL
   AND metadata ? 'site_slug'
   AND metadata->>'site_slug' IS NOT NULL
   AND metadata->>'site_slug' <> ''
   AND metadata->>'site_slug' IN (
     'sublimapparel',
     -- 'sublimapparel_us',
     -- 'sublimapparel_eu',
   );

-- After backfill, anything still NULL gets the default. This makes the column
-- functionally NOT NULL going forward without breaking historical rows that
-- have no site_slug (they're all 'sublimapparel' by definition since we only
-- ran one site until R77).
UPDATE proforma_invoices
   SET payment_site = 'sublimapparel'
 WHERE payment_site IS NULL;

ALTER TABLE proforma_invoices
  ALTER COLUMN payment_site SET NOT NULL,
  ALTER COLUMN payment_site SET DEFAULT 'sublimapparel';

CREATE INDEX IF NOT EXISTS idx_proforma_invoices_payment_site
  ON proforma_invoices(payment_site);

-- ── check constraint — keep garbage out ──────────────────────────
-- Soft whitelist. Expand this list when adding sister sites; keep it in sync
-- with ALLOWED_SITE_SLUGS in functions/api/stripe/create-payment-intent.ts,
-- checkout-session.ts, and webhook.ts.
ALTER TABLE payments
  DROP CONSTRAINT IF EXISTS payments_payment_site_check;
ALTER TABLE payments
  ADD CONSTRAINT payments_payment_site_check
  CHECK (payment_site IN (
    'sublimapparel'
  ));

ALTER TABLE proforma_invoices
  DROP CONSTRAINT IF EXISTS proforma_invoices_payment_site_check;
ALTER TABLE proforma_invoices
  ADD CONSTRAINT proforma_invoices_payment_site_check
  CHECK (payment_site IN (
    'sublimapparel'
  ));

COMMIT;

-- ── rollback (manual, if needed) ──────────────────────────────────
-- BEGIN;
-- ALTER TABLE payments DROP COLUMN IF EXISTS payment_site;
-- ALTER TABLE proforma_invoices DROP COLUMN IF EXISTS payment_site;
-- COMMIT;
