import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  Calendar,
  Building2,
  Megaphone,
  Shirt,
  Truck,
  ArrowRight,
} from "lucide-react";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Custom Apparel Solutions for Every B2B Buyer | SublimApparel",
  description:
    "Six apparel solutions built for specific B2B buyers: sports teams, events, corporate, promotional, brands, and e-commerce. Pick yours, get a quote in 24 hours.",
  ogTitle: "Custom Apparel Solutions for Every B2B Buyer",
  ogDescription:
    "Six apparel solutions built for specific B2B buyers: sports teams, events, corporate, promotional, brands, and e-commerce. Pick yours, get a quote in 24 hours.",
  ogImage: "/og/og-home.webp",
  keywords: [
    "custom apparel solutions",
    "B2B apparel manufacturer",
    "sports team apparel",
    "event merchandise",
    "corporate apparel",
    "promotional apparel",
    "apparel brand manufacturing",
    "e-commerce apparel fulfillment",
    "sublimation solutions",
  ],
});

const solutions = [
  {
    slug: "teams-sports-apparel",
    title: "Team & Sports Apparel",
    icon: Trophy,
    color: "text-[#ff4d00]",
    badge: "MOQ 50 / 14-day turnaround",
    desc: "Cycling kits, race jerseys, basketball uniforms, esports — cut-and-sew with full-sublimation panels. Player names, numbers, sponsors, league patches — every detail sewn right.",
    cta: "Build team kits",
  },
  {
    slug: "event-festivals-conferences",
    title: "Event, Festival & Conference",
    icon: Calendar,
    color: "text-[#00c2ff]",
    badge: "Bulk DDP in 2 weeks",
    desc: "Staff shirts, volunteer tees, attendee merch, swag bundles — shipped in waves to your venue. We handle size splits, polybagging, and on-site delivery in 50+ countries.",
    cta: "Plan your event merch",
  },
  {
    slug: "corporate-organization-apparel",
    title: "Corporate & Organization",
    icon: Building2,
    color: "text-[#ff4d00]",
    badge: "Polos, oxford shirts, jackets",
    desc: "Employee uniforms, executive polos, branded outerwear, hospitality wear. Clean DTG/DTF logos on cotton-poly blends — consistent color across re-orders.",
    cta: "Dress your team",
  },
  {
    slug: "promotional-marketing-apparel",
    title: "Promotional & Marketing",
    icon: Megaphone,
    color: "text-[#00c2ff]",
    badge: "MOQ 50 / 7-day rush",
    desc: "Trade show giveaways, product launch tees, brand activation merch, retail promo bundles. We print, polybag, label, and drop-ship to your event or warehouse.",
    cta: "Launch a campaign",
  },
  {
    slug: "apparel-brands-agencies",
    title: "Apparel Brands & Agencies",
    icon: Shirt,
    color: "text-[#ff4d00]",
    badge: "Full-package cut-and-sew",
    desc: "Private label, white label, drop-ship — your brand, our factory. Pattern making, grading, sampling, bulk runs. We sign NDAs and stay invisible to your customers.",
    cta: "Start your brand",
  },
  {
    slug: "e-commerce-fulfillment",
    title: "E-commerce Fulfillment",
    icon: Truck,
    color: "text-[#00c2ff]",
    badge: "US warehouse, 2-5 day domestic",
    desc: "Dropship or bulk to our Fontana CA warehouse. Blind shipping, custom packaging, inserts, returns handling. Integrates with Shopify, Amazon, TikTok Shop.",
    cta: "Set up fulfillment",
  },
];

// 2026-09-11 push (Round 5): add FAQPage JSON-LD on /solutions/ so the page
// can earn PAA-style rich results. Each Q/A mirrors a real buyer question
// we'd otherwise have to answer in chat — surfacing them in SERPs captures
// informational-intent clicks and shortens the pre-quote education loop.
const solutionsFaq = [
  {
    q: "Which solution should I pick if I sell across multiple buyer types?",
    a: "Most multi-channel buyers start with the Apparel Brands & Agencies solution (white-label, NDA-friendly, your brand on every label), then add E-commerce Fulfillment for DDP-to-door or blind-shipping. You can run both workflows in parallel without re-onboarding — the production line, fabric library, and account manager stay the same.",
  },
  {
    q: "Can I combine two solutions, e.g. team apparel + event merchandise?",
    a: "Yes. We regularly run hybrid orders: a sports league's player kits ship under Teams & Sports, while the fan merch from the same league ships under Event & Festival. Pricing stays per-piece; we just route the two halves to different delivery addresses or release windows so each batch arrives on its own deadline.",
  },
  {
    q: "Do all solutions have the same MOQ?",
    a: "MOQ is 50 pieces per design across every solution. The difference is what 50 pieces gets you: a fully sublimated cut-and-sew cycling kit (Teams), a polybagged merch bundle (Event), a poly-cotton polo with DTG chest logo (Corporate), or a retail-packaged DTC tee (E-commerce). Below 50 pcs we can do it but per-unit cost rises sharply because setup doesn't amortize.",
  },
  {
    q: "Which solution is fastest if I have a 7-day deadline?",
    a: "Promotional & Marketing carries an explicit 7-day rush lane, and Event & Festival ships in 2 weeks under DDP. The other solutions sit at 14–21 days. Rush always costs a 20% production surcharge plus any air-freight delta; we confirm capacity the same day you ask, not after you commit.",
  },
  {
    q: "Do you sign NDAs for Apparel Brands & Agencies work?",
    a: "Yes — mutual NDA is standard before any pattern, grading, or branded label work. We also offer white-label shipping (your packing slip, your carton mark, no SublimApparel branding anywhere on the outward packaging) and blind invoicing for dropship-to-customer orders.",
  },
  {
    q: "Is the E-commerce Fulfillment solution US-only?",
    a: "We hold buffer stock at our Fontana, CA warehouse for US-bound orders (2–5 day domestic) and route EU/UK/AU orders from our Yiwu hub via DDP. Shopify, Amazon FBA, and TikTok Shop integrations are live; for other platforms we provide CSV-based order feeds with daily auto-sync.",
  },
];

