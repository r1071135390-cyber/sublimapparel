'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ProductItem {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

const products: ProductItem[] = [
  {
    number: '01',
    title: 'Custom T-Shirts',
    description:
      'Edge-to-edge all-over print tees in cotton or polyester. The foundation of event apparel.',
    tags: ['Polyester', 'Cotton'],
  },
  {
    number: '02',
    title: 'Sports Jerseys',
    description:
      'Performance sublimated jerseys with permanent team colors, logos, and player numbers.',
    tags: ['Running', 'Cycling', 'Team'],
  },
  {
    number: '03',
    title: 'Hoodies',
    description:
      'Premium fleece hoodies with full-surface graphics. Built for merchandise and brand drops.',
    tags: ['Premium', 'Fleece'],
  },
  {
    number: '04',
    title: 'Vests & Tanks',
    description:
      'Lightweight quick-dry vests for marathons, races, and outdoor events. Budget-friendly at scale.',
    tags: ['Quick-dry', 'Race'],
  },
  {
    number: '05',
    title: 'Flags & Banners',
    description:
      'Large-format fabric prints for trade shows, events, and storefronts. Indoor and outdoor.',
    tags: ['Large format', 'Outdoor'],
  },
  {
    number: '06',
    title: 'Accessories',
    description:
      'Bags, caps, scarves, aprons, and more. Complete your brand collection.',
    tags: ['Bags', 'Caps', 'Scarves'],
  },
];

function ProductRow({ product, index }: { product: ProductItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group border-b border-stone-200 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <Link
        href="/v2/products"
        className="grid grid-cols-12 gap-6 py-8 lg:py-10 items-center hover:bg-[#faf9f6] -mx-4 px-4 transition-colors"
      >
        {/* Number */}
        <div className="col-span-2 sm:col-span-1 text-xs font-mono text-stone-400">
          {product.number}
        </div>

        {/* Title */}
        <div className="col-span-10 sm:col-span-4">
          <h3 className="text-2xl sm:text-3xl font-light text-[#0a0a0a] group-hover:translate-x-2 transition-transform">
            {product.title}
          </h3>
        </div>

        {/* Description */}
        <div className="col-span-12 sm:col-span-5">
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Arrow */}
        <div className="col-span-12 sm:col-span-2 sm:text-right">
          <div className="inline-flex items-center gap-1.5 text-stone-400 group-hover:text-[#0a0a0a] transition-colors text-sm">
            View
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function V2Products() {
  return (
    <section className="bg-[#faf9f6] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 lg:mb-20">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-4 block">
              Our catalog
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#0a0a0a] leading-tight tracking-tight">
              What we
              <br />
              <span className="italic text-stone-500">make.</span>
            </h2>
          </div>
          <div className="lg:pt-8">
            <p className="text-stone-600 text-lg leading-relaxed max-w-md lg:ml-auto">
              From custom t-shirts to large-format flags — if it can be
              sublimated, we make it in-house. All categories. All quantities.
            </p>
          </div>
        </div>

        {/* Product list - editorial style */}
        <div className="border-t border-stone-200">
          {products.map((product, index) => (
            <ProductRow key={product.number} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
