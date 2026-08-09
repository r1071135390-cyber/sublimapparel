import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Package, Plane, Truck, CheckCircle2, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "US Warehouse · 2–5 Day US Shipping from Yiwu Sublimation Factory",
  description:
    "Stock finished goods in our Fontana, California US warehouse for 2–5 business day US shipping. Avoid customs, cut transit time, reorder with no setup fee. B2B sublimation apparel fulfillment.",
  keywords: [
    "us warehouse",
    "overseas warehouse",
    "us fulfillment",
    "warehouse in usa",
    "sublimation apparel usa",
    "yiwu us warehouse",
    "fontana ca warehouse",
    "no customs",
    "fast us shipping",
  ],
};

const stats = [
  { value: "2–5", unit: "DAYS", label: "US shipping" },
  { value: "50K+", unit: "PCS", label: "Storage capacity" },
  { value: "$0", unit: "SETUP", label: "Reorder fee" },
  { value: "50+", unit: "PCS", label: "Reorder MOQ" },
];

const features = [
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Real address in California",
    body: "13052 Jurupa Ave, Fontana, CA 92335 — 60 minutes from LAX and Long Beach port. Not a forwarder; a stocked warehouse with our inventory.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "2–5 business day delivery",
    body: "Stock ships same day from CA. Ground to most US states in 2–5 business days, expedited overnight available on request.",
  },
  {
    icon: <Package className="h-5 w-5" />,
    title: "Bulk stock + on-demand replenishment",
    body: "Pre-build a stock of bestsellers. When US stock runs low, we air-freight a replenishment batch from Yiwu in 5–7 days.",
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: "US domestic shipping rates",
    body: "Ship USPS / UPS / FedEx at standard US domestic rates — no customs, no duties, no surprise fees. We pass our shipping-account rates through.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "FBA prep + labeling",
    body: "We poly-bag, label, carton-pack, and palletize to Amazon FBA spec. Send to any US fulfillment center on your routing instructions.",
  },
  {
    icon: <Plane className="h-5 w-5" />,
    title: "Drop-ship direct to your customer",
    body: "Send us a CSV of US addresses; we pick, pack, and ship under plain packaging. No minimums, no branding from us on the box.",
  },
];

const useCases = [
  {
    title: "Race & event deadlines you can't miss",
    body: "A 5K shirt order due Saturday shouldn't be on a boat. Stock the top 3 designs in CA; refill from Yiwu when usage hits 60%.",
  },
  {
    title: "Schools, colleges, and Greek life reorders",
    body: "Rush orders during orientation week, finals, or homecoming — overnight or 2-day from CA, no Chinese time zone required.",
  },
  {
    title: "POD platforms and Shopify stores",
    body: "Use us as your US micro-fulfillment. Send a weekly CSV, we ship as 2-day ground. 30+ ecommerce clients already on this flow.",
  },
  {
    title: "Amazon FBA replenishment",
    body: "We ship to any FBA warehouse (FTW1, ONT8, IND9 etc.) on your routing. Stickering, poly-bagging, and box labels included.",
  },
  {
    title: "Trade show floor samples",
    body: "Trade show in Las Vegas next week? Stock 200 hero samples in CA, walk in with empty luggage, hand-carry out the leads.",
  },
  {
    title: "Political and campaign merch",
    body: "Last-minute rallies, yard signs + matching tee combos, candidate swag drops — US stock lets you ship within 48 hours of an event.",
  },
];

const faqs = [
  {
    q: "What's the minimum for the US warehouse program?",
    a: "First deposit: 100 pieces (any mix of styles/sizes). Reorder minimum is 50 pieces per SKU. Storage is free for the first 90 days, $0.05/piece/month after that.",
  },
  {
    q: "How do you handle customs when shipping from Yiwu to California?",
    a: "DDP (Delivered Duty Paid) under our US warehouse program. We pay all import duties, tariffs, and brokerage. You see one landed cost, no surprises.",
  },
  {
    q: "Can I split a single order between Yiwu direct and US warehouse?",
    a: "Yes. Common pattern: ship rush qty from CA (2-5 days), ship the bulk balance from Yiwu sea freight (15-25 days). We split the packing list and bill cleanly.",
  },
  {
    q: "What if my design needs to be updated mid-stock?",
    a: "Two options. (1) Liquidate the old stock at cost+10% via our outlet channel, build new. (2) Disposal of deadstock at $0.20/piece. Most clients go option 1 — we run 3 outlet channels already.",
  },
];

