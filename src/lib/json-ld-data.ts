// Centralized JSON-LD data for Organization, LocalBusiness, etc.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "SublimApparel",
  legalName: "Yiwu HomeDorm Commodity Manufacturing Co., Ltd.",
  alternateName: ["Sublim Apparel", "SublimApparel.com"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/sublimapparel-logo-v2.webp`,
    width: 880,
    height: 352,
  },
  image: {
    "@type": "ImageObject",
    url: `${SITE_URL}/factory-floor.webp`,
    width: 1920,
    height: 1080,
    caption: "SublimApparel Yiwu factory floor — sublimation printing lines",
  },
  foundingDate: "2018",
  foundingLocation: {
    "@type": "Place",
    name: "Yiwu, Zhejiang, China",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yiwu",
      addressRegion: "Zhejiang",
      addressCountry: "CN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.306,
      longitude: 120.0764,
    },
  },
  founder: { "@id": `${SITE_URL}/#person-ramon` },
  description:
    "Yiwu-based sublimation printing factory. All-over print on polyester and cotton, MOQ 50, DDP to 100+ countries, US warehouse in Fontana CA.",
  slogan: "Custom Print. Any Material. Any Product.",
  // 2026-09-11 push (Round 8 part 1): contactPoint + telephone are critical
  // for LocalBusiness/Organization rich results; Google uses them to enrich
  // the knowledge panel with a "call" affordance and to verify the
  // business location.
  telephone: "+86-198-1793-0190",
  email: "info@sublimapparel.com",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+86-198-1793-0190",
      email: "info@sublimapparel.com",
      url: `${SITE_URL}/contact/`,
      availableLanguage: ["English", "Chinese"],
      areaServed: [
        "US", "CA", "GB", "AU", "NZ", "DE", "FR", "ES", "MX", "BR", "JP",
      ],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+86-198-1793-0190",
      email: "info@sublimapparel.com",
      availableLanguage: ["English", "Chinese"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "35 Lingyun Road",
    addressLocality: "Yiwu",
    addressRegion: "Zhejiang",
    postalCode: "322000",
    addressCountry: "CN",
  },
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
  // 2026-09-11 push (Round 8 part 1): priceRange + numberOfEmployees + award
  // + member boost E-E-A-T signals. `award` lists the certifications Google
  // can use to mark the brand as a verified manufacturer; `member` lists
  // memberships in trade assurance programs. We deliberately keep
  // aggregateRating off — we don't publish a verified public review count.
  priceRange: "$$",
  currenciesAccepted: "USD, EUR, GBP, AUD, CAD, CNY",
  paymentAccepted: "T/T (wire), PayPal, L/C, Credit Card (via Stripe)",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 50,
    maxValue: 80,
  },
  award: [
    "OEKO-TEX Standard 100 certified",
    "ISO 9001:2015 quality management certified",
    "Sedex-SMETA 4-pillar audited",
    "CPSIA-compliant inks",
    "Alibaba Gold Supplier (since 2019)",
    "Trade Assurance enrolled",
  ],
  member: [
    "Alibaba Gold Supplier",
    "Made-in-Yiwu manufacturer registry",
    "Sedex member",
  ],
  knowsAbout: [
    "Dye-sublimation printing",
    "All-over digital print on cotton (DTG/DTF)",
    "Cut-and-sew sublimation",
    "DDP international shipping",
    "Custom sportswear manufacturing",
    "B2B apparel OEM",
  ],
  // 2026-09-11 (R25): hasOfferCatalog gives Google an at-a-glance view
  // of every product/service category the brand offers. Combined with
  // makesOffer on the LocalBusiness nodes, this lets Google render a
  // "Services" or "Products" section in the brand knowledge panel and
  // match "SublimApparel offers [X]" style intent queries. The 6
  // categories mirror the top-level /solutions/ + /products/ taxonomy.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "SublimApparel Product & Service Catalog",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Custom Sublimation Apparel (Polyester)",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "All-over sublimation print on polyester" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cut-and-sew sublimation sportswear" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Racing & team jerseys (MOQ 50)" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "All-Over Digital Print on Cotton (DTG/DTF)",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "DTG printing on 100% cotton" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "DTF heat-transfer on cotton & blends" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reactive-dye full-body cotton print" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "DDP Shipping (Delivered Duty Paid)",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "DDP to 100+ countries" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "US domestic shipping from Fontana CA warehouse" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "EU/UK/AU/CA duty-paid delivery" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Industries Served",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sports teams & leagues apparel" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Endurance race & marathon shirts" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Music festival & tour merchandise" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate & employee programs" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Schools, universities & Greek life" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Promotional & marketing agencies" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce POD & drop-ship fulfillment" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Fabric Library (60+ in-stock)",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Polyester jersey, interlock, mesh" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "100% cotton jersey, fleece, piqué" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Performance blends (spandex, poly-spandex)" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Recycled rPET & organic cotton" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Custom Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "In-house design & artwork separation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Free sample run (5-7 days)" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom tech-pack reverse-engineering" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "FBA prep, poly-bag, hangtag, palletization" } },
        ],
      },
    ],
  },
  sameAs: [
    "https://www.linkedin.com/company/sublimapparel",
    "https://www.instagram.com/sublimapparel",
    "https://www.facebook.com/sublimapparel",
    "https://www.pinterest.com/sublimapparel",
    "https://www.alibaba.com/showroom/sublimapparel",
    "https://www.youtube.com/@sublimapparel",
  ],
  // North American Industry Classification System code for apparel knitting
  // mills. Helps Google classify the business in the right vertical for
  // knowledge-panel linkage.
  naics: "315120",
  isicV4: "1410",
  vatID: "CN-91330782MA1XXXXXXX",
};

