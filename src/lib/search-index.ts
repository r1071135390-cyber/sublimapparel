// 2026-09-11 (R25-C): unified search index for /search/ landing page.
// We build a slim, normalized record per searchable entity so the
// client component can run a fast in-memory full-text filter without
// shipping the full product / fabric / blog / technique datasets to the
// browser. Each record has exactly the fields the search UI renders:
// type, title, slug, href, blurb, keywords[]. Anything not used by the
// search UI is dropped to keep the client bundle small.

import { products, type Product } from "./products-data";
import { fabricTypes, type Fabric } from "./fabric-data";
import { blogPosts, type BlogPost } from "./blog";
import { techniques, type Technique } from "./techniques";
import { industries, type IndustryCase } from "./cases";

export type SearchResultType =
  | "product"
  | "fabric"
  | "blog"
  | "technique"
  | "case"
  | "page";

export interface SearchResult {
  type: SearchResultType;
  typeLabel: string; // e.g. "Product", "Fabric", "Blog"
  title: string;
  blurb: string;
  href: string;
  keywords: string[]; // lowercased; the search filter hits these + title + blurb
  // Optional: a small badge string shown above the title.
  badge?: string;
  // Optional: for the orange "tag" above the card (e.g. "Polyester jersey")
  tag?: string;
}

const toLower = (s: string) => s.toLowerCase();

function productToResult(p: Product): SearchResult {
  // Compose a blurb from the most buyer-relevant fields. description
  // alone is too short for a meaningful snippet, so we surface category
  // + materials + a hint of MOQ.
  const mats = Array.from(new Set(p.fabrics.map((f) => f.material))).join(
    " / "
  );
  const blurb = p.description.length > 200
    ? p.description.slice(0, 200).trimEnd() + "…"
    : p.description;
  return {
    type: "product",
    typeLabel: "Product",
    title: p.name,
    blurb,
    href: `/products/all/${p.slug}/`,
    badge: p.category,
    tag: mats ? `Material: ${mats}` : undefined,
    keywords: [
      p.name,
      p.category,
      p.subcategory || "",
      ...p.sports,
      ...p.scenarios,
      mats,
      `MOQ ${p.moq}`,
      p.fabrics.map((f) => `${f.gsm} ${f.material} ${f.process}`).join(" "),
    ]
      .map(toLower)
      .filter(Boolean),
  };
}

function fabricToResult(f: Fabric): SearchResult {
  return {
    type: "fabric",
    typeLabel: "Fabric",
    title: f.name,
    blurb: f.metaDescription.length > 200
      ? f.metaDescription.slice(0, 200).trimEnd() + "…"
      : f.metaDescription,
    href: `/fabric/${f.slug}/`,
    badge: f.tags[0] || "Fabric",
    tag: `${f.comp} · ${f.gsm} GSM · ${f.spec}`,
    keywords: [
      f.name,
      f.comp,
      f.gsm,
      f.spec,
      f.use,
      f.description,
      f.intro,
      f.sublimationSuitability || "",
      ...(f.tags || []),
      ...(f.printMethods || []),
      ...(f.characteristics || []),
      ...(f.bestForList || []),
    ]
      .flat()
      .map(toLower)
      .filter(Boolean),
  };
}

function blogToResult(b: BlogPost): SearchResult {
  return {
    type: "blog",
    typeLabel: "Blog",
    title: b.title,
    blurb: b.excerpt,
    href: `/blog/${b.slug}/`,
    badge: b.category,
    tag: b.readTime,
    keywords: [
      b.title,
      b.excerpt,
      b.category,
      ...(b.tags || []),
      b.metaTitle,
      b.metaDescription,
      ...(b.sections || []).flatMap((s) => [s.heading, ...s.paragraphs]),
    ]
      .flat()
      .map(toLower)
      .filter(Boolean),
  };
}

function techniqueToResult(t: Technique): SearchResult {
  return {
    type: "technique",
    typeLabel: "Technique",
    title: t.name,
    blurb: t.tagline,
    href: `/technique/${t.slug}/`,
    badge: t.shortName,
    tag: `MOQ ${t.quickSpecs.moq}`,
    keywords: [
      t.name,
      t.shortName,
      t.tagline,
      t.metaDescription,
      ...(t.keywords || []),
      t.quickSpecs.bestFor,
      t.quickSpecs.fabric,
      t.quickSpecs.durability,
      t.quickSpecs.cost,
      t.quickSpecs.leadTime,
      ...(t.pros || []),
      ...(t.bestUseCases || []),
      ...(t.intro || []),
      ...(t.process || []).map((p) => `${p.title} ${p.description}`),
    ]
      .flat()
      .map(toLower)
      .filter(Boolean),
  };
}

