'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItemProps {
  value: string;
  label: string;
  suffix?: string;
}

function StatItem({ value, label, suffix }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
        {value}
        {suffix && <span className="text-[#ff4d00]">{suffix}</span>}
      </div>
      <div className="text-white/50 text-sm mt-2">{label}</div>
    </div>
  );
}

const stats: StatItemProps[] = [
  { value: '10', label: 'Years of Experience', suffix: '+' },
  { value: '50', label: 'Countries Served', suffix: '+' },
  { value: '500K', label: 'Garments Per Year', suffix: '+' },
  { value: '50', label: 'Minimum Order', suffix: ' pcs' },
];

export default function StatsBar() {
  return (
    <section className="bg-[#1a1a1a] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
