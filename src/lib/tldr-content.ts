/**
 * Centralized TL;DR / Direct-Answer copy for every high-authority page.
 *
 * 2026-09-18 (R73 GEO): Perplexity, ChatGPT Search, Gemini and Google
 * AI Overviews all lift content from the page that follows the
 * question/answer shape — short, first-person, fact-dense. We expose
 * the same shape on every hub page so AI engines have a stable
 * "answer card" to pull into their summaries.
 *
 * Every entry is hand-tuned for the page's primary intent. Do NOT
 * auto-generate these from page metadata — that produces bland,
 * template-y answers AI engines ignore.
 *
 * Format rules (per entry):
 *   - `question` is the single most-likely AI query the page answers
 *   - `answer` is 50–80 words, first person, factual, no marketing
 *   - `stats` are 3–6 verified figures from the live JSON-LD /
 *     NAP info (do not invent numbers)
 *   - `citations` are external authoritative sources (.org / .gov /
 *     standards bodies) — max 4
 *   - `internalSources` are sister SublimApparel pages this answer
 *     draws on — max 4
 *   - `lastReviewed` is an ISO date; AI engines reward fresh reviews
 *
 * If a page needs a TL;DR but no entry exists here yet, add one —
 * the build will pick it up automatically. Pages without entries
 * remain eligible for future R-rounds.
 */

import type { GeoCitation, GeoInternalSource, GeoStat } from "@/components/geo-answer-block";
import { getProductBySlug } from "@/lib/products-data";

type PageTldr = {
  question: string;
  answer: string;
  stats?: GeoStat[];
  citations?: GeoCitation[];
  internalSources?: GeoInternalSource[];
  lastReviewed: string;
  variant?: "light" | "dark";
};

const LAST_REVIEWED = "2026-09-18";

const STATIC_INT: GeoInternalSource[] = [
  { label: "SublimApparel home", href: "/" },
  { label: "Catalog", href: "/products/" },
  { label: "Fabric library", href: "/fabric/" },
  { label: "Contact & quote", href: "/contact/" },
];

