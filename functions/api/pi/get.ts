// functions/api/pi/get.ts
// Fetches a Proforma Invoice by id or pi_number from Supabase.
// Stripe "refresh client_secret" lookup has been stripped out (chunk-size
// issue with the Stripe SDK on Cloudflare Functions). clientSecret will
// always be null until Stripe is re-integrated.

interface Env {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
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

export async function onRequestGet(context: {
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

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const piNumber = url.searchParams.get("piNumber");

  if (!id && !piNumber) {
    return jsonResponse(
      { error: "Provide ?id=<id> or ?piNumber=<SA...>" },
      400
    );
  }

  const filter = id
    ? `id=eq.${encodeURIComponent(id)}`
    : `pi_number=eq.${encodeURIComponent(piNumber!)}`;

  const supabaseUrl = env.COZE_SUPABASE_URL.replace(/\/$/, "");
  const res = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?${filter}&limit=1`,
    {
      headers: {
        apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    return jsonResponse({ error: "Supabase query failed", detail: text }, 500);
  }

  const rows = (await res.json()) as Array<Record<string, unknown>>;
  if (rows.length === 0) {
    return jsonResponse({ error: "Not found" }, 404);
  }

  const row = rows[0];

  // clientSecret is always null for now (Stripe path is disabled).
  // When Stripe is re-integrated the front-end should call a separate
  // endpoint to mint a fresh Checkout Session URL on demand.
  const clientSecret: string | null = null;
  let paymentUrl: string | null = null;

  return jsonResponse({
    ...row,
    clientSecret,
    paymentUrl,
  });
}
