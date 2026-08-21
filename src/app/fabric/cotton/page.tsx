import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Leaf, Droplets, Shirt, Sparkles, Layers, Recycle, ScanLine, Scissors, Palette, Ruler } from "lucide-react";
import { cottonFabrics } from "@/lib/fabric-data";

export const metadata = buildPageMetadata({
    title: "Allover Digital Print on Cotton | Full-Body + DTG/DTF",
    description: "Allover digital print on 100% cotton apparel — true full-body, edge-to-edge printing via our proprietary cotton digital workflow. Also offer DTG and DTF for...",
    keywords: ["allover digital print on cotton", "100% cotton printing", "cotton jersey", "cotton t-shirt printing", "DTG printing", "direct to garment", "organic cotton apparel", "DTF heat transfer", "allover digital print cotton", "full body cotton print", "cotton sublimation", "cut and sew cotton"],
  });;

const whyUs = [
  { icon: Droplets, title: "Reactive dye chemistry", desc: "Cotton needs reactive dyes (not disperse), proper pre-treatment, and steam fixation. We run the full chemistry chain — most sublimation shops simply skip cotton because they don't have the equipment." },
  { icon: Shirt, title: "Pre-treated fabric in-house", desc: "We pre-treat cotton rolls in our own finishing line. This is what gives the print a soft hand feel instead of a plasticky rubber layer." },
  { icon: Layers, title: "DTG + DTF dual process", desc: "For dark cotton we use DTF (heat transfer film). For light cotton we use DTG (direct to garment). We pick the right process per design — most factories only do one." },
  { icon: Recycle, title: "Organic cotton available", desc: "GOTS-certified organic cotton, 180–220 GSM, available in natural / off-white / dyed. Same low-MOQ 50 pcs as our polyester line." },
];

const alloverDigital = [
  {
    icon: ScanLine,
    title: "Allover digital print on cotton — seam to seam",
    desc: "Our proprietary cut-and-sew digital transfer workflow prints edge-to-edge on 100% cotton. The full garment is printed before sewing — front, back, sleeves all in one continuous image. This is different from DTG and DTF (which are A4–A3 per panel). For full-body cotton graphics with zero panel seams, this is the process.",
  },
  {
    icon: Scissors,
    title: "Cut-and-sew workflow",
    desc: "We print the full pattern on cotton fabric, then cut and sew the garment. The seam lines are the only interruption — the rest is one continuous print. Same look as poly sublimation, on 100% cotton substrate.",
  },
  {
    icon: Palette,
    title: "Photorealistic color on cotton",
    desc: "Reactive dye chemistry gives full CMYK color range on cotton. Colors are as vibrant as poly sublimation, with a soft hand feel that DTG and DTF cannot match. Properly cured prints survive 50+ wash cycles.",
  },
  {
    icon: Ruler,
    title: "MOQ 50 pcs for allover cotton",
    desc: "Allover digital print on cotton requires cut-and-sew, so MOQ is 50 pcs per design (vs 50 for DTG/DTF on stocked blanks). Lead time 20–25 days. Ask for a custom quote.",
  },
];

const comparison = [
  { feature: "Best fabric", poly: "100% polyester / poly-blend", cotton: "100% cotton / cotton-blend / organic cotton" },
  { feature: "Print method", poly: "Dye sublimation (heat press)", cotton: "DTG (direct to garment) or DTF (heat transfer)" },
  { feature: "Hand feel", poly: "Zero hand feel — print becomes the fabric", cotton: "Soft hand feel — print sits on the surface" },
  { feature: "Color vibrancy", poly: "Extremely vibrant, photorealistic", cotton: "Vibrant; slightly less saturated than poly sublimation" },
  { feature: "Color fastness", poly: "Excellent — print will not fade or peel", cotton: "Excellent with proper curing; we wash-test every batch" },
  { feature: "All-over print", poly: "Yes — seam to seam (sublimation)", cotton: "Yes — via allover digital print on cotton (seam to seam)" },
  { feature: "MOQ", poly: "50 pcs (true low-MOQ)", cotton: "50 pcs (true low-MOQ)" },
  { feature: "Best for", poly: "Sportswear, esports jerseys, cycling, full-print streetwear", cotton: "Premium tees, lifestyle, fashion, eco-conscious brands, baby/kids" },
];

