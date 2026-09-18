// 2026-09-15 (R69): /summer-camp-shirts/ scenario landing page — restored.
// Targets "summer camp shirts" + "camp apparel" + "camp counselor shirts"
// buyer intent clusters that R68 keyword coverage audit identified as
// near-zero (only "camp" appeared once across the entire site). This page
// addresses a high-volume B2B seasonal query — summer camps place apparel
// orders 60-90 days before camp opens (Feb-Apr for June-Aug camps). The
// fast-tumaround 90-day program and color-matching are critical for camps
// that need matching counselor + camper + staff kits in distinct colorways.
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
  Shield,
  Sparkles,
  Sun,
  Timer,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { RelatedProducts } from "@/components/related-products";
import { UnifiedContactCta } from "@/components/unified-contact-cta";
import { PageGeoAnswerBlock } from "@/components/geo-answer-block";

const SITE_URL = "https://sublimapparel.com";
const pageUrl = `${SITE_URL}/summer-camp-shirts/`;

export const metadata = buildPageMetadata({
  title: "Summer Camp Shirts | Custom Camp Apparel & Counselor Kits",
  description:
    "Custom summer camp shirts for campers, counselors, and staff. Color-coded by cabin or session, edge-to-edge print, fast 90-day turnaround. MOQ 50, DDP shipping.",
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
  ],
  alternates: { canonical: pageUrl },
  ogTitle: "Summer Camp Shirts | Custom Camp Apparel & Counselor Kits",
  ogDescription:
    "Custom summer camp shirts for campers, counselors, staff. Color-coded by cabin or session, edge-to-edge print, 90-day turnaround. MOQ 50, DDP.",
  ogImage: "/og/og-industry.webp",
});

const useCases = [
  {
    icon: Sun,
    title: "Day camps",
    desc: "Single-color or multi-color camp tees for day camps. Easy minimums, fast turnaround, parent-friendly sizing.",
  },
  {
    icon: Users,
    title: "Overnight camps",
    desc: "Color-coded by cabin or session — camper tees, counselor polos, staff uniforms. Multi-design orders common.",
  },
  {
    icon: Heart,
    title: "Specialty camps",
    desc: "Sports camps, art camps, music camps, science camps, faith camps. Apparel that signals program identity.",
  },
  {
    icon: Sparkles,
    title: "Camp reunions & alumni",
    desc: "Year-end reunion tees, alumni shirts, retro camp kits. Multi-year re-orders welcome — same factory, same color profile.",
  },
];

const whatWeMake = [
  {
    label: "Camper Tees",
    examples: "All-over print, CPSIA-compliant dyes, kids' sizes 2Y-14Y",
    icon: Shirt,
  },
  {
    label: "Counselor Polos",
    examples: "Embroidered or sublimated logo, color-coded by program",
    icon: Shirt,
  },
  {
    label: "Staff Uniforms",
    examples: "Performance polos, staff tees, branded outerwear",
    icon: Shield,
  },
  {
    label: "Camp Accessories",
    examples: "Caps, drawstring bags, water bottle holders, bandanas",
    icon: Package,
  },
];

