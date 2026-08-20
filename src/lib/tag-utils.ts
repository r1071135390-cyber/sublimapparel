// ============================================================
// Tag-link helpers
// ============================================================
//
// Build a /products/all/ URL with a pre-applied 3-dim filter
// encoded in the URL hash. The ProductCatalog page reads this
// hash on mount and pre-selects the chips.
//
// Schema (matching ProductCatalog's readFromHash):
//   #cat=Category1,Category2&sport=Sport1,Sport2&use=Scenario1,Scenario2
//
// Use enc.encodeURIComponent for multi-word values with spaces/&.
//
// Examples:
//   tagLink({ category: "Hoodie" })
//   → "/products/all/#cat=Hoodie&sport=&use="
//   tagLink({ sport: "Soccer" })
//   → "/products/all/#cat=&sport=Soccer&use="
//   tagLink({ scenario: "Sports League" })
//   → "/products/all/#cat=&sport=&use=Sports%20League"
//   tagLink({ sports: ["Soccer", "Basketball"] })
//   → "/products/all/#cat=&sport=Soccer%2CBasketball&use="

export type TagFilterInput =
  | { category: string }
  | { categories: string[] }
  | { sport: string }
  | { sports: string[] }
  | { scenario: string }
  | { scenarios: string[] }
  | { solution: string }
  | { industry: string }
  | {
      categories?: string[];
      sports?: string[];
      scenarios?: string[];
      solution?: string;
      industry?: string;
    };

const BASE = "/products/all/";

export function tagLink(input: TagFilterInput): string {
  let categories: string[] = [];
  let sports: string[] = [];
  let scenarios: string[] = [];
  let solution = "";
  let industry = "";

  if ("category" in input) {
    categories = [input.category];
  } else if ("categories" in input) {
    categories = input.categories ?? [];
  } else if ("sport" in input) {
    sports = [input.sport];
  } else if ("sports" in input) {
    sports = input.sports ?? [];
  } else if ("scenario" in input) {
    scenarios = [input.scenario];
  } else if ("scenarios" in input) {
    scenarios = input.scenarios ?? [];
  } else if ("solution" in input) {
    if (input.solution) solution = input.solution;
  } else if ("industry" in input) {
    if (input.industry) industry = input.industry;
  } else {
    if (input.categories) categories = input.categories;
    if (input.sports) sports = input.sports;
    if (input.scenarios) scenarios = input.scenarios;
    if (input.solution) solution = input.solution;
    if (input.industry) industry = input.industry;
  }

  // URLSearchParams encodes spaces as '+' and '&' as '%26', but
  // keeps ',' literal — matching the readFromHash side in
  // ProductCatalog which uses .split(',').
  const params = new URLSearchParams();
  if (categories.length) params.set("cat", categories.join(","));
  if (sports.length) params.set("sport", sports.join(","));
  if (scenarios.length) params.set("use", scenarios.join(","));
  if (solution) params.set("sol", solution);
  if (industry) params.set("ind", industry);
  return `${BASE}#${params.toString()}`;
}

// ============================================================
// Static-page link helpers for Solution / Industry taxonomy
// ============================================================

import { SOLUTIONS, INDUSTRIES } from "@/lib/taxonomy";

export function solutionLink(slug: string): string {
  return `/${slug}/`;
}

export function industryLink(slug: string): string {
  return `/industries/${slug}/`;
}

export function solutionPath(slug: string): string | null {
  return SOLUTIONS.find((s) => s.slug === slug) ? `/${slug}/` : null;
}

export function industryPath(slug: string): string | null {
  return INDUSTRIES.find((i) => i.slug === slug) ? `/industries/${slug}/` : null;
}

// ============================================================
// Pre-baked mappings for the most common UI text on the site
// ============================================================

