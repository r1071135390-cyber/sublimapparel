// SEO content generator for product detail pages.
// Pure functions — no React, no Next.js. Safe for both server and client.
//
// Strategy: parse the product name + category + fabrics + tags to extract
// keywords, then assemble 4 paragraphs of SEO-friendly text. Every product
// has unique copy, no two products share the exact same output.

import type { Product, ProductFabric } from "./products-data";

// ---- Name parser -----------------------------------------------------------

interface ParsedName {
  demographic: string | null; // Womens / Mens / Unisex / Childrens / Kids / Baby
  garment: string;            // canonical garment (T-Shirt, Hoodie, …)
  descriptors: string[];      // leftover modifiers: "Distressed", "Reversible", …
  isUseCase: boolean;         // name starts with a use-case segment, e.g. "Trade Show & Display"
  useCase: string | null;     // extracted use-case string
  hasAllOver: boolean;
  hasSublimation: boolean;
  hasCotton: boolean;
  hasPolyester: boolean;
  hasFleece: boolean;
  gsmHint: string | null;     // e.g. "290GSM"
  specialMaterial: string | null; // e.g. "Slub Cotton", "Interlock"
}

const DEMOGRAPHICS = [
  "Womens",
  "Mens",
  "Unisex",
  "Childrens",
  "Kids",
  "Baby",
];

const KNOWN_USE_CASES = [
  "Trade Show & Display",
  "Political Campaigns",
  "Medical & Healthcare",
  "Transit & Transport",
  "Studio & Gym",
  "Corporate & Branding",
  "Team & Club",
  "Event & Festival",
  "School & Education",
  "Fundraiser & Charity",
  "Retail & Fashion",
  "Uniform & Workwear",
  "Music & Merch",
  "Sports League",
  "Wedding & Party",
  "Gift & Souvenir",
  "Promotional Swag",
  "Express Logistics",
];

const SPORT_USE_CASES = [
  "Soccer",
  "Basketball",
  "Badminton",
  "Hockey",
  "Cycling",
  "Yoga",
  "Running",
  "Tennis",
  "Rugby",
  "Volleyball",
  "Baseball",
  "Cricket",
  "Football",
  "Golf",
  "Lacrosse",
  "Swimwear",
  "Fishing",
  "Wrestling",
  "Boxing",
  "MMA",
  "Skating",
  "Ski",
  "Snowboard",
  "Dance",
  "Pilates",
  "Triathlon",
  "Cheer",
  "Bowling",
  "Netball",
  "Surf",
  "Dive",
  "CrossFit",
  "Gym",
  "Martial Arts",
  "Esports",
  "AFL",
  "Athletics",
  "Skate",
  "Table Tennis",
  "Softball",
  "Beach",
];

const SPECIAL_MATERIALS = [
  "Slub Cotton",
  "Poplin",
  "Interlock",
  "Spandex",
  "Fleece",
  "Pique",
  "Jersey",
  "Mesh",
  "Rib",
  "Terry",
  "French Terry",
  "Brushed",
];

const DEMO_PRONOUN: Record<string, string> = {
  Womens: "women",
  Mens: "men",
  Unisex: "everyone",
  Childrens: "kids",
  Kids: "kids",
  Baby: "infants",
};

const CATEGORY_VERB: Record<string, string> = {
  "T-Shirt": "tee",
  Hoodie: "hoodie",
  Sweatshirt: "sweatshirt",
  Jacket: "jacket",
  Pants: "pants",
  Skirt: "skirt",
  Polo: "polo",
  "Polo Shirt": "polo",
  Shirt: "shirt",
  "Tank Top & Camis": "tank",
  "Tank Top": "tank",
  Vest: "vest",
  Cap: "cap",
  Hat: "hat",
  Sportswear: "kit",
  Home: "home-goods piece",
  Apron: "apron",
};

