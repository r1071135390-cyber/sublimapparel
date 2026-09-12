import { Metadata } from"next";
import { buildPageMetadata } from "@/lib/page-metadata";
import Link from"next/link";
import Image from"next/image";
import { CheckCircle2, Sparkles, Plus } from"lucide-react";
import { JsonLd } from"@/components/json-ld";
import { buildTechniqueHubGraph } from"@/lib/breadcrumb";

export const metadata = buildPageMetadata({
    // 2026-09-11 (R15-P0-1): was 77 chars and explicitly truncated. Rewrote to 58 chars.
    title: "Print Technique Comparison | 20 Methods for Custom Apparel",
    description: "Compare 20 apparel decoration techniques — sublimation, screen printing, DTG, DTF, embroidery, 3D puff & rhinestone. We run all 20 in-house and accept custom t…",
    keywords: ["sublimation printing", "screen printing techniques", "DTG vs DTF", "custom embroidery", "all-over printing", "3D puff printing", "rhinestone apparel", "Chinese apparel factory"],
    // 2026-09-11 (Round 15 P0-3): was `alternates: { canonical:"./" }` — implicit
    // self-referential. Switching to an explicit absolute path "/technique/" so
    // the preferred URL is unambiguous to crawlers, matching the canonical pattern
    // used on every other page on the site.
    canonical: "/technique/",
    other: {
    "article:author": "Ramon Wang, Sales Director, SublimApparel",
    "article:published_time": "2024-01-15T00:00:00.000Z",
    "article:modified_time": "2025-08-18T00:00:00.000Z",
  },
    ogTitle: "Which Print Technique Fits Your Design? — 20 Methods Compared",
    ogDescription: "20 decoration techniques, compared. Sublimation, screen print, DTG, DTF, embroidery, 3D puff, rhinestone and more — costs, d…",
    // 2026-09-11 (Round 15 P0-1): was "/technique/" — a page URL, not an
  // image. Social crawlers would render a broken share card. Defaulting
  // to /og-default.jpg for the techniques hub.
  ogImage: "/og-default.jpg",
});;

// Speed up static generation by skipping unnecessary work
export const revalidate = false;

