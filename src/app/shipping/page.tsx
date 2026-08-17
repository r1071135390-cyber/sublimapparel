import type { Metadata } from"next";
import Link from"next/link";
import Image from"next/image";
import {
  ArrowRight,
  Globe,
  Zap,
  Plane,
  Ship,
  Warehouse,
  Truck,
  Clock,
  DollarSign,
  ShieldCheck,
  FileCheck,
  Receipt,
  MapPin,
  Package,
  CheckCircle2,
  HelpCircle,
  Container,
  Tag,
  Calendar,
} from"lucide-react";
import { RequestQuoteLink } from "@/components/request-quote-link";

export const metadata: Metadata = {
  title:"Shipping & Fulfillment — DDP Worldwide",
  description:
"DDP shipping to 100+ countries, with one invoice, no surprise duties. Sea, air and express options from Yiwu to your door.",
  openGraph: {
    title:"Shipping & Fulfillment — DDP Worldwide",
    description:
"DDP to 100+ countries, US warehouse in 2-5 days, or your own freight forwarder. One quote, no surprise duties.",
    images: ["/shipping-hero.webp"],
  },
};

const options = [
  {
    slug:"ddp",
    name:"DDP Shipping",
    tagline:"Duties paid. We handle everything.",
    icon: Globe,
    badge:"Most popular",
    badgeColor:"bg-[#ff4d00] text-white",
    desc:"Delivered Duty Paid to 100+ countries from Yiwu. Customs, duties, and last-mile — one invoice, no surprise bills.",
    href:"/shipping/ddp",
  },
  {
    slug:"express",
    name:"Express (DHL / FedEx)",
    tagline:"3-5 days. For small urgent orders.",
    icon: Zap,
    badge:"Door to door",
    badgeColor:"bg-[#0a0a0a] text-white",
    desc:"DHL / FedEx / UPS door-to-door for samples, re-orders, and small urgent shipments up to ~300kg. Full tracking, insurance included.",
    href:"/get-a-quote",
  },
  {
    slug:"air",
    name:"Air Freight",
    tagline:"5-10 days. Mid-size urgent.",
    icon: Plane,
    badge:"Airport to airport",
    badgeColor:"bg-black/10 text-black",
    desc:"For 100-1,000kg urgent orders where sea is too slow but express is too expensive. We deliver to your nearest international airport.",
    href:"/get-a-quote",
  },
  {
    slug:"sea",
    name:"Sea Freight",
    tagline:"18-40 days. Best cost per kg.",
    icon: Ship,
    badge:"FCL · LCL",
    badgeColor:"bg-black/10 text-black",
    desc:"FCL (full container) or LCL (shared container) for bulk orders above 500kg. Cheapest per kg, slowest transit. We book with our NVOCC partner.",
    href:"/get-a-quote",
  },
];

// Supplementary services — for specific use cases, not the main 4 modes
const supplementary = [
  {
    slug:"fob",
    name:"FOB / CIF / EXW",
    tagline:"For buyers with their own freight forwarder.",
    icon: Container,
    desc:"If you already have a US/EU freight forwarder and prefer to arrange your own shipping, we can quote FOB Yiwu, CIF your-port, or EXW factory-gate terms. We hand over the goods at the agreed point; you take it from there.",
    href:"/get-a-quote",
    note:"Useful when you have negotiated freight rates, an in-house customs broker, or a bonded warehouse network.",
  },
  {
    slug:"buffer-storage",
    name:"Buffer Storage (US Warehouse)",
    tagline:"Only useful for over-orders you don't need yet.",
    icon: Warehouse,
    desc:"Most of our orders are custom-printed and ship directly from Yiwu — there's nothing to \"stock\" because every piece is made to order. The only use case is when you order ahead of demand: 1,000 pcs now, 500 needed immediately, 500 held for a later drop. The 500 sit in our California warehouse until you call them in.",
    href:"/shipping/us-warehouse",
    note:"Honest caveat: this isn't a standard service. It doesn't change your unit price. It only avoids re-production cost on surplus. Ask before counting on it.",
  },
];

