import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    name: "Custom T-Shirts",
    desc: "All-over print tees in polyester or cotton. Perfect for events, campaigns, and promotions.",
    tags: ["Polyester", "Cotton", "All-over"],
    color: "from-cyan-500/30 to-blue-600/30",
  },
  {
    name: "Sports Jerseys",
    desc: "Sublimated jerseys for running, cycling, soccer, and more. Moisture-wicking performance fabric.",
    tags: ["Running", "Cycling", "Team"],
    color: "from-emerald-500/30 to-teal-600/30",
  },
  {
    name: "Hoodies & Sweatshirts",
    desc: "Premium all-over printed hoodies. Soft fleece interior with edge-to-edge graphics.",
    tags: ["Fleece", "Premium", "Unisex"],
    color: "from-purple-500/30 to-pink-600/30",
  },
  {
    name: "Tank Tops & Vests",
    desc: "Lightweight sublimated vests for races, gyms, and summer events. Full custom design.",
    tags: ["Racing", "Gym", "Summer"],
    color: "from-amber-500/30 to-orange-600/30",
  },
  {
    name: "Flags & Banners",
    desc: "Custom printed flags, banners, and event signage. Indoor and outdoor options.",
    tags: ["Vinyl", "Fabric", "Custom"],
    color: "from-rose-500/30 to-red-600/30",
  },
  {
    name: "Accessories",
    desc: "Sublimated caps, totes, bandanas, and more. Round out your event merchandise lineup.",
    tags: ["Caps", "Bags", "Gear"],
    color: "from-indigo-500/30 to-violet-600/30",
  },
];

export function Products() {
  return (
    <section className="relative bg-[#06080f] py-24 text-white">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
              Product Catalog
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Six categories, infinite possibilities.
            </h2>
          </div>
          <Link
            href="/v4/products"
            className="group inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
          >
            View all products
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.name}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all hover:border-white/20"
            >
              <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${product.color}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-white/10">{product.name.charAt(0)}</div>
                </div>
                <div className="absolute inset-0 bg-[#06080f]/20" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{product.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
