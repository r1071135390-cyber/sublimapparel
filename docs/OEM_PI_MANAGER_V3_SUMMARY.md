# OEM PI Manager v3 — Implementation Summary

> **Reference doc for the sublimapparel port.**
> Pair with: `docs/SPEC_CUSTOMER_ARCHIVE_AND_STATS.md` (which is the porting plan).
> Source files inspected: `~/.trae-cn/memory/delivery/oem-pi-manager-v3-customers/extracted/`

## Overview

OEM PI Manager v3 (`oem-pi-manager-v3`) is a WordPress plugin sitting in front of Supabase (`proforma_invoices` table) + Stripe Checkout. It went live 2026-10-08; v3 specifically added the **customer archive** features discussed below.

The plugin uses two Supabase projects:
- **MAIN** (project `OEMtshirtsPI`) → owns `proforma_invoices` + `oem_customers` + `next_pi_number()` RPC.
- **BANK** (project `SublimapparelPI`) → read-only mirror of `bank_accounts` with `site_slug = 'oemtshirts'`.

Storage model: bank details hardcoded in PHP, **everything else in Supabase**.

---

## File inventory

| File | Lines | Role |
|---|---|---|
| `oem-pi-manager.php` | 5 KB | Plugin entry — wires hooks, registers admin pages, declares shared JS / CSS. |
| `class-admin.php` | 117 KB | Largest file. Renders Dashboard (stats cards) + Create PI form + **All PIs list** + edit/duplicate modal + nonce/permission gates. The two interesting sections for the port are: lines 280–338 (dashboard KPI cards) and lines 342–416 (All PIs list with status filter). |
| `class-customers.php` | 18 KB | **Customer Archive page** (list / create / edit / delete / re-import) + AJAX search. The `search($term, $limit = 20)` method is what powers the autocomplete in the PI form. |
| `class-supabase.php` | 14 KB | All Supabase REST round-trips. Includes `search_customers`, `find_customer_by_name`, `save_customer`, `delete_customer`, `touch_customer_usage`, plus PI CRUD (`list_pis`, `get_pi_by_number`, `create_pi`, `update_pi`, `delete_pi`) and 3 RPC helpers (`next_pi_number`, `mark_pi_paid`, `update_pi_status`). |
| `class-stripe.php` | 13 KB | Creates checkout sessions + handles webhook (`checkout.session.completed` → mark_pi_paid). |
| `class-bank-accounts.php` | 8 KB | 4 hardcoded bank accounts (USD/EUR/GBP/CNY) with mirror-from-BANK-Supabase + local cache table. |
| `includes/class-bank-webhook.php` | 6 KB | WordPress cron that pulls sublimapparel Supabase bank changes and mirrors them into OEM's `wp_oem_bank_accounts` cache. |
| `sql/20261012_create_oem_customers.sql` | 5 KB | Table + indexes + trigger + RLS + idempotent backfill. The canonical reference for the `customers` table on sublimapparel. |
| `sql/schema-v2.sql` | 6 KB | Earlier `proforma_invoices` schema, kept for archaeological reference. |

---

## Customer Archive — what v3 ships and what's missing

### ✅ Shipped on OEM v3 (port faithfully)

**1. The `oem_customers` table**

```sql
oem_customers (
    id BIGSERIAL PK,
    customer_name TEXT NOT NULL,
    company TEXT, address TEXT, phone TEXT, email TEXT,
    country TEXT, notes TEXT,
    pi_count INTEGER NOT NULL DEFAULT 0,   -- usage stats, filled lazily on PI save
    last_used_at TIMESTAMPTZ,
    created_by BIGINT,                     -- WP user_id (best-effort)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)
```

Three case-insensitive indexes (`LOWER(customer_name)`, `LOWER(COALESCE(company,''))`, `LOWER(COALESCE(email,''))`) drive the autocomplete search.

A `BEFORE UPDATE` trigger touches `updated_at`. RLS is enabled but only `service_role` has a policy.

Backfill: idempotent `INSERT ... GROUP BY LOWER(customer_name), LOWER(email)` from `proforma_invoices`. Two passes — one for rows with email, one for email-less rows that don't conflict on name. Safe to re-run.

**2. Customer Archive admin page (`class-customers.php`)**

Single WP admin page:
- Header: `?msg=saved|deleted|imported|error` notice banner.
- Edit mode (`?edit=ID`): form with `customer_name * / company / phone / email / address / country / notes` + a per-customer PI list table underneath.
- List mode (default): table of customers with `ID · Customer · Company · Phone · Email · PIs · Last used · Actions`.
- "Re-import from existing PIs" button: refetches `proforma_invoices`, dedupes by `(name, email)`, upserts via `save_customer`.
- Delete button is inline-form (with `confirm()`).

Form handling uses the WP `admin-post.php` action pattern with nonces. Three handlers: `handle_save`, `handle_delete`, `handle_import`.

**3. Customer autocomplete in the PI form (`class-admin.php` lines 1406–1528)**

`oemCustomerSearch()` JS function:
- 220ms debounce on `input` event of `#oem-customer-name`.
- POST → `admin-ajax.php` → `action=oem_pi_v3_search_customers`.
- Returns up to 20 cards, each showing `Name` + `Company · Phone · Email`.
- Click a card → fills `customer_name / company / address / phone / email` from the archive; shows `(existing · #ID)` tag.
- Keyboard nav: ArrowUp/Down moves selection, Enter picks, Escape closes, click-outside closes.
- If user edits name after picking → reset to "new entry" mode, re-enable the "Save to archive" checkbox.

