import { JsonLd } from "@/components/json-ld";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RequestQuoteLink } from "@/components/request-quote-link";
import { buildBreadcrumbJsonLd, buildFaqPageNode } from "@/lib/breadcrumb";
import { buildComparisonJsonLd } from "@/lib/breadcrumb";
import { buildPageMetadata } from "@/lib/page-metadata";

// 2026-09-11 (R26-D): the /compare/ directory already covers
// ddp-vs-fob, polyester-vs-cotton-sublima and sublimation-vs-dtg.
// The next-highest-volume adjacent comparison is sublimation vs
// screen printing (it is a separate query cluster from DTG because
// screen print buyers are typically high-volume apparel programs,
// not small-run all-over print, so the SERP shape is different).
// We follow the exact same template as the other compare pages:
// WebPage + BreadcrumbList + FAQPage + a side-by-side comparison
// table (so we can later add Schema.org Table markup) and an
// authoritative "which should I pick" verdict.

export const metadata: Metadata = buildPageMetadata({
  title: "Sublimation vs Screen Printing: Which Is Right?",
  description:
    "Sublimation vs screen printing for custom apparel: cost, color, fabric, MOQ, durability, all-over print, and which fits your B2B order.",
  ogTitle: "Sublimation vs Screen Printing — Which Method Fits Your Apparel?",
  ogDescription:
    "Side-by-side for B2B buyers choosing between sublimation and screen print: cost, fabric, MOQ, color, durability, lead time, all-over coverage.",
  keywords: [
    "sublimation vs screen printing",
    "screen print vs sublimation",
    "sublimation vs silk screen",
    "print method comparison",
    "apparel print method B2B",
    "screen printing MOQ",
    "all-over print vs screen print",
  ],
  alternates: { canonical: "https://sublimapparel.com/compare/sublimation-vs-screen-print/" },
});

const breadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", path: "https://sublimapparel.com/" },
  { name: "Compare", path: "https://sublimapparel.com/compare/" },
  { name: "Sublimation vs Screen Print", path: "https://sublimapparel.com/compare/sublimation-vs-screen-print/" },
]);

const faqItems = [
  {
    q: "Is sublimation cheaper than screen printing for small orders?",
    a:
      "For 1-50 pieces, screen printing has higher setup costs (one screen per color, $25-50 each) but lower per-unit print cost, so the crossover depends on design complexity. A 1-color 50-piece screen print can be cheaper than sublimation. A 6-color 50-piece screen print is more expensive than sublimation. As order size grows past 200 pieces, screen print wins on per-unit cost almost every time.",
  },
  {
    q: "Can screen printing do all-over print like sublimation?",
    a:
      "No. Screen printing on garments is limited to roughly 14x16 inches per color (a chest print, back print, or sleeve print). True edge-to-edge all-over print requires either sublimation (polyester) or DTG/DTF (cotton). The closest screen-print technique for big areas is 'platen screen printing' for cut pieces, which is what some factories use for hoodies, but it is more expensive than sublimation and limited to 1-3 colors.",
  },
  {
    q: "Which method has better color vibrancy?",
    a:
      "Sublimation. Because the dye is bonded into the polyester fiber, colors stay saturated and don't sit on a film. Screen printing produces bright, opaque colors but the ink is a discrete layer on top of the fabric, so it can crack and fade over time. For photographic, gradient, or full-color designs, sublimation wins. For solid block colors at high volume, screen print is competitive.",
  },
  {
    q: "Can you print white underbase on dark shirts with sublimation?",
    a:
      "No. Sublimation has no white ink — the dye is transparent and only bonds with polyester, so a dark polyester shirt will dye to a darker color (you cannot make a white graphic on black with sublimation). Screen printing handles white underbase on dark shirts easily. If you need white graphics on black apparel, screen print (or DTF, or DTG with white underbase) is the right method.",
  },
  {
    q: "Which is more durable after 50+ washes?",
    a:
      "Sublimation. The dye becomes part of the polyester fiber, so it does not crack, peel, or fade for the life of the garment. Screen-printed plastisol ink is thick on top of the fabric and can crack with heavy abrasion or repeated hot washes. Water-based and discharge screen prints soften and can fade noticeably after 50+ washes. For workwear, team uniforms, and racing kit that see heavy use, sublimation outlasts screen printing.",
  },
  {
    q: "Which method fits a 500-piece apparel order?",
    a:
      "Depends on the design. For a 1-3 color logo on a polo or t-shirt, screen printing is the right choice — fast, durable, and lowest per-unit cost. For an all-over print with multiple gradients or photographic artwork, sublimation is the only realistic option. We run both in the same factory, so a single 500-piece order can mix screen-printed polos with sublimated jerseys if you want one consolidated DDP shipment.",
  },
  {
    q: "What fabrics work for each method?",
    a:
      "Sublimation only works on polyester (or poly-rich blends). Screen printing works on cotton, poly blends, tri-blends, fleece, and most knit fabrics — it is the most fabric-agnostic decoration method. If your apparel is 100% cotton, sublimation is not an option; screen print, DTG, or DTF are. If your apparel is 100% polyester, sublimation is usually the best fit; screen print requires special polyester inks and is less common.",
  },
];