const CATEGORY_MAP: Record<string, string> = {
  "T-shirts": "T-Shirt",
  "T-Shirts": "T-Shirt",
  TShirt: "T-Shirt",
  "Tee": "T-Shirt",
  Tees: "T-Shirt",
  "Hoodies": "Hoodie",
  "Hoodie & Sweatshirts": "Hoodie",
  "Hoodie": "Hoodie",
  "Jerseys": "Jersey / Kit",
  "Jersey": "Jersey / Kit",
  "Jerseys & Singlets": "Jersey / Kit",
  "Racing Kits": "Jersey / Kit",
  "Racing": "Jersey / Kit",
  "Cycling Kits": "Sports Top / Kit",
  Cycling: "Sports Top / Kit",
  "Golf / Bowling Shirts": "Polo Shirt",
  "Golf": "Polo Shirt",
  "Bowling Shirts": "Shirt",
  "Bowling": "Shirt",
  "Esports Jerseys": "Jersey / Kit",
  Esports: "Jersey / Kit",
  "Singlets": "Sports Top / Kit",
  "Pants & Shorts": "Pants",
  "Pants": "Pants",
  "Shorts": "Pants",
  Vests: "Uniform & Workwear",
  Jackets: "Jacket",
  "Polo Shirt": "Polo Shirt",
  "Polo": "Polo Shirt",
  "Activewear": "Activewear",
  "Leggings": "Leggings",
  "Kids Sportswear": "Kids Sportswear",
  "Baby Bodysuit": "Baby Bodysuit",
  "Bucket Hat": "Bucket Hat",
  "Baseball Cap": "Baseball Cap",
  Caps: "Baseball Cap",
  Apron: "Apron",
  Dress: "Dress",
  Skirt: "Skirt",
  "Scarf": "Hoodie", // tagged as Hoodie in source
  Scarves: "Hoodie",
  "Sweatshirts": "Sweatshirt",
  "Sweatshirt": "Sweatshirt",
  "Tank Top & Camis": "Tank Top & Camis",
  "Tank Top": "Tank Top & Camis",
  "Combat Gear": "Combat Gear",
  Knitwear: "Knitwear",
  Bodysuit: "Bodysuit",
  "Romper & Jumpsuit": "Romper & Jumpsuit",
  "Sleepwear & Underwear": "Sleepwear & Underwear",
  Beachwear: "Beachwear",
  Swimwear: "Swimwear",
  "Winter Wear": "Winter Wear",
  Shirt: "Shirt",
  "Coord Set": "Coord Set",
  "Sports Top / Kit": "Sports Top / Kit",
  "Sports Top": "Sports Top / Kit",
  "Sportswear": "Sports Top / Kit",
};

const SPORT_MAP: Record<string, string> = {
  Soccer: "Soccer",
  Basketball: "Basketball",
  Baseball: "Baseball",
  "Softball": "Softball",
  Football: "Football",
  Rugby: "Rugby",
  Cricket: "Cricket",
  "Table Tennis": "Table Tennis",
  Tennis: "Tennis",
  "Badminton": "Badminton",
  Volleyball: "Volleyball",
  Hockey: "Hockey",
  Lacrosse: "Lacrosse",
  Cycling: "Cycling",
  Running: "Running",
  "Marathon": "Running",
  Golf: "Golf",
  Bowling: "Bowling",
  Esports: "Esports",
  Swimming: "Swimwear",
  Swim: "Swimwear",
  Surf: "Surf",
  Beach: "Beach",
  "Dive": "Dive",
  Diving: "Dive",
  Ski: "Ski",
  Skiing: "Ski",
  Snowboard: "Snowboard",
  Skate: "Skate",
  Skating: "Skating",
  "Yoga": "Yoga",
  Pilates: "Pilates",
  Boxing: "Boxing",
  MMA: "MMA",
  Wrestling: "Wrestling",
  "Martial Arts": "Martial Arts",
  "CrossFit": "CrossFit",
  Gym: "Gym",
  "Weightlifting": "Gym",
  Athletics: "Athletics",
  Track: "Athletics",
  "Dance": "Dance",
  Cheer: "Cheer",
  Triathlon: "Triathlon",
  AFL: "AFL",
  Netball: "Netball",
  Fishing: "Fishing",
};