const products = [
  { name: "Cotton T-Shirts", desc: "180–220 GSM, regular and relaxed fit. Men's, women's, unisex sizing." },
  { name: "Organic Cotton Tees", desc: "GOTS-certified, 200 GSM, natural undyed or low-impact dyed." },
  { name: "Cotton Hoodies", desc: "320–400 GSM French Terry, full-zip and pullover. DTG on light, DTF on dark." },
  { name: "Cotton Polos", desc: "220 GSM piqué, men's and women's cuts. Embroidered or printed options." },
  { name: "Kids Cotton Tees", desc: "180 GSM soft cotton, CPSIA-compliant dyes. Small-batch MOQ 50." },
  { name: "Cotton Tote Bags", desc: "12 oz natural canvas. Full-color print area up to A3." },
];

export default function CottonPage() {
  return (
    <main>
      {/* HERO */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl gap-0 px-6 md:grid-cols-12">
          <div className="md:col-span-7 py-16 md:py-24">
            <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              100% Cotton · DTG · DTF
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
              100% cotton.
              <br />
              <span className="text-[#cc3d00]">DTG & DTF.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-neutral-700 md:text-lg">
              Large-area DTG and DTF printing on 100% cotton — A4 to A3 per
              panel, full-color, soft hand feel. We run cotton and cotton-blend
              on dedicated lines, not sublimation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/get-a-quote/"
                className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black"
              >
                Get a Cotton Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link
                href="/fabric/"
                className="group inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
              >
                All Fabrics
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center border-l-2 border-black bg-[#faf9f6] p-8 md:col-span-5 md:p-12">
            <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#cc3d00]">
              <Sparkles className="h-4 w-4" strokeWidth={2} />
              What makes us different
            </div>
            <ul className="space-y-3 text-sm text-black/80">
              {[
                "Reactive dye chemistry — true cotton, not a sticker on cotton",
                "Pre-treated in-house for soft hand feel (no rubbery layer)",
                "DTG for light, DTF for dark — same color, no plastic feel",
                "Low MOQ 50 pcs — same as our polyester line",
                "GOTS organic cotton available, low-impact dyed",
                "Wash-tested to 50+ industrial cycles without fade",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#cc3d00]" strokeWidth={2.5} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FABRICS WE STOCK — cotton-only filter from full catalogue */}
      <section id="cotton-fabrics" className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            In stock
          </div>
          <h2 className="mb-4 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Cotton fabrics
            <br />
            <span className="text-[#cc3d00]">we keep on hand.</span>
          </h2>
          <p className="mb-10 max-w-2xl text-base text-black/70">
            The cotton-side of our full fabric line. Every roll wash-tested, every
            print pre-treated in-house.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cottonFabrics.map((f) => (
              <div
                key={f.swatch}
                className="group flex flex-col border-2 border-black bg-white transition-all hover:border-[#ff4d00] hover:shadow-[4px_4px_0_0_#ff4d00]"
              >
                <div className="relative aspect-square w-full border-b-2 border-black bg-[#faf9f6]">
                  <Image
                    src={`/fabric-sw-${f.swatch.split("-")[0]}.webp`}
                    alt={f.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-2 text-sm font-black uppercase leading-tight">
                    {f.name}
                  </h3>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-black/50">
                    {f.comp}
                  </p>
                  <p className="mb-3 text-[11px] leading-relaxed text-black/70">
                    {f.description}
                  </p>
                  <div className="mb-2 flex items-center justify-between text-[10px]">
                    <span className="font-bold uppercase text-black/40">Weight</span>
                    <span className="font-black">{f.gsm} gsm</span>
                  </div>
                  <div className="mb-2 flex items-center justify-between text-[10px]">
                    <span className="font-bold uppercase text-black/40">Best for</span>
                    <span className="font-medium text-right">{f.use}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-3 text-[10px] font-black text-[#cc3d00]">
                    <span>Sublimation fit: {f.fit}</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 flex items-end justify-between border-b border-white/15 pb-6">
            <div>
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-white/60">
                [ 001 / Why us ]
              </div>
              <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
                How we print on
                <br />
                <span className="text-[#cc3d00]">cotton at scale.</span>
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {whyUs.map((w, i) => {
              const Icon = w.icon;
              return (
                <div key={i} className="group flex flex-col border-2 border-white/20 bg-white/5 p-6 transition-all hover:border-[#ff4d00]">
                  <Icon className="mb-4 h-7 w-7 text-[#cc3d00]" strokeWidth={1.5} />
                  <h3 className="mb-2 text-xl font-black leading-tight">{w.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALLOVER DIGITAL PRINT ON COTTON — distinct from DTG/DTF */}
      <section className="border-b-2 border-black bg-[#ff4d00] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 flex items-end justify-between border-b border-white/30 pb-6">
            <div>
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-white/80">
                [ 001.5 / Allover digital print on cotton ]
              </div>
              <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
                True all-over
                <br />
                <span className="text-white">on 100% cotton.</span>
              </h2>
            </div>
            <div className="hidden text-right text-xs font-black uppercase tracking-widest text-white/80 md:block">
              [ 4 pillars ]
            </div>
          </div>
          <p className="mb-10 max-w-3xl text-lg font-medium leading-snug md:text-xl">
            DTG and DTF print A4–A3 per panel. <span className="underline decoration-2 underline-offset-4">Allover digital print on cotton</span> is a different process — we print the full garment before sewing, so the print runs edge-to-edge with only the seam lines as interruption. Same look as poly sublimation, on 100% cotton substrate.
          </p>
          <div className="grid gap-px bg-white/30 md:grid-cols-2 lg:grid-cols-4">
            {alloverDigital.map((w, i) => {
              const Icon = w.icon;
              return (
                <div key={i} className="bg-[#ff4d00] p-6 md:p-8">
                  <div className="mb-4 flex items-center gap-2">
                    <Icon className="h-5 w-5" strokeWidth={2.5} />
                    <div className="text-xs font-black uppercase tracking-widest text-white/80">
                      0{i + 1}
                    </div>
                  </div>
                  <h3 className="mb-3 text-lg font-black leading-tight md:text-xl">
                    {w.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/90">
                    {w.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE — Polyester vs Cotton */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            Side by side
          </div>
          <h2 className="mb-4 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Cotton vs Polyester
            <br />
            <span className="text-[#cc3d00]">— pick the right fabric.</span>
          </h2>
          <p className="mb-10 max-w-2xl text-base text-black/70">
            We run both. Most factories only run one. Use this table to decide
            which fabric fits your project — or ask us and we&apos;ll recommend.
          </p>

          <div className="overflow-x-auto border-2 border-black">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-black bg-black text-left text-xs font-black uppercase tracking-widest text-white">
                  <th className="px-4 py-3">Spec</th>
                  <th className="px-4 py-3 bg-[#ff4d00]">Polyester</th>
                  <th className="px-4 py-3 bg-[#00c2ff] text-black">100% Cotton</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className={"border-b border-black/10 " + (i % 2 === 0 ? "bg-white" : "bg-neutral-50")}>
                    <td className="px-4 py-3 text-xs font-black uppercase tracking-wider text-black/60">{row.feature}</td>
                    <td className="px-4 py-3 text-sm text-black/80">{row.poly}</td>
                    <td className="px-4 py-3 text-sm font-medium text-black/80">{row.cotton}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRODUCTS — what you can make */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 flex items-end justify-between border-b border-black/10 pb-6">
            <div>
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-black/60">
                [ 002 / Products ]
              </div>
              <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
                Cotton products
                <br />
                <span className="text-[#cc3d00]">we make.</span>
              </h2>
            </div>
            <div className="hidden text-right md:block">
              <div className="text-xs font-bold uppercase tracking-widest text-black/60">All MOQ 50 pcs</div>
              <div className="mt-1 text-3xl font-black">7–15 days</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <div key={i} className="group flex flex-col border-2 border-black bg-white p-6 transition-all hover:border-[#ff4d00]">
                <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#cc3d00]">
                  0{i + 1} / Cotton
                </div>
                <h3 className="mb-2 text-xl font-black leading-tight">{p.name}</h3>
                <p className="text-sm leading-relaxed text-black/70">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY hook — organic cotton */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="mb-3 inline-flex items-center gap-2 bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                <Leaf className="h-4 w-4" strokeWidth={2.5} />
                Sustainability
              </div>
              <h2 className="text-4xl font-black leading-[0.95] tracking-tight md:text-5xl">
                Organic cotton.
                <br />
                <span className="text-[#0078a8]">GOTS-certified.</span>
                <br />
                Low-impact dyed.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="mb-4 text-base text-white/80 md:text-lg">
                For brands that need to back up their sustainability claims, we
                source GOTS-certified organic cotton — 200 GSM, available in
                natural undyed and a small palette of low-impact dyed colors.
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                {[
                  "GOTS-certified organic cotton, traceable to farm",
                  "Low-impact reactive dyes, no heavy-metal fixers",
                  "Compostable packaging option (kraft mailer, no polybag)",
                  "Carbon-offset shipping available for EU & US orders",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0078a8]" strokeWidth={2.5} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ff4d00] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <h2 className="text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Ready to print on cotton?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-lg">
            Tell us the product, fabric weight, and quantity.
            We&apos;ll recommend DTG vs DTF and send a landed quote.
          </p>
          <Link
            href="/get-a-quote/"
            className="mt-8 inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
          >
            Get a Cotton Quote
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
