'use client';

import { useEffect, useRef, useState } from 'react';

const industries = [
  {
    name: 'Sports Events',
    description: 'Marathons, triathlons, tournaments',
    icon: '🏃',
  },
  {
    name: 'Political Campaigns',
    description: 'Election rallies, party events',
    icon: '🗳️',
  },
  {
    name: 'Brand Marketing',
    description: 'Product launches, pop-up stores',
    icon: '📣',
  },
  {
    name: 'Music Festivals',
    description: 'Staff uniforms, merchandise',
    icon: '🎵',
  },
  {
    name: 'Corporate Events',
    description: 'Team building, annual meetings',
    icon: '🏢',
  },
  {
    name: 'Charity & Non-Profit',
    description: 'Fundraising walks, awareness campaigns',
    icon: '❤️',
  },
];

export default function Industries() {
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
    <section className="py-20 lg:py-28 bg-white" id="industries">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#ff4d00] text-sm font-semibold uppercase tracking-wider">
            Who We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] mt-3 mb-4">
            Trusted by Event Organizers Worldwide
          </h2>
          <p className="text-[#6b6b6b] text-lg">
            From local 5K runs to international campaigns — we deliver custom
            apparel for every occasion.
          </p>
        </div>

        {/* Industries grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <div
              key={industry.name}
              className={`flex items-start gap-4 p-6 rounded-xl bg-[#f5f5f5] hover:bg-[#ff4d00]/5 border border-transparent hover:border-[#ff4d00]/20 transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <span className="text-3xl">{industry.icon}</span>
              <div>
                <h3 className="font-bold text-[#0a0a0a] mb-1">
                  {industry.name}
                </h3>
                <p className="text-[#6b6b6b] text-sm">{industry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
