import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="border-b-2 border-black bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        {/* Top label row */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-3 w-3 rounded-full bg-[#ff4d00] animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-black">
              Yiwu factory · LA warehouse
            </span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-black/60">
            DDP to 100+ countries · US domestic in 2-5 days
          </span>
        </div>

        {/* Main grid */}
        <div className="grid items-center gap-6 md:grid-cols-12 md:gap-8">
          {/* Left: oversized headline */}
          <div className="md:col-span-6 flex flex-col justify-center md:pr-6">
            <h1 className="text-[clamp(2rem,5.5vw,5.5rem)] font-black leading-[0.9] tracking-tighter text-black">
              <span className="block">Custom print.</span>
              <span className="block">Any material.</span>
              <span className="block">Any product.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/70">
              For your team, your event, your brand, and your client gifts — we custom print{" "}
              <span className="font-bold text-black">team uniforms, event merch, banners, home textiles, mugs, mousepads, and corporate gifts</span>.
              From our <span className="font-bold text-black">Yiwu factory</span> to your door, with{" "}
              <span className="font-bold text-[#ff4d00] underline decoration-2 underline-offset-4">
                DDP shipping
              </span>{" "}
              to 200+ countries and a{" "}
              <span className="font-bold text-[#00c2ff]">US warehouse in Los Angeles</span>.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-black px-8 py-5 text-base font-black uppercase tracking-wider text-white transition-all hover:bg-[#ff4d00]"
              >
                Start a project
                <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 border-2 border-black bg-white px-8 py-5 text-base font-black uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white"
              >
                See products
              </Link>
            </div>

            {/* Mini stats */}
            <div className="mt-12 grid max-w-xl grid-cols-2 gap-6 border-t-2 border-black pt-6 md:grid-cols-4">
              <div>
                <div className="text-3xl font-black text-black">10+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-black/60">
                  Years
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#ff4d00]">100+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-black/60">
                  Countries (DDP)
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff]">LA ✈</div>
                <div className="text-xs font-bold uppercase tracking-wider text-black/60">
                  US domestic
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
          <div className="relative md:col-span-6">
            <div className="relative aspect-[5/4] w-full overflow-hidden bg-[#f5f1e8]">
              <Image
                src="/hero-products.jpg"
                alt="Full range of custom sublimation printed products - apparel, mugs, mousepads, pillows, banners, caps, tote bags and more"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
