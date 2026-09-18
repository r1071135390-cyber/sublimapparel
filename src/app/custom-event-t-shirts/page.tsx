// 2026-09-15 (R69): /custom-event-t-shirts/ scenario landing page — restored.
// Targets "custom event t-shirts" buyer intent (slightly different from
// /event-apparel/ which is the broad "all event apparel" hub). This page
// focuses specifically on the t-shirt product form — most event orders are
// t-shirts first, hoodies/tees/accessories second. T-shirt-first wording
// matches the dominant buyer search query and avoids cannibalizing the
// /products/t-shirts/ product category page (which is the product-detail
// page, not a scenario/buyer-intent page).
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  Layers,
  Package,
  Palette,
  Ruler,
  Shirt,
  Sparkles,
  Timer,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { RelatedProducts } from "@/components/related-products";
import { UnifiedContactCta } from "@/components/unified-contact-cta";
import { PageGeoAnswerBlock } from "@/components/geo-answer-block";

const SITE_URL = "https://sublimapparel.com";
const pageUrl = `${SITE_URL}/custom-event-t-shirts/`;

export const metadata = buildPageMetadata({
  title: "Custom Event T-Shirts | Bulk Group Shirts from $9",
  description:
    "Custom event t-shirts for fundraisers, weddings, reunions, awareness walks. Sublimation + DTG + DTF. Edge-to-edge print, MOQ 50, DDP shipping worldwide.",
  keywords: [
    "custom event t-shirts",
    "custom event t shirts",
    "event t-shirts bulk",
    "event t-shirts manufacturer",
    "event t-shirts factory",
    "bulk event t-shirts",
    "event shirt printing",
    "event shirt supplier",
    "custom event shirts",
    "wedding event t-shirts",
    "wedding party t-shirts",
    "wedding t-shirts custom",
    "fundraiser event t-shirts",
    "fundraiser t-shirts bulk",
    "charity event t-shirts",
    "awareness event t-shirts",
    "school event t-shirts",
    "community event t-shirts",
    "family reunion t-shirts",
    "reunion t-shirts custom",
    "group event t-shirts",
    "company event t-shirts",
    "holiday party t-shirts",
    "event team t-shirts",
    "event volunteer t-shirts",
    "sublimation event t-shirts",
    "all over print event t-shirts",
    "custom group t-shirts",
    "event t-shirt printing",
    "event t-shirts DDP",
    "event t-shirts wholesale",
    "bulk custom event t-shirts",
    "event shirt factory",
    "event t-shirt manufacturer",
    "custom printed event t-shirts",
    "event t-shirts MOQ 50",
    "event t-shirts from $9",
    "event t-shirts Yiwu factory",
    "event t-shirts China",
    "event t-shirts B2B",
    "event t-shirts polyester",
    "event t-shirts cotton",
    "event t-shirts DTG",
    "event t-shirts DTF",
    "event t-shirt supplier China",
    "event t-shirts fast turnaround",
    "event t-shirts deadline",
  ],
  alternates: { canonical: pageUrl },
  ogTitle: "Custom Event T-Shirts | Bulk Group Shirts from $9",
  ogDescription:
    "Custom event t-shirts for fundraisers, weddings, reunions, awareness walks. MOQ 50, DDP worldwide.",
  ogImage: "/og/og-industry.webp",
});

const useCases = [
  {
    icon: Heart,
    title: "Wedding & wedding party",
    desc: "Custom wedding t-shirts for the bride tribe, groom squad, rehearsal dinner, bachelor/bachelorette parties. Edge-to-edge print, no setup fee.",
  },
  {
    icon: Sparkles,
    title: "Fundraiser & charity",
    desc: "Branded shirts for charity events, awareness walks, community fundraisers. Cause-matched colors and fast turnaround.",
  },
  {
    icon: Users,
    title: "Family & class reunions",
    desc: "Reunion tees with year, family name, school crest, or inside joke. Easy mixed sizes, single or multi-design.",
  },
  {
    icon: Calendar,
    title: "Group & company events",
    desc: "Retreats, kick-offs, milestone celebrations, holiday parties. Branded apparel that gets everyone wearing the same thing.",
  },
];

const whatWeMake = [
  {
    label: "Crewneck Tees",
    examples: "Standard fit, all-over print, unisex sizing",
    icon: Shirt,
  },
  {
    label: "V-neck Tees",
    examples: "Retail fit, women's and men's cuts",
    icon: Shirt,
  },
  {
    label: "Long-Sleeve Tees",
    examples: "Cool-weather events, sun protection, layering",
    icon: Shirt,
  },
  {
    label: "Tank Tops",
    examples: "Summer events, charity runs, hot-weather fundraisers",
    icon: Shirt,
  },
];

const painPoints = [
  {
    icon: Timer,
    title: "Will the shirts arrive before the event?",
    pain: "Most events lock headcount 2-4 weeks out. US printers need 6-8 weeks. The math doesn't work.",
    fix: "Our 90-day production program with a 30-day final-quantity lock. Reserve 90 days, ship in 30.",
    link: { label: "See 90-Day Program", href: "/90-day-program" },
  },
  {
    icon: Palette,
    title: "The print quality is hit or miss.",
    pain: "Cheap screen-print cracks after one wash. Cheap DTG fades fast. You don't want to give out shirts that look bad.",
    fix: "All-over sublimation on polyester, or premium DTG on cotton, or DTF for hybrid. Your choice of print method matched to the fabric.",
    link: { label: "See print methods", href: "/technique" },
  },
  {
    icon: Ruler,
    title: "Group sizing is unpredictable.",
    pain: "Group orders run the full size range. Pre-buying in bulk leads to wrong sizes and wasted budget.",
    fix: "Mixed-size production with US-spec measurement charts. Free downloadable Excel size template.",
    link: { label: "Get US Size Guide", href: "/us-size-guide" },
  },
  {
    icon: Calendar,
    title: "When do I really need to start?",
    pain: "You're not sure if you have time. You don't want to overcommit before the event date is locked.",
    fix: "Event Timeline Calculator. Enter your event date, get the latest order date and final-count lock date instantly.",
    link: { label: "Open Timeline Calculator", href: "/event-timeline" },
  },
];

