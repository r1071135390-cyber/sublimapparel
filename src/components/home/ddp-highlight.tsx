'use client';

import { useEffect, useRef, useState } from 'react';
import { Truck, Shield, Globe, Clock } from 'lucide-react';

export default function DdpHighlight() {
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
    <section className="py-20 lg:py-28 bg-gradient-to-br from-[#001a2e] to-[#002a4a] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00c2ff]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#ff4d00]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        ref={ref}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-[#00c2ff]/10 border border-[#00c2ff]/20 rounded-full px-4 py-2 mb-6">
              <Truck size={16} className="text-[#00c2ff]" />
              <span className="text-[#00c2ff] text-sm font-medium">
                Our Key Advantage
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              You Order.
              <br />
              <span className="text-[#00c2ff]">We Deliver.</span>
              <br />
              Door to Door.
            </h2>

            <p className="text-white/70 text-lg leading-relaxed mb-8">
              With DDP (Delivered Duty Paid) shipping, your order arrives at
              your doorstep with all customs clearance and duties handled by us.
              No import paperwork. No surprise fees. No headaches.
            </p>

            <p className="text-white/50 text-base italic border-l-2 border-[#00c2ff]/50 pl-4">
              &quot;It is like ordering from a local supplier — except the price
              is far more competitive.&quot;
            </p>
          </div>

          {/* Right - benefits grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            {[
              {
                icon: <Shield size={24} className="text-[#00c2ff]" />,
                title: 'No Customs Hassle',
                desc: 'We clear everything. You never deal with customs paperwork.',
              },
              {
                icon: <Globe size={24} className="text-[#00c2ff]" />,
                title: 'Worldwide Coverage',
                desc: 'DDP to USA, EU, UK, Australia, Canada, and 50+ countries.',
              },
              {
                icon: <Clock size={24} className="text-[#00c2ff]" />,
                title: 'Predictable Timeline',
                desc: '15-25 days production + 7-15 days DDP shipping. No delays at border.',
              },
              {
                icon: <Truck size={24} className="text-[#00c2ff]" />,
                title: 'Door-to-Door',
                desc: 'From our factory floor to your warehouse or event venue.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors"
              >
                <div className="mb-3">{item.icon}</div>
                <h4 className="text-white font-semibold text-sm mb-1">
                  {item.title}
                </h4>
                <p className="text-white/50 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
