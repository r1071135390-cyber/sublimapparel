import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, ShieldCheck, Truck, Warehouse, MapPin, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "DDP Shipping — Duties Paid, Delivered to Your Door",
  description:
    "DDP (Delivered Duty Paid) shipping from Yiwu to 100+ countries. We handle customs, duties, and last-mile delivery — one invoice, no surprise fees. Domestic US shipping from Fontana, CA in 2–5 days.",
  keywords: [
    "DDP shipping",
    "duties paid shipping",
    "DDP from China",
    "Yiwu shipping",
    "overseas warehouse",
    "limited US buffer-storage (overstock only)",
    "global shipping apparel",
    "delivered duty paid",
  ],

  openGraph: {
    images: ["/shipping-hero.webp"],
  },
};

const whatDdp = [
  { tag: "DDP", label: "Delivered Duty Paid" },
  { tag: "DAP", label: "Delivered At Place" },
  { tag: "CIF", label: "Cost, Insurance & Freight" },
  { tag: "FOB", label: "Free On Board" },
  { tag: "EXW", label: "Ex Works" },
];

const weHandle = [
  { icon: ShieldCheck, title: "Customs clearance", desc: "We file the import paperwork, classify HS codes, and deal with customs on your behalf." },
  { icon: Truck, title: "Duty & tax payment", desc: "We pay VAT, GST, and import duties upfront. No surprise bills at your door." },
  { icon: Package, title: "Last-mile delivery", desc: "From our Yiwu warehouse to the buyer's shipping address — one tracking number, one invoice." },
  { icon: Warehouse, title: "Bonded warehousing", desc: "3PL facilities in Yiwu + Fontana, CA. We can hold inventory and ship on demand." },
];

const regions = [
  {
    region: "North America",
    icon: MapPin,
    rows: [
      { country: "United States (mainland)", ddp: "8–12 days from Yiwu", note: "Direct from factory to your door" },
      { country: "Canada", ddp: "12–18 days from Yiwu", note: "Duties & GST included" },
      { country: "Mexico", ddp: "15–22 days from Yiwu", note: "DDP available for orders > 50 pcs" },
    ],
  },
  {
    region: "Europe",
    icon: Globe,
    rows: [
      { country: "United Kingdom", ddp: "12–16 days from Yiwu", note: "Post-Brexit duties + VAT included" },
      { country: "EU (DE, FR, IT, ES, NL…)", ddp: "14–20 days from Yiwu", note: "IOSS registered · VAT pre-paid" },
      { country: "Nordic / Eastern Europe", ddp: "16–22 days from Yiwu", note: "DDP available · longer transit" },
    ],
  },
  {
    region: "Asia Pacific & ROW",
    icon: Globe,
    rows: [
      { country: "Australia / New Zealand", ddp: "14–20 days from Yiwu", note: "GST included" },
      { country: "Japan / South Korea", ddp: "8–14 days from Yiwu", note: "Fast lane · sea-air hybrid" },
      { country: "UAE / Saudi Arabia", ddp: "16–22 days from Yiwu", note: "DDP to GCC countries" },
    ],
  },
];

