// 2026-09-15 (R69): /marathon-shirts/ scenario landing page — restored.
// Targets "marathon shirts" buyer intent. Distinct from /race-shirts/
// (which is the broader race-day hub covering 5K/10K/fun runs) by being
// dedicated to full marathon and ultra-distance events where fabric
// performance, sponsor placement, and charity-run partnerships matter.
// The marathon-specific buyer-intent cluster — "marathon finisher shirts",
// "marathon sponsor shirts", "charity marathon shirts", "fundraising
// marathon" — gets coverage here that R68 audit found at near-zero.
//
// 2026-11-17 (R137): SEO rewrite per the Nov 2026 SEO plan.
// The page now targets event-procurement intent (organizers, volunteers,
// staff, sponsors) instead of a generic product pitch:
// 6 running-event types, 6 customisation options, 4 audience groups,
// 6 ordering steps, 6 reasons, 10 buyer types and an 8-item FAQ.
// The visual skeleton (HERO → USE CASES → WHAT WE MAKE → WHY → FAQ)
// is unchanged; only the copy and section content changed.
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Heart,
  Layers,
  MapPin,
  Package,
  Palette,
  Ruler,
  Shield,
  Shirt,
  Sparkles,
  Timer,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { RelatedProducts } from "@/components/related-products";
import { RequestQuoteLink } from "@/components/request-quote-link";
import { UnifiedContactCta } from "@/components/unified-contact-cta";
import { PageGeoAnswerBlock } from "@/components/geo-answer-block";

const SITE_URL = "https://sublimapparel.com";
const pageUrl = `${SITE_URL}/marathon-shirts/`;

// 2026-11-17 (R137): Title / description rewritten to the Nov 2026 SEO plan
// wording. Title stays under the 60-char SERP cap and uses { absolute: true }
// inside buildPageMetadata, so no "| SublimApparel" suffix is appended.
export const metadata: Metadata = buildPageMetadata({
  title: "Custom Marathon Shirts for Full & Half Marathons",
  description:
    "Order custom marathon shirts for marathons, half marathons, charity runs and race events. Custom designs, bulk apparel production and worldwide shipping.",
  keywords: [
    "custom marathon shirts",
    "marathon shirts bulk",
    "marathon shirts manufacturer",
    "marathon shirts factory",
    "marathon t-shirts",
    "marathon t-shirts bulk",
    "marathon t-shirt printing",
    "marathon finisher shirts",
    "marathon finisher tees",
    "marathon participant shirts",
    "half marathon shirts",
    "half marathon shirts custom",
    "half marathon finisher shirts",
    "half marathon t-shirts",
    "full marathon shirts",
    "full marathon apparel",
    "marathon singlet",
    "marathon singlet custom",
    "ultra marathon shirts",
    "ultra marathon apparel",
    "ultra marathon singlet",
    "marathon sponsor shirts",
    "marathon sponsor apparel",
    "marathon sponsor visibility",
    "charity marathon shirts",
    "charity marathon apparel",
    "charity marathon t-shirts",
    "fundraising marathon shirts",
    "fundraising marathon apparel",
    "fundraiser marathon shirts",
    "marathon finisher medal shirts",
    "marathon commemorative shirts",
    "marathon event shirts",
    "marathon event apparel",
    "marathon volunteer shirts",
    "marathon staff shirts",
    "marathon course shirts",
    "marathon training shirts",
    "marathon team shirts",
    "marathon club shirts",
    "marathon running shirts",
    "marathon athletic shirts",
    "performance marathon shirts",
    "lightweight marathon shirts",
    "moisture wicking marathon shirts",
    "sublimated marathon shirts",
    "sublimation marathon shirts",
    "marathon shirts Yiwu factory",
    "marathon shirts B2B",
    "marathon shirts DDP",
    "marathon shirts fast turnaround",
  ],
  alternates: { canonical: pageUrl },
  ogTitle: "Custom Marathon Shirts for Full & Half Marathons",
  ogDescription:
    "Order custom marathon shirts for marathons, half marathons, charity runs and race events. Bulk production and shipping.",
  ogImage: "/og/og-industry.webp",
});

