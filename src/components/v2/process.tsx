import { Palette, Scissors, Shirt, Package, Truck, CheckCircle2 } from 'lucide-react';

const steps = [
  { icon: <Palette size={20} />, label: 'Design' },
  { icon: <Scissors size={20} />, label: 'Print & Cut' },
  { icon: <Shirt size={20} />, label: 'Sew' },
  { icon: <Package size={20} />, label: 'Pack' },
  { icon: <Truck size={20} />, label: 'DDP Ship' },
  { icon: <CheckCircle2 size={20} />, label: 'Receive' },
];

export default function V2Process() {
  return (
    <section className="bg-[#0a0a0a] text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - title */}
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4 block">
              How it works
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight">
              Six steps.
              <br />
              <span className="italic text-stone-400">One factory.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mt-8 max-w-md">
              Every stage of production happens in our Yiwu facility. No
              outsourcing. No middlemen. Just clean, controlled execution from
              your design file to your door.
            </p>
          </div>

          {/* Right - steps */}
          <div>
            <div className="space-y-0">
              {steps.map((step, index) => (
                <div
                  key={step.label}
                  className="flex items-center gap-6 py-5 border-b border-white/10 last:border-b-0"
                >
                  <span className="text-xs font-mono text-white/30 w-8">
                    0{index + 1}
                  </span>
                  <div className="text-white/70">{step.icon}</div>
                  <span className="text-lg font-light text-white flex-1">
                    {step.label}
                  </span>
                  {index === 4 && (
                    <span className="text-xs text-amber-300 bg-amber-300/10 px-2 py-1 rounded">
                      DDP
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
