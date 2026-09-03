import { Hero } from "@/components/hero";
import { buildPageMetadata } from "@/lib/page-metadata";
import { FactoryFloor } from "@/components/factory-floor";
import { JsonLd } from "@/components/json-ld";
import { Features } from "@/components/features";
import { Process } from "@/components/process";
import { BeyondApparel } from "@/components/beyond-apparel";
import { ArtworkCTA } from "@/components/artwork-cta";
import { HowItWorks } from "@/components/how-it-works";
import { Products } from "@/components/products";
import { DDP } from "@/components/ddp";
import { LazyClientSections } from "@/components/home/lazy-client-sections";

export const metadata = buildPageMetadata({
    title: "Yiwu Sublimation & All-Over Print | Cotton DDP 100+",
    description: "Sublimation on polyester (true all-over, edge-to-edge). DTG and DTF on 100% cotton, soft hand. Allover digital print on cotton. MOQ 50, DDP to 100+ countries.",
    other: {
    "article:author": "Ramon Wang, Sales Director, SublimApparel",
    "article:published_time": "2024-01-01T00:00:00.000Z",
    "article:modified_time": "2025-08-18T00:00:00.000Z",
  },
  });;

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://sublimapparel.com/#webpage",
    url: "https://sublimapparel.com/",
    name: "Yiwu Sublimation & All-Over Print | Cotton DDP 100+",
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
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is your minimum order quantity (MOQ)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our MOQ is 50 pieces per design per colorway, and as low as 1 piece per size within the run. For repeat orders we can usually drop to 30 pcs. The full order has a 50 pc minimum total.",
        },
      },
      {
        "@type": "Question",
        name: "How long does production take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standard lead time is 10-15 business days for bulk production after sample approval, plus 3-7 days for sample development. Rush service (7-10 days) is available for an additional 20%.",
        },
      },
      {
        "@type": "Question",
        name: "Do you handle shipping and customs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — we ship DDP (Delivered Duty Paid) to 100+ countries, meaning we handle everything: freight, customs clearance, duties, taxes, and last-mile delivery. You receive the goods at your door with no hidden costs. We also offer FOB and EXW for clients who prefer to arrange their own logistics.",
        },
      },
      {
        "@type": "Question",
        name: "Can I get a sample before placing a bulk order?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer pre-production samples at $50-150 per piece (refundable on bulk order of 200+ pcs), plus free material swatches and printed color cards. Sample lead time is 5-7 days.",
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
      <FactoryFloor />
      {/* Server-rendered below-fold sections — kept inline for SEO and
          because the data lives in HTML is already optimal (vs shipping
          thousands of lines of catalog data to the client). */}
      <Features />
      <Process />
      <BeyondApparel />
      <ArtworkCTA />
      <HowItWorks />
      <Products />
      <DDP />
      {/* Client-heavy below-fold sections — lazy-loaded in a client
          wrapper. Each gets a lightweight skeleton so layout doesn't
          jump when the real content hydrates. */}
      <LazyClientSections />
    </main>
  );
}