const techniques = [
  {
    name:"Sublimation Printing",
    slug:"sublimation",
    image:"/techniques/Sublimationprinting02.webp",
    description:
"Dye infuses into polyester fibers for permanent, breathable, full-color prints that never crack, peel, or fade.",
    bestFor:"Polyester jerseys, all-over prints, performance wear",
    moq:"50 pcs",
  },
  {
    name:"All-Over Printing (AOP)",
    slug:"overall-printing",
    image:"/techniques/Overallprinting05.webp",
    description:
"Edge-to-edge coverage with no blank borders. Seamless, bold patterns that turn the whole garment into your canvas.",
    bestFor:"T-shirts, hoodies, leggings, cut & sew",
    moq:"50 pcs",
  },
  {
    name:"Screen Printing",
    slug:"screen-printing",
    image:"/techniques/Screenprinting01.webp",
    description:
"The industry standard for bold, durable graphics. Thick ink layers deliver vivid, opaque color that survives hundreds of washes.",
    bestFor:"T-shirts, hoodies, sportswear, bulk runs",
    moq:"50 pcs",
  },
  {
    name:"Embroidery",
    slug:"embroidery",
    image:"/techniques/Embroidery07.webp",
    description:
"Premium stitched logos with a textured, high-end feel. Computerized machines keep every stitch consistent across the whole run.",
    bestFor:"Polos, caps, jackets, corporate wear",
    moq:"50 pcs",
  },
  {
    name:"DTG Printing",
    slug:"dtg",
    image:"/techniques/DTGprinting03.webp",
    description:
"Direct-to-garment digital printing with unlimited colors and photo-level detail. No screens needed — perfect for complex artwork.",
    bestFor:"100% cotton, small runs, photo prints",
    moq:"50 pcs",
  },
  {
    name:"DTF Printing",
    slug:"dtf",
    image:"/techniques/DTFprinting01.webp",
    description:
"Print to film, then heat-press onto fabric. Works on nearly any blend or color — vibrant, flexible, and crack-resistant.",
    bestFor:"Any fabric, complex artwork, small runs",
    moq:"50 pcs",
  },
  {
    name:"3D Puff Printing",
    slug:"3d-puff",
    image:"/techniques/3Dpuffprinting05.webp",
    description:
"Heat-activated ink rises into a rounded, raised print with real tactile depth — a streetwear staple.",
    bestFor:"Streetwear, caps, sweatshirts",
    moq:"50 pcs",
  },
  {
    name:"3D Embroidery",
    slug:"3d-embroidery",
    image:"/techniques/3Dembroidery05.webp",
    description:
"Foam-backed stitching raises your logo into a bold, three-dimensional statement with serious shelf presence.",
    bestFor:"Caps, varsity jackets, premium brands",
    moq:"50 pcs",
  },
  {
    name:"Rhinestone Embellishment",
    slug:"rhinestone",
    image:"/techniques/Rhinestone03.webp",
    description:
"Heat-set rhinestones add eye-catching sparkle. Precision placement keeps every stone aligned and secure through wear and wash.",
    bestFor:"Dancewear, cheer, pageant, fashion",
    moq:"50 pcs",
  },
  {
    name:"Embossing Press",
    slug:"embossing",
    image:"/techniques/Embossingpress02.webp",
    description:
"Heat and pressure create a subtle, tone-on-tone raised texture directly in the fabric — quiet, premium branding.",
    bestFor:"Premium tees, loungewear, minimalist labels",
    moq:"50 pcs",
  },
  {
    name:"Beaded Embroidery",
    slug:"beaded",
    image:"/techniques/Beadedembroidery01.webp",
    description:
"Hand-finished beadwork adds luxurious texture and shimmer to high-fashion and couture pieces.",
    bestFor:"Couture, runway, high-end occasion wear",
    moq:"50 pcs",
  },
  {
    name:"Yarn Embroidery",
    slug:"yarn",
    image:"/techniques/Yarnembroidery01.webp",
    description:
"Chunky, heavy-thread stitching with a tactile, handcrafted character that stands out on knits and cozy fabrics.",
    bestFor:"Knitwear, sweaters, winter accessories",
    moq:"50 pcs",
  },
  {
    name:"Terry Embroidery (Chenille)",
    slug:"terry",
    image:"/techniques/Terryembroidery02.webp",
    description:
"Soft, looped stitches with a plush, towel-like texture — the classic varsity and retro aesthetic.",
    bestFor:"Varsity jackets, retro apparel, collegiate",
    moq:"50 pcs",
  },
  {
    name:"Glitter Printing",
    slug:"glitter",
    image:"/techniques/Glitter05.webp",
    description:
"Sparkling glitter inks catch the light from every angle, with soft-hand formulas that keep the fabric comfortable.",
    bestFor:"Kids wear, dance, festival, pageant",
    moq:"50 pcs",
  },
  {
    name:"Metallic Printing (Foil)",
    slug:"metallic-printing",
    image:"/techniques/Metallicprinting01.webp",
    description:
"Gold, silver, and holographic foils pressed onto fabric for a luxe, mirror-shine metallic finish.",
    bestFor:"Premium tees, packaging, brand logos",
    moq:"50 pcs",
  },
  {
    name:"Reflective Printing",
    slug:"reflective-printing",
    image:"/techniques/Reflectiveprinting05.webp",
    description:
"Glass-bead inks reflect light for high-visibility graphics that glow under headlights — safety meets style.",
    bestFor:"Safety wear, cycling, running, workwear",
    moq:"50 pcs",
  },
  {
    name:"Flocking",
    slug:"flocking",
    image:"/techniques/Flocking01.webp",
    description:
"Velvety, raised fibers give a soft suede-like touch with rich color depth — a tactile vintage favorite.",
    bestFor:"Vintage tees, sportswear, premium packaging",
    moq:"50 pcs",
  },
  {
    name:"Silicone Printing",
    slug:"silicone-printing",
    image:"/techniques/Siliconeprinting05.webp",
    description:
"Flexible, rubbery ink with a smooth matte finish that stretches and moves with performance fabrics.",
    bestFor:"Performance wear, sportswear, swimwear",
    moq:"50 pcs",
  },
  {
    name:"Appliqué Embroidery",
    slug:"applique-embroidery",
    image:"/techniques/Appliqueembroidery04.webp",
    description:
"Fabric panels stitched onto the garment for bold, layered designs with crisp, clean edges.",
    bestFor:"Team jerseys, varsity, bold logo wear",
    moq:"50 pcs",
  },
  {
    name:"Laser Carving",
    slug:"laser-engraving",
    image:"/techniques/Laserengraving05.webp",
    description:
"Precision laser etching creates permanent, high-contrast marking on denim, leather, and technical fabrics.",
    bestFor:"Denim, leather, technical wear, patches",
    moq:"50 pcs",
  },
];

