// 2026-09-15 (R69): /custom-event-t-shirts/ scenario landing page — restored.
// Targets "custom event t-shirts" buyer intent (slightly different from
// /event-apparel/ which is the broad "all event apparel" hub). This page
// focuses specifically on the t-shirt product form — most event orders are
// t-shirts first, hoodies/tees/accessories second. T-shirt-first wording
// matches the dominant buyer search query and avoids cannibalizing the
// /products/t-shirts/ product category page (which is the product-detail
// page, not a scenario/buyer-intent page).
//
// 2026-11-17 (R137): SEO rewrite per the 2026-11-17 SEO plan (plan lines
// 1876-2176). New title / meta description / H1, 8 event types, 7
// customisation options, 5 group families, a 6-step ordering process, 6
// "why work with us" reasons, 11 buyer types, 9 FAQs and a tail CTA.
// No new hard numbers are introduced: the existing MOQ, price, production
// and shipping figures stay exactly as they were, and the 4 hero stat tiles
// are unchanged.
import { buildPageMetadata } from "@/lib/page-metadata";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Brush,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  Globe,
  GraduationCap,
  Handshake,
  Heart,
  Megaphone,
  MessageSquare,
  Package,
  Palette,
  Ruler,
  Shirt,
  Sparkles,
  Store,
  Trophy,
  Type,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { RelatedProducts } from "@/components/related-products";
import { UnifiedContactCta } from "@/components/unified-contact-cta";
import { PageGeoAnswerBlock } from "@/components/geo-answer-block";

const SITE_URL = "https://sublimapparel.com";
const pageUrl = `${SITE_URL}/custom-event-t-shirts/`;

const PAGE_TITLE = "Custom Event T-Shirts for Events, Businesses & Organizations";
const PAGE_DESCRIPTION =
  "Order custom event t-shirts for corporate events, festivals, schools and charity events. Custom designs, bulk production and worldwide delivery.";

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
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
    "corporate event t-shirts",
    "promotional event shirts",
    "custom festival t-shirts",
    "charity event shirts",
  ],
  alternates: { canonical: pageUrl },
  ogTitle: PAGE_TITLE,
  ogDescription:
    "Order custom event t-shirts for corporate events, festivals, schools and charity events. Bulk production, worldwide delivery.",
  ogImage: "/og/og-industry.webp",
});

// 2026-11-17 (R137): 8 event types from the SEO plan (replaces the 4 wedding/fundraiser use cases).
const useCases = [
  {
    icon: Factory,
    title: "Corporate Events",
    desc: "Custom shirts for company meetings, employee activities, team-building events, corporate sports days and business celebrations.",
  },
  {
    icon: Store,
    title: "Trade Shows & Exhibitions",
    desc: "Branded event t-shirts for exhibition staff, promotional teams, booth representatives and trade show activities.",
  },
  {
    icon: Sparkles,
    title: "Festivals & Community Events",
    desc: "Custom apparel for local festivals, cultural celebrations, public gatherings and community activities.",
  },
  {
    icon: Heart,
    title: "Charity & Fundraising Events",
    desc: "Create custom shirts featuring charity logos, fundraising campaign graphics, event names and sponsor branding.",
  },
  {
    icon: GraduationCap,
    title: "School & University Events",
    desc: "Custom shirts for school activities, university events, student organizations, campus celebrations and group programs.",
  },
  {
    icon: Megaphone,
    title: "Promotional Campaigns",
    desc: "Branded t-shirts for marketing campaigns, product promotions, brand activations and promotional merchandise programs.",
  },
  {
    icon: Trophy,
    title: "Outdoor & Sports Events",
    desc: "Custom shirts for outdoor activities, group challenges, fitness events, recreational programs and organized sports activities.",
  },
  {
    icon: Handshake,
    title: "Church & Community Organizations",
    desc: "Coordinated apparel for community gatherings, volunteer activities, church events and organized group programs.",
  },
];