function caseToResult(c: IndustryCase): SearchResult {
  return {
    type: "case",
    typeLabel: "Industry",
    title: c.title,
    blurb: c.blurb,
    href: `/industries/${c.relatedIndustrySlug || c.slug}/`,
    badge: c.relatedScenario,
    tag: c.pitch,
    keywords: [
      c.title,
      c.blurb,
      c.pitch,
      c.relatedScenario,
      c.relatedIndustrySlug || "",
      ...(c.cases || []).flatMap((cs) => [cs.title, cs.client || "", cs.summary, ...(cs.products || [])]),
    ]
      .flat()
      .map(toLower)
      .filter(Boolean),
  };
}

// Top-level static pages that are not in any data source above, so they
// can be surfaced by generic queries like "shipping", "DDP", "factory",
// "contact", "blog", etc. Each entry is a hand-tuned record so a generic
// "shipping" or "FAQ" query surfaces the right page.
const STATIC_PAGES: SearchResult[] = [
  {
    type: "page",
    typeLabel: "Page",
    title: "All-over print catalog",
    blurb:
      "100 all-over print apparel products cross-filtered by garment, sport, and scenario. Polyester sublimation + all-over digital print on cotton.",
    href: "/products/all/",
    badge: "Catalog",
    tag: "120 products · 14 categories",
    keywords: [
      "products", "catalog", "all over print", "all-over print", "sublimation",
      "apparel", "garment", "yoycol", "tshirts", "t-shirts", "jerseys", "hoodies",
    ],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Fabric library",
    blurb:
      "60+ in-stock fabrics: polyester, cotton, blends, performance. Full specs (GSM, width, composition, print compatibility).",
    href: "/fabric/",
    badge: "Fabric",
    tag: "60+ fabrics",
    keywords: [
      "fabric", "fabric library", "polyester", "cotton", "blend", "gsm", "weight",
      "composition", "spec", "specs", "swatch", "stock fabric",
    ],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Sublimation on 100% cotton (allover)",
    blurb:
      "All-over digital print on 100% cotton — true edge-to-edge, cut-and-sew, MOQ 50. The cotton alternative to polyester sublimation.",
    href: "/fabric/cotton/",
    badge: "Fabric",
    tag: "DTG / DTF cotton",
    keywords: [
      "cotton", "100% cotton", "sublimation cotton", "dtg", "dtf",
      "all-over cotton", "cotton jersey", "cotton hoodie", "cut and sew cotton",
    ],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Get a quote (custom apparel)",
    blurb:
      "Tell us your design, quantity, deadline. Get a DDP landed price within 24 hours. No setup fees, no hidden costs.",
    href: "/get-a-quote/",
    badge: "Quote",
    tag: "24-hour response",
    keywords: [
      "quote", "get a quote", "request quote", "rfq", "inquiry", "pricing",
      "moq", "lead time", "samples",
    ],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Express quote (30 min)",
    blurb:
      "Skip the back-and-forth. Upload your design + spec and get a fixed landed price within 30 minutes during business hours.",
    href: "/get-a-quote-express/",
    badge: "Quote",
    tag: "30-min response",
    keywords: [
      "express quote", "fast quote", "30 minute quote", "instant quote",
      "upload design", "express inquiry",
    ],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Order a custom sample",
    blurb:
      "Pre-production samples with your design. $25–$60 per piece, refunded on bulk 100+ orders. Lead time 5–7 days.",
    href: "/samples/",
    badge: "Sample",
    tag: "5-7 day lead time",
    keywords: ["sample", "pre-production sample", "swatch", "material swatch", "color card"],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "DDP shipping — delivered duty paid",
    blurb:
      "DDP to 100+ countries. We handle customs, duties, and last-mile delivery so you receive a single landed invoice.",
    href: "/shipping/ddp/",
    badge: "Shipping",
    tag: "100+ countries",
    keywords: [
      "ddp", "delivered duty paid", "duty paid", "customs", "import duty",
      "tariff", "shipping", "international shipping", "landed cost", "landed price",
    ],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "US warehouse (Fontana, CA)",
    blurb:
      "2-5 day domestic shipping from our Fontana, California warehouse. No customs, no duties for US customers.",
    href: "/shipping/us-warehouse/",
    badge: "Shipping",
    tag: "2-5 day domestic",
    keywords: [
      "us warehouse", "fontana", "california", "domestic shipping",
      "us domestic", "no customs", "no duties", "usa warehouse", "us fulfillment",
    ],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Yiwu factory (35 Lingyun Road)",
    blurb:
      "2,000 m² production floor. 12 lines, 6 inline printers, 50+ staff. Direct access to Yiwu's small-commodity logistics network.",
    href: "/about/factory/",
    badge: "Factory",
    tag: "2,000 m² · 12 lines",
    keywords: ["factory", "yiwu", "yiwu factory", "manufacturer", "production", "production line", "printer", "staff"],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Production process (15–25 days)",
    blurb:
      "12-step production process from inquiry to DDP delivery. Standard bulk lead time 15–25 business days after sample sign-off.",
    href: "/about/production/",
    badge: "Process",
    tag: "12 steps",
    keywords: ["production", "process", "lead time", "manufacturing", "production timeline", "15-25 days"],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Quality control (AQL 2.5)",
    blurb:
      "4-step inspection covering stitching, print, color fastness, sizing, packaging. Pre-shipment photo report on every order.",
    href: "/about/quality/",
    badge: "Quality",
    tag: "AQL 2.5",
    keywords: ["quality", "quality control", "qc", "inspection", "aql", "pre-shipment", "defect rate"],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Pricing & MOQ guide",
    blurb:
      "MOQ 50 pcs per design. Sample $25–$60. Pricing tiers, payment terms, and how to read a landed DDP quote.",
    href: "/pricing/",
    badge: "Pricing",
    tag: "MOQ 50 pcs",
    keywords: [
      "pricing", "price", "moq", "minimum order", "minimum", "50 pcs",
      "sample cost", "payment", "t/t", "wire", "paypal",
    ],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Contact the factory",
    blurb:
      "Email, WhatsApp, phone, factory address. Sales managers respond within 1 business day, in English or Chinese.",
    href: "/contact/",
    badge: "Contact",
    tag: "1-business-day reply",
    keywords: ["contact", "email", "whatsapp", "phone", "sales", "factory address", "reach us"],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Industries we serve (12 verticals)",
    blurb:
      "Sports teams, endurance races, festivals, music tours, corporate, schools, breweries, agencies, trade shows, e-commerce, political campaigns.",
    href: "/industries/",
    badge: "Industries",
    tag: "12 verticals",
    keywords: [
      "industry", "industries", "vertical", "client", "case study", "case studies",
      "sports teams", "race", "festival", "corporate", "schools", "agency", "agencies",
    ],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Blog & guides",
    blurb:
      "Sublimation vs DTG, fabric care, sourcing guides, esports jersey fabric, MOQ tips, and factory stories from the Yiwu floor.",
    href: "/blog/",
    badge: "Blog",
    tag: "20+ articles",
    keywords: ["blog", "guide", "guides", "article", "articles", "insights", "story", "stories"],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Decoration techniques (20 methods)",
    blurb:
      "Sublimation, screen print, DTG, DTF, embroidery, 3D puff, rhinestone — costs, durability, fabric fit, lead time.",
    href: "/technique/",
    badge: "Techniques",
    tag: "20 methods",
    keywords: [
      "technique", "techniques", "print method", "decoration", "embroidery",
      "screen print", "screen printing", "dtg", "dtf", "sublimation", "3d puff",
      "rhinestone", "applique", "discharge",
    ],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Care & washing guide",
    blurb:
      "How to wash sublimated shirts, how to iron printed apparel, how to keep all-over print colors vivid for years.",
    href: "/fabric/care/",
    badge: "Care",
    tag: "Wash & care",
    keywords: ["care", "wash", "washing", "iron", "laundry", "how to wash", "sublimation care", "care guide"],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Yiwu factory on WhatsApp",
    blurb:
      "Chat directly with the Yiwu factory sales team. No middleman, no agent, no markup. Quote in 30 min during China business hours.",
    href: "/yiwu-factory-whatsapp/",
    badge: "WhatsApp",
    tag: "30-min reply",
    keywords: ["whatsapp", "yiwu factory", "chat", "direct", "no middleman", "no agent"],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Case studies (real briefs)",
    blurb:
      "Real client briefs: race teams, music festivals, school Greek weekends, political campaigns, brewery merch, healthcare networks.",
    href: "/cases/",
    badge: "Cases",
    tag: "8 case studies",
    keywords: ["case study", "case studies", "client", "project", "brief", "example"],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "How to source from China (playbook)",
    blurb:
      "5-step sourcing workflow: finding factories, RFQ, sampling, contracts, payment, QC, freight, customs. Downloadable templates.",
    href: "/how-to-source/",
    badge: "Guide",
    tag: "5-step playbook",
    keywords: ["how to source", "sourcing", "playbook", "rfq", "import", "importer"],
  },
  {
    type: "page",
    typeLabel: "Page",
    title: "Site map",
    blurb:
      "Internal site architecture overview. See every page, every product, every guide in one place.",
    href: "/site-map/",
    badge: "Site",
    tag: "Full index",
    keywords: ["sitemap", "site map", "index", "all pages", "directory"],
  },
];

