// ============================================================
// 4-Layer Tag Taxonomy
// ============================================================
// Hierarchy:
//
//   Solution (6)   ← top-level page
//   └─ Industry (12)  ← mid-level page (SEO facet of the Solution)
//      └─ Scenario (25)  ← leaf-level tag (product tag)
//         └─ Product  (has direct scenarios[] tag)
//
// Plus two cross-cutting dimensions:
//   - Category  (apparel name, primary classification — T-Shirt, Hoodie, ...)
//   - Sport     (cross-cutting tag — Soccer, Yoga, etc.; not in the hierarchy)
//
// A product's `scenarios` are the source of truth for its
// Solution/Industry membership (computed at runtime by helpers).
//
// Source of truth: assets/products-recategorize.xlsx (Sheet 1 = Solutions table,
// Sheet 2 = products-recategorize). The user explicitly said to:
//   1. Fix scenario typos
//   2. Use Solution/Industry to scrape products whose scenario tags match
//   3. E-commerce & fulfillment has 0 products — page will be TBD
// ============================================================

// ===== 6 SOLUTIONS =====
export interface Solution {
  slug: string;          // URL segment, e.g. "teams-sports-apparel"
  name: string;          // display name
  description: string;   // one-line positioning
  industries: string[];  // child industry slugs
  scenarios: string[];   // canonical scenarios owned by this solution
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "teams-sports-apparel",
    name: "Teams & Sports Apparel",
    description: "Performance-driven team kits and competitive sports apparel built for clubs, leagues, and athlete-led events.",
    industries: ["sports-teams-leagues", "endurance-race-events"],
    scenarios: ["Team & Club", "Sports League", "Studio & Gym"],
  },
  {
    slug: "event-festivals-conferences",
    name: "Event, Festival & Conferences",
    description: "High-impact apparel for live events, conferences, festivals, and large-scale gatherings.",
    industries: ["events-conferences", "music-festival-tour-merchandise", "political-campaigns"],
    scenarios: [
      "Event & Festival",
      "Political Campaign",
      "Music & Merch",
      "Wedding & Party",
      "Festival & Holiday",
      "Beach",
    ],
  },
  {
    slug: "corporate-organization-apparel",
    name: "Corporate & Organization Apparel",
    description: "Unified uniforms and branded apparel for every kind of organization — from global enterprises to local non-profits.",
    industries: [
      "corporate-employee-programs",
      "schools-universities-greek-life",
      "breweries-coffee-hospitality",
    ],
    scenarios: [
      "School & Education",
      "Corporate & Branding",
      "Uniform & Workwear",
      "Fundraiser & Charity",
      "Construction & Engineering",
      "Express & Logistics",
      "Hospitality & F&B",
      "Medical & Healthcare",
      "Security & Property",
      "Retail & Supermarket",
      "Corporate & Promo",
      "Transit & Transport",
      "Military",
    ],
  },
  {
    slug: "promotional-marketing-apparel",
    name: "Promotional & Marketing Apparel",
    description: "Promotional swag, branded giveaways, and trade-show apparel engineered to get your brand noticed.",
    industries: ["promotional-products-distributors", "trade-shows-display"],
    scenarios: ["Promotional Swag", "Corporate & Promo", "Gift & Souvenir"],
  },
  {
    slug: "apparel-brands-agencies",
    name: "Apparel Brands & Agencies",
    description: "Full-package apparel manufacturing for emerging fashion brands and creative agencies — low MOQ, full customization.",
    industries: ["apparel-brands-agencies"],
    scenarios: ["Retail & Fashion"],
  },
  {
    slug: "e-commerce-fulfillment",
    name: "E-commerce & Fulfillment",
    description: "Dropship, POD, and bulk fulfillment ready for Shopify, Amazon, Etsy, and other e-commerce platforms.",
    industries: ["e-commerce-fulfillment"],
    // Per product owner (Aug 2026): E-commerce & fulfillment has 0 dedicated
    // products. The page will be designed later; for now, no scenarios are
    // assigned so it never scrapes products through tag intersection.
    scenarios: [],
  },
];