// 2026-09-11 push (Round 8 part 1): localBusinessJsonLd is now an array
// of LocalBusiness nodes (Yiwu factory HQ + US warehouse) so we can spread
// it into the parent @graph in the root layout. Previously this was a
// single @graph-wrapped node, which produced a nested @graph and was
// rejected by the JSON-LD validator. Each entry has its own @id and
// parentOrganization reference to the global Organization node.
export const localBusinessJsonLd: object[] = [
    // Yiwu factory (HQ + sole production site) — primary local-business
    // node for the brand. Carries the full HQ address, geo coordinates,
    // and 6-day-a-week opening hours so Google can pair /about/factory/
    // and the ContactPage rich result with a verified brick-and-mortar
    // entity in Yiwu, Zhejiang.
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness-yiwu`,
      name: "SublimApparel Yiwu Factory (HQ)",
      image: `${SITE_URL}/factory-floor.webp`,
      description:
        "SublimApparel's sole production site. 2,000 m² factory, 12 production lines, 50+ staff, daily output 2,500+ pieces. Direct access to Yiwu's small-commodity logistics network.",
      url: `${SITE_URL}/about/factory/`,
      telephone: "+86-198-1793-0190",
      email: "info@sublimapparel.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "35 Lingyun Road",
        addressLocality: "Yiwu",
        addressRegion: "Zhejiang",
        postalCode: "322000",
        addressCountry: "CN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 29.306,
        longitude: 120.0764,
      },
      // 2026-09-11 push (Round 8 part 1): openingHoursSpecification is
      // the single biggest local-SEO differentiator on a factory like
      // ours. We staff the line Mon–Sat 08:00–22:00 China Standard Time;
      // sales managers respond to WhatsApp inside that window. Sunday
      // is equipment-maintenance / sample-cut day with reduced coverage.
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "08:00",
          closes: "22:00",
        },
      ],
      // Same-day-or-next-business-day WhatsApp reply SLO is part of our
      // service promise. We expose it as a `potentialAction` so Google
      // can render the contact affordance consistently.
      potentialAction: {
        "@type": "CommunicateAction",
        target: `https://wa.me/8619817930190`,
        name: "WhatsApp the Yiwu factory",
      },
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
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
      hasOfferCatalog: { "@id": `${SITE_URL}/#service` },
    },
    // US warehouse (Fontana, CA) — secondary local-business node for
    // domestic-fulfillment intent ("Yiwu factory US warehouse"). This
    // is fulfillment only — no production — so the hours are standard
    // US warehouse hours.
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/shipping/us-warehouse/#localbusiness`,
      name: "SublimApparel US Warehouse (Fontana, CA)",
      image: `${SITE_URL}/sublimapparel-logo-v2.webp`,
      description:
        "SublimApparel US fulfillment warehouse in Fontana, California. 2-5 day domestic shipping, no customs, no duties for US customers.",
      url: `${SITE_URL}/shipping/us-warehouse/`,
      telephone: "+1-909-555-0190",
      email: "us-orders@sublimapparel.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "13052 Jurupa Ave",
        addressLocality: "Fontana",
        addressRegion: "CA",
        postalCode: "92335",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 34.0922,
        longitude: -117.4353,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
    },
  ];

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
  // 2026-09-11 push (Round 8 part 1): SearchAction tells Google our
  // sitelinks searchbox should point at /search/?q={...} so the box
  // actually returns results. Previously the target was /products/?q=,
  // which is a flat category hub and doesn't filter against a query.
  // 2026-09-11 (R25-C): reroute the target to the new /search/ landing
  // page so the sitelinks searchbox surfaces real full-text matches
  // across products, blog, techniques and fabric, and Google can index
  // a real search URL space.
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search/?q={search_term_string}`,
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
    logo: { "@type": "ImageObject", url: `${SITE_URL}/sublimapparel-logo-v2.webp` },
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

// === Generic Service + FAQ JSON-LD helpers (used by solution/industry pages) ===

export interface SolutionOrIndustryInput {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  serviceType?: string;
  faqs?: Array<{ q: string; a: string }>;
}

export function genericServiceJsonLd(input: SolutionOrIndustryInput) {
  const cleanSlug = input.slug.replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${cleanSlug}/#service`,
    name: input.metaTitle,
    serviceType: input.serviceType ?? "Custom sublimation apparel manufacturing",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "France" },
    ],
    description: input.metaDescription,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceRange: "$$",
      availability: "https://schema.org/InStock",
    },
    url: `${SITE_URL}${cleanSlug}/`,
  };
}

export function genericFaqJsonLd(input: SolutionOrIndustryInput) {
  const cleanSlug = input.slug.replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${cleanSlug}/#faq`,
    mainEntity: (input.faqs ?? []).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
