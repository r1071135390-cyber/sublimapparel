// Case study data structure.
// Industries here mirror the 12 cards in the homepage Industries section.
// To add real case studies later, populate `cases` for the relevant industry.
// Each case can include multiple images + a short description.

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
    cases: [],
  },
  {
    slug: "music-tour-festival",
    title: "Music, Tour & Festival Merch",
    icon: "Music2",
    blurb:
      "All-over-print tees and hoodies, bandanas, tote bags, stage backdrops. Full-bleed printing on 100% cotton — merch fans actually want to wear.",
    pitch:
      "Full-bleed printing on 100% cotton — merch your fans will actually want to wear.",
    cases: [],
  },
  {
    slug: "trade-show-display",
    title: "Trade Show & Display",
    icon: "Presentation",
    blurb:
      "SEG tension fabric, backdrop walls, table throws, counter covers and tent walls. Silicone edge is a sewing operation — we sew, so we can make it.",
    pitch:
      "Silicone edge is a sewing operation. We sew, so we can make it — and DDP handles the bulky freight.",
    cases: [],
  },
  {
    slug: "corporate-programs",
    title: "Corporate & Employee Programs",
    icon: "Briefcase",
    blurb:
      "Uniforms, golf / bowling shirts, onboarding kits, conference apparel and branded gifting. Multi-site restocks pull from our Fontana warehouse, on a fixed landed cost.",
    pitch:
      "Finance gets a fixed landed cost; multi-site restocks pull from our LA warehouse.",
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
    cases: [],
  },
  {
    slug: "ecommerce-fulfillment",
    title: "E-commerce & Fulfillment",
    icon: "ShoppingBag",
    blurb:
      "Blankets, pillow covers, towels, tapestries, pet goods, aprons and tote bags. DDP removes the import problem; LA warehouse covers domestic replenishment.",
    pitch:
      "DDP removes the import problem; LA warehouse covers domestic replenishment.",
    cases: [],
  },
];

export function getIndustryBySlug(slug: string): IndustryCase | undefined {
  return industries.find((i) => i.slug === slug);
}