export default function UsWarehousePage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0a0a0a]">
      {/* 1 · HERO */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-6 text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
            [ 008 / Shipping &amp; warehouse ]
          </div>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            <span className="block">Stock in California.</span>
            <span className="block text-[#ff4d00]">Ship in 2–5 days.</span>
            <span className="block">No customs.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0] md:text-xl">
            A real US warehouse, not a forwarder. Pre-build stock of your bestsellers at our
            Yiwu factory, air-freight to our Fontana, CA facility, and ship US-domestic as
            orders come in. No setup fee on reorder. No customs. No surprises.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-a-quote?process=sublimation&type=us-warehouse"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e64400] hover:border-[#e64400]"
            >
              Start a US stock program →
            </Link>
            <Link
              href="/shipping/ddp"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]"
            >
              See DDP coverage →
            </Link>
          </div>
        </div>
      </section>

      {/* 2 · STATS */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x-2 divide-[#0a0a0a] border-x-2 border-[#0a0a0a] md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-8 text-center md:py-10">
              <div className="text-3xl font-extrabold leading-none text-[#0a0a0a] md:text-5xl">
                {s.value}
                <span className="ml-1 text-base font-bold text-[#ff4d00] md:text-lg">
                  {s.unit}
                </span>
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 · DESCRIPTION */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
            [ Why US warehouse ]
          </div>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
            The honest answer:{" "}
            <span className="text-[#ff4d00]">most Chinese factories don't have one.</span>
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[#3a3a3a] md:text-lg">
            <p>
              If you're a US buyer ordering custom apparel from China, the math usually works
              out — until you need a 200-piece reorder in 5 days for a trade show, a campaign
              rally, or a school event. Then you're stuck waiting 25 days for a boat from
              Yiwu, or paying $8/piece to air-freight a single emergency batch.
            </p>
            <p>
              <strong className="text-[#0a0a0a]">Our US warehouse program solves this.</strong>{" "}
              You pre-build 100-500 pieces of your top sellers and stock them in our Fontana,
              CA facility. When an order comes in, we ship same-day from California — 2-5
              business days anywhere in the continental US, no customs, no duties, no
              surprises. When stock runs low, we air-freight a replenishment batch from our
              Yiwu factory in 5-7 days.
            </p>
            <p>
              The math works because the alternative — paying retail US prices, or absorbing
              25-day lead times on every reorder — is worse. You keep the China cost
              advantage on initial production, but you get US-domestic speed on every reorder.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · FEATURES */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#1a1a1a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#00c2ff]">
              [ 008.A / What you get ]
            </div>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
              Six things this warehouse actually does.
            </h2>
            <p className="mt-4 text-lg text-[#a0a0a0]">
              Most "fulfillment" services in China are a forwarding address. This is a real,
              staffed, pallet-racked warehouse with WMS, US-domestic shipping accounts, and a
              team that picks, packs, and labels to spec.
            </p>
          </div>
          <div className="grid gap-px bg-[#0a0a0a] md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="bg-[#1a1a1a] p-8">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border-2 border-[#ff4d00] text-[#ff4d00]">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold leading-snug">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#a0a0a0]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · SPEC TABLE */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
            [ 008.B / Specs at a glance ]
          </div>
          <h2 className="mt-3 mb-10 text-3xl font-extrabold leading-tight md:text-5xl">
            The operational details.
          </h2>
          <div className="border-2 border-[#0a0a0a]">
            <table className="w-full text-left">
              <tbody className="divide-y-2 divide-[#0a0a0a]">
                {[
                  ["Warehouse address", "13052 Jurupa Ave, Fontana, CA 92335, United States"],
                  ["Distance from LAX", "~60 miles / 1h drive"],
                  ["Distance from Long Beach port", "~50 miles / 1h drive"],
                  ["Storage capacity", "50,000+ pieces, climate-controlled"],
                  ["Storage fee (first 90 days)", "Free"],
                  ["Storage fee (after 90 days)", "$0.05 / piece / month"],
                  ["First-time deposit", "100 pieces minimum (mixed styles OK)"],
                  ["Reorder minimum", "50 pieces per SKU"],
                  ["Reorder setup fee", "$0 (no screens to burn, no plates)"],
                  ["Pick + pack fee", "$1.50 / order (US-domestic)"],
                  ["US domestic carriers", "USPS, UPS, FedEx (we pass rates through)"],
                  ["Standard delivery", "2–5 business days, anywhere in continental US"],
                  ["Expedited", "Overnight, 2-day available on request"],
                  ["FBA prep", "Stickering, poly-bag, carton, palletization included"],
                  ["Customs / duties", "DDP — we pay, included in your unit price"],
                  ["Inventory visibility", "Real-time via shared spreadsheet or API"],
                  ["WMS system", "Cin7 Core + barcode tracking per SKU"],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="w-1/3 bg-[#faf9f6] px-4 py-3 text-sm font-bold md:px-6 md:py-4 md:text-base">
                      {k}
                    </td>
                    <td className="w-2/3 bg-white px-4 py-3 text-sm md:px-6 md:py-4 md:text-base">
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6 · USE CASES */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
              [ 008.C / When to use it ]
            </div>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
              Six scenarios where it pays for itself.
            </h2>
            <p className="mt-4 text-lg text-[#3a3a3a]">
              If any of these sound like your business, the US warehouse pays for itself in
              the first rush order.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <div
                key={u.title}
                className="border-2 border-[#0a0a0a] bg-white p-6"
              >
                <div className="mb-3 text-xs font-mono font-bold text-[#ff4d00]">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold leading-snug">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3a3a3a]">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · FAQ */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
            [ 008.D / FAQ ]
          </div>
          <h2 className="mt-3 mb-10 text-3xl font-extrabold leading-tight md:text-5xl">
            The questions buyers ask first.
          </h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-2 border-[#0a0a0a] bg-white p-6">
                <div className="mb-2 text-xs font-mono font-bold text-[#ff4d00]">
                  Q · {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold leading-snug md:text-xl">{f.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3a3a3a] md:text-base">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · CONTACT CTA */}
      <section className="bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-8 text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
            [ 008.E / Get a US stock quote ]
          </div>
          <h2 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            Tell us what you'd stock. We'll model the cost.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0]">
            Send us your best 3 designs and rough monthly volumes. We'll come back with a
            12-month landed cost model — Yiwu production + air freight to CA + US storage +
            ship-out — so you can see the per-piece economics before committing.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-2 text-xs font-mono uppercase tracking-wider text-[#ff4d00]">
                Warehouse
              </div>
              <p className="text-sm leading-relaxed text-[#a0a0a0]">
                13052 Jurupa Ave
                <br />
                Fontana, CA 92335
                <br />
                United States
              </p>
            </div>
            <div>
              <div className="mb-2 text-xs font-mono uppercase tracking-wider text-[#ff4d00]">
                WhatsApp
              </div>
              <a
                href="https://wa.me/8613764593988"
                className="text-sm leading-relaxed text-[#faf9f6] hover:text-[#ff4d00]"
              >
                +86 137 6459 3988
              </a>
            </div>
            <div>
              <div className="mb-2 text-xs font-mono uppercase tracking-wider text-[#ff4d00]">
                Email
              </div>
              <a
                href="mailto:ramon@sublimprint.com?subject=US%20warehouse%20quote"
                className="text-sm leading-relaxed text-[#faf9f6] hover:text-[#ff4d00]"
              >
                ramon@sublimprint.com
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-a-quote?process=sublimation&type=us-warehouse"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e64400] hover:border-[#e64400]"
            >
              Model my US stock →
            </Link>
            <Link
              href="/shipping/ddp"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]"
            >
              See DDP coverage →
            </Link>
          </div>
        </div>
      </section>

      {/* 9 · RELATED */}
      <section className="border-t-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#6b6b6b]">
            Related
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { href: "/shipping/ddp", title: "DDP shipping", desc: "Delivered duty paid to 100+ countries" },
              { href: "/shipping/global", title: "Global shipping", desc: "Sea, air, express — every region" },
              { href: "/products/jerseys", title: "Stock jerseys", desc: "Top 3 race/event designs" },
            ].map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group block border-2 border-[#0a0a0a] bg-white p-6 transition-colors hover:bg-[#0a0a0a] hover:text-[#faf9f6]"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-[#ff4d00]">
                  →
                </div>
                <div className="mt-2 text-lg font-bold">{r.title}</div>
                <div className="mt-1 text-sm text-[#6b6b6b] group-hover:text-[#a0a0a0]">
                  {r.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
