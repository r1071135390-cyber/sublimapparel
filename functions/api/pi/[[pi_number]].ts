// functions/api/pi/[[pi_number]].ts
// Fetches a Proforma Invoice by path pi_number (or legacy query params),
// and dispatches per-PI action POSTs to dedicated handlers.
//
// 2026-10-02 (R78): renamed from `get.ts` → `[pi_number].ts` → `[[pi_number]].ts`
// (catch-all). The double-bracket `[[pi_number]]` form is what Cloudflare
// Pages Functions actually supports for dynamic routing — single brackets
// are a Pages Router convention that crashed the connection here with no
// response body. Catch-all captures the entire remaining path, so we split
// on `/` and take the last segment as the PI.
//
// 2026-10-04 (R85): the catch-all previously intercepted POSTs to
// `/api/pi/{pi_number}/confirm-bank` and returned 405 (it only exported
// GET + OPTIONS). Two fixes are layered:
//   1. The dedicated handler now lives at
//      `functions/api/pi/[pi_number]/confirm-bank.ts` so a more specific
//      static-segment route wins under Cloudflare's normal precedence.
//   2. THIS file also re-exports onRequestPost so that if (1) is ever
//      bypassed — Cloudflare CDN edge cache, a stale deploy, anything —
//      POST still reaches the handler instead of falling through to a
//      405. The dispatch is based on the path's last segment, so
//      anything we add later (`/api/pi/{n}/<action>`) can hook in here.
//
// 2026-10-04 (R86): the call into `handleConfirmBank` now passes
// `{ request: context.request, env: context.env }` instead of the raw
// context. The shared helper switched to that plain shape so it can be
// driven from BOTH route surfaces (`[pi_number]/confirm-bank.ts` with
// its EventContext<Env, ...> and THIS catch-all with its inline context)
// without tripping the structural-mismatch tsc error.
//
// Live PI card payment flow:
//   - This handler is READ-ONLY for Stripe purposes. It returns whatever
//     `stripe_client_secret` / `stripe_payment_intent_id` the PI row
//     already carries and never creates a PaymentIntent.
//   - 2026-10-26 (R124): the lazy mint that used to live here was
//     removed. It duplicated POST /api/pi/stripe-payment-intent, so a
//     customer opening the PI page and then pressing "Pay" ended up
//     with two PaymentIntents on one PI — and Stripe charged them twice.
//     The single mint path is now /api/pi/stripe-payment-intent, which
//     reuses the intent recorded on this row.
//
// State machine:
//   PI status | what this handler does
//   ───────────────────────────────────────────────────────────────────
//   draft, canceled, expired   | return row verbatim; clientSecret = null
//   paid                       | return row verbatim; clientSecret = null
//   pending_bank               | return row verbatim; clientSecret = null
//   sent                       | return row + the existing clientSecret
//                              | (null when no intent has been minted yet)

import { normalizeSupabaseUrl } from "../_utils";
import { handleConfirmBank } from "./pi-actions/confirm-bank";