// ===== 12 INDUSTRIES =====
export interface Industry {
  slug: string;       // URL segment, e.g. "sports-teams-leagues"
  name: string;       // display name
  solution: string;   // parent solution slug
  description: string;
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "sports-teams-leagues",
    name: "Sports Teams & Leagues",
    solution: "teams-sports-apparel",
    description: "Full kits for amateur clubs, school teams, professional leagues, and recreational leagues across every sport.",
  },
  {
    slug: "endurance-race-events",
    name: "Endurance & Race Events",
    solution: "teams-sports-apparel",
    description: "Performance race kits for marathons, triathlons, cycling events, and endurance competitions.",
  },
  {
    slug: "events-conferences",
    name: "Events & Conferences",
    solution: "event-festivals-conferences",
    description: "Branded apparel for corporate events, trade conferences, summits, and large-scale business gatherings.",
  },
  {
    slug: "music-festival-tour-merchandise",
    name: "Music, Tour & Festival Merchandise",
    solution: "event-festivals-conferences",
    description: "Tour merch and festival apparel for bands, artists, music festivals, and entertainment brands.",
  },
  {
    slug: "political-campaigns",
    name: "Political Campaigns",
    solution: "event-festivals-conferences",
    description: "Campaign apparel, rally wear, and political merchandise for elections and advocacy efforts.",
  },
  {
    slug: "corporate-employee-programs",
    name: "Corporate & Employee Programs",
    solution: "corporate-organization-apparel",
    description: "Employee uniforms, branded workwear, and corporate identity apparel for companies of every size.",
  },
  {
    slug: "schools-universities-greek-life",
    name: "Schools, Universities & Greek Life",
    solution: "corporate-organization-apparel",
    description: "School spirit wear, university apparel, and Greek life merchandise for student organizations.",
  },
  {
    slug: "breweries-coffee-hospitality",
    name: "Breweries, Coffee & Hospitality",
    solution: "corporate-organization-apparel",
    description: "Hospitality uniforms and branded merch for breweries, coffee shops, restaurants, and hotels.",
  },
  {
    slug: "promotional-products-distributors",
    name: "Promotional Products Distributors",
    solution: "promotional-marketing-apparel",
    description: "Custom promotional apparel for distributors serving the branded merchandise industry.",
  },
  {
    slug: "trade-shows-display",
    name: "Trade Shows & Exhibitions Display",
    solution: "promotional-marketing-apparel",
    description: "Booth staff apparel, giveaway garments, and trade-show branded merchandise.",
  },
  {
    slug: "apparel-brands-agencies",
    name: "Apparel Brands & Agencies",
    solution: "apparel-brands-agencies",
    description: "Private-label and white-label apparel manufacturing for fashion brands, agencies, and creative studios.",
  },
  {
    slug: "e-commerce-fulfillment",
    name: "E-commerce & Fulfillment",
    solution: "e-commerce-fulfillment",
    description: "Dropship, POD, and bulk e-commerce fulfillment for Shopify, Amazon, Etsy, and other platforms.",
  },
];

// ===== 25 SCENARIOS (canonical, typo-fixed) =====
export const SCENARIOS: readonly string[] = [
  "Beach",
  "Construction & Engineering",
  "Corporate & Branding",
  "Corporate & Promo",
  "Event & Festival",
  "Express & Logistics",
  "Festival & Holiday",
  "Fundraiser & Charity",
  "Gift & Souvenir",
  "Hospitality & F&B",
  "Medical & Healthcare",
  "Military",
  "Music & Merch",
  "Political Campaign",
  "Promotional Swag",
  "Retail & Fashion",
  "Retail & Supermarket",
  "School & Education",
  "Security & Property",
  "Sports League",
  "Studio & Gym",
  "Team & Club",
  "Transit & Transport",
  "Uniform & Workwear",
  "Wedding & Party",
];

// ===== 41 SPORTS (from xlsx; Ski/Snowboard removed since 0 products use them) =====
export const SPORTS: readonly string[] = [
  "AFL",
  "American Football",
  "Athletics",
  "Badminton",
  "Baseball",
  "Basketball",
  "Beach",
  "Bowling",
  "Boxing",
  "Cheer",
  "Cricket",
  "CrossFit",
  "Cycling",
  "Dance",
  "Dive",
  "Esports",
  "Fishing",
  "Football",
  "Golf",
  "Gym",
  "Hockey",
  "Lacrosse",
  "MMA",
  "Marathon",
  "Martial Arts",
  "Netball",
  "Pilates",
  "Rugby",
  "Running",
  "Skate",
  "Skating",
  "Soccer",
  "Softball",
  "Studio",
  "Surf",
  "Swimwear",
  "Table Tennis",
  "Tennis",
  "Triathlon",
  "Volleyball",
  "Wrestling",
  "Yoga",
];

// ===== 14 CATEGORIES =====
export const CATEGORIES: readonly string[] = [
  "Hoodie",
  "T-Shirt",
  "Jersey",
  "Sportswear",
  "Polo Shirt",
  "Jacket",
  "Pants",
  "Sweatshirt",
  "Shirt",
  "Skirt",
  "Tank Top & Camis",
  "Cap",
  "Home",
  "Uniform & Workwear",
];

