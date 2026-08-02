import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Layers } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0e1a] text-white">
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute left-1/2 bottom-0 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium text-cyan-300">
              <Truck className="h-3.5 w-3.5" />
              DDP Shipping · Delivered to Your Door
            </div>
            <h1 className="mt-8 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Color that
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                never fades.
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              High-definition sublimation printing on cotton and polyester. From 50 pcs to 50,000 — manufactured in Yiwu, shipped to your door worldwide.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/v4/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-cyan-500/50"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/v4/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                <Layers className="h-4 w-4" />
                Explore Products
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8">
              <div>
                <div className="text-3xl font-bold">10+</div>
                <div className="text-xs text-white/50">Years Experience</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-xs text-white/50">Countries Served</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="text-3xl font-bold">50</div>
                <div className="text-xs text-white/50">MOQ (pcs)</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm">
              <Image
                src="/v4-tech1.jpg"
                alt="Sublimation printed apparel"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/60 via-transparent to-transparent" />
            </div>
            {/* Floating glass card */}
            <div className="absolute -bottom-6 -left-6 max-w-[240px] rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-300">All-over Print</div>
              <div className="mt-2 text-sm text-white/80">
                Edge-to-edge color on 100% cotton, not just polyester.
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-center text-xs font-bold shadow-2xl shadow-cyan-500/40">
              <div>
                <div className="text-[10px] uppercase tracking-wider">Free</div>
                <div>Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