// 2026-11-17 (R137): Section copy rewritten from the Nov 2026 SEO plan.
// Event types, customisation options, audience groups, ordering steps and
// reasons now follow the plan wording. No new hard numbers are introduced
// in this rewrite — MOQ, lead time, fabric and shipping figures that were
// already published on this page are kept exactly as they were.
type UseCase = { icon: LucideIcon; title: string; desc: string };

const useCases: UseCase[] = [
  {
    icon: Trophy,
    title: "Full Marathon Shirts",
    desc: "Custom shirts for full marathon participants, race staff and event volunteers. Include your marathon logo, event name, year, sponsor graphics and other visual elements.",
  },
  {
    icon: Timer,
    title: "Half Marathon Shirts",
    desc: "Create coordinated shirts for half marathon participants and event teams. Customize the artwork and colors to reflect your race identity.",
  },
  {
    icon: Award,
    title: "10K & 5K Race Shirts",
    desc: "Custom race shirts for 5K, 10K and other short-distance running events. Suitable for community races, school events and recreational running programs.",
  },
  {
    icon: Heart,
    title: "Charity Run Shirts",
    desc: "Support your fundraising campaign with custom shirts featuring charity logos, campaign graphics, sponsor names and event messages.",
  },
  {
    icon: MapPin,
    title: "City & Community Running Events",
    desc: "Create event apparel for city runs, local races, public fitness activities and community celebrations.",
  },
  {
    icon: Users,
    title: "Corporate Marathon & Running Events",
    desc: "Custom shirts for company running teams, employee wellness programs, corporate challenges and sponsored running events.",
  },
];

type WhatWeMake = { label: string; examples: string; icon: LucideIcon };

const whatWeMake: WhatWeMake[] = [
  {
    label: "Custom Event Artwork",
    examples: "Send your artwork, or review the design files with our team before production",
    icon: Sparkles,
  },
  {
    label: "Sponsor Logo Placement",
    examples: "Sponsor logos, event partners and supporting organizations on your garment layout",
    icon: Award,
  },
  {
    label: "Custom Colors & Patterns",
    examples: "Colors and visual styles matching your race identity, event theme or branding",
    icon: Palette,
  },
  {
    label: "Participant & Staff Shirts",
    examples: "Coordinated apparel for runners, volunteers, race staff and event management teams",
    icon: Users,
  },
  {
    label: "Custom Sizes",
    examples: "Expected size breakdown so production is planned around your participants",
    icon: Ruler,
  },
  {
    label: "Fabric & Shirt Style Options",
    examples: "Fabric choices, shirt styles, sleeve options and garment specifications",
    icon: Shirt,
  },
];

type AudienceGroup = { icon: LucideIcon; title: string; desc: string };

const audienceGroups: AudienceGroup[] = [
  {
    icon: Users,
    title: "Participant Shirts",
    desc: "Custom shirts for registered runners and race participants.",
  },
  {
    icon: Heart,
    title: "Volunteer Shirts",
    desc: "Easy-to-recognize shirts for volunteers helping with registration, water stations, route support and event operations.",
  },
  {
    icon: Shield,
    title: "Staff & Organizer Shirts",
    desc: "Coordinated apparel for event organizers, race management teams and on-site staff.",
  },
  {
    icon: Award,
    title: "Sponsor & Promotional Shirts",
    desc: "Custom-branded apparel for event sponsors, partners and promotional activities.",
  },
];

type ProcessStep = { n: string; title: string; desc: string };

const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Tell Us About Your Event",
    desc: "Share your event type, estimated number of participants, expected order quantity and delivery destination.",
  },
  {
    n: "02",
    title: "Send Your Artwork",
    desc: "Provide your event logo, shirt design, sponsor artwork and preferred colors.",
  },
  {
    n: "03",
    title: "Confirm Garment Details",
    desc: "Discuss shirt style, fabric, size range, size breakdown and other production specifications.",
  },
  {
    n: "04",
    title: "Review Before Production",
    desc: "We review the artwork and order details with you. Samples or pre-production confirmation can be arranged when required.",
  },
  {
    n: "05",
    title: "Bulk Production & Quality Inspection",
    desc: "After the specifications are approved, production is arranged according to the confirmed order. Garments are checked during production and before shipment.",
  },
  {
    n: "06",
    title: "International Shipping",
    desc: "We discuss suitable shipping arrangements based on your delivery destination, order quantity and required timeline.",
  },
];

