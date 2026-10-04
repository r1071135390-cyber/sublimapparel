/**
 * POST /api/pi/stripe-payment-link
 *
 * Customer-facing card-payment flow. PayWithStripeLinkButton.tsx
 * (R76/R80 — recovers a deleted component from R76) posts here with a
 * PI number; we mint a Stripe-hosted Payment Link on demand and return
 * the URL so the button can `window.open()` it in a new tab. The
 * customer completes payment on Stripe's domain; Stripe fires
 * `checkout.session.completed` which lands in /api/stripe/webhook and
 * marks the PI as paid.
 *
 * 2026-10-04 (R87): this endpoint never existed in the codebase
 * despite being wired into the frontend since R76/R80. The catch-all
 * `functions/api/pi/[[pi_number]].ts` only knew about `confirm-bank`
 * (R85), so every card-payment click got 405. With the dedicated file
 * at `functions/api/pi/stripe-payment-link.ts` (static segment
 * `stripe-payment-link` wins over the catch-all under Cloudflare's
 * route precedence), POST now lands here.
 *
 * Body:
 *   { piNumber: string }
 *
 * Returns:
 *   { paymentLinkUrl: string, paymentLinkId: string }
 *   on missing input / unknown PI → 4xx with { error }
 *   on Stripe failure → 500 with { error }
 *
 * Idempotency: every click mints a fresh Payment Link. No caching for
 * now (would require a `stripe_payment_link_url` column on
 * proforma_invoices). The webhook handler is idempotent on
 * stripe_payment_intent_id, so duplicate links cannot double-mark the
 * PI as paid.
 *
 * Routing precedence (Cloudflare Pages Functions):
 *   /api/pi/stripe-payment-link         → THIS file  (static segment wins)
 *   /api/pi/{anything}/confirm-bank     → [pi_number]/confirm-bank.ts
 *   /api/pi/{anything}/{anything}       → [[pi_number]].ts (catch-all)
 */

import { createPaymentLink } from "../../lib/stripe";
import { normalizeSupabaseUrl } from "../_utils";
import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  STRIPE_SECRET_KEY: string;
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

// 2026-10-01 (R77): whitelist mirrored from create-payment-intent.ts /
// checkout-session.ts / webhook.ts. Any site_slug arriving in PI metadata
// that isn't on this list is coerced to DEFAULT_SITE_SLUG.
const ALLOWED_SITE_SLUGS: ReadonlySet<string> = new Set(["sublimapparel"]);
const DEFAULT_SITE_SLUG = "sublimapparel";
function resolveSiteSlug(input: unknown): string {
  if (typeof input !== "string" || input.length === 0) return DEFAULT_SITE_SLUG;
  return ALLOWED_SITE_SLUGS.has(input) ? input : DEFAULT_SITE_SLUG;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders });
}

interface RequestBody {
  piNumber?: string;
}

export const onRequestOptions = async () =>
  new Response(null, { status: 204, headers: corsHeaders });

export const onRequestPost = async (
  context: EventContext<Env, string, Record<string, unknown>>,
): Promise<Response> => {
  const { request, env } = context;

  if (!env.STRIPE_SECRET_KEY) {
    return json({ error: "Stripe is not configured on the server" }, 500);
  }
  if (!env.COZE_SUPABASE_URL || !env.COZE_SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: "Supabase credentials not configured" }, 500);
  }

  // 1. Parse body
  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }
  const piNumber = body.piNumber;
  if (!piNumber || typeof piNumber !== "string") {
    return json({ error: "piNumber is required" }, 400);
  }

  const supabaseUrl = normalizeSupabaseUrl(env.COZE_SUPABASE_URL);

  // 2. Look up PI — need amount_due_cents + currency + status
  const lookupRes = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?pi_number=eq.${encodeURIComponent(piNumber)}&select=id,pi_number,status,amount_due_cents,total_cents,subtotal_cents,currency,customer_email,customer_name,payment_site&limit=1`,
    {
      headers: {
        apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
      },
    },
  );
  if (!lookupRes.ok) {
    const text = await lookupRes.text();
    return json({ error: "Supabase query failed", detail: text }, 500);
  }
  const rows = (await lookupRes.json()) as Array<Record<string, unknown>>;
  if (rows.length === 0) {
    return json({ error: `PI ${piNumber} not found` }, 404);
  }
  const row = rows[0];
  const status = (row.status as string | null) ?? null;
  if (status === "paid") {
    return json({ error: "PI is already fully paid" }, 400);
  }
  if (status === "canceled" || status === "expired") {
    return json({ error: `PI is ${status}, cannot accept payment` }, 400);
  }

  // 3. Pick canonical amount in the same way `[[pi_number]].ts` does so
  //    the Payment Link amount matches the page header.
  const amountCents = pickAmountCents(row);
  if (amountCents === null || amountCents < 100) {
    return json({ error: "PI has no payable amount" }, 400);
  }
  const currency = ((row.currency as string) ?? "usd").toLowerCase();
  const site_slug = resolveSiteSlug(
    (row as any).payment_site ??
      ((row.metadata as Record<string, unknown> | null)?.site_slug ?? null),
  );

  // 4. Mint Stripe Payment Link
  let link: { id: string; url: string | null };
  try {
    link = await createPaymentLink(env.STRIPE_SECRET_KEY, {
      amount: amountCents,
      currency,
      description: buildDescription(row),
      receipt_email: (row.customer_email as string | null) ?? undefined,
      metadata: {
        pi_id: String((row.id as string | number) ?? ""),
        pi_number: String(piNumber),
        scenario: "pi_payment",
        site_slug,
        customer_email: (row.customer_email as string | null) ?? "",
        customer_name: (row.customer_name as string | null) ?? "",
      },
    });
  } catch (err: any) {
    console.error("[stripe-payment-link] Stripe error:", err);
    return json(
      { error: `Stripe error: ${err?.message ?? "unknown"}` },
      500,
    );
  }

  if (!link.url) {
    return json({ error: "Stripe did not return a Payment Link URL" }, 500);
  }

  console.log(
    `[stripe-payment-link] PI ${piNumber} → PaymentLink ${link.id} (${amountCents} ${currency})`,
  );

  return json({
    paymentLinkUrl: link.url,
    paymentLinkId: link.id,
    site_slug,
  });
};

// ── helpers (mirror [[pi_number]].ts so totals agree) ──────────

function pickAmountCents(row: Record<string, unknown>): number | null {
  const candidates = [
    row.amount_due_cents,
    row.total_cents,
    row.subtotal_cents,
  ];
  for (const candidate of candidates) {
    const n = typeof candidate === "number" ? candidate : Number(candidate);
    if (Number.isFinite(n) && n > 0) return Math.round(n);
  }
  return null;
}

function buildDescription(row: Record<string, unknown>): string {
  const company = (row.customer_company as string | null) ?? "";
  const piNum = (row.pi_number as string | null) ?? "";
  const parts: string[] = [];
  if (company) parts.push(company);
  if (piNum) parts.push(`PI ${piNum}`);
  parts.push("payment card payment");
  return parts.join(" — ");
}