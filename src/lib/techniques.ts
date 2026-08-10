// All 20 apparel decoration techniques with full SEO content
// Content adapted from oemtshirts.com (our sister factory site) + 3D Embroidery / Laser Engraving (added)

export interface Technique {
  slug: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroImage: string;
  heroAlt: string;
  tagline: string;
  intro: string[];
  quickSpecs: {
    bestFor: string;
    fabric: string;
    moq: string;
    durability: string;
    cost: string;
    leadTime: string;
  };
  pros: string[];
  bestUseCases: string[];
  process: { step: number; title: string; description: string }[];
  faq: { q: string; a: string }[];
  related: string[];
}

export const techniques: Technique[] = [
  {
    slug: "sublimation",
    name: "Sublimation Printing",
    shortName: "Sublimation",
    metaTitle: "Sublimation Printing | All-Over Print Apparel | SublimApparel",
    metaDescription:
      "Dye-sublimation printing for all-over polyester apparel. Edge-to-edge print, no peeling, vibrant Pantone-matched colors. MOQ 50 pcs, DDP worldwide. Free quote.",
    keywords: ["sublimation printing", "all over sublimation", "custom sublimated apparel", "dye sublimation t-shirts"],
    heroImage: "/techniques/Sublimationprinting02.webp",
    heroAlt: "Custom sublimated t-shirt with edge-to-edge all-over print",
    tagline:
      "Dye-sublimation fuses ink into polyester fiber. Edge-to-edge print that never peels, cracks, or fades — the only way to achieve true all-over apparel.",
    intro: [
      "Sublimation printing is the gold standard for full-coverage, edge-to-edge apparel decoration. Unlike screen printing or DTG, sublimation doesn't sit on top of the fabric — it dyes the polyester fiber from the inside out. The result is a print you literally cannot feel, that will not peel or crack for the life of the garment.",
      "At SublimApparel, we run industrial 1.9m wide-format sublimation printers with CMYK plus 8 extended spot colors. Every panel of the garment — front, back, sleeves, side panels, even the inside collar — can carry continuous artwork. Panels are printed together so they match perfectly when sewn, then cut, assembled and finished on the same floor.",
      "Sublimation is the only print method that lets a single T-shirt, polo, hoodie or jersey carry a full photograph, gradient, or pattern across every visible surface. It is the technique behind most esports jerseys, racing kits, festival merch, and event staff uniforms you see today.",
    ],
    quickSpecs: {
      bestFor: "All-over print, full-coverage artwork, photographic prints",
      fabric: "Polyester and polyester blends (100% polyester recommended)",
      moq: "50 pieces per design",
      durability: "Lifetime — print is part of the fiber, cannot peel",
      cost: "$$ — most cost-effective for all-over print runs",
      leadTime: "15–25 days including sampling",
    },
    pros: [
      "True edge-to-edge print — no print area limits",
      "Photographic detail and unlimited color count at no extra cost",
      "Print will never peel, crack, fade or wash out",
      "Soft hand-feel — zero raised surface on the fabric",
      "Ideal for cut-and-sew garments with perfectly aligned panels",
    ],
    bestUseCases: [
      "Esports team jerseys and tournament kits",
      "Cycling jerseys and triathlon suits",
      "Racing suits and motorsport apparel",
      "Festival merch and concert tour apparel",
      "All-over print streetwear collections",
      "Event staff uniforms and brand activation wear",
    ],
    process: [
      { step: 1, title: "Artwork separation", description: "We pre-flight your file. CMYK plus up to 8 spot colors. Underbase white added automatically for polyester." },
      { step: 2, title: "Wide-format print", description: "1.9m wide roll-to-roll sublimation printer lays the design onto transfer paper at 4,800 × 1,200 DPI." },
      { step: 3, title: "Cut & assemble", description: "Printed paper is cut to garment panel size. Front, back, sleeves kept aligned with registration marks." },
      { step: 4, title: "Heat-press transfer", description: "200°C / 30 sec cycle on an 80 × 100 cm platen. Dye sublimates from solid to gas, bonds with polyester fibers." },
      { step: 5, title: "Cut & sew", description: "Each garment is cut, assembled and sewn on the same floor. Panels match perfectly because printed together." },
    ],
    faq: [
      { q: "Can you sublimate on cotton?", a: "Sublimation ink only bonds with polyester. For cotton, we use DTG or DTF — both available in-house. Ask us about our cotton-recommended techniques." },
      { q: "Is there a minimum print area?", a: "No. Sublimation is the only technique with no print area limits — you can print edge to edge, including over seams if we cut and sew for you." },
      { q: "How many colors can I use?", a: "Unlimited. Sublimation uses CMYK plus extended spot colors, so even photographs reproduce cleanly at no extra cost." },
      { q: "Will the print fade after washing?", a: "No. Because the dye is now part of the polyester fiber, the print is colorfast for the life of the garment — even after 100+ washes." },
    ],
    related: ["dtg", "dtf", "overall-printing", "screen-printing"],
  },

  {
    slug: "screen-printing",
    name: "Screen Printing",
    shortName: "Screen Print",
    metaTitle: "Custom Screen Printing | Plastisol & Water-Based Inks | SublimApparel",
    metaDescription:
      "Custom screen printing on t-shirts, hoodies and totes. Plastisol, water-based, discharge and high-density inks. Pantone-matched. MOQ 50 pcs. Free quote.",
    keywords: ["screen printing", "custom screen print t-shirts", "plastisol ink", "water-based screen print"],
    heroImage: "/techniques/Screenprinting01.webp",
    heroAlt: "Custom screen printed t-shirt on a clean studio surface",
    tagline:
      "The original apparel decoration method. Cost-effective at volume, vibrant Pantone colors, and the workhorse of band merch, events, and corporate uniforms.",
    intro: [
      "Screen printing is the most established and cost-effective method of decorating apparel at volume. Ink is pushed through a fine mesh screen onto fabric, one color at a time, building up the design layer by layer. It is the technique behind most band merch, sports team uniforms, corporate giveaways, and event t-shirts you have ever owned.",
      "At SublimApparel we run automatic and manual screen printing lines supporting plastisol, water-based, discharge, and high-density inks. We can hit any Pantone color, print on dark or light garments, and combine techniques — for example, a discharge underbase with a plastisol top layer for a soft vintage feel on dark cotton.",
      "Screen printing is best when the design has limited colors (under 6 is most economical) and the run is large enough to justify screen setup. We handle runs from 50 pieces to over 100,000 per design.",
    ],
    quickSpecs: {
      bestFor: "High-volume runs, bold graphics, cotton and dark garments",
      fabric: "Cotton, polyester blends, tri-blends — most fabric types",
      moq: "50 pieces per design",
      durability: "Excellent — 50+ washes with plastisol, lifetime with discharge",
      cost: "$ — most economical at volume",
      leadTime: "10–20 days including screen setup",
    },
    pros: [
      "Most cost-effective decoration for runs over 200 pieces per design",
      "Vibrant, opaque colors even on dark garments",
      "Wide ink selection: plastisol, water-based, discharge, metallic, glow",
      "Pantone-perfect color matching for corporate brand work",
      "Combines well with other techniques for special effects",
    ],
    bestUseCases: [
      "Band and concert tour merchandise",
      "Sports team uniforms and club kits",
      "Corporate uniforms and brand giveaways",
      "Event and festival staff t-shirts",
      "Charity and awareness campaign apparel",
      "School and university merchandise",
    ],
    process: [
      { step: 1, title: "Artwork prep & color separation", description: "Each Pantone color is separated onto its own film positive. We pre-flight your file and check for fine details." },
      { step: 2, title: "Screen making", description: "Mesh screens are coated with photo emulsion, exposed with your film, washed out, and registered on press." },
      { step: 3, title: "Press setup", description: "Garments are loaded onto the press. Each screen is aligned to within 0.1mm of registration." },
      { step: 4, title: "Print", description: "Ink is pushed through each screen with a squeegee, one color at a time, with flash curing between colors as needed." },
      { step: 5, title: "Cure & QC", description: "Final ink film is cured at 160°C. Every piece is inspected before poly-bagging and packing." },
    ],
    faq: [
      { q: "How many colors can I screen print?", a: "Technically unlimited, but each color is a separate screen charge. Most economical at 1–4 colors. 6+ colors is fine for premium work but costs more." },
      { q: "Can you print on dark garments?", a: "Yes. We use a white underbase on dark garments so colors stay vibrant and true to the design." },
      { q: "What's the difference between plastisol and water-based ink?", a: "Plastisol sits on top of the fabric (vibrant, durable, slightly heavier hand). Water-based dyes the fabric (soft hand, vintage look, less opaque on dark colors)." },
      { q: "Will the print crack or peel?", a: "With proper cure and care, plastisol prints last 50+ washes. Discharge prints (on cotton) dye the fabric and last the life of the garment." },
    ],
    related: ["embroidery", "dtg", "plastisol-vs-water-based", "discharge-printing"],
  },

  {
    slug: "embroidery",
    name: "Custom Embroidery",
    shortName: "Embroidery",
    metaTitle: "Custom Logo Embroidery | 3D Puff & Flat Stitch | SublimApparel",
    metaDescription:
      "Premium logo embroidery on caps, polos, jackets and bags. Flat stitch, 3D puff, and appliqué styles. Pantone-matched threads. MOQ 50 pcs. Free quote.",
    keywords: ["custom embroidery", "logo embroidery", "3d puff embroidery", "cap embroidery"],
    heroImage: "/techniques/Embroidery07.webp",
    heroAlt: "Custom embroidered logo on a polo shirt",
    tagline:
      "Stitched-in quality. Embroidery gives logos, monograms and crests a premium tactile feel that screen printing cannot match — and it never fades.",
    intro: [
      "Embroidery is the premium decoration method for polos, caps, jackets, and bags. Instead of ink, the design is sewn into the fabric using threads of precise Pantone-matched colors. The result is a raised, textured, professional look that conveys quality and permanence — and lasts the life of the garment.",
      "At SublimApparel we run multi-head commercial embroidery machines supporting flat stitch, 3D puff, appliqué, and specialty thread effects. We can embroider on caps, polos, button-downs, jackets, hoodies, totes, and patches. We stock 200+ thread colors and match any Pantone reference within 24 hours.",
      "Embroidery is best for logos with limited colors (under 12) and works especially well on corporate uniforms, sports caps, club polos, and any garment where you want the logo to feel like a permanent part of the fabric.",
    ],
    quickSpecs: {
      bestFor: "Logos on polos, caps, jackets, totes and patches",
      fabric: "Most fabric types — twill, cotton, polyester, fleece, performance",
      moq: "50 pieces per design",
      durability: "Lifetime — stitches do not fade or peel",
      cost: "$$$ — premium look, premium price",
      leadTime: "10–20 days including digitizing",
    },
    pros: [
      "Most premium, professional decoration method available",
      "Stitches last the life of the garment — no fading, peeling, or cracking",
      "Wide thread color selection with Pantone matching",
      "Multiple styles: flat, 3D puff, appliqué, metallic, glow-in-the-dark",
      "Works on caps, structured fabrics, and difficult-to-print materials",
    ],
    bestUseCases: [
      "Corporate uniforms and brand polos",
      "Sports team caps and club kit",
      "Premium retail apparel and streetwear",
      "Golf polos and country club wear",
      "Bags, totes, and patch applications",
      "Hotel, restaurant and service industry staff apparel",
    ],
    process: [
      { step: 1, title: "Logo digitizing", description: "Your logo is converted into a stitch file (.DST/.EMB) by our digitizing team. We optimize stitch count, direction, and density." },
      { step: 2, title: "Thread color matching", description: "We match thread colors to your Pantone reference or send a sample for sign-off. Stock 200+ thread colors." },
      { step: 3, title: "Sample run", description: "First piece is sewn, photographed, and approved before bulk production." },
      { step: 4, title: "Production embroidery", description: "Multi-head machines run the design across the full run. Each piece is hooped, embroidered, and inspected." },
      { step: 5, title: "Trimming & QC", description: "Loose threads are trimmed. Every piece is inspected for stitch quality and registration before packing." },
    ],
    faq: [
      { q: "How many colors can I embroider?", a: "Each thread color is a separate needle change. Most economical under 9 colors. We can run up to 15 colors on a single design." },
      { q: "What's 3D puff embroidery?", a: "A foam underlay is placed under the stitches, raising them up off the fabric. Popular for caps and streetwear. Limited to clean, bold designs." },
      { q: "Can you embroider on caps?", a: "Yes — caps are one of our most popular items. Front, side, back, and under-visor positions all available." },
      { q: "What is the digitizing setup fee?", a: "One-time $25 per logo design, regardless of quantity. We keep the file on file for future reorders at no charge." },
    ],
    related: ["3d-puff", "applique", "screen-printing", "cap-embroidery"],
  },

  {
    slug: "dtg",
    name: "DTG Printing (Direct to Garment)",
    shortName: "DTG",
    metaTitle: "Direct to Garment (DTG) Printing | Cotton Apparel | SublimApparel",
    metaDescription:
      "Direct-to-garment (DTG) printing on cotton and cotton blends. Photographic detail, no setup fees, ideal for short runs. MOQ 1 pc. Free quote.",
    keywords: ["dtg printing", "direct to garment", "dtg on cotton", "dtg t-shirts"],
    heroImage: "/techniques/DTGprinting03.webp",
    heroAlt: "Custom DTG printed t-shirt on a studio surface",
    tagline:
      "Inkjet-printed directly onto the garment. Photographic detail, soft hand-feel, no screen setup — perfect for short runs and one-offs on cotton.",
    intro: [
      "Direct-to-garment (DTG) printing uses a modified inkjet printer to apply water-based ink directly into the fibers of a cotton or cotton-blend garment. Unlike screen printing, there is no screen setup and no color limit — you can print full-color photographs, gradients, and complex artwork just like printing on paper.",
      "DTG is the most flexible decoration method for short runs, one-offs, and made-to-order apparel. It is ideal for samples, on-demand print-on-demand businesses, and small batch runs where screen printing setup costs would be prohibitive. At SublimApparel, we run industrial DTG machines with pre-treatment for both light and dark garments.",
      "DTG works best on 100% cotton or high-cotton-content garments. For polyester or all-over-print, sublimation is the better choice. For fabric with a mix, DTF is the most versatile option.",
    ],
    quickSpecs: {
      bestFor: "Short runs, one-offs, photographic detail on cotton",
      fabric: "100% cotton and high-cotton blends (65% cotton minimum recommended)",
      moq: "No minimum — single piece runs available",
      durability: "Excellent — 50+ washes with proper cure",
      cost: "$$$ — economical for short runs, expensive for high volume",
      leadTime: "5–15 days depending on quantity",
    },
    pros: [
      "No minimum order quantity — print one piece or 1,000",
      "Photographic detail and unlimited colors at no extra cost",
      "Soft hand-feel — no raised print surface",
      "Perfect for samples, on-demand, and made-to-order businesses",
      "No screens, no setup, fast turnaround",
    ],
    bestUseCases: [
      "Print-on-demand and on-demand merch",
      "Sample runs before committing to bulk",
      "Small batch custom apparel (under 50 pieces)",
      "Photographic prints and detailed artwork",
      "Personalized gifts and custom name apparel",
      "Limited edition drops and exclusive collections",
    ],
    process: [
      { step: 1, title: "Pre-treatment", description: "Garment is pre-treated with a special solution that helps the ink bond with cotton fibers. Especially important for dark garments." },
      { step: 2, title: "Garment loading", description: "Garment is mounted onto the DTG printer platen, smoothed, and registered." },
      { step: 3, title: "Print", description: "CMYK plus white ink is jetted directly into the fabric in a single pass at up to 1,200 DPI." },
      { step: 4, title: "Cure", description: "Ink is heat-cured at 180°C to bond with the cotton fibers." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for color accuracy and registration before packing." },
    ],
    faq: [
      { q: "What's the difference between DTG and screen printing?", a: "DTG prints like an inkjet — no setup, unlimited colors, photographic detail. Screen printing uses screens — best for high volume with limited colors. DTG is more expensive per piece but cheaper for short runs." },
      { q: "Can you DTG on dark garments?", a: "Yes, with a white underbase. We pre-treat the garment first so the white ink and color inks sit properly on dark fabric." },
      { q: "What fabric works best for DTG?", a: "100% cotton is ideal. Cotton blends (65% cotton or higher) work well. Polyester does not absorb DTG ink — use sublimation for that." },
      { q: "How long does DTG last?", a: "With proper cure, DTG prints last 50+ washes without significant fading." },
    ],
    related: ["dtf", "screen-printing", "sublimation", "all-over-cotton-printing"],
  },

  {
    slug: "dtf",
    name: "DTF Printing (Direct to Film)",
    shortName: "DTF",
    metaTitle: "DTF Transfers | Direct to Film | Cotton, Polyester & Blends | SublimApparel",
    metaDescription:
      "DTF (direct-to-film) transfers for cotton, polyester and any blend. Vibrant colors, soft hand, no weeding. MOQ 50 pcs. Free quote.",
    keywords: ["dtf transfers", "direct to film", "dtf printing", "dtf on cotton"],
    heroImage: "/techniques/DTFprinting01.webp",
    heroAlt: "Custom DTF transfer design ready for heat press application",
    tagline:
      "Print on film, transfer to fabric. DTF works on any fabric — cotton, polyester, nylon, leather — with vibrant colors and a soft hand.",
    intro: [
      "Direct-to-film (DTF) is the most versatile new decoration method. The design is printed onto a special transfer film using water-based ink, then heat-pressed onto the fabric. The result is a vibrant, durable print that works on virtually any fabric — cotton, polyester, nylon, leather, performance blends, even difficult-to-print materials.",
      "DTF combines the photographic detail and unlimited colors of DTG with the versatility to print on any fabric. It is rapidly becoming the go-to method for custom apparel brands that want to print on a mix of fabric types without managing multiple decoration processes.",
      "At SublimApparel, we run DTF on the same production line as sublimation and DTG, so we can recommend the best method for your specific garment, fabric, and artwork — and we will tell you when another method is actually a better fit.",
    ],
    quickSpecs: {
      bestFor: "Versatile decoration across all fabric types",
      fabric: "Any fabric — cotton, polyester, nylon, leather, performance blends",
      moq: "50 pieces per design",
      durability: "Excellent — 50+ washes, soft hand-feel",
      cost: "$$ — versatile and cost-effective",
      leadTime: "10–20 days",
    },
    pros: [
      "Works on virtually any fabric — cotton, poly, nylon, leather",
      "Vibrant colors with photographic detail",
      "Soft hand-feel — thinner than traditional transfers",
      "No weeding or special equipment needed for application",
      "Cost-effective for small to medium runs",
    ],
    bestUseCases: [
      "Mixed fabric product lines (cotton + polyester + specialty)",
      "Custom caps and structured headwear",
      "Performance and activewear",
      "Bags, totes, and accessories",
      "Difficult-to-print fabrics (nylon jackets, leather patches)",
      "Small to medium custom runs",
    ],
    process: [
      { step: 1, title: "Print on film", description: "Design is printed in CMYK plus white onto a special PET transfer film using water-based DTF ink." },
      { step: 2, title: "Apply hot-melt adhesive", description: "Powdered adhesive is applied to the wet ink and cured, bonding the ink to the film." },
      { step: 3, title: "Cut and prepare", description: "Film is cut to design shape (or gang-sheeted for multiple designs)." },
      { step: 4, title: "Heat-press transfer", description: "Film is placed on the garment and pressed at 160°C for 15 seconds. Film is peeled hot or cold depending on the system." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for adhesion, color accuracy, and finish before packing." },
    ],
    faq: [
      { q: "Can DTF be used on any fabric?", a: "Almost. DTF works on cotton, polyester, nylon, leather, performance fabrics, and most blends. It is the most versatile decoration method we offer." },
      { q: "Does DTF feel like a transfer?", a: "Modern DTF is much thinner than traditional plastisol transfers. Most people cannot feel it on the fabric after washing." },
      { q: "Is DTF better than DTG?", a: "Depends on the use case. DTF works on more fabrics. DTG has a softer hand-feel and is more cost-effective for very small runs. We will recommend the right method for your project." },
      { q: "How long does DTF last?", a: "50+ washes without significant fading or peeling when properly applied." },
    ],
    related: ["dtg", "sublimation", "screen-printing", "heat-transfer"],
  },

  {
    slug: "3d-puff",
    name: "3D Puff Embroidery",
    shortName: "3D Puff",
    metaTitle: "3D Puff Embroidery | Foam-Raised Logo | Caps & Streetwear | SublimApparel",
    metaDescription:
      "3D puff embroidery with foam underlay for raised, sculpted logos. Premium streetwear and cap decoration. Pantone-matched threads. MOQ 50 pcs. Free quote.",
    keywords: ["3d puff embroidery", "puff embroidery", "raised embroidery", "cap puff embroidery"],
    heroImage: "/techniques/3Dpuffprinting05.webp",
    heroAlt: "3D puff embroidered cap with raised logo",
    tagline:
      "Foam-backed stitching that raises your logo off the fabric. The signature look of premium streetwear and structured caps.",
    intro: [
      "3D puff embroidery uses a foam underlay placed under the stitches, raising the design up off the fabric in a sculptural, dimensional way. Popularized by streetwear and cap brands, 3D puff turns any logo into a tactile, premium statement piece that stands out on the shelf.",
      "At SublimApparel, we run 3D puff on caps, structured polos, and heavyweight streetwear garments. We use high-density foam in 1mm, 2mm, and 3mm thicknesses to control the level of dimension, and we stock 200+ thread colors for matching your brand palette.",
      "3D puff works best with clean, bold designs — heavy line weights, large solid areas, and minimal fine detail. For complex artwork with gradients or fine lines, flat embroidery is usually a better fit.",
    ],
    quickSpecs: {
      bestFor: "Streetwear logos, caps, and bold brand statements",
      fabric: "Structured caps, heavyweight cotton, twill, fleece",
      moq: "50 pieces per design",
      durability: "Lifetime — stitches and foam do not degrade",
      cost: "$$$$ — premium specialty technique",
      leadTime: "15–25 days including foam sourcing",
    },
    pros: [
      "Most premium, dimensional decoration look available",
      "Makes logos feel sculptural and tactile",
      "Stitches and foam last the life of the garment",
      "Strong visual impact on caps and streetwear",
      "Customizable foam thickness for different effects",
    ],
    bestUseCases: [
      "Premium streetwear and urban fashion",
      "Sports caps and structured headwear",
      "Hip-hop, skate, and surf brand merchandise",
      "Premium corporate caps and club merchandise",
      "Limited edition drops and hype releases",
      "Trucker caps and snapback collections",
    ],
    process: [
      { step: 1, title: "Design optimization", description: "Design is checked for puff compatibility. Fine details, gradients, and small text are simplified or removed for the 3D effect." },
      { step: 2, title: "Digitizing with foam underlay", description: "Stitch file is created with a foam underlay layer that sits beneath the top stitches." },
      { step: 3, title: "Foam placement", description: "Foam is cut to design shape and placed on the garment before embroidery." },
      { step: 4, title: "Embroider", description: "Stitches are sewn through the foam, locking it in place and raising the design off the fabric." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for foam stability, stitch quality, and dimensional consistency." },
    ],
    faq: [
      { q: "What's the difference between puff and regular embroidery?", a: "Regular embroidery lies flat against the fabric. Puff embroidery has a foam underlay that raises the stitches up off the fabric, creating a 3D effect." },
      { q: "Can I do 3D puff on garments other than caps?", a: "Yes — we run puff on heavyweight hoodies, structured polos, and twill jackets. The fabric needs to be firm enough to support the foam." },
      { q: "Does 3D puff last as long as flat embroidery?", a: "Yes. The foam and stitches are permanent. Puff embroidery lasts the life of the garment." },
      { q: "Can any design be puff embroidered?", a: "Bold, simple designs work best. Fine details, small text (under 8mm), and gradients are not recommended for puff — we recommend flat embroidery for those." },
    ],
    related: ["embroidery", "applique", "terry-embroidery", "streetwear-embroidery"],
  },

  {
    slug: "rhinestone",
    name: "Rhinestone Heat Press",
    shortName: "Rhinestone",
    metaTitle: "Rhinestone Heat Press Apparel | Custom Bling | SublimApparel",
    metaDescription:
      "Custom rhinestone heat-press apparel. Pre-designed templates or fully custom layouts. Dance, cheer, pageant, performance. MOQ 50 pcs. Free quote.",
    keywords: ["rhinestone transfer", "custom rhinestone apparel", "bling tees", "rhinestone heat press"],
    heroImage: "/techniques/Rhinestone03.webp",
    heroAlt: "Custom rhinestone heat-pressed t-shirt",
    tagline:
      "Pre-arranged rhinestones heat-pressed onto apparel. Eye-catching sparkle for dance, cheer, pageant, performance, and statement streetwear.",
    intro: [
      "Rhinestone heat press is a striking decoration method where pre-arranged rhinestones are applied to the garment using heat and pressure. Each rhinestone is a small acrylic or glass gem that catches light from every angle, creating an unmistakable sparkle effect.",
      "We work with two approaches: pre-designed templates (cheaper, faster) for common layouts like names, numbers, crowns, and motifs; and fully custom layouts where we arrange rhinestones in any pattern you can imagine. The result is high-impact, premium apparel perfect for performance and statement pieces.",
      "Rhinestone decoration is most popular in dance, cheerleading, pageant, country-western, and statement streetwear. We also offer hot-fix and sew-on options for a more permanent application.",
    ],
    quickSpecs: {
      bestFor: "Performance apparel, statement pieces, dance and cheer",
      fabric: "Most fabrics — cotton, polyester, performance blends",
      moq: "50 pieces per design",
      durability: "Good — 30+ washes with proper care",
      cost: "$$$$ — premium specialty technique",
      leadTime: "15–25 days including template design",
    },
    pros: [
      "Maximum sparkle and visual impact",
      "Pre-designed templates are fast and economical",
      "Custom layouts available for unique designs",
      "Works on most fabric types",
      "Hot-fix or sew-on options for different durability needs",
    ],
    bestUseCases: [
      "Dance and cheer uniforms",
      "Pageant and competition wear",
      "Country-western and rodeo apparel",
      "Statement streetwear and hype drops",
      "Performance costumes and team wear",
      "Bridal party and bachelorette apparel",
    ],
    process: [
      { step: 1, title: "Template or custom design", description: "Choose a pre-designed template or send your custom layout. We provide a digital mockup for sign-off." },
      { step: 2, title: "Stone selection", description: "We select stone size, color, and cut. Stock 80+ colors including crystal, AB, metallic, and neon." },
      { step: 3, title: "Template creation", description: "Stones are arranged on a heat-press template using automated pick-and-place for precision." },
      { step: 4, title: "Heat-press application", description: "Template is placed on garment and pressed at 180°C for 15 seconds, fusing the stones to the fabric." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for stone adhesion and pattern accuracy before packing." },
    ],
    faq: [
      { q: "How long do rhinestones last?", a: "With proper care (wash inside out, no fabric softener), rhinestones last 30+ washes. Hot-fix stones are more durable than iron-on." },
      { q: "Can I bring my own design?", a: "Yes. Send us a sketch, image, or description and we will create a digital mockup for your approval before production." },
      { q: "What sizes are available?", a: "SS6 (2mm) up to SS34 (7mm). Most popular are SS10, SS16, and SS20. Larger stones have more sparkle but cost more." },
      { q: "Can you do multi-color designs?", a: "Yes. We can use unlimited stone colors per design. Most popular is a 2-3 color combination with crystal as the base." },
    ],
    related: ["silicone-printing", "metallic-printing", "3d-puff", "cheer-apparel"],
  },

  {
    slug: "metallic-printing",
    name: "Metallic Printing",
    shortName: "Metallic",
    metaTitle: "Metallic Printing | Gold & Silver Foil Apparel | SublimApparel",
    metaDescription:
      "Metallic foil printing in gold, silver, copper, and holographic finishes. Screen print or heat transfer. Premium retail and event apparel. MOQ 50 pcs. Free quote.",
    keywords: ["metallic printing", "gold foil print", "silver foil apparel", "holographic print"],
    heroImage: "/techniques/Metallicprinting01.webp",
    heroAlt: "Metallic gold foil printed t-shirt",
    tagline:
      "Real metal foil — gold, silver, copper, holographic — heat-pressed onto apparel. The premium finish for retail, event merch, and statement designs.",
    intro: [
      "Metallic foil printing uses a thin layer of actual metal foil — gold, silver, copper, rose gold, holographic, and more — applied to the garment via screen print adhesive or heat transfer. The result is a mirror-like, eye-catching finish that screams premium quality.",
      "At SublimApparel, we stock 30+ metallic foil colors including classic gold and silver, rose gold, copper, holographic, and custom color matching. We can apply foil via screen print (most durable) or heat transfer (most flexible, suitable for small runs).",
      "Metallic foil works best on solid-color designs, logos, and statement pieces. It is most popular in premium retail, special event merch, awards, and high-end corporate apparel.",
    ],
    quickSpecs: {
      bestFor: "Premium retail, statement designs, special events",
      fabric: "Cotton, polyester, performance blends — most fabric types",
      moq: "50 pieces per design",
      durability: "Good for screen print foil, 30+ washes",
      cost: "$$$ — premium specialty finish",
      leadTime: "15–25 days",
    },
    pros: [
      "Mirror-like metallic finish that catches light",
      "30+ foil colors including gold, silver, rose gold, holographic",
      "Premium retail and event-ready look",
      "Can be combined with screen print for multi-color designs",
      "Custom foil colors available for large runs",
    ],
    bestUseCases: [
      "Premium retail collections and limited drops",
      "Event merchandise for special occasions",
      "Awards and recognition apparel",
      "Luxury corporate gifts and premium giveaways",
      "Bridal and bridesmaid party apparel",
      "Statement streetwear and hype drops",
    ],
    process: [
      { step: 1, title: "Design adaptation", description: "Design is adapted for foil application. Foil works best on solid shapes, not fine details or small text." },
      { step: 2, title: "Adhesive screen print", description: "For screen-print foil, a special adhesive is printed in the design shape and partially cured." },
      { step: 3, title: "Foil application", description: "Foil sheet is placed over the adhesive and heat-pressed at 160°C, fusing the foil only to the adhesive areas." },
      { step: 4, title: "Peel and inspect", description: "Foil sheet is peeled, leaving metallic finish only on the design. Excess foil is recycled." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for foil adhesion, coverage, and finish consistency." },
    ],
    faq: [
      { q: "What's the difference between foil and metallic ink?", a: "Foil is actual metal that reflects light like a mirror. Metallic ink contains metal particles in a binder — it has a metallic look but doesn't reflect like real foil." },
      { q: "How long does metallic foil last?", a: "With proper care (wash inside out, no harsh detergents), screen-print foil lasts 30+ washes. Heat-transfer foil is slightly less durable." },
      { q: "Can you do rose gold and holographic?", a: "Yes. We stock 30+ foil colors including rose gold, copper, holographic, rainbow, and custom colors for large runs." },
      { q: "Is there a minimum?", a: "50 pieces per design. For smaller runs, heat-transfer foil is more economical but less durable." },
    ],
    related: ["glitter", "silicone-printing", "rhinestone", "premium-screen-printing"],
  },

  {
    slug: "reflective-printing",
    name: "Reflective Printing",
    shortName: "Reflective",
    metaTitle: "Reflective Printing | High-Vis Safety Apparel | SublimApparel",
    metaDescription:
      "Reflective heat-transfer printing for high-visibility and safety apparel. Silver, neon, and 3M Scotchlite options. Workwear, cycling, running. MOQ 50 pcs.",
    keywords: ["reflective printing", "reflective heat transfer", "high vis apparel", "3m scotchlite"],
    heroImage: "/techniques/Reflectiveprinting05.webp",
    heroAlt: "Reflective heat transfer design on athletic apparel",
    tagline:
      "Light-up reflective print for high-visibility workwear, cycling, running, and safety apparel. Looks subtle in daylight, glows bright at night.",
    intro: [
      "Reflective printing uses glass-bead or prismatic heat-transfer material that reflects light back to its source — like a road sign or a cyclist's vest. In daylight the print looks like a subtle silver or colored design; at night, when hit by headlights or flash, it glows bright white or the chosen color.",
      "At SublimApparel, we work with both standard reflective heat-transfer film and 3M Scotchlite reflective material for certified high-visibility applications. Standard reflective is suitable for fashion and athletic apparel; 3M Scotchlite is required for industrial safety and workwear.",
      "Reflective print is most popular in cycling, running, workwear, motorcyclist apparel, and any application where visibility is safety-critical.",
    ],
    quickSpecs: {
      bestFor: "High-vis safety, athletic, cycling, and night visibility",
      fabric: "Performance fabrics, polyester, technical materials",
      moq: "50 pieces per design",
      durability: "Excellent — 50+ washes, certified to ANSI/EN standards",
      cost: "$$$ — specialty safety material",
      leadTime: "15–25 days",
    },
    pros: [
      "Looks subtle in daylight, glows bright at night",
      "Standard reflective for fashion and athletic",
      "3M Scotchlite available for certified high-vis workwear",
      "Complies with ANSI/EN safety standards when properly applied",
      "Cut to any shape or pattern",
    ],
    bestUseCases: [
      "Cycling jerseys and running apparel",
      "Construction and industrial workwear",
      "Motorcyclist and rider gear",
      "Night-event staff uniforms",
      "Walking and outdoor safety apparel",
      "Limited edition hype streetwear with safety aesthetic",
    ],
    process: [
      { step: 1, title: "Material selection", description: "Choose standard reflective (fashion/athletic) or 3M Scotchlite (certified safety). Select color — silver is most common." },
      { step: 2, title: "Cut to shape", description: "Reflective material is cut to design shape using plotter cutter or digital cutting system." },
      { step: 3, title: "Heat-press application", description: "Cut reflective is positioned on the garment and heat-pressed at 160°C for 15 seconds." },
      { step: 4, title: "Peel and inspect", description: "Carrier film is peeled (hot or cold), leaving reflective material bonded to the fabric." },
      { step: 5, title: "QC & pack", description: "Each piece is tested for reflectivity and adhesion before packing." },
    ],
    faq: [
      { q: "What's the difference between standard reflective and 3M Scotchlite?", a: "Standard reflective is suitable for fashion and athletic apparel. 3M Scotchlite is certified to ANSI/EN standards and required for industrial safety workwear." },
      { q: "Does reflective wash out?", a: "No. Properly applied reflective retains its properties for 50+ washes." },
      { q: "Can you do colored reflective?", a: "Yes. Standard reflective comes in silver, gold, and a few limited colors. Custom colored reflective is available for large runs." },
      { q: "Is reflective print expensive?", a: "Reflective material costs more than standard ink, but the safety and visibility benefits are unique. Pricing is comparable to other specialty finishes." },
    ],
    related: ["silicone-printing", "3m-scotchlite", "high-vis", "cycling-apparel"],
  },

  {
    slug: "flocking",
    name: "Flocking Printing",
    shortName: "Flocking",
    metaTitle: "Flocking Printing | Velvety Raised Print | SublimApparel",
    metaDescription:
      "Flocking printing — velvety raised print with a soft suede-like texture. Premium retail, packaging, and special edition apparel. MOQ 50 pcs. Free quote.",
    keywords: ["flocking print", "velvet print", "raised print", "flock apparel"],
    heroImage: "/techniques/Flocking01.webp",
    heroAlt: "Flock printed t-shirt with velvety raised design",
    tagline:
      "Velvety, raised, suede-like texture. Flock printing gives designs a soft, premium 3D feel that screen printing cannot match.",
    intro: [
      "Flocking printing applies short textile fibers (flock) to a printed adhesive, creating a velvety, raised, suede-like surface. The result is a design that you can see and feel — a tactile, premium finish that is unique in the decoration world.",
      "At SublimApparel, we run multi-color flock printing for logos, type, and solid shapes. Flock is most popular in premium retail, packaging, special edition drops, and any application where you want the design to feel like a permanent part of the garment.",
      "Flock is durable, machine-washable, and available in 40+ colors including neon, metallic, and glow-in-the-dark.",
    ],
    quickSpecs: {
      bestFor: "Premium retail, special editions, statement designs",
      fabric: "Cotton, polyester, cotton blends, fleece",
      moq: "50 pieces per design",
      durability: "Excellent — 50+ washes, machine washable",
      cost: "$$$ — specialty finish",
      leadTime: "20–30 days",
    },
    pros: [
      "Unique velvety, raised, suede-like texture",
      "40+ flock colors including neon and glow-in-the-dark",
      "Durable and machine washable",
      "Premium retail-ready look",
      "Can be combined with screen print for multi-effect designs",
    ],
    bestUseCases: [
      "Premium retail and limited edition drops",
      "Sports team crests and club logos",
      "Packaging and brand activation",
      "School and university crested apparel",
      "Statement streetwear and designer collabs",
      "Special event merchandise and awards",
    ],
    process: [
      { step: 1, title: "Adhesive screen print", description: "Adhesive is printed in the design shape using screen printing." },
      { step: 2, title: "Flock application", description: "Garment is placed in a flocking chamber. Electrostatic charge makes flock fibers stand up and embed in the wet adhesive." },
      { step: 3, title: "Cure", description: "Adhesive is cured at 160°C, locking the flock fibers in place." },
      { step: 4, title: "Brush and clean", description: "Excess flock is vacuumed off. Each piece is brushed to remove loose fibers." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for flock coverage, adhesion, and texture consistency." },
    ],
    faq: [
      { q: "Is flock durable?", a: "Yes. Properly applied flock is machine-washable and lasts 50+ washes without significant wear." },
      { q: "Can flock be done in multiple colors?", a: "Yes — each color is a separate screen and flocking pass. We can do up to 4 colors in one design." },
      { q: "What colors are available?", a: "40+ standard colors including white, black, all primary colors, neons, and specialty finishes like glow-in-the-dark and metallic." },
      { q: "Can I see and feel flock?", a: "Absolutely — that's the whole point. Flock is a velvety raised texture you can feel with your fingers." },
    ],
    related: ["silicone-printing", "3d-puff", "embroidery", "premium-retail-printing"],
  },

  {
    slug: "glitter",
    name: "Glitter Printing",
    shortName: "Glitter",
    metaTitle: "Glitter Printing | Sparkle Finish Apparel | SublimApparel",
    metaDescription:
      "Glitter screen printing for sparkle finish on apparel. Custom glitter colors available. Dance, cheer, performance, statement streetwear. MOQ 50 pcs. Free quote.",
    keywords: ["glitter print", "glitter t-shirts", "sparkle screen print", "glitter heat transfer"],
    heroImage: "/techniques/Glitter05.webp",
    heroAlt: "Glitter printed t-shirt with sparkle finish",
    tagline:
      "Sparkle, shimmer, and shine. Glitter printing adds a high-impact decorative finish perfect for performance, party, and statement apparel.",
    intro: [
      "Glitter printing uses real glitter particles suspended in a clear ink base, applied via screen print or heat transfer. The result is a high-shine, multi-dimensional sparkle that catches light from every angle.",
      "At SublimApparel, we stock 30+ glitter colors including silver, gold, holographic, and custom color blends. Glitter can be applied via screen print (most durable) or heat transfer (best for small runs and complex shapes).",
      "Glitter is most popular in dance, cheerleading, performance, party apparel, and statement streetwear. For maximum impact, it can be combined with other techniques like rhinestones or screen print.",
    ],
    quickSpecs: {
      bestFor: "Performance, party, statement, festival apparel",
      fabric: "Most fabrics — cotton, polyester, performance blends",
      moq: "50 pieces per design",
      durability: "Good — 30+ washes with proper care",
      cost: "$$$ — specialty finish",
      leadTime: "15–25 days",
    },
    pros: [
      "High-impact sparkle that catches light",
      "30+ glitter colors including holographic and custom",
      "Screen print or heat transfer options",
      "Can be combined with other techniques for layered effects",
      "Machine washable with proper care",
    ],
    bestUseCases: [
      "Dance and cheer uniforms",
      "Festival and party apparel",
      "Statement streetwear and hype drops",
      "Performance costumes and competition wear",
      "Birthday and celebration apparel",
      "Cosplay and costume design",
    ],
    process: [
      { step: 1, title: "Glitter color selection", description: "Choose from 30+ stock glitter colors or request a custom blend. Holographic and iridescent options available." },
      { step: 2, title: "Screen print or heat transfer", description: "For screen print, glitter ink is mixed and printed directly. For heat transfer, glitter is pre-applied to transfer film." },
      { step: 3, title: "Application", description: "Screen print glitter is applied with a heavy squeegee. Heat transfer is applied at 160°C for 15 seconds." },
      { step: 4, title: "Cure (screen print)", description: "Glitter ink is cured at 160°C to bond the glitter particles to the fabric." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for glitter coverage, adhesion, and color consistency." },
    ],
    faq: [
      { q: "Does glitter wash off?", a: "With proper care (wash inside out, no fabric softener), glitter print lasts 30+ washes. Screen print glitter is more durable than heat transfer." },
      { q: "Is glitter environmentally friendly?", a: "Modern glitter is often made from cellulose rather than plastic. We can source eco-friendly glitter options for sustainable collections." },
      { q: "Can I see glitter colors before ordering?", a: "Yes. We can send a glitter color card for sign-off before production, or create a strike-off sample for a small fee." },
      { q: "How much does glitter cost extra?", a: "Glitter is priced as a specialty finish — typically 2-3x the cost of standard screen print. Pricing depends on coverage area and design complexity." },
    ],
    related: ["rhinestone", "metallic-printing", "silicone-printing", "performance-apparel"],
  },

  {
    slug: "silicone-printing",
    name: "Silicone Heat Transfer Printing",
    shortName: "Silicone",
    metaTitle: "Silicone Heat Transfer Printing | 3D Rubber Print | SublimApparel",
    metaDescription:
      "Silicone heat transfer printing — 3D rubber finish with soft, flexible, durable feel. Premium retail and athletic apparel. MOQ 50 pcs. Free quote.",
    keywords: ["silicone printing", "silicone heat transfer", "rubber print", "3d silicone"],
    heroImage: "/techniques/Siliconeprinting05.webp",
    heroAlt: "Silicone heat transfer printed t-shirt detail",
    tagline:
      "3D rubber finish with soft, flexible, durable feel. Silicone transfers give designs a premium raised look that screen printing can't match.",
    intro: [
      "Silicone heat transfer printing uses 3D silicone material cut to design shape and heat-pressed onto the garment. The result is a soft, flexible, raised design with a rubber-like finish — perfect for premium retail, athletic wear, and statement streetwear.",
      "At SublimApparel, we stock 50+ silicone colors including fluorescent, metallic, and custom Pantone matching. Silicone can be cut to any shape — including fine details, small text, and complex logos — making it more versatile than 3D puff or flocking for intricate designs.",
      "Silicone transfers are most popular in premium streetwear, athletic apparel, sports team logos, and any application where you want a tactile, durable, raised design.",
    ],
    quickSpecs: {
      bestFor: "Premium retail, athletic, statement streetwear",
      fabric: "Most fabrics — cotton, polyester, performance blends",
      moq: "50 pieces per design",
      durability: "Excellent — 50+ washes, machine washable",
      cost: "$$$ — specialty finish",
      leadTime: "15–25 days",
    },
    pros: [
      "Soft, flexible, rubber-like 3D finish",
      "Can be cut to intricate shapes and fine details",
      "50+ colors including fluorescent and metallic",
      "Machine washable and highly durable",
      "Premium retail and athletic-ready look",
    ],
    bestUseCases: [
      "Premium streetwear and urban fashion",
      "Athletic and performance apparel",
      "Sports team logos and club crests",
      "Yoga and activewear brands",
      "Limited edition drops and designer collabs",
      "Premium corporate and team apparel",
    ],
    process: [
      { step: 1, title: "Color selection", description: "Choose from 50+ silicone colors. Pantone matching available for large runs." },
      { step: 2, title: "Cut to shape", description: "Silicone material is precision-cut to design shape using plotter or laser cutter." },
      { step: 3, title: "Heat-press application", description: "Cut silicone is positioned on garment and heat-pressed at 160°C for 15 seconds." },
      { step: 4, title: "Peel carrier", description: "Carrier film is peeled, leaving 3D silicone bonded to the fabric." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for adhesion, edge quality, and shape consistency." },
    ],
    faq: [
      { q: "Is silicone different from rubber?", a: "Yes — silicone is a synthetic polymer with better flexibility, durability, and temperature resistance than traditional rubber. It feels softer and lasts longer." },
      { q: "Can silicone do fine details?", a: "Yes. Silicone can be precision-cut to fine details, small text, and complex shapes — more versatile than 3D puff or flocking for intricate designs." },
      { q: "Does silicone last?", a: "Properly applied silicone transfers last 50+ washes without significant wear, peeling, or fading." },
      { q: "How much does silicone cost?", a: "Silicone is priced as a specialty finish — typically 2-4x the cost of standard screen print, depending on size and design complexity." },
    ],
    related: ["flocking", "3d-puff", "embroidery", "premium-retail-printing"],
  },

  {
    slug: "embossing",
    name: "Embossing / Debossing",
    shortName: "Embossing",
    metaTitle: "Embossing & Debossing | Raised & Recessed Designs | SublimApparel",
    metaDescription:
      "Heat-press embossing and debossing for raised or recessed designs on caps, leather, performance fabrics. Premium retail and brand apparel. MOQ 50 pcs.",
    keywords: ["embossing apparel", "debossing caps", "raised design", "leather embossing"],
    heroImage: "/techniques/Embossingpress02.webp",
    heroAlt: "Embossed leather patch detail on cap",
    tagline:
      "Raised (embossed) or recessed (debossed) designs pressed into the fabric. Premium, subtle, and tactile — perfect for leather, caps, and luxury apparel.",
    intro: [
      "Embossing and debossing use heat and pressure to create raised (embossed) or recessed (debossed) designs on fabric, leather, or synthetic materials. Unlike printing, no ink is used — the design is part of the material itself.",
      "At SublimApparel, we run heat-press embossing for caps, leather patches, performance fabrics, and synthetic materials. Embossing is most popular for premium leather goods, branded caps, and luxury retail apparel where the design should feel like a permanent part of the material.",
      "Embossing creates a subtle, premium, tactile effect that printing cannot replicate. Debossing (recessed) is even more understated — popular for high-end leather goods and minimalist design.",
    ],
    quickSpecs: {
      bestFor: "Premium leather, caps, luxury apparel, minimalist design",
      fabric: "Leather, faux leather, performance fabrics, structured materials",
      moq: "50 pieces per design",
      durability: "Lifetime — design is part of the material",
      cost: "$$$$ — specialty premium technique",
      leadTime: "20–30 days including die making",
    },
    pros: [
      "Subtle, premium, tactile design without ink",
      "Embossed (raised) or debossed (recessed) options",
      "Design is part of the material — cannot fade or peel",
      "Perfect for leather, caps, and luxury goods",
      "Custom dies for any shape or logo",
    ],
    bestUseCases: [
      "Premium leather goods and accessories",
      "Luxury retail and designer apparel",
      "High-end caps and headwear",
      "Brand patches and leather labels",
      "Minimalist and understated branding",
      "Genuine leather and vegan leather goods",
    ],
    process: [
      { step: 1, title: "Die creation", description: "Custom metal die is created in the design shape. Brass dies for production, magnesium for samples." },
      { step: 2, title: "Heat die", description: "Die is heated to precise temperature (varies by material — leather needs lower heat than synthetics)." },
      { step: 3, title: "Press", description: "Material is placed in heat press. Die is pressed for 5-15 seconds under high pressure." },
      { step: 4, title: "Cool and inspect", description: "Material is cooled and inspected. Embossed areas should be clearly raised; debossed clearly recessed." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for design depth, clarity, and consistency." },
    ],
    faq: [
      { q: "Can you emboss on any fabric?", a: "No. Embossing works best on materials that hold shape under heat and pressure — leather, faux leather, performance fabrics, structured caps. Soft fabrics like jersey cotton don't emboss well." },
      { q: "What's the difference between embossing and debossing?", a: "Embossing raises the design above the material surface. Debossing recesses it into the surface. Embossing is more common; debossing is more subtle." },
      { q: "How long does embossing last?", a: "Forever. The design is part of the material, not an applied layer. It cannot fade, peel, or wash off." },
      { q: "Is embossing expensive?", a: "There is a one-time die-making cost (~$80-200 per design), plus per-piece pressing. Total cost is similar to other premium finishes like 3D puff." },
    ],
    related: ["embroidery", "silicone-printing", "leather-patches", "luxury-apparel"],
  },

  {
    slug: "applique-embroidery",
    name: "Applique Embroidery",
    shortName: "Applique",
    metaTitle: "Applique Embroidery | Sewn-On Fabric Patches | SublimApparel",
    metaDescription:
      "Applique embroidery — sewn-on fabric patches with embroidered borders. Sports, varsity, and statement apparel. MOQ 50 pcs. Free quote.",
    keywords: ["applique embroidery", "sewn-on patch", "varsity apparel", "fabric applique"],
    heroImage: "/techniques/Appliqueembroidery04.webp",
    heroAlt: "Applique embroidery on varsity jacket",
    tagline:
      "Sewn-on fabric patches with embroidered borders. The signature look of varsity jackets, sports team wear, and statement streetwear.",
    intro: [
      "Applique embroidery combines a sewn-on fabric patch with embroidered borders and detail. The result is a layered, dimensional, premium look that is unmistakable — and that you cannot get from any other decoration method.",
      "At SublimApparel, we cut applique fabric to shape, sew it onto the garment, and add embroidered borders, lettering, and details. We can use twill, felt, sublimated polyester, or any custom fabric for the applique base.",
      "Applique is most popular in varsity jackets, sports team wear, country-western, and premium streetwear. It is the technique behind most collegiate and professional sports crests.",
    ],
    quickSpecs: {
      bestFor: "Varsity jackets, sports team wear, statement streetwear",
      fabric: "Most base fabrics — cotton, polyester, fleece, performance",
      moq: "50 pieces per design",
      durability: "Lifetime — patches and stitches are permanent",
      cost: "$$$$ — premium multi-step technique",
      leadTime: "20–30 days",
    },
    pros: [
      "Layered, dimensional, premium look",
      "Uses any fabric for the applique base (twill, felt, sublimated poly)",
      "Embroidered borders and details add dimension",
      "Lifetime durability — patches are sewn on, not glued",
      "Classic varsity, sports, and country-western aesthetic",
    ],
    bestUseCases: [
      "Varsity and letterman jackets",
      "Sports team crests and club logos",
      "Country-western and rodeo apparel",
      "Premium streetwear and designer collabs",
      "School and university merchandise",
      "Statement hype and limited edition drops",
    ],
    process: [
      { step: 1, title: "Design and fabric selection", description: "Design is finalized. Applique base fabric is selected — twill, felt, sublimated polyester, or custom." },
      { step: 2, title: "Fabric cutting", description: "Applique base fabric is cut to design shape using laser cutter or plotter for precision." },
      { step: 3, title: "Sew on applique", description: "Applique piece is positioned on the garment and tacked in place with temporary adhesive." },
      { step: 4, title: "Embroider borders", description: "Embroidered borders and details are sewn around the applique, locking it in place and adding dimension." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for applique alignment, border quality, and stitch consistency." },
    ],
    faq: [
      { q: "Can I use my own fabric for applique?", a: "Yes — we can use any fabric you supply. We also stock twill, felt, sublimated polyester, and other common applique fabrics." },
      { q: "Is applique expensive?", a: "Applique is a premium multi-step technique. Pricing is higher than flat embroidery but lower than complex multi-layer embroidery designs." },
      { q: "Can applique be done on caps?", a: "Yes — applique is very popular on caps, especially for sports, country-western, and streetwear brands." },
      { q: "How long does applique last?", a: "Forever. The applique fabric is sewn on (not glued), and embroidered borders are permanent stitches." },
    ],
    related: ["embroidery", "3d-puff", "terry-embroidery", "varsity-apparel"],
  },

  {
    slug: "beaded",
    name: "Beaded Embroidery",
    shortName: "Beaded",
    metaTitle: "Beaded Embroidery | Custom Bead Work | SublimApparel",
    metaDescription:
      "Custom beaded embroidery — hand-beaded and machine-beaded designs on apparel. Bridal, evening, and luxury apparel. MOQ 50 pcs. Free quote.",
    keywords: ["beaded embroidery", "custom bead work", "hand beaded apparel", "bead embroidery"],
    heroImage: "/techniques/Beadedembroidery01.webp",
    heroAlt: "Beaded embroidery detail on luxury apparel",
    tagline:
      "Hand-beaded and machine-beaded designs on apparel. The signature look of bridal, evening wear, and luxury couture.",
    intro: [
      "Beaded embroidery applies individual glass, crystal, or seed beads to the garment in intricate patterns — either by hand for couture-quality work, or by machine for faster, more cost-effective production.",
      "At SublimApparel, we run machine beaded embroidery for production runs and partner with artisan beaders in Yiwu's craft district for hand-beaded couture work. We stock 200+ bead types including glass, crystal, pearl, seed, sequin, and specialty shapes.",
      "Beaded embroidery is most popular in bridal, evening wear, runway, and luxury couture. It is also striking on statement streetwear and high-end festival wear.",
    ],
    quickSpecs: {
      bestFor: "Bridal, evening wear, luxury couture, statement designs",
      fabric: "Silk, satin, tulle, velvet, fine cotton, performance fabrics",
      moq: "50 pieces per design (lower for hand-beaded couture)",
      durability: "Excellent — beads are individually secured",
      cost: "$$$$$ — premium hand-crafted technique",
      leadTime: "30–60 days for hand-beaded, 20–30 days for machine",
    },
    pros: [
      "Most premium, couture-quality decoration available",
      "Hand-beaded for one-of-a-kind luxury pieces",
      "Machine-beaded for production runs",
      "200+ bead types and colors",
      "Works on delicate and luxury fabrics",
    ],
    bestUseCases: [
      "Bridal and wedding party apparel",
      "Evening wear and red-carpet gowns",
      "Runway and designer fashion",
      "Luxury couture and bespoke pieces",
      "Statement streetwear and hype drops",
      "Performance costumes and competition wear",
    ],
    process: [
      { step: 1, title: "Design and bead selection", description: "Design is finalized. Bead types, colors, and sizes are selected from 200+ options." },
      { step: 2, title: "Pattern mapping", description: "Design is mapped into a digitizing file that tells the machine (or beader) where each bead goes." },
      { step: 3, title: "Machine or hand application", description: "Beads are applied — by machine for production runs, by hand for couture and small batches." },
      { step: 4, title: "Secure and inspect", description: "Each bead is secured with stitches. Loose beads are removed and reattached." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for bead placement, security, and overall design accuracy. Packed in protective boxes." },
    ],
    faq: [
      { q: "How long does beaded embroidery take?", a: "Hand-beading is labor-intensive — a single couture piece can take 20-100 hours. Machine-beaded production runs are faster (20-30 days total)." },
      { q: "Can I bring my own beads?", a: "Yes. We work with your supplied beads for brand consistency, or we source from our 200+ bead library." },
      { q: "How much does beaded embroidery cost?", a: "Hand-beaded couture is the most expensive decoration method — pricing depends on bead density, design complexity, and quantity. Machine-beaded is more affordable." },
      { q: "Can you do beaded logos?", a: "Yes. Beaded logos are popular in luxury streetwear and brand activations. We can digitize any logo into a beaded design." },
    ],
    related: ["embroidery", "rhinestone", "applique", "couture-embroidery"],
  },

  {
    slug: "terry",
    name: "Terry Embroidery (Chenille)",
    shortName: "Terry",
    metaTitle: "Terry Chenille Embroidery | Varsity Lettering | SublimApparel",
    metaDescription:
      "Terry chenille embroidery — fluffy textured letters and patches. Varsity jackets, sports team wear, statement apparel. MOQ 50 pcs. Free quote.",
    keywords: ["terry embroidery", "chenille embroidery", "varsity lettering", "fluffy letters"],
    heroImage: "/techniques/Terryembroidery02.webp",
    heroAlt: "Terry chenille embroidered varsity lettering",
    tagline:
      "Fluffy, textured chenille letters and patches. The signature look of varsity jackets, letterman sweaters, and retro sportswear.",
    intro: [
      "Terry embroidery (also called chenille embroidery) uses a special fluffy yarn to create raised, textured letters and patches with a soft, almost three-dimensional pile. The result is unmistakable — the look of varsity jackets, letterman sweaters, and retro sportswear.",
      "At SublimApparel, we run terry embroidery on varsity jackets, hoodies, sweaters, and caps. Terry is typically used for large letters (names, numbers, words) and is often combined with twill applique or flat embroidery for borders and details.",
      "Terry embroidery is most popular in collegiate apparel, sports team wear, streetwear, and any design that wants a retro, varsity, or athletic feel.",
    ],
    quickSpecs: {
      bestFor: "Varsity, sports team wear, retro streetwear",
      fabric: "Varsity jackets, hoodies, sweaters, fleece, caps",
      moq: "50 pieces per design",
      durability: "Excellent — chenille yarn is permanent",
      cost: "$$$$ — premium specialty technique",
      leadTime: "20–30 days",
    },
    pros: [
      "Distinctive fluffy, raised texture",
      "Classic varsity and retro sportswear aesthetic",
      "Often combined with twill applique for premium look",
      "Durable — chenille yarn is permanent and colorfast",
      "Statement-making on jackets, hoodies, and caps",
    ],
    bestUseCases: [
      "Varsity and letterman jackets",
      "Sports team and club apparel",
      "Retro streetwear and hype drops",
      "Collegiate and school merchandise",
      "Hoodies, crewnecks, and caps",
      "Throwback athletic and 90s-inspired designs",
    ],
    process: [
      { step: 1, title: "Design and color selection", description: "Design is finalized. Chenille yarn color and twill border color are selected." },
      { step: 2, title: "Chenille cutting", description: "Chenille yarn is cut to design shape using embroidery machine with special chenille needle." },
      { step: 3, title: "Twill applique base", description: "Twill fabric base is cut and sewn onto the garment first (for letterform designs)." },
      { step: 4, title: "Chenille embroidery", description: "Chenille yarn is embroidered on top of the twill base, creating the fluffy raised effect." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for chenille density, color, and design accuracy." },
    ],
    faq: [
      { q: "Is terry the same as chenille?", a: "Yes. Terry embroidery and chenille embroidery are two names for the same technique. The yarn looks like terry cloth (like a towel), which is where the name comes from." },
      { q: "Can terry be done in any color?", a: "Yes. We stock 50+ chenille yarn colors. Custom colors are available for large runs." },
      { q: "Does terry last?", a: "Yes. Chenille yarn is permanent and colorfast. With proper care, terry embroidery lasts the life of the garment." },
      { q: "Can you do terry on caps?", a: "Yes — terry is popular on retro and athletic caps, especially for sports teams and streetwear brands." },
    ],
    related: ["applique", "embroidery", "3d-puff", "varsity-apparel"],
  },

  {
    slug: "yarn",
    name: "Yarn Embroidery",
    shortName: "Yarn",
    metaTitle: "Yarn Embroidery | Custom Stitch Patterns | SublimApparel",
    metaDescription:
      "Custom yarn embroidery for textured, hand-stitched looks. Boho, artisan, and premium casual apparel. MOQ 50 pcs. Free quote.",
    keywords: ["yarn embroidery", "hand-stitched", "artisan embroidery", "textured yarn"],
    heroImage: "/techniques/Yarnembroidery01.webp",
    heroAlt: "Yarn embroidery detail on boho apparel",
    tagline:
      "Thick yarn stitched into patterns for a hand-crafted, artisan look. Perfect for boho, premium casual, and statement pieces.",
    intro: [
      "Yarn embroidery uses thick, often hand-dyed yarn stitched into patterns and shapes for a textured, hand-crafted look. The result is warmer, more dimensional, and more artisanal than standard thread embroidery.",
      "At SublimApparel, we run yarn embroidery in cotton, wool, silk, and specialty blends. We can use single-color or multi-color yarn, and the result ranges from subtle texture to bold statement pieces.",
      "Yarn embroidery is most popular in boho fashion, premium casual wear, statement streetwear, and artisan collections.",
    ],
    quickSpecs: {
      bestFor: "Boho, premium casual, artisan, statement pieces",
      fabric: "Heavy cotton, wool, knit, fleece, denim",
      moq: "50 pieces per design",
      durability: "Excellent — yarn is permanent",
      cost: "$$$$ — specialty hand-crafted technique",
      leadTime: "20–30 days",
    },
    pros: [
      "Textured, hand-crafted, artisan look",
      "Multiple yarn types: cotton, wool, silk, blends",
      "Single or multi-color options",
      "Premium and statement-making",
      "Perfect for boho and casual luxury",
    ],
    bestUseCases: [
      "Boho and festival fashion",
      "Premium casual wear and knitwear",
      "Statement streetwear and designer collabs",
      "Artisan and craft-inspired collections",
      "Cozy and warm-season apparel",
      "Heritage and rustic branding",
    ],
    process: [
      { step: 1, title: "Yarn selection", description: "Yarn type, weight, and color are selected. We stock cotton, wool, silk, and specialty yarn blends." },
      { step: 2, title: "Digitizing", description: "Design is converted into a yarn embroidery file with optimized stitch paths for the thick yarn." },
      { step: 3, title: "Sample run", description: "First piece is embroidered, photographed, and approved before bulk production." },
      { step: 4, title: "Production embroidery", description: "Yarn is embroidered across the full run on heavy-duty embroidery machines with yarn-friendly needles." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for yarn consistency, color, and design accuracy." },
    ],
    faq: [
      { q: "What's the difference between yarn and thread embroidery?", a: "Yarn embroidery uses thick, often hand-dyed yarn for a textured, hand-crafted look. Thread embroidery uses fine polyester or rayon thread for a flat, precise look." },
      { q: "Can yarn embroidery be done on any fabric?", a: "Yarn embroidery works best on heavier fabrics — wool, heavy cotton, fleece, denim. Light fabrics like silk may pucker." },
      { q: "Is yarn embroidery expensive?", a: "Yarn embroidery is priced similarly to 3D puff and other premium techniques. Higher than standard thread embroidery due to the specialty yarn." },
      { q: "Can I bring my own yarn?", a: "Yes. We work with your supplied yarn for brand consistency, or we source from our yarn library." },
    ],
    related: ["terry", "applique", "embroidery", "artisan-embroidery"],
  },

  {
    slug: "overall-printing",
    name: "Overall Printing (All-Over Sublimation)",
    shortName: "Overall Print",
    metaTitle: "All-Over Sublimation Printing | Full Coverage Apparel | SublimApparel",
    metaDescription:
      "All-over sublimation printing — edge-to-edge full coverage on cut-and-sew apparel. Esports, racing, cycling, streetwear. MOQ 50 pcs. Free quote.",
    keywords: ["all over print", "overall printing", "edge to edge print", "cut and sew sublimation"],
    heroImage: "/techniques/Overallprinting05.webp",
    heroAlt: "All-over sublimated t-shirt with edge-to-edge print",
    tagline:
      "True edge-to-edge full-coverage printing on cut-and-sew apparel. The only way to put artwork on every surface of a garment.",
    intro: [
      "Overall printing (also called all-over print or AOP) uses sublimation to dye the entire garment — front, back, sleeves, side panels, even collars and cuffs — with continuous artwork. There are no print area limits, no color count limits, and no raised print surface.",
      "At SublimApparel, we specialize in all-over sublimation on cut-and-sew apparel. The fabric is printed in rolls, then cut to garment panels, sewn, and finished. Panels are printed together so they match perfectly when assembled.",
      "All-over print is the technique behind most esports jerseys, cycling kits, racing suits, festival merch, and statement streetwear. It is also used for one-off custom designs and limited drops.",
    ],
    quickSpecs: {
      bestFor: "All-over print, full-coverage artwork, cut-and-sew apparel",
      fabric: "Polyester and polyester blends (100% recommended)",
      moq: "50 pieces per design",
      durability: "Lifetime — print is part of the fiber",
      cost: "$$$ — premium but cost-effective for full coverage",
      leadTime: "20–30 days including sample",
    },
    pros: [
      "True edge-to-edge print with no print area limits",
      "Photographic detail and unlimited colors",
      "Print will never peel, crack, or fade",
      "Soft hand-feel — zero raised print surface",
      "Panels printed together for perfect alignment",
    ],
    bestUseCases: [
      "Esports team jerseys and tournament kits",
      "Cycling jerseys and triathlon suits",
      "Racing suits and motorsport apparel",
      "Festival merch and concert tour apparel",
      "All-over print streetwear collections",
      "Event staff uniforms and brand activation wear",
    ],
    process: [
      { step: 1, title: "Panel pattern design", description: "Garment is broken into panels (front, back, sleeves, side). Artwork is mapped to each panel with seam allowances." },
      { step: 2, title: "Wide-format print", description: "Entire fabric roll is printed in one pass on 1.9m wide sublimation printer at 4,800 × 1,200 DPI." },
      { step: 3, title: "Cut panels", description: "Printed fabric is cut to garment panel shapes using CNC cutter or laser for precision." },
      { step: 4, title: "Heat-press set", description: "Some all-over prints are heat-pressed at 200°C / 30 sec to ensure full dye transfer." },
      { step: 5, title: "Sew & finish", description: "Panels are sewn into final garments. Every seam, hem, and detail is finished in-house." },
    ],
    faq: [
      { q: "Can you do all-over print on cotton?", a: "Sublimation all-over print only works on polyester. For cotton, we recommend DTG (no all-over) or DTF transfers (limited coverage)." },
      { q: "Is there a minimum print area?", a: "No. All-over print is the only technique with no print area limits — edge to edge, including over seams." },
      { q: "Can I see a sample before bulk?", a: "Yes. We produce a strike-off sample (1-2 pieces) for sign-off before bulk production. Sample lead time is 7-10 days." },
      { q: "How long does all-over print last?", a: "Lifetime. The dye becomes part of the polyester fiber, so the print is colorfast for the life of the garment." },
    ],
    related: ["sublimation", "cut-and-sew", "esports-apparel", "cycling-apparel"],
  },

  {
    slug: "laser-engraving",
    name: "Laser Engraving",
    shortName: "Laser",
    metaTitle: "Laser Engraving Apparel | Permanent Mark | SublimApparel",
    metaDescription:
      "Laser engraving on apparel, leather, denim, and performance fabrics. Permanent, tone-on-tone, premium retail and brand. MOQ 50 pcs. Free quote.",
    keywords: ["laser engraving apparel", "laser etched denim", "tone on tone", "leather laser"],
    heroImage: "/techniques/Laserengraving05.webp",
    heroAlt: "Laser engraved logo on apparel",
    tagline:
      "Precision laser etching on leather, denim, performance fabrics. Permanent, tone-on-tone, and unmistakably premium.",
    intro: [
      "Laser engraving uses a focused laser beam to burn, etch, or mark designs directly into the fabric. No ink is used — the design is created by the laser's interaction with the material itself, producing a tone-on-tone mark that is permanent and premium.",
      "At SublimApparel, we run industrial CO2 and fiber laser systems suitable for leather, faux leather, denim, performance fabrics, and technical materials. Each material has its own optimal settings for clean, consistent results.",
      "Laser engraving is most popular in premium denim, leather goods, performance apparel, and luxury streetwear. It is the technique behind many high-end fashion labels' branded pieces.",
    ],
    quickSpecs: {
      bestFor: "Premium denim, leather, performance fabrics, luxury apparel",
      fabric: "Leather, faux leather, denim, technical fabrics, felt, wood",
      moq: "50 pieces per design",
      durability: "Lifetime — mark is part of the material",
      cost: "$$$ — premium technique",
      leadTime: "15–25 days including material testing",
    },
    pros: [
      "Permanent mark — cannot fade, peel, or wash off",
      "Tone-on-tone, understated premium look",
      "No ink, no chemicals, eco-friendly",
      "Works on materials that other methods can't (leather, denim)",
      "Highly precise — fine details and small text possible",
    ],
    bestUseCases: [
      "Premium denim and jeans branding",
      "Leather goods and accessories",
      "Performance and technical apparel",
      "Luxury streetwear and designer collabs",
      "Branded patches and labels",
      "Eco-friendly and sustainable collections",
    ],
    process: [
      { step: 1, title: "Material testing", description: "Test cuts are run on your specific material to dial in laser power, speed, and frequency." },
      { step: 2, title: "Design digitization", description: "Design is converted to laser-compatible vector file with appropriate kerf and detail settings." },
      { step: 3, title: "Garment positioning", description: "Garment is positioned in the laser work area. Layout is optimized for efficient production." },
      { step: 4, title: "Laser engraving", description: "Laser beam etches the design into the material at controlled power, speed, and depth." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for engraving quality, consistency, and material integrity." },
    ],
    faq: [
      { q: "Does laser engraving damage the fabric?", a: "No — when properly set up. Our process includes material testing to ensure clean, consistent engraving without weakening the fabric." },
      { q: "Can laser engraving do fine details?", a: "Yes. Laser engraving is highly precise — fine details, small text, and complex logos are all possible." },
      { q: "What colors can laser engraving produce?", a: "Laser engraving is tone-on-tone — the mark is the natural color of the burned material. On denim it's white-ish; on leather it's darker brown; on performance fabrics it depends on the material." },
      { q: "Is laser engraving eco-friendly?", a: "Yes. No ink, no chemicals, no water. Just light and material." },
    ],
    related: ["embossing", "silicone-printing", "embroidery", "premium-denim"],
  },

  {
    slug: "3d-embroidery",
    name: "3D Embroidery",
    shortName: "3D Embroidery",
    metaTitle: "3D Embroidery | Foam-Raised Stitching | SublimApparel",
    metaDescription:
      "3D embroidery with foam underlay for raised, sculptural logos. Premium streetwear, caps, and corporate apparel. MOQ 50 pcs. Free quote.",
    keywords: ["3d embroidery", "raised embroidery", "foam embroidery", "sculpted logo"],
    heroImage: "/techniques/3Dembroidery05.webp",
    heroAlt: "3D embroidered logo with raised foam effect",
    tagline:
      "Foam-backed stitching that raises logos off the fabric. The premium, sculptural look of 3D embroidery — closer to the original artwork than flat stitch.",
    intro: [
      "3D embroidery uses a foam underlay placed under the stitches, raising the design up off the fabric in a sculptural, dimensional way. The result is a closer match to the original artwork than flat embroidery — and an unmistakable premium look.",
      "At SublimApparel, we run 3D embroidery on caps, structured polos, heavyweight hoodies, and streetwear. We use high-density foam in 1mm, 2mm, and 3mm thicknesses to control dimension, and 200+ thread colors for matching any brand palette.",
      "3D embroidery works best with clean, bold designs — heavy line weights, large solid areas, and minimal fine detail. For complex artwork, flat embroidery or 3D puff may be better fits.",
    ],
    quickSpecs: {
      bestFor: "Streetwear logos, caps, corporate apparel, sculptural designs",
      fabric: "Structured caps, heavyweight cotton, twill, fleece, performance",
      moq: "50 pieces per design",
      durability: "Lifetime — stitches and foam do not degrade",
      cost: "$$$$ — premium specialty technique",
      leadTime: "20–30 days including foam sourcing",
    },
    pros: [
      "Sculptural, dimensional premium look",
      "Closer to original artwork than flat stitch",
      "Stitches and foam last the life of the garment",
      "Strong visual impact on caps and structured fabrics",
      "Customizable foam thickness for different effects",
    ],
    bestUseCases: [
      "Premium streetwear and urban fashion",
      "Sports caps and structured headwear",
      "Hip-hop, skate, and surf brand merchandise",
      "Premium corporate caps and club merchandise",
      "Limited edition drops and hype releases",
      "Sculptural and dimensional brand logos",
    ],
    process: [
      { step: 1, title: "Design optimization", description: "Design is checked for 3D embroidery compatibility. Fine details and gradients are simplified or removed." },
      { step: 2, title: "Digitizing with foam underlay", description: "Stitch file is created with a foam underlay layer that sits beneath the top stitches." },
      { step: 3, title: "Foam placement", description: "Foam is cut to design shape and placed on the garment before embroidery." },
      { step: 4, title: "Embroider", description: "Stitches are sewn through the foam, locking it in place and raising the design off the fabric." },
      { step: 5, title: "QC & pack", description: "Each piece is inspected for foam stability, stitch quality, and dimensional consistency." },
    ],
    faq: [
      { q: "What's the difference between 3D embroidery and 3D puff?", a: "3D embroidery uses foam underlay with stitches sewn on top. 3D puff is a similar concept but typically used for print-style designs. Both create raised, dimensional effects." },
      { q: "Can I do 3D embroidery on garments other than caps?", a: "Yes — we run 3D embroidery on heavyweight hoodies, structured polos, and twill jackets. The fabric needs to be firm enough to support the foam." },
      { q: "Does 3D embroidery last?", a: "Yes. The foam and stitches are permanent. 3D embroidery lasts the life of the garment." },
      { q: "Can any design be 3D embroidered?", a: "Bold, simple designs work best. Fine details, small text (under 8mm), and gradients are not recommended for 3D embroidery — we recommend flat embroidery for those." },
    ],
    related: ["embroidery", "3d-puff", "applique", "streetwear-embroidery"],
  },
];

export const getTechniqueBySlug = (slug: string): Technique | undefined =>
  techniques.find((t) => t.slug === slug);

export const getRelatedTechniques = (slugs: string[]): Technique[] =>
  slugs.map((s) => getTechniqueBySlug(s)).filter((t): t is Technique => Boolean(t));
