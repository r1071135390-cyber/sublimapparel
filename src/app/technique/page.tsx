import { Metadata } from"next";
import Link from"next/link";
import Image from"next/image";
import { CheckCircle2 } from"lucide-react";
import { JsonLd } from"@/components/json-ld";
import { techniqueData } from"@/lib/json-ld-data";

export const metadata: Metadata = {
  title:"Apparel Printing & Embroidery Techniques",
  description:
"Compare 20 apparel decoration techniques — sublimation, screen printing, DTG, DTF, embroidery, 3D puff & rhinestone. See costs, best uses and durability. DDP worldwide.",
  keywords: [
"sublimation printing",
"screen printing techniques",
"DTG vs DTF",
"custom embroidery",
"all-over printing",
"3D puff printing",
"rhinestone apparel",
"Chinese apparel factory",
  ],
  alternates: { canonical:"./" },
  openGraph: {
    title:"Apparel Printing & Embroidery Techniques",
    description:
"20 decoration techniques, compared. Sublimation, screen print, DTG, DTF, embroidery, 3D puff, rhinestone and more — costs, durability, best uses.",
    url:"/technique/",
    type:"article",
  },
};

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
    moq:"100 pcs",
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
    moq:"30 pcs",
  },
  {
    name:"DTF Printing",
    slug:"dtf",
    image:"/techniques/DTFprinting01.webp",
    description:
"Print to film, then heat-press onto fabric. Works on nearly any blend or color — vibrant, flexible, and crack-resistant.",
    bestFor:"Any fabric, complex artwork, small runs",
    moq:"30 pcs",
  },
  {
    name:"3D Puff Printing",
    slug:"3d-puff",
    image:"/techniques/3Dpuffprinting05.webp",
    description:
"Heat-activated ink rises into a rounded, raised print with real tactile depth — a streetwear staple.",
    bestFor:"Streetwear, caps, sweatshirts",
    moq:"100 pcs",
  },
  {
    name:"3D Embroidery",
    slug:"3d-embroidery",
    image:"/techniques/3Dembroidery05.webp",
    description:
"Foam-backed stitching raises your logo into a bold, three-dimensional statement with serious shelf presence.",
    bestFor:"Caps, varsity jackets, premium brands",
    moq:"100 pcs",
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
    moq:"100 pcs",
  },
  {
    name:"Beaded Embroidery",
    slug:"beaded",
    image:"/techniques/Beadedembroidery01.webp",
    description:
"Hand-finished beadwork adds luxurious texture and shimmer to high-fashion and couture pieces.",
    bestFor:"Couture, runway, high-end occasion wear",
    moq:"100 pcs",
  },
  {
    name:"Yarn Embroidery",
    slug:"yarn",
    image:"/techniques/Yarnembroidery01.webp",
    description:
"Chunky, heavy-thread stitching with a tactile, handcrafted character that stands out on knits and cozy fabrics.",
    bestFor:"Knitwear, sweaters, winter accessories",
    moq:"100 pcs",
  },
  {
    name:"Terry Embroidery (Chenille)",
    slug:"terry",
    image:"/techniques/Terryembroidery02.webp",
    description:
"Soft, looped stitches with a plush, towel-like texture — the classic varsity and retro aesthetic.",
    bestFor:"Varsity jackets, retro apparel, collegiate",
    moq:"100 pcs",
  },
  {
    name:"Glitter Printing",
    slug:"glitter",
    image:"/techniques/Glitter05.webp",
    description:
"Sparkling glitter inks catch the light from every angle, with soft-hand formulas that keep the fabric comfortable.",
    bestFor:"Kids wear, dance, festival, pageant",
    moq:"100 pcs",
  },
  {
    name:"Metallic Printing (Foil)",
    slug:"metallic-printing",
    image:"/techniques/Metallicprinting01.webp",
    description:
"Gold, silver, and holographic foils pressed onto fabric for a luxe, mirror-shine metallic finish.",
    bestFor:"Premium tees, packaging, brand logos",
    moq:"100 pcs",
  },
  {
    name:"Reflective Printing",
    slug:"reflective-printing",
    image:"/techniques/Reflectiveprinting05.webp",
    description:
"Glass-bead inks reflect light for high-visibility graphics that glow under headlights — safety meets style.",
    bestFor:"Safety wear, cycling, running, workwear",
    moq:"100 pcs",
  },
  {
    name:"Flocking",
    slug:"flocking",
    image:"/techniques/Flocking01.webp",
    description:
"Velvety, raised fibers give a soft suede-like touch with rich color depth — a tactile vintage favorite.",
    bestFor:"Vintage tees, sportswear, premium packaging",
    moq:"100 pcs",
  },
  {
    name:"Silicone Printing",
    slug:"silicone-printing",
    image:"/techniques/Siliconeprinting05.webp",
    description:
"Flexible, rubbery ink with a smooth matte finish that stretches and moves with performance fabrics.",
    bestFor:"Performance wear, sportswear, swimwear",
    moq:"100 pcs",
  },
  {
    name:"Appliqué Embroidery",
    slug:"applique-embroidery",
    image:"/techniques/Appliqueembroidery04.webp",
    description:
"Fabric panels stitched onto the garment for bold, layered designs with crisp, clean edges.",
    bestFor:"Team jerseys, varsity, bold logo wear",
    moq:"100 pcs",
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
];

