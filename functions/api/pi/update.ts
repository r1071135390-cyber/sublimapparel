// functions/api/pi/update.ts
// Edits a Proforma Invoice. Snapshots the pre-edit row to
// proforma_invoices_revisions, then PATCHes proforma_invoices.
//
// 2026-10-04 (R84): backs the /admin/edit-pi/ page. Hard rules:
//   1. Only PIs with status IN ('draft', 'sent') are editable. PAID /
//      pending_bank / canceled / expired all return 409 with a hint
//      explaining why. This matches the product decision ("only
//      draft/sent are editable") and protects audit data integrity
//      once money has actually changed hands.
//   2. pi_number is immutable. You can edit anything else; if you
//      want a different number, create a new PI. (Editing the number
//      would orphan every Stripe webhook reference and every /pay/?pi=
//      URL the customer already received.)
//   3. Snapshot-then-update happens in a single Function call. The
//      snapshot is the only place pre-edit state is preserved —
//      revisions are NEVER cascaded when a PI is deleted (R82),
//      because the audit trail outliving the PI is the whole point.
//   4. valid_until defaults to issue_date + 14 days when not provided,
//      matching the Excel template convention. Admin can override.
//
// Auth: same model as delete.ts — relies on the /admin/summary/ password
// gate. We do not add a second check; the gate is the only thing
// standing between the URL and the data.

import { normalizeSupabaseUrl } from "../_utils";

interface Env {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

const EDITABLE_STATUSES = new Set(["draft", "sent"]);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
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

// Mirrors NewPIClient.tsx -> create.ts. Every field is optional except
// piNumber — we partial-update so the admin can edit any subset without
// having to re-send everything.
interface UpdateBody {
  piNumber: string;
  changeNote?: string;

  customer?: {
    name?: string;
    email?: string | null;
    phone?: string;
    company?: string | null;
    address?: string | null;
  };
  items?: Array<{
    description: string;
    fabric?: string | null;
    quantity: number;
    unit?: string | null;
    unitPrice: number;
    imageUrl?: string | null;
    sizes?: { label: string; qty: number }[] | null;
  }>;
  shippingCost?: number;
  shippingLabel?: string;
  shippingMethod?: string;
  leadTimeText?: string;
  paymentTermsText?: string;
  issueDate?: string; // YYYY-MM-DD
  validUntil?: string | null; // YYYY-MM-DD or null to keep current
  currency?: string;
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

