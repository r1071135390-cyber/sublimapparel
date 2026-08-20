import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Plane, Ship, Truck, Package, Shield, Clock, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Worldwide Shipping · DDP to 100+ Countries from Yiwu Factory",
  description:
    "Sea, air, and express shipping from Yiwu to 100+ countries. DDP delivered duty paid to US, UK, EU, AU, CA. Incoterms FOB, CIF, DDP, EXW. Track every shipment end-to-end.",
  keywords: [
    "worldwide shipping",
    "global shipping",
    "ddp shipping",
    "international shipping",
    "yiwu worldwide",
    "factory direct shipping",
    "incoterms ddp fob cif",
    "sea air express",
    "global fulfillment",
  ],

  openGraph: {
    images: ["/shipping-hero.webp"],
  },
};

const stats = [
  { value: "100+", unit: "COUNTRIES", label: "Delivered to" },
  { value: "5", unit: "MODES", label: "Sea · Air · Express · Rail · Truck" },
  { value: "3–25", unit: "DAYS", label: "Transit range" },
  { value: "99.6%", unit: "ON-TIME", label: "Tracking delivery rate" },
];

const shippingModes = [
  {
    icon: <Ship className="h-5 w-5" />,
    title: "Sea freight (FCL / LCL)",
    body: "Full container or shared container. 15–25 days to US west coast, 25–35 days to EU. Cheapest per kg. Best for orders 500+ kg or 1,000+ pieces.",
    price: "$2–5 / kg",
    time: "15–35 days",
  },
  {
    icon: <Plane className="h-5 w-5" />,
    title: "Air freight",
    body: "Airport-to-airport or door-to-door. 5–9 days end-to-end. Best for 200–2,000 kg urgent orders where the unit cost is high enough to absorb air rates.",
    price: "$5–9 / kg",
    time: "5–9 days",
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: "Express (DHL / FedEx / UPS)",
    body: "Door-to-door, fully tracked, customs cleared. 3–7 days. Best for samples, rush orders, low-volume high-value shipments.",
    price: "$8–15 / kg",
    time: "3–7 days",
  },
  {
    icon: <Package className="h-5 w-5" />,
    title: "Rail freight (China–Europe)",
    body: "Yiwu → Duisburg / Hamburg / Madrid via China Railway Express. 18–22 days, ~40% cheaper than air. Newer option, gaining share for EU shipments.",
    price: "$3–6 / kg",
    time: "18–22 days",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "DDP — Delivered Duty Paid",
    body: "We pay all import duties, tariffs, and brokerage. You see one landed cost. Available to US, CA, UK, DE, FR, IT, ES, AU, NZ, JP, KR, MX, BR and 100+ more.",
    price: "Included",
    time: "Same as mode",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Insurance + tracking",
    body: "All shipments include full-value insurance and end-to-end tracking. Real-time milestone updates, photo on delivery available on request.",
    price: "0.3% of value",
    time: "—",
  },
];

const regionTransit = [
  { region: "USA (West)", sea: "15–20d", air: "5–7d", exp: "3–5d", ddp: "Yes" },
  { region: "USA (East)", sea: "22–28d", air: "6–8d", exp: "3–5d", ddp: "Yes" },
  { region: "Canada", sea: "20–25d", air: "6–8d", exp: "4–6d", ddp: "Yes" },
  { region: "Mexico", sea: "20–25d", air: "7–9d", exp: "4–6d", ddp: "Yes" },
  { region: "UK", sea: "28–32d", air: "7–8d", exp: "4–6d", ddp: "Yes" },
  { region: "EU (Germany)", sea: "30–35d", air: "7–8d", exp: "4–6d", ddp: "Yes" },
  { region: "EU (Spain / Italy)", sea: "32–38d", air: "8–9d", exp: "5–7d", ddp: "Yes" },
  { region: "Australia", sea: "20–25d", air: "6–8d", exp: "4–6d", ddp: "Yes" },
  { region: "New Zealand", sea: "25–30d", air: "7–9d", exp: "5–7d", ddp: "Yes" },
  { region: "UAE / Saudi", sea: "20–25d", air: "5–7d", exp: "4–5d", ddp: "Yes" },
  { region: "Japan / Korea", sea: "5–8d", air: "3–4d", exp: "2–3d", ddp: "Yes" },
  { region: "Southeast Asia", sea: "5–10d", air: "3–5d", exp: "2–4d", ddp: "Yes" },
  { region: "Brazil / Argentina", sea: "35–45d", air: "9–12d", exp: "6–8d", ddp: "Yes" },
  { region: "South Africa", sea: "30–40d", air: "8–10d", exp: "5–7d", ddp: "Yes" },
];