export function parseProductName(name: string): ParsedName {
  let working = name;
  // Strip the leading "Custom " + decoration prefix.
  working = working.replace(/^Custom\s+(All-Over\s+Print\s+)?/i, "");

  let demographic: string | null = null;
  for (const d of DEMOGRAPHICS) {
    if (working.startsWith(d + " ")) {
      demographic = d;
      working = working.slice(d.length + 1);
      break;
    }
  }

  let isUseCase = false;
  let useCase: string | null = null;
  // Look for "Trade Show & Display" / "Political Campaigns" / etc.
  for (const uc of KNOWN_USE_CASES) {
    if (working.startsWith(uc + " ")) {
      isUseCase = true;
      useCase = uc;
      working = working.slice(uc.length + 1);
      break;
    }
  }
  if (!isUseCase) {
    for (const s of SPORT_USE_CASES) {
      if (working.startsWith(s + " ") || working.startsWith(s + "-")) {
        isUseCase = true;
        useCase = s;
        working = working.slice(s.length + 1);
        break;
      }
    }
  }

  // GSM suffix: e.g. "290GSM" or "180 gsm"
  const gsmMatch = working.match(/(\d{2,4})\s*GSM/i);
  const gsmHint = gsmMatch ? `${gsmMatch[1]}GSM` : null;
  if (gsmHint) working = working.replace(new RegExp(gsmHint + "\\b", "i"), "").trim();

  const hasAllOver = /all-?over/i.test(name);
  const hasSublimation = /sublimation/i.test(name);
  const hasCotton = /cotton/i.test(name);
  const hasPolyester = /polyester/i.test(name);
  const hasFleece = /fleece/i.test(name);

  let specialMaterial: string | null = null;
  for (const m of SPECIAL_MATERIALS) {
    if (new RegExp(`\\b${m}\\b`, "i").test(name)) {
      specialMaterial = m;
      break;
    }
  }

  // Remaining tokens are descriptors + garment.
  const tokens = working.split(/\s+/).filter(Boolean);
  // Drop trailing punctuation.
  const cleanTokens = tokens.map((t) => t.replace(/[(),]/g, "")).filter(Boolean);

  return {
    demographic,
    garment: cleanTokens[cleanTokens.length - 1] ?? "garment",
    descriptors: cleanTokens.slice(0, -1),
    isUseCase,
    useCase,
    hasAllOver,
    hasSublimation,
    hasCotton,
    hasPolyester,
    hasFleece,
    gsmHint,
    specialMaterial,
  };
}

// ---- Helpers ---------------------------------------------------------------

function fabricToLine(f: ProductFabric): string {
  const gsm = f.gsm && f.gsm !== "—" ? `${f.gsm} ` : "";
  return `${gsm}${f.material.toLowerCase()} via ${f.process.toLowerCase()}`;
}

function uniqueJoin(parts: string[]): string {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of parts) {
    const key = p.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(p);
    }
  }
  return out.join(", ");
}

function sentenceCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ---- Content sections ------------------------------------------------------

export interface SeoContent {
  /** One-line hook (used in JSON-LD description, OG, twitter card). */
  metaDescription: string;
  /** Short tagline shown above the long description. */
  tagline: string;
  /** 4 paragraphs of unique product copy, in display order. */
  overview: string;
  printMethod: string;
  useCases: string;
  careAndSpecs: string;
  /** Bulleted talking points — useful for visual lists in the UI. */
  highlights: string[];
  /** FAQ-style Q&A pairs for the schema markup. */
  faq: { question: string; answer: string }[];
}

/**
 * Build SEO content for a product. The function is deterministic — same
 * input always yields the same output, so we can use it during static export
 * with no extra config.
 */
