import { FabricCatalogGrid } from "@/components/fabric-catalog-grid";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, Droplets, Leaf } from "lucide-react";
import { fabricTypes } from "@/lib/fabric-data";

export const metadata: Metadata = {
  title: "Which Fabric & Print Process Should You Choose? — 24 Fabrics, 6 Print Methods",
  description: "Pick the right fabric-process combo for your apparel project. 24 fabrics in stock (polyester, poly-spandex, nylon, cotton, organic, rPET, blends), 6 print...",
  keywords: [
    "sublimation fabric",
    "polyester jersey",
    "poly-cotton blend",
    "bird-eye mesh",
    "poly-spandex stretch",
    "performance fabric",
    "activewear fabric",
    "custom apparel fabric",
    "fabric for sublimation printing",
    "wholesale fabric China",
  ],

  openGraph: {
    images: ["/fabric-hero.webp"],
  },
  authors: [{ name: "Ramon Wang", url: "https://sublimapparel.com/about" }],
  other: {
    "article:author": "Ramon Wang, Sales Director, SublimApparel",
    "article:published_time": "2024-01-15T00:00:00.000Z",
    "article:modified_time": "2025-08-18T00:00:00.000Z",
  },
};

const fabrics = [
  {
    slug: "cotton",
    name: "100% Cotton",
    badge: "Most factories skip this",
    badgeColor: "bg-[#ff4d00]",
    icon: Leaf,
    color: "bg-[#faf9f6]",
    desc: "Beyond DTG and DTF printing on 100% cotton, organic cotton — we also do allover digital print on cotton (true edge-to-edge, cut-and-sew workflow). Soft hand feel, full color, low MOQ.",
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
  { name: "Sublimation Printing", slug: "sublimation", bestOn: "Polyester", desc: "Dye fuses into fibers — permanent, breathable, full-color, zero hand feel" },
  { name: "All-Over Printing (AOP)", slug: "overall-printing", bestOn: "Polyester, poly-blend", desc: "Edge-to-edge coverage with no blank borders — bold patterns on the whole garment" },
  { name: "Screen Printing", slug: "screen-printing", bestOn: "Any", desc: "Thick ink layers — vivid, opaque, survives hundreds of washes" },
  { name: "Embroidery", slug: "embroidery", bestOn: "Any", desc: "Premium stitched logos with a textured, high-end feel" },
  { name: "DTG Printing", slug: "dtg", bestOn: "100% cotton", desc: "Direct-to-garment digital — unlimited colors, photo-level detail" },
  { name: "DTF Printing", slug: "dtf", bestOn: "Any fabric / color", desc: "Print to film, then heat-press — vibrant, flexible, crack-resistant" },
  { name: "3D Puff Printing", slug: "3d-puff", bestOn: "Cotton, poly-blend", desc: "Heat-activated ink rises into a rounded, raised print with real tactile depth" },
  { name: "3D Embroidery", slug: "3d-embroidery", bestOn: "Caps, jackets", desc: "Foam-backed stitching raises your logo into a bold, three-dimensional statement" },
  { name: "Rhinestone Embellishment", slug: "rhinestone", bestOn: "Any", desc: "Heat-set rhinestones add eye-catching sparkle with precision placement" },
  { name: "Embossing Press", slug: "embossing", bestOn: "Cotton, poly-blend", desc: "Heat and pressure create a tone-on-tone raised texture — quiet, premium branding" },
  { name: "Beaded Embroidery", slug: "beaded", bestOn: "Silk, satin, premium", desc: "Hand-finished beadwork adds luxurious texture and shimmer to high-fashion pieces" },
  { name: "Yarn Embroidery", slug: "yarn", bestOn: "Knitwear, sweaters", desc: "Chunky, heavy-thread stitching with a tactile, handcrafted character" },
  { name: "Terry Embroidery (Chenille)", slug: "terry", bestOn: "Varsity, retro", desc: "Soft, looped stitches with a plush, towel-like texture — classic varsity look" },
  { name: "Glitter Printing", slug: "glitter", bestOn: "Any", desc: "Sparkling glitter inks catch the light from every angle with soft-hand feel" },
  { name: "Metallic Printing (Foil)", slug: "metallic-printing", bestOn: "Cotton, poly-blend", desc: "Gold, silver, holographic foils pressed on for a luxe mirror-shine finish" },
  { name: "Reflective Printing", slug: "reflective-printing", bestOn: "Polyester, technical", desc: "Glass-bead inks glow under headlights — safety meets style" },
  { name: "Flocking", slug: "flocking", bestOn: "Cotton, poly-blend", desc: "Velvety, raised fibers give a soft suede-like touch with rich color depth" },
  { name: "Silicone Printing", slug: "silicone-printing", bestOn: "Performance, swimwear", desc: "Flexible rubbery ink with smooth matte finish that stretches with the fabric" },
  { name: "Appliqué Embroidery", slug: "applique-embroidery", bestOn: "Team jerseys, varsity", desc: "Fabric panels stitched on for bold, layered designs with crisp clean edges" },
  { name: "Laser Carving", slug: "laser-engraving", bestOn: "Denim, leather, technical", desc: "Precision laser etching creates permanent high-contrast marking on rugged fabrics" },
];

export default function FabricPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Fabric", path: "/fabric" },
      ])} />
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
          <div className="flex h-full items-start pb-12 pt-24 md:pb-16 md:pt-32 lg:items-center lg:pb-0 lg:pt-0">
            <div className="max-w-2xl">
              <div className="mb-4 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
                Fabric &amp; Process
              </div>
              <h1 className="text-balance text-3xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-6xl md:whitespace-nowrap lg:text-7xl">
                Which fabric and print
                <br />
                process fits your design?
                <br />
                <span className="text-[#cc3d00]">24 fabrics, 6 methods.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
                <strong>Short answer:</strong> for all-over print on polyester, use
                sublimation. For all-over print on cotton, use our allover digital
                print on cotton (cut-and-sew). For a small logo on cotton at low
                MOQ, use DTG or DTF at 50 pcs. Below: every fabric we keep in
                stock, every print method we run in-house.
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
            What fabrics can you
            <br />
            <span className="text-[#cc3d00]">print on?</span>
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
                    <Icon className="h-8 w-8 text-[#cc3d00]" strokeWidth={1.5} />
                    <span className={"px-2 py-1 text-[10px] font-black uppercase tracking-widest " + f.badgeColor + " text-white"}>
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="mb-3 text-3xl font-black leading-none">{f.name}</h3>
                  <p className="mb-6 flex-1 text-sm text-black/70 md:text-base">{f.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black transition-colors group-hover:text-[#cc3d00]">
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
            Which fabric fits which <span className="text-[#cc3d00]">project?</span>
          </h2>
          <p className="mb-12 max-w-3xl text-base text-black/70 md:text-lg">
            <strong>Short answer:</strong> polyester for all-over sublimation, cotton for vintage soft-hand feel, poly-spandex for fitted performance, nylon for outerwear. Every card shows composition, weight, and our sublimation fit rating.
          </p>
            <FabricCatalogGrid fabrics={fabricTypes} />
          <p className="mt-6 text-xs text-black/50">
            ★ rating = how well the fabric holds sublimation dye. ★★★★★ = full all-over color, ★ = needs special process (we do all of them — including 100% cotton via DTG/DTF).
          </p>

          {/* Download CSV + Send your spec CTA */}
          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-2 border-black bg-[#faf9f6] p-6 md:flex-row md:items-center">
            <div>
              <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#cc3d00]">Spec sheet</div>
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
                href="/get-a-quote/"
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
            20 Processes
          </div>
          <h2 className="mb-3 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Which print technique <span className="text-[#cc3d00]">should you pick?</span>
          </h2>
          <p className="mb-10 max-w-3xl text-base text-black/70 md:text-lg">
            <strong>Short answer:</strong> sublimation on polyester for all-over; allover digital on cotton for true full-body; DTG/DTF on cotton at low MOQ; screen print for ≥200 pcs; embroidery for caps and polos. Twenty in-house techniques — click any row to see process, best substrates, MOQ, pricing.
          </p>

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
                  <tr key={i} className={"border-b border-black/10 transition-colors hover:bg-[#fff4ef] " + (i % 2 === 0 ? "bg-white" : "bg-neutral-50")}>
                    <td className="px-4 py-3 font-black">
                      <Link
                        href={`/technique/${p.slug}`}
                        className="inline-flex items-center gap-1.5 text-black underline-offset-4 transition-colors hover:text-[#cc3d00] hover:underline"
                      >
                        {p.name}
                        <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm">{p.bestOn}</td>
                    <td className="px-4 py-3 text-sm text-black/70">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* BEYOND THESE 20 — 3 CARDS */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Beyond These 20
          </div>
          <h2 className="mb-3 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            What if your project <span className="text-[#cc3d00]">needs more?</span>
          </h2>
          <p className="mb-12 max-w-3xl text-base text-black/70 md:text-lg">
            <strong>Short answer:</strong> we accept custom technique specs and customer-supplied fabric. Bring a sample or a spec sheet — we will source or replicate. Add ~7–14 days for first-time setup.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="border-2 border-black bg-white p-6">
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#cc3d00]">01 / Featured</div>
              <h3 className="mb-3 text-2xl font-black leading-tight">20 techniques featured</h3>
              <p className="text-sm text-black/70">
                The ones we run on our own lines. Optimized for cost, speed, and color.
              </p>
            </div>
            <div className="border-2 border-black bg-white p-6">
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#cc3d00]">02 / In stock</div>
              <h3 className="mb-3 text-2xl font-black leading-tight">100+ fabric types in stock</h3>
              <p className="text-sm text-black/70">
                From 80 gsm chiffon to 420 gsm fleece. See the list above for the full breakdown.
              </p>
            </div>
            <div className="border-2 border-black bg-white p-6">
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#cc3d00]">03 / By request</div>
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
            Need help choosing
            <br />
            fabric and process?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            <strong>Send us your design brief and target price.</strong> We will recommend the fabric + process combo that fits your budget, deadline, and aesthetic. Reply within 12 working hours.
          </p>
          <Link
            href="/get-a-quote/"
            className="mt-8 inline-flex items-center gap-2 bg-[#ff4d00] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
          >
            Get a Recommendation
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* E-E-A-T author + last-updated footer (visible to crawlers and humans) */}
      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-black/60">
          <p>
            <strong>Written by</strong> Ramon Wang, Sales Director, SublimApparel ·
            8 years in apparel export, English/Chinese. ·
            <strong> Last updated:</strong> 18 August 2025 ·
            <strong> Reviewed by</strong> Lily Chen, Production Manager.
          </p>
          <p className="mt-2">
            Looking for a fast quote? <Link href="/get-a-quote/" className="underline hover:text-[#cc3d00]">Submit your inquiry</Link> with artwork + quantity + delivery country — we reply within 12 working hours.
          </p>
        </div>
      </section>
    </main>
    </>
  );
}
