import type { Metadata } from "next";
import {
  Tv,
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
  slug: "/industries/trade-shows-display/",
  metaTitle: "Trade Show Apparel & Booth Staff Shirts",
  // 2026-09-11 push (Round 5): tightened from 176 → 152 chars to fit Google's
  // 160-char SERP cap.
  metaDescription:
    "Trade show apparel manufacturer for booth staff, exhibitors, and event displays. Custom branded shirts, giveaways, and team uniforms with reliable production.",
  keywords: [
    "trade show shirts",
    "exhibition apparel",
    "booth shirts",
  ],
  badge: "For Trade Shows & Display",
  hero: "/fabric-hero.webp",
  h1: "Custom Apparel for Trade Shows, Exhibitions & Display Booths",
  heroTitle: "Apparel That Makes Your Booth Stand Out",
  heroBody:
    "Trade show booths live or die on visibility. Branded apparel makes your team easy to spot, your booth memorable, and your brand easier to find after the show.\n\nWe manufacture custom trade show apparel for exhibitors, booth staff, and event display teams worldwide.",
  primaryCta: "Get a Trade Show Quote",
  secondaryCta: "See Trade Show Apparel",
  stats: [
    { value: "50+", label: "Exhibitors Served" },
    { value: "1k+", label: "Pieces Per Show" },
    { value: "15 days", label: "Rush Available" },
    { value: "DDP", label: "Global Delivery" },
  ],
  solutionsSection: {
    eyebrow: "Solutions",
    title: "Trade Show Apparel Solutions",
    subtitle: "From booth staff shirts to giveaway apparel, we make sure your team and your...",
    sections: [
      {
        title: "Booth Staff Apparel",
        icon: "Tv",
        items: [
          { name: "Exhibitor Staff Shirts", details: [] },
          { name: "Booth Team Uniforms", details: [] },
          { name: "Sales Team Apparel", details: [] },
          { name: "Booth Manager Clothing", details: [] },
        ],
      },
      {
        title: "Trade Show Giveaways",
        icon: "Sparkles",
        items: [
          { name: "Booth Giveaway T-Shirts", details: [] },
          { name: "Branded Promo Apparel", details: [] },
          { name: "Lead Gift Apparel", details: [] },
          { name: "Trade Show Souvenirs", details: [] },
        ],
      },
      {
        title: "Event Display Apparel",
        icon: "Briefcase",
        items: [
          { name: "Demo Team Apparel", details: [] },
          { name: "Product Specialist Clothing", details: [] },
          { name: "Brand Ambassador Apparel", details: [] },
          { name: "Convention Team Uniforms", details: [] },
        ],
      },
    ],
  },
  whySection: {
    eyebrow: "Why Exhibitors Choose Us",
    title: "Three Things That Make Trade Show Apparel Easier",
    features: [
      {
        icon: "Calendar",
        title: "Show-Date Production Planning",
        body: "Trade shows have fixed dates. We help plan production backwards from your show opening so apparel arrives at the venue, not after the show ends.",
      },
      {
        icon: "Layers",
        title: "Flexible Quantities for Any Booth Size",
        body: "From a 2-person startup booth to a 50-person enterprise exhibit, we support any booth size with appropriate minimums and pricing.",
      },
      {
        icon: "Package",
        title: "Staff Apparel + Giveaway Apparel",
        body: "We can produce both your staff uniforms and your giveaway apparel in one consolidated production run with separate delivery if needed.",
      },
      {
        icon: "Globe",
        title: "Shipping to Trade Show Venues",
        body: "We can ship directly to trade show venues, convention centers, or your hotel/warehouse — DDP options to major US, UK, EU and Australian cities.",
      },
      {
        icon: "Ruler",
        title: "Wide Size Range for Booth Teams",
        body: "Booth staff includes people of all sizes. We produce a full size range from XS to 4XL so every team member gets a proper fit.",
      },
      {
        icon: "MessageCircle",
        title: "Rush Production for Last-Minute Shows",
        body: "Forgot to order shirts before the show? We offer rush production for tight deadlines so you don't show up to a trade show in plain clothes.",
      },
    ],
  },
  perfectFor: {
    eyebrow: "Perfect For",
    title: "Anyone Staffing or Exhibiting at a Trade Show",
    items: [
      "Exhibiting brands",
      "Trade show producers",
      "Booth design companies",
      "Event marketing teams",
      "Product launch teams",
      "Convention exhibitors",
    ],
  },
  faqTitle: "Trade Show Apparel Questions, Answered",
  faqSubtitle: "Common questions from exhibitors and event marketers.",
  faqs: [
    {
      q: "How fast can you produce trade show apparel?",
      a: "Standard production is 20–30 days. Rush production is available for tight deadlines — typically 10–15 days for smaller orders. Contact us for rush availability.",
    },
    {
      q: "Can you ship directly to a trade show venue?",
      a: "Yes. We can ship to convention centers, hotels, or warehouses. DDP options available to most major cities. We can also ship to multiple trade show destinations.",
    },
    {
      q: "Can you produce both booth staff shirts and giveaways?",
      a: "Yes. We can produce different designs, colors, and quantities in one production run — staff uniforms and giveaway apparel handled together.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes. We ship worldwide with DDP options to the US, UK, EU and Australia. We routinely ship to major convention cities like Las Vegas, Orlando, Frankfurt and London.",
    },
  ],
  ctaTitle: "Have an Upcoming Trade Show?",
  ctaBody:
    "Send your show date, booth staff size, and giveaway quantity. We will reply with a quote, sample plan, and a production timeline that hits your show date.",
  ctaButton: "Plan Your Trade Show Apparel",
  ogImage: "/og/og-industry.webp",
  // 2026-09-13 (R59): per-industry HowTo (5-step buyer journey for
  // trade show exhibitors and event marketers: from show date +
  // booth staff size to DDP delivery at the convention center or
  // booth hotel). Lifts the page to HowTo rich result
  // eligibility for "how to order trade show shirts" / "how to
  // make booth apparel" PAA queries.
  howto: {
    name: "How we produce custom trade show apparel for exhibitors and booth staff",
    description:
      "Show-date production: from the exhibitor's first quote to DDP delivery of booth staff uniforms, giveaway apparel, and demo team clothing at the convention center or hotel.",
    totalTime: "P20D",
    steps: [
      {
        name: "Send show date + booth size",
        text: "Provide the show date, booth staff count, giveaway quantity, and your brand artwork. We free-check the print file and reply within 1 business day with a per-SKU quote, a rush timeline if needed, and a ship-by date that hits show opening.",
      },
      {
        name: "Approve mockup + sample (optional)",
        text: "We send a 3D mockup on the actual garment. Pre-production samples cost $25–60 per piece, 5–7 day turnaround, refundable on bulk orders of 100+ pieces. Most exhibitors skip samples and go straight to bulk when colors match the brand guide.",
      },
      {
        name: "Bulk production (15–25 days)",
        text: "Sublimation / DTG / screen print starts once artwork is locked. We cut, sew and print every piece in-house at our Yiwu factory — booth staff shirts, demo team clothing, brand ambassador apparel, all under one production run.",
      },
      {
        name: "Staff + giveaway split packing",
        text: "AQL 2.5 inspection, then split-packed: staff uniforms in one carton, giveaway apparel in another, each with its own packing list. Optional: per-staff-name polybag, hanging pack for booth dressing, or pre-folded tees ready for lead-gift distribution.",
      },
      {
        name: "DDP delivery to convention center or hotel",
        text: "DDP shipping to 100+ countries (US, UK, EU, AU, CA). We can ship directly to a convention center (with your marshaling yard drayage), to your hotel, or to your event warehouse. Most shows have apparel in hand 3–7 days before show opening.",
      },
    ],
  },
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return <CustomerProfilePage data={data} />;
}
