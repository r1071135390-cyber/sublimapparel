/**
 * POST /api/pi/create
 *
 * Create a new Proforma Invoice + Stripe PaymentIntent.
 *
 * Body shape (new schema — matches the Excel PI layout):
 * {
 *   pi_number: string,           // e.g. "SA202608250001"
 *   customer_name: string,
 *   customer_phone?: string,
 *   customer_address?: string,
 *   issue_date: string,          // "YYYY-MM-DD"
 *   lead_time_text: string,      // e.g. "Within 30 days after deposit"
 *   items: [{ description, fabric, qty, unit_price_cents, total_cents, image_url? }],
 *   shipping_label: string,      // e.g. "Shipping Cost"
 *   shipping_method: string,     // e.g. "DDP by AIR"
 *   shipping_cents: number,
 *   payment_terms_text: string,  // full terms text from the PI
 *   total_cents: number,         // grand total (items + shipping)
 *   payment_percentage?: number, // defaults to 100
 *   valid_days?: number,         // defaults to 7
 *   metadata?: object
 * }
 *
 * Returns: { success, pi, client_secret, payment_url }
 */

import type { EventContext } from "@cloudflare/workers-types";
import Stripe from "stripe";

interface Env {
  STRIPE_SECRET_KEY: string;
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
  PUBLIC_URL: string;
}

interface PIItemInput {
  description: string;
  fabric?: string;
  qty: number;
  unit_price_cents: number;
  total_cents?: number;
  image_url?: string;
}

interface CreateBody {
  pi_number?: string;
  customer_name: string;
  customer_phone?: string;
  customer_address?: string;
  customer_email?: string;
  issue_date?: string;
  lead_time_text?: string;
  items: PIItemInput[];
  shipping_label?: string;
  shipping_method?: string;
  shipping_cents?: number;
  payment_terms_text?: string;
  total_cents?: number;
  payment_percentage?: number;
  valid_days?: number;
  currency?: string;
  metadata?: Record<string, unknown>;
}

export const onRequestPost = async (context: EventContext<Env, "", unknown>) => {
  const { request, env } = context;
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    if (!env.STRIPE_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: "STRIPE_SECRET_KEY not configured" }),
        { status: 500, headers: corsHeaders },
      );
    }

    const body = (await request.json()) as CreateBody;

    // ── Validation ─────────────────────────────────────────────
    if (!body.customer_name || !body.items || body.items.length === 0) {
      return new Response(
        JSON.stringify({ error: "customer_name and items are required" }),
        { status: 400, headers: corsHeaders },
      );
    }

    if (!body.pi_number) {
      return new Response(
        JSON.stringify({ error: "pi_number is required" }),
        { status: 400, headers: corsHeaders },
      );
    }

    // ── Compute totals ─────────────────────────────────────────
    const items = body.items.map((it) => ({
      description: it.description,
      fabric: it.fabric || null,
      qty: it.qty,
      unit_price_cents: it.unit_price_cents,
      total_cents: it.total_cents ?? it.qty * it.unit_price_cents,
      image_url: it.image_url || null,
    }));
    const subtotalCents = items.reduce((s, it) => s + it.total_cents, 0);
    const shippingCents = body.shipping_cents || 0;
    const totalCents = body.total_cents ?? subtotalCents + shippingCents;
    const paymentPct = body.payment_percentage || 100;
    if (paymentPct < 1 || paymentPct > 100) {
      return new Response(
        JSON.stringify({ error: "payment_percentage must be 1-100" }),
        { status: 400, headers: corsHeaders },
      );
    }
    const payCents = Math.round((totalCents * paymentPct) / 100);
    if (payCents < 50) {
      return new Response(
        JSON.stringify({ error: "Amount too small. Stripe minimum is $0.50 USD." }),
        { status: 400, headers: corsHeaders },
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
        pi_number: body.pi_number,
      },
      description: `PI ${body.pi_number} for ${body.customer_name} (${paymentPct}%)`,
      receipt_email: body.customer_email || undefined,
    });

    // ── Valid until ───────────────────────────────────────────
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + (body.valid_days || 7));

    // ── Build PI record ───────────────────────────────────────
    // New Excel-style fields are stored in `metadata` JSONB to avoid DB migration.
    const piRecord = {
      pi_number: body.pi_number,
      status: "sent",
      customer_name: body.customer_name,
      customer_email: body.customer_email || null,
      customer_phone: body.customer_phone || null,
      customer_company: null,
      customer_address: body.customer_address || null,
      items,
      subtotal_cents: subtotalCents,
      shipping_cents: shippingCents,
      total_cents: totalCents,
      currency,
      payment_terms:
        body.payment_terms_text || `${paymentPct}% upfront of total`,
      payment_percentage: paymentPct,
      stripe_payment_intent_id: paymentIntent.id,
      lead_time_days: 30, // legacy column; new value lives in metadata.lead_time_text
      production_time_days: 45, // legacy
      issue_date: body.issue_date || new Date().toISOString().split("T")[0],
      valid_until: validUntil.toISOString().split("T")[0],
      metadata: {
        ...(body.metadata || {}),
        // New schema fields (Excel layout)
        issue_date: body.issue_date || new Date().toISOString().split("T")[0],
        lead_time_text: body.lead_time_text || "Within 30 days after deposit",
        payment_terms_text: body.payment_terms_text || "",
        shipping_label: body.shipping_label || "Shipping Cost",
        shipping_method: body.shipping_method || "DDP by AIR",
      },
    };

    // ── Insert into Supabase ──────────────────────────────────
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
        { status: 500, headers: corsHeaders },
      );
    }

    const [pi] = (await insertRes.json()) as Array<typeof piRecord & { id: string }>;

    return new Response(
      JSON.stringify({
        success: true,
        pi: { ...pi, id: pi.id },
        client_secret: paymentIntent.client_secret,
        payment_url: `/pay/?pi=${body.pi_number}`,
      }),
      { status: 200, headers: corsHeaders },
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
