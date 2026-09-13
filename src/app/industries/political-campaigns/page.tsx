import type { Metadata } from "next";
import {
  Flag,
  Shirt,
  Users,
  Calendar,
  Globe,
  MessageCircle,
  Ruler,
  Layers,
  Package,
  Award,
  Sparkles,
  Briefcase,
} from "lucide-react";
import { buildMetadata, type CustomerProfileData } from "@/lib/customer-profile-data";
import { CustomerProfilePage } from "@/components/customer-profile-template";

export const dynamic = "force-static";

const data: CustomerProfileData = {
  slug: "/industries/political-campaigns/",
  metaTitle: "Political Campaign Apparel & Merchandise",
  // 2026-09-11 push (Round 5): tightened from 180 → 150 chars to fit Google's
  // 160-char SERP cap.
  metaDescription:
    "Political campaign apparel manufacturer for campaigns, parties, and PACs. Custom yard signs, campaign shirts, hats, and rally merchandise with fast production.",
  keywords: [
    "campaign shirts manufacturer",
    "political campaign apparel",
    "volunteer shirts",
  ],
  badge: "For Political Campaigns",
  hero: "/logo-main.webp",
  h1: "Political Campaign Apparel Manufacturer for Campaigns, Parties & PACs",
  heroTitle: "Campaign Apparel That Helps You Get Out the Vote",
  heroBody:
    "Political campaigns are time-sensitive. Volunteers need shirts yesterday, supporters want merch that signals the campaign, and rallies need coordinated apparel at scale.\n\nWe manufacture custom political campaign apparel for campaigns, parties, PACs, and advocacy organizations worldwide.",
  primaryCta: "Get a Campaign Quote",
  secondaryCta: "See Campaign Apparel",
  stats: [
    { value: "30+", label: "Campaigns Served" },
    { value: "10k+", label: "Pieces Per Campaign" },
    { value: "10 days", label: "Rush Available" },
    { value: "DDP", label: "Worldwide" },
  ],
  solutionsSection: {
    eyebrow: "Solutions",
    title: "Political Campaign Apparel Solutions",
    subtitle: "From yard signs to volunteer shirts, we make apparel that builds momentum for campaigns.",
    sections: [
      {
        title: "Campaign Apparel",
        icon: "Flag",
        items: [
          { name: "Custom Campaign T-Shirts", details: [] },
          { name: "Volunteer Apparel", details: [] },
          { name: "Campaign Hoodies", details: [] },
          { name: "Rally Apparel", details: [] },
        ],
      },
      {
        title: "Campaign Merchandise",
        icon: "Sparkles",
        items: [
          { name: "Campaign Hats", details: [] },
          { name: "Campaign Tote Bags", details: [] },
          { name: "Yard Signs", details: [] },
          { name: "Sticker & Button Apparel", details: [] },
        ],
      },
      {
        title: "Rally & Event Apparel",
        icon: "Users",
        items: [
          { name: "Rally Staff Apparel", details: [] },
          { name: "Door-Knocker Apparel", details: [] },
          { name: "Phone Bank Staff Clothing", details: [] },
          { name: "Campaign Event Apparel", details: [] },
        ],
      },
    ],
  },
  whySection: {
    eyebrow: "Why Campaigns Choose Us",
    title: "Three Things That Make Campaign Apparel Easier With Us",
    features: [
      {
        icon: "Calendar",
        title: "Rush Production for Election Calendars",
        body: "Campaigns don't wait. We offer rush production for tight election windows — typically 10–15 days for smaller orders so you can respond to a late opportunity.",
      },
      {
        icon: "Layers",
        title: "Volunteer + Supporter Production",
        body: "Volunteers and supporters need different apparel. We can produce both in parallel — volunteer shirts with official colors and supporter merch with campaign graphics.",
      },
      {
        icon: "Package",
        title: "Wide Range of Campaign Products",
        body: "Shirts, hoodies, hats, totes, stickers, yard signs — we produce a full range of campaign merchandise so you don't have to coordinate multiple suppliers.",
      },
      {
        icon: "Globe",
        title: "Shipping to Multiple Campaign Offices",
        body: "State-wide or national campaigns need apparel in multiple locations. We can ship to multiple campaign offices, warehouses, or rally venues.",
      },
      {
        icon: "Ruler",
        title: "Wide Size Range for Volunteer Bases",
        body: "Volunteers come in all sizes. We produce a full size range from XS to 4XL so every volunteer gets a proper-fitting shirt for the campaign.",
      },
      {
        icon: "MessageCircle",
        title: "Confidential Production for Campaigns",
        body: "Campaigns often have confidential messaging. We respect confidentiality on designs, messaging, and shipping destinations until launch.",
      },
    ],
  },
  perfectFor: {
    eyebrow: "Perfect For",
    title: "Anyone Running a Political Campaign",
    items: [
      "Federal election campaigns",
      "State and local campaigns",
      "Political action committees (PACs)",
      "Advocacy organizations",
      "Political parties",
      "Issue advocacy groups",
    ],
  },
  faqTitle: "Political Campaign Apparel Questions, Answered",
  faqSubtitle: "Common questions from campaign managers, field directors, and political consultants.",
  faqs: [
    {
      q: "How fast can you produce campaign apparel?",
      a: "Standard production is 20–30 days. Rush production is available for tight election windows — typically 10–15 days for smaller orders. Contact us for rush availability.",
    },
    {
      q: "Can you produce both volunteer shirts and supporter merch?",
      a: "Yes. We can produce different designs, colors, and quantities in one production run — official volunteer apparel and supporter merch handled together.",
    },
    {
      q: "Can you ship to multiple campaign offices?",
      a: "Yes. We can split shipments to multiple locations — campaign offices, regional warehouses, or rally venues. DDP options available to most US locations.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes. We ship worldwide with DDP options to the US, UK, EU and Australia. We have experience shipping to international political and advocacy campaigns.",
    },
  ],
  ctaTitle: "Have an Upcoming Campaign?",
  ctaBody:
    "Send your campaign details, apparel needs, and timeline. We will reply with a quote, sample plan, and a production timeline that hits your election window.",
  ctaButton: "Plan Your Campaign Apparel",
  ogImage: "/og/og-industry.webp",
  // 2026-09-13 (R59): per-industry HowTo (5-step buyer journey for
  // political campaign managers: from campaign timeline + design
  // to rush DDP delivery at the campaign office or rally
  // venue). Lifts the page to HowTo rich result eligibility for
  // "how to order campaign shirts" / "how to make political merch"
  // PAA queries.
  howto: {
    name: "How we produce custom political campaign apparel for elections, parties and PACs",
    description:
      "Election-calendar production: from the campaign manager's first quote request to rush DDP delivery of volunteer shirts, supporter merch, and rally apparel at the campaign office or rally venue.",
    totalTime: "P18D",
    steps: [
      {
        name: "Send campaign timeline + design",
        text: "Provide the election date, total quantity, and a breakdown by role (volunteers, supporters, rally staff, donors). We free-check the print file and reply within 1 business day with a per-role quote and a rush timeline if needed.",
      },
      {
        name: "Approve artwork + sample (optional)",
        text: "We send a 3D mockup on the actual garment. Pre-production sample costs $25–60 per piece, 5–7 day turnaround, refundable on bulk orders of 100+ pieces. Most campaigns skip samples and go straight to bulk when colors match the brand guide.",
      },
      {
        name: "Rush production (10–25 days)",
        text: "Sublimation / DTG / screen print starts once artwork is locked. We cut, sew and print every piece in-house at our Yiwu factory — volunteer shirts, supporter merch, rally apparel, all under one production run. Rush available for tight election windows.",
      },
      {
        name: "Confidential packing",
        text: "AQL 2.5 inspection, then packed per your campaign plan: by state, by region, by campaign office, or by rally venue. We respect pre-launch confidentiality on every order — no public photos, no social media until you say so.",
      },
      {
        name: "DDP delivery to multiple campaign offices",
        text: "DDP shipping to 100+ countries (US, UK, EU, AU, CA). We can split shipments to multiple state offices, regional warehouses, or rally venues. Most campaigns have apparel in hand 7–14 days before the first rally or door-knock.",
      },
    ],
  },
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return <CustomerProfilePage data={data} />;
}