const qualityFeatures = [
  {
    name:"Pantone Matching",
    description:
"Accurate brand color reproduction with PMS-matched inks and calibrated presses.",
  },
  {
    name:"Wash & Rub Testing",
    description:
"Prints and stitches are tested for wash fastness and abrasion before bulk approval.",
  },
  {
    name:"Eco-Certified Inks",
    description:
"Phthalate-free, water-based, OEKO-TEX compliant inks for EU & US markets.",
  },
  {
    name:"100% Final QC",
    description:
"Every garment inspected under professional lighting before packing and shipment.",
  },
];

const faqs = [
  {
    q:"Which printing technique is the most durable?",
    a:"Screen printing and embroidery are the most durable. Screen-printed inks bond deeply with the fabric and survive hundreds of washes without cracking or fading, while embroidered thread is essentially permanent.",
  },
  {
    q:"What's the difference between DTG and DTF?",
    a:"DTG prints ink directly into the fabric and works best on cotton, giving a soft, breathable feel. DTF prints onto a transfer film first, then heat-presses it on — it works on almost any fabric or blend and is more durable for heavy wear.",
  },
  {
    q:"Which technique should I choose for dark garments?",
    a:"Screen printing with high-opacity inks, DTF, and embroidery all perform beautifully on dark fabrics. DTG and sublimation are better suited to light or white garments (sublimation requires polyester).",
  },
  {
    q:"Can I combine multiple techniques on one design?",
    a:"Absolutely — mixed-media designs are a great way to stand out. Popular combinations include screen print + 3D puff, embroidery + appliqué, and DTG + foil accents. Our team will advise on the right process order.",
  },
  {
    q:"Which technique is most cost-effective for bulk?",
    a:"Screen printing is the most economical for large quantities — the more you print, the lower the cost per unit. For smaller runs or highly detailed full-color artwork, DTG or DTF can be more cost-effective.",
  },
  {
    q:"Do you offer eco-friendly printing options?",
    a:"Yes. We use phthalate-free, water-based, and OEKO-TEX certified inks across our processes, and we offer water-based and discharge screen printing for a softer, lower-impact finish. Ask us about sustainable fabric options too.",
  },
  {
    q:"I don't see my technique on this page — can you still do it?",
    a:"Almost certainly yes. This page covers the 20 most-requested techniques, but our factory handles 50+ standard processes (discharge print, foil stamping, chenille, burnout, acid wash, high-density rubber, UV print, etc.) plus custom finishes developed per client. Send a reference photo, a sample swatch, or even just the name of the technique — we'll source the process, match it on a lab swatch in 5-7 days, and quote it like any of the 20 listed here.",
  },
];

