import Image from "next/image";
import Link from "next/link";

export function V6Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 -skew-y-3 bg-gradient-to-br from-[#00ff88]/20 via-transparent to-transparent"></div>
      <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-[#00ff88]/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 bg-[#00ff88] px-3 py-1.5 text-xs font-black uppercase tracking-widest text-black">
              <span className="h-2 w-2 rounded-full bg-black animate-pulse"></span>
              Performance Apparel
            </div>

            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
              Built to
              <br />
              <span className="text-[#00ff88]">Move.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Full-color sublimation jerseys, tees, and race kits for athletes who refuse to blend in.
              DDP shipping worldwide.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/v6/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#00ff88] px-7 py-3.5 text-sm font-black uppercase tracking-wider text-black transition-all hover:translate-x-1 hover:translate-y-1"
              >
                Start Your Order
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/v6/products"
                className="inline-flex items-center justify-center gap-2 border-2 border-white px-7 py-3.5 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
              >
                View Products
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 border-t-2 border-white/10 pt-8">
              <div>
                <div className="text-3xl font-black text-[#00ff88]">50</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Pcs MOQ
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00ff88]">7d</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Sample Time
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00ff88]">50+</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Countries
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="absolute -inset-4 -rotate-2 border-2 border-[#00ff88]"></div>
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
              <Image
                src="/v6-athlete.jpg"
                alt="Marathon athlete in custom sublimation jersey"
                width={1200}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 p-3 backdrop-blur-sm">
                <div className="text-xs font-black uppercase tracking-widest text-[#00ff88]">
                  Race Day Ready
                </div>
                <div className="mt-1 text-sm font-bold">Built for performance, shipped worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-y-2 border-[#00ff88] bg-[#00ff88] py-3 text-black">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
            <span>● DDP Shipping</span>
            <span>●</span>
            <span>No Customs</span>
            <span>●</span>
            <span>Door Delivery</span>
            <span>●</span>
            <span>Full Color Print</span>
            <span>●</span>
            <span>50pcs MOQ</span>
          </div>
        </div>
      </div>
    </section>
  );
}
