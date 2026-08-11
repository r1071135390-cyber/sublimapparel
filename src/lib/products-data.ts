// ============================================================
// All-Over Print Product Catalog — 100 products, 3-dim tags
// ============================================================
//
// Each product carries three tag dimensions:
//   - category  (服装名称) — T-Shirt, Hoodie, Jersey, etc.
//   - sports    (运动项目) — AFL, Basketball, Yoga, etc.
//   - scenarios (使用场景) — Team & Club, Corporate, etc.
//
// Cross-filter: within one dimension = OR, across dimensions = AND
//
// Image placeholders — to be replaced with real product shots.
// Sourced from Yoycol product feed (Aug 2026).

export type ProductCategory =
  | "T-Shirt"
  | "Hoodie"
  | "Polo Shirt"
  | "Jersey / Kit"
  | "Sports Top / Kit"
  | "Jacket"
  | "Combat Gear"
  | "Shirt"
  | "Tank Top & Camis"
  | "Pants"
  | "Sweatshirt"
  | "Sleepwear & Underwear"
  | "Dress"
  | "Coord Set"
  | "Knitwear"
  | "Romper & Jumpsuit"
  | "Skirt"
  | "Bodysuit"
  | "Sports Top"
  | "Baby Bodysuit"
  | "Kids Sportswear"
  | "Winter Wear"
  | "Activewear"
  | "Swimwear"
  | "Beachwear"
  | "Leggings"
  | "Apron"
  | "Bucket Hat"
  | "Baseball Cap";

export type Sport =
  | "AFL" | "Athletics" | "Badminton" | "Baseball" | "Basketball"
  | "Beach" | "Bowling" | "Boxing" | "Cheer" | "Cricket"
  | "CrossFit" | "Cycling" | "Dance" | "Dive" | "Esports"
  | "Fishing" | "Football" | "Golf" | "Gym" | "Hockey"
  | "Lacrosse" | "MMA" | "Martial Arts" | "Netball" | "Pilates"
  | "Rugby" | "Running" | "Skate" | "Skating" | "Ski"
  | "Snowboard" | "Soccer" | "Softball" | "Surf" | "Swimwear"
  | "Table Tennis" | "Tennis" | "Triathlon" | "Volleyball" | "Wrestling"
  | "Yoga";

export type Scenario =
  | "Promotional Swag" | "Event & Festival" | "School & Education"
  | "Team & Club" | "Sports League" | "Corporate & Branding"
  | "Uniform & Workwear" | "Retail & Fashion" | "Political Campaign"
  | "Fundraiser & Charity" | "Music & Merch" | "Wedding & Party"
  | "Gift & Souvenir" | "Construction & Engineering"
  | "Express & Logistics" | "Hospitality & F&B" | "Medical & Healthcare"
  | "Security & Property" | "Retail & Supermarket"
  | "Education & School" | "Corporate & Promo"
  | "Transit & Transport" | "Studio & Gym" | "Military"
  | "Festival & Holiday";

export interface ProductFabric {
  gsm: string;        // e.g. "210GSM" or "—"
  material: string;   // e.g. "涤纶" / "棉" / "抓绒"
  process: string;    // e.g. "Sublimation" / "All-Over Digital Print on Cotton"
  gsmOptions?: string; // e.g. "160180200220240 g"
}

export interface Product {
  id: string;                  // yoycol ID, e.g. "2AHAYR15"
  slug: string;                // URL slug derived from id
  name: string;                // display name
  category: ProductCategory;
  sports: Sport[];             // empty array = "no specific sport"
  scenarios: Scenario[];
  fabrics: ProductFabric[];    // available fabric options
  moq: number;                 // minimum order qty
  description: string;
}

// All 42 sport tags (used for the cross-cutting products that apply to all sports)
const ALL_SPORTS: Sport[] = [
  "AFL", "Athletics", "Badminton", "Baseball", "Basketball",
  "Beach", "Bowling", "Boxing", "Cheer", "Cricket",
  "CrossFit", "Cycling", "Dance", "Dive", "Esports",
  "Fishing", "Football", "Golf", "Gym", "Hockey",
  "Lacrosse", "MMA", "Martial Arts", "Netball", "Pilates",
  "Rugby", "Running", "Skate", "Skating", "Ski",
  "Snowboard", "Soccer", "Softball", "Surf", "Swimwear",
  "Table Tennis", "Tennis", "Triathlon", "Volleyball", "Wrestling",
  "Yoga",
];

// All 13 main scenarios (used for the cross-cutting products that apply to all scenarios)
const ALL_SCENARIOS: Scenario[] = [
  "Corporate & Branding", "Team & Club", "Event & Festival",
  "School & Education", "Fundraiser & Charity", "Retail & Fashion",
  "Uniform & Workwear", "Music & Merch", "Sports League",
  "Wedding & Party", "Gift & Souvenir", "Promotional Swag",
  "Political Campaign",
];

// Sport-specific scenarios
const SPORT_SCENARIOS: Scenario[] = [
  "Team & Club", "Event & Festival", "Sports League",
  "School & Education", "Promotional Swag",
];

// ============================================================
// PRODUCT CATALOG (100 items)
// ============================================================

