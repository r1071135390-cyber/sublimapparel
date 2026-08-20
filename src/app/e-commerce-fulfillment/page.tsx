import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Calendar,
  CheckCircle2,
  Clock,
  Globe,
  Heart,
  Layers,
  MapPin,
  Music,
  Package,
  Ruler,
  Shirt,
  Shield,
  Sparkles,
  Star,
  Timer,
  Trophy,
  Truck,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { forEventsFaqJsonLd } from "@/lib/json-ld-data";
import { RelatedProducts } from "@/components/related-products";

export const metadata: Metadata = {
  title:
    "Custom Apparel Fulfillment Partner | DDP Shipping Manufacturer — SublimApparel",
  description:
    "Custom apparel fulfillment partner for e-commerce brands, dropshippers and resellers. Bulk production, warehouse support, DDP shipping and inventory management. Flexible MOQ, custom packaging, blind shipping worldwide.",
  keywords: [
    "apparel fulfillment",
    "custom apparel supplier",
    "dropship clothing manufacturer",
    "DDP shipping apparel",
    "bulk apparel fulfillment",
    "ecommerce clothing supplier",
    "apparel dropship supplier",
    "custom clothing dropshipping",
    "warehouse fulfillment apparel",
    "inventory management apparel",
  ],
  alternates: {
    canonical: "https://sublimapparel.com/e-commerce-fulfillment/",
  },
  openGraph: {
    title: "Custom Apparel Fulfillment Partner | DDP Shipping Manufacturer",
    description:
      "Bulk production, warehouse support, DDP shipping and inventory management for e-commerce brands and resellers. Flexible MOQ, custom packaging, blind shipping worldwide.",
    url: "https://sublimapparel.com/e-commerce-fulfillment/",
    images: ["/bowling-jersey-striker.webp"],
  },
};

const fulfillmentSegments = [
  {
    icon: Package,
    title: "E-commerce Apparel Brands",
    desc: "DTC apparel brands needing bulk production + on-demand fulfillment. We manufacture to your spec and ship to your customers.",
  },
  {
    icon: Truck,
    title: "Dropship & Print-on-Demand",
    desc: "POD platforms and dropshippers needing reliable bulk capacity. White-label fulfillment, custom packaging, blind shipping.",
  },
  {
    icon: Layers,
    title: "B2B Resellers & Distributors",
    desc: "Regional apparel distributors building private-label lines. We manufacture to your specs, you own the brand.",
  },
  {
    icon: Globe,
    title: "International Amazon / Shopify Sellers",
    desc: "Cross-border e-commerce sellers needing DDP shipping, FBA prep, and inventory management without customs headaches.",
  },
  {
    icon: Bike,
    title: "Subscription Box & Quarterly Drops",
    desc: "Quarterly subscription apparel. Custom-branded merchandise for ongoing customer programs and limited drops.",
  },
  {
    icon: Trophy,
    title: "Wholesale & Bulk Buyers",
    desc: "Bulk apparel buyers, importers, and wholesalers. Tiered pricing, container-load capacity, FOB Yiwu available.",
  },
];

const whatWeMake = [
  {
    label: "DTC Apparel Lines",
    examples: "Sublimated tees, hoodies, allover-print streetwear for DTC brands",
    icon: Shirt,
  },
  {
    label: "POD & Dropship Catalog",
    examples: "On-demand blanks, white-label catalog, custom packaging",
    icon: Package,
  },
  {
    label: "B2B Bulk Production",
    examples: "Container-load capacity, tiered pricing, FOB Yiwu",
    icon: Layers,
  },
  {
    label: "Amazon FBA Inventory",
    examples: "FNSKU labeling, polybagging, FBA prep, case packs",
    icon: Truck,
  },
  {
    label: "Private Label Apparel",
    examples: "Your brand, your labels, your tags — we just make it",
    icon: Trophy,
  },
  {
    label: "Subscription Box Apparel",
    examples: "Quarterly drops, mystery boxes, limited runs",
    icon: MapPin,
  },
];

