// 2026-09-15 (R69): /summer-camp-shirts/ scenario landing page — restored.
// Targets "summer camp shirts" + "camp apparel" + "camp counselor shirts"
// buyer intent clusters that R68 keyword coverage audit identified as
// near-zero (only "camp" appeared once across the entire site). This page
// addresses a high-volume B2B seasonal query — summer camps place apparel
// orders 60-90 days before camp opens (Feb-Apr for June-Aug camps). The
// fast-tumaround 90-day program and color-matching are critical for camps
// that need matching counselor + camper + staff kits in distinct colorways.
//
// 2026-11-17 (R137): SEO rewrite per the 2026-11-17 SEO plan (plan lines
// 1585-1875). New title / meta description / H1, 6 camp types, 6
// customisation options, 5 camp-program groups, a 6-step ordering process,
// 6 "why work with us" reasons, 10 buyer types, 8 FAQs and a tail CTA.
// The page now also targets day camps, sports camps, youth programs, school
// summer programs, church camps and outdoor adventure camps.
// No new hard numbers are introduced: the existing MOQ, colorway, CPSIA,
// size-range, production and shipping figures stay exactly as they were, and
// the 4 hero stat tiles are unchanged.
import { buildPageMetadata } from "@/lib/page-metadata";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Church,
  Dumbbell,
  GraduationCap,
  Handshake,
  Layers,
  Mountain,
  Palette,
  Ruler,
  Shield,
  Shirt,
  Sparkles,
  Sun,
  Tent,
  Timer,
  Truck,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { RelatedProducts } from "@/components/related-products";
import { UnifiedContactCta } from "@/components/unified-contact-cta";
import { PageGeoAnswerBlock } from "@/components/geo-answer-block";

const SITE_URL = "https://sublimapparel.com";
const pageUrl = `${SITE_URL}/summer-camp-shirts/`;

const PAGE_TITLE = "Custom Summer Camp Shirts for Camps & Groups";
const PAGE_DESCRIPTION =
  "Order custom summer camp shirts for campers, counselors, schools and youth programs. Personalized designs, bulk production and worldwide shipping.";

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "summer camp shirts",
    "summer camp apparel",
    "summer camp t-shirts",
    "custom camp shirts",
    "custom camp apparel",
    "camp counselor shirts",
    "camp counselor apparel",
    "camp staff shirts",
    "camp uniform shirts",
    "camp t-shirts bulk",
    "camp shirts manufacturer",
    "camp apparel factory",
    "camp shirt printing",
    "summer camp uniform",
    "youth camp shirts",
    "youth camp apparel",
    "kids camp shirts",
    "kids camp apparel",
    "overnight camp shirts",
    "day camp shirts",
    "sleepaway camp shirts",
    "camp kit",
    "camp swag",
    "camp merchandise",
    "camp logo shirts",
    "camp branded apparel",
    "camp identity shirts",
    "cabin shirts",
    "color coded camp shirts",
    "camp reunion shirts",
    "camp alumni shirts",
    "camp giveaway shirts",
    "camp shirts for sale",
    "camp shirts bulk order",
    "camp shirt supplier",
    "summer camp shirt factory",
    "summer camp shirt manufacturer",
    "summer camp shirt printing",
    "summer camp clothing",
    "summer camp gear",
    "B2B camp shirts",
    "camp counselor uniform",
    "camp staff uniform",
    "camp shirts fast turnaround",
    "camp shirts deadline",
    "camp shirts DDP",
    "day camps",
    "sports camps",
    "youth programs",
    "school summer programs",
    "church camps",
    "outdoor adventure camps",
  ],
  alternates: { canonical: pageUrl },
  ogTitle: PAGE_TITLE,
  ogDescription:
    "Order custom summer camp shirts for campers, counselors, schools and youth programs. Personalized designs, bulk production.",
  ogImage: "/og/og-industry.webp",
});

// 2026-11-17 (R137): 6 camp types from the SEO plan (replaces the 4 old use cases).
const useCases = [
  {
    icon: Tent,
    title: "Traditional Summer Camps",
    desc: "Custom shirts for residential camps, day camps and seasonal youth programs. Add your camp name, logo, year and custom graphics.",
  },
  {
    icon: Dumbbell,
    title: "Sports Camps",
    desc: "Coordinated shirts for basketball camps, soccer camps, running camps, training programs and other sports activities.",
  },
  {
    icon: GraduationCap,
    title: "School & University Camps",
    desc: "Custom apparel for school summer programs, university activities, student camps and educational events.",
  },
  {
    icon: Mountain,
    title: "Outdoor Adventure Camps",
    desc: "Custom shirts for hiking programs, outdoor education, nature camps and recreational activities.",
  },
  {
    icon: Palette,
    title: "Art & Creative Camps",
    desc: "Personalized shirts for art camps, music camps, creative workshops and seasonal learning programs.",
  },
  {
    icon: Church,
    title: "Church & Community Camps",
    desc: "Custom shirts for community programs, group activities, seasonal gatherings and organized camp events.",
  },
];

