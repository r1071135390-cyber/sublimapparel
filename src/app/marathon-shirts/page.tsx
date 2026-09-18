// 2026-09-15 (R69): /marathon-shirts/ scenario landing page — restored.
// Targets "marathon shirts" buyer intent. Distinct from /race-shirts/
// (which is the broader race-day hub covering 5K/10K/fun runs) by being
// dedicated to full marathon and ultra-distance events where fabric
// performance, sponsor placement, and charity-run partnerships matter.
// The marathon-specific buyer-intent cluster — "marathon finisher shirts",
// "marathon sponsor shirts", "charity marathon shirts", "fundraising
// marathon" — gets coverage here that R68 audit found at near-zero.
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  Layers,
  MapPin,
  Package,
  Palette,
  Ruler,
  Shirt,
  Shield,
  Sparkles,
  Timer,
  Trophy,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { RelatedProducts } from "@/components/related-products";
import { UnifiedContactCta } from "@/components/unified-contact-cta";
import { PageGeoAnswerBlock } from "@/components/geo-answer-block";

const SITE_URL = "https://sublimapparel.com";
const pageUrl = `${SITE_URL}/marathon-shirts/`;

export const metadata = buildPageMetadata({
  title: "Marathon Shirts | Custom Marathon & Half Marathon Apparel",
  description:
    "Custom marathon shirts for full and half marathons, ultra-distance events, and charity marathon fundraisers. Premium lightweight fabric, sponsor placement, MOQ 50, DDP.",
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
  ogTitle: "Marathon Shirts | Custom Marathon & Half Marathon Apparel",
  ogDescription:
    "Custom marathon shirts for full and half marathons, ultra events, charity marathons. Lightweight fabric, sponsor placement, MOQ 50, DDP.",
  ogImage: "/og/og-industry.webp",
});

const useCases = [
  {
    icon: Trophy,
    title: "Full & half marathons",
    desc: "Race-day kits, finisher tees, sponsor visibility shirts. Lightweight performance fabric, sponsor-grade print quality.",
  },
  {
    icon: MapPin,
    title: "Ultra & trail marathons",
    desc: "Ultra-distance apparel, trail marathon kits, hot-weather racing. Birdseye mesh poly, advanced moisture management.",
  },
  {
    icon: Heart,
    title: "Charity marathons",
    desc: "Branded shirts for charity marathon partnerships, fundraising marathons, awareness marathons. Cause-matched colors.",
  },
  {
    icon: Users,
    title: "Marathon clubs & teams",
    desc: "Running club marathon kits, marathon training groups, marathon coaching staff uniforms. Re-orders welcome.",
  },
];

const whatWeMake = [
  {
    label: "Marathon Tees",
    examples: "Standard fit, lightweight, all-over print",
    icon: Shirt,
  },
  {
    label: "Marathon Singlets",
    examples: "Racerback, A-line, sleeveless, hot-weather marathons",
    icon: Shirt,
  },
  {
    label: "Long-Sleeve Marathon Tees",
    examples: "Cool-weather marathons, sun protection, layering",
    icon: Shirt,
  },
  {
    label: "Sponsor Visibility Polos",
    examples: "Multi-logo placement, color-matched to sponsor brands",
    icon: Award,
  },
];

