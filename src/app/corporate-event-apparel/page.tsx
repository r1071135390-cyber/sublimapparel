// 2026-09-15 (R69): /corporate-event-apparel/ scenario landing page — restored.
// Targets "corporate event apparel" buyer intent. Distinct from
// /corporate-organization-apparel/ (which is the production-service hub for
// employee uniforms / organization programs) by focusing specifically on
// short-cycle, deadline-locked EVENT apparel — conferences, trade shows,
// company retreats, kick-offs, client events, holiday parties, AND
// non-profit / church / wedding-adjacent events that often sit in the same
// buyer's procurement scope. Wedding + church keywords get meaningful
// coverage here that the R68 audit found at near-zero across the site.
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
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
  Timer,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { RelatedProducts } from "@/components/related-products";
import { UnifiedContactCta } from "@/components/unified-contact-cta";
import { PageGeoAnswerBlock } from "@/components/geo-answer-block";

const SITE_URL = "https://sublimapparel.com";
const pageUrl = `${SITE_URL}/corporate-event-apparel/`;

export const metadata = buildPageMetadata({
  title: "Corporate Event Apparel | Conferences, Retreats & Weddings",
  description:
    "Custom corporate event apparel for conferences, retreats, kick-offs, client events, church groups, and wedding parties. Pantone-matched, MOQ 50, DDP worldwide.",
  keywords: [
    "corporate event apparel",
    "corporate event shirts",
    "company event apparel",
    "company event shirts",
    "company retreat apparel",
    "company retreat shirts",
    "corporate retreat shirts",
    "conference apparel",
    "conference shirts",
    "trade show apparel",
    "trade show shirts",
    "kick-off event apparel",
    "company kick-off shirts",
    "holiday party shirts",
    "company party shirts",
    "client event apparel",
    "client appreciation shirts",
    "corporate event t-shirts",
    "corporate apparel events",
    "company event t-shirts",
    "church event apparel",
    "church event shirts",
    "church group shirts",
    "church retreat shirts",
    "church conference apparel",
    "church conference shirts",
    "wedding event apparel",
    "wedding event shirts",
    "wedding party shirts",
    "wedding party apparel",
    "wedding party t-shirts",
    "wedding rehearsal shirts",
    "wedding rehearsal dinner shirts",
    "bachelor party shirts",
    "bachelorette party shirts",
    "bridal party shirts",
    "wedding guest shirts",
    "corporate event uniform",
    "company event uniform",
    "event uniform shirts",
    "corporate team event apparel",
    "B2B corporate event apparel",
    "corporate event production",
    "company event production",
    "event apparel factory",
    "corporate event shirt factory",
    "corporate event apparel DDP",
    "corporate event deadline",
    "corporate event fast turnaround",
  ],
  alternates: { canonical: pageUrl },
  ogTitle: "Corporate Event Apparel | Conferences, Retreats & Weddings",
  ogDescription:
    "Custom corporate event apparel for conferences, retreats, church groups, wedding parties. Pantone-matched, MOQ 50, DDP.",
  ogImage: "/og/og-industry.webp",
});

const useCases = [
  {
    icon: Building2,
    title: "Conferences & trade shows",
    desc: "Booth staff, attendee giveaways, sponsor visibility. Pantone-matched to your brand book.",
  },
  {
    icon: Sparkles,
    title: "Company retreats & kick-offs",
    desc: "Off-site retreats, all-hands kick-offs, milestone celebrations. Branded apparel for the whole team.",
  },
  {
    icon: Heart,
    title: "Church groups & weddings",
    desc: "Church retreats, wedding parties, bachelor/bachelorette events. Edge-to-edge print, mixed sizes.",
  },
  {
    icon: Calendar,
    title: "Client & appreciation events",
    desc: "Client dinners, appreciation nights, VIP events. Premium apparel that signals company culture.",
  },
];

const whatWeMake = [
  {
    label: "Event Polos",
    examples: "Embroidered or sublimated logo, brand-color matched",
    icon: Shirt,
  },
  {
    label: "Event Tees",
    examples: "All-over print, performance fabric, unisex sizing",
    icon: Shirt,
  },
  {
    label: "Event Hoodies",
    examples: "Premium feel, all-over print, embroidered logos",
    icon: Package,
  },
  {
    label: "Event Accessories",
    examples: "Caps, lanyards, totes, name badge holders",
    icon: Layers,
  },
];

