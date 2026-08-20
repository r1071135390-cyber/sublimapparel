import type { Metadata } from "next";
import {
  Megaphone,
  Shirt,
  Users,
  Calendar,
  Globe,
  MessageCircle,
  Ruler,
  Layers,
  Package,
  Briefcase,
  Award,
  Sparkles,
} from "lucide-react";
import { buildMetadata, type CustomerProfileData } from "@/lib/customer-profile-data";
import { CustomerProfilePage } from "@/components/customer-profile-template";

export const dynamic = "force-static";

const data: CustomerProfileData = {
  slug: "/industries/promotional-marketing-agencies/",
  metaTitle: "Promotional Apparel Manufacturer for Agencies",
  metaDescription:
    "Promotional apparel manufacturer for marketing and promotional agencies. Branded merchandise, campaign apparel and client gifts with flexible quantities and reliable delivery.",
  keywords: [
    "promotional apparel manufacturer",
    "marketing agency apparel",
    "branded merchandise",
    "campaign apparel",
    "client gift apparel",
    "promotional products",
    "agency merchandise",
    "swag apparel",
    "company swag",
  ],
  badge: "For Promotional & Marketing Agencies",
  hero: "/design-workspace.webp",
  h1: "Promotional Apparel Manufacturer for Marketing & Promotional Agencies",
  heroTitle: "Branded Apparel That Gets Your Clients Noticed",
  heroBody:
    "Marketing agencies need apparel that represents client brands, not just their own. Branded merchandise is a high-touch, high-impact part of any campaign.\n\nWe manufacture custom promotional apparel for marketing agencies, promotional product companies, and brand activation firms worldwide.",
  primaryCta: "Get an Agency Quote",
  secondaryCta: "See Promo Apparel",
  stats: [
    { value: "60+", label: "Agencies Served" },
    { value: "5k+", label: "Pieces Per Campaign" },
    { value: "20 days", label: "Lead Time" },
    { value: "DDP", label: "Worldwide" },
  ],
  solutionsSection: {
    eyebrow: "Solutions",
    title: "Promotional Apparel Solutions",
    subtitle: "From campaign launches to client gifts, we make branded apparel that...",
    sections: [
      {
        title: "Campaign Apparel",
        icon: "Megaphone",
        items: [
          { name: "Product Launch Apparel", details: [] },
          { name: "Brand Activation Merchandise", details: [] },
          { name: "Marketing Campaign Tees", details: [] },
          { name: "Promotional Event Apparel", details: [] },
        ],
      },
      {
        title: "Branded Merchandise",
        icon: "Sparkles",
        items: [
          { name: "Client Gift Apparel", details: [] },
          { name: "Corporate Gift Hoodies", details: [] },
          { name: "Premium Branded Apparel", details: [] },
          { name: "Custom Logo Apparel", details: [] },
        ],
      },
      {
        title: "Agency Team Apparel",
        icon: "Briefcase",
        items: [
          { name: "Agency Team Apparel", details: [] },
          { name: "Event Staff Clothing", details: [] },
          { name: "Client Meeting Apparel", details: [] },
          { name: "Agency Brand Merchandise", details: [] },
        ],
      },
    ],
  },
  whySection: {
    eyebrow: "Why Marketing Agencies Choose Us",
    title: "Three Things That Make Agency Apparel Easier With Us",
    features: [
      {
        icon: "Layers",
        title: "Multiple Client Brands, One Factory",
        body: "Agencies often need to produce apparel for multiple clients at once. We can manage multiple brands, designs, and timelines in parallel without confusion.",
      },
      {
        icon: "Package",
        title: "Wide Range of Apparel Products",
        body: "T-shirts, hoodies, polo shirts, hats, totes, jackets — we produce a full range so agencies can build a complete branded apparel package per client.",
      },
      {
        icon: "Calendar",
        title: "Campaign Deadline Management",
        body: "Campaigns have hard launch dates. We help plan production backwards from your campaign launch so apparel arrives before the campaign goes live.",
      },
      {
        icon: "Globe",
        title: "International Shipping to Multiple Destinations",
        body: "If a campaign spans multiple countries, we can ship to multiple destinations. DDP options available to the US, UK, EU and Australia.",
      },
      {
        icon: "Ruler",
        title: "Wide Size Range",
        body: "Client gifting and promotional orders include a wide range of sizes. We produce a full size range from XS to 4XL.",
      },
      {
        icon: "MessageCircle",
        title: "Direct Communication for Agencies",
        body: "Your account manager handles quotes, design approvals, production updates and shipping. One point of contact for all your client apparel needs.",
      },
    ],
  },
  perfectFor: {
    eyebrow: "Perfect For",
    title: "Agencies That Need Apparel for Multiple Clients",
    items: [
      "Marketing agencies",
      "Promotional product companies",
      "Brand activation firms",
      "Event marketing agencies",
      "Public relations agencies",
      "Creative agencies",
    ],
  },
  faqTitle: "Promotional Apparel Questions, Answered",
  faqSubtitle: "Common questions from agency account managers and creative directors.",
  faqs: [
    {
      q: "Can you handle multiple client brands at the same time?",
      a: "Yes. We routinely produce apparel for multiple client brands in parallel. Each brand has its own design, color spec, packaging and shipping requirement.",
    },
    {
      q: "What is the minimum order quantity?",
      a: "For promotional apparel we typically start at 30 pieces per design. Smaller client gift orders can be done with a higher unit price.",
    },
    {
      q: "Can you produce premium branded apparel for client gifts?",
      a: "Yes. We can produce higher-end apparel with custom labels, special packaging, and premium materials. Suitable for executive gifts and corporate gifting.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes. We ship worldwide with DDP options to the US, UK, EU and Australia. We can ship to multiple destinations for multi-country campaigns.",
    },
  ],
  ctaTitle: "Need Apparel for an Upcoming Campaign?",
  ctaBody:
    "Send your campaign details, client brand info, and rough quantity. We will reply with a quote, sample plan and production timeline.",
  ctaButton: "Plan Your Campaign",
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return <CustomerProfilePage data={data} />;
}
