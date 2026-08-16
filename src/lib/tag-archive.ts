// ============================================================
// Tag Archive Data — 29 categories + 42 sports + 27 scenarios
// ============================================================
//
// Each tag gets a dedicated archive page at /tag/<dim>/<slug>/
// with its own hero, description, recommended process, and grid of
// matching products from the 100-product catalog.

export type TagDimension = "category" | "sport" | "scenario";

export interface TagInfo {
  label: string;          // display name (e.g. "T-Shirt")
  slug: string;           // URL slug (e.g. "t-shirt")
  dimension: TagDimension;
  description: string;    // 1-2 sentence unique description
  benefits: string[];     // 3-4 bullet points
  process: string;        // recommended print process for this tag
  icon: string;           // emoji icon
}

// ------------------------------------------------------------
// SEO — auto-generated per tag from templates
// Each tag archive page has a unique meta title (≤60 chars),
// meta description (≤160 chars), H1, and 5–8 keyword phrases
// matched to user search intent for that tag dimension.
// ------------------------------------------------------------

export interface TagSEO {
  title: string;
  description: string;
  h1: string;
  keywords: string[];
}

function seoForCategory(label: string): TagSEO {
  const lc = label.toLowerCase();
  return {
    title: `Custom ${label} | Sublimation All-Over Print | MOQ 50`,
    description: `Custom ${label} sublimation & allover digital print on cotton. Edge-to-edge artwork, MOQ 50 pcs per design, 7–10 day sample, DDP shipping to 50+ countries. Get a quote in 1 business day.`,
    h1: `Custom ${label} — All-Over Print Sublimation & Cotton Printing`,
    keywords: [
      `custom ${label} wholesale`,
      `allover print ${label}`,
      `sublimation ${label} factory`,
      `bulk ${label} manufacturer`,
      `${label} with logo`,
      `MOQ 50 ${label} supplier`,
      `private label ${label}`,
      `DDP shipping ${label}`,
    ],
  };
}

function seoForSport(label: string): TagSEO {
  const lc = label.toLowerCase();
  return {
    title: `Custom ${label} Jerseys & Uniforms | All-Over Print`,
    description: `Custom ${label} jerseys, kits, and uniforms. Edge-to-edge all-over sublimation print, breathable polyester or allover digital print on cotton. MOQ 50 pcs, DDP shipping. Free quote in 1 day.`,
    h1: `Custom ${label} Jerseys & Kits — All-Over Print Factory`,
    keywords: [
      `custom ${label} jerseys`,
      `${label} team uniforms wholesale`,
      `sublimated ${label} kit`,
      `allover print ${label} apparel`,
      `bulk ${label} uniform factory`,
      `${label} jersey MOQ 50`,
      `private label ${label} gear`,
    ],
  };
}

function seoForScenario(label: string): TagSEO {
  return {
    title: `Custom ${label} Apparel & Merch | Bulk Wholesale`,
    description: `Custom ${label} apparel, merch, and uniforms. Full-coverage all-over sublimation print, MOQ 50 pcs, 7–10 day sample, DDP shipping. Trusted by 500+ brands across 50+ countries. Get a quote.`,
    h1: `Custom ${label} Apparel & Merch — Bulk All-Over Print`,
    keywords: [
      `custom ${label} apparel`,
      `${label} merch wholesale`,
      `branded ${label} merchandise`,
      `bulk ${label} uniform supplier`,
      `${label} giveaway apparel`,
      `promotional ${label} clothing`,
      `private label ${label} apparel`,
      `DDP shipping ${label} merch`,
    ],
  };
}

export function seoForTag(dim: TagDimension, label: string): TagSEO {
  if (dim === "category") return seoForCategory(label);
  if (dim === "sport") return seoForSport(label);
  return seoForScenario(label);
}

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ------------------------------------------------------------
// 29 Categories
// ------------------------------------------------------------

