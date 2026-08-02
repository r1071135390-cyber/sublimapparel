import { Products } from "@/components/v8/products";
import { Contact } from "@/components/v8/contact";

export default function V8ProductsPage() {
  return (
    <>
      <section className="border-b-4 border-black bg-white py-12 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4">
          <p className="text-xs font-black uppercase tracking-widest text-black">
            [003] PRODUCTS
          </p>
          <h1 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-tight text-black md:text-7xl">
            THE LINEUP
          </h1>
          <p className="mt-6 max-w-2xl text-base font-bold text-black">
            SIX PRODUCT FAMILIES. TWO FABRIC SYSTEMS. ONE PRINTING METHOD. EVERY GARMENT IS MADE TO YOUR SPECS IN OUR YIWU FACTORY, THEN SHIPPED TO YOUR DOOR WITH DUTIES PREPAID.
          </p>
        </div>
      </section>
      <Products />
      <Contact />
    </>
  );
}
