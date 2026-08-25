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


---

## Scenario E — Proforma Invoice (PI) with dual payment options

For small orders (e.g., $400–$2,000), customers may want to:
1. **Pay by card** directly on the website (via Stripe) — instant confirmation
2. **Pay by bank wire (T/T)** — the traditional Chinese-factory flow, but customer self-declares on the website so the factory knows

This is implemented in two new pages.

### Sales flow — create a PI

1. Sales goes to `https://sublimapparel.com/admin/new-pi/`
2. Fills in:
   - **PI number** (auto-suggested: `SA{YYYYMMDD}{NNN}`, e.g. `SA20260825001`)
   - **Customer info**: name, email, phone, company, address
   - **Line items**: add/remove rows, each with description, fabric, qty, unit price
   - **Shipping cost** (DDP by air / sea / etc.)
   - **Payment terms**: choose 100% upfront, 30% deposit, or custom %
   - **Lead time** (default 30 days)
   - **Valid until** date
3. Click **"Generate PI"**
4. Backend:
   - Saves PI to Supabase `proforma_invoices` table with `status: 'sent'`
   - Creates a Stripe `PaymentIntent` for the payment amount (100% or 30%)
5. Sales gets a shareable link: `https://sublimapparel.com/pay/?pi=SA20260825001`
6. Sales copies the link and emails/WhatsApps it to the customer

### Customer flow — pay the PI

Customer opens `https://sublimapparel.com/pay/?pi=SA20260825001` and sees:

**1. Full PI document** (formatted like a real proforma invoice)
- Factory header (Yiwu Homedorm info)
- PI number, issue date, valid until
- Customer block
- Items table (description, fabric, qty, unit price, total)
- Subtotal / shipping / total
- Terms & conditions
- **Bank details** (Agricultural Bank of China, account, SWIFT) — for T/T option

**2. Two payment options at the bottom** (clearly separated):

| Option A: 💳 **Pay by Card** | Option B: 🏦 **Pay by Bank Wire (T/T)** |
|---|---|
| Stripe Payment Element inline | Bank details (account name, number, SWIFT, address) |
| Customer fills card → instant payment | Reference number = PI number |
| Webhook updates PI to `paid` | Customer checks "I have sent the wire" box + enters SWIFT MT103 ref |
| Factory starts production immediately | PI status becomes `pending_bank` (awaiting factory manual verification) |
| | Factory sees money in bank → marks `paid` in Supabase |

### Verifying bank payments (factory side)

For now, manually in Supabase Dashboard:
1. Open `proforma_invoices` table
2. Find PI with `status = 'pending_bank'`
3. Check your bank account
4. Once wire is received, set `status = 'paid'` and `paid_at = now()`

**Future enhancement**: build a small `/admin/pi-dashboard` page with a list of pending bank PIs and one-click "Confirm received" buttons. (Not in MVP.)

### API endpoints (Cloudflare Pages Functions)

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/pi/create` | POST | Create new PI + Stripe PaymentIntent |
| `/api/pi/get?pi=SA20260825001` | GET | Fetch PI data for customer page |
| `/api/pi/confirm-bank` | POST | Customer confirms T/T sent (sets `pending_bank`) |
| `/api/stripe/webhook` | POST | Stripe webhook (already exists, updated to handle `pi_id` in metadata) |

### Database table

`proforma_invoices` (Supabase):

```sql
id uuid PRIMARY KEY,
pi_number text UNIQUE NOT NULL,  -- e.g. SA20260825001
status text CHECK (status IN ('draft','sent','paid','pending_bank','canceled','expired')),
customer_name text,
customer_email text,
customer_phone text,
customer_company text,
customer_address text,
items jsonb,  -- [{description, fabric, qty, unit_price_cents, total_cents}, ...]
subtotal_cents integer,
shipping_cents integer,
total_cents integer,
currency text DEFAULT 'usd',
payment_terms text,  -- e.g. "100% upfront"
payment_percentage integer,  -- 100 or 30 etc.
stripe_payment_intent_id text UNIQUE,
stripe_customer_id text,
lead_time_days integer DEFAULT 30,
production_time_days integer DEFAULT 45,
valid_until date,
bank_confirmed_at timestamptz,  -- when customer clicked "I have sent the wire"
bank_reference text,  -- SWIFT MT103 number entered by customer
bank_notes text,
created_at, updated_at, sent_at, paid_at, canceled_at timestamptz
```

## PI (Proforma Invoice) system

A second payment flow, built for B2B orders where sales staff draft a Proforma Invoice and the customer pays (card or bank wire) against that specific PI.

### PI number format

`SA{YYYYMMDD}{NNNN}` — 4-digit daily sequence.

Examples:
- First PI of the day: `SA202608250001`
- 50th PI of the day: `SA202608250050`

**`SA`** = SublimApparel (site prefix). The number is generated automatically by `/api/pi/next-number` (which scans the DB for the highest 4-digit suffix of the current date and returns `+1`).

### Sales portal — creating a PI

Two entry points for the sales team:

1. **Manual form** (recommended for first-time use): `/admin/new-pi/` — fill in customer, items, totals; the form auto-fills the next available PI number.
2. **AI upload** (faster after the first time): `/admin/upload-pi/` — paste PI text **or** upload a screenshot; AI (doubao-seed-1-8) extracts customer info, items, totals, and pre-fills the form on the next page.

Both flows end at `/admin/new-pi/?from=upload&data=...` (when using AI) or directly to `/pay/?pi=SAxxxxxxxx` (when saving).

The "/admin" entry is added in the footer as a low-key "Sales portal" link, so customers don't accidentally find it.

### Customer payment page

URL pattern: `https://sublimapparel.com/pay/?pi=SA202608250001`

Two payment options side-by-side:
- **Pay by Card** (Stripe Payment Element, full PI total or down payment %)
- **Pay by Bank Wire (T/T)** — customer clicks "I have sent the wire" and enters SWIFT reference. Sets status to `pending_bank` so factory knows to watch the bank account.

### Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/pi/create` | POST | Create new PI + Stripe PaymentIntent |
| `/api/pi/get?pi=SA202608250001` | GET | Fetch PI data for customer page |
| `/api/pi/confirm-bank` | POST | Customer confirms T/T sent (sets `pending_bank`) |
| `/api/pi/parse` | POST | AI extraction from PI text or screenshot (uses coze-coding-dev-sdk LLM) |
| `/api/pi/next-number` | GET | Returns next available 4-digit PI number for today |
| `/api/stripe/webhook` | POST | Stripe webhook (already exists, updated to handle `pi_id` in metadata) |

### Database table

- [ ] **Email notifications**: Send confirmation email after payment (Resend / Postmark)
- [ ] **Customer dashboard**: Let customers see their order history
- [ ] **Stripe Tax**: Auto-calculate sales tax for US states
- [ ] **Subscriptions**: Monthly design packages for agencies
- [ ] **Refunds**: Add admin UI for refunding from the Supabase payments table
- [ ] **Multi-currency**: Support EUR, GBP, AUD etc. for European / UK / AU buyers
- [ ] **Apple Pay / Google Pay**: Already enabled by default in Payment Element, but verify on real devices

---

For any questions, ping the dev team.
