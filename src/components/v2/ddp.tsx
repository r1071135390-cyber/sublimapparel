import { Shield, Globe, Clock, Truck } from 'lucide-react';

const benefits = [
  {
    icon: <Shield size={18} />,
    title: 'No customs paperwork',
  },
  {
    icon: <Globe size={18} />,
    title: '50+ countries covered',
  },
  {
    icon: <Clock size={18} />,
    title: 'Predictable timeline',
  },
  {
    icon: <Truck size={18} />,
    title: 'True door-to-door',
  },
];

export default function V2Ddp() {
  return (
    <section className="bg-[#faf9f6] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - large quote */}
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-6 block">
              Our signature service
            </span>
            <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#0a0a0a] leading-tight tracking-tight">
              <span className="text-stone-400">&ldquo;</span>
              It feels like ordering from a local supplier — except the price is
              far more competitive.
              <span className="text-stone-400">&rdquo;</span>
            </blockquote>
            <p className="text-stone-500 text-sm mt-6">
              — The DDP difference. We clear customs, pay duties, and deliver.
              You receive boxes at your door.
            </p>
          </div>

          {/* Right - benefits list */}
          <div className="space-y-0 border-t border-stone-300">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex items-center gap-6 py-6 border-b border-stone-200"
              >
                <div className="w-10 h-10 rounded-md bg-[#0a0a0a] text-white flex items-center justify-center shrink-0">
                  {benefit.icon}
                </div>
                <span className="text-lg font-light text-[#0a0a0a]">
                  {benefit.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
