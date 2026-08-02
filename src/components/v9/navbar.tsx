import Link from "next/link";

export function V9Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#faf8f3]/90 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/v9" className="flex items-center gap-3">
          <span className="text-stone-900 text-sm tracking-[0.3em] font-light">VIDIV</span>
          <span className="w-1 h-1 rounded-full bg-stone-400"></span>
          <span className="text-stone-500 text-xs tracking-widest">EST. 2014</span>
        </Link>
        <nav className="hidden md:flex items-center gap-12">
          <Link href="/v9" className="text-stone-700 hover:text-stone-900 text-sm font-light tracking-wide transition">Home</Link>
          <Link href="/v9/products" className="text-stone-700 hover:text-stone-900 text-sm font-light tracking-wide transition">Products</Link>
          <Link href="/v9/about" className="text-stone-700 hover:text-stone-900 text-sm font-light tracking-wide transition">About</Link>
          <Link href="/v9/contact" className="text-stone-700 hover:text-stone-900 text-sm font-light tracking-wide transition">Contact</Link>
        </nav>
        <Link
          href="/v9/contact"
          className="text-stone-900 text-sm font-light border-b border-stone-900 pb-0.5 hover:opacity-60 transition"
        >
          Inquire →
        </Link>
      </div>
    </header>
  );
}
