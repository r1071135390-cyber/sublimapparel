import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Trophy, Shirt, Briefcase, Users, Calendar, Ruler, Globe, MessageCircle, Megaphone, GraduationCap, Coffee, ShoppingCart, Building2, Mic2 } from "lucide-react";
import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  alternates: { canonical: "/industries/" },
  // 2026-09-11 push (Round 4): was "Industries We Serve | SublimApparel" (35 chars) —
  // too short, doesn't telegraph breadth. New title leads with the actual page
  // breadth (12 industries) + the head keyword buyers search for.
  title: "12 Industries: Custom Sublimated Apparel Manufacturer",
  description:
    "Custom sublimation & all-over-print apparel for sports teams, race events, festivals, corporate programs, breweries, schools, political campaigns, and more. DDP shipping to 100+ countries.",
  ogTitle: "12 Industries We Serve: Custom Sublimated Apparel",
  keywords: [
    "custom apparel industries",
    "sublimation manufacturer by industry",
    "B2B apparel vertical",
    "sports team apparel factory",
    "event merchandise manufacturer",
    "corporate apparel supplier",
  ],
});

type IndustryCard = {
  href: string;
  badge: string;
  h1: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const INDUSTRIES: IndustryCard[] = [
  {
    href: "/industries/sports-teams-leagues/",
    badge: "Sports Teams & Leagues",
    h1: "Custom Sports Team Apparel Manufacturer for Clubs & Leagues",
    description:
      "Sublimated jerseys, uniforms and training wear for clubs, leagues and athletes with flexible MOQ.",
    Icon: Trophy,
  },
  {
    href: "/industries/endurance-race-events/",
    badge: "Endurance & Race Events",
    h1: "Race Jerseys & Marathon Apparel Manufacturer",
    description:
      "Lightweight, sweat-wicking race jerseys and marathon singlets for 5K, half, full and ultra events.",
    Icon: Ruler,
  },
  {
    href: "/industries/events-conferences/",
    badge: "Events & Conferences",
    h1: "Event Apparel for Conferences, Trade Shows & Corporate Events",
    description:
      "Branded apparel for conference staff, attendees, and event swag with on-time delivery windows.",
    Icon: Calendar,
  },
  {
    href: "/industries/music-festival-tour-merchandise/",
    badge: "Music Festivals & Tour Merch",
    h1: "Music Festival Merch & Tour Apparel Manufacturer",
    description:
      "All-over print band tees, tour merch and festival apparel with photorealistic graphics.",
    Icon: Mic2,
  },
  {
    href: "/industries/corporate-employee-programs/",
    badge: "Corporate & Employee Programs",
    h1: "Corporate Apparel & Employee Uniform Manufacturer",
    description:
      "Branded employee apparel, uniforms and onboarding kits for distributed teams worldwide.",
    Icon: Briefcase,
  },
  {
    href: "/industries/schools-universities-greek-life/",
    badge: "Schools, Universities & Greek Life",
    h1: "School Apparel & Greek Life Merch Manufacturer",
    description:
      "Greek life merch, intramural jerseys, and university-branded apparel for student programs.",
    Icon: GraduationCap,
  },
  {
    href: "/industries/breweries-coffee-hospitality/",
    badge: "Breweries, Coffee & Hospitality",
    h1: "Brewery & Hospitality Apparel Manufacturer",
    description:
      "Brewery uniforms, coffee shop merch, and hospitality apparel with edge-to-edge print.",
    Icon: Coffee,
  },
  {
    href: "/industries/promotional-marketing-agencies/",
    badge: "Promotional & Marketing Agencies",
    h1: "Promotional Apparel for Marketing Agencies",
    description:
      "Promotional product apparel and campaign merchandise for agencies and brand activations.",
    Icon: Megaphone,
  },
  {
    href: "/industries/trade-shows-display/",
    badge: "Trade Shows & Display",
    h1: "Trade Show Apparel & Exhibit Staff Uniforms",
    description:
      "Booth staff apparel, demo team wear, and trade show giveaways with sharp color matching.",
    Icon: Building2,
  },
  {
    href: "/industries/apparel-brands-agencies/",
    badge: "Apparel Brands & Agencies",
    h1: "Private Label Apparel Manufacturer for Brands & Agencies",
    description:
      "Private label and white-label apparel for fashion brands, agencies and resellers.",
    Icon: Shirt,
  },
  {
    href: "/industries/political-campaigns/",
    badge: "Political & Campaign Apparel",
    h1: "Political Campaign Apparel & Yard Sign Merch",
    description:
      "Fast-turn campaign apparel, rally shirts, and yard sign bundles for candidates and PACs.",
    Icon: MessageCircle,
  },
  {
    href: "/industries/e-commerce-fulfillment/",
    badge: "E-commerce & Fulfillment",
    h1: "Dropship & POD Fulfillment for E-commerce Sellers",
    description:
      "Print-on-demand and bulk-to-DDP fulfillment for Shopify, Etsy and Amazon sellers.",
    Icon: ShoppingCart,
  },
];

export default function IndustriesIndexPage() {
  // 2026-09-11 push (Round 6): /industries/ was the only top-tier hub page
  // with zero JSON-LD. Adding BreadcrumbList + FAQPage here unlocks
  // breadcrumb SERP rendering and PAA-style placements for the buyer
  // queries that already associate with industry tiles.
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
  ]);
  const faqJsonLd = buildFaqJsonLd([
    {
      q: "Which industries does SublimApparel serve?",
      a: "We produce custom sublimation and all-over-print apparel for 12 verticals: sports teams & leagues, endurance & race events, events & conferences, music festival & tour merch, corporate & employee programs, schools & Greek life, breweries & coffee shops, promotional & marketing agencies, trade shows & retail displays, apparel brands & agencies, political campaigns, and e-commerce fulfillment. Each vertical has a dedicated page with fabric, print method, MOQ, and case studies.",
    },
    {
      q: "Do you have a minimum order quantity (MOQ) for all industries?",
      a: "MOQ is 50 pieces per design for cut-and-sew sublimation on polyester, and 30 pieces per design on re-orders. For DTG on 100% cotton, MOQ is 30 pieces per design. For sample / trial runs we can do 5–10 pieces with a 7–10 day turnaround.",
    },
    {
      q: "Can you handle rush deadlines for an event or campaign?",
      a: "Yes. Promotional & marketing runs on a 7-day rush lane, and event / festival / conference orders ship in 2 weeks under DDP. Rush always costs a 20% production surcharge plus any air-freight delta; we confirm capacity the same day you ask, not after you commit.",
    },
    {
      q: "Do you sign NDAs for brand-side work?",
      a: "Yes — mutual NDA is standard before any pattern, grading, or branded label work. We also offer white-label shipping (your packing slip, your carton mark, no SublimApparel branding on the outward packaging) and blind invoicing for dropship-to-customer orders.",
    },
    {
      q: "What if my industry isn't listed on this page?",
      a: "Most non-listed buyers (churches, charities, fraternal organizations, hospitality groups, pet apparel brands) still fit one of the 12 verticals above — pick the closest match. If your project is genuinely unique, send a brief to info@sublimapparel.com or WhatsApp +86 198 1793 0190 and we'll confirm feasibility within 1 business day.",
    },
    {
      q: "Can I order across multiple industries under one account?",
      a: "Yes. Multi-channel buyers typically run Apparel Brands & Agencies (white-label) + E-commerce Fulfillment (DDP-to-door) in parallel. The production line, fabric library, and account manager stay the same across both workflows; you just get separate release windows and packaging per batch.",
    },
  ]);

  // 2026-09-11 push (Round 7): add CollectionPage + ItemList JSON-LD on
  // /industries/. This page is the master hub for 12 industry landing
  // pages; without structured data Google only sees a grid of <a> links
  // and has to infer the parent → child relationship. With CollectionPage
  // + ItemList, the 12 industry URLs are listed in a stable order
  // (alphabetical by slug) and each gets a position number, which makes
  // the hub eligible for "list snippets" rich results and gives Google's
  // crawler an explicit map of the industries section.
  const industriesCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://sublimapparel.com/industries/#collection",
    url: "https://sublimapparel.com/industries/",
    name: "Custom Apparel Industries — 12 Verticals, 6,000+ Projects",
    description:
      "Browse 12 industries we serve with custom sublimation and all-over-print apparel: sports teams, endurance events, conferences, music festivals, corporate, schools, hospitality, marketing, trade shows, brands & agencies, political campaigns, and e-commerce fulfillment.",
    inLanguage: "en",
    isPartOf: { "@id": "https://sublimapparel.com/#website" },
    provider: { "@id": "https://sublimapparel.com/#organization" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: INDUSTRIES.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: INDUSTRIES.map((ind, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://sublimapparel.com${ind.href}`,
        name: ind.badge,
      })),
    },
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={industriesCollection} />
      <main className="bg-background text-foreground">
      <section className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Industries We Serve
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            Custom sublimation & all-over-print apparel, built for your industry
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            We work with race directors, league admins, brand managers, agency
            buyers and merchandise teams across 100+ countries. Pick your
            industry below to see our fit, fabric options, MOQ, and case studies.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/get-a-quote/"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/cases/"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-accent"
            >
              See Case Studies
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map(({ href, badge, description, Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                  {badge}
                </p>
                <h2 className="mt-2 text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
                  {badge} Manufacturer
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2026-09-11 push (Round 7): add an internal cross-link band so
          /industries/ also routes link equity to /products/ and /solutions/.
          Previously this page only linked outward to /cases/ and
          /get-a-quote/, leaving it as a dead end for crawlers and an
          orphan in the site graph. Linking to the other two top-level
          hubs gives Google's PageRank-style flow a reason to revisit
          /industries/ from /products/ and /solutions/, and gives human
          visitors an obvious next step if they don't yet know which
          page answers their question. */}
      <section className="border-t border-border bg-background py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Keep exploring
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            Browse by what you need next
          </h2>
          <p className="mt-3 max-w-3xl text-base text-muted-foreground">
            {`Pick the angle that fits your project: the full 119-product catalog, the 6 buyer-type solutions, or the case studies archive — every page on this site links back to the others so you can move in any direction.`}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/products/"
              className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                Catalog
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary">
                All 119 products, 14 categories
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                T-shirts, hoodies, jerseys, sportswear, polos, jackets, pants, sweatshirts, shirts, skirts, caps, home textiles, workwear, and tank tops. Filter by sport, scenario, and garment type.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Browse the catalog <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              href="/solutions/"
              className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                Solutions
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary">
                6 B2B buyer workflows
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                Team kits, event merch, corporate apparel, promotional, brand white-label, and e-commerce fulfillment. Each solution pre-configures the right fabric, print method, MOQ, and delivery plan.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                See all solutions <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              href="/cases/"
              className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                Case Studies
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary">
                12 industries, 6,000+ projects
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                Real briefs, fabric choices, and delivery outcomes from sports leagues, race events, music festivals, conferences, schools, and more. Pick an industry to see what's shipped.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open the gallery <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Don&apos;t see your industry?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We work with any team that needs custom-printed apparel. Tell us
            your use case and we&apos;ll show you a sample within 3-5 days.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/get-a-quote/"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:opacity-90"
            >
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/all-over-print/"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-base font-semibold text-foreground hover:bg-accent"
            >
              All-Over Print Capability
            </Link>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