const solutionsFaqJsonLd = buildFaqJsonLd(solutionsFaq);

export default function SolutionsPage() {
  // 2026-09-11 push (Round 7): add CollectionPage + ItemList JSON-LD on
  // /solutions/. The page is the master hub for 6 solution landing pages
  // (teams, events, corporate, promotional, brands, e-commerce). Same
  // reason as /products/, /cases/, and /industries/ — without structured
  // data, the hub → child relationship is invisible to Google.
  const solutionsCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://sublimapparel.com/solutions/#collection",
    url: "https://sublimapparel.com/solutions/",
    name: "Custom Apparel Solutions — 6 B2B Buyer Workflows",
    description:
      "Six apparel solutions built for specific B2B buyers: sports teams, events, corporate, promotional, brands, and e-commerce. Each solution has its own fabric, MOQ, lead time, and case studies.",
    inLanguage: "en",
    isPartOf: { "@id": "https://sublimapparel.com/#website" },
    provider: { "@id": "https://sublimapparel.com/#organization" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: solutions.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: solutions.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://sublimapparel.com/${s.slug}/`,
        name: s.title,
      })),
    },
  };

  // 2026-09-11 (Round 10): the page had FAQPage + CollectionPage + ItemList
  // + breadcrumb but no WebPage. Adding WebPage so it joins the brand entity
  // graph with isPartOf → #website and about → #organization cross-links.
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://sublimapparel.com/solutions/#webpage",
    url: "https://sublimapparel.com/solutions/",
    name: "Custom Apparel Solutions for Every B2B Buyer | SublimApparel",
    description:
      "Six apparel solutions built for specific B2B buyers: sports teams, events, corporate, promotional, brands, and e-commerce. Pick yours, get a quote in 24 hours.",
    inLanguage: "en",
    isPartOf: { "@id": "https://sublimapparel.com/#website" },
    about: { "@id": "https://sublimapparel.com/#organization" },
    speakable: {
      "@type": "SpeakableSpecification",
      xpath: ["/html/body//h1", "/html/body//section[1]//p"],
    },
  };

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ])}
      />
      <JsonLd data={[solutionsFaqJsonLd, webPageJsonLd, solutionsCollection]} />
      <main>
        {/* HERO — dark industrial style */}
        <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
          <div className="relative h-[55vh] min-h-[420px] w-full lg:h-[70vh] lg:min-h-[560px]">
            <Image
              src="/hero-products.webp"
              alt="Six apparel solutions overview — SublimApparel custom manufacturing for B2B buyers"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/92 via-40% to-transparent" />
            <div
              className="absolute inset-0 backdrop-blur-[2px]"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, #000 0%, #000 40%, transparent 65%)",
                maskImage:
                  "linear-gradient(to right, #000 0%, #000 40%, transparent 65%)",
              }}
            />
          </div>

          <div className="absolute inset-0 mx-auto max-w-7xl px-6">
            <div className="flex h-full items-start pb-12 pt-20 md:pb-16 md:pt-28 lg:items-center lg:pb-0 lg:pt-0">
              <div className="max-w-2xl">
                <div className="mb-4 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                  Solutions
                </div>
                <h1 className="text-balance text-3xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Six apparel solutions.
                  <br />
                  One factory. <span className="text-[#cc3d00]">DDP worldwide.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
                  <strong>Pick your buyer profile</strong> — sports, events,
                  corporate, promo, brand, or e-commerce. Each solution is a
                  pre-configured workflow with the right fabric, print method,
                  MOQ, and delivery plan for your use case.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTION CARDS GRID */}
        <section className="border-b-2 border-black bg-[#faf9f6]">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mb-3 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Six solutions
            </div>
            <h2 className="mb-3 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
              Which solution fits <span className="text-[#cc3d00]">your buyer?</span>
            </h2>
            <p className="mb-12 max-w-3xl text-base text-black/70 md:text-lg">
              <strong>Short answer:</strong> pick the card that matches your
              customer. Each one links to a dedicated page with fabric options,
              print methods, MOQ, sample policy, and past projects.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {solutions.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}/`}
                    className="group relative flex flex-col border-2 border-black bg-white p-8 transition-all hover:border-[#ff4d00] hover:bg-white"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <Icon
                        className={`h-10 w-10 ${s.color}`}
                        strokeWidth={1.5}
                      />
                      <span className="bg-black px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                        {s.badge}
                      </span>
                    </div>
                    <h3 className="mb-3 text-2xl font-black leading-tight md:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mb-6 flex-1 text-sm text-black/70 md:text-base">
                      {s.desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black transition-colors group-hover:text-[#cc3d00]">
                      {s.cta}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        strokeWidth={2.5}
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2026-09-11 push (Round 7): internal cross-link band on /solutions/.
            Same reason as /industries/ and /cases/ — the page used to be a
            dead end for crawlers (the 6 solution tiles + 1 CTA, all
            pointing inward to /get-a-quote/ or /cases/). Adding 3
            explicit cross-link cards to /products/, /industries/, and
            /cases/ routes link equity back into the rest of the site and
            gives human visitors an obvious next step if they're not yet
            sure which solution matches their brief. */}
        <section className="border-b-2 border-black bg-[#f5f5f5]">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mb-3 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Keep exploring
            </div>
            <h2 className="mb-3 text-3xl font-black leading-[0.95] tracking-tight md:text-5xl">
              Browse by what you need next
            </h2>
            <p className="mb-10 max-w-3xl text-base text-black/70 md:text-lg">
              The 6 solutions above map to specific buyer profiles — but if you
              know exactly what garment you want, jump to the full 119-product
              catalog; if you want to see real briefs and outcomes, open the
              case-study gallery; if you want to know which verticals we
              specialize in, browse the 12 industries.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <Link
                href="/products/"
                className="group flex flex-col border-2 border-black bg-white p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:bg-[#ff4d00] hover:text-black hover:shadow-[6px_6px_0_0_#000]"
              >
                <div className="text-[10px] font-black uppercase tracking-widest">
                  Catalog
                </div>
                <div className="mt-2 text-xl font-black uppercase leading-tight md:text-2xl">
                  All 119 products
                </div>
                <div className="mt-2 flex-1 text-sm">
                  T-shirts, hoodies, jerseys, sportswear, polos, jackets, pants, sweatshirts, shirts, skirts, caps, home textiles, workwear, and tank tops. Filter by sport, scenario, and garment type.
                </div>
                <div className="mt-3 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                  Open the catalog
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </div>
              </Link>
              <Link
                href="/industries/"
                className="group flex flex-col border-2 border-black bg-white p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:bg-[#ff4d00] hover:text-black hover:shadow-[6px_6px_0_0_#000]"
              >
                <div className="text-[10px] font-black uppercase tracking-widest">
                  Industries
                </div>
                <div className="mt-2 text-xl font-black uppercase leading-tight md:text-2xl">
                  12 verticals
                </div>
                <div className="mt-2 flex-1 text-sm">
                  Sports teams, race events, conferences, music festivals, schools, breweries, hospitality, marketing, trade shows, brands, political campaigns, and e-commerce fulfillment.
                </div>
                <div className="mt-3 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                  See all industries
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </div>
              </Link>
              <Link
                href="/cases/"
                className="group flex flex-col border-2 border-black bg-white p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:bg-[#ff4d00] hover:text-black hover:shadow-[6px_6px_0_0_#000]"
              >
                <div className="text-[10px] font-black uppercase tracking-widest">
                  Case Studies
                </div>
                <div className="mt-2 text-xl font-black uppercase leading-tight md:text-2xl">
                  6,000+ projects
                </div>
                <div className="mt-2 flex-1 text-sm">
                  Real briefs, fabric choices, and delivery outcomes from sports leagues, race events, music festivals, conferences, schools, and more.
                </div>
                <div className="mt-3 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                  Open the gallery
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA — direct quote */}
        <section className="bg-[#0a0a0a] text-white">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center">
            <div className="mb-4 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
              Not sure which fits?
            </div>
            <h2 className="mb-6 text-3xl font-black leading-[0.95] tracking-tight md:text-5xl">
              Tell us your project. <span className="text-[#cc3d00]">We'll match the solution.</span>
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base text-white/75 md:text-lg">
              Send a quick brief — buyer type, quantity, deadline. We'll
              recommend the right fabric, print method, and delivery plan in
              under 24 hours.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/get-a-quote/"
                className="inline-flex items-center gap-2 bg-[#ff4d00] px-8 py-4 text-base font-black uppercase tracking-widest text-black transition-colors hover:bg-[#cc3d00]"
              >
                Get a quote
                <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
              </Link>
              <Link
                href="/cases/"
                className="inline-flex items-center gap-2 border-2 border-white bg-transparent px-8 py-4 text-base font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
              >
                See past projects
                <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
