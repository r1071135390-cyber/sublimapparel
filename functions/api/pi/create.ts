// functions/api/pi/create.ts
// Creates a Proforma Invoice (PI) in Supabase.
// Stripe payment intent creation has been stripped out (chunk-size issue with
// the Stripe SDK on Cloudflare Functions). When the front-end needs to charge
// the customer it should hit a separate /api/stripe/* endpoint (to be added
// back when we figure out bundling), or just deep-link to a Stripe Checkout
// session created on demand.

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
  shippingCost?: number; // USD dollars
  currency?: string; // defaults to USD
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

  // Insert into Supabase table "proforma_invoices" — schema is cents-based.
  // `payment_terms` and `payment_percentage` are NOT NULL in the table, so we
  // supply sensible defaults. Free-form notes (if any) go into metadata.
  const insertPayload: Record<string, unknown> = {
    pi_number: body.piNumber,
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
    status: "draft",
    payment_terms: body.notes ?? "30% deposit, 70% before shipment",
    payment_percentage: 30,
  };

  if (body.notes) {
    insertPayload.metadata = { notes: body.notes };
  }

  const supabaseUrl = env.COZE_SUPABASE_URL.replace(/\/$/, "");
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

  if (!insertRes.ok) {
    const text = await insertRes.text();
    return jsonResponse(
      {
        error: "Failed to create PI in Supabase",
        detail: `status=${insertRes.status}; body=${text}`,
        supabaseUrl,
      },
      500
    );
  }

  const inserted = (await insertRes.json()) as Array<{ id: string | number }>;
  const id = inserted[0]?.id;

  return jsonResponse({
    success: true,
    id,
    piNumber: body.piNumber,
    totalCents,
    subtotalCents,
    shippingCents,
    currency,
  });
}
