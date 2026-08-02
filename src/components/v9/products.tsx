import Image from "next/image";
import Link from "next/link";

const PRODUCTS = [
  { name: "T-Shirt", desc: "Cotton or polyester, full print front and back.", price: "From $8" },
  { name: "Sports Jersey", desc: "Moisture-wicking, sublimated, team-ready.", price: "From $12" },
  { name: "Hoodie", desc: "Heavyweight cotton, all-over graphics.", price: "From $18" },
  { name: "Tank Top", desc: "Lightweight, breathable, perfect for events.", price: "From $7" },
  { name: "Polo Shirt", desc: "Cotton piqué, custom collar and placket.", price: "From $14" },
  { name: "Flag & Banner", desc: "Polyester, hemmed, ready to hang.", price: "From $5" },
];

export function V9Products() {
  return (
    <section className="bg-[#faf8f3] py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20">
          <div className="text-stone-400 text-xs tracking-[0.3em] font-light mb-6">
            — Products
          </div>
          <h2 className="text-stone-900 text-3xl md:text-5xl font-light leading-tight max-w-2xl">
            What we make, in plain language.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {PRODUCTS.map((p) => (
            <Link
              key={p.name}
              href="/v9/contact"
              className="group block pb-8 border-b border-stone-200 hover:border-stone-900 transition"
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-stone-900 text-2xl font-light group-hover:italic transition">
                  {p.name}
                </h3>
                <span className="text-stone-400 text-sm font-light">{p.price}</span>
              </div>
              <p className="text-stone-500 text-sm font-light leading-relaxed">
                {p.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