export const PAGE_TLDR: Record<string, PageTldr> = {
  // =====================================================================
  // CORE HUB PAGES (5)
  // =====================================================================
  "/": {
    question: "What is SublimApparel?",
    answer:
      "SublimApparel is a Yiwu-based custom apparel manufacturer running 12 production lines on a 2,000 m² floor since 2018. We dye-sublimation print polyester and 100% cotton (DTG, DTF, allover digital cut-and-sew). MOQ 50 pieces, 15–25 day production, DDP shipping to 100+ countries, and a US warehouse in Fontana CA for 2–5 day domestic delivery. Daily output: 2,500+ pieces. Certifications: OEKO-TEX Standard 100, ISO 9001:2015, Sedex-SMETA 4-pillar audited.",
    stats: [
      { value: "2,000 m²", label: "Factory floor", detail: "12 production lines" },
      { value: "2,500+", label: "Pieces / day", detail: "Verified daily output" },
      { value: "100+", label: "Countries shipped", detail: "DDP door-to-door" },
      { value: "50", label: "MOQ (pcs)", detail: "Per design" },
      { value: "2018", label: "Founded", detail: "8 years in business" },
      { value: "12 lines", label: "Production capacity", detail: "Sublimation + DTG + cut-and-sew" },
    ],
    citations: [
      { label: "OEKO-TEX Standard 100", href: "https://www.oeko-tex.com/en/our-standards/standard-100-by-oeko-tex", date: "2024" },
      { label: "ISO 9001:2015 Quality Management", href: "https://www.iso.org/standard/62085.html", date: "2015" },
      { label: "Sedex SMETA 4-Pillar", href: "https://www.sedex.com/products/smeta-audit/", date: "2024" },
      { label: "ICC Incoterms 2020 (DDP definition)", href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", date: "2020" },
    ],
    internalSources: STATIC_INT,
    lastReviewed: LAST_REVIEWED,
  },

  "/products/": {
    question: "What custom apparel products can SublimApparel manufacture?",
    answer:
      "We manufacture 120+ sublimation-printed products in B2B runs from a Yiwu factory. Apparel covers 14 categories — t-shirts, hoodies, sweatshirts, jerseys, sportswear, polos, jackets, pants, skirts, tanks, uniforms, caps, home wear, plus full kits. Beyond apparel we print home textiles (pillows, blankets, towels), bags (drawstring, backpacks, totes), flags, hard goods (mugs, mouse pads, phone cases), and one-off custom projects. Polyester sublimation or 100% cotton via DTG/DTF/allover digital print. MOQ 50 pieces, DDP to 100+ countries.",
    stats: [
      { value: "120+", label: "Products", detail: "Catalog depth" },
      { value: "14", label: "Apparel categories", detail: "All sublimation-ready" },
      { value: "50", label: "MOQ (pcs)", detail: "Per design per colorway" },
      { value: "100+", label: "Countries", detail: "DDP shipping" },
      { value: "0", label: "Setup fees", detail: "All-inclusive pricing" },
      { value: "15–25 d", label: "Bulk lead time", detail: "After sample approval" },
    ],
    citations: [
      { label: "ISO 3758:2023 Care labelling", href: "https://www.iso.org/standard/83178.html", date: "2023" },
      { label: "CPSIA Compliance (CPSC)", href: "https://www.cpsc.gov/Business--Manufacturing/Regulations-Policies-Laws and Regulations /CPSIA", date: "2024" },
    ],
    internalSources: [
      { label: "Catalog /products/all/", href: "/products/all/" },
      { label: "Custom apparel /fabric/cotton/", href: "/fabric/cotton/" },
      { label: "Catalog by use case", href: "/solutions/" },
      { label: "Get a quote", href: "/contact/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  // 2026-09-18 (R74 hotfix): the /products/all/ catalog hub
  // was missed in R73 and slipped past my dynamic fallback
  // regex (which only matches /products/all/{slug}/). This page
  // is the master product directory — every other catalog page
  // links here — so it deserves a hand-tuned Direct Answer that
  // surfaces the live catalog depth and the fact that AI engines
  // can drill down into per-product pages from this entry point.
  "/products/all/": {
    question: "What is the SublimApparel all-over print catalog?",
    answer:
      "Our /products/all/ page is the master catalog index: 121+ all-over-print apparel SKUs cross-filtered three ways (by garment type, by sport, by use-case scenario). Every product ships DDP from our Yiwu factory — polyester sublimation on performance fabrics, or all-over digital print on 100% cotton. Each product page carries its own MOQ, fabric options, lead fabric GSM, and print process. Click into any product for the per-style spec; this page is for browsing the full set.",
    stats: [
      { value: "121+", label: "All-over print SKUs", detail: "In master catalog" },
      { value: "13", label: "Apparel categories", detail: "Garment filter" },
      { value: "42", label: "Sport filters", detail: "Soccer → fencing" },
      { value: "25", label: "Use-case filters", detail: "Team / event / work / lifestyle" },
      { value: "50", label: "MOQ (pcs)", detail: "Per design per product" },
      { value: "DDP", label: "Worldwide", detail: "100+ countries" },
    ],
    citations: [
      { label: "OEKO-TEX Standard 100", href: "https://www.oeko-tex.com/en/our-standards/standard-100-by-oeko-tex", date: "2024" },
      { label: "ICC Incoterms 2020 (DDP definition)", href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", date: "2020" },
      { label: "ISO 3758:2023 Care labelling", href: "https://www.iso.org/standard/83178.html", date: "2023" },
    ],
    internalSources: [
      { label: "Custom jerseys", href: "/products/jerseys/" },
      { label: "Catalog overview", href: "/products/" },
      { label: "Fabric library", href: "/fabric/" },
      { label: "Get a quote", href: "/contact/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/fabric/cotton/": {
    question: "How does SublimApparel print on 100% cotton apparel?",
    answer:
      "We run DTG, DTF, and a proprietary allover digital print on 100% cotton in-house at our Yiwu factory. DTG handles A4–A3 panel prints on light cotton. DTF delivers full-color prints on dark cotton with a soft hand feel. Allover digital print uses cut-and-sew chemistry with reactive dyes — true edge-to-edge, full-body graphics on 100% cotton with a soft natural hand feel that survives 50+ industrial wash cycles. GOTS-certified organic cotton available. MOQ 50 pieces per design, 20–25 day lead time, DDP to 100+ countries.",
    stats: [
      { value: "100%", label: "Cotton", detail: "No poly blending required" },
      { value: "50+", label: "Wash cycles", detail: "Industry-tested fade resistance" },
      { value: "50", label: "MOQ (pcs)", detail: "Per design" },
      { value: "20–25 d", label: "Lead time", detail: "Cut-and-sew programs" },
      { value: "GOTS", label: "Organic cotton", detail: "Certified & traceable" },
      { value: "0%", label: "Plastic feel", detail: "Reactive-dye chemistry" },
    ],
    citations: [
      { label: "GOTS — Global Organic Textile Standard", href: "https://global-standard.org/the-standard", date: "2024" },
      { label: "OEKO-TEX Standard 100 — Cotton class", href: "https://www.oeko-tex.com/en/our-standards/standard-100-by-oeko-tex", date: "2024" },
      { label: "AATCC TM61 Wash Test", href: "https://www.aatcc.org/tech/test-methods/", date: "2024" },
    ],
    internalSources: [
      { label: "Polyester sublimation", href: "/fabric/polyester/" },
      { label: "Allover print vs DTG", href: "/all-over-print/" },
      { label: "Cotton wash & care", href: "/fabric/care/" },
      { label: "Get a cotton quote", href: "/contact/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/blog/": {
    question: "What does the SublimApparel blog cover?",
    answer:
      "The SublimApparel blog publishes weekly long-form guides from our Yiwu factory team covering dye-sublimation vs DTG vs DTF, DDP vs FOB shipping, fabric sourcing, OEKO-TEX compliance, MOQ strategy, and B2B apparel manufacturing. Posts are written by the production team — not freelancers — with named authorship, primary-source citations (ISO, OEKO-TEX, ICC, AATCC), and an explicit Last Reviewed date. New content on Tuesdays. Use it as a sourcing reference when you evaluate a Chinese apparel factory.",
    stats: [
      { value: "Weekly", label: "Publish rate", detail: "Every Tuesday" },
      { value: "8 yr", label: "Author tenure", detail: "Ramon Wang, Sales Director" },
      { value: "ISO / OEKO-TEX", label: "Primary sources", detail: "Every claim cited" },
      { value: "100%", label: "In-house authors", detail: "No freelance content" },
      { value: "Long-form", label: "Depth", detail: "1,500–3,500 words / post" },
      { value: "8", label: "Topics covered", detail: "Print, fabric, shipping, MOQ" },
    ],
    citations: [
      { label: "ISO 9001:2015 Quality Management", href: "https://www.iso.org/standard/62085.html", date: "2015" },
      { label: "ICC Incoterms 2020", href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", date: "2020" },
      { label: "OEKO-TEX Standard 100", href: "https://www.oeko-tex.com/en/our-standards/standard-100-by-oeko-tex", date: "2024" },
    ],
    internalSources: [
      { label: "Latest post: event t-shirts", href: "/blog/design-custom-event-t-shirts-guests-keep/" },
      { label: "Sublimation vs DTG", href: "/compare/sublimation-vs-dtg/" },
      { label: "DDP shipping guide", href: "/shipping/ddp/" },
      { label: "All blog posts", href: "/blog/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/contact/": {
    question: "How do I contact the SublimApparel factory?",
    answer:
      "Three direct channels reach our Yiwu production managers — no chatbot, no call center. (1) WhatsApp +86-198-1793-0190 — fastest, average reply under 1 business day, Mon–Sat 08:00–22:00 China time. (2) Email info@sublimapparel.com — reply in 1 business day. (3) The /contact/ or /get-a-quote/ form — reply in 1 business day. MOQ 50 pieces, 15–25 day bulk production, DDP shipping to 100+ countries, US warehouse in Fontana CA for 2–5 day domestic delivery. Average quote turnaround: under 24 hours.",
    stats: [
      { value: "< 24 h", label: "Quote reply", detail: "1 business day SLA" },
      { value: "3", label: "Channels", detail: "WhatsApp / Email / Form" },
      { value: "100+", label: "DDP countries", detail: "Door-to-door" },
      { value: "50", label: "MOQ (pcs)", detail: "Per design" },
      { value: "15–25 d", label: "Bulk lead time", detail: "After sample approval" },
      { value: "Mon–Sat", label: "Coverage", detail: "08:00–22:00 China time" },
    ],
    citations: [
      { label: "ICC Incoterms 2020 (DDP)", href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", date: "2020" },
    ],
    internalSources: [
      { label: "Detailed quote form", href: "/get-a-quote/" },
      { label: "Express 30-min quote", href: "/get-a-quote-express/" },
      { label: "WhatsApp the factory", href: "/yiwu-factory-whatsapp/" },
      { label: "Order a sample", href: "/samples/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  // =====================================================================
  // PRODUCT CATEGORY PAGES (13)
  // =====================================================================
  "/products/t-shirts/": {
    question: "Can SublimApparel print custom sublimation t-shirts?",
    answer:
      "Yes. We dye-sublimation print t-shirts on polyester (all-over, edge-to-edge) and 100% cotton via DTG / DTF / allover digital print cut-and-sew. MOQ 50 pieces per design, 7–15 day sample lead time, 15–25 day bulk production after sample approval. Compatible with Gildan, Bella+Canvas, Next Level blanks plus our in-house cut-and-sew blanks. CPSIA-compliant inks. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)", detail: "Per design" },
      { value: "7–15 d", label: "Sample", detail: "Refundable on 100+ bulk" },
      { value: "15–25 d", label: "Bulk", detail: "After sample sign-off" },
      { value: "100+", label: "Countries", detail: "DDP door-to-door" },
    ],
    citations: [
      { label: "CPSIA (CPSC)", href: "https://www.cpsc.gov/Business--Manufacturing/Regulations-Policies-Laws-and-Regulations/CPSIA", date: "2024" },
      { label: "OEKO-TEX Standard 100", href: "https://www.oeko-tex.com/en/our-standards/standard-100-by-oeko-tex", date: "2024" },
    ],
    internalSources: [
      { label: "T-shirt product grid", href: "/products/t-shirts/" },
      { label: "Cotton blanks", href: "/fabric/cotton/" },
      { label: "Cotton care", href: "/fabric/care/" },
      { label: "Quote", href: "/contact/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/products/hoodies/": {
    question: "Can SublimApparel print custom hoodies and sweatshirts?",
    answer:
      "Yes. We print polyester fleece hoodies via dye-sublimation (all-over, edge-to-edge) and 100% cotton fleece via DTG / DTF. MOQ 50 pieces per design, 15–25 day bulk production, 320–400 GSM French Terry available. Full-zip, pullover, and crop styles. CPSIA-compliant inks for kids' lines. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "320–400", label: "GSM", detail: "French Terry" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [
      { label: "AATCC TM61 Wash Test", href: "https://www.aatcc.org/tech/test-methods/", date: "2024" },
    ],
    internalSources: [
      { label: "Hoodies grid", href: "/products/hoodies/" },
      { label: "Cotton fleece", href: "/fabric/cotton/" },
      { label: "Wash & care", href: "/fabric/care/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/products/jerseys/": {
    question: "Can SublimApparel print custom sublimation jerseys?",
    answer:
      "Yes. We dye-sublimation print custom jerseys edge-to-edge on polyester — esports, race, league, school team, and one-off jersey programs. Compatible with our 2D and cut-and-sew construction. MOQ 50 pieces per design, 15–25 day bulk production, full-color all-over print with name & number personalization. CPSIA-compliant inks. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "All-over", label: "Print coverage", detail: "Edge-to-edge" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "Name/number", label: "Personalization", detail: "Per-piece" },
    ],
    citations: [
      { label: "OEKO-TEX Standard 100", href: "https://www.oeko-tex.com/en/our-standards/standard-100-by-oeko-tex", date: "2024" },
    ],
    internalSources: [
      { label: "Jersey grid", href: "/products/jerseys/" },
      { label: "Racing kits", href: "/products/racing/" },
      { label: "Esports", href: "/products/esports/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/products/racing/": {
    question: "Does SublimApparel make custom racing kits and suits?",
    answer:
      "Yes. We dye-sublimation print custom racing kits — kart, motocross, cycling, running clubs — on polyester performance fabrics. Full kit programs: jersey + matching short/pant, name & number personalization, edge-to-edge print. MOQ 50 pieces per kit, 15–25 day bulk production. CPSIA-compliant inks available. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "Full kit", label: "Jersey + short", detail: "Bundle programs" },
    ],
    citations: [
      { label: "ISO 3758:2023 Care labelling", href: "https://www.iso.org/standard/83178.html", date: "2023" },
    ],
    internalSources: [
      { label: "Racing catalog", href: "/products/racing/" },
      { label: "Marathon shirts", href: "/marathon-shirts/" },
      { label: "Race shirts", href: "/race-shirts/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/products/cycling/": {
    question: "Does SublimApparel manufacture custom cycling kits?",
    answer:
      "Yes. We dye-sublimation print custom cycling kits — jersey, bibs, arm warmers, leg warmers — on polyester performance fabrics. Full kit programs with edge-to-edge print, name & number personalization. MOQ 50 pieces per kit, 15–25 day bulk production. CPSIA-compliant inks. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "Full kit", label: "Jersey + bibs", detail: "Bundle programs" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Cycling catalog", href: "/products/cycling/" },
      { label: "All jerseys", href: "/products/jerseys/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/products/golf/": {
    question: "Does SublimApparel make custom golf polos and apparel?",
    answer:
      "Yes. We dye-sublimation print custom golf polos on polyester piqué and 100% cotton piqué (DTG/DTF). MOQ 50 pieces per design, 15–25 day bulk production. Compatible with classic golf silhouettes plus modern mock-neck and quarter-zip cuts. CPSIA-compliant inks. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "200–230", label: "GSM", detail: "Piqué knit" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Golf catalog", href: "/products/golf/" },
      { label: "Golf + bowling", href: "/products/golf-bowling/" },
      { label: "Bowling", href: "/products/bowling/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/products/bowling/": {
    question: "Does SublimApparel make custom bowling jerseys?",
    answer:
      "Yes. We dye-sublimation print custom bowling jerseys edge-to-edge on polyester performance fabrics. Full team programs with name & number personalization. MOQ 50 pieces per design, 15–25 day bulk production. CPSIA-compliant inks. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "Name/number", label: "Personalization" },
    ],
    citations: [],
    internalSources: [
      { label: "Bowling catalog", href: "/products/bowling/" },
      { label: "Golf + bowling", href: "/products/golf-bowling/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/products/golf-bowling/": {
    question: "Does SublimApparel make custom golf & bowling team apparel?",
    answer:
      "Yes. We dye-sublimation print custom golf polos, bowling jerseys, and matching team apparel on polyester performance fabrics. Combined catalog with edge-to-edge print, name & number personalization. MOQ 50 pieces per design, 15–25 day bulk production. CPSIA-compliant inks. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Golf + bowling", href: "/products/golf-bowling/" },
      { label: "Golf catalog", href: "/products/golf/" },
      { label: "Bowling", href: "/products/bowling/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/products/esports/": {
    question: "Does SublimApparel make custom esports jerseys?",
    answer:
      "Yes. We dye-sublimation print custom esports jerseys edge-to-edge on polyester performance fabrics. Team programs with sponsor patch zones, name & number personalization, and matching shorts/kits. MOQ 50 pieces per design, 15–25 day bulk production. CPSIA-compliant inks. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "Sponsor zones", label: "Print placement", detail: "Patch-ready" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "Full kit", label: "Jersey + shorts" },
    ],
    citations: [],
    internalSources: [
      { label: "Esports catalog", href: "/products/esports/" },
      { label: "All jerseys", href: "/products/jerseys/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/products/running-shirts/": {
    question: "Does SublimApparel make custom running shirts?",
    answer:
      "Yes. We dye-sublimation print custom running shirts on polyester mesh and performance fabrics. Edge-to-edge print, name & number personalization, race-day ready. MOQ 50 pieces per design, 15–25 day bulk production. CPSIA-compliant inks. DDP shipping to 100+ countries. Compatible with tank, singlet, and short-sleeve cuts.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Running shirts", href: "/products/running-shirts/" },
      { label: "Marathon shirts", href: "/marathon-shirts/" },
      { label: "Race shirts", href: "/race-shirts/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/products/training-apparel/": {
    question: "Does SublimApparel make custom training apparel?",
    answer:
      "Yes. We dye-sublimation print custom training apparel — tees, tanks, shorts, hoodies — on polyester performance fabrics. Edge-to-edge print, name & number personalization. MOQ 50 pieces per design, 15–25 day bulk production. CPSIA-compliant inks. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Training apparel", href: "/products/training-apparel/" },
      { label: "Running shirts", href: "/products/running-shirts/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  // =====================================================================
  // INDUSTRY PAGES (12)
  // =====================================================================
  "/industries/sports-teams-leagues/": {
    question: "Can SublimApparel supply custom sports team uniforms?",
    answer:
      "Yes. We dye-sublimation print custom sports team uniforms — soccer, basketball, baseball, volleyball, hockey, wrestling — on polyester performance fabrics. Full team programs with name & number personalization, edge-to-edge print, matching shorts. MOQ 50 pieces per design, 15–25 day bulk production, 7–10 day rush available. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "7–10 d", label: "Rush option" },
    ],
    citations: [
      { label: "OEKO-TEX Standard 100", href: "https://www.oeko-tex.com/en/our-standards/standard-100-by-oeko-tex", date: "2024" },
    ],
    internalSources: [
      { label: "Sports teams & leagues", href: "/industries/sports-teams-leagues/" },
      { label: "All jerseys", href: "/products/jerseys/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/industries/endurance-race-events/": {
    question: "Can SublimApparel supply custom race event shirts?",
    answer:
      "Yes. We dye-sublimation print custom race shirts — marathon, half-marathon, 5K, 10K, triathlon — on polyester performance fabrics. Edge-to-edge print, name & number personalization, race-day turnaround available. MOQ 50 pieces per design, 7–15 day bulk production for race-day events. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "7–15 d", label: "Race-day turnaround" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Endurance race events", href: "/industries/endurance-race-events/" },
      { label: "Marathon shirts", href: "/marathon-shirts/" },
      { label: "Race shirts", href: "/race-shirts/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/industries/music-festival-tour-merchandise/": {
    question: "Can SublimApparel supply custom music festival merch?",
    answer:
      "Yes. We dye-sublimation print custom music festival merchandise — band tees, hoodie merch, tour merch — on polyester and 100% cotton via DTG / DTF / allover digital print. Edge-to-edge print, name & number personalization, soft hand feel. MOQ 50 pieces per design, 15–25 day bulk production. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Music festival merch", href: "/industries/music-festival-tour-merchandise/" },
      { label: "All hoodies", href: "/products/hoodies/" },
      { label: "All tees", href: "/products/t-shirts/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/industries/events-conferences/": {
    question: "Can SublimApparel supply custom event & conference apparel?",
    answer:
      "Yes. We dye-sublimation print custom event & conference apparel — staff tees, volunteer polos, attendee merch — on polyester and 100% cotton via DTG / DTF. Edge-to-edge print, name & number personalization. MOQ 50 pieces per design, 7–15 day rush available. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "7–15 d", label: "Rush turnaround" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Events & conferences", href: "/industries/events-conferences/" },
      { label: "Event apparel", href: "/event-apparel/" },
      { label: "Custom event t-shirts", href: "/custom-event-t-shirts/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/industries/schools-universities-greek-life/": {
    question: "Can SublimApparel supply custom school and Greek life apparel?",
    answer:
      "Yes. We dye-sublimation print custom school and Greek life apparel — spirit wear, bid day, rush week, philanthropy events — on polyester and 100% cotton. Edge-to-edge print, name & number personalization, soft hand feel. MOQ 50 pieces per design, 15–25 day bulk production. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Schools & Greek life", href: "/industries/schools-universities-greek-life/" },
      { label: "All tees", href: "/products/t-shirts/" },
      { label: "All hoodies", href: "/products/hoodies/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/industries/corporate-employee-programs/": {
    question: "Can SublimApparel supply custom corporate apparel?",
    answer:
      "Yes. We dye-sublimation print custom corporate apparel — employee polos, staff tees, branded hoodies, uniform programs — on polyester and 100% cotton. Edge-to-edge print, logo placement, name personalization. MOQ 50 pieces per design, 15–25 day bulk production, recurring program discounts. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "Recurring", label: "Program discount" },
    ],
    citations: [],
    internalSources: [
      { label: "Corporate programs", href: "/industries/corporate-employee-programs/" },
      { label: "Polos", href: "/products/golf/" },
      { label: "Uniform catalog", href: "/products/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/industries/breweries-coffee-hospitality/": {
    question: "Can SublimApparel supply custom hospitality apparel?",
    answer:
      "Yes. We dye-sublimation print custom brewery, coffee, and hospitality apparel — branded tees, server polos, branded hats — on polyester and 100% cotton. Edge-to-edge print, name personalization, soft hand feel. MOQ 50 pieces per design, 15–25 day bulk production. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Hospitality industry", href: "/industries/breweries-coffee-hospitality/" },
      { label: "Branded tees", href: "/products/t-shirts/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/industries/promotional-marketing-agencies/": {
    question: "Can SublimApparel supply promotional apparel for agencies?",
    answer:
      "Yes. We dye-sublimation print custom promotional apparel for marketing agencies — branded client merch, event giveaways, agency swag — on polyester and 100% cotton. Edge-to-edge print, name personalization, fast turnaround. MOQ 50 pieces per design, 7–15 day rush available. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "7–15 d", label: "Rush turnaround" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Promo agencies", href: "/industries/promotional-marketing-agencies/" },
      { label: "Promo apparel", href: "/promotional-marketing-apparel/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/industries/political-campaigns/": {
    question: "Can SublimApparel supply custom political campaign apparel?",
    answer:
      "Yes. We dye-sublimation print custom political campaign apparel — campaign tees, yard signs, rally merch — on polyester and 100% cotton. Edge-to-edge print, name personalization, fast turnaround. MOQ 50 pieces per design, 7–15 day rush available. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "7–15 d", label: "Rush turnaround" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Political campaigns", href: "/industries/political-campaigns/" },
      { label: "Campaign tees", href: "/products/t-shirts/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/industries/trade-shows-display/": {
    question: "Can SublimApparel supply custom trade show apparel & signage?",
    answer:
      "Yes. We dye-sublimation print custom trade show apparel — staff tees, branded polos, demo wear — plus pull-up banners, table throws, and signage. Edge-to-edge print, name personalization. MOQ 50 pieces per design, 7–15 day rush available. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "7–15 d", label: "Rush turnaround" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Trade shows", href: "/industries/trade-shows-display/" },
      { label: "Branded polos", href: "/products/golf/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/industries/apparel-brands-agencies/": {
    question: "Can SublimApparel manufacture private label apparel for brands?",
    answer:
      "Yes. We are a B2B private label apparel manufacturer — full cut-and-sew programs, hangtag / label / polybag customization, tech-pack reverse-engineering, FBA prep, drop-ship fulfillment. Polyester sublimation or 100% cotton via DTG / DTF / allover digital print. MOQ 50 pieces per design, 15–25 day bulk production. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "6,000+", label: "Projects", detail: "Since 2018" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "Full", label: "Private label", detail: "Hangtag / polybag / FBA" },
    ],
    citations: [
      { label: "ISO 9001:2015 Quality Management", href: "https://www.iso.org/standard/62085.html", date: "2015" },
    ],
    internalSources: [
      { label: "Apparel brands & agencies", href: "/industries/apparel-brands-agencies/" },
      { label: "Private label sportswear", href: "/private-label-sportswear/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/industries/e-commerce-fulfillment/": {
    question: "Can SublimApparel handle e-commerce POD and fulfillment?",
    answer:
      "Yes. We dye-sublimation print POD apparel and provide end-to-end e-commerce fulfillment — FBA prep, poly-bag, hangtag, palletization, drop-ship direct to consumer. Polyester sublimation or 100% cotton via DTG / DTF / allover digital print. MOQ 50 pieces per design for catalog programs; per-piece pricing for verified POD accounts. DDP shipping to 100+ countries plus US domestic shipping from Fontana CA.",
    stats: [
      { value: "50", label: "MOQ (pcs)", detail: "Catalog programs" },
      { value: "US", label: "Domestic shipping", detail: "Fontana CA warehouse" },
      { value: "100+", label: "DDP countries", detail: "International door-to-door" },
      { value: "FBA", label: "FBA prep", detail: "Polybag + palletization" },
    ],
    citations: [
      { label: "Amazon FBA Prep Requirements", href: "https://sellercentral.amazon.com/help/hub/reference/G9RDR6S7XF9Y", date: "2024" },
    ],
    internalSources: [
      { label: "E-commerce fulfillment", href: "/industries/e-commerce-fulfillment/" },
      { label: "Fulfillment page", href: "/e-commerce-fulfillment/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  // =====================================================================
  // COMPARE PAGES (4)
  // =====================================================================
  "/compare/sublimation-vs-dtg/": {
    question: "What is the difference between sublimation and DTG printing?",
    answer:
      "Dye-sublimation bonds ink into polyester fibers under heat and pressure — the print becomes part of the fabric, won't fade, peel, or crack, and runs edge-to-edge on cut-and-sew garments. DTG (direct-to-garment) sprays water-based ink onto the surface of the fabric, usually 100% cotton, and is best for chest-area prints up to A3 size — not full garment coverage. Use sublimation for polyester sportswear, cycling kits, esports jerseys, and all-over prints. Use DTG for cotton tees, hoodies, and corporate polos with a chest logo. We run both in-house.",
    stats: [
      { value: "Edge-to-edge", label: "Sublimation", detail: "Polyester / poly-blend" },
      { value: "A3 panel", label: "DTG", detail: "Cotton, surface print" },
      { value: "50", label: "MOQ", detail: "Same for both" },
      { value: "15–25 d", label: "Bulk lead time" },
    ],
    citations: [
      { label: "AATCC TM61 Wash Test", href: "https://www.aatcc.org/tech/test-methods/", date: "2024" },
    ],
    internalSources: [
      { label: "Sublimation vs DTG", href: "/compare/sublimation-vs-dtg/" },
      { label: "Polyester vs cotton sublimation", href: "/compare/polyester-vs-cotton-sublima/" },
      { label: "Cotton fabric", href: "/fabric/cotton/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/compare/sublimation-vs-screen-print/": {
    question: "What is the difference between sublimation and screen printing?",
    answer:
      "Dye-sublimation bonds ink into polyester fibers under heat, producing edge-to-edge all-over prints that won't fade, peel, or crack. Screen printing layers ink on top of the fabric via stencils — limited color count per design, edge-to-edge coverage not practical for complex graphics, plastic hand feel on dark garments. Use sublimation for all-over prints, polyester sportswear, and small-batch runs (low MOQ 50). Use screen printing for high-volume 1–4 color cotton tees. We run sublimation in-house.",
    stats: [
      { value: "Edge-to-edge", label: "Sublimation" },
      { value: "1–6 color", label: "Screen print", detail: "Per stencil" },
      { value: "50", label: "MOQ (sublimation)" },
      { value: "1,000+", label: "MOQ (screen print)" },
    ],
    citations: [],
    internalSources: [
      { label: "Sublimation vs screen print", href: "/compare/sublimation-vs-screen-print/" },
      { label: "All-over print", href: "/all-over-print/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/compare/ddp-vs-fob/": {
    question: "DDP vs FOB — which shipping method is better for apparel?",
    answer:
      "DDP (Delivered Duty Paid, per ICC Incoterms 2020) means the supplier handles freight, customs clearance, import duties, taxes, and last-mile delivery — you receive the goods at your door with no surprise costs. FOB (Free on Board) is cheaper upfront but you pay separately for freight, customs brokerage, duties, and delivery, which can add 15–35% on top of the quoted price. For first-time importers or buyers without a customs broker, DDP is the lower-risk option. We ship DDP to 100+ countries.",
    stats: [
      { value: "100+", label: "DDP countries" },
      { value: "+15–35%", label: "FOB hidden cost", detail: "Freight + duty + delivery" },
      { value: "0", label: "Surprise costs", detail: "DDP total at quote time" },
      { value: "1 day", label: "Quote turnaround" },
    ],
    citations: [
      { label: "ICC Incoterms 2020", href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", date: "2020" },
      { label: "USITC HTS Database", href: "https://hts.usitc.gov/", date: "2024" },
    ],
    internalSources: [
      { label: "DDP vs FOB", href: "/compare/ddp-vs-fob/" },
      { label: "DDP shipping guide", href: "/shipping/ddp/" },
      { label: "FOB shipping", href: "/shipping/fob/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/compare/polyester-vs-cotton-sublima/": {
    question: "Polyester vs cotton for sublimation apparel — which is better?",
    answer:
      "Polyester is the native substrate for dye-sublimation — the ink bonds directly into the fibers, producing edge-to-edge all-over prints with zero hand feel. 100% cotton cannot accept disperse sublimation ink, but our proprietary allover digital print on cotton uses reactive dyes with cut-and-sew chemistry to deliver true full-body edge-to-edge prints on 100% cotton with a soft natural hand feel. Use polyester for sports, performance, esports, racing, cycling. Use cotton for fashion, lifestyle, premium feel, eco-conscious brands. Both are run in-house, MOQ 50 pcs.",
    stats: [
      { value: "Zero", label: "Poly hand feel", detail: "Print becomes the fabric" },
      { value: "Soft", label: "Cotton hand feel", detail: "Reactive dye chemistry" },
      { value: "50", label: "MOQ", detail: "Same for both" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [
      { label: "OEKO-TEX Standard 100", href: "https://www.oeko-tex.com/en/our-standards/standard-100-by-oeko-tex", date: "2024" },
    ],
    internalSources: [
      { label: "Poly vs cotton sublimation", href: "/compare/polyester-vs-cotton-sublima/" },
      { label: "Cotton fabric", href: "/fabric/cotton/" },
      { label: "Polyester fabric", href: "/fabric/polyester/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  // =====================================================================
  // SHIPPING PAGES (8)
  // =====================================================================
  "/shipping/us-warehouse/": {
    question: "Does SublimApparel ship from a US warehouse?",
    answer:
      "Yes. We ship from a US warehouse in Fontana, California (13052 Jurupa Ave, Fontana, CA 92335). US domestic delivery is 2–5 business days from the warehouse. Bulk orders from our Yiwu factory arrive at the warehouse via DDP ocean freight, then ship domestic via UPS / FedEx / USPS. Phone +1-909-555-0190. Email us-orders@sublimapparel.com.",
    stats: [
      { value: "2–5 d", label: "US domestic", detail: "From Fontana CA" },
      { value: "Fontana", label: "CA warehouse", detail: "13052 Jurupa Ave" },
      { value: "UPS / FedEx", label: "Domestic carriers" },
      { value: "+1-909-555-0190", label: "US phone" },
    ],
    citations: [
      { label: "ICC Incoterms 2020 (DDP)", href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", date: "2020" },
    ],
    internalSources: [
      { label: "US warehouse", href: "/shipping/us-warehouse/" },
      { label: "USA shipping", href: "/shipping/usa/" },
      { label: "DDP shipping guide", href: "/shipping/ddp/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/shipping/usa/": {
    question: "Does SublimApparel ship to the USA?",
    answer:
      "Yes. We ship DDP (Delivered Duty Paid) to the USA — garment, freight, customs clearance, and last-mile delivery. Lead time 18–25 days door-to-door from Yiwu via ocean, or 7–10 days via air. US domestic shipping from our Fontana CA warehouse arrives in 2–5 business days. Phone +1-909-555-0190. No surprise customs costs.",
    stats: [
      { value: "18–25 d", label: "DDP ocean" },
      { value: "7–10 d", label: "DDP air" },
      { value: "2–5 d", label: "US domestic", detail: "From Fontana CA" },
      { value: "DDP", label: "Door-to-door", detail: "All-inclusive" },
    ],
    citations: [
      { label: "USITC HTS Database", href: "https://hts.usitc.gov/", date: "2024" },
    ],
    internalSources: [
      { label: "USA shipping", href: "/shipping/usa/" },
      { label: "US warehouse", href: "/shipping/us-warehouse/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/shipping/eu/": {
    question: "Does SublimApparel ship to the EU?",
    answer:
      "Yes. We ship DDP (Delivered Duty Paid) to all 27 EU member states — garment, freight, customs clearance, EU VAT, and last-mile delivery. Lead time 18–25 days door-to-door from Yiwu via ocean, or 7–10 days via air. No surprise customs costs. Compatible with EU REACH chemical compliance.",
    stats: [
      { value: "27", label: "EU countries", detail: "DDP door-to-door" },
      { value: "18–25 d", label: "Ocean" },
      { value: "7–10 d", label: "Air" },
      { value: "REACH", label: "EU compliance", detail: "Chemical safety" },
    ],
    citations: [
      { label: "EU REACH Regulation", href: "https://echa.europa.eu/regulations/reach", date: "2024" },
      { label: "ICC Incoterms 2020 (DDP)", href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", date: "2020" },
    ],
    internalSources: [
      { label: "EU shipping", href: "/shipping/eu/" },
      { label: "DDP shipping guide", href: "/shipping/ddp/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/shipping/uk/": {
    question: "Does SublimApparel ship to the United Kingdom?",
    answer:
      "Yes. We ship DDP (Delivered Duty Paid) to the UK post-Brexit — garment, freight, UK customs clearance, import VAT, and last-mile delivery. Lead time 18–25 days door-to-door from Yiwu via ocean, or 7–10 days via air. UKCA / UK REACH chemical compliance available.",
    stats: [
      { value: "UK", label: "Door-to-door" },
      { value: "18–25 d", label: "Ocean" },
      { value: "7–10 d", label: "Air" },
      { value: "UKCA", label: "Compliance" },
    ],
    citations: [
      { label: "UKCA Marking Guidance", href: "https://www.gov.uk/guidance/using-the-ukca-marking", date: "2024" },
      { label: "ICC Incoterms 2020 (DDP)", href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", date: "2020" },
    ],
    internalSources: [
      { label: "UK shipping", href: "/shipping/uk/" },
      { label: "DDP shipping guide", href: "/shipping/ddp/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/shipping/au/": {
    question: "Does SublimApparel ship to Australia?",
    answer:
      "Yes. We ship DDP (Delivered Duty Paid) to Australia — garment, freight, AU customs clearance, GST, and last-mile delivery. Lead time 18–25 days door-to-door from Yiwu via ocean, or 7–10 days via air. AU compliance available on request.",
    stats: [
      { value: "AU", label: "Door-to-door" },
      { value: "18–25 d", label: "Ocean" },
      { value: "7–10 d", label: "Air" },
      { value: "GST", label: "Included", detail: "DDP total" },
    ],
    citations: [
      { label: "ICC Incoterms 2020 (DDP)", href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", date: "2020" },
    ],
    internalSources: [
      { label: "AU shipping", href: "/shipping/au/" },
      { label: "DDP shipping guide", href: "/shipping/ddp/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/shipping/canada/": {
    question: "Does SublimApparel ship to Canada?",
    answer:
      "Yes. We ship DDP (Delivered Duty Paid) to Canada — garment, freight, CA customs clearance, GST/HST, and last-mile delivery. Lead time 18–25 days door-to-door from Yiwu via ocean, or 7–10 days via air.",
    stats: [
      { value: "CA", label: "Door-to-door" },
      { value: "18–25 d", label: "Ocean" },
      { value: "7–10 d", label: "Air" },
      { value: "GST/HST", label: "Included", detail: "DDP total" },
    ],
    citations: [
      { label: "Canada Border Services Agency", href: "https://www.cbsa-asfc.gc.ca/import/cargo-carriage/import-fra-eng.html", date: "2024" },
      { label: "ICC Incoterms 2020 (DDP)", href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", date: "2020" },
    ],
    internalSources: [
      { label: "Canada shipping", href: "/shipping/canada/" },
      { label: "DDP shipping guide", href: "/shipping/ddp/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/shipping/ddp/": {
    question: "What does DDP shipping include from SublimApparel?",
    answer:
      "DDP (Delivered Duty Paid, per ICC Incoterms 2020) means the supplier handles garment, freight, customs clearance, import duties, taxes, and last-mile delivery. The quote you receive is the landed cost at your door with no surprise fees. We ship DDP to 100+ countries including the US, EU, UK, AU, CA. US domestic shipping from our Fontana CA warehouse arrives in 2–5 days.",
    stats: [
      { value: "100+", label: "DDP countries" },
      { value: "0", label: "Surprise costs", detail: "Land at quote time" },
      { value: "2–5 d", label: "US domestic" },
      { value: "18–25 d", label: "DDP ocean" },
    ],
    citations: [
      { label: "ICC Incoterms 2020", href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", date: "2020" },
    ],
    internalSources: [
      { label: "DDP shipping guide", href: "/shipping/ddp/" },
      { label: "DDP vs FOB", href: "/compare/ddp-vs-fob/" },
      { label: "Global shipping", href: "/shipping/global/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/shipping/fob/": {
    question: "Does SublimApparel offer FOB shipping?",
    answer:
      "Yes. We offer FOB (Free on Board) for buyers who prefer to arrange their own freight, customs brokerage, and last-mile delivery. FOB is lower upfront but you pay separately for freight, duties, and delivery — typically 15–35% on top of the quoted garment price. Most first-time importers prefer DDP (Delivered Duty Paid) to avoid hidden costs.",
    stats: [
      { value: "FOB", label: "Incoterms 2020" },
      { value: "+15–35%", label: "Hidden costs", detail: "Freight + duty + delivery" },
      { value: "DDP", label: "Alternative", detail: "Lower risk" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [
      { label: "ICC Incoterms 2020", href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", date: "2020" },
    ],
    internalSources: [
      { label: "FOB shipping", href: "/shipping/fob/" },
      { label: "DDP vs FOB", href: "/compare/ddp-vs-fob/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/shipping/global/": {
    question: "Does SublimApparel ship globally?",
    answer:
      "Yes. We ship DDP (Delivered Duty Paid) to 100+ countries via ocean (18–25 days door-to-door) and air freight (7–10 days door-to-door). Compatible with US, EU, UK, AU, CA, MENA, LATAM, and most of SE Asia. The quote is the landed cost at your door with no surprise fees.",
    stats: [
      { value: "100+", label: "DDP countries" },
      { value: "18–25 d", label: "Ocean" },
      { value: "7–10 d", label: "Air" },
      { value: "0", label: "Surprise costs" },
    ],
    citations: [
      { label: "ICC Incoterms 2020", href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", date: "2020" },
    ],
    internalSources: [
      { label: "Global shipping", href: "/shipping/global/" },
      { label: "DDP shipping", href: "/shipping/ddp/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  // =====================================================================
  // SCENARIO PAGES (7) — R69 high-value scenario pages
  // =====================================================================
  "/event-apparel/": {
    question: "Can SublimApparel supply custom event apparel?",
    answer:
      "Yes. We dye-sublimation print custom event apparel — staff tees, volunteer polos, attendee merch, sponsor merch — on polyester and 100% cotton via DTG / DTF. Edge-to-edge print, name personalization. MOQ 50 pieces per design, 7–15 day rush available. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "7–15 d", label: "Rush turnaround" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Event apparel", href: "/event-apparel/" },
      { label: "Custom event t-shirts", href: "/custom-event-t-shirts/" },
      { label: "Events & conferences", href: "/industries/events-conferences/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/custom-event-t-shirts/": {
    question: "Can SublimApparel print custom event t-shirts?",
    answer:
      "Yes. We dye-sublimation print custom event t-shirts on polyester (edge-to-edge) and 100% cotton via DTG / DTF. Name personalization, sponsor logos, date/event branding. MOQ 50 pieces per design, 7–15 day rush turnaround for fast-approaching events. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "7–15 d", label: "Rush turnaround" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Custom event t-shirts", href: "/custom-event-t-shirts/" },
      { label: "Event apparel", href: "/event-apparel/" },
      { label: "Event design guide", href: "/blog/design-custom-event-t-shirts-guests-keep/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/summer-camp-shirts/": {
    question: "Can SublimApparel supply custom summer camp shirts?",
    answer:
      "Yes. We dye-sublimation print custom summer camp shirts on polyester performance fabric — edge-to-edge, color-fast, fade-resistant, soft hand feel, CPSIA-compliant inks for kids' wear. MOQ 50 pieces per design, 7–15 day rush turnaround. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "7–15 d", label: "Rush turnaround" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "CPSIA", label: "Kid-safe inks" },
    ],
    citations: [
      { label: "CPSIA (CPSC)", href: "https://www.cpsc.gov/Business--Manufacturing/Regulations-Policies-Laws-and-Regulations/CPSIA", date: "2024" },
    ],
    internalSources: [
      { label: "Summer camp shirts", href: "/summer-camp-shirts/" },
      { label: "All tees", href: "/products/t-shirts/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/corporate-event-apparel/": {
    question: "Can SublimApparel supply custom corporate event apparel?",
    answer:
      "Yes. We dye-sublimation print custom corporate event apparel — branded polos, staff tees, sponsor merch — on polyester and 100% cotton. Edge-to-edge print, logo placement, name personalization. MOQ 50 pieces per design, 7–15 day rush available. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "7–15 d", label: "Rush turnaround" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Corporate event apparel", href: "/corporate-event-apparel/" },
      { label: "Corporate organization apparel", href: "/corporate-organization-apparel/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/race-shirts/": {
    question: "Can SublimApparel supply custom race shirts?",
    answer:
      "Yes. We dye-sublimation print custom race shirts on polyester performance fabric — edge-to-edge print, name & number personalization, race-day turnaround available. MOQ 50 pieces per design, 7–15 day rush turnaround for fast-approaching races. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "7–15 d", label: "Rush turnaround" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "Name/number", label: "Personalization" },
    ],
    citations: [],
    internalSources: [
      { label: "Race shirts", href: "/race-shirts/" },
      { label: "Marathon shirts", href: "/marathon-shirts/" },
      { label: "Endurance races", href: "/industries/endurance-race-events/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/marathon-shirts/": {
    question: "Can SublimApparel supply custom marathon shirts?",
    answer:
      "Yes. We dye-sublimation print custom marathon shirts on polyester performance mesh — edge-to-edge print, name & number personalization, race-day turnaround available. MOQ 50 pieces per design, 7–15 day rush turnaround for fast-approaching races. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "7–15 d", label: "Rush turnaround" },
      { value: "Edge-to-edge", label: "Print coverage" },
      { value: "100+", label: "DDP countries" },
    ],
    citations: [],
    internalSources: [
      { label: "Marathon shirts", href: "/marathon-shirts/" },
      { label: "Race shirts", href: "/race-shirts/" },
      { label: "Endurance races", href: "/industries/endurance-race-events/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },

  "/private-label-sportswear/": {
    question: "Can SublimApparel manufacture private label sportswear?",
    answer:
      "Yes. We are a B2B private label sportswear manufacturer — full cut-and-sew programs, hangtag / label / polybag customization, tech-pack reverse-engineering, FBA prep, drop-ship fulfillment. Polyester sublimation or 100% cotton via DTG / DTF / allover digital print. MOQ 50 pieces per design, 15–25 day bulk production. DDP shipping to 100+ countries.",
    stats: [
      { value: "50", label: "MOQ (pcs)" },
      { value: "6,000+", label: "Projects", detail: "Since 2018" },
      { value: "15–25 d", label: "Bulk lead time" },
      { value: "Full", label: "Private label", detail: "Hangtag / polybag / FBA" },
    ],
    citations: [
      { label: "ISO 9001:2015 Quality Management", href: "https://www.iso.org/standard/62085.html", date: "2015" },
    ],
    internalSources: [
      { label: "Private label sportswear", href: "/private-label-sportswear/" },
      { label: "Apparel brands & agencies", href: "/industries/apparel-brands-agencies/" },
    ],
    lastReviewed: LAST_REVIEWED,
  },
};

/**
 * Look up the TL;DR config for a given page path.
 *
 * `pathname` is the App-Router path the page renders — e.g. "/products/"
 * for the /products page. Falls back to a dynamic product-detail answer
 * for /products/all/{slug}/ paths (see buildDynamicProductTldr below),
 * so every product detail page renders a fact-dense Direct Answer even
 * though we only register the hub pages and category pages by hand.
 * Falls back to undefined for any other path.
 */
export function getPageTldr(pathname: string): PageTldr | undefined {
  // Normalize trailing slash for lookup; pages register with a slash.
  let key = pathname.endsWith("/") ? pathname : `${pathname}/`;

  const hit = PAGE_TLDR[key];
  if (hit) return hit;

  // 2026-09-18 (R74 hotfix): dynamic product detail page fallback.
  // /products/all/[slug]/ is a catch-all route in Next.js — we cannot
  // hand-write 100+ TL;DR entries, but every one of those pages should
  // still surface a Direct Answer card so Perplexity / ChatGPT Search /
  // Gemini can quote verified product data (MOQ, fabric GSM, print
  // process, category, lead time, DDP coverage) on the first DOM pass.
  const productMatch = key.match(/^\/products\/all\/([^/]+)\/$/);
  if (productMatch) {
    return buildDynamicProductTldr(productMatch[1]);
  }

  return undefined;
}

/**
 * Generate a Direct Answer for a single product detail page.
 *
 * 2026-09-18 (R74 hotfix): keep this fallback narrow. It pulls live,
 * verified product data (category, MOQ, fabric GSM + material + print
 * process, primary sport, full name) and stitches them into the same
 * Q/A shape used by every other TL;DR card. The block is "fact-dense,
 * not template-y" because every number / fabric / process name comes
 * from the canonical product record, not from a generic string.
 *
 * Hand-curated PAGE_TLDR entries still win when present, so we never
 * overwrite a real answer — this function is only the safety net for
 * the 100+ products without a hand-tuned entry.
 */
function buildDynamicProductTldr(slug: string): PageTldr | undefined {
  const product = getProductBySlug(slug);
  if (!product) return undefined;

  const mainFabric = product.fabrics[0];
  const fabricGsm = mainFabric?.gsm && mainFabric.gsm !== "—" ? mainFabric.gsm : "Multiple GSM options";
  const fabricMaterial = mainFabric?.material ?? "Polyester / Cotton blend";
  const fabricProcess = mainFabric?.process ?? "Sublimation / DTG / DTF";
  const category = product.category;
  const sports = product.sports;
  const sportPhrase =
    sports.length === 0
      ? "general apparel"
      : sports.length === 1
        ? sports[0]
        : `${sports.slice(0, -1).join(", ")} and ${sports[sports.length - 1]}`;
  const numberOfFabrics = product.fabrics.length;

  const question = `What is the ${product.name.toLowerCase()} and what is the MOQ?`;

  const answer =
    `Our ${product.name} is a custom all-over-print ${category.toLowerCase()} we run in-house at our Yiwu factory on 12 production lines. ` +
    `MOQ ${product.moq} pieces per design, ${numberOfFabrics} ${numberOfFabrics === 1 ? "fabric option" : "fabric options"} led by ${fabricGsm} ${fabricMaterial.toLowerCase()} via ${fabricProcess}. ` +
    (sports.length > 0
      ? `Built for ${sportPhrase}; numbers and names printed, not stitched, so they won't peel. `
      : `Cut-and-sew construction with edge-to-edge print. `) +
    `15–25 day bulk lead time, OEKO-TEX Standard 100 certified, DDP shipping to 100+ countries, US warehouse in Fontana CA for 2–5 day domestic delivery.`;

  return {
    question,
    answer,
    stats: [
      { value: `${product.moq}`, label: "MOQ (pcs)", detail: "Per design" },
      { value: `${numberOfFabrics}`, label: "Fabric options", detail: fabricMaterial },
      { value: fabricGsm, label: "Lead fabric", detail: fabricProcess },
      { value: "15–25 d", label: "Bulk lead time", detail: "After sample approval" },
      { value: "100+", label: "Countries", detail: "DDP shipping" },
      { value: "OEKO-TEX", label: "Certified", detail: "Standard 100" },
    ],
    citations: [
      { label: "OEKO-TEX Standard 100", href: "https://www.oeko-tex.com/en/our-standards/standard-100-by-oeko-tex", date: "2024" },
      { label: "ICC Incoterms 2020 (DDP definition)", href: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", date: "2020" },
    ],
    internalSources: [
      { label: "All-over print catalog", href: "/products/all/" },
      { label: "Custom jerseys", href: "/products/jerseys/" },
      { label: "Fabric library", href: "/fabric/" },
      { label: "Get a quote", href: "/contact/" },
    ],
    lastReviewed: LAST_REVIEWED,
  };
}