// 2026-11-17 (R137): The former PAIN POINTS section became a WHY section.
// The four deep links it carried (/90-day-program, /quality-control,
// /us-size-guide, /event-timeline) are preserved and re-pointed at the
// matching reason cards so no link equity is lost.
type Reason = { icon: LucideIcon; title: string; desc: string; link?: { label: string; href: string } };

const reasons: Reason[] = [
  {
    icon: Clock,
    title: "Custom Apparel Production Since 2018",
    desc: "We have been working in custom apparel production since 2018, supporting overseas customers with different apparel requirements.",
    link: { label: "Open Event Timeline", href: "/event-timeline" },
  },
  {
    icon: MapPin,
    title: "Yiwu-Based Production Partner",
    desc: "Work directly with a China-based production team for your event apparel requirements.",
  },
  {
    icon: Layers,
    title: "Bulk Order Support",
    desc: "We support organizations that need coordinated apparel in different sizes and quantities for events and group activities.",
    link: { label: "See 90-Day Program", href: "/90-day-program" },
  },
  {
    icon: Palette,
    title: "Artwork & Sizing Communication",
    desc: "We help clarify artwork, garment specifications and size requirements before production.",
    link: { label: "Get US Size Guide", href: "/us-size-guide" },
  },
  {
    icon: Shield,
    title: "Production Quality Checks",
    desc: "We conduct production checks and final inspections to help reduce avoidable quality issues.",
    link: { label: "Color matching process", href: "/quality-control" },
  },
  {
    icon: Package,
    title: "International Delivery Support",
    desc: "We work with international customers and can discuss available shipping and door-to-door delivery arrangements.",
  },
];

const whoOrders: string[] = [
  "Marathon organizers",
  "Half marathon organizers",
  "5K and 10K race organizers",
  "Race management companies",
  "Charity organizations",
  "City and community event organizers",
  "Corporate event planners",
  "Schools and universities",
  "Sports clubs and running organizations",
  "Promotional merchandise agencies",
];

// 2026-11-17 (R137): FAQ expanded from 4 to the 8 questions in the Nov 2026
// SEO plan. The published MOQ, fabric and shipping figures are carried over
// verbatim inside the matching new answers so nothing already stated on this
// page is deleted, and no new hard numbers are added.
type Faq = { q: string; a: string; points?: string[] };

const faqs: Faq[] = [
  {
    q: "Can you make custom shirts for a full marathon?",
    a: "Yes. We support custom apparel projects for full marathons, half marathons, 10K races, 5K events and other running activities.",
  },
  {
    q: "Can we include sponsor logos on marathon shirts?",
    a: "Yes. You can provide sponsor logos and other event artwork for review. The final placement and printing details should be confirmed before production. Sublimation supports unlimited colors and unlimited logo placement at no extra setup fee. Multi-sponsor marathons typically have 5-20 sponsor logos per design — all reproduced accurately with Pantone color matching.",
  },
  {
    q: "Can we order different shirts for runners, volunteers and staff?",
    a: "Yes. You can discuss different designs, colors or garment requirements for each group. We will review the quantities and specifications with you. Common choices are polyester-spandex (92/8, 145 GSM) for a fitted marathon race-cut, birdseye mesh poly for hot marathons, coolmax-blend for premium marathons, recycled poly (rPET) for sustainability stories — 8-12 bottles per shirt — and 100% polyester interlock (135 GSM) for budget-friendly race kits.",
  },
  {
    q: "Can you produce shirts for both small and large running events?",
    a: "We review projects according to the required garment, quantity and production schedule. Contact us with your estimated order quantity so we can confirm the available production options.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "MOQ depends on the selected garment, fabric and production requirements. Please share your estimated quantity so we can confirm the available options. For cut-and-sew sublimation on polyester the standard is 50 pieces per design; for DTG on 100% cotton (less common for marathon shirts) MOQ drops to 30 pieces. Sample runs start at 5-10 pieces with a 7-10 day turnaround, and re-order MOQ is 30 pieces for race-week additions.",
  },
  {
    q: "How early should we order marathon shirts?",
    a: "We recommend contacting us as early as possible, especially for events with fixed race dates. The production and shipping schedule depends on order details, artwork approval and destination.",
  },
  {
    q: "Can you ship marathon shirts to the USA, UK, Europe and other countries?",
    a: "We work with international customers and can discuss shipping options for different destinations. Available delivery methods and estimated timelines depend on the order and destination. Bulk production is 15-25 days. DDP ocean freight adds 7-14 days. DDP air freight is 5-7 days for late orders. Our US warehouse in Fontana CA offers 2-5 day domestic delivery for race-week emergencies.",
  },
  {
    q: "What information do you need to provide a quotation?",
    a: "To help us review your project, please provide:",
    points: [
      "Event name and type",
      "Estimated quantity",
      "Shirt design or artwork",
      "Expected size breakdown",
      "Preferred fabric or shirt style, if known",
      "Delivery country and required arrival date",
    ],
  },
];

