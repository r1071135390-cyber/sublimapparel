import Image from "next/image";
import Link from "next/link";
import { RequestQuoteLink } from "@/components/request-quote-link";
import { ArrowRight } from "lucide-react";

export function BeyondApparel() {
  return (
    <section className="bg-[#faf9f6] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section label */}
        <div className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#0a0a0a]/60">
          [ 005 / Beyond Apparel ]
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {/* Left: text + stats + CTAs */}
          <div>
            <h2 className="mb-6 text-4xl font-black leading-[0.95] tracking-tight text-[#0a0a0a] md:text-5xl lg:text-6xl">
              Custom print.
              <br />
              <span className="text-[#cc3d00]">Any material. Any product.</span>
            </h2>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-[#0a0a0a]/75 md:text-lg">
              Sublimation wholesale, made simple. Shipping to 100+ countries
              and a US warehouse in 2-5 days. We are a one-stop factory, not a
              middleman.
            </p>

            {/* Stats row */}
            <div className="mb-10 grid grid-cols-2 gap-x-6 gap-y-4 border-y-2 border-[#0a0a0a] py-6 md:grid-cols-4 md:gap-x-8">
              <div>
                <div className="text-3xl font-black text-[#0a0a0a] md:text-4xl">
                  50
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]/60">
                  MOQ (pcs)
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#0a0a0a] md:text-4xl">
                  15-25
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]/60">
                  Days lead time
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#0a0a0a] md:text-4xl">
                  100+
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]/60">
                  Fabric options
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#cc3d00] md:text-4xl">
                  100%
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]/60">
                  All-over digital print 100% cotton
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <RequestQuoteLink label="Home / Beyond apparel" className="group inline-flex items-center gap-2 bg-[#ff4d00] px-7 py-4 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-[#e64500]">Get a quote</RequestQuoteLink>
              <Link
                href="/products/"
                className="group inline-flex items-center gap-2 border-2 border-[#0a0a0a] bg-white px-7 py-4 text-sm font-black uppercase tracking-wider text-[#0a0a0a] transition-all hover:bg-[#0a0a0a] hover:text-white"
              >
                Browse products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right: product image grid */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-white md:aspect-auto md:h-full">
            <Image
              src="/product-lineup.webp"
              alt="A dense grid of sublimated apparel products: t-shirts, hoodies, jerseys, flags, banners, mousepads, mugs and more"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 inline-block bg-[#ff4d00] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
              24+ products
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
