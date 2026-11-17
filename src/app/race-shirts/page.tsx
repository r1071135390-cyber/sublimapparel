// 2026-09-15 (R69): /race-shirts/ scenario landing page — restored.
// Targets "race shirts" buyer intent. Distinct from
// /products/running-shirts/ (which is the product catalog page showing all
// styles) by being a buyer-intent landing page focused on RACE-specific
// needs — charity races, fundraising runs, church runs, awareness runs,
// corporate runs. The "charity race" + "church run" + "fundraising run"
// keyword clusters get coverage here that R68 audit found at near-zero.
//
// 2026-11-17 (R137): SEO rewrite per the 2026-11-17 SEO plan (plan lines
// 1312-1584). New title / meta description / H1, 7 race types, 6
// customisation options, participant & staff groups, a 6-step ordering
// process, 6 "why work with us" reasons, 10 buyer types, 8 FAQs and a tail
// CTA. No new hard numbers are introduced: the existing MOQ, fabric,
// production and shipping figures stay exactly as they were, and the 4 hero
// stat tiles are unchanged.
import { buildPageMetadata } from "@/lib/page-metadata";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Brush,
  Building2,
  Calendar,
  CheckCircle2,
  Factory,
  Globe,
  GraduationCap,
  Heart,
  Layers,
  MapPin,
  Megaphone,
  Package,
  Palette,
  Ruler,
  Shield,
  Shirt,
  Sparkles,
  Timer,
  Trophy,
  Type,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { RelatedProducts } from "@/components/related-products";
import { UnifiedContactCta } from "@/components/unified-contact-cta";
import { PageGeoAnswerBlock } from "@/components/geo-answer-block";

const SITE_URL = "https://sublimapparel.com";
const pageUrl = `${SITE_URL}/race-shirts/`;

const PAGE_TITLE = "Custom Race Shirts for 5K, 10K & Running Events";
const PAGE_DESCRIPTION =
  "Order custom race shirts for 5K, 10K, fun runs, charity races and community events. Custom designs, bulk production and worldwide delivery.";

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "custom race shirts",
    "race shirts bulk",
    "race shirts manufacturer",
    "race shirts factory",
    "race t-shirts",
    "race t-shirts bulk",
    "race t-shirt printing",
    "5k race shirts",
    "5k race shirts custom",
    "5k t-shirts bulk",
    "10k race shirts",
    "10k race shirts custom",
    "half marathon shirts",
    "half marathon shirts custom",
    "marathon race shirts",
    "marathon shirts manufacturer",
    "fun run shirts",
    "fun run t-shirts",
    "custom fun run shirts",
    "charity race shirts",
    "charity run shirts",
    "charity run shirts bulk",
    "charity run t-shirts",
    "community race shirts",
    "bulk race shirts",
    "fundraising race shirts",
    "fundraising run shirts",
    "fundraiser race shirts",
    "fundraiser 5k shirts",
    "awareness race shirts",
    "awareness run shirts",
    "church run shirts",
    "church 5k shirts",
    "church race shirts",
    "corporate race shirts",
    "corporate run shirts",
    "company race shirts",
    "company 5k shirts",
    "race day shirts",
    "race day t-shirts",
    "race finisher shirts",
    "race finisher tees",
    "race participant shirts",
    "race volunteer shirts",
    "race sponsor shirts",
    "race staff shirts",
    "race event shirts",
    "race singlet",
    "race singlet custom",
    "sublimated race shirts",
    "sublimation race shirts",
    "performance race shirts",
    "lightweight race shirts",
    "moisture wicking race shirts",
    "race shirts Yiwu factory",
    "race shirts B2B",
    "race shirts DDP",
    "race shirts fast turnaround",
  ],
  alternates: { canonical: pageUrl },
  ogTitle: PAGE_TITLE,
  ogDescription:
    "Order custom race shirts for 5K, 10K, fun runs, charity races and community events. Bulk production and worldwide delivery.",
  ogImage: "/og/og-industry.webp",
});

