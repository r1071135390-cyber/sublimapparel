import Link from "next/link";

const products = [
  {
    name: "Custom T-Shirts",
    tags: ["Polyester", "Cotton", "All-over print"],
    desc: "Full-color tees for events, campaigns, and promotions.",
    color: "#ff4d00",
    rotate: "-rotate-1",
  },
  {
    name: "Sports Jerseys",
    tags: ["Running", "Cycling", "Team"],
    desc: "Sublimated jerseys with moisture-wicking fabric.",
    color: "#00c2ff",
    rotate: "rotate-1",
  },
  {
    name: "Hoodies & Sweatshirts",
    tags: ["Fleece", "Premium", "Unisex"],
    desc: "Soft fleece with stunning full-surface graphics.",
    color: "#000000",
    rotate: "-rotate-1",
  },
  {
    name: "Tank Tops & Vests",
    tags: ["Athletic", "Lightweight", "Summer"],
    desc: "Breathable sublimated vests for races and gyms.",
    color: "#ffd400",
    rotate: "rotate-1",
  },
  {
    name: "Flags & Banners",
    tags: ["Indoor", "Outdoor", "Custom size"],
    desc: "Vibrant printed flags for events and storefronts.",
    color: "#9b51e0",
    rotate: "-rotate-1",
  },
  {
    name: "Accessories",
    tags: ["Caps", "Bags", "Scarves"],
    desc: "Extend your brand with matching accessories.",
    color: "#22c55e",
    rotate: "rotate-1",
  },
];

export function V3Products() {
  return (
    <section className="border-b-2 border-black bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Products
            </div>
            <h2 className="text-5xl font-black leading-[0.95] tracking-tight text-black md:text-7xl">
              What we
              <br />
              <span className="italic">make.</span>
            </h2>
          </div>
          <Link
            href="/v3/products"
            className="group inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white"
          >
            View all
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Product grid - irregular layout */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Link
              key={p.name}
              href="/v3/products"
              className={`group relative flex flex-col gap-4 border-2 border-black bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] ${p.rotate} hover:rotate-0`}
            >
              {/* Color block preview */}
              <div
                className="relative aspect-[4/3] overflow-hidden border border-black"
                style={{ backgroundColor: p.color }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-black text-white/30">
                    0{i + 1}
                  </span>
                </div>
                {/* Dotted hint for transparent PNG */}
                <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:12px_12px]" />
              </div>

              <div>
                <h3 className="text-2xl font-black leading-tight text-black">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70">
                  {p.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-black bg-white px-2 py-1 text-[10px] font-black uppercase tracking-wider text-black"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
                See details
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
