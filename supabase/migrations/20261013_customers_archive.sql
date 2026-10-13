-- supabase/migrations/20261013_customers_archive.sql
--
-- 2026-10-13 (Phase A.1): Customer archive table for sublimapparel.
-- Mirrors the OEM PI Manager v3 `oem_customers` table, with two adaptations:
--     1. sublimapparel's `proforma_invoices` has no `country` column,
--        so we omit `country` from the archive + backfill.
--     2. We add a real UNIQUE INDEX on (LOWER(customer_name),
--        COALESCE(LOWER(email), '')) so `ON CONFLICT DO NOTHING` in
--        the backfill actually does something. OEM's migration had
--        `ON CONFLICT DO NOTHING` without a target, which is a
--        no-op at best and a syntax error at worst.
--
-- Idempotent: safe to re-run. Uses IF NOT EXISTS / DROP IF EXISTS throughout.

BEGIN;

-- ============================================================================
-- 1. customers table
-- ============================================================================
CREATE TABLE IF NOT EXISTS customers (
    id              BIGSERIAL PRIMARY KEY,
    customer_name   TEXT        NOT NULL,
    company         TEXT,
    address         TEXT,
    phone           TEXT,
    email           TEXT,
    -- PI usage stats (filled lazily on first PI save referencing this customer)
    pi_count        INTEGER     NOT NULL DEFAULT 0,
    last_used_at    TIMESTAMPTZ,
    -- Metadata
    created_by      BIGINT,                 -- reserved (Cloudflare Pages has no
                                            --   user concept; left for future)
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Case-insensitive uniqueness on (name + email). NULL email is allowed
    -- and treated as '' so two customers with the same name but no email
    -- still collapse into one row.
    CONSTRAINT customers_name_email_unique UNIQUE
        (LOWER(customer_name), COALESCE(LOWER(email), ''))
);

-- Indexes (case-insensitive prefix search on name + company)
CREATE INDEX IF NOT EXISTS idx_customers_name_lower
    ON customers (LOWER(customer_name));
CREATE INDEX IF NOT EXISTS idx_customers_company_lower
    ON customers (LOWER(COALESCE(company, '')));
CREATE INDEX IF NOT EXISTS idx_customers_email_lower
    ON customers (LOWER(COALESCE(email, '')));

-- Touch updated_at on every UPDATE
CREATE OR REPLACE FUNCTION customers_touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_customers_touch_updated_at ON customers;
CREATE TRIGGER trg_customers_touch_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW
    EXECUTE FUNCTION customers_touch_updated_at();

-- RLS: enable, but only service_role can read/write.
-- Service role key bypasses RLS anyway, so this is mainly a safety net.
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS customers_service_all ON customers;
CREATE POLICY customers_service_all ON customers
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- 2. ONE-TIME: Backfill from existing PIs (idempotent)
-- ----------------------------------------------------------------------------
-- This creates one row per unique (name, email) from proforma_invoices.
-- Re-runs are safe thanks to the UNIQUE constraint above:
-- existing rows are skipped, not duplicated.
-- ============================================================================
DO $$
DECLARE
    rcount INT;
BEGIN
    INSERT INTO customers (
        customer_name, company, address, phone, email,
        pi_count, last_used_at
    )
    SELECT
        COALESCE(NULLIF(TRIM(customer_name),   ''), '(no name)')   AS customer_name,
        MAX(NULLIF(TRIM(customer_company), ''))                    AS company,
        MAX(NULLIF(TRIM(customer_address), ''))                    AS address,
        MAX(NULLIF(TRIM(customer_phone),   ''))                    AS phone,
        MAX(NULLIF(LOWER(TRIM(customer_email)), ''))               AS email,
        COUNT(*)::INT                                              AS pi_count,
        MAX(created_at)                                            AS last_used_at
    FROM proforma_invoices
    WHERE customer_name IS NOT NULL AND TRIM(customer_name) <> ''
    GROUP BY LOWER(TRIM(customer_name)), LOWER(TRIM(COALESCE(customer_email, '')))
    ON CONFLICT (LOWER(customer_name), COALESCE(LOWER(email), ''))
    DO NOTHING;

    GET DIAGNOSTICS rcount = ROW_COUNT;
    RAISE NOTICE 'customers backfill: % rows inserted (others already existed)', rcount;
END $$;

-- Verify
SELECT COUNT(*) AS customer_count FROM customers;

COMMIT;