const SCENARIO_MAP: Record<string, string> = {
  // Industries on home page
  "Events & Conferences": "Event & Festival",
  "Event & Conferences": "Event & Festival",
  "Events": "Event & Festival",
  "Event": "Event & Festival",
  "Promotional Products Distributors": "Promotional Swag",
  "Promotional": "Promotional Swag",
  "Promotional Swag": "Promotional Swag",
  "Sports Teams & Leagues": "Sports League",
  "Sports League": "Sports League",
  "Sports Teams": "Team & Club",
  "Team & Club": "Team & Club",
  "Music, Tour & Festival Merch": "Music & Merch",
  "Music": "Music & Merch",
  "Music & Merch": "Music & Merch",
  "Festival": "Festival & Holiday",
  "Trade Show & Display": "Event & Festival",
  "Trade Show": "Event & Festival",
  "Corporate & Employee Programs": "Corporate & Branding",
  "Corporate": "Corporate & Branding",
  "Corporate & Branding": "Corporate & Branding",
  "Apparel Brands & Agencies": "Retail & Fashion",
  "Apparel Brands": "Retail & Fashion",
  "Schools, Universities & Greek Life": "Education & School",
  "Schools": "Education & School",
  "Greek Life": "Education & School",
  "Education & School": "Education & School",
  "School & Education": "Education & School",
  "Political Campaigns": "Political Campaign",
  "Political Campaign": "Political Campaign",
  "Breweries, Coffee & Hospitality": "Hospitality & F&B",
  "Hospitality": "Hospitality & F&B",
  "Hospitality & F&B": "Hospitality & F&B",
  "Endurance & Race Events": "Sports League",
  "Race Events": "Event & Festival",
  "E-commerce & Fulfillment": "Retail & Fashion",
  "Wedding": "Wedding & Party",
  "Fundraiser": "Fundraiser & Charity",
  "Construction": "Construction & Engineering",
  "Construction & Engineering": "Construction & Engineering",
  "Medical": "Medical & Healthcare",
  "Medical & Healthcare": "Medical & Healthcare",
  "Security": "Security & Property",
  "Security & Property": "Security & Property",
  "Uniform & Workwear": "Uniform & Workwear",
  "Uniform": "Uniform & Workwear",
  "Workwear": "Uniform & Workwear",
  "Retail": "Retail & Fashion",
  "Retail & Fashion": "Retail & Fashion",
  "Gift & Souvenir": "Gift & Souvenir",
  "Souvenir": "Gift & Souvenir",
  "Charity": "Fundraiser & Charity",
  "Fundraiser & Charity": "Fundraiser & Charity",
};

/**
 * Resolve a free-text UI label to the right TagLink dimension.
 * Returns null if the label can't be mapped.
 */
export function resolveTagLink(
  label: string
): ReturnType<typeof tagLink> | null {
  const trimmed = label.trim();
  if (CATEGORY_MAP[trimmed]) return tagLink({ category: CATEGORY_MAP[trimmed] });
  if (SPORT_MAP[trimmed]) return tagLink({ sport: SPORT_MAP[trimmed] });
  if (SCENARIO_MAP[trimmed]) return tagLink({ scenario: SCENARIO_MAP[trimmed] });
  return null;
}

// ============================================================
// Tag archive — dedicated page per tag at /tag/<dim>/<slug>/
// ============================================================

export type ArchiveDimension = "category" | "sport" | "scenario";

function archiveSlugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Build the URL to the dedicated archive page for a given tag.
 * Each of the 29 categories, 42 sports, and 27 scenarios has its
 * own page at /tag/<dimension>/<slug>/.
 */
export function tagArchiveLink(
  dimension: ArchiveDimension,
  value: string
): string {
  return `/tag/${dimension}/${archiveSlugify(value)}/`;
}

/**
 * Resolve a free-text UI label to the matching archive URL.
 * Returns null if no archive exists for the label.
 */
export function resolveArchiveLink(label: string): string | null {
  const trimmed = label.trim();
  if (CATEGORY_MAP[trimmed]) return tagArchiveLink("category", CATEGORY_MAP[trimmed]);
  if (SPORT_MAP[trimmed]) return tagArchiveLink("sport", SPORT_MAP[trimmed]);
  if (SCENARIO_MAP[trimmed]) return tagArchiveLink("scenario", SCENARIO_MAP[trimmed]);
  return null;
}
