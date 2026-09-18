import type { Metadata } from "next";
import {
  GraduationCap,
  Shirt,
  Users,
  Calendar,
  Globe,
  MessageCircle,
  Ruler,
  Layers,
  Package,
  Trophy,
  Award,
  Sparkles,
} from "lucide-react";
import { buildMetadata, type CustomerProfileData } from "@/lib/customer-profile-data";
import { CustomerProfilePage } from "@/components/customer-profile-template";

export const dynamic = "force-static";

const data: CustomerProfileData = {
  slug: "/industries/schools-universities-greek-life/",
  metaTitle: "School Apparel & Greek Life Merchandise",
  // 2026-09-11 push (Round 5): tightened from 170 → 153 chars to fit Google's
  // 160-char SERP cap.
  metaDescription:
    "School apparel manufacturer for universities, schools, Greek life, and student organizations. Bulk T-shirts, hoodies, and student merch with reliable delivery.",
  keywords: [
    "school apparel supplier",
    "university shirts",
    "student group apparel",
    "greek life apparel",
    "fraternity shirts",
    "sorority shirts",
    "school spirit wear",
    "university apparel",
    "college merchandise",
    "custom greek apparel",
    "fraternity merchandise",
    "sorority merch",
    "college t-shirts",
    "school uniforms",
    "campus apparel",
    "school team uniforms",
    "college sports apparel",
    "greek week shirts",
    "formal event shirts",
    "bid day shirts",
    "initiation shirts",
    "philanthropy shirts",
    "custom greek letters",
    "alumni apparel",
    "college event shirts",
    "graduation shirts",
  ],
  badge: "For Schools, Universities & Greek Life",
  hero: "/hero-products.webp",
  h1: "Custom School Apparel for Universities, Greek Life & Student Organizations",
  heroTitle: "Apparel That Represents Your School, Team or Organization",
  heroBody:
    "School apparel represents identity, achievement and belonging. It needs to look right, fit right, and arrive on time.\n\nWe manufacture custom school apparel for universities, colleges, K–12 schools, Greek life organizations, and student groups worldwide.",
  primaryCta: "Get a School Quote",
  secondaryCta: "See School Apparel",
  stats: [
    { value: "50+", label: "Schools Served" },
    { value: "1k+", label: "Pieces Per Order" },
    { value: "MOQ 30", label: "Per Design" },
    { value: "DDP", label: "Global Shipping" },
  ],
  solutionsSection: {
    eyebrow: "Solutions",
    title: "School & Student Organization Apparel",
    subtitle: "From elementary schools to university Greek life, we make apparel that...",
    sections: [
      {
        title: "University Apparel",
        icon: "GraduationCap",
        items: [
          { name: "Student Organization T-Shirts", details: [] },
          { name: "Campus Event Apparel", details: [] },
          { name: "Orientation Week Apparel", details: [] },
          { name: "Recreation & Intramural Apparel", details: [] },
        ],
      },
      {
        title: "Greek Life Merchandise",
        icon: "Award",
        items: [
          { name: "Fraternity Apparel", details: [] },
          { name: "Sorority Merchandise", details: [] },
          { name: "Greek Week Event Shirts", details: [] },
          { name: "Philanthropy Event Apparel", details: [] },
        ],
      },
      {
        title: "K–12 School Apparel",
        icon: "Trophy",
        items: [
          { name: "School Team Uniforms", details: [] },
          { name: "Spirit Wear", details: [] },
          { name: "Field Day Apparel", details: [] },
          { name: "Graduation & Class Apparel", details: [] },
        ],
      },
    ],
  },
  whySection: {
    eyebrow: "Why Schools & Greek Life Choose Us",
    title: "Three Things That Matter to Student Apparel",
    features: [
      {
        icon: "Layers",
        title: "Flexible Quantities for Every Group",
        body: "Greek life chapters, student clubs and intramural teams often need 30–300 pieces per design. Our minimums are friendly to small student orgs and large campuses alike.",
      },
      {
        icon: "Ruler",
        title: "Wide Size Range for Students",
        body: "Student bodies include a wide range of sizes, from XS to 4XL. We produce the full size range so every student can get apparel that fits.",
      },
      {
        icon: "Calendar",
        title: "Event-Based Production Planning",
        body: "Greek week, formals, philanthropy events, orientation, finals week — every school event has a date. We help plan production backwards from your event.",
      },
      {
        icon: "Package",
        title: "Apparel for Every School Occasion",
        body: "T-shirts, hoodies, tank tops, polos, and accessories. Suitable for casual, semi-formal and athletic student apparel needs.",
      },
      {
        icon: "Globe",
        title: "International Shipping for International Schools",
        body: "Whether you're a US university, UK college, or Australian school, we ship DDP to your campus or designated distribution point.",
      },
      {
        icon: "MessageCircle",
        title: "Easy Communication for Busy Student Leaders",
        body: "We understand that student leaders are busy with classes. Our coordinator handles the production details so you can focus on the event.",
      },
    ],
  },
  perfectFor: {
    eyebrow: "Perfect For",
    title: "Every Kind of School Apparel Buyer",
    items: [
      "University student organizations",
      "Fraternity and sorority chapters",
      "K–12 schools and PTAs",
      "Campus recreation departments",
      "Student government associations",
      "School athletic programs",
    ],
  },
  faqTitle: "School & Greek Life Apparel Questions, Answered",
  faqSubtitle: "Common questions from student leaders and school administrators.",
  faqs: [
    {
      q: "What is the minimum order quantity?",
      a: "We support small student org orders starting at 30 pieces per design. Larger orders get better unit pricing, but small Greek life chapters are welcome.",
    },
    {
      q: "Can we order different designs for different events?",
      a: "Yes. We can produce multiple designs in a single production run — perfect for Greek life chapters with multiple events per semester.",
    },
    {
      q: "Can you produce apparel with Greek letters and custom crests?",
      a: "Yes. We can print or sublimate Greek letters, custom crests, chapter names and event-specific designs. Just send us the artwork.",
    },
    {
      q: "Do you ship to US, UK, AU universities?",
      a: "Yes. We ship worldwide with DDP options to the US, UK, EU and Australia. We can deliver to a single campus address or to multiple chapters.",
    },
  ],
  ctaTitle: "Need School or Greek Life Apparel?",
  ctaBody:
    "Send your design, quantity and event date. We will reply with a quote, sample plan and a clear production timeline.",
  ctaButton: "Start Your Project",
  ogImage: "/og/og-industry.webp",
  // 2026-09-13 (R59): per-industry HowTo (5-step buyer journey for
  // student org leaders, Greek chapters, and school admins: from
  // chapter / school design + roster to DDP delivery at the
  // campus or chapter house). Lifts the page to HowTo rich
  // result eligibility for "how to order custom Greek life
  // apparel" / "how to make school merch" PAA queries.
  howto: {
    name: "How we produce custom school and Greek life apparel for universities and student organizations",
    description:
      "Event-based production: from the chapter or org leader's first quote to DDP delivery of shirts, hoodies, and merch at the campus, chapter house, or event venue.",
    totalTime: "P22D",
    steps: [
      {
        name: "Send chapter / org design + size estimate",
        text: "Provide your Greek letters, crest, or org logo (even a rough sketch works), a rough size breakdown, and the event date. We free-check the print file and reply within 1 business day with a per-SKU quote and a ship-by date that hits your event.",
      },
      {
        name: "Approve mockup + sample (optional)",
        text: "We send a 3D mockup on the actual garment. Pre-production samples cost $25–60 per piece, 5–7 day turnaround, refundable on bulk orders of 100+ pieces. Most student orgs skip samples once the design is straightforward.",
      },
      {
        name: "Bulk production (15–25 days)",
        text: "Sublimation / DTG / screen print starts once artwork is locked. We cut, sew and print every piece in-house at our Yiwu factory — Greek letters, custom crests, event-specific designs, all printed edge-to-edge in one run.",
      },
      {
        name: "Size-sorted packing",
        text: "AQL 2.5 inspection, then packed by size per your breakdown. Optional: per-name polybag for chapter exec boards, or per-event packing for multi-event semesters (rush, formal, philanthropy). Folded and tagged for chapter or event distribution.",
      },
      {
        name: "DDP delivery to campus or chapter house",
        text: "DDP shipping to 100+ countries (US, UK, EU, AU, CA). We can ship to a single campus address, multiple chapter houses, or a designated event venue. Most chapters and orgs have apparel in hand 7–14 days before the event.",
      },
    ],
  },
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return (
    <>
      <PageGeoAnswerBlock path="/industries/schools-universities-greek-life/" />
      <CustomerProfilePage data={data} />
    </>
  );
}
