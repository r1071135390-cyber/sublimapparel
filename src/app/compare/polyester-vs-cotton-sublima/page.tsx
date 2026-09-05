import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, Sparkles, Shirt, Layers, Droplets, ThermometerSun, ShieldCheck, Truck, Quote } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";
import { buildPageMetadata } from "@/lib/page-metadata";
import { RequestQuoteLink } from "@/components/request-quote-link";

export const metadata: Metadata = buildPageMetadata({
  title: "Polyester vs Cotton Sublimation: Which Fabric to Choose?",
  description:
    "Polyester vs cotton for sublimation printing — full comparison of color vibrancy, hand feel, durability, MOQ, pricing and DDP logistics. Decision guide for B2B buyers.",
  keywords: [
    "polyester vs cotton sublimation",
    "sublimation cotton vs polyester",
    "best fabric for sublimation printing",
    "cotton sublimation printing",
    "polyester sublimation fabric",
    "all over print cotton jersey",
    "sublimation on cotton fabric",
  ],
});

const breadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Compare", path: "/compare/" },
  { name: "Polyester vs Cotton", path: "/compare/polyester-vs-cotton-sublima/" },
]);

const faq = buildFaqJsonLd([
  {
    q: "Can you sublimate on 100% cotton?",
    a:
      "Yes — but not with classic heat-transfer sublimation. Cotton needs a polyester-receptive underbase, which is why we run DTG (direct-to-garment) and DTF (direct-to-film) on cotton for all-over digital prints. The visual result is similar to sublimation, with a soft hand feel.",
  },
  {
    q: "Which fabric lasts longer, polyester or cotton?",
    a:
      "Polyester sublimation lasts the lifetime of the garment — dye is bonded to the fiber, so it cannot peel, crack or fade. DTG/DTF on cotton is also durable but the print sits on top of the fiber, so it gradually softens after 50+ washes. For team uniforms and race kits, polyester sublimation wins on longevity.",
  },
  {
    q: "Is polyester or cotton better for sports uniforms?",
    a:
      "Polyester is the industry standard for performance uniforms — moisture-wicking, lightweight, edge-to-edge print, no print feel. Cotton is reserved for lifestyle merch, fashion retail, and casual event apparel where a natural hand feel is preferred over moisture management.",
  },
  {
    q: "What is the MOQ for cotton sublimation?",
    a:
      "Same as polyester sublimation at our factory: 50 pieces per design. We don't run true polyester sublimation on cotton — we run DTG/DTF all-over digital print which gives a similar visual result with a soft natural hand.",
  },
  {
    q: "Does sublimation on cotton feel like plastic?",
    a:
      "No. Our DTG/DTF on cotton uses water-based ink that soaks into the cotton fiber, leaving a soft hand feel close to screen printing. The print is breathable and gets softer with washing. Classic sublimation on polyester can feel slightly waxy if ink coverage is very heavy; on cotton, this is not an issue.",
  },
]);

const comparisonRows = [
  { feature: "Print process", poly: "Heat-transfer sublimation (dye → fiber)", cotton: "DTG / DTF all-over digital print" },
  { feature: "Color vibrancy", poly: "★★★★★ Edge-to-edge, unlimited colors", cotton: "★★★★☆ Full color, slight texture on heavy coverage" },
  { feature: "Hand feel", poly: "Smooth, lightweight, slightly waxy when ink-heavy", cotton: "Soft, natural, breathable — no plastic feel" },
  { feature: "Durability", poly: "Lifetime — dye is part of the fiber", cotton: "50+ wash cycles, gradually softens" },
  { feature: "Moisture-wicking", poly: "Yes (especially brushed-poly, pbt-stretch)", cotton: "No (absorbs sweat)" },
  { feature: "Best for", poly: "Race jerseys, team kits, esports, performance", cotton: "Lifestyle merch, retail, casual events, fashion" },
  { feature: "MOQ", poly: "50 pcs per design", cotton: "50 pcs per design" },
  { feature: "Sample lead time", poly: "5–7 days", cotton: "5–7 days" },
  { feature: "Bulk lead time", poly: "7–15 days", cotton: "10–18 days (DTG slower than sublimation)" },
  { feature: "Price range (wholesale)", poly: "$6.5–$14 per piece", cotton: "$8.5–$18 per piece" },
  { feature: "DDP shipping", poly: "Yes, 100+ countries", cotton: "Yes, 100+ countries" },
];

