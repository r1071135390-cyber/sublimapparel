import type { Metadata } from "next";
import {
  Calendar,
  Layers,
  Shirt,
  Package,
  Users,
  Globe,
  MessageCircle,
  Ruler,
  Award,
  Clock,
  DollarSign,
  Sparkles,
  Briefcase,
  Music,
  Trophy,
  Building,
  GraduationCap,
  Coffee,
  Tv,
  Megaphone,
  Flag,
  ShoppingBag,
  Truck,
  Box,
  Repeat,
  CheckCircle2,
} from "lucide-react";
import { buildMetadata, type CustomerProfileData } from "@/lib/customer-profile-data";
import { CustomerProfilePage } from "@/components/customer-profile-template";

export const dynamic = "force-static";

const data: CustomerProfileData = {
  slug: "/industries/endurance-race-events/",
  metaTitle: "Custom Race Shirts Manufacturer | Marathon & Running Event Apparel",
  metaDescription:
    "Custom race shirts manufacturer for marathons, running events and endurance competitions. Bulk sublimation apparel with accurate sizing and reliable delivery.",
  keywords: [
    "custom race shirts",
    "marathon shirts manufacturer",
    "running event apparel",
    "race apparel supplier",
    "marathon merchandise",
    "running club shirts",
    "charity race shirts",
    "triathlon apparel",
  ],
  badge: "For Endurance & Race Events",
  h1: "Custom Race Shirts & Marathon Apparel Manufacturer",
  heroTitle: "Apparel Solutions for Races, Marathons & Endurance Events",
  heroBody:
    "Race organizers need apparel that arrives on time, fits participants correctly, and represents the event professionally.\n\nWe manufacture custom race shirts and event apparel for running events, marathons, charity races, and endurance competitions.",
  primaryCta: "Plan Your Race Apparel",
  secondaryCta: "See Sample Work",
  stats: [
    { value: "10k+", label: "Race Shirts Produced" },
    { value: "100+", label: "Events Served" },
    { value: "20 days", label: "Avg. Lead Time" },
    { value: "DDP", label: "Worldwide Shipping" },
  ],
  solutionsSection: {
    eyebrow: "Solutions",
    title: "Race Apparel We Produce",
    subtitle: "From full marathons to community fun runs, every distance has its own apparel needs.",
    sections: [
      {
        title: "Marathon Shirts",
        icon: "Trophy",
        items: [
          { name: "Full Marathons", details: [] },
          { name: "Half Marathons", details: [] },
          { name: "Fun Runs", details: [] },
        ],
      },
      {
        title: "Running Event Apparel",
        icon: "Shirt",
        items: [
          { name: "Participant Shirts", details: [] },
          { name: "Volunteer Shirts", details: [] },
          { name: "Staff Apparel", details: [] },
        ],
      },
      {
        title: "Endurance Sports Apparel",
        icon: "Award",
        items: [
          { name: "Cycling Events", details: [] },
          { name: "Triathlon Events", details: [] },
          { name: "Outdoor Competitions", details: [] },
        ],
      },
    ],
  },
  whySection: {
    eyebrow: "Why Race Organizers Choose Us",
    title: "Designed Around Event Deadlines",
    subtitle: "Unlike regular apparel orders, race apparel has a fixed event date. We plan...",
    features: [
      {
        icon: "Clock",
        title: "Bulk Production Capability",
        body: "Our factory can support large event orders. Marathon runs that need thousands of identical shirts are routine for us.",
      },
      {
        icon: "Layers",
        title: "Flexible Quantities",
        body: "Suitable for small community races and large multi-thousand-participant events. Pricing scales per order size.",
      },
      {
        icon: "Ruler",
        title: "Accurate Sizing",
        body: "Reduce participant complaints with clear size planning. We provide size charts and can pack by size for easy distribution at packet pickup.",
      },
      {
        icon: "Package",
        title: "Custom Packaging Options",
        body: "We can package shirts by size, by participant name, or by team — whatever your event's distribution model requires.",
      },
      {
        icon: "Globe",
        title: "DDP Shipping to Your Venue",
        body: "We deliver duty-paid to the US, UK, EU and Australia, so you don't have to chase customs paperwork before race day.",
      },
      {
        icon: "MessageCircle",
        title: "Single Point of Contact",
        body: "One English-speaking coordinator handles your design, production, packing and shipping updates from quote to delivery.",
      },
    ],
  },
  perfectFor: {
    eyebrow: "Perfect For",
    title: "Race Organizers Who Need Apparel That Shows Up On Time",
    items: [
      "Marathon organizers",
      "Charity race directors",
      "Running clubs",
      "Triathlon event companies",
      "Cycling race promoters",
      "Community fun run organizers",
    ],
  },
  faqTitle: "Race Apparel Questions, Answered",
  faqSubtitle: "Common questions from race directors and event managers.",
  faqs: [
    {
      q: "How early should race organizers place orders?",
      a: "We recommend planning as early as possible, especially for large events. A typical production run for several thousand shirts is 25–35 days plus sea transit.",
    },
    {
      q: "Can you produce shirts for volunteers and staff?",
      a: "Yes. We can produce separate designs for participants, volunteers, staff and sponsors, all delivered in the same consolidated shipment.",
    },
    {
      q: "Can you package shirts by size or participant?",
      a: "Yes. We can sort by size, by bib number, by team, or by individual participant name — whatever makes distribution at packet pickup easiest.",
    },
    {
      q: "Do you handle international shipping and customs?",
      a: "Yes. We ship DDP (duty paid) to most major markets, so the apparel arrives at your door or venue with no customs paperwork on your end.",
    },
  ],
  ctaTitle: "Planning Your Next Race?",
  ctaBody:
    "Let us help you prepare event apparel on time. Share your event date, quantity and design — we will reply with a clear production plan.",
  ctaButton: "Plan Your Event Apparel",
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return <CustomerProfilePage data={data} />;
}
