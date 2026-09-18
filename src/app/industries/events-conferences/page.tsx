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
  // 2026-09-11 (R17-P3): was "Event Apparel & Conference Shirts
  // Manufacturer" — this title competed directly with
  // /event-festivals-conferences (overlap=5 in audit). Reframed around
  // the *industry/use case* angle so this page owns "event apparel for
  // conferences and festivals" while the solutions page owns
  // "event apparel production service". 58 chars.
  metaTitle: "Event Apparel for Conferences & Festivals | Bulk Shirts",
  metaDescription:
    "Event apparel for conferences, festivals, and large-scale gatherings. Bulk T-shirts, staff uniforms, sponsor-branded clothing, race shirts. Reliable worldwide DDP production.",
  keywords: [
    "conference shirts",
    "event shirts",
    "conference apparel",
    "event t-shirts",
    "trade show shirts",
    "event merchandise",
    "conference swag",
    "event giveaways",
    "custom event apparel",
    "conference t-shirts",
    "event staff shirts",
    "branded event merchandise",
    "event uniforms",
    "trade show apparel",
    "conference polos",
    "event hoodies",
    "festival merchandise",
    "attendee apparel",
    "speaker shirts",
    "volunteer shirts",
    "custom conference merchandise",
    "branded trade show giveaways",
    "event tshirts bulk",
    "conference swag bags",
    "seminar apparel",
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
  ogImage: "/og/og-industry.webp",
  // 2026-09-13 (R59): per-industry HowTo (5-step buyer journey for
  // event organizers: from event date + role breakdown to DDP
  // delivery at the conference or festival venue). Lifts the page
  // to HowTo rich result eligibility for "how to order custom
  // conference shirts" PAA queries.
  howto: {
    name: "How we produce custom event shirts for conferences, festivals and corporate events",
    description:
      "Event-date production: from the organizer's first quote request to DDP delivery of attendee, staff and volunteer shirts at the venue or hotel.",
    totalTime: "P25D",
    steps: [
      {
        name: "Send event date + role breakdown",
        text: "Tell us the event date, total quantity, and a breakdown by role (attendees, staff, volunteers, speakers). We free-check your artwork and reply within 1 business day with a per-role quote and ship-by date.",
      },
      {
        name: "Approve mockup + sample (optional)",
        text: "We send a 3D mockup on the actual garment. Pre-production samples cost $25–60 per piece, 5–7 day turnaround, refundable on bulk orders of 100+ pieces. Most event organizers skip samples when the design is straightforward.",
      },
      {
        name: "Bulk production (15–25 days)",
        text: "Sublimation production starts once artwork is locked for every role. We cut and sew every shirt in-house at our Yiwu factory — sponsor logos, badges, session info, all printed edge-to-edge in one run.",
      },
      {
        name: "Role-sorted packing",
        text: "AQL 2.5 inspection, then packed by role per your breakdown (attendees, staff, volunteers). Optional: per-name polybag for VIPs, or per-table packing for gala-style events. Folded and tagged for venue distribution.",
      },
      {
        name: "DDP delivery to venue or hotel",
        text: "DDP shipping to 100+ countries (US, UK, EU, AU, CA). We can ship to a single venue, multiple hotels, or your event warehouse. Transit adds 7–14 days. Most events have shirts in hand 7–14 days before opening.",
      },
    ],
  },
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return (
    <>
      <PageGeoAnswerBlock path="/industries/events-conferences/" />
      <CustomerProfilePage data={data} />
    </>
  );
}
