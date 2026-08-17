// Case study data structure.
// Industries here mirror the 12 cards in the homepage Industries section.
// To add real case studies later, populate `cases` for the relevant industry.
// Each case can include multiple images + a short description.

import type { ProductCategory, Scenario, Sport } from "./products-data";

export type CaseStudy = {
  id: string;
  title: string;
  client?: string;
  year?: string;
  summary: string;
  products: string[];
  images: string[]; // paths under /public, e.g. "/cases/sports-teams/jersey-01.jpg"
};

export type IndustryCase = {
  slug: string;
  title: string;
  icon: string; // lucide icon name (matched in components)
  blurb: string; // short paragraph shown on the slug page hero
  pitch: string; // the orange-highlighted value prop
  /** Primary tag this industry maps to — drives the related-products block on the slug page. */
  relatedScenario: Scenario;
  /** Secondary category tag (optional) — narrows the product list further. */
  relatedCategory?: ProductCategory;
  /** Optional sport tag — narrows the product list further. */
  relatedSport?: Sport;
  cases: CaseStudy[];
};

// 12 industries — slug must stay in sync with src/components/industries.tsx
export const industries: IndustryCase[] = [
  {
    slug: "events-conferences",
    title: "Events & Conferences",
    icon: "CalendarDays",
    blurb:
      "Staff tees, volunteer uniforms, lanyards, table throws, step-and-repeat backdrops and feather flags — produced in Yiwu and delivered to your venue, duty paid.",
    pitch:
      "Your date does not move. Our Fontana warehouse stock absorbs the headcount that changes in the final fortnight.",
    relatedScenario: "Event & Festival",
    cases: [],
  },
  {
    slug: "promotional-products",
    title: "Promotional Products Distributors",
    icon: "Megaphone",
    blurb:
      "Apparel, bags, towels, blankets, flags, table covers and lanyards for the promo industry. Landed duty-paid pricing and blind drop-ship available.",
    pitch:
      "Landed duty-paid pricing protects your margin; blind drop-ship from LA protects your client relationship.",
    relatedScenario: "Promotional Swag",
    relatedCategory: "T-Shirt",
    cases: [],
  },
  {
    slug: "sports-teams",
    title: "Sports Teams & Leagues",
    icon: "Trophy",
    blurb:
      "Sublimated racing and cycling jerseys, shorts, warm-ups, singlets, socks and sideline banners. Cut-and-sew patterns sized to your roster, named and numbered per unit.",
    pitch:
      "Cut-and-sew patterns that fit, named and numbered per unit, delivered before the season opens.",
    relatedScenario: "Sports League",
    relatedCategory: "Sportswear",
    cases: [
      {
        id: "nova-racing-academy-2025",
        title: "Nova Racing Academy — 24 riders, 3 kits, custom cut-and-sew",
        client: "Nova Racing Academy (Junior Cycling)",
        year: "2025",
        summary:
          "24 junior riders, 3 kits (training, race, podium), custom cut-and-sew patterns sized per individual body measurement, full sublimation on 220gsm polyester mesh. Numbered 1-24, named per unit. Delivered 28 days after pattern lock. Coach kit + spare jersey sets included.",
        products: ["Custom Cycling Jersey", "Custom Cycling Shorts", "Custom Tracksuit"],
        images: [],
      },
    ],
  },
  {
    slug: "music-tour-festival",
    title: "Music, Tour & Festival Merch",
    icon: "Music2",
    blurb:
      "All-over-print tees and hoodies, bandanas, tote bags, stage backdrops. Full-bleed printing on 100% cotton — merch fans actually want to wear.",
    pitch:
      "Full-bleed printing on 100% cotton — merch your fans will actually want to wear.",
    relatedScenario: "Music & Merch",
    relatedCategory: "T-Shirt",
    cases: [
      {
        id: "harbor-sound-festival-2025",
        title: "Harbor Sound Festival 2025 — 14,000 tees, 3 designs, 21-day rush",
        client: "Harbor Sound Festival Production Team",
        year: "2025",
        summary:
          "Three festival designs (Main Stage, Acoustic Stage, After-Hours) printed on heavyweight all-cotton tees. 14,000 pieces total split across three SKUs. 21-day production from artwork lock to venue delivery, DDP air to Miami, FL. Two mid-production photo checks against the locked mockup.",
        products: ["All-Over Print Cotton T-Shirt", "Custom Sublimation Hoodie", "Custom Tote Bag"],
        images: [],
      },
    ],
  },
  {
    slug: "trade-show-display",
    title: "Trade Show & Display",
    icon: "Presentation",
    blurb:
      "SEG tension fabric, backdrop walls, table throws, counter covers and tent walls. Silicone edge is a sewing operation — we sew, so we can make it.",
    pitch:
      "Silicone edge is a sewing operation. We sew, so we can make it — and DDP handles the bulky freight.",
    relatedScenario: "Event & Festival",
    cases: [],
  },
  {
    slug: "corporate-programs",
    title: "Corporate & Employee Programs",
    icon: "Briefcase",
    blurb:
      "Uniforms, golf, bowling, esports shirts, onboarding kits, conference apparel and branded gifting. Multi-site restocks pull from our Fontana warehouse, on a fixed landed cost.",
    pitch:
      "Finance gets a fixed landed cost; multi-site restocks pull from our LA warehouse.",
    relatedScenario: "Corporate & Branding",
    relatedCategory: "Polo Shirt",
    cases: [],
  },
  {
    slug: "apparel-brands",
    title: "Apparel Brands & Agencies",
    icon: "Shirt",
    blurb:
      "Custom cut-and-sew, all-over-print apparel and private-label packaging. Your pattern, your labels, your packaging — cotton included.",
    pitch:
      "Your pattern, your labels, your packaging. Cotton included.",
    relatedScenario: "Retail & Fashion",
    relatedCategory: "Hoodie",
    cases: [],
  },
  {
    slug: "schools-greek-life",
    title: "Schools, Universities & Greek Life",
    icon: "GraduationCap",
    blurb:
      "Rush shirts, bid day tees, game-day apparel, alumni gear and dorm goods. Campus orders are cotton orders, and they are always urgent.",
    pitch:
      "Campus orders are cotton orders, and they are always urgent. We cover both.",
    relatedScenario: "Education & School",
    relatedCategory: "T-Shirt",
    cases: [],
  },
  {
    slug: "political-campaigns",
    title: "Political Campaigns",
    icon: "Flag",
    blurb:
      "Rally tees, fabric banners, hand-held flags, canvasser vests, hats and rally towels. LA warehouse turns a five-day requirement into a domestic shipment.",
    pitch:
      "Our LA warehouse turns a five-day requirement into a domestic shipment.",
    relatedScenario: "Political Campaign",
    relatedCategory: "T-Shirt",
    cases: [],
  },
  {
    slug: "breweries-hospitality",
    title: "Breweries, Coffee & Hospitality",
    icon: "Coffee",
    blurb:
      "Merch tees and hoodies, aprons, bar towels, patio covers and tap-room banners. Cotton merch, staff wear and soft signage from one supplier.",
    pitch:
      "Cotton merch, staff wear, and soft signage from one supplier — landed duty paid.",
    relatedScenario: "Hospitality & F&B",
    relatedCategory: "T-Shirt",
    cases: [],
  },
  {
    slug: "endurance-race-events",
    title: "Endurance & Race Events",
    icon: "Bike",
    blurb:
      "Finisher tees in cotton and technical, race shirts, cycling kits and route banners. Final numbers land two weeks out — LA stock absorbs the difference.",
    pitch:
      "Final numbers land two weeks out. LA stock absorbs the difference.",
    relatedScenario: "Sports League",
    relatedSport: "Running",
    cases: [
      {
        id: "lakeshore-marathon-2025",
        title: "Lakeshore International Marathon 2025 — 8,200 finisher tees in 12 days",
        client: "Lakeshore Marathon Organizing Committee",
        year: "2025",
        summary:
          "Final registration numbers landed 12 days before the race — 8,200 finishers across three distance categories. Cut-and-sew cotton tees with full-bleed sublimation on the back, three distinct designs (5K / 10K / Marathon), and a 1,500-piece volunteer staff batch on polyester. Lake County, United States.",
        products: ["Custom Sublimation Cotton T-Shirt", "Custom Sublimation Polyester T-Shirt", "Volunteer Staff Tee"],
        images: [],
      },
      {
        id: "alpine-ultra-50k-2024",
        title: "Alpine Ultra 50K — Mountain-graphic finisher tees in all-cotton",
        client: "Alpine Trail Race Series",
        year: "2024",
        summary:
          "1,800 finisher tees printed on heavyweight 220gsm cotton with a full-color mountain panorama on the back. 5 design revisions over 3 weeks; final mockup locked 21 days before race day. Bulk shipped by DDP air to Denver with the route banner drop.",
        products: ["Custom Sublimation Cotton T-Shirt", "Custom Race Banner"],
        images: [],
      },
    ],
  },
  {
    slug: "ecommerce-fulfillment",
    title: "E-commerce & Fulfillment",
    icon: "ShoppingBag",
    blurb:
      "Blankets, pillow covers, towels, tapestries, pet goods, aprons and tote bags. DDP removes the import problem; LA warehouse covers domestic replenishment.",
    pitch:
      "DDP removes the import problem; LA warehouse covers domestic replenishment.",
    relatedScenario: "Retail & Fashion",
    cases: [],
  },
];

export function getIndustryBySlug(slug: string): IndustryCase | undefined {
  return industries.find((i) => i.slug === slug);
}