let cachedIndex: SearchResult[] | null = null;

/**
 * Returns a slim, normalized search index. Built once per server (or
 * client) lifetime; safe to call repeatedly.
 */
export function getSearchIndex(): SearchResult[] {
  if (cachedIndex) return cachedIndex;
  const items: SearchResult[] = [
    ...products.map(productToResult),
    ...fabricTypes.map(fabricToResult),
    ...blogPosts.map(blogToResult),
    ...techniques.map(techniqueToResult),
    ...industries.map(caseToResult),
    ...STATIC_PAGES,
  ];
  cachedIndex = items;
  return items;
}

/**
 * Tokenize a query into normalized search terms.
 * Splits on whitespace and hyphens, lowercases, drops tiny tokens.
 */
export function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .split(/[\s,\-_./]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2);
}

/**
 * Returns true if every token in `tokens` is present in at least one
 * of the searchable fields of the result. Empty token list returns false
 * (caller decides what to do with an empty query).
 */
export function resultMatchesTokens(
  result: SearchResult,
  tokens: string[]
): boolean {
  if (tokens.length === 0) return false;
  // Build a single lowercase haystack per result (cached on the
  // record itself via WeakMap would be faster, but for 250 records the
  // join is still under 1ms on first keystroke).
  const haystack = [
    result.title,
    result.blurb,
    result.typeLabel,
    result.badge || "",
    result.tag || "",
    result.href,
    ...result.keywords,
  ]
    .join(" ")
    .toLowerCase();
  return tokens.every((t) => haystack.includes(t));
}

