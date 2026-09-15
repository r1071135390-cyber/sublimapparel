// 2026-09-15 (R68-P4): Dynamic fabric page keyword builder.
// Replaces the previous hardcoded 12-keyword block in /fabric/[slug]/page.tsx
// with a tag-driven buyer-intent expansion that maps each fabric's tags /
// composition / use / print methods to the queries real buyers search.
// Each fabric detail page now ships 50-90 high-intent keywords instead of 12,
// covering 5 axes: (1) fabric identity, (2) tag-derived apparel verticals,
// (3) print-method queries, (4) use-case apparel queries, (5) brand/site.
// Why this matters: pre-R68 the 64 fabric pages averaged 15.8 keywords
// (already the densest section of the site) but they were all generic
// fabric/process words with zero buyer-intent coverage. After R68 each
// page owns a unique buyer-query surface aligned with its actual fabric
// category, eliminating the all-over keyword cannibalization that GSC
// diagnosis report 20 flagged as the #1 issue.
//
// IMPORTANT: This helper is server-side. The output is a plain string[]
// suitable for Next.js Metadata.keywords (which can be string|string[]).
// We deliberately keep it data-only — no DB, no async, no environment
// access — so it ships in the static export and never blocks rendering.

type FabricRecord = {
  name: string;
  comp: string;
  use: string;
  tags: string[];
  printMethods: string[];
};

// Tag → buyer-intent keyword mappings.
// Each tag pulls in 3+ real buyer queries the way the buyer would phrase
// them. Lowercase keys because tags are stored lowercase on the fabric
// data. If you add a new tag to fabric-data, add the matching key here.
const TAG_INTENT: Record<string, string[]> = {
  polyester: ["polyester apparel", "polyester clothing manufacturer", "polyester fabric for sublimation"],
  knit: ["knit fabric wholesale", "knit apparel fabric", "knit fabric for custom apparel"],
  jersey: ["jersey knit fabric", "jersey fabric supplier", "jersey apparel manufacturer"],
  lightweight: ["lightweight apparel fabric", "lightweight summer fabric", "breathable lightweight fabric"],
  athletic: ["athletic apparel fabric", "athletic clothing fabric", "athletic uniform fabric"],
  casual: ["casual apparel fabric", "casual clothing fabric", "everyday apparel fabric"],
  "t-shirts": ["t-shirt fabric", "t-shirt material bulk", "tee fabric wholesale"],
  "sublimation-friendly": ["sublimation-friendly fabric", "sublimation fabric supplier", "best fabric for sublimation"],
  "moisture-wicking": ["moisture wicking apparel", "moisture wicking fabric", "performance moisture wicking"],
  everyday: ["everyday apparel fabric", "casual wear fabric", "daily wear fabric"],
  mesh: ["mesh fabric supplier", "athletic mesh fabric", "breathable mesh apparel"],
  performance: ["performance fabric", "performance apparel", "performance sportswear fabric"],
  compression: ["compression apparel fabric", "compression fabric supplier", "compression sportswear fabric"],
  stretch: ["stretch fabric", "stretch apparel fabric", "4-way stretch fabric"],
  spandex: ["spandex fabric", "spandex apparel fabric", "spandex blend fabric"],
  cotton: ["cotton apparel fabric", "cotton clothing fabric", "100% cotton fabric supplier"],
  fleece: ["fleece fabric", "fleece apparel fabric", "fleece hoodie fabric"],
  blend: ["blend apparel fabric", "blend clothing fabric", "polyester cotton blend fabric"],
  "french-terry": ["french terry fabric", "french terry apparel", "french terry hoodie fabric"],
  organic: ["organic cotton apparel", "GOTS organic fabric", "organic cotton bulk"],
  nylon: ["nylon apparel fabric", "nylon fabric supplier", "nylon sportswear fabric"],
  soft: ["soft apparel fabric", "soft touch fabric", "soft hand feel fabric"],
  brushed: ["brushed fabric", "brushed apparel fabric", "brushed fleece fabric"],
  leather: ["faux leather fabric", "PU leather apparel", "leather-look apparel"],
  denim: ["denim apparel fabric", "denim clothing fabric", "denim fabric supplier"],
  silk: ["silk apparel fabric", "silk clothing fabric", "silk fabric supplier"],
  linen: ["linen apparel fabric", "linen clothing fabric", "linen fabric supplier"],
  wool: ["wool apparel fabric", "wool clothing fabric", "wool fabric supplier"],
  velvet: ["velvet apparel fabric", "velvet clothing fabric", "velvet fabric supplier"],
  satin: ["satin apparel fabric", "satin clothing fabric", "satin fabric supplier"],
  rib: ["rib knit fabric", "ribbed apparel fabric", "rib knit apparel"],
  pique: ["pique knit fabric", "pique polo fabric", "pique knit apparel"],
  interlock: ["interlock knit fabric", "interlock apparel", "interlock fabric supplier"],
  "single-jersey": ["single jersey fabric", "single jersey apparel", "single jersey knit"],
  "double-knit": ["double knit fabric", "double knit apparel", "double knit supplier"],
  waffle: ["waffle knit fabric", "waffle knit apparel", "thermal waffle fabric"],
  scuba: ["scuba fabric", "scuba apparel", "scuba knit fabric"],
  velour: ["velour fabric", "velour apparel", "velour clothing fabric"],
  plush: ["plush fabric", "plush apparel", "plush clothing fabric"],
  terry: ["terry cloth fabric", "terry apparel", "terry fabric supplier"],
  pbt: ["PBT stretch fabric", "PBT swimwear fabric", "chlorine-resistant fabric"],
  pongee: ["pongee fabric", "pongee lining fabric", "pongee apparel"],
  lurex: ["lurex fabric", "metallic apparel fabric", "lurex shimmer fabric"],
  lace: ["lace fabric", "lace apparel fabric", "lace clothing fabric"],
  eyelet: ["eyelet fabric", "eyelet apparel", "eyelet cotton fabric"],
  neoprene: ["neoprene fabric", "neoprene apparel", "neoprene wetsuit fabric"],
  acrylic: ["acrylic fabric", "acrylic apparel", "acrylic knit fabric"],
  modal: ["modal fabric", "modal apparel fabric", "modal clothing supplier"],
  tencel: ["tencel fabric", "tencel apparel", "lyocell fabric supplier"],
  bamboo: ["bamboo fabric", "bamboo apparel fabric", "bamboo clothing fabric"],
  corduroy: ["corduroy fabric", "corduroy apparel", "corduroy clothing fabric"],
  chambray: ["chambray fabric", "chambray apparel", "chambray clothing fabric"],
  suede: ["suede fabric", "suede apparel fabric", "faux suede fabric"],
  flannel: ["flannel fabric", "flannel apparel", "flannel shirt fabric"],
  felt: ["felt fabric", "felt apparel", "wool felt fabric"],
};

