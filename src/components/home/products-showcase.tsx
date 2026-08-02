'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  gradient: string;
  tags: string[];
  delay: number;
}

function ProductCard({
  title,
  description,
  gradient,
  tags,
  delay,
}: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`product-card group rounded-2xl overflow-hidden bg-white border border-gray-100 cursor-pointer transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Visual area */}
      <div
        className={`h-48 sm:h-56 ${gradient} relative overflow-hidden`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-3xl font-bold">VP</span>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-[#0a0a0a] mb-2 group-hover:text-[#ff4d00] transition-colors">
          {title}
        </h3>
        <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[#f5f5f5] text-[#6b6b6b] px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const products: ProductCardProps[] = [
  {
    title: 'Custom T-Shirts',
    description:
      'Full-color all-over print tees in polyester or cotton. Perfect for events, campaigns, and promotions.',
    gradient: 'bg-gradient-to-br from-[#ff4d00] to-[#ff7a3d]',
    tags: ['Polyester', 'Cotton', 'All-over'],
    delay: 0,
  },
  {
    title: 'Sports Jerseys',
    description:
      'Sublimated jerseys for running, cycling, soccer, and more. Moisture-wicking fabrics with vivid team designs.',
    gradient: 'bg-gradient-to-br from-[#00c2ff] to-[#0090cc]',
    tags: ['Running', 'Cycling', 'Team'],
    delay: 100,
  },
  {
    title: 'Hoodies & Sweatshirts',
    description:
      'Premium all-over printed hoodies. Soft fleece interior with stunning full-surface graphics.',
    gradient: 'bg-gradient-to-br from-[#1a1a1a] to-[#333]',
    tags: ['Fleece', 'Premium', 'Unisex'],
    delay: 200,
  },
  {
    title: 'Vests & Tank Tops',
    description:
      'Lightweight sublimated vests ideal for marathons, festivals, and outdoor events. Quick-dry fabric.',
    gradient: 'bg-gradient-to-br from-[#ffcc00] to-[#ff9500]',
    tags: ['Quick-dry', 'Lightweight', 'Events'],
    delay: 300,
  },
  {
    title: 'Flags & Banners',
    description:
      'Large-format printed flags, banners, and backdrops. Weather-resistant for indoor and outdoor use.',
    gradient: 'bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9]',
    tags: ['Large format', 'Outdoor', 'Custom size'],
    delay: 400,
  },
  {
    title: 'Accessories',
    description:
      'Custom printed bags, caps, scarves, aprons, and more. Complete your branded merchandise collection.',
    gradient: 'bg-gradient-to-br from-[#10b981] to-[#059669]',
    tags: ['Bags', 'Caps', 'Scarves'],
    delay: 500,
  },
];

export default function ProductsShowcase() {
  return (
    <section className="py-20 lg:py-28 bg-white" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#ff4d00] text-sm font-semibold uppercase tracking-wider">
            Our Products
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] mt-3 mb-4">
            Everything Sublimation
          </h2>
          <p className="text-[#6b6b6b] text-lg">
            From apparel to accessories — if it can be printed, we can make it.
            Full-color, full-coverage, on any fabric.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#ff4d00] font-semibold hover:gap-3 transition-all duration-200"
          >
            View Full Product Catalog
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
