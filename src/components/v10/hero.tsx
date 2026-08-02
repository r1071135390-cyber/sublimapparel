import Image from "next/image";
import Link from "next/link";

export function V10Hero() {
  return (
    <section className="relative bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 border border-cyan-500/50 bg-cyan-500/10 px-3 py-1 mb-8 font-mono text-xs">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-cyan-300 tracking-wider">[ LIVE ] DDP_SHIPPING_ACTIVE</span>
            </div>
            <h1 className="text-white text-5xl md:text-7xl font-black leading-[0.95] mb-6 tracking-tight">
              PRINT.<br />
              <span className="text-cyan-400 [text-shadow:0_0_30px_rgba(0,255,255,0.5)]">SEW.</span><br />
              <span className="text-fuchsia-400 [text-shadow:0_0_30px_rgba(255,0,255,0.5)]">SHIP.</span>
            </h1>
            <p className="text-cyan-100/70 text-base font-mono leading-relaxed max-w-lg mb-10">
              &gt; Custom sublimated apparel from Yiwu, China.<br />
              &gt; Cotton. Polyester. Door-to-door worldwide.<br />
              &gt; No customs. No hassle. Just boxes at your door.
            </p>
            <div className="flex items-center gap-4 font-mono text-xs">
              <Link
                href="/v10/contact"
                className="px-6 py-3 bg-cyan-400 text-black font-bold tracking-wider hover:shadow-[0_0_30px_#00ffff] transition"
              >
                &gt; START_ORDER
              </Link>
              <Link
                href="/v10/products"
                className="px-6 py-3 border border-fuchsia-500 text-fuchsia-400 font-bold tracking-wider hover:bg-fuchsia-500/10 transition"
              >
                /VIEW_CATALOG
              </Link>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[3/4] border border-cyan-500/50 overflow-hidden">
              <Image
                src="/v10-neon.jpg"
                alt="Custom printed apparel"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400"></div>
            </div>
            <div className="mt-3 font-mono text-xs text-cyan-500/60 flex items-center justify-between">
              <span>&gt; IMG_001.NEF</span>
              <span className="text-fuchsia-400 animate-pulse">● REC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