export function buildSeoContent(product: Product): SeoContent {
  const parsed = parseProductName(product.name);
  const pronoun = parsed.demographic ? DEMO_PRONOUN[parsed.demographic] ?? "everyone" : "everyone";
  const garment = (CATEGORY_VERB[product.category] ?? product.category.toLowerCase());
  const pluralGarment = garment.endsWith("s") ? garment : garment + "s";

  const primaryFabric = product.fabrics[0];
  const hasSublimationFabrics = product.fabrics.some((f) => /sublimation/i.test(f.process));
  const hasCottonFabrics = product.fabrics.some((f) => /cotton/i.test(f.process));
  const allCotton = product.fabrics.every((f) => /cotton/i.test(f.material));
  const allPolyester = product.fabrics.every((f) => /polyester/i.test(f.material));

  // -------- META DESCRIPTION ---------------------------------------------
  // Pull the noun phrase from the product name itself so the description
  // matches the product (the `category` field is sometimes a grouping tag,
  // not the actual garment type — e.g. the Womens Rectangle Scarf is
  // tagged as "Hoodie" in source data).
  const productNoun = product.name.replace(/^Custom\s+(All-Over\s+Print\s+)?/i, "").trim();
  const metaDescription = sentenceCase(
    `${productNoun}. Full-coverage sublimation or all-over digital print on cotton, cut & sewn in our Yiwu factory. ${product.fabrics.length} fabric options, MOQ ${product.moq} pcs, DDP shipping to ${product.scenarios.length >= 8 ? "50+ countries" : "your door"}.`,
  );

  // -------- TAGLINE -------------------------------------------------------
  const taglineBase = parsed.isUseCase && parsed.useCase
    ? `Built for ${parsed.useCase.toLowerCase()} — your design, edge to edge.`
    : parsed.demographic
      ? `Made for ${pronoun}. Printed edge to edge.`
      : "Your design, edge to edge.";
  const tagline = taglineBase;

  // -------- OVERVIEW ------------------------------------------------------
  const overviewParts: string[] = [];
  overviewParts.push(
    `${product.name} is one of our ${product.fabrics.length}-option blanks — cut & sewn in-house at our Yiwu, China factory. `,
  );
  if (parsed.descriptors.length > 0) {
    const desc = uniqueJoin(parsed.descriptors).toLowerCase();
    overviewParts.push(
      `Built with ${desc} construction, the silhouette is intended to be the foundation — the artwork is the product. Every panel from hem to cuff accepts a continuous print, so logos, sponsor blocks, color gradients, and photo-real artwork can run without seams, white borders, or panel breaks.`,
    );
  } else {
    overviewParts.push(
      `The silhouette is the foundation; the artwork is the product. Every panel accepts a continuous print, so logos, sponsor blocks, color gradients, and photo-real artwork can run without seams, white borders, or panel breaks.`,
    );
  }
  if (parsed.gsmHint) {
    overviewParts.push(
      ` Standard weight on this blank is ${parsed.gsmHint} — but we re-knit to your spec from ${product.fabrics.length} stocked fabric recipes.`,
    );
  } else {
    overviewParts.push(
      ` We re-knit to your spec from ${product.fabrics.length} stocked fabric recipes so you can dial in hand-feel, opacity, and price without leaving this style.`,
    );
  }
  const overview = overviewParts.join("");

  // -------- PRINT METHOD --------------------------------------------------
  const printParts: string[] = [];
  if (hasSublimationFabrics) {
    printParts.push(
      `Polyester and poly-blend options are printed via CMYK dye-sublimation: ink is infused into the fibers at 200 °C, so the color is the fiber, not a film on top. The result is permanent, breathable, and survives repeat 40 °C washes without cracking, peeling, or fading.`,
    );
  }
  if (hasCottonFabrics) {
    printParts.push(
      `Cotton and cotton-blend options use reactive all-over digital print on pre-cut panels, then assembled in cut-and-sew. This is how we get full edge-to-edge coverage on natural fibers — the panels are joined after printing, so seams sit at standard construction points rather than breaking the image.`,
    );
  }
  if (!hasSublimationFabrics && !hasCottonFabrics) {
    printParts.push(
      `This blank ships in multiple print methods depending on the fabric you pick. We work with both CMYK dye-sublimation (polyester) and reactive all-over digital print on cotton — both yield edge-to-edge coverage with no cracking or peeling at the seam.`,
    );
  }
  if (product.fabrics.length > 1) {
    printParts.push(
      ` The ${product.fabrics.length} fabric recipes on file for this style are ${product.fabrics.slice(0, 3).map(fabricToLine).join("; ")}${product.fabrics.length > 3 ? `; and ${product.fabrics.length - 3} more` : ""}.`,
    );
  }
  const printMethod = printParts.join("");

  // -------- USE CASES -----------------------------------------------------
  const useParts: string[] = [];
  if (product.sports.length > 0) {
    const sportList = product.sports.slice(0, 6).map((s) => s.toLowerCase());
    useParts.push(
      `In play, ${pluralGarment} ship in ${sportList.length} sport fits${sportList.length > 1 ? " including " : " — "}${sportList.join(", ")}, so you can keep the same artwork across your full uniform set without re-cutting screens.`,
    );
  } else {
    useParts.push(
      `This is a non-sport blank, so we focus print engineering on apparel-only use cases — corporate wardrobe, retail capsule drops, event merch, and uniform programs.`,
    );
  }
  if (product.scenarios.length > 0) {
    const scenarioList = product.scenarios.slice(0, 5).map((s) => s.toLowerCase());
    useParts.push(
      ` On the commercial side, the most common briefs we run on this ${garment} fall under ${uniqueJoin(scenarioList)} — typically 50–2,000 pieces per drop, re-orders on a 3-week cadence.`,
    );
  }
  useParts.push(
    ` Lead time from approved artwork to ex-factory is 10–18 days for sublimation and 18–25 days for all-over cotton, plus your DDP transit lane.`,
  );
  const useCases = useParts.join("");

  // -------- CARE & SPECS --------------------------------------------------
  const careParts: string[] = [];
  if (primaryFabric) {
    careParts.push(
      `On the care side, ${primaryFabric.material.toLowerCase()} ${pluralGarment}${pluralGarment.startsWith("s") ? "" : "s"} printed with ${primaryFabric.process.toLowerCase()} are machine-washable at 40 °C, line-dry friendly, and safe to iron inside-out at medium heat. Color-fastness is rated 4–5 on the ISO 105-C06 scale, so logos do not bleed onto adjacent garments in a shared wash.`,
    );
  } else {
    careParts.push(
      `Every fabric option on this ${garment} is machine-washable at 40 °C, line-dry friendly, and color-fast to ISO 105-C06 grade 4–5, so your prints survive a working wash cycle without bleeding.`,
    );
  }
  if (allCotton) {
    careParts.push(
      ` Because the entire blank is cotton, expect a small amount of post-wash shrinkage (under 3 % on the warp, 1 % on the weft at 40 °C) — we pre-shrink all panels before printing, so size tolerance stays within ±1 cm across the size run.`,
    );
  } else if (allPolyester) {
    careParts.push(
      ` Polyester blanks hold their shape through hundreds of wash cycles, so this ${garment} is well-suited to team-issued programs where a single player may collect 3–4 identical pieces per season.`,
    );
  }
  if (product.moq >= 50 && product.moq < 100) {
    careParts.push(
      ` MOQ is ${product.moq} pieces per design, with no minimum on re-orders of the same artwork. Mixed sizes count toward the per-design MOQ, not the per-colorway MOQ.`,
    );
  } else {
    careParts.push(
      ` MOQ is ${product.moq} pieces per design. Mixed sizes count toward the per-design MOQ, not the per-colorway MOQ.`,
    );
  }
  const careAndSpecs = careParts.join("");

  // -------- HIGHLIGHTS ----------------------------------------------------
  const highlights: string[] = [];
  highlights.push(
    parsed.isUseCase && parsed.useCase
      ? `Purpose-built for ${parsed.useCase.toLowerCase()} programs`
      : parsed.demographic
        ? `${parsed.demographic} fit block, graded from XS–3XL`
        : "Unisex fit block graded from XS–3XL",
  );
  highlights.push(
    `${product.fabrics.length} fabric recipes in stock — cotton, polyester, fleece, interlock`,
  );
  highlights.push(
    hasSublimationFabrics
      ? "CMYK dye-sublimation for true edge-to-edge, photo-real artwork"
      : "Reactive all-over digital print for edge-to-edge coverage on cotton",
  );
  highlights.push(
    `MOQ ${product.moq} pcs per design, 10–18 day ex-factory lead time on poly`,
  );
  highlights.push(
    "DDP shipping to 50+ countries — price includes duty, customs, last-mile",
  );
  if (product.sports.length >= 30) {
    highlights.push(`Drop-in compatible with 40+ sport cut lines — same artwork, new silhouette`);
  } else if (product.sports.length > 0) {
    highlights.push(`Available in ${product.sports.length} sport-specific cut line${product.sports.length === 1 ? "" : "s"}`);
  }
  if (parsed.specialMaterial) {
    highlights.push(`${parsed.specialMaterial} available on request — re-knit to your spec`);
  }
  if (parsed.gsmHint) {
    highlights.push(`Standard weight ${parsed.gsmHint}, re-knittable to your hand-feel target`);
  }

  // -------- FAQ -----------------------------------------------------------
  const faq: { question: string; answer: string }[] = [
    {
      question: `What is the minimum order quantity for this ${garment}?`,
      answer: `MOQ is ${product.moq} pieces per design. Mixed sizes count toward the per-design MOQ; there is no separate per-colorway minimum. Re-orders of the same artwork have no MOQ.`,
    },
    {
      question: "Can I print edge to edge with no white borders?",
      answer: "Yes. Both sublimation (polyester) and all-over digital print on cotton run full edge to edge — no panel-boxed print, no white border, no seam-breaking image. Your artwork extends to the seam allowance.",
    },
    {
      question: "Do you ship DDP to the USA, UK, EU, and Australia?",
      answer: "Yes. We quote DDP (delivered duty paid) to 50+ countries including the US, UK, all 27 EU member states, Canada, Australia, and the Gulf region. DDP price includes customs clearance, duties, and last-mile delivery to your warehouse or event venue.",
    },
    {
      question: "What artwork files do you accept?",
      answer: "We accept AI, PSD, PDF, PNG, and TIFF. Files should be at 150+ DPI at print size with embedded color profile (sRGB or CMYK). We re-flow your artwork onto our 3D garment templates free of charge before production.",
    },
    {
      question: "Can I get a sample before placing a bulk order?",
      answer: "Yes. We can produce a single printed sample on the chosen fabric for evaluation. Sample lead time is 5–7 days plus courier. Sample cost is credited against your first bulk order.",
    },
  ];

  return {
    metaDescription,
    tagline,
    overview,
    printMethod,
    useCases,
    careAndSpecs,
    highlights,
    faq,
  };
}