const faqs = [
  {
    q: "What's the MOQ for custom event t-shirts?",
    a: "50 pieces per design for cut-and-sew sublimation on polyester. For DTG on 100% cotton, MOQ drops to 30 pieces. Sample runs start at 5-10 pieces with a 7-10 day turnaround. Re-order MOQ is 30 pieces for any follow-up runs.",
  },
  {
    q: "What's the price per shirt?",
    a: "Per-piece FOB Yiwu starts at $9 for basic polyester tees with all-over sublimation. Heavier fabric, premium finishes, or DTG on cotton push the per-piece range up to $18-25 depending on quantity and complexity. Quote is all-inclusive: garment, print, QC, packing.",
  },
  {
    q: "How fast can you ship for an event?",
    a: "Bulk production is 15-25 days. DDP ocean freight adds 7-14 days to your door. DDP air freight is 5-7 days for rush events. Our US warehouse in Fontana CA offers 2-5 day domestic delivery for last-minute top-ups.",
  },
  {
    q: "Can I order different designs for different people?",
    a: "Yes. Cut-and-sew sublimation supports per-piece color, per-piece size, and per-piece print placement. Common for wedding parties where the bride tribe and groom squad want different designs, or family reunions where each family gets a different surname on the back.",
  },
];

export default function CustomEventTShirtsPage() {
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Custom Event T-Shirts", item: pageUrl },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Custom Event T-Shirts | Bulk Group Shirts from $9",
        description:
          "Custom event t-shirts for fundraisers, weddings, reunions, awareness walks. Sublimation + DTG + DTF. Edge-to-edge print, MOQ 50, DDP shipping worldwide.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${pageUrl}#faq` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Custom Event T-Shirt Manufacturing",
        serviceType: "Custom event t-shirt sublimation, DTG, DTF, screen print",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Canada" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Australia" },
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          priceRange: "$$",
          availability: "https://schema.org/InStock",
        },
        url: pageUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={pageGraph} />

      {/* 2026-09-18 (R73 GEO): Direct Answer block for AI crawlers. */}
      <PageGeoAnswerBlock path="/custom-event-t-shirts/" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0">
          <Image
            src="/products/0128/0.webp"
            alt="Custom event t-shirts — bulk group shirts for fundraisers, weddings, reunions"
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
              <Shirt className="h-3.5 w-3.5" />
              For organizers, planners & group leaders
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Custom event t-shirts
              <br />
              <span className="text-[#00c2ff]">for fundraisers, weddings, reunions &amp; groups.</span>
            </h1>

            <p className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
              Branded tees that bring the group together.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80 md:text-xl">
              From wedding parties to charity fundraisers, family reunions to awareness walks — we help
              organizers produce <strong className="text-white">affordable custom event t-shirts</strong>{" "}
              that get the whole group matching.{" "}
              <strong className="text-white">From $9 per piece, MOQ 50, edge-to-edge print</strong> —
              all from our Yiwu factory with DDP shipping to 100+ countries.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff] hover:shadow-[0_8px_24px_rgba(0,194,255,0.4)]"
              >
                Get a quote for your event tees
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products/t-shirts/"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                <Shirt className="h-4 w-4" />
                Browse t-shirt styles
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">$9+</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Per-piece FOB Yiwu
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">50</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Pieces MOQ
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">15-25</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Day production
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">100+</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Countries DDP shipped
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Custom event t-shirt solutions
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              T-shirts for every event your group runs.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From a 50-person wedding party to a 5,000-person charity walk. Same factory, same color
              profile, same production line — deadline-locked delivery for every event type.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="group bg-white p-6 transition-all hover:bg-[#0a0a0a] hover:text-white"
              >
                <u.icon className="h-8 w-8 text-[#00c2ff] transition-transform group-hover:scale-110" />
                <h3 className="mt-4 text-lg font-black">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70 group-hover:text-white/80">
                  {u.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-8">
            <h3 className="text-xl font-black">T-shirt styles we make</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whatWeMake.map((w) => (
                <div key={w.label} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#00c2ff] text-black">
                    <w.icon className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-sm font-black">{w.label}</div>
                    <div className="mt-0.5 text-xs text-black/60">{w.examples}</div>
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
              The 4 problems every event organizer hits
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              And exactly how we solve them.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {painPoints.map((p) => (
              <div key={p.title} className="rounded-sm border-2 border-black/10 bg-white p-6">
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
                      <span className="font-bold text-[#00c2ff]">Our fix:</span> {p.fix}
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

      {/* FAQ */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Common questions from event organizers
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Quick answers.</h2>
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
                <p className="mt-3 text-sm leading-relaxed text-black/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedProducts solutionSlug="event-festivals-conferences" />

      <UnifiedContactCta
        variant="full"
        sourceLabel="Custom event t-shirts"
        className="border-t-4 border-black"
      />

      <Contact />
    </>
  );
}