export default function PolyVsCottonPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={breadcrumb} />
      <JsonLd data={faq} />

      {/* Hero */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#ff4d00]">
            Comparison guide
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
            Polyester vs cotton for sublimation
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-white/80 md:text-xl">
            The honest answer is: <strong className="text-white">you cannot do classic sublimation on cotton</strong>.
            So the real question is — should you print on polyester, or run DTG/DTF all-over digital print on cotton?
            Here&apos;s the full B2B breakdown.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <RequestQuoteLink label="Get a quote" className="inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-bold uppercase tracking-widest text-black hover:bg-[#ff5d1a]">
              <Quote size={18} /> Get a quote
            </RequestQuoteLink>
            <Link
              href="/all-over-print/"
              className="inline-flex items-center gap-2 border-2 border-white px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black"
            >
              See all-over print <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* At a glance comparison table */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-black/70">
            Side-by-side
          </p>
          <h2 className="mb-8 text-3xl font-black uppercase leading-none tracking-tight md:text-4xl">
            Polyester sublimation vs DTG cotton
          </h2>
          <div className="overflow-x-auto border-2 border-black">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0a0a0a] text-left text-white">
                  <th className="px-4 py-4 font-black uppercase tracking-widest">Feature</th>
                  <th className="px-4 py-4 font-black uppercase tracking-widest">Polyester (sublimation)</th>
                  <th className="px-4 py-4 font-black uppercase tracking-widest">Cotton (DTG / DTF)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((r, i) => (
                  <tr key={r.feature} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                    <td className="border-t-2 border-black/10 px-4 py-3 font-bold">{r.feature}</td>
                    <td className="border-t-2 border-t border-l-2 border-l-black/10 px-4 py-3">{r.poly}</td>
                    <td className="border-t-2 border-t border-l-2 border-l-black/10 px-4 py-3">{r.cotton}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-black/60">
            Pricing shown is factory-direct for MOQ 100+ designs. Volume discounts apply above 500 pcs.
            All quotes include DDP to 100+ countries.
          </p>
        </div>
      </section>

      {/* Decision guide */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#ff4d00]">
            Decision guide
          </p>
          <h2 className="mb-8 text-3xl font-black uppercase leading-none tracking-tight md:text-4xl">
            Which one should you choose?
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border-2 border-white bg-[#0a0a0a] p-6">
              <div className="mb-3 inline-flex items-center gap-2 bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                Choose polyester if…
              </div>
              <ul className="space-y-3 text-white/85">
                {[
                  "You need edge-to-edge print with unlimited Pantone colors",
                  "Moisture-wicking matters (race kits, esports, gym)",
                  "You want a lifetime-durable print (no fade, no peel)",
                  "Your design is heavy coverage (gradient, photo, all-over)",
                  "You need fast bulk production (sublimation is faster than DTG)",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <Check className="mt-0.5 shrink-0 text-[#ff4d00]" size={18} />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-2 border-white bg-[#0a0a0a] p-6">
              <div className="mb-3 inline-flex items-center gap-2 bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                Choose cotton if…
              </div>
              <ul className="space-y-3 text-white/85">
                {[
                  "Your end customer wants a natural soft hand feel",
                  "The garment is for retail, lifestyle, or casual events",
                  "Breathability matters more than moisture-wicking",
                  "You want the print to soften over time (worn-in look)",
                  "Your brand identity says 'natural' or 'eco-conscious'",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <Check className="mt-0.5 shrink-0 text-white" size={18} />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process explainer */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-black/70">
            Why the difference
          </p>
          <h2 className="mb-8 text-3xl font-black uppercase leading-none tracking-tight md:text-4xl">
            Why you can&apos;t sublimate on cotton
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-xl font-black uppercase tracking-tight">Polyester sublimation</h3>
              <p className="text-base text-black/80">
                Sublimation ink turns from solid to gas under heat (~200°C) and bonds directly with polyester
                fibers. The dye becomes part of the fiber — it cannot peel, crack or fade. This works only on
                polyester (or polyester-rich blends, typically 80%+).
              </p>
              <p className="mt-3 text-base text-black/80">
                <strong>The advantage:</strong> unlimited colors, edge-to-edge print, lifetime durability, the
                softest feel on the market when done on brushed-poly or pbt-stretch.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-black uppercase tracking-tight">Cotton DTG / DTF</h3>
              <p className="text-base text-black/80">
                Cotton doesn&apos;t have pores that open for dye gas, so sublimation simply doesn&apos;t work.
                Instead we use DTG (direct-to-garment) or DTF (direct-to-film) printers. Water-based or adhesive
                ink sits on top of the cotton fiber, giving a print that&apos;s soft, breathable, and gets
                softer with washing.
              </p>
              <p className="mt-3 text-base text-black/80">
                <strong>The advantage:</strong> natural hand feel, true cotton comfort, soft print that ages well.
                For an &quot;all-over sublimation look on cotton&quot;, DTG is the closest match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fabric recommendations */}
      <section className="border-b-2 border-black bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-black/70">
            Browse our fabrics
          </p>
          <h2 className="mb-8 text-3xl font-black uppercase leading-none tracking-tight md:text-4xl">
            Popular fabrics we run
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { slug: "polyester", name: "Polyester", desc: "Classic all-over print, edge-to-edge.", price: "from $6.5" },
              { slug: "pbt-stretch", name: "PBT Stretch", desc: "Chlorine-resistant, swimwear & triathlon.", price: "from $8.2" },
              { slug: "brushed-poly", name: "Brushed Poly", desc: "Soft hand feel, performance wear.", price: "from $7.5" },
              { slug: "cotton", name: "100% Cotton", desc: "DTG/DTF all-over digital print, soft natural feel.", price: "from $8.5" },
            ].map((f) => (
              <Link
                key={f.slug}
                href={`/fabric/${f.slug}/`}
                className="group flex flex-col gap-2 border-2 border-black bg-white p-5 transition-colors hover:border-[#ff4d00] hover:bg-[#fff5f0]"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/70">Fabric</p>
                <p className="text-lg font-black leading-tight text-black group-hover:text-[#ff4d00]">{f.name}</p>
                <p className="text-sm text-black/70">{f.desc}</p>
                <p className="mt-auto pt-2 text-xs font-bold text-black/60">{f.price} / piece</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/fabric/"
              className="inline-flex items-center gap-2 border-2 border-black bg-black px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#ff4d00]"
            >
              See all 65 fabrics <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-black/70">
            FAQ
          </p>
          <h2 className="mb-8 text-3xl font-black uppercase leading-none tracking-tight md:text-4xl">
            Frequently asked
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can you sublimate on 100% cotton?",
                a: "Yes — but not with classic heat-transfer sublimation. Cotton needs a polyester-receptive underbase, which is why we run DTG (direct-to-garment) and DTF (direct-to-film) on cotton for all-over digital prints. The visual result is similar to sublimation, with a soft hand feel.",
              },
              {
                q: "Which fabric lasts longer, polyester or cotton?",
                a: "Polyester sublimation lasts the lifetime of the garment — dye is bonded to the fiber, so it cannot peel, crack or fade. DTG/DTF on cotton is also durable but the print sits on top of the fiber, so it gradually softens after 50+ washes. For team uniforms and race kits, polyester sublimation wins on longevity.",
              },
              {
                q: "Is polyester or cotton better for sports uniforms?",
                a: "Polyester is the industry standard for performance uniforms — moisture-wicking, lightweight, edge-to-edge print, no print feel. Cotton is reserved for lifestyle merch, fashion retail, and casual event apparel where a natural hand feel is preferred over moisture management.",
              },
              {
                q: "What is the MOQ for cotton sublimation?",
                a: "Same as polyester sublimation at our factory: 50 pieces per design. We don\u2019t run true polyester sublimation on cotton \u2014 we run DTG/DTF all-over digital print which gives a similar visual result with a soft natural hand.",
              },
              {
                q: "Does sublimation on cotton feel like plastic?",
                a: "No. Our DTG/DTF on cotton uses water-based ink that soaks into the cotton fiber, leaving a soft hand feel close to screen printing. The print is breathable and gets softer with washing. Classic sublimation on polyester can feel slightly waxy if ink coverage is very heavy; on cotton, this is not an issue.",
              },
            ].map((x) => (
              <details key={x.q} className="group border-2 border-black bg-white p-5 open:bg-neutral-50">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-black uppercase tracking-tight">
                  <span>{x.q}</span>
                  <span className="text-2xl text-black/40 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-base text-black/80">{x.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ff4d00] text-black">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="text-3xl font-black uppercase leading-none tracking-tight md:text-5xl">
            Not sure which fabric fits your project?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Send us your design and quantity. We&apos;ll send back a fabric recommendation with pricing, sample
            options, and a DDP quote to your country.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <RequestQuoteLink label="Get a quote" className="inline-flex items-center gap-2 bg-black px-8 py-4 text-base font-bold uppercase tracking-widest text-white hover:bg-[#1a1a1a]">
              <Quote size={20} /> Get a quote
            </RequestQuoteLink>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 border-2 border-white px-8 py-4 text-base font-bold uppercase tracking-widest text-white hover:bg-white hover:text-[#ff4d00]"
            >
              Contact us <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
