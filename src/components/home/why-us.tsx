'use client';

import { useEffect, useRef, useState } from 'react';
import { Truck, Palette, Factory, Layers } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
  delay: number;
}

function FeatureCard({
  icon,
  title,
  description,
  highlight,
  delay,
}: FeatureCardProps) {
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
      className={`bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#ff4d00]/20 transition-all duration-500 hover:shadow-lg group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 bg-[#ff4d00]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#ff4d00]/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#0a0a0a] mb-3">{title}</h3>
      <p className="text-[#6b6b6b] text-sm leading-relaxed mb-3">
        {description}
      </p>
      {highlight && (
        <span className="inline-block text-[#ff4d00] text-sm font-semibold">
          {highlight}
        </span>
      )}
    </div>
  );
}

const features: Omit<FeatureCardProps, 'delay'>[] = [
  {
    icon: <Truck size={24} className="text-[#ff4d00]" />,
    title: 'DDP Door-to-Door',
    description:
      'We handle customs, duties, and shipping. You receive boxes at your door — no import paperwork, no surprise fees, no headaches.',
    highlight: 'Zero import hassle',
  },
  {
    icon: <Palette size={24} className="text-[#ff4d00]" />,
    title: 'Full-Cotton Sublimation',
    description:
      'Most factories only print on polyester. We achieve vibrant all-over prints on 100% cotton — soft, breathable, and color-fast.',
    highlight: 'Industry-rare capability',
  },
  {
    icon: <Factory size={24} className="text-[#ff4d00]" />,
    title: 'Complete Supply Chain',
    description:
      'From design and printing to laser cutting and garment sewing — everything under one roof. Faster turnaround, better quality control.',
    highlight: 'Design to delivery',
  },
  {
    icon: <Layers size={24} className="text-[#ff4d00]" />,
    title: 'Flexible MOQ',
    description:
      'From 50-piece trial orders to 50,000-piece bulk runs. We scale with your event, whether it is a local marathon or a global campaign.',
    highlight: '50 pcs to 50,000+ pcs',
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 lg:py-28 bg-[#f5f5f5]" id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#ff4d00] text-sm font-semibold uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] mt-3 mb-4">
            Not Just Another Print Factory
          </h2>
          <p className="text-[#6b6b6b] text-lg">
            We combine rare capabilities with unmatched service — making it
            effortless for you to order custom apparel from China.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