interface Env {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

// 2026-10-01 (R77): whitelist mirrored from stripe/create-payment-intent.ts
// and stripe/webhook.ts. Any site_slug arriving in PI metadata that isn't
// on this list is coerced to DEFAULT_SITE_SLUG.
const ALLOWED_SITE_SLUGS: ReadonlySet<string> = new Set(["sublimapparel"]);
const DEFAULT_SITE_SLUG = "sublimapparel";
function resolveSiteSlug(input: unknown): string {
  if (typeof input !== "string" || input.length === 0) return DEFAULT_SITE_SLUG;
  return ALLOWED_SITE_SLUGS.has(input) ? input : DEFAULT_SITE_SLUG;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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
  // 2026-10-02 (R78): Cloudflare Pages Functions passes `params.pi_number`
  // as a string ARRAY `["SA..."]` (not a plain string) for catch-all
  // `[[pi_number]]` routes. The base Record<string,string> type CF gives
  // us lies about this — accept the union so TypeScript doesn't narrow
  // away the array branch.
  params?: Record<string, string | string[] | undefined>;
}): Promise<Response> {
  const { request, env, params } = context;

  if (!env.COZE_SUPABASE_URL || !env.COZE_SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse(
      { error: "Supabase credentials not configured" },
      500,
    );
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  // 2026-10-02 (R78): Cloudflare Pages Functions passes params.pi_number
  // as an ARRAY ["SA..."] for the catch-all [[pi_number]] route, NOT a
  // plain string. Normalise here — accept string | string[] | undefined.
  // url.pathname is the ultimate fallback for the rare case neither
  // catches.
  const paramRaw = params?.pi_number;
  const paramPi =
    typeof paramRaw === "string"
      ? paramRaw
      : Array.isArray(paramRaw)
        ? paramRaw[paramRaw.length - 1] ?? ""
        : "";
  const pathSegments = url.pathname.replace(/\/+$/, "").split("/");
  const fallbackPathPi = pathSegments[pathSegments.length - 1] || "";
  const rawPathPi = paramPi || fallbackPathPi;
  const pathPi = rawPathPi.split("/").filter(Boolean).pop() ?? "";
  const piNumber = url.searchParams.get("piNumber") ?? (pathPi || undefined);

  const filter = id
    ? `id=eq.${encodeURIComponent(id)}`
    : `pi_number=eq.${encodeURIComponent(piNumber!)}`;

  const supabaseUrl = normalizeSupabaseUrl(env.COZE_SUPABASE_URL);
  const res = await fetch(
    `${supabaseUrl}/rest/v1/proforma_invoices?${filter}&limit=1`,
    {
      headers: {
        apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
      },
    },
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
  // 2026-10-05 (R103): fetch the bank_accounts row for this PI
  // currency so the /pay/ page renders admin-managed bank info. We fetch on
  // every read (no in-memory cache) because the admin edits bank info via
  // /administered/bank-accounts/ and we want those changes visible on the next
  // page load. Supabase responds in <50ms, so the cost is negligible.
  //
  // R128: the bank_accounts TABLE is the only source of truth. There is no
  // hardcoded fallback map on either side of the wire any more — the client
  // bundle no longer carries account numbers, and the server does not keep a
  // copy either (the GitHub repo is public, so a copy under functions/ would
  // be published as well). A missing row means the account has not been set
  // up yet: we return null and the client asks the customer to get in touch.
  const piCurrency = ((row.currency as string | null) ?? "usd").toLowerCase();
  const piSiteSlug =
    resolveSiteSlug(
      (row as any).payment_site ??
        ((row.metadata as Record<string, unknown> | null)?.site_slug ?? null),
    );
  const bankLookupUrl =
    `${supabaseUrl}/rest/v1/bank_accounts` +
    `?site_slug=eq.${encodeURIComponent(piSiteSlug)}` +
    `&currency=eq.${encodeURIComponent(piCurrency)}` +
    `&limit=1`;
  let bankAccount: Record<string, unknown> | null = null;
  try {
    const bankRes = await fetch(bankLookupUrl, {
      headers: {
        apikey: env.COZE_SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.COZE_SUPABASE_SERVICE_ROLE_KEY}`,
      },
    });
    if (bankRes.ok) {
      const bankRows = (await bankRes.json()) as Array<Record<string, unknown>>;
      bankAccount = bankRows[0] ?? null;
    } else {
      console.warn(
        `[pi/get] bank_accounts lookup failed: ${bankRes.status} ${await bankRes.text()}`,
      );
    }
  } catch (err) {
    console.warn("[pi/get] bank_accounts lookup threw:", err);
  }

  const status = (row.status as string | null) ?? null;
  const existingClientSecret = (row.stripe_client_secret as string | null) ?? null;
  const existingPaymentIntentId =
    (row.stripe_payment_intent_id as string | null) ?? null;

  let clientSecret: string | null = existingClientSecret;
  let paymentIntentId: string | null = existingPaymentIntentId;
  // 2026-10-02 (R78): compute the canonical amount once so the response
  // and the PaymentIntent agree — and so the page header on the
  // /pay/[pi]/ route (which reads pi.amount_due_cents) shows the
  // correct figure even on the very first request, before any PATCH
  // has refreshed the row.
  let resolvedAmountCents = pickAmountCents(row);

  // 2026-10-26 (R124): PaymentIntent minting was REMOVED from this
  // handler. It used to lazily mint an intent the first time a customer
  // opened a "sent" PI, while POST /api/pi/stripe-payment-intent minted
  // its own on every call — two independent mint paths for the same PI.
  // Each path produced a DIFFERENT PaymentIntent and Stripe charges the
  // customer once per intent: that is the duplicate-payment bug.
  //
  // /api/pi/stripe-payment-intent is now the single mint path. It reuses
  // this row's stripe_payment_intent_id / stripe_client_secret whenever
  // the intent is still live, so opening, refreshing or re-opening the
  // page can no longer produce a second intent.

  return jsonResponse({
    pi: {
      ...row,
      // 2026-10-02 (R78): override with the canonical amount we just
      // resolved so the /pay/ page header (which reads
      // pi.amount_due_cents) shows the correct figure even on the
      // very first request, before the PATCH refreshes the row.
      amount_due_cents: resolvedAmountCents ?? row.amount_due_cents ?? 0,
      stripe_client_secret: clientSecret,
      stripe_payment_intent_id: paymentIntentId,
      paymentUrl: null,
    },
    bank_account: bankAccount,
  });
}

// 2026-10-04 (R85): POST dispatch — covers actions like
//   /api/pi/{pi_number}/confirm-bank
// that would otherwise fall through to a 405 if Cloudflare's route
// precedence didn't pick the dedicated file. The dispatch key is the LAST
// path segment after the pi_number, so add new per-PI POSTs here too.
export async function onRequestPost(context: {
  request: any;
  env: Env;
  params?: Record<string, string | string[] | undefined>;
}): Promise<Response> {
  const url = new URL(context.request.url);
  // pathname looks like /api/pi/<pi_number>/<action> (or with extra
  // segments in front for catch-all [[pi_number]]). Take the LAST
  // non-empty segment as the action name.
  const segments = url.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  const action = segments[segments.length - 1] ?? "";

  switch (action) {
    case "confirm-bank":
      return handleConfirmBank({ request: context.request, env: context.env });
    default:
      return jsonResponse(
        { error: `Unknown PI action: ${action || "(none)"}` },
        405,
      );
  }
}

// ── helpers ──────────────────────────────────────────────────────

/**
 * Pick the canonical "amount due" for a PI.
 * Preference order: amount_due_cents → total_cents → subtotal_cents.
 */
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