export default function TechniquePage() {
  return (
    <>
      <JsonLd data={techniqueData} />

      {/* HERO */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#ff4d00] md:mb-4 md:text-sm">
            [ Technique Guide ]
          </p>
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-black md:text-7xl">
            Apparel printing.
            <br />
            <span className="text-[#ff4d00]">20 techniques.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base text-[#6b6b6b] md:mt-8 md:text-lg">
            Compare 20 apparel decoration techniques — sublimation, screen
            printing, DTG, DTF, embroidery, 3D puff &amp; rhinestone. See
            costs, best uses, and durability. Pick the right one for your
            project, or mix multiple techniques on a single garment.
          </p>
          <div className="mt-8 flex flex-col gap-3 md:mt-10 md:flex-row md:gap-4">
            <Link
              href="/get-a-quote/"
              className="inline-flex items-center justify-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-black md:px-8 md:py-4 md:text-base"
            >
              Get a Quote →
            </Link>
            <Link
              href="#all-techniques"
              className="inline-flex items-center justify-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white md:px-8 md:py-4 md:text-base"
            >
              See All Techniques
            </Link>
          </div>
        </div>
      </section>

      {/* TECHNIQUE GRID */}
      <section id="all-techniques" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
          <div className="mb-8 flex items-end justify-between border-b-2 border-black pb-4 md:mb-12 md:pb-6">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#ff4d00] md:text-sm">
                20 techniques, explained
              </p>
              <h2 className="text-2xl font-black uppercase leading-tight tracking-tight text-black md:text-4xl">
                Pick the right print.
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
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff4d00] md:text-xs">
                      MOQ: {tech.moq} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY FEATURES */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
          <div className="mb-8 border-b border-white/20 pb-4 md:mb-12 md:pb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#ff4d00] md:text-sm">
              Every technique, one quality bar
            </p>
            <h2 className="text-2xl font-black uppercase leading-tight tracking-tight md:text-4xl">
              Quality, not compromise.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {qualityFeatures.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <CheckCircle2 className="mb-3 h-8 w-8 text-[#ff4d00] md:mb-4 md:h-10 md:w-10" />
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
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#ff4d00] md:text-sm">
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
                  <span className="text-[#ff4d00]">Q{i + 1}.</span>
                  <span className="flex-1">{item.q}</span>
                  <span className="text-lg text-[#ff4d00] transition-transform group-open:rotate-45">
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
      <section className="bg-[#ff4d00] text-white">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center md:px-8 md:py-16">
          <h2 className="mb-3 text-2xl font-black uppercase leading-tight md:mb-4 md:text-4xl">
            Not sure which technique?
          </h2>
          <p className="mb-6 text-sm md:mb-8 md:text-base">
            Send us your design and quantity. We&apos;ll recommend the right
            process — or mix of processes — and quote within 24 hours.
          </p>
          <Link
            href="/get-a-quote/"
            className="inline-flex items-center gap-2 border-2 border-white bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-white hover:text-[#ff4d00] md:px-8 md:py-4 md:text-base"
          >
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </>
  );
}
