import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Truck, Shield, Palette } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#ff4d00]/30 to-transparent rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#00c2ff]/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-6rem)]">
          {/* Left - Text Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <Truck size={16} className="text-[#00c2ff]" />
              <span className="text-white/80 text-sm font-medium">
                DDP Shipping — Delivered to Your Door, No Customs Hassle
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6 animate-fade-in-up">
              Full-Color.
              <br />
              Full-Cotton.
              <br />
              <span className="text-gradient">Full Service.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 animate-fade-in-up delay-200">
              Professional dye-sublimation apparel from Yiwu, China. We handle
              everything — design, printing, sewing, and DDP delivery. You just
              receive boxes at the door.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#ff4d00] hover:bg-[#e04400] text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:scale-105 cta-pulse"
              >
                Request a Quote
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200"
              >
                View Products
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-10 animate-fade-in-up delay-400">
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Shield size={16} className="text-[#00c2ff]" />
                <span>DDP Worldwide</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Palette size={16} className="text-[#ff4d00]" />
                <span>Full-Cotton Sublimation</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Truck size={16} className="text-[#00c2ff]" />
                <span>MOQ 50 pcs</span>
              </div>
            </div>
          </div>

          {/* Right - Factory Image */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative aspect-[5/4] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/factory-hero.jpg"
                alt="VividPrint Yiwu Factory - Sublimation Printing Production Line"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/20 via-transparent to-transparent" />
            </div>

            {/* Floating stat card - bottom left */}
            <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/20 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#ff4d00]/10 rounded-lg flex items-center justify-center">
                  <Palette size={20} className="text-[#ff4d00]" />
                </div>
                <div>
                  <div className="text-[#0a0a0a] font-bold text-sm">
                    500K+ Garments
                  </div>
                  <div className="text-[#6b6b6b] text-xs">Per Year</div>
                </div>
              </div>
            </div>

            {/* Floating stat card - top right */}
            <div className="absolute -top-4 -right-4 bg-[#ff4d00] rounded-xl p-4 shadow-2xl hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Truck size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">DDP</div>
                  <div className="text-white/80 text-xs">50+ Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
