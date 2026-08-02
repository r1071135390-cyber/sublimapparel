import Link from "next/link";

export function V10Footer() {
  return (
    <footer className="bg-black border-t border-cyan-500/30 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 font-mono text-xs">
          <div className="col-span-2">
            <div className="text-cyan-300 mb-4 tracking-wider">&gt; VIVIDPRINT.exe</div>
            <p className="text-cyan-500/60 leading-relaxed max-w-sm">
              {"// Yiwu-based dye-sublimation factory."}
              <br />
              {"// Printing and shipping since 2014."}
              <br />
              {"// DDP worldwide. Cotton & polyester."}
            </p>
          </div>
          <div>
            <div className="text-fuchsia-400 mb-4 tracking-wider">/PAGES</div>
            <ul className="space-y-2 text-cyan-300/70">
              <li><Link href="/v10" className="hover:text-cyan-300">home</Link></li>
              <li><Link href="/v10/products" className="hover:text-cyan-300">products</Link></li>
              <li><Link href="/v10/about" className="hover:text-cyan-300">about</Link></li>
              <li><Link href="/v10/contact" className="hover:text-cyan-300">contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-fuchsia-400 mb-4 tracking-wider">/CONTACT</div>
            <ul className="space-y-2 text-cyan-300/70">
              <li>sales@vividprint.cn</li>
              <li>+86 579 8888 8888</li>
              <li>Yiwu, Zhejiang, CN</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-cyan-500/20 flex flex-col md:flex-row justify-between items-center gap-4 text-cyan-500/40 font-mono text-xs">
          <div>© 2024 VIVIDPRINT — all rights reserved</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            <span>SYSTEM_ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