export default function MarathonShirtsPage() {
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Marathon Shirts", item: pageUrl },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Custom Marathon Shirts for Full & Half Marathons",
        description:
          "Order custom marathon shirts for marathons, half marathons, charity runs and race events. Custom designs, bulk apparel production and worldwide shipping.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${pageUrl}#faq` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Custom Marathon Shirt Manufacturing",
        serviceType: "Custom marathon shirt sublimation, performance fabric, sponsor-grade printing",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Canada" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Australia" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "France" },
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
          acceptedAnswer: {
            "@type": "Answer",
            text: f.points ? `${f.a} ${f.points.join(", ")}` : f.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={pageGraph} />

      {/* 2026-09-18 (R73 GEO): Direct Answer block for AI crawlers. */}
      <PageGeoAnswerBlock path="/marathon-shirts/" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0">
          <Image
            src="/products/0128/2.webp"
            alt="Custom marathon shirts — full and half marathon apparel manufactured in Yiwu"
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
              For marathon organizers, race teams &amp; charities
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Custom Marathon Shirts
              <br />
              <span className="text-[#00c2ff]">
                for Marathons &amp; Running Events
              </span>
            </h1>

            <p className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
              Make your next race memorable with custom marathon shirts designed for runners,
              volunteers and event teams.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80 md:text-xl">
              SublimApparel supports marathon organizers, race management companies, charities and
              event organizations with custom running apparel production. Whether you are planning a
              full marathon, half marathon, 10K race, charity run or community running event, we can
              help turn your event artwork and branding into coordinated shirts for your participants.
              From custom event graphics and sponsor logos to coordinated colors and size
              breakdowns, we help simplify the process of ordering marathon shirts in bulk —{" "}
              <strong className="text-white">premium marathon shirts</strong> finishers actually want
              to wear, with{" "}
              <strong className="text-white">
                sponsor-grade print, lightweight fabric, MOQ 50, DDP worldwide
              </strong>{" "}
              — all from our Yiwu factory.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <RequestQuoteLink
                label="marathon shirts / page / Get a quote"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff] hover:shadow-[0_8px_24px_rgba(0,194,255,0.4)]"
              >
                Request a Marathon Shirt Quote
                <ArrowRight className="h-4 w-4" />
              </RequestQuoteLink>
              <Link
                href="/industries/endurance-race-events/"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                <Clock className="h-4 w-4" />
                race event apparel solutions
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
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">145 GSM</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Performance marathon fabric
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">15-25</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Day production
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">20+</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Sponsor logos per design
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
              Marathon shirt solutions
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Custom shirts for different types of running events.
            </h2>
            <p className="mt-3 text-base text-black/70">
              We work with organizations preparing apparel for different running events and race
              formats. From a 500-person half marathon to a 10,000-person full marathon — same factory,
              same color profile, same production line. Our{" "}
              <Link
                href="/race-shirts/"
                className="font-bold text-black underline underline-offset-4 hover:text-[#00c2ff]"
              >
                custom race shirts
              </Link>{" "}
              cover the shorter formats, while this page focuses on full and half marathon organizers.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
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
            <h3 className="text-xl font-black">Customize your marathon shirts</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-black/70">
              Your event shirt is part of the race experience. Make it recognizable with custom
              graphics, colors and branding.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* AUDIENCE GROUPS */}
      <section className="border-b border-black/10 bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Marathon shirts for every part of your event
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Marathon shirts for every part of your event.
            </h2>
            <p className="mt-3 text-base text-black/70">
              A running event may require more than one type of shirt. We can discuss coordinated
              apparel requirements for different groups.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {audienceGroups.map((a) => (
              <div key={a.title} className="rounded-sm border-2 border-black/10 bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[#00c2ff]/10 text-[#00c2ff]">
                  <a.icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h3 className="mt-4 text-lg font-black">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              How to order
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              How to order custom marathon shirts.
            </h2>
            <p className="mt-3 text-base text-black/70">
              We aim to make bulk apparel ordering straightforward for overseas event organizers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s) => (
              <div key={s.n} className="rounded-sm border-2 border-black/10 p-6">
                <div className="text-xs font-black uppercase tracking-widest text-[#00c2ff]">
                  Step {s.n}
                </div>
                <h3 className="mt-3 text-lg font-black">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Why SublimApparel
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Why choose SublimApparel for marathon shirts?
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-sm border-2 border-black/10 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#00c2ff]/10 text-[#00c2ff]">
                    <r.icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/70">{r.desc}</p>
                    {r.link ? (
                      <Link
                        href={r.link.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#00c2ff] hover:gap-2.5"
                      >
                        {r.link.label}
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

      {/* WHO ORDERS */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Who orders marathon shirts
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Who orders custom marathon shirts?
            </h2>
            <p className="mt-3 text-base text-black/70">Our marathon shirts are suitable for:</p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-5">
            {whoOrders.map((w) => (
              <div key={w} className="flex items-start gap-3 bg-white p-5">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#00c2ff]"
                  strokeWidth={2.5}
                />
                <span className="text-sm font-bold leading-snug">{w}</span>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-base leading-relaxed text-black/70">
            If you are organizing a race or running event and need custom shirts for participants,
            volunteers or staff, contact us to discuss your project. Running clubs often start from
            our{" "}
            <Link
              href="/products/running-shirts/"
              className="font-bold text-black underline underline-offset-4 hover:text-[#00c2ff]"
            >
              custom running shirts
            </Link>
            , while multi-group events are often built around{" "}
            <Link
              href="/custom-event-t-shirts/"
              className="font-bold text-black underline underline-offset-4 hover:text-[#00c2ff]"
            >
              custom event shirts
            </Link>{" "}
            and{" "}
            <Link
              href="/summer-camp-shirts/"
              className="font-bold text-black underline underline-offset-4 hover:text-[#00c2ff]"
            >
              custom group shirts
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Frequently asked questions
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
                {f.points ? (
                  <ul className="mt-3 space-y-2">
                    {f.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-2 text-sm leading-relaxed text-black/70"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#00c2ff]"
                          strokeWidth={2.5}
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 2026-11-17 (R137): Tail CTA from the Nov 2026 SEO plan. */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-sm bg-[#0a0a0a] p-8 text-white md:p-12">
            <div className="max-w-3xl">
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
                Marathon shirt quotation
              </div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Get a quote for your marathon shirts.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80">
                Planning a marathon, half marathon, charity run or community race? Let us know about
                your event and apparel requirements. Our team will review your project and discuss
                suitable production and delivery options.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <RequestQuoteLink
                  label="marathon shirts / page / Get a quote"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff] hover:shadow-[0_8px_24px_rgba(0,194,255,0.4)]"
                >
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </RequestQuoteLink>
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
                >
                  Discuss Your Marathon Shirt Project
                </Link>
              </div>

              <p className="mt-6 text-sm text-white/70">
                Prefer email? You can also{" "}
                <Link
                  href="/contact/"
                  className="font-bold text-[#00c2ff] underline underline-offset-4 hover:text-white"
                >
                  get a quote for custom apparel
                </Link>{" "}
                at{" "}
                <a
                  href="mailto:info@sublimapparel.com"
                  className="font-bold text-[#00c2ff] underline underline-offset-4 hover:text-white"
                >
                  info@sublimapparel.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedProducts solutionSlug="event-festivals-conferences" />

      <UnifiedContactCta
        variant="full"
        sourceLabel="Marathon shirts"
        className="border-t-4 border-black"
      />

      <Contact />
    </>
  );
}