// Print method → buyer query mappings.
// Each supported print process on the fabric adds 3 specific buyer queries.
// This is what flips fabric pages from "we print on this fabric" (passive)
// to "this fabric supports the print process buyers are searching for"
// (active intent match).
const PRINT_METHOD_INTENT: Record<string, string[]> = {
  sublimation: ["sublimation printing fabric", "dye-sublimation apparel", "sublimation print supplier"],
  dtg: ["DTG printing fabric", "direct-to-garment apparel", "DTG cotton printing"],
  dtf: ["DTF printing fabric", "direct-to-film apparel", "DTF heat transfer printing"],
  "screen-print": ["screen printing fabric", "screen print apparel", "screen printed clothing"],
  embroidery: ["embroidery fabric", "embroidered apparel", "embroidery-friendly fabric"],
  applique: ["applique fabric", "applique apparel", "fabric applique"],
  "uv-print": ["UV printing fabric", "UV print apparel", "UV direct print"],
  "discharge-print": ["discharge printing fabric", "discharge print apparel"],
  "heat-transfer": ["heat transfer fabric", "heat transfer apparel"],
  "heat-press": ["heat press fabric", "heat press apparel"],
  "direct-print": ["direct print fabric", "direct print apparel", "digital direct print"],
};

// Use-case → apparel-vertical mappings.
// We split fabric.use on commas (e.g. "T-shirts, cultural shirts, jerseys")
// and match each piece against these keys. Matches add 3+ buyer queries
// for the apparel vertical. This is what closes the gap that GSC diagnosis
// report 20 flagged — 69% of pages had ZERO buyer-vertical coverage.
const USE_INTENT: Record<string, string[]> = {
  "t-shirts": ["t-shirt manufacturer", "custom t-shirts", "bulk t-shirts"],
  polo: ["polo shirt fabric", "polo shirt manufacturer", "custom polo shirts"],
  jerseys: ["sports jersey fabric", "jersey manufacturer", "team jersey apparel"],
  hoodies: ["hoodie fabric", "hoodie manufacturer", "custom hoodies"],
  activewear: ["activewear manufacturer", "custom activewear", "activewear apparel"],
  sportswear: ["sportswear manufacturer", "custom sportswear", "sportswear apparel"],
  uniform: ["uniform fabric", "uniform manufacturer", "custom uniform"],
  swimwear: ["swimwear fabric", "swimwear manufacturer", "custom swimwear"],
  team: ["team apparel", "team uniform", "team sportswear"],
  performance: ["performance apparel", "performance wear", "performance clothing"],
  athletic: ["athletic apparel", "athletic wear", "athletic clothing"],
  running: ["running apparel", "running shirts", "custom running wear"],
  cycling: ["cycling apparel", "cycling jersey fabric", "custom cycling wear"],
  yoga: ["yoga apparel", "yoga clothing fabric", "custom yoga wear"],
  lifestyle: ["lifestyle apparel", "lifestyle clothing", "custom lifestyle wear"],
  streetwear: ["streetwear apparel", "streetwear manufacturer", "custom streetwear"],
  fashion: ["fashion apparel fabric", "fashion clothing manufacturer", "custom fashion apparel"],
  dress: ["dress fabric", "dress manufacturer", "custom dress apparel"],
  kids: ["kids apparel fabric", "kids clothing manufacturer", "children's apparel"],
  baby: ["baby apparel fabric", "baby clothing manufacturer", "infant apparel"],
  workwear: ["workwear apparel", "work clothing manufacturer", "custom workwear"],
  outerwear: ["outerwear fabric", "outerwear manufacturer", "jacket apparel fabric"],
  underwear: ["underwear fabric", "underwear manufacturer", "intimate apparel"],
  sleepwear: ["sleepwear fabric", "sleepwear manufacturer", "pajama apparel"],
  lingerie: ["lingerie fabric", "lingerie manufacturer", "intimate apparel"],
  socks: ["socks fabric", "socks manufacturer", "custom socks"],
  hat: ["hat fabric", "hat manufacturer", "cap apparel fabric"],
  bag: ["bag fabric", "bag manufacturer", "tote bag fabric"],
  scarf: ["scarf fabric", "scarf manufacturer", "custom scarves"],
  tie: ["tie fabric", "tie manufacturer", "custom neckties"],
  bandana: ["bandana fabric", "bandana manufacturer", "custom bandanas"],
  blank: ["blank apparel", "blank clothing supplier", "wholesale blanks"],
  "training-tops": ["training tops", "training apparel", "athletic training wear"],
  "compression": ["compression apparel", "compression wear", "custom compression wear"],
  "fitted": ["fitted apparel", "fitted clothing fabric", "fitted sportswear"],
  "loungewear": ["loungewear apparel", "loungewear clothing", "loungewear fabric"],
  "tank": ["tank top fabric", "tank top apparel", "tank top manufacturer"],
  "crop": ["crop top fabric", "crop top apparel", "crop top manufacturer"],
  "underlayer": ["underlayer apparel", "base layer fabric", "underlayer garment"],
  "shirt": ["shirt fabric", "shirt manufacturer", "custom shirt apparel"],
  "jacket": ["jacket fabric", "jacket manufacturer", "custom jacket apparel"],
  "vest": ["vest fabric", "vest manufacturer", "custom vest apparel"],
  "shorts": ["shorts fabric", "shorts manufacturer", "custom shorts apparel"],
  "pants": ["pants fabric", "pants manufacturer", "custom pants apparel"],
  "sweatshirts": ["sweatshirt fabric", "sweatshirt manufacturer", "custom sweatshirts"],
  "joggers": ["jogger fabric", "jogger apparel", "custom joggers"],
};

