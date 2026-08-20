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
  metaDescription:
    "Political campaign apparel manufacturer for campaigns, parties and political action committees. Custom yard signs, campaign shirts, hats and rally merchandise with fast production.",
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
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return <CustomerProfilePage data={data} />;
}
