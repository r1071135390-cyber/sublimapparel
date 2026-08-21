import { Contact } from"@/components/contact";
import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import Link from"next/link";
import { MapPin } from"lucide-react";
import Image from"next/image";

export const metadata = buildPageMetadata({
    title: "About SublimApparel — Yiwu Custom Apparel Factory Since 2018 (12 Lines, 70%...",
    description: "SublimApparel is a Yiwu-based apparel factory producing custom sublimated, all-over digital printed, DTG, DTF, and screen-printed apparel for B2B customers...",
    keywords: ["about SublimApparel", "Yiwu sublimation factory", "custom apparel manufacturer", "8 years experience", "50+ countries served", "US warehouse Fontana", "B2B manufacturer", "6000+ designs", "in-house design team", "OEM apparel"],
    other: {
    "article:author": "Ramon Wang, Sales Director, SublimApparel",
    "article:published_time": "2018-01-01T00:00:00.000Z",
    "article:modified_time": "2025-08-18T00:00:00.000Z",
  },
  });;

const capabilities = [
  { title:"Sublimation & DTG printing", desc:"Large-format printers, full CMYK color, polyester and 100% cotton." },
  { title:"Cutting & sorting", desc:"Clean edges, accurate sizing, ready for assembly." },
  { title:"Sewing & assembly", desc:"Brother industrial machines, hand-finished construction." },
  { title:"Quality control", desc:"4-stage inspection, AQL 2.5 standard, 99.2% first-pass." },
  { title:"Packing & labeling", desc:"Polybag, individual box, hangtag, barcode — retail-ready." },
  { title:"Sample room", desc:"100+ color swatches, free sample run before bulk production." },
];

const locations = [
  {
    city:"Yiwu, China (HQ)",
    role:"Factory + Global Hub",
    address: ["No. 35 Lingyun Road","Yiwu, Zhejiang, China"],
    desc:"Our only production site. 12 lines, 50+ staff, daily output 2,500+ pieces. Direct access to the world's largest small-commodity logistics network.",
  },
];

