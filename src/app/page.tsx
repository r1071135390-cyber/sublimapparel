import { Hero } from "@/components/hero";
import { buildPageMetadata } from "@/lib/page-metadata";
import { FactoryFloor } from "@/components/factory-floor";
import { VideoShowcase } from "@/components/home-extras";
import { JsonLd } from "@/components/json-ld";
import { LazyClientSections } from "@/components/home/lazy-client-sections";
import {
  Features,
  Process,
  BeyondApparel,
  ArtworkCTA,
  HowItWorks,
  Products,
  DDP,
} from "@/components/home/home-below-fold";

export const metadata = buildPageMetadata({
    title: "Yiwu Sublimation & All-Over Print | Cotton DDP 100+",
    description: "Sublimation on polyester (true all-over, edge-to-edge). DTG and DTF on 100% cotton, soft hand. Allover digital print on cotton. MOQ 50, DDP to 100+ countries.",
    other: {
    "article:author": "Ramon Wang, Sales Director, SublimApparel",
    "article:published_time": "2024-01-01T00:00:00.000Z",
    "article:modified_time": "2025-08-18T00:00:00.000Z",
  },
  });;

// Home page structured data — single @graph wrapper.
// Previously rendered as 2 separate <script> tags (WebPage + FAQPage).
// Now both share one <script> so Google parses them in a single pass
// and the @id cross-references (isPartOf → #website, about.provider →
// #organization) resolve immediately.
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
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
      about: { "@id": "https://sublimapparel.com/#service" },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://sublimapparel.com/product-hero-products.webp",
      },
    },
    // 2026-09-11 push (Round 7 part 3): add explicit Service + hasOfferCatalog
    // to the home @graph. The previous WebPage.about already had a Service
    // node, but it only had a serviceType label. Without an Offer catalog,
    // Google can't confidently match long-tail buyer queries like
    // "sublimation hoodie factory MOQ 50 DDP" against the home page. The
    // OfferCatalog below lists the 6 main product families we ship,
    // each priced with a representative unit range so Google can
    // return "$-$$" price labels in the SERP for product-intent queries.
    {
      "@type": "Service",
      "@id": "https://sublimapparel.com/#service",
      name: "Custom Sublimation Apparel Manufacturing",
      serviceType: "Custom apparel sublimation, DTG, DTF, screen print, cut-and-sew, DDP shipping",
      category: "B2B Apparel Manufacturing",
      provider: { "@id": "https://sublimapparel.com/#organization" },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "New Zealand" },
        { "@type": "Country", name: "Germany" },
        { "@type": "Country", name: "France" },
        { "@type": "Country", name: "Spain" },
        { "@type": "Country", name: "Mexico" },
        { "@type": "Country", name: "Brazil" },
        { "@type": "Country", name: "Japan" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Custom Apparel Product Families",
        itemListElement: [
          {
            "@type": "OfferCatalog",
            name: "All-over sublimation jerseys",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "All-over sublimation jerseys (polyester)" },
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "USD",
                  price: 18.0,
                  minPrice: 12.0,
                  maxPrice: 35.0,
                  description: "Per-piece FOB Yiwu, MOQ 50, depends on fabric & complexity",
                },
              },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "Allover digital print on cotton",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Allover digital print on 100% cotton (DTG/DTF)" },
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "USD",
                  price: 22.0,
                  minPrice: 15.0,
                  maxPrice: 38.0,
                  description: "Per-piece FOB Yiwu, MOQ 50, depends on cotton GSM & ink coverage",
                },
              },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "Hoodies & sweatshirts",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Custom hoodies, crewnecks, zip-ups" },
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "USD",
                  price: 28.0,
                  minPrice: 18.0,
                  maxPrice: 55.0,
                  description: "Per-piece FOB Yiwu, MOQ 50, fleece weight & print process drive price",
                },
              },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "Polos & quarter-zips",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Custom polo shirts, quarter-zips, mock necks" },
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "USD",
                  price: 20.0,
                  minPrice: 13.0,
                  maxPrice: 38.0,
                  description: "Per-piece FOB Yiwu, MOQ 50, pique / interlock / jersey knits available",
                },
              },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "Sports & esports kits",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Team kits — esports, race, league, club" },
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "USD",
                  price: 19.0,
                  minPrice: 13.0,
                  maxPrice: 40.0,
                  description: "Per-piece FOB Yiwu, MOQ 50, includes sublimated jersey + matching short",
                },
              },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "T-shirts & tanks",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Custom t-shirts, tanks, singlets" },
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "USD",
                  price: 9.0,
                  minPrice: 6.0,
                  maxPrice: 18.0,
                  description: "Per-piece FOB Yiwu, MOQ 50, polyester / cotton / blends available",
                },
              },
            ],
          },
        ],
      },
    },
    {
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
  ],
};

export default function Home() {
  return (
    <main>
      <JsonLd data={homeJsonLd} />
      <Hero />
      <FactoryFloor />
      <VideoShowcase />
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
