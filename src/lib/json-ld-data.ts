// Centralized JSON-LD data for Organization, LocalBusiness, etc.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "SublimApparel",
  url: SITE_URL,
  logo: `${SITE_URL}/sublimapparel-logo.webp`,
  foundingDate: "2018",
  description:
    "Yiwu-based sublimation printing factory. All-over print on polyester and cotton, MOQ 50, DDP to 100+ countries, US warehouse in Fontana CA.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Yiwu",
    addressRegion: "Zhejiang",
    addressCountry: "CN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "info@sublimapparel.com",
    availableLanguage: ["English"],
  },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Australia" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "France" },
  ],
  sameAs: [
    "https://www.linkedin.com/company/sublimapparel",
    "https://www.instagram.com/sublimapparel",
    "https://www.facebook.com/sublimapparel",
    "https://www.pinterest.com/sublimapparel",
    "https://www.alibaba.com/showroom/sublimapparel",
    "https://www.youtube.com/@sublimapparel",
  ],
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/shipping/us-warehouse/#localbusiness`,
  name: "SublimApparel US Warehouse",
  image: `${SITE_URL}/sublimapparel-logo.webp`,
  description:
    "SublimApparel US fulfillment warehouse in Fontana, California. 2-5 day domestic shipping, no customs, no duties for US customers.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Fontana Distribution Center",
    addressLocality: "Fontana",
    addressRegion: "CA",
    postalCode: "92335",
    addressCountry: "US",
  },
  parentOrganization: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

export const techniqueData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Sublimation Printing Process at SublimApparel",
  description: "How we dye-sublimate polyester and 100% cotton apparel in 6 steps: artwork separation, wide-format print, cut & assemble, heat-press transfer, cut & sew, quality check.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Artwork separation",
      text: "CMYK + 8 extended spot colors are pre-flighted. Underbase white added automatically for polyester.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Wide-format print",
      text: "1.9m wide roll-to-roll sublimation printer lays the design onto transfer paper at 4,800 × 1,200 DPI.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Cut & assemble",
      text: "Printed paper is cut to garment panel size. Front, back, sleeves kept aligned.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Heat-press transfer",
      text: "200°C / 30 sec cycle on an 80 × 100 cm platen. Dye sublimates from solid to gas, bonds with polyester fibers.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Cut & sew",
      text: "Each garment is cut, assembled and sewn on the same floor. Panels match perfectly because printed together.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Quality check",
      text: "Every piece inspected. Colors verified against your proof. Defects removed before poly-bagging.",
    },
  ],
};

// === FAQPage: Top customer questions about custom sublimation ===
export const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the minimum order quantity (MOQ)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MOQ is 50 pieces per design, per size, per color. We do not require per-style minimums, so you can mix sizes freely. Reorders start at 30 pieces.",
      },
    },
    {
      "@type": "Question",
      name: "Can you print all-over on cotton T-shirts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We run digital pigment ink on 100% cotton via direct-to-garment (DTG) printing, which holds color on cotton without polyester. We also offer allover digital print on cotton for true edge-to-edge, and DTF for blended fabrics.",
      },
    },
    {
      "@type": "Question",
      name: "Do you ship DDP (door-to-door with duties paid)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. DDP is available to 50+ countries via DHL, FedEx, and ocean freight. Your landed cost is fixed at quote time: no surprise customs bills on delivery. US orders can ship from our Fontana CA warehouse in 2–5 days.",
      },
    },
    {
      "@type": "Question",
      name: "How long does production take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sample: 3–5 business days after artwork approval. Bulk: 10–15 business days for sublimation, 15–20 for DTG cotton. Shipping adds 3–7 days by air or 25–40 days by sea. Rush orders are accepted.",
      },
    },
    {
      "@type": "Question",
      name: "What file format should I send?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI, PSD, PDF, or PNG at 300 DPI. Include a mockup or tech pack for accurate sizing. We provide a free artwork check and mockup before production starts.",
      },
    },
    {
      "@type": "Question",
      name: "Do you handle design if I only have a sketch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our in-house design team converts sketches, references, and bullet-point briefs into print-ready artwork. Free mockup, no commitment, no IP claim.",
      },
    },
  ],
};

// === Person: founder / sales lead E-E-A-T ===
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person-ramon`,
  name: "Ramon Wang",
  jobTitle: "Sales Director, SublimApparel",
  worksFor: { "@id": `${SITE_URL}/#organization` },
  email: "mailto:info@sublimapparel.com",
  knowsLanguage: ["en-US", "en-GB", "zh-CN"],
  url: `${SITE_URL}/about/`,
};

// === WebSite: with SearchAction for sitelinks searchbox ===
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "SublimApparel",
  description: "Yiwu-based allover-print apparel factory. Polyester sublimation + all-cotton DTG. 50-piece MOQ. DDP door-to-door to 50+ countries.",
  inLanguage: "en-US",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/products/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// === Article: about the company / about page ===
export const aboutArticleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${SITE_URL}/about/#article`,
  headline: "About SublimApparel — Yiwu Allover-Print Apparel Factory",
  description:
    "Founded 2018. 8+ years of allover sublimation and DTG cotton printing. 50 staff, 70% in production, in-house workshop serving 50+ countries with DDP shipping.",
  image: `${SITE_URL}/factory-floor.webp`,
  datePublished: "2018-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  inLanguage: "en-US",
  author: { "@id": `${SITE_URL}/#person-ramon` },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/sublimapparel-logo.webp` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/about/` },
};

// === For Events: Service + FAQ (used on /for-events page) ===
export function forEventsServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/for-events/#service`,
    name: "Custom Event Apparel Manufacturing",
    serviceType: "Custom apparel production for races, marathons, charity runs, and festivals",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Australia" },
    ],
    description:
      "Custom race shirts, marathon apparel, 5K tees, charity run uniforms, volunteer apparel, and sponsor-branded gear. Sublimation cut & sew with flexible 90-day production planning. MOQ 50 pcs, DDP to 100+ countries.",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceRange: "$$",
      availability: "https://schema.org/InStock",
    },
    url: `${SITE_URL}/for-events/`,
  };
}

export function forEventsFaqJsonLd(
  faqs: Array<{ q: string; a: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/for-events/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
