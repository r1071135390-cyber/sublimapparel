import { V3Contact } from "@/components/v3/contact";

export const metadata = { title: "Products — VividPrint" };

const products = [
  { name: "Custom T-Shirts", desc: "Full-color all-over print tees in polyester or 100% cotton. Perfect for events, campaigns, promotions.", color: "#ff4d00", tags: ["Polyester", "Cotton", "All-over print"] },
  { name: "Sports Jerseys", desc: "Sublimated jerseys for running, cycling, soccer, and more. Moisture-wicking fabric with vivid team designs.", color: "#00c2ff", tags: ["Running", "Cycling", "Team"] },
  { name: "Hoodies & Sweatshirts", desc: "Premium all-over printed hoodies. Soft fleece interior with stunning full-surface graphics.", color: "#000000", tags: ["Fleece", "Premium", "Unisex"] },
  { name: "Tank Tops & Vests", desc: "Breathable sublimated vests for races, gyms, and summer events.", color: "#ffd400", tags: ["Athletic", "Lightweight", "Summer"] },
  { name: "Flags & Banners", desc: "Vibrant printed flags and banners. Indoor or outdoor, custom sizes available.", color: "#9b51e0", tags: ["Indoor", "Outdoor", "Custom size"] },
  { name: "Accessories", desc: "Caps, bags, scarves, and more. Extend your brand beyond apparel.", color: "#22c55e", tags: ["Caps", "Bags", "Scarves"] },
];

const comparison = [
  { feature: "Best for", poly: "Performance, sports, vivid colors", cotton: "Comfort, lifestyle, natural feel" },
  { feature: "Hand feel", poly: "Smooth, lightweight, athletic", cotton: "Soft, breathable, natural" },
  { feature: "Color vibrancy", poly: "Maximum CMYK saturation", cotton: "Rich but slightly muted" },
  { feature: "Wash durability", poly: "Excellent — colors stay vivid", cotton: "Excellent — colors stay rich" },
  { feature: "MOQ", poly: "50 pcs", cotton: "100 pcs" },
  { feature: "Lead time", poly: "10-15 days", cotton: "15-20 days" },
];

export default function V3ProductsPage() {
  return (
    <main>
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Catalog
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-black md:text-8xl">
            Six things
            <br />
            we <span className="italic">make.</span>
          </h1>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <div
                key={p.name}
                className="flex flex-col gap-4 border-2 border-black bg-white p-6"
              >
                <div
                  className="relative flex aspect-[4/3] items-center justify-center border border-black"
                  style={{ backgroundColor: p.color }}
                >
                  <span className="text-7xl font-black text-white/30">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-black">{p.name}</h3>
                <p className="text-sm leading-relaxed text-black/70">{p.desc}</p>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material comparison */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12">
            <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Fabric
            </div>
            <h2 className="text-4xl font-black leading-tight text-black md:text-6xl">
              Polyester vs.
              <br />
              <span className="text-[#ff4d00]">100% Cotton.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-black/70">
              Most factories can only print on polyester. We do both — and we&apos;ve perfected
              full-color all-over print on 100% cotton, too.
            </p>
          </div>

          <div className="overflow-x-auto border-2 border-black">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-black bg-black text-white">
                  <th className="p-4 text-xs font-black uppercase tracking-widest">
                    Feature
                  </th>
                  <th className="p-4 text-xs font-black uppercase tracking-widest bg-[#00c2ff]/20 text-black">
                    Polyester
                  </th>
                  <th className="p-4 text-xs font-black uppercase tracking-widest bg-[#ff4d00]/10 text-black">
                    100% Cotton
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf9f6]"}
                  >
                    <td className="p-4 text-sm font-black uppercase tracking-wider text-black">
                      {row.feature}
                    </td>
                    <td className="p-4 text-sm text-black/80">{row.poly}</td>
                    <td className="p-4 text-sm text-black/80">{row.cotton}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 border-2 border-[#ff4d00] bg-[#ff4d00]/5 p-6">
            <div className="text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Our specialty
            </div>
            <p className="mt-2 text-lg font-bold text-black">
              Full-color all-over print on 100% cotton is hard to find. Most sublimation
              factories can&apos;t do it — we can, with rich color and soft hand feel.
            </p>
          </div>
        </div>
      </section>

      <V3Contact />
    </main>
  );
}
