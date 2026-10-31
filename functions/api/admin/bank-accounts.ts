// functions/api/admin/bank-accounts.ts
//
// 2026-10-05 (R103): admin CRUD endpoint for bank_accounts table.
//
// 2026-10-27 (R125): ADMIN_TOKEN authentication added — fail-closed.
// This endpoint leaks bank account numbers (SWIFT, IBAN, account number)
// and must NOT be accessible without a valid bearer token. Unauthorised
// requests receive 403 even when the token is missing.
//
// GET /api/admin/bank-accounts
//   Returns all bank_accounts rows for the active site_slug
//   (default 'sublimapparel'). Used by /administered/bank-accounts/ to hydrate
//   the form and by /pay/ PayClient to pick the right account for the
//   PI's currency. Requires ADMIN_TOKEN bearer.
//
// PUT /api/admin/bank-accounts
//   Body: { currency: 'usd'|'eur'|'gbp'|'cny', ...BankAccount fields }
//   Upserts a row keyed on (site_slug, currency). Triggers the
//   updated_at bump automatically. Requires ADMIN_TOKEN bearer.
//   R132: owner role only — an "admin" account may read the accounts
//   but may not change them.
//   POST-PUT (R115): also pushes the new row to OEMTSHIRTS_BANK_WEBHOOK_URL
//   so the WordPress PI plugin at oemtshirts.com can sync. Signature
//   header is HMAC-SHA256 of the raw body using OEMTSHIRTS_BANK_WEBHOOK_SECRET.

import { requireAdmin, requireRole } from "../_admin-auth";

interface Env {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
  // R115: cross-site bank info push. If both are set, every successful PUT
  // POSTs the new row to OEMTSHIRTS_BANK_WEBHOOK_URL with an HMAC signature.
  OEMTSHIRTS_BANK_WEBHOOK_URL?: string;
  OEMTSHIRTS_BANK_WEBHOOK_SECRET?: string;
  // R125: required bearer token for admin access
  ADMIN_TOKEN?: string;
  // R132: roster of individual admin accounts (owner / admin roles)
  ADMIN_USERS?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
  waitUntil?: (promise: Promise<unknown>) => void;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};

const SITE_SLUG = "sublimapparel";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: CORS_HEADERS,
  });
}

interface BankAccountRow {
  id: number;
  site_slug: string;
  currency: string;
  label: string;
  symbol: string;
  beneficiary: string;
  company_address: string;
  bank_name: string;
  account: string;
  swift: string;
  bank_address: string;
  iban: string | null;
  bank_country: string | null;
  routing_number: string | null;
  cnaps: string | null;
  intermediary_bank: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface BankAccountBody {
  currency: string;
  label: string;
  symbol: string;
  beneficiary: string;
  company_address: string;
  bank_name: string;
  account: string;
  swift: string;
  bank_address: string;
  iban?: string | null;
  bank_country?: string | null;
  routing_number?: string | null;
  cnaps?: string | null;
  intermediary_bank?: string | null;
  notes?: string | null;
}

const SUPPORTED_CURRENCIES = new Set(["usd", "eur", "gbp", "cny"]);

function validateBody(body: unknown): { ok: true; data: BankAccountBody } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Body must be a JSON object" };
  }
  const b = body as Record<string, unknown>;
  const required: (keyof BankAccountBody)[] = [
    "currency",
    "label",
    "symbol",
    "beneficiary",
    "company_address",
    "bank_name",
    "account",
    "swift",
    "bank_address",
  ];
  for (const key of required) {
    const v = b[key];
    if (typeof v !== "string" || v.trim() === "") {
      return { ok: false, error: `Missing or empty field: ${key}` };
    }
  }
  const currency = (b.currency as string).toLowerCase();
  if (!SUPPORTED_CURRENCIES.has(currency)) {
    return {
      ok: false,
      error: `Unsupported currency '${currency}'. Supported: usd, eur, gbp, cny.`,
    };
  }
  return {
    ok: true,
    data: {
      currency,
      label: b.label as string,
      symbol: b.symbol as string,
      beneficiary: b.beneficiary as string,
      company_address: b.company_address as string,
      bank_name: b.bank_name as string,
      account: b.account as string,
      swift: b.swift as string,
      bank_address: b.bank_address as string,
      iban: (b.iban as string | null) ?? null,
      bank_country: (b.bank_country as string | null) ?? null,
      routing_number: (b.routing_number as string | null) ?? null,
      cnaps: (b.cnaps as string | null) ?? null,
      intermediary_bank: (b.intermediary_bank as string | null) ?? null,
      notes: (b.notes as string | null) ?? null,
    },
  };
}

