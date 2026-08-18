import Image from "next/image";

export function FactoryFloor() {
  return (
    <section className="border-b-2 border-black bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Section header */}
        <div className="mb-12 flex items-end justify-between border-b-2 border-black pb-6">
          <div>
            <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#cc3d00]">
              [ 002 / Factory Floor ]
            </div>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
              Inside the<br />
              <span className="italic text-[#cc3d00]">workshop.</span>
            </h2>
          </div>
          <div className="hidden text-right text-xs font-bold uppercase tracking-widest text-black/60 md:block">
            2,000 sqm.<br />12 production lines.<br />80K pcs / month.
          </div>
        </div>

        {/* Two large equipment shots */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Printer */}
          <div className="group relative overflow-hidden border-2 border-black">
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/printer-closeup.webp"
                alt="Large-format sublimation printer — CMYK print head in action"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-20">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#0078a8]">
                  Equipment #1
                </div>
                <h3 className="mt-1 text-2xl font-black uppercase text-white">
                  Sublimation Printer
                </h3>
                <p className="mt-1 text-sm text-white/80">
                  1.9m wide format. 4-color CMYK + 8-color extended.
                  4,800 × 1,200 DPI. Up to 200 sqm / hour.
                </p>
              </div>
            </div>
          </div>

          {/* Heat press */}
          <div className="group relative overflow-hidden border-2 border-black">
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/heat-press.webp"
                alt="Industrial heat press — 200°C temperature transfer"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-20">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#0078a8]">
                  Equipment #2
                </div>
                <h3 className="mt-1 text-2xl font-black uppercase text-white">
                  Heat Press
                </h3>
                <p className="mt-1 text-sm text-white/80">
                  200°C / 30 sec cycle. 80 × 100 cm platen.
                  Even pressure across the full fabric surface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
