// 2026-09-15 (R69): /event-apparel/ scenario landing page — restored from a
// prior R-round where the path was orphaned. Targets the broad "event apparel"
// PAA cluster (which is distinct from /event-festivals-conferences/, the
// more narrowly-targeted "for festivals and conferences" cluster). This page
// covers ALL event types — fundraisers, charity events, awareness walks,
// school events, community events, family reunions, holiday parties, etc.
// The differentiation matters because /event-festivals-conferences/ has the
// "production service" framing (R17-P3 rewrite), while /event-apparel/ is
// the buyer-intent landing page that anchors fundraising/charity event
// keyword coverage that R68 found at near-zero across the site.
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
  Timer,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { RelatedProducts } from "@/components/related-products";
import { UnifiedContactCta } from "@/components/unified-contact-cta";
import { PageGeoAnswerBlock } from "@/components/geo-answer-block";

const SITE_URL = "https://sublimapparel.com";
const pageUrl = `${SITE_URL}/event-apparel/`;

export const metadata = buildPageMetadata({
  title: "Custom Event Apparel | Fundraiser, Charity & Group Shirts",
  description:
    "Custom event apparel for fundraisers, charity events, awareness walks, school events, and community gatherings. All-over sublimation, MOQ 50, deadline-locked delivery.",
  keywords: [
    "custom event apparel",
    "event apparel manufacturer",
    "fundraiser apparel",
    "fundraiser shirts bulk",
    "fundraiser t-shirts custom",
    "charity event apparel",
    "charity event shirts",
    "charity walk shirts",
    "awareness walk shirts",
    "awareness event shirts",
    "school event apparel",
    "community event apparel",
    "school event shirts",
    "community event shirts",
    "family reunion shirts",
    "reunion apparel custom",
    "holiday party shirts",
    "company event shirts",
    "group event apparel",
    "bulk event shirts",
    "event t-shirts bulk",
    "event shirts manufacturer",
    "event apparel supplier",
    "event apparel factory",
    "custom event t-shirts",
    "event shirt printing",
    "group event shirts",
    "fundraiser apparel manufacturer",
    "charity event apparel manufacturer",
    "school event apparel manufacturer",
    "community event shirts bulk",
    "awareness event apparel",
    "event branded apparel",
    "event merchandise clothing",
    "event team apparel",
    "event volunteer apparel",
    "B2B event apparel",
    "event apparel production",
    "event shirt supplier",
    "fundraiser shirt factory",
    "charity event clothing",
    "awareness walk apparel",
    "community event clothing",
    "school event clothing",
    "event giveaway apparel",
    "event apparel DDP",
    "fundraiser shirts factory",
  ],
  alternates: { canonical: pageUrl },
  ogTitle: "Custom Event Apparel | Fundraiser, Charity & Group Shirts",
  ogDescription:
    "Custom event apparel for fundraisers, charity events, awareness walks, school events. Sublimation, MOQ 50, DDP worldwide.",
  ogImage: "/og/og-industry.webp",
});

const useCases = [
  {
    icon: Heart,
    title: "Fundraiser apparel",
    desc: "Branded shirts and merch for charity fundraisers, awareness walks, community drives. Print your cause edge-to-edge.",
  },
  {
    icon: Users,
    title: "Community events",
    desc: "School events, family reunions, neighborhood gatherings, holiday parties. Branded apparel that brings people together.",
  },
  {
    icon: Sparkles,
    title: "Awareness events",
    desc: "Awareness walks, charity runs, ribbon campaigns, memorial events. Color-matched to your cause and brand standards.",
  },
  {
    icon: Calendar,
    title: "Group gatherings",
    desc: "Reunions, retirement parties, milestone celebrations. Easy minimums, fast turnaround, single design or multi-color.",
  },
];

const whatWeMake = [
  {
    label: "Participant Shirts",
    examples: "Fundraiser tees, awareness walk shirts, charity event tops",
    icon: Shirt,
  },
  {
    label: "Volunteer Uniforms",
    examples: "Easy-to-spot colorways, often 1-2 color prints",
    icon: Users,
  },
  {
    label: "Group Hoodies",
    examples: "Reunion hoodies, charity event zip-ups, school event pullovers",
    icon: Package,
  },
  {
    label: "Event Accessories",
    examples: "Caps, bandanas, drawstring bags, lanyards for events",
    icon: Layers,
  },
];

