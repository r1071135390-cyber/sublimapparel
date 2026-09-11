// JSON-LD registry — post-build injection source of truth.
//
// Why this file exists:
//   Next.js 16 App Router does NOT emit `<script type="application/ld+json">`
//   from React `<script>` components into static-exported HTML — verified
//   2026-09-11 by inspecting production HTML on sublimapparel.com (every
//   page, including the layout-level @graph and page-level FAQPage/BreadcrumbList,
//   was missing the schema.org tag entirely).
//
//   We work around it by injecting the script tags at build time in
//   `assemble-out.mjs` (step 8). This file defines what gets injected and
//   to which page path.
//
// Sync requirements:
//   - The 6 layout schemas mirror `src/lib/json-ld-data.ts` — keep them
//     in lock-step when you edit the TS source.
//   - Page-level schemas (BreadcrumbList) follow the @graph pattern so
//     all page-specific schemas share a single @context parse with the
//     layout ones injected above them.

const SITE_URL = "https://sublimapparel.com";

// === Layout-level schemas (applied to every HTML page as one @graph) =======

const LAYOUT_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "SublimApparel",
      url: SITE_URL,
      logo: `${SITE_URL}/sublimapparel-logo-v2.webp`,
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
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "SublimApparel",
      description:
        "Yiwu-based allover-print apparel factory. Polyester sublimation + all-cotton DTG. 50-piece MOQ. DDP door-to-door to 50+ countries.",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/products/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/shipping/us-warehouse/#localbusiness`,
      name: "SublimApparel US Warehouse",
      image: `${SITE_URL}/sublimapparel-logo-v2.webp`,
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
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "United States" },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person-ramon`,
      name: "Ramon Wang",
      jobTitle: "Sales Director, SublimApparel",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      email: "mailto:info@sublimapparel.com",
      knowsLanguage: ["en-US", "en-GB", "zh-CN"],
      url: `${SITE_URL}/about/`,
    },
    {
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
    },
    {
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
    },
  ],
};

// === Page-level schemas (one entry per HTML path) ===========================
//
// Each entry is the body of an additional <script type="application/ld+json">
// injected right after the layout @graph. The key is the page path; the
// value is an array of schema nodes (also wrapped as a tiny @graph so
// each script is a single self-contained parse unit).
//
// "all" applies to every page; otherwise it matches the exact URL path
// (trailing slash is normalized to no slash in the comparison).

const PAGE_SCHEMAS = {
  "/": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "Yiwu Sublimation & All-Over Print | Cotton DDP 100+",
      description:
        "Sublimation factory in Yiwu producing all-over print apparel — polyester sublimation, allover digital print on cotton, DTG, DTF. MOQ 50, DDP shipping to 100+ countries, US warehouse in Fontana CA.",
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: {
        "@type": "Service",
        name: "Custom Sublimation Apparel Manufacturing",
        serviceType: "Sublimation Printing & Cut-and-Sew",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Worldwide",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/product-hero-products.webp`,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      ],
    },
  ],
  "/shipping/": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Shipping", item: `${SITE_URL}/shipping/` },
      ],
    },
  ],
  "/shipping/ddp/": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Shipping", item: `${SITE_URL}/shipping/` },
        { "@type": "ListItem", position: 3, name: "DDP", item: `${SITE_URL}/shipping/ddp/` },
      ],
    },
  ],
  "/shipping/global/": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Shipping", item: `${SITE_URL}/shipping/` },
        { "@type": "ListItem", position: 3, name: "Global", item: `${SITE_URL}/shipping/global/` },
      ],
    },
  ],
  "/shipping/us-warehouse/": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Shipping", item: `${SITE_URL}/shipping/` },
        { "@type": "ListItem", position: 3, name: "US Warehouse", item: `${SITE_URL}/shipping/us-warehouse/` },
      ],
    },
  ],
  "/fabric/cotton/": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Fabric", item: `${SITE_URL}/fabric/` },
        { "@type": "ListItem", position: 3, name: "Cotton", item: `${SITE_URL}/fabric/cotton/` },
      ],
    },
  ],
  "/technique/": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Technique", item: `${SITE_URL}/technique/` },
      ],
    },
  ],
};

export function getLayoutGraph() {
  return LAYOUT_GRAPH;
}

export function getPageSchemas(htmlPath) {
  // htmlPath examples: "/index.html", "/shipping/index.html", "/shipping/ddp/index.html"
  // Convert to URL path: strip "index.html" and trailing index, normalize slashes.
  let urlPath = htmlPath.replace(/\\/g, "/");
  if (urlPath.endsWith("/index.html")) {
    urlPath = urlPath.slice(0, -"/index.html".length);
  } else if (urlPath === "/index.html") {
    urlPath = "/";
  } else if (urlPath.endsWith(".html")) {
    urlPath = urlPath.slice(0, -".html".length);
  }
  // Ensure leading slash, normalize trailing slash to "/" for root only
  if (urlPath === "") urlPath = "/";
  if (!urlPath.startsWith("/")) urlPath = "/" + urlPath;
  // Normalize: keep trailing slash for all non-root
  if (urlPath !== "/" && !urlPath.endsWith("/")) urlPath = urlPath + "/";
  return PAGE_SCHEMAS[urlPath] || [];
}
