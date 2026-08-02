import Link from "next/link";

export function V6Footer() {
  return (
    <footer className="border-t-4 border-[#00ff88] bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center bg-[#00ff88] text-sm font-black text-black">
                VP
              </div>
              <span className="text-lg font-black uppercase tracking-tight">VividPrint</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Performance sublimation apparel. Built for athletes, teams, and events that move.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#00ff88]">Gear</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/v6/products" className="text-sm text-white/80 hover:text-white">Race Jerseys</Link></li>
              <li><Link href="/v6/products" className="text-sm text-white/80 hover:text-white">Training Tees</Link></li>
              <li><Link href="/v6/products" className="text-sm text-white/80 hover:text-white">Cycling Kits</Link></li>
              <li><Link href="/v6/products" className="text-sm text-white/80 hover:text-white">Compression</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#00ff88]">Company</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/v6/about" className="text-sm text-white/80 hover:text-white">About</Link></li>
              <li><Link href="/v6/about" className="text-sm text-white/80 hover:text-white">Capabilities</Link></li>
              <li><Link href="/v6/contact" className="text-sm text-white/80 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#00ff88]">Reach Us</h4>
            <p className="mt-4 text-sm text-white/80">
              sales@vividprint.com
              <br />
              Yiwu, China
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs uppercase tracking-widest text-white/50">
          © 2025 VividPrint. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