  let body: UpdateBody;
  try {
    body = (await request.json()) as UpdateBody;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const piNumber = (body.piNumber ?? "").trim();
  if (!piNumber) {
    return jsonResponse({ error: "piNumber is required" }, 400);
  }
  if (!/^SA\d{8}\d{4}$/.test(piNumber)) {
    return jsonResponse(
      { error: "piNumber must match SA + 8 digits + 4 digits" },
      400,
    );
  }

  const supabaseUrl = normalizeSupabaseUrl(env.COZE_SUPABASE_URL);
  const authHeaders = {
    apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
  };

  // 1) Load the current row. We need its id, status, and a full snapshot
  //    for the revisions table.
  const lookupRes = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?pi_number=eq.${encodeURIComponent(piNumber)}&limit=1`,
    { headers: authHeaders },
  );

  if (!lookupRes.ok) {
    const text = await lookupRes.text();
    return jsonResponse(
      { error: "Lookup failed", detail: text, supabaseUrl },
      500,
    );
  }

  const rows = (await lookupRes.json()) as Array<Record<string, unknown>>;
  if (rows.length === 0) {
    return jsonResponse({ error: "PI not found", piNumber }, 404);
  }

  const current = rows[0];
  const currentStatus = ((current.currentStatus as string) ?? (current.status as string) ?? "").toLowerCase();
  if (!EDITABLE_STATUSES.has(currentStatus)) {
    return jsonResponse(
      {
        error: `PI in status "${currentStatus || "unknown"}" is not editable`,
        piNumber,
        status: current.status,
        editableStatuses: Array.from(EDITABLE_STATUSES),
        hint:
          "Only draft and sent PIs can be edited. For a paid PI, refund via the Stripe Dashboard first; for canceled / expired PIs, create a new PI with the corrected details.",
      },
      409,
    );
  }

  const piId = current.id as string | number;

  // 2) Snapshot the current row to proforma_invoices_revisions. We do
  //    this BEFORE the PATCH so the snapshot always shows the true
  //    pre-edit state, even if the PATCH later fails partway.
  const snapshot = {
    pi_id: piId,
    pi_number: piNumber,
    // 2026-10-04 (R84): revision_number = (count of existing revisions
    //    for this pi_id) + 1. The "original" PI = revision_number=1.
    //    We compute it lazily by querying the count first, so we don't
    //    need to maintain a counter on the main row.
    revision_number: 0, // overwritten below
    change_note: body.changeNote ?? "",
    source: "manual",

    status: current.status,
    issue_date: current.issue_date,
    valid_until: current.valid_until,
    lead_time_days: current.lead_time_days,
    production_time_days: current.production_time_days,
    payment_terms: current.payment_terms,
    payment_percentage: current.payment_percentage,
    payment_terms_text: current.payment_terms_text,
    lead_time_text: current.lead_time_text,
    shipping_label: current.shipping_label,
    shipping_method: current.shipping_method,

    customer_name: current.customer_name,
    customer_email: current.customer_email,
    customer_phone: current.customer_phone,
    customer_company: current.customer_company,
    customer_address: current.customer_address,

    items: current.items ?? [],
    subtotal_cents: current.subtotal_cents ?? 0,
    shipping_cents: current.shipping_cents ?? 0,
    total_cents: current.total_cents ?? 0,
    currency: current.currency ?? "usd",
    amount_due_cents: current.amount_due_cents,
    amount_paid_cents: current.amount_paid_cents ?? 0,

    stripe_client_secret: current.stripe_client_secret,
    stripe_payment_intent_id: current.stripe_payment_intent_id,
    payment_site: current.payment_site ?? "sublimapparel",

    metadata: current.metadata ?? {},
  };

  // Count existing revisions to assign revision_number.
  const revCountRes = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices_revisions?pi_id=eq.${encodeURIComponent(String(piId))}&select=revision_id`,
    { headers: authHeaders },
  );
  let revisionNumber = 1;
  if (revCountRes.ok) {
    const revRows = (await revCountRes.json()) as Array<{ revision_id: number }>;
    revisionNumber = revRows.length + 1;
  }
  snapshot.revision_number = revisionNumber;