// 2026-11-17 (R137): 7 race types from the SEO plan (replaces the 4 old use cases).
const useCases = [
  {
    icon: Trophy,
    title: "5K Race Shirts",
    desc: "Custom shirts for 5K races, school running events, local competitions and community fitness activities. Add event artwork, sponsor logos and race information.",
  },
  {
    icon: Timer,
    title: "10K Race Shirts",
    desc: "Create coordinated apparel for 10K participants, volunteers and event staff. Customize the shirt design to match your race branding.",
  },
  {
    icon: Sparkles,
    title: "Fun Run Shirts",
    desc: "Colorful custom shirts for fun runs, family running events, recreational races and public fitness activities.",
  },
  {
    icon: Heart,
    title: "Charity Run Shirts",
    desc: "Promote your fundraising campaign with shirts featuring charity logos, campaign messages, event names and sponsor graphics.",
  },
  {
    icon: MapPin,
    title: "Community Race Shirts",
    desc: "Custom apparel for local running clubs, neighborhood races, city events and community organizations.",
  },
  {
    icon: GraduationCap,
    title: "School & University Race Shirts",
    desc: "Custom shirts for school fun runs, campus fitness days, student running activities and university events.",
  },
  {
    icon: Building2,
    title: "Corporate Race Shirts",
    desc: "Branded shirts for company running challenges, employee wellness activities, charity participation and corporate sports days.",
  },
];

// 2026-11-17 (R137): 6 customisation options from the SEO plan (replaces the 4 garment styles).
const whatWeMake = [
  {
    label: "Custom Artwork & Graphics",
    examples:
      "Provide your own design, event logo or artwork. We review the files and confirm production requirements before the order is finalized.",
    icon: Brush,
  },
  {
    label: "Sponsor Logos",
    examples: "Include sponsor names, partner logos and event branding in your shirt design.",
    icon: Award,
  },
  {
    label: "Custom Colors",
    examples: "Choose colors that match your event theme, organization or campaign identity.",
    icon: Palette,
  },
  {
    label: "Custom Event Messages",
    examples: "Add event names, dates, slogans, race distances and other approved design elements.",
    icon: Type,
  },
  {
    label: "Different Shirt Styles",
    examples:
      "Discuss available shirt styles, sleeve options, necklines and fabric choices according to your project requirements.",
    icon: Shirt,
  },
  {
    label: "Multiple Sizes",
    examples:
      "Provide a size breakdown for participants, volunteers and staff. We can help clarify garment measurements and sizing specifications before production.",
    icon: Ruler,
  },
];

// 2026-11-17 (R137): participant, volunteer and staff groups from the SEO plan.
const raceGroups = [
  {
    label: "Participant Shirts",
    desc: "Custom shirts for registered runners and race participants.",
    icon: Users,
  },
  {
    label: "Volunteer Shirts",
    desc: "Recognizable apparel for volunteers supporting registration, water stations, route assistance and event operations.",
    icon: Heart,
  },
  {
    label: "Race Staff Shirts",
    desc: "Coordinated shirts for organizers, event coordinators and on-site teams.",
    icon: Shield,
  },
  {
    label: "Sponsor & Promotional Shirts",
    desc: "Branded apparel for sponsors, partners and event promotional activities.",
    icon: Megaphone,
  },
];

// 2026-11-17 (R137): 6-step ordering process from the SEO plan.
const orderSteps = [
  {
    step: "Step 01",
    num: "01",
    title: "Share Your Event Details",
    desc: "Tell us the race type, event date, estimated quantity and delivery destination.",
    icon: Calendar,
  },
  {
    step: "Step 02",
    num: "02",
    title: "Send Your Design",
    desc: "Provide your event logo, artwork, sponsor graphics and preferred colors.",
    icon: Brush,
  },
  {
    step: "Step 03",
    num: "03",
    title: "Confirm Shirt Specifications",
    desc: "Discuss shirt style, fabric, size range, size breakdown and other garment requirements.",
    icon: Shirt,
  },
  {
    step: "Step 04",
    num: "04",
    title: "Review Artwork & Samples",
    desc: "We review the design and production details with you. Samples or pre-production confirmation can be arranged when required.",
    icon: CheckCircle2,
  },
  {
    step: "Step 05",
    num: "05",
    title: "Bulk Production & Quality Checks",
    desc: "Production begins after the order specifications are confirmed. Garments are checked during production and before shipment.",
    icon: Package,
  },
  {
    step: "Step 06",
    num: "06",
    title: "Arrange International Delivery",
    desc: "We discuss available shipping methods based on your destination, quantity and required timeline.",
    icon: Globe,
  },
];

