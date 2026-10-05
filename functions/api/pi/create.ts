// functions/api/pi/create.ts
// Creates a Proforma Invoice (PI) in Supabase.
// Stripe payment intent creation has been stripped out (chunk-size issue with
// the Stripe SDK on Cloudflare Functions). When the front-end needs to charge
// the customer it should hit a separate /api/stripe/* endpoint (to be added
// back when we figure out bundling), or just deep-link to a Stripe Checkout
// session created on demand.

import { normalizeSupabaseUrl } from "../_utils";
interface Env {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

interface SizeBreakdown {
  label: string;
  qty: number;
}

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number; // USD
  fabric?: string;
  unit?: string;
  imageUrl?: string;
  sizes?: SizeBreakdown[]; // optional per-size breakdown
}

interface CreatePiBody {
  piNumber: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    company?: string;
    address?: string;
  };
  items: LineItem[];
  notes?: string;
  // 2026-10-04 (R84): every field the customer-facing /pay/?pi=... page
  // reads. Before R84 we accepted only items + shippingCost + currency
  // + notes, so fabric / image / shipping method / lead time / terms
  // text all silently vanished from the customer view. Now we forward
  // them and persist in the dedicated proforma_invoices columns.
  issueDate?: string;          // YYYY-MM-DD, defaults to today on server
  leadTimeText?: string;
  paymentTermsText?: string;
  shippingLabel?: string;
  shippingMethod?: string;
  shippingCost?: number;       // USD dollars
  currency?: string;           // defaults to USD
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// ─── Helpers ──────────────────────────────────────────────────────────────

/**
 * Returns today's PI prefix, e.g. "SA20261003".
 *
 * Used when the client sent an obviously-default value (SA{date}0001) that
 * already exists in the DB, or when no piNumber is provided at all. The
 * Cloudflare runtime's `new Date()` follows the worker's locale, which by
 * default is UTC — but the admin lives in a specific timezone and creates
 * PIs by their local date. For correctness we should pin this to whatever
 * timezone the admin uses; for now we use UTC and accept that a PI created
 * at 23:50 Beijing time may end up dated to the next day in UTC.
 */
function todayPrefix(d = new Date()): string {
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `SA${yyyy}${mm}${dd}`;
}

/**
 * Look up the next available 4-digit PI number for the given date prefix
 * by delegating to the Supabase RPC `next_pi_number(prefix)`.
 *
 * 2026-10-05 (R113): the previous implementation fetched up to 50 rows
 * with `pi_number LIKE prefix% ORDER BY pi_number DESC LIMIT 50`, which
 * hit Supabase free-tier's statement timeout (PostgreSQL code 57014)
 * once the table grew. The RPC:
 *   - runs an indexed range scan (text_pattern_ops) on the pi_number
 *     prefix and stops at LIMIT 1;
 *   - returns only the single result string, not 50 rows;
 *   - so the planner can answer in O(log N) and PostgREST doesn't have
 *     to ship 50 rows over the wire before each insert retry.
 *
 * Mirrors the logic in /api/pi/next-number.ts — duplicated here so the
 * create path is self-contained (no internal fetch back to the Functions
 * hostname, which would loop on dev / localhost).
 */