export default function DdpPage() {
  return (
    <main>
      {/* HERO */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
            DDP Shipping
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
            You order.
            <br />
            <span className="text-[#00c2ff]">We deliver.</span>
            <br />
            No customs.
            <br />
            No duties.
            <br />
            No paperwork.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/70 md:text-lg">
            DDP (Delivered Duty Paid) means one invoice, one tracking number,
            and zero surprise bills at the door. We handle customs, duties,
            and last-mile for every order — to 100+ countries, from Yiwu or
            the limited buffer-storage address in Fontana, California
            (overstock only — not a standard service).
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/get-a-quote"
              className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black hover:text-white"
            >
              Get DDP Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
            <Link
              href="/shipping/us-warehouse"
              className="group inline-flex items-center gap-2 border-2 border-white bg-transparent px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
            >
              US Warehouse
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* INCOTERMS comparison */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            Incoterms
          </div>
          <h2 className="mb-8 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            What does
            <br />
            <span className="text-[#ff4d00]">DDP actually mean?</span>
          </h2>
          <p className="mb-10 max-w-2xl text-base text-black/70">
            Incoterms define who is responsible for shipping, insurance, customs,
            and duties. DDP is the only one that puts 100% of the burden on us.
          </p>

          <div className="overflow-x-auto border-2 border-black">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-black bg-black text-left text-xs font-black uppercase tracking-widest text-white">
                  <th className="px-4 py-3">Term</th>
                  <th className="px-4 py-3">Who pays shipping</th>
                  <th className="px-4 py-3">Who pays duties</th>
                  <th className="px-4 py-3">Risk transfers at</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {whatDdp.map((r, i) => (
                  <tr
                    key={i}
                    className={
                      "border-b border-black/10 " +
                      (r.tag === "DDP" ? "bg-[#00c2ff]/10 font-bold" : i % 2 === 0 ? "bg-white" : "bg-neutral-50")
                    }
                  >
                    <td className="px-4 py-3 font-black">{r.tag}</td>
                    <td className="px-4 py-3 text-black/80">{r.label === "Delivered Duty Paid" ? "Us" : r.tag === "EXW" ? "You" : "Us"}</td>
                    <td className="px-4 py-3 text-black/80">{r.tag === "DDP" ? "Us" : "You"}</td>
                    <td className="px-4 py-3 text-black/80">
                      {r.tag === "DDP" && "Buyer's door"}
                      {r.tag === "DAP" && "Buyer's door (unpaid duties)"}
                      {r.tag === "CIF" && "Destination port"}
                      {r.tag === "FOB" && "Origin port"}
                      {r.tag === "EXW" && "Our factory floor"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs font-medium text-black/60">
            Note: DDP is not available for every country (some require importer-of-record). We&apos;ll confirm
            in your quote if DDP applies to your destination.
          </p>
        </div>
      </section>

      {/* WHAT WE HANDLE */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-12 flex items-end justify-between border-b border-black/10 pb-6">
            <div>
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-black/60">
                [ 002 / What we handle ]
              </div>
              <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
                From our factory
                <br />
                <span className="text-[#ff4d00]">to your buyer&apos;s door.</span>
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {weHandle.map((w, i) => {
              const Icon = w.icon;
              return (
                <div key={i} className="border-2 border-black bg-white p-6">
                  <Icon className="mb-4 h-7 w-7 text-[#ff4d00]" strokeWidth={1.5} />
                  <h3 className="mb-2 text-lg font-black leading-tight">{w.title}</h3>
                  <p className="text-sm leading-relaxed text-black/70">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REGIONS — where we ship */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 flex items-end justify-between border-b border-black/10 pb-6">
            <div>
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-black/60">
                [ 003 / Coverage ]
              </div>
              <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
                DDP to
                <br />
                <span className="text-[#ff4d00]">100+ countries.</span>
              </h2>
            </div>
            <div className="hidden text-right md:block">
              <div className="text-xs font-bold uppercase tracking-widest text-black/60">Average lead time</div>
              <div className="mt-1 text-3xl font-black">8–22 days</div>
            </div>
          </div>

          <div className="space-y-8">
            {regions.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className="border-2 border-black">
                  <div className="flex items-center gap-3 border-b-2 border-black bg-black px-5 py-3 text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                    <h3 className="text-lg font-black uppercase tracking-wider">{r.region}</h3>
                  </div>
                  <div className="divide-y divide-black/10">
                    {r.rows.map((row, j) => (
                      <div key={j} className="grid gap-1 px-5 py-4 md:grid-cols-3 md:gap-4">
                        <div className="font-black">{row.country}</div>
                        <div className="text-sm text-black/80">{row.ddp}</div>
                        <div className="text-xs font-medium uppercase tracking-wider text-black/50">
                          {row.note}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-sm text-black/60">
            Transit times are estimates for production-ready orders. Custom designs, large volumes,
            and remote destinations may take longer. Final timing is confirmed in your quote.
          </p>
        </div>
      </section>

      {/* WHY DDP — the trust argument */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Why DDP
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            The shipping quote is
            <br />
            <span className="text-[#ff4d00]">the price you actually pay.</span>
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="border-2 border-white/20 bg-white/5 p-6">
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
                For brand owners
              </div>
              <h3 className="mb-2 text-xl font-black">Sell at the listed price</h3>
              <p className="text-sm leading-relaxed text-white/70">
                No surprise customs bills to your customers. No &quot;we forgot to
                add duties&quot; emails. The price you see is the price they pay.
              </p>
            </div>
            <div className="border-2 border-white/20 bg-white/5 p-6">
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
                For resellers
              </div>
              <h3 className="mb-2 text-xl font-black">Predictable margin</h3>
              <p className="text-sm leading-relaxed text-white/70">
                Set your retail price once. We don&apos;t hit you with variable duty
                costs on every order — landed cost is locked in.
              </p>
            </div>
            <div className="border-2 border-white/20 bg-white/5 p-6">
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
                For event teams
              </div>
              <h3 className="mb-2 text-xl font-black">One PO, one invoice</h3>
              <p className="text-sm leading-relaxed text-white/70">
                Your finance team doesn&apos;t need to set up a customs broker.
                We are your customs broker.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ff4d00] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <h2 className="text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Get a DDP quote
            <br />
            within 1 business day.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-lg">
            Tell us the destination country, postal code, and quantity.
            We&apos;ll come back with a single landed price.
          </p>
          <Link
            href="/get-a-quote"
            className="mt-8 inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
          >
            Get DDP Quote
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
