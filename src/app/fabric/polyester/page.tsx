import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Droplets, Shirt, Sparkles, Layers, Zap } from "lucide-react";
import { polyesterFabrics } from "@/lib/fabric-data";

export const metadata: Metadata = {
  title: "All-Over Polyester Printing | Sublimation on 100% Polyester",
  description:
    "Custom all-over printing on 100% polyester apparel. Dye sublimation, photorealistic color, zero hand feel, and no setup fee. From sportswear and esports to streetwear and team kits. Free digital mockup, MOQ 50.",
  keywords: [
    "all-over polyester printing",
    "100% polyester printing",
    "polyester jersey",
    "dye sublimation",
    "sublimation printing",
    "sportswear printing",
    "esports jerseys",
    "cycling jerseys",
    "all-over print polyester",
    "full coverage polyester print",
  ],
};

const whyUs = [
  {
    icon: Zap,
    title: "Dye sublimation chemistry",
    desc: "Polyester loves disperse dyes — they bond to the fiber under heat and pressure, becoming the fabric itself. We run industrial sublimation presses calibrated to 200°C. Most DTG shops can't print on polyester because their chemistry is wrong.",
  },
  {
    icon: Shirt,
    title: "Pre-shrunk, ready to print",
    desc: "Every roll of polyester we stock is pre-shrunk before cutting. Your printed garment will not shrink or distort after the first wash — we test-shrink every batch.",
  },
  {
    icon: Layers,
    title: "Cut & sew in-house",
    desc: "From raw fabric to finished garment under one roof. We cut, print, sew, QC, and pack — no middlemen. This is how we hit 7-day lead times at MOQ 50.",
  },
  {
    icon: Droplets,
    title: "Photorealistic CMYK output",
    desc: "Our sublimation presses hit the full CMYK gamut — gradients, skin tones, photographs, fine text. We use the same ink chemistry as the European sportswear giants.",
  },
];

const comparison = [
  { feature: "Best fabric", poly: "100% polyester / poly-blend", cotton: "100% cotton / cotton-blend / organic cotton" },
  { feature: "Print method", poly: "Dye sublimation (heat press)", cotton: "DTG (direct to garment) or DTF (heat transfer)" },
  { feature: "Hand feel", poly: "Zero hand feel — print becomes the fabric", cotton: "Soft hand feel — print sits on the surface" },
  { feature: "Color vibrancy", poly: "Extremely vibrant, photorealistic", cotton: "Vibrant; slightly less saturated than poly sublimation" },
  { feature: "Color fastness", poly: "Excellent — print will not fade or peel", cotton: "Excellent with proper curing; we wash-test every batch" },
  { feature: "All-over print", poly: "Yes — seam to seam", cotton: "A4-size print area per panel (front/back/sleeves)" },
  { feature: "MOQ", poly: "50 pcs (true low-MOQ)", cotton: "50 pcs (true low-MOQ)" },
  { feature: "Best for", poly: "Sportswear, esports jerseys, cycling, full-print streetwear", cotton: "Premium tees, lifestyle, fashion, eco-conscious brands, baby/kids" },
];

const products = [
  { name: "Polyester T-Shirts", desc: "110–160 GSM, regular and relaxed fit. Men's, women's, unisex sizing." },
  { name: "Esports Jerseys", desc: "Bird-eye mesh 135 GSM, full dye-sublimation. Set-in sleeve, V-neck, sublimated collar." },
  { name: "Cycling Jerseys", desc: "Poly-spandex stretch mesh, full hidden zipper, three rear pockets." },
  { name: "Hoodies & Pullovers", desc: "French Terry 200–320 GSM or Polar Fleece 270–420 GSM. All-over or chest print." },
  { name: "Tank Tops & Singlets", desc: "110 GSM polyester, racerback and standard cuts. Common for running and fitness." },
  { name: "Flags & Banners", desc: "100–170 GSM direct print fabric. Indoor / outdoor, hemmed or pole-ready." },
];

