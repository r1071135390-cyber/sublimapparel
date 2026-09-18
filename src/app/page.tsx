import { Hero } from "@/components/hero";
import { buildPageMetadata } from "@/lib/page-metadata";
import { FactoryFloor } from "@/components/factory-floor";
import { VideoShowcase } from "@/components/home-extras";
import { JsonLd } from "@/components/json-ld";
import { LazyClientSections } from "@/components/home/lazy-client-sections";
// 2026-09-18 (R73 GEO): Direct Answer block placed immediately after the
// Hero so AI engines (Perplexity, ChatGPT, Gemini) hit the question +
// answer in the first DOM pass. Content sourced from tldr-content.ts.
import { GeoAnswerBlock } from "@/components/geo-answer-block";
import { getPageTldr } from "@/lib/tldr-content";
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
    // 2026-09-13 (R59): home title CTR rewrite — pre-R59 was
    // "Yiwu Sublimation & All-Over Print | Cotton DDP 100+" (50
    // chars, weak intent match). "DDP 100+" is a brand catchphrase,
    // not a search query, and "Cotton" alone undersells the
    // service. New title surfaces the 4 high-intent search terms
    // (sublimation factory / all-over print / MOQ 50 / DDP) in
    // 58 chars, under the SERP ~60 truncation limit. Project
    // memory hard constraint #15 (homepage title rewrite for CTR).
    // 2026-09-15 (R69): was "Yiwu Sublimation Factory | All-Over
    // Print, MOQ 50, DDP" (58 chars). All-Over Print is the
    // dominant keyword in the title pool — homepage is a
    // non-technique page so it shouldn't be carrying the technique
    // keyword in its title. Replaced with "Custom Apparel" (broader
    // umbrella term that opens ranking space for wedding, church,
    // fundraiser, fraternity, sorority, camp, marathon — the
    // zero-occurrence buyer-intent keywords R69 just injected
    // across the catalog). The four core brand search terms
    // (sublimation factory / custom apparel / MOQ 50 / DDP) are
    // still present. Stays 54 chars, under 60 limit. R59 already
    // approved the previous CTR rewrite — this preserves the R59
    // intent (4 high-intent tokens in 60 chars) but trades "All-Over
    // Print" for "Custom Apparel" so the homepage opens ranking
    // space for the broader query clusters the catalog now covers.
    title: "Yiwu Sublimation Factory | Custom Apparel, MOQ 50, DDP",
    // 2026-09-15 (R69): description trim — same rationale as the
    // title above. Drop "all-over print" from the description to
    // stop reinforcing technique-keyword cannibalization on the
    // homepage, which is the highest-authority page on the site and
    // was dragging down rankings for buyer-intent (wedding/church/
    // fundraiser/fraternity/camp/marathon) clusters R69 just
    // added. Sublimation already implies all-over coverage, and
    // "DDP to 100+ countries" still carries the differentiation.
    // 156 chars, under 160 meta description truncation limit.
    description: "Yiwu sublimation factory — custom apparel, MOQ 50, DDP to 100+ countries. Polyester + cotton, US warehouse in Fontana CA, 12 lines since 2018.",