// 2026-09-12 (R47): FAQ inlined into the page @graph via buildFaqPageNode
// (additive cross-link fields: inLanguage, isPartOf → #webpage, about →
// #organization) so the FAQ joins the brand entity graph like every
// other page on the site.
const faqId = "https://sublimapparel.com/compare/sublimation-vs-screen-print/#faq";
const webpageId = "https://sublimapparel.com/compare/sublimation-vs-screen-print/#webpage";

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://sublimapparel.com/compare/sublimation-vs-screen-print/#webpage",
  url: "https://sublimapparel.com/compare/sublimation-vs-screen-print/",
  name: "Sublimation vs Screen Printing: Which Is Right? | SublimApparel",
  description:
    "Sublimation vs screen printing for custom apparel: cost, color, fabric, MOQ, durability, all-over print, and which fits your B2B order.",
  inLanguage: "en",
  isPartOf: { "@id": "https://sublimapparel.com/#website" },
  about: { "@id": "https://sublimapparel.com/#organization" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://sublimapparel.com/og/og-home.webp",
  },
  speakable: {
    "@type": "SpeakableSpecification",
    xpath: ["/html/body//h1", "/html/body//section[1]//p"],
  },
};

// 2026-09-12 (R33-B1): Comparison schema node for the
// sublimation vs screen print side-by-side. The audience here is
// different from sublimation-vs-dtg: screen-print buyers are
// typically high-volume apparel programs (1000+ pcs), not small
// all-over runs, so the recommendation lands on screen print for
// large runs of simple designs and sublimation for all-over /
// small-batch.
const comparisonJsonLd = buildComparisonJsonLd({
  slug: "sublimation-vs-screen-print",
  name: "Sublimation vs Screen Printing — print method comparison",
  description:
    "Side-by-side comparison of sublimation vs screen printing for custom apparel: fabric compatibility, color range, setup cost, unit cost at scale, MOQ, hand feel, durability, ideal run size.",
  sideA: {
    name: "Dye sublimation",
    description:
      "Heat-transfer dye-sublimation print on polyester. Unlimited colors, no per-color setup, edge-to-edge all-over, best for <500 pcs or all-over print programs.",
  },
  sideB: {
    name: "Screen printing (silk screen)",
    description:
      "Plastoisol or water-based ink pushed through mesh screens. Per-color setup, lower unit cost at scale, ideal for 1000+ pcs of 1–6 color designs on cotton or poly-cotton.",
  },
  sharedContent:
    "Print method selection for custom apparel B2B orders",
});

// 2026-09-12 (R35): consolidate all JSON-LD into a single @graph block.
// R47: FAQ now inlined via buildFaqPageNode.
const pageGraph = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumb,
    webPageJsonLd,
    buildFaqPageNode(faqId, webpageId, faqItems),
    comparisonJsonLd,
  ],
};