export const CATEGORY_TAGS: Record<string, Omit<TagInfo, "slug" | "dimension">> = {
  "T-Shirt": {
    label: "T-Shirt",
    description: "Full-coverage sublimated tees — your artwork runs edge to edge, both front and back, on breathable polyester or allover digital print on 100% cotton. Low MOQ 50 pieces per design, ready for event drops and merch runs.",
    benefits: [
      "Edge-to-edge print, no center seams",
      "Polyester 160–200 GSM or cotton 180–220 GSM",
      "MOQ 50 pcs per design, 7–10 day sample",
    ],
    process: "Sublimation (polyester) or All-Over Digital Print on Cotton",
    icon: "👕",
  },
  "Hoodie": {
    label: "Hoodie",
    description: "Heavyweight sublimation hoodies built for streetwear drops, team crests, and cold-weather merch. Cut-and-sewn from panel pieces so the print wraps cleanly across the hood, sleeves, and kangaroo pocket.",
    benefits: [
      "320–400 GSM brushed fleece interior",
      "Full print wraps the hood, sleeves, and pocket",
      "DDP shipping to US/EU/UK/AU door-to-door",
    ],
    process: "Sublimation on Polyester Fleece",
    icon: "🧥",
  },
  "Polo Shirt": {
    label: "Polo Shirt",
    description: "Sublimated polos for corporate uniforms, tournament staff, and pro-shop retail. We print the full body, the under-collar, and both sleeves — logos sit crisp on chest without breaking the pattern.",
    benefits: [
      "Full-body print with clean placket",
      "200–220 GSM bird-eye or piqué",
      "Reorder MOQ 30 pcs per design",
    ],
    process: "Sublimation on Polyester Piqué",
    icon: "👔",
  },
  "Jersey / Kit": {
    label: "Jersey / Kit",
    description: "Pro-grade sublimated jerseys for club, league, and tournament play. We print names, numbers, sponsors, and full-coverage patterns into the polyester mesh before sewing — nothing sits on top of the fabric, so it won't crack or peel.",
    benefits: [
      "Set-in or raglan cut, 140–160 GSM eyelet",
      "Player names + numbers sublimated into the fabric",
      "Fast-turn 14 days for 30–500 pc runs",
    ],
    process: "Sublimation on Polyester Mesh",
    icon: "⚽",
  },
  "Sports Top / Kit": {
    label: "Sports Top / Kit",
    description: "Women's-cut and unisex sports tops for training, league play, and team kits. Full sublimation into lightweight polyester eyelet with flat-lock seams — sits smooth under pads and doesn't snag during play.",
    benefits: [
      "Women's and unisex fit blocks",
      "140–160 GSM moisture-wicking eyelet",
      "Custom name/number sublimated in fabric",
    ],
    process: "Sublimation on Polyester Eyelet",
    icon: "👚",
  },
  "Jacket": {
    label: "Jacket",
    description: "Lightweight sublimated jackets for training warmups, team travel, and event staff. Print covers the body, sleeves, and collar stand; zip pockets and storm flap don't interrupt the pattern.",
    benefits: [
      "Wind-shell or softshell fabric options",
      "Full print across body and sleeves",
      "Custom zipper pulls and stoppers available",
    ],
    process: "Sublimation on Polyester Softshell",
    icon: "🧥",
  },
  "Combat Gear": {
    label: "Combat Gear",
    description: "MMA, boxing, wrestling, and martial arts kits with full-coverage sublimation that survives grappling. Lightweight polyester mesh breathes, prints stay sharp through sparring, rash guards and fight shorts match across the kit.",
    benefits: [
      "Rash guard + fight short + hoodie set",
      "180–200 GSM 4-way stretch",
      "Reinforced flat-lock seams for grappling",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🥊",
  },
  "Shirt": {
    label: "Shirt",
    description: "Sublimated button-downs and casual shirts for promotional merch, hospitality uniforms, and retail collections. Print runs across the front, back, sleeves, and inside the collar band without breaking at seams.",
    benefits: [
      "Casual or camp-collar cuts",
      "100% polyester woven or cotton-blend digital print",
      "Collar, cuffs, and placket all printable",
    ],
    process: "Sublimation (polyester) or All-Over Digital Print on Cotton",
    icon: "👔",
  },
  "Tank Top & Camis": {
    label: "Tank Top & Camis",
    description: "Lightweight sublimated tank tops for gym, yoga, beach, and summer merch. Full print across body and shoulder straps with bound edges that don't chafe.",
    benefits: [
      "140–160 GSM polyester eyelet",
      "Bound neck and armhole edges",
      "MOQ 50 pcs per design",
    ],
    process: "Sublimation on Polyester Eyelet",
    icon: "👙",
  },
  "Pants": {
    label: "Pants",
    description: "Sublimated pants for tracksuits, joggers, snow pants, and workwear. Full-coverage print on the body and legs; waistband, pockets, and cuffs finished cleanly without breaking the pattern.",
    benefits: [
      "Track, jogger, or cargo cut",
      "200–280 GSM polyester or polyester-spandex",
      "Elastic, drawcord, or zip-pocket options",
    ],
    process: "Sublimation on Polyester",
    icon: "👖",
  },
  "Sweatshirt": {
    label: "Sweatshirt",
    description: "Heavyweight sublimated sweatshirts for streetwear, college merch, and team gear. Brushed fleece interior with full-coverage print on the body, sleeves, and crew neck — the print is part of the fabric, not a layer on top.",
    benefits: [
      "320–380 GSM brushed fleece",
      "Crew neck, drop-shoulder, or oversized fit",
      "Full print wraps body and sleeves",
    ],
    process: "Sublimation on Polyester Fleece",
    icon: "🧶",
  },
  "Sleepwear & Underwear": {
    label: "Sleepwear & Underwear",
    description: "Sublimated sleepwear, loungewear, and underwear for direct-to-consumer brands. Soft hand-feel polyester or modal-blend with full print coverage — bright patterns and brand artwork print clearly at small scale.",
    benefits: [
      "Modal-blend or polyester options",
      "Soft hand-feel for skin contact",
      "Small MOQ 50 pcs per design",
    ],
    process: "Sublimation on Polyester / Modal",
    icon: "🩱",
  },
  "Dress": {
    label: "Dress",
    description: "Full-print dresses for resort wear, festival merch, and boutique collections. Cut-and-sewn from panel pieces so the print flows across the body, waist, and hem without seams breaking the pattern.",
    benefits: [
      "A-line, bodycon, or wrap cuts",
      "180–220 GSM polyester or silk-feel",
      "Full print from neckline to hem",
    ],
    process: "Sublimation on Polyester",
    icon: "👗",
  },
  "Coord Set": {
    label: "Coord Set",
    description: "Matching top-and-bottom sets printed from a single artwork so the pattern aligns across the seam. Built for streetwear drops, loungewear collections, and resort merch.",
    benefits: [
      "Top + bottom printed as one kit",
      "200–280 GSM fleece or interlock",
      "Pattern alignment across waist seam",
    ],
    process: "Sublimation on Polyester",
    icon: "🧵",
  },
  "Knitwear": {
    label: "Knitwear",
    description: "Sublimated knit sweaters and pullovers for cold-weather merch, ski resort uniforms, and brand collections. Yarn-dyed look from sublimation on polyester knit — soft hand-feel without losing print detail.",
    benefits: [
      "Cable, rib, or jersey knit texture",
      "280–350 GSM yarn-dyed look",
      "Full print across body and sleeves",
    ],
    process: "Sublimation on Polyester Knit",
    icon: "🧶",
  },
  "Romper & Jumpsuit": {
    label: "Romper & Jumpsuit",
    description: "Full-print rompers and jumpsuits for boutique, festival, and kidswear brands. One-piece construction with the print running across the bodice, waist, and leg.",
    benefits: [
      "Adult and kids sizing",
      "180–220 GSM polyester or rayon-feel",
      "Full print from neckline to hem",
    ],
    process: "Sublimation on Polyester",
    icon: "🩱",
  },
  "Skirt": {
    label: "Skirt",
    description: "Sublimated skirts for team uniforms, dance, retail, and resort wear. Full print across the body and waistband; pleats and panels don't break the pattern.",
    benefits: [
      "Pleated, A-line, or bodycon cuts",
      "180–220 GSM polyester",
      "Full print across body and waistband",
    ],
    process: "Sublimation on Polyester",
    icon: "👗",
  },
  "Bodysuit": {
    label: "Bodysuit",
    description: "Sublimated bodysuits for dance, gymnastics, fitness, and streetwear. Full print across the body with snap closure at the gusset — pattern flows cleanly across torso and legs.",
    benefits: [
      "Long-sleeve, sleeveless, or racer cuts",
      "200–240 GSM polyester-spandex",
      "Snap gusset or zip-back closure",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🩱",
  },
  "Sports Top": {
    label: "Sports Top",
    description: "Long-sleeve and short-sleeve sports tops for training, league play, and tournament staff. Full sublimation into lightweight eyelet with custom names, numbers, and sponsors all printed into the fabric.",
    benefits: [
      "Compressions or relaxed fit",
      "140–180 GSM eyelet",
      "Custom name/number in the print",
    ],
    process: "Sublimation on Polyester Eyelet",
    icon: "👕",
  },
  "Baby Bodysuit": {
    label: "Baby Bodysuit",
    description: "Full-print baby onesies for gifts, baby-shower merch, and family-matching collections. Soft polyester with full print across the front, back, and sleeves.",
    benefits: [
      "Snap-shoulder for easy dressing",
      "Soft polyester 180 GSM",
      "Full print front, back, and sleeves",
    ],
    process: "Sublimation on Polyester",
    icon: "👶",
  },
  "Kids Sportswear": {
    label: "Kids Sportswear",
    description: "Sublimated kids jerseys, tees, and hoodies for youth leagues, school teams, and tournament merch. Same print quality as adult gear, sized for kids 4–14.",
    benefits: [
      "Youth sizing 4–14",
      "Same print quality as adult kit",
      "Low MOQ 30 pcs per design",
    ],
    process: "Sublimation on Polyester",
    icon: "🧒",
  },
  "Winter Wear": {
    label: "Winter Wear",
    description: "Sublimated winter wear — base layers, mid-layers, and insulated jackets for ski, snowboard, and cold-weather team uniforms. Print survives cold, abrasion, and repeat washing.",
    benefits: [
      "Base, mid, and outer layer options",
      "Insulation and water-resistant finishes",
      "Full print across body and sleeves",
    ],
    process: "Sublimation on Polyester",
    icon: "❄️",
  },
  "Activewear": {
    label: "Activewear",
    description: "Sublimated leggings, sports bras, and tops for fitness brands, yoga studios, and direct-to-consumer activewear. Four-way stretch polyester with full print that doesn't distort during wear.",
    benefits: [
      "Leggings, bras, crops, and tanks",
      "220–240 GSM polyester-spandex",
      "Full print that survives stretch",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🏃",
  },
  "Swimwear": {
    label: "Swimwear",
    description: "Full-print swimwear for team swimsuits, surf brands, and resort collections. Chlorine-resistant polyester-spandex with UV-stable inks — colors stay vibrant through pool and salt water.",
    benefits: [
      "One-piece or two-piece cuts",
      "Chlorine-resistant 200 GSM poly-spandex",
      "UV-stable inks, no fade",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "👙",
  },
  "Beachwear": {
    label: "Beachwear",
    description: "Sublimated beachwear — board shorts, cover-ups, rash guards, and tank tops for surf, swim, and resort brands. Full print from waistband to hem, no center seam.",
    benefits: [
      "Board shorts, rash guards, cover-ups",
      "Quick-dry polyester or poly-spandex",
      "Full print, no fading in salt water",
    ],
    process: "Sublimation on Polyester",
    icon: "🏖️",
  },
  "Leggings": {
    label: "Leggings",
    description: "Full-print leggings for fitness, yoga, and streetwear. Four-way stretch polyester-spandex with a wide waistband that doesn't roll — full-coverage print holds shape through squat, lunge, and run.",
    benefits: [
      "High-waist, 7/8, or full length",
      "220–240 GSM poly-spandex",
      "Full print with squat-proof opacity",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🩱",
  },
  "Apron": {
    label: "Apron",
    description: "Sublimated aprons for cafés, breweries, restaurants, and retail staff. Full print across the bib, waist, and tie straps — perfect for branded uniforms and event merch.",
    benefits: [
      "Bib, waist, or cross-back cuts",
      "280–320 GSM polyester canvas",
      "Full print on bib, body, and straps",
    ],
    process: "Sublimation on Polyester",
    icon: "🍳",
  },
  "Bucket Hat": {
    label: "Bucket Hat",
    description: "Full-print bucket hats for festivals, streetwear, and outdoor brands. Pattern wraps the crown and brim without a visible seam break.",
    benefits: [
      "Reversible construction",
      "Soft polyester twill or mesh",
      "Full print on crown and brim",
    ],
    process: "Sublimation on Polyester",
    icon: "🎩",
  },
  "Baseball Cap": {
    label: "Baseball Cap",
    description: "Sublimated baseball caps for sports teams, streetwear, and brand merch. Full coverage print across the crown, brim, and back closure — logos and patterns sit cleanly on every panel.",
    benefits: [
      "6-panel structured or 5-panel unstructured",
      "Snapback, velcro, or fitted closure",
      "Full print on crown, brim, and underbill",
    ],
    process: "Sublimation on Polyester",
    icon: "🧢",
  },
  "Sportswear": {
    label: "Sportswear",
    description: "Performance and team-wear pieces built for club play, league kits, training, and event drops. Full-sublimation construction so player names, numbers, sponsors, and full-coverage patterns sit inside the fabric — no cracking, no peeling, no heavy decals.",
    benefits: [
      "Full print wraps sleeves, side panels, and back",
      "Set-in or raglan cut, 140–200 GSM eyelet/piqué",
      "Fast-turn 7–14 days for 30–500 pc runs",
    ],
    process: "Sublimation on Polyester Mesh / Interlock",
    icon: "🏃",
  },
  "Home": {
    label: "Home",
    description: "Cozy home-textile pieces — onesies, loungewear, hooded jumpsuits, and plush towels — printed edge-to-edge with your design. Soft hand feel, color-fast through repeated washing, perfect for gifting, dropship, and small-batch home collections.",
    benefits: [
      "Full print across body, sleeves, and hood",
      "160–320 GSM brushed or terry fabrics",
      "DDP shipping with US warehouse in Fontana CA",
    ],
    process: "Sublimation on Polyester Fleece / Towel",
    icon: "🏠",
  },
  "Cap": {
    label: "Cap",
    description: "Sublimated headwear for teams, streetwear, and event merch. Full-coverage print across crown, brim, and back closure — your logo or pattern wraps the entire cap without stitched patches or heat-press logos.",
    benefits: [
      "5-panel / 6-panel structured or unstructured",
      "Snapback, velcro, fitted, or flex closure",
      "Full print on crown, brim, underbill, and strap",
    ],
    process: "Sublimation on Polyester Twill / Mesh",
    icon: "🧢",
  },
};

// ------------------------------------------------------------
// 42 Sports
// ------------------------------------------------------------

export const SPORT_TAGS: Record<string, Omit<TagInfo, "slug" | "dimension">> = {
  "AFL": {
    label: "AFL",
    description: "Sublimated AFL guernseys, supporter tees, and training gear for clubs, leagues, and tournaments across Australia. Set-in or raglan cuts with name, number, and sponsor sublimated into the fabric — no screen print to peel.",
    benefits: [
      "Guernsey, training tee, supporter polo",
      "Player name + number sublimated in",
      "DDP shipping to AU door-to-door",
    ],
    process: "Sublimation on Polyester Eyelet",
    icon: "🏉",
  },
  "Athletics": {
    label: "Athletics",
    description: "Track & field kits for clubs, schools, and meets — singlets, running tops, and shorts in full-coverage sublimation. Lightweight eyelet with flat-lock seams doesn't chafe during sprint, jump, or distance events.",
    benefits: [
      "Singlet, crop, running top, split shorts",
      "140–160 GSM eyelet, flat-lock seams",
      "Custom event branding available",
    ],
    process: "Sublimation on Polyester Eyelet",
    icon: "🏃",
  },
  "Badminton": {
    label: "Badminton",
    description: "Sublimated badminton jerseys and match kits for clubs, schools, and tournaments. Lightweight eyelet with raglan sleeves — full coverage print of club logo, sponsor, and player name stays crisp through play.",
    benefits: [
      "Jersey + shorts match set",
      "140–160 GSM moisture-wicking eyelet",
      "Tournament-grade turnaround",
    ],
    process: "Sublimation on Polyester Eyelet",
    icon: "🏸",
  },
  "Baseball": {
    label: "Baseball",
    description: "Sublimated baseball jerseys, pants, and caps for leagues, schools, and tournament teams. Full-coverage print of team logo, player name, and number — buttons and seams don't break the pattern.",
    benefits: [
      "Jersey, pant, cap, and belt set",
      "Button-up jersey with full print",
      "Sublimated cap matches the kit",
    ],
    process: "Sublimation on Polyester",
    icon: "⚾",
  },
  "Basketball": {
    label: "Basketball",
    description: "Sublimated basketball jerseys, shorts, and reversible kits for club, school, AAU, and tournament play. Mesh polyester with name, number, and sponsor sublimated in — survives a full season of play and washing.",
    benefits: [
      "Reversible jersey + short set",
      "140–160 GSM eyelet mesh",
      "Custom AAU / school branding",
    ],
    process: "Sublimation on Polyester Mesh",
    icon: "🏀",
  },
  "Beach": {
    label: "Beach",
    description: "Sublimated beach volleyball and beach sports kits — board shorts, rash guards, tank tops, and singlets built for sun, sand, and salt. UV-stable inks don't fade through pool or salt water.",
    benefits: [
      "Board shorts, rash guard, singlet",
      "Quick-dry poly-spandex",
      "UV-stable inks, full print",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🏖️",
  },
  "Bowling": {
    label: "Bowling",
    description: "Sublimated bowling jerseys for leagues, tournaments, and pro shops. Full print of team logo, sponsor, and player name across the chest, back, and sleeves — no embroidery to scratch or peel.",
    benefits: [
      "Polo or button-up jersey",
      "Full print of league and sponsor logos",
      "Reorder MOQ 30 pcs",
    ],
    process: "Sublimation on Polyester",
    icon: "🎳",
  },
  "Boxing": {
    label: "Boxing",
    description: "Sublimated boxing trunks, robes, and training gear for gyms, fighters, and event promoters. Polyester-satin with full print of fighter name, gym logo, and event branding — ready for weigh-in and ring walk.",
    benefits: [
      "Trunks, robe, hoodie, training tee set",
      "Polyester satin or poly-spandex",
      "Custom event branding and date",
    ],
    process: "Sublimation on Polyester Satin",
    icon: "🥊",
  },
  "Cheer": {
    label: "Cheer",
    description: "Sublimated cheer uniforms for school, all-star, and college squads — crop tops, skirts, shells, and bows all printable in one design file. Stretch polyester with full print holds shape through stunts and tumbling.",
    benefits: [
      "Shell, crop top, skirt, and bow set",
      "200–240 GSM poly-spandex",
      "Full print holds through stunts",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "📣",
  },
  "Cricket": {
    label: "Cricket",
    description: "Sublimated cricket whites, training kits, and supporter tees for clubs, schools, and tournaments. Long-sleeve whites with full print of club crest and sponsor — pro-grade fit and finish.",
    benefits: [
      "Match whites, training tee, supporter polo",
      "Long-sleeve and short-sleeve options",
      "Custom sponsor panel print",
    ],
    process: "Sublimation on Polyester",
    icon: "🏏",
  },
  "CrossFit": {
    label: "CrossFit",
    description: "Sublimated CrossFit gear — training tees, shorts, leggings, and hoodies for boxes, competitions, and affiliates. Full print of box logo, WOD themes, and athlete names — built to take a beating.",
    benefits: [
      "Training tee, short, legging, hoodie set",
      "180–220 GSM poly-spandex or fleece",
      "Custom WOD or event artwork",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🏋️",
  },
  "Cycling": {
    label: "Cycling",
    description: "Sublimated cycling jerseys, bibs, and skinsuits for clubs, teams, and gran fondos. Race-cut fit with full print of team kit, sponsor logos, and event branding — aerodynamic and built for the long ride.",
    benefits: [
      "Jersey, bib short, skinsuit",
      "Race, club, or relaxed fit",
      "Sponsor panels on chest, sleeves, side",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🚴",
  },
  "Dance": {
    label: "Dance",
    description: "Sublimated dancewear for studios, teams, and competition — leotards, crop tops, leggings, and unitards. Four-way stretch polyester with full print that holds its shape through routines and tumbling.",
    benefits: [
      "Leotard, crop top, legging, unitard",
      "200–240 GSM poly-spandex",
      "Custom studio and team branding",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "💃",
  },
  "Dive": {
    label: "Dive",
    description: "Sublimated swimwear and rash guards for diving, snorkeling, and water sports. Chlorine-resistant poly-spandex with full print that doesn't fade in pool or salt water.",
    benefits: [
      "Rash guard, swim shorts, one-piece",
      "Chlorine-resistant 200 GSM",
      "UV-stable full print",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🤿",
  },
  "Esports": {
    label: "Esports",
    description: "Sublimated esports jerseys and team merch for tournament play, content creators, and pro teams. Full print of team logo, sponsor, and player name across the jersey, hoodie, and tee collection.",
    benefits: [
      "Jersey, hoodie, tee, cap set",
      "Full print of team and sponsor branding",
      "Streamer and content-creator merch",
    ],
    process: "Sublimation on Polyester",
    icon: "🎮",
  },
  "Fishing": {
    label: "Fishing",
    description: "Sublimated fishing shirts, hoodies, and sun-protection gear for tournaments, guides, and brand collections. Long-sleeve with full print of sponsor logos and tournament branding — built for long days on the water.",
    benefits: [
      "Long-sleeve shirt, hoodie, hat",
      "UPF 50+ sun protection",
      "Tournament and sponsor branding",
    ],
    process: "Sublimation on Polyester",
    icon: "🎣",
  },
  "Football": {
    label: "Football",
    description: "Sublimated American football jerseys, pants, and full kits for school, club, and semi-pro teams. Full print of team logo, player name, and number across the body, sleeves, and pants.",
    benefits: [
      "Jersey, pant, and full kit",
      "Reinforced seams for contact sport",
      "Custom name and number",
    ],
    process: "Sublimation on Polyester Mesh",
    icon: "🏈",
  },
  "Golf": {
    label: "Golf",
    description: "Sublimated golf polos, pants, and outerwear for pro shops, tournaments, and country club merch. Full print of club crest, sponsor, and event branding — clean, performance-grade fit.",
    benefits: [
      "Polo, pant, outerwear set",
      "200–220 GSM bird-eye or piqué",
      "Custom tournament artwork",
    ],
    process: "Sublimation on Polyester Piqué",
    icon: "⛳",
  },
  "Gym": {
    label: "Gym",
    description: "Sublimated gym wear — stringers, tank tops, tees, and shorts for fitness brands, influencers, and direct-to-consumer collections. Full print with no peeling through heavy training.",
    benefits: [
      "Stringer, tank, tee, short set",
      "140–180 GSM eyelet",
      "Built for high-rep training",
    ],
    process: "Sublimation on Polyester Eyelet",
    icon: "🏋️",
  },
  "Hockey": {
    label: "Hockey",
    description: "Sublimated hockey jerseys, socks, and training gear for ice and field hockey teams. Full print of team crest, player name, and number — mesh polyester for breathability under pads.",
    benefits: [
      "Jersey, sock, training tee set",
      "140–160 GSM eyelet mesh",
      "Custom team and tournament branding",
    ],
    process: "Sublimation on Polyester Mesh",
    icon: "🏒",
  },
  "Lacrosse": {
    label: "Lacrosse",
    description: "Sublimated lacrosse jerseys, shorts, and pinnies for school, club, and tournament play. Mesh polyester with full print of team logo, player name, and number.",
    benefits: [
      "Jersey, short, reversible pinnie",
      "140–160 GSM eyelet",
      "Custom tournament branding",
    ],
    process: "Sublimation on Polyester Mesh",
    icon: "🥍",
  },
  "MMA": {
    label: "MMA",
    description: "Sublimated MMA fight kits — rash guards, fight shorts, and walkout hoodies for gyms, fighters, and event promoters. Four-way stretch poly-spandex built for grappling and ground work.",
    benefits: [
      "Rash guard, fight short, walkout hoodie",
      "180–200 GSM 4-way stretch",
      "Reinforced flat-lock seams",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🥋",
  },
  "Martial Arts": {
    label: "Martial Arts",
    description: "Sublimated martial arts uniforms and training gear for karate, taekwondo, jiu-jitsu, and kung fu schools. Lightweight poly-cotton or polyester with full print of dojo logo and student name.",
    benefits: [
      "Gi, rash guard, training tee, hoodie",
      "Lightweight poly-cotton or polyester",
      "Custom dojo and event branding",
    ],
    process: "Sublimation on Polyester",
    icon: "🥋",
  },
  "Netball": {
    label: "Netball",
    description: "Sublimated netball dresses, bibs, and match kits for clubs, schools, and tournaments. Full print of club crest, sponsor, and player name — dress and bib set in one design file.",
    benefits: [
      "Dress, bib, training tee set",
      "140–180 GSM eyelet or interlock",
      "Custom club and tournament branding",
    ],
    process: "Sublimation on Polyester",
    icon: "🤾",
  },
  "Pilates": {
    label: "Pilates",
    description: "Sublimated pilates wear — leggings, crops, tanks, and unitards for studios, instructors, and direct-to-consumer brands. Soft-handle poly-spandex with full print that holds shape through every rep.",
    benefits: [
      "Legging, crop, tank, unitard",
      "220–240 GSM poly-spandex",
      "Custom studio branding",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🧘",
  },
  "Rugby": {
    label: "Rugby",
    description: "Sublimated rugby jerseys, shorts, and socks for clubs, schools, and tournaments. Heavyweight polyester with full print of club crest, sponsor, and player number — built for the contact game.",
    benefits: [
      "Jersey, short, sock set",
      "200–240 GSM polyester",
      "Reinforced seams for contact",
    ],
    process: "Sublimation on Polyester",
    icon: "🏉",
  },
  "Running": {
    label: "Running",
    description: "Sublimated running kits — singlets, tees, shorts, and tights for clubs, races, and brand collections. Lightweight eyelet with flat-lock seams — no chafing, full print of race branding and sponsor.",
    benefits: [
      "Singlet, tee, short, tight set",
      "140–180 GSM eyelet",
      "Race-day branding and bib names",
    ],
    process: "Sublimation on Polyester Eyelet",
    icon: "🏃",
  },
  "Skate": {
    label: "Skate",
    description: "Sublimated skate tees, hoodies, and pants for skate brands, board companies, and streetwear collections. Heavyweight cotton-feel polyester with full print that survives the abuse of street skating.",
    benefits: [
      "Tee, hoodie, pant set",
      "Heavyweight 220–280 GSM",
      "Full print, no screen print peel",
    ],
    process: "Sublimation on Polyester",
    icon: "🛹",
  },
  "Skating": {
    label: "Skating",
    description: "Sublimated figure skating and roller skating dresses, leggings, and performance wear for clubs, coaches, and competitions. Four-way stretch poly-spandex with full print of choreography, sponsor, and club crest.",
    benefits: [
      "Dress, legging, crop top set",
      "200–240 GSM poly-spandex",
      "Competition-grade construction",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "⛸️",
  },
  "Ski": {
    label: "Ski",
    description: "Sublimated ski jackets, pants, and base layers for ski schools, race teams, and resort uniforms. Full print of team logo and sponsor — waterproof shells don't break the pattern.",
    benefits: [
      "Jacket, pant, base layer set",
      "Waterproof and insulated options",
      "Custom race and team branding",
    ],
    process: "Sublimation on Polyester Softshell",
    icon: "⛷️",
  },
  "Snowboard": {
    label: "Snowboard",
    description: "Sublimated snowboard jackets, pants, and base layers for instructors, teams, and resort brands. Full print of mountain and resort branding — waterproof shells and stretch panels keep the pattern clean.",
    benefits: [
      "Jacket, pant, base layer set",
      "Waterproof and stretch options",
      "Resort and instructor branding",
    ],
    process: "Sublimation on Polyester Softshell",
    icon: "🏂",
  },
  "Soccer": {
    label: "Soccer",
    description: "Sublimated soccer jerseys, shorts, and socks for clubs, schools, and tournament teams. Full print of club crest, sponsor, and player name/number — mesh polyester breathes under the kit.",
    benefits: [
      "Jersey, short, sock set",
      "140–160 GSM eyelet mesh",
      "Custom club and tournament branding",
    ],
    process: "Sublimation on Polyester Eyelet",
    icon: "⚽",
  },
  "Softball": {
    label: "Softball",
    description: "Sublimated softball jerseys, pants, and visors for leagues, schools, and tournament teams. Full print of team logo, player name, and number — buttons and seams don't break the pattern.",
    benefits: [
      "Jersey, pant, visor set",
      "Button-up jersey with full print",
      "Custom team and tournament branding",
    ],
    process: "Sublimation on Polyester",
    icon: "🥎",
  },
  "Surf": {
    label: "Surf",
    description: "Sublimated surf rash guards, board shorts, and tanks for surf brands, schools, and competitions. UV-stable inks and quick-dry poly-spandex — full print stands up to salt, sun, and wax.",
    benefits: [
      "Rash guard, board short, tank set",
      "UPF 50+ UV protection",
      "UV-stable full print",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🏄",
  },
  "Swimwear": {
    label: "Swimwear",
    description: "Sublimated swimwear for swim teams, water polo, and resort brands. Chlorine-resistant poly-spandex with full print of team logo and sponsor — colors stay vibrant through pool and salt water.",
    benefits: [
      "One-piece, two-piece, water polo suit",
      "Chlorine-resistant 200 GSM",
      "UV-stable full print",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🏊",
  },
  "Table Tennis": {
    label: "Table Tennis",
    description: "Sublimated table tennis jerseys and shorts for clubs, schools, and tournament play. Lightweight eyelet with full print of club crest, sponsor, and player name — tournament-grade turnaround.",
    benefits: [
      "Jersey + short match set",
      "140–160 GSM eyelet",
      "Tournament-grade turnaround",
    ],
    process: "Sublimation on Polyester Eyelet",
    icon: "🏓",
  },
  "Tennis": {
    label: "Tennis",
    description: "Sublimated tennis polos, dresses, and skirts for clubs, coaches, and tournament play. Full print of club crest, sponsor, and player name — performance fabric with a clean, classic look.",
    benefits: [
      "Polo, dress, skirt, short set",
      "200–220 GSM bird-eye or piqué",
      "Tournament and club branding",
    ],
    process: "Sublimation on Polyester Piqué",
    icon: "🎾",
  },
  "Triathlon": {
    label: "Triathlon",
    description: "Sublimated triathlon suits, tops, and trisuits for clubs, races, and tri-series. Race-cut poly-spandex with full print of race branding and athlete name — aerodynamic and built for the long haul.",
    benefits: [
      "Trisuit, top, short set",
      "Race-cut 200–240 GSM poly-spandex",
      "Custom race and club branding",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🏊",
  },
  "Volleyball": {
    label: "Volleyball",
    description: "Sublimated volleyball jerseys, shorts, and libero tops for clubs, schools, and tournament teams. Mesh polyester with full print of team logo, player name, and number.",
    benefits: [
      "Jersey, short, libero top set",
      "140–160 GSM eyelet",
      "Custom team and tournament branding",
    ],
    process: "Sublimation on Polyester Eyelet",
    icon: "🏐",
  },
  "Wrestling": {
    label: "Wrestling",
    description: "Sublimated wrestling singlets, fight shorts, and warmups for school, club, and tournament teams. Lightweight poly-spandex with full print of school colors, mascot, and athlete name.",
    benefits: [
      "Singlet, fight short, warmup set",
      "180–200 GSM 4-way stretch",
      "Built for mat work and grappling",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🤼",
  },
  "Yoga": {
    label: "Yoga",
    description: "Sublimated yoga wear — leggings, crops, tanks, and bras for studios, teachers, and direct-to-consumer brands. Soft-handle poly-spandex with full print that holds shape through every flow.",
    benefits: [
      "Legging, crop, tank, bra set",
      "220–240 GSM poly-spandex",
      "Custom studio and event branding",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🧘",
  },
};

// ------------------------------------------------------------
// 27 Scenarios
// ------------------------------------------------------------

export const SCENARIO_TAGS: Record<string, Omit<TagInfo, "slug" | "dimension">> = {
  "Promotional Swag": {
    label: "Promotional Swag",
    description: "Custom promotional swag — full-print tees, hoodies, hats, and totes for brand giveaways, customer gifts, and event drops. Low MOQ 50 pcs per design with DDP shipping to US/EU/UK/AU door-to-door.",
    benefits: [
      "Tees, hoodies, hats, totes, socks",
      "MOQ 50 pcs per design",
      "DDP shipping to US/EU/UK/AU",
    ],
    process: "Sublimation on Polyester",
    icon: "🎁",
  },
  "Event & Festival": {
    label: "Event & Festival",
    description: "Sublimated event and festival merch — tees, hoodies, tank tops, hats, and bags for music festivals, food festivals, and brand activations. Full print of event branding and artist line-up.",
    benefits: [
      "Tee, hoodie, tank, hat, bag set",
      "Event date and artist line-up print",
      "Fast-turn 7–10 day sample",
    ],
    process: "Sublimation on Polyester",
    icon: "🎪",
  },
  "School & Education": {
    label: "School & Education",
    description: "Sublimated school and education uniforms — PE kits, sports teams, class trips, and graduation merch. Full print of school crest, year, and house colors across tees, polos, hoodies, and shorts.",
    benefits: [
      "PE kit, sports team, class trip, graduation",
      "Full print of school crest and year",
      "House color variants in one order",
    ],
    process: "Sublimation on Polyester",
    icon: "🎓",
  },
  "Team & Club": {
    label: "Team & Club",
    description: "Sublimated team and club kits — sports clubs, social clubs, gaming clans, and hobby groups. Full print of team logo, member name, and number — jerseys, tees, hoodies, and hats.",
    benefits: [
      "Jersey, tee, hoodie, hat set",
      "Custom member names and numbers",
      "Reorder MOQ 30 pcs per design",
    ],
    process: "Sublimation on Polyester",
    icon: "👥",
  },
  "Sports League": {
    label: "Sports League",
    description: "Sublimated league-wide merch for amateur and semi-pro sports leagues — referee kits, staff uniforms, team sets, and event tees. Full print of league logo, sponsor, and season branding.",
    benefits: [
      "Referee kit, staff uniform, team set",
      "Full print of league and season branding",
      "Sponsor panel integration",
    ],
    process: "Sublimation on Polyester",
    icon: "🏆",
  },
  "Corporate & Branding": {
    label: "Corporate & Branding",
    description: "Sublimated corporate merch and branded uniforms for company events, employee gifts, and customer giveaways. Full print of company logo, tagline, and brand artwork across polos, tees, jackets, and accessories.",
    benefits: [
      "Polo, tee, jacket, accessory set",
      "Full print of company branding",
      "Bulk pricing for 100+ pcs",
    ],
    process: "Sublimation on Polyester",
    icon: "🏢",
  },
  "Uniform & Workwear": {
    label: "Uniform & Workwear",
    description: "Sublimated uniforms and workwear for hospitality, retail, construction, and service teams. Full print of company branding — durable poly-blends built for daily wear and industrial laundering.",
    benefits: [
      "Polo, button-up, jacket, pant set",
      "Industrial-wash durable",
      "Custom company branding and roles",
    ],
    process: "Sublimation on Polyester",
    icon: "👷",
  },
  "Retail & Fashion": {
    label: "Retail & Fashion",
    description: "Sublimated retail and fashion collections for boutique brands, streetwear labels, and direct-to-consumer drops. Full print from artwork to finished garment — small batch production with full-size runs.",
    benefits: [
      "Tee, hoodie, dress, swim, accessories",
      "Small batch or full size run",
      "DDP shipping to US/EU/UK/AU",
    ],
    process: "Sublimation on Polyester",
    icon: "🛍️",
  },
  "Political Campaign": {
    label: "Political Campaign",
    description: "Sublimated campaign merch for political candidates, ballot measures, and advocacy organizations. Full print of campaign logo, slogan, and candidate name — fast turnaround for rallies and door-knocks.",
    benefits: [
      "Tee, hoodie, hat, button, sticker set",
      "Fast-turn 7-day sample",
      "Bulk pricing for 1000+ pcs",
    ],
    process: "Sublimation on Polyester",
    icon: "🗳️",
  },
  "Fundraiser & Charity": {
    label: "Fundraiser & Charity",
    description: "Sublimated fundraiser and charity merch — tees, hoodies, and accessories for non-profits, school fundraisers, and awareness campaigns. Full print of cause branding and event artwork.",
    benefits: [
      "Tee, hoodie, accessory set",
      "Low MOQ 50 pcs per design",
      "DDP shipping worldwide",
    ],
    process: "Sublimation on Polyester",
    icon: "❤️",
  },
  "Music & Merch": {
    label: "Music & Merch",
    description: "Sublimated music and band merch for touring artists, festivals, and record labels. Full print of album artwork, tour dates, and band logo across tees, hoodies, tank tops, hats, and totes.",
    benefits: [
      "Tee, hoodie, tank, hat, tote set",
      "Tour date and album artwork print",
      "Fast-turn for tour launches",
    ],
    process: "Sublimation on Polyester",
    icon: "🎵",
  },
  "Wedding & Party": {
    label: "Wedding & Party",
    description: "Sublimated wedding and party merch for bachelorette weekends, family reunions, milestone birthdays, and group events. Full print of event name, date, and custom artwork across tees, tanks, and hats.",
    benefits: [
      "Tee, tank, hat, tote set",
      "Custom event name, date, artwork",
      "Reorder MOQ 30 pcs",
    ],
    process: "Sublimation on Polyester",
    icon: "💍",
  },
  "Gift & Souvenir": {
    label: "Gift & Souvenir",
    description: "Sublimated gift and souvenir merch for tourist destinations, museums, national parks, and brand gift shops. Full print of destination artwork, logo, and custom design across tees, hats, and accessories.",
    benefits: [
      "Tee, hat, tote, accessory set",
      "Custom destination artwork",
      "Bulk pricing for retail",
    ],
    process: "Sublimation on Polyester",
    icon: "🎁",
  },
  "Construction & Engineering": {
    label: "Construction & Engineering",
    description: "Sublimated workwear for construction and engineering teams — hi-vis polos, hi-vis hoodies, work pants, and safety jackets. Full print of company logo and employee name — built for daily wear on the jobsite.",
    benefits: [
      "Hi-vis polo, hoodie, jacket, pant set",
      "Reflective tape integration",
      "Custom company branding and roles",
    ],
    process: "Sublimation on Polyester",
    icon: "🚧",
  },
  "Express & Logistics": {
    label: "Express & Logistics",
    description: "Sublimated uniforms for express delivery and logistics teams — courier polos, workwear pants, and outerwear. Full print of company logo and courier name — durable poly-blends built for daily wear.",
    benefits: [
      "Courier polo, workwear pant, jacket set",
      "Reflective tape integration",
      "Custom company branding",
    ],
    process: "Sublimation on Polyester",
    icon: "📦",
  },
  "Hospitality & F&B": {
    label: "Hospitality & F&B",
    description: "Sublimated uniforms for hospitality and food & beverage teams — bar polos, server polos, chef aprons, and front-desk uniforms. Full print of venue branding and employee name — wrinkle-resistant and easy to launder.",
    benefits: [
      "Polo, apron, server uniform set",
      "Wrinkle-resistant poly-blend",
      "Custom venue and event branding",
    ],
    process: "Sublimation on Polyester",
    icon: "🍽️",
  },
  "Medical & Healthcare": {
    label: "Medical & Healthcare",
    description: "Sublimated scrubs and uniforms for medical and healthcare teams — scrubs tops, scrub pants, lab coats, and event tees. Full print of clinic logo, role, and employee name — comfortable and easy to launder.",
    benefits: [
      "Scrub top, scrub pant, lab coat set",
      "Antimicrobial finish available",
      "Custom clinic and event branding",
    ],
    process: "Sublimation on Polyester",
    icon: "⚕️",
  },
  "Security & Property": {
    label: "Security & Property",
    description: "Sublimated uniforms for security and property management teams — security polos, hi-vis jackets, and work pants. Full print of company logo, role, and employee name.",
    benefits: [
      "Security polo, hi-vis jacket, pant set",
      "Reflective tape integration",
      "Custom company branding and roles",
    ],
    process: "Sublimation on Polyester",
    icon: "🛡️",
  },
  "Retail & Supermarket": {
    label: "Retail & Supermarket",
    description: "Sublimated uniforms for retail and supermarket teams — store polos, store tees, aprons, and outerwear. Full print of store brand, role, and employee name — wrinkle-resistant and easy to launder.",
    benefits: [
      "Polo, tee, apron, outerwear set",
      "Wrinkle-resistant poly-blend",
      "Custom store and role branding",
    ],
    process: "Sublimation on Polyester",
    icon: "🛒",
  },
  "Education & School": {
    label: "Education & School",
    description: "Sublimated uniforms and merch for schools, preschools, and education programs — PE kits, sports teams, class trips, and graduation gear. Full print of school crest, year, and class colors.",
    benefits: [
      "PE kit, sports team, class trip, graduation",
      "Full print of school crest and year",
      "Class color variants in one order",
    ],
    process: "Sublimation on Polyester",
    icon: "📚",
  },
  "Corporate & Promo": {
    label: "Corporate & Promo",
    description: "Sublimated corporate promo merch for trade shows, conferences, and customer giveaways. Full print of company branding, event date, and conference logo across tees, polos, jackets, and accessories.",
    benefits: [
      "Tee, polo, jacket, accessory set",
      "Custom event and conference branding",
      "Bulk pricing for 100+ pcs",
    ],
    process: "Sublimation on Polyester",
    icon: "💼",
  },
  "Transit & Transport": {
    label: "Transit & Transport",
    description: "Sublimated uniforms for transit and transport teams — driver polos, mechanic overalls, hi-vis jackets, and work pants. Full print of company logo, role, and employee name.",
    benefits: [
      "Driver polo, overall, hi-vis set",
      "Reflective tape integration",
      "Custom company branding and roles",
    ],
    process: "Sublimation on Polyester",
    icon: "🚌",
  },
  "Studio & Gym": {
    label: "Studio & Gym",
    description: "Sublimated merch for studios and gyms — instructor polos, training tees, leggings, and student merch. Full print of studio logo, instructor name, and class branding.",
    benefits: [
      "Instructor polo, training tee, legging set",
      "Full print of studio branding",
      "Custom class and event artwork",
    ],
    process: "Sublimation on Polyester",
    icon: "🏋️",
  },
  "Military": {
    label: "Military",
    description: "Sublimated merch for military units, veterans organizations, and tactical teams — training tees, polos, hoodies, and caps. Full print of unit insignia, rank, and service branch — built for daily wear.",
    benefits: [
      "Training tee, polo, hoodie, cap set",
      "Full print of unit and rank insignia",
      "Custom unit and event branding",
    ],
    process: "Sublimation on Polyester",
    icon: "🎖️",
  },
  "Festival & Holiday": {
    label: "Festival & Holiday",
    description: "Sublimated holiday and festival merch — Christmas, Halloween, Thanksgiving, Easter, and cultural celebrations. Full print of holiday artwork and event branding across tees, hoodies, pajamas, and accessories.",
    benefits: [
      "Tee, hoodie, pajama, accessory set",
      "Custom holiday and event artwork",
      "Reorder MOQ 30 pcs",
    ],
    process: "Sublimation on Polyester",
    icon: "🎃",
  },
  "Beach": {
    label: "Beach",
    description: "Sublimated beach and resort merch — board shorts, rash guards, tank tops, and cover-ups for beach clubs, surf shops, and resort gift stores. UV-stable inks and quick-dry fabrics.",
    benefits: [
      "Board short, rash guard, tank set",
      "UPF 50+ UV protection",
      "UV-stable full print",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🏖️",
  },
  "Lycra": {
    label: "Lycra",
    description: "Sublimated lycra and stretch apparel for dance, gymnastics, fitness, and stage performance — unitards, leggings, and bodysuits. Four-way stretch with full print that holds shape through every movement.",
    benefits: [
      "Unitard, legging, bodysuit set",
      "200–240 GSM 4-way stretch",
      "Full print holds through movement",
    ],
    process: "Sublimation on Polyester Spandex",
    icon: "🩱",
  },
  "Sublimation": {
    label: "Sublimation",
    description: "Heat-press sublimation printing — dye turns to gas and bonds with polyester fibers, so the print becomes part of the fabric. Won't crack, peel, or fade. Works on any polyester or poly-blend garment.",
    benefits: [
      "Print becomes part of the fabric",
      "No crack, peel, or fade",
      "Photographic detail and full color",
    ],
    process: "Heat-Press Sublimation on Polyester",
    icon: "🔥",
  },
  "Polyester": {
    label: "Polyester",
    description: "Polyester is the workhorse of sublimation — it bonds with sublimation dyes at the molecular level, so prints sit inside the fabric rather than on top. Lightweight, moisture-wicking, and durable.",
    benefits: [
      "Bonds with sublimation dyes",
      "Lightweight and moisture-wicking",
      "Durable through heavy wear",
    ],
    process: "Heat-Press Sublimation on Polyester",
    icon: "🧪",
  },
};

// ------------------------------------------------------------
// Combined registry
// ------------------------------------------------------------

export const ALL_TAGS: Record<TagDimension, Record<string, Omit<TagInfo, "slug" | "dimension">>> = {
  category: CATEGORY_TAGS,
  sport: SPORT_TAGS,
  scenario: SCENARIO_TAGS,
};

export function getTagInfo(dimension: TagDimension, value: string): TagInfo | null {
  const entry = ALL_TAGS[dimension]?.[value];
  if (!entry) return null;
  return {
    ...entry,
    dimension,
    slug: slugify(entry.label),
  };
}

export function getAllTagSlugs(dimension: TagDimension): Array<{ slug: string; value: string }> {
  return Object.keys(ALL_TAGS[dimension]).map((value) => ({
    value,
    slug: slugify(ALL_TAGS[dimension][value].label),
  }));
}