// 2026-11-17 (R137): 6 reasons from the SEO plan (replaces the 4 pain points).
// The old pain-point links are preserved here so the link equity is not lost.
const whyUs = [
  {
    icon: Award,
    title: "Custom Apparel Production Since 2018",
    body: "We have been working in custom apparel production since 2018, supporting international customers with different apparel projects.",
  },
  {
    icon: Factory,
    title: "Yiwu-Based Production Partner",
    body: "Work directly with a China-based production team for your custom race apparel requirements.",
  },
  {
    icon: Layers,
    title: "Bulk Order Support",
    body: "We support organizations that need coordinated apparel in multiple sizes and quantities.",
    link: { label: "See 90-Day Program", href: "/90-day-program" },
  },
  {
    icon: Ruler,
    title: "Artwork & Sizing Assistance",
    body: "We help clarify artwork files, garment specifications and size requirements before production.",
    link: { label: "Get US Size Guide", href: "/us-size-guide" },
  },
  {
    icon: Shield,
    title: "Production Quality Control",
    body: "We conduct production checks and final inspections to help reduce avoidable quality issues.",
    link: { label: "Quality control", href: "/quality-control" },
  },
  {
    icon: Globe,
    title: "International Shipping Support",
    body: "We work with overseas customers and can discuss available international and door-to-door shipping arrangements.",
  },
];

// 2026-11-17 (R137): 10 buyer types from the SEO plan.
const whoOrders = [
  "5K and 10K race organizers",
  "Fun run organizers",
  "Marathon and half marathon organizers",
  "Charity organizations",
  "Community event organizers",
  "Schools and universities",
  "Running clubs",
  "Corporate event planners",
  "Sports training organizations",
  "Promotional merchandise agencies",
];

// 2026-11-17 (R137): expanded from 4 to 8 items. The four original answers are kept
// verbatim so the existing MOQ / fabric / shipping figures stay exactly as they were;
// the four new answers come from the SEO plan and add no new hard numbers.
const faqs = [
  {
    q: "Can you make custom shirts for 5K and 10K races?",
    a: "Yes. We support custom apparel projects for 5K races, 10K races, fun runs, charity runs and other running events.",
  },
  {
    q: "Can we put our event logo and sponsor logos on the shirts?",
    a: "Yes. You can provide your event logo, sponsor artwork and other design elements for review before production.",
  },
  {
    q: "Can we use our own race shirt design?",
    a: "Yes. You can send your artwork and design requirements. We will review the files and clarify production details before confirming the order.",
  },
  {
    q: "What's the MOQ for race shirts?",
    a: "50 pieces per design for cut-and-sew sublimation on polyester. For DTG on 100% cotton (which is less common for race shirts but available), MOQ drops to 30 pieces. Sample runs start at 5-10 pieces with a 7-10 day turnaround. Re-order MOQ is 30 pieces for race-week additions.",
  },
  {
    q: "What fabric do you recommend for race shirts?",
    a: "100% polyester interlock (135-145 GSM) is the workhorse for race shirts — lightweight, moisture-wicking, full sublimation area. Polyester-spandex (92/8) for fitted race-cut. Birdseye mesh poly for hot marathons. Coolmax-blend for premium races. Recycled poly (rPET) for sustainability story — 8-12 bottles per shirt.",
  },
  {
    q: "How fast can you ship for race day?",
    a: "Bulk production is 15-25 days. DDP ocean freight adds 7-14 days. DDP air freight is 5-7 days for late orders. Our US warehouse in Fontana CA offers 2-5 day domestic delivery for race-week emergencies.",
  },
  {
    q: "Can you do matching volunteer and sponsor shirts?",
    a: "Yes. Volunteer polos, sponsor visibility shirts, race staff apparel — all in one production cycle. Sublimation supports per-piece color and per-piece design, so volunteers, sponsors, and staff get distinct colorways at no extra setup fee.",
  },
  {
    q: "What information should I provide for a quotation?",
    a: "Please share your type of race or event, estimated order quantity, event date, shirt design or artwork, expected size breakdown, preferred shirt style or fabric if known, and your delivery country and destination.",
  },
];