const painPoints = [
  {
    icon: Sparkles,
    title: "&ldquo;MOQ 500+ is a deal-breaker for testing.&rdquo;",
    pain: "You're launching a new SKU or testing a colorway. Most factories lock you into 500-1,000 piece minimums that tie up cash flow and warehouse space.",
    fix: "We start from 50 pieces per design per size for blanks. Sublimated apparel starts from 30 pieces per design. Test your market before you commit to bulk.",
    link: { label: "See our MOQ terms", href: "/contact" },
  },
  {
    icon: Ruler,
    title: "&ldquo;Consistency across reorders is chaos.&rdquo;",
    pain: "Your first run looked great. Reorder 3 months later: colors are off, sizing drifts, fabric feels different. Customer returns spike.",
    fix: "Color management system + archived dye lots. Every reorder pulls from the same color reference. Same Pantone, same fabric, same fit.",
    link: { label: "Our quality process", href: "/quality-control" },
  },
  {
    icon: Heart,
    title: "&ldquo;Customs, duties, and import paperwork eat margin.&rdquo;",
    pain: "You sell to US/EU customers. Importing means 3-4 week customs delays, surprise duty bills, and customer service tickets asking where the package is.",
    fix: "DDP shipping to US and EU addresses. Duties and customs are paid upfront. Your customers get the package in 5-7 days, no surprise fees.",
    link: { label: "DDP delivery details", href: "/contact" },
  },
  {
    icon: Trophy,
    title: "&ldquo;Stockouts kill momentum.&rdquo;",
    pain: "Your product goes viral on TikTok. You scale ads. But the factory is 12 weeks out, and you've missed the entire trend window.",
    fix: "US warehouse buffer stock for reorders. China production 25 days + sea freight. Reorder turnaround 7-10 days for in-stock items.",
    link: { label: "90-day production program", href: "/90-day-program" },
  },
];

const whyUs = [
  {
    title: "Direct factory advantage",
    desc: "Working directly with a manufacturer means better communication, faster feedback, and more production control. No middleman margins, no miscommunication.",
  },
  {
    title: "Suitable for growing brands",
    desc: "Perfect for new online stores, sports apparel brands, niche clothing businesses, and marketplace sellers. Flexible MOQ from 30-50 pieces per design so you can test and scale.",
  },
  {
    title: "International shipping experience",
    desc: "We support worldwide customers with export experience, packaging solutions, and shipping coordination. DDP to US, EU, and beyond — duties and customs paid upfront.",
  },
];

const faqs = [
  {
    q: "Can you handle team kits with sponsor logos?",
    a: "Yes. We regularly work with cycling, running, and amateur sports clubs that have 3-6 sponsors per kit. Sponsor logos are integrated as design elements, not afterthoughts. Send us the sponsor logo files and we'll mock them into your kit design.",
  },
  {
    q: "What's the typical MOQ for club apparel?",
    a: "50 pieces per design for sublimation cut & sew. For teams of 10-15 members, we often run the same design with member-specific customization (name, number) within that minimum. Re-orders for new members start at 30 pieces.",
  },
  {
    q: "How long does a typical club order take?",
    a: "25 days from artwork approval. Rush available for 15-day turnaround. We recommend starting 60 days before your season opener or major event. The Event Timeline Calculator shows your specific dates.",
  },
  {
    q: "Can we order custom apparel in small batches as our group grows?",
    a: "Yes. Our 90-Day Program reserves production capacity based on your growth estimate. We run the main order, then add new members via re-orders at the same per-piece price (MOQ 30) as your group grows.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. DDP shipping to 100+ countries. Most international clubs use ocean freight (25-40 days, lowest cost) with air freight available for urgent orders. We handle all customs paperwork so you don't deal with import duties.",
  },
];

