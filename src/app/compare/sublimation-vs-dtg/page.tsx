import { JsonLd } from "@/components/json-ld";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RequestQuoteLink } from "@/components/request-quote-link";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { buildFaqJsonLd } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Sublimation vs DTG: Which Print Method? | SublimApparel",
  description:
    "Sublimation vs DTG (Direct-to-Garment) compared for custom apparel: cost, color vibrancy, fabric compatibility, MOQ, hand feel, and durability. Which one fits your order?",
  openGraph: {
    title: "Sublimation vs DTG — Which Print Method Should You Order?",
    description:
      "Cost, color vibrancy, fabric, MOQ, hand feel, durability. A side-by-side B2B comparison for buyers choosing between sublimation and DTG.",
    type: "article",
  },
};

const breadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", path: "https://sublimapparel.com/" },
  { name: "Compare", path: "https://sublimapparel.com/compare/" },
  { name: "Sublimation vs DTG", path: "https://sublimapparel.com/compare/sublimation-vs-dtg/" },
]);

const faqItems = [
  {
    q: "Is sublimation cheaper than DTG for small orders?",
    a:
      "DTG is usually cheaper for very small runs (under 20 pieces) because there is no setup beyond pre-treating the garment. Sublimation requires printed transfer paper, so the per-unit cost only drops after roughly 30–50 pieces. The crossover is around 30 pieces for a single design.",
  },
  {
    q: "Can DTG print all-over like sublimation?",
    a:
      "No. DTG prints inside the platen — typically up to about 16×20 inches. Sublimation prints the whole fabric panel before sewing, so true edge-to-edge all-over prints are only possible with sublimation (or DTF roll-to-roll for cotton).",
  },
  {
    q: "Which is more durable after 50 washes?",
    a:
      "Sublimated polyester is the most durable because the dye becomes part of the fiber. DTG sits on top of the cotton fiber, so heavy abrasion will eventually fade it. Both methods outlast screen printing on most fabrics when properly cured.",
  },
  {
    q: "Which method has better color vibrancy?",
    a:
      "Sublimation. Because the dye is bonded into the polyester fiber, colors stay saturated and bright. DTG inks are formulated for cotton and can look slightly muted, especially on dark garments where the white underbase absorbs some vibrancy.",
  },
  {
    q: "Can you mix sublimation and DTG in the same order?",
    a:
      "Yes. Many of our B2B buyers order sublimated polyester for jerseys and DTG cotton for matching tees. We run both lines in the same factory, so the order stays consolidated with a single DDP shipment.",
  },
];

const faqJsonLd = buildFaqJsonLd(faqItems);

const comparisonRows: Array<{ label: string; sub: string; dtg: string; sublimation: string }> = [
  {
    label: "Best fabric",
    sub: "Substrate compatibility",
    dtg: "100% cotton, cotton blends (light colors best)",
    sublimation: "100% polyester, poly blends (light/white only)",
  },
  {
    label: "Color vibrancy",
    sub: "Saturation and contrast",
    dtg: "Good on cotton; muted on dark without underbase",
    sublimation: "Excellent — dye bonded into fiber, full CMYK range",
  },
  {
    label: "All-over print",
    sub: "Edge-to-edge coverage",
    dtg: "No — limited to platen size (~16×20 in)",
    sublimation: "Yes — printed on the full fabric panel before sewing",
  },
  {
    label: "Hand feel",
    sub: "Texture on the printed area",
    dtg: "Soft, but a slight ink film on dark colors",
    sublimation: "Zero — ink is inside the fiber, no surface layer",
  },
  {
    label: "MOQ sweet spot",
    sub: "Where each method becomes economical",
    dtg: "1 piece (no setup, just pretreatment)",
    sublimation: "30+ pieces (transfer paper + press setup)",
  },
  {
    label: "Per-unit cost (50 pcs)",
    sub: "Comparable order size",
    dtg: "$8–14 / shirt (cotton blank + ink)",
    sublimation: "$7–12 / shirt (poly blank + dye)",
  },
  {
    label: "Durability (50+ washes)",
    sub: "Color fastness over time",
    dtg: "Good; some fade on high-friction areas",
    sublimation: "Excellent — dye is part of the fiber",
  },
  {
    label: "Setup time",
    sub: "Time from approval to first printed piece",
    dtg: "1–2 days (pretreat + cure)",
    sublimation: "3–5 days (print paper, calendar, cut)",
  },
  {
    label: "Best use cases",
    sub: "Where this method wins",
    dtg: "Photo prints, small runs, dark cotton tees",
    sublimation: "Jerseys, all-over prints, sportswear, race kits",
  },
  {
    label: "Pantone match",
    sub: "Brand color accuracy",
    dtg: "Approximate; gamut is limited by ink set",
    sublimation: "Approximate; CMYK only, no spot color",
  },
];

