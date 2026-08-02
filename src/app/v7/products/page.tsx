import { Products } from "@/components/v7/products";
import { Contact } from "@/components/v7/contact";

export default function V7ProductsPage() {
  return (
    <>
      <section className="bg-[#f5f1e8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
            Catalogue
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl font-light leading-tight tracking-tight text-stone-900 md:text-6xl">
            The full <span className="italic">range,</span> presented plainly.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-stone-600">
            Six product families. Two fabric systems. One printing method. Every
            garment is made to your specifications in our Yiwu factory, then
            shipped to your door with duties prepaid.
          </p>
        </div>
      </section>
      <Products />
      <Contact />
    </>
  );
}