export default function RaceShirtsPage() {
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Race Shirts", item: pageUrl },
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
        name: "Custom Race Shirt Manufacturing",
        serviceType: "Custom race shirt sublimation, performance fabric, lightweight athletic wear",
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
      <PageGeoAnswerBlock path="/race-shirts/" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0">
          <Image
            src="/products/0128/0.webp"
            alt="Custom race shirts — 5K, 10K, charity run apparel manufactured in Yiwu"
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
              <Trophy className="h-3.5 w-3.5" />
              For race organizers, schools, charities &amp; companies
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Custom Race Shirts for 5K, 10K
              <br />
              <span className="text-[#00c2ff]">&amp; Community Running Events</span>
            </h1>

            <p className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
              Bring your event identity to life with custom race shirts designed for participants,
              volunteers and event teams.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80 md:text-xl">
              SublimApparel works with race organizers, schools, charities, companies and community
              organizations to produce custom shirts for running events of different sizes. Whether
              you are organizing a 5K fun run, a 10K race, a charity fundraiser or a local
              community running event, we can help you create coordinated apparel featuring your
              event logo, sponsor graphics, colors and custom artwork.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/80 md:text-xl">
              We support bulk custom apparel production and international delivery for overseas
              customers.{" "}
              <strong className="text-white">
                Edge-to-edge print, MOQ 50, deadline-locked delivery
              </strong>{" "}
              — all from our Yiwu factory with DDP shipping to 100+ countries.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-a-quote/"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff] hover:shadow-[0_8px_24px_rgba(0,194,255,0.4)]"
              >
                Request a Race Shirt Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/marathon-shirts/"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                <Shirt className="h-4 w-4" />
                marathon shirts
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">50</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Pieces MOQ
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">135 GSM</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Lightweight race fabric
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

      {/* 2026-11-17 (R137): USE CASES — 7 race types from the SEO plan. */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Race shirt solutions
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Custom Shirts for Different Types of Races.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From a 100-person 5K to a 5,000-person marathon. Same factory, same color profile,
              same production line — deadline-locked delivery for every race distance.
            </p>
            <p className="mt-3 text-base text-black/70">
              Every format starts from the same production line. Browse our{" "}
              <Link href="/products/running-shirts/" className="font-bold text-black underline">
                custom running shirts
              </Link>{" "}
              range for the available styles, or compare our{" "}
              <Link href="/marathon-shirts/" className="font-bold text-black underline">
                custom marathon shirts
              </Link>{" "}
              for full-distance events. Races that need several teams on the same order can follow
              the same route through our{" "}
              <Link href="/custom-event-t-shirts/" className="font-bold text-black underline">
                custom event t-shirts
              </Link>{" "}
              page.
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

          {/* 2026-11-17 (R137): 6 customisation options replace the 4 garment styles. */}
          <div className="mt-12 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-8">
            <h3 className="text-xl font-black">Customize your race shirts</h3>
            <p className="mt-2 max-w-2xl text-sm text-black/70">
              Create race apparel that reflects your event&apos;s identity. Share the artwork and the
              size breakdown you need, and we will clarify garment measurements and production
              requirements before the order is finalized.
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

      {/* 2026-11-17 (R137): Race shirts for participants, volunteers and event staff. */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              One order, several teams
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Race Shirts for Participants, Volunteers &amp; Event Staff
            </h2>
            <p className="mt-3 text-base text-black/70">
              A running event often involves different groups of people. Coordinated apparel can
              help create a consistent event identity.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-4">
            {raceGroups.map((g) => (
              <div key={g.label} className="bg-white p-6">
                <g.icon className="h-8 w-8 text-[#00c2ff]" />
                <h3 className="mt-4 text-lg font-black">{g.label}</h3>
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
              How to order custom race shirts.
            </h2>
            <p className="mt-3 text-base text-black/70">
              We help overseas customers organize their custom apparel requirements from initial
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
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
                    <s.icon className="h-4 w-4" strokeWidth={2.5} />
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
              What you get as a race apparel partner.
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

      {/* 2026-11-17 (R137): 10 buyer types from the SEO plan. */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Who orders custom race shirts?
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Built for race organizers, clubs and community groups.
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
            If you are organizing a race or group running activity, tell us about your project and we
            can discuss the production options. Schools, clubs and youth groups running the same
            kind of bulk apparel program can compare our{" "}
            <Link href="/summer-camp-shirts/" className="font-bold text-black underline">
              custom group shirts
            </Link>{" "}
            for camp, club and community uniform programs.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Common questions from race directors
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
              Get a quote for custom race shirts
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Preparing for a 5K, 10K, fun run, charity race or community event?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Send us your event details, artwork and estimated quantity. Our team will review your
              requirements and discuss suitable production and delivery options. You can{" "}
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
                Discuss Your Race Shirt Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedProducts solutionSlug="event-festivals-conferences" />

      <UnifiedContactCta
        variant="full"
        sourceLabel="Race shirts"
        className="border-t-4 border-black"
      />

      <Contact />
    </>
  );
}
