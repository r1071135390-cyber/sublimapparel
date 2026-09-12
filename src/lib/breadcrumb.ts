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

// 2026-09-12 (R35-A): unified @graph payload for the
// /products/ catalog overview page. Pre-R35, the page emitted 3
// independent <script> tags (BreadcrumbList + flat CollectionPage
// + FAQPage). The flat CollectionPage had no @id, no isPartOf /
// about join to the brand entity graph, and the ItemList mainEntity
// was packed inline instead of being a sibling @id Google could
// re-walk. R35 promotes all three to a single @graph block:
//   - WebPage   #webpage (isPartOf #website + about #organization
//               + speakable)
//   - CollectionPage #collection (with its own @id, mainEntity @id
//               round-trip back to the ItemList)
//   - ItemList  #itemlist (top 20 product ListItem children —
//               Google supports <=50 before ItemList is ignored,
//               so 20 is a safe signal-rich size)
//   - Service   #service (DDP custom manufacturing sibling, same
//               8-country areaServed as the per-category pages
//               so the catalog index is also a service surface)
//   - BreadcrumbList #breadcrumb (Home → Products)
//   - FAQPage   #faq (the 6 buyer questions the page already
//               renders inline)
//
// Same shared pattern as buildCategoryProductGraph so every
// product-shaped page on the site has the same JSON-LD shape.
export type CollectionItem = {
  slug: string;
  name: string;
  url: string;
};

export function buildCollectionPageGraph(input: {
  /** The top-N products to enumerate inside the ItemList.
   *  Keep <= 20 for max Google signal; >50 is ignored. */
  items: CollectionItem[];
  /** Optional FAQ for the page (matches the existing inline
   *  FAQ on /products/). Omit to skip the FAQPage node. */
  faq?: FaqItem[];
}) {
  const url = `${SITE_URL}/products/`;
  const webpageId = `${url}#webpage`;
  const collectionId = `${url}#collection`;
  const itemListId = `${url}#itemlist`;
  const serviceId = `${url}#service`;
  const breadcrumbId = `${url}#breadcrumb`;
  const faqId = input.faq && input.faq.length > 0 ? `${url}#faq` : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: "Custom Sublimation Apparel Catalog",
        description:
          "Full product catalog of sublimation-printed custom apparel. 14 categories, 42 sports, 25 use cases. MOQ 50 pcs, DDP to 100+ countries.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/product-hero-products.webp`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          xpath: ["/html/body//h1", "/html/body//section[1]//p"],
        },
        ...(faqId ? { mainEntity: { "@id": faqId } } : {}),
      },
      {
        "@type": "CollectionPage",
        "@id": collectionId,
        url,
        name: "Custom Sublimation Apparel Catalog — 120+ Products, 14 Categories",
        description:
          "Full product catalog of sublimation-printed custom apparel. 14 categories, 42 sports, 25 use cases.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        provider: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": itemListId },
      },
      {
        "@type": "ItemList",
        "@id": itemListId,
        name: "Top 20 Sublimation Apparel Products",
        description:
          "Top 20 products from the SublimApparel catalog, ordered by product number.",
        numberOfItems: input.items.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: input.items.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: p.url,
        })),
        isPartOf: { "@id": collectionId },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        url,
        name: "DDP custom apparel manufacturing from Yiwu, China",
        serviceType:
          "B2B custom apparel manufacturing + international DDP shipping",
        description:
          "Factory-direct custom apparel manufacturing — 120+ products across 14 categories, MOQ 50 pcs per design, full dye-sublimation print, DDP (delivered duty paid) shipping to 100+ countries.",
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
          priceCurrency: "USD",
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

// 2026-09-12 (R40): unified @graph payload for the /shipping/ hub page.
// Pre-R40, the page emitted 3 independent JSON-LD nodes via a flat
// array passed to a single <JsonLd> call:
//   - BreadcrumbList  (flat, no @id)
//   - WebPage         (with @id but no @graph join)
//   - FAQPage         (flat, no @id join to WebPage via mainEntity)
//
// R40 promotes all 3 to a single @graph block:
//   - WebPage   #webpage (isPartOf #website + about
//               #organization + speakable + primaryImageOfPage)
//   - ItemList  #shipping-modes (4 main shipping modes: DDP,
//               Express, Air, Sea — links to /shipping/ddp and
//               /get-a-quote for the rest)
//   - ItemList  #supplementary (2 supplementary options: FOB,
//               Buffer Storage — both link to /get-a-quote and
//               /shipping/us-warehouse)
//   - BreadcrumbList #breadcrumb
//   - FAQPage   #faq (6 inline FAQs, optional)
//
// Key design choices:
//   - /shipping/ is a COMMERCIAL page — it ranks for "DDP shipping
//     from China" and "international apparel shipping" queries.
//     Adding a Service node with areaServed for 8 core countries
//     reinforces the brand's DDP intent (same pattern as
//     buildCollectionPageGraph R35, buildFabricHubGraph R36-B).
//   - The two ItemLists (<= 50 items each) qualify for Google
//     carousel rich results on "how to ship from China" queries.
//   - Person #person-ramon is inlined (same pattern as
//     buildResourcesHubGraph R39, buildContactGraph R38,
//     buildAboutGraph R37, etc.) so the author chain stays
//     self-contained within the page's @graph.
export type ShippingHubInput = {
  /** The 4 main shipping mode cards on the page. */
  mainModes?: { slug: string; name: string; href: string }[];
  /** The 2 supplementary service cards. */
  supplementary?: { name: string; href: string }[];
  /** Optional FAQ items rendered inline. Omit to skip FAQPage node. */
  faq?: FaqItem[];
};

