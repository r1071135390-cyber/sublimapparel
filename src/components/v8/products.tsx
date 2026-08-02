const products = [
  { code: "P.01", name: "COTTON T-SHIRTS", spec: "100% COMBED COTTON / FULL-PRINT" },
  { code: "P.02", name: "SPORTS JERSEYS", spec: "POLY MESH / SUBLIMATED" },
  { code: "P.03", name: "HOODIES", spec: "COTTON FLEECE / FULL-SURFACE" },
  { code: "P.04", name: "TANK TOPS", spec: "PERFORMANCE KNIT / RACE-READY" },
  { code: "P.05", name: "FLAGS & BANNERS", spec: "POLY SATIN / HEMMED" },
  { code: "P.06", name: "CAPS & BEANIES", spec: "COTTON-POLY BLEND / PANELS" },
];

export function Products() {
  return (
    <section className="border-b-4 border-black bg-[#ffeb00]">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-6 border-b-2 border-black pb-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-black">
              [003] PRODUCTS
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-black md:text-5xl">
              THE LINEUP
            </h2>
          </div>
          <p className="hidden text-right text-xs font-bold uppercase tracking-widest text-black md:block">
            06 ITEMS
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <article
              key={p.code}
              className="group border-2 border-black bg-white p-6 transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-black hover:text-[#ffeb00]"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-black uppercase tracking-widest">
                  {p.code}
                </span>
                <span className="text-2xl font-black transition-colors group-hover:text-[#ffeb00]">
                  →
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-black uppercase leading-tight">
                {p.name}
              </h3>
              <p className="mt-3 text-xs font-bold uppercase tracking-widest opacity-80">
                {p.spec}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