const useCases = [
  {
    title: "First-time US buyers without an import license",
    body: "Use DDP. We handle customs entry, duties, and last-mile. You receive the boxes at your warehouse, sign once, done. No Importer of Record setup needed.",
  },
  {
    title: "European brand with quarterly drops",
    body: "Sea to Hamburg in 30 days, rail to inland EU in 18-22 days, air for the 20% of SKUs that move fast. Mix modes by SKU velocity.",
  },
  {
    title: "Australian ad agency with campaign deadlines",
    body: "Express to Sydney in 4-6 days, or DDP sea for non-rush bulk. 5+ agency clients on this flow already.",
  },
  {
    title: "Brazilian soccer club with 6-week lead times",
    body: "Sea freight Santos / Itajaí in 35-45 days. Plan 8 weeks ahead and lock the shipping mode at quote, not at ship date.",
  },
  {
    title: "Dropshipper / POD with 50+ small orders/week",
    body: "DHL/FedEx from our Yiwu factory. We pack per-order, you receive tracking same day, your customer gets it in 5-7 days.",
  },
  {
    title: "Middle East distributor needing bonded stock",
    body: "DDP sea to Jebel Ali in 22-25 days, then re-distribute across GCC. One master shipment, customs cleared at port of entry.",
  },
];

const faqs = [
  {
    q: "What's the difference between FOB, CIF, and DDP?",
    a: "FOB (Free On Board): we deliver to the origin port, you handle freight + insurance + duties. CIF (Cost, Insurance, Freight): we deliver to your destination port, you handle duties and last-mile. DDP (Delivered Duty Paid): we deliver to your door with all duties paid — you receive the boxes, sign once. Most US/EU first-time buyers choose DDP. Experienced importers often prefer FOB or CIF for cost.",
  },
  {
    q: "Can I use my own freight forwarder?",
    a: "Yes. Quote us EXW (Ex Works) and your forwarder picks up at our Yiwu factory gate. We have 100+ clients who do exactly this. We can also recommend forwarders if you don't have one yet.",
  },
  {
    q: "How do you handle duties under DDP?",
    a: "We use Section 321 de minimis for US orders under $800 (no duties, no formal entry). For larger US orders, we use a US Importer of Record and pay all duties + brokerage. For EU, we use IOR via our Netherlands entity. For UK, our UK Ltd entity. For AU/CA, similar local IOR structures. You see one landed price — we eat the customs complexity.",
  },
  {
    q: "What if my shipment gets stuck in customs?",
    a: "Our broker handles the release. If there is a documentation issue (HS code, certificate of origin, etc.), we resolve at our cost. We've had 1 customs hold in the last 24 months across 8,000+ shipments. We keep duty rates current with HTS / TARIC updates.",
  },
];

