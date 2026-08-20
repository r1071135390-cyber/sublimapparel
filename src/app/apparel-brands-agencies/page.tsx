import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Box,
  CheckCircle2,
  Clock,
  Globe,
  Heart,
  Layers,
  Package,
  Palette,
  Ruler,
  Shirt,
  Shield,
  Sparkles,
  Star,
  Tag,
  Timer,
  TrendingUp,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { forEventsFaqJsonLd } from "@/lib/json-ld-data";

export const metadata: Metadata = {
  title:
    "Private Label Apparel Manufacturer | Custom Clothing Production Partner — SublimApparel",
  description:
    "Private label apparel manufacturer and custom clothing production partner for growing brands and creative agencies. Custom labels, hang tags, retail packaging and drop-ship fulfillment. China-based factory, flexible MOQ, FOB and DDP.",
  keywords: [
    "private label apparel manufacturer",
    "custom clothing manufacturer",
    "apparel production partner",
    "clothing manufacturer China",
    "custom garment factory",
    "apparel sourcing",
    "private label apparel",
    "OEM clothing manufacturer",
    "apparel brand supplier",
    "white label apparel",
  ],
  alternates: {
    canonical: "https://sublimapparel.com/apparel-brands-agencies/",
  },
  openGraph: {
    title: "Private Label Apparel Manufacturer | Custom Clothing Production Partner",
    description:
      "Custom labels, hang tags, retail packaging and drop-ship fulfillment for growing brands and creative agencies. China-based factory, flexible MOQ, FOB and DDP.",
    url: "https://sublimapparel.com/apparel-brands-agencies/",
    images: ["/esports-travel-hoodie.webp"],
  },
};

const brandSegments = [
  {
    icon: TrendingUp,
    title: "Direct-to-Consumer (DTC) Brands",
    desc: "New apparel brands selling direct. You handle the design, the website, the marketing. We handle the manufacturing.",
  },
  {
    icon: Sparkles,
    title: "Influencer & Creator Brands",
    desc: "Influencer-led apparel lines. Limited drops, fast turnarounds, premium feel without premium minimums.",
  },
  {
    icon: Globe,
    title: "International Resellers & Distributors",
    desc: "Regional apparel distributors building private-label lines. We manufacture to your specs, you own the brand.",
  },
  {
    icon: Tag,
    title: "Print-on-Demand Platforms",
    desc: "POD platforms needing reliable bulk capacity. White-label fulfillment, custom packaging, retailer-ready products.",
  },
  {
    icon: Box,
    title: "Subscription Box & Corporate Gifts",
    desc: "Quarterly subscription apparel. Custom-branded merchandise for ongoing client programs.",
  },
  {
    icon: Star,
    title: "Boutique & Niche Brands",
    desc: "Surf brands, yoga brands, niche athletic brands. Small runs that look like big brand quality.",
  },
];

const whatWeMake = [
  {
    label: "Custom-Label Apparel",
    examples: "Woven labels, neck labels, size tags, brand packaging",
    icon: Tag,
  },
  {
    label: "Retail-Ready Packaging",
    examples: "Poly bags, hang tags, stickers, inserts, fold + poly",
    icon: Package,
  },
  {
    label: "Drop-Ship Fulfillment",
    examples: "Blank stock + custom imprint per order, blind shipping",
    icon: Box,
  },
  {
    label: "Hangtag + Inserts Design",
    examples: "Print-ready templates, custom designs on demand",
    icon: Award,
  },
];

