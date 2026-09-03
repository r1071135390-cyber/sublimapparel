import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Trophy, Shirt, Briefcase, Users, Calendar, Ruler, Globe, MessageCircle, Megaphone, GraduationCap, Coffee, ShoppingCart, Building2, Mic2 } from "lucide-react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  alternates: { canonical: "/industries/" },
  title: "Industries We Serve | SublimApparel",
  description:
    "Custom sublimation & all-over-print apparel for sports teams, race events, festivals, corporate programs, breweries, schools, political campaigns, and more. DDP shipping to 100+ countries.",
  
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
  return (
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
  );
}
