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
