// Reusable JSON-LD helpers for SEO

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com";

export type Crumb = { name: string; path: string };

/**
 * Build a BreadcrumbList schema from an ordered list of crumbs.
 * First crumb should be "Home" with path "/".
 * @example
 *   buildBreadcrumbJsonLd([
 *     { name: "Home", path: "/" },
 *     { name: "Products", path: "/products" },
 *     { name: "T-Shirts", path: "/products/t-shirts" },
 *   ])
 */
export function buildBreadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path.startsWith("/") ? c.path : `/${c.path}`}`,
    })),
  };
}

/**
 * Build a FAQPage schema from Q/A pairs.
 * @example
 *   buildFaqJsonLd([
 *     { q: "What is sublimation?", a: "..." },
 *   ])
 */
export type FaqItem = { q: string; a: string };

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };
}

/**
 * Build a HowTo schema from an ordered list of steps.
 * Used on step-by-step process pages to make them eligible for
 * "How to ..." rich results and AI-overview extraction.
 * @example
 *   buildHowToJsonLd({
 *     name: "How to source custom apparel from China",
 *     description: "5 steps from inquiry to delivery.",
 *     steps: [
 *       { name: "Inquiry & quote", text: "Send your inquiry..." },
 *     ],
 *   })
 */
export type HowToStep = { name: string; text: string };

export function buildHowToJsonLd(input: {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration, e.g. "P60D"
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    ...(input.totalTime ? { totalTime: input.totalTime } : {}),
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

// 2026-09-12 (R33-B1): Comparison schema for the 4
// /compare/{slug}/ pages. Comparison is a lightweight
// schema.org type that wraps a side-by-side comparison
// between two Thing nodes. Google doesn't ship a dedicated
// rich result for it, but the type is the canonical marker
// for comparison intent, joins the page to the brand entity
// graph via isPartOf, and the Thing[] we emit for each
// "side" of the comparison becomes a discoverable noun
// phrase for AI Overviews and Bing Copilot. The
// `mainEntityOfPage` round-trip also keeps the schema graph
// self-contained: the comparison node, the page-level
// #webpage node, and the WebSite #website node all resolve
// to the same parse pass.
export type ComparisonSide = {
  name: string;
  description: string;
};

export function buildComparisonJsonLd(input: {
  /** Slug of the comparison page, e.g. "sublimation-vs-dtg". */
  slug: string;
  name: string;
  description: string;
  sideA: ComparisonSide;
  sideB: ComparisonSide;
  /** Optional: a one-line description of what the two sides
   *  are being compared *on* (e.g. "Print method selection
   *  for custom apparel"). Lands in `sharedContent`. */
  sharedContent?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Comparison",
    "@id": `${SITE_URL}/compare/${input.slug}/#comparison`,
    url: `${SITE_URL}/compare/${input.slug}/`,
    name: input.name,
    description: input.description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: [
      {
        "@type": "Thing",
        name: input.sideA.name,
        description: input.sideA.description,
      },
      {
        "@type": "Thing",
        name: input.sideB.name,
        description: input.sideB.description,
      },
    ],
    ...(input.sharedContent
      ? {
          sharedContent: {
            "@type": "WebContent",
            name: input.sharedContent,
          },
        }
      : {}),
    mainEntityOfPage: { "@id": `${SITE_URL}/compare/${input.slug}/#webpage` },
  };
}

// 2026-09-12 (R34): unified @graph payload for the 10
// /products/{category}/ pages (cycling, golf, bowling, esports,
// hoodies, jerseys, racing, running-shirts, t-shirts,
// training-apparel). Pre-R34, every category page emitted 3
// independent <script> tags (BreadcrumbList, FAQPage, Product)
// with a flat Product node that had no @id, no isPartOf, no
// about, and no link back to the brand Organization. That meant:
//  (a) Google had to parse three separate JSON payloads per page
//      and could not join the Product to the publisher entity
//      graph in a single pass;
//  (b) the Product node was missing the canonical
//      WebPage #webpage anchor + Service #service sibling that
//      every other content type on the site already gets;
//  (c) there was no Offer / areaServed surface for the
//      "DDP shipping to <country>" intent that the
//      /shipping/{country}/ pages already target.
//
// R34 replaces those three flat scripts with one
// single @graph block. The shared function builds:
//   - WebPage   (#webpage) with isPartOf #website + about
//               #organization + speakable
//   - Product   (#product) with @id, manufacturer @id,
//               additionalProperty, Offer with seller @id
//   - Service   (#service) with provider @id + areaServed
//               Country[] (the 11 main export countries) +
//               Offer (DDP shipping service, PreOrder
//               quote-based) + mainEntityOfPage round-trip
//   - BreadcrumbList + FAQPage are added by the page caller
//     (so this helper stays page-agnostic and the FAQ page
//     is optional).
//
// Sharing the helper across all 10 category pages means
// every product category now joins the brand entity graph
// in one parse pass, and the page-level payload drops from
// ~3 <script> tags to 1 @graph tag.
export type CategoryPageInput = {
  /** URL slug, e.g. "cycling". */
  slug: string;
  /** Canonical absolute path, e.g. "/products/cycling/". */
  path: string;
  /** Display name used in the Product + WebPage `name`. */
  name: string;
  /** One-sentence product description (≤ 200 chars). */
  description: string;
  /** Sub-subcategory label used in the Product
   *  `category` field, e.g. "Cycling Kit". */
  productCategory: string;
  /** SKU-style internal code, e.g. "SA-CYC-01". Used
   *  in the Product `mpn` so Google can dedupe the
   *  Product against the master catalog. */
  mpn: string;
  /** Image path relative to SITE_URL, e.g.
   *  "/og/og-products.webp" or "/products/cycling/hero.webp". */
  image: string;
  /** ISO 4217 currency for the Offer, e.g. "USD". */
  priceCurrency?: string;
  /** Price range label for the Offer priceRange field. */
  priceRange: string;
  /** Optional FAQ items to include as a FAQPage node in
   *  the same @graph. Some category pages (e.g. t-shirts)
   *  don't ship a FAQ section, so the caller can omit this. */
  faq?: FaqItem[];
};