const values = [
  { word:"Craft", desc:"Every piece is hand-finished. Quality over speed, always." },
  { word:"Clarity", desc:"One quote. One timeline. One point of contact. No surprises." },
  { word:"Care", desc:"Your deadline is our deadline. Your reputation is our reputation." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ])} />
      <main>
      <section className="relative overflow-hidden border-b-2 border-black bg-[#0a0a0a] text-white">
        {/* Full-bleed background image — blurred/dark on left under text, clear on right */}
        <div className="absolute inset-0">
          <Image
            src="/about-hero.webp"
            alt="SublimApparel Yiwu factory exterior with 3D SublimApparel signage in brand orange on the upper facade"
            fill
            sizes="100vw"
            className="object-cover object-[center_30%]"
            priority
          />
          {/* Gradient mask: solid dark on left where text sits, transparent on the right where the building is clear */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #0a0a0a 0%, #0a0a0a 30%, rgba(10,10,10,0.85) 45%, rgba(10,10,10,0.35) 62%, rgba(10,10,10,0) 80%)",
            }}
          />
          {/* Extra heavy blur layer on the very left to fade out the image where the text sits */}
          <div
            className="absolute inset-y-0 left-0 w-1/2 backdrop-blur-md"
            style={{
              background:
                "linear-gradient(to right, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.35) 60%, rgba(10,10,10,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, #000 0%, #000 60%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, #000 0%, #000 60%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="max-w-2xl">
              <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                About SublimApparel
              </div>
              <h1 className="text-[2.75rem] font-black leading-[1.05] tracking-tight text-white md:text-[4rem] lg:text-[4.5rem]">
                One factory
                <br />
                in <span className="text-[#cc3d00]">Yiwu</span>, China.
                <br />
                Print for the world.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                SublimApparel is a full-service sublimation apparel factory — design, print, cut, sew,
                QC, pack, and ship — all under one roof in Yiwu, Zhejiang. We were built to serve
                the kind of customer who needs a reliable Chinese partner for custom team wear,
                event merchandise, and brand apparel.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/contact/"
                  className="inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-[#e64500]"
                >
                  Visit the factory →
                </Link>
                <Link
                  href="/technique/"
                  className="inline-flex items-center gap-2 border-2 border-white/40 px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
                >
                  See what we make
                </Link>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-4 pt-3">
                <div>
                  <div className="text-3xl font-black text-white md:text-4xl">2018</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/60">Founded</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white md:text-4xl">6+</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/60">Years sublimation-only</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white md:text-4xl">50+</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/60">Countries shipped</div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Company background */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-3 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Company background
          </div>
          <h2 className="mb-10 text-4xl font-black leading-tight text-black md:text-6xl">
            Who we are
            <br />
            <span className="italic">on paper.</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="border-2 border-black bg-white p-6">
              <div className="text-xs font-black uppercase tracking-widest text-black/50">
                Legal entity
              </div>
              <div className="mt-2 text-lg font-black leading-tight text-black md:text-xl">
                Registered apparel manufacturer in Yiwu, Zhejiang, China.
              </div>
            </div>
            <div className="border-2 border-black bg-white p-6">
              <div className="text-xs font-black uppercase tracking-widest text-black/50">
                Established
              </div>
              <div className="mt-2 text-4xl font-black text-[#cc3d00] md:text-5xl">
                2018
              </div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-black/60">
                6+ years in sublimation
              </div>
            </div>
            <div className="border-2 border-black bg-white p-6">
              <div className="text-xs font-black uppercase tracking-widest text-black/50">
                Address
              </div>
              <div className="mt-2 text-base font-bold leading-snug text-black md:text-lg">
                35 Lingyun Road
                <br />
                Yiwu, Zhejiang, China
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factory floor panorama — same image as home hero */}
      <section className="relative border-b-2 border-black bg-black">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src="/factory-floor.webp"
            alt="A row of large-format sublimation printers in the SublimApparel factory in Yiwu"
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          {/* Subtle bottom-left gradient for legibility of the label */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0) 55%)",
            }}
          />
        </div>
        <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">
          <div className="mb-2 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Inside the factory
          </div>
          <div className="max-w-3xl text-2xl font-black leading-tight text-white md:text-4xl">
            2,000 sqm · 12 lines · 6 sublimation printers · 50+ staff
          </div>
          <div className="mt-2 text-xs font-bold uppercase tracking-widest text-white/70">
            Yiwu, Zhejiang — the only place we make things.
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { num:"Since 2018", label:"Founded in Yiwu" },
              { num:"100+", label:"Countries via DDP" },
              { num:"2.5K+", label:"Pieces per day" },
              { num:"99.6%", label:"On-time delivery" },
            ].map((s) => (
              <div
                key={s.label}
                className="border-2 border-black bg-white p-6"
              >
                <div className="text-5xl font-black text-[#cc3d00] md:text-6xl">
                  {s.num}
                </div>
                <div className="mt-2 text-xs font-black uppercase tracking-widest text-black/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory intro video — matches home VideoShowcase layout */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#cc3d00] md:text-xs">
                [ 002 / Watch · 40 seconds ]
              </div>
              <h2 className="mb-4 text-3xl font-extrabold leading-[1.1] md:text-5xl">
                <span className="text-white">A 40-second walk </span>
                <span className="text-[#cc3d00]">through our Yiwu factory.</span>
              </h2>
              <p className="mb-6 text-base leading-relaxed text-white/70 md:text-lg">
                Sublimation printers, DTG lines, cut-and-sew, QC, packing &mdash; one roof, one team, one quote. Real footage, no voice-over, no fluff.
              </p>
              <ul className="space-y-2 text-sm text-white/70 md:text-base">
                <li>&bull; Sublimation printing &mdash; large format, edge-to-edge</li>
                <li>&bull; DTG &amp; DTF on 100% cotton</li>
                <li>&bull; Cut-and-sew assembly lines</li>
                <li>&bull; QC, packing, DDP shipping prep</li>
              </ul>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
              <video
                src="/videos/sublimapparel-factory-intro.mp4"
                poster="/about-hero.webp"
                controls
                preload="metadata"
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* What we do — 6 process photos */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
                What we do
              </div>
              <h2 className="text-4xl font-black leading-tight text-black md:text-6xl">
                Six steps.
                <br />
                <span className="text-[#cc3d00]">One roof.</span>
              </h2>
            </div>
            <p className="max-w-md text-base text-black/70">
              Every step happens under one roof in Yiwu. No subcontractors, no handoffs,
              no surprises about where your order actually gets made.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { src:"/about-process-pr.webp", alt:"Large-format sublimation printer in operation with a worker in a blue vest", num:"01", title:"Sublimation & DTG printing", desc:"Large-format printers, full CMYK color, polyester and 100% cotton." },
              { src:"/about-process-cu.webp", alt:"Worker at a long cutting and sorting table with rows of shirt forms behind", num:"02", title:"Cutting & sorting", desc:"Clean edges, accurate sizing, ready for assembly." },
              { src:"/about-process-se.webp", alt:"Brother industrial sewing machine with a worker's hands guiding red striped fabric", num:"03", title:"Sewing & assembly", desc:"Brother industrial machines, hand-finished construction." },
              { src:"/about-process-qc.webp", alt:"Quality control inspector examining a printed t-shirt on a long inspection table", num:"04", title:"Quality control", desc:"4-stage inspection, AQL 2.5 standard, 99.2% first-pass." },
              { src:"/about-process-pa.webp", alt:"Worker folding finished garments on a packing table with clear poly bags and shipping boxes", num:"05", title:"Packing & labeling", desc:"Polybag, individual box, hangtag, barcode — retail-ready." },
              { src:"/about-process-sa.webp", alt:"Sample showroom with dozens of finished t-shirts on hangers organized by color on a long display rack", num:"06", title:"Sample room", desc:"100+ color swatches, free sample run before bulk production." },
            ].map((c) => (
              <div
                key={c.num}
                className="group flex flex-col border-2 border-black bg-white transition-all hover:border-[#ff4d00]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#faf9f6]">
                  <Image
                    src={c.src}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 inline-block bg-black px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                    {c.num}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black leading-tight text-black md:text-xl">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="relative overflow-hidden border-b-2 border-black bg-[#0a0a0a] text-white">
        {/* Full-bleed screen printing workshop photo as background */}
        <div className="absolute inset-0">
          <Image
            src="/about-screen-print-shop.webp"
            alt="Inside the SublimApparel screen printing workshop in Yiwu — long parallel printing tables with white t-shirts laid flat, workers in blue t-shirts"
            fill
            sizes="100vw"
            className="object-cover object-[center_45%]"
          />
          {/* Dark gradient so white cards stay legible on top of the image */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.7) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="mb-3 inline-block bg-[#ffd400] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
            Where we make it
          </div>
          <h2 className="mb-12 text-4xl font-black leading-tight text-white md:text-6xl">
            From Yiwu
            <br />
            <span className="text-[#cc3d00]">to worldwide.</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {locations.map((loc, i) => (
              <div
                key={loc.city}
                className="border-2 border-white/30 bg-white p-8"
              >
                <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#cc3d00]">
                  0{i + 1} / {loc.role}
                </div>
                <h3 className="mb-4 text-3xl font-black text-black md:text-4xl">
                  {loc.city}
                </h3>
                <div className="mb-4 flex items-start gap-2 text-sm font-medium leading-relaxed text-black/80">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#cc3d00]" />
                  <div>
                    {loc.address.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>
                <p className="text-base leading-relaxed text-black/80">{loc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12">
            <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              How we work
            </div>
            <h2 className="text-4xl font-black leading-tight text-black md:text-6xl">
              Three words
              <br />
              <span className="italic">we live by.</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <div
                key={v.word}
                className="border-2 border-black bg-[#faf9f6] p-8"
              >
                <div className="mb-4 text-7xl font-black text-[#0078a8]">
                  0{i + 1}
                </div>
                <h3 className="mb-3 text-3xl font-black text-black">{v.word}</h3>
                <p className="text-base leading-relaxed text-black/70">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dive deeper — 5 sub-pages */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
                Dive deeper
              </div>
              <h2 className="text-4xl font-black leading-tight text-black md:text-6xl">
                Five pages that go <span className="text-[#cc3d00]">deeper</span>.
              </h2>
            </div>
            <p className="max-w-md text-base text-black/70">
              The above is the elevator pitch. The five pages below answer the questions
              buyers ask in the second call.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { href:"/about/factory", title:"Inside the factory", blurb:"2,000 sqm, 12 production lines, 6 sublimation printers, 50+ staff. Tour the floor.", badge:"Factory" },
              { href:"/about/production", title:"Production process", blurb:"7 steps from inquiry to delivery, 21-day average, no black box.", badge:"Process" },
              { href:"/about/quality", title:"Quality control", blurb:"4-stage QC, 50+ checkpoints, AQL 2.5, 99.2% first-pass rate.", badge:"Quality" },
              { href:"/about/cases", title:"Industries we serve", blurb:"12 verticals, 1,000+ clients, 5M+ pieces last year. Race, sports, schools, political, yoga, esports, more.", badge:"Industries" },
              { href:"/about/faq", title:"30 B2B questions", blurb:"Pricing, MOQ, fabric, lead time, shipping, customs, payment, samples, files. Honest answers.", badge:"FAQ" },
            ].map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group flex flex-col border-2 border-black bg-white p-6 transition-all hover:bg-[#ff4d00] hover:text-white"
              >
                <div className="mb-3 inline-block w-fit bg-black px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white group-hover:bg-white group-hover:text-black">
                  {r.badge}
                </div>
                <h3 className="mb-2 text-2xl font-black leading-tight">
                  {r.title} →
                </h3>
                <p className="text-sm leading-relaxed text-black/70 group-hover:text-white/90">
                  {r.blurb}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Contact /></main>
    </>
  );
}