export function buildShippingHubGraph(input: ShippingHubInput) {
  const url = `${SITE_URL}/shipping/`;
  const webpageId = `${url}#webpage`;
  const serviceId = `${url}#service`;
  const breadcrumbId = `${url}#breadcrumb`;
  const mainModesListId =
    input.mainModes && input.mainModes.length > 0
      ? `${url}#shipping-modes`
      : null;
  const supplementaryListId =
    input.supplementary && input.supplementary.length > 0
      ? `${url}#supplementary`
      : null;
  const faqId = input.faq && input.faq.length > 0 ? `${url}#faq` : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: "DDP Shipping to 100+ Countries | Sea, Air, US Warehouse | SublimApparel",
        description:
          "DDP (Delivered Duty Paid) shipping to 100+ countries. One invoice, no surprise duties. Sea, air, express, and US warehouse options from Yiwu factory to your door.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/shipping-hero.webp`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          xpath: ["/html/body//h1", "/html/body//section[1]//p"],
        },
        ...(faqId ? { mainEntity: { "@id": faqId } } : {}),
      },
      {
        // 2026-09-12 (R40): same Person node emitted by
        // buildResourcesHubGraph (R39), buildContactGraph (R38),
        // buildAboutGraph (R37), buildBlogHubGraph (R36-C),
        // buildBlogPostGraph (R35-D) so the publisher author
        // chain stays self-contained across the site.
        "@type": "Person",
        "@id": `${SITE_URL}/#person-ramon`,
        name: "Ramon Hsu",
        jobTitle: "Founder & CEO, SublimApparel",
        worksFor: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/about/`,
        knowsAbout: [
          "Dye-sublimation printing",
          "Custom apparel manufacturing",
          "DDP (Delivered Duty Paid) shipping",
          "All-over digital print on cotton",
          "Yiwu, China apparel supply chain",
        ],
      },
      {
        // 2026-09-12 (R40): Service node reinforces the commercial
        // intent of /shipping/. Every product/commercial page (catalog
        // overview, category landing, product detail, fabric detail,
        // fabric hub) adds a Service node — /shipping/ is the flagship
        // DDP page so it should too.
        "@type": "Service",
        "@id": serviceId,
        name: "DDP (Delivered Duty Paid) Shipping Service",
        description:
          "Delivered Duty Paid international shipping service from Yiwu, China factory to 100+ countries worldwide. One invoice includes production, freight, customs clearance, import duties, VAT/GST, and last-mile door-to-door delivery.",
        url,
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
          priceCurrency: "USD",
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
      ...(mainModesListId
        ? [
            {
              "@type": "ItemList",
              "@id": mainModesListId,
              name: "SublimApparel Shipping Options",
              description:
                "4 main shipping options: DDP (Delivered Duty Paid), Express (DHL/FedEx), Air Freight, and Sea Freight — from Yiwu factory to door worldwide.",
              numberOfItems: input.mainModes!.length,
              itemListOrder: "https://schema.org/ItemListOrderUnordered",
              itemListElement: input.mainModes!.map((m, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: m.name,
                url: `${SITE_URL}${m.href.startsWith("/") ? m.href : `/${m.href}`}`,
              })),
              isPartOf: { "@id": webpageId },
            },
          ]
        : []),
      ...(supplementaryListId
        ? [
            {
              "@type": "ItemList",
              "@id": supplementaryListId,
              name: "SublimApparel Supplementary Shipping Options",
              description:
                "2 supplementary options: FOB/CIF/EXW (for buyers with their own freight forwarder) and Buffer Storage (US Warehouse overstock holding).",
              numberOfItems: input.supplementary!.length,
              itemListOrder: "https://schema.org/ItemListOrderUnordered",
              itemListElement: input.supplementary!.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.name,
                url: `${SITE_URL}${s.href.startsWith("/") ? s.href : `/${s.href}`}`,
              })),
              isPartOf: { "@id": webpageId },
            },
          ]
        : []),
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
            name: "Shipping",
            item: url,
          },
        ],
      },
      ...(faqId
        ? [
            {
              "@type": "FAQPage",
              "@id": faqId,
              mainEntity: input.faq!.map((it) => ({
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

// 2026-09-12 (R40): unified @graph payload for the /shipping/ddp/
// detail page. Pre-R40, the page emitted 3 independent JSON-LD
// nodes via a flat array passed to a single <JsonLd> call:
//   - BreadcrumbList  (flat, no @id)
//   - WebPage         (with @id but standalone @context)
//   - FAQPage         (flat, no @id join to WebPage)
//
// R40 promotes all 3 to a single @graph block:
//   - WebPage   #webpage (isPartOf #website + about
//               #organization + speakable + primaryImageOfPage
//               + mainEntity round-trip to the Service)
//   - Service   #service (the DDP shipping service itself,
//               with areaServed for 8 core countries + the
//               transit regions listed on the page)
//   - BreadcrumbList #breadcrumb
//   - FAQPage   #faq (4 inline FAQs, optional)
//
// Key design choices:
//   - /shipping/ddp/ is the primary landing page for
//     "DDP shipping from China" / "delivered duty paid" intent
//     queries. Adding a dedicated Service node (distinct from
//     the generic /shipping/ Service) makes this page a strong
//     structured-data signal for Google's DDP knowledge panel.
//   - The regions table on the page (North America, Europe,
//     Asia Pacific) is captured as serviceSpecification for
//     the Service node, reinforcing the regional coverage signal.
//   - Person #person-ramon is NOT added here — this is a
//     commercial product page, not an editorial/author surface,
//     and adding a Person node without a matching on-page author
//     element would be semantically inconsistent.
export type DdpShippingInput = {
  /** Breadcrumb trail. */
  breadcrumb: { name: string; path: string }[];
  /** Optional FAQ items rendered inline. Omit to skip FAQPage node. */
  faq?: FaqItem[];
};

export function buildDdpShippingPageGraph(input: DdpShippingInput) {
  const url = `${SITE_URL}/shipping/ddp/`;
  const webpageId = `${url}#webpage`;
  const serviceId = `${url}#service`;
  const breadcrumbId = `${url}#breadcrumb`;
  const faqId = input.faq && input.faq.length > 0 ? `${url}#faq` : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: "DDP Shipping — Duties Paid, Delivered to Your Door | SublimApparel",
        description:
          "DDP (Delivered Duty Paid) shipping from Yiwu to 100+ countries. Customs, duties, and last-mile included. One invoice, no surprise fees. US, UK, EU, AU, CA, JP, KR, MX, BR.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/og/og-home.webp`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          xpath: ["/html/body//h1", "/html/body//section[1]//p"],
        },
        mainEntity: { "@id": serviceId },
      },
      {
        // 2026-09-12 (R40): dedicated DDP Service node for
        // /shipping/ddp/. Distinct from the generic /shipping/
        // Service — this one targets the specific "DDP" search
        // intent query surface and the 4 incoterms comparison
        // on the page.
        "@type": "Service",
        "@id": serviceId,
        name: "DDP (Delivered Duty Paid) Shipping Service — SublimApparel",
        description:
          "Delivered Duty Paid (DDP) international shipping from Yiwu, China to 100+ countries. Seller handles all freight, customs clearance, import duties, VAT/GST, and last-mile delivery. One invoice, no surprise fees. Available by express, air, sea, or rail.",
        url,
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
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "DDP Shipping Transit Options",
          description:
            "Express (3-5 days), Air (5-10 days), Sea (18-40 days), Rail (to EU, 18-22 days).",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Express DDP (DHL/FedEx)",
              description: "3-5 days door-to-door, full tracking, insurance included.",
            },
            {
              "@type": "Offer",
              name: "Air DDP",
              description: "5-10 days airport-to-door, best for 100-1,000 kg urgent orders.",
            },
            {
              "@type": "Offer",
              name: "Sea DDP (LCL)",
              description: "18-40 days port-to-door, cheapest per kg for bulk orders.",
            },
            {
              "@type": "Offer",
              name: "Rail DDP (to EU)",
              description: "18-22 days, available for EU destinations via China Railway Express.",
            },
          ],
        },
        offers: {
          "@type": "Offer",
          "@id": `${url}#service-offer`,
          url,
          priceCurrency: "USD",
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
        itemListElement: input.breadcrumb.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${SITE_URL}${c.path.startsWith("/") ? c.path : `/${c.path}`}`,
        })),
      },
      ...(faqId
        ? [
            {
              "@type": "FAQPage",
              "@id": faqId,
              mainEntity: input.faq!.map((it) => ({
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

// 2026-09-12 (R37): shared helper for /about/ that consolidates
// the 4 separate JSON-LD <script> tags (BreadcrumbList + FAQPage
// + AboutPage + Organization review carrier) into a single @graph
// payload, with every node @id-anchored and joined to the global
// brand entity graph (so Google can parse the entire entity surface
// for the page in one pass and correctly associate the about
// surface with the publisher).
//
// Key design choices:
//   - AboutPage uses the dedicated schema.org @type: "AboutPage"
//     (Google recognizes this as the brand's authoritative "about"
//     surface, distinct from a generic WebPage) and links
//     mainEntity → #organization so the about page IS the
//     Organization.
//   - Person #person-ramon is inlined (same as buildBlogHubGraph
//     R36-C + buildBlogPostGraph R35-D) so the publisher author
//     chain stays self-contained.
//   - The legacy Organization review carrier block lives at
//     #organization-about-reviews and keeps the exact same
//     gating behavior: review + aggregateRating are emitted only
//     when the caller passes non-empty data. This preserves the
//     R27 "no fabricated ratings" rule — when the public review
//     feed is empty, the page emits a clean schema with no
//     rating data, and Google's review parser sees a no-op
//     instead of a fabricated rating.
//   - The 5 "Dive deeper" sub-pages (factory, production,
//     quality, cases, faq) are emitted as a single ItemList
//     #subpage-list so the /about/ page exposes the full sub-page
//     hierarchy to Google in one shot. Without it the about page
//     only points to the hub pages; with it, every child page is
//     also reachable from a single ItemList.
export type AboutInput = {
  /** Optional FAQ items rendered on the page. */
  faq?: FaqItem[];
  /** Optional list of "Dive deeper" sub-pages. */
  subPages?: { href: string; title: string }[];
  /** Pre-mapped schema review array. Omit to strip the
   *  review field (preserves R27 gating). */
  review?: unknown[];
  /** Pre-computed aggregate rating. Omit to strip
   *  aggregateRating. */
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
};

export function buildAboutGraph(input: AboutInput) {
  const url = `${SITE_URL}/about/`;
  const webpageId = `${url}#webpage`;
  const aboutId = `${url}#about`;
  const breadcrumbId = `${url}#breadcrumb`;
  const faqId = input.faq && input.faq.length > 0 ? `${url}#faq` : null;
  const subPageListId =
    input.subPages && input.subPages.length > 0
      ? `${url}#subpage-list`
      : null;
  const hasReviews = !!(input.review && input.review.length > 0);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: "About SublimApparel — Yiwu Custom Apparel Factory",
        description:
          "SublimApparel is a Yiwu-based apparel factory producing custom sublimated, all-over digital printed, DTG, DTF, and screen-printed apparel for B2B customers in 50+ countries since 2018.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/about-hero.webp`,
        },
        significantLink: [
          `${SITE_URL}/about/`,
          `${SITE_URL}/about/quality-control/`,
          `${SITE_URL}/about/factory/`,
        ],
        speakable: {
          "@type": "SpeakableSpecification",
          xpath: ["/html/body//h1", "/html/body//section[1]//p"],
        },
        ...(aboutId ? { mainEntity: { "@id": aboutId } } : {}),
        keywords:
          "about SublimApparel, Yiwu factory, custom apparel manufacturer, 8 years experience, 50+ countries served, US warehouse, B2B sublimation manufacturer, OEM apparel, OEKO-TEX certified",
      },
      {
        "@type": "AboutPage",
        "@id": aboutId,
        url,
        name: "About SublimApparel — Yiwu Custom Apparel Factory",
        description:
          "SublimApparel is a Yiwu-based apparel factory producing custom sublimated, all-over digital printed, DTG, DTF, and screen-printed apparel for B2B customers in 50+ countries since 2018.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        // 2026-09-12 (R37): AboutPage.mainEntity points to the
        // Organization so Google knows the about page IS the
        // brand's authoritative corporate description. Same
        // pattern as the homepage / contact page.
        mainEntity: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/about-hero.webp`,
        },
        significantLink: [
          `${SITE_URL}/about/`,
          `${SITE_URL}/about/quality-control/`,
          `${SITE_URL}/about/factory/`,
        ],
      },
      {
        // 2026-09-12 (R37): same Person node emitted by
        // buildBlogHubGraph (R36-C) and buildBlogPostGraph
        // (R35-D) so any future about-page content (case
        // studies, testimonials) can join to the same author
        // @id. The Sales Director card on /about/ also points
        // to this node, so the about page stays
        // self-contained.
        "@type": "Person",
        "@id": `${SITE_URL}/#person-ramon`,
        name: "Ramon Hsu",
        jobTitle: "Founder & CEO, SublimApparel",
        worksFor: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/about/`,
        knowsAbout: [
          "Dye-sublimation printing",
          "Custom apparel manufacturing",
          "DDP (Delivered Duty Paid) shipping",
          "All-over digital print on cotton",
          "Yiwu, China apparel supply chain",
        ],
      },
      {
        // 2026-09-12 (R37): the Organization review carrier
        // block that used to be a separate JSON-LD <script>.
        // We keep the exact same @id
        // (#organization-about-reviews) so any external
        // reference still resolves, and we preserve the R27
        // gating: review + aggregateRating are emitted only
        // when the caller passes non-empty data. When the
        // public review feed is empty (current state) only
        // the bare Organization shell is emitted, which is a
        // no-op for Google's review parser and ready for the
        // day the feed is wired up.
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization-about-reviews`,
        url,
        name: "SublimApparel",
        description:
          "Yiwu-based allover-print apparel factory reviewed on this page. Polyester sublimation + all-cotton DTG. 50-piece MOQ. DDP door-to-door to 50+ countries.",
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        ...(hasReviews ? { review: input.review } : {}),
        ...(input.aggregateRating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: input.aggregateRating.ratingValue,
                reviewCount: input.aggregateRating.reviewCount,
                bestRating: input.aggregateRating.bestRating,
                worstRating: input.aggregateRating.worstRating,
              },
            }
          : {}),
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
            name: "About",
            item: url,
          },
        ],
      },
      ...(faqId
        ? [
            {
              "@type": "FAQPage",
              "@id": faqId,
              mainEntity: input.faq!.map((it) => ({
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
      ...(subPageListId
        ? [
            {
              "@type": "ItemList",
              "@id": subPageListId,
              name: "Dive deeper — SublimApparel /about/ sub-pages",
              description:
                "Five sub-pages that answer the questions buyers ask in the second call: factory floor, production process, quality control, industries served, and 30 B2B FAQ answers.",
              numberOfItems: input.subPages!.length,
              itemListOrder:
                "https://schema.org/ItemListOrderUnordered",
              itemListElement: input.subPages!.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.title,
                url: `${SITE_URL}${p.href.startsWith("/") ? p.href : `/${p.href}`}`,
              })),
            },
          ]
        : []),
    ],
  };
}

