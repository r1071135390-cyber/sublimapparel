-- supabase/migrations/20261005_r113_next_pi_number_rpc.sql
--
-- R113 (2026-10-05): Fix statement timeout (PostgreSQL code 57014) on PI creation.
--
-- Symptom:
--   POST /api/pi/create would 500 with:
--     {"code":"57014","message":"canceling statement due to statement timeout"}
--   The offending query in functions/api/pi/create.ts was:
--     GET /rest/v1/proforma_invoices
--       ?pi_number=like.SA{YYYYMMDD}%
--       &select=pi_number
--       &order=pi_number.desc
--       &limit=50
--   The PostgREST planner had to scan all rows matching the LIKE prefix,
--   sort them by pi_number, then keep the top 50 — once the table grew
--   past a few thousand PIs this blew past Supabase free-tier's
--   statement timeout.
--
-- Fix:
--   1. Add a btree index with `text_pattern_ops` so LIKE 'prefix%' becomes
--      an index range scan rather than a sequential scan + filter.
--   2. Provide a SECURITY DEFINER RPC `next_pi_number(prefix)` that does
--      the equivalent lookup server-side and returns only the next
--      available 4-digit suffix string. PostgREST calls it via
--      POST /rest/v1/rpc/next_pi_number — much smaller payload than
--      selecting 50 full rows over the wire.
--
-- Why SECURITY DEFINER:
--   The function reads from proforma_invoices which has RLS deny-all on
--   anon/authenticated. Wrapping the lookup as SECURITY DEFINER lets the
--   service role caller (Cloudflare Functions) read it without granting
--   table-level SELECT to anyone else.
--
-- Why we keep SELECT pi_number, pi_number LIKE 'prefix%' ORDER BY DESC LIMIT 1:
--   - Index range scan on (pi_number text_pattern_ops) returns rows in
--     DESC order automatically.
--   - LIMIT 1 means the planner stops at the first hit.
--   - The filter `pi_number ~ '^prefix[0-9]+$'` guards against the very
--     unlikely case of someone hand-inserting a PI with the same prefix
--     but a non-numeric tail.
--   - Combined cost is O(log N) reads, not O(N).

-- ─── 1. Add text_pattern_ops index for LIKE 'prefix%' ────────────────────
--
-- We already have a regular btree index on pi_number (R78 migration), but
-- that index can't accelerate LIKE without a matching opclass. Adding
-- the text_pattern_ops variant is the standard fix and is idempotent
-- because we use IF NOT EXISTS.
DROP INDEX IF EXISTS idx_proforma_invoices_pi_number_pattern;
CREATE INDEX IF NOT EXISTS idx_proforma_invoices_pi_number_pattern
  ON proforma_invoices (pi_number text_pattern_ops);

-- ─── 2. RPC: next_pi_number(p_prefix text) RETURNS text ─────────────────
--
-- Returns the next available 4-digit PI number for the given date prefix
-- by looking up the highest existing pi_number that starts with p_prefix
-- and shares the same digit-suffix shape.
--
-- Example:
--   SELECT next_pi_number('SA20261005');
--   -- Returns 'SA202610050003' if 'SA202610050001' and 'SA202610050002'
--   -- already exist in the table; 'SA202610050001' if neither exists.
--
-- SECURITY DEFINER + explicit search_path fix per Supabase best practice
-- (https://supabase.com/docs/guides/database/functions#security-definer).
CREATE OR REPLACE FUNCTION public.next_pi_number(p_prefix text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_max int := 0;
  v_last text;
  v_suffix int;
BEGIN
  -- Guard against garbage input — must look like SA + 8 digits so we
  -- can't be tricked into scanning the whole table on user-controlled
  -- input (the caller is the admin function, but defense in depth).
  IF p_prefix IS NULL OR p_prefix !~ '^SA[0-9]{8}$' THEN
    RAISE EXCEPTION 'next_pi_number: invalid prefix %, expected SA + YYYYMMDD', p_prefix;
  END IF;

  -- Find the largest existing pi_number with this prefix and a numeric
  -- suffix. The text_pattern_ops index makes this an O(log N) range scan
  -- and the LIMIT 1 keeps it constant-bounded.
  SELECT pi_number
    INTO v_last
    FROM proforma_invoices
   WHERE pi_number LIKE p_prefix || '%'
     AND pi_number ~ ('^' || p_prefix || '[0-9]+$')
   ORDER BY pi_number DESC
   LIMIT 1;

  IF v_last IS NULL THEN
    -- No PIs with this prefix yet — start at 0001.
    RETURN p_prefix || '0001';
  END IF;

  -- Extract the suffix (everything after the prefix) and add 1.
  BEGIN
    v_suffix := CAST(SUBSTRING(v_last FROM (LENGTH(p_prefix) + 1)) AS int) + 1;
  EXCEPTION WHEN OTHERS THEN
    -- Should be unreachable because the regex filter above guarantees a
    -- numeric tail, but if anything ever goes wrong fall back to 0001
    -- rather than 500ing the whole PI creation flow.
    RETURN p_prefix || '0001';
  END;

  IF v_suffix > 9999 THEN
    RAISE EXCEPTION 'next_pi_number: prefix % has exhausted all 4-digit suffixes (10000+)', p_prefix;
  END IF;

  RETURN p_prefix || LPAD(v_suffix::text, 4, '0');
END;
$$;

-- Restrict execution to the service role. The service_role JWT bypasses
-- RLS anyway, but pinning grants here keeps the surface area explicit
-- and matches the pattern used by other utility functions in this DB.
REVOKE ALL ON FUNCTION public.next_pi_number(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.next_pi_number(text) FROM anon;
REVOKE ALL ON FUNCTION public.next_pi_number(text) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.next_pi_number(text) TO service_role;
