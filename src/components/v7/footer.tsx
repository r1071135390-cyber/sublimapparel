import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-300 bg-[#f5f1e8] py-20 text-stone-700">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-serif text-3xl font-semibold text-stone-900">
              Vivid<span className="italic">Print</span>
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed">
              A printing atelier in Yiwu, China. Full-colour sublimation on
              cotton or polyester, delivered to your door, duties paid.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-stone-500">
              Studio 03, 28 Beiyuan Road, Yiwu, Zhejiang
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-stone-500">
              Catalogue
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/v7/products" className="hover:text-stone-900">All Products</Link></li>
              <li><Link href="/v7/products" className="hover:text-stone-900">Cotton</Link></li>
              <li><Link href="/v7/products" className="hover:text-stone-900">Polyester</Link></li>
              <li><Link href="/v7/products" className="hover:text-stone-900">Flags & Banners</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-stone-500">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>hello@vividprint.cn</li>
              <li>+86 0579-8888 9999</li>
              <li><Link href="/v7/contact" className="hover:text-stone-900">Start a Project →</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-stone-300 pt-8 md:flex-row md:items-center">
          <p className="font-mono text-xs uppercase tracking-widest text-stone-500">
            © 2025 VividPrint. All rights reserved.
          </p>
          <p className="font-serif text-sm italic text-stone-500">
            Printed in Yiwu, shipped worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
