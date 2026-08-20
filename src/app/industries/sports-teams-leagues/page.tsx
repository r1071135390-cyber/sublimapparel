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
  metaTitle: "Custom Sports Team Apparel Manufacturer | Jerseys & Uniforms",
  metaDescription:
    "Custom sports team apparel manufacturer for clubs, leagues and athletes. Sublimated jerseys, uniforms and training wear with flexible quantities and reliable production.",
  keywords: [
    "custom sports team apparel",
    "sports team apparel manufacturer",
    "custom team uniforms",
    "team jersey manufacturer",
    "soccer jersey manufacturer",
    "basketball uniform supplier",
    "sports club apparel",
    "league uniforms",
    "custom sublimation jerseys",
  ],
  badge: "For Sports Teams & Leagues",
  h1: "Custom Sports Team Apparel Manufacturer for Clubs & Leagues",
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
    subtitle: "We produce sublimated jerseys, uniforms and training wear for clubs, leagues and athletes of every level.",
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
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return <CustomerProfilePage data={data} />;
}
