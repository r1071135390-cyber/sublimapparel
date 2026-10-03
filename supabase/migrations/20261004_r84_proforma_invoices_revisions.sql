-- supabase/migrations/20261004_r84_proforma_invoices_revisions.sql
--
-- 2026-10-04 (R84): add a sibling table that snapshots a proforma_invoices
-- row immediately before an update. Backs the "edit PI" feature on
-- /admin/edit-pi/ and the audit trail it leaves behind. The user can
-- see "what did this PI look like before I changed it on 2026-10-04?".
--
-- Design choices:
--   * Mirror columns of proforma_invoices verbatim, so we never have to
--     translate shape when reading a revision back. The only extra
--     columns are the audit metadata at the top.
--   * revision_id is BIGSERIAL so revisions sort naturally by save time.
--     pi_id (FK to proforma_invoices.id) ties a revision to the live row
--     it was snapshotted from.
--   * Revisions are NEVER updated. Every save to proforma_invoices
--     inserts a new row here. Deletion is also out of scope — if the
--     PI itself is deleted (R82), revisions stay around so the audit
--     trail outlives the row.
--   * RLS deny-all matches proforma_invoices (service_role bypasses
--     both). We could later grant read to a future admin audit page.

BEGIN;

CREATE TABLE IF NOT EXISTS proforma_invoices_revisions (
  -- ── audit metadata ───────────────────────────────────────────────
  revision_id                  BIGSERIAL PRIMARY KEY,
  pi_id                        BIGINT NOT NULL,                 -- FK to proforma_invoices.id (logical only — no FK constraint so PI deletion does NOT cascade revisions out)
  pi_number                    TEXT NOT NULL,                   -- copied from the PI for fast lookup without joining
  revision_number              INTEGER NOT NULL,                -- 1 = original, 2 = first edit, ...
  saved_at                     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Optional freeform note ("changed shipping to DDP after customer
  -- requested air freight"). Empty string when admin didn't fill one.
  change_note                  TEXT NOT NULL DEFAULT '',
  -- 'manual' for admin-driven edits; future revisions may also be
  -- 'webhook' (Stripe updated something) — TBD.
  source                       TEXT NOT NULL DEFAULT 'manual',

  -- ── full snapshot of the PI at the moment BEFORE the edit ───────
  status                       TEXT NOT NULL,
  issue_date                   DATE NOT NULL,
  valid_until                  DATE,
  lead_time_days               INTEGER,
  production_time_days         INTEGER,
  payment_terms                TEXT,
  payment_percentage           INTEGER,
  payment_terms_text           TEXT,
  lead_time_text               TEXT,
  shipping_label               TEXT,
  shipping_method              TEXT,

  -- customer
  customer_name                TEXT,
  customer_email               TEXT,
  customer_phone               TEXT,
  customer_company             TEXT,
  customer_address             TEXT,

  -- items (same JSONB shape as proforma_invoices.items)
  items                        JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- money
  subtotal_cents               INTEGER NOT NULL DEFAULT 0,
  shipping_cents               INTEGER NOT NULL DEFAULT 0,
  total_cents                  INTEGER NOT NULL DEFAULT 0,
  currency                     TEXT NOT NULL DEFAULT 'usd',
  amount_due_cents             INTEGER,
  amount_paid_cents            INTEGER NOT NULL DEFAULT 0,

  -- Stripe snapshot (so a revision shows which PaymentIntent was live
  -- at the time — useful when investigating "we charged the wrong
  -- amount on the 14th, what PI was it?")
  stripe_client_secret         TEXT,
  stripe_payment_intent_id     TEXT,
  payment_site                 TEXT NOT NULL DEFAULT 'sublimapparel',

  -- copy of the original PI's metadata jsonb
  metadata                     JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- ── indexes ──────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_proforma_invoices_revisions_pi_id
  ON proforma_invoices_revisions(pi_id);
CREATE INDEX IF NOT EXISTS idx_proforma_invoices_revisions_pi_number
  ON proforma_invoices_revisions(pi_number);
CREATE INDEX IF NOT EXISTS idx_proforma_invoices_revisions_saved_at
  ON proforma_invoices_revisions(saved_at DESC);

-- ── RLS: deny all to anon/authenticated, allow service_role ────
ALTER TABLE proforma_invoices_revisions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS proforma_invoices_revisions_deny_all
  ON proforma_invoices_revisions;
CREATE POLICY proforma_invoices_revisions_deny_all
  ON proforma_invoices_revisions
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

COMMIT;

-- ── rollback (manual, if needed) ────────────────────────────────
-- BEGIN;
-- DROP TABLE IF EXISTS proforma_invoices_revisions CASCADE;
-- COMMIT;