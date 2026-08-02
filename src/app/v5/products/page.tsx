import { V5Products } from "@/components/v5/products";
import { V5Contact } from "@/components/v5/contact";

export default function V5ProductsPage() {
  return (
    <>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
            All Products
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">
            Browse our full range of sublimation-ready apparel and accessories. All products support
            full-color all-over printing.
          </p>
        </div>
      </section>
      <V5Products />
      <V5Contact />
    </>
  );
}
