import { V6Products } from "@/components/v6/products";
import { V6Contact } from "@/components/v6/contact";

export default function V6ProductsPage() {
  return (
    <>
      <section className="bg-black py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs font-black uppercase tracking-widest text-[#00ff88]">
            Product Line
          </div>
          <h1 className="mt-2 text-5xl font-black uppercase leading-none sm:text-6xl">
            All Gear
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Performance apparel for every sport. Every piece fully sublimatable, every fabric
            tested, every stitch inspected.
          </p>
        </div>
      </section>
      <V6Products />
      <V6Contact />
    </>
  );
}
