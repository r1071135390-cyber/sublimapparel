import Link from "next/link";

export function V10Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/v10" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-400 flex items-center justify-center">
            <span className="text-black font-black text-sm">VP</span>
          </div>
          <span className="text-cyan-300 font-mono text-sm tracking-wider">&gt; VIVIDPRINT</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs">
          <Link href="/v10" className="text-cyan-300 hover:text-cyan-400 transition tracking-wider">[ HOME ]</Link>
          <Link href="/v10/products" className="text-cyan-300 hover:text-cyan-400 transition tracking-wider">[ PRODUCTS ]</Link>
          <Link href="/v10/about" className="text-cyan-300 hover:text-cyan-400 transition tracking-wider">[ ABOUT ]</Link>
          <Link href="/v10/contact" className="text-cyan-300 hover:text-cyan-400 transition tracking-wider">[ CONTACT ]</Link>
        </nav>
        <Link
          href="/v10/contact"
          className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-mono text-xs font-bold tracking-wider hover:shadow-[0_0_20px_#00ffff] transition"
        >
          &gt; QUOTE_
        </Link>
      </div>
    </header>
  );
}
