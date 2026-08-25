/**
 * POST /api/pi/create
 *
 * Creates a new Proforma Invoice + Stripe PaymentIntent.
 * Called by sales rep from /admin/new-pi form.
 *
 * Request body:
 * {
 *   customer_name: string,
 *   customer_email?: string,
 *   customer_phone?: string,
 *   customer_company?: string,
 *   customer_address?: string,
 *   items: [{description, fabric?, qty, unit_price_cents, total_cents, image_url?}, ...],
 *   shipping_cents?: number,
 *   currency?: "usd" | "eur" | ...,
 *   payment_terms?: string,
 *   payment_percentage?: number, // 100 = full upfront, 30 = 30% deposit
 *   lead_time_days?: number,
 *   production_time_days?: number,
 *   valid_days?: number,
 *   metadata?: { ... }
 * }
 *
 * Response:
 * {
 *   success: true,
 *   pi: { ... },                    // full PI record
 *   client_secret: "pi_xxx_secret_xxx",
 *   payment_url: "/pay/SA20260825001"
 * }
 */

import Stripe from "stripe";
import type { EventContext } from "@cloudflare/workers-types";

interface PIItem {
  description: string;
  fabric?: string;
  qty: number;
  unit_price_cents: number;
  total_cents: number;
  image_url?: string;
}

interface Env {
  STRIPE_SECRET_KEY: string;
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
  PUBLIC_URL: string;
}

function generatePINumber(): string {
  // Format: SA + YYYYMMDD + 3-digit sequence based on current timestamp
  // For simplicity, we use the last 3 digits of Date.now() modulo 1000.
  // In production, you'd query the DB for the next sequence number.
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  const seq = String(Date.now() % 1000).padStart(3, "0");
  return `SA${yyyy}${mm}${dd}${seq}`;
}

export const onRequestPost = async (context: EventContext<Env, "", unknown>) => {
  const { request, env } = context;

  try {
    if (!env.STRIPE_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: "STRIPE_SECRET_KEY not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const body = (await request.json()) as {
      customer_name?: string;
      customer_email?: string;
      customer_phone?: string;
      customer_company?: string;
      customer_address?: string;
      items?: PIItem[];
      shipping_cents?: number;
      currency?: string;
      payment_terms?: string;
      payment_percentage?: number;
      lead_time_days?: number;
      production_time_days?: number;
      valid_days?: number;
      metadata?: Record<string, unknown>;
    };

    // ── Validation ─────────────────────────────────────────────
    if (!body.customer_name || !body.items || body.items.length === 0) {
      return new Response(
        JSON.stringify({ error: "customer_name and items are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // ── Compute totals ─────────────────────────────────────────
    const subtotalCents = body.items.reduce(
      (sum, it) => sum + (it.total_cents || it.qty * it.unit_price_cents),
      0,
    );
    const shippingCents = body.shipping_cents || 0;
    const totalCents = subtotalCents + shippingCents;
    const paymentPct = body.payment_percentage || 100;
    if (paymentPct < 1 || paymentPct > 100) {
      return new Response(
        JSON.stringify({ error: "payment_percentage must be 1-100" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
    const payCents = Math.round((totalCents * paymentPct) / 100);
    if (payCents < 50) {
      return new Response(
        JSON.stringify({ error: "Amount too small. Stripe minimum is $0.50 USD." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
    const currency = (body.currency || "usd").toLowerCase();

    // ── Create Stripe PaymentIntent ───────────────────────────
    const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-09-30.clover" as Stripe.LatestApiVersion,
      typescript: true,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: payCents,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        scenario: "pi_payment",
        payment_percentage: String(paymentPct),
        total_cents: String(totalCents),
        customer_email: body.customer_email || "",
      },
      description: `PI for ${body.customer_name} (${paymentPct}%)`,
      receipt_email: body.customer_email || undefined,
    });

    // ── Generate PI number ────────────────────────────────────
    const piNumber = generatePINumber();
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + (body.valid_days || 7));

    // ── Insert PI record into Supabase ─────────────────────────
    const piRecord = {
      pi_number: piNumber,
      status: "draft",
      customer_name: body.customer_name,
      customer_email: body.customer_email || null,
      customer_phone: body.customer_phone || null,
      customer_company: body.customer_company || null,
      customer_address: body.customer_address || null,
      items: body.items,
      subtotal_cents: subtotalCents,
      shipping_cents: shippingCents,
      total_cents: totalCents,
      currency,
      payment_terms: body.payment_terms || `${paymentPct}% upfront`,
      payment_percentage: paymentPct,
      stripe_payment_intent_id: paymentIntent.id,
      lead_time_days: body.lead_time_days || 30,
      production_time_days: body.production_time_days || 45,
      valid_until: validUntil.toISOString().split("T")[0],
      metadata: body.metadata || {},
    };

    const insertRes = await fetch(`${env.COZE_SUPABASE_URL}/rest/v1/proforma_invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(piRecord),
    });

    if (!insertRes.ok) {
      const text = await insertRes.text();
      console.error("PI insert error:", insertRes.status, text);
      // Rollback Stripe PI
      await stripe.paymentIntents.cancel(paymentIntent.id);
      return new Response(
        JSON.stringify({ error: "Failed to create PI", detail: text }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const [pi] = (await insertRes.json()) as Array<typeof piRecord & { id: string }>;

    return new Response(
      JSON.stringify({
        success: true,
        pi: { ...pi, id: pi.id },
        client_secret: paymentIntent.client_secret,
        payment_url: `/pay/${piNumber}`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("PI create error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error", detail: (err as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

export const onRequestOptions = async () =>
  new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