// ============================================================
// REVERSE-LOOKUP HELPERS
// ============================================================
//
// A product's scenarios are the source of truth.
// To find which Solutions/Industries a product belongs to:
//   product.scenarios ∩ Solution.scenarios ≠ ∅  →  belongs to Solution
//   product.scenarios ∩ (Industry.solution).scenarios ≠ ∅  →  belongs to Industry
//
// Sports are a cross-cutting tag; they don't gate Solution/Industry membership.
// ============================================================

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

export interface ProductLike {
  category?: string;
  sports: string[];
  scenarios: string[];
}

/**
 * Return the Solutions a product belongs to.
 * A product is in a Solution if any of its scenarios is in the Solution's scenarios.
 */
export function getSolutionsForProduct(product: ProductLike): Solution[] {
  if (!product.scenarios?.length) return [];
  const scenarioSet = new Set(product.scenarios);
  return SOLUTIONS.filter((sol) =>
    sol.scenarios.some((s) => scenarioSet.has(s))
  );
}

/**
 * Return the Industries a product belongs to.
 * Same logic as Solutions but resolved through the parent Solution.
 */
export function getIndustriesForProduct(product: ProductLike): Industry[] {
  const solutions = getSolutionsForProduct(product);
  const solutionSlugs = new Set(solutions.map((s) => s.slug));
  return INDUSTRIES.filter((ind) => solutionSlugs.has(ind.solution));
}

// ============================================================
// PRODUCT FILTER HELPERS
// ============================================================
//
// Used by:
//   - Product catalog (5-dim filter UI)
//   - Solution/Industry pages (related products section)
//   - Product detail meta info
// ============================================================

/**
 * Filter products by a Solution slug.
 * Matches if product.scenarios ∩ Solution.scenarios ≠ ∅.
 */
export function filterProductsBySolution<T extends ProductLike>(
  productList: T[],
  solutionSlug: string
): T[] {
  const sol = getSolutionBySlug(solutionSlug);
  if (!sol || sol.scenarios.length === 0) return [];
  return productList.filter((p) =>
    p.scenarios.some((s) => sol.scenarios.includes(s))
  );
}

/**
 * Filter products by an Industry slug.
 * Industries don't carry their own scenarios — the product must match
 * the parent Solution's scenarios.
 */
export function filterProductsByIndustry<T extends ProductLike>(
  productList: T[],
  industrySlug: string
): T[] {
  const ind = getIndustryBySlug(industrySlug);
  if (!ind) return [];
  return filterProductsBySolution(productList, ind.solution);
}

export function filterProductsByScenario<T extends ProductLike>(
  productList: T[],
  scenario: string
): T[] {
  return productList.filter((p) => p.scenarios.includes(scenario));
}

export function filterProductsBySport<T extends ProductLike>(
  productList: T[],
  sport: string
): T[] {
  return productList.filter((p) => p.sports.includes(sport));
}

export function filterProductsByCategory<T extends ProductLike>(
  productList: T[],
  category: string
): T[] {
  return productList.filter((p) => p.category === category);
}

// ============================================================
// URL / HASH HELPERS
// ============================================================

export type FilterDimension = "cat" | "sport" | "use" | "ind" | "sol";

export interface ParsedFilters {
  category: string | null;
  sports: string[];
  scenarios: string[];
  industries: string[];
  solutions: string[];
}

export function parseProductFilters(
  searchParams: Record<string, string | string[] | undefined>
): ParsedFilters {
  const get = (key: string): string[] => {
    const v = searchParams[key];
    if (!v) return [];
    if (Array.isArray(v)) return v.flatMap((s) => s.split(",")).filter(Boolean);
    return v.split(",").filter(Boolean);
  };
  return {
    category: typeof searchParams.cat === "string" ? searchParams.cat : null,
    sports: get("sport"),
    scenarios: get("use"),
    industries: get("ind"),
    solutions: get("sol"),
  };
}

export function buildFilterQuery(filters: Partial<ParsedFilters>): string {
  const parts: string[] = [];
  if (filters.category) parts.push(`cat=${encodeURIComponent(filters.category)}`);
  if (filters.sports?.length) parts.push(`sport=${filters.sports.map(encodeURIComponent).join(",")}`);
  if (filters.scenarios?.length) parts.push(`use=${filters.scenarios.map(encodeURIComponent).join(",")}`);
  if (filters.industries?.length) parts.push(`ind=${filters.industries.map(encodeURIComponent).join(",")}`);
  if (filters.solutions?.length) parts.push(`sol=${filters.solutions.map(encodeURIComponent).join(",")}`);
  return parts.join("&");
}
