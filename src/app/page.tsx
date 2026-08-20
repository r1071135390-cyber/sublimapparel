import { Hero } from "@/components/hero";
import { InquiryCTA } from "@/components/inquiry-cta";
import { ArtworkCTA } from "@/components/artwork-cta";
import { BeyondApparel } from "@/components/beyond-apparel";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Products } from "@/components/products";
import { Process } from "@/components/process";
import { FactoryFloor } from "@/components/factory-floor";
import { DDP } from "@/components/ddp";
import { Industries } from "@/components/industries";
import { Contact } from "@/components/contact";
import { HomeExtras } from "@/components/home-extras";
import { Newsletter, VideoShowcase, FreeDesignService, RecentCaseStudies, LogoWall } from "@/components/home-extras";
import { JsonLd } from "@/components/json-ld";

export const metadata = {
  title: "Yiwu Custom Sublimate Apparel Manufacturer | Sublimation & Cotton DDP 100+ Countries",
  description:
    "Sublimation on polyester (true all-over, edge-to-edge). DTG and DTF on 100% cotton (A4–A3 per panel, soft hand). Allover digital print on cotton also available (cut-and-sew, true full-body, MOQ 50 pcs). MOQ 50 for DTG/DTF, DDP shipping to 100+ countries, US warehouse in Fontana CA. 12 production lines, since 2018.",

  openGraph: {
    images: ["/product-hero-products.webp"],
  },
  authors: [{ name: "Ramon Wang", url: "https://sublimapparel.com/about" }],
  other: {
    "article:author": "Ramon Wang, Sales Director, SublimApparel",
    "article:published_time": "2024-01-01T00:00:00.000Z",
    "article:modified_time": "2025-08-18T00:00:00.000Z",
  },
};

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://sublimapparel.com/#webpage",
    url: "https://sublimapparel.com/",
    name: "Yiwu Sublimation & All-Over Cotton Printing | DDP 100+",
    description:
      "Sublimation factory in Yiwu producing all-over print apparel — polyester sublimation, allover digital print on cotton, DTG, DTF. MOQ 50, DDP shipping to 100+ countries, US warehouse in Fontana CA.",
    keywords:
      "sublimation factory, all over print, all over print manufacturer, sublimation all over print, all over print t-shirt, all over print hoodie, custom sublimation apparel, Yiwu sublimation factory, DDP sublimation, allover digital print cotton, DTG cotton, DTF cotton, MOQ 50, full body sublimation, edge to edge sublimation",
    inLanguage: "en",
    isPartOf: { "@id": "https://sublimapparel.com/#website" },
    about: {
      "@type": "Service",
      name: "Custom Sublimation Apparel Manufacturing",
      serviceType: "Sublimation Printing & Cut-and-Sew",
      provider: { "@id": "https://sublimapparel.com/#organization" },
      areaServed: "Worldwide",
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://sublimapparel.com/product-hero-products.webp",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://sublimapparel.com/",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the minimum order quantity (MOQ) for custom sublimation apparel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MOQ is 50 pieces per design for DTG and DTF printing on cotton, and 50 pieces for true allover digital print on cotton (cut-and-sew). Polyester sublimation starts at 50 pieces per design. Mixed sizes and styles count toward the same MOQ.",
        },
      },
      {
        "@type": "Question",
        name: "Can you print all-over on 100% cotton?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We run two cotton paths: DTG/DTF (A4–A3 per panel, soft hand, MOQ 50) for placement prints, and true allover digital print on cotton (cut-and-sew, full body, MOQ 50) for edge-to-edge designs. Most factories can only do polyester — we invested in both.",
        },
      },
      {
        "@type": "Question",
        name: "What is DDP shipping and which countries do you serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DDP (Delivered Duty Paid) means we handle customs paperwork, duties, and door delivery. You receive one line item with no surprise bills. We ship DDP to 100+ countries including the US, UK, EU, Canada, Australia, the Middle East and most of Asia. For US orders we also ship domestically from our Fontana, CA warehouse in 2–5 days.",
        },
      },
      {
        "@type": "Question",
        name: "What is the typical lead time for production?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sample: 3–5 business days after artwork approval. Production: 7–15 days depending on quantity and technique. Shipping: 5–10 days by express or air, 25–35 days by sea. US domestic orders from our Fontana warehouse ship in 2–5 days.",
        },
      },
      {
        "@type": "Question",
        name: "Do you charge setup fees or screen charges?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Sublimation is digital — there are no screens to make, no plates to burn, and no setup fees. The only charge is the unit price plus shipping. We confirm everything in writing before production starts.",
        },
      },
      {
        "@type": "Question",
        name: "What file formats do you accept for artwork?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI, PSD, PDF, PNG, JPG — even a hand sketch. We free-check every artwork for printability and provide a 3D mockup on the actual garment before production. Unlimited revisions until you lock the design.",
        },
      },
    ],
  },
];

export default function Home() {
  return (
    <main>
      <JsonLd data={homeJsonLd} />
      <Hero />
      <BeyondApparel />
      <InquiryCTA />
      <FactoryFloor />
      <VideoShowcase />
      <Features />
      <FreeDesignService />
      <RecentCaseStudies />
      <LogoWall />
      <ArtworkCTA />
      <HowItWorks />
      <Products />
      <Process />
      <DDP />
      <Industries />
      <HomeExtras />
      <Contact />
      <Newsletter />
    </main>
  );
}
