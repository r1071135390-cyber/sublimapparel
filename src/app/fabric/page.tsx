import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Droplets, Leaf } from "lucide-react";
import { fabricTypes } from "@/lib/fabric-data";

export const metadata: Metadata = {
  title: "Fabric & Process — Full Fabric Line & 6 Print Processes | SublimApparel",
  description:
    "Our full fabric line in stock (polyester, poly-spandex, nylon, cotton, blends and more) and 6 print processes (sublimation, DTG, DTF, screen, embroidery, cut-and-sew). Sublimation fit rating included for every fabric. Send your own fabric — we'll print on it too.",
};

const fabrics = [
  {
    slug: "cotton",
    name: "100% Cotton",
    badge: "Most factories skip this",
    badgeColor: "bg-[#ff4d00]",
    icon: Leaf,
    color: "bg-[#faf9f6]",
    desc: "Beyond DTG and DTF printing on 100% cotton, organic cotton — we can do overall printing too. Soft hand feel, full color, low MOQ 50 pcs.",
    href: "/fabric/cotton#cotton-fabrics",
  },
  {
    slug: "polyester",
    name: "100% Polyester",
    badge: "Our bread & butter",
    badgeColor: "bg-[#00c2ff] text-black",
    icon: Droplets,
    color: "bg-white",
    desc: "Dye sublimation on polyester — all-over print, photorealistic color, no setup fee. Perfect for sportswear, esports, cycling, and streetwear.",
    href: "/fabric/polyester#polyester-fabrics",
  },
];

const processes = [
  { name: "Sublimation", fabric: "Polyester", desc: "All-over print, photorealistic color, zero hand feel" },
  { name: "DTG", fabric: "Cotton (light)", desc: "Direct to garment, soft hand feel, full color on natural fabrics" },
  { name: "DTF", fabric: "Cotton (any color)", desc: "Heat transfer film, vibrant on dark, durable" },
  { name: "Screen print", fabric: "Any", desc: "Classic, cost-effective for high-volume simple designs" },
  { name: "Embroidery", fabric: "Any", desc: "Premium finish for logos, caps, polos" },
  { name: "DTF heat transfer", fabric: "Any", desc: "Versatile, low MOQ, good for small runs" },
];