const painPoints = [
  {
    icon: Ruler,
    title: "&ldquo;We need 50 pieces to test a design.&rdquo;",
    pain: "Most factories demand 500+ pieces per SKU. You can't test 10 designs at that minimum. Your runway disappears before you find a winner.",
    fix: "MOQ 50 pcs per design for sublimation cut & sew. 30 pcs for re-orders. Test multiple designs, find the winner, scale up.",
    link: { label: "See MOQ policy", href: "/quality-control" },
  },
  {
    icon: Tag,
    title: "&ldquo;We need our own labels, not a factory tag.&rdquo;",
    pain: "If your neck label says 'SublimApparel,' customers buy from us, not you. Most factories either refuse custom labels or charge a fortune.",
    fix: "Custom woven labels, neck labels, size tags, hang tags — all included. We don't put our name on your product. Ever.",
    link: { label: "Private label service", href: "/how-to-source" },
  },
  {
    icon: Sparkles,
    title: "&ldquo;We want drop-ship fulfillment, not bulk orders.&rdquo;",
    pain: "You sold 3,000 units via Shopify, but they're sitting in your garage. You need 50 units shipped to 60 different customers this week.",
    fix: "US warehouse drop-ship service. We pick, pack, label, and ship from Fontana, CA. Blind shipping (no SublimApparel on the box).",
    link: { label: "Drop-ship service", href: "/shipping/us-warehouse" },
  },
  {
    icon: Shield,
    title: "&ldquo;Our customers expect retail-quality.&rdquo;",
    pain: "You're selling a $45 t-shirt. If it arrives with loose threads, a misprinted graphic, or a cheap poly bag, you get a 1-star review and a chargeback.",
    fix: "4-stage inspection with AQL 2.5 standard. Retail-grade poly bags. Hang tag and sticker options. Compliance with FTC and CPSIA (kids) labeling.",
    link: { label: "Our QC process", href: "/quality-control" },
  },
];

const whyUs = [
  {
    title: "We don't compete with our customers",
    desc: "We manufacture apparel. We don't sell apparel under our own name. Your brand is your brand, and we keep our hands off it.",
  },
  {
    title: "Full private label, not a sticker",
    desc: "Custom neck labels, woven labels, size tags, hang tags, poly bags, inserts, stickers. We handle the full package, not just a printed logo.",
  },
  {
    title: "Drop-ship ready",
    desc: "US warehouse with pick & pack, blind shipping, and Shopify/Amazon integration. Sell 1,000 units, ship 1,000 units to 1,000 different customers.",
  },
  {
    title: "Compliance without the legal team",
    desc: "FTC labeling, CPSIA for kids' apparel, OEKO-TEX fabric sourcing, country-of-origin tags. We know the rules, so you don't get a customs hold or a recall.",
  },
];

const faqs = [
  {
    q: "Do you put SublimApparel's name on our products?",
    a: "Never. We don't sell apparel under our own name. Every garment ships with your custom neck label, woven label, size tag, and any retail packaging you specify. We are invisible to your customer.",
  },
  {
    q: "What's the minimum order quantity (MOQ) for new brands?",
    a: "50 pieces per design for sublimation cut & sew. For testing, we can run as few as 30 pieces per design. Re-orders start at 30 pieces. This lets you test 5-10 designs in your first run without committing to bulk.",
  },
  {
    q: "Do you offer drop-ship fulfillment?",
    a: "Yes. Our US warehouse in Fontana, CA offers pick & pack, blind shipping, and Shopify/Amazon integration. You can also ship bulk to our warehouse and we fulfill per order. Pricing depends on order volume — typically $3-5 per unit including pick, pack, and shipping label.",
  },
  {
    q: "Can you handle retail packaging (hang tags, poly bags, stickers)?",
    a: "Yes. We source hang tags, stickers, poly bags, tissue paper, and inserts. Custom designs are print-ready from your files. We assemble retail-ready units in our packaging line, so your customer receives a product that looks store-bought, not factory-direct.",
  },
  {
    q: "Do you help with design and tech packs?",
    a: "Yes. Our in-house design team converts sketches, references, and bullet-point briefs into print-ready artwork and tech packs. Free mockup, no commitment, no IP claim. We sign NDAs for proprietary designs.",
  },
];

