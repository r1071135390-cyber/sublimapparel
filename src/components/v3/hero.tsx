import Image from "next/image";
import Link from "next/link";

export function V3Hero() {
  return (
    <section className="border-b-2 border-black bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        {/* Top label row */}
        <div className="mb-8 flex items-center gap-3">
          <span className="inline-flex h-3 w-3 rounded-full bg-[#ff4d00] animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-black">
            Now shipping worldwide · DDP to your door
          </span>
        </div>

        {/* Main grid */}
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          {/* Left: oversized headline */}
          <div className="md:col-span-7">
            <h1 className="text-[clamp(2.5rem,8vw,7.5rem)] font-black leading-[0.9] tracking-tighter text-black">
              <span className="block">Print</span>
              <span className="block">
                <span className="relative inline-block">
                  <span className="relative z-10">everything</span>
                  <span className="absolute inset-x-0 bottom-2 -z-0 h-4 bg-[#ff4d00] md:h-8" />
                </span>
              </span>
              <span className="block">in color.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/70">
              We&apos;re a sublimation factory in Yiwu, China specializing in full-color
              all-over print apparel. Polyester or{" "}
              <span className="font-bold text-[#ff4d00] underline decoration-2 underline-offset-4">
                100% cotton
              </span>
              . From your design to your customer&apos;s door, we handle everything.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/v3/contact"
                className="group inline-flex items-center gap-3 bg-black px-8 py-5 text-base font-black uppercase tracking-wider text-white transition-all hover:bg-[#ff4d00]"
              >
                Start a project
                <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/v3/products"
                className="group inline-flex items-center gap-2 border-2 border-black bg-white px-8 py-5 text-base font-black uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white"
              >
                See products
              </Link>
            </div>

            {/* Mini stats */}
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t-2 border-black pt-6">
              <div>
                <div className="text-3xl font-black text-black">50+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-black/60">
                  Countries
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#ff4d00]">10+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-black/60">
                  Years
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-black">50</div>
                <div className="text-xs font-bold uppercase tracking-wider text-black/60">
                  MOQ pcs
                </div>
              </div>
            </div>
          </div>

          {/* Right: image collage */}
          <div className="relative md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden border-2 border-black bg-[#ff4d00]">
              <Image
                src="/v3-flatlay.jpg"
                alt="Colorful sublimation printed t-shirts flat lay"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            {/* Color block decorations */}
            <div className="absolute -top-4 -right-4 h-20 w-20 bg-[#00c2ff] border-2 border-black" />
            <div className="absolute -bottom-4 -left-4 h-16 w-16 bg-[#ff4d00] border-2 border-black" />
            {/* Floating tag */}
            <div className="absolute -left-4 top-8 rotate-[-8deg] border-2 border-black bg-white px-3 py-2 text-xs font-black uppercase tracking-wider">
              DDP shipping ✓
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