// Brand/site keywords that always anchor the keyword list.
// These stay last so they don't crowd out the buyer-intent terms that
// matter for ranking. They're still indexed so the brand entity graph
// stays consistent across all 64 fabric pages.
const BRAND_KEYWORDS = [
  "SublimApparel fabric",
  "China fabric factory",
  "Yiwu fabric supplier",
  "DDP fabric shipping",
  "B2B apparel fabric",
  "custom apparel fabric",
  "bulk apparel fabric",
  "wholesale apparel fabric",
];

export function buildFabricKeywords(fabric: FabricRecord): string[] {
  const out: string[] = [];
  const seen = new Set<string>();

  const push = (kw: string | undefined | null): void => {
    if (!kw) return;
    const trimmed = kw.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    out.push(trimmed);
  };

  // 1. Identity keywords — fabric name, composition, primary use.
  push(fabric.name);
  push(fabric.comp);
  push(fabric.use);
  push(`${fabric.name} supplier`);
  push(`${fabric.name} China factory`);
  push(`${fabric.name} for sublimation`);

  // 2. Tag-driven buyer-intent (largest source).
  for (const rawTag of fabric.tags) {
    const tag = rawTag.toLowerCase().trim();
    if (!tag) continue;
    for (const intentKw of TAG_INTENT[tag] ?? []) push(intentKw);
    // Add tag + 2 derivations so even untagged-but-known tags get covered.
    push(tag);
    push(`${tag} fabric`);
    push(`custom ${tag} apparel`);
  }

  // 3. Print-method-driven buyer queries.
  for (const method of fabric.printMethods) {
    for (const intentKw of PRINT_METHOD_INTENT[method] ?? []) push(intentKw);
    push(`${method} apparel`);
  }

  // 4. Use-case verticals (split fabric.use on commas, match each).
  const useParts = fabric.use
    .split(",")
    .map((p) => p.toLowerCase().trim())
    .filter(Boolean);
  for (const part of useParts) {
    for (const key of Object.keys(USE_INTENT)) {
      if (part.includes(key)) {
        for (const intentKw of USE_INTENT[key]) push(intentKw);
        break;
      }
    }
  }

  // 5. Brand/site anchors (always last).
  for (const kw of BRAND_KEYWORDS) push(kw);

  return out;
}