This is the centerpiece of the customer-archive UX. It's already battle-tested on OEM.

**4. Supabase CRUD layer (`class-supabase.php`)**

Six methods, all thin PostgREST wrappers:

| Method | Endpoint | Notes |
|---|---|---|
| `search_customers(term, limit)` | `or=(customer_name.ilike.*X*,company.ilike.*X*,email.ilike.*X*)&order=updated_at.desc` | Empty term → just returns `order=updated_at.desc&limit=N` (admin list). |
| `find_customer_by_name(name, email)` | `customer_name=ilike.*X*&limit=10` then PHP-side exact lowercase match | Used before save() to dedupe. |
| `get_customer(id)` | `id=eq.X&limit=1` | |
| `save_customer(data, id)` | `POST /oem_customers` or `PATCH /oem_customers?id=eq.X` | Strips `id`, `created_at`, `pi_count`, `last_used_at` from body so client can't tamper. |
| `delete_customer(id)` | `DELETE /oem_customers?id=eq.X` | |
| `touch_customer_usage(id)` | GET-then-PATCH (PostgREST doesn't support arithmetic in PATCH) | Increments `pi_count` + sets `last_used_at` to NOW(). |

`row_to_camel()` and `camel_to_snake_keys()` keep the public PHP API camelCase while talking to Supabase in snake_case.

### ❌ NOT shipped on OEM v3 (designed in SPEC §B)

These are **new design work**, not porting:

- **Customer filter dropdown on All PIs** — the All PIs page (`render_list()` around line 342) only has status filter links (`All | 草稿 | 待付款 | 已支付 | 已取消`) at the top. There's no customer filter, and no `customer_id` query to Supabase.
- **Amount-column sub-header with per-currency totals** — the All PIs table has rows but no inline aggregation row above the Amount column. The closest analogue is the Dashboard's KPI cards (Total / Draft / Sent / Paid / Cancelled) and the single "Paid total across all currencies" line, which live ABOVE the table (not inside it).
- **Quick-stats footer on customer edit page** — OEM instead renders the full per-customer PI list inline in the edit form (lines 207–227). Heavy page; sublimapparel should switch to a 1-line footer + centralize the PI list on the All PIs page.

---

## Stats / aggregation math (OEM reference for the new sub-header)

OEM v3 Dashboard (`render_dashboard()` lines 280–338) computes "paid" like this:

```php
$stats = $sb->stats_by_status();   // returns ['total'=N,'draft'=N,'sent'=N,'paid'=N,'cancelled'=N,'by_currency'=>[CUR=>cents]]

// Re-count paid using both status and paid_at (the webhook should set status='paid',
// but if the RPC only stamped paid_at we still want the dashboard total to
// reflect real revenue).
$all = $sb->list_pis(null, 200);
$paid_real = 0; $paid_total = 0;
foreach ($all as $p) {
    $s   = (string)($p['status'] ?? '');
    $pa  = $p['paidAt'] ?? $p['paid_at'] ?? null;
    $is_paid = ($s === 'paid')
            || in_array(strtolower($s), ['paid','succeeded','completed','true'], true)
            || (!empty($pa) && $pa !== 'null' && $pa !== '0001-01-01 00:00:00');
    if ($is_paid) {
        $paid_real++;
        $paid_total += (int)($p['totalCents'] ?? 0);
    }
}
```

**Three insights to lift into sublimapparel's Amount sub-header:**

1. A PI is "paid" if **status === 'paid'** OR **paid_at is set** OR **status is one of `paid/succeeded/completed/true`**. The webhook may set `paid_at` without updating `status` — the admin-facing math must respect both.
2. Cancelled PIs must be **excluded from total/paid/pending** but their **count** is shown separately.
3. **Multi-currency aggregation is per-currency** — no FX conversion, no silent USD-only display. Each currency gets its own line.

These three rules are baked into the SPEC's `aggregateByCurrency()` pseudocode (§3.2C) and are the only OEM math worth lifting verbatim.

---

## What OEM does NOT do that we'll need on sublimapparel

- ✅ OEM ships `customer_name / company / address / phone / email / country / notes` (7 fields). Spec keeps all 7.
- ❌ OEM does not track "first PI date" — only `last_used_at`. Spec adds `pi_count` + `last_used_at` only, matches OEM.
- ❌ OEM does not store per-customer "favorite shipping method" or any per-customer PI templates. Spec doesn't either — out of scope.
- ❌ OEM does not have per-customer revenue rollup (total spend by this customer across PIs). Spec doesn't either — out of scope for v1; could be a `customer_totals` view added later.
- ❌ OEM's customer edit page shows the full PI list inline. Spec replaces with a 1-line footer + leverage All PIs `?customer_id=N` for the full list.

---

## Implementation reality check (TL;DR)

OEM v3 already proves the **data model + admin UI + autocomplete** end-to-end. That's 60% of the work; risk is near zero because porting a SQL DDL + a CRUD layer is mechanical.

The remaining 40% is **two new pieces** (All PIs customer filter + Amount sub-header). These are not in OEM and need to be designed from scratch using the OEM stats math as a reference. SPEC §B covers them in detail.

If SPEC Phases A → B → C are followed:
- Phase A = port the verified SQL + CRUD + admin page + autocomplete = low risk.
- Phase B = add the two new UI pieces = medium risk, needs visual QA on the sub-header placement.
- Phase C = small UX polish (quick-stats footer, `+ Archive` from All PIs, etc.) = low risk.