export default function FabricPage() {
  return (
    <main>
      {/* HERO — full-bleed close-up of sublimation-printed fabric */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="relative h-[60vh] min-h-[480px] w-full lg:h-[78vh] lg:min-h-[640px]">
          <Image
            src="/fabric-hero.webp"
            alt="Close-up of full-sublimation polyester fabric — vivid print on white, knit texture visible"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Gradient mask — solid dark on left under text, transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/92 via-35% to-transparent" />
          {/* Subtle blur on the left half under the text */}
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, #000 0%, #000 35%, transparent 60%)",
              maskImage:
                "linear-gradient(to right, #000 0%, #000 35%, transparent 60%)",
            }}
          />
        </div>

        <div className="absolute inset-0 mx-auto max-w-7xl px-6">
          <div className="flex h-full items-center pb-12 pt-10 md:pb-16 md:pt-14 lg:items-end lg:pb-20 lg:pt-0">
            <div className="max-w-2xl">
              <div className="mb-4 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
                Fabric &amp; Process
              </div>
              <h1 className="text-balance text-3xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-6xl md:whitespace-nowrap lg:text-7xl">
                Overall printing,
                <br />
                <span className="text-[#ff4d00] md:whitespace-nowrap">polyester or cotton.</span>
                <br />
                One factory.
              </h1>
              <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
                We run every major apparel print process so you can pick the
                right fabric and method for your project — not the only one we
                happen to have. Most factories only run polyester sublimation.
                We run cotton too.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FABRIC CARDS */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Fabrics
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Overall apparel printing,
            <br />
            <span className="text-[#ff4d00]">what we print on.</span>
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {fabrics.map((f) => {
              const Icon = f.icon;
              return (
                <Link
                  key={f.slug}
                  href={f.href}
                  className={"group relative flex flex-col border-2 border-black p-8 transition-all hover:border-[#ff4d00] " + f.color}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Icon className="h-8 w-8 text-[#ff4d00]" strokeWidth={1.5} />
                    <span className={"px-2 py-1 text-[10px] font-black uppercase tracking-widest " + f.badgeColor + " text-white"}>
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="mb-3 text-3xl font-black leading-none">{f.name}</h3>
                  <p className="mb-6 flex-1 text-sm text-black/70 md:text-base">{f.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black transition-colors group-hover:text-[#ff4d00]">
                    Explore {f.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FULL FABRIC CATALOGUE */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            Full fabric catalogue
          </div>
          <h2 className="mb-3 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            The <span className="text-[#ff4d00]">fabric line.</span>
          </h2>
          <p className="mb-12 max-w-3xl text-base text-black/70 md:text-lg">
            Real thing, real feel. Composition, weight, common spec, and the sublimation fit rating — on every card.
          </p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {fabricTypes.map((f, i) => (
              <div
                key={i}
                className="group flex flex-col border-2 border-black bg-white transition-all hover:border-[#ff4d00] hover:shadow-[4px_4px_0_0_#ff4d00] md:hover:shadow-[6px_6px_0_0_#ff4d00]"
              >
                {/* Swatch image */}
                <div className="relative aspect-square w-full overflow-hidden border-b-2 border-black bg-[#f5f5f5]">
                  <Image
                    src={`/fabric-sw-${f.swatch}.webp`}
                    alt={`${f.name} fabric swatch`}
                    width={600}
                    height={600}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-3 md:p-4">
                  <h3 className="mb-2 text-sm font-black uppercase leading-tight text-black md:text-base">
                    {f.name}
                  </h3>
                  <p className="mb-2 text-[10px] uppercase tracking-wide text-[#6b6b6b] md:mb-3 md:text-xs">
                    {f.comp}
                  </p>
                  <p className="mb-3 flex-1 text-[11px] leading-relaxed text-[#3a3a3a] md:text-xs">
                    {f.description}
                  </p>
                  <div className="mb-2 space-y-0.5 border-t border-black/10 pt-2 text-[10px] md:text-[11px]">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-bold uppercase tracking-wider text-[#6b6b6b]">Weight</span>
                      <span className="text-right text-black">{f.gsm} gsm</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-bold uppercase tracking-wider text-[#6b6b6b]">Best for</span>
                      <span className="truncate text-right text-black">{f.use}</span>
                    </div>
                  </div>
                  <div className="mt-auto border-t border-black/10 pt-2 md:pt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff4d00] md:text-xs">
                      Sublimation fit: {f.fit} →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-black/50">
            ★ rating = how well the fabric holds sublimation dye. ★★★★★ = full all-over color, ★ = needs special process (we do all of them — including 100% cotton via DTG/DTF).
          </p>

          {/* Download CSV + Send your spec CTA */}
          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-2 border-black bg-[#faf9f6] p-6 md:flex-row md:items-center">
            <div>
              <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#ff4d00]">Spec sheet</div>
              <h4 className="text-lg font-black leading-tight">Download the full catalogue as CSV.</h4>
              <p className="mt-1 text-sm text-black/60">Our full fabric line with composition, weight, and use — for your sourcing team.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href="data:text/csv;charset=utf-8,No,Name,Composition,Weight (gsm),Best for,Sublimation fit%0A1,Polyester jersey,100% Polyester,110-160,T-shirts / cultural shirts / jerseys,5%0A2,Bird-eye mesh,100% Polyester,135-275,Basketball / cycling / team kits,5%0A3,Poly-spandex stretch mesh,92% Poly + 8% Spandex,100-185,Compression / yoga base layers,4%0A4,Polar fleece,100% Polyester,270-420,Hoodies / jackets / winter sports,4%0A5,Nylon-spandex,75-85% Nylon + 15-25% Spandex,160-280,Yoga / swimwear / leggings,3%0A6,Direct print fabric,100% Polyester (coated),100-170,Flags / banners / posters / pillows,5%0A7,Poly-cotton blend (CVC / TC),65% Poly + 35% Cotton,120-260,Polos / workwear / shirts,2%0A8,100% Cotton,100% Cotton,180-250,Cotton tees / hoodies — our edge,1%0A9,Polyester satin / chiffon,100% Polyester,80-120,Dresses / dance / scarves,5%0A10,French terry,100% Polyester,200-320,Hoodies / pullovers,4%0A11,Polyester compression,100% Polyester,180-280,Compression wear / cycling,4%0A12,Microfiber peach,100% Polyester,120-200,Blankets / pillow covers / lining,4"
                download="sublimapparel-fabric-catalogue.csv"
                className="inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-3 text-sm font-black uppercase tracking-widest transition-all hover:bg-black hover:text-white"
              >
                <Download className="h-4 w-4" strokeWidth={2.5} />
                Download CSV
              </a>
              <Link
                href="/get-a-quote"
                className="inline-flex items-center gap-2 bg-[#ff4d00] px-4 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black"
              >
                Send your spec
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSES table */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            Processes
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            All processes we run.
          </h2>

          <div className="overflow-x-auto border-2 border-black">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-black bg-black text-left text-xs font-black uppercase tracking-widest text-white">
                  <th className="px-4 py-3">Process</th>
                  <th className="px-4 py-3">Best on</th>
                  <th className="px-4 py-3">Why pick it</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((p, i) => (
                  <tr key={i} className={"border-b border-black/10 " + (i % 2 === 0 ? "bg-white" : "bg-neutral-50")}>
                    <td className="px-4 py-3 font-black">{p.name}</td>
                    <td className="px-4 py-3 text-sm">{p.fabric}</td>
                    <td className="px-4 py-3 text-sm text-black/70">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* BEYOND THESE 6 — 3 CARDS */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Beyond These 6
          </div>
          <h2 className="mb-3 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            The 6 processes are just the start.
          </h2>
          <p className="mb-12 max-w-3xl text-base text-black/70 md:text-lg">
            The 6 processes below run on our own lines. The full fabric line above is what we keep on hand. Send your own fabric and we&apos;ll print on that too.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="border-2 border-black bg-white p-6">
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#ff4d00]">01 / Featured</div>
              <h3 className="mb-3 text-2xl font-black leading-tight">6 processes featured</h3>
              <p className="text-sm text-black/70">
                The ones we run on our own lines. Optimized for cost, speed, and color.
              </p>
            </div>
            <div className="border-2 border-black bg-white p-6">
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#ff4d00]">02 / In stock</div>
              <h3 className="mb-3 text-2xl font-black leading-tight">100+ fabric types in stock</h3>
              <p className="text-sm text-black/70">
                From 80 gsm chiffon to 420 gsm fleece. See the list above for the full breakdown.
              </p>
            </div>
            <div className="border-2 border-black bg-white p-6">
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#ff4d00]">03 / By request</div>
              <h3 className="mb-3 text-2xl font-black leading-tight">Send your own fabric</h3>
              <p className="text-sm text-black/70">
                Already have a fabric you want us to print on? Send it. We&apos;ll print and ship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <h2 className="text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Not sure which fabric
            <br />
            or process fits?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Tell us what you&apos;re making. We&apos;ll recommend the fabric and
            process that fits your budget, deadline, and design.
          </p>
          <Link
            href="/get-a-quote"
            className="mt-8 inline-flex items-center gap-2 bg-[#ff4d00] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
          >
            Get a Recommendation
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
