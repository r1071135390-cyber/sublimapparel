import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Truck } from 'lucide-react';

export default function V2Hero() {
  return (
    <section className="bg-[#faf9f6] pt-24 lg:pt-32 pb-20 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-stone-500">
            Sublimation Apparel · Since 2014
          </span>
        </div>

        {/* Main grid - asymmetric */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left - Headline */}
          <div className="lg:col-span-7">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-[#0a0a0a] leading-[0.95] tracking-tight mb-8">
              Custom apparel,
              <br />
              <span className="italic text-stone-500">delivered</span>
              <br />
              to your door.
            </h1>
            <p className="text-lg text-stone-600 max-w-md leading-relaxed mb-10">
              We are a Yiwu-based sublimation factory handling everything from
              design to worldwide DDP delivery. Full cotton. Full color. Full
              service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/v2/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white px-7 py-4 rounded-md text-sm font-medium hover:bg-[#262626] transition-colors"
              >
                Request a Quote
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/v2/products"
                className="inline-flex items-center justify-center gap-2 border border-stone-300 text-[#0a0a0a] px-7 py-4 rounded-md text-sm font-medium hover:border-[#0a0a0a] transition-colors"
              >
                Browse Collection
              </Link>
            </div>
          </div>

          {/* Right - Image with stats */}
          <div className="lg:col-span-5 lg:pt-8">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/v2-lifestyle.jpg"
                alt="Custom sublimation apparel in real-world context"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            {/* Stat below image */}
            <div className="mt-6 flex items-end justify-between">
              <div>
                <div className="text-5xl font-light text-[#0a0a0a]">50+</div>
                <div className="text-xs uppercase tracking-widest text-stone-500 mt-2">
                  Countries Shipped
                </div>
              </div>
              <div className="flex items-center gap-2 text-stone-500 text-sm">
                <Truck size={14} />
                <span>DDP worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
