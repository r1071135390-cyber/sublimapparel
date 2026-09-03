// Blog content for SublimApparel
// Each post has real, SEO-targeted content written for B2B apparel customers.

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category:"Industry Guide" |"Factory Stories" |"Case Study" |"Product Guide" |"Logistics";
  date: string; // ISO date
  readTime: string;
  author: string;
  coverImage: string;
  coverAlt: string;
  featured?: boolean;
  tags: string[];
  // For detail page
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  sections: { heading: string; paragraphs: string[] }[];
  keyTakeaways?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug:"what-is-sublimation-printing",
    title:"What Is Sublimation Printing? The Complete Guide for B2B Apparel",
    excerpt:
"Sublimation printing is the only decoration method that dyes fabric from the inside out. Learn how it works, when to use it, and why it's the gold standard for all-over print apparel.",
    category:"Industry Guide",
    date:"2026-06-01",
    readTime:"8 min read",
    author:"SublimApparel Team",
    coverImage:"/techniques/Sublimationprinting02.webp",
    coverAlt:"Custom sublimated t-shirt with edge-to-edge all-over print",
    featured: true,
    tags: ["sublimation","printing techniques","polyester","all-over print"],
    metaTitle: "What Is Sublimation Printing? Complete 2025 Guide",
    metaDescription:
