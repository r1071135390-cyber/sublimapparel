# SPEC — Customer Archive + Per-Customer PI Filter + Amount Aggregation

> **Status:** Draft for sublimapparel.com (Next.js + Cloudflare Pages + Supabase + Stripe).
> **Source pattern:** Validated on OEMtshirts WordPress plugin `oem-pi-manager-v3` (2026-10-12).
> **Goal:** Port the three UX upgrades — customer archive, customer filter on All PIs, dynamic currency-aware totals — onto sublimapparel's existing Next.js stack with the same data shape.

---

## 1. Background — what worked on OEM

The OEM PI Manager shipped three features that meaningfully improved the PI workflow:

1. **`oem_customers` archive table** — owners can pre-fill a customer's company / address / phone / email when typing the customer name in a new PI; one row per `(name, email)` deduped automatically.
2. **Customer filter on All PIs page** — dropdown sourced from the archive; selecting a customer narrows the PI list to just their PIs without losing the existing status filter.
3. **Dynamic amount aggregation** — for the currently visible PIs (after all filters), show **total / paid / pending** grouped by currency, with **cancelled PIs excluded** from revenue.

On top of that:

- **Customer edit page** got a back-link to All PIs, and a one-line footer with `PI count · last used · see on All PIs →`.
- **The aggregated totals sit in a sub-header row directly above the `Amount` column** (so the eye doesn't have to scan a separate panel).
- **Multi-currency PIs** are aggregated per-currency — no silent USD conversion, no FX rounding errors.

---

## 2. Data model

### 2.1 `customers` table — new

Same shape as `oem_customers`, just renamed for the site's vocabulary and adjusted column types to match what Supabase already uses in `proforma_invoices` (camelCase JSON via PostgREST).

```sql
-- 20261013_customers_archive.sql
CREATE TABLE IF NOT EXISTS customers (
    id              BIGSERIAL PRIMARY KEY,
    customer_name   TEXT        NOT NULL,
    company         TEXT,
    address         TEXT,
    phone           TEXT,
    email           TEXT,
    country         TEXT,
    notes           TEXT,
    pi_count        INTEGER     NOT NULL DEFAULT 0,
    last_used_at    TIMESTAMPTZ,
    created_by      BIGINT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customers_name_lower  ON customers (LOWER(customer_name));
CREATE INDEX IF NOT EXISTS idx_customers_company_lwr ON customers (LOWER(COALESCE(company, '')));
CREATE INDEX IF NOT EXISTS idx_customers_email_lower ON customers (LOWER(COALESCE(email, '')));

-- Dedupe: same lowercased name + same lowercased-or-empty email = same customer.
CREATE UNIQUE INDEX IF NOT EXISTS idx_customers_dedupe
    ON customers (LOWER(customer_name), COALESCE(LOWER(email), ''));

-- Auto-touch updated_at
CREATE OR REPLACE FUNCTION customers_touch_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_customers_touch_updated_at ON customers;
CREATE TRIGGER trg_customers_touch_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW EXECUTE FUNCTION customers_touch_updated_at();

-- Only service_role can read/write (matches other tables' RLS posture).
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS customers_service_all ON customers;
CREATE POLICY customers_service_all ON customers
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Backfill from existing PIs (idempotent). Mirrors OEM's backfill:
-- groups proforma_invoices by LOWER(customer_name), COALESCE(LOWER(customer_email), ''),
-- inserts missing rows. `pi_count` and `last_used_at` are populated in the same statement.
DO $$
DECLARE rcount INT;
BEGIN
    INSERT INTO customers (customer_name, company, address, phone, email, country, pi_count, last_used_at)
    SELECT
        customer_name                                                  AS customer_name,
        MAX(NULLIF(TRIM(customer_company), ''))                         AS company,
        MAX(NULLIF(TRIM(customer_address), ''))                         AS address,
        MAX(NULLIF(TRIM(customer_phone), ''))                           AS phone,
        MAX(NULLIF(LOWER(TRIM(customer_email)), ''))                    AS email,
        NULL                                                            AS country,
        COUNT(*)                                                        AS pi_count,
        MAX(created_at)                                                 AS last_used_at
    FROM proforma_invoices
    WHERE NULLIF(TRIM(customer_name), '') IS NOT NULL
    GROUP BY LOWER(customer_name), COALESCE(LOWER(customer_email), '')
    ON CONFLICT (LOWER(customer_name), COALESCE(LOWER(email), ''))
    DO NOTHING;
    GET DIAGNOSTICS rcount = ROW_COUNT;
    RAISE NOTICE 'Backfilled % customer(s)', rcount;
END $$;
```

> **Why country stays NULL on backfill:** `proforma_invoices` has no `country` column. Owners can fill it manually in the Customer Archive page. New PI form doesn't display country anyway, so users see no behavior change.

### 2.2 Optional view — joins customer back onto PIs

```sql
CREATE OR REPLACE VIEW v_proforma_with_customer AS
SELECT
    pi.*,
    c.id            AS customer_id,
    c.company       AS customer_company_archive,
    c.address       AS customer_address_archive,
    c.phone         AS customer_phone_archive,
    c.country       AS customer_country_archive
FROM proforma_invoices pi
LEFT JOIN customers c
       ON LOWER(c.customer_name) = LOWER(pi.customer_name)
      AND COALESCE(LOWER(c.email), '') = COALESCE(LOWER(pi.customer_email), '');
```

This lets All PIs list pages query one row per PI and get the archived customer fields without N+1 lookups.

---

## 3. Feature breakdown for sublimapparel

### 3.1 `/admin/customers` — Customer Archive page (new)

Route: `src/app/admin/customers/page.tsx` + `CustomersClient.tsx`.

UI:
- Top bar: search input (debounced 200ms) + "Add customer manually" button
- Two views in a single page: **List** (default) and **Edit / Create** (when `?id=...` or `?new=1`)
- List table columns: `ID · Customer · Company · Country · Phone · Email · PIs · Last used · Actions`
- Edit form fields: `customer_name * · company · phone · email · address · country · notes`
- Save button uses Next.js Server Action → calls a Cloudflare Function `/api/admin/customers/save`

Mirrors OEM's `class-customers.php::render_admin_page()` exactly:
- `?edit=ID` opens edit form
- `?msg=saved|deleted|imported|error` shows a small blue/red banner
- "Re-import from existing PIs" button calls `/api/admin/customers/reimport`

### 3.2 `/admin/summary` (existing) — add customer filter + sub-header totals

This is the most valuable screen in OEM. Two additive changes:

#### A. Customer filter dropdown (top of the page)

Add a `<select>` next to the existing status filter:

```tsx
// pseudo — see SummaryClient.tsx for current style
const [customerId, setCustomerId] = useState<string>("");
const [customers, setCustomers] = useState<Array<{id:number; name:string; company:string; pi_count:number}>>([]);

useEffect(() => {
  fetch("/api/admin/customers/list").then(r => r.json()).then(j => setCustomers(j.rows ?? []));
}, []);

// in the toolbar:
<select value={customerId} onChange={e => setCustomerId(e.target.value)}>
  <option value="">All customers</option>
  {customers.map(c => (
    <option key={c.id} value={c.id}>
      {c.name} — {c.company || "(no company)"} ({c.pi_count})
    </option>
  ))}
</select>
```

Customer filter must **preserve the status filter** (and vice versa). URL params: `?status=paid&customer_id=42`. Both apply with AND.

#### B. Sub-header row inside the table — directly above `Amount` column

This is the key UX win. Instead of a separate stats panel above the table, drop a `<tr>` into `<thead>` between the header row and the data rows. Place the totals cell so it sits directly above the `Amount` column.

Visual spec:
- Background: `#fff8e1` (light yellow)
- Top border: `2px solid #f0b400` (gold)
- Padding: `6px 10px`
- Font: same size as data, semibold, right-aligned
- One line per currency: `<total> <CUR> total · <paid> <CUR> paid (<pct>%, <n> PI) · <pending> <CUR> pending · <cancelled_count> cancelled · <n> PI(s)`
- Color coding:
  - total → `#0d47a1` (blue)
  - paid → `#388e3c` (green)
  - pending → `#cc3d00` (orange)
  - cancelled → `#999` (grey)

Multi-currency split: each currency is its own line separated by `<br>`. Empty when there are no billable PIs: render `No billable PIs` in italic grey, span only the Amount column.

#### C. Aggregation logic (TSX, computed client-side from the same filtered array)

```ts
interface CurrencyTotals {
  total: number; paid: number; pending: number;
  count: number; paidCount: number; cancelledCount: number;
}

function aggregateByCurrency(pis: PiListItem[]): Record<string, CurrencyTotals> {
  const out: Record<string, CurrencyTotals> = {};
  for (const p of pis) {
    const cur = (p.currency || "USD").toUpperCase();
    if (!out[cur]) out[cur] = {
      total: 0, paid: 0, pending: 0,
      count: 0, paidCount: 0, cancelledCount: 0,
    };
    const cents = Number(p.totalCents || 0);
    const status = (p.status || "").toLowerCase();
    const isPaid = status === "paid"
      || status === "succeeded"
      || status === "completed"
      || status === "true"
      || Boolean(p.paidAt) && p.paidAt !== "0001-01-01 00:00:00";
    const isCancelled = status === "cancelled" || status === "canceled";

    if (isCancelled) { out[cur].cancelledCount++; continue; }
    out[cur].total += cents;
    out[cur].count++;
    if (isPaid) { out[cur].paid += cents; out[cur].paidCount++; }
    else        { out[cur].pending += cents; }
  }
  return out;
}
```

> **Critical:** Cancelled PIs are excluded from `total / paid / pending` to avoid inflating revenue. Their count is shown separately so the admin knows they exist.

### 3.3 `/admin/new-pi` — customer autocomplete pre-fill (existing page, minor addition)

When the admin types into the `customer_name` field:
- Debounce 200ms
- `GET /api/admin/customers/search?term=...` returns up to 20 matches
- Show a small dropdown under the input: `<Name> — <Company>`
- Click → fill `customer_company`, `customer_address`, `customer_phone`, `customer_email`, `customer_country` from the archived row
- Escape key closes dropdown

Implementation: mirror OEM's `OEM_PI_V3_Customers::search()` — call the Supabase REST endpoint from a Cloudflare Function that holds the service role key (RLS is open to service_role only).

### 3.4 Customer name link on All PIs list (small edit)

In `SummaryClient.tsx`, change the customer name cell from plain text to a `<Link href={\`/admin/customers?id=\${row.customerId}\`}>` (use the `customer_id` returned by the optional `v_proforma_with_customer` view). When the row has no `customer_id` (customer not archived yet), keep it as plain text and add a small "+ Archive" button next to it that POSTs to `/api/admin/customers/save` and then links through.

### 3.5 Customer edit page — back-link + quick stats

In `/admin/customers?id=N` (edit mode):
- Top: `< Back to All PIs` link → `/admin/summary`
- Top: `View this customer's PIs on All PIs page ↗` link → `/admin/summary?customer_id=N`
- Bottom (after the form): a one-line footer
  ```
  <N> PI(s) recorded for this customer · last used: <YYYY-MM-DD HH:MM:SS> · See them on All PIs page →
  ```
- **Do NOT render the full PI list** here — keep that list centralized on All PIs.

---

## 4. Implementation map — where the code lives

| Feature | sublimapparel location | Mirrors OEM |
|---|---|---|
| `customers` table + backfill SQL | `supabase/migrations/20261013_customers_archive.sql` | `plugins/oem-pi-manager-v3/sql/20261012_create_oem_customers.sql` |
| `customers_touch_updated_at` trigger | same migration | OEM SQL file lines 41-53 |
| Customer CRUD Cloudflare Function | `functions/api/admin/customers/[[id]].ts` (GET list / GET one / POST save / DELETE) | OEM `class-supabase.php::search_customers/find_customer_by_name/get_customer/save_customer/delete_customer` |
| Customer search API for autocomplete | `functions/api/admin/customers/search.ts` | OEM `OEM_PI_V3_Customers::search()` |
| Customer re-import (one-click backfill) | `functions/api/admin/customers/reimport.ts` | OEM `OEM_PI_V3_Customers::handle_import()` |
| Touch usage on PI save | `functions/api/pi/create.ts` (add `customer_id` + increment `pi_count`) | OEM `class-stripe.php` or post-create RPC |
| Customer archive admin page | `src/app/admin/customers/page.tsx` + `CustomersClient.tsx` | OEM `class-customers.php::render_admin_page()` |
| All PIs filter + sub-header | `src/app/admin/summary/SummaryClient.tsx` (edit existing) | OEM `class-admin.php::render_list()` |
| New PI form pre-fill | `src/app/admin/new-pi/NewPIClient.tsx` (edit existing) | OEM `class-customers.php::search()` |
| Customer name link on All PIs | `src/app/admin/summary/SummaryClient.tsx` (edit existing) | OEM `class-admin.php` customer column |

---

## 5. Risks and mitigations

| Risk | Mitigation |
|---|---|
| `customer_name` casing differs between rows | Use `LOWER()` everywhere: search index, dedupe unique index, all joins. Already standard practice on OEM. |
| Customer archived under different email than PI uses | Link by `LOWER(name)` only when both names match AND emails are equal OR empty. Never silently merge second-user names. |
| Browser caches `/favicon.ico` after icon swap | Force `metadata.icons` to only `/icon.png`, delete any `favicon.ico` from `public/`. |
| TSX ↔ Supabase row casing (snake_case vs camelCase) | Use a `row_to_camel` style helper in `src/lib/supabase.ts`. |
| Cancelled PIs inflate revenue | `aggregateByCurrency` skips them on `total`, surfaces in a separate count. |
| Mixed currency in totals panel | One line per currency, no FX conversion. Rely on admin's eye; document this in the panel tooltip. |
| Customer filter loses status filter | Both as URL params; preserve both on every filter change. |
| New PI form auto-fill overwrites already-typed data | Only fill empty fields; never overwrite non-empty fields without a small "Replace with archive data" button. |
| Re-import double-creates rows | `INSERT ... ON CONFLICT DO NOTHING` on dedupe index. |
| Touch `pi_count` on every PI save | Use a Cloudflare Function call to a Postgres RPC `touch_customer_usage(customer_id, created_at)`, idempotent via UPSERT semantics. |

---

## 6. Phased rollout

**Phase A — read-only (no risk, immediate value):**
1. Run the SQL migration → `customers` table exists, backfilled with all current customers.
2. Add the customer filter dropdown to `/admin/summary`.
3. Add the sub-header totals row above the Amount column.

**Phase B — write:**
4. Build `/admin/customers` page (list + create + edit + delete).
5. Add "Re-import from existing PIs" button (idempotent, safe to re-run).
6. Wire `customer_name` click in `/admin/summary` → `/admin/customers?id=...`.

**Phase C — UX polish:**
7. Wire `/admin/new-pi` autocomplete pre-fill from archive.
8. Add `pi_count` touch-up on every PI create (RPC).
9. Add "Quick stats footer" on `/admin/customers` edit page.

Phases A → B → C are independent; each can ship and be verified on production without breaking the other.

---

## 7. Acceptance criteria

- [ ] `/admin/summary` shows customer dropdown that filters the PI list when selected
- [ ] Status filter and customer filter compose with AND; both preserved when changing either
- [ ] Sub-header row sits directly above the `Amount` column with the exact colors above
- [ ] Multi-currency PIs render one sub-header line per currency
- [ ] Cancelled PIs are excluded from total/paid/pending; their count is shown
- [ ] Empty filtered result shows `No billable PIs` in the sub-header
- [ ] `/admin/customers` lists all archived customers with their PI counts
- [ ] Re-import button does not create duplicates on re-run
- [ ] `/admin/new-pi` autocomplete pre-fills company/address/phone/email/country from archive
- [ ] Customer name in `/admin/summary` is a link to `/admin/customers?id=...`
- [ ] `/admin/customers?id=...` shows back-link + quick stats footer; no full PI list

---

## 8. References (OEM source files)

All patterns in this spec come from these files (already shipped and verified on OEM):

- `plugins/oem-pi-manager-v3/sql/20261012_create_oem_customers.sql` — table + backfill
- `plugins/oem-pi-manager-v3/class-supabase.php` — `search_customers`, `find_customer_by_name`, `get_customer`, `save_customer`, `delete_customer`, `touch_customer_usage`
- `plugins/oem-pi-manager-v3/class-customers.php` — admin page, autocomplete, edit form
- `plugins/oem-pi-manager-v3/class-admin.php::render_list()` — customer filter + sub-header totals