// 2026-11-17 (R137): 7 customisation options from the SEO plan (replaces the 4 garment styles).
const whatWeMake = [
  {
    label: "Custom Artwork & Graphics",
    examples:
      "Provide your own artwork, logo or design concept. Our team can review the files and clarify production requirements before the order is confirmed.",
    icon: Brush,
  },
  {
    label: "Organization & Event Logos",
    examples: "Add your company logo, organization name, event identity or campaign branding.",
    icon: Building2,
  },
  {
    label: "Sponsor Branding",
    examples:
      "Include sponsor logos, event partners and supporting organizations according to your design requirements.",
    icon: Award,
  },
  {
    label: "Custom Colors",
    examples: "Choose colors that match your event theme, corporate identity or promotional campaign.",
    icon: Palette,
  },
  {
    label: "Event Names & Messages",
    examples: "Include event names, dates, slogans, campaign messages and other design elements.",
    icon: Type,
  },
  {
    label: "Multiple Shirt Styles",
    examples:
      "Discuss available t-shirt styles, sleeve options, necklines and fabric choices according to your project.",
    icon: Shirt,
  },
  {
    label: "Custom Size Breakdown",
    examples:
      "Provide the quantities needed for each size. We can help clarify garment measurements and sizing specifications before production.",
    icon: Ruler,
  },
];

// 2026-11-17 (R137): 5 group families from the SEO plan.
const eventGroups = [
  {
    label: "Participant Shirts",
    desc: "Custom t-shirts for registered participants, guests and event attendees.",
  },
  {
    label: "Staff & Organizer Shirts",
    desc: "Coordinated apparel for event organizers, management teams and operational staff.",
  },
  {
    label: "Volunteer Shirts",
    desc: "Recognizable shirts for volunteers supporting registration, event assistance and on-site activities.",
  },
  {
    label: "Promotional Team Shirts",
    desc: "Branded apparel for marketing teams, brand representatives and promotional staff.",
  },
  {
    label: "Sponsor & Partner Shirts",
    desc: "Custom apparel for event sponsors, partners and supporting organizations.",
  },
];

// 2026-11-17 (R137): 6-step ordering process from the SEO plan.
const orderSteps = [
  {
    step: "Step 01",
    num: "01",
    title: "Share Your Event Requirements",
    desc: "Tell us about your event, estimated quantity, event date and delivery destination.",
  },
  {
    step: "Step 02",
    num: "02",
    title: "Provide Your Artwork",
    desc: "Send your logo, design files, sponsor graphics, preferred colors and other artwork.",
  },
  {
    step: "Step 03",
    num: "03",
    title: "Confirm Garment Specifications",
    desc: "Discuss shirt style, fabric, sizes, size breakdown and other production details.",
  },
  {
    step: "Step 04",
    num: "04",
    title: "Review Artwork & Samples",
    desc: "We review the design and order specifications with you. Samples or pre-production confirmation can be arranged when required.",
  },
  {
    step: "Step 05",
    num: "05",
    title: "Bulk Production & Quality Inspection",
    desc: "After approval, production is arranged according to the confirmed specifications. Garments are checked during production and before shipment.",
  },
  {
    step: "Step 06",
    num: "06",
    title: "International Delivery",
    desc: "We discuss available shipping arrangements according to your order quantity, destination and required timeline.",
  },
];

// 2026-11-17 (R137): 6 reasons from the SEO plan (replaces the 4 pain points).
// The old pain-point links are preserved here so the link equity is not lost.
type WhyReason = {
  icon: typeof Award;
  title: string;
  body: string;
  link?: { label: string; href: string };
};

const whyUs: WhyReason[] = [
  {
    icon: Award,
    title: "Custom Apparel Production Since 2018",
    body: "We have been working in custom apparel production since 2018, supporting international customers with different apparel projects.",
  },
  {
    icon: Globe,
    title: "Yiwu-Based Production Partner",
    body: "Work directly with a China-based production team for your custom event apparel requirements.",
  },
  {
    icon: Package,
    title: "Bulk Order Support",
    body: "We support businesses and organizations that need coordinated apparel for events, campaigns and group activities.",
    link: { label: "See 90-Day Program", href: "/90-day-program" },
  },
  {
    icon: Ruler,
    title: "Artwork & Sizing Communication",
    body: "We help clarify artwork files, garment specifications and size requirements before production.",
    link: { label: "Get US Size Guide", href: "/us-size-guide" },
  },
  {
    icon: ClipboardCheck,
    title: "Production Quality Checks",
    body: "We conduct production checks and final inspections to help reduce avoidable quality issues.",
    link: { label: "Quality control", href: "/quality-control" },
  },
  {
    icon: MessageSquare,
    title: "International Shipping Support",
    body: "We work with overseas customers and can discuss available international and door-to-door shipping arrangements.",
  },
];

