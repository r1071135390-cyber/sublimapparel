# Stripe Integration Setup Guide

> Last updated: 2026-01 — by Vibe Coding
> Status: ✅ Code complete, ⏳ awaiting Stripe API keys + Cloudflare env vars

## What was built

Four payment scenarios for sublimapparel.com, all using a single Stripe account:

| # | Scenario | URL | Price | Stripe method |
|---|---|---|---|---|
| A | Express inquiry deposit (skip queue) | `/get-a-quote-express` | $99 | Payment Element (embedded) |
| B | Custom sample fee | `/samples` | $50 | Payment Element (embedded) |
| C | Bulk order 30% deposit | `/bulk-deposit` | 30% of quote | Payment Element (embedded) |
| D | Small order / stock | `/shop` | varies | Stripe Checkout (hosted) |

All scenarios share:
- One Stripe account
- One pair of API keys
- One `payments` table in Supabase for tracking
- One webhook endpoint (`/api/stripe/webhook`) for payment confirmation

---

## Step 1 — Get your Stripe API keys

1. Log in to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Top-right menu → **Developers** → **API keys**
3. Make sure the toggle is on **Live mode** (top right)
4. Copy these two values (you'll add them to Cloudflare in step 3):
   - **`Publishable key`** → starts with `pk_live_...`
   - **`Secret key`** → click **Reveal live key** → starts with `sk_live_...`

> ⚠️ **Never paste the secret key anywhere except Cloudflare Pages Environment Variables.** Not in chat, not in code, not in git.

---

## Step 2 — Add the webhook endpoint in Stripe

1. In Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**
2. Endpoint URL: `https://sublimapparel.com/api/stripe/webhook`
3. Listen for these events (click "Select events" and choose):
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `payment_intent.canceled`
   - `checkout.session.completed`
   - `checkout.session.expired`
4. Click **Add endpoint**
5. On the new endpoint's page, click **Reveal** under **Signing secret** → starts with `whsec_...`
6. Copy this value — you'll add it to Cloudflare in step 3

---

## Step 3 — Configure Cloudflare Pages Environment Variables

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **sublimapparel**
2. Click **Settings** → **Environment variables**
3. Add **4 variables** for the **Production** environment (repeat for Preview if you want testing there):

| Variable | Value | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_xxxxx` | Step 1 |
| `STRIPE_SECRET_KEY` | `sk_live_xxxxx` | Step 1 |
| `STRIPE_WEBHOOK_SECRET` | `whsec_xxxxx` | Step 2 |
| `PUBLIC_URL` | `https://sublimapparel.com` | your domain |

> 🔐 The `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` should be marked as **encrypted** (Cloudflare's default for secret-looking names, but click the encrypt icon to be sure).

> ⚠️ The `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are **runtime variables** — used by Cloudflare Pages Functions (server-side). `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is a **build-time variable** — used when Next.js builds the static bundle.

4. Click **Save** for each variable

---

## Step 4 — Trigger a redeploy

After adding the env vars, you need to trigger a new build (env vars only take effect on rebuild):

1. In Cloudflare Pages → **Deployments** tab
2. Click the **three dots** on the latest deployment → **Retry deployment**
3. Wait for the build to complete (~1-2 minutes)

---

## Step 5 — Test the integration

### Test with real card in test mode first (recommended)

If you want to test before going live:

1. In Stripe Dashboard, toggle to **Test mode** (top right)
2. Get test keys (`pk_test_...` / `sk_test_...`) from **Developers → API keys**
3. Add a test webhook endpoint pointing to your preview URL (e.g. `https://sublimapparel.pages.dev/api/stripe/webhook`) — or use Stripe CLI to forward
4. Add the test keys to Cloudflare as **Preview** environment variables
5. Redeploy preview
6. Test all 4 flows with Stripe test card: `4242 4242 4242 4242`, any future date, any CVC, any ZIP

### Test on production

Once you switch to live keys:
- Use a real card, or
- Use a card from a payment provider like Privacy.com for a virtual one

Test each flow:
1. `/shop/` → add item to cart → click "Checkout" → completes on Stripe-hosted page
2. `/samples/` → fill form → click "Continue to payment" → enter card → success
3. `/get-a-quote-express/` → fill form → click "Continue to payment" → $99 charged
4. `/bulk-deposit/?quote_id=Q-TEST&total=1000` → pre-fills → click "Continue" → $300 charged

---

## Step 6 — Verify payments are recorded in Supabase

After each successful payment:
1. Supabase Dashboard → Table Editor → `payments` table
2. New row should appear with:
   - `stripe_payment_intent_id` populated
   - `status = 'succeeded'`
   - `paid_at` timestamp
   - Customer email, name, amount, scenario

If the webhook isn't updating the table, check:
- Cloudflare Pages → **Logs** → filter for `/api/stripe/webhook` errors
- Stripe Dashboard → **Webhooks** → click your endpoint → check **Logs** tab for delivery status
- Make sure the webhook secret in Cloudflare matches the one in Stripe

---

## Architecture overview

```
┌────────────────────┐
│  Browser           │
│  (sublimapparel)   │
└──────┬─────────────┘
       │ 1. fetch /api/stripe/create-payment-intent
       │    (POST, scenario + customer info)
       ▼
┌────────────────────┐
│  Cloudflare Pages  │
│  Function          │
│  /api/stripe/*     │
└──────┬─────────────┘
       │ 2. stripe.paymentIntents.create()
       │    + Supabase insert (status: pending)
       ▼
┌────────────────────┐
│  Stripe            │
│                    │◀── 3. Returns clientSecret
└──────┬─────────────┘
       │ 4. stripe.confirmPayment() (Payment Element)
       │    OR stripe.redirectToCheckout() (Checkout)
       ▼
┌────────────────────┐
│  Browser           │── 5. Customer pays
│  → Success/Cancel  │
└──────┬─────────────┘
       │ 6. Webhook POST /api/stripe/webhook
       ▼
┌────────────────────┐
│  Cloudflare Pages  │
│  Function          │── 7. Update Supabase
│  /webhook          │    (status: succeeded, paid_at)
└────────────────────┘
```

---

## File structure

```
.
├── .env.example                                  # Template for env vars
├── functions/
│   ├── api/stripe/
│   │   ├── create-payment-intent.ts              # Scenarios A, B, C
│   │   ├── checkout-session.ts                   # Scenario D
│   │   └── webhook.ts                            # Webhook handler
│   └── lib/
│       └── stripe.ts                             # Server-side Stripe client
└── src/
    ├── app/
    │   ├── shop/                                  # Scenario D
    │   ├── samples/                               # Scenario B
    │   ├── get-a-quote-express/                   # Scenario A
    │   ├── bulk-deposit/                          # Scenario C
    │   └── order/
    │       ├── success/                           # Shared success page
    │       └── canceled/                          # Shared cancel page
    ├── components/stripe/
    │   ├── StripeProvider.tsx                     # Wraps Elements
    │   ├── SamplePaymentForm.tsx                  # Scenario B form
    │   ├── InquiryDepositForm.tsx                 # Scenario A form
    │   └── BulkDepositForm.tsx                    # Scenario C form
    └── lib/
        ├── stripe-client.ts                       # Client-side Stripe loader
        └── shop-data.ts                           # Product catalog
```

---

## Pricing reference

| Scenario | Price | Where it lives |
|---|---|---|
| A — Express inquiry deposit | $99 (fixed) | `functions/api/stripe/create-payment-intent.ts` → `FIXED_PRICES.inquiry_deposit` |
| B — Sample fee | $50 (fixed) | `functions/api/stripe/create-payment-intent.ts` → `FIXED_PRICES.sample_fee` |
| C — Bulk deposit | 30% of quote (variable) | `src/app/bulk-deposit/BulkDepositClient.tsx` → `DEPOSIT_PERCENT` |
| D — Shop | varies per product | `src/lib/shop-data.ts` |

To change a price, edit the source file and push.

---

## Troubleshooting

### "Stripe is not configured" warning on page
- The `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` env var is missing or empty
- Cloudflare needs a **rebuild** after adding the var — just saving isn't enough

### Payment succeeds but Supabase row not updated
- Webhook is failing — check Cloudflare function logs
- Webhook secret mismatch — re-copy `whsec_...` from Stripe
- Webhook URL wrong — should be `https://sublimapparel.com/api/stripe/webhook` (no trailing slash)

### "Failed to initialize payment" on form submit
- `STRIPE_SECRET_KEY` env var missing or wrong
- Check Cloudflare function logs for the actual error

### Card declined in production
- Card issuer blocked the charge
- Try a different card
- For testing, switch to test mode (test cards always succeed)

---

## Next steps (future enhancements)

- [ ] **Email notifications**: Send confirmation email after payment (Resend / Postmark)
- [ ] **Customer dashboard**: Let customers see their order history
- [ ] **Stripe Tax**: Auto-calculate sales tax for US states
- [ ] **Subscriptions**: Monthly design packages for agencies
- [ ] **Refunds**: Add admin UI for refunding from the Supabase payments table
- [ ] **Multi-currency**: Support EUR, GBP, AUD etc. for European / UK / AU buyers
- [ ] **Apple Pay / Google Pay**: Already enabled by default in Payment Element, but verify on real devices

---

For any questions, ping the dev team.
