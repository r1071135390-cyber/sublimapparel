import Image from "next/image";

const PRODUCTS = [
  { name: "Race Jerseys", spec: "Lightweight mesh, full sublimation", accent: "bg-[#ff3366]" },
  { name: "Cycling Kits", spec: "Aerodynamic cut, UV protection", accent: "bg-[#00ff88] text-black" },
  { name: "Training Tees", spec: "Moisture-wicking, breathable", accent: "bg-[#0099ff]" },
  { name: "Compression", spec: "4-way stretch, muscle support", accent: "bg-black" },
  { name: "Running Singlets", spec: "Ultra-light, racerback cut", accent: "bg-[#ffaa00] text-black" },
  { name: "Hoodie Warmups", spec: "Thermal-lined, team colors", accent: "bg-[#9933ff]" },
];

export function V6Products() {
  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#00ff88]">
              Product Line
            </div>
            <h2 className="mt-2 text-4xl font-black uppercase leading-none sm:text-5xl">
              Six Categories.
              <br />
              <span className="text-[#00ff88]">Zero Limits.</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.name}
              className="group relative overflow-hidden border-2 border-white/20 p-6 transition-all hover:border-[#00ff88]"
            >
              <div className={`absolute -right-4 -top-4 h-24 w-24 ${p.accent} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`}></div>
              <div className="relative">
                <div className="text-5xl font-black text-white/10">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-4 text-2xl font-black uppercase leading-none">{p.name}</h3>
                <p className="mt-2 text-sm text-white/60">{p.spec}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00ff88]">
                  <span>Specs</span>
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <div className="relative col-span-2 overflow-hidden border-2 border-white/20">
            <div className="relative aspect-[16/7]">
              <Image
                src="/v6-jerseys.jpg"
                alt="Custom sports jerseys"
                width={1000}
                height={1000}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-xs font-black uppercase tracking-widest text-[#00ff88]">
                  Custom Designs
                </div>
                <h3 className="mt-2 text-2xl font-black uppercase">Your Team. Your Colors.</h3>
              </div>
            </div>
          </div>
          <div className="bg-[#00ff88] p-8 text-black">
            <div className="text-4xl font-black">50</div>
            <div className="mt-1 text-sm font-black uppercase tracking-widest">Pcs Minimum</div>
            <p className="mt-4 text-sm text-black/70">
              Order a single kit for testing or 10,000 for a global launch. We scale with you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