// 2026-11-17 (R137): 11 buyer types from the SEO plan.
const whoOrders = [
  "Corporate event planners",
  "Trade show and exhibition organizers",
  "Festival organizers",
  "Charity organizations",
  "Schools and universities",
  "Community organizations",
  "Promotional merchandise agencies",
  "Marketing and advertising agencies",
  "Sports and outdoor event organizers",
  "Church and volunteer organizations",
  "Businesses and companies",
];

// 2026-11-17 (R137): expanded from 4 to 9 items. The four original answers are kept
// verbatim so the existing MOQ / price / shipping figures stay exactly as they were;
// the five new answers come from the SEO plan and add no new hard numbers.
const faqs = [
  {
    q: "Can you make custom t-shirts for corporate events?",
    a: "Yes. We support custom apparel projects for corporate events, employee activities, company celebrations, team-building programs and promotional campaigns.",
  },
  {
    q: "Can we add our company logo and event artwork?",
    a: "Yes. You can provide your company logo, event graphics, sponsor artwork and other design requirements for review before production.",
  },
  {
    q: "Can you produce shirts for trade shows and exhibitions?",
    a: "Yes. We can discuss custom shirts for exhibition staff, promotional teams, booth representatives and other trade show activities.",
  },
  {
    q: "Can we order different sizes in one order?",
    a: "Yes. You can provide your required size breakdown. We will help clarify the available size range and garment measurements.",
  },
  {
    q: "Can you ship custom event t-shirts internationally?",
    a: "Yes. We work with international customers and can discuss available shipping options based on your destination and order requirements.",
  },
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
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
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
            alt="Custom event t-shirts for corporate events, trade shows, festivals and charity campaigns"
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
              For businesses, organizers, schools &amp; charities
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Custom Event T-Shirts{" "}
              <span className="text-[#00c2ff]">for Events, Businesses &amp; Organizations</span>
            </h1>

            <p className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
              Branded tees that bring the group together.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80 md:text-xl">
              Create custom event t-shirts that bring people together and make your event more
              recognizable. SublimApparel works with businesses, event organizers, schools, charities
              and organizations to produce custom t-shirts for events, campaigns, group activities
              and promotional programs.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/80 md:text-xl">
              Whether you are preparing apparel for a corporate event, trade show, charity
              campaign, festival, school activity or community gathering, we can help turn your ideas
              into coordinated custom shirts. Add your organization logo, event name, sponsor
              graphics, campaign message and custom artwork to create apparel that represents your
              event.{" "}
              <strong className="text-white">From $9 per piece, MOQ 50, edge-to-edge print</strong> —
              all from our Yiwu factory with DDP shipping to 100+ countries.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-a-quote/"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff] hover:shadow-[0_8px_24px_rgba(0,194,255,0.4)]"
              >
                Request an Event T-Shirt Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/industries/events-conferences/"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                <Shirt className="h-4 w-4" />
                event and conference apparel
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

      {/* 2026-11-17 (R137): USE CASES — 8 event types from the SEO plan. */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Custom event t-shirt solutions
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Custom T-Shirts for Different Types of Events.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From company meetings to festivals, charity campaigns to campus activities — one
              production partner for every event type. If your calendar also includes race-day
              formats, our{" "}
              <Link href="/products/running-shirts/" className="font-bold text-black underline">
                custom running shirts
              </Link>
              ,{" "}
              <Link href="/marathon-shirts/" className="font-bold text-black underline">
                custom marathon shirts
              </Link>{" "}
              and{" "}
              <Link href="/race-shirts/" className="font-bold text-black underline">
                custom race shirts
              </Link>{" "}
              pages cover endurance and community race orders.
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

          {/* 2026-11-17 (R137): 7 customisation options replace the 4 garment styles. */}
          <div className="mt-12 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-8">
            <h3 className="text-xl font-black">Customize your event t-shirts</h3>
            <p className="mt-2 max-w-2xl text-sm text-black/70">
              Make your event apparel reflect your organization&apos;s identity. Not sure which
              finish suits your artwork? Compare the{" "}
              <Link href="/technique/" className="font-bold text-black underline">
                print method
              </Link>{" "}
              options, or{" "}
              <Link href="/products/t-shirts/" className="font-bold text-black underline">
                browse the full t-shirt range
              </Link>{" "}
              before you send your files.
            </p>
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

      {/* 2026-11-17 (R137): Event shirts for different groups — 5 families from the plan. */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              One order, several teams
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Event shirts for different groups.
            </h2>
            <p className="mt-3 text-base text-black/70">
              One event may involve several groups of people. Coordinated apparel can help
              distinguish their roles and create a consistent visual identity.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {eventGroups.map((g) => (
              <div key={g.label} className="bg-white p-6">
                <h3 className="text-lg font-black">{g.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2026-11-17 (R137): 6-step ordering process from the SEO plan. */}
      <section className="border-y border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              From brief to delivery
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              How to order custom event t-shirts.
            </h2>
            <p className="mt-3 text-base text-black/70">
              We help overseas customers organize their custom apparel projects from initial
              discussion through delivery. If your event date is fixed,{" "}
              <Link href="/event-timeline/" className="font-bold text-black underline">
                open the event timeline calculator
              </Link>{" "}
              to see the order dates we recommend.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {orderSteps.map((s) => (
              <div key={s.step} className="bg-white p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-xs font-black uppercase tracking-widest text-[#00c2ff]">
                    {s.step}
                  </div>
                  <div className="text-4xl font-black leading-none text-black/10">{s.num}</div>
                </div>
                <h3 className="mt-3 text-lg font-black">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2026-11-17 (R137): 6 reasons replace the 4 pain points; old links preserved. */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Why work with SublimApparel
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              A production partner, not just a printer.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {whyUs.map((w) => (
              <div key={w.title} className="rounded-sm border-2 border-black/10 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#00c2ff]/10 text-[#00c2ff]">
                    <w.icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/70">{w.body}</p>
                    {w.link ? (
                      <Link
                        href={w.link.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#00c2ff] hover:gap-2.5"
                      >
                        {w.link.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2026-11-17 (R137): 11 buyer types from the SEO plan. */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Who orders custom event t-shirts?
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Built for professional event buyers.
            </h2>
          </div>

          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {whoOrders.map((w) => (
              <li key={w} className="flex items-start gap-3 border-b border-black/10 pb-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00c2ff]" />
                <span className="text-sm font-bold">{w}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-3xl text-base text-black/70">
            If your organization needs custom shirts for an event, campaign or group activity, tell
            us about your project and we can discuss suitable production options. Schools and
            universities running youth programs can compare our{" "}
            <Link href="/summer-camp-shirts/" className="font-bold text-black underline">
              custom summer camp shirts
            </Link>{" "}
            for participant and counselor kits.
          </p>
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

      {/* 2026-11-17 (R137): Tail CTA from the SEO plan. */}
      <section className="border-t-4 border-black bg-[#0a0a0a] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Get a quote for custom event t-shirts
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Planning a corporate event, trade show, festival, charity campaign, school activity or
              community gathering?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Tell us about your event and apparel requirements. Share your design, estimated
              quantity and delivery destination. Our team will review your project and discuss
              suitable production and delivery options. You can{" "}
              <Link href="/contact/" className="font-bold text-[#00c2ff] underline">
                get a quote for custom apparel
              </Link>{" "}
              through the contact form, or send the same details by email to{" "}
              <a href="mailto:info@sublimapparel.com" className="font-bold text-[#00c2ff] underline">
                info@sublimapparel.com
              </a>
              .
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-a-quote/"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff]"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                Discuss Your Event Shirt Project
              </Link>
            </div>
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