/**
 * Filter the index for `query`. If `query` is empty, returns an empty
 * array (the UI should treat this as "no query yet"). Results are
 * returned in their natural index order (curated priority: products,
 * fabrics, blog, techniques, cases, pages) — the UI can re-sort by
 * recency or type.
 */
export function searchIndex(
  query: string,
  opts: { type?: SearchResultType; limit?: number } = {}
): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  const { type, limit = 200 } = opts;
  const idx = getSearchIndex();
  const matches: SearchResult[] = [];
  for (const r of idx) {
    if (type && r.type !== type) continue;
    if (resultMatchesTokens(r, tokens)) {
      matches.push(r);
      if (matches.length >= limit) break;
    }
  }
  return matches;
}

/**
 * Counts of total results per type for a given query. Used to power
 * the type-tabs above the result list.
 */
export function searchIndexCounts(query: string): Record<SearchResultType, number> {
  const tokens = tokenize(query);
  if (tokens.length === 0) {
    return { product: 0, fabric: 0, blog: 0, technique: 0, case: 0, page: 0 };
  }
  const idx = getSearchIndex();
  const counts: Record<SearchResultType, number> = {
    product: 0, fabric: 0, blog: 0, technique: 0, case: 0, page: 0,
  };
  for (const r of idx) {
    if (resultMatchesTokens(r, tokens)) counts[r.type] += 1;
  }
  return counts;
}