// 2026-11-17 (R137): 6 customisation options from the SEO plan (replaces the 4 garment styles).
const whatWeMake = [
  {
    label: "Custom Camp Logos",
    examples: "Add your camp logo, organization name, program identity or other branding elements.",
    icon: Building2,
  },
  {
    label: "Camp Themes & Artwork",
    examples: "Use custom graphics, illustrations, slogans and artwork that reflect your camp theme.",
    icon: Sparkles,
  },
  {
    label: "Custom Colors",
    examples: "Choose colors that match your camp identity, team groups or seasonal program.",
    icon: Palette,
  },
  {
    label: "Camper & Counselor Shirts",
    examples: "Plan coordinated apparel for campers, counselors, instructors, volunteers and camp staff.",
    icon: Shirt,
  },
  {
    label: "Group & Team Designs",
    examples:
      "Create different designs or colors for individual cabins, age groups, activity teams or camp departments.",
    icon: Users,
  },
  {
    label: "Custom Sizes",
    examples:
      "Provide your expected size breakdown for children, teenagers and adults. We can help clarify garment measurements and size specifications before production.",
    icon: Ruler,
  },
];

// 2026-11-17 (R137): 5 camp-program groups from the SEO plan.
const campProgram = [
  {
    label: "Camper Shirts",
    desc: "Custom shirts for registered campers, group activities and camp souvenirs.",
  },
  {
    label: "Counselor Shirts",
    desc: "Coordinated shirts for counselors, instructors and activity leaders.",
  },
  {
    label: "Staff Shirts",
    desc: "Recognizable apparel for camp management, support staff and volunteers.",
  },
  {
    label: "Team & Group Shirts",
    desc: "Different colors or designs for cabins, teams, age groups and activity groups.",
  },
  {
    label: "Camp Event Shirts",
    desc: "Special designs for opening days, closing ceremonies, competitions, field trips and special camp activities.",
  },
];

// 2026-11-17 (R137): 6-step ordering process from the SEO plan.
const orderSteps = [
  {
    step: "Step 01",
    num: "01",
    title: "Share Your Camp Requirements",
    desc: "Tell us your camp type, expected number of campers and staff, required quantities and delivery destination.",
  },
  {
    step: "Step 02",
    num: "02",
    title: "Send Your Camp Artwork",
    desc: "Provide your camp logo, program graphics, preferred colors and other design materials.",
  },
  {
    step: "Step 03",
    num: "03",
    title: "Confirm Sizes & Garment Details",
    desc: "Discuss shirt styles, fabric choices, size ranges and the quantity required for each group.",
  },
  {
    step: "Step 04",
    num: "04",
    title: "Review Artwork & Samples",
    desc: "We review the design and garment specifications with you. Samples or pre-production confirmation can be arranged when required.",
  },
  {
    step: "Step 05",
    num: "05",
    title: "Bulk Production & Quality Checks",
    desc: "After the order specifications are approved, production is arranged accordingly. Garments are checked during production and before shipment.",
  },
  {
    step: "Step 06",
    num: "06",
    title: "International Delivery",
    desc: "We discuss shipping arrangements according to your camp schedule, destination and order requirements.",
  },
];

// 2026-11-17 (R137): 6 reasons replace the 4 pain points; the 4 original internal
// links (/90-day-program, /technique, /quality-control, /event-timeline) are kept.
const whyUs = [
  {
    icon: Timer,
    title: "Custom Apparel Production Since 2018",
    body: "We have been working in custom apparel production since 2018, supporting international customers with different apparel projects.",
  },
  {
    icon: Building2,
    title: "Yiwu-Based Production Partner",
    body: "Work directly with a China-based production team for your camp apparel requirements.",
  },
  {
    icon: Handshake,
    title: "Group Order Support",
    body: "We support organizations that need coordinated apparel for campers, counselors, staff and activity groups.",
    link: { label: "See 90-Day Program", href: "/90-day-program" },
  },
  {
    icon: Layers,
    title: "Artwork & Sizing Communication",
    body: "We help clarify design files, garment specifications and size requirements before production.",
    link: { label: "See print methods", href: "/technique" },
  },
  {
    icon: Shield,
    title: "Production Quality Checks",
    body: "We conduct production checks and final inspections to help reduce avoidable quality issues.",
    link: { label: "Quality control", href: "/quality-control" },
  },
  {
    icon: Truck,
    title: "International Shipping Support",
    body: "We work with overseas customers and can discuss available shipping and door-to-door delivery arrangements.",
    link: { label: "Open Timeline Calculator", href: "/event-timeline" },
  },
];

