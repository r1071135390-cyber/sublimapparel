import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Layers,
  Shirt,
  Package,
  Users,
  Globe,
  MessageCircle,
  Ruler,
  Award,
  Clock,
  DollarSign,
  Sparkles,
  Briefcase,
  Music,
  Trophy,
  Building,
  GraduationCap,
  Coffee,
  Tv,
  Megaphone,
  Flag,
  ShoppingBag,
  Truck,
  Box,
  Repeat,
  CheckCircle2,
} from "lucide-react";
import { buildMetadata, type CustomerProfileData } from "@/lib/customer-profile-data";
import { CustomerProfilePage } from "@/components/customer-profile-template";
// 2026-09-18 (R73 GEO): TL;DR / Direct Answer block — see /lib/tldr-content.ts.
import { PageGeoAnswerBlock } from "@/components/geo-answer-block";

export const dynamic = "force-static";

const data: CustomerProfileData = {
  slug: "/industries/endurance-race-events/",
  // 2026-11-17 (R137): was "Marathon & Running Race Shirts Manufacturer" —
  // that title reused the product pages' main keyword ("custom race
  // shirts" / "custom marathon shirts"), which the SEO plan flags as
  // keyword competition. This page now owns the plan's own keyword
  // for it: "Marathon & Race Event Apparel Manufacturer".
  metaTitle: "Marathon & Race Event Apparel Manufacturer",
  metaDescription:
    "Race event apparel manufacturer for marathons, running events and endurance competitions. Bulk sublimation apparel with accurate sizing and reliable delivery.",
  keywords: [
    "marathon shirt manufacturer",
    "race shirt supplier",
    "custom race shirts",
    "race shirts",
    "marathon shirts",
    "running team apparel",
    "5k race shirts",
    "custom race apparel",
    "half marathon shirts",
    "endurance event shirts",
    "race team uniforms",
    "marathon merchandise",
    "custom running shirts",
    "race day apparel",
    "finish line shirts",
    "running club shirts",
    "race volunteer shirts",
    "athletic event apparel",
    "custom marathon shirts",
    "race participant shirts",
    "10k race shirts",
    "triathlon shirts",
    "fun run shirts",
    "charity race shirts",
    "cross country shirts",
    "race swag",
  ],
  badge: "For Endurance & Race Events",
  hero: "/hero-jersey-v2.webp",
  // 2026-11-17 (R137): was "Custom Race Shirts & Marathon Apparel
  // Manufacturer" — the two product keywords belong to /race-shirts/
  // and /marathon-shirts/. H1 now states the organiser-side role
  // this page owns (per the plan's keyword table) so the three pages
  // stop competing for the same term.
  h1: "Marathon & Race Event Apparel Manufacturer",
  heroTitle: "Apparel Solutions for Races, Marathons & Endurance Events",
  heroBody:
    "Race organizers need apparel that arrives on time, fits participants correctly, and represents the event professionally.\n\nWe manufacture race event apparel for running events, marathons, charity races and endurance competitions — planned around your event date, with size-sorted packing and DDP delivery to the venue.",
  primaryCta: "Plan Your Race Apparel",
  secondaryCta: "See Sample Work",
  stats: [
    { value: "10k+", label: "Race Shirts Produced" },
    { value: "100+", label: "Events Served" },
    // 2026-11-17 (R137): was "20 days / Avg. Lead Time". That number
    // contradicted this page's own FAQ and HowTo copy, so the hard
    // duration is gone — the slot now states the promise instead.
    { value: "Per Order", label: "Lead Time Confirmed In Writing" },
    { value: "DDP", label: "Worldwide Shipping" },
  ],
  solutionsSection: {
    eyebrow: "Solutions",
    title: "Race Apparel We Produce",
    subtitle: "From full marathons to community fun runs, every distance has its own apparel needs.",
    sections: [
      {
        title: "Marathon Shirts",
        icon: "Trophy",
        items: [
          { name: "Full Marathons", details: [] },
          { name: "Half Marathons", details: [] },
          { name: "Fun Runs", details: [] },
        ],
      },
      {
        title: "Running Event Apparel",
        icon: "Shirt",
        items: [
          { name: "Participant Shirts", details: [] },
          { name: "Volunteer Shirts", details: [] },
          { name: "Staff Apparel", details: [] },
        ],
      },
      {
        title: "Endurance Sports Apparel",
        icon: "Award",
        items: [
          { name: "Cycling Events", details: [] },
          { name: "Triathlon Events", details: [] },
          { name: "Outdoor Competitions", details: [] },
        ],
      },
    ],
  },
  whySection: {
    eyebrow: "Why Race Organizers Choose Us",
    title: "Designed Around Event Deadlines",
    subtitle: "Unlike regular apparel orders, race apparel has a fixed event date. We plan...",
    features: [
      {
        icon: "Clock",
        title: "Bulk Production Capability",
        body: "Our factory can support large event orders. Marathon runs that need thousands of identical shirts are routine for us.",
      },
      {
        icon: "Layers",
        title: "Flexible Quantities",
        body: "Suitable for small community races and large multi-thousand-participant events. Pricing scales per order size.",
      },
      {
        icon: "Ruler",
        title: "Accurate Sizing",
        body: "Reduce participant complaints with clear size planning. We provide size charts and can pack by size for easy distribution at packet pickup.",
      },
      {
        icon: "Package",
        title: "Custom Packaging Options",
        body: "We can package shirts by size, by participant name, or by team — whatever your event's distribution model requires.",
      },
      {
        icon: "Globe",
        title: "DDP Shipping to Your Venue",
        body: "We deliver duty-paid to the US, UK, EU and Australia, so you don't have to chase customs paperwork before race day.",
      },
      {
        icon: "MessageCircle",
        title: "Single Point of Contact",
        body: "One English-speaking coordinator handles your design, production, packing and shipping updates from quote to delivery.",
      },
    ],
  },
  perfectFor: {
    eyebrow: "Perfect For",
    title: "Race Organizers Who Need Apparel That Shows Up On Time",
    items: [
      "Marathon organizers",
      "Charity race directors",
      "Running clubs",
      "Triathlon event companies",
      "Cycling race promoters",
      "Community fun run organizers",
    ],
  },
  faqTitle: "Race Apparel Questions, Answered",
  faqSubtitle: "Common questions from race directors and event managers.",
  faqs: [
    {
      q: "How early should race organizers place orders?",
      // 2026-11-17 (R137): was "…is 25–35 days plus sea transit" — it
      // contradicted this page's own HowTo copy and the TL;DR block.
      // The real production standard has to be confirmed by the
      // factory first, so the hard duration is removed here.
      a: "We recommend planning as early as possible, especially for large events. Production lead time depends on quantity, print complexity and the confirmed production schedule — we confirm the ship-by date in writing before you approve the order.",
    },
    {
      q: "Can you produce shirts for volunteers and staff?",
      a: "Yes. We can produce separate designs for participants, volunteers, staff and sponsors, all delivered in the same consolidated shipment.",
    },
    {
      q: "Can you package shirts by size or participant?",
      a: "Yes. We can sort by size, by bib number, by team, or by individual participant name — whatever makes distribution at packet pickup easiest.",
    },
    {
      q: "Do you handle international shipping and customs?",
      a: "Yes. We ship DDP (duty paid) to most major markets, so the apparel arrives at your door or venue with no customs paperwork on your end.",
    },
  ],
  ctaTitle: "Planning Your Next Race?",
  ctaBody:
    "Let us help you prepare event apparel on time. Share your event date, quantity and design — we will reply with a clear production plan.",
  ctaButton: "Plan Your Event Apparel",
  ogImage: "/og/og-industry.webp",
  // 2026-09-13 (R59): per-industry HowTo (5-step buyer journey for
  // race organizers: from event date + size matrix to DDP delivery
  // at the race venue). Lifts the page to HowTo rich result
  // eligibility for "how to order marathon race shirts" PAA
  // queries.
  howto: {
    name: "How we produce custom race shirts for marathons and endurance events",
    description:
      "Fixed event-date production: from the race organizer's first quote request to DDP delivery of race shirts at the event venue or packet-pickup warehouse.",
    // 2026-11-17 (R137): totalTime "P35D" removed — it contradicted the
    // page's own FAQ / step copy. The field is optional in
    // CustomerProfileData; the HowTo node stays valid without it.
    steps: [
      {
        name: "Send event date + size matrix",
        text: "Provide the race date, total quantity by size, and at least a logo or last year's design. We reply within 1 business day with a per-size production plan, ship-by date, and full DDP landed cost.",
      },
      {
        name: "Lock design + sample (optional)",
        text: "Free design check + 3D mockup on the actual garment. Pre-production sample costs $25–60 per piece, 5–7 day turnaround, refundable on bulk orders of 100+ pieces. Most race organizers skip samples once colors match the brief.",
      },
      {
        // 2026-11-17 (R137): was "Bulk production (20–30 days)" — the
        // duration contradicted this page's own FAQ copy.
        name: "Bulk production",
        text: "Bulk sublimation starts once artwork is locked. We cut and sew every shirt in-house at our Yiwu factory — full coverage print, sponsor logos, race bib zones, no color limits, every name optional at no extra setup cost.",
      },
      {
        name: "Size-sorted packing",
        text: "AQL 2.5 inspection on every run, then packed by size per the size matrix you sent. Optional: per-bib or per-participant polybag for packet pickup. Tags + folded presentation ready for venue distribution.",
      },
      {
        name: "DDP delivery to race venue or warehouse",
        // 2026-11-17 (R137): the "7–14 days before race day" buffer was
        // a fourth hard timing number on the same page — replaced with
        // the written ship-by date we promise instead.
        text: "DDP shipping to 100+ countries (US, UK, EU, AU, CA). We can ship to a single race-venue address, multiple packet-pickup warehouses, or directly to your hotel. We plan the delivery so the shirts land with a buffer ahead of race day, and we confirm that ship-by date in writing.",
      },
    ],
  },
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return (
    <>
      <PageGeoAnswerBlock path="/industries/endurance-race-events/" />
      <CustomerProfilePage data={data} />
      {/* 2026-11-17 (R137): internal-link layer. This page is the
          organiser-side solution surface ("Marathon & Race Event
          Apparel Manufacturer"); /race-shirts/ and /marathon-shirts/
          own the product keywords. The block below hands readers over
          to those product pages instead of repeating their copy here.
          Styled after the "Related Solutions" block in
          customer-profile-template.tsx (border, uppercase micro-label,
          arrow links). */}
      <section className="border-t border-black/10 bg-[#fafafa] py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="mb-6 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff4d00]">
              Ready to order
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0a0a0a] md:text-3xl">
              See the race shirt product pages
            </h2>
          </div>
          <p className="mb-6 max-w-3xl text-base leading-relaxed text-black/70 md:text-lg">
            This page covers the organiser side — sizing, packaging and delivery
            planning around your event date.
          </p>
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-black/70 md:text-lg">
            Ready to order? See our{" "}
            <Link
              href="/race-shirts/"
              className="font-bold text-[#cc3d00] underline underline-offset-4 hover:text-[#ff4d00]"
            >
              custom race shirts
            </Link>{" "}
            and{" "}
            <Link
              href="/marathon-shirts/"
              className="font-bold text-[#cc3d00] underline underline-offset-4 hover:text-[#ff4d00]"
            >
              custom marathon shirts
            </Link>{" "}
            for product specs, fabric options and ordering details.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/race-shirts/"
              className="group flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-5 transition-colors hover:border-[#ff4d00]/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff4d00]/10 text-[#ff4d00]">
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="min-w-0">
                <p className="text-base font-black text-[#0a0a0a]">
                  Race Shirt Product Range
                </p>
                <p className="mt-1 text-sm text-black/65">
                  5K, 10K, fun run and charity race shirts for club, school and
                  community events.
                </p>
              </div>
            </Link>
            <Link
              href="/marathon-shirts/"
              className="group flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-5 transition-colors hover:border-[#ff4d00]/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff4d00]/10 text-[#ff4d00]">
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="min-w-0">
                <p className="text-base font-black text-[#0a0a0a]">
                  Marathon Shirt Product Range
                </p>
                <p className="mt-1 text-sm text-black/65">
                  Full marathon and half marathon shirts with participant,
                  volunteer and staff options.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
