// Fabric catalogue - shared data + helpers
import { extraFabricTypes } from "./fabric-extra";
// Each entry: name, slug, comp, gsm, spec, use, fit (1-5), swatch, description,
// printMethods (which print methods work), tags (filtering categories),
// h1, metaDescription, intro, characteristics, bestForList, careNotes,
// relatedSlugs, faq, applications (for detail page)

export type PrintMethod =
  | "sublimation"
  | "dtg"
  | "dtf"
  | "screen-print"
  | "embroidery"
  | "applique"
  | "uv-print"
  | "discharge-print"
  | "heat-transfer"
  | "heat-press"
  | "direct-print";

export type Fabric = {
  title?: string;
  metaTitle?: string;
  name: string;
  slug: string;
  comp: string;
  gsm: string;
  spec: string;
  use: string;
  fit: number;
  swatch: string;
  sublimationSuitability?: string;
  description: string;
  printMethods: PrintMethod[];
  tags: string[];
  sections?: { heading: string; body: string }[];
  h1?: string;
  metaDescription: string;
  intro: string;
  characteristics?: string[];
  bestForList?: string[];
  careNotes: string[];
  processCompatibility?: { process: PrintMethod; rating: number; note: string }[];
  relatedSlugs: string[];
  faq: { q: string; a: string }[];
};

