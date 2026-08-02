'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

interface ProductCategoryProps {
  title: string;
  description: string;
  features: string[];
  gradient: string;
  reverse?: boolean;
  delay: number;
}

function ProductCategory({
  title,
  description,
  features,
  gradient,
  reverse,
  delay,
}: ProductCategoryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Visual */}
      <div className={`${reverse ? 'lg:order-2' : ''}`}>
        <div
          className={`${gradient} rounded-2xl h-64 sm:h-80 flex items-center justify-center relative overflow-hidden`}
        >
          <div className="text-center z-10">
            <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
              <span className="text-white text-4xl font-bold">VP</span>
            </div>
            <p className="text-white/80 text-sm font-medium">{title}</p>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/10 rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className={`${reverse ? 'lg:order-1' : ''}`}>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a] mb-4">
          {title}
        </h2>
        <p className="text-[#6b6b6b] text-base leading-relaxed mb-6">
          {description}
        </p>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check
                size={18}
                className="text-[#ff4d00] mt-0.5 shrink-0"
              />
              <span className="text-[#0a0a0a] text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const categories: ProductCategoryProps[] = [
  {
    title: 'Custom T-Shirts',
    description:
      'Our core product. Full-color, all-over printed t-shirts in both polyester and 100% cotton. Perfect for events, campaigns, promotions, and everyday wear. Vibrant colors that survive 50+ washes.',
    features: [
      'All-over print — edge to edge, no white gaps',
      'Polyester & 100% cotton options',
      'Unisex, women\'s & youth cuts available',
      'Color-fast inks rated for 50+ washes',
      'Sizes from XS to 5XL',
    ],
    gradient: 'bg-gradient-to-br from-[#ff4d00] to-[#ff7a3d]',
    delay: 0,
  },
  {
    title: 'Sports Jerseys & Activewear',
    description:
      'Performance sublimated sportswear for teams and events. Moisture-wicking, breathable fabrics with your team colors, logos, and numbers permanently printed — never peel or crack.',
    features: [
      'Running, cycling, soccer, basketball & more',
      'Moisture-wicking & quick-dry fabrics',
      'Permanent print — never peels or cracks',
      'Custom numbers, names, and sponsor logos',
      'Team packages with matching accessories',
    ],
    gradient: 'bg-gradient-to-br from-[#00c2ff] to-[#0090cc]',
    reverse: true,
    delay: 0,
  },
  {
    title: 'Hoodies & Sweatshirts',
    description:
      'Premium all-over printed hoodies and crewnecks. Soft fleece interior with stunning full-surface graphics. Ideal for merchandise, brand giveaways, and cooler-weather events.',
    features: [
      'Full-surface sublimation print',
      'Soft brushed fleece interior',
      'Premium 280-350 GSM fabric',
      'Kangaroo pocket & drawstring hood',
      'Perfect for merch & brand giveaways',
    ],
    gradient: 'bg-gradient-to-br from-[#1a1a1a] to-[#444]',
    delay: 0,
  },
  {
    title: 'Vests & Tank Tops',
    description:
      'Lightweight sublimated vests and tank tops — the go-to choice for marathons, fun runs, festivals, and outdoor events. Quick-dry fabric keeps participants comfortable.',
    features: [
      'Ultra-lightweight mesh fabric',
      'Full-color all-over print',
      'Ideal for race events & festivals',
      'Quick-dry & breathable',
      'Budget-friendly for large orders',
    ],
    gradient: 'bg-gradient-to-br from-[#ffcc00] to-[#ff9500]',
    reverse: true,
    delay: 0,
  },
  {
    title: 'Flags, Banners & Backdrops',
    description:
      'Large-format sublimation printing for flags, banners, feather flags, table covers, and event backdrops. Weather-resistant for indoor and outdoor use with vivid double-sided print.',
    features: [
      'Custom sizes — any dimension',
      'Single or double-sided printing',
      'Weather & UV resistant inks',
      'Finishing options: grommets, poles, sleeves',
      'Perfect for trade shows & outdoor events',
    ],
    gradient: 'bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9]',
    delay: 0,
  },
  {
    title: 'Accessories & Merchandise',
    description:
      'Complete your branded collection with custom printed bags, caps, scarves, aprons, face masks, socks, and more. All with the same vibrant sublimation quality.',
    features: [
      'Tote bags, drawstring bags & backpacks',
      'Sublimated caps & beanies',
      'Scarves, bandanas & face coverings',
      'Aprons for staff & volunteers',
      'Mix & match with apparel orders',
    ],
    gradient: 'bg-gradient-to-br from-[#10b981] to-[#059669]',
    reverse: true,
    delay: 0,
  },
];

export default function ProductsPageContent() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[#0a0a0a] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[#ff4d00] text-sm font-semibold uppercase tracking-wider">
              Product Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4">
              Everything Sublimation
            </h1>
            <p className="text-white/60 text-lg">
              Full-color, all-over print on any fabric. From custom t-shirts to
              large-format flags — we make it all in-house.
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {categories.map((cat) => (
              <ProductCategory key={cat.title} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Fabric Options */}
      <section className="py-16 lg:py-24 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#ff4d00] text-sm font-semibold uppercase tracking-wider">
              Fabric Options
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] mt-3 mb-4">
              Polyester or Cotton — Your Choice
            </h2>
            <p className="text-[#6b6b6b] text-lg">
              Most factories only print on polyester. We offer both — including
              full-cotton sublimation, a rare capability in the industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-[#0a0a0a] mb-4">
                100% Polyester
              </h3>
              <ul className="space-y-2">
                {[
                  'Best color vibrancy & detail',
                  'Most cost-effective option',
                  'Ideal for sportswear & events',
                  'Quick-dry & moisture-wicking',
                  'Widest product range',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-[#6b6b6b]"
                  >
                    <Check size={16} className="text-[#00c2ff] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border-2 border-[#ff4d00]/20 relative">
              <div className="absolute -top-3 right-6 bg-[#ff4d00] text-white text-xs font-semibold px-3 py-1 rounded-full">
                Our Specialty
              </div>
              <h3 className="text-xl font-bold text-[#0a0a0a] mb-4">
                100% Cotton
              </h3>
              <ul className="space-y-2">
                {[
                  'Soft, natural hand feel',
                  'Breathable & comfortable',
                  'Premium look & quality',
                  'Full-color all-over print',
                  'Rare capability — few factories can do it',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-[#6b6b6b]"
                  >
                    <Check size={16} className="text-[#ff4d00] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/60 mb-8">
            Send us your design and quantity. We will get back to you within 24
            hours with pricing and DDP shipping cost.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#e04400] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
          >
            Get a Free Quote
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