// 2026-11-17 (R137): 10 buyer types from the SEO plan.
const whoOrders = [
  "Summer camp organizers",
  "Day camps and residential camps",
  "Sports camp operators",
  "Schools and universities",
  "Youth organizations",
  "Outdoor education programs",
  "Church and community camps",
  "Art and music camps",
  "Camp management companies",
  "Promotional merchandise agencies",
];

// 2026-11-17 (R137): quotation details requested in the SEO plan, used in the tail CTA.
const quoteInfo = [
  "Camp name and program type",
  "Estimated number of campers and staff",
  "Required shirt quantity",
  "Design or camp logo",
  "Expected size breakdown",
  "Preferred shirt style or fabric, if known",
  "Delivery destination",
  "Required arrival date",
];

// 2026-11-17 (R137): expanded from 4 to 8 items. The four original answers are kept
// verbatim so the existing MOQ / colorway / CPSIA / size-range / shipping figures
// stay exactly as they were; the new answers come from the SEO plan and add no
// new hard numbers.
const faqs = [
  {
    q: "Can you make custom shirts for summer camps?",
    a: "Yes. We support custom shirt projects for summer camps, day camps, sports camps, school programs and other organized group activities.",
  },
  {
    q: "Can we order shirts for both children and adults?",
    a: "You can discuss the required size range and garment specifications with us. Please provide your expected size breakdown so we can confirm the available options. All dyes are CPSIA-compliant for children's apparel (under 16). All prints are OEKO-TEX certified. Documentation is available for camp licensing inspection. Kids' sizes 2Y-14Y with soft hand feel — not scratchy.",
  },
  {
    q: "Can we use different colors for different camp groups?",
    a: "Yes. You can discuss different colors or designs for cabins, teams, age groups and staff groups. Sublimation supports per-piece color at no extra setup fee. A 12-cabin camp with 12 distinct colorways is the same production cost as 1 color. Campers, counselors, and staff get distinct colorways in one order.",
  },
  {
    q: "Can we print our camp logo and program name?",
    a: "Yes. You can provide your camp logo, program name, artwork and preferred colors for review before production.",
  },
  {
    q: "Can counselors and campers have different shirt designs?",
    a: "Yes. You can discuss separate designs or garment specifications for campers, counselors, instructors and staff.",
  },
  {
    q: "What's the MOQ for summer camp shirts?",
    a: "50 pieces per design for cut-and-sew sublimation on polyester. For DTG on 100% cotton (which is common for camp tees), MOQ drops to 30 pieces. Multi-color cabin kits (8-15 colorways) share the same MOQ — one design across many colors counts as one design run. MOQ depends on the selected garment, fabric and production requirements — share your estimated quantity so we can confirm the available options.",
  },
  {
    q: "How early should we order summer camp shirts?",
    a: "We recommend contacting us well before your camp begins — place your order by mid-March for June camp openings. Bulk production is 15-25 days. DDP ocean freight adds 7-14 days. DDP air freight is 5-7 days for late orders. Our US warehouse in Fontana CA offers 2-5 day domestic delivery for last-minute additions. Production and shipping schedules depend on order quantity, artwork approval, garment specifications and destination.",
  },
  {
    q: "Can you ship summer camp shirts to the United States?",
    a: "Yes. We work with international customers and can discuss available shipping options to the United States and other destinations, including DDP shipping to the US, EU, UK and Australia.",
  },
];