// 2026-09-12 (R39): shared helper for /resources/ that
// consolidates the 4 separate JSON-LD nodes (BreadcrumbList +
// WebPage + ItemList tools + FAQPage) into a single @graph
// payload, with every node @id-anchored and joined to the
// global brand entity graph.
//
// Key design choices:
//   - Two sibling ItemLists (one for the 5 free tools, one for
//     the 4 guides) so the /resources/ hub exposes both the
//     interactive-tool hierarchy and the guide-card hierarchy
//     in one pass. Both ItemLists are <= 50, so Google keeps
//     them eligible for carousel rich results.
//   - WebPage + mainEntity round-trip to the FAQPage #faq
//     so the PAA-style rich results on "apparel sourcing
//     tools" queries still resolve.
//   - Person #person-ramon is inlined (same pattern as
//     R36-C blog hub, R35-D blog post, R37 about, R38
//     contact) so the publisher author chain stays
//     self-contained.
export type ResourcesHubInput = {
  /** Free interactive tools (timeline planner, size guide, etc.). */
  tools: { slug: string; title: string }[];
  /** Guide cards linking to fabric / products / quality / shipping. */
  guides: { href: string; title: string }[];
  /** Optional FAQ items rendered on the page. */
  faq?: FaqItem[];
};

export function buildResourcesHubGraph(input: ResourcesHubInput) {
  const url = `${SITE_URL}/resources/`;
  const webpageId = `${url}#webpage`;
  const breadcrumbId = `${url}#breadcrumb`;
  const toolsListId = input.tools.length > 0 ? `${url}#tools` : null;
  const guidesListId = input.guides.length > 0 ? `${url}#guides` : null;
  const faqId = input.faq && input.faq.length > 0 ? `${url}#faq` : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: "Tools & Resources for Custom Apparel Buyers | SublimApparel",
        description:
          "Free interactive tools, printable checklists, and step-by-step guides built for custom apparel buyers, brand owners, and event organizers. Event timeline planner, US size chart, QC checklist, 90-day roadmap, sourcing playbook.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/og/og-home.webp`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          xpath: ["/html/body//h1", "/html/body//section[1]//p"],
        },
        ...(faqId ? { mainEntity: { "@id": faqId } } : {}),
      },
      {
        // 2026-09-12 (R39): same Person node emitted by
        // buildBlogHubGraph (R36-C), buildBlogPostGraph
        // (R35-D), buildAboutGraph (R37), and
        // buildContactGraph (R38) so the publisher author
        // chain stays self-contained across the site.
        "@type": "Person",
        "@id": `${SITE_URL}/#person-ramon`,
        name: "Ramon Hsu",
        jobTitle: "Founder & CEO, SublimApparel",
        worksFor: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/about/`,
        knowsAbout: [
          "Dye-sublimation printing",
          "Custom apparel manufacturing",
          "DDP (Delivered Duty Paid) shipping",
          "All-over digital print on cotton",
          "Yiwu, China apparel supply chain",
        ],
      },
      ...(toolsListId
        ? [
            {
              "@type": "ItemList",
              "@id": toolsListId,
              name: "SublimApparel Free Custom Apparel Tools",
              description:
                "5 free interactive tools: event timeline planner, US size chart, quality control checklist, 90-day new program roadmap, how-to-source playbook.",
              numberOfItems: input.tools.length,
              itemListOrder:
                "https://schema.org/ItemListOrderAscending",
              itemListElement: input.tools.map((t, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${SITE_URL}/${t.slug}/`,
                name: t.title,
              })),
              isPartOf: { "@id": webpageId },
            },
          ]
        : []),
      ...(guidesListId
        ? [
            {
              "@type": "ItemList",
              "@id": guidesListId,
              name: "SublimApparel Custom Apparel Guides",
              description:
                "4 deep-dive guides that connect the free tools to the actual production surface: fabric & print methods, product catalog, quality control process, DDP shipping & logistics.",
              numberOfItems: input.guides.length,
              itemListOrder:
                "https://schema.org/ItemListOrderUnordered",
              itemListElement: input.guides.map((g, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${SITE_URL}${g.href.startsWith("/") ? g.href : `/${g.href}`}`,
                name: g.title,
              })),
              isPartOf: { "@id": webpageId },
            },
          ]
        : []),
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
            name: "Tools & Resources",
            item: url,
          },
        ],
      },
      ...(faqId
        ? [
            {
              "@type": "FAQPage",
              "@id": faqId,
              mainEntity: input.faq!.map((it) => ({
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

// 2026-09-12 (R38): shared helper for /contact/ that consolidates
// the 3 separate JSON-LD <script> tags (BreadcrumbList + FAQPage
// + ContactPage) into a single @graph payload, with every node
// @id-anchored and joined to the global brand entity graph.
//
// Key design choices:
//   - ContactPage uses the dedicated schema.org @type: "ContactPage"
//     (Google recognizes this as the brand's authoritative "how to
//     reach this business" surface, distinct from a generic WebPage).
//   - WebPage + ContactPage both link mainEntity → #organization so
//     Google knows the contact page IS the brand's authoritative
//     contact surface.
//   - Person #person-ramon is inlined (same pattern as
//     buildBlogHubGraph R36-C, buildBlogPostGraph R35-D,
//     buildAboutGraph R37) so the publisher author chain stays
//     self-contained.
//   - The 8 "While you wait" sub-pages (get-a-quote, get-a-quote-
//     express, yiwu-factory-whatsapp, samples, fabric,
//     all-over-print, shipping/ddp, resources) are emitted as a
//     single ItemList #next-step-list so the /contact/ page exposes
//     the full next-step resource hierarchy to Google in one shot.
//     Without it the contact page only points at hub pages; with it,
//     every B2B conversion path is reachable from a single ItemList.
export type ContactInput = {
  /** Optional FAQ items rendered on the page. */
  faq?: FaqItem[];
  /** Optional list of "While you wait" next-step resource cards. */
  nextSteps?: { href: string; title: string }[];
};

export function buildContactGraph(input: ContactInput) {
  const url = `${SITE_URL}/contact/`;
  const webpageId = `${url}#webpage`;
  const contactId = `${url}#contact`;
  const breadcrumbId = `${url}#breadcrumb`;
  const faqId = input.faq && input.faq.length > 0 ? `${url}#faq` : null;
  const nextStepListId =
    input.nextSteps && input.nextSteps.length > 0
      ? `${url}#next-step-list`
      : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: "Contact SublimApparel — Yiwu Factory Quote in 1 Business Day",
        description:
          "Get a custom sublimation or all-over cotton print quote directly from our Yiwu factory. MOQ 50 pcs, 15-25 day production, DDP shipping to 100+ countries, US warehouse in Fontana CA. WhatsApp +86-198-1793-0190, email info@sublimapparel.com. Replies within 1 business day, no signup required.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/contact-hero.webp`,
        },
        significantLink: [
          `${SITE_URL}/get-a-quote/`,
          `${SITE_URL}/yiwu-factory-whatsapp/`,
          `${SITE_URL}/shipping/us-warehouse/`,
        ],
        // 2026-09-12 (R38): voice-search / Google-Assistant
        // read-aloud markers (matches the existing ContactPage
        // block on the page). Users frequently ask "what's the
        // phone number for SublimApparel" or "how do I contact
        // SublimApparel" — the h1 + hero subhead are the
        // speakable surfaces.
        speakable: {
          "@type": "SpeakableSpecification",
          xpath: [
            "/html/body//h1",
            "/html/body//section[contains(@class,'hero')]//p",
          ],
        },
        ...(contactId ? { mainEntity: { "@id": contactId } } : {}),
        keywords:
          "contact SublimApparel, Yiwu factory contact, get a quote, MOQ 50, DDP shipping quote, Yiwu factory WhatsApp, info@sublimapparel.com, custom apparel quote",
      },
      {
        "@type": "ContactPage",
        "@id": contactId,
        url,
        name: "Contact SublimApparel — Yiwu Factory Quote in 1 Business Day",
        description:
          "Get a custom sublimation or all-over cotton print quote directly from our Yiwu factory. MOQ 50 pcs, 15-25 day production, DDP shipping to 100+ countries, US warehouse in Fontana CA. WhatsApp +86-198-1793-0190, email info@sublimapparel.com. Replies within 1 business day, no signup required.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        // 2026-09-12 (R38): ContactPage.mainEntity points to the
        // Organization so Google knows the contact page IS the
        // brand's authoritative contact surface. Same pattern as
        // the about page (R37) and the homepage.
        mainEntity: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/contact-hero.webp`,
        },
        significantLink: [
          `${SITE_URL}/get-a-quote/`,
          `${SITE_URL}/yiwu-factory-whatsapp/`,
          `${SITE_URL}/shipping/us-warehouse/`,
        ],
      },
      {
        // 2026-09-12 (R38): same Person node emitted by
        // buildBlogHubGraph (R36-C), buildBlogPostGraph (R35-D),
        // and buildAboutGraph (R37) so the publisher author
        // chain stays self-contained across the site.
        "@type": "Person",
        "@id": `${SITE_URL}/#person-ramon`,
        name: "Ramon Hsu",
        jobTitle: "Founder & CEO, SublimApparel",
        worksFor: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/about/`,
        knowsAbout: [
          "Dye-sublimation printing",
          "Custom apparel manufacturing",
          "DDP (Delivered Duty Paid) shipping",
          "All-over digital print on cotton",
          "Yiwu, China apparel supply chain",
        ],
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
            name: "Contact",
            item: url,
          },
        ],
      },
      ...(faqId
        ? [
            {
              "@type": "FAQPage",
              "@id": faqId,
              mainEntity: input.faq!.map((it) => ({
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
      ...(nextStepListId
        ? [
            {
              "@type": "ItemList",
              "@id": nextStepListId,
              name: "While you wait — SublimApparel next-step resources",
              description:
                "Eight resources that help a B2B apparel buyer keep moving while waiting for the 1-business-day quote reply: detailed quote form, express 30-min quote, WhatsApp, custom sample order, fabric library, all-over print catalog, DDP shipping guide, and all tools/calculators.",
              numberOfItems: input.nextSteps!.length,
              itemListOrder:
                "https://schema.org/ItemListOrderUnordered",
              itemListElement: input.nextSteps!.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.title,
                url: `${SITE_URL}${p.href.startsWith("/") ? p.href : `/${p.href}`}`,
              })),
            },
          ]
        : []),
    ],
  };
}

// 2026-09-12 (R36-C): unified @graph payload for the
// /blog/ blog index hub page. Pre-R36, the page emitted
// 4 separate JSON-LD nodes across 2 <JsonLd> calls:
//   - BreadcrumbList (flat, no @id)
//   - Blog + ItemList inline mainEntity (no @id, no
//     isPartOf / about to the brand entity graph)
//   - WebPage (with @id but no @graph join — emitted as
//     a separate @context)
//   - FAQPage (flat, no @id join to the WebPage via
//     mainEntity round-trip)
//
// R36-C promotes all 4 to a single @graph block:
//   - WebPage   #webpage (isPartOf #website + about
//               #organization + speakable +
//               primaryImageOfPage)
//   - Blog      #blog (the canonical @type for a
//               publisher's blog index — joins the
//               publisher entity graph via publisher @id
//               and the post list via mainEntity round-trip)
//   - ItemList  #post-list (all blog posts in
//               ItemListOrderDescending by date, links
//               to /blog/{slug}/)
//   - Person    #person-ramon (inline author reference
//               so future blog posts can use author @id
//               to link back to this hub's author node)
//   - BreadcrumbList #breadcrumb
//   - FAQPage   #faq (5 inline FAQs, optional)
//
// Note: this helper does NOT include a Service #service
// sibling — the /blog/ index is an editorial content hub,
// not a service surface, and adding a service node would
// dilute the content / publisher signal that the Blog @type
// is meant to carry. Commercial DDP intent is already
// captured by the homepage, the /shipping/ pages, and the
// product / fabric surfaces elsewhere in the site.
//
// Sharing the helper with the per-post pages (R35-D uses
// buildBlogPostGraph, this helper is the hub-side sibling)
// means a single edit to the @graph shape now touches the
// whole blog surface in one place.
export type BlogHubInput = {
  /** The blog posts to enumerate inside the ItemList.
   *  Posts should be in the order you want them listed
   *  (the helper applies itemListOrder Descending so
   *  position 1 = most recent). */
  posts: { slug: string; title: string }[];
  /** Optional FAQ items rendered inline. Omit to skip
   *  the FAQPage node. */
  faq?: FaqItem[];
};

export function buildBlogHubGraph(input: BlogHubInput) {
  const url = `${SITE_URL}/blog/`;
  const webpageId = `${url}#webpage`;
  const blogId = `${url}#blog`;
  const postListId = `${url}#post-list`;
  const breadcrumbId = `${url}#breadcrumb`;
  const faqId = input.faq && input.faq.length > 0 ? `${url}#faq` : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: "SublimApparel Blog — Apparel Manufacturing Insights",
        description:
          "Industry guides, factory stories, and B2B apparel manufacturing insights from a 2,000 m² Yiwu sublimation factory. Sublimation vs DTG, DDP shipping, fabric guides, esports jersey fabric, and more.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/og/og-default.jpg`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          xpath: ["/html/body//h1", "/html/body//section[1]//p"],
        },
        ...(faqId ? { mainEntity: { "@id": faqId } } : {}),
      },
      {
        "@type": "Blog",
        "@id": blogId,
        url,
        name: "SublimApparel Blog — Apparel Manufacturing Insights",
        description:
          "Industry guides, factory stories, and B2B apparel manufacturing insights from a 2,000 m² Yiwu sublimation factory.",
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": postListId },
      },
      {
        "@type": "ItemList",
        "@id": postListId,
        name: "All SublimApparel Blog Posts",
        description:
          "All SublimApparel blog posts, ordered from most recent to oldest. Industry guides, factory stories, and B2B apparel manufacturing insights.",
        numberOfItems: input.posts.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: input.posts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          url: `${SITE_URL}/blog/${p.slug}/`,
        })),
        isPartOf: { "@id": blogId },
      },
      {
        // 2026-09-12 (R36-C): define the Person node inline so
        // future blog posts and the /about/ page can use the
        // same author @id and the Blog entity graph stays
        // self-contained. Mirrors the Person node emitted by
        // buildBlogPostGraph (R35-D).
        "@type": "Person",
        "@id": `${SITE_URL}/#person-ramon`,
        name: "Ramon Hsu",
        jobTitle: "Founder & CEO, SublimApparel",
        worksFor: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/about/`,
        knowsAbout: [
          "Dye-sublimation printing",
          "Custom apparel manufacturing",
          "DDP (Delivered Duty Paid) shipping",
          "All-over digital print on cotton",
          "Yiwu, China apparel supply chain",
        ],
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
            name: "Blog",
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

// 2026-09-12 (R36-B): unified @graph payload for the
// /fabric/ fabric hub page (lists all 41 fabric types and
// the 20 print processes we run on them). Pre-R36, the page
// emitted 2 independent JSON-LD <script> tags (BreadcrumbList
// + FAQPage). The BreadcrumbList had no @id join, no
// isPartOf / about to the brand entity graph, and the
// FabricCatalogGrid that renders the 41 fabric cards + the
// 20-process table were invisible to crawlers — the only
// structured-data signal was the 6 inline FAQs.
//
// R36-B promotes the 2 <script> tags + the 41 fabric cards
// + the 20 print processes to a single @graph block:
//   - WebPage   #webpage (isPartOf #website + about
//               #organization + speakable + primaryImageOfPage)
//   - CollectionPage #collection (with @id, mainEntity
//               round-trip to the first ItemList)
//   - ItemList  #fabric-list (the 41 fabric types in
//               FabricCatalogGrid — kept <= 50, Google
//               supports up to 50 before ignoring)
//   - ItemList  #process-list (the 20 print processes from
//               the inline table, each linking back to
//               /technique/{slug}/ — reinforces the
//               technique-hub-to-fabric-hub entity join)
//   - Service   #service (DDP fabric supply + cut-to-order,
//               same 8-country areaServed as the per-fabric
//               pages so the hub is also a service surface
//               for "DDP fabric supply to {country}" long-tail
//               intent)
//   - BreadcrumbList #breadcrumb (Home → Fabric)
//   - FAQPage   #faq (the 6 inline FAQs)
//
// Sharing the helper across the fabric hub + all 64 fabric
// detail pages (R35-C uses buildFabricDetailGraph, this
// helper is the hub-side sibling) means a single edit to
// the @graph shape now touches the whole fabric site
// surface in one place.
export type FabricHubInput = {
  /** The 41 fabric types to enumerate inside the fabric
   *  ItemList. Each entry: slug + name. */
  fabrics: { slug: string; name: string }[];
  /** The 20 print processes to enumerate inside the
   *  process ItemList. Each entry: slug + name. The
   *  process slug is the same as the technique slug, so
   *  each ListItem points to /technique/{slug}/. */
  processes: { slug: string; name: string }[];
  /** Optional FAQ items rendered inline. Omit to skip
   *  the FAQPage node. */
  faq?: FaqItem[];
};

export function buildFabricHubGraph(input: FabricHubInput) {
  const url = `${SITE_URL}/fabric/`;
  const webpageId = `${url}#webpage`;
  const collectionId = `${url}#collection`;
  const fabricListId = `${url}#fabric-list`;
  const processListId = `${url}#process-list`;
  const serviceId = `${url}#service`;
  const breadcrumbId = `${url}#breadcrumb`;
  const faqId = input.faq && input.faq.length > 0 ? `${url}#faq` : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: "Fabric & Print Process Guide — 24 Fabrics, 6 Methods",
        description:
          "Pick the right fabric-process combo for your apparel project. 24 fabrics in stock (polyester, poly-spandex, nylon, cotton, organic, rPET, blends), 6 print methods, 20 techniques, MOQ 50 pcs, DDP to 100+ countries.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/fabric-hero.webp`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          xpath: ["/html/body//h1", "/html/body//section[1]//p"],
        },
        ...(faqId ? { mainEntity: { "@id": faqId } } : {}),
      },
      {
        "@type": "CollectionPage",
        "@id": collectionId,
        url,
        name: "Fabric & Print Process Guide — All Fabrics & Methods",
        description:
          "Full fabric catalogue: 41 in-stock fabrics (polyester, cotton, poly-spandex, nylon, fleece, blends) with composition, weight, and our sublimation fit rating. 20 print processes, 6 in-house methods.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        provider: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": fabricListId },
      },
      {
        "@type": "ItemList",
        "@id": fabricListId,
        name: "All SublimApparel Fabric Types",
        description:
          "All 41 in-stock fabric types we run on our production floor at the Yiwu factory, ordered by fabric family.",
        numberOfItems: input.fabrics.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: input.fabrics.map((f, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: f.name,
          url: `${SITE_URL}/fabric/${f.slug}/`,
        })),
        isPartOf: { "@id": collectionId },
      },
      {
        "@type": "ItemList",
        "@id": processListId,
        name: "Print Processes Available for These Fabrics",
        description:
          "All 20 print processes we run on these fabrics, each linking to its technique page for specs, MOQ, and best substrates.",
        numberOfItems: input.processes.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: input.processes.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: `${SITE_URL}/technique/${p.slug}/`,
        })),
        isPartOf: { "@id": collectionId },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        url,
        name: "Bulk fabric supply + cut-to-spec DDP shipping from Yiwu, China",
        serviceType:
          "B2B fabric supply + cut-to-order + international DDP shipping",
        description:
          "Factory-direct fabric supply in bulk bolts, cut-to-order yardage from 50 m MOQ, plus DDP (delivered duty paid) shipping to 100+ countries. 41 fabric types in stock, 20 print processes.",
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
          priceCurrency: "USD",
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
            name: "Fabric",
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

