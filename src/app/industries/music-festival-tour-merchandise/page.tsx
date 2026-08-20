import type { Metadata } from "next";
import {
  Music,
  Shirt,
  DollarSign,
  Users,
  Globe,
  MessageCircle,
  Layers,
  Calendar,
  Sparkles,
  Ruler,
  Package,
  Briefcase,
} from "lucide-react";
import { buildMetadata, type CustomerProfileData } from "@/lib/customer-profile-data";
import { CustomerProfilePage } from "@/components/customer-profile-template";

export const dynamic = "force-static";

const data: CustomerProfileData = {
  slug: "/industries/music-festival-tour-merchandise/",
  metaTitle: "Tour Merch Manufacturer | Band Tees, Festival Apparel & Tour Merchandise",
  metaDescription:
    "Custom tour merchandise manufacturer for musicians, festivals and entertainment brands. Band T-shirts, festival apparel and event merchandise with flexible quantities.",
  keywords: [
    "tour merchandise manufacturer",
    "band t shirts supplier",
    "festival merch supplier",
    "custom music merchandise",
    "concert apparel",
    "tour apparel manufacturer",
    "festival t shirts",
    "band merchandise",
    "concert merchandise",
  ],
  badge: "For Music, Festival & Tour Merchandise",
  h1: "Custom Tour Merchandise for Musicians, Festivals & Entertainment Brands",
  heroTitle: "Tour Merchandise That Fans Actually Want to Wear",
  heroBody:
    "Tour merchandise is more than a T-shirt. It is a memory, a brand impression, and a moment a fan keeps for years.\n\nWe manufacture custom tour merch and festival apparel for musicians, bands, festivals, and entertainment brands worldwide.",
  primaryCta: "Start Your Merch Project",
  secondaryCta: "See Merch Examples",
  stats: [
    { value: "100+", label: "Bands & Festivals" },
    { value: "10k+", label: "Shirts Produced" },
    { value: "20 days", label: "Lead Time" },
    { value: "DDP", label: "Global Shipping" },
  ],
  solutionsSection: {
    eyebrow: "Solutions",
    title: "Tour & Festival Merchandise We Produce",
    subtitle: "From indie artists to festival main stages, we make merch that fans want to wear long after the lights go down.",
    sections: [
      {
        title: "Tour T-Shirts",
        icon: "Music",
        items: [
          { name: "Band Tour Shirts", details: [] },
          { name: "Album Merchandise", details: [] },
          { name: "Tour Date Shirts", details: [] },
          { name: "Tour Crew Apparel", details: [] },
        ],
      },
      {
        title: "Festival Apparel",
        icon: "Sparkles",
        items: [
          { name: "Festival T-Shirts", details: [] },
          { name: "Festival Hoodies", details: [] },
          { name: "Festival Souvenirs", details: [] },
          { name: "Event Merchandise", details: [] },
        ],
      },
      {
        title: "Tour Support Apparel",
        icon: "Briefcase",
        items: [
          { name: "Crew Shirts", details: [] },
          { name: "Tour Staff Apparel", details: [] },
          { name: "Tour Manager Gear", details: [] },
          { name: "Production Team Clothing", details: [] },
        ],
      },
    ],
  },
  whySection: {
    eyebrow: "Why Artists & Festivals Choose Us",
    title: "Four Reasons We Work for the Entertainment Industry",
    features: [
      {
        icon: "Layers",
        title: "Small to Mid-Run Production",
        body: "Independent artists and small festivals often need 50–500 pieces, not 10,000. Our minimums are friendly to small-batch merch, with unit pricing that scales up for larger drops.",
      },
      {
        icon: "DollarSign",
        title: "Pricing That Leaves Margin",
        body: "We are a direct factory in Yiwu, not a reseller. That means independent artists and labels can actually make money on merch instead of breaking even on T-shirts.",
      },
      {
        icon: "Calendar",
        title: "Tour & Festival Date Management",
        body: "Tour merch typically has fixed ship-to dates. We help plan production backwards from venue arrival dates so merch is on the merch table when the lights go down.",
      },
      {
        icon: "Package",
        title: "Apparel, Stickers & Accessories",
        body: "We produce T-shirts, hoodies, tank tops, hats, tote bags, and other apparel pieces. Custom packaging and labeling available for premium merch drops.",
      },
      {
        icon: "Globe",
        title: "International Shipping & Logistics",
        body: "We ship to US, UK, EU, and Australia with DDP options, so the merch can be delivered directly to warehouses, venues, or fulfillment centers.",
      },
      {
        icon: "MessageCircle",
        title: "Clear Communication for Busy Teams",
        body: "Tour managers, label operations, and festival producers have enough on their plate. We provide one English-speaking coordinator for all updates.",
      },
    ],
  },
  perfectFor: {
    eyebrow: "Perfect For",
    title: "Anyone Putting Merch on a Table",
    items: [
      "Independent musicians",
      "Bands on tour",
      "Music festivals",
      "Record labels",
      "Entertainment brands",
      "Tour managers",
    ],
  },
  faqTitle: "Tour & Festival Merch Questions, Answered",
  faqSubtitle: "Common questions from artists, managers and festival producers.",
  faqs: [
    {
      q: "What is the minimum order quantity?",
      a: "We support small runs. For T-shirts, we typically start at 30–50 pieces per design. This makes it realistic for independent artists and small labels to produce merch profitably.",
    },
    {
      q: "Can you produce merch for different tour dates?",
      a: "Yes. We can produce different designs for different legs of a tour, different cities, or different festivals — all coordinated under one production run.",
    },
    {
      q: "Do you handle shipping to multiple destinations?",
      a: "Yes. We can ship to a single warehouse, to multiple venues, or to fulfillment centers worldwide. DDP shipping available to the US, UK, EU and Australia.",
    },
    {
      q: "How fast can you turn around tour merch?",
      a: "Production typically takes 20–30 days depending on quantity and design complexity. Rush options are available for tight tour schedules.",
    },
  ],
  ctaTitle: "Have a Tour or Festival Coming Up?",
  ctaBody:
    "Send your design and tour dates. We will reply with a production plan, a clear quote, and options to fit your merch budget.",
  ctaButton: "Start Your Merch Project",
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return <CustomerProfilePage data={data} />;
}
