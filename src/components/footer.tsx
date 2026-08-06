import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-black bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 grid gap-12 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center bg-[#ff4d00]">
                <span className="text-lg font-black text-white">V</span>
              </div>
              <span className="text-xl font-black">vivid/print</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Full-color all-over print apparel from Yiwu, China. From design to your door.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Products
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/products" className="hover:text-white">Custom T-Shirts</Link></li>
              <li><Link href="/products" className="hover:text-white">Sports Jerseys</Link></li>
              <li><Link href="/products" className="hover:text-white">Hoodies</Link></li>
              <li><Link href="/products" className="hover:text-white">All categories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/about" className="hover:text-white">About us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/contact" className="hover:text-white">Get a quote</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>WhatsApp: +86 138 XXXX XXXX</li>
              <li>Email: hello@vividprint.cn</li>
              <li>No. 35 Lingyun Road, Yiwu</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-xs text-white/40">
          <p>
            Yiwu HomeDorm Commordity Manufacturing Co., Ltd. · Established 2018 · No. 35
            Lingyun Road, Yiwu, Zhejiang, China
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} VividPrint. All rights reserved.</p>
          <p>From Yiwu to your door, worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