// 2026-09-12 (R35-C): unified @graph payload for the 64
// /fabric/[slug]/ fabric detail pages. Pre-R35, every fabric
// page emitted one <script> with a @graph that already had
// the right shape (Product + FAQPage + BreadcrumbList) but
// was missing four things that every other product-shaped
// page on the site now ships:
//   (a) the WebPage #webpage node (with isPartOf #website +
//       about #organization + speakable + primaryImageOfPage)
//       that anchors the page in the brand entity graph;
//   (b) the Service #service sibling with the 8-country
//       areaServed for the "DDP fabric supply to {country}"
//       long-tail intent (matches the catalog overview, the
//       10 category pages, and the 120 product detail pages);
//   (c) @id anchors on every node so Google can join the
//       Product #product, FAQPage #faq, and BreadcrumbList
//       #breadcrumb in one parse pass via @id;
//   (d) mainEntityOfPage round-trip on the Product + Service
//       nodes (previously only the WebPage had a WebPage
//       anchor — the Product and Service were floating).
//
// R35-C promotes the existing single @graph block to the
// shared buildFabricDetailGraph helper, with byte-equivalent
// Product payload (sku FAB-{SLUG}, mpn = slug, composition
// in material, the same additionalProperty set, the same
// in-stock Offer with 1500 MTR inventoryLevel and DDP US
// shipping details, and the same R31 review + aggregateRating
// gating). The only new surface is the WebPage + Service
// siblings — every other byte is identical to R31.
//
// Sharing the helper across all 64 fabric pages means a
// single edit to the @graph shape (e.g. add hasMerchantReturnPolicy
// to the fabric-wide Service node, swap the shipping country
// list, or add a new additionalProperty like "Lead time")
// now touches all fabric pages in one place.
export type FabricDetailInput = {
  /** URL slug, e.g. "polyester". */
  slug: string;
  /** Display name of the fabric, e.g. "Polyester". */
  name: string;
  /** Meta description (≤ 200 chars). */
  description: string;
  /** Absolute image URL of the swatch. */
  image: string;
  /** SKU-style internal code, e.g. "FAB-POLYESTER". */
  sku: string;
  /** Same as sku — used in mpn for Google dedupe. */
  mpn: string;
  /** Material/composition string, e.g. "100% Polyester". */
  material: string;
  /** Category label from fabric.tags.slice(0, 3). */
  category: string;
  /** additionalProperty entries (Composition, GSM, Spec,
   *  Primary use, Fit rating, Print methods, Sublimation
   *  suitability). Already in PropertyValue shape. */
  additionalProperty: { "@type": string; name: string; value: string }[];
  /** 3-level breadcrumb for the page. */
  breadcrumb: Crumb[];
  /** Per-fabric FAQ items rendered inline. Omit to skip
   *  FAQPage. */
  faq?: FaqItem[];
  /** Pre-mapped schema review array. Omit to strip the
   *  review field (preserves R31 gating behavior). */
  review?: unknown[];
  /** Pre-computed aggregate rating. Omit to strip
   *  aggregateRating. */
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
};

