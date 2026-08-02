import { V3Contact } from "@/components/v3/contact";

export const metadata = { title: "About — VividPrint" };

export default function V3AboutPage() {
  return (
    <main>
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            About
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-black md:text-8xl">
            We print
            <br />
            <span className="text-[#ff4d00]">in color.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-snug text-black/80">
            VividPrint is a sublimation apparel factory in Yiwu, China. We specialize in
            full-color all-over print on polyester and 100% cotton — and we ship DDP to your
            door, anywhere in the world.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { num: "10+", label: "Years in sublimation" },
              { num: "50+", label: "Countries served" },
              { num: "200K+", label: "Pieces per month" },
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

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="mb-12 text-4xl font-black leading-tight text-black md:text-6xl">
            What we do
            <br />
            <span className="text-[#ff4d00]">in-house.</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: "Sublimation printing", desc: "Large-format printers with CMYK ink sets. Up to 100m of fabric per roll." },
              { title: "Laser cutting", desc: "Precision cutting to ±0.5mm. Custom patterns and size charts." },
              { title: "Sewing & assembly", desc: "Hand-stitched construction. Experienced line workers, quality control at every step." },
              { title: "DDP logistics", desc: "End-to-end shipping with all duties pre-paid. Door delivery in 50+ countries." },
            ].map((c, i) => (
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

      <V3Contact />
    </main>
  );
}
