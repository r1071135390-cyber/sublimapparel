import Image from "next/image";
import Link from "next/link";

export function V9Hero() {
  return (
    <section className="bg-[#faf8f3] py-32 md:py-48">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-7">
            <div className="text-stone-400 text-xs tracking-[0.3em] font-light mb-8">
              Yiwu, China — Dye-Sublimation
            </div>
            <h1 className="text-stone-900 text-5xl md:text-7xl font-light leading-[1.1] mb-8">
              Quiet factory.<br />
              <span className="text-stone-500 italic">Loud colour.</span>
            </h1>
            <p className="text-stone-600 text-base font-light leading-relaxed max-w-md mb-12">
              For ten years we have printed and sewn custom apparel for events, teams, and brands across fifty countries. Cotton. Polyester. DDP shipping.
            </p>
            <div className="flex items-center gap-8">
              <Link
                href="/v9/contact"
                className="text-stone-900 text-sm font-light border-b border-stone-900 pb-1 hover:opacity-60 transition"
              >
                Start a conversation →
              </Link>
              <Link
                href="/v9/products"
                className="text-stone-500 text-sm font-light hover:text-stone-900 transition"
              >
                See products
              </Link>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/v9-zen.jpg"
                alt="Custom t-shirt on hanger"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="text-stone-400 text-xs font-light tracking-widest mt-3">
              Fig. 01 — Custom tee, full print
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