export default function GlobalShippingPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0a0a0a]">
      {/* 1 · HERO */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-6 text-xs font-mono uppercase tracking-widest text-[#0078a8]">
            [ 009 / Shipping &amp; logistics ]
          </div>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            <span className="block">Worldwide.</span>
            <span className="block text-[#cc3d00]">Delivered duty paid.</span>
            <span className="block">One landed cost.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0] md:text-xl">
            Sea, air, express, rail, and truck from our Yiwu factory to 100+ countries. DDP
            to the US, UK, EU, AU, CA, JP, KR, MX, BR, and 90+ more — customs, duties, and
            last-mile included. You receive the boxes, sign once.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-a-quote?process=sublimation&type=global"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#00c2ff] bg-[#00c2ff] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#0a0a0a] transition-colors hover:bg-[#00a8db] hover:border-[#00a8db]"
            >
              Quote my shipment →
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
                <span className="ml-1 text-base font-bold text-[#cc3d00] md:text-lg">
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
          <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
            [ Why global shipping ]
          </div>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
            The hard part of importing isn't the freight.{" "}
            <span className="text-[#cc3d00]">It's the customs.</span>
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[#3a3a3a] md:text-lg">
            <p>
              Anyone can put your boxes on a boat. The actual work is HS code classification,
              certificates of origin, country-of-origin labeling, Section 321 thresholds, EU
              VAT, UK customs declarations, AU GST — and that's before you even think about
              the 4-day delay because a random customs officer wants to inspect a 20-foot
              container of t-shirts.
            </p>
            <p>
              <strong className="text-[#0a0a0a]">We do this 50+ times a month, to 100+ countries.</strong>{" "}
              Our logistics team has shipped enough apparel to know every customs quirk in
              every major market. We classify your product, prep every document, file entry,
              pay duty, and deliver to your door — one landed cost, no surprises. You don't
              need an import license, an IOR, or a customs broker relationship to work with
              us.
            </p>
            <p>
              We do have a Fontana, CA address for occasional overstock buffer storage — but it&apos;s
              a Tier-2 add-on, not a standard service. Read the{" "}
              <Link href="/shipping/us-warehouse/" className="font-bold text-[#cc3d00] underline">
                honest note about it
              </Link>
              {" "}before assuming it applies to your order.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · SHIPPING MODES */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#1a1a1a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#0078a8]">
              [ 009.A / Modes of transport ]
            </div>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
              Five shipping modes. One trade-off.
            </h2>
            <p className="mt-4 text-lg text-[#a0a0a0]">
              Speed vs cost. We'll model the right mix for your order — sea for the bulk
              balance, air or express for the urgent top-up.
            </p>
          </div>
          <div className="grid gap-px bg-[#0a0a0a] md:grid-cols-2 lg:grid-cols-3">
            {shippingModes.map((m) => (
              <div key={m.title} className="bg-[#1a1a1a] p-8">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border-2 border-[#00c2ff] text-[#0078a8]">
                  {m.icon}
                </div>
                <h3 className="text-lg font-bold leading-snug">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#a0a0a0]">{m.body}</p>
                <div className="mt-4 flex items-center gap-4 border-t-2 border-[#0a0a0a] pt-3 text-xs">
                  <div>
                    <div className="font-mono uppercase text-[#6b6b6b]">Cost</div>
                    <div className="font-bold text-[#cc3d00]">{m.price}</div>
                  </div>
                  <div>
                    <div className="font-mono uppercase text-[#6b6b6b]">Time</div>
                    <div className="font-bold text-[#0078a8]">{m.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · REGION TRANSIT TABLE */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
            [ 009.B / Transit times by region ]
          </div>
          <h2 className="mt-3 mb-10 text-3xl font-extrabold leading-tight md:text-5xl">
            Pick your destination. See the time.
          </h2>
          <p className="mb-8 max-w-2xl text-base text-[#3a3a3a] md:text-lg">
            Days are end-to-end from our Yiwu factory gate to your delivery address. DDP
            adds 1–3 days vs the bare mode (for customs clearance), but eliminates the
            paperwork on your side.
          </p>
          <div className="overflow-x-auto border-2 border-[#0a0a0a]">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#0a0a0a] text-[#faf9f6]">
                  <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider md:px-6 md:py-4 md:text-sm">
                    Region
                  </th>
                  <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-[#0078a8] md:px-6 md:py-4 md:text-sm">
                    Sea
                  </th>
                  <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-[#0078a8] md:px-6 md:py-4 md:text-sm">
                    Air
                  </th>
                  <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-[#0078a8] md:px-6 md:py-4 md:text-sm">
                    Express
                  </th>
                  <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-[#cc3d00] md:px-6 md:py-4 md:text-sm">
                    DDP
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#0a0a0a] bg-white">
                {regionTransit.map((r) => (
                  <tr key={r.region}>
                    <td className="bg-[#faf9f6] px-3 py-3 text-sm font-bold md:px-6 md:py-3 md:text-base">
                      {r.region}
                    </td>
                    <td className="px-3 py-3 text-sm md:px-6 md:py-3 md:text-base">
                      {r.sea}
                    </td>
                    <td className="px-3 py-3 text-sm md:px-6 md:py-3 md:text-base">
                      {r.air}
                    </td>
                    <td className="px-3 py-3 text-sm md:px-6 md:py-3 md:text-base">
                      {r.exp}
                    </td>
                    <td className="px-3 py-3 text-sm font-bold text-[#cc3d00] md:px-6 md:py-3 md:text-base">
                      {r.ddp}
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
            <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
              [ 009.C / When to use which mode ]
            </div>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
              Six scenarios we already ship.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <div
                key={u.title}
                className="border-2 border-[#0a0a0a] bg-white p-6"
              >
                <div className="mb-3 text-xs font-mono font-bold text-[#cc3d00]">
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
          <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
            [ 009.D / FAQ ]
          </div>
          <h2 className="mt-3 mb-10 text-3xl font-extrabold leading-tight md:text-5xl">
            The customs questions.
          </h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-2 border-[#0a0a0a] bg-white p-6">
                <div className="mb-2 text-xs font-mono font-bold text-[#cc3d00]">
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

      {/* 8 · CTA */}
      <section className="bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-8 text-xs font-mono uppercase tracking-widest text-[#0078a8]">
            [ 009.E / Quote a shipment ]
          </div>
          <h2 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            Tell us where. We'll quote the route.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0]">
            Send destination, quantity, and target delivery date. We'll model sea + air
            options, DDP vs FOB, and any region-specific requirements (UKCA marking, EU
            REACH, JP PSE, etc.) so you can pick the right mode.
          </p>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-a-quote?process=sublimation&type=global"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#00c2ff] bg-[#00c2ff] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#0a0a0a] transition-colors hover:bg-[#00a8db] hover:border-[#00a8db]"
            >
              Quote my route →
            </Link>
            <Link
              href="/shipping/ddp/"
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
              { href: "/shipping/ddp", title: "DDP shipping", desc: "Delivered duty paid, no import license needed" },
              { href: "/shipping/us-warehouse", title: "US warehouse (add-on)", desc: "Honest note on our limited Fontana buffer storage" },
              { href: "/products", title: "All products", desc: "6 categories, DDP-ready" },
            ].map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group block border-2 border-[#0a0a0a] bg-white p-6 transition-colors hover:bg-[#0a0a0a] hover:text-[#faf9f6]"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-[#cc3d00]">
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
