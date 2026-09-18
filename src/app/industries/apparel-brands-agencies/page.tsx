import type { Metadata } from "next";
import {
  Briefcase,
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
  Trophy,
} from "lucide-react";
import { buildMetadata, type CustomerProfileData } from "@/lib/customer-profile-data";
import { CustomerProfilePage } from "@/components/customer-profile-template";
import { PageGeoAnswerBlock } from "@/components/geo-answer-block";

export const dynamic = "force-static";

const data: CustomerProfileData = {
  slug: "/industries/apparel-brands-agencies/",
  metaTitle: "Apparel Manufacturing Partner for Brands & Agencies",
  // 2026-09-11 push (Round 5): tightened from 164 → 144 chars to fit Google's
  // 160-char SERP cap.
  metaDescription:
    "Apparel manufacturing partner for brands, agencies, and designers. Private label, ODM, and custom manufacturing with flexible MOQ and reliable delivery.",
  keywords: [
    "apparel manufacturer for brands",
    "clothing production partner",
    "private label apparel",
    "custom clothing brand",
    "apparel brand manufacturing",
    "clothing line manufacturer",
    "fashion brand production",
    "apparel oem",
    "custom apparel manufacturer",
    "brand apparel production",
    "fashion oem",
    "startup clothing brand",
    "boutique clothing manufacturer",
    "custom fashion brand",
    "apparel brand partner",
    "white label apparel",
    "custom clothing line",
    "private label clothing",
    "fashion manufacturing",
    "brand apparel",
    "apparel production services",
    "custom clothing manufacturer",
    "clothing brand partner",
    "fashion brand manufacturer",
    "apparel oem factory",
    "streetwear manufacturer",
  ],
  badge: "For Apparel Brands & Agencies",
  hero: "/product-lineup.webp",
  h1: "Apparel Manufacturing Partner for Brands, Agencies & Designers",
  heroTitle: "Reliable Manufacturing for Apparel Brands & Agencies",
  heroBody:
    "Apparel brands need more than a factory — they need a manufacturing partner that understands design intent, brand standards, and timeline discipline.\n\nWe work with apparel brands, agencies, and designers to produce private label and custom apparel with flexible MOQ and consistent quality.",
  primaryCta: "Discuss Your Brand Project",
  secondaryCta: "See Manufacturing Capabilities",
  stats: [
    { value: "50+", label: "Brand Partners" },
    { value: "MOQ 50", label: "Per Design" },
    { value: "30 days", label: "Lead Time" },
    { value: "ODM/OEM", label: "Services" },
  ],
  solutionsSection: {
    eyebrow: "Solutions",
    title: "Manufacturing Services for Apparel Brands",
    subtitle: "From private label basics to full ODM design support, we work with brands at every stage.",
    sections: [
      {
        title: "Private Label Production",
        icon: "Briefcase",
        items: [
          { name: "Custom Apparel Manufacturing", details: [] },
          { name: "Private Label Apparel", details: [] },
          { name: "White Label Solutions", details: [] },
          { name: "Brand-Owned Designs", details: [] },
        ],
      },
      {
        title: "ODM Services",
        icon: "Award",
        items: [
          { name: "Original Design Manufacturing", details: [] },
          { name: "Custom Apparel Development", details: [] },
          { name: "Sample Development", details: [] },
          { name: "Tech Pack Support", details: [] },
        ],
      },
      {
        title: "Apparel Agency Support",
        icon: "Users",
        items: [
          { name: "Multi-Brand Manufacturing", details: [] },
          { name: "Seasonal Collection Production", details: [] },
          { name: "Brand Collaboration Apparel", details: [] },
          { name: "Limited Edition Drops", details: [] },
        ],
      },
    ],
  },
  whySection: {
    eyebrow: "Why Brands & Agencies Choose Us",
    title: "Four Things That Make Us a Reliable Manufacturing Partner",
    features: [
      {
        icon: "Ruler",
        title: "Size & Fit Consistency Across Reorders",
        body: "Brands cannot afford to have their signature fit change between orders. We keep consistent size specs and grading rules so reorders match the original.",
      },
      {
        icon: "Layers",
        title: "Flexible MOQ for Growing Brands",
        body: "Growing brands often need smaller first runs to test the market. We support low MOQ on first orders and scale up as your brand grows.",
      },
      {
        icon: "Calendar",
        title: "Production Schedule Discipline",
        body: "Brand launches have hard dates. We build a production schedule that includes sampling, bulk production, and shipping — and we hit those dates.",
      },
      {
        icon: "Package",
        title: "Wide Product Range from One Factory",
        body: "T-shirts, hoodies, polos, jackets, performance wear, and accessories. We can be your single manufacturing partner across your entire product line.",
      },
      {
        icon: "Globe",
        title: "Export Experience for Global Brands",
        body: "We ship to US, UK, EU, AU, and other markets with DDP options. We understand export documentation, customs requirements, and international logistics.",
      },
      {
        icon: "MessageCircle",
        title: "Direct Communication With the Factory",
        body: "No middlemen. You work directly with our production team and account manager, which means faster decisions and fewer miscommunications.",
      },
    ],
  },
  perfectFor: {
    eyebrow: "Perfect For",
    title: "Apparel Brands at Every Stage",
    items: [
      "Emerging apparel brands",
      "Established independent labels",
      "Apparel agencies",
      "Fashion designers",
      "Brand collaboration projects",
      "Direct-to-consumer brands",
    ],
  },
  faqTitle: "Brand & Agency Manufacturing Questions, Answered",
  faqSubtitle: "Common questions from brand founders, designers, and agency operations.",
  faqs: [
    {
      q: "What is the minimum order quantity?",
      a: "For private label apparel we typically start at 50 pieces per design for first orders. Larger orders get better unit pricing. We can discuss lower MOQ for sample runs.",
    },
    {
      q: "Can you help with design and tech pack development?",
      a: "Yes. We offer ODM services including sample development and tech pack support. If you have a design idea but not a tech pack, we can help formalize it for production.",
    },
    {
      q: "Can you maintain consistent sizing across reorders?",
      a: "Yes. We keep your size specs and grading rules on file so reorders match the fit of the original production. Consistency is critical for brand reputation.",
    },
    {
      q: "Do you handle international shipping?",
      a: "Yes. We ship worldwide with DDP options to the US, UK, EU and Australia. We can ship to your warehouse, fulfillment center, or directly to retail customers.",
    },
  ],
  ctaTitle: "Looking for a Manufacturing Partner?",
  ctaBody:
    "Send your brand details, product type, and rough order volume. We will reply with a sample plan, a production timeline, and a clear quote.",
  ctaButton: "Discuss Your Brand Project",
  ogImage: "/og/og-industry.webp",
  // 2026-09-13 (R59): HowTo — apparel brand private label / white label production.
  howto: {
    name: "How we help apparel brands launch a private-label collection",
    description:
      "Six-step process for new and scaling apparel brands: NDA, pattern, sample, bulk, white-label shipping.",
    totalTime: "P60D",
    steps: [
      {
        name: "Sign mutual NDA",
        text: "We sign a mutual NDA before any pattern, grading, or branded label work. We also lock the brand's color palette, fabric library, and grading specs into a private project folder on our internal system.",
      },
      {
        name: "Develop patterns + tech-pack",
        text: "Send your tech-pack or sample garment. We grade for 6 sizes (XS–2XL by default, custom grading on request), confirm measurements within 1 cm, and lock the pattern under your name.",
      },
      {
        name: "Pre-production sample (5–7 days)",
        text: "Sample run of 1–5 pieces so you can check fit, hand feel, and color. Sample cost $25–60 per piece, fully refundable on bulk orders of 200+ pieces. Revisions unlimited until you sign off.",
      },
      {
        name: "Bulk production (15–25 days)",
        text: "Bulk cut-and-sew on your locked pattern, full-sublimation or DTG depending on fabric. Woven labels, hang tags, and polybag inserts printed under your brand. The first PO is typically 100–300 pieces per style.",
      },
      {
        name: "White-label packing + blind dropship",
        text: "Carton marks, packing slips, and invoices all carry your brand. No SublimApparel name on the outward packaging. Dropship to your end customer with a custom packing slip, or bulk to your 3PL.",
      },
      {
        name: "DDP shipping or domestic fulfillment",
        text: "DDP to 100+ countries for international buyers. US-bound orders can route through our Fontana, CA 3PL for 2–5 day domestic delivery. Re-orders can be released from stock within 48 hours of artwork confirmation.",
      },
    ],
  },
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return (
    <>
      <PageGeoAnswerBlock path="/industries/apparel-brands-agencies/" />
      <CustomerProfilePage data={data} />
    </>
  );
}