export default function ForCommunitiesPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    {
      name: "Custom Apparel for Communities & Clubs",
      path: "/e-commerce-fulfillment/",
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
            src="/bowling-jersey-striker.webp"
            alt="E-commerce apparel manufacturing and DDP fulfillment from Yiwu to US and EU customers"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#00c2ff]/40 bg-[#00c2ff]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00c2ff]">
              <Package className="h-3.5 w-3.5" />
              For e-commerce brands, dropshippers, and resellers
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Custom apparel manufacturing partner
              <br />
              <span className="text-[#00c2ff]">for e-commerce brands.</span>
            </h1>

            <p className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
              Build your online apparel business with reliable manufacturing.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80 md:text-xl">
              Running an online apparel business requires more than finding products. You need a manufacturing partner
              who can provide consistent quality, competitive pricing, reliable production, and flexible supply
              solutions.{" "}
              <strong className="text-white">
                Custom packaging, blind shipping, flexible MOQ
              </strong>{" "}
              — built for e-commerce, dropship and B2B reseller operations.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff] hover:shadow-[0_8px_24px_rgba(0,194,255,0.4)]"
              >
                Get a quote for your group
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                <Sparkles className="h-4 w-4" />
                See custom design work
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">2018</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Year founded
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">XS-5XL</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Full size run, no surcharge
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">25d</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Standard production
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">DDP</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  100+ countries
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E-COMMERCE SEGMENTS */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Segments we serve
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              E-commerce & fulfillment partners.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From DTC apparel brands to dropshippers to Amazon FBA sellers — same factory, same craft.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {fulfillmentSegments.map((s) => (
              <div
                key={s.title}
                className="group bg-white p-6 transition-all hover:bg-[#0a0a0a] hover:text-white"
              >
                <s.icon className="h-8 w-8 text-[#00c2ff] transition-transform group-hover:scale-110" />
                <h3 className="mt-4 text-lg font-black">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70 group-hover:text-white/80">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-8">
            <h3 className="text-xl font-black">What we make for your group</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whatWeMake.map((w) => (
                <div key={w.label} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#00c2ff] text-white">
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

      {/* PAIN POINTS */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              The 4 problems every e-commerce brand hits
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              And exactly how we solve them.
            </h2>
            <p className="mt-3 text-base text-black/70">
              MOQ flexibility, color consistency, DDP shipping, and buffer stock. Built for e-commerce scale.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-sm border-2 border-black/10 bg-white p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#00c2ff]/10 text-[#00c2ff]">
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
                      <span className="font-bold text-[#00c2ff]">Our fix:</span>{" "}
                      {p.fix}
                    </p>
                    <Link
                      href={p.link.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#00c2ff] hover:gap-2.5"
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
            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
                90-Day Club Apparel Program
              </div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Plan your season, re-order as you grow.
              </h2>
              <p className="mt-3 text-base text-white/70">
                Your roster changes. Your apparel supplier shouldn&apos;t have
                to.
              </p>

              <ol className="mt-8 space-y-4">
                {[
                  {
                    t: "T-90: Reserve",
                    d: "Submit your estimated roster. We hold production capacity. Design direction locked in early.",
                  },
                  {
                    t: "T-60: Sponsor + sample",
                    d: "Send sponsor logo files. We mock them into your kit as design elements. Physical sample for sign-off.",
                  },
                  {
                    t: "T-30: Final roster",
                    d: "Your membership list is set. We adjust production within 5% of your estimate. New members added via re-order.",
                  },
                  {
                    t: "T-0: Season opener",
                    d: "Shipped to your clubhouse, gym, or office. Sorted by member if needed. Name labels available.",
                  },
                ].map((s) => (
                  <li key={s.t} className="flex items-start gap-4">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#00c2ff] text-xs font-black text-black">
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
                className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[#00c2ff] px-6 py-3 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff]"
              >
                Full 90-Day Program
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border-2 border-[#00c2ff]/30">
              <Image
                src="/bowling-raglan-retro.webp"
                alt="Custom club jerseys with sponsor logos and team identity"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Why online brands work with us
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Built for online apparel businesses.
            </h2>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((w) => (
              <li
                key={w.title}
                className="flex items-start gap-4 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-6"
              >
                <CheckCircle2
                  className="mt-1 h-6 w-6 shrink-0 text-[#00c2ff]"
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

      {/* SUITABLE FOR */}
      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#00c2ff]">Suitable for</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Who we manufacture for</h2>
            <p className="mt-4 text-base text-neutral-600 md:text-lg">
              From new online stores to established e-commerce brands, our factory supports apparel businesses of every scale.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              { title: "New online stores", body: "Launching your first apparel line with low minimums and direct-to-consumer operations." },
              { title: "Sports apparel brands", body: "Performance wear, team kits, and athletic apparel for growing sports brands." },
              { title: "Niche clothing businesses", body: "Specialty apparel targeting specific audiences — from streetwear to hobby communities." },
              { title: "Marketplace sellers", body: "Amazon, eBay, Etsy, Shopify sellers needing consistent production and blind shipping." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                <h3 className="text-base font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* RELATED PRODUCTS (tag-driven) */}
      <RelatedProducts solutionSlug="e-commerce-fulfillment" />

      

      {/* FAQ */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Common questions from e-commerce & DTC brands
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Quick answers.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-sm border-2 border-black/10 bg-white p-6 open:border-[#00c2ff]"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-black">
                  <span>{f.q}</span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#00c2ff] transition-transform group-open:rotate-90" />
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