export default function ForBrandsPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    {
      name: "Private Label & OEM Apparel Manufacturing",
      path: "/apparel-brands-agencies/",
    },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={forEventsFaqJsonLd(faqs)} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0">
          <Image
            src="/esports-travel-hoodie.webp"
            alt="Private label apparel manufacturing — custom labels, retail packaging, drop-ship ready"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#ff4d00]/40 bg-[#ff4d00]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ff4d00]">
              <Sparkles className="h-3.5 w-3.5" />
              For DTC, private label, and growing brands
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Your production partner
              <br />
              <span className="text-[#ff4d00]">for custom apparel brands.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl">
              From design development to bulk production, we support growing apparel brands and creative agencies.
              <strong className="text-white"> Custom labels, retail packaging, drop-ship fulfillment</strong> — we
              don&apos;t compete with your brand. Full private label service.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#ff4d00] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#ff6633] hover:shadow-[0_8px_24px_rgba(255,77,0,0.4)]"
              >
                Start your private label
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/how-to-source"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#ff4d00] hover:bg-[#ff4d00]/10"
              >
                <Tag className="h-4 w-4" />
                Private label process
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              <div>
                <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">2018</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Year founded
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">50</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Pc MOQ for testing
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">100%</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Private label
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">US</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Drop-ship ready
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND SEGMENTS */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Apparel categories
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Custom apparel for every kind of brand.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From a 50-piece first run to a 50,000-piece retail production
              cycle. Same factory, same craft.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {brandSegments.map((s) => (
              <div
                key={s.title}
                className="group bg-white p-6 transition-all hover:bg-[#0a0a0a] hover:text-white"
              >
                <s.icon className="h-8 w-8 text-[#ff4d00] transition-transform group-hover:scale-110" />
                <h3 className="mt-4 text-lg font-black">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70 group-hover:text-white/80">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-8">
            <h3 className="text-xl font-black">What we make for your brand</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whatWeMake.map((w) => (
                <div key={w.label} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#ff4d00] text-white">
                    <w.icon className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-sm font-black">{w.label}</div>
                    <div className="mt-0.5 text-xs text-black/60">
                      {w.examples}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY BRANDS CHOOSE US */}
      <section className="border-b border-black/10 bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Why brands choose us
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Built for growing apparel brands and creative agencies.
            </h2>
            <p className="mt-3 text-base text-black/70">
              We don&apos;t compete with your brand. We make it look like you did it all yourself.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {[
              { t: "Small brand runs", b: "MOQ 50 pieces per style. Re-orders from 30. Perfect for limited drops and boutique brands." },
              { t: "Accurate sizing", b: "US-spec size runs from XS to 5XL. Tech packs, graded specs, and pre-production samples for first orders." },
              { t: "Full customization", b: "Custom neck labels, woven labels, hang tags, poly bags, retail packaging. Built to look retail-ready." },
              { t: "Fast production", b: "25-day standard production. Sample in 5 days, bulk in 25, expedited lanes for limited drops." },
              { t: "FOB & DDP", b: "FOB Yiwu for brands with their own freight, or DDP to your warehouse / 3PL in 100+ countries." },
            ].map((w) => (
              <div key={w.t} className="rounded-sm border-2 border-black/10 bg-white p-6">
                <CheckCircle2 className="h-6 w-6 text-[#ff4d00]" strokeWidth={2.5} />
                <h3 className="mt-4 text-base font-black">{w.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70">{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              The 4 problems every brand founder hits
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              And exactly how we solve them.
            </h2>
            <p className="mt-3 text-base text-black/70">
              Other factories are middlemen with markup. We are the actual
              production line.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-sm border-2 border-black/10 bg-white p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#ff4d00]/10 text-[#ff4d00]">
                    <p.icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg font-black"
                      dangerouslySetInnerHTML={{ __html: p.title }}
                    />
                    <p className="mt-2 text-sm leading-relaxed text-black/70">
                      <span className="font-bold text-black">The pain:</span>{" "}
                      <span dangerouslySetInnerHTML={{ __html: p.pain }} />
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-black/70">
                      <span className="font-bold text-[#ff4d00]">Our fix:</span>{" "}
                      {p.fix}
                    </p>
                    <Link
                      href={p.link.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#ff4d00] hover:gap-2.5"
                    >
                      {p.link.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 90-DAY PROGRAM (compact) */}
      <section className="bg-[#0a0a0a] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
                90-Day Brand Apparel Program
              </div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Test fast, scale smart, never sit on inventory.
              </h2>
              <p className="mt-3 text-base text-white/70">
                We don&apos;t believe in 5,000-piece minimums for first runs.
                We believe in proving the design, then scaling.
              </p>

              <ol className="mt-8 space-y-4">
                {[
                  {
                    t: "T-90: Test run",
                    d: "Submit your top 3-5 designs. We manufacture 50-100 pcs of each. Total order: 250-500 pcs. Same per-piece price as bulk.",
                  },
                  {
                    t: "T-60: Sample + sign-off",
                    d: "Physical samples on your exact fabric. Private label woven labels, hang tags, packaging designed.",
                  },
                  {
                    t: "T-30: Sell-through data",
                    d: "You sold 80% of design A, 30% of design B. We re-allocate: 200 more of A, 50 of B. No leftover inventory.",
                  },
                  {
                    t: "T-0 onward: Scale",
                    d: "Re-orders at 30 pc MOQ. Drop-ship from US warehouse if you sell through Shopify/Amazon. Inventory stays with us.",
                  },
                ].map((s) => (
                  <li key={s.t} className="flex items-start gap-4">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#ff4d00] text-xs font-black text-black">
                      {s.t.split(":")[0]}
                    </span>
                    <div>
                      <div className="font-black">{s.t.split(":")[1]}</div>
                      <div className="mt-1 text-sm text-white/70">{s.d}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <Link
                href="/90-day-program"
                className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#ff6633]"
              >
                Full 90-Day Program
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border-2 border-[#ff4d00]/30">
                <Image
                  src="/esports-hoodie-circuit.webp"
                  alt="Private label apparel with custom packaging, hang tags, and retail-ready products"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Why brands choose us
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Built for the brand, not the factory.
            </h2>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((w) => (
              <li
                key={w.title}
                className="flex items-start gap-4 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-6"
              >
                <CheckCircle2
                  className="mt-1 h-6 w-6 shrink-0 text-[#ff4d00]"
                  strokeWidth={2.5}
                />
                <div>
                  <div className="font-black">{w.title}</div>
                  <div className="mt-1 text-sm text-black/70">{w.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Case studies
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Apparel brands &amp; agencies we&apos;ve supported.
            </h2>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/e-commerce-fulfillment/", title: "E-commerce & Fulfillment", body: "Drop-ship, warehousing and inventory for online apparel brands." },
              { href: "/promotional-marketing-apparel/", title: "Promotional & Marketing", body: "Promo runs, brand activation, trade show giveaways at scale." },
              { href: "/corporate-organization-apparel/", title: "Corporate Apparel", body: "Private label for corporate uniform programs and branded merchandise." },
              { href: "/teams-sports-apparel/", title: "Team & Sportswear Brands", body: "Custom production for niche athletic, surf, yoga and clubwear brands." },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group block bg-white p-6 transition-all hover:bg-[#0a0a0a] hover:text-white"
              >
                <h3 className="text-lg font-black group-hover:text-[#ff4d00]">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70 group-hover:text-white/80">{c.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#ff4d00]">
                  View <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Common questions from brand founders
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Quick answers.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-sm border-2 border-black/10 bg-white p-6 open:border-[#ff4d00]"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-black">
                  <span>{f.q}</span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#ff4d00] transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-black/70">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
