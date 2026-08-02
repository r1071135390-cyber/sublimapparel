import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="border-b-4 border-black bg-white">
      {/* Top marquee bar */}
      <div className="border-b-2 border-black bg-[#ffeb00] py-2">
        <div className="overflow-hidden">
          <div className="flex animate-[marquee_20s_linear_infinite] gap-8 whitespace-nowrap text-sm font-black uppercase tracking-widest text-black">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i}>★ DDP SHIPPING TO 50+ COUNTRIES ★ MOQ 50 PCS ★ FULL COTTON OR POLYESTER ★ FACTORY DIRECT ★</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-12 md:py-20">
        <div className="grid items-start gap-6 md:grid-cols-12">
          {/* Big title */}
          <div className="md:col-span-8">
            <p className="border-2 border-black bg-black px-3 py-1.5 text-xs font-black uppercase tracking-widest text-[#ffeb00] inline-block">
              [001] HERO
            </p>
            <h1 className="mt-6 text-6xl font-black uppercase leading-[0.9] tracking-tight text-black md:text-8xl lg:text-[9rem]">
              PRINT
              <br />
              EVERYTHING
              <br />
              <span className="bg-[#ffeb00] px-2">IN COLOR</span>
              <span className="text-black">.</span>
            </h1>
          </div>

          {/* Right column: image + spec */}
          <div className="space-y-4 md:col-span-4">
            <div className="relative aspect-[4/5] w-full border-2 border-black">
              <Image
                src="/v8-brutal.jpg"
                alt="Hero shot"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="border-2 border-black bg-black p-4 text-[#ffeb00]">
              <p className="text-xs font-black uppercase tracking-widest">
                SPEC →
              </p>
              <p className="mt-2 text-sm font-bold leading-snug">
                CMYK SUBLIMATION
                <br />
                COTTON OR POLYESTER
                <br />
                DDP — DOOR-TO-DOOR
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t-2 border-black pt-8 md:grid-cols-2">
          <p className="max-w-md text-base leading-relaxed text-black">
            WE ARE A <span className="bg-[#ffeb00] px-1">SUBLIMATION FACTORY</span> IN YIWU, CHINA. WE PRINT ON COTTON AND POLYESTER. WE SEW INTO GARMENTS. WE SHIP TO YOUR DOOR — DUTIES INCLUDED. NO CUSTOMS, NO FRICTION, NO B.S.
          </p>
          <div className="flex flex-wrap items-center justify-start gap-3 md:justify-end">
            <Link
              href="/v8/contact"
              className="bg-[#ffeb00] px-6 py-3.5 text-sm font-black uppercase tracking-wider text-black border-2 border-black shadow-[4px_4px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              GET QUOTE →
            </Link>
            <Link
              href="/v8/products"
              className="border-2 border-black bg-white px-6 py-3.5 text-sm font-black uppercase tracking-wider text-black transition-colors hover:bg-black hover:text-[#ffeb00]"
            >
              VIEW PRODUCTS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
