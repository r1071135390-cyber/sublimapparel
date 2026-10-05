// functions/api/admin/bank-accounts.ts
//
// 2026-10-05 (R103): admin CRUD endpoint for bank_accounts table.
//
// GET /api/admin/bank-accounts
//   Returns all bank_accounts rows for the active site_slug
//   (default 'sublimapparel'). Used by /admin/bank-accounts/ to hydrate
//   the form and by /pay/ PayClient to pick the right account for the
//   PI's currency.
//
// PUT /api/admin/bank-accounts
//   Body: { currency: 'usd'|'eur'|'gbp'|'cny', ...BankAccount fields }
//   Upserts a row keyed on (site_slug, currency). Triggers the
//   updated_at bump automatically.
//
// Why this endpoint and not the next-on-pages /api/... route:
//   The /api/pi/* family lives in functions/api/pi/*.ts and uses the
//   service role key directly. /pay/ PayClient calls the same endpoints
//   via fetch('/api/pi/...'). Keeping bank-accounts in the same place
//   means one auth surface (service role) and one CORS posture.
//
// Note: this endpoint is INTERNAL. The admin page is noindex/nofollow
// and admin pages don't require login today (same as the rest of /admin/*).
// The RLS deny-all on bank_accounts means the only way bank details
// leave Supabase is through this function, which only the server bundle
// can call with the service role key.

interface Env {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
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

async function handleGet(env: Env): Promise<Response> {
  const url =
    `${env.COZE_SUPABASE_URL}/rest/v1/bank_accounts` +
    `?site_slug=eq.${SITE_SLUG}` +
    `&select=id,site_slug,currency,label,symbol,beneficiary,company_address,bank_name,account,swift,bank_address,iban,bank_country,routing_number,cnaps,intermediary_bank,notes,created_at,updated_at` +
    `&order=currency.asc`;

  const res = await fetch(url, {
    headers: {
      apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
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

async function handlePut(request: Request, env: Env): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const validation = validateBody(body);
  if (!validation.ok) {
    return json({ error: validation.error }, 400);
  }
  const data = validation.data;

  // Use PostgREST upsert via Prefer: resolution=merge-duplicates so we can
  // update on conflict. The unique constraint is (site_slug, currency).
  const url = `${env.COZE_SUPABASE_URL}/rest/v1/bank_accounts?on_conflict=site_slug,currency`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
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
  return json({ ok: true, account: rows[0] });
}

export async function onRequestGet(ctx: { env: Env }): Promise<Response> {
  return handleGet(ctx.env);
}

export async function onRequestPut(ctx: {
  request: Request;
  env: Env;
}): Promise<Response> {
  return handlePut(ctx.request, ctx.env);
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