export default function SublimationVsDtgPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black">
        <section className="border-b-4 border-black bg-[#f5f5f5] py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4d00]">
              Buyer&apos;s Guide · Print Method Comparison
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
              Sublimation vs DTG: which print method should you order?
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-[#6b6b6b] md:text-xl">
              Both are digital. Both can hit photorealistic color. But the fabric they
              print on, the per-unit cost, the MOQ sweet spot, and the long-term
              durability are different. Here&apos;s the side-by-side B2B view.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Quick answer
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border-2 border-black bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#00c2ff]">
                  Choose DTG if
                </p>
                <p className="mt-2 text-lg font-bold">
                  You need 100% cotton, dark colors, or fewer than 30 pieces.
                </p>
                <p className="mt-2 text-sm text-[#6b6b6b]">
                  Best for: small-run merch, photo prints, streetwear drops.
                </p>
              </div>
              <div className="rounded-lg border-2 border-black bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#ff4d00]">
                  Choose Sublimation if
                </p>
                <p className="mt-2 text-lg font-bold">
                  You need all-over print, true vibrancy, or 30+ polyester pieces.
                </p>
                <p className="mt-2 text-sm text-[#6b6b6b]">
                  Best for: sports jerseys, race kits, esports, music merch.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y-2 border-black bg-white py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Side-by-side comparison
            </h2>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="w-1/4 py-4 pr-4 text-sm font-bold uppercase tracking-widest">
                      Dimension
                    </th>
                    <th className="w-3/8 py-4 pr-4 text-sm font-bold uppercase tracking-widest text-[#00c2ff]">
                      DTG
                    </th>
                    <th className="w-3/8 py-4 text-sm font-bold uppercase tracking-widest text-[#ff4d00]">
                      Sublimation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label} className="border-b border-[#e5e5e5] align-top">
                      <td className="py-5 pr-4">
                        <p className="font-bold">{row.label}</p>
                        <p className="mt-1 text-xs uppercase tracking-wider text-[#a0a0a0]">
                          {row.sub}
                        </p>
                      </td>
                      <td className="py-5 pr-4 text-sm text-[#1a1a1a]">{row.dtg}</td>
                      <td className="py-5 text-sm text-[#1a1a1a]">{row.sublimation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] py-16 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Decision flow
            </h2>
            <ol className="mt-8 space-y-6 text-lg">
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff4d00] text-base font-bold">
                  1
                </span>
                <p>
                  <span className="font-bold">Start with the fabric.</span>{" "}
                  <span className="text-[#a0a0a0]">
                    100% cotton → DTG. 100% polyester → sublimation. Poly-cotton blend →
                    either works, sublimation wins on feel.
                  </span>
                </p>
              </li>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff4d00] text-base font-bold">
                  2
                </span>
                <p>
                  <span className="font-bold">Then check the print area.</span>{" "}
                  <span className="text-[#a0a0a0]">
                    If the design needs edge-to-edge coverage (sleeves, side panels,
                    full back), only sublimation can do it.
                  </span>
                </p>
              </li>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff4d00] text-base font-bold">
                  3
                </span>
                <p>
                  <span className="font-bold">Then check the quantity.</span>{" "}
                  <span className="text-[#a0a0a0]">
                    Under 30 pieces, DTG is cheaper. Over 50, sublimation wins on cost,
                    feel, and durability.
                  </span>
                </p>
              </li>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff4d00] text-base font-bold">
                  4
                </span>
                <p>
                  <span className="font-bold">Finally, the color base.</span>{" "}
                  <span className="text-[#a0a0a0]">
                    Dark colors → DTG (it can lay a white underbase). Sublimation needs
                    light or white fabric to show true color.
                  </span>
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="mt-8 space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-lg border-2 border-[#e5e5e5] bg-white p-5 [&[open]]:border-black"
                >
                  <summary className="cursor-pointer text-lg font-bold marker:hidden">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-[#3a3a3a]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t-4 border-black bg-[#f5f5f5] py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Not sure which method fits your order?
            </h2>
            <p className="mt-4 text-lg text-[#3a3a3a]">
              Send us your design, fabric preference, and quantity. We&apos;ll quote
              both methods side-by-side so you can pick the cheaper one.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <RequestQuoteLink
                label="Get a quote"
                className="inline-flex items-center gap-2 bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-widest text-black hover:bg-[#ff5d1a]"
              >
                Request a quote
              </RequestQuoteLink>
              <a
                href="/all-over-print/"
                className="inline-flex items-center gap-2 border-2 border-black bg-white px-8 py-4 text-base font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white"
              >
                See all-over print
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <JsonLd data={breadcrumb} />
    </>
  );
}
