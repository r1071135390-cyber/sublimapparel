import { Contact } from"@/components/contact";
import Link from"next/link";
import { MapPin } from"lucide-react";
import Image from"next/image";

export const metadata = {
  title:"About SublimApparel — 2,000 sqm Yiwu Sublimation & Cotton Printing Factory Since 2018",
  description:
"12 production lines, 200+ staff, 99.2% QC pass rate. Sublimation on polyester + all-over printing on 100% cotton. DDP to 100+ countries with all duties pre-paid.",
};

const capabilities = [
  { title:"Sublimation printing", desc:"Large-format printers with CMYK ink sets. Up to 100m of fabric per roll. Both polyester and 100% cotton." },
  { title:"Laser cutting", desc:"Precision cutting to ±0.5mm. Custom patterns and size charts." },
  { title:"Sewing & assembly", desc:"In-house sewing lines. Hand-stitched construction with quality control at every step." },
  { title:"Custom packaging", desc:"Polybag, individual box, hangtag, barcode label — ready for retail or e-commerce fulfillment." },
  { title:"DDP logistics", desc:"End-to-end shipping from Yiwu with all duties pre-paid. Door delivery in 100+ countries." },
  { title:"Optional US buffer", desc:"A small Fontana, CA address for occasional overstock buffer storage. Tier-2 add-on, not a standard service." },
];

const locations = [
  {
    city:"Yiwu, China (HQ)",
    role:"Factory + Global Hub",
    address: ["No. 35 Lingyun Road","Yiwu, Zhejiang, China"],
    desc:"Our only production site. 12 lines, 200+ staff, daily output 2,500+ pieces. Direct access to the world's largest small-commodity logistics network.",
  },
];

const values = [
  { word:"Craft", desc:"Every piece is hand-finished. Quality over speed, always." },
  { word:"Clarity", desc:"One quote. One timeline. One point of contact. No surprises." },
  { word:"Care", desc:"Your deadline is our deadline. Your reputation is our reputation." },
];

export default function AboutPage() {
  return (
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
                in <span className="text-[#ff4d00]">Yiwu</span>, China.
                <br />
                Built for the world.
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                SublimApparel is a full-service sublimation apparel factory — design, print, cut, sew,
                QC, pack, and ship — all under one roof in Yiwu, Zhejiang. We were built to serve
                the kind of customer who needs a reliable Chinese partner for custom team wear,
                event merchandise, and brand apparel.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
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
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
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
              <div className="mt-2 text-4xl font-black text-[#ff4d00] md:text-5xl">
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
                <div className="text-5xl font-black text-[#ff4d00] md:text-6xl">
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

      {/* What we do */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="mb-12 text-4xl font-black leading-tight text-black md:text-6xl">
            What we do
            <br />
            <span className="text-[#ff4d00]">in-house.</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {capabilities.map((c, i) => (
              <div
                key={c.title}
                className="flex gap-4 border-2 border-black bg-[#faf9f6] p-6"
              >
                <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center bg-black text-base font-black text-white">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-black text-black">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="border-b-2 border-black bg-[#ffd400]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-3 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Two locations
          </div>
          <h2 className="mb-12 text-4xl font-black leading-tight text-black md:text-6xl">
            Yiwu + LA
            <br />
            <span className="italic">= worldwide.</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {locations.map((loc, i) => (
              <div
                key={loc.city}
                className="border-2 border-black bg-white p-8"
              >
                <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
                  0{i + 1} / {loc.role}
                </div>
                <h3 className="mb-4 text-3xl font-black text-black md:text-4xl">
                  {loc.city}
                </h3>
                <div className="mb-4 flex items-start gap-2 text-sm font-medium leading-relaxed text-black/80">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#ff4d00]" />
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
                <div className="mb-4 text-7xl font-black text-[#00c2ff]">
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
                Five pages that go <span className="text-[#ff4d00]">deeper</span>.
              </h2>
            </div>
            <p className="max-w-md text-base text-black/70">
              The above is the elevator pitch. The five pages below answer the questions
              buyers ask in the second call.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { href:"/about/factory", title:"Inside the factory", blurb:"2,000 sqm, 12 production lines, 6 sublimation printers, 200+ staff. Tour the floor.", badge:"Factory" },
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

      <Contact />
    </main>
  );
}