const painPoints = [
  {
    icon: Timer,
    title: "Marathon date is fixed — production window is short.",
    pain: "Most marathons lock final headcount 60-90 days out. US printers need 8-12 weeks. International shipping adds weeks.",
    fix: "Our 90-day production program with a 30-day final-quantity lock. Reserve capacity 90 days out, lock design at 60, ship by race day.",
    link: { label: "See 90-Day Program", href: "/90-day-program" },
  },
  {
    icon: Palette,
    title: "Sponsor logos must match brand standards.",
    pain: "Marathon sponsors are unforgiving about Pantone. Off-color sponsor logos look unprofessional and can trigger contract penalties.",
    fix: "Pantone color matching with lab-dip samples for orders over 500 pcs. Sponsor color profiles archived for re-order consistency.",
    link: { label: "Color matching process", href: "/quality-control" },
  },
  {
    icon: Ruler,
    title: "Marathon sizing runs the full range.",
    pain: "Marathon participants range from XS to 3XL. Pre-buying in bulk leads to wrong sizes and leftover inventory.",
    fix: "Mixed-size production with US-spec measurement charts. Free downloadable Excel size template for race registration systems.",
    link: { label: "Get US Size Guide", href: "/us-size-guide" },
  },
  {
    icon: Calendar,
    title: "When do I really need to start?",
    pain: "Marathon dates are locked but registration numbers fluctuate. You don't want to overcommit before final counts.",
    fix: "Event Timeline Calculator. Enter your marathon date, get the latest order date, design lock date, and final-count lock date instantly.",
    link: { label: "Open Timeline Calculator", href: "/event-timeline" },
  },
];

const faqs = [
  {
    q: "What's the MOQ for marathon shirts?",
    a: "50 pieces per design for cut-and-sew sublimation on polyester. For DTG on 100% cotton (which is less common for marathon shirts), MOQ drops to 30 pieces. Sample runs start at 5-10 pieces with a 7-10 day turnaround. Re-order MOQ is 30 pieces for race-week additions.",
  },
  {
    q: "What fabric do you recommend for marathon shirts?",
    a: "Polyester-spandex (92/8, 145 GSM) for fitted marathon race-cut. Birdseye mesh poly for hot marathons. Coolmax-blend for premium marathons. Recycled poly (rPET) for sustainability story — 8-12 bottles per shirt. 100% polyester interlock (135 GSM) for budget-friendly race kits.",
  },
  {
    q: "How fast can you ship for marathon day?",
    a: "Bulk production is 15-25 days. DDP ocean freight adds 7-14 days. DDP air freight is 5-7 days for late orders. Our US warehouse in Fontana CA offers 2-5 day domestic delivery for race-week emergencies.",
  },
  {
    q: "Can you handle multiple sponsor logos on one design?",
    a: "Yes. Sublimation supports unlimited colors and unlimited logo placement at no extra setup fee. Multi-sponsor marathons typically have 5-20 sponsor logos per design — all reproduced accurately with Pantone color matching.",
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
        name: "Marathon Shirts | Custom Marathon & Half Marathon Apparel",
        description:
          "Custom marathon shirts for full and half marathons, ultra-distance events, and charity marathon fundraisers. Premium lightweight fabric, sponsor placement, MOQ 50, DDP.",
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
          acceptedAnswer: { "@type": "Answer", text: f.a },
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
              For marathon directors, charities & running clubs
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Marathon shirts
              <br />
              <span className="text-[#00c2ff]">
                for full, half, ultra &amp; charity marathons.
              </span>
            </h1>

            <p className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
              Premium marathon apparel that ships before race day.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80 md:text-xl">
              From full marathons to ultra-distance events, charity marathon fundraisers to running
              clubs — we help marathon directors produce{" "}
              <strong className="text-white">premium marathon shirts</strong> that finishers actually
              want to wear.{" "}
              <strong className="text-white">
                Sponsor-grade print, lightweight fabric, MOQ 50, DDP worldwide
              </strong>{" "}
              — all from our Yiwu factory.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff] hover:shadow-[0_8px_24px_rgba(0,194,255,0.4)]"
              >
                Get a quote for your marathon
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/event-timeline/"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                <Clock className="h-4 w-4" />
                Plan your marathon timeline
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
              Marathon apparel for every distance your event runs.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From a 500-person half marathon to a 10,000-person full marathon. Same factory, same
              color profile, same production line — sponsor-grade delivery for every distance.
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
            <h3 className="text-xl font-black">What we make for marathon day</h3>
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
              The 4 problems every marathon director hits
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
              Common questions from marathon directors
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
        sourceLabel="Marathon shirts"
        className="border-t-4 border-black"
      />

      <Contact />
    </>
  );
}