// 2026-09-12 (R36): consolidate the 3 independent JSON-LD <script> tags
// (BreadcrumbList + HowTo + CollectionPage+ItemList) and the inline 7-FAQ
// block into a single @graph payload via buildTechniqueHubGraph. The new
// graph also adds a WebPage #webpage node with isPartOf #website + about
// #organization + speakable, wires every node together via @id so Google
// parses the entire entity surface in one pass, and gives the HowTo a
// proper @id so it joins the brand entity graph (the pre-R36 HowTo was
// a flat node with no @id, no isPartOf, no about — Google could not link
// it to the publisher). The 7 inline FAQs (R8) are now first-class via
// the FAQPage #faq node with WebPage.mainEntity round-trip.
//
// 2026-09-12 (R51): extended the HowTo surface from a single hardcoded
// sublimation HowTo to 5 separate HowTo nodes — one per top-requested
// technique (sublimation, screen-printing, embroidery, DTG, DTF). Each
// HowTo has a unique @id (`/technique/#howto-{slug}`) and a `url`
// pointing to the matching /technique/[slug]/ detail page where the
// canonical, fully-documented procedure lives (R49 added HowTo to all
// 20 detail pages). This unlocks 5 separate HowTo rich result
// opportunities from the hub, vs 1 before — Google now has 5 entry
// points for "how is X printed on apparel" queries from a single page
// that already ranks for the head term "apparel printing techniques".
// The legacy single `howTo:` shape was removed because it was
// superseded by the multi-HowTo array.
const techniqueGraph = buildTechniqueHubGraph({
  items: techniques.map((t) => ({ slug: t.slug, name: t.name })),
  howTos: [
    {
      slug: "sublimation",
      name: "How we dye-sublimate polyester apparel at SublimApparel",
      description:
        "End-to-end 5-step polyester sublimation workflow run on our Yiwu production floor: artwork separation, wide-format print, heat-press transfer, cut & sew, AQL inspection.",
      totalTime: "P5D",
      steps: [
        {
          name: "Artwork separation",
          text: "CMYK + extended spot colors are pre-flighted. Underbase white added automatically for polyester and performance fabrics. Pantone references documented on the spec sheet.",
        },
        {
          name: "Wide-format print",
          text: "1.9 m roll-to-roll sublimation printer lays the design onto transfer paper at 4,800 × 1,200 DPI. Front, back and sleeve panels printed together to keep alignment tight.",
        },
        {
          name: "Heat-press transfer",
          text: "200 °C / 30 s cycle on an 80 × 100 cm platen. Dye sublimates from solid to gas and bonds with polyester fibers — the print becomes part of the fabric, never cracks or peels.",
        },
        {
          name: "Cut & sew",
          text: "Each garment is cut, assembled and sewn on the same production floor. Panels match perfectly because they were printed together as one set.",
        },
        {
          name: "AQL 2.5 quality check",
          text: "Every piece inspected. Color verified against buyer-approved proof. Defects graded Critical / Major / Minor per ISO 2859-1 before poly-bagging.",
        },
      ],
    },
    {
      slug: "screen-printing",
      name: "How we screen-print custom apparel at SublimApparel",
      description:
        "5-step screen printing process for bold, durable graphics: artwork → screen exposure, color-set registration, print run, conveyor cure, AQL inspection.",
      totalTime: "P7D",
      steps: [
        {
          name: "Artwork → screen exposure",
          text: "One screen per Pantone color. Artwork output to positive film, exposed onto a mesh + emulsion screen under UV, then washed out to leave the open stencil.",
        },
        {
          name: "Color registration",
          text: "Screens mounted on the press and aligned to a micro-adjustable registration system. Each color gets its own screen and its own flash-cure station so the print lays flat.",
        },
        {
          name: "Print run",
          text: "Garments loaded onto platens, ink pushed through the screen with a squeegee, one color at a time. Plastisol or water-based ink chosen per fabric and buyer spec.",
        },
        {
          name: "Conveyor cure",
          text: "Printed pieces travel through a 160 °C tunnel dryer to fully cure the ink. Under-cured ink is the #1 cause of screen-print wash failure — we verify cure temp with a contact pyrometer every batch.",
        },
        {
          name: "AQL 2.5 quality check",
          text: "Final inspection for registration, opacity, hand-feel, and any scuffs or pinholes. Defective pieces removed before pack-out; bulk passes only at AQL 2.5 or better.",
        },
      ],
    },
    {
      slug: "embroidery",
      name: "How we embroider custom logos at SublimApparel",
      description:
        "5-step computerized embroidery workflow: logo digitization, fabric hooping, stitch run, trim & finish, AQL inspection.",
      totalTime: "P5D",
      steps: [
        {
          name: "Logo digitization",
          text: "Vector artwork converted to a stitch file (PES / DST) with thread-color mapping. Stitch direction, density and underlay tuned for the target fabric and placement size.",
        },
        {
          name: "Hooping the blank",
          text: "Garment or panel mounted in a magnetic / tubular hoop. Placement is the single biggest quality factor — we mark the centerline and stitch a test run on the first piece of every new order.",
        },
        {
          name: "Stitch run",
          text: "Computerized 12- and 15-needle machines run the file. Thread breaks are flagged by the machine and the operator ties off manually to keep the logo continuous.",
        },
        {
          name: "Trim & finish",
          text: "Loose threads trimmed, backing scoured if requested (for skin-contact applications like infant wear), and any 3D puff / appliqué elements set in place.",
        },
        {
          name: "AQL 2.5 quality check",
          text: "Each embroidered piece inspected for thread coverage, alignment, color match, and clean back. Defective logos pulled, re-stitched, or scrapped per AQL 2.5 sample.",
        },
      ],
    },
    {
      slug: "dtg",
      name: "How we DTG-print on cotton apparel at SublimApparel",
      description:
        "5-step direct-to-garment digital print workflow on 100% cotton: pre-treatment, platen load, CMYK + white underbase print, heat cure, AQL inspection.",
      totalTime: "P5D",
      steps: [
        {
          name: "Pre-treatment",
          text: "Cotton blank pre-coated with a PT solution that bonds pigment ink to the fiber. Pre-treatment coverage is the single biggest lever on DTG wash fastness — we apply it with calibrated spray heads, not hand spray.",
        },
        {
          name: "Platen load",
          text: "Garment loaded onto the correct-size platen, fibers brushed flat. Wrinkles and folds at this step show up as white streaks in the final print — every platen is checked before printing.",
        },
        {
          name: "CMYK + white underbase print",
          text: "Industrial DTG printer lays a white underbase on dark garments, then full-color CMYK on top. Resolution up to 1,200 × 1,200 DPI for photo-level detail and unlimited colors with no per-color setup.",
        },
        {
          name: "Heat cure",
          text: "Printed garment cured in a conveyor heat press at 180 °C to set the pigment ink into the cotton fiber. Under-cured ink is the #1 wash-fail cause — we log cure temp per batch.",
        },
        {
          name: "AQL 2.5 quality check",
          text: "Final inspection for color, hand-feel, pre-treatment uniformity, and any banding. Defective pieces removed before pack-out per AQL 2.5 sample.",
        },
      ],
    },
    {
      slug: "dtf",
      name: "How we DTF-print custom apparel at SublimApparel",
      description:
        "5-step DTF (direct-to-film) workflow that prints on virtually any fabric: PET film print, hot-melt powder, cure, heat-press transfer, AQL inspection.",
      totalTime: "P4D",
      steps: [
        {
          name: "Print on PET film",
          text: "Design printed in reverse on a PET film with a CMYK + white top layer. White sits on top so the colors pop on dark or colored garments. Works on cotton, poly, blends and most synthetics.",
        },
        {
          name: "Apply hot-melt powder",
          text: "Adhesive powder shaken over the wet ink. Excess powder shaken off and recycled. Powder coverage is the biggest quality lever — too little delaminates, too much stiffens the hand-feel.",
        },
        {
          name: "Cure the adhesive",
          text: "Powder melted and cured at 130 °C to a smooth, glossy film. The cured transfer is now a peelable sticker that can be stored, shipped, and heat-pressed later — DTF is the only decoration method that lets you decouple printing from pressing.",
        },
        {
          name: "Heat-press transfer",
          text: "Transfer placed on the garment and pressed at 160 °C for 15 s with a Teflon sheet. Cold peel (or hot peel, depending on the powder spec) reveals a flexible, vibrant print with no fabric feel lost.",
        },
        {
          name: "AQL 2.5 quality check",
          text: "Final inspection for adhesion, color, hand-feel, and any powder contamination. Defective pieces re-pressed or scrapped per AQL 2.5 sample before pack-out.",
        },
      ],
    },
  ],
  faq: faqs,
});

