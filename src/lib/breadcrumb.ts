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
