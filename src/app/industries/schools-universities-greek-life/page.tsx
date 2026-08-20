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
  metaDescription:
    "Custom school apparel manufacturer for universities, schools, Greek life and student organizations. Bulk T-shirts, hoodies and student merchandise with reliable delivery.",
  keywords: [
    "custom school apparel",
    "university apparel manufacturer",
    "Greek life merchandise",
    "student organization shirts",
    "fraternity apparel",
    "sorority merchandise",
    "school team uniforms",
    "college apparel",
    "custom student merchandise",
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
};

export const metadata: Metadata = buildMetadata(data);

export default function Page() {
  return <CustomerProfilePage data={data} />;
}