export function buildFabricDetailGraph(input: FabricDetailInput) {
  const url = `${SITE_URL}/fabric/${input.slug}/`;
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
        name: `${input.name} — Fabric Specs & Sublimation Suitability | SublimApparel`,
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
        ...(faqId ? { mainEntity: { "@id": faqId } } : {}),
      },
      {
        "@type": "Product",
        "@id": productId,
        name: input.name,
        description: input.description,
        image: [imageUrl],
        sku: input.sku,
        mpn: input.mpn,
        category: input.category,
        material: input.material,
        brand: { "@type": "Brand", name: "SublimApparel" },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        additionalProperty: input.additionalProperty,
        // 2026-09-12 (R31): embed review + aggregateRating INSIDE
        // the Product node (Google's preferred shape for product
        // star-rating rich results). Both fields are stripped at
        // spread-time when no verifiedReviews match this fabric,
        // so the JSON-LD stays byte-equivalent to R25 until a
        // real review with `relatedFabricSlug: "${input.slug}"`
        // is added to verifiedReviews.
        ...(input.review && input.review.length > 0
          ? { review: input.review }
          : {}),
        ...(input.aggregateRating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: input.aggregateRating.ratingValue,
                reviewCount: input.aggregateRating.reviewCount,
                bestRating: input.aggregateRating.bestRating,
                worstRating: input.aggregateRating.worstRating,
              },
            }
          : {}),
        offers: {
          "@type": "Offer",
          "@id": `${url}#offer`,
          url,
          availability: "https://schema.org/InStock",
          priceCurrency: "USD",
          priceValidUntil: "2027-12-31",
          inventoryLevel: {
            "@type": "QuantitativeValue",
            value: 1500,
            unitCode: "MTR",
          },
          seller: { "@id": `${SITE_URL}/#organization` },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "US",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 15,
                maxValue: 25,
                unitCode: "DAY",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 7,
                maxValue: 14,
                unitCode: "DAY",
              },
            },
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnNotPermitted",
            merchantReturnDays: 0,
            description:
              "Cut-to-order fabric is non-returnable. Defective bolts replaced 1:1 within 30 days of receipt.",
          },
        },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntityOfPage: { "@id": webpageId },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        url,
        name: `Bulk ${input.name} supply + cut-to-spec DDP shipping from Yiwu, China`,
        serviceType: "B2B fabric supply + cut-to-order + international DDP shipping",
        description: `Factory-direct ${input.name.toLowerCase()} supply in bulk bolts, cut-to-order yardage from 50 m MOQ, plus DDP (delivered duty paid) shipping to 100+ countries. Composition: ${input.material}.`,
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
          priceCurrency: "USD",
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
        itemListElement: input.breadcrumb.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${SITE_URL}${c.path.startsWith("/") ? c.path : `/${c.path}`}`,
        })),
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

// 2026-09-12 (R35-D): unified @graph payload for the
// /blog/[slug]/ article pages. Pre-R35, every blog post
// emitted 3 independent JSON-LD objects inside one JsonLd
// array (articleSchema + breadcrumbSchema + faqSchema), each
// with its own @context. The BlogPosting node was already
// upgraded to join the global entity graph (R31: author →
// #person-ramon, publisher → #organization, isPartOf → #blog),
// but the WebPage #webpage anchor was inline inside the
// BlogPosting.mainEntityOfPage and the @id graph was missing
// the @id back-references on WebPage + BreadcrumbList +
// FAQPage that every other content type on the site now
// ships. R35-D promotes the 3-array to a single @graph block:
//   - WebPage   #webpage (isPartOf #website + about #organization
//               + speakable + primaryImageOfPage)
//   - BlogPosting #article (the existing R20+R31 BlogPosting
//               node, with @id, author @id, publisher @id,
//               isPartOf #blog, mainEntityOfPage round-trip,
//               and the embedded review + aggregateRating)
//   - Person    #person-ramon (defined inline so the
//               BlogPosting.author @id resolves to a real
//               node in the same @graph, no external lookup
//               required for the author to be parsed)
//   - BreadcrumbList #breadcrumb (Home → Blog → {post title})
//   - FAQPage   #faq (the per-post FAQ block, only emitted
//               when post.faqs.length > 0)
//
// Sharing the helper across all blog posts means a single
// edit to the @graph shape (e.g. add `citation` to the
// BlogPosting, add `knowsAbout` to the Person) now touches
// all blog posts in one place.
export type BlogPostInput = {
  /** URL slug, e.g. "sublimation-vs-dtg". */
  slug: string;
  /** Display title of the post. */
  title: string;
  /** Post excerpt / meta description. */
  excerpt: string;
  /** Absolute cover image URL. */
  coverImage: string;
  /** ISO 8601 publication date (e.g. "2026-04-12"). */
  date: string;
  /** Author display name (e.g. "Ramon Hsu"). */
  author: string;
  /** Category / section the post lives under. */
  category: string;
  /** Tags / keywords for the post. */
  tags: string[];
  /** ISO 8601 duration, e.g. "PT5M" (5 min read). */
  readTime: string;
  /** Optional raw HTML content (used to compute wordCount). */
  content?: string;
  /** Per-post FAQ items rendered inline. Omit (or pass empty
   *  array) to skip FAQPage. */
  faqs?: { q: string; a: string }[];
  /** 3-level breadcrumb for the page. */
  breadcrumb: Crumb[];
  /** Pre-mapped schema review array. Omit to strip the
   *  review field (preserves R31 gating behavior). */
  review?: unknown[];
  /** Pre-computed aggregate rating. Omit to strip
   *  aggregateRating. */
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
};

export function buildBlogPostGraph(input: BlogPostInput) {
  const url = `${SITE_URL}/blog/${input.slug}/`;
  const webpageId = `${url}#webpage`;
  const articleId = `${url}#article`;
  const breadcrumbId = `${url}#breadcrumb`;
  const faqId = input.faqs && input.faqs.length > 0 ? `${url}#faq` : null;
  const coverUrl = input.coverImage.startsWith("http")
    ? input.coverImage
    : `${SITE_URL}${input.coverImage}`;

  // Compute wordCount from the raw HTML content if provided.
  // Matches the existing R20 wordCount logic in /blog/[slug]/page.tsx
  // (strip tags, split on whitespace, count non-empty tokens).
  const wordCount = input.content
    ? input.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length
    : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: input.title,
        description: input.excerpt,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: coverUrl,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          xpath: ["/html/body//h1", "/html/body//article[1]//p"],
        },
        ...(faqId ? { mainEntity: { "@id": faqId } } : {}),
      },
      {
        "@type": "BlogPosting",
        "@id": articleId,
        headline: input.title,
        description: input.excerpt,
        image: coverUrl,
        datePublished: input.date,
        // 2026-09-12 (R35-D): dateModified stays at build time so
        // every Cloudflare deploy refreshes the modified timestamp
        // and Google re-evaluates the post against current SERP
        // competitors. Same contract as R20.
        dateModified: new Date().toISOString(),
        inLanguage: "en",
        author: { "@id": `${SITE_URL}/#person-ramon` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/blog/#blog` },
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: { "@id": webpageId },
        keywords: input.tags.join(", "),
        articleSection: input.category,
        url,
        ...(wordCount ? { wordCount } : {}),
        timeRequired: input.readTime,
        // 2026-09-12 (R35-D): embed review + aggregateRating INSIDE
        // the BlogPosting node (same shape as R31 /fabric/ and R30
        // /products/all/[slug]/). BlogPosting extends Article so
        // both fields are valid. Google prefers this for the
        // visible star-rating rich result. Gating: verifiedReviews
        // empty today → both fields stripped at spread-time, JSON-LD
        // byte-equivalent to R20.
        ...(input.review && input.review.length > 0
          ? { review: input.review }
          : {}),
        ...(input.aggregateRating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: input.aggregateRating.ratingValue,
                reviewCount: input.aggregateRating.reviewCount,
                bestRating: input.aggregateRating.bestRating,
                worstRating: input.aggregateRating.worstRating,
              },
            }
          : {}),
      },
      {
        // 2026-09-12 (R35-D): define the Person node inline so
        // the BlogPosting.author @id resolves to a real node in
        // the same @graph, no external lookup required for the
        // author to be parsed. Author name + sameAs list is
        // mirrored from the about page (Ramon Hsu, CEO).
        "@type": "Person",
        "@id": `${SITE_URL}/#person-ramon`,
        name: "Ramon Hsu",
        jobTitle: "Founder & CEO, SublimApparel",
        worksFor: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/about/`,
        knowsAbout: [
          "Dye-sublimation printing",
          "Custom apparel manufacturing",
          "DDP (Delivered Duty Paid) shipping",
          "All-over digital print on cotton",
          "Yiwu, China apparel supply chain",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: input.breadcrumb.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${SITE_URL}${c.path.startsWith("/") ? c.path : `/${c.path}`}`,
        })),
      },
      ...(input.faqs && input.faqs.length > 0 && faqId
        ? [
            {
              "@type": "FAQPage",
              "@id": faqId,
              mainEntity: input.faqs.map((it) => ({
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

// 2026-09-12 (R36): unified @graph payload for the
// /technique/ hub page. Pre-R36, the page emitted 3
// independent JSON-LD <script> tags:
//   (1) BreadcrumbList (Home → Technique)
//   (2) HowTo (sublimation process steps)
//   (3) CollectionPage + mainEntity ItemList (20 techniques)
//   (4) FAQPage (7 inline FAQs - was a 4th script not even
//       in the original set, was a logical extension but
//       never wired up to schema)
// The HowTo and CollectionPage had no @id, no isPartOf, no
// about join to the brand entity graph, and the ItemList
// mainEntity was packed inline instead of a sibling @id
// Google could re-walk. R36 promotes all three (plus the
// optional FAQPage) to a single @graph block:
//   - WebPage   #webpage (isPartOf #website + about
//               #organization + speakable)
//   - CollectionPage #collection (with @id, mainEntity
//               round-trip to the ItemList)
//   - ItemList  #itemlist (20 techniques, itemListOrder
//               Ascending - Google supports <=50 items
//               before ItemList is ignored, so 20 is safe)
//   - HowTo     #howto (the 6-step sublimation process,
//               with @id and sameAs round-trip so the
//               HowTo node joins the brand entity graph)
//   - BreadcrumbList #breadcrumb
//   - FAQPage   #faq (when faq[] is non-empty)
//
// Same shared pattern as buildCollectionPageGraph so every
// list-hub page on the site (products, technique, blog) has
// the same JSON-LD shape.
export type TechniqueHubItem = {
  slug: string;
  name: string;
};

export type TechniqueHubHowToStep = {
  name: string;
  text: string;
};

export type TechniqueHubInput = {
  /** The 20 techniques to enumerate inside the ItemList. */
  items: TechniqueHubItem[];
  /** 6 HowTo steps for the sublimation process. Omit to
   *  skip the HowTo node. */
  howTo?: {
    name: string;
    description: string;
    steps: TechniqueHubHowToStep[];
  };
  /** Optional FAQ for the page. The /technique/ page has
   *  7 inline FAQs (R8). Omit to skip FAQPage. */
  faq?: FaqItem[];
};

export function buildTechniqueHubGraph(input: TechniqueHubInput) {
  const url = `${SITE_URL}/technique/`;
  const webpageId = `${url}#webpage`;
  const collectionId = `${url}#collection`;
  const itemListId = `${url}#itemlist`;
  const howToId = input.howTo ? `${url}#howto` : null;
  const breadcrumbId = `${url}#breadcrumb`;
  const faqId = input.faq && input.faq.length > 0 ? `${url}#faq` : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: "Which Print Technique Fits Your Design? — 20 Methods Compared",
        description:
          "Compare 20 apparel decoration techniques — sublimation, screen printing, DTG, DTF, embroidery, 3D puff, rhinestone and more. We run all 20 in-house.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/technique-hero.webp`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          xpath: ["/html/body//h1", "/html/body//section[1]//p"],
        },
        ...(faqId ? { mainEntity: { "@id": faqId } } : {}),
      },
      {
        "@type": "CollectionPage",
        "@id": collectionId,
        url,
        name: "Which Print Technique Fits Your Design? — 20 Methods Compared",
        description:
          "Compare 20 apparel decoration techniques — sublimation, screen printing, DTG, DTF, embroidery, 3D puff, rhinestone and more. We run all 20 in-house.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        provider: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": itemListId },
      },
      {
        "@type": "ItemList",
        "@id": itemListId,
        name: "20 Sublimation Apparel Print Techniques",
        description:
          "All 20 decoration techniques we run in-house at our Yiwu factory, ordered by print-process family.",
        numberOfItems: input.items.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: input.items.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: `${SITE_URL}/technique/${p.slug}/`,
        })),
        isPartOf: { "@id": collectionId },
      },
      ...(input.howTo && howToId
        ? [
            {
              "@type": "HowTo",
              "@id": howToId,
              name: input.howTo.name,
              description: input.howTo.description,
              step: input.howTo.steps.map((s, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                name: s.name,
                text: s.text,
              })),
              isPartOf: { "@id": webpageId },
            },
          ]
        : []),
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
            name: "Technique",
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

