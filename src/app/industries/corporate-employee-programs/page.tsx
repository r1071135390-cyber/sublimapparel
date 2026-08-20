import type { Metadata } from "next";
import {
  Building,
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
  slug: "/industries/corporate-employee-programs/",
  metaTitle: "Corporate Uniform Manufacturer | Employee Apparel & Branded Workwear",
  metaDescription:
    "Corporate uniform manufacturer for employee apparel and branded workwear. Custom polo shirts, office apparel, and company uniforms with reliable production and global delivery.",
  keywords: [
    "corporate uniform manufacturer",
    "employee apparel supplier",
    "custom company uniforms",
    "branded workwear",
    "office apparel",
    "company polo shirts",
    "employee shirts",
    "corporate clothing",
    "staff uniforms",
  ],
  badge: "For Corporate & Employee Programs",
  h1: "Corporate Uniforms & Employee Apparel for Growing Companies",
  heroTitle: "Employee Apparel That Makes Your Team Look Professional",
  heroBody:
    "When your team looks professional, your company looks professional.\n\nWe manufacture custom corporate uniforms and employee apparel for growing companies, office teams, retail operations, and service businesses worldwide.",
  primaryCta: "Get a Corporate Quote",
  secondaryCta: "See Corporate Apparel",
  stats: [
    { value: "100+", label: "Companies Served" },
    { value: "500+", label: "Pieces Per Order" },
    { value: "MOQ 30", label: "Per Design" },
    { value: "DDP", label: "Worldwide" },
  ],
  solutionsSection: {
    eyebrow: "Solutions",
    title: "Corporate Apparel Solutions",
    subtitle: "Apparel that works for every employee — from the office to the warehouse to the storefront.",
    sections: [
      {
        title: "Office Apparel",
        icon: "Briefcase",
        items: [
          { name: "Polo Shirts", details: [] },
          { name: "Button-Down Shirts", details: [] },
          { name: "Office T-Shirts", details: [] },
          { name: "Branded Sweatshirts", details: [] },
        ],
      },
      {
        title: "Service & Retail Uniforms",
        icon: "Users",
        items: [
          { name: "Service Staff Apparel", details: [] },
          { name: "Retail Uniforms", details: [] },
          { name: "Hospitality Clothing", details: [] },
          { name: "Restaurant & Café Staff Apparel", details: [] },
        ],
      },
      {
        title: "Employee Programs",
        icon: "Award",
        items: [
          { name: "Welcome Kits for New Hires", details: [] },
          { name: "Branded Hoodies for Teams", details: [] },
          { name: "Team Building Apparel", details: [] },
          { name: "Company Event Apparel", details: [] },
        ],
      },
    ],
  },
  whySection: {
    eyebrow: "Why Companies Choose Us",
    title: "Four Reasons HR and Operations Teams Stay With Us",
    features: [
      {
        icon: "Calendar",
        title: "Scheduled Production for Reorders",
        body: "Employee apparel isn't a one-off purchase. We support scheduled reorders so your team always has fresh uniforms as the company grows or seasons change.",
      },
      {
        icon: "Ruler",
        title: "Wide Size Range & Fit Consistency",
        body: "We produce a wide size range from XS to 4XL, and keep size consistency across reorders so employees can keep the same fit they liked before.",
      },
      {
        icon: "Layers",
        title: "Multiple Roles, One Order",
        body: "We can produce different uniform styles for different teams in one consolidated production run — for example, polos for office staff and T-shirts for warehouse staff.",
      },
      {
        icon: "Package",
        title: "Apparel Types for Every Need",
        body: "T-shirts, polo shirts, sweatshirts, jackets, hats, work shirts — we can be your single supplier for the entire uniform program.",
      },
      {
        icon: "Globe",
        title: "Direct Factory Pricing & Global Delivery",
        body: "Working with the actual manufacturer means clearer pricing and better margins. DDP shipping available to most major markets.",
      },
      {
        icon: "MessageCircle",
        title: "Account Manager for Your Company",
        body: "Your company gets a dedicated account manager who knows your brand guidelines, size charts, and reorder cycles — not a new contact every time.",
      },
    ],
  },
  perfectFor: {
    eyebrow: "Perfect For",
    title: "Companies That Need Apparel for Real Teams",
    items: [
      "Office-based businesses",
      "Retail and hospitality companies",
      "Service businesses",
      "Multi-location brands",
      "Startups and growing companies",
      "Franchise operations",
    ],
  },
  faqTitle: "Corporate Apparel Questions, Answered",
  faqSubtitle: "Common questions from HR, operations and procurement teams.",
  faqs: [
    {
      q: "Can we reorder the same uniform design later?",
      a: "Yes. We keep your design files and color specs on file so reorders are quick and the apparel looks the same as the original order.",
    },
    {
      q: "Do you offer polo shirts, T-shirts and other styles?",
      a: "Yes. We can produce a full uniform range from one supplier — T-shirts, polos, button-down shirts, sweatshirts, jackets, and hats.",
    },
    {
      q: "Can different teams have different apparel?",
      a: "Yes. We can produce different uniform styles for different teams or locations in a single production run. Just send us a breakdown.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes. We ship worldwide with DDP (duty paid) options to the US, UK, EU and Australia. Multi-location delivery can be arranged.",
    },
  ],
  ctaTitle: "Need Corporate Apparel for Your Team?",
  ctaBody:
    "Share your company details and rough order quantity. We will reply with a quote, a sample plan, and a clear production timeline.",
  ctaButton: "Get a Custom Quote",
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return <CustomerProfilePage data={data} />;
}