export const fabricTypes: Fabric[] = [
  {
    name: "Polyester jersey",
    slug: "polyester-jersey",
    comp: "100% Polyester",
    gsm: "110-160",
    spec: "Width 150-180cm, knitted",
    use: "T-shirts, cultural shirts, jerseys",
    fit: 5,
    swatch: "01-jersey",
    description:
      "Workhorse polyester for sublimation. Holds prints flat, washes clean, doesn't pill.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "knit", "jersey", "lightweight", "athletic", "casual",
      "t-shirts", "sublimation-friendly", "moisture-wicking", "everyday",
    ],
    h1: "Polyester Jersey Fabric — 100% Polyester Knit for Sublimation Printing",
    metaDescription:
      "100% polyester jersey fabric, 110-160 gsm. Workhorse knit for sublimation printing — sportswear, t-shirts, cultural shirts. Soft hand, vivid dye-sub results, low MOQ 50 pcs.",
    intro:
      "Polyester jersey is the most common substrate for dye-sublimation printing — and for good reason. The 100% synthetic fiber accepts dispersed dyes at the molecular level, so prints become part of the fabric rather than sitting on top. The result is a graphic that breathes, stretches, and washes indefinitely without cracking, peeling, or fading.",
    characteristics: [
      "100% polyester smooth-knit construction",
      "110-160 gsm — lightweight to mid-weight",
      "Excellent color reproduction and vibrancy via sublimation",
      "Soft hand, good drape, holds shape after washing",
      "Breathable for warm-weather wear",
      "Stretch recovery 5-10% (one-way stretch)",
    ],
    bestForList: [
      "Sports jerseys and team uniforms",
      "All-over-print t-shirts and streetwear",
      "Cultural, festival, and event shirts",
      "Performance and training tops",
      "Race and marathon singlets",
    ],
    careNotes: [
      "Machine wash cold with like colors",
      "Tumble dry low or hang dry",
      "Do not iron directly on print — use a cloth barrier",
      "Avoid bleach and fabric softeners",
    ],
    relatedSlugs: ["bird-eye-mesh", "poly-spandex-stretch", "interlock-knit", "pique-knit"],
    faq: [
      {
        q: "Is polyester jersey good for sublimation?",
        a: "Yes — 100% polyester jersey is the gold standard for dye-sublimation printing. The synthetic fibers accept dispersed dye at the molecular level, producing vivid, permanent prints that won't crack or fade.",
      },
      {
        q: "What GSM polyester jersey should I choose?",
        a: "110-140 gsm for lightweight summer tees and running tops. 150-160 gsm for standard t-shirts and jerseys. Above 160 gsm is better for premium streetwear and layering pieces.",
      },
      {
        q: "Can you print all-over on polyester jersey?",
        a: "Yes. Our cut-and-sew sublimation process allows full coverage from seam to seam on jerseys, leggings, and t-shirts — no white borders, no blank spots.",
      },
    ],
  },
  {
    name: "Bird-eye mesh",
    slug: "bird-eye-mesh",
    comp: "100% Polyester",
    gsm: "130-180",
    spec: "Width 150-180cm, knitted mesh",
    use: "Sports jerseys, training tops",
    fit: 5,
    swatch: "02-birdeye",
    description:
      "Perforated mesh — small holes for breathability, smooth face for sharp prints.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "knit", "mesh", "lightweight", "athletic", "sportswear",
      "breathable", "sublimation-friendly", "moisture-wicking", "training",
    ],
    h1: "Bird-Eye Mesh Fabric — Breathable Polyester for Sportswear",
    metaDescription:
      "Bird-eye polyester mesh, 130-180 gsm. Perforated for breathability, smooth face for sharp sublimation prints. Sports jerseys, training tops, cycling. Low MOQ 50 pcs.",
    intro:
      "Bird-eye mesh is engineered for high-output athletic activity. The small perforated holes let heat and moisture escape, while the smooth face takes dye-sublimation ink cleanly. It's the standard for basketball jerseys, running singlets, and training tops where ventilation matters as much as the print.",
    characteristics: [
      "100% polyester bird-eye knit structure",
      "130-180 gsm with perforated holes for airflow",
      "Quick-dry, moisture-wicking performance",
      "Excellent dye-sublimation print surface",
      "Slight mechanical stretch for body movement",
      "Holds shape through repeated wash cycles",
    ],
    bestForList: [
      "Basketball and team jerseys",
      "Running and cycling tops",
      "Training and gym singlets",
      "Netball and tennis wear",
    ],
    careNotes: [
      "Machine wash cold, inside out",
      "Do not use fabric softener — it clogs the mesh",
      "Hang dry for longest life",
      "Iron on reverse side only",
    ],
    relatedSlugs: ["polyester-jersey", "performance-mesh", "mesh-net", "interlock-knit"],
    faq: [
      {
        q: "What's the difference between bird-eye mesh and regular mesh?",
        a: "Bird-eye mesh has tiny uniform perforations in a regular pattern, giving better airflow and a smoother print surface than open mesh. It's preferred for sports jerseys where breathability and print quality both matter.",
      },
      {
        q: "Is bird-eye mesh see-through?",
        a: "No — the perforations are small and dense. The fabric is opaque in normal wear. If you hold it up to a strong light you can see faint dots, but it functions as a solid fabric.",
      },
    ],
  },
  {
    name: "Poly-spandex stretch mesh",
    slug: "poly-spandex-stretch",
    comp: "92% Poly + 8% Spandex",
    gsm: "160-220",
    spec: "Width 150cm, 4-way stretch",
    use: "Compression, fitted athletic",
    fit: 4,
    swatch: "03-spandex",
    description:
      "92/8 poly-spandex. Four-way stretch for compression and fitted cuts.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "spandex", "knit", "stretch", "4-way-stretch", "athletic",
      "compression", "fitted", "sublimation-friendly", "midweight",
    ],
    h1: "Poly-Spandex Stretch Fabric — 92/8 Compression Knit for Sublimation",
    metaDescription:
      "92% polyester / 8% spandex stretch fabric, 160-220 gsm. Four-way stretch, recovery, and vivid sublimation prints. Compression, leggings, fitted athletic. MOQ 50 pcs.",
    intro:
      "Poly-spandex blend combines the printability of polyester with the stretch and recovery of elastane. The 8% spandex content gives four-way stretch while the 92% polyester keeps the fabric sublimation-friendly. It's the standard for compression wear, fitted athletic apparel, and any garment that needs to move with the body.",
    characteristics: [
      "92% polyester / 8% spandex blend",
      "Four-way stretch with full recovery",
      "160-220 gsm — mid-weight compression",
      "Holds prints through stretching without distortion",
      "Snug, body-conforming fit",
      "Excellent for tight-fitting athletic cuts",
    ],
    bestForList: [
      "Compression shirts and base layers",
      "Leggings and performance tights",
      "Cycling jerseys and bibs",
      "Fitted basketball and football kits",
    ],
    careNotes: [
      "Wash cold, inside out, with similar colors",
      "Do not bleach or use fabric softener",
      "Hang dry — heat degrades spandex",
      "Do not iron directly on print",
    ],
    relatedSlugs: ["polyester-jersey", "nylon-spandex", "scuba", "waffle"],
    faq: [
      {
        q: "Will sublimation print distort when stretched?",
        a: "No — with 4-way stretch poly-spandex, the print is part of the fiber and moves with the fabric. The print doesn't crack or peel like screen-print on spandex.",
      },
      {
        q: "What's the maximum stretch percentage?",
        a: "Standard 92/8 poly-spandex stretches about 60-80% in width and 30-40% in length with full recovery. For higher stretch we offer 80/20 blends.",
      },
    ],
  },
  {
    name: "Polar fleece",
    slug: "polar-fleece",
    comp: "100% Polyester",
    gsm: "200-300",
    spec: "Width 150-180cm, brushed both sides",
    use: "Hoodies, jackets, blankets",
    fit: 4,
    swatch: "04-fleece",
    description:
      "Heavy-knit loops, brushed both sides. Plush hand, prints through to the pile.",
    printMethods: ["sublimation", "dtf", "screen-print", "embroidery"],
    tags: [
      "polyester", "knit", "fleece", "midweight", "heavyweight", "thermal",
      "hoodies", "jackets", "blankets", "sublimation-friendly", "winter",
    ],
    h1: "Polar Fleece Fabric — 100% Polyester Brushed Knit for Sublimation",
    metaDescription:
      "Polar fleece, 200-300 gsm, brushed both sides. Soft, warm, prints through sublimation. Hoodies, jackets, blankets, cold-weather apparel. Low MOQ 50 pcs.",
    intro:
      "Polar fleece is a 100% polyester knit that is brushed on both faces to create a soft, lofty pile. The brushed surface traps air for warmth, and because the underlying fiber is polyester, it accepts dye-sublimation ink. Print results are softer than on smooth knits, but the graphic becomes part of the brushed pile rather than sitting on top.",
    characteristics: [
      "100% polyester, brushed on both sides",
      "200-300 gsm with deep pile",
      "Excellent warmth-to-weight ratio",
      "Sublimation prints show softer edge definition (not a defect — that's the fabric character)",
      "Anti-pill finish available on request",
      "Dries quickly compared to wool",
    ],
    bestForList: [
      "Pullover hoodies and zip-ups",
      "Lined jackets and vests",
      "Blankets and throws",
      "Cold-weather team wear",
    ],
    careNotes: [
      "Machine wash cold, gentle cycle",
      "Tumble dry low or hang dry",
      "Avoid high heat — it can flatten the pile",
      "Do not iron directly on print",
    ],
    relatedSlugs: ["french-terry", "polar-anti-pill", "plush", "velour"],
    faq: [
      {
        q: "Does sublimation print look good on fleece?",
        a: "Yes, but the print will have a softer, slightly diffused look because the ink is absorbed into the brushed pile. This is the expected look — graphics appear integrated with the texture rather than crisp on top. Many customers prefer this for hoodies.",
      },
      {
        q: "Is polar fleece warm?",
        a: "Yes — the brushed pile traps body heat efficiently. 200-300 gsm fleece is suitable for fall/winter jackets, hoodies, and blankets in most climates.",
      },
    ],
  },
  {
    name: "Nylon-spandex",
    slug: "nylon-spandex",
    comp: "75-85% Nylon + 15-25% Spandex",
    gsm: "150-220",
    spec: "Width 150cm, 4-way stretch",
    use: "Swim, yoga, fitted tops",
    fit: 3,
    swatch: "05-nylon",
    description:
      "Silky hand, excellent stretch recovery. Used for swim, yoga, fitted tops.",
    printMethods: ["dtf", "sublimation"],
    tags: [
      "nylon", "spandex", "knit", "stretch", "4-way-stretch", "swim",
      "yoga", "athletic", "fitted", "silky", "midweight", "athletic",
    ],
    h1: "Nylon-Spandex Fabric — Silky Stretch for Swimwear and Activewear",
    metaDescription:
      "Nylon-spandex stretch fabric, 75-85% nylon / 15-25% spandex, 150-220 gsm. Silky hand, four-way stretch, recovery for swimwear, yoga, fitted tops. MOQ 50 pcs.",
    intro:
      "Nylon-spandex is the technical stretch fabric for swimwear, yoga pants, and any garment that needs to hug the body while moving with it. Nylon gives a silky, cool-touch hand and excellent strength. Spandex provides the recovery. The result is a fabric that feels light, holds shape under stress, and handles chlorinated and salt water better than poly-spandex.",
    characteristics: [
      "75-85% nylon / 15-25% spandex",
      "Silky, cool-touch hand",
      "Four-way stretch with strong recovery",
      "Chlorine- and salt-water resistant",
      "150-220 gsm — mid-weight",
      "Print via sublimation (lighter colors) or DTF (any color)",
    ],
    bestForList: [
      "Swimsuits and bikini tops",
      "Yoga pants and leggings",
      "Cycling shorts and bibs",
      "Dance and gymnastics wear",
    ],
    careNotes: [
      "Hand wash or machine wash cold, gentle",
      "Rinse immediately after pool use",
      "Hang dry away from direct sunlight",
      "Do not use fabric softener or bleach",
    ],
    relatedSlugs: ["poly-spandex-stretch", "scuba", "pbt-stretch", "spandex"],
    faq: [
      {
        q: "Is nylon-spandex better than poly-spandex for swimwear?",
        a: "Yes — nylon is more chlorine-resistant, has a smoother hand, and dries faster than polyester. For competitive or frequent-pool swimwear, nylon is the standard.",
      },
      {
        q: "Can I sublimate on nylon?",
        a: "Light-color nylon can be sublimated, but results are typically less vibrant than on polyester. For dark or strong colors, DTF printing is more reliable.",
      },
    ],
  },
  {
    name: "Direct print fabric",
    slug: "direct-print-fabric",
    comp: "100% Polyester (coated)",
    gsm: "100-180",
    spec: "Width 110-150cm, woven coated",
    use: "Flags, banners, signs",
    fit: 5,
    swatch: "06-banner",
    description:
      "Flag/banner fabric. Tightly woven, takes direct print on coated face.",
    printMethods: ["sublimation"],
    tags: [
      "polyester", "woven", "lightweight", "flags", "banners", "signs",
      "outdoor", "sublimation-friendly", "direct-print", "tightly-woven",
    ],
    h1: "Direct Print Polyester Fabric — Flags, Banners, and Sign Substrates",
    metaDescription:
      "Coated polyester direct print fabric, 100-180 gsm. Tightly woven, photo-quality dye-sub print. Flags, banners, tablecloths, signage. Low MOQ 50 pcs.",
    intro:
      "Direct print fabric is a tightly woven polyester with a special coating that holds dispersed dye at the surface. This allows higher-resolution prints than transfer sublimation — ideal for flags, banners, and signage where image sharpness matters more than drape. The fabric is stiffer than apparel substrates, optimized for flat applications.",
    characteristics: [
      "100% polyester, tightly woven base",
      "Special ink-receptive coating",
      "Photo-quality direct dye-sub print",
      "Slight stiffness — not for soft apparel",
      "UV-resistant inks available for outdoor use",
      "100-180 gsm depending on application",
    ],
    bestForList: [
      "Hand-held flags and rally flags",
      "Vertical banner displays",
      "Trade show tablecloths and backdrops",
      "Custom pennants and bunting",
    ],
    careNotes: [
      "Hand wash or gentle machine cycle",
      "Air dry — high heat may damage coating",
      "Store rolled, not folded, to prevent creasing",
      "Use UV-resistant ink for outdoor longevity",
    ],
    relatedSlugs: ["pongee", "pongee", "satin", "taffeta"],
    faq: [
      {
        q: "What's the difference between direct print and transfer sublimation?",
        a: "Direct print uses a digital printer that lays ink directly onto coated fabric. Transfer sublimation prints on paper first, then heat-presses onto fabric. Direct gives higher resolution; transfer gives softer hand and works on more substrates.",
      },
    ],
  },
  {
    name: "Poly-cotton blend",
    slug: "poly-cotton-blend",
    comp: "65% Poly + 35% Cotton",
    gsm: "180-220",
    spec: "Width 150cm, woven or knit",
    use: "Polos, workwear, school uniforms",
    fit: 2,
    swatch: "07-polycotton",
    description:
      "Poly-cotton CVC or TC. Heavier hand, used for polo and workwear.",
    printMethods: ["screen-print", "embroidery", "dtf"],
    tags: [
      "polyester", "cotton", "blend", "midweight", "polos", "workwear",
      "uniforms", "dtg-friendly", "dtf-friendly", "screen-print", "casual",
    ],
    h1: "Poly-Cotton Blend Fabric — 65/35 for Polos, Workwear, Uniforms",
    metaDescription:
      "65% polyester / 35% cotton blend, 180-220 gsm. Durable, low-shrink, easy-care. Polos, workwear, school uniforms, scrubs. Embroidery and DTF friendly. MOQ 50 pcs.",
    intro:
      "Poly-cotton blends (typically 65/35 or 80/20) combine the durability and wrinkle-resistance of polyester with the soft, breathable hand of cotton. The result is a fabric that's easy to care for, holds color well, and takes screen-print and embroidery cleanly. Standard for polos, workwear, and any uniform application.",
    characteristics: [
      "65% polyester / 35% cotton blend (TC or CVC)",
      "180-220 gsm — mid-weight",
      "Low shrinkage and good dimensional stability",
      "Holds bright dye colors",
      "Suitable for embroidery, screen-print, and DTF",
      "Not suitable for sublimation (cotton content rejects disperse dye)",
    ],
    bestForList: [
      "Polo shirts and work shirts",
      "School and corporate uniforms",
      "Hospital scrubs and lab coats",
      "Workwear and coveralls",
    ],
    careNotes: [
      "Machine wash warm",
      "Tumble dry low",
      "Iron on medium heat if needed",
      "Avoid high heat — may scorch cotton fibers",
    ],
    relatedSlugs: ["pique-knit", "cotton-tshirt", "pima-cotton", "poplin"],
    faq: [
      {
        q: "Can I sublimate on poly-cotton?",
        a: "No — sublimation requires 100% polyester for vivid results. For poly-cotton, use screen-print, DTF, or DTG printing. DTF is the most versatile and gives strong color on both fiber types.",
      },
    ],
  },
  {
    name: "100% Cotton",
    slug: "polyester-satin-chiffon",
    comp: "100% Polyester",
    gsm: "60-120",
    spec: "Width 150cm, woven",
    use: "Dance, dresses, performance costumes",
    fit: 4,
    swatch: "09-satin",
    description:
      "Polyester satin and chiffon. Silky drape, used for dance and dresses.",
    printMethods: ["sublimation"],
    tags: [
      "polyester", "woven", "satin", "chiffon", "lightweight", "silky",
      "dresses", "dance", "performance", "sublimation-friendly", "elegant",
    ],
    h1: "Polyester Satin & Chiffon — Silky Woven Fabric for Dance and Dresses",
    metaDescription:
      "Polyester satin and chiffon, 60-120 gsm. Silky drape, vibrant sublimation prints. Dance costumes, performance dresses, scarves, and event wear. Low MOQ 50 pcs.",
    intro:
      "Polyester satin and chiffon are lightweight woven fabrics with a smooth, lustrous face. Both accept sublimation ink beautifully and produce prints with deep blacks and saturated colors. The lightweight nature makes them ideal for flowy garments — dance costumes, evening dresses, scarves, and any application where drape matters.",
    characteristics: [
      "100% polyester woven satin or chiffon",
      "60-120 gsm — very lightweight",
      "Smooth lustrous face (satin) or sheer drape (chiffon)",
      "Excellent sublimation print quality",
      "Sheer chiffon requires lining for modesty",
      "Hand wash or gentle cycle recommended",
    ],
    bestForList: [
      "Dance and cheerleading costumes",
      "Evening and event dresses",
      "Scarves and accessories",
      "Theatrical and performance wear",
    ],
    careNotes: [
      "Hand wash cold or dry clean",
      "Do not wring — roll in towel to remove water",
      "Hang or lay flat to dry",
      "Iron on low with cloth barrier",
    ],
    relatedSlugs: ["organza", "chiffon", "georgette", "voile"],
    faq: [
      {
        q: "Is polyester chiffon see-through?",
        a: "Yes — chiffon is semi-sheer. For modest garments, line the dress or use a double layer. For overlays and dance costumes where transparency is desired, single layer is fine.",
      },
    ],
  },
  {
    name: "French terry",
    slug: "french-terry",
    comp: "100% Polyester (or poly-cotton)",
    gsm: "220-320",
    spec: "Width 150-180cm, looped back",
    use: "Hoodies, pullovers, joggers",
    fit: 4,
    swatch: "10-terry",
    description:
      "Looped back, smooth face. Mid-weight for hoodies and pullovers.",
    printMethods: ["sublimation", "dtf", "screen-print", "embroidery"],
    tags: [
      "polyester", "knit", "french-terry", "midweight", "heavyweight",
      "hoodies", "joggers", "streetwear", "sublimation-friendly", "casual",
    ],
    h1: "French Terry Fabric — Loop-Back Knit for Hoodies and Pullovers",
    metaDescription:
      "French terry knit, 220-320 gsm, smooth face with looped back. Mid-weight for hoodies, joggers, pullovers, streetwear. Sublimation, DTF, screen-print, embroidery friendly. MOQ 50 pcs.",
    intro:
      "French terry is a knit fabric with a smooth flat face and small loops on the back. The smooth face prints cleanly via sublimation or DTF, while the looped back provides warmth and a soft feel against the skin. It's the standard substrate for streetwear hoodies, joggers, and pullover sweatshirts — lighter than fleece but warmer than jersey.",
    characteristics: [
      "Smooth flat face, looped back",
      "220-320 gsm — mid-weight",
      "100% polyester or poly-cotton blend available",
      "Sublimation prints on the smooth face cleanly",
      "Good warmth without bulk",
      "Drapes well for relaxed-fit garments",
    ],
    bestForList: [
      "Pullover hoodies and zip-ups",
      "Jogger pants and shorts",
      "Streetwear sweatshirts",
      "Loungewear and casual sets",
    ],
    careNotes: [
      "Machine wash cold, gentle",
      "Tumble dry low or hang dry",
      "Iron inside out on low",
      "Avoid fabric softener — it can flatten loops",
    ],
    relatedSlugs: ["polar-fleece", "terry", "pique-knit", "interlock-knit"],
    faq: [
      {
        q: "What's the difference between french terry and fleece?",
        a: "French terry has small loops on the back; fleece has a brushed fuzzy pile. French terry is lighter and more breathable — better for transitional weather. Fleece is warmer — better for cold weather.",
      },
    ],
  },
  {
    name: "Polyester compression",
    slug: "polyester-compression",
    comp: "100% Polyester interlock",
    gsm: "200-260",
    spec: "Width 150cm, tight knit",
    use: "Compression, base layers",
    fit: 5,
    swatch: "11-compression",
    description:
      "Polyester interlock, tight knit. Holds shape under stretch.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "knit", "interlock", "midweight", "compression",
      "athletic", "base-layers", "sublimation-friendly", "everyday",
    ],
    h1: "Polyester Compression Fabric — Tight-Knit Interlock for Athletic Wear",
    metaDescription:
      "100% polyester interlock, 200-260 gsm. Tight knit holds shape under stress, takes vivid sublimation prints. Compression tops, base layers, athletic training gear. MOQ 50 pcs.",
    intro:
      "Polyester compression fabric is a tight-knit interlock designed to hug the body without restricting movement. The dense construction gives it excellent opacity, a smooth surface for printing, and the muscle-support feel that compression wear is named for. Our version uses 100% polyester for full sublimation compatibility.",
    characteristics: [
      "100% polyester tight interlock knit",
      "200-260 gsm — mid-weight compression",
      "Holds shape under repeated stretch",
      "Full opacity (not see-through when stretched)",
      "Smooth surface for crisp sublimation prints",
      "Quick-dry and moisture-wicking",
    ],
    bestForList: [
      "Compression tops and long sleeves",
      "Base layers and thermal underwear",
      "Cycling and triathlon suits",
      "MMA and grappling wear",
    ],
    careNotes: [
      "Machine wash cold, gentle cycle",
      "Do not use fabric softener",
      "Hang dry recommended",
      "Do not iron on print",
    ],
    relatedSlugs: ["polyester-jersey", "poly-spandex-stretch", "interlock-knit", "performance-mesh"],
    faq: [
      {
        q: "Is compression fabric the same as spandex?",
        a: "Not exactly. Compression refers to the tight fit and supportive feel. The fabric itself can be 100% polyester (which we offer for sublimation) or poly-spandex (for higher stretch). For full-coverage custom prints, our 100% poly interlock is the standard choice.",
      },
    ],
  },
  {
    name: "Microfiber peach",
    slug: "microfiber-peach",
    comp: "100% Polyester microfiber",
    gsm: "80-130",
    spec: "Width 150-180cm, sueded finish",
    use: "Linings, scarves, sleepwear",
    fit: 5,
    swatch: "12-peach",
    description:
      "Microfiber peach skin. Soft sueded hand, used for linings and home.",
    printMethods: ["sublimation"],
    tags: [
      "polyester", "microfiber", "woven", "lightweight", "sueded",
      "linings", "sleepwear", "scarves", "sublimation-friendly", "soft-hand",
    ],
    h1: "Microfiber Peach Skin Fabric — Soft Sueded Polyester for Sublimation",
    metaDescription:
      "Microfiber peach skin, 80-130 gsm, sueded finish. Ultra-soft hand, vivid sublimation prints. Linings, scarves, sleepwear, custom accessories. Low MOQ 50 pcs.",
    intro:
      "Microfiber peach skin is a 100% polyester microfiber with a brushed sueded finish — soft, drapey, and slightly fuzzy. The micro-fine fibers take sublimation ink at extremely high resolution, producing photo-quality prints with deep saturated color. Standard for custom scarves, sleepwear, lining fabric, and any application where hand feel matters.",
    characteristics: [
      "100% polyester microfibers (finer than silk)",
      "80-130 gsm — lightweight",
      "Sueded peach-skin finish, ultra-soft hand",
      "Photo-quality sublimation prints",
      "Light, drapey, slightly translucent",
      "Anti-static and quick-dry",
    ],
    bestForList: [
      "Custom printed scarves",
      "Sleepwear and pajama sets",
      "Lining fabric for jackets",
      "Lightweight fashion pieces",
    ],
    careNotes: [
      "Hand wash or gentle machine cycle",
      "Do not wring — roll in towel",
      "Hang or lay flat to dry",
      "Iron on low with cloth barrier",
    ],
    relatedSlugs: ["polyester-satin-chiffon", "chiffon", "voile", "organza"],
    faq: [
      {
        q: "What is peach skin fabric?",
        a: "Peach skin is a 100% polyester microfiber with a brushed sueded surface that feels similar to the skin of a peach — soft, fine, and slightly fuzzy. It's lightweight, drapes beautifully, and takes extremely vivid sublimation prints.",
      },
    ],
  },

  // ===== Below: Hongyu-style fabric entries (new additions) =====

  {
    name: "Terry cloth (looped)",
    slug: "terry",
    comp: "65% Poly + 35% Cotton",
    gsm: "280-340",
    spec: "Width 150cm, looped pile",
    use: "Hoodies, sweatshirts, towels",
    fit: 3,
    swatch: "terry",
    description:
      "Terry cloth with looped pile on both sides. Soft, absorbent, and warm — standard for hoodies and towels.",
    printMethods: ["dtf", "screen-print", "embroidery"],
    tags: [
      "polyester", "cotton", "blend", "knit", "terry", "midweight", "heavyweight",
      "hoodies", "streetwear", "loungewear", "towels", "casual",
    ],
    h1: "Terry Cloth Fabric — Looped Pile for Hoodies, Towels, and Loungewear",
    metaDescription:
      "Terry cloth with looped pile, 65/35 poly-cotton, 280-340 gsm. Soft, absorbent, and warm. Hoodies, sweatshirts, beach cover-ups, custom towels. DTF, screen-print, embroidery friendly.",
    intro:
      "Terry cloth is characterized by uncut loops on one or both faces. The loops increase surface area, making it highly absorbent and insulating. Poly-cotton terry is the standard for hoodies, beach cover-ups, and bathrobes — combining the soft hand of cotton with the durability of polyester.",
    characteristics: [
      "Looped pile on one or both faces",
      "65/35 poly-cotton blend",
      "280-340 gsm — mid to heavy weight",
      "Highly absorbent",
      "Soft, plush hand",
      "Not suitable for sublimation — use DTF, screen-print, or embroidery",
    ],
    bestForList: [
      "Pullover hoodies and beach cover-ups",
      "Bathrobes and loungewear sets",
      "Custom printed towels",
      "Spa and hotel apparel",
    ],
    careNotes: [
      "Machine wash warm",
      "Tumble dry low",
      "Do not iron directly on print",
      "Avoid fabric softener for absorbency",
    ],
    relatedSlugs: ["french-terry", "polar-fleece", "waffle", "cotton-tshirt"],
    faq: [
      {
        q: "Can I sublimate on terry cloth?",
        a: "No — terry cloth is typically a poly-cotton blend with looped pile that doesn't take sublimation ink well. For graphics, use DTF (best for full color), screen-print, or embroidery.",
      },
    ],
  },
  {
    name: "Polyester satin / chiffon",
    slug: "polyester-satin-chiffon",
    comp: "100% Polyester",
    gsm: "80-120",
    spec: "Width 145-150cm, satin weave or chiffon weave",
    use: "Lining, fashion scarves, blouses, dresses, decorative",
    fit: 2,
    swatch: "satin",
    description:
      "Lightweight 100% polyester with a smooth, lustrous surface. Satin weave gives a glossy face; chiffon weave is sheer and drapey. Both take vivid sublimation prints.",
    printMethods: ["sublimation", "heat-transfer"],
    tags: [
      "polyester", "satin", "chiffon", "lightweight", "sheer",
      "fashion", "dresses", "blouses", "lining", "sublimation-friendly",
    ],
    h1: "Polyester Satin & Chiffon Fabric — Lightweight, Sheer, Sublimation-Ready",
    metaDescription:
      "100% polyester satin and chiffon, 80-120 gsm. Smooth, lustrous, drapey. Fashion blouses, dresses, scarves, lining. Vivid sublimation printing. Low MOQ 100 pcs.",
    intro:
      "Polyester satin and chiffon are the go-to substrates for lightweight, fashion-forward garments. Satin has a glossy face and matte back; chiffon is sheer with a soft, drapey hand. Both accept sublimation ink beautifully — the smooth surface yields sharp, photographic detail.",
    characteristics: [
      "100% polyester",
      "80-120 gsm — featherweight",
      "Satin: glossy face, matte back; Chiffon: sheer, drapey",
      "Excellent sublimation print results",
      "Smooth, cool-touch hand",
      "Limited durability for high-abrasion use",
    ],
    bestForList: [
      "Fashion blouses and dresses",
      "Scarves and hair accessories",
      "Lining for jackets and suits",
      "Dancewear and performance costumes",
    ],
    careNotes: [
      "Hand wash cold or gentle cycle",
      "Hang dry, do not wring",
      "Iron on low heat with pressing cloth",
      "Do not bleach",
    ],
    relatedSlugs: ["polyester-jersey", "silk-charmeuse", "silk-chiffon", "poly-spandex-stretch"],
    faq: [
      {
        q: "What's the difference between satin and chiffon?",
        a: "Satin has a glossy face and is opaque — used for blouses, linings, dresses. Chiffon is sheer and drapey — used for scarves, overlays, and flowy garments. Both are 100% polyester and accept sublimation equally well.",
      },
      {
        q: "Can I get custom colors on satin?",
        a: "Yes — through sublimation we can match any color or print photographic detail. Minimum order is typically 100 pieces per design for custom dye-sub on satin.",
      },
    ],
  },
  {
    name: "100% cotton t-shirt (DTG/DTF)",
    slug: "cotton-tshirt",
    comp: "100% Cotton",
    gsm: "160-220",
    spec: "Width 150-180cm, knitted jersey",
    use: "T-shirts, fashion basics, baby wear",
    fit: 3,
    swatch: "08-cotton",
    description:
      "Pure cotton — specialty process at our factory. We dye-sub on cotton via DTG/DTF for full color, soft hand.",
    printMethods: ["dtg", "dtf", "screen-print", "embroidery"],
    tags: [
      "cotton", "knit", "jersey", "lightweight", "midweight", "casual",
      "t-shirts", "fashion", "basics", "dtg-friendly", "organic", "everyday",
    ],
    h1: "100% Cotton Fabric — Pure Cotton for DTG and DTF Printing",
    metaDescription:
      "100% cotton fabric, 160-220 gsm. Soft hand, breathable, suitable for DTG and DTF printing. T-shirts, fashion basics, baby wear, organic cotton options. MOQ 50 pcs.",
    intro:
      "100% cotton is the most-used apparel fiber worldwide — soft, breathable, hypoallergenic, and comfortable against the skin. We run three printing processes on cotton: DTG (direct-to-garment) and DTF (direct-to-film) for A4–A3 per-panel prints, and allover digital print on cotton for true edge-to-edge, full-body graphics via cut-and-sew. All three give full-color graphics with a soft hand feel.",
    characteristics: [
      "100% cotton, soft hand",
      "160-220 gsm available",
      "Organic cotton options on request",
      "Excellent for DTG and DTF printing",
      "Breathable and hypoallergenic",
      "Not suitable for standard sublimation",
    ],
    bestForList: [
      "Fashion and basics t-shirts",
      "Baby and toddler wear",
      "Premium retail apparel",
      "Organic and natural collections",
    ],
    careNotes: [
      "Machine wash cold, gentle cycle",
      "Tumble dry low or hang dry",
      "Iron on cotton setting",
      "Wash dark colors separately first few cycles",
    ],
    relatedSlugs: ["pima-cotton", "poly-cotton-blend", "bamboo", "modal"],
    faq: [
      {
        q: "Can you do all-over printing on cotton?",
        a: "Yes — we have a special transfer process that allows edge-to-edge printing on cotton garments. It's slightly more expensive than standard sublimation on poly, but the result is full-coverage graphics on a cotton substrate.",
      },
      {
        q: "What's the best print method for cotton?",
        a: "DTG for one-off or small-batch full-color designs. DTF for higher volumes or designs with white underbase. Screen-print for simple vector designs in 1-4 colors. Embroidery for premium logos.",
      },
    ],
  },
  {
    name: "Microfiber polyester",
    slug: "microfiber-polyester",
    comp: "100% Polyester",
    gsm: "100-130",
    spec: "Width 150cm, micro denier",
    use: "Athletic tees, quick-dry",
    fit: 5,
    swatch: "microfiber",
    description:
      "Ultra-fine micro denier polyester. Wicks moisture, dries fast, takes vivid sublimation prints.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "microfiber", "knit", "lightweight", "athletic",
      "moisture-wicking", "quick-dry", "sublimation-friendly", "training",
    ],
    h1: "Microfiber Polyester Fabric — Quick-Dry Athletic Substrate",
    metaDescription:
      "100% microfiber polyester, 100-130 gsm. Ultra-fine denier, moisture-wicking, quick-dry. Athletic tees, training tops, race singlets. Sublimation printing. Low MOQ 50 pcs.",
    intro:
      "Microfiber polyester uses ultra-fine denier fibers (finer than silk) to create a fabric that wicks moisture, dries quickly, and feels light against the skin. Standard for athletic training tops, race singlets, and any garment where sweat management matters. Sublimation prints look especially vivid on microfiber due to the dense, smooth surface.",
    characteristics: [
      "100% polyester micro denier fibers",
      "100-130 gsm — ultra-lightweight",
      "Excellent moisture-wicking and quick-dry",
      "Vivid sublimation print results",
      "Soft, cool-touch hand",
      "Dries 3-4x faster than cotton",
    ],
    bestForList: [
      "Athletic training tops",
      "Running and race singlets",
      "Cycling base layers",
      "Triathlon suits",
    ],
    careNotes: [
      "Machine wash cold, gentle cycle",
      "Do not use fabric softener",
      "Hang dry or tumble dry low",
      "Do not iron on print",
    ],
    relatedSlugs: ["polyester-jersey", "bird-eye-mesh", "performance-mesh", "polyester-compression"],
    faq: [
      {
        q: "What's the difference between microfiber and regular polyester?",
        a: "Microfiber uses fibers finer than 1 denier (about 1/5 the thickness of a human hair). This gives a softer hand, better wicking, and faster drying. For athletic wear, microfiber is preferred over standard poly.",
      },
    ],
  },
  {
    name: "Pique knit",
    slug: "pique-knit",
    comp: "100% Polyester (or cotton blend)",
    gsm: "180-220",
    spec: "Width 150-180cm, textured knit",
    use: "Polos, sportswear, golf shirts",
    fit: 4,
    swatch: "pique",
    description:
      "Pique knit with raised waffle/honeycomb texture. Standard for polo shirts and golf apparel.",
    printMethods: ["sublimation", "dtf", "screen-print", "embroidery"],
    tags: [
      "polyester", "knit", "pique", "waffle", "midweight", "polos",
      "sportswear", "golf", "sublimation-friendly", "casual", "everyday",
    ],
    h1: "Pique Knit Fabric — Waffle Texture for Polos and Golf Shirts",
    metaDescription:
      "Pique knit with raised waffle/honeycomb texture, 180-220 gsm. Standard for polo shirts, golf apparel, and sportswear. Sublimation, DTF, screen-print, embroidery friendly. MOQ 50 pcs.",
    intro:
      "Pique knit has a raised geometric texture (waffle or honeycomb pattern) that gives the fabric breathability and visual depth. The standard substrate for polo shirts, golf apparel, and tennis wear. Polyester pique takes sublimation cleanly while still showing the texture — the print becomes part of the waffle pattern.",
    characteristics: [
      "Raised waffle/honeycomb knit texture",
      "100% polyester or poly-cotton available",
      "180-220 gsm — mid-weight",
      "Breathable due to texture channels",
      "Vivid sublimation prints on textured surface",
      "Holds shape and structure for collared garments",
    ],
    bestForList: [
      "Polo shirts and golf apparel",
      "Tennis and country club wear",
      "Corporate and team uniforms",
      "School uniforms",
    ],
    careNotes: [
      "Machine wash warm",
      "Tumble dry low",
      "Iron inside out on low",
      "Avoid chlorine bleach",
    ],
    relatedSlugs: ["waffle", "poly-cotton-blend", "french-terry", "cotton-tshirt"],
    faq: [
      {
        q: "Is pique knit just for polos?",
        a: "Pique is most common in polos, but it works for any garment where you want a textured, breathable, structured knit — dress shirts, vests, summer sweaters, and lightweight layering pieces.",
      },
    ],
  },
  {
    name: "PBT stretch",
    slug: "pbt-stretch",
    comp: "100% PBT (polyester blend)",
    gsm: "150-180",
    spec: "Width 150cm, 4-way stretch",
    use: "Swimwear, fitted athletic",
    fit: 4,
    swatch: "pbt",
    description:
      "PBT (polybutylene terephthalate) — stretchy, quick-dry, chlorine-resistant. Standard for competitive swimwear.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "pbt", "knit", "stretch", "4-way-stretch", "swim",
      "athletic", "fitted", "chlorine-resistant", "sublimation-friendly",
    ],
    h1: "PBT Stretch Fabric — Chlorine-Resistant Polyester for Swimwear",
    metaDescription:
      "100% PBT stretch fabric, 150-180 gsm. Four-way stretch, chlorine-resistant, quick-dry. Competitive swimwear, water polo, triathlon suits. Sublimation printing. Low MOQ 50 pcs.",
    intro:
      "PBT (polybutylene terephthalate) is a polyester variant engineered for swimwear. It's naturally stretchy without spandex, holds its shape in chlorinated water, and dries almost instantly. The standard for competitive swimwear, water polo suits, and triathlon apparel.",
    characteristics: [
      "100% PBT — no spandex needed for stretch",
      "150-180 gsm — light to mid-weight",
      "Chlorine- and salt-water resistant",
      "Holds shape after hundreds of pool hours",
      "Sublimation-friendly (PBT is polyester-based)",
      "Quick-dry and lightweight",
    ],
    bestForList: [
      "Competitive swimwear",
      "Water polo and diving suits",
      "Triathlon apparel",
      "Beach volleyball kits",
    ],
    careNotes: [
      "Hand wash or machine wash cold, gentle",
      "Rinse immediately after pool use",
      "Hang dry away from direct sun",
      "Do not use fabric softener",
    ],
    relatedSlugs: ["nylon-spandex", "poly-spandex-stretch", "spandex", "scuba"],
    faq: [
      {
        q: "What is PBT fabric?",
        a: "PBT (polybutylene terephthalate) is a modified polyester fiber that has natural stretch and recovery without needing spandex. It's more chlorine-resistant than nylon and standard poly, making it the top choice for competitive swimwear.",
      },
    ],
  },
  {
    name: "Interlock knit",
    slug: "interlock-knit",
    comp: "100% Polyester",
    gsm: "160-220",
    spec: "Width 150-180cm, double-knit",
    use: "Activewear, fitted tees, base layers",
    fit: 5,
    swatch: "interlock",
    description:
      "Interlock double-knit — smooth on both faces, stable, opaque. Versatile for fitted and active garments.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "knit", "interlock", "double-knit", "midweight",
      "athletic", "fitted", "sublimation-friendly", "everyday", "stable",
    ],
    h1: "Interlock Knit Fabric — Double-Knit Polyester for Activewear and Fitted Tees",
    metaDescription:
      "100% polyester interlock, 160-220 gsm, double-knit construction. Smooth on both faces, stable, opaque, takes vivid sublimation prints. Activewear, fitted tees, base layers. MOQ 50 pcs.",
    intro:
      "Interlock is a double-knit fabric — two layers of jersey knitted together. The result is a fabric that's smooth on both faces, more stable than single jersey, and fully opaque even when stretched. Excellent for fitted activewear, base layers, and any garment where structure and a clean surface for printing both matter.",
    characteristics: [
      "100% polyester double-knit",
      "160-220 gsm — mid-weight",
      "Smooth face and back (both printable)",
      "Full opacity, even when stretched",
      "Excellent dimensional stability",
      "Vivid sublimation print results",
    ],
    bestForList: [
      "Fitted activewear tops",
      "Base layers and thermal underwear",
      "Cycling jerseys",
      "Premium polo shirts",
    ],
    careNotes: [
      "Machine wash cold",
      "Tumble dry low or hang dry",
      "Iron on low if needed",
      "Do not use fabric softener",
    ],
    relatedSlugs: ["polyester-compression", "polyester-jersey", "french-terry", "pique-knit"],
    faq: [
      {
        q: "What's the difference between interlock and jersey?",
        a: "Jersey is a single knit with one smooth face and one looped back. Interlock is a double knit — essentially two layers of jersey knitted together — giving a smooth face and back, more stability, and better opacity. Interlock is the premium choice for fitted garments.",
      },
    ],
  },
  {
    name: "Pongee",
    slug: "pongee",
    comp: "100% Polyester",
    gsm: "60-80",
    spec: "Width 150cm, lightweight woven",
    use: "Linings, light jackets, flags",
    fit: 4,
    swatch: "pongee",
    description:
      "Ultra-lightweight woven polyester. Smooth, water-resistant, used for jacket linings and lightweight outerwear.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "woven", "lightweight", "linings", "jackets",
      "outerwear", "sublimation-friendly", "smooth", "water-resistant",
    ],
    h1: "Pongee Fabric — Ultra-Lightweight Polyester for Linings and Outerwear",
    metaDescription:
      "100% polyester pongee, 60-80 gsm. Ultra-lightweight, smooth, water-resistant. Jacket linings, lightweight windbreakers, custom flags. Sublimation and DTF friendly. Low MOQ 50 pcs.",
    intro:
      "Pongee is a lightweight plain-weave polyester with a smooth, slightly lustrous surface. Originally developed as a silk substitute in China, modern pongee is 100% polyester with water-resistant properties. Standard for jacket linings, lightweight windbreakers, custom flags, and any application where a smooth, durable, low-bulk fabric is needed.",
    characteristics: [
      "100% polyester plain weave",
      "60-80 gsm — very lightweight",
      "Smooth, slightly lustrous surface",
      "Naturally water-resistant (can be coated for full waterproofing)",
      "Vivid sublimation prints",
      "Durable and tear-resistant for its weight",
    ],
    bestForList: [
      "Jacket and coat linings",
      "Lightweight windbreakers and packable jackets",
      "Custom printed flags and banners",
      "Umbrella fabric",
    ],
    careNotes: [
      "Machine wash cold, gentle",
      "Do not bleach",
      "Iron on low with cloth barrier",
      "Do not wring — roll in towel",
    ],
    relatedSlugs: ["taffeta", "direct-print-fabric", "nylon", "taslan"],
    faq: [
      {
        q: "Is pongee waterproof?",
        a: "Pongee is naturally water-resistant (repels light rain) but not fully waterproof. For full waterproofing, the fabric is typically coated with PU or PVC. We can supply both uncoated and coated pongee.",
      },
    ],
  },
  {
    name: "Rib knit 1x1",
    slug: "rib-knit-1x1",
    comp: "100% Polyester (or blends)",
    gsm: "180-260",
    spec: "Width 150cm, vertical rib",
    use: "Cuffs, collars, bodycon dresses",
    fit: 4,
    swatch: "rib",
    description:
      "Rib knit with vertical ribs. High stretch, excellent recovery, used for trims and bodycon garments.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "knit", "rib", "stretch", "midweight", "heavyweight",
      "bodycon", "fitted", "casual", "sublimation-friendly", "trims",
    ],
    h1: "Rib Knit Fabric — Vertical Rib Texture for Bodycon and Trim Applications",
    metaDescription:
      "100% polyester rib knit 1x1, 180-260 gsm. High vertical stretch, excellent recovery, takes sublimation prints. Bodycon dresses, cuffs, collars, fitted tops. MOQ 50 pcs.",
    intro:
      "Rib knit has alternating knit and purl stitches that create vertical rib lines. The structure gives high stretch in the width and excellent recovery, making it ideal for bodycon garments, cuffs, collars, and trim applications. Polyester rib takes sublimation cleanly and holds its shape through repeated stretch cycles.",
    characteristics: [
      "100% polyester rib knit (1x1 structure)",
      "180-260 gsm — mid to heavy weight",
      "High vertical stretch with full recovery",
      "Holds shape without sagging",
      "Vivid sublimation print results",
      "Soft against skin — no itch",
    ],
    bestForList: [
      "Bodycon dresses and tops",
      "Cuffs, collars, and waistbands",
      "Fitted long-sleeve tops",
      "Tank tops and shell layers",
    ],
    careNotes: [
      "Machine wash cold, gentle",
      "Lay flat to dry for best shape retention",
      "Do not iron directly on print",
      "Avoid fabric softener",
    ],
    relatedSlugs: ["pique-knit", "waffle", "interlock-knit", "french-terry"],
    faq: [
      {
        q: "Can rib knit be used for entire garments?",
        a: "Yes — full-rib bodycon dresses and tops are popular. The stretch and recovery mean the garment conforms to the body without losing shape. We also use rib for trim details on hoodies, sweatshirts, and knit tops.",
      },
    ],
  },
  {
    name: "Eyelet mesh",
    slug: "eyelet-mesh",
    comp: "100% Polyester",
    gsm: "120-160",
    spec: "Width 150cm, perforated knit",
    use: "Breathable layers, sportswear, summer tops",
    fit: 4,
    swatch: "eyelet",
    description:
      "Eyelet mesh with small perforated holes. Breathable, lightweight, with a decorative dotted look.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "knit", "mesh", "eyelet", "lightweight", "breathable",
      "athletic", "summer", "sublimation-friendly", "perforated",
    ],
    h1: "Eyelet Mesh Fabric — Perforated Polyester for Breathable Summer Wear",
    metaDescription:
      "100% polyester eyelet mesh, 120-160 gsm. Perforated for breathability, decorative dotted look, takes sublimation prints. Summer tops, breathable layers, sportswear. MOQ 50 pcs.",
    intro:
      "Eyelet mesh is a knit fabric with small perforated holes distributed evenly across the surface. The perforations give both functional breathability and a decorative dotted appearance. Standard for summer tops, breathable layering pieces, and sportswear where ventilation matters.",
    characteristics: [
      "100% polyester with small perforated holes",
      "120-160 gsm — lightweight",
      "Functional breathability through holes",
      "Decorative dotted appearance",
      "Vivid sublimation prints (print sits around holes)",
      "Soft against skin",
    ],
    bestForList: [
      "Summer tops and tunics",
      "Breathable layering pieces",
      "Sports jerseys with ventilation",
      "Beach cover-ups",
    ],
    careNotes: [
      "Machine wash cold, gentle",
      "Hang dry recommended",
      "Iron on low inside out",
      "Avoid fabric softener",
    ],
    relatedSlugs: ["bird-eye-mesh", "performance-mesh", "mesh-net", "mesh"],
    faq: [
      {
        q: "Is eyelet mesh see-through?",
        a: "Lightly — the perforations are small and dense enough that the fabric is mostly opaque in normal wear, but you can see the holes if you look closely. For full modesty, layer with a lining or wear underneath another garment.",
      },
    ],
  },

  // ===== Below: 20 more Hongyu-style fabric entries =====

  {
    name: "Fleece (brushed)",
    slug: "fleece-brushed",
    comp: "100% Polyester",
    gsm: "200-300",
    spec: "Width 150-180cm, brushed both sides",
    use: "Hoodies, jackets, blankets, lining",
    fit: 4,
    swatch: "fleece",
    description:
      "Brushed polyester fleece with deep pile. Soft, warm, sublimation-friendly for hoodies and outerwear.",
    printMethods: ["sublimation", "dtf", "screen-print", "embroidery"],
    tags: [
      "polyester", "knit", "fleece", "midweight", "heavyweight", "thermal",
      "hoodies", "jackets", "blankets", "sublimation-friendly", "winter",
    ],
    h1: "Brushed Polyester Fleece — Warm Knit for Hoodies, Jackets, and Blankets",
    metaDescription:
      "100% polyester brushed fleece, 200-300 gsm. Deep pile, soft hand, warm. Hoodies, jackets, blankets, lining. Sublimation, DTF, screen-print, embroidery. MOQ 50 pcs.",
    intro:
      "Brushed polyester fleece is a knit fabric that's been mechanically brushed to raise the fibers into a soft, lofty pile. The pile traps air for warmth and gives the fabric its signature soft hand. Standard for hoodies, zip-ups, jacket linings, and custom printed blankets. Sublimation prints on the surface with a softer look than smooth knits.",
    characteristics: [
      "100% polyester, brushed both sides",
      "200-300 gsm with deep pile",
      "Soft, warm, lofty hand",
      "Sublimation prints with soft edge definition",
      "Dries quickly — won't stay damp like cotton",
      "Anti-pill finishing available",
    ],
    bestForList: [
      "Pullover hoodies and zip-up jackets",
      "Jacket and vest linings",
      "Custom printed blankets and throws",
      "Cold-weather accessories",
    ],
    careNotes: [
      "Machine wash cold, gentle",
      "Tumble dry low or hang dry",
      "Avoid high heat — flattens pile",
      "Do not iron on print",
    ],
    relatedSlugs: ["polar-fleece", "french-terry", "plush", "velour"],
    faq: [
      {
        q: "What's the difference between fleece and polar fleece?",
        a: "They're often used interchangeably. 'Polar fleece' typically refers to heavier, denser fleece (often 300+ gsm) used for outdoor jackets. 'Brushed fleece' is a broader term that includes lighter versions used for hoodies and linings.",
      },
    ],
  },
  {
    name: "Mesh (open net)",
    slug: "mesh-open",
    comp: "100% Polyester",
    gsm: "100-150",
    spec: "Width 150-180cm, open-hole knit",
    use: "Lining, breathable panels, sportswear",
    fit: 4,
    swatch: "mesh",
    description:
      "Open-hole mesh with larger ventilation openings. Maximum breathability for linings and active panels.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "knit", "mesh", "lightweight", "breathable", "athletic",
      "linings", "panels", "sublimation-friendly", "open-hole", "ventilation",
    ],
    h1: "Open-Hole Mesh Fabric — Maximum Breathability for Active Panels and Linings",
    metaDescription:
      "100% polyester open-hole mesh, 100-150 gsm. Maximum breathability, lightweight. Active panels, jacket linings, sportswear ventilation zones. Sublimation friendly. Low MOQ 50 pcs.",
    intro:
      "Open-hole mesh has larger ventilation holes than bird-eye or eyelet mesh, giving maximum airflow. Standard for active panels in jackets (underarm, back), jacket linings, and any application where breathability is the priority. Often used as accent fabric combined with solid panels.",
    characteristics: [
      "100% polyester with large open holes",
      "100-150 gsm — very lightweight",
      "Maximum breathability and ventilation",
      "Vivid sublimation prints",
      "Often used as accent panels",
      "Translucent when used alone",
    ],
    bestForList: [
      "Active panels in jackets (underarm, back)",
      "Jacket and vest linings",
      "Sportswear ventilation zones",
      "Athletic shorts and training gear",
    ],
    careNotes: [
      "Machine wash cold, gentle",
      "Do not use fabric softener",
      "Hang dry recommended",
      "Iron on low with cloth barrier",
    ],
    relatedSlugs: ["bird-eye-mesh", "performance-mesh", "eyelet-mesh", "mesh-net"],
    faq: [
      {
        q: "Is open mesh see-through?",
        a: "Yes — open mesh is significantly more transparent than bird-eye or eyelet mesh. It's designed for ventilation panels and linings, not as a primary face fabric. Pair with solid panels for modesty.",
      },
    ],
  },
  {
    name: "Velour",
    slug: "velour",
    comp: "100% Polyester",
    gsm: "200-280",
    spec: "Width 150cm, plush knit pile",
    use: "Loungewear, track suits, jackets",
    fit: 4,
    swatch: "velour",
    description:
      "Velour with plush knitted pile. Soft, stretchy, with a velvet-like sheen — classic for track suits.",
    printMethods: ["sublimation", "dtf", "screen-print", "embroidery"],
    tags: [
      "polyester", "knit", "velour", "plush", "midweight", "loungewear",
      "track-suits", "casual", "sublimation-friendly", "stretch",
    ],
    h1: "Velour Fabric — Plush Knitted Pile for Track Suits and Loungewear",
    metaDescription:
      "100% polyester velour, 200-280 gsm. Plush knitted pile with velvet-like sheen. Track suits, loungewear, jackets, dancewear. Sublimation, DTF, screen-print. Low MOQ 50 pcs.",
    intro:
      "Velour is a knit fabric with a cut pile that gives a soft, plush surface with a subtle sheen — similar to velvet but with the stretch and recovery of a knit. Standard for track suits, loungewear sets, dance costumes, and casual jackets. Polyester velour takes sublimation cleanly with deep, rich colors.",
    characteristics: [
      "100% polyester knit with cut pile",
      "200-280 gsm — mid-weight",
      "Soft, plush hand with subtle sheen",
      "Stretchy with good recovery",
      "Vivid sublimation prints on the pile",
      "Holds warmth well",
    ],
    bestForList: [
      "Track suits and matching sets",
      "Loungewear and robes",
      "Dance and cheer uniforms",
      "Casual jackets and hoodies",
    ],
    careNotes: [
      "Machine wash cold, gentle cycle",
      "Tumble dry low or hang dry",
      "Do not iron — heat crushes the pile",
      "Brush gently to restore pile after washing",
    ],
    relatedSlugs: ["velvet", "plush", "french-terry", "polar-fleece"],
    faq: [
      {
        q: "Velour vs velvet — what's the difference?",
        a: "Velvet is woven; velour is knit. Velour is stretchier, more durable, easier to care for, and less expensive than velvet. For apparel (track suits, loungewear), velour is the standard. For home décor and high fashion, velvet is preferred.",
      },
    ],
  },
  {
    name: "Satin (polyester)",
    slug: "satin-polyester",
    comp: "100% Polyester",
    gsm: "80-120",
    spec: "Width 150cm, satin weave",
    use: "Lining, dresses, sleepwear, accessories",
    fit: 4,
    swatch: "satin",
    description:
      "Polyester satin with a smooth, lustrous face. Vivid sublimation prints — standard for linings and event wear.",
    printMethods: ["sublimation"],
    tags: [
      "polyester", "woven", "satin", "lustrous", "lightweight", "linings",
      "dresses", "sleepwear", "sublimation-friendly", "smooth", "elegant",
    ],
    h1: "Polyester Satin — Smooth Lustrous Fabric for Linings, Dresses, and Sleepwear",
    metaDescription:
      "100% polyester satin, 80-120 gsm. Smooth, lustrous face, vivid sublimation prints. Linings, evening dresses, sleepwear, custom accessories. Low MOQ 50 pcs.",
    intro:
      "Polyester satin is a woven fabric with a smooth, lustrous face created by floating warp yarns over weft yarns. It's the affordable, durable alternative to silk satin — with similar sheen and drape but better washability and printability. Standard for jacket linings, evening dresses, sleepwear, and custom printed accessories.",
    characteristics: [
      "100% polyester satin weave",
      "80-120 gsm — lightweight",
      "Smooth, lustrous face (matte back)",
      "Vivid sublimation prints with deep blacks",
      "Drapes beautifully",
      "More durable and washable than silk satin",
    ],
    bestForList: [
      "Jacket and coat linings",
      "Evening and prom dresses",
      "Sleepwear and pajama sets",
      "Custom scarves and accessories",
    ],
    careNotes: [
      "Hand wash or gentle machine cycle",
      "Do not wring — roll in towel",
      "Iron on low with cloth barrier",
      "Hang or lay flat to dry",
    ],
    relatedSlugs: ["polyester-satin-chiffon", "chiffon", "voile", "taffeta"],
    faq: [
      {
        q: "Is polyester satin slippery?",
        a: "Yes — the smooth face is naturally slippery. This is why it's commonly used for linings (garments slide on easily over other clothes). For dresses, the slipperiness adds to the elegant drape.",
      },
    ],
  },
  {
    name: "Neoprene",
    slug: "neoprene",
    comp: "100% Polyester (or poly-spandex with neoprene core)",
    gsm: "200-400",
    spec: "Width 130-150cm, foam core",
    use: "Wetsuits, structured apparel, laptop sleeves",
    fit: 3,
    swatch: "neoprene",
    description:
      "Neoprene — thick, structured, water-resistant. Used for wetsuits and structured fashion pieces.",
    printMethods: ["dtf", "sublimation"],
    tags: [
      "polyester", "neoprene", "structured", "midweight", "heavyweight",
      "wetsuits", "athletic", "water-resistant", "fashion", "thick",
    ],
    h1: "Neoprene Fabric — Structured Water-Resistant Material for Wetsuits and Fashion",
    metaDescription:
      "Neoprene fabric, 200-400 gsm. Thick, structured, water-resistant. Wetsuits, scuba-style fashion, laptop sleeves, performance gear. DTF and sublimation friendly. Low MOQ 50 pcs.",
    intro:
      "Neoprene is a synthetic rubber foam sandwiched between two fabric layers (typically polyester or nylon). It has a spongy, structured feel that's water-resistant and insulating. Standard for wetsuits, scuba-style fashion (a 1990s trend that's back), laptop sleeves, and performance gear. We offer polyester-faced neoprene for sublimation printing.",
    characteristics: [
      "Neoprene foam core with polyester face",
      "200-400 gsm — thick and structured",
      "Excellent water resistance and insulation",
      "Holds shape without interfacing",
      "Sublimation prints on the face (results vary with thickness)",
      "DTF gives more reliable results on dark neoprene",
    ],
    bestForList: [
      "Wetsuits and diving apparel",
      "Scuba-style fashion pieces (dresses, tops)",
      "Laptop and tablet sleeves",
      "Performance gear with structure",
    ],
    careNotes: [
      "Hand wash or gentle machine cycle",
      "Do not bleach or use fabric softener",
      "Hang dry away from direct sunlight",
      "Do not iron — heat damages the foam",
    ],
    relatedSlugs: ["scuba", "pongee", "taslan", "ripstop"],
    faq: [
      {
        q: "Can you sublimate on neoprene?",
        a: "Yes on light colors — the polyester face accepts sublimation ink. For dark colors or strong graphics, DTF is more reliable since the print sits on the surface rather than absorbing into the foam.",
      },
    ],
  },
  {
    name: "Jersey (single knit)",
    slug: "jersey-single",
    comp: "100% Polyester",
    gsm: "140-180",
    spec: "Width 150-180cm, single knit",
    use: "T-shirts, dresses, lightweight tops",
    fit: 5,
    swatch: "jersey",
    description:
      "Single-knit polyester jersey. Lightweight, smooth face, vivid sublimation prints — apparel classic.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "knit", "jersey", "lightweight", "athletic", "casual",
      "t-shirts", "dresses", "sublimation-friendly", "everyday", "tops",
    ],
    h1: "Single Jersey Knit Fabric — Lightweight Polyester for Tees, Dresses, and Tops",
    metaDescription:
      "100% polyester single jersey, 140-180 gsm. Lightweight, smooth face, vivid sublimation prints. T-shirts, dresses, lightweight tops. Low MOQ 50 pcs.",
    intro:
      "Single jersey is the most common knit fabric in apparel — a single layer of knit with a smooth face and a slightly looped back. Polyester jersey is lightweight, drapes well, and accepts sublimation ink cleanly. The standard for printed t-shirts, dresses, and any lightweight top where comfort and vivid color both matter.",
    characteristics: [
      "100% polyester single-knit construction",
      "140-180 gsm — lightweight",
      "Smooth face, slight loop on back",
      "Excellent sublimation print quality",
      "Soft hand, good drape",
      "Slight mechanical stretch across width",
    ],
    bestForList: [
      "T-shirts and tank tops",
      "Lightweight summer dresses",
      "Layering tops and shells",
      "Casual everyday apparel",
    ],
    careNotes: [
      "Machine wash cold",
      "Tumble dry low or hang dry",
      "Do not iron on print",
      "Avoid fabric softener",
    ],
    relatedSlugs: ["polyester-jersey", "interlock-knit", "single-jersey", "polyester-compression"],
    faq: [
      {
        q: "What's the difference between single jersey and interlock?",
        a: "Single jersey is one layer of knit — smooth face, looped back, more stretchy, more transparent. Interlock is two layers knitted together — smooth on both faces, more stable, more opaque, less stretchy. Choose single jersey for lightweight drape, interlock for structure.",
      },
    ],
  },
  {
    name: "Plush",
    slug: "plush",
    comp: "100% Polyester",
    gsm: "200-300",
    spec: "Width 150cm, deep pile",
    use: "Plush toys, blankets, loungewear",
    fit: 4,
    swatch: "plush",
    description:
      "Deep-pile plush polyester. Ultra-soft, fluffy, perfect for plush toys, blankets, and cozy loungewear.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "knit", "plush", "midweight", "heavyweight", "cozy",
      "toys", "blankets", "loungewear", "sublimation-friendly", "kids",
    ],
    h1: "Plush Fabric — Deep-Pile Polyester for Toys, Blankets, and Loungewear",
    metaDescription:
      "100% polyester plush, 200-300 gsm. Deep soft pile, ultra-cozy hand. Plush toys, blankets, loungewear, baby products. Sublimation and DTF friendly. Low MOQ 50 pcs.",
    intro:
      "Plush is a knit or woven fabric with a deep, dense pile that feels like a teddy bear. Standard for plush toys, custom blankets, and cozy loungewear. Polyester plush takes sublimation ink with a soft, integrated look — the print becomes part of the pile rather than sitting on top.",
    characteristics: [
      "100% polyester with deep pile",
      "200-300 gsm — heavy and cozy",
      "Ultra-soft, fluffy hand",
      "Holds warmth exceptionally well",
      "Sublimation prints with soft edge definition",
      "Hypoallergenic and lint-resistant",
    ],
    bestForList: [
      "Custom plush toys and mascots",
      "Printed blankets and throws",
      "Cozy loungewear and robes",
      "Baby products and comfort items",
    ],
    careNotes: [
      "Machine wash cold, gentle cycle",
      "Tumble dry low or air dry",
      "Brush gently to restore pile after washing",
      "Do not iron on print",
    ],
    relatedSlugs: ["velour", "polar-fleece", "french-terry", "fleece-brushed"],
    faq: [
      {
        q: "Can you print custom plush toys?",
        a: "Yes — we offer custom sublimated plush toys and mascots. Send us your design and we'll print the fabric before cutting and sewing. Minimum order typically 100-300 units depending on size.",
      },
    ],
  },
  {
    name: "Acrylic",
    slug: "acrylic",
    comp: "100% Acrylic",
    gsm: "200-400",
    spec: "Width 150cm, knit or woven",
    use: "Sweaters, scarves, blankets, beanies",
    fit: 1,
    swatch: "acrylic",
    description:
      "Acrylic — soft, lightweight, wool-like. Used for sweaters, scarves, and cold-weather accessories.",
    printMethods: ["screen-print", "embroidery", "dtf"],
    tags: [
      "acrylic", "synthetic", "wool-substitute", "knit", "woven", "midweight",
      "heavyweight", "sweaters", "scarves", "winter", "not-sublimation",
    ],
    h1: "Acrylic Fabric — Wool-Like Synthetic for Sweaters, Scarves, and Cold-Weather Apparel",
    metaDescription:
      "100% acrylic fabric, 200-400 gsm. Soft, lightweight, wool-like hand. Sweaters, scarves, beanies, blankets. Screen-print, embroidery, DTF friendly. Not suitable for sublimation.",
    intro:
      "Acrylic is a synthetic fiber designed to mimic wool — soft, warm, lightweight, and easy to care for. It's the standard for affordable sweaters, scarves, beanies, and blankets where wool's cost and care requirements are barriers. Acrylic takes screen-print and embroidery cleanly but is not suitable for sublimation (it's not polyester-based).",
    characteristics: [
      "100% acrylic — wool substitute",
      "200-400 gsm — mid to heavy weight",
      "Soft, warm, lightweight",
      "Holds color well (solution-dyed options available)",
      "Machine washable, easy care",
      "Not suitable for sublimation",
    ],
    bestForList: [
      "Sweaters and pullovers",
      "Scarves and beanies",
      "Custom blankets and throws",
      "Winter accessories",
    ],
    careNotes: [
      "Machine wash cold or hand wash",
      "Lay flat to dry for shape retention",
      "Do not bleach",
      "Iron on low with cloth barrier",
    ],
    relatedSlugs: ["wool", "polar-fleece", "plush", "velour"],
    faq: [
      {
        q: "Is acrylic warm like wool?",
        a: "Acrylic is warm but doesn't insulate as well as natural wool. It's lighter, dries faster, and is easier to care for, but wool wins for serious cold-weather performance. Acrylic is the affordable, low-maintenance alternative.",
      },
    ],
  },
  {
    name: "Lurex (metallic)",
    slug: "lurex",
    comp: "95% Polyester + 5% Metallic",
    gsm: "120-160",
    spec: "Width 150cm, woven with metallic thread",
    use: "Evening wear, dance, party apparel",
    fit: 3,
    swatch: "lurex",
    description:
      "Lurex with metallic threads woven in. Sparkle and shine for evening wear and party apparel.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "metallic", "woven", "lightweight", "evening",
      "dance", "party", "sparkle", "sublimation-friendly", "elegant",
    ],
    h1: "Lurex Fabric — Metallic Thread Polyester for Evening Wear and Dance Apparel",
    metaDescription:
      "95% polyester / 5% metallic lurex, 120-160 gsm. Sparkle and shine for evening wear, dance costumes, party apparel. Sublimation and DTF friendly. Low MOQ 50 pcs.",
    intro:
      "Lurex is a yarn with a metallic core wrapped in polyester or other fibers, giving a metallic shine that doesn't tarnish or wash out. Woven into fabric, it creates a sparkling effect for evening wear, dance costumes, and party apparel. Polyester-based lurex can be sublimated, though the metallic threads add visual texture to the print.",
    characteristics: [
      "95% polyester / 5% metallic thread",
      "120-160 gsm — lightweight",
      "Sparkle and shine without tarnish",
      "Sublimation prints on the poly face (metallic stays as base)",
      "Soft enough for apparel (not scratchy like older metallic yarns)",
      "Holds shape and drape well",
    ],
    bestForList: [
      "Evening and party dresses",
      "Dance and performance costumes",
      "Holiday and festival wear",
      "Statement tops and accessories",
    ],
    careNotes: [
      "Hand wash cold, gentle",
      "Do not wring — roll in towel",
      "Hang or lay flat to dry",
      "Iron on reverse side with cloth barrier",
    ],
    relatedSlugs: ["satin-polyester", "velour", "chiffon", "organza"],
    faq: [
      {
        q: "Does the metallic in lurex tarnish or wash out?",
        a: "No — modern lurex uses polyester-wrapped metallic threads that don't tarnish. The sparkle stays wash after wash. Older lurex (pre-1990s) used metal films that could tarnish, but current yarns are durable.",
      },
    ],
  },
  {
    name: "Lace",
    slug: "lace",
    comp: "100% Polyester",
    gsm: "80-120",
    spec: "Width 150cm, knitted or woven lace",
    use: "Evening wear, lingerie, overlays",
    fit: 3,
    swatch: "lace",
    description:
      "Polyester lace with openwork patterns. Delicate, decorative — for evening wear and overlays.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "lace", "knit", "woven", "lightweight", "evening",
      "lingerie", "overlay", "decorative", "sublimation-friendly",
    ],
    h1: "Polyester Lace Fabric — Openwork Pattern for Evening Wear and Overlays",
    metaDescription:
      "100% polyester lace, 80-120 gsm. Delicate openwork patterns for evening wear, lingerie, overlays, and decorative trim. Sublimation and DTF friendly. Low MOQ 50 pcs.",
    intro:
      "Polyester lace has intricate openwork patterns created by knitting or weaving — floral, geometric, or abstract designs. Standard for evening wear, lingerie, and decorative overlays. Polyester lace can be sublimated, though the openwork pattern shows through the print, giving a textured effect.",
    characteristics: [
      "100% polyester lace",
      "80-120 gsm — very lightweight",
      "Intricate openwork patterns",
      "Sublimation prints show the underlying pattern through",
      "DTF gives more solid coverage on lace",
      "Decorative edge options available",
    ],
    bestForList: [
      "Evening and bridal wear",
      "Lingerie and intimate apparel",
      "Decorative overlays and trim",
      "Festival and statement pieces",
    ],
    careNotes: [
      "Hand wash cold, gentle",
      "Do not wring — roll in towel",
      "Lay flat to dry",
      "Iron on low with cloth barrier",
    ],
    relatedSlugs: ["stretch-lace", "satin-polyester", "chiffon", "organza"],
    faq: [
      {
        q: "Can I sublimate on lace?",
      a: "Yes — light colors take sublimation ink, though the openwork pattern shows through the print giving a textured effect. For more solid coverage, DTF is preferred.",
      },
    ],
  },
  {
    name: "Single jersey (lightweight)",
    slug: "single-jersey",
    comp: "100% Polyester",
    gsm: "120-160",
    spec: "Width 150-180cm, fine single knit",
    use: "Lightweight tees, linings, layering",
    fit: 5,
    swatch: "single-jersey",
    description:
      "Lightweight single-jersey polyester. Soft, drapey, sublimation-friendly — perfect for summer apparel.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "knit", "jersey", "lightweight", "summer", "casual",
      "t-shirts", "linings", "sublimation-friendly", "everyday", "tops",
    ],
    h1: "Lightweight Single Jersey — Polyester Knit for Summer Tees and Linings",
    metaDescription:
      "100% polyester lightweight single jersey, 120-160 gsm. Soft, drapey, vivid sublimation prints. Summer t-shirts, linings, layering pieces. Low MOQ 50 pcs.",
    intro:
      "Lightweight single jersey uses finer yarns than standard jersey, giving a softer drape and cooler feel against the skin. Standard for summer t-shirts, lightweight layering pieces, and linings. Sublimation prints look especially vivid on lightweight jersey due to the smooth, fine surface.",
    characteristics: [
      "100% polyester fine single knit",
      "120-160 gsm — very lightweight",
      "Soft, drapey, cool-touch hand",
      "Excellent sublimation print quality",
      "Semi-sheer at lighter weights",
      "Slight mechanical stretch",
    ],
    bestForList: [
      "Summer t-shirts and tanks",
      "Lightweight layering pieces",
      "Jacket linings",
      "Performance base layers",
    ],
    careNotes: [
      "Machine wash cold, gentle",
      "Hang dry or tumble dry low",
      "Do not iron on print",
      "Avoid fabric softener",
    ],
    relatedSlugs: ["polyester-jersey", "jersey-single", "interlock-knit", "microfiber-polyester"],
    faq: [
      {
        q: "Is lightweight jersey see-through?",
        a: "At 120 gsm, yes — there may be some sheerness, especially in lighter colors. For full opacity, choose 140-160 gsm or layer underneath. For linings and base layers where sheerness is acceptable, 120 gsm is fine.",
      },
    ],
  },
  {
    name: "Double knit",
    slug: "double-knit",
    comp: "100% Polyester",
    gsm: "220-320",
    spec: "Width 150-180cm, double-layer knit",
    use: "Dresses, structured knit tops, jackets",
    fit: 4,
    swatch: "double-knit",
    description:
      "Double-knit polyester — thick, structured, holds shape. Perfect for dresses and structured knit apparel.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "knit", "double-knit", "midweight", "heavyweight",
      "structured", "dresses", "jackets", "sublimation-friendly", "stable",
    ],
    h1: "Double-Knit Polyester Fabric — Structured Knit for Dresses and Jackets",
    metaDescription:
      "100% polyester double-knit, 220-320 gsm. Thick, structured, holds shape without interfacing. Dresses, knit jackets, structured tops. Sublimation and DTF friendly. MOQ 50 pcs.",
    intro:
      "Double-knit is a heavier version of interlock — two layers of jersey knitted together for a thick, stable fabric that holds shape without interfacing. Standard for knit dresses, structured tops, and unlined knit jackets. The thicker construction means more substantial drape and better opacity than single jersey.",
    characteristics: [
      "100% polyester double-knit construction",
      "220-320 gsm — mid to heavy weight",
      "Structured, holds shape without interfacing",
      "Full opacity, even in lighter colors",
      "Smooth face and back (both printable)",
      "Vivid sublimation prints",
    ],
    bestForList: [
      "Knit dresses and skirts",
      "Unlined knit jackets and blazers",
      "Structured tops and shells",
      "Co-ord sets and matching pieces",
    ],
    careNotes: [
      "Machine wash cold, gentle",
      "Lay flat or hang to dry",
      "Iron on low if needed",
      "Do not use fabric softener",
    ],
    relatedSlugs: ["interlock-knit", "pique-knit", "scuba", "french-terry"],
    faq: [
      {
        q: "Is double knit the same as ponte?",
        a: "They're similar. Ponte is a specific type of double knit (usually poly-rayon-spandex) with extra structure and stretch. Our double knit is 100% polyester for full sublimation compatibility. For stretch double knit, see our ponte option.",
      },
    ],
  },
  {
    name: "Spandex (80/20)",
    slug: "spandex-80-20",
    comp: "80% Polyester + 20% Spandex",
    gsm: "150-200",
    spec: "Width 150cm, 4-way stretch",
    use: "Compression, leggings, fitted athletic",
    fit: 4,
    swatch: "spandex",
    description:
      "80% poly / 20% spandex — high-stretch compression blend. Stronger recovery than 92/8.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "spandex", "knit", "stretch", "4-way-stretch",
      "athletic", "compression", "fitted", "leggings", "sublimation-friendly",
    ],
    h1: "80/20 Poly-Spandex — High-Stretch Compression Fabric for Athletic Apparel",
    metaDescription:
      "80% polyester / 20% spandex, 150-200 gsm. High-stretch 4-way compression with strong recovery. Leggings, compression wear, fitted athletic. Sublimation friendly. MOQ 50 pcs.",
    intro:
      "80/20 poly-spandex has double the spandex content of standard 92/8 blends, giving significantly more stretch and recovery. The standard for serious compression wear, performance leggings, and any garment that needs to hold tight against the body during high-intensity activity. Sublimation prints hold up well to the higher stretch level.",
    characteristics: [
      "80% polyester / 20% spandex",
      "150-200 gsm — light to mid-weight",
      "Very high 4-way stretch",
      "Strong recovery — holds shape under stress",
      "Vivid sublimation prints that move with the fabric",
      "Suitable for serious compression garments",
    ],
    bestForList: [
      "Performance leggings and tights",
      "Compression tops and long sleeves",
      "Cycling and triathlon suits",
      "Dance and gymnastics apparel",
    ],
    careNotes: [
      "Machine wash cold, gentle",
      "Do not use fabric softener — degrades spandex",
      "Hang dry recommended",
      "Do not iron on print",
    ],
    relatedSlugs: ["poly-spandex-stretch", "nylon-spandex", "pbt-stretch", "scuba"],
    faq: [
      {
        q: "Is 80/20 or 92/8 poly-spandex better?",
        a: "It depends on the use. 92/8 is enough for most t-shirts and light athletic wear — more comfortable, more breathable. 80/20 is for serious compression where the garment must hold tight under high stress. Choose 80/20 for compression leggings, cycling, and performance wear.",
      },
    ],
  },
  {
    name: "Waffle knit",
    slug: "waffle",
    comp: "100% Polyester (or blend)",
    gsm: "180-240",
    spec: "Width 150-180cm, textured knit",
    use: "Thermal tops, henleys, layering",
    fit: 4,
    swatch: "waffle",
    description:
      "Waffle knit with grid texture. Traps warmth, breathable, classic for thermal and henley shirts.",
    printMethods: ["sublimation", "dtf", "screen-print", "embroidery"],
    tags: [
      "polyester", "knit", "waffle", "thermal", "midweight", "layering",
      "henleys", "thermal-wear", "sublimation-friendly", "casual",
    ],
    h1: "Waffle Knit Fabric — Grid Texture for Thermal Wear and Henleys",
    metaDescription:
      "100% polyester waffle knit, 180-240 gsm. Grid texture traps warmth while staying breathable. Thermal tops, henleys, layering pieces. Sublimation friendly. MOQ 50 pcs.",
    intro:
      "Waffle knit has a distinctive grid texture (small squares that look like waffles) that traps air for warmth while still allowing breathability. The standard for thermal underwear, henley shirts, and lightweight layering pieces. Polyester waffle takes sublimation cleanly with the texture showing through the print.",
    characteristics: [
      "100% polyester with grid texture",
      "180-240 gsm — mid-weight",
      "Traps air for warmth without bulk",
      "Breathable through texture channels",
      "Vivid sublimation prints (texture shows through)",
      "Soft against skin, no itch",
    ],
    bestForList: [
      "Thermal underwear and base layers",
      "Henley shirts",
      "Lightweight layering pieces",
      "Casual long-sleeve tops",
    ],
    careNotes: [
      "Machine wash cold, gentle",
      "Tumble dry low or hang dry",
      "Do not iron on print",
      "Avoid fabric softener",
    ],
    relatedSlugs: ["french-terry", "pique-knit", "rib-knit-1x1", "interlock-knit"],
    faq: [
      {
        q: "Is waffle knit warm?",
        a: "Yes — the grid texture traps air against the body, providing insulation similar to a light fleece but more breathable. Waffle is great for transitional weather and as a base layer under heavier garments in cold weather.",
      },
    ],
  },
  {
    name: "Brushed poly",
    slug: "brushed-poly",
    comp: "100% Polyester",
    gsm: "180-240",
    spec: "Width 150-180cm, brushed face",
    use: "Flannel shirts, lined jackets, pajamas",
    fit: 4,
    swatch: "brushed-poly",
    description:
      "Brushed polyester with sueded peach-skin face. Soft, warm, perfect for flannel-style shirts.",
    printMethods: ["sublimation", "dtf", "screen-print"],
    tags: [
      "polyester", "brushed", "midweight", "sueded", "flannel",
      "shirts", "pajamas", "sublimation-friendly", "soft", "casual",
    ],
    h1: "Brushed Polyester — Sueded Fabric for Flannel Shirts and Pajamas",
    metaDescription:
      "100% polyester brushed fabric, 180-240 gsm. Sueded peach-skin face, soft and warm. Flannel shirts, lined jackets, pajamas. Sublimation friendly. MOQ 50 pcs.",
    intro:
      "Brushed poly is polyester that has been mechanically brushed on the face to create a sueded, peach-skin texture. The brushed face feels soft and warm against the skin, similar to a cotton flannel but with better washability and printability. Standard for flannel-style shirts, lined jackets, and cozy pajamas.",
    characteristics: [
      "100% polyester with brushed face",
      "180-240 gsm — mid-weight",
      "Sueded peach-skin surface",
      "Soft, warm hand",
      "Vivid sublimation prints (softer edge definition)",
      "Washes better than cotton flannel — no shrinkage",
    ],
    bestForList: [
      "Flannel-style button-up shirts",
      "Lined jackets and vests",
      "Cozy pajama sets",
      "Casual cold-weather apparel",
    ],
    careNotes: [
      "Machine wash cold, gentle",
      "Tumble dry low or hang dry",
      "Iron on low with cloth barrier",
      "Do not bleach",
    ],
    relatedSlugs: ["french-terry", "fleece-brushed", "polar-fleece", "cotton-tshirt"],
    faq: [
      {
        q: "Is brushed poly the same as flannel?",
        a: "Brushed poly mimics the look and feel of cotton flannel but is more durable, doesn't shrink, and prints better. For printed flannel-style shirts, brushed poly is the modern standard.",
      },
    ],
  },
  {
    name: "Scuba",
    slug: "scuba",
    comp: "95% Polyester + 5% Spandex",
    gsm: "250-350",
    spec: "Width 150cm, dense double-knit",
    use: "Structured dresses, scuba skirts, fashion",
    fit: 4,
    swatch: "scuba",
    description:
      "Scuba — thick double-knit with slight stretch. Structured, smooth, holds shape for bodycon fashion.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "spandex", "knit", "double-knit", "stretch",
      "structured", "fashion", "dresses", "sublimation-friendly",
    ],
    h1: "Scuba Fabric — Thick Double-Knit for Structured Bodycon Fashion",
    metaDescription:
      "95% polyester / 5% spandex scuba, 250-350 gsm. Thick double-knit with slight stretch. Bodycon dresses, structured fashion, scuba skirts. Sublimation friendly. MOQ 50 pcs.",
    intro:
      "Scuba is a thick double-knit fabric with just enough spandex for shape retention. Originally developed for wetsuit liners, it's now a fashion staple for bodycon dresses, structured skirts, and sculptural apparel. The dense knit holds shape without interfacing, making it ideal for dramatic silhouettes.",
    characteristics: [
      "95% polyester / 5% spandex",
      "250-350 gsm — thick and structured",
      "Dense double-knit construction",
      "Slight stretch, holds shape well",
      "Smooth face for vivid sublimation prints",
      "No interfacing needed for structure",
    ],
    bestForList: [
      "Bodycon and bandage dresses",
      "Structured skirts and peplum tops",
      "Sculptural fashion pieces",
      "Athletic fashion (leggings, sports bra outer layer)",
    ],
    careNotes: [
      "Machine wash cold, gentle",
      "Hang dry recommended",
      "Iron on low with cloth barrier",
      "Do not bleach",
    ],
    relatedSlugs: ["neoprene", "double-knit", "poly-spandex-stretch", "ponte"],
    faq: [
      {
        q: "Is scuba the same as neoprene?",
        a: "Scuba is a thinner, more apparel-friendly version of neoprene. It has the structured feel without the bulk and weight of true neoprene. For fashion bodycon pieces, scuba is the standard. For actual wetsuits, true neoprene is needed.",
      },
    ],
  },
  {
    name: "Performance mesh",
    slug: "performance-mesh",
    comp: "100% Polyester",
    gsm: "120-160",
    spec: "Width 150-180cm, athletic mesh",
    use: "Athletic jerseys, training tops",
    fit: 5,
    swatch: "performance-mesh",
    description:
      "Performance athletic mesh with moisture-wicking finish. Maximum breathability for high-output sports.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "knit", "mesh", "lightweight", "athletic",
      "moisture-wicking", "breathable", "sublimation-friendly", "training",
    ],
    h1: "Performance Athletic Mesh — Maximum Breathability for High-Output Sports",
    metaDescription:
      "100% polyester performance mesh, 120-160 gsm. Moisture-wicking finish, maximum breathability. Athletic jerseys, training tops, racing kits. Sublimation friendly. MOQ 50 pcs.",
    intro:
      "Performance mesh is engineered for high-output athletic activity. The small uniform holes maximize airflow, and the moisture-wicking finish pulls sweat away from the skin. Standard for competitive sports jerseys, training tops, and racing kits where ventilation and quick-dry performance matter most.",
    characteristics: [
      "100% polyester with moisture-wicking finish",
      "120-160 gsm — lightweight",
      "Maximum breathability and ventilation",
      "Quick-dry and sweat-wicking",
      "Vivid sublimation prints",
      "Holds shape under repeated wash cycles",
    ],
    bestForList: [
      "Competitive sports jerseys",
      "Running and cycling tops",
      "Racing kits and singlets",
      "High-intensity training wear",
    ],
    careNotes: [
      "Machine wash cold, gentle",
      "Do not use fabric softener — clogs mesh",
      "Hang dry recommended",
      "Do not iron on print",
    ],
    relatedSlugs: ["bird-eye-mesh", "eyelet-mesh", "mesh-open", "polyester-jersey"],
    faq: [
      {
        q: "Is performance mesh see-through?",
        a: "Modern performance mesh is opaque in normal wear. The holes are small and dense. If you hold it up to strong light, you'll see the holes, but it functions as a solid athletic fabric.",
      },
    ],
  },
  {
    name: "Polar fleece (anti-pill)",
    slug: "polar-anti-pill",
    comp: "100% Polyester",
    gsm: "220-320",
    spec: "Width 150-180cm, anti-pill finish",
    use: "Outdoor jackets, premium hoodies",
    fit: 4,
    swatch: "polar-anti-pill",
    description:
      "Anti-pill polar fleece. Resists pilling through repeated wash cycles, premium hand, ideal for outdoor wear.",
    printMethods: ["sublimation", "dtf", "screen-print", "embroidery"],
    tags: [
      "polyester", "knit", "fleece", "anti-pill", "midweight", "heavyweight",
      "outdoor", "jackets", "premium", "sublimation-friendly", "winter",
    ],
    h1: "Anti-Pill Polar Fleece — Premium Outdoor Fleece That Stays Smooth",
    metaDescription:
      "100% polyester anti-pill polar fleece, 220-320 gsm. Resists pilling through repeated washes. Premium outdoor jackets, hoodies, mid-layers. Sublimation, DTF, embroidery. MOQ 50 pcs.",
    intro:
      "Anti-pill polar fleece has a special finish that prevents the small fiber balls (pills) that form on regular fleece after multiple wash cycles. The result is a fleece that looks new for longer — the standard for premium outdoor jackets, technical mid-layers, and high-end hoodies where appearance matters over time.",
    characteristics: [
      "100% polyester with anti-pill finish",
      "220-320 gsm — mid to heavy weight",
      "Resists pilling through 50+ wash cycles",
      "Warm, soft hand",
      "Sublimation prints with soft edge definition",
      "Dries quickly, easy care",
    ],
    bestForList: [
      "Outdoor and technical jackets",
      "Premium hoodies and zip-ups",
      "Mid-layer pullovers",
      "Hunting and fishing apparel",
    ],
    careNotes: [
      "Machine wash cold, gentle",
      "Tumble dry low",
      "Avoid high heat — flattens pile",
      "Do not iron on print",
    ],
    relatedSlugs: ["polar-fleece", "fleece-brushed", "french-terry", "plush"],
    faq: [
      {
        q: "What does anti-pill mean?",
        a: "Anti-pill fleece has a finish that prevents the small fiber balls (pills) that normally form on fleece after multiple washes. The result is a smoother appearance over time. Anti-pill fleece looks new for 50+ wash cycles; regular fleece may start pilling after 10-20.",
      },
    ],
  },
  {
    name: "Mesh net (large-hole)",
    slug: "mesh-net",
    comp: "100% Polyester",
    gsm: "60-100",
    spec: "Width 150-180cm, open net",
    use: "Lining, accent panels, athletic overlays",
    fit: 4,
    swatch: "mesh-net",
    description:
      "Large-hole mesh net for maximum ventilation. Decorative and functional for athletic and fashion pieces.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "knit", "mesh", "net", "lightweight", "breathable",
      "linings", "panels", "athletic", "sublimation-friendly", "open-hole",
    ],
    h1: "Large-Hole Mesh Net — Maximum Ventilation for Athletic and Fashion",
    metaDescription:
      "100% polyester large-hole mesh net, 60-100 gsm. Maximum ventilation and decorative effect. Lining fabric, accent panels, athletic overlays. Sublimation friendly. Low MOQ 50 pcs.",
    intro:
      "Mesh net has the largest open holes of any mesh fabric — clearly visible ventilation openings. Standard for accent panels in athletic apparel (where airflow is critical), decorative overlays in fashion, and breathable linings. The dramatic open structure also makes it popular for streetwear and high-fashion pieces.",
    characteristics: [
      "100% polyester with large open holes",
      "60-100 gsm — very lightweight",
      "Maximum ventilation and airflow",
      "Decorative effect when used as overlay",
      "Vivid sublimation prints",
      "Translucent — usually used over another fabric",
    ],
    bestForList: [
      "Accent panels in athletic apparel",
      "Decorative overlays in streetwear",
      "Breathable linings for jackets",
      "Festival and performance apparel",
    ],
    careNotes: [
      "Hand wash or gentle machine cycle",
      "Do not use fabric softener",
      "Hang dry recommended",
      "Iron on low with cloth barrier",
    ],
    relatedSlugs: ["mesh-open", "bird-eye-mesh", "performance-mesh", "eyelet-mesh"],
    faq: [
      {
        q: "Is mesh net see-through?",
        a: "Yes — mesh net is highly transparent due to the large holes. It's designed as accent fabric or lining, not as a primary face fabric. Pair with solid fabric for modesty.",
      },
    ],
  },
  {
    name: "Stretch lace",
    slug: "stretch-lace",
    comp: "90% Polyester + 10% Spandex",
    gsm: "100-140",
    spec: "Width 150cm, lace knit with stretch",
    use: "Lingerie, bodysuits, dance, evening",
    fit: 3,
    swatch: "stretch-lace",
    description:
      "Stretch lace with 10% spandex. Hugs the body, holds shape — standard for lingerie and bodysuits.",
    printMethods: ["sublimation", "dtf"],
    tags: [
      "polyester", "spandex", "lace", "knit", "stretch", "lingerie",
      "bodysuits", "dance", "evening", "sublimation-friendly",
    ],
    h1: "Stretch Lace Fabric — Poly-Spandex Lace for Lingerie and Bodysuits",
    metaDescription:
      "90% polyester / 10% spandex stretch lace, 100-140 gsm. Hugs the body, holds shape. Lingerie, bodysuits, dance, evening wear. Sublimation friendly. Low MOQ 50 pcs.",
    intro:
      "Stretch lace combines the decorative openwork of lace with 10% spandex for body-hugging stretch. The standard for lingerie, bodysuits, dance costumes, and evening wear where a delicate, form-fitting look is desired. Polyester-based stretch lace accepts sublimation ink for custom patterns and colors.",
    characteristics: [
      "90% polyester / 10% spandex",
      "100-140 gsm — lightweight",
      "Stretchy with good recovery",
      "Hugs the body without sagging",
      "Vivid sublimation prints on the poly base",
      "Soft against skin — no scratchy edges",
    ],
    bestForList: [
      "Lingerie and intimate apparel",
      "Bodysuits and leotards",
      "Dance and performance costumes",
      "Evening and event wear",
    ],
    careNotes: [
      "Hand wash cold, gentle",
      "Do not wring — roll in towel",
      "Lay flat to dry",
      "Iron on low with cloth barrier",
    ],
    relatedSlugs: ["lace", "poly-spandex-stretch", "satin-polyester", "chiffon"],
    faq: [
      {
        q: "Does stretch lace hold its shape?",
        a: "Yes — with 10% spandex, the lace has full recovery and holds shape through wearing and washing. The fabric will stretch with the body but return to its original form. Lingerie and bodysuits made from stretch lace maintain their fit for years.",
      },
    ],
  },
];

// Merge in Hongyu-sourced fabrics (cotton, silk, wool, linen, specialty)
fabricTypes.push(...extraFabricTypes);

// Filter helpers
export const cottonFabrics = fabricTypes.filter(
  (f) =>
    /cotton/i.test(f.name) ||
    /cotton/i.test(f.comp) ||
    /bamboo|modal|tencel|rayon|viscose/i.test(f.comp)
);

export const polyesterFabrics = fabricTypes.filter(
  (f) =>
    /poly|polyester|nylon|spandex|elastane/i.test(f.comp) &&
    !/cotton/i.test(f.name) &&
    !/cotton/i.test(f.comp)
);

// Get all unique tags
export const allTags = Array.from(
  new Set(fabricTypes.flatMap((f) => f.tags))
).sort();

// Get all fabric types for filter UI
export const fabricByTag = (tag: string) =>
  fabricTypes.filter((f) => f.tags.includes(tag));

// Get fabric by slug
export const fabricBySlug = (slug: string) =>
  fabricTypes.find((f) => f.slug === slug);
