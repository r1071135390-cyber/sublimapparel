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