const painPoints = [
  {
    icon: Timer,
    title: "Event date is fixed — production window is short.",
    pain: "Corporate events lock dates 4-6 months out. Re-orders or last-minute additions are common. Domestic printers charge rush fees that blow the budget.",
    fix: "Our 90-day production program with a 30-day final-quantity lock. Reserve capacity early, lock the design, then we re-run additions at standard pricing.",
    link: { label: "See 90-Day Program", href: "/90-day-program" },
  },
  {
    icon: Palette,
    title: "Brand Pantone must match exactly.",
    pain: "Corporate brand books are unforgiving. Pantone 286 looks navy on screen but arrives royal blue in the box. You only see it after 1,000 shirts ship.",
    fix: "We match to Pantone, with physical lab dips for orders over 500 pcs. Sample approval is the contract — bulk only ships after you sign off on the actual fabric color.",
    link: { label: "Color matching process", href: "/quality-control" },
  },
  {
    icon: Ruler,
    title: "Sizing is a guessing game.",
    pain: "Corporate orders run the full size range. Pre-buying in bulk means wrong sizes and leftover inventory.",
    fix: "Mixed-size production with US-spec measurement charts. Free downloadable Excel size template for collecting sizes from your team.",
    link: { label: "Get US Size Guide", href: "/us-size-guide" },
  },
  {
    icon: Calendar,
    title: "When do I really need to start?",
    pain: "You're not sure if you have time. You don't want to overcommit before the event date is finalized.",
    fix: "Event Timeline Calculator. Enter your event date, get the latest order date, design lock date, and final-count lock date instantly.",
    link: { label: "Open Timeline Calculator", href: "/event-timeline" },
  },
];

const faqs = [
  {
    q: "What's the MOQ for corporate event apparel?",
    a: "50 pieces per design for cut-and-sew sublimation on polyester. For embroidered polos, MOQ drops to 30 pieces. We can split larger orders across multiple production runs (e.g. 200 pcs/month for 3 months) at no extra cost — common for ongoing corporate programs.",
  },
  {
    q: "Can you handle wedding party + corporate event in one order?",
    a: "Yes. Cut-and-sew sublimation supports per-piece color, per-piece size, and per-piece print placement. Wedding party (different designs from corporate) and corporate event (same design, multiple sizes) ship together with no extra setup. Common for companies whose founders are getting married and want both kits aligned.",
  },
  {
    q: "Can you match our church or wedding colors?",
    a: "Yes. Pantone color matching is standard. For wedding parties, we can match the wedding palette (bridesmaid dress colors, theme colors). For church groups, we match church brand colors. Sample approval before production — bulk only ships after you sign off.",
  },
  {
    q: "How fast can you ship for a corporate event?",
    a: "Bulk production is 15-25 days. DDP ocean freight adds 7-14 days to your door. DDP air freight is 5-7 days for rush events. Our US warehouse in Fontana CA offers 2-5 day domestic delivery for last-minute additions.",
  },
];

export default function CorporateEventApparelPage() {
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Corporate Event Apparel", item: pageUrl },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Corporate Event Apparel | Conferences, Retreats & Weddings",
        description:
          "Custom corporate event apparel for conferences, retreats, kick-offs, client events, church groups, and wedding parties. Pantone-matched, MOQ 50, DDP worldwide.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${pageUrl}#faq` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Custom Corporate Event Apparel Manufacturing",
        serviceType: "Custom corporate event apparel sublimation, DTG, embroidery, cut-and-sew",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Canada" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Australia" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "France" },
          { "@type": "Country", name: "Spain" },
          { "@type": "Country", name: "Japan" },
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
      <PageGeoAnswerBlock path="/corporate-event-apparel/" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0">
          <Image
            src="/esports-hoodie-circuit.webp"
            alt="Custom corporate event apparel — branded shirts for conferences, retreats, weddings"
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
              <Briefcase className="h-3.5 w-3.5" />
              For companies, churches, planners & wedding parties
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Corporate event apparel
              <br />
              <span className="text-[#00c2ff]">for conferences, retreats, churches &amp; weddings.</span>
            </h1>

            <p className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
              Branded apparel that signals your event's identity.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80 md:text-xl">
              From company conferences to church retreats, wedding parties to trade shows — we help
              organizations produce{" "}
              <strong className="text-white">custom corporate event apparel</strong> that drives
              participation and signals identity.{" "}
              <strong className="text-white">
                Pantone-matched, MOQ 50, deadline-locked delivery
              </strong>{" "}
              — all from our Yiwu factory with DDP shipping to 100+ countries.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff] hover:shadow-[0_8px_24px_rgba(0,194,255,0.4)]"
              >
                Get a quote for your event
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/event-timeline/"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                <Clock className="h-4 w-4" />
                Plan your event timeline
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
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">Pantone</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/80">
                  Color-matched standard
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
              Corporate event apparel solutions
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Apparel for every event your organization runs.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From a 50-person conference to a 5,000-person trade show. Same factory, same color
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
            <h3 className="text-xl font-black">What we make for corporate events</h3>
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
              The 4 problems every corporate event planner hits
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
              Common questions from corporate event planners
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

      <RelatedProducts solutionSlug="corporate-organization-apparel" />

      <UnifiedContactCta
        variant="full"
        sourceLabel="Corporate event apparel"
        className="border-t-4 border-black"
      />

      <Contact />
    </>
  );
}