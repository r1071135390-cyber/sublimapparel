const products = [
  { name: "Cotton T-Shirts", material: "100% Combed Cotton", note: "Full-print, all-over" },
  { name: "Sports Jerseys", material: "Polyester Mesh", note: "Sublimated, breathable" },
  { name: "Hoodies", material: "Cotton Fleece / Poly", note: "Full-surface print" },
  { name: "Tank Tops", material: "Performance Knit", note: "Race-ready" },
  { name: "Flags & Banners", material: "Polyester Satin", note: "Hemmed, pole-ready" },
  { name: "Caps & Beanies", material: "Cotton / Poly blend", note: "Custom panels" },
];

export function Products() {
  return (
    <section className="border-t border-stone-300 bg-[#f5f1e8] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-start gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
              Chapter 03 — Catalogue
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light tracking-tight text-stone-900 md:text-5xl">
              Six product
              <br />
              <span className="italic">families.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone-600">
              Everything we make is built around full-colour sublimation.
              Cotton or polyester, you choose. Minimum order is fifty pieces.
            </p>
          </div>

          <div className="md:col-span-8">
            <div className="divide-y divide-stone-300 border-y border-stone-300">
              {products.map((p, i) => (
                <article
                  key={p.name}
                  className="grid grid-cols-12 items-baseline gap-4 py-6 transition-colors hover:bg-[#ede7d6]"
                >
                  <span className="col-span-1 font-mono text-xs text-stone-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="col-span-5 font-serif text-xl text-stone-900 md:col-span-5">
                    {p.name}
                  </h3>
                  <p className="col-span-6 text-sm text-stone-600 md:col-span-4">
                    {p.material}
                  </p>
                  <p className="col-span-12 text-right text-xs uppercase tracking-widest text-stone-500 md:col-span-2 md:text-left">
                    {p.note}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