const comparisonRows: Array<{ label: string; sub: string; screen: string; sublimation: string }> = [
  {
    label: "Best fabric",
    sub: "Substrate compatibility",
    screen: "Cotton, poly blends, fleece, tri-blends — most knits",
    sublimation: "100% polyester, poly-rich blends (light/white only)",
  },
  {
    label: "Color vibrancy",
    sub: "Saturation and contrast",
    screen: "Excellent for spot colors; gradients need halftones",
    sublimation: "Excellent — dye bonded into fiber, full CMYK range",
  },
  {
    label: "All-over print",
    sub: "Edge-to-edge coverage",
    screen: "No — limited to ~14×16 in per color per location",
    sublimation: "Yes — full fabric panel printed before sewing",
  },
  {
    label: "Photographic / gradient",
    sub: "Complex artwork",
    screen: "Requires halftone screens, expensive at high color count",
    sublimation: "Native — print any photo, gradient, or texture",
  },
  {
    label: "White ink on dark shirts",
    sub: "Underbase capability",
    screen: "Yes — plastisol white underbase is the standard",
    sublimation: "No white ink — dye is transparent, no underbase",
  },
  {
    label: "Hand feel",
    sub: "Texture on the printed area",
    screen: "Plastisol: a noticeable ink film. Water-based: soft but lighter color",
    sublimation: "Zero — ink is inside the fiber, no surface layer",
  },
  {
    label: "MOQ sweet spot",
    sub: "Where each method becomes economical",
    screen: "50-100 pieces per design (setup amortized)",
    sublimation: "30-50 pieces per design (transfer paper + press setup)",
  },
  {
    label: "Per-unit cost (1-color logo, 200 pcs)",
    sub: "Comparable order size",
    screen: "$3.50-5.00 / shirt (cotton blank + 1-color print)",
    sublimation: "$7-12 / shirt (poly blank + dye)",
  },
  {
    label: "Per-unit cost (full-color all-over, 200 pcs)",
    sub: "Comparable order size",
    screen: "Not feasible (would need 8-12 spot colors at huge setup cost)",
    sublimation: "$9-14 / shirt (poly blank + full dye)",
  },
  {
    label: "Durability (50+ washes)",
    sub: "Color fastness over time",
    screen: "Plastisol: can crack with abrasion. Water-based: fades over time",
    sublimation: "Won't crack, peel, or fade for the life of the garment",
  },
  {
    label: "Setup time",
    sub: "Time to first article",
    screen: "1-3 days (screen burning + color mixing)",
    sublimation: "Same day (transfer paper + heat press)",
  },
  {
    label: "Lead time (bulk, 200 pcs)",
    sub: "Production time after sample approval",
    screen: "7-12 days",
    sublimation: "10-15 days",
  },
  {
    label: "Eco profile",
    sub: "Ink chemistry",
    screen: "Plastisol: PVC-based. Water-based: lower impact",
    sublimation: "Water-based dye, no PVC, OEKO-TEX certified",
  },
  {
    label: "Best fit",
    sub: "When to pick this method",
    screen: "1-3 color logos on cotton or poly-cotton at 100+ pcs",
    sublimation: "All-over print on polyester at 30+ pcs, or any photographic design",
  },
];

const related = [
  {
    href: "/compare/sublimation-vs-dtg/",
    title: "Sublimation vs DTG",
    desc: "When to use DTG on cotton instead of sublimation on polyester.",
  },
  {
    href: "/compare/polyester-vs-cotton-sublima/",
    title: "Polyester vs Cotton for Sublimation",
    desc: "Why polyester is the canonical sublimation substrate.",
  },
  {
    href: "/compare/ddp-vs-fob/",
    title: "DDP vs FOB Shipping",
    desc: "How the same order's shipping terms change the landed cost.",
  },
  {
    href: "/technique/",
    title: "20 Decoration Techniques Compared",
    desc: "Sublimation, screen print, DTG, DTF, embroidery, 3D puff, rhinestone — all in one place.",
  },
];