// R115: HMAC-SHA256 hex digest using Web Crypto. Works on Cloudflare Workers
// without any Node.js polyfill. Returns lowercase hex (64 chars).
async function hmacSha256Hex(secret: string, payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// R115: push the new row to OEMtshirts. Never throws — failures are logged
// only, because the Supabase row is already saved and the admin should not
// see a 500 just because OEMtshirts is briefly down. Re-saving the same
// row retries the push automatically.
async function pushToOemtshirts(row: BankAccountRow, env: Env): Promise<void> {
  const url = env.OEMTSHIRTS_BANK_WEBHOOK_URL;
  const secret = env.OEMTSHIRTS_BANK_WEBHOOK_SECRET;
  if (!url || !secret) {
    return;
  }
  const payload = JSON.stringify({
    source: "sublimapparel",
    event: "bank_account.upserted",
    account: row,
  });
  try {
    const sig = await hmacSha256Hex(secret, payload);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Signature": `sha256=${sig}`,
        "X-Webhook-Source": "sublimapparel",
        "X-Webhook-Event": "bank_account.upserted",
      },
      body: payload,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "(no body)");
      console.warn(
        `[bank-accounts PUT] OEMtshirts webhook returned ${res.status}: ${text.slice(0, 200)}`,
      );
    } else {
      console.log(`[bank-accounts PUT] OEMtshirts webhook OK (${res.status}) for ${row.currency}`);
    }
  } catch (err) {
    console.warn(`[bank-accounts PUT] OEMtshirts webhook failed:`, err);
  }
}

async function handleGet(ctx: PagesContext): Promise<Response> {
  // ── ADMIN_TOKEN guard ──────────────────────────────────────────────
  const guard = requireAdmin(ctx.request, new URL(ctx.request.url), ctx.env);
  if (guard) return guard;
  // ─────────────────────────────────────────────────────────────────

  const url =
    `${ctx.env.COZE_SUPABASE_URL}/rest/v1/bank_accounts` +
    `?site_slug=eq.${SITE_SLUG}` +
    `&select=id,site_slug,currency,label,symbol,beneficiary,company_address,bank_name,account,swift,bank_address,iban,bank_country,routing_number,cnaps,intermediary_bank,notes,created_at,updated_at` +
    `&order=currency.asc`;

  const res = await fetch(url, {
    headers: {
      apikey: ctx.env.COZE_SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${ctx.env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`[bank-accounts GET] Supabase fetch failed: ${errText}`);
    return json({ error: "Database read failed" }, 500);
  }

  const rows = (await res.json()) as BankAccountRow[];
  return json({ ok: true, accounts: rows });
}

async function handlePut(ctx: PagesContext): Promise<Response> {
  // ── R132: owner-only guard ─────────────────────────────────────────
  // Writing the receiving accounts changes where real money lands, so
  // it stays with the owner account even when the roster has admins on it.
  const guard = requireRole(ctx.request, new URL(ctx.request.url), ctx.env, "owner");
  if (guard) return guard;
  // ─────────────────────────────────────────────────────────────────

  let body: unknown;
  try {
    body = await ctx.request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const validation = validateBody(body);
  if (!validation.ok) {
    return json({ error: validation.error }, 400);
  }
  const data = validation.data;

  const url = `${ctx.env.COZE_SUPABASE_URL}/rest/v1/bank_accounts?on_conflict=site_slug,currency`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: ctx.env.COZE_SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${ctx.env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify([{
      site_slug: SITE_SLUG,
      currency: data.currency,
      label: data.label,
      symbol: data.symbol,
      beneficiary: data.beneficiary,
      company_address: data.company_address,
      bank_name: data.bank_name,
      account: data.account,
      swift: data.swift,
      bank_address: data.bank_address,
      iban: data.iban ?? null,
      bank_country: data.bank_country ?? null,
      routing_number: data.routing_number ?? null,
      cnaps: data.cnaps ?? null,
      intermediary_bank: data.intermediary_bank ?? null,
      notes: data.notes ?? null,
    }]),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`[bank-accounts PUT] Supabase upsert failed: ${errText}`);
    return json({ error: "Database write failed", detail: errText }, 500);
  }

  const rows = (await res.json()) as BankAccountRow[];

  if (ctx.waitUntil) {
    ctx.waitUntil(pushToOemtshirts(rows[0], ctx.env));
  } else {
    void pushToOemtshirts(rows[0], ctx.env);
  }

  return json({ ok: true, account: rows[0] });
}

export async function onRequestGet(ctx: { env: Env; request: Request }): Promise<Response> {
  return handleGet({ env: ctx.env, request: ctx.request });
}

export async function onRequestPut(ctx: PagesContext): Promise<Response> {
  return handlePut(ctx);
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
