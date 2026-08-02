import Link from 'next/link';
import { ArrowRight, Truck, Shield, Palette } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Abstract colorful background representing sublimation printing */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#ff4d00] via-[#ff7a3d] to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#00c2ff] via-[#0090cc] to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-[#ffcc00] to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50" />
        </div>
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Truck size={16} className="text-[#00c2ff]" />
            <span className="text-white/80 text-sm font-medium">
              DDP Shipping — Delivered to Your Door, No Customs Hassle
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 animate-fade-in-up">
            Full-Color.
            <br />
            Full-Cotton.
            <br />
            <span className="text-gradient">Full Service.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl mb-10 animate-fade-in-up delay-200">
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
          <div className="flex flex-wrap items-center gap-6 mt-12 animate-fade-in-up delay-400">
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
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
