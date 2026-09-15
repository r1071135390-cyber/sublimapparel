import type { Metadata } from "next";
import {
  Trophy,
  Shirt,
  Briefcase,
  Users,
  Calendar,
  Ruler,
  Globe,
  MessageCircle,
} from "lucide-react";
import { buildMetadata, type CustomerProfileData } from "@/lib/customer-profile-data";
import { CustomerProfilePage } from "@/components/customer-profile-template";

export const dynamic = "force-static";

const data: CustomerProfileData = {
  slug: "/industries/sports-teams-leagues/",
  // 2026-09-11 (R17-P3): was "Custom Sports Team Apparel Manufacturer |
  // Jerseys & Uniforms" — this title competed directly with
  // /teams-sports-apparel (overlap=6 — the highest in the audit).
  // Reframed around the *industry/use case* angle so this page owns
  // "team apparel for clubs and leagues" while the solutions page owns
  // "team sports apparel production service". 60 chars exactly.
  metaTitle: "Team Apparel for Clubs & Leagues | Custom Sports Jerseys",
  metaDescription:
    "Custom team apparel for clubs, leagues, and federations: sublimated jerseys, uniforms, and training wear. Roster-locked production, sponsor panels, season-opener deadlines.",
  keywords: [
    "custom sports team apparel",
    "team jersey supplier",
    "sports team clothing",
    "team uniforms",
    "sports team apparel",
    "league jerseys",
    "custom team jerseys",
    "sports uniforms",
    "team merchandise",
    "custom sports apparel",
    "athletic team shirts",
    "team polos",
    "league uniforms",
    "club team apparel",
    "sports league merchandise",
    "custom team uniforms",
    "team jerseys",
    "athletic uniforms",
    "baseball uniforms",
    "basketball jerseys",
    "soccer jerseys",
    "football jerseys",
    "volleyball jerseys",
    "hockey jerseys",
    "team practice jerseys",
  ],
  badge: "For Sports Teams & Leagues",
  hero: "/bowling-jersey-striker.webp",
  // 2026-09-11 (R17-P3): was "Custom Sports Team Apparel Manufacturer
  // for Clubs & Leagues" — this H1 mirrored the solutions page H1 too
  // closely (overlap=6 in keyword audit — the highest pair). Reframed
  // around the *industry/use case* angle to match the new metaTitle.
  h1: "Team Apparel for Clubs, Leagues & Federations",
  heroTitle: "Create Team Apparel That Represents Your Identity",
  heroBody:
    "Every team needs apparel that looks professional, fits comfortably, and represents its unique identity.\n\nWe manufacture custom sublimation jerseys, uniforms, and training apparel for sports teams, clubs, and leagues worldwide.",
  primaryCta: "Get a Team Quote",
  secondaryCta: "Browse Sports Apparel",
  stats: [
    { value: "50+", label: "Teams Served" },
    { value: "MOQ 10", label: "Per Design" },
    { value: "20 days", label: "Avg. Lead Time" },
    { value: "100%", label: "Custom Sublimation" },
  ],
  solutionsSection: {
    eyebrow: "Solutions",
    title: "Custom Apparel Solutions for Sports Teams",
    subtitle: "We produce sublimated jerseys, uniforms and training wear for clubs, leagues...",
    sections: [
      {
        title: "Team Jerseys",
        icon: "Trophy",
        items: [
          { name: "Soccer Jerseys", details: [] },
          { name: "Basketball Uniforms", details: [] },
          { name: "Baseball Shirts", details: [] },
          { name: "Volleyball Jerseys", details: [] },
        ],
      },
      {
        title: "Training Apparel",
        icon: "Shirt",
        items: [
          { name: "Training Shirts", details: [] },
          { name: "Performance Tops", details: [] },
          { name: "Shorts", details: [] },
          { name: "Warm-Up Clothing", details: [] },
        ],
      },
      {
        title: "Club Merchandise",
        icon: "Briefcase",
        items: [
          { name: "Fan Shirts", details: [] },
          { name: "Supporter Apparel", details: [] },
          { name: "Team Merchandise", details: [] },
        ],
      },
    ],
  },
  whySection: {
    eyebrow: "Why Teams Choose Us",
    title: "Built Around the Way Teams Actually Order",
    subtitle: "Three recurring challenges that sports teams face — and how we solve them.",
    features: [
      {
        icon: "Ruler",
        title: "Accurate Team Sizing",
        body: "Team orders often include many sizes. We provide detailed size charts, size confirmation and youth/adult options so every player gets a kit that fits.",
      },
      {
        icon: "Users",
        title: "Small & Medium Team Orders",
        body: "Many clubs don't need thousands of pieces. We support flexible quantities from small amateur teams to large league orders.",
      },
      {
        icon: "Calendar",
        title: "Deadline Management",
        body: "Tournament seasons, league launches and team events run on fixed dates. We help plan production timelines backwards from your first fixture.",
      },
      {
        icon: "Globe",
        title: "Direct Factory in Yiwu, China",
        body: "Working with the actual manufacturer means clearer communication, better pricing and faster decisions than a trading middleman.",
      },
      {
        icon: "Trophy",
        title: "Sublimation Apparel Specialist",
        body: "We focus on full-coverage dye-sublimation so team colors, logos, names and numbers stay vibrant wash after wash.",
      },
      {
        icon: "MessageCircle",
        title: "Clear Communication & Global Shipping",
        body: "Single point of contact in English, plus DDP shipping to the US, UK, EU and Australia so teams don't have to chase customs paperwork.",
      },
    ],
  },
  perfectFor: {
    eyebrow: "Perfect For",
    title: "Built for the Way Teams Order Apparel",
    items: [
      "Local sports clubs",
      "Amateur leagues",
      "School teams",
      "Youth programs",
      "Travel teams",
      "Recreational leagues",
    ],
  },
  faqTitle: "Team Apparel Questions, Answered",
  faqSubtitle: "Common questions from coaches, managers and league organizers.",
  faqs: [
    {
      q: "Can you produce different sizes in one team order?",
      a: "Yes, mixed sizes are available. We work from your size breakdown to ship a single consolidated order with the right count per size.",
    },
    {
      q: "Can each player have a different name and number?",
      a: "Yes. Personalization is supported. Send us a roster spreadsheet and we will apply the correct name and number to each garment in the production file.",
    },
    {
      q: "Do you work with amateur teams?",
      a: "Yes. We support local clubs, school teams, recreational leagues and professional organizations. The MOQ is the same — what changes is the order size.",
    },
    {
      q: "What is the minimum order quantity?",
      a: "For team apparel we typically start at 10 pieces per design. Larger orders get better unit pricing, but small amateur teams are welcome.",
    },
  ],
  ctaTitle: "Need Custom Team Apparel?",
  ctaBody:
    "Send your team design and a rough size count. We will reply with a production plan, lead time and a clear quote.",
  ctaButton: "Start Your Team Project",
  ogImage: "/og/og-industry.webp",
  // 2026-09-13 (R59): per-industry HowTo (5-step buyer journey
  // for custom sublimated team jerseys / kits). Lifts the page
  // to HowTo rich result eligibility for "how to order custom
  // team jerseys" PAA queries.
  howto: {
    name: "How we make custom sublimated team jerseys for clubs and leagues",
    description:
      "End-to-end 30-day process: from the team's first artwork submission to DDP delivery of finished jerseys at the club address.",
    totalTime: "P30D",
    steps: [
      {
        name: "Submit team design + roster",
        text: "Send the club logo, color palette, sponsor logos, and a size breakdown (or rough headcount). We free-check the artwork and send back a 3D mockup on the actual jersey within 1 business day.",
      },
      {
        name: "Approve sample (optional)",
        text: "Pre-production sample costs $25–60 per piece and takes 5–7 days. We refund the sample cost on bulk orders of 100+ pieces. Most clubs skip samples and go straight to bulk when colors match the team brief.",
      },
      {
        name: "Production run (15–25 days)",
        text: "Bulk production starts once artwork is locked. We cut and sew each jersey in-house at our Yiwu factory — full sublimation, edge-to-edge, no color limits, every name and number sewn in.",
      },
      {
        name: "Quality control + packing",
        text: "AQL 2.5 inspection on every run, polybagged and tagged. Roster-locked packing — we ship each player's jersey in a labeled polybag so the team manager can hand them out in the locker room.",
      },
      {
        name: "DDP delivery to your address",
        text: "DDP shipping to 100+ countries (US, UK, EU, AU, CA) with duties, customs, and last-mile included. Transit adds 7–14 days on top of production. Most clubs have finished jerseys in hand 30–40 days after artwork approval.",
      },
    ],
  },
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return <CustomerProfilePage data={data} />;
}