export default function TechniquePage() {
  return (
    <>
      <JsonLd data={techniqueGraph} />

      {/* HERO — same split pattern as homepage: dark text on left, clear image on right */}
      <section className="relative overflow-hidden border-b-2 border-black bg-[#0a0a0a] text-white">
        {/* Desktop background image (full bleed) — hidden on mobile */}
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/technique-hero.webp"
            alt="Top-down flat-lay of 6 apparel samples showing different decoration techniques — sublimation, 3D puff, embroidery, rhinestone, DTF and reflective print"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-90 brightness-105"
          />
          {/* Gradient mask — image clearly visible on the right, fades to dark on the left where text sits */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.78) 35%, rgba(10,10,10,0.35) 65%, rgba(10,10,10,0.15) 100%)",
            }}
          />
        </div>

        {/* Mobile hero image — full bleed, no overlay */}
        <div className="relative block w-full lg:hidden">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/technique-hero.webp"
              alt="Top-down flat-lay of 6 apparel samples showing different decoration techniques"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-105"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-20"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,1) 100%)",
              }}
            />
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white drop-shadow">
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-black/55 px-2 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d00]" />
              6 techniques · one bench
            </span>
            <span className="rounded-sm bg-black/55 px-2 py-1 backdrop-blur-sm">
              Yiwu sample room
            </span>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:py-24">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#cc3d00] md:mb-4 md:text-sm">
            [ Technique Guide ]
          </p>

          <h1 className="mb-4 max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:mb-5 md:text-6xl lg:text-7xl">
            <span className="block whitespace-nowrap">Which print technique</span>
            <span className="block text-[#cc3d00]">fits your design?</span>
          </h1>

          <p className="mb-3 max-w-xl text-sm text-white/80 md:mb-4 md:text-base">
            <strong>Short answer:</strong> sublimation for all-over print on polyester; allover digital print on cotton for true full-body on cotton; DTG or DTF on cotton at 50 pcs MOQ; screen print for ≥200 pcs; embroidery for caps and polos. 20 techniques compared below.
          </p>
          <p className="mb-6 max-w-xl text-sm font-medium italic text-white md:mb-7 md:text-base">
            There is no &quot;best&quot; technique — only the one that best
            matches your brief. Not sure which is right for you? Send us your
            design, fabric and quantity, and we&apos;ll recommend the process
            that fits.
          </p>

          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <Link
              href="/get-a-quote/"
              className="inline-flex items-center justify-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-white hover:text-[#cc3d00] md:px-8 md:py-4 md:text-base"
            >
              Get a Quote →
            </Link>
            <Link
              href="#all-techniques"
              className="inline-flex items-center justify-center gap-2 border-2 border-white bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black md:px-8 md:py-4 md:text-base"
            >
              See All Techniques
            </Link>
          </div>

          {/* Tiny caption strip — only on desktop, anchored bottom-right where the image is clear */}
          <div className="mt-6 hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/85 lg:flex">
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-black/55 px-2 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d00]" />
              6 techniques · one bench
            </span>
            <span className="rounded-sm bg-black/55 px-2 py-1 backdrop-blur-sm">
              Yiwu sample room
            </span>
          </div>
        </div>
      </section>

      {/* TECHNIQUE GRID */}
      <section id="all-techniques" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
          <div className="mb-8 flex items-end justify-between border-b-2 border-black pb-4 md:mb-12 md:pb-6">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#cc3d00] md:text-sm">
                20 techniques, explained
              </p>
              <h2 className="text-2xl font-black uppercase leading-tight tracking-tight text-black md:text-4xl">
                Which technique is right for you?
              </h2>
            </div>
            <p className="hidden text-sm text-[#6b6b6b] md:block">
              MOQ as low as 30 pcs
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {techniques.map((tech) => (
              <Link
                key={tech.slug}
                href={`/technique/${tech.slug}/`}
                className="group flex flex-col border-2 border-black bg-white transition-all hover:border-[#ff4d00] hover:shadow-[4px_4px_0_0_#ff4d00] md:hover:shadow-[6px_6px_0_0_#ff4d00]"
              >
                <div className="relative aspect-square w-full overflow-hidden border-b-2 border-black bg-[#f5f5f5]">
                  <Image
                    src={tech.image}
                    alt={tech.name}
                    width={600}
                    height={600}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3 md:p-4">
                  <h3 className="mb-1 text-sm font-black uppercase leading-tight text-black md:text-base">
                    {tech.name}
                  </h3>
                  <p className="mb-2 text-[10px] uppercase tracking-wide text-[#6b6b6b] md:mb-3 md:text-xs">
                    {tech.bestFor}
                  </p>
                  <p className="mb-3 flex-1 text-[11px] leading-relaxed text-[#3a3a3a] md:text-xs">
                    {tech.description}
                  </p>
                  <div className="mt-auto border-t border-black/10 pt-2 md:pt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#cc3d00] md:text-xs">
                      MOQ: {tech.moq} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BEYOND THESE 20 — leave the door open */}
      <section className="border-t-2 border-black bg-[#0A0A0A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#cc3d00] md:text-sm">
                Not on this list? We probably do it too.
              </p>
              <h2 className="mb-4 text-2xl font-black uppercase leading-tight tracking-tight md:mb-6 md:text-4xl">
                These 20 are just the beginning.
              </h2>
              <p className="text-sm leading-relaxed text-white/75 md:text-base">
                We run all 20 techniques on this page in-house — not just
                sublimation. The apparel decoration industry actually has
                <span className="font-bold text-white"> 50+ recognized print and embroidery processes</span>,
                plus countless custom finishes developed for specific clients. We
                list the 20 most-requested here so you can compare them side by
                side.
              </p>
            </div>

            <div className="md:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
                {/* Card 1 — All 20 in-house */}
                <div className="border-2 border-white/15 bg-white/[0.03] p-5 md:p-6">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center border-2 border-[#ff4d00] bg-[#ff4d00]/10 md:mb-4 md:h-10 md:w-10">
                    <Sparkles className="h-4 w-4 text-[#cc3d00] md:h-5 md:w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-black uppercase md:text-lg">
                    We do all 20
                  </h3>
                  <p className="text-xs leading-relaxed text-white/70 md:text-sm">
                    Sublimation is our core, but embroidery, screen print, DTG,
                    DTF, 3D puff, rhinestone, appliqué — every technique on this
                    page runs in our Yiwu factory on real production lines.
                  </p>
                </div>

                {/* Card 2 — 50+ in industry */}
                <div className="border-2 border-white/15 bg-white/[0.03] p-5 md:p-6">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center border-2 border-[#00c2ff] bg-[#00c2ff]/10 md:mb-4 md:h-10 md:w-10">
                    <span className="text-base font-black text-[#0078a8] md:text-lg">
                      50+
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-black uppercase md:text-lg">
                    More in the industry
                  </h3>
                  <p className="text-xs leading-relaxed text-white/70 md:text-sm">
                    Discharge print, plastisol, foil-stamp, chenille, soutache,
                    burnout, acid wash, pigment dye, garment dye, high-density
                    rubber, stretch ink, UV print, and more — all doable.
                  </p>
                </div>

                {/* Card 3 — Custom finishes */}
                <div className="border-2 border-white/15 bg-white/[0.03] p-5 md:p-6 sm:col-span-2">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex h-9 w-9 items-center justify-center border-2 border-white bg-white/10 md:h-10 md:w-10">
                        <Plus className="h-4 w-4 text-white md:h-5 md:w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-base font-black uppercase md:text-lg">
                        Bring your own technique
                      </h3>
                      <p className="text-xs leading-relaxed text-white/70 md:text-sm">
                        Saw a finish on another brand&apos;s product? Got a
                        Pantone-matched custom effect your designer created? A
                        sample, a reference image, or just a name is enough —
                        we&apos;ll source the process, match it on your sample
                        swatch, and quote it like any of the 20 above. Custom
                        development typically takes 5–7 days for lab sample
                        and adds no MOQ pressure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-start gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center md:mt-8 md:gap-4 md:pt-8">
                <Link
                  href="/get-a-quote/"
                  className="inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-white hover:text-black md:px-8 md:py-4 md:text-base"
                >
                  Ask About Your Technique →
                </Link>
                <Link
                  href="/contact/"
                  className="inline-flex items-center gap-2 border-2 border-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-black md:px-8 md:py-4 md:text-base"
                >
                  Send a Reference
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUALITY FEATURES */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
          <div className="mb-8 border-b border-white/20 pb-4 md:mb-12 md:pb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#cc3d00] md:text-sm">
              Every technique, one quality bar
            </p>
            <h2 className="text-2xl font-black uppercase leading-tight tracking-tight md:text-4xl">
              Quality, not compromise.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {qualityFeatures.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <CheckCircle2 className="mb-3 h-8 w-8 text-[#cc3d00] md:mb-4 md:h-10 md:w-10" />
                <h3 className="mb-2 text-base font-black uppercase md:text-lg">
                  {feature.name}
                </h3>
                <p className="text-xs leading-relaxed text-white/70 md:text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t-2 border-black bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-20">
          <div className="mb-8 border-b-2 border-black pb-4 md:mb-12 md:pb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#cc3d00] md:text-sm">
              Technique questions, answered
            </p>
            <h2 className="text-2xl font-black uppercase leading-tight tracking-tight md:text-4xl">
              FAQ.
            </h2>
          </div>
          <div className="space-y-4 md:space-y-6">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="group border-2 border-black bg-white p-4 md:p-6"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-bold text-black md:text-base">
                  <span className="text-[#cc3d00]">Q{i + 1}.</span>
                  <span className="flex-1">{item.q}</span>
                  <span className="text-lg text-[#cc3d00] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 pl-7 text-xs leading-relaxed text-[#3a3a3a] md:mt-4 md:pl-8 md:text-sm">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ff4d00] text-black">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center md:px-8 md:py-16">
          <h2 className="mb-3 text-2xl font-black uppercase leading-tight md:mb-4 md:text-4xl">
            Not sure which technique fits your design?
          </h2>
          <p className="mb-6 text-sm md:mb-8 md:text-base">
            <strong>Send us your design + quantity.</strong> We will recommend the right process — or a mix of processes — and quote within 24 hours.
          </p>
          <Link
            href="/get-a-quote/"
            className="inline-flex items-center gap-2 border-2 border-white bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-white hover:text-[#cc3d00] md:px-8 md:py-4 md:text-base"
          >
            Get a Free Quote →
          </Link>
        </div>
      </section>

      {/* E-E-A-T author + last-updated footer */}
      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-black/60">
          <p>
            <strong>Written by</strong> Ramon Wang, Sales Director, SublimApparel · 8 years in apparel decoration export ·
            <strong> Last updated:</strong> 18 August 2025 ·
            <strong> Reviewed by</strong> Lily Chen, Production Manager.
          </p>
          <p className="mt-2">
            For technique recommendations on your specific project, <Link href="/get-a-quote/" className="underline hover:text-[#cc3d00]">submit your design brief</Link> — we reply within 12 working hours.
          </p>
        </div>
      </section>
    </>
  );
}
