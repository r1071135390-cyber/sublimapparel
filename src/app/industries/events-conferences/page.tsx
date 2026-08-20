import type { Metadata } from "next";
import {
  Calendar,
  Shirt,
  Briefcase,
  Users,
  Sparkles,
  Clock,
  Ruler,
  Layers,
  Package,
  Globe,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { buildMetadata, type CustomerProfileData } from "@/lib/customer-profile-data";
import { CustomerProfilePage } from "@/components/customer-profile-template";

export const dynamic = "force-static";

const data: CustomerProfileData = {
  slug: "/industries/events-conferences/",
  metaTitle: "Event Apparel & Conference Shirts Manufacturer",
  metaDescription:
    "Custom event apparel manufacturer for conferences, corporate events and community activities. Bulk T-shirts, staff uniforms and branded clothing with reliable production.",
  keywords: [
    "conference shirts",
    "event shirts",
    "conference apparel",
  ],
  badge: "For Events & Conferences",
  hero: "/esports-jersey-prodigy.webp",
  h1: "Custom Event Apparel for Conferences, Activities & Special Events",
  heroTitle: "Make Every Event More Memorable With Custom Apparel",
  heroBody:
    "Events create experiences. Custom apparel helps attendees, staff and volunteers feel connected while increasing brand visibility.\n\nWe manufacture custom event shirts and apparel for conferences, company events, community activities and special occasions.",
  primaryCta: "Plan Event Apparel",
  secondaryCta: "See Event Examples",
  stats: [
    { value: "200+", label: "Events Served" },
    { value: "5k+", label: "Shirts Per Event" },
    { value: "15 days", label: "Rush Available" },
    { value: "DDP", label: "Door-to-Door" },
  ],
  solutionsSection: {
    eyebrow: "Solutions",
    title: "Event Apparel Solutions",
    subtitle: "From intimate networking events to multi-thousand-attendee conferences, we...",
    sections: [
      {
        title: "Conference Shirts",
        icon: "Briefcase",
        items: [
          { name: "Business conferences", details: [] },
          { name: "Industry meetings", details: [] },
          { name: "Seminars & networking events", details: [] },
          { name: "Products: T-shirts, polos, staff shirts, volunteer apparel", details: [] },
        ],
      },
      {
        title: "Company Events",
        icon: "Sparkles",
        items: [
          { name: "Annual meetings", details: [] },
          { name: "Team building activities", details: [] },
          { name: "Celebrations", details: [] },
          { name: "Internal campaigns", details: [] },
        ],
      },
      {
        title: "Community Events",
        icon: "Users",
        items: [
          { name: "Charity events", details: [] },
          { name: "Local festivals", details: [] },
          { name: "Fundraising activities", details: [] },
          { name: "Group activities", details: [] },
        ],
      },
    ],
  },
  whySection: {
    eyebrow: "Why Event Organizers Choose Us",
    title: "Three Things That Make Event Apparel Easier With Us",
    features: [
      {
        icon: "Calendar",
        title: "Production Based on Your Event Date",
        body: "Events cannot be delayed. We help customers plan design approval, production schedule and shipping timeline around the actual event date.",
      },
      {
        icon: "Ruler",
        title: "Easy Size Management",
        body: "Event orders often include different sizes, different roles and different quantities. We help organize production clearly with size breakdowns per group.",
      },
      {
        icon: "Layers",
        title: "Flexible Order Quantities",
        body: "Suitable for small community events, medium conferences and large-scale activities. The MOQ is per design, not per event.",
      },
      {
        icon: "Package",
        title: "Common Event Apparel Products",
        body: "Custom T-shirts, performance shirts, staff uniforms, volunteer shirts, promotional apparel — all from one factory.",
      },
      {
        icon: "Globe",
        title: "Worldwide Door-to-Door Shipping",
        body: "DDP shipping to the US, UK, EU and Australia. We handle export paperwork so the apparel shows up at your venue on time.",
      },
      {
        icon: "MessageCircle",
        title: "Artwork Support",
        body: "We can assist with production-ready artwork so the design files we receive are ready to print without delays.",
      },
    ],
  },
  perfectFor: {
    eyebrow: "Perfect For",
    title: "Every Type of Event, From Intimate to Mass-Participation",
    items: [
      "Conference organizers",
      "Corporate event planners",
      "Community event committees",
      "Charity event directors",
      "Trade show producers",
      "Festival organizers",
    ],
  },
  faqTitle: "Event Apparel Questions, Answered",
  faqSubtitle: "Common questions from event organizers and planners.",
  faqs: [
    {
      q: "How long before an event should I place my order?",
      a: "We recommend planning early to allow enough time for design approval and international shipping. Rush production is available for tighter timelines.",
    },
    {
      q: "Can you make shirts for staff and participants separately?",
      a: "Yes. Different groups can have different designs, colors or styles. Send us a breakdown of what each group needs and we will organize production accordingly.",
    },
    {
      q: "Can you help with artwork?",
      a: "Yes. We can assist with production-ready artwork. If you only have a logo or rough sketch, we can prepare the print file for the design you want.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes. We ship worldwide with DDP (duty paid) options to the US, UK, EU and Australia. The apparel arrives at your door with no customs paperwork on your end.",
    },
  ],
  ctaTitle: "Have an Upcoming Event?",
  ctaBody:
    "Share your event date and quantity. We will help create a production plan and a clear quote for your event apparel.",
  ctaButton: "Start Your Event Project",
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return <CustomerProfilePage data={data} />;
}
