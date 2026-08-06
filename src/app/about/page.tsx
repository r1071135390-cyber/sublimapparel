import { Contact } from "@/components/contact";

export const metadata = { title: "About — SublimPrint" };

const capabilities = [
  { title: "Sublimation printing", desc: "Large-format printers with CMYK ink sets. Up to 100m of fabric per roll. Both polyester and 100% cotton." },
  { title: "Laser cutting", desc: "Precision cutting to ±0.5mm. Custom patterns and size charts." },
  { title: "Sewing & assembly", desc: "In-house sewing lines. Hand-stitched construction with quality control at every step." },
  { title: "DDP logistics", desc: "End-to-end shipping from Yiwu with all duties pre-paid. Door delivery in 50+ countries." },
  { title: "LA warehouse", desc: "Stocked inventory in Fontana for US customers. Domestic shipping, no customs, 2-5 day delivery." },
  { title: "Custom packaging", desc: "Polybag, individual box, hangtag, barcode label — ready for retail or e-commerce fulfillment." },
];

const locations = [
  { city: "Yiwu, China", role: "Factory + Global Hub", desc: "Complete production line. Daily output: 5,000+ pieces. Direct access to the world's largest small-commodity logistics network." },
  { city: "Fontana, CA, USA", role: "Overseas Warehouse", desc: "Stocked inventory for US customers. Domestic 2-5 day shipping. No customs. No duties. Perfect for e-commerce and time-sensitive orders." },
];

const values = [
  { word: "Craft", desc: "Every piece is hand-finished. Quality over speed, always." },
  { word: "Clarity", desc: "One quote. One timeline. One point of contact. No surprises." },
  { word: "Care", desc: "Your deadline is our deadline. Your reputation is our reputation." },
];

export default function AboutPage() {
  return (
    <main>
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            About
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-black md:text-8xl">
            From Yiwu
            <br />
            <span className="text-[#ff4d00]">to the world.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-snug text-black/80">
            sublimprint.com is a website of a full-service sublimation factory based in Yiwu, China — with a
            warehouse in Fontana, CA. We print on polyester and 100% cotton. We cut, sew, and
            ship anywhere in the world. And we handle the customs so you don&apos;t have to.
          </p>
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
                Yiwu HomeDorm Commodity Manufacturing Co., Ltd.
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
              { num: "Since 2018", label: "Founded in Yiwu" },
              { num: "200+", label: "Countries via DDP" },
              { num: "5K+", label: "Pieces per day" },
              { num: "98%", label: "On-time delivery" },
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

      <Contact />
    </main>
  );
}
