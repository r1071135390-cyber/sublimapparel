'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Palette,
  Scissors,
  Shirt,
  Package,
  Truck,
  CheckCircle2,
} from 'lucide-react';

const steps = [
  {
    icon: <Palette size={28} className="text-[#ff4d00]" />,
    title: 'Design',
    description: 'Send us your artwork or work with our design team',
  },
  {
    icon: <Scissors size={28} className="text-[#ff4d00]" />,
    title: 'Print & Cut',
    description: 'Sublimation printing + precision laser cutting',
  },
  {
    icon: <Shirt size={28} className="text-[#ff4d00]" />,
    title: 'Sew',
    description: 'Professional garment assembly and QC',
  },
  {
    icon: <Package size={28} className="text-[#ff4d00]" />,
    title: 'Pack',
    description: 'Individual poly bag + carton packaging',
  },
  {
    icon: <Truck size={28} className="text-[#00c2ff]" />,
    title: 'DDP Ship',
    description: 'We handle customs & duties, door to door',
  },
  {
    icon: <CheckCircle2 size={28} className="text-[#10b981]" />,
    title: 'Receive',
    description: 'Boxes arrive at your door — ready for your event',
  },
];

export default function SupplyChain() {
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
    <section className="py-20 lg:py-28 bg-[#0a0a0a]" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#ff4d00] text-sm font-semibold uppercase tracking-wider">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
            One Factory. Full Control.
          </h2>
          <p className="text-white/60 text-lg">
            Every step happens in-house — from your design file to the box at
            your door. No middlemen, no communication gaps.
          </p>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 hover:border-[#ff4d00]/30 transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Step number */}
              <div className="absolute top-4 right-4 text-white/10 text-4xl font-extrabold">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-white/50 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