"Sublimation printing explained: how it works, what fabrics to use, cost vs durability, and why it's the best method for all-over print apparel. MOQ 50 pcs, DDP worldwide.",
    intro: [
"If you've ever bought a polyester jersey, a cycling kit, or an esports uniform with vivid edge-to-edge artwork that didn't peel after 50 washes, you were looking at sublimation printing. It is the gold-standard method for full-coverage apparel — and the only decoration technique that can print edge to edge with no print area limits.",
"This guide explains exactly what sublimation printing is, how it works, when to use it (and when not to), and what it costs. We have been running industrial sublimation lines in our Yiwu factory for over a decade — everything below is from production experience, not textbook theory.",
    ],
    sections: [
      {
        heading:"How Sublimation Printing Works",
        paragraphs: [
"Sublimation uses heat to turn solid dye into a gas without passing through a liquid phase. The dye gas bonds with polyester fibers at the molecular level — so the print is not sitting on top of the fabric. It is part of the fabric. That is why sublimated prints never peel, crack, or fade for the life of the garment.",
"The process: your artwork is printed onto transfer paper using water-based sublimation ink. The paper is placed on the fabric and heat-pressed at around 200°C for 30 seconds. Under heat and pressure, the dye sublimates (solid → gas) and bonds with the polyester fibers. The transfer paper is removed, leaving the print behind.",
        ],
      },
      {
        heading:"What Fabrics Can You Sublimate?",
        paragraphs: [
"Sublimation only works on polyester — and the higher the polyester content, the more vibrant the result. 100% polyester gives the brightest, most color-accurate prints. Polyester blends (65/35, 50/50) work but with reduced vibrancy on the cotton portion.",
"Cotton does not accept sublimation dye. If you need an all-over print on cotton, you have two real options: (1) DTG, which has a smaller print area and is slower, or (2) DTF transfers, which work on any fabric but don't have the soft hand-feel of true sublimation.",
        ],
      },
      {
        heading:"Why Sublimation Is the Best Choice for All-Over Print",
        paragraphs: [
"Most decoration methods have a print area limit. Screen print is limited to a chest print or back print. Embroidery is limited to a small logo. Sublimation has no print area limit — you can print the entire garment, every panel, edge to edge.",
"This makes sublimation the only realistic option for: all-over print streetwear, full-coverage esports jerseys, cycling kits, racing suits, festival merch, and any design where the artwork is the garment. With our 1.9m wide-format printers, we can print full panels together so they align perfectly when sewn — no visible seams breaking up the design.",
        ],
      },
      {
        heading:"Cost, MOQ, and Lead Time",
        paragraphs: [
"Sublimation is cost-effective for runs as small as 50 pieces, with the price-per-piece dropping significantly at 200, 500, and 1,000+ piece runs. Setup is much lower than screen printing because there are no screens to make.",
"Lead time is typically 15-25 days including sampling. Sampling (1-3 strike-off pieces) takes 7-10 days. Bulk production after sample approval is 10-15 days for a 500-piece order.",
        ],
      },
      {
        heading:"When NOT to Use Sublimation",
        paragraphs: [
"Three situations where sublimation is not the right call: (1) 100% cotton garments — sublimation dye won't bond; (2) small chest-only prints on a tight budget — screen printing is cheaper at high volume; (3) premium logo decoration where you want a stitched texture — use embroidery instead.",
"If you are not sure which method fits your project, send us your design and garment spec. We will tell you the right method — even if it is not sublimation.",
        ],
      },
    ],
    keyTakeaways: [
"Sublimation dyes polyester fabric from the inside out — the print is permanent",
"No print area limits — true edge-to-edge full-coverage artwork",
"Best for: all-over print, esports, cycling, racing, streetwear, festival merch",
"MOQ 50 pieces, lead time 15-25 days, cost-effective at any run size",
    ],
  },
  {
    slug:"dtg-vs-dtf-which-is-better",
    title:"DTG vs DTF Printing: Which Is Better for Your Custom Apparel?",
    excerpt:
"DTG prints directly into fabric. DTF prints onto film first, then heat-presses. Both have their place. Here is how to choose — based on your fabric, design, and run size.",
    category:"Industry Guide",
    date:"2026-06-10",
    readTime:"7 min read",
    author:"SublimApparel Team",
    coverImage:"/techniques/DTGprinting03.webp",
    coverAlt:"DTG printed t-shirt on studio surface",
    tags: ["DTG","DTF","printing techniques","comparison"],
    metaTitle: "DTG vs DTF Printing 2025: Which Should You Choose?",
    metaDescription:
"DTG vs DTF printing — fabric compatibility, color vibrancy, durability, cost, MOQ compared. Real production data from a Yiwu apparel factory. Free quote.",
    intro: [
"DTG (Direct to Garment) and DTF (Direct to Film) are the two most common digital decoration methods for short-run custom apparel. They look similar from the outside — both produce full-color, photographic-detail prints with no screens. But the underlying process, fabric compatibility, durability, and cost are very different.",
"This guide breaks down the real-world differences between DTG and DTF, based on our production experience running both methods on the same factory floor. We will tell you when each one wins — and when neither is the right choice.",
    ],
    sections: [
      {
        heading:"How DTG Printing Works",
        paragraphs: [
"DTG uses a modified inkjet printer to apply water-based ink directly into the fibers of a cotton garment. There are no screens, no setup, no color limit. You can print a full-color photograph on a white t-shirt in a single pass.",
"DTG works best on 100% cotton or high-cotton blends (65%+ cotton). The ink is pre-treated for dark garments with a white underbase. The result is a soft-hand print that feels like part of the fabric.",
        ],
      },
      {
        heading:"How DTF Printing Works",
        paragraphs: [
"DTF prints the design onto a special transfer film first, then heat-presses the film onto the garment. The film carries the ink plus a hot-melt adhesive that bonds to almost any fabric — cotton, polyester, nylon, leather, performance blends.",
"DTF is the most versatile decoration method we offer. It works on fabric that DTG cannot print on, and on dark garments without the pre-treatment step. The trade-off: the print has a slightly more noticeable hand-feel than DTG, though modern DTF is much thinner than older plastisol transfers.",
        ],
      },
      {
        heading:"Head-to-Head Comparison",
        paragraphs: [
"Fabric compatibility: DTG wins on cotton, loses on polyester. DTF works on any fabric.",
"Hand-feel: DTG is softer, more like part of the fabric. DTF is slightly raised but much thinner than traditional transfers.",
"Durability: Both last 50+ washes. DTF is slightly more flexible on performance fabrics.",
"Cost: DTG is more expensive per piece but cheaper for very small runs (1-10 pieces). DTF is more cost-effective at 50+ pieces.",
"Setup: DTG has near-zero setup. DTF requires film printing and powder adhesive.",
        ],
      },
      {
        heading:"When to Choose DTG",
        paragraphs: [
"Choose DTG when: (1) you are printing on 100% cotton, (2) you want the softest possible hand-feel, (3) you need a one-off or very small run (1-10 pieces), (4) you are doing print-on-demand or made-to-order, (5) the design is photographic or has gradients.",
        ],
      },
      {
        heading:"When to Choose DTF",
        paragraphs: [
"Choose DTF when: (1) you are printing on a mix of fabric types (cotton + poly + nylon), (2) you need a faster, more cost-effective run of 50+ pieces, (3) you want more flexibility for performance or activewear, (4) you are decorating structured items like caps and bags.",
        ],
      },
      {
        heading:"When Neither Is the Right Choice",
        paragraphs: [
"If you want a true all-over print edge-to-edge — neither DTG nor DTF can do it. Use sublimation. If you need a premium logo decoration on a polo or cap — use embroidery. If you have a 5,000-piece run of simple graphics on cotton — use screen printing, it will be 3-5x cheaper than either.",
        ],
      },
    ],
    keyTakeaways: [
"DTG = softest hand-feel, only on cotton, best for 1-10 piece runs",
"DTF = works on any fabric, slightly raised hand-feel, best for 50+ piece runs",
"For true all-over print: use sublimation. For 5,000+ piece bulk: use screen printing",
"Send us your design — we will tell you the right method for free",
    ],
  },
  {
    slug:"what-is-ddp-shipping",
    title:"DDP Shipping Explained: How Chinese Factories Deliver to Your Door",
    excerpt:
"DDP (Delivered Duty Paid) means the price you are quoted is the price you pay. No surprise customs fees, no last-mile surprises. Here is how it works and why it matters for B2B.",
    category:"Logistics",
    date:"2026-06-20",
    readTime:"6 min read",
    author:"SublimApparel Team",
    coverImage:"/delivery-door.webp",
    coverAlt:"Package delivered to customer door with UPS delivery",
    tags: ["DDP","shipping","logistics","import duties"],
    metaTitle: "DDP Shipping Explained 2025: Door-to-Door B2B Guide",
    metaDescription:
"What is DDP shipping? How it works, who pays duties, and why it is the only safe way to import from China. Cost comparison vs FOB. Free quote from Yiwu factory.",
    intro: [
"If you have ever imported from China and been hit with an unexpected customs bill two weeks after delivery — you understand why DDP exists. DDP (Delivered Duty Paid) is the only shipping term that guarantees the price you are quoted is the price you pay. No surprise fees, no last-mile headaches.",
"This guide explains how DDP works, what it includes, what it costs, and when you should insist on it. We have been running DDP to the US, UK, EU, and Australia for over a decade from our Yiwu factory.",
    ],
    sections: [
      {
        heading:"What DDP Actually Means",
        paragraphs: [
"DDP is one of the Incoterms 2020 rules published by the International Chamber of Commerce. Under DDP, the seller takes on full responsibility for delivering the goods to the buyer's named destination — and pays all costs in transit, including duties, taxes, and customs clearance.",
"For you as a B2B buyer, this means: the price we quote includes everything from our factory floor to your door. No surprise customs bill, no separate freight forwarder invoice, no last-mile delivery charge. One price, one invoice, one delivery.",
        ],
      },
      {
        heading:"DDP vs FOB vs EXW",
        paragraphs: [
"EXW (Ex Works): you pay for everything from our factory door onward. Cheapest on paper, most expensive in practice if you don't have a US/EU customs broker.",
"FOB (Free On Board): we deliver to the origin port. You pay ocean freight, duties, customs, last-mile. Standard for large bulk orders.",
"DDP (Delivered Duty Paid): we deliver to your door. We pay ocean freight, duties, customs, last-mile. One price. The most expensive on paper, but the safest and most predictable.",
        ],
      },
      {
        heading:"What DDP Includes",
        paragraphs: [
"Our DDP quote includes: production, quality control, export packaging, ocean or air freight, US/EU customs clearance, import duties and taxes, last-mile delivery to your address, and basic insurance.",
"It does not include: unloading at your site (liftgate), inside delivery, or customs duties on restricted items (some branded goods require special clearance).",
        ],
      },
      {
        heading:"How Much Does DDP Cost?",
        paragraphs: [
"DDP is typically 8-15% more expensive than FOB on a like-for-like basis, because the factory absorbs the freight, duty, and customs risk. For a 500-piece apparel order to the US, the total DDP premium is usually $300-800 — a small price for the certainty of a single landed cost.",
"For smaller orders, DDP is often cheaper than FOB because you don't pay for your own customs broker ($150-300 per entry) or freight forwarder coordination.",
        ],
      },
      {
        heading:"When to Use DDP",
        paragraphs: [
"DDP is the right choice when: (1) you are ordering under 1,000 pieces, (2) you don't have a US/EU customs broker, (3) you want one predictable landed cost for budgeting, (4) you are selling to end customers who expect transparent pricing, (5) you are time-constrained and can't wait for a separate freight quote.",
"FOB is the right choice when: (1) you have a standing freight forwarder relationship, (2) you are ordering 5,000+ pieces and want to negotiate your own freight rates, (3) you have an FTZ or bonded warehouse where you want to defer duty.",
        ],
      },
    ],
    keyTakeaways: [
"DDP = one price, one invoice, one delivery, all duties included",
"Best for: under 1,000 piece orders, no customs broker, predictable budgeting",
"Adds 8-15% over FOB but eliminates surprise customs bills",
"We run DDP to US, UK, EU, AU from our Yiwu factory — quote includes everything",
    ],
  },
  {
    slug:"yiwu-factory-tour",
    title:"Inside Our Yiwu Factory: 2,000 m² of Sublimation, Embroidery, and Quality Control",
    excerpt:
"Take a tour of our 2,000 m² production facility in Yiwu — from fabric warehouse to 1.9m wide-format printers to 100% final QC. See how a real Chinese apparel factory operates.",
    category:"Factory Stories",
    date:"2026-07-05",
    readTime:"10 min read",
    author:"SublimApparel Team",
    coverImage:"/factory-floor.webp",
    coverAlt:"Row of sublimation printers in our Yiwu factory",
    tags: ["factory tour","Yiwu","manufacturing","behind the scenes"],
    metaTitle: "Inside Our Yiwu Apparel Factory: 2,000m² Tour 2025",
    metaDescription:
"Full tour of our 2,000 m² Yiwu sublimation apparel factory. See our printers, embroidery lines, QC process, and 200+ skilled workers. Photos, video, and what to expect.",
    intro: [
"Most B2B apparel websites show a stock photo of a 'factory' and call it a day. We are going to do the opposite — give you a real, detailed walkthrough of our 2,000 m² production facility in Yiwu, China. From the fabric warehouse to the loading dock, here is what happens on our floor every day.",
"Yiwu is the small-commodity capital of the world, located 1.5 hours south of Hangzhou on the high-speed rail. Our factory sits in the Yiwu Industrial Park, with 200+ skilled workers across printing, embroidery, cutting, sewing, and quality control.",
    ],
    sections: [
      {
        heading:"Section 1: Fabric Warehouse (250 m²)",
        paragraphs: [
"We stock 50+ base fabrics in our on-site warehouse: polyester, polyester-cotton blends, performance moisture-wicking, French terry, fleece, and specialty knits. Most orders ship from stock, eliminating 2-3 week fabric sourcing delays.",
"Every roll of fabric is inspected on receipt — we check weight (GSM), hand-feel, color consistency, and any weaving defects. Only about 5% of incoming rolls pass our initial inspection on the first check. The rest are returned to the mill for replacement.",
        ],
      },
      {
        heading:"Section 2: Sublimation Print Hall (500 m²)",
        paragraphs: [
"We run four 1.9m wide-format sublimation printers in our dedicated print hall. Each printer runs 24/7 during peak season, producing up to 800 linear meters of printed fabric per day across all four units combined.",
"All sublimation printing happens in a climate-controlled room (22°C, 50% humidity) to ensure consistent ink transfer. Fabric moves from printer → heat press → cut station in a linear flow, with quality checkpoints between every step.",
        ],
      },
      {
        heading:"Section 3: Embroidery Hall (350 m²)",
        paragraphs: [
"Our embroidery hall runs 18 multi-head commercial embroidery machines supporting flat stitch, 3D puff, appliqué, and specialty thread effects. We stock 200+ thread colors with Pantone matching within 24 hours.",
"Cap embroidery, polo embroidery, and jacket embroidery are run on separate machine clusters optimized for each item type. This keeps setup time down and lets us run different items in parallel without cross-contamination.",
        ],
      },
      {
        heading:"Section 4: Cut and Sew Floor (600 m²)",
        paragraphs: [
"Our cut-and-sew floor handles the assembly of every garment we print. We use CNC fabric cutters for precise panel cutting, then 30+ industrial sewing machines for assembly. Each seam, hem, and detail is sewn in-house — no subcontracting.",
"Line setup is optimized per order: a typical 500-piece sublimation jersey run takes 8-10 days from cut to packed garment, with quality checkpoints at cut, sew-1, sew-2, and final assembly.",
        ],
      },
      {
        heading:"Section 5: Quality Control and Packing (300 m²)",
        paragraphs: [
"Every garment goes through 100% final inspection under professional lighting before packing. Our QC team checks: print quality, color match against approved sample, stitching integrity, measurement against spec, and any fabric defects.",
"After inspection, garments are individually poly-bagged, then packed in export cartons with internal dividers. We can pack by size run, single-size per carton, or retail-ready (folded with size sticker) — whatever your downstream process needs.",
        ],
      },
      {
        heading:"Section 6: Shipping and Logistics",
        paragraphs: [
"Our shipping department coordinates DDP to 50+ countries. We have standing relationships with DHL, FedEx, UPS, and major ocean freight lines. For US customers, we maintain a US warehouse in Los Angeles for fast in-country fulfillment.",
"Most orders ship within 24-48 hours of final QC. Standard DDP transit time is 7-12 days air or 25-35 days ocean to the US. We can expedite for time-sensitive projects.",
        ],
      },
    ],
    keyTakeaways: [
"2,000 m² facility, 200+ workers, 6 production zones",
"50+ base fabrics stocked on-site for fast turnaround",
"4 wide-format sublimation printers running 24/7 in peak season",
"100% final QC under professional lighting before packing",
"DDP shipping to 50+ countries, US warehouse for fast fulfillment",
    ],
  },
  {
    slug:"how-to-choose-fabric-for-esports-jersey",
    title:"How to Choose the Right Fabric for Your Esports Jersey",
    excerpt:
"The wrong fabric choice can ruin an otherwise great esports jersey. Here is what pro teams and tournament organizers use — and what to avoid for performance, comfort, and print quality.",
    category:"Product Guide",
    date:"2026-07-15",
    readTime:"7 min read",
    author:"SublimApparel Team",
    coverImage:"/esports-jersey-prodigy.webp",
    coverAlt:"Custom esports jersey with all-over sublimation print",
    tags: ["esports","fabric guide","polyester","jersey design"],
    metaTitle: "Best Fabric for Esports Jerseys 2025: Pro Team Guide",
    metaDescription:
"What fabric should you use for an esports jersey? Polyester vs blends, GSM, moisture-wicking, and what pro teams actually wear. Guide from a Yiwu sublimation factory.",
    intro: [
"Esports jerseys are not just team merch — they are performance apparel. Players sit in climate-controlled studios for 8-12 hours straight, often under hot stage lights. The wrong fabric choice leads to discomfort, sweat stains, and a jersey that looks tired after one wash.",
"This guide explains what fabric esports teams and tournament organizers should use, what GSM (grams per square meter) works best, and what to avoid. We have made jerseys for 100+ esports teams and tournaments — everything below is based on what actually performs.",
    ],
    sections: [
      {
        heading:"The One Rule: 100% Polyester for Sublimation",
        paragraphs: [
"If you want true all-over print, edge-to-edge artwork, vibrant colors that don't fade, and a print that lasts the life of the garment — 100% polyester is the only choice. The sublimation dye bonds with polyester fibers, giving you everything sublimation is known for.",
"Avoid cotton and cotton-blend jerseys. The sublimation print will be washed-out and patchy on cotton. Screen printing on a cotton jersey will give you a chest print only, no all-over artwork. For esports, polyester is non-negotiable.",
        ],
      },
      {
        heading:"GSM: What Weight Works Best?",
        paragraphs: [
"GSM (grams per square meter) is the standard measure of fabric weight. For esports jerseys, we recommend 140-160 GSM. This is light enough for breathability and comfort under hot stage lights, but heavy enough to drape well and not look cheap.",
"Below 130 GSM: too thin, looks see-through, doesn't drape properly. Above 180 GSM: too heavy for stage wear, players get hot. The 140-160 GSM range is the sweet spot.",
        ],
      },
      {
        heading:"Moisture-Wicking vs Regular Polyester",
        paragraphs: [
"Moisture-wicking polyester (also called performance polyester or coolmax) pulls sweat away from the skin and dries faster than regular polyester. It is more expensive, but for competitive esports where players are under hot lights for hours, the comfort difference is noticeable.",
"For tournament jerseys (where players wear them once or twice during an event), regular polyester is fine. For team practice jerseys (where players wear them 3-4 times a week), moisture-wicking is worth the upgrade.",
        ],
      },
      {
        heading:"Stitching and Construction",
        paragraphs: [
"Esports jerseys are subjected to lots of arm movement (leaning forward, celebrating, mouse-clenching). The stitching needs to hold up. We use flatlock seams on the side panels and shoulder seams — they lie flat against the skin and don't chafe under movement.",
"Avoid jerseys with raised seams or cheap overlock stitching in stress areas. They will pop after a few wears. Always ask for samples and stress-test the seams before bulk production.",
        ],
      },
      {
        heading:"What to Avoid",
        paragraphs: [
"Cotton or cotton-blend fabrics (no all-over sublimation). Polyester below 130 GSM (too thin). Raised seams in stress areas (will pop). V-neck or scoop neck (pro teams prefer crew or mock neck for stage photos). Matte fabric for the inside (smooth interior feels better on the skin).",
"Cheap thread that doesn't match the fabric color (visible on inside seams). Stiff collars that lose shape after washing. Buttons on jerseys (snag on headsets and armrests).",
        ],
      },
    ],
    keyTakeaways: [
"100% polyester, 140-160 GSM, moisture-wicking for practice jerseys",
"Flatlock seams on side and shoulder panels",
"Avoid cotton, thin fabric, raised seams, buttons",
"Order samples first, stress-test seams before bulk production",
    ],
  },
  {
    slug:"moq-explained-apparel-manufacturing",
    title:"Why MOQ Matters (and Why Our 50-Piece Minimum Is Real)",
    excerpt:
"MOQ is the smallest order a factory will run. It exists for a reason — and a 50-piece MOQ is genuinely small for custom apparel. Here is how MOQ works and how to keep costs down at low quantities.",
    category:"Industry Guide",
    date:"2026-07-25",
    readTime:"5 min read",
    author:"SublimApparel Team",
    coverImage:"/printer-closeup.webp",
    coverAlt:"Sublimation printer close-up showing color detail",
    tags: ["MOQ","minimum order","apparel manufacturing","pricing"],
    metaTitle: "MOQ Explained: Real Minimums for Custom Apparel 2025",
    metaDescription:
"What is MOQ in apparel manufacturing? Why 50 pieces is genuinely small, how to keep costs down at low quantities, and what other factories won't tell you. Free quote.",
    intro: [
"MOQ (Minimum Order Quantity) is the smallest order a factory will run for a custom design. If you have ever shopped for custom apparel and been told 'our MOQ is 500 pieces' — that is the factory protecting itself from the setup cost of small runs. Our 50-piece MOQ is genuinely small for the industry. Here is why MOQ exists and how to make the most of low-volume orders.",
    ],
    sections: [
      {
        heading:"Why Factories Have MOQ",
        paragraphs: [
"Every custom apparel order has a fixed setup cost — screens for screen print, transfer film for DTF, thread cones for embroidery, fabric sourcing, sampling, and machine setup. For a 50-piece order, that setup cost is divided across 50 pieces. For a 500-piece order, across 500.",
"At very small runs (under 50 pieces), the per-piece cost is dominated by setup — making the order unprofitable for the factory and expensive for the customer. MOQ is the smallest order where the per-piece price is still reasonable.",
        ],
      },
      {
        heading:"Our MOQ by Technique",
        paragraphs: [
"50 pieces: sublimation, screen printing, embroidery, DTF, DTG, rhinestone, foil, all-over print.",
"100 pieces: 3D puff, 3D embroidery, applique, terry embroidery, silicone, flocking, glitter, reflective, metallic.",
"30 pieces: DTG and DTF can drop to 30 pieces for simple designs on stocked blank garments.",
"No minimum: pure print-on-demand (we handle the inventory and ship to your end customers).",
        ],
      },
      {
        heading:"How to Keep Costs Down at Low Quantities",
        paragraphs: [
"Use blank garments from our stocked fabric library (saves fabric sourcing time). Stick to one or two decoration techniques (mixing techniques adds setup). Reuse your previous design's screens or transfer files (saves setup cost). Order in groups (combine multiple designs in one production run).",
        ],
      },
      {
        heading:"When to Push for Lower MOQ",
        paragraphs: [
"If you are launching a new brand and don't yet have demand, ask the factory about sample runs or pre-production samples. We can run as few as 3-5 pieces for samples, charged at a premium per-piece rate. This lets you validate the design before committing to a 50+ piece bulk order.",
        ],
      },
    ],
    keyTakeaways: [
"MOQ protects both factory and customer from unprofitable low-volume runs",
"Our 50-piece MOQ is genuinely small for custom sublimation apparel",
"Stick to one decoration technique, use stocked fabrics, to keep small-run costs down",
"Sample runs of 3-5 pieces are available at premium per-piece pricing",
    ],
  },
  {
    slug:"cycling-jersey-fabric-guide",
    title:"Cycling Jersey Fabric Guide: What Pro Teams Wear and Why",
    excerpt:
"Cycling jerseys are technical apparel — the wrong fabric choice leads to discomfort on a 100km ride. Here is what to look for, from GSM to weave structure to moisture management.",
    category:"Product Guide",
    date:"2026-08-03",
    readTime:"6 min read",
    author:"SublimApparel Team",
    coverImage:"/golf-polo-navy.webp",
    coverAlt:"Custom cycling jersey in studio",
    tags: ["cycling","jersey fabric","performance","polyester"],
    metaTitle: "Cycling Jersey Fabric Guide 2025: Pro Team Standards",
    metaDescription:
"What fabric do pro cycling teams use? GSM, weave, moisture management, UV protection — full guide from a Yiwu sublimation factory. Free sample pack on request.",
    intro: [
"A cycling jersey is not a t-shirt with a zip. It is technical apparel engineered for 4-8 hours of sustained effort, sweat, sun exposure, and aerodynamic drag. The wrong fabric choice will leave the rider uncomfortable, sweaty, and chafed. Here is what the pros use, and how to spec the right fabric for your custom cycling jersey.",
    ],
    sections: [
      {
        heading:"The Right Polyester for Cycling",
        paragraphs: [
"All pro cycling jerseys are 100% polyester — the sublimation print is the entire design, so the fabric has to accept dye. The standard weight is 120-140 GSM: light enough to be aerodynamic and breathable, heavy enough to drape well and not look see-through.",
"For cooler-weather jerseys (spring/fall), we use 160-180 GSM with a brushed interior for warmth. For hot-weather and racing jerseys, we use 110-130 GSM with a mesh side panel for ventilation.",
        ],
      },
      {
        heading:"Moisture Management and Quick-Dry",
        paragraphs: [
"Pro jerseys use hydrophobic polyester (moisture-wicking) that pulls sweat away from the skin to the fabric surface, where it evaporates. The result: the rider feels dry even after 2-3 hours of climbing.",
"Avoid hydrophilic treatments (which absorb sweat) — they feel wet and stay wet. Quick-dry tests are simple: drop water on the fabric, it should spread and evaporate in under 30 seconds, not sit in a bead.",
        ],
      },
      {
        heading:"UV Protection",
        paragraphs: [
"For outdoor cycling, UPF 30+ is a minimum. UPF 50+ is standard for pro team kits. The tighter the weave, the better the UV protection. Our 140 GSM pro jersey fabric is UPF 50+ rated.",
        ],
      },
      {
        heading:"Stitching and Aerodynamics",
        paragraphs: [
"Pro jerseys use flatlock seams everywhere — they lie flat against the skin and don't chafe under sustained effort. The hem is held in place by silicone gripper elastic (not regular elastic which can pinch). Sleeves use raw-cut or laser-cut edges for aerodynamics.",
"Avoid jerseys with raised overlock seams in the side or shoulder — they will chafe on a long ride. Always stress-test samples before bulk production.",
        ],
      },
    ],
    keyTakeaways: [
"100% polyester, 120-140 GSM for summer, 160-180 GSM for spring/fall",
"Hydrophobic moisture-wicking, not hydrophilic (sweat-absorbing)",
"UPF 30+ minimum, UPF 50+ for pro team kits",
"Flatlock seams, silicone gripper hems, raw-cut or laser-cut sleeve edges",
    ],
  },
  {
    slug:"screen-printing-vs-embroidery",
    title:"Screen Printing vs Embroidery: When to Use Each on Your Apparel",
    excerpt:
"Screen printing and embroidery are the two workhorses of custom apparel decoration. They look different, cost different, and last different. Here is how to pick the right one for your project.",
    category:"Industry Guide",
    date:"2026-08-10",
    readTime:"6 min read",
    author:"SublimApparel Team",
    coverImage:"/techniques/Embroidery07.webp",
    coverAlt:"Custom embroidered polo shirt logo",
    tags: ["screen printing","embroidery","decoration","logos"],
    metaTitle: "Screen Printing vs Embroidery 2025: Which Is Right?",
    metaDescription:
"Screen printing or embroidery? Compare cost, durability, fabric compatibility, MOQ, and best use cases. Real pricing data from a Yiwu factory. Free quote.",
    intro: [
"Screen printing and embroidery are the two most common decoration methods for custom apparel. Together, they cover 80% of all logo-decorated apparel in the world. They look different, cost different, and last different — and choosing the right one for your project can save you money and get you a better result.",
    ],
    sections: [
      {
        heading:"Screen Printing: The Workhorse",
        paragraphs: [
"Screen printing pushes ink through a fine mesh screen onto fabric, one color at a time. It is the most cost-effective method for high-volume runs with limited colors (under 6). Plastisol ink sits on top of the fabric (vibrant, durable, slightly raised). Water-based ink dyes the fabric (soft hand, vintage look).",
"Best for: band merch, sports team uniforms, corporate giveaways, event t-shirts. Works on most fabrics. Cost-effective at 200+ pieces. MOQ 50 pieces. Lead time 10-20 days.",
        ],
      },
      {
        heading:"Embroidery: The Premium Choice",
        paragraphs: [
"Embroidery stitches the design into the fabric using threads of precise Pantone-matched colors. The result is a raised, textured, professional look that conveys quality. Stitches last the life of the garment — no fading, no peeling, no cracking.",
"Best for: corporate logos on polos and caps, sports team caps, premium retail, club merchandise. Works on caps, polos, jackets, bags, patches. Cost-effective at any run size. MOQ 50 pieces. Lead time 10-20 days.",
        ],
      },
      {
        heading:"Cost Comparison",
        paragraphs: [
"Screen printing: lower per-piece cost at high volume. Setup cost ~$30-50 per color. Best price per piece at 500+ piece runs.",
"Embroidery: higher per-piece cost but flat regardless of volume. Setup cost ~$25 one-time digitizing fee. Best value at 50-200 pieces.",
"For a 500-piece run of a 2-color logo on cotton t-shirts: screen print is ~$3-4 per piece, embroidery is ~$5-7 per piece on a polo.",
        ],
      },
      {
        heading:"When to Use Each (and When to Combine)",
        paragraphs: [
"Use screen printing for: bold graphics, large designs, all-over or chest prints on cotton/garment-dyed tees, anything under 6 colors at 200+ pieces.",
"Use embroidery for: logos on polos, caps, jackets, bags, patches, premium corporate apparel, anywhere you want a stitched-in quality look.",
"Combine them: many premium garments use embroidery for the chest logo and screen print for the back design. This is the most common setup for sports team uniforms and corporate wear.",
        ],
      },
    ],
    keyTakeaways: [
"Screen print: cost-effective at 200+ pieces, best for bold graphics and cotton",
"Embroidery: premium look, flat per-piece cost, best for logos on polos/caps",
"Combine them: embroidery chest logo + screen print back design is the most popular setup",
"Send us your design and we will recommend the right method for free",
    ],
  },
  {
    slug:"how-to-prepare-artwork-files-for-sublimation",
    title:"How to Prepare Artwork Files for Sublimation Printing (AI, EPS, PDF, PSD)",
    excerpt:
"Bad artwork files are the #1 reason sublimation prints come out wrong. Here is the exact file setup we ask every B2B client to follow — and the mistakes that delay 80% of first-time orders.",
    category:"Product Guide",
    date:"2026-08-18",
    readTime:"7 min read",
    author:"SublimApparel Team",
    coverImage:"/designer-workstation.webp",
    coverAlt:"Designer workstation with vector artwork and sublimation fabric swatches",
    tags: ["artwork preparation","vector file","sublimation","file formats","design tips","pre-production"],
    metaTitle: "How to Prepare Artwork Files for Sublimation Printing (2025 Guide)",
    metaDescription:
"Step-by-step guide to preparing AI, EPS, PDF, and PSD files for sublimation printing. DPI, color mode, embedding, bleed, and the 5 most common mistakes that delay production. Free template.",
    intro: [
"Sublimation printing rewards clean, well-built artwork and punishes sloppy files. Because the ink dyes the polyester fibers, every pixel of your file ends up on the fabric — there is no ink layer to hide behind, no thread to mask with, no plate to engrave differently. What you send is what you get.",
"This guide walks you through the exact artwork specifications we ask every B2B client to follow. It is the same checklist our pre-press team uses when we review incoming files, and following it will cut your first-sample approval time in half.",
    ],
    sections: [
      {
        heading:"1. Pick the Right File Format",
        paragraphs: [
"Best formats (in order of preference):",
"AI (.ai) — Adobe Illustrator native. Best for vector logos, type, and any flat color artwork. Editable, scalable to any garment size without quality loss.",
"EPS (.eps) — universal vector format. Works in every pre-press software. Use this if you don't have AI.",
"PDF (.pdf) — vector PDF with text outlined and images embedded. Industry standard for production files. Use \"Press Quality\" or \"PDF/X-4\" preset when exporting.",
"PSD (.psd) — Photoshop native. Best for full-color photo-realistic designs and all-over prints. Keep layers intact and flattened only as a final step.",
"SVG (.svg) — modern vector format. Works for simple web-style designs. Not preferred for production but acceptable for sample-stage files.",
"Formats to avoid: JPG/PNG (raster — quality degrades with scaling), DOC/PPTX (not for production), low-res screenshots, flattened bitmaps below 150 DPI.",
        ],
      },
      {
        heading:"2. Set Up Your Document Correctly",
        paragraphs: [
"Use the actual garment size at 1:1 scale. If you are printing a design on a 30 cm wide x 40 cm tall print area on the front of a t-shirt, set your document to 30 x 40 cm (or the equivalent in mm/inches). Do not design at A4 and assume we will scale it.",
"Resolution for raster elements: 150 DPI at final print size is the minimum. 200-300 DPI is preferred for photo elements. Lower than 150 DPI will produce visible pixelation, especially on small text or fine details.",
"Color mode: CMYK for accurate print color matching, or RGB if you are okay with the printer's automatic conversion. Avoid spot colors (Pantone) unless you specifically request Pantone-matching inks (extra cost).",
"Bleed: extend any background colors or edge-to-edge designs 3-5 mm past the cut line. Sublimation is usually a panel print with sewn seams, so bleed helps cover minor alignment shifts between panels.",
        ],
      },
      {
        heading:"3. Embed or Outline Everything",
        paragraphs: [
"Two things cause 80% of production delays: missing fonts and missing images.",
"For fonts: either embed them in the PDF (check the box when exporting) or convert all text to outlines / paths before sending. Outlined text cannot be edited, so save a separate editable version for yourself and send the outlined version to us.",
"For images: place all images into the document at final size and resolution. Do not link to external files. Do not send a folder of loose images alongside the main file. Embed everything into one self-contained master file.",
"If you send a layered PSD, keep all text layers editable and all images embedded. Do not flatten until we confirm the design.",
        ],
      },
      {
        heading:"4. Color Management and Pantone Matching",
        paragraphs: [
"Sublimation printers produce millions of colors, but not every color on screen is reproducible. Bright neons, metallic inks, and very dark blacks often shift slightly on fabric.",
"For critical brand colors: provide a Pantone (PMS) reference. We will color-match the print to the closest reproducible Pantone. Note that on polyester, the color will look slightly different than on paper — fabric absorbs ink differently than coated stock.",
"For dark colors: avoid pure black (CMYK 0,0,0,100). Use rich black (CMYK 60,40,40,100) for a deeper, more saturated black on fabric.",
"For white elements: they will not print. The white you see on the final garment is the white of the polyester fabric. If your design has white text or elements, just leave those areas transparent in the file.",
        ],
      },
      {
        heading:"5. Common Mistakes That Delay Production",
        paragraphs: [
"Mistake 1: Sending a low-res JPG. We have to redraw or upscale the artwork, adding 2-3 days to the sample timeline. Start with a 1:1 vector or 200+ DPI raster.",
"Mistake 2: Not outlining the text. We don't have your custom font. The file opens with substituted fonts and the layout shifts. Always outline text before sending.",
"Mistake 3: Forgetting the back of the garment. Many clients send a beautiful front design and forget they also need artwork for the back, sleeves, or collar. Specify all print locations in one file or label layers clearly.",
"Mistake 4: Designing on a transparent background but expecting a white background. We print what you give us. If the background is transparent, the garment color shows through.",
"Mistake 5: Sending artwork at the wrong scale. A logo designed for a business card is 5 cm wide. The same logo printed 30 cm wide on a jersey will look pixelated. Always design at final print size.",
        ],
      },
      {
        heading:"6. Our Free Artwork Template",
        paragraphs: [
"We provide a free Adobe Illustrator template with pre-set artboards for every garment type we make — t-shirts, polos, hoodies, jerseys, tank tops, and shorts. Each artboard is set to the actual printable area for that garment, with seam lines and safe zones marked.",
"Download it from the Artwork Upload section of any quote request, or ask us to send it. Using the template is the single fastest way to get your file approved on the first review.",
"If you are not an Illustrator user, ask us for a PDF template with the same dimensions. Just place your design inside the marked area and save as a vector PDF.",
        ],
      },
    ],
    keyTakeaways: [
"Send AI, EPS, or vector PDF for flat designs; PSD (200+ DPI) for photo-realistic",
"Design at final 1:1 print size — never send a small file and ask us to scale up",
"Outline all text and embed all images before sending",
"Use rich black (60,40,40,100) for dark areas; transparent for white",
"Download our free AI/PDF artwork template to speed up approval",
    ],
  },
  {
    slug: "what-is-sublimation-fabric",
    title: "What Is Sublimation Fabric? A Factory Guide to How It Works",
    excerpt:
"Sublimation fabric is a polyester (or polyester-blend) textile that has been engineered to bond with dye-sublimation ink at the molecular level. This guide explains what it is, why polyester is required, and how to choose the right one for your project.",
    category: "Industry Guide",
    date: "2026-09-04",
    readTime: "7 min read",
    author: "SublimApparel Team",
    coverImage: "/blog/sublimation-printer-factory.jpeg",
    coverAlt: "Industrial wide-format sublimation printer applying heat transfer to white polyester fabric on a Yiwu factory production line, CMYK ink cartridges visible",
    tags: ["sublimation fabric", "polyester", "dye sublimation", "fabric guide", "all-over print"],
    metaTitle: "What Is Sublimation Fabric? 2025 Factory Guide (Polyester, Blends, Knits)",
    metaDescription:
"Sublimation fabric is polyester that bonds with dye-sublimation ink at the molecular level. Learn why polyester is required, what blends work, and how to pick the right knit for all-over print apparel.",
    intro: [
"If you have ever opened a sublimation catalog or landed on a factory's fabric page, you have seen the term sublimation fabric used a lot. It sounds like a specific textile — but it is actually a behavior that certain fabrics have, not a single material.",
"In plain English: sublimation fabric is any fabric that bonds with dye-sublimation ink under heat and pressure. In practice, that means polyester and polyester-rich blends. Cotton does not qualify. This guide explains what sublimation fabric actually is, why polyester is non-negotiable, and how to pick the right knit, weight, and stretch for your project.",
    ],
    sections: [
      {
        heading: "What Makes a Fabric 'Sublimation Fabric'?",
        paragraphs: [
"Three things have to be true for a fabric to be sublimation-ready: it must contain polyester (or another synthetic that opens its polymer structure under heat), it must be clean and pre-treated (no silicone softeners, no water-repellent coatings), and the dye must be able to migrate into the fiber during the heat-press window.",
"When those three conditions are met, the sublimation ink sublimates — turns from solid directly into gas — and bonds with the polyester fiber at the molecular level. The result is a print that is not sitting on the surface of the fabric. It is part of the fabric. That is why sublimated prints survive 50, 100, even 200+ washes without cracking, peeling, or fading.",
"For a deeper look at the underlying chemistry and process, see our <a href='/blog/what-is-sublimation-printing/'>sublimation printing guide</a> and our <a href='/technique/sublimation/'>dye sublimation process</a>.",
        ],
      },
      {
        heading: "Why Polyester Is the Only Real Answer",
        paragraphs: [
"Polyester works because the polymer chains in PET (polyethylene terephthalate) open up at around 180-200°C. When sublimation ink reaches that temperature as a gas, it slips between the open polymer chains and locks in when the fabric cools. The dye is now chemically bonded to the fiber.",
"Cotton does the opposite. Cotton is a natural cellulose fiber with no synthetic polymer structure — the dye gas has nothing to bond with. The ink either sits on the surface (washing off within a few cycles) or does not transfer at all. We have a full comparison of <a href='/blog/polyester-vs-cotton-sublima-fabric/'>polyester vs cotton for sublimation</a> in a separate post if you want the technical breakdown.",
"The short version: 100% polyester gives you the brightest colors and the most durable print. 65/35 poly-cotton blends print, but the cotton portion looks faded or washed-out. Anything below 50% polyester is not worth your time.",
        ],
      },
      {
        heading: "The Main Types of Sublimation Fabric",
        paragraphs: [
"We stock over 60 sublimation-ready fabrics in our Yiwu warehouse, but the B2B market is mostly served by about a dozen. Here are the workhorses, in order of order volume:",
"Birdseye mesh — 140-160 GSM, 100% polyester, the standard for <a href='/products/cycling/'>cycling jerseys</a>, running singlets, and triathlon suits. Lightweight, breathable, and the small hole pattern wicks sweat well.",
"Interlock — 160-200 GSM, 100% polyester, the workhorse for <a href='/products/t-shirts/'>t-shirts</a>, <a href='/products/jerseys/'>jerseys</a>, and <a href='/products/esports/'>esports jerseys</a>. Smooth face, soft hand-feel, holds shape.",
"Brushed poly / French terry — 220-280 GSM, 100% polyester, used for <a href='/products/hoodies/'>hoodies</a>, sweatshirts, and warm-up jackets. Brushed back for warmth without the weight of fleece.",
"PBT stretch — 180-220 GSM, polyester with PBT (polybutylene terephthalate) for chlorine-resistant stretch. The standard for competitive swimwear, <a href='/industries/endurance-race-events/'>triathlon suits</a>, and race-day apparel that has to survive pool chlorine and saltwater.",
"Spandex blends — 80-90% polyester + 10-20% spandex, for <a href='/products/training-apparel/'>activewear</a>, <a href='/products/training-apparel/'>training apparel</a>, and any application requiring 4-way stretch.",
"Full catalog with GSM, composition, and recommended uses is on our <a href='/fabric/'>fabric index</a>.",
        ],
      },
      {
        heading: "What Fabrics Do NOT Work for Sublimation",
        paragraphs: [
"Natural fibers: cotton, wool, silk, linen, hemp. The dye has no synthetic polymer to bond with. If you need an all-over print on cotton, the realistic alternatives are <a href='/technique/dtf/'>DTF (direct-to-film) transfers</a> or <a href='/technique/dtg/'>DTG (direct-to-garment) print</a> — both work on cotton but have trade-offs.",
"Coated or treated fabrics: anything with a durable water-repellent (DWR) finish, a silicone softener, or a fire-retardant coating. The coating blocks the dye from reaching the fiber. If you need a technical fabric with a DWR finish, you have to sublimate first, then apply the finish in a separate post-production step.",
"Very dark fabrics: sublimation ink is transparent — the white you see in the print is the white of the fabric. If you sublimate on a black or navy fabric, your print will be nearly invisible. The white base fabric is non-negotiable for true sublimation.",
"Recycled polyester: works, but with caveats. Recycled PET often has more variation in dye uptake, so you may see slight color shifts between panels. Test before committing to a large run. Our <a href='/fabric/cotton/'>cotton fabric guide</a> covers this in detail.",
        ],
      },
      {
        heading: "How to Choose the Right Sublimation Fabric for Your Project",
        paragraphs: [
"Start with the end use. If you are making <a href='/industries/sports-teams-leagues/'>esports jerseys</a>, you want a 160-180 GSM interlock with a smooth face for sharp print detail. If you are making <a href='/industries/endurance-race-events/'>running singlets</a>, birdseye mesh at 140-150 GSM is the standard. If you are making <a href='/industries/sports-teams-leagues/'>cycling kits</a>, you want a 4-way stretch spandex blend.",
"Match weight to climate. 140-160 GSM is the sweet spot for hot-weather performance apparel. 180-200 GSM is a year-round middle ground. 220+ GSM is for cool-weather and lifestyle applications.",
"Order a sample first. We send free <a href='/samples/'>fabric swatches</a> and <a href='/samples/'>printed strike-off samples</a> so you can test the hand-feel, stretch, and color vibrancy before committing to bulk production. Our sample kit includes the 12 most popular sublimation fabrics in A5 size with a printed color test on each.",
"Talk to us if you are unsure. We have been running sublimation production since 2014 and we have seen almost every fabric scenario. Send us your spec — sport, climate, print design, budget — and we will recommend 2-3 fabrics to sample. There is no charge for fabric consultation.",
        ],
      },
      {
        heading: "Sublimation Fabric vs All-Over Print Garments",
        paragraphs: [
"Sublimation fabric is the material. <a href='/all-over-print/'>All-over print</a> is the result. The two terms get confused, but they are not the same thing. All-over print is a design goal (edge-to-edge artwork across the entire garment); sublimation fabric is the substrate that makes all-over print possible at scale.",
"Most all-over print apparel on the market today is sublimation — because sublimation is the only decoration method that allows edge-to-edge printing with no print area limit and no surface feel. <a href='/technique/screen-printing/'>Screen printing</a> and <a href='/technique/embroidery/'>embroidery</a> are limited to small areas.",
"If your project needs all-over print, you need a sublimation fabric. If you only need a chest logo, sublimation is overkill — screen print or embroidery is faster and cheaper for that use case. We help you pick the right method for the design, not the other way around.",
        ],
      },
    ],
    keyTakeaways: [
"Sublimation fabric is any polyester or polyester-rich blend that bonds with sublimation ink under heat",
"100% polyester = brightest, most durable print. Below 50% polyester is not worth the effort",
"Cotton, wool, silk, coated fabrics do NOT work for true sublimation",
"Match the fabric to the end use: birdseye for running, interlock for jerseys, brushed poly for hoodies",
"Order our free fabric swatch kit to test hand-feel, stretch, and color before bulk production",
    ],
  },
  {
    slug: "polyester-vs-cotton-sublima-fabric",
    title: "Polyester vs Cotton for Sublimation Printing: A Factory Comparison",
    excerpt:
"Polyester prints bright, durable, edge-to-edge. Cotton is comfortable, familiar, and totally incompatible with sublimation. Here is how to choose — and what to do when you need an all-over print on cotton.",
    category: "Product Guide",
    date: "2026-09-05",
    readTime: "8 min read",
    author: "SublimApparel Team",
    coverImage: "/blog/polyester-vs-cotton-comparison.jpeg",
    coverAlt: "Two folded t-shirts side by side on white background — left shirt bright white polyester with vivid full-color edge-to-edge sublimated geometric pattern, right shirt heather grey plain cotton",
    tags: ["polyester vs cotton", "sublimation fabric", "cotton printing", "DTG", "DTF", "all-over print"],
    metaTitle: "Polyester vs Cotton for Sublimation 2025: Honest Factory Comparison",
    metaDescription:
"Polyester vs cotton for sublimation printing: polyester wins on color and durability, cotton wins on comfort. Honest comparison of cost, feel, wash-fastness, and the cotton alternatives.",
    intro: [
"This is the most common question we get from new B2B clients: can we sublimate on cotton? The short answer is no. The longer answer is: here is what cotton does instead, here is what polyester does, and here is what to order when your design brief says 100% cotton but you really want an all-over print.",
"We run both polyester and cotton apparel in our Yiwu factory every week. This comparison is from production data, not marketing copy — including the actual wash-test results from our QC lab.",
    ],
    sections: [
      {
        heading: "The One-Sentence Answer",
        paragraphs: [
"Polyester is the only fabric that bonds with sublimation ink at the molecular level. Cotton does not. If you want a true all-over print that lasts 50+ washes, you need polyester (or a 65%+ polyester blend). If you are willing to accept a smaller print area and slightly different feel, <a href='/technique/dtg/'>DTG</a> and <a href='/technique/dtf/'>DTF</a> are the cotton-compatible alternatives.",
"That is the whole story. The rest of this post explains why polyester wins on print, why cotton wins on comfort, and what to actually do for common B2B use cases.",
        ],
      },
      {
        heading: "How Polyester and Cotton Behave Under Sublimation",
        paragraphs: [
"Polyester is a synthetic polymer. Under heat (around 180-200°C), the polymer chains open up enough for dye gas to slip between them. When the fabric cools, the chains close and lock the dye in. The result: the print is part of the fiber. It cannot peel, crack, or fade for the life of the garment.",
"Cotton is a natural cellulose fiber. There is no polymer structure to open under heat. When sublimation ink is applied to cotton, it sits on the surface of the fiber and then washes out. After 5-10 wash cycles, a sublimated cotton garment is essentially blank.",
"This is not a manufacturing issue or a cost issue. It is chemistry. No amount of pre-treatment, post-treatment, or different ink will make cotton accept sublimation dye the way polyester does.",
        ],
      },
      {
        heading: "Print Quality: Polyester vs Cotton Side by Side",
        paragraphs: [
"On 100% polyester interlock at 180 GSM, sublimation produces: bright, saturated colors that match the design file within 90-95%; smooth gradients with no banding; sharp text down to 6pt at 1:1 print scale; full edge-to-edge coverage with no print area limit. After 50 wash cycles, the print is visually identical to day one.",
"On 100% cotton at 180 GSM with sublimation attempted, you get: faded, washed-out colors that look 30-50% lighter than the design file; visible banding on gradients; sharp text below 12pt starts to bleed; the print area is limited because the dye does not transfer well past 30x40 cm on most cotton weaves. After 5-10 washes, most of the print is gone.",
"The same cotton garment, decorated with <a href='/technique/dtg/'>DTG</a> instead of sublimation, looks much closer to the polyester sublimation result on day one — bright, detailed, and accurate. After 30-50 washes, the DTG print still looks good but the hand-feel (the texture of the print on the fabric) is noticeably different from unprinted cotton. There is a thin ink layer sitting on the surface.",
],
      },
      {
        heading: "Hand-Feel and Comfort",
        paragraphs: [
"Polyester: smoother, slightly slicker, lighter for the same GSM. Modern moisture-wicking polyesters (especially birdseye and pique knits) breathe well and pull sweat away from the skin. They are the standard for performance apparel — <a href='/products/running-shirts/'>running singlets</a>, <a href='/products/cycling/'>cycling jerseys</a>, <a href='/products/esports/'>esports jerseys</a>. The downside: some people find polyester less comfortable in dry, hot conditions because it does not absorb moisture the way cotton does.",
"Cotton: soft, breathable, absorbent, familiar. Cotton is the comfort benchmark. It is what most end customers are used to wearing as everyday apparel. The downside for performance: cotton absorbs sweat, gets heavy when wet, and dries slowly. Cotton is also the heavier fabric for the same warmth level — a 200 GSM cotton t-shirt is heavier and warmer than a 200 GSM polyester t-shirt.",
"Poly-cotton blends (65% poly / 35% cotton) try to bridge the gap. The poly accepts the sublimation dye; the cotton adds softness. Trade-off: the print on the cotton portion looks faded compared to the poly portion, so designs with large color blocks look uneven.",
        ],
      },
      {
        heading: "Cost: Polyester vs Cotton for a 500-Piece Order",
        paragraphs: [
"For a 500-piece order of 180 GSM t-shirts, the fabric cost difference is small. Polyester interlock is around $2.20-2.80 per garment. Cotton jersey is around $2.40-3.00 per garment. Cotton is slightly more expensive at the same weight, but pricing varies by season and cotton market.",
"The decoration cost is where the gap opens up. Sublimation on polyester is included in the all-over print price — no extra charge for the print. Sublimation attempted on cotton is not possible, so the decoration alternatives (DTG, DTF, screen print) are quoted separately.",
"DTG on cotton for a 500-piece run: roughly $1.50-2.50 per garment for a chest-area print. DTF on cotton for the same: $1.00-1.80 per garment. Screen print on cotton: $0.80-1.50 per garment for 1-2 color prints. For full-coverage designs, DTG and DTF are the only realistic options on cotton, and they are noticeably more expensive than sublimation on poly.",
"Our <a href='/pricing/'>pricing guide</a> has a full breakdown of decoration costs by technique, fabric, and quantity.",
        ],
      },
      {
        heading: "When to Use Polyester (Sublimation)",
        paragraphs: [
"Use polyester sublimation when: (1) you want an <a href='/all-over-print/'>all-over print</a> with edge-to-edge artwork, (2) the design has gradients, photo-realistic elements, or more than 6 colors, (3) the garment will see heavy washing (sports, workwear, events), (4) the end use is performance apparel — <a href='/industries/endurance-race-events/'>running</a>, <a href='/industries/sports-teams-leagues/'>cycling</a>, <a href='/industries/endurance-race-events/'>triathlon</a>, <a href='/industries/sports-teams-leagues/'>esports</a>, (5) you want the lowest cost per wear over the life of the garment.",
"Polyester is the right call for about 80% of the sublimation work we do.",
        ],
      },
      {
        heading: "When to Use Cotton (DTG or DTF Instead)",
        paragraphs: [
"Use cotton with DTG or DTF when: (1) the customer specifically asks for 100% cotton (some markets — EU lifestyle, premium streetwear, certain corporate buyers — insist on cotton), (2) the design is a small chest-area print (DTG and DTF handle small areas well, and screen print is even cheaper for 1-2 color chest prints), (3) the print is not required to survive 50+ washes, (4) the end use is lifestyle or fashion, not performance.",
"Note that even on cotton, <a href='/technique/dtf/'>DTF transfers</a> give you a near-full-coverage print — close to sublimation visually — with the trade-off of a slightly thicker hand-feel and lower long-term wash durability. DTG gives the softest hand-feel but is limited to a smaller print area than sublimation.",
        ],
      },
      {
        heading: "The Best of Both: Poly-Cotton Blends and What They Print Like",
        paragraphs: [
"65/35 poly-cotton and 50/50 poly-cotton blends are the compromise fabric. The polyester accepts sublimation dye; the cotton adds softness. The result is a print that looks slightly faded compared to 100% poly, with a hand-feel that is closer to cotton.",
"We see poly-cotton used for: corporate uniforms where the buyer wants a softer feel than pure poly, school uniforms where cotton comfort matters, and lifestyle apparel where the print is not the main feature.",
"If you want the print to be the main feature, stick with 100% poly. If you want comfort and the print is secondary, a blend is a reasonable choice. Our <a href='/fabric/poly-cotton-blend/'>poly-cotton fabric page</a> has GSM options and sample ordering.",
        ],
      },
    ],
    keyTakeaways: [
"Polyester is the only fabric that bonds with sublimation ink at the molecular level — cotton does not",
"On cotton, use DTG or DTF for a real print; both work, both have a different hand-feel than sublimation on poly",
"Polyester wins on color, durability, cost-per-wear, and all-over print capability",
"Cotton wins on comfort, familiarity, and certain market expectations (EU lifestyle, premium streetwear)",
"Order our free sample kit to compare polyester sublimation vs cotton DTG side by side before you commit",
    ],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

export const getFeaturedPost = (): BlogPost | undefined =>
  blogPosts.find((p) => p.featured) ?? blogPosts[0];

export const getRelatedPosts = (slug: string, limit = 3): BlogPost[] => {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      // Same category first
      const aSame = a.category === current.category ? 0 : 1;
      const bSame = b.category === current.category ? 0 : 1;
      if (aSame !== bSame) return aSame - bSame;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);
};

export const getAllCategories = (): string[] =>
  Array.from(new Set(blogPosts.map((p) => p.category)));
