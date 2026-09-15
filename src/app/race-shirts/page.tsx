// 2026-09-15 (R69): /race-shirts/ scenario landing page — restored.
// Targets "race shirts" buyer intent. Distinct from
// /products/running-shirts/ (which is the product catalog page showing all
// styles) by being a buyer-intent landing page focused on RACE-specific
// needs — charity races, fundraising runs, church runs, awareness runs,
// corporate runs. The "charity race" + "church run" + "fundraising run"
// keyword clusters get coverage here that R68 audit found at near-zero.
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

const SITE_URL = "https://sublimapparel.com";
const pageUrl = `${SITE_URL}/race-shirts/`;

export const metadata = buildPageMetadata({
  title: "Custom Race Shirts | 5K, 10K, Charity Run Apparel",
  description:
    "Custom race shirts for 5K, 10K, half marathon, charity runs, and fundraising events. Sublimation edge-to-edge print, lightweight performance fabric, MOQ 50, DDP.",
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
    "charity race shirts",
    "charity run shirts",
    "charity run shirts bulk",
    "charity run t-shirts",
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
  ogTitle: "Custom Race Shirts | 5K, 10K, Charity Run Apparel",
  ogDescription:
    "Custom race shirts for 5K, 10K, charity runs, fundraising events. Sublimation, lightweight fabric, MOQ 50, DDP.",
  ogImage: "/og/og-industry.webp",
});

const useCases = [
  {
    icon: Trophy,
    title: "5K & 10K races",
    desc: "Participant shirts, finisher tees, race-day kits. Lightweight performance fabric, edge-to-edge print.",
  },
  {
    icon: Heart,
    title: "Charity & fundraising runs",
    desc: "Branded shirts for charity 5Ks, fundraising runs, awareness events. Cause-matched colors.",
  },
  {
    icon: Users,
    title: "Church & corporate runs",
    desc: "Church 5Ks, corporate wellness runs, company team-building races. Branded apparel for the whole group.",
  },
  {
    icon: MapPin,
    title: "Fun runs & community events",
    desc: "Local fun runs, neighborhood races, community fitness events. Affordable, deadline-locked delivery.",
  },
];

const whatWeMake = [
  {
    label: "Race Tees",
    examples: "Standard fit, lightweight, all-over print",
    icon: Shirt,
  },
  {
    label: "Race Singlets",
    examples: "Racerback, A-line, sleeveless, hot-weather races",
    icon: Shirt,
  },
  {
    label: "Long-Sleeve Race Tees",
    examples: "Cool-weather races, sun protection, layering",
    icon: Shirt,
  },
  {
    label: "Volunteer Polos",
    examples: "Course marshals, water station volunteers",
    icon: Award,
  },
];

const painPoints = [
  {
    icon: Timer,
    title: "Race day is fixed — production window is short.",
    pain: "Most US races lock final headcount 30 days out. US printers need 6-8 weeks. The math doesn't work.",
    fix: "Our 90-day production program with a 30-day final-quantity lock. Quote today, design tomorrow, lock in 60 days, ship in 30.",
    link: { label: "See 90-Day Program", href: "/90-day-program" },
  },
  {
    icon: Palette,
    title: "Cause colors must match exactly.",
    pain: "Awareness ribbons and charity brand colors have specific Pantones. Off-color shirts look amateur.",
    fix: "Pantone color matching with lab-dip samples for orders over 500 pcs. Re-orders maintain the same color profile by archiving your approved color recipe.",
    link: { label: "Color matching process", href: "/quality-control" },
  },
  {
    icon: Ruler,
    title: "Sizing is unpredictable for a race.",
    pain: "Race participants run the full size range — kids through 3XL. Pre-buying in bulk leads to wrong sizes and wasted budget.",
    fix: "Mixed-size production with US-spec measurement charts. Free downloadable Excel size template for race registration systems.",
    link: { label: "Get US Size Guide", href: "/us-size-guide" },
  },
  {
    icon: Calendar,
    title: "When do I really need to start?",
    pain: "You're not sure if you have time. You don't want to overcommit before race day is finalized.",
    fix: "Event Timeline Calculator. Enter your race date, get the latest order date, design lock date, and final-count lock date instantly.",
    link: { label: "Open Timeline Calculator", href: "/event-timeline" },
  },
];

const faqs = [
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
        name: "Custom Race Shirts | 5K, 10K, Charity Run Apparel",
        description:
          "Custom race shirts for 5K, 10K, half marathon, charity runs, and fundraising events. Sublimation edge-to-edge print, lightweight performance fabric, MOQ 50, DDP.",
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
              For race directors, charities & community organizers
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Custom race shirts
              <br />
              <span className="text-[#00c2ff]">for 5K, 10K, charity runs &amp; fundraisers.</span>
            </h1>

            <p className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
              Performance race apparel that ships before race day.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80 md:text-xl">
              From 5K community runs to charity fundraisers, church races to corporate wellness events
              — we help race directors produce{" "}
              <strong className="text-white">lightweight performance race shirts</strong> that
              finishers actually want to wear.{" "}
              <strong className="text-white">
                Edge-to-edge print, MOQ 50, deadline-locked delivery
              </strong>{" "}
              — all from our Yiwu factory with DDP shipping to 100+ countries.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff] hover:shadow-[0_8px_24px_rgba(0,194,255,0.4)]"
              >
                Get a quote for your race
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/event-timeline/"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                <Clock className="h-4 w-4" />
                Plan your race timeline
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

      {/* USE CASES */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Race shirt solutions
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Race shirts for every race your organization runs.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From a 100-person 5K to a 5,000-person marathon. Same factory, same color profile, same
              production line — deadline-locked delivery for every race distance.
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
            <h3 className="text-xl font-black">What we make for race day</h3>
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
              The 4 problems every race director hits
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