export default function PolyesterPage() {
  return (
    <main>
      {/* HERO */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl gap-0 px-6 md:grid-cols-12">
          <div className="md:col-span-7 py-16 md:py-24">
            <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
              100% Polyester · Dye Sublimation
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
              All-over printing.
              <br />
              <span className="text-[#ff4d00]">100% polyester.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-neutral-700 md:text-lg">
              True seam-to-seam sublimation on 100% polyester — photorealistic
              color, zero hand feel, no setup fee. Our bread and butter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/get-a-quote"
                className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black"
              >
                Get a Polyester Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link
                href="/fabric"
                className="group inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
              >
                All Fabrics
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center border-l-2 border-black bg-[#faf9f6] p-8 md:col-span-5 md:p-12">
            <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              <Sparkles className="h-4 w-4" strokeWidth={2} />
              What makes us different
            </div>
            <ul className="space-y-3 text-sm text-black/80">
              {[
                "Dye sublimation chemistry — print becomes the fabric, not a sticker",
                "Cut & sew in-house — 7-day lead time at MOQ 50",
                "Photorealistic CMYK output — gradients, photos, fine text all sharp",
                "Pre-shrunk rolls — no first-wash distortion or shrinkage",
                "Same ink chemistry as European sportswear giants",
                "Free digital mockup, no setup fee, free re-proofs",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00c2ff]" strokeWidth={2.5} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FABRICS WE STOCK — polyester-only filter from full catalogue */}
      <section id="polyester-fabrics" className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            In stock
          </div>
          <h2 className="mb-4 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Polyester fabrics
            <br />
            <span className="text-[#ff4d00]">we keep on hand.</span>
          </h2>
          <p className="mb-10 max-w-2xl text-base text-black/70">
            The polyester-side of our full fabric line. Pre-shrunk, pre-tested,
            ready to run on the sublimation press.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {polyesterFabrics.map((f) => (
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
                  <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-3 text-[10px] font-black text-[#ff4d00]">
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
                <span className="text-[#00c2ff]">polyester at scale.</span>
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {whyUs.map((w, i) => {
              const Icon = w.icon;
              return (
                <div key={i} className="group flex flex-col border-2 border-white/20 bg-white/5 p-6 transition-all hover:border-[#00c2ff]">
                  <Icon className="mb-4 h-7 w-7 text-[#00c2ff]" strokeWidth={1.5} />
                  <h3 className="mb-2 text-xl font-black leading-tight">{w.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{w.desc}</p>
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
            Polyester vs Cotton
            <br />
            <span className="text-[#ff4d00]">— pick the right fabric.</span>
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
                    <td className="px-4 py-3 text-sm font-medium text-black/80">{row.poly}</td>
                    <td className="px-4 py-3 text-sm text-black/80">{row.cotton}</td>
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
                Polyester products
                <br />
                <span className="text-[#ff4d00]">we make.</span>
              </h2>
            </div>
            <div className="hidden text-right md:block">
              <div className="text-xs font-bold uppercase tracking-widest text-black/60">All MOQ 50 pcs</div>
              <div className="mt-1 text-3xl font-black">7–12 days</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <div key={i} className="group flex flex-col border-2 border-black bg-white p-6 transition-all hover:border-[#ff4d00]">
                <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
                  0{i + 1} / Polyester
                </div>
                <h3 className="mb-2 text-xl font-black leading-tight">{p.name}</h3>
                <p className="text-sm leading-relaxed text-black/70">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ff4d00] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <h2 className="text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Ready to print on polyester?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-lg">
            Tell us the product, fabric weight, and quantity.
            We&apos;ll recommend a sublimation spec and send a landed quote.
          </p>
          <Link
            href="/get-a-quote"
            className="mt-8 inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
          >
            Get a Polyester Quote
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