  const snapshotRes = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices_revisions`,
    {
      method: "POST",
      headers: {
        ...authHeaders,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(snapshot),
    },
  );

  if (!snapshotRes.ok) {
    const text = await snapshotRes.text();
    return jsonResponse(
      {
        error: "Failed to snapshot pre-edit state",
        detail: `status=${snapshotRes.status}; body=${text}`,
        supabaseUrl,
      },
      500,
    );
  }

  // 3) Build the PATCH payload. Only include fields that were sent —
  //    never overwrite a column with `null` just because the admin
  //    didn't include it in this request (otherwise deleting a phone
  //    number would require sending every other field too).
  const patch: Record<string, unknown> = {};

  if (body.customer) {
    if (body.customer.name !== undefined) patch.customer_name = body.customer.name.trim();
    if (body.customer.email !== undefined)
      patch.customer_email = body.customer.email || null;
    if (body.customer.phone !== undefined) patch.customer_phone = body.customer.phone.trim();
    if (body.customer.company !== undefined)
      patch.customer_company = body.customer.company || null;
    if (body.customer.address !== undefined)
      patch.customer_address = body.customer.address || null;
  }

  if (Array.isArray(body.items)) {
    // Re-shape items into the storage format (qty + cents-based) and
    // re-compute totals in one place so subtotal_cents / total_cents
    // never drift from the items array.
    const storedItems = body.items.map((it) => {
      const qty = Number(it.quantity) || 0;
      const unitPriceCents = Math.round((Number(it.unitPrice) || 0) * 100);
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
    patch.items = storedItems;
    const subtotalCents = storedItems.reduce(
      (sum, r) => sum + ((r.total_cents as number) ?? 0),
      0,
    );
    patch.subtotal_cents = subtotalCents;
    const shippingCents = Math.round((Number(body.shippingCost ?? current.shipping_cents) || 0) * 100);
    patch.shipping_cents = shippingCents;
    patch.total_cents = subtotalCents + shippingCents;

    // 2026-10-04 (R84): keep amount_due_cents in sync with the new
    // total unless the PI is already paid (paid PIs aren't editable,
    // so this only matters for partial-payment flows where the deposit
    // was less than total). For now we just mirror total_cents.
    patch.amount_due_cents = subtotalCents + shippingCents;
  } else if (body.shippingCost !== undefined) {
    // Shipping-only edit (rare). Recompute total from the existing
    // subtotal so we never drift.
    const shippingCents = Math.round((Number(body.shippingCost) || 0) * 100);
    patch.shipping_cents = shippingCents;
    const subtotalCents = (current.subtotal_cents as number) ?? 0;
    patch.total_cents = subtotalCents + shippingCents;
    patch.amount_due_cents = subtotalCents + shippingCents;
  }

  if (body.shippingLabel !== undefined) patch.shipping_label = body.shippingLabel;
  if (body.shippingMethod !== undefined) patch.shipping_method = body.shippingMethod;
  if (body.leadTimeText !== undefined) patch.lead_time_text = body.leadTimeText;
  if (body.paymentTermsText !== undefined) {
    patch.payment_terms_text = body.paymentTermsText;
    // Keep the legacy `payment_terms` column in sync too — some older
    // queries still read it.
    patch.payment_terms = body.paymentTermsText;
  }
  if (body.currency !== undefined) {
    patch.currency = body.currency.toLowerCase();
  }

  if (body.issueDate !== undefined) {
    // Validate YYYY-MM-DD shape so a typo doesn't break the date column.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(body.issueDate)) {
      return jsonResponse(
        { error: "issueDate must be YYYY-MM-DD" },
        400,
      );
    }
    patch.issue_date = body.issueDate;
  }

  if (body.validUntil !== undefined) {
    if (body.validUntil === null) {
      patch.valid_until = null;
    } else {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(body.validUntil)) {
        return jsonResponse(
          { error: "validUntil must be YYYY-MM-DD or null" },
          400,
        );
      }
      patch.valid_until = body.validUntil;
    }
  } else if (body.issueDate !== undefined && !current.valid_until) {
    // Auto-default valid_until = issue_date + 14 days when the PI had
    // no valid_until before. Matches the Excel template convention.
    const d = new Date(`${body.issueDate}T00:00:00Z`);
    if (!isNaN(d.getTime())) {
      d.setUTCDate(d.getUTCDate() + 14);
      patch.valid_until = d.toISOString().slice(0, 10);
    }
  }

  if (Object.keys(patch).length === 0) {
    return jsonResponse(
      { error: "No updatable fields in request body" },
      400,
    );
  }

  const patchRes = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?id=eq.${encodeURIComponent(String(piId))}`,
    {
      method: "PATCH",
      headers: {
        ...authHeaders,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(patch),
    },
  );

  if (!patchRes.ok) {
    const text = await patchRes.text();
    return jsonResponse(
      {
        error: "Update failed",
        detail: `status=${patchRes.status}; body=${text}`,
        supabaseUrl,
      },
      500,
    );
  }

  const updated = (await patchRes.json()) as Array<{ id: string | number }>;
  const updatedRow = updated[0] ?? current;

  return jsonResponse({
    success: true,
    piNumber,
    id: piId,
    revisionNumber,
    changeNote: body.changeNote ?? "",
    // 2026-10-04 (R84): surface a few echo fields so the UI can re-
    // render without a second GET round-trip.
    totalCents: (updatedRow as any).total_cents,
    currency: (updatedRow as any).currency,
    updatedFields: Object.keys(patch),
  });
}