// Transit time by region + shipping mode
const transitMatrix = [
  {
    region:"USA",
    icon: MapPin,
    flag:"US",
    rows: [
      { mode:"Express (DHL/FedEx)", days:"3-5", cost:"$$$" },
      { mode:"Air freight", days:"5-8", cost:"$$" },
      { mode:"Sea (LCL)", days:"18-25", cost:"$" },
      { mode:"US Warehouse (after bulk)", days:"2-5", cost:"$" },
    ],
  },
  {
    region:"UK / EU",
    icon: MapPin,
    flag:"EU",
    rows: [
      { mode:"Express (DHL/FedEx)", days:"4-6", cost:"$$$" },
      { mode:"Air freight", days:"6-9", cost:"$$" },
      { mode:"Sea (LCL)", days:"28-35", cost:"$" },
      { mode:"Rail (to DE)", days:"18-22", cost:"$$" },
    ],
  },
  {
    region:"Canada / Mexico",
    icon: MapPin,
    flag:"CA",
    rows: [
      { mode:"Express (DHL/FedEx)", days:"4-6", cost:"$$$" },
      { mode:"Air freight", days:"6-9", cost:"$$" },
      { mode:"Sea (LCL)", days:"22-30", cost:"$" },
      { mode:"Road (to MX)", days:"12-18", cost:"$$" },
    ],
  },
  {
    region:"Australia / NZ",
    icon: MapPin,
    flag:"AU",
    rows: [
      { mode:"Express (DHL/FedEx)", days:"4-7", cost:"$$$" },
      { mode:"Air freight", days:"7-10", cost:"$$" },
      { mode:"Sea (LCL)", days:"30-40", cost:"$" },
    ],
  },
  {
    region:"Middle East",
    icon: MapPin,
    flag:"AE",
    rows: [
      { mode:"Express (DHL/FedEx)", days:"4-6", cost:"$$$" },
      { mode:"Air freight", days:"6-9", cost:"$$" },
      { mode:"Sea (LCL)", days:"25-32", cost:"$" },
    ],
  },
  {
    region:"Asia / Pacific",
    icon: MapPin,
    flag:"JP",
    rows: [
      { mode:"Express (DHL/FedEx)", days:"3-5", cost:"$$$" },
      { mode:"Air freight", days:"5-7", cost:"$$" },
      { mode:"Sea (LCL)", days:"8-14", cost:"$" },
    ],
  },
];

// Sample cost scenarios
const costExamples = [
  {
    title:"500 jerseys → USA (DDP)",
    weight:"~180 kg / 4 cartons",
    mode:"Sea (LCL) to LA, then domestic",
    breakdown: [
      { item:"Production (500 pcs)", cost:"$4,500" },
      { item:"Sea freight Yiwu → LA", cost:"$680" },
      { item:"US import duties (16.5%)", cost:"$743" },
      { item:"Customs clearance", cost:"$120" },
      { item:"Last-mile (LA → 3 zip codes)", cost:"$240" },
    ],
    total:"$6,283",
    perPiece:"$12.57 / piece",
    note:"All-in. No surprise bills.",
  },
  {
    title:"200 t-shirts → Germany (DDP)",
    weight:"~60 kg / 2 cartons",
    mode:"Express (DHL) to DE",
    breakdown: [
      { item:"Production (200 pcs)", cost:"$1,400" },
      { item:"Express freight (DHL)", cost:"$420" },
      { item:"EU import duties (12%)", cost:"$218" },
      { item:"VAT (19% DE)", cost:"$387" },
      { item:"Last-mile (DHL Europarcel)", cost:"$85" },
    ],
    total:"$2,510",
    perPiece:"$12.55 / piece",
    note:"Door-to-door. 5 days.",
  },
  {
    title:"50 hoodies → Sydney (DDP)",
    weight:"~30 kg / 1 carton",
    mode:"Air freight to SYD",
    breakdown: [
      { item:"Production (50 pcs)", cost:"$1,150" },
      { item:"Air freight Yiwu → SYD", cost:"$310" },
      { item:"AU import duties (10%)", cost:"$146" },
      { item:"GST (10%)", cost:"$161" },
      { item:"Last-mile (AU Post)", cost:"$95" },
    ],
    total:"$1,862",
    perPiece:"$37.24 / piece",
    note:"Small order shipped by air.",
  },
];