// 2026-09-12 (R35-B): unified @graph payload for the 120
// /products/all/[slug]/ product detail pages. Pre-R35, every
// product detail page emitted 3 independent <script> tags
// (BreadcrumbList + flat Product + FAQPage). The Product node
// already had a good shape (sku, mpn, brand @id, manufacturer @id,
// review + aggregateRating embedded when reviews exist), but it
// was a flat top-level script with no @id join to WebPage, no
// isPartOf, and no Service sibling for the DDP custom manufacturing
// intent. R35-B promotes all three to a single @graph block so:
//   - the WebPage #webpage node round-trips through mainEntityOfPage
//   - the Product #product node joins the brand entity graph via
//     isPartOf + manufacturer @id
//   - a Service #service sibling carries the 8-country areaServed
//     for the "DDP custom {category}" intent (matches the catalog
//     overview, the 10 per-category pages, and the country shipping
//     pages so Google sees one consistent service surface)
//   - BreadcrumbList #breadcrumb (4 levels: Home → Products → All
//     Products → {product name}) and FAQPage #faq round-trip via @id
//   - Product review + aggregateRating (already embedded by R30) are
//     preserved byte-equivalent when reviews exist
// Sharing the helper across all 120 detail pages means a single
// edit to the @graph shape (e.g. add hasMerchantReturnPolicy to the
// catalog-wide Service node, swap the shipping country list) now
// touches all detail pages in one place.
export type ProductDetailInput = {
  /** URL slug, e.g. "all-over-print-womens-rectangle-scarf". */
  slug: string;
  /** Display name of the product. */
  name: string;
  /** Meta description (≤ 200 chars). */
  description: string;
  /** One or more absolute image URLs (multi-image Product earns
   *  richer visual SERP coverage). */
  image: string[];
  /** 4-digit catalog number, printed on the inner care label. */
  sku: string;
  /** Same as sku — used in mpn for Google dedupe. */
  mpn: string;
  /** Sub-subcategory label, e.g. "T-Shirt" or "Jersey". */
  category: string;
  /** Main fabric material line, e.g. "Polyester" or "Cotton". */
  material: string;
  /** additionalProperty entries (Fabric weight, Material, Process,
   *  MOQ). Already in PropertyValue shape. */
  additionalProperty: { "@type": string; name: string; value: string }[];
  /** 4-level breadcrumb for the page. */
  breadcrumb: Crumb[];
  /** Per-product FAQ items rendered inline. Omit to skip FAQPage. */
  faq?: FaqItem[];
  /** Pre-mapped schema review array. Omit to strip the review field
   *  (preserves R30 gating behavior). */
  review?: unknown[];
  /** Pre-computed aggregate rating. Omit to strip aggregateRating. */
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
};

