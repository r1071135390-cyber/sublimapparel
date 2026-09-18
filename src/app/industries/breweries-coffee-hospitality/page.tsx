import type { Metadata } from "next";
import {
  Coffee,
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
import { PageGeoAnswerBlock } from "@/components/geo-answer-block";

export const dynamic = "force-static";

const data: CustomerProfileData = {
  slug: "/industries/breweries-coffee-hospitality/",
  metaTitle: "Brewery, Coffee Shop & Bar Apparel Manufacturer",
  // 2026-09-11 push (Round 5): tightened from 170 → 158 chars to fit Google's
  // 160-char SERP cap.
  metaDescription:
    "Hospitality apparel manufacturer for breweries, coffee shops, bars, and restaurants. Staff uniforms, branded merchandise, and venue apparel with flexible MOQ.",
  keywords: [
    "brewery shirts",
    "restaurant staff shirts",
    "coffee shop apparel",
    "brewery apparel",
    "coffee shop uniforms",
    "hospitality clothing",
    "barista aprons",
    "server uniforms",
    "bartender shirts",
    "brewery staff uniforms",
    "cafe uniforms",
    "bar uniforms",
    "brewery merchandise",
    "coffee shop shirts",
    "restaurant uniforms",
    "bar staff apparel",
    "craft brewery merch",
    "coffee branded apparel",
    "hospitality polos",
    "custom brewery shirts",
    "custom coffee shop apparel",
    "bartender apron",
    "restaurant server shirts",
    "barista uniform",
    "taproom apparel",
    "roastery merchandise",
  ],
  badge: "For Breweries, Coffee & Hospitality",
  hero: "/product-hero-products.webp",
  h1: "Custom Apparel for Breweries, Coffee Shops & Hospitality Venues",
  heroTitle: "Hospitality Apparel That Builds Your Brand",
  heroBody:
    "Hospitality venues live or die on atmosphere. Branded apparel helps your staff look professional and your customers wear your brand outside the venue.\n\nWe manufacture custom hospitality apparel for breweries, coffee shops, bars, restaurants, and hospitality venues worldwide.",
  primaryCta: "Get a Hospitality Quote",
  secondaryCta: "See Hospitality Apparel",
  stats: [
    { value: "80+", label: "Venues Served" },
    { value: "200+", label: "Pieces Per Order" },
    { value: "MOQ 30", label: "Per Design" },
    { value: "DDP", label: "Worldwide" },
  ],
  solutionsSection: {
    eyebrow: "Solutions",
    title: "Hospitality Apparel Solutions",
    subtitle: "Apparel for the people who make your venue run, and the merch your customers take home.",
    sections: [
      {
        title: "Brewery & Taproom Apparel",
        icon: "Coffee",
        items: [
          { name: "Taproom Staff Shirts", details: [] },
          { name: "Bartender Apparel", details: [] },
          { name: "Brewery Event Merchandise", details: [] },
          { name: "Beer Release Apparel", details: [] },
        ],
      },
      {
        title: "Coffee Shop & Café Apparel",
        icon: "Briefcase",
        items: [
          { name: "Barista Uniforms", details: [] },
          { name: "Café Staff Shirts", details: [] },
          { name: "Coffee Shop Merchandise", details: [] },
          { name: "Loyalty Program Apparel", details: [] },
        ],
      },
      {
        title: "Hospitality & Restaurant Apparel",
        icon: "Users",
        items: [
          { name: "Restaurant Server Apparel", details: [] },
          { name: "Bar Staff Clothing", details: [] },
          { name: "Hotel Staff Uniforms", details: [] },
          { name: "Catering Team Apparel", details: [] },
        ],
      },
    ],
  },
  whySection: {
    eyebrow: "Why Venues Choose Us",
    title: "Built Around the Way Hospitality Actually Orders",
    features: [
      {
        icon: "Ruler",
        title: "Wide Size Range for Diverse Teams",
        body: "Hospitality teams include all sizes and roles. We produce a full size range from XS to 4XL, and can mix sizes in a single order with clear size labels.",
      },
      {
        icon: "Layers",
        title: "Flexible Quantities",
        body: "From small coffee shops ordering 30 shirts to breweries ordering thousands for an annual event, we support both small and large orders.",
      },
      {
        icon: "Calendar",
        title: "Event-Based Production",
        body: "Beer releases, anniversaries, festivals, seasonal menus — every venue has events. We plan production backwards from your event date.",
      },
      {
        icon: "Package",
        title: "Staff Uniforms + Customer Merchandise",
        body: "We produce staff uniforms, customer-facing apparel, and venue merchandise from one factory. Different styles, one order.",
      },
      {
        icon: "Globe",
        title: "Direct Factory Pricing",
        body: "Hospitality margins are tight. Our direct-factory pricing lets you invest in branded apparel without breaking the budget.",
      },
      {
        icon: "MessageCircle",
        title: "Reorder Simplicity",
        body: "When staff grows or you need to refresh the look, reordering is easy. We keep your design files and color specs on file.",
      },
    ],
  },
  perfectFor: {
    eyebrow: "Perfect For",
    title: "Hospitality Brands That Want to Stand Out",
    items: [
      "Craft breweries",
      "Coffee shops and roasters",
      "Bars and taprooms",
      "Restaurants and cafés",
      "Hospitality groups",
      "Catering companies",
    ],
  },
  faqTitle: "Hospitality Apparel Questions, Answered",
  faqSubtitle: "Common questions from venue owners and hospitality managers.",
  faqs: [
    {
      q: "Can you produce both staff uniforms and customer merchandise?",
      a: "Yes. We can produce staff uniforms (polos, work shirts, aprons-style apparel) and customer-facing merchandise (T-shirts, hats, hoodies) in one production run.",
    },
    {
      q: "What is the minimum order quantity?",
      a: "For small venues we typically start at 30 pieces per design. Larger venues and event-based orders (1,000+) get better unit pricing.",
    },
    {
      q: "Can you produce apparel for special events?",
      a: "Yes. Beer releases, anniversaries, festivals, and seasonal events are common orders. We can plan production around your event date.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes. We ship worldwide with DDP options to the US, UK, EU and Australia. We can deliver to your venue or warehouse.",
    },
  ],
  ctaTitle: "Need Apparel for Your Venue?",
  ctaBody:
    "Send your venue name, your apparel needs, and a rough quantity. We will reply with a quote, sample plan and production timeline.",
  ctaButton: "Get a Quote",
  ogImage: "/og/og-industry.webp",
  // 2026-09-13 (R59): HowTo — brewery / coffee / hospitality branded apparel.
  howto: {
    name: "How breweries, coffee shops, and hospitality brands order custom apparel",
    description:
      "Five-step workflow for venue-branded apparel: staff uniforms, merch, retail co-packs. DDP to your address or each venue individually.",
    totalTime: "P25D",
    steps: [
      {
        name: "Share brand mark + venues list",
        text: "Send the logo (AI/PDF preferred), color palette, and a list of venues if shipping to multiple addresses. We free-check the file and confirm it prints clean on cotton tees, hoodies, caps, and aprons.",
      },
      {
        name: "Pick fabric + print method",
        text: "Most brewery / coffee / hospitality buyers mix 100% cotton (DTG or DTF for chest-area logos) with 50/50 poly-cotton (full-color sublimation for richer logos). We send swatches and printed color cards for free.",
      },
      {
        name: "Sample run (optional)",
        text: "Optional 5–10 piece sample run so you can check hand feel and color on the actual garments. 5–7 day lead time, $25–60 per piece, refundable on bulk orders of 100+ pieces.",
      },
      {
        name: "Bulk production + per-venue packing",
        text: "15–25 day bulk run, polybagged and tagged. For multi-venue buyers we pack per-venue — each carton labeled with the venue name and the staff/merch breakdown — so the venues can unpack and distribute without sorting.",
      },
      {
        name: "DDP shipping to one address or many",
        text: "Ship to a single warehouse, or DDP each venue's address. US destinations route through our Fontana, CA 3PL for 2–5 day domestic delivery. International venues get DDP to 100+ countries with duties included.",
      },
    ],
  },
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return (
    <>
      <PageGeoAnswerBlock path="/industries/breweries-coffee-hospitality/" />
      <CustomerProfilePage data={data} />
    </>
  );
}

