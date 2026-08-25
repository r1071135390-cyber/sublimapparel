import type { EventContext } from "@cloudflare/workers-types";
/**
 * GET /api/pi/get?pi_number=SA20260825001
 *
 * Public endpoint - returns PI details for the customer payment page.
 * Does NOT expose the secret Stripe key; only returns client_secret for Payment Element.
 */

interface Env {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
  STRIPE_SECRET_KEY: string;
  PUBLIC_URL: string;
}

const corsHeaders: Record<string, string> = {

  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders });
}

export const onRequestGet = async (
  context: EventContext<Env, string, Record<string, unknown>>
): Promise<Response> => {
  const { request, env } = context;
  const url = new URL(request.url);
  const piNumber = url.searchParams.get("pi_number");

  if (!piNumber) {
    return json({ error: "pi_number query param is required" }, 400);
  }

  // Validate PI number format (SA + 8 digits + 3 digits)
  if (!/^SA\d{11}$/.test(piNumber)) {
    return json({ error: "Invalid PI number format" }, 400);
  }

  try {
    // Fetch PI from Supabase
    const supabaseUrl = `${env.COZE_SUPABASE_URL}/rest/v1/proforma_invoices?pi_number=eq.${encodeURIComponent(piNumber)}&select=*`;

    const response = await fetch(supabaseUrl, {
      headers: {
        apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("[PI get] Supabase error:", await response.text());
      return json({ error: "Failed to fetch PI" }, 500);
    }

    const rows = (await response.json()) as Array<Record<string, unknown>>;
    if (rows.length === 0) {
      return json({ error: "PI not found" }, 404);
    }

    const pi = rows[0];

    // If PI has a payment intent, we may need to re-confirm the client_secret
    let clientSecret: string | null = null;
    const stripePaymentIntentId = pi.stripe_payment_intent_id as string | null;
    const piStatus = pi.status as string;

    if (stripePaymentIntentId && piStatus === "sent") {
      // Re-fetch PaymentIntent from Stripe to get fresh client_secret
      try {
        const stripeRes = await fetch(
          `https://api.stripe.com/v1/payment_intents/${stripePaymentIntentId}`,
          {
            headers: {
              Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
            },
          }
        );
        if (stripeRes.ok) {
          const piData = (await stripeRes.json()) as { client_secret: string; status: string };
          clientSecret = piData.client_secret;
        }
      } catch (err) {
        console.error("[PI get] Failed to fetch Stripe PI:", err);
      }
    }

    return json({
      pi: {
        id: pi.id,
        pi_number: pi.pi_number,
        status: piStatus,
        customer_name: pi.customer_name,
        customer_email: pi.customer_email,
        customer_phone: pi.customer_phone,
        customer_company: pi.customer_company,
        customer_address: pi.customer_address,
        items: pi.items,
        subtotal_cents: pi.subtotal_cents,
        shipping_cents: pi.shipping_cents,
        total_cents: pi.total_cents,
        currency: pi.currency,
        payment_terms: pi.payment_terms,
        payment_percentage: pi.payment_percentage,
        amount_due_cents: Math.round(((pi.total_cents as number) * (pi.payment_percentage as number)) / 100),
        lead_time_days: pi.lead_time_days,
        production_time_days: pi.production_time_days,
        valid_until: pi.valid_until,
        bank_confirmed_at: pi.bank_confirmed_at,
        bank_reference: pi.bank_reference,
        paid_at: pi.paid_at,
        created_at: pi.created_at,
      },
      client_secret: clientSecret,
    });
  } catch (err) {
    console.error("[PI get] Unexpected error:", err);
    return json({ error: "Internal server error" }, 500);
  }
};

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, { status: 204, headers: corsHeaders });
};