export default function SummerCampShirtsPage() {
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Summer Camp Shirts", item: pageUrl },
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
        name: "Custom Summer Camp Apparel Manufacturing",
        serviceType: "Custom camp apparel sublimation, DTG, embroidery",
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
      <PageGeoAnswerBlock path="/summer-camp-shirts/" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0">
          <Image
            src="/event-merch-festival.webp"
            alt="Custom summer camp shirts — camper tees, counselor polos, camp staff apparel"
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
              <Sun className="h-3.5 w-3.5" />
              For summer camps, schools &amp; youth programs
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Custom Summer Camp Shirts{" "}
              <span className="text-[#00c2ff]">for Campers, Counselors &amp; Staff</span>
            </h1>

            <p className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
              Make every camp experience more memorable with custom summer camp shirts.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80 md:text-xl">
              SublimApparel works with summer camps, schools, youth organizations and activity
              organizers to produce custom shirts for group activities, seasonal programs and camp
              events.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/80 md:text-xl">
              Whether you are preparing shirts for a summer camp, sports camp, school program or
              outdoor activity, we can help you create coordinated apparel featuring your camp logo,
              program name, team colors and custom artwork. From camper shirts to counselor uniforms
              and staff apparel, we support bulk custom apparel production for overseas organizations.{" "}
              <strong className="text-white">
                Cabin color-coding, CPSIA-compliant dyes, 90-day turnaround
              </strong>{" "}
              — all from our Yiwu factory with DDP shipping to US/EU/UK/AU.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-a-quote/"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff] hover:shadow-[0_8px_24px_rgba(0,194,255,0.4)]"
              >
                Request a Summer Camp Shirt Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/industries/"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                <Users className="h-4 w-4" />
                schools and organizations
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">50</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Pieces MOQ per design
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">15+</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Colorways at no extra fee
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">CPSIA</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Kids-safe dyes
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">90 days</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Reserve-to-ship window
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2026-11-17 (R137): USE CASES — 6 camp types from the SEO plan. */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Summer camp apparel solutions
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Custom shirts for different types of camps.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From residential camps and day camps to sports camps, school summer programs, church
              camps and outdoor adventure camps — one production partner for every program type.
              Camps that also run community race events can compare our{" "}
              <Link href="/products/running-shirts/" className="font-bold text-black underline">
                custom running shirts
              </Link>
              ,{" "}
              <Link href="/race-shirts/" className="font-bold text-black underline">
                custom race shirts
              </Link>{" "}
              and{" "}
              <Link href="/marathon-shirts/" className="font-bold text-black underline">
                custom marathon shirts
              </Link>{" "}
              pages for endurance formats.
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

          {/* 2026-11-17 (R137): 6 customisation options replace the 4 garment styles. */}
          <div className="mt-12 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-8">
            <h3 className="text-xl font-black">Customize your summer camp shirts</h3>
            <p className="mt-2 text-sm text-black/60">
              Create shirts that campers and staff can recognize and enjoy wearing.
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

      {/* 2026-11-17 (R137): 5 camp-program groups from the SEO plan. */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              One season, several shirt runs
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Shirts for every part of your camp program.
            </h2>
            <p className="mt-3 text-base text-black/70">
              A camp may need several types of apparel throughout the season.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {campProgram.map((g) => (
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
              From camp brief to delivery
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              How to order custom summer camp shirts.
            </h2>
            <p className="mt-3 text-base text-black/70">
              We help camp organizers plan their apparel orders from design discussion through
              international delivery.
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

      {/* 2026-11-17 (R137): 10 buyer types from the SEO plan. */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Who orders custom summer camp shirts?
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Built for professional camp buyers.
            </h2>
            <p className="mt-3 text-base text-black/70">Our summer camp shirts are suitable for:</p>
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
            If you are organizing a camp or seasonal group program, tell us about your apparel
            requirements and we can discuss suitable production options. Groups that also run
            community events, tournaments or reunions can compare our{" "}
            <Link href="/custom-event-t-shirts/" className="font-bold text-black underline">
              custom event t-shirts
            </Link>{" "}
            for opening-day and closing-ceremony apparel.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Common questions from camp directors
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
              Summer camp apparel, quoted for your program
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Get a Quote for Custom Summer Camp Shirts
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Planning a summer camp, school program, sports camp or youth activity? Send us your
              camp details, artwork, estimated quantity and delivery schedule. Our team will review
              your requirements and discuss suitable production and delivery options. You can{" "}
              <Link href="/contact/" className="font-bold text-[#00c2ff] underline">
                get a quote for custom apparel
              </Link>{" "}
              through the contact form, or send the same details by email to{" "}
              <a href="mailto:info@sublimapparel.com" className="font-bold text-[#00c2ff] underline">
                info@sublimapparel.com
              </a>
              .
            </p>

            <div className="mt-8">
              <div className="text-xs font-black uppercase tracking-widest text-white/60">
                What we need for a quotation
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {quoteInfo.map((q) => (
                  <li key={q} className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00c2ff]" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>

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
                Discuss Your Summer Camp Shirt Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedProducts solutionSlug="event-festivals-conferences" />

      <UnifiedContactCta
        variant="full"
        sourceLabel="Summer Camp Shirts"
        className="border-t-4 border-black"
      />

      <Contact />
    </>
  );
}
