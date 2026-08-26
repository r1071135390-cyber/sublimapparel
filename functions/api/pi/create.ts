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

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number; // USD
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

  // Compute totals
  const subtotal = body.items.reduce(
    (sum, it) => sum + it.quantity * it.unitPrice,
    0
  );
  const total = Math.round(subtotal * 100) / 100;
  const currency = body.currency || "USD";

  // Insert into Supabase table "proforma_invoices"
  const insertPayload = {
    pi_number: body.piNumber,
    customer_name: body.customer.name,
    customer_email: body.customer.email ?? null,
    customer_phone: body.customer.phone,
    customer_company: body.customer.company ?? null,
    customer_address: body.customer.address ?? null,
    items: body.items,
    notes: body.notes ?? null,
    subtotal,
    total,
    currency,
    status: "draft",
    created_at: new Date().toISOString(),
    // Stripe-related fields are intentionally null for now.
    payment_intent_id: null,
    client_secret: null,
    payment_url: null,
  };

  const supabaseUrl = env.COZE_SUPABASE_URL.replace(/\/$/, "");
  const insertRes = await fetch(`${supabaseUrl}/rest/v1/proforma_invoices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(insertPayload),
  });

  if (!insertRes.ok) {
    const text = await insertRes.text();
    return jsonResponse(
      { error: "Failed to create PI in Supabase", detail: text },
      500
    );
  }

  const inserted = (await insertRes.json()) as Array<{ id: string | number }>;
  const id = inserted[0]?.id;

  return jsonResponse({
    success: true,
    id,
    piNumber: body.piNumber,
    total,
    currency,
    // No Stripe fields yet — they will be populated when the user
    // opens the "Pay" link and we lazily create a Checkout Session.
    clientSecret: null,
    paymentIntentId: null,
    paymentUrl: null,
  });
}