async function nextAvailablePiNumber(
  supabaseUrl: string,
  serviceKey: string,
  prefix: string,
): Promise<string> {
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/next_pi_number`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({ p_prefix: prefix }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `nextAvailablePiNumber: RPC failed status=${res.status} body=${detail}`,
    );
  }
  const next = (await res.json()) as string;
  if (typeof next !== "string" || !next) {
    throw new Error(`nextAvailablePiNumber: RPC returned non-string: ${next}`);
  }
  return next;
}

/**
 * Detect "this is a freshly-defaulted piNumber the client sent, not the
 * admin's intent". The admin form (NewPIClient.tsx) seeds piNumber with
 * SA{date}0001 on first render and then asynchronously fetches the real
 * next-available number. If the admin clicks Save before the fetch
 * resolves, or after the fetch errored, the request still ships
 * SA{date}0001. If that number is already taken the unique constraint
 * blows up with a 23505.
 *
 * Heuristic: piNumber matches the default shape AND falls back to
 * `0001` (the only sequence the client ever hard-codes). If the admin
 * typed anything else, we respect their input verbatim and let the
 * 409 surface to the UI as a real error.
 */
function isClientDefault(candidate: string, prefix: string): boolean {
  return new RegExp(`^${prefix}\\d{4}$`).test(candidate) && candidate.endsWith("0001");
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  if (!env.COZE_SUPABASE_URL || !env.COZE_SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse(
      { error: "Supabase credentials not configured" },
      500
    );
  }

  let body: CreatePiBody;
  try {
    body = (await request.json()) as CreatePiBody;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  // Validate required fields
  if (!body.piNumber || !body.customer?.name || !body.customer?.phone) {
    return jsonResponse(
      { error: "Missing required fields: piNumber, customer.name, customer.phone" },
      400
    );
  }
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return jsonResponse({ error: "items must be a non-empty array" }, 400);
  }

  const currency = body.currency || "USD";
  const shippingCostDollars = Number(body.shippingCost) || 0;

  // Convert form's items (dollars, quantity, unitPrice) to the storage format
  // (qty + unit_price_cents + total_cents) so the customer-facing pay page keeps
  // working. sizes are stored verbatim.
  const storedItems = body.items.map((it) => {
    const qty = Number(it.quantity) || 0;
    const unitPriceDollars = Number(it.unitPrice) || 0;
    const unitPriceCents = Math.round(unitPriceDollars * 100);
    const totalCents = unitPriceCents * qty;
    const row: Record<string, unknown> = {
      description: String(it.description || "").trim(),
      fabric: it.fabric ?? null,
      qty,
      unit: it.unit ?? "pcs",
      unit_price_cents: unitPriceCents,
      total_cents: totalCents,
      image_url: it.imageUrl ?? null,
    };
    if (Array.isArray(it.sizes) && it.sizes.length > 0) {
      row.sizes = it.sizes.map((s) => ({
        label: String(s.label || "").trim(),
        qty: Number(s.qty) || 0,
      }));
    }
    return row;
  });

  // Compute totals in cents
  const subtotalCents = storedItems.reduce(
    (sum, row) => sum + (row.total_cents as number),
    0
  );
  const shippingCents = Math.round(shippingCostDollars * 100);
  const totalCents = subtotalCents + shippingCents;

  const supabaseUrl = normalizeSupabaseUrl(env.COZE_SUPABASE_URL);

  // ── Insert (with retry on pi_number collision) ─────────────────────────
  // 2026-10-04 (R81): the admin form seeds piNumber with `SA{date}0001` and
  // asynchronously fetches the real next-available number. If the admin
  // clicks Save before that fetch resolves (or if two admins race), the
  // unique constraint on proforma_invoices.pi_number trips:
  //   23505 duplicate key value violates unique constraint
  //       "proforma_invoices_pi_number_key"
  //
  // Retry strategy:
  //   1. Try the client-supplied piNumber as-is.
  //   2. On 23505, if the candidate matches the obvious default shape
  //      (SA{date}0001), query the actual next-available number for today
  //      and retry once.
  //   3. If the second attempt also 23505s (two concurrent admins
  //      collided), fall back to scanning for an even-higher suffix and
  //      retry up to 3 more times. After MAX_RETRIES, give up and
  //      surface the original error so the admin can refresh and try
  //      again — better than a silent infinite loop.
  //   4. If the candidate was a non-default value the admin typed, do
  //      NOT silently rewrite it — surface the conflict so they know
  //      their chosen number already exists.
  const MAX_RETRIES = 3;
  const prefix = todayPrefix();
  let piNumberToInsert = body.piNumber;
  let insertPayload: Record<string, unknown> = {};
  let insertedId: string | number | undefined;
  let lastErrorDetail: string | null = null;
  let retryReason: "client_default_collision" | "race_collision" | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    insertPayload = {
      pi_number: piNumberToInsert,
      customer_name: body.customer.name,
      customer_email: body.customer.email ?? null,
      customer_phone: body.customer.phone,
      customer_company: body.customer.company ?? null,
      customer_address: body.customer.address ?? null,
      items: storedItems,
      subtotal_cents: subtotalCents,
      shipping_cents: shippingCents,
      total_cents: totalCents,
      currency,
      // 2026-10-02 (R78): admin creates a PI specifically to email a customer
      // a /pay/?pi=... link. Writing 'sent' (instead of legacy 'draft') means
      // /api/pi/{pi_number} will create a Stripe PaymentIntent on first load.
      // SumaryClient already styles 'sent' (blue 'SENT' badge) — no UI churn.
      status: 'sent',
      payment_terms: body.paymentTermsText ?? body.notes ?? '30% deposit, 70% before shipment',
      payment_percentage: 30,
      // 2026-10-04 (R84): every field that used to silently vanish from
      // the customer-facing /pay/?pi=... page. PIDisplay already reads
      // these columns; we just forgot to forward them on insert.
      ...(body.issueDate ? { issue_date: body.issueDate } : {}),
      ...(body.leadTimeText ? { lead_time_text: body.leadTimeText } : {}),
      ...(body.paymentTermsText ? { payment_terms_text: body.paymentTermsText } : {}),
      ...(body.shippingLabel ? { shipping_label: body.shippingLabel } : {}),
      ...(body.shippingMethod ? { shipping_method: body.shippingMethod } : {}),
    };
    if (body.notes) {
      insertPayload.metadata = { notes: body.notes };
    }

    let insertRes: Response;
    try {
      insertRes = await fetch(`${supabaseUrl}/rest/v1/proforma_invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(insertPayload),
      });
    } catch (fetchErr) {
      const msg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
      const name = fetchErr instanceof Error ? fetchErr.name : "UnknownError";
      return jsonResponse(
        {
          error: "Network error reaching Supabase",
          detail: `name=${name}; message=${msg}; url=${supabaseUrl}`,
        },
        500
      );
    }

    if (insertRes.ok) {
      const inserted = (await insertRes.json()) as Array<{ id: string | number }>;
      insertedId = inserted[0]?.id;
      break;
    }

    const text = await insertRes.text();
    lastErrorDetail = `status=${insertRes.status}; body=${text}`;

    // Only retry on PostgreSQL 23505 (unique_violation). Anything else
    // (permission, network, schema) we surface immediately — no point
    // retrying those.
    const isUniqueViolation = text.includes('"code":"23505"');
    if (!isUniqueViolation) {
      return jsonResponse(
        {
          error: "Failed to create PI in Supabase",
          detail: lastErrorDetail,
          supabaseUrl,
        },
        500,
      );
    }

    // Decide what to retry with.
    if (attempt === 0 && isClientDefault(piNumberToInsert, prefix)) {
      // The client shipped the obvious default; look up the real next
      // number and retry.
      retryReason = "client_default_collision";
    } else if (isClientDefault(piNumberToInsert, prefix)) {
      // Defaulted shape but the previous retry still collided (two admins
      // racing). Re-scan and try a higher number.
      retryReason = "race_collision";
    } else {
      // The admin typed a specific piNumber and it already exists — let
      // them know instead of silently picking a different one.
      return jsonResponse(
        {
          error: "Failed to create PI in Supabase",
          detail: lastErrorDetail,
          supabaseUrl,
          hint: `pi_number "${piNumberToInsert}" already exists. Refresh /admin/new-pi/ to fetch a fresh next-available number, or pick a different one manually.`,
        },
        409,
      );
    }

    // Pull the next available piNumber and loop.
    try {
      piNumberToInsert = await nextAvailablePiNumber(
        supabaseUrl,
        env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        prefix,
      );
    } catch (lookupErr) {
      return jsonResponse(
        {
          error: "Failed to create PI in Supabase",
          detail: `lookup-next-number failed: ${lookupErr instanceof Error ? lookupErr.message : String(lookupErr)}; original insert error: ${lastErrorDetail}`,
          supabaseUrl,
        },
        500
      );
    }
  }

  if (insertedId === undefined) {
    // All retries exhausted.
    return jsonResponse(
      {
        error: "Failed to create PI in Supabase",
        detail: `retries exhausted; last error: ${lastErrorDetail}`,
        supabaseUrl,
        hint: retryReason === "race_collision"
          ? "Multiple admins created PIs at the same time. Refresh the page and try again."
          : "Refresh /admin/new-pi/ to fetch a fresh next-available number, or pick a different one manually.",
      },
      500,
    );
  }

  return jsonResponse({
    success: true,
    id: insertedId,
    // 2026-10-04 (R81): surface the *actually-inserted* piNumber so the
    // client can update its displayed value if we rewrote under the hood
    // (rare — only happens when the client shipped the default).
    piNumber: piNumberToInsert,
    piNumberRewritten: piNumberToInsert !== body.piNumber,
    totalCents,
    subtotalCents,
    shippingCents,
    currency,
  });
}
