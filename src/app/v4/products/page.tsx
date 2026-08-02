import { Products } from "@/components/v4/products";
import { Process } from "@/components/v4/process";
import { DDP } from "@/components/v4/ddp";
import { Check, X } from "lucide-react";

export const metadata = {
  title: "Products | VividPrint",
  description: "Sublimation apparel catalog: t-shirts, jerseys, hoodies, vests, flags, accessories.",
};

const fabricComparison = {
  polyester: {
    color: "Vivid & saturated",
    feel: "Smooth, lightweight",
    durability: "Excellent color fastness",
    best: "Sports, performance, racing",
  },
  cotton: {
    color: "Slightly muted, natural",
    feel: "Soft, breathable",
    durability: "Excellent color fastness",
    best: "Fashion, lifestyle, premium",
  },
};

const categories = [
  { name: "T-Shirts", desc: "Crew neck, V-neck, long sleeve. Polyester or cotton.", moq: "50 pcs" },
  { name: "Sports Jerseys", desc: "Running, cycling, soccer, basketball. Performance fabric.", moq: "30 pcs" },
  { name: "Hoodies", desc: "Pullover, zip-up, cropped. Fleece lined.", moq: "30 pcs" },
  { name: "Tank Tops", desc: "Racing singlets, gym vests, summer cuts.", moq: "50 pcs" },
  { name: "Flags & Banners", desc: "Custom printed flags, banners, signage.", moq: "20 pcs" },
  { name: "Accessories", desc: "Caps, totes, bandanas, scarves, aprons.", moq: "50 pcs" },
];

export default function V4ProductsPage() {
  return (
    <>
      <section className="bg-[#0a0e1a] pt-20 pb-12 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Catalog</div>
          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">Products</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60">
            Six core categories, all customizable with full-color sublimation printing. Mix and match for your event.
          </p>
        </div>
      </section>

      <Products />

      <section className="bg-[#06080f] py-24 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Material</div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Polyester vs. Cotton</h2>
            <p className="mt-4 max-w-2xl text-white/60">
              We specialize in both. Most factories can only do polyester — we do full-cotton sublimation too.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(fabricComparison).map(([key, fabric]) => (
              <div key={key} className={`rounded-2xl border p-8 ${
                key === "cotton" 
                  ? "border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-blue-600/5" 
                  : "border-white/10 bg-white/[0.02]"
              }`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold capitalize">{key}</h3>
                  {key === "cotton" && (
                    <span className="rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-semibold text-cyan-300">
                      Our specialty
                    </span>
                  )}
                </div>
                <dl className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-cyan-300" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-white/40">Color</dt>
                      <dd className="mt-0.5 text-sm text-white/80">{fabric.color}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-cyan-300" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-white/40">Feel</dt>
                      <dd className="mt-0.5 text-sm text-white/80">{fabric.feel}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-cyan-300" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-white/40">Durability</dt>
                      <dd className="mt-0.5 text-sm text-white/80">{fabric.durability}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="mt-0.5 h-4 w-4 text-white/30" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-white/40">Best for</dt>
                      <dd className="mt-0.5 text-sm text-white/80">{fabric.best}</dd>
                    </div>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0e1a] py-24 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">All categories</h2>
          <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10">
            {categories.map((cat) => (
              <div key={cat.name} className="flex flex-wrap items-center justify-between gap-4 p-6 transition-colors hover:bg-white/[0.02]">
                <div>
                  <h3 className="text-lg font-semibold">{cat.name}</h3>
                  <p className="mt-1 text-sm text-white/60">{cat.desc}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs text-white/40">MOQ</div>
                    <div className="text-sm font-semibold text-cyan-300">{cat.moq}</div>
                  </div>
                  <a href="/v4/contact" className="text-sm text-white/60 transition-colors hover:text-cyan-300">
                    Inquire →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DDP />
    </>
  );
}