// DDP process steps
const ddpSteps = [
  {
    step:"01",
    icon: Receipt,
    title:"You place the order",
    text:"Send your tech pack or design file, we confirm quantity, size run, and delivery address. We issue one invoice that includes production + freight + duties + last-mile.",
  },
  {
    step:"02",
    icon: Package,
    title:"We produce in Yiwu",
    text:"Production takes 12-18 days depending on technique. While we sew, we book your freight slot and pre-file customs paperwork so there is zero idle time on the goods.",
  },
  {
    step:"03",
    icon: Ship,
    title:"We ship from Yiwu",
    text:"Goods leave our factory by express, air, sea, or rail. We pick the best mode for your deadline and budget. Each carton has a unique tracking ID.",
  },
  {
    step:"04",
    icon: FileCheck,
    title:"We clear customs",
    text:"Our broker handles the customs declaration, HS code classification, and duty payment in the destination country. You do not lift a finger or sign anything.",
  },
  {
    step:"05",
    icon: Truck,
    title:"We deliver to your door",
    text:"Last-mile carrier (UPS, FedEx, DHL, USPS, Royal Mail, AusPost, etc.) brings the cartons to your loading dock. You get a final delivery confirmation with photo proof.",
  },
];

// DDP value props
const ddpProps = [
  {
    icon: DollarSign,
    title:"One invoice",
    text:"Production + freight + duties + VAT + last-mile — all on one quote. No hidden fees appear after the order ships.",
  },
  {
    icon: CheckCircle2,
    title:"No customs paperwork",
    text:"We pre-file all import documents before the goods leave China. Our broker pays duties on your behalf and rolls it into the invoice.",
  },
  {
    icon: ShieldCheck,
    title:"Insurance included",
    text:"All DDP shipments include door-to-door transit insurance. If cartons are lost or damaged in transit, we file the claim and replace at no cost.",
  },
  {
    icon: Clock,
    title:"Predictable transit",
    text:"Express DDP: 3-7 days anywhere. Air DDP: 5-10 days. Sea DDP: 18-40 days. You pick the speed, we lock the date.",
  },
];

// FAQs
const faqs = [
  {
    q:"What does DDP actually include?",
    a:"Delivered Duty Paid means we pay for everything between our factory floor and your loading dock: freight, fuel surcharges, customs clearance, import duties, VAT/GST, and last-mile delivery. You get one invoice and the goods show up. No broker, no customs form, no surprise bill from the carrier weeks later.",
  },
  {
    q:"What is the minimum order for DDP?",
    a:"There is no minimum for DDP shipping itself — we can DDP a single carton if needed. The minimum order quantity is on the production side (typically 50 pieces per design). For tiny orders (under 30 pieces) we usually recommend express DDP by DHL/FedEx since air freight has minimums.",
  },
  {
    q:"Can I use my own freight forwarder?",
    a:"Yes. We can quote FOB Yiwu (you arrange shipping from our factory), CIF (we arrange shipping to your port but you handle import), or EXW (you pick up at our factory). Most US and EU buyers use our DDP because the customs paperwork is heavy. Some Australian and Canadian buyers with their own brokers prefer FOB.",
  },
  {
    q:"How accurate are the transit times?",
    a:"Express DDP transit is 95% accurate — DHL/FedEx tracking is real-time. Air freight transit is 90% accurate — weather and capacity can add 1-2 days. Sea LCL transit is 80% accurate — port congestion, customs holds, and transshipment can add 3-7 days. We always quote a range, not a single date.",
  },
  {
    q:"What if my country is not on your DDP list?",
    a:"We can DDP to 100+ countries including most EU, North America, South America, Oceania, Middle East, and Southeast Asia. For countries we cannot DDP into directly (some African and Central Asian destinations), we ship DAP to your nearest major port and you arrange the last customs step. We will always tell you upfront.",
  },
  {
    q:"Who pays if customs holds the shipment?",
    a:"If customs holds a DDP shipment due to a documentation error on our side, we fix it at no cost and cover any storage fees. If customs holds due to a buyer-side issue (denied import permit, unpaid local tax, banned item), the buyer covers the storage and any return shipping. This is rare but it happens — we will tell you the day we find out, not a week later.",
  },
];