export function buildCategoryProductGraph(input: CategoryPageInput) {
  const url = `${SITE_URL}${input.path}`;
  const webpageId = `${url}#webpage`;
  const productId = `${url}#product`;
  const serviceId = `${url}#service`;
  const breadcrumbId = `${url}#breadcrumb`;
  const faqId = input.faq && input.faq.length > 0 ? `${url}#faq` : null;
  const imageUrl = input.image.startsWith("http")
    ? input.image
    : `${SITE_URL}${input.image}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: input.name,
        description: input.description,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          xpath: ["/html/body//h1", "/html/body//section[1]//p"],
        },
        ...(faqId
          ? {
              mainEntity: { "@id": faqId },
            }
          : {}),
      },
      {
        "@type": "Product",
        "@id": productId,
        name: input.name,
        description: input.description,
        image: imageUrl,
        brand: { "@type": "Brand", name: "SublimApparel" },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        category: input.productCategory,
        mpn: input.mpn,
        url,
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "MOQ",
            value: "50 pieces per design",
          },
          {
            "@type": "PropertyValue",
            name: "Print process",
            value: "Dye sublimation on polyester (default); all-over digital print on cotton (option)",
          },
          {
            "@type": "PropertyValue",
            name: "Shipping",
            value: "DDP (door-to-door, duty paid) to 100+ countries",
          },
        ],
        offers: {
          "@type": "Offer",
          "@id": `${url}#offer`,
          url,
          priceCurrency: input.priceCurrency ?? "USD",
          priceRange: input.priceRange,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": `${SITE_URL}/#organization` },
          areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "Canada" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "Australia" },
            { "@type": "Country", name: "Germany" },
            { "@type": "Country", name: "France" },
            { "@type": "Country", name: "Spain" },
            { "@type": "Country", name: "Japan" },
          ],
        },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntityOfPage: { "@id": webpageId },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        url,
        name: `DDP custom ${input.productCategory.toLowerCase()} manufacturing from Yiwu, China`,
        serviceType: "B2B custom apparel manufacturing + international DDP shipping",
        description: `Factory-direct custom ${input.productCategory.toLowerCase()} manufacturing, MOQ 50 pcs per design, full dye-sublimation print, DDP (delivered duty paid) shipping to 100+ countries.`,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Canada" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Australia" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "France" },
          { "@type": "Country", name: "Spain" },
          { "@type": "Country", name: "Japan" },
        ],
        offers: {
          "@type": "Offer",
          "@id": `${url}#service-offer`,
          url,
          priceCurrency: input.priceCurrency ?? "USD",
          price: "0",
          availability: "https://schema.org/PreOrder",
          availabilityStarts: "2026-01-01",
          priceValidUntil: "2027-12-31",
          inventoryLevel: {
            "@type": "QuantitativeValue",
            value: 0,
            unitText: "quote-based",
          },
          seller: { "@id": `${SITE_URL}/#organization` },
        },
        mainEntityOfPage: { "@id": webpageId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Products",
            item: `${SITE_URL}/products/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: input.name,
            item: url,
          },
        ],
      },
      ...(input.faq && faqId
        ? [
            {
              "@type": "FAQPage",
              "@id": faqId,
              mainEntity: input.faq.map((it) => ({
                "@type": "Question",
                name: it.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: it.a,
                },
              })),
            },
          ]
        : []),
    ],
  };
}