const painPoints = [
  {
    icon: Timer,
    title: "Will the shirts arrive before the event?",
    pain: "Most events lock headcount 2-4 weeks out. Domestic printers need 6-8 weeks. The math doesn't work.",
    fix: "Our 90-day production program with a 30-day final-quantity lock. Reserve 90 days, ship in 30.",
    link: { label: "See 90-Day Program", href: "/90-day-program" },
  },
  {
    icon: Palette,
    title: "Cause colors must match exactly.",
    pain: "Awareness ribbons and charity brands have specific Pantones. Off-color shirts look amateur.",
    fix: "Pantone color matching with lab-dip samples for orders over 500 pcs. Re-orders maintain the same color profile.",
    link: { label: "Quality control", href: "/quality-control" },
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
    q: "What's the MOQ for event apparel?",
    a: "50 pieces per design for cut-and-sew sublimation on polyester. For DTG on 100% cotton, MOQ drops to 30 pieces. Sample runs start at 5-10 pieces with a 7-10 day turnaround. Re-order MOQ is 30 pieces for any follow-up runs.",
  },
  {
    q: "Can you match our charity or cause colors?",
    a: "Yes. We work from Pantone, PMS, or physical swatches. For awareness ribbons, charity brand colors, or sponsor logos, we provide lab-dip samples for sign-off before production. Re-orders maintain the same color profile by archiving your approved color recipe.",
  },
  {
    q: "How fast can you ship for a fundraiser?",
    a: "Bulk production is 15-25 days. DDP ocean freight adds 7-14 days to your door. DDP air freight is 5-7 days for rush events. Our US warehouse in Fontana CA offers 2-5 day domestic delivery for last-minute top-ups. Event Timeline Calculator shows the exact ship-by date for your event.",
  },
  {
    q: "Can I order different designs for different events?",
    a: "Yes. Each event is a separate design run. We can batch multiple event designs in one production cycle to save on setup. Common for nonprofits running several fundraisers in a year — same factory, same color profile, separate release windows.",
  },
];

export default function EventApparelPage() {
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Event Apparel", item: pageUrl },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Custom Event Apparel | Fundraiser, Charity & Group Shirts",
        description:
          "Custom event apparel for fundraisers, charity events, awareness walks, school events, and community gatherings. All-over sublimation, MOQ 50, deadline-locked delivery.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${pageUrl}#faq` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Custom Event Apparel Manufacturing",
        serviceType: "Custom event apparel sublimation, DTG, DTF, cut-and-sew",
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
      <PageGeoAnswerBlock path="/event-apparel/" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0">
          <Image
            src="/event-merch-festival.webp"
            alt="Custom event apparel — branded shirts for fundraisers, charity events, awareness walks, school events"
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
              <Calendar className="h-3.5 w-3.5" />
              For fundraisers, charities, schools & community groups
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Custom event apparel
              <br />
              <span className="text-[#00c2ff]">for fundraisers, charities &amp; groups.</span>
            </h1>

            <p className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
              Branded apparel that drives participation.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/80 md:text-xl">
              From charity fundraisers to awareness walks, school events to family reunions — we help
              organizers produce <strong className="text-white">affordable custom event apparel</strong>{" "}
              that gets people wearing your cause.{" "}
              <strong className="text-white">Cause-matched colors, deadline-locked delivery, MOQ 50</strong>{" "}
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
                Plan your timeline
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
              Event apparel solutions
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Apparel for every event your group runs.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From a 50-person fundraiser to a 5,000-person charity walk. Same factory, same color
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
            <h3 className="text-xl font-black">What we make for your event</h3>
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
            <p className="mt-3 text-base text-black/70">
              Other vendors say &ldquo;we can do it.&rdquo; We give you the specific tool for each problem.
            </p>
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
        sourceLabel="Event apparel"
        className="border-t-4 border-black"
      />

      <Contact />
    </>
  );
}