export default function SublimationVsScreenPrintPage() {
  return (
    <>
      <Navbar />
      <JsonLd data={pageGraph} />

      <main className="min-h-screen bg-white text-[#0a0a0a]">
        {/* HERO */}
        <section className="border-b-2 border-[#0a0a0a] bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-20">
            <div className="mb-4 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
              Print Method Comparison
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
              Sublimation vs Screen Printing
            </h1>
            <p className="mt-4 max-w-2xl text-xl font-bold text-[#cc3d00] md:text-2xl">
              Which method fits your B2B apparel order?
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#3a3a3a] md:text-lg">
              Sublimation and screen printing are the two most common
              decoration methods for B2B apparel, but they fit very
              different briefs. Sublimation prints edge-to-edge on
              polyester with photographic color. Screen printing lays
              spot color on cotton, poly-cotton, and most knits at
              the lowest per-unit cost at volume. The right pick
              depends on fabric, design complexity, order size, and
              durability target. This page compares them side by side.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <RequestQuoteLink className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#e64400]">
                Get a custom quote
              </RequestQuoteLink>
              <a
                href="/technique/"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#0a0a0a] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a] hover:text-[#faf9f6]"
              >
                See all 20 techniques
              </a>
            </div>
          </div>
        </section>

        {/* SHORT ANSWER */}
        <section className="border-b-2 border-[#0a0a0a] bg-[#faf9f6]">
          <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
              [ Short answer ]
            </h2>
            <p className="mt-3 text-xl font-bold leading-snug md:text-2xl">
              Pick <span className="text-[#cc3d00]">screen printing</span> for
              1-3 color logos on cotton or poly-cotton at 100+ pieces.
              Pick <span className="text-[#cc3d00]">sublimation</span> for
              all-over print, photographic artwork, or full-color designs
              on polyester at 30+ pieces. If your apparel is 100%
              cotton and you need all-over print, the right call is
              allover digital print (cut-and-sew) or DTF, not screen print
              and not sublimation.
            </p>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="border-b-2 border-[#0a0a0a] bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
            <h2 className="mb-8 text-3xl font-black leading-tight md:text-4xl">
              Side-by-side comparison
            </h2>
            <div className="overflow-x-auto border-2 border-[#0a0a0a]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-left text-[#faf9f6]">
                    <th className="px-4 py-3 text-xs font-mono uppercase tracking-widest">
                      Dimension
                    </th>
                    <th className="px-4 py-3 text-xs font-mono uppercase tracking-widest">
                      Screen Printing
                    </th>
                    <th className="px-4 py-3 text-xs font-mono uppercase tracking-widest">
                      Sublimation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#faf9f6]"}
                    >
                      <td className="border-b border-[#0a0a0a] px-4 py-3 align-top">
                        <div className="text-sm font-extrabold text-[#0a0a0a]">
                          {row.label}
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#6b6b6b]">
                          {row.sub}
                        </div>
                      </td>
                      <td className="border-b border-[#0a0a0a] px-4 py-3 align-top text-sm leading-relaxed text-[#0a0a0a]">
                        {row.screen}
                      </td>
                      <td className="border-b border-[#0a0a0a] px-4 py-3 align-top text-sm leading-relaxed text-[#0a0a0a]">
                        {row.sublimation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* WHICH SHOULD I PICK */}
        <section className="border-b-2 border-[#0a0a0a] bg-[#fff5ee]">
          <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
            <h2 className="mb-8 text-3xl font-black leading-tight md:text-4xl">
              Which should you pick?
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border-2 border-[#0a0a0a] bg-white p-6">
                <h3 className="text-xl font-extrabold text-[#cc3d00]">Pick screen printing if…</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#3a3a3a]">
                  <li>· Your apparel is 100% cotton or poly-cotton</li>
                  <li>· Your design is 1-3 spot colors, no gradient</li>
                  <li>· You need white ink on dark shirts</li>
                  <li>· You're ordering 100+ pieces per design</li>
                  <li>· Per-unit cost matters more than all-over coverage</li>
                  <li>· Your product is a polo, tote, or workwear (not a jersey)</li>
                </ul>
              </div>
              <div className="border-2 border-[#0a0a0a] bg-[#0a0a0a] p-6 text-[#faf9f6]">
                <h3 className="text-xl font-extrabold text-[#ff4d00]">Pick sublimation if…</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#faf9f6]">
                  <li>· Your apparel is 100% polyester (or poly-rich blend)</li>
                  <li>· Your design is photographic, gradient, or full-color</li>
                  <li>· You need true edge-to-edge all-over print</li>
                  <li>· You're ordering 30+ pieces per design</li>
                  <li>· Durability matters (jerseys, racing kit, festival merch)</li>
                  <li>· Your product is a jersey, kit, or performance top</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b-2 border-[#0a0a0a] bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
            <h2 className="mb-8 text-3xl font-black leading-tight md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((f) => (
                <details
                  key={f.q}
                  className="group border-2 border-[#0a0a0a] bg-white open:bg-[#faf9f6]"
                >
                  <summary className="cursor-pointer list-none px-5 py-4 text-base font-extrabold text-[#0a0a0a] transition-colors hover:text-[#cc3d00]">
                    {f.q}
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-[#3a3a3a]">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED */}
        <section className="border-b-2 border-[#0a0a0a] bg-[#faf9f6]">
          <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
            <h2 className="mb-6 text-2xl font-black leading-tight md:text-3xl">
              Related comparisons
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {related.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  className="group block border-2 border-[#0a0a0a] bg-white p-5 transition-colors hover:border-[#ff4d00] hover:bg-[#fff5ee]"
                >
                  <h3 className="text-base font-extrabold leading-tight text-[#0a0a0a] group-hover:text-[#cc3d00]">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3a3a3a]">{r.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0a0a0a] text-[#faf9f6]">
          <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
            <h2 className="text-3xl font-black leading-tight md:text-4xl">
              Not sure which method fits your design?
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#a0a0a0] md:text-lg">
              Send us your artwork, your garment spec, and your order
              size. We will tell you the right method — even if it is
              not sublimation. Reply within 1 business day, in English
              or Chinese.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <RequestQuoteLink className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#e64400]">
                Get a quote in 24 hours
              </RequestQuoteLink>
              <a
                href="/yiwu-factory-whatsapp/"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]"
              >
                Chat with the Yiwu factory
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
