import Link from "next/link";

const PRODUCTS = [
  { id: "P01", name: "T-SHIRT", price: "$8", tag: "BEST_SELLER" },
  { id: "P02", name: "JERSEY", price: "$12", tag: "ATHLETIC" },
  { id: "P03", name: "HOODIE", price: "$18", tag: "PREMIUM" },
  { id: "P04", name: "TANK", price: "$7", tag: "SUMMER" },
  { id: "P05", name: "POLO", price: "$14", tag: "CORPORATE" },
  { id: "P06", name: "FLAG", price: "$5", tag: "EVENT" },
];

export function V10Products() {
  return (
    <section className="bg-gradient-to-b from-black to-fuchsia-950/20 py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div className="font-mono text-xs text-fuchsia-400 tracking-widest mb-4">
              &gt; /PRODUCT_CATALOG
            </div>
            <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight">
              LOAD<span className="text-fuchsia-400">.</span>OUT
            </h2>
          </div>
          <div className="hidden md:block font-mono text-xs text-cyan-400">
            06_ITEMS
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <Link
              key={p.id}
              href="/v10/contact"
              className="group relative bg-black border border-cyan-500/30 hover:border-cyan-400 p-6 transition"
            >
              <div className="absolute top-0 right-0 font-mono text-[10px] text-cyan-500/60 px-2 py-1">
                /{p.id}
              </div>
              <div className="aspect-square bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 mb-6 flex items-center justify-center border border-cyan-500/20">
                <div className="font-mono text-xs text-cyan-500/40">IMG_LOADING...</div>
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-white text-xl font-black tracking-wider group-hover:text-cyan-400 transition">
                  {p.name}
                </h3>
                <span className="text-fuchsia-400 font-mono text-sm">FROM {p.price}</span>
              </div>
              <div className="font-mono text-[10px] text-cyan-400/60 tracking-widest">
                [{p.tag}]
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