export const products: Product[] = [
  // ---------- 1–23: Cross-cutting products (all sports + all scenarios) ----------
  {
    id: "2AHAYR15",
    slug: "all-over-print-womens-rectangle-scarf",
    name: "All-Over Print Womens Rectangle Scarf 170X45cm",
    category: "Hoodie",  // tagged as Hoodie in source (group with 服装)
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "310GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "245GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "230GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "210GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "190GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "180GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "170GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "140GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "140GSM", material: "棉/Slub棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "125GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "125GSM", material: "棉/Slub棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "115GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "115GSM", material: "棉/府绸", process: "All-Over Digital Print on Cotton", gsmOptions: "80100120 g" },
      { gsm: "—", material: "Interlock布", process: "Sublimation", gsmOptions: "160180200220 g" },
    ],
    moq: 50,
    description: "All-over print rectangle scarf, 170×45cm. 14 fabric options, full sublimation or allover digital print on cotton.",
  },
  {
    id: "2KTXDM69",
    slug: "childrens-t-shirts-printed-usa-gildan-64000b",
    name: "Childrens T-Shirts Printed in USA — Gildan 64000B (DTG)",
    category: "T-Shirt",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "230GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "220GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "210GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "190GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "180GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "180GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "145GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "145GSM", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "Interlock布", process: "Sublimation", gsmOptions: "160180200220 g" },
      { gsm: "—", material: "天鹅绒", process: "Sublimation", gsmOptions: "240260280300 g" },
      { gsm: "—", material: "平纹布", process: "Sublimation", gsmOptions: "120140160180200 g" },
      { gsm: "—", material: "网眼布", process: "Sublimation", gsmOptions: "100120140160180200 g" },
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Kids Gildan 64000B t-shirt, DTG or sublimation. 13 fabric options for any design.",
  },
  {
    id: "1WPXZY10",
    slug: "all-over-print-womens-high-stretch-tights",
    name: "All-Over Print Womens High-Stretch Tights",
    category: "Pants",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "310GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "290GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "245GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "230GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "145GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "115GSM", material: "棉/府绸", process: "All-Over Digital Print on Cotton", gsmOptions: "80100120 g" },
      { gsm: "—", material: "Interlock布", process: "Sublimation", gsmOptions: "160180200220 g" },
      { gsm: "—", material: "抓绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "毛绒", process: "Sublimation", gsmOptions: "200220240260280300 g" },
      { gsm: "—", material: "网眼布", process: "Sublimation", gsmOptions: "100120140160180200 g" },
      { gsm: "—", material: "雪纺", process: "Sublimation", gsmOptions: "80100120140160180200 g" },
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "High-stretch tights/leggings, all-over print, 12 fabric options.",
  },
  {
    id: "2MHPDM39",
    slug: "unisex-durable-pullover-sweatshirt-290gsm",
    name: "Unisex Durable Pullover Sweatshirt 290GSM (DTG)",
    category: "Shirt",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "150GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "140GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "140GSM", material: "棉/Slub棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "120GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "115GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "115GSM", material: "棉/府绸", process: "All-Over Digital Print on Cotton", gsmOptions: "80100120 g" },
      { gsm: "110GSM", material: "仿麻", process: "Sublimation", gsmOptions: "120140160180200220240260 g" },
      { gsm: "—", material: "亚麻", process: "Sublimation", gsmOptions: "120140160180200220240260 g" },
      { gsm: "—", material: "缎面", process: "Sublimation", gsmOptions: "80100120140160180200 g" },
      { gsm: "—", material: "网眼布", process: "Sublimation", gsmOptions: "100120140160180200 g" },
      { gsm: "—", material: "雪纺", process: "Sublimation", gsmOptions: "80100120140160180200 g" },
    ],
    moq: 50,
    description: "Unisex pullover sweatshirt, 290gsm, 11 fabric options.",
  },
  {
    id: "2MHPJR90",
    slug: "mens-fleece-lined-vintage-wash-zip-hoodie",
    name: "Mens Fleece-Lined Vintage Wash Zip Hoodie 360GSM (DTF)",
    category: "Jacket",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "310GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "245GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "245GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "245GSM", material: "棉/斜纹", process: "All-Over Digital Print on Cotton", gsmOptions: "120140160180200220240260280300 g" },
      { gsm: "230GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "—", material: "天鹅绒", process: "Sublimation", gsmOptions: "240260280300 g" },
      { gsm: "—", material: "抓绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "抓绒/帆布", process: "Sublimation", gsmOptions: "300 g" },
      { gsm: "—", material: "抓绒/羊羔绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "抓绒/针织", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "毛绒", process: "Sublimation", gsmOptions: "200220240260280300 g" },
      { gsm: "—", material: "涤纶", process: "Sublimation", gsmOptions: "100120140160180200 g" },
      { gsm: "—", material: "超细纤维", process: "Sublimation", gsmOptions: "100120 g" },
      { gsm: "—", material: "雪纺", process: "Sublimation", gsmOptions: "80100120140160180200 g" },
    ],
    moq: 50,
    description: "Fleece-lined vintage wash zip hoodie, 360gsm, 15 fabric options.",
  },
  {
    id: "2WUSMG97",
    slug: "womens-seamless-briefs-printed-usa-180gsm",
    name: "Womens Seamless Briefs Printed in USA 180GSM (DTF)",
    category: "Sleepwear & Underwear",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "210GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "190GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "180GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "180GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "115GSM", material: "棉/府绸", process: "All-Over Digital Print on Cotton", gsmOptions: "80100120 g" },
      { gsm: "—", material: "抓绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "毛绒", process: "Sublimation", gsmOptions: "200220240260280300 g" },
      { gsm: "—", material: "涤纶/抓绒/羊羔绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "缎面", process: "Sublimation", gsmOptions: "80100120140160180200 g" },
    ],
    moq: 50,
    description: "Womens seamless briefs, 180gsm, 9 fabric options.",
  },
  {
    id: "2MBXMA09",
    slug: "mens-loose-sleeveless-hoodie-320gsm",
    name: "Mens Loose Sleeveless Hoodie 320GSM (DTF)",
    category: "Tank Top & Camis",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "310GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "210GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "190GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "180GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "天鹅绒", process: "Sublimation", gsmOptions: "240260280300 g" },
      { gsm: "—", material: "网眼布", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "Mens loose sleeveless hoodie, 320gsm, 6 fabric options.",
  },
  {
    id: "3WBXGZ50",
    slug: "all-over-print-womens-tank-vest-dress",
    name: "All-Over Print Womens Tank Vest Dress",
    category: "Dress",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "140GSM", material: "棉/Slub棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "天鹅绒", process: "Sublimation", gsmOptions: "240260280300 g" },
      { gsm: "—", material: "网眼布", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "Womens tank vest dress, 3 fabric options.",
  },
  {
    id: "2MHPSA03",
    slug: "mens-distressed-vintage-wash-sweatshirt-360gsm",
    name: "Mens Distressed Vintage Wash Sweatshirt 360GSM (DTG)",
    category: "Sweatshirt",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "310GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "Interlock布", process: "Sublimation", gsmOptions: "160180200220 g" },
      { gsm: "—", material: "抓绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "针织/华夫格", process: "Sublimation", gsmOptions: "160180200220240260280300 g" },
    ],
    moq: 50,
    description: "Mens distressed vintage wash sweatshirt, 360gsm, 4 fabric options.",
  },
  {
    id: "3KCSZJ10",
    slug: "plamix-all-over-print-childrens-shirt-with-pocket",
    name: "Plamix All-Over Print Childrens Shirt With Pocket 140GSM Slub Cotton",
    category: "Coord Set",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "140GSM", material: "棉/Slub棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "抓绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Plamix childrens shirt with pocket, 140gsm slub cotton, 3 fabric options.",
  },
  {
    id: "2MHPHR99",
    slug: "mens-vintage-crewneck-knit-sweater-285gsm",
    name: "Mens Vintage Crewneck Knit Sweater 285GSM (DTG)",
    category: "Knitwear",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "平纹布", process: "Sublimation", gsmOptions: "120140160180200 g" },
      { gsm: "—", material: "抓绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "网眼布", process: "Sublimation", gsmOptions: "100120140160180200 g" },
      { gsm: "—", material: "针织", process: "Sublimation", gsmOptions: "120140160180200 g" },
    ],
    moq: 50,
    description: "Mens vintage crewneck knit sweater, 285gsm, 4 fabric options.",
  },
  {
    id: "3MJMJH01",
    slug: "all-over-print-unisex-thickened-home-jumpsuit",
    name: "All-Over Print Unisex Thickened Home Jumpsuit",
    category: "Romper & Jumpsuit",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "缎面", process: "Sublimation", gsmOptions: "80100120140160180200 g" },
      { gsm: "—", material: "网眼布", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "Unisex thickened home jumpsuit, 3 fabric options.",
  },
  {
    id: "3CDDAQ01",
    slug: "all-over-print-kids-short-sleeve-dress",
    name: "All-Over Print Kids Short-Sleeve Dress",
    category: "Skirt",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "180GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Kids short-sleeve dress, 1 fabric option.",
  },
  {
    id: "3WJMBX16",
    slug: "all-over-print-womens-tank-bodysuit",
    name: "All-Over Print Womens Tank Bodysuit",
    category: "Bodysuit",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "180GSM", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "210GSM", material: "Polyester", process: "Sublimation" },
    ],
    moq: 50,
    description: "Womens tank bodysuit, 2 fabric options.",
  },
  {
    id: "3KTXPL29",
    slug: "all-over-print-childrens-lapel-polo-shirt",
    name: "All-Over Print Childrens Lapel Polo Shirt 145GSM Birdseye",
    category: "Polo Shirt",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "145GSM", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "平纹布", process: "Sublimation", gsmOptions: "120140160180200 g" },
    ],
    moq: 50,
    description: "Childrens lapel polo shirt, 145gsm birdseye, 2 fabric options.",
  },
  {
    id: "3AHGYD02",
    slug: "sports-square-towel",
    name: "Sports Square Towel",
    category: "Sports Top",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "210GSM", material: "Polyester", process: "Sublimation" },
      { gsm: "—", material: "平纹布", process: "Sublimation" },
    ],
    moq: 50,
    description: "Sports square towel, 2 fabric options.",
  },
  {
    id: "2KBBMB01",
    slug: "baby-short-sleeve-onesie-usa-190gsm",
    name: "Baby Short-Sleeve Onesie Printed in USA 190GSM Front (DTF)",
    category: "Baby Bodysuit",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "180GSM", material: "棉", process: "All-Over Digital Print on Cotton" },
      { gsm: "210GSM", material: "Polyester", process: "Sublimation" },
    ],
    moq: 50,
    description: "Baby short-sleeve onesie, 190gsm front DTF, 2 fabric options.",
  },
  {
    id: "3KCSSY02",
    slug: "all-over-print-kids-baseball-jersey",
    name: "All-Over Print Kids Baseball Jersey",
    category: "Kids Sportswear",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "平纹布", process: "Sublimation" },
    ],
    moq: 50,
    description: "Kids baseball jersey, 1 fabric option.",
  },
  {
    id: "3MHZDM41",
    slug: "all-over-print-mens-half-zip-pullover",
    name: "All-Over Print Mens Half-Zip Pullover",
    category: "Winter Wear",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Interlock布", process: "Sublimation" },
      { gsm: "—", material: "平纹布", process: "Sublimation" },
    ],
    moq: 50,
    description: "Mens half-zip pullover, 2 fabric options.",
  },
  {
    id: "3MPHTU08",
    slug: "all-over-print-mens-long-sleeve-t-shirt-dropped-shoulders",
    name: "All-Over Print Mens Long-Sleeve T-Shirt With Dropped Shoulders Interlock",
    category: "Activewear",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Interlock布", process: "Sublimation" },
    ],
    moq: 50,
    description: "Mens long-sleeve T-shirt with dropped shoulders, interlock, 1 fabric option.",
  },
  {
    id: "2HKAWQ05",
    slug: "all-over-print-apron",
    name: "All-Over Print Apron",
    category: "Apron",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "—", process: "Sublimation" },
    ],
    moq: 50,
    description: "All-over print apron, 1 fabric option.",
  },
  {
    id: "2AAOYF03",
    slug: "all-over-print-bucket-hat",
    name: "All-Over Print Bucket Hat",
    category: "Bucket Hat",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "—", process: "Sublimation" },
    ],
    moq: 50,
    description: "All-over print bucket hat, 1 fabric option.",
  },
  {
    id: "2AMSMG90",
    slug: "all-over-print-baseball-cap",
    name: "All-Over Print Baseball Cap",
    category: "Baseball Cap",
    sports: ALL_SPORTS,
    scenarios: ALL_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Sandwich 6 Panels", process: "Sublimation" },
      { gsm: "—", material: "牛仔", process: "Sublimation" },
      { gsm: "—", material: "网眼布", process: "Sublimation" },
    ],
    moq: 50,
    description: "All-over print baseball cap, 3 fabric options.",
  },

  // ---------- 24–64: Sport-specific jerseys ----------
  {
    id: "3MPXDK57",
    slug: "all-over-print-soccer-jersey-kit",
    name: "All-Over Print Soccer Jersey Kit (Shirt + Shorts)",
    category: "Jersey / Kit",
    sports: ["Soccer"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "210GSM", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "180GSM", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "Interlock布", process: "Sublimation", gsmOptions: "160180200220 g" },
      { gsm: "—", material: "平纹布", process: "Sublimation", gsmOptions: "120140160180200 g" },
      { gsm: "—", material: "网眼布", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "Soccer jersey + shorts, full sublimation, 5 fabric options.",
  },
  {
    id: "3MBXVL01",
    slug: "all-over-print-basketball-jersey-kit",
    name: "All-Over Print Basketball Jersey Kit (Reversible option)",
    category: "Jersey / Kit",
    sports: ["Basketball"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "210GSM", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "网眼布", process: "Sublimation", gsmOptions: "100120140160180200 g" },
      { gsm: "—", material: "平纹布", process: "Sublimation", gsmOptions: "120140160180200 g" },
    ],
    moq: 50,
    description: "Basketball jersey, reversible option, 3 fabric options.",
  },
  {
    id: "3MBXGT28",
    slug: "all-over-print-badminton-outfit",
    name: "All-Over Print Badminton Outfit",
    category: "Sports Top / Kit",
    sports: ["Badminton"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "网眼布", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "Badminton outfit, 2 fabric options.",
  },
  {
    id: "3MTXLB56",
    slug: "all-over-print-hockey-jersey",
    name: "All-Over Print Hockey Jersey (Lycra option)",
    category: "Jersey / Kit",
    sports: ["Hockey"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Hockey jersey with Lycra option, 2 fabric options.",
  },
  {
    id: "3MBXGT27",
    slug: "all-over-print-running-wear-kit",
    name: "All-Over Print Running Wear (Shirt + Shorts)",
    category: "Sports Top / Kit",
    sports: ["Running", "Athletics"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "网眼布", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "Running wear kit (shirt + shorts), 2 fabric options.",
  },
  {
    id: "3MTXUB79",
    slug: "all-over-print-cycling-wear-kit",
    name: "All-Over Print Cycling Wear Kit (Jersey + Bib Shorts)",
    category: "Sports Top / Kit",
    sports: ["Cycling"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Cycling wear kit (jersey + bib shorts), 2 fabric options.",
  },
  {
    id: "3CPXX001",
    slug: "all-over-print-yoga-wear-set",
    name: "All-Over Print Yoga Wear Set (Top + Leggings)",
    category: "Sports Top / Kit",
    sports: ["Yoga", "Pilates"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "Interlock布", process: "Sublimation", gsmOptions: "160180200220 g" },
    ],
    moq: 50,
    description: "Yoga wear set (top + leggings), 2 fabric options.",
  },
  {
    id: "3KYYOP05",
    slug: "all-over-print-swimwear-one-piece",
    name: "All-Over Print Swimwear (One-Piece / Bikini / Trunks)",
    category: "Swimwear",
    sports: ["Swimwear", "Surf", "Beach", "Dive"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Swimwear — one-piece, bikini, or trunks, Lycra sublimation.",
  },
  {
    id: "3KCSFH01",
    slug: "all-over-print-golf-polo-shirt",
    name: "All-Over Print Golf Polo Shirt",
    category: "Polo Shirt",
    sports: ["Golf"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "Pique布", process: "Sublimation", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Golf polo shirt, 2 fabric options.",
  },
  {
    id: "3MBSBL01",
    slug: "all-over-print-baseball-jersey-kit",
    name: "All-Over Print Baseball Jersey Kit (Shirt + Pants)",
    category: "Jersey / Kit",
    sports: ["Baseball", "Softball"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "平纹布", process: "Sublimation", gsmOptions: "120140160180200 g" },
    ],
    moq: 50,
    description: "Baseball jersey kit (shirt + pants), 2 fabric options.",
  },
  {
    id: "3MFBJK01",
    slug: "all-over-print-american-football-jersey",
    name: "All-Over Print American Football Jersey",
    category: "Jersey / Kit",
    sports: ["Football"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "American football jersey, 2 fabric options.",
  },
  {
    id: "3MRGJK01",
    slug: "all-over-print-rugby-jersey",
    name: "All-Over Print Rugby Jersey",
    category: "Jersey / Kit",
    sports: ["Rugby"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Rugby jersey, 2 fabric options.",
  },
  {
    id: "3MVBJK01",
    slug: "all-over-print-volleyball-jersey-kit",
    name: "All-Over Print Volleyball Jersey Kit",
    category: "Jersey / Kit",
    sports: ["Volleyball"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "网眼布", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "Volleyball jersey kit, 2 fabric options.",
  },
  {
    id: "3MTNJK01",
    slug: "all-over-print-tennis-outfit",
    name: "All-Over Print Tennis Outfit (Shirt + Skirt/Shorts)",
    category: "Sports Top / Kit",
    sports: ["Tennis"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Tennis outfit (shirt + skirt/shorts), 2 fabric options.",
  },
  {
    id: "3MTTJK01",
    slug: "all-over-print-table-tennis-outfit",
    name: "All-Over Print Table Tennis Outfit",
    category: "Sports Top / Kit",
    sports: ["Table Tennis"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Table tennis outfit, 1 fabric option.",
  },
  {
    id: "3MCKJK01",
    slug: "all-over-print-cricket-jersey",
    name: "All-Over Print Cricket Jersey",
    category: "Jersey / Kit",
    sports: ["Cricket"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "平纹布", process: "Sublimation", gsmOptions: "120140160180200 g" },
    ],
    moq: 50,
    description: "Cricket jersey, 2 fabric options.",
  },
  {
    id: "3MLC001",
    slug: "all-over-print-lacrosse-jersey",
    name: "All-Over Print Lacrosse Jersey",
    category: "Jersey / Kit",
    sports: ["Lacrosse"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Lacrosse jersey, 1 fabric option.",
  },
  {
    id: "3MSB001",
    slug: "all-over-print-softball-jersey",
    name: "All-Over Print Softball Jersey",
    category: "Jersey / Kit",
    sports: ["Softball"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Softball jersey, 1 fabric option.",
  },
  {
    id: "3MSF001",
    slug: "all-over-print-surf-lycra-top",
    name: "All-Over Print Surf Lycra Top (Rash Guard)",
    category: "Sports Top / Kit",
    sports: ["Surf", "Swimwear", "Beach"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Surf Lycra top / rash guard, 1 fabric option.",
  },
  {
    id: "3MSK001",
    slug: "all-over-print-ski-jacket",
    name: "All-Over Print Ski Jacket (Insulated)",
    category: "Jacket",
    sports: ["Ski", "Snowboard"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "涤纶", process: "Sublimation", gsmOptions: "100120140160180200 g" },
      { gsm: "—", material: "抓绒/帆布", process: "Sublimation", gsmOptions: "300 g" },
    ],
    moq: 50,
    description: "Ski jacket insulated, 2 fabric options.",
  },
  {
    id: "3MSB002",
    slug: "all-over-print-snowboard-jacket",
    name: "All-Over Print Snowboard Jacket",
    category: "Jacket",
    sports: ["Snowboard", "Ski"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "涤纶", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "Snowboard jacket, 1 fabric option.",
  },
  {
    id: "3MKT001",
    slug: "all-over-print-skate-t-shirt",
    name: "All-Over Print Skate T-Shirt",
    category: "T-Shirt",
    sports: ["Skate", "Skating"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "Interlock布", process: "Sublimation", gsmOptions: "160180200220 g" },
    ],
    moq: 50,
    description: "Skate T-shirt, 2 fabric options.",
  },
  {
    id: "3MBX001",
    slug: "all-over-print-boxing-shorts",
    name: "All-Over Print Boxing Shorts",
    category: "Combat Gear",
    sports: ["Boxing", "MMA", "Martial Arts"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "涤纶", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "Boxing shorts, 2 fabric options.",
  },
  {
    id: "3MWR001",
    slug: "all-over-print-wrestling-singlet",
    name: "All-Over Print Wrestling Singlet",
    category: "Combat Gear",
    sports: ["Wrestling", "MMA"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Wrestling singlet, 1 fabric option.",
  },
  {
    id: "3MMA001",
    slug: "all-over-print-mma-fight-shorts",
    name: "All-Over Print MMA Fight Shorts",
    category: "Combat Gear",
    sports: ["MMA", "Boxing", "Martial Arts"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "MMA fight shorts, 1 fabric option.",
  },
  {
    id: "3MMA002",
    slug: "all-over-print-martial-arts-gi",
    name: "All-Over Print Martial Arts Gi (Top + Pants)",
    category: "Combat Gear",
    sports: ["Martial Arts"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Martial arts gi (top + pants), 1 fabric option.",
  },
  {
    id: "3MPL001",
    slug: "all-over-print-pilates-top-leggings",
    name: "All-Over Print Pilates Set (Top + Leggings)",
    category: "Sports Top / Kit",
    sports: ["Pilates", "Yoga"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Pilates set (top + leggings), 1 fabric option.",
  },
  {
    id: "3MDC001",
    slug: "all-over-print-dance-leotard",
    name: "All-Over Print Dance Leotard",
    category: "Sports Top / Kit",
    sports: ["Dance", "Cheer", "Gym"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Dance leotard, 1 fabric option.",
  },
  {
    id: "3MCR001",
    slug: "all-over-print-cheer-uniform",
    name: "All-Over Print Cheer Uniform (Top + Skirt)",
    category: "Sports Top / Kit",
    sports: ["Cheer", "Dance"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Cheer uniform (top + skirt), 1 fabric option.",
  },
  {
    id: "3MCF001",
    slug: "all-over-print-crossfit-t-shirt",
    name: "All-Over Print CrossFit T-Shirt",
    category: "T-Shirt",
    sports: ["CrossFit", "Gym", "Athletics"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "Interlock布", process: "Sublimation", gsmOptions: "160180200220 g" },
    ],
    moq: 50,
    description: "CrossFit T-shirt, 2 fabric options.",
  },
  {
    id: "3MBW001",
    slug: "all-over-print-bowling-shirt",
    name: "All-Over Print Bowling Shirt",
    category: "Shirt",
    sports: ["Bowling"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "涤纶", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "Bowling shirt, 1 fabric option.",
  },
  {
    id: "3MES001",
    slug: "all-over-print-esports-jersey",
    name: "All-Over Print Esports Jersey",
    category: "Jersey / Kit",
    sports: ["Esports"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "网眼布", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "Esports jersey, 2 fabric options.",
  },
  {
    id: "3MTR001",
    slug: "all-over-print-triathlon-suit",
    name: "All-Over Print Triathlon Suit (One-Piece)",
    category: "Sports Top / Kit",
    sports: ["Triathlon", "Cycling", "Running"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Triathlon suit one-piece, 1 fabric option.",
  },
  {
    id: "3MAF001",
    slug: "all-over-print-australian-rules-jersey",
    name: "All-Over Print Australian Rules (AFL) Jersey",
    category: "Jersey / Kit",
    sports: ["AFL"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "AFL jersey, 1 fabric option.",
  },
  {
    id: "3MNB001",
    slug: "all-over-print-netball-dress",
    name: "All-Over Print Netball Dress (Bib Style)",
    category: "Sports Top / Kit",
    sports: ["Netball"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Netball dress bib style, 1 fabric option.",
  },
  {
    id: "3MAT001",
    slug: "all-over-print-athletics-singlet",
    name: "All-Over Print Athletics Singlet (Track & Field)",
    category: "Sports Top / Kit",
    sports: ["Athletics", "Running"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "网眼布", process: "Sublimation", gsmOptions: "100120140160180200 g" },
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Athletics singlet, 2 fabric options.",
  },
  {
    id: "3MFS001",
    slug: "all-over-print-fishing-shirt-upf50",
    name: "All-Over Print Fishing Shirt (UPF 50+)",
    category: "Sports Top / Kit",
    sports: ["Fishing"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "涤纶", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "Fishing shirt UPF 50+, 1 fabric option.",
  },
  {
    id: "3MGM001",
    slug: "all-over-print-gym-tank-top",
    name: "All-Over Print Gym Tank Top",
    category: "Tank Top & Camis",
    sports: ["Gym", "CrossFit", "Athletics"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "Interlock布", process: "Sublimation", gsmOptions: "160180200220 g" },
    ],
    moq: 50,
    description: "Gym tank top, 2 fabric options.",
  },
  {
    id: "3MDV001",
    slug: "all-over-print-dive-lycra-suit",
    name: "All-Over Print Dive Lycra Suit",
    category: "Sports Top / Kit",
    sports: ["Dive", "Surf", "Swimwear"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Dive Lycra suit, 1 fabric option.",
  },
  {
    id: "3MSK002",
    slug: "all-over-print-skating-dress",
    name: "All-Over Print Skating Dress (Figure / Roller)",
    category: "Sports Top / Kit",
    sports: ["Skating"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Figure / roller skating dress, 1 fabric option.",
  },
  {
    id: "2HBTSJ19",
    slug: "all-over-print-beach-sports-jersey",
    name: "All-Over Print Beach Sports Jersey (Volleyball / Soccer / Rugby)",
    category: "Jersey / Kit",
    sports: ["Beach", "Volleyball", "Soccer", "Rugby"],
    scenarios: SPORT_SCENARIOS,
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Beach sports jersey — volleyball, soccer, rugby, 2 fabric options.",
  },

  // ---------- 65–99: Industry-specific workwear ----------
  {
    id: "3WEXPL01",
    slug: "all-over-print-express-logistics-polo-shirt",
    name: "All-Over Print Express & Logistics Polo Shirt",
    category: "Polo Shirt",
    sports: [],
    scenarios: ["Uniform & Workwear", "Corporate & Branding", "Construction & Engineering", "Express & Logistics"],
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "Pique布", process: "Sublimation", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Express & logistics polo shirt, 2 fabric options.",
  },
  {
    id: "3WEXPL02",
    slug: "all-over-print-express-logistics-t-shirt",
    name: "All-Over Print Express & Logistics T-Shirt",
    category: "T-Shirt",
    sports: [],
    scenarios: ["Uniform & Workwear", "Express & Logistics", "Corporate & Branding"],
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Express & logistics T-shirt, 2 fabric options.",
  },
  {
    id: "3WEXPL03",
    slug: "all-over-print-express-logistics-hoodie",
    name: "All-Over Print Express & Logistics Hoodie",
    category: "Hoodie",
    sports: [],
    scenarios: ["Uniform & Workwear", "Express & Logistics", "Corporate & Branding"],
    fabrics: [
      { gsm: "—", material: "抓绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Express & logistics hoodie, 2 fabric options.",
  },
  {
    id: "3WCON01",
    slug: "all-over-print-construction-hoodie",
    name: "All-Over Print Construction Hoodie (Hi-Vis Option)",
    category: "Hoodie",
    sports: [],
    scenarios: ["Construction & Engineering", "Uniform & Workwear", "Construction & Engineering"],
    fabrics: [
      { gsm: "—", material: "抓绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Construction hoodie with hi-vis option, 2 fabric options.",
  },
  {
    id: "3WCON02",
    slug: "all-over-print-construction-jacket",
    name: "All-Over Print Construction Jacket (Insulated)",
    category: "Jacket",
    sports: [],
    scenarios: ["Construction & Engineering", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "涤纶", process: "Sublimation", gsmOptions: "100120140160180200 g" },
      { gsm: "—", material: "抓绒/帆布", process: "Sublimation", gsmOptions: "300 g" },
    ],
    moq: 50,
    description: "Construction jacket insulated, 2 fabric options.",
  },
  {
    id: "3WCON03",
    slug: "all-over-print-construction-pants",
    name: "All-Over Print Construction Pants (Cargo)",
    category: "Pants",
    sports: [],
    scenarios: ["Construction & Engineering", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "棉/斜纹", process: "All-Over Digital Print on Cotton", gsmOptions: "120140160180200220240260280300 g" },
    ],
    moq: 50,
    description: "Construction cargo pants, 1 fabric option.",
  },
  {
    id: "3WCON04",
    slug: "all-over-print-construction-t-shirt",
    name: "All-Over Print Construction T-Shirt (Hi-Vis Option)",
    category: "T-Shirt",
    sports: [],
    scenarios: ["Construction & Engineering", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Construction T-shirt hi-vis option, 2 fabric options.",
  },
  {
    id: "3WHOS01",
    slug: "all-over-print-hospitality-polo-shirt",
    name: "All-Over Print Hospitality & F&B Polo Shirt",
    category: "Polo Shirt",
    sports: [],
    scenarios: ["Hospitality & F&B", "Uniform & Workwear", "Corporate & Branding"],
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "Pique布", process: "Sublimation", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Hospitality & F&B polo shirt, 2 fabric options.",
  },
  {
    id: "3WHOS02",
    slug: "all-over-print-hospitality-t-shirt",
    name: "All-Over Print Hospitality & F&B T-Shirt",
    category: "T-Shirt",
    sports: [],
    scenarios: ["Hospitality & F&B", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Hospitality & F&B T-shirt, 1 fabric option.",
  },
  {
    id: "3WHOS03",
    slug: "all-over-print-hospitality-sweatshirt",
    name: "All-Over Print Hospitality & F&B Sweatshirt",
    category: "Sweatshirt",
    sports: [],
    scenarios: ["Hospitality & F&B", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "抓绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Hospitality & F&B sweatshirt, 1 fabric option.",
  },
  {
    id: "3WMED01",
    slug: "all-over-print-medical-scrubs-t-shirt",
    name: "All-Over Print Medical & Healthcare Scrubs T-Shirt",
    category: "T-Shirt",
    sports: [],
    scenarios: ["Medical & Healthcare", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Medical & healthcare scrubs T-shirt, 2 fabric options.",
  },
  {
    id: "3WMED02",
    slug: "all-over-print-medical-polo-shirt",
    name: "All-Over Print Medical & Healthcare Polo Shirt",
    category: "Polo Shirt",
    sports: [],
    scenarios: ["Medical & Healthcare", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Medical & healthcare polo shirt, 1 fabric option.",
  },
  {
    id: "3WMED03",
    slug: "all-over-print-medical-tank-top",
    name: "All-Over Print Medical & Healthcare Tank Top",
    category: "Tank Top & Camis",
    sports: [],
    scenarios: ["Medical & Healthcare", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Medical & healthcare tank top, 1 fabric option.",
  },
  {
    id: "3WSEC01",
    slug: "all-over-print-security-polo-shirt",
    name: "All-Over Print Security & Property Polo Shirt",
    category: "Polo Shirt",
    sports: [],
    scenarios: ["Security & Property", "Uniform & Workwear", "Construction & Engineering"],
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "Pique布", process: "Sublimation", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Security & property polo shirt, 2 fabric options.",
  },
  {
    id: "3WSEC02",
    slug: "all-over-print-security-hoodie",
    name: "All-Over Print Security & Property Hoodie",
    category: "Hoodie",
    sports: [],
    scenarios: ["Security & Property", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "抓绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Security & property hoodie, 1 fabric option.",
  },
  {
    id: "3WSEC03",
    slug: "all-over-print-security-jacket",
    name: "All-Over Print Security & Property Jacket",
    category: "Jacket",
    sports: [],
    scenarios: ["Security & Property", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "涤纶", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "Security & property jacket, 1 fabric option.",
  },
  {
    id: "3WRTL01",
    slug: "all-over-print-retail-polo-shirt",
    name: "All-Over Print Retail & Supermarket Polo Shirt",
    category: "Polo Shirt",
    sports: [],
    scenarios: ["Retail & Supermarket", "Uniform & Workwear", "Retail & Fashion"],
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Retail & supermarket polo shirt, 1 fabric option.",
  },
  {
    id: "3WRTL02",
    slug: "all-over-print-retail-t-shirt",
    name: "All-Over Print Retail & Supermarket T-Shirt",
    category: "T-Shirt",
    sports: [],
    scenarios: ["Retail & Supermarket", "Uniform & Workwear", "Retail & Fashion"],
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Retail & supermarket T-shirt, 1 fabric option.",
  },
  {
    id: "3WRTL03",
    slug: "all-over-print-retail-hoodie",
    name: "All-Over Print Retail & Supermarket Hoodie",
    category: "Hoodie",
    sports: [],
    scenarios: ["Retail & Supermarket", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "抓绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Retail & supermarket hoodie, 1 fabric option.",
  },
  {
    id: "3WEDU01",
    slug: "all-over-print-school-t-shirt",
    name: "All-Over Print School & Education T-Shirt",
    category: "T-Shirt",
    sports: [],
    scenarios: ["Education & School", "School & Education", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "School & education T-shirt, 2 fabric options.",
  },
  {
    id: "3WEDU02",
    slug: "all-over-print-school-polo-shirt",
    name: "All-Over Print School & Education Polo Shirt",
    category: "Polo Shirt",
    sports: [],
    scenarios: ["Education & School", "School & Education", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "Pique布", process: "Sublimation", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "School & education polo shirt, 2 fabric options.",
  },
  {
    id: "3WEDU03",
    slug: "all-over-print-school-jacket",
    name: "All-Over Print School & Education Jacket",
    category: "Jacket",
    sports: [],
    scenarios: ["Education & School", "School & Education", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "涤纶", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "School & education jacket, 1 fabric option.",
  },
  {
    id: "3WCOR01",
    slug: "all-over-print-corporate-promo-polo-shirt",
    name: "All-Over Print Corporate & Promo Polo Shirt",
    category: "Polo Shirt",
    sports: [],
    scenarios: ["Corporate & Promo", "Corporate & Branding", "Uniform & Workwear", "Promotional Swag"],
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
      { gsm: "—", material: "Pique布", process: "Sublimation", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Corporate & promo polo shirt, 2 fabric options.",
  },
  {
    id: "3WCOR02",
    slug: "all-over-print-corporate-promo-t-shirt",
    name: "All-Over Print Corporate & Promo T-Shirt",
    category: "T-Shirt",
    sports: [],
    scenarios: ["Corporate & Promo", "Corporate & Branding", "Promotional Swag"],
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Corporate & promo T-shirt, 2 fabric options.",
  },
  {
    id: "3WCOR03",
    slug: "all-over-print-corporate-promo-hoodie",
    name: "All-Over Print Corporate & Promo Hoodie",
    category: "Hoodie",
    sports: [],
    scenarios: ["Corporate & Promo", "Corporate & Branding", "Promotional Swag"],
    fabrics: [
      { gsm: "—", material: "抓绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Corporate & promo hoodie, 2 fabric options.",
  },
  {
    id: "3WTRN01",
    slug: "all-over-print-transit-polo-shirt",
    name: "All-Over Print Transit & Transport Polo Shirt",
    category: "Polo Shirt",
    sports: [],
    scenarios: ["Transit & Transport", "Uniform & Workwear", "Express & Logistics"],
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Transit & transport polo shirt, 1 fabric option.",
  },
  {
    id: "3WTRN02",
    slug: "all-over-print-transit-jacket",
    name: "All-Over Print Transit & Transport Jacket",
    category: "Jacket",
    sports: [],
    scenarios: ["Transit & Transport", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "涤纶", process: "Sublimation", gsmOptions: "100120140160180200 g" },
    ],
    moq: 50,
    description: "Transit & transport jacket, 1 fabric option.",
  },
  {
    id: "3WTRN03",
    slug: "all-over-print-transit-hoodie",
    name: "All-Over Print Transit & Transport Hoodie",
    category: "Hoodie",
    sports: [],
    scenarios: ["Transit & Transport", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "抓绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Transit & transport hoodie, 1 fabric option.",
  },
  {
    id: "3WSTU01",
    slug: "all-over-print-studio-gym-tank-top",
    name: "All-Over Print Studio & Gym Tank Top",
    category: "Tank Top & Camis",
    sports: [],
    scenarios: ["Studio & Gym", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "Interlock布", process: "Sublimation", gsmOptions: "160180200220 g" },
    ],
    moq: 50,
    description: "Studio & gym tank top, 2 fabric options.",
  },
  {
    id: "3WSTU02",
    slug: "all-over-print-studio-gym-t-shirt",
    name: "All-Over Print Studio & Gym T-Shirt",
    category: "T-Shirt",
    sports: [],
    scenarios: ["Studio & Gym", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Studio & gym T-shirt, 1 fabric option.",
  },
  {
    id: "3WSTU03",
    slug: "all-over-print-studio-gym-leggings",
    name: "All-Over Print Studio & Gym Leggings",
    category: "Leggings",
    sports: [],
    scenarios: ["Studio & Gym", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "Lycra", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
    ],
    moq: 50,
    description: "Studio & gym leggings, 1 fabric option.",
  },
  {
    id: "3WFES01",
    slug: "all-over-print-festival-t-shirt",
    name: "All-Over Print Festival & Holiday T-Shirt",
    category: "T-Shirt",
    sports: [],
    scenarios: ["Festival & Holiday", "Event & Festival", "Music & Merch", "Promotional Swag"],
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Festival & holiday T-shirt, 2 fabric options.",
  },
  {
    id: "3WFES02",
    slug: "all-over-print-festival-hoodie",
    name: "All-Over Print Festival & Holiday Hoodie",
    category: "Hoodie",
    sports: [],
    scenarios: ["Festival & Holiday", "Event & Festival", "Music & Merch"],
    fabrics: [
      { gsm: "—", material: "抓绒", process: "Sublimation", gsmOptions: "180200220240260280300 g" },
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
    ],
    moq: 50,
    description: "Festival & holiday hoodie, 2 fabric options.",
  },
  {
    id: "3WMIL01",
    slug: "all-over-print-military-training-t-shirt",
    name: "All-Over Print Military Wear Training T-Shirt",
    category: "T-Shirt",
    sports: [],
    scenarios: ["Military", "Uniform & Workwear", "Construction & Engineering"],
    fabrics: [
      { gsm: "—", material: "棉", process: "All-Over Digital Print on Cotton", gsmOptions: "160180200220240 g" },
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Military training T-shirt, 2 fabric options.",
  },
  {
    id: "3WMIL02",
    slug: "all-over-print-military-casual-polo",
    name: "All-Over Print Military Wear Casual Polo",
    category: "Polo Shirt",
    sports: [],
    scenarios: ["Military", "Uniform & Workwear"],
    fabrics: [
      { gsm: "—", material: "鸟眼布", process: "Sublimation", gsmOptions: "120140160180200220240 g" },
    ],
    moq: 50,
    description: "Military casual polo, 1 fabric option.",
  },
  {
    id: "3WBEACH01",
    slug: "all-over-print-beach-sarong",
    name: "All-Over Print Beach Sarong (180×110cm)",
    category: "Beachwear",
    sports: ["Beach", "Swimwear", "Surf"],
    scenarios: ["Event & Festival", "Retail & Fashion", "Promotional Swag"],
    fabrics: [
      { gsm: "—", material: "涤纶", process: "Sublimation", gsmOptions: "100120140160180200 g" },
      { gsm: "—", material: "雪纺", process: "Sublimation", gsmOptions: "80100120140160180200 g" },
    ],
    moq: 50,
    description: "Beach sarong 180×110cm, 2 fabric options, ideal for resort & event merch.",
  },
];

// ============================================================
// INDEX LOOKUPS
// ============================================================

export const productCategories: ProductCategory[] = Array.from(
  new Set(products.map((p) => p.category))
) as ProductCategory[];

export const allSports: Sport[] = Array.from(
  new Set(products.flatMap((p) => p.sports))
) as Sport[];

export const allScenarios: Scenario[] = Array.from(
  new Set(products.flatMap((p) => p.scenarios))
) as Scenario[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id)
    .map((p) => {
      const sportOverlap = p.sports.filter((s) => product.sports.includes(s)).length;
      const scenarioOverlap = p.scenarios.filter((s) => product.scenarios.includes(s)).length;
      const sameCategory = p.category === product.category ? 3 : 0;
      return { p, score: sportOverlap * 2 + scenarioOverlap + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.p);
}