export default function ShippingPage() {
  return (
    <main>
      {/* HERO */}
      {/* HERO — dark text on left, warehouse image on right (same pattern as home page) */}
      <section className="relative overflow-hidden border-b-2 border-black bg-[#0a0a0a] text-white">
        {/* Image — right side, full-bleed, masked on the left so text stays readable */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden md:block md:w-[58%]"
          aria-hidden="true"
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/shipping-hero.webp')" }}
          />
          {/* Fade the left edge of the image into the dark background so the text stays clean */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #0a0a0a 0%, #0a0a0a 18%, rgba(10,10,10,0.55) 38%, rgba(10,10,10,0) 60%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="mb-5 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
              Shipping & Fulfillment
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              From our line
              <br />
              <span className="text-[#00c2ff]">to your door.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/75 md:text-lg">
              One invoice. One carrier. Zero customs headaches. We ship DDP to
              100+ countries — your address, an Amazon FBA warehouse, or any
              commercial / residential door in between.
            </p>

            {/* Stat row */}
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-8 sm:grid-cols-4">
              <div>
                <div className="text-3xl font-black text-white md:text-4xl">50+</div>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/60">
                  Countries
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">0</div>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/60">
                  Hidden Fees
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-white md:text-4xl">99.3%</div>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/60">
                  On-Time
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-white md:text-4xl">5-7d</div>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/60">
                  US West
                </div>
              </div>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-black uppercase tracking-widest text-white/70">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00c2ff]" strokeWidth={2.5} />
                Door-to-door insurance
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00c2ff]" strokeWidth={2.5} />
                Real-time tracking
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00c2ff]" strokeWidth={2.5} />
                One invoice, no surprises
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 SHIPPING OPTIONS */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            Choose your shipping
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Four ways to ship.
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {options.map((o) => {
              const Icon = o.icon;
              return (
                <Link
                  key={o.slug}
                  href={o.href}
                  className="group flex flex-col border-2 border-black bg-white p-6 transition-all hover:border-[#ff4d00]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Icon className="h-7 w-7 text-[#ff4d00]" strokeWidth={1.5} />
                    <span className={"px-2 py-1 text-[10px] font-black uppercase tracking-widest" + o.badgeColor}>
                      {o.badge}
                    </span>
                  </div>
                  <h3 className="mb-2 text-2xl font-black leading-none">{o.name}</h3>
                  <p className="mb-4 text-xs font-black uppercase tracking-widest text-[#ff4d00]">{o.tagline}</p>
                  <p className="mb-6 flex-1 text-sm text-black/70">{o.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black transition-colors group-hover:text-[#ff4d00]">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRANSIT TIME MATRIX */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-[#0a0a0a] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Transit time
          </div>
          <h2 className="mb-4 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            How long does shipping take?
          </h2>
          <p className="mb-12 max-w-3xl text-base text-black/70 md:text-lg">
            Real ranges from Yiwu to your destination, including production lead
            time. Pick by region, then by speed. We will always recommend the
            most reliable mode for your deadline when you ask for a quote.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {transitMatrix.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.region}
                  className="border-2 border-black bg-[#faf9f6] p-6"
                >
                  <div className="mb-4 flex items-center justify-between border-b-2 border-black/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-[#ff4d00]" strokeWidth={2} />
                      <h3 className="text-lg font-black">{r.region}</h3>
                    </div>
                    <span className="font-mono text-xs font-black text-black/40">
                      {r.flag}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {r.rows.map((row) => (
                      <div
                        key={row.mode}
                        className="flex items-center justify-between border-b border-black/5 py-2 text-sm last:border-b-0"
                      >
                        <span className="font-medium text-black/80">
                          {row.mode}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-black text-[#ff4d00]">
                            {row.days}d
                          </span>
                          <span className="font-mono text-xs text-black/40">
                            {row.cost}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-black/50">
            <span className="font-mono font-black">$</span> = cheapest ·{" "}
            <span className="font-mono font-black">$$</span> = mid ·{" "}
            <span className="font-mono font-black">$$$</span> = fastest.
            Door-to-door, including production lead time. For specific dates
            to your zip code, ask for a quote.
          </p>
        </div>
      </section>
      {/* SHIPMENT SIZES VISUAL */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            Real packages
          </div>
          <h2 className="mb-4 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            What your shipment actually looks like.
          </h2>
          <p className="mb-10 max-w-3xl text-base text-black/70 md:text-lg">
            Same three orders from the table above. One photo each. No
            rendering, no stock image — these are the actual shipment sizes
            we pack and ship every week.
          </p>

          <div className="relative aspect-[16/9] w-full overflow-hidden border-2 border-black bg-white">
            <Image
              src="/shipping-cost-real.webp"
              alt="Three different shipment sizes: 1kg DHL sample box with one printed T-shirt, 50kg mid-size order stacked on a wooden pallet ready for air freight, 500kg bulk order being loaded into a 20ft shipping container"
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
              priority={false}
            />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="border-l-4 border-[#ff4d00] bg-white p-5">
              <div className="text-xs font-black uppercase tracking-widest text-[#ff4d00]">Left — 1 kg</div>
              <div className="mt-1 text-lg font-black">A single DHL box. One T-shirt inside.</div>
              <p className="mt-2 text-sm text-black/70">Used for samples and try-on orders. The shirt ships with a blank shipping label so you can re-pack it for your own customer without removing stickers.</p>
            </div>
            <div className="border-l-4 border-[#00c2ff] bg-white p-5">
              <div className="text-xs font-black uppercase tracking-widest text-[#00c2ff]">Center — 50 kg</div>
              <div className="mt-1 text-lg font-black">Four cartons on a wooden pallet.</div>
              <p className="mt-2 text-sm text-black/70">A typical mid-size event or team order. Stretch-wrapped, marked with your PO number, and loaded onto the next air-freight flight out of PVG or SZX.</p>
            </div>
            <div className="border-l-4 border-black bg-white p-5">
              <div className="text-xs font-black uppercase tracking-widest">Right — 500 kg</div>
              <div className="mt-1 text-lg font-black">Bulk cartons going into a 20ft container.</div>
              <p className="mt-2 text-sm text-black/70">Full-container or LCL sea freight. We book the container, load at our Yiwu dock, and you see the same boxes roll off a US West Coast port 18-22 days later.</p>
            </div>
          </div>
        </div>
      </section>


      {/* SAMPLE COST CALCULATIONS */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Real cost examples
          </div>
          <h2 className="mb-4 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            What does shipping actually cost?
          </h2>
          <p className="mb-12 max-w-3xl text-base text-white/70 md:text-lg">
            Three recent orders we shipped DDP, broken down line by line. No
            marketing math, no asterisks. Your quote will look like this.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            {costExamples.map((ex) => (
              <div
                key={ex.title}
                className="flex flex-col border-2 border-white/20 bg-[#1a1a1a] p-6"
              >
                <div className="mb-4 border-b-2 border-white/10 pb-4">
                  <h3 className="mb-2 text-xl font-black leading-tight">
                    {ex.title}
                  </h3>
                  <p className="text-xs text-white/60">{ex.weight}</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
                    {ex.mode}
                  </p>
                </div>
                <div className="flex-1 space-y-2">
                  {ex.breakdown.map((line) => (
                    <div
                      key={line.item}
                      className="flex items-center justify-between border-b border-white/5 py-1.5 text-sm last:border-b-0"
                    >
                      <span className="text-white/80">{line.item}</span>
                      <span className="font-mono font-black text-white">
                        {line.cost}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t-2 border-white/20 pt-4">
                  <div className="mb-1 flex items-baseline justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-white/60">
                      All-in total
                    </span>
                    <span className="text-2xl font-black text-[#ff4d00]">
                      {ex.total}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-white/60">Per piece</span>
                    <span className="font-mono text-sm font-black text-white">
                      {ex.perPiece}
                    </span>
                  </div>
                  <p className="mt-3 text-xs italic text-white/50">{ex.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* DDP FLOW — 4 REAL STAGES */}
      <section className="border-b-2 border-black bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
            The chain — 4 real stages
          </div>
          <h2 className="mb-4 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            From the port to your door.
          </h2>
          <p className="mb-10 max-w-3xl text-base text-white/70 md:text-lg">
            Four real photographs of the four real stages your order goes
            through. None of them are stitched, none are staged — these
            are the kinds of photos a freight forwarder would actually
            send you.
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="group relative aspect-[4/3] overflow-hidden border-2 border-white/20">
              <Image
                src="/shipping-flow-1.webp"
                alt="Yiwu port container terminal in China, rows of stacked containers and gantry cranes loading trucks"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={false}
              />
              <div className="absolute left-3 top-3 bg-[#00c2ff] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-black">
                01 · Yiwu Port
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
                <div className="text-sm font-bold">Container loaded at our dock</div>
                <div className="text-xs text-white/60">Yiwu, China</div>
              </div>
            </div>

            <div className="group relative aspect-[4/3] overflow-hidden border-2 border-white/20">
              <Image
                src="/shipping-flow-2.webp"
                alt="Massive blue container ship sailing on the open Pacific Ocean, mid-sized cargo vessel with stacked containers"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={false}
              />
              <div className="absolute left-3 top-3 bg-[#00c2ff] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-black">
                02 · 18-22 Days
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
                <div className="text-sm font-bold">Trans-Pacific to US West Coast</div>
                <div className="text-xs text-white/60">Pacific Ocean</div>
              </div>
            </div>

            <div className="group relative aspect-[4/3] overflow-hidden border-2 border-white/20">
              <Image
                src="/shipping-flow-3.webp"
                alt="US West Coast container port with a container ship docked and gantry cranes unloading containers, a flatbed truck waiting at the dock"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={false}
              />
              <div className="absolute left-3 top-3 bg-[#00c2ff] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-black">
                03 · US Port
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
                <div className="text-sm font-bold">Customs clearance, 2-4 days</div>
                <div className="text-xs text-white/60">Los Angeles / Long Beach</div>
              </div>
            </div>

            <div className="group relative aspect-[4/3] overflow-hidden border-2 border-white/20">
              <Image
                src="/shipping-flow-4.webp"
                alt="Brown UPS delivery driver on the porch of a typical American suburban home, holding a cardboard box with a shipping label, brown UPS truck parked at the curb"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={false}
              />
              <div className="absolute left-3 top-3 bg-[#ff4d00] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                04 · 2-5 Days
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
                <div className="text-sm font-bold">UPS/FedEx to your door</div>
                <div className="text-xs text-white/60">Any US address, Amazon FBA, or business</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW DDP WORKS */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            The DDP process
          </div>
          <h2 className="mb-4 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            How DDP works.
            <br />
            <span className="text-[#ff4d00]">Step by step.</span>
          </h2>
          <p className="mb-12 max-w-3xl text-base text-black/70 md:text-lg">
            From your purchase order to your loading dock. The whole process
            takes 3-7 days for express, 18-40 days for sea. You do steps 1
            and 5 — we handle everything in between.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {ddpSteps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="flex flex-col border-2 border-black bg-white p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-3xl font-black text-[#ff4d00]">
                      {s.step}
                    </span>
                    <Icon className="h-6 w-6 text-black" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 text-base font-black leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-black/70">
                    {s.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT DDP INCLUDES */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            What you get
          </div>
          <h2 className="mb-12 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            What DDP includes.
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ddpProps.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="border-2 border-black bg-[#faf9f6] p-6">
                  <Icon className="mb-4 h-8 w-8 text-[#ff4d00]" strokeWidth={1.5} />
                  <h3 className="mb-2 text-lg font-black">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-black/70">{p.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTNOTE — not a feature, just an honest mention */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <p className="text-sm leading-relaxed text-[#6b6b6b]">
            <span className="font-black text-[#0a0a0a]">Two add-ons we&apos;re not pushing:</span> FOB / CIF / EXW terms if you have your own freight forwarder, and a small US buffer-storage address in Fontana, CA for occasional overstock. We don&apos;t actively promote either — they&apos;re only useful in narrow cases (e.g. you ordered 1,000 pieces, used 500, want to keep the other 500 in the US for a later drop). They don&apos;t change your unit price in any meaningful way. Ask if you need them; otherwise ignore.
          </p>
        </div>
      </section>

      {/* DDP vs FOB COMPARISON */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            DDP vs FOB
          </div>
          <h2 className="mb-4 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Which should I pick?
          </h2>
          <p className="mb-12 max-w-3xl text-base text-black/70 md:text-lg">
            Most of our buyers start with DDP and never switch. But if you
            have a US-based customs broker or a freight contract, FOB can
            save 8-15% on the freight line.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-2 border-black bg-white p-8">
              <div className="mb-4 flex items-center gap-3">
                <Globe className="h-7 w-7 text-[#ff4d00]" strokeWidth={1.5} />
                <h3 className="text-2xl font-black">DDP — full service</h3>
              </div>
              <p className="mb-6 text-sm text-black/70">
                We handle everything from Yiwu to your door. One invoice, no
                customs paperwork on your side.
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  "Best for first-time buyers",
                  "Best for orders under 5,000 pieces",
                  "Best for buyers without a US/EU broker",
                  "Includes duties, VAT, last-mile",
                  "Door-to-door insurance included",
                  "Higher per-kg freight cost (+12-18%)",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#ff4d00]"
                      strokeWidth={2.5}
                    />
                    <span className="text-black/80">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-black bg-white p-8">
              <div className="mb-4 flex items-center gap-3">
                <Container className="h-7 w-7 text-[#0a0a0a]" strokeWidth={1.5} />
                <h3 className="text-2xl font-black">FOB / CIF — your freight</h3>
              </div>
              <p className="mb-6 text-sm text-black/70">
                You arrange shipping from our Yiwu factory, or from your
                destination port. You handle customs on arrival.
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  "Best for buyers with a freight contract",
                  "Best for orders over 5,000 pieces",
                  "Best for buyers with a US/EU broker",
                  "You pay duties + last-mile separately",
                  "Insurance optional (or your own)",
                  "Lower per-kg freight cost (-12-18%)",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-black"
                      strokeWidth={2.5}
                    />
                    <span className="text-black/80">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-[#0a0a0a] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            FAQ
          </div>
          <h2 className="mb-12 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Common questions.
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group border-2 border-black bg-[#faf9f6] open:bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-black">
                  <span className="pr-4 text-base md:text-lg">{f.q}</span>
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center border-2 border-black bg-white text-lg font-black transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="border-t-2 border-black/10 p-5 text-sm leading-relaxed text-black/80 md:text-base">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#ff4d00] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <h2 className="text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Get a shipping quote
            <br />
            in 1 business day.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/90 md:text-lg">
            Send us your quantity, destination zip code, and deadline. We will
            come back with a side-by-side DDP vs FOB quote within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <RequestQuoteLink label="shipping / page / Get a quote" className="inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white">Get Quote
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} /></RequestQuoteLink>
            <Link
              href="/shipping/ddp"
              className="inline-flex items-center gap-2 border-2 border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
            >
              Read DDP details
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