// ---- Jersey helpers --------------------------------------------------------
//
// "Jersey" is a B2B keyword with strong search volume that the site was missing
// even though most T-Shirt products are intended for team / sport use. We treat
// any T-Shirt with at least one sport as a "jersey" and surface that word
// throughout the SEO content, H1, title, and a dedicated tag page.

export function isJersey(product: Product): boolean {
  return product.category === "T-Shirt" && product.sports.length > 0;
}

export function getJerseyTitle(product: Product): string | null {
  if (!isJersey(product)) return null;
  // Pick the first sport as the headline sport (e.g. "Football")
  // Falls back to the category if no sports (shouldn't happen since isJersey gates this)
  const sport = product.sports[0] ?? product.category;
  return `Custom ${sport} Jersey`;
}

export function getJerseyLabel(product: Product): string {
  if (!isJersey(product)) return product.category;
  const sport = product.sports[0] ?? "";
  return sport ? `${sport} Jersey` : "Jersey";
}

// Slug used by the /tag/[dimension]/[slug] route for the "Jersey" landing page.
export const JERSEY_SLUG = "jersey";

// URL of the jersey tag page.
export const JERSEY_TAG_HREF = `/tag/garment/${JERSEY_SLUG}/`;

// ---- Re-exported metadata helpers used by JSON-LD ------------------------

export function buildProductFaqLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}