keywords: [
        "custom sublimation apparel factory",
        "all-over print manufacturer",
        "China sublimation factory",
        "Yiwu apparel manufacturer",
        "MOQ 50 sublimation",
        "DDP shipping apparel",
        "custom team uniforms",
        "event merchandise manufacturer",
        "private label sportswear",
        "B2B apparel supplier",
        "sublimated t-shirts",
        "sublimated jerseys",
        "sublimated hoodies",
        "cycling kits custom",
        "racing suits custom",
        "golf polos custom",
        "corporate apparel",
        "promotional apparel",
        "school spirit wear",
        "team uniforms",
        "custom sportswear",
        "custom athletic apparel",
        "bulk apparel manufacturer",
        "custom uniform factory",
  ],
      other: {
    "article:author": "Ramon Wang, Sales Director, SublimApparel",
    "article:published_time": "2024-01-01T00:00:00.000Z",
    "article:modified_time": "2025-08-18T00:00:00.000Z",
  },
  });

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
      // 2026-09-13 (R59): WebPage.name and description kept in
      // lockstep with the <title> and <meta description> above so
      // the visible SERP snippet and the JSON-LD snippet don't
      // diverge — Google uses the schema name as a tie-breaker
      // when two sources disagree.
      name: "Yiwu Sublimation Factory | Custom Apparel, MOQ 50, DDP",
      description:
        "Yiwu sublimation factory — custom apparel, MOQ 50, DDP to 100+ countries. Polyester + cotton, US warehouse in Fontana CA, 12 lines since 2018.",
      keywords:
        "sublimation factory, all over print, all over print manufacturer, sublimation all over print, all over print t-shirt, all over print hoodie, custom sublimation apparel, Yiwu sublimation factory, DDP sublimation, allover digital print cotton, DTG cotton, DTF cotton, MOQ 50, full body sublimation, edge to edge sublimation",
      inLanguage: "en",
      isPartOf: { "@id": "https://sublimapparel.com/#website" },
      about: { "@id": "https://sublimapparel.com/#service" },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://sublimapparel.com/product-hero-products.webp",
      },
      // 2026-09-11 push (Round 8 part 1): speakable marks the H1
      // and hero paragraph as the sections best suited for voice
      // search / Google Assistant read-aloud. Voice queries like
      // "what is SublimApparel" or "where is the Yiwu factory
      // located" then get a direct verbatim answer from the home
      // page rather than a generic snippet.
      speakable: {
        "@type": "SpeakableSpecification",
        xpath: [
          "/html/body//h1",
          "/html/body//section[contains(@class,'hero')]//p",
        ],
      },
      video: { "@id": "https://sublimapparel.com/#video" },
    },
    // 2026-09-11 push (Round 8 part 1): explicit VideoObject for the
    // 40-second factory walk-through on the home page. Before this
    // round the <video> element had no structured data, so Google
    // could only discover it via the page's visible text. With
    // VideoObject, the video becomes eligible for the "Video" rich
    // result and Google Images / Google Video can index individual
    // scenes from the poster frame. We also expose `contentUrl` (the
    // raw .mp4), `thumbnailUrl` (the factory-floor poster), and a
    // `clip` array of 2 named key moments the user can scrub to.
    {
      "@type": "VideoObject",
      "@id": "https://sublimapparel.com/#video",
      name: "SublimApparel Yiwu Factory Walk-Through — 40 Seconds",
      description:
        "A 40-second walk-through of the SublimApparel Yiwu factory: 12 production lines, large-format sublimation printers, cut-and-sew assembly, quality control, packing, DDP shipping prep. Filmed on the production floor in 4K.",
      thumbnailUrl: [
        "https://sublimapparel.com/factory-floor.webp",
        "https://sublimapparel.com/factory-floor.avif",
      ],
      contentUrl: "https://sublimapparel.com/videos/sublimapparel-intro-v2.mp4",
      embedUrl: "https://sublimapparel.com/videos/sublimapparel-intro-v2.mp4",
      uploadDate: "2025-01-15",
      duration: "PT40S",
      inLanguage: "en",
      isFamilyFriendly: true,
      // 2026-09-11 push (Round 8 part 1): 2 named clips inside the
      // 40-second video. Google Video uses `clip` to render
      // "key moments" in the search snippet, which boosts CTR on
      // video-rich SERPs and lets users jump straight to the part
      // they care about.
      clip: [
        {
          "@type": "Clip",
          name: "Sublimation printing line",
          startOffset: 0,
          endOffset: 15,
          url: "https://sublimapparel.com/videos/sublimapparel-intro-v2.mp4#t=0,15",
        },
        {
          "@type": "Clip",
          name: "Cut-and-sew assembly",
          startOffset: 15,
          endOffset: 32,
          url: "https://sublimapparel.com/videos/sublimapparel-intro-v2.mp4#t=15,32",
        },
        {
          "@type": "Clip",
          name: "Quality control + packing",
          startOffset: 32,
          endOffset: 40,
          url: "https://sublimapparel.com/videos/sublimapparel-intro-v2.mp4#t=32,40",
        },
      ],
      publisher: { "@id": "https://sublimapparel.com/#organization" },
      // The video is embedded on the home page, not a standalone watch
      // page, so we point `url` to the home page where it lives.
      url: "https://sublimapparel.com/",
      mainEntityOfPage: { "@id": "https://sublimapparel.com/#webpage" },
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
  // 2026-09-18 (R73 GEO): pull the homepage's TL;DR config once at
  // render time so the same component renders identically on every
  // request. Content lives in `src/lib/tldr-content.ts` so it can be
  // updated without re-reading this page.
  const homeTldr = getPageTldr("/");
  return (
    <main>
      <JsonLd data={homeJsonLd} />
      <Hero />
      {/* 2026-09-18 (R73 GEO): Direct Answer block placed immediately
          after the hero so AI engines (Perplexity, ChatGPT Search,
          Gemini) hit the question + answer in the first DOM pass.
          The block is server-rendered, exposes its content via
          data-tldr-* attributes, and slots the homepage into the
          /, /products/, /fabric/cotton/, /blog/, /contact/ shared
          "answer surface" AI crawlers can lift verbatim. */}
      {homeTldr && <GeoAnswerBlock {...homeTldr} id="home-tldr" />}
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
