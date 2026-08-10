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
    date:"2025-01-15",
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
    date:"2025-01-22",
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
    date:"2025-02-03",
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
    title:"Inside Our Yiwu Factory: 8,000 m² of Sublimation, Embroidery, and Quality Control",
    excerpt:
"Take a tour of our 8,000 m² production facility in Yiwu — from fabric warehouse to 1.9m wide-format printers to 100% final QC. See how a real Chinese apparel factory operates.",
    category:"Factory Stories",
    date:"2025-02-12",
    readTime:"10 min read",
    author:"SublimApparel Team",
    coverImage:"/factory-floor.webp",
    coverAlt:"Row of sublimation printers in our Yiwu factory",
    tags: ["factory tour","Yiwu","manufacturing","behind the scenes"],
    metaTitle: "Inside Our Yiwu Apparel Factory: 8,000m² Tour 2025",
    metaDescription:
"Full tour of our 8,000 m² Yiwu sublimation apparel factory. See our printers, embroidery lines, QC process, and 200+ skilled workers. Photos, video, and what to expect.",
    intro: [
"Most B2B apparel websites show a stock photo of a 'factory' and call it a day. We are going to do the opposite — give you a real, detailed walkthrough of our 8,000 m² production facility in Yiwu, China. From the fabric warehouse to the loading dock, here is what happens on our floor every day.",
"Yiwu is the small-commodity capital of the world, located 1.5 hours south of Hangzhou on the high-speed rail. Our factory sits in the Yiwu Industrial Park, with 200+ skilled workers across printing, embroidery, cutting, sewing, and quality control.",
    ],
    sections: [
      {
        heading:"Section 1: Fabric Warehouse (500 m²)",
        paragraphs: [
"We stock 50+ base fabrics in our on-site warehouse: polyester, polyester-cotton blends, performance moisture-wicking, French terry, fleece, and specialty knits. Most orders ship from stock, eliminating 2-3 week fabric sourcing delays.",
"Every roll of fabric is inspected on receipt — we check weight (GSM), hand-feel, color consistency, and any weaving defects. Only about 5% of incoming rolls pass our initial inspection on the first check. The rest are returned to the mill for replacement.",
        ],
      },
      {
        heading:"Section 2: Sublimation Print Hall (2,000 m²)",
        paragraphs: [
"We run four 1.9m wide-format sublimation printers in our dedicated print hall. Each printer runs 24/7 during peak season, producing up to 800 linear meters of printed fabric per day across all four units combined.",
"All sublimation printing happens in a climate-controlled room (22°C, 50% humidity) to ensure consistent ink transfer. Fabric moves from printer → heat press → cut station in a linear flow, with quality checkpoints between every step.",
        ],
      },
      {
        heading:"Section 3: Embroidery Hall (1,500 m²)",
        paragraphs: [
"Our embroidery hall runs 18 multi-head commercial embroidery machines supporting flat stitch, 3D puff, appliqué, and specialty thread effects. We stock 200+ thread colors with Pantone matching within 24 hours.",
"Cap embroidery, polo embroidery, and jacket embroidery are run on separate machine clusters optimized for each item type. This keeps setup time down and lets us run different items in parallel without cross-contamination.",
        ],
      },
      {
        heading:"Section 4: Cut and Sew Floor (3,000 m²)",
        paragraphs: [
"Our cut-and-sew floor handles the assembly of every garment we print. We use CNC fabric cutters for precise panel cutting, then 30+ industrial sewing machines for assembly. Each seam, hem, and detail is sewn in-house — no subcontracting.",
"Line setup is optimized per order: a typical 500-piece sublimation jersey run takes 8-10 days from cut to packed garment, with quality checkpoints at cut, sew-1, sew-2, and final assembly.",
        ],
      },
      {
        heading:"Section 5: Quality Control and Packing (1,000 m²)",
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
"8,000 m² facility, 200+ workers, 6 production zones",
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
    date:"2025-02-20",
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
    date:"2025-03-01",
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
    date:"2025-03-12",
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
    date:"2025-03-20",
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