export function buildProductDetailGraph(input: ProductDetailInput) {
  const url = `${SITE_URL}/products/all/${input.slug}/`;
  const webpageId = `${url}#webpage`;
  const productId = `${url}#product`;
  const serviceId = `${url}#service`;
  const breadcrumbId = `${url}#breadcrumb`;
  const faqId = input.faq && input.faq.length > 0 ? `${url}#faq` : null;
  const primaryImage = input.image[0] ?? `${SITE_URL}/product-hero-products.webp`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: `${input.name} — Custom All-Over Print | SublimApparel`,
        description: input.description,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: primaryImage,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          xpath: ["/html/body//h1", "/html/body//section[1]//p"],
        },
        ...(faqId ? { mainEntity: { "@id": faqId } } : {}),
      },
      {
        "@type": "Product",
        "@id": productId,
        name: input.name,
        description: input.description,
        image: input.image,
        sku: input.sku,
        mpn: input.mpn,
        category: input.category,
        material: input.material,
        brand: { "@type": "Brand", name: "SublimApparel" },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        additionalProperty: input.additionalProperty,
        ...(input.review && input.review.length > 0
          ? { review: input.review }
          : {}),
        ...(input.aggregateRating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: input.aggregateRating.ratingValue,
                reviewCount: input.aggregateRating.reviewCount,
                bestRating: input.aggregateRating.bestRating,
                worstRating: input.aggregateRating.worstRating,
              },
            }
          : {}),
        offers: {
          "@type": "Offer",
          "@id": `${url}#offer`,
          url,
          availability: "https://schema.org/MadeToOrder",
          priceCurrency: "USD",
          priceValidUntil: "2027-12-31",
          inventoryLevel: "Made to order",
          seller: { "@id": `${SITE_URL}/#organization` },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "US",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 15,
                maxValue: 25,
                unitCode: "DAY",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 7,
                maxValue: 14,
                unitCode: "DAY",
              },
            },
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnNotPermitted",
            merchantReturnDays: 0,
            description:
              "Made-to-order apparel is non-returnable. Defective units replaced 1:1 within 30 days of receipt.",
          },
        },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntityOfPage: { "@id": webpageId },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        url,
        name: `DDP custom ${input.category.toLowerCase()} manufacturing from Yiwu, China`,
        serviceType: "B2B custom apparel manufacturing + international DDP shipping",
        description: `Factory-direct custom ${input.category.toLowerCase()} manufacturing, MOQ ${input.additionalProperty.find((p) => p.name === "MOQ")?.value ?? "50 pieces per design"}, full dye-sublimation print, DDP (delivered duty paid) shipping to 100+ countries.`,
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
          priceCurrency: "USD",
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
        itemListElement: input.breadcrumb.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${SITE_URL}${c.path.startsWith("/") ? c.path : `/${c.path}`}`,
        })),
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
