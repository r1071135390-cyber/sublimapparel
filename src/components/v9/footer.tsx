import Link from "next/link";

export function V9Footer() {
  return (
    <footer className="bg-[#faf8f3] border-t border-stone-200 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="text-stone-900 text-sm tracking-[0.3em] font-light mb-4">VIDIV</div>
            <p className="text-stone-500 text-sm font-light leading-relaxed max-w-sm">
              A small dye-sublimation factory in Yiwu, China. We print, sew, and ship to your door.
            </p>
          </div>
          <div>
            <div className="text-stone-400 text-xs tracking-widest mb-4">PAGES</div>
            <ul className="space-y-2 text-sm font-light text-stone-700">
              <li><Link href="/v9" className="hover:text-stone-900">Home</Link></li>
              <li><Link href="/v9/products" className="hover:text-stone-900">Products</Link></li>
              <li><Link href="/v9/about" className="hover:text-stone-900">About</Link></li>
              <li><Link href="/v9/contact" className="hover:text-stone-900">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-stone-400 text-xs tracking-widest mb-4">CONTACT</div>
            <ul className="space-y-2 text-sm font-light text-stone-700">
              <li>sales@vidiv.com</li>
              <li>+86 579 8888 8888</li>
              <li>Yiwu, Zhejiang, China</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-400 text-xs font-light">
          <div>© 2024 VividPrint. All rights reserved.</div>
          <div>Made with care in Yiwu.</div>
        </div>
      </div>
    </footer>
  );
}