const painPoints = [
  {
    icon: Timer,
    title: "Camps open in June — orders are due in March.",
    pain: "Most US camp directors place apparel orders in February-April for June-August sessions. Domestic printers need 6-8 weeks and most can't do multi-color matched kits.",
    fix: "Our 90-day production program with a 30-day final-quantity lock. Reserve in February, ship in May. Multi-color matched kits (campers / counselors / staff) in one production cycle.",
    link: { label: "See 90-Day Program", href: "/90-day-program" },
  },
  {
    icon: Palette,
    title: "Color-coding by cabin or session.",
    pain: "Camps often need 8-15 distinct colorways for cabin groups, age divisions, or program tracks. Most printers charge per colorway setup.",
    fix: "Sublimation has no per-color setup fee. 1 design with 15 colorways = same cost as 1 design with 1 colorway. Campers / counselors / staff get distinct colorways at no extra charge.",
    link: { label: "See print methods", href: "/technique" },
  },
  {
    icon: Shield,
    title: "Kids' safety is non-negotiable.",
    pain: "Camps have strict CPSIA dye-chemical standards. Cheap imported shirts can fail lead-phthalate testing.",
    fix: "All dyes CPSIA-compliant. All prints OEKO-TEX certified. Documentation available for camp licensing inspection. Kids' sizes 2Y-14Y with soft hand feel.",
    link: { label: "Quality control", href: "/quality-control" },
  },
  {
    icon: Calendar,
    title: "When do I really need to start?",
    pain: "Camp dates are fixed but registration numbers fluctuate. You don't want to overcommit before final counts.",
    fix: "Event Timeline Calculator. Enter your camp open date, get the order date, design lock date, and final-count lock date instantly.",
    link: { label: "Open Timeline Calculator", href: "/event-timeline" },
  },
];

const faqs = [
  {
    q: "What's the MOQ for summer camp shirts?",
    a: "50 pieces per design for cut-and-sew sublimation on polyester. For DTG on 100% cotton (which is common for camp tees), MOQ drops to 30 pieces. Multi-color cabin kits (8-15 colorways) share the same MOQ — one design across many colors counts as one design run.",
  },
  {
    q: "Can you color-code by cabin or program?",
    a: "Yes. Sublimation supports per-piece color at no extra setup fee. A 12-cabin camp with 12 distinct colorways is the same production cost as 1 color. Campers, counselors, and staff get distinct colorways in one order.",
  },
  {
    q: "Are your camp shirts CPSIA-compliant?",
    a: "Yes. All dyes are CPSIA-compliant for children's apparel (under 16). All prints are OEKO-TEX certified. Documentation is available for camp licensing inspection. Kids' sizes 2Y-14Y with soft hand feel — not scratchy.",
  },
  {
    q: "How fast can you ship for a June camp?",
    a: "Place your order by mid-March for June camp openings. Bulk production is 15-25 days. DDP ocean freight adds 7-14 days. DDP air freight is 5-7 days for late orders. Our US warehouse in Fontana CA offers 2-5 day domestic delivery for last-minute additions.",
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
        name: "Summer Camp Shirts | Custom Camp Apparel & Counselor Kits",
        description:
          "Custom summer camp shirts for campers, counselors, and staff. Color-coded by cabin or session, edge-to-edge print, fast 90-day turnaround. MOQ 50, DDP shipping.",
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
              For summer camps, directors & program managers
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Summer camp shirts
              <br />
              <span className="text-[#00c2ff]">for campers, counselors &amp; staff.</span>
            </h1>

            <p className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
              Color-coded camp kits built for the season.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80 md:text-xl">
              From day camps to overnight camps, specialty programs to alumni reunions — we help
              camp directors produce{" "}
              <strong className="text-white">custom summer camp apparel</strong> that signals program
              identity.{" "}
              <strong className="text-white">
                Cabin color-coding, CPSIA-compliant dyes, 90-day turnaround
              </strong>{" "}
              — all from our Yiwu factory with DDP shipping to US/EU/UK/AU.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff] hover:shadow-[0_8px_24px_rgba(0,194,255,0.4)]"
              >
                Get a quote for your camp
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/event-timeline/"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                <Clock className="h-4 w-4" />
                Plan your camp timeline
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

      {/* USE CASES */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Summer camp apparel solutions
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Camp kits for every program and session.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From a 50-camper day camp to a 1,000-camper overnight camp with 15 cabins. Same
              factory, same color profile, same production line — multi-color matched kits shipped
              together.
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
            <h3 className="text-xl font-black">What we make for camp</h3>
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
              The 4 problems every camp director hits
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

      <RelatedProducts solutionSlug="event-festivals-conferences" />

      <UnifiedContactCta
        variant="full"
        sourceLabel="Summer camp shirts"
        className="border-t-4 border-black"
      />

      <Contact />
    </>
  );
}