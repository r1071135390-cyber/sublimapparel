import { Truck, Palette, Factory, Layers } from 'lucide-react';

const features = [
  {
    icon: <Truck size={20} />,
    number: '01',
    title: 'Door-to-Door DDP',
    description:
      'We clear customs, pay duties, and deliver. Your order arrives at your door with zero import paperwork on your end.',
  },
  {
    icon: <Palette size={20} />,
    number: '02',
    title: 'Cotton & Polyester',
    description:
      'Vivid all-over print on either 100% cotton or polyester. A rare capability that gives your brand options most factories cannot offer.',
  },
  {
    icon: <Factory size={20} />,
    number: '03',
    title: 'One Factory, Full Chain',
    description:
      'From digital design and sublimation printing to laser cutting and garment sewing — every step happens under our roof.',
  },
  {
    icon: <Layers size={20} />,
    number: '04',
    title: 'Flexible Production',
    description:
      '50-piece trial runs or 50,000-piece bulk orders. We scale with your event, your launch, your campaign.',
  },
];

export default function V2Features() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <span className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-4 block">
            What we offer
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#0a0a0a] leading-tight tracking-tight">
            A different kind of
            <br />
            <span className="italic text-stone-500">manufacturing partner.</span>
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="bg-white p-8 lg:p-12 group hover:bg-[#faf9f6] transition-colors"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 rounded-md border border-stone-200 flex items-center justify-center text-[#0a0a0a] group-hover:border-[#0a0a0a] transition-colors">
                  {feature.icon}
                </div>
                <span className="text-xs text-stone-400 font-mono">
                  {feature.number}
                </span>
              </div>
              <h3 className="text-xl font-medium text-[#0a0a0a] mb-3">
                {feature.title}
              </h3>
              <p className="text-stone-600 leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
