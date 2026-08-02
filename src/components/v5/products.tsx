import Link from "next/link";

const PRODUCTS = [
  {
    name: "Custom T-Shirts",
    desc: "Polyester and cotton, full-color all-over print. From casual to performance.",
    moq: "50 pcs",
    leadTime: "7-day sample",
    badge: "Best Seller",
    accent: "from-orange-400 to-red-500",
  },
  {
    name: "Sports Jerseys",
    desc: "Moisture-wicking fabric with edge-to-edge graphics. Built for movement.",
    moq: "30 pcs",
    leadTime: "10-day production",
    badge: "Performance",
    accent: "from-blue-400 to-cyan-500",
  },
  {
    name: "Hoodies & Sweatshirts",
    desc: "Premium fleece interior with stunning full-surface graphics. Warm meets vivid.",
    moq: "50 pcs",
    leadTime: "12-day production",
    badge: null,
    accent: "from-neutral-700 to-neutral-900",
  },
  {
    name: "Tank Tops & Vests",
    desc: "Lightweight, breathable, perfect for races, gyms, and summer events.",
    moq: "50 pcs",
    leadTime: "7-day production",
    badge: "Summer",
    accent: "from-yellow-400 to-orange-500",
  },
  {
    name: "Flags & Banners",
    desc: "Single and double-sided sublimated flags. Indoor and outdoor options.",
    moq: "10 pcs",
    leadTime: "5-day production",
    badge: null,
    accent: "from-purple-400 to-pink-500",
  },
  {
    name: "Bags & Accessories",
    desc: "Drawstring bags, backpacks, bandanas — extend your brand everywhere.",
    moq: "100 pcs",
    leadTime: "10-day production",
    badge: null,
    accent: "from-emerald-400 to-teal-500",
  },
];

export function V5Products() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Shop by Category</h2>
            <p className="mt-3 text-lg text-neutral-600">
              Six core categories. Hundreds of customization options.
            </p>
          </div>
          <Link
            href="/v5/products"
            className="text-sm font-semibold text-neutral-900 hover:underline"
          >
            View all products →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:border-neutral-300 hover:shadow-lg"
            >
              <div className={`relative h-40 bg-gradient-to-br ${p.accent}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-3xl font-bold text-white/90">VP</div>
                </div>
                {p.badge && (
                  <span className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-900">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-neutral-900">{p.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{p.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs text-neutral-500">
                  <span>MOQ {p.moq}</span>
                  <span>{p.leadTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
