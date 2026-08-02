import { Truck, Layers, Zap, Globe2 } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "DDP Worldwide",
    desc: "We handle customs, duties, and last-mile delivery. Your package arrives at your door — fully cleared.",
    accent: "from-cyan-400/20 to-blue-600/20",
    iconColor: "text-cyan-300",
  },
  {
    icon: Layers,
    title: "Full Cotton Print",
    desc: "Sublimation on 100% cotton — not just polyester. Vivid color, soft hand-feel.",
    accent: "from-purple-400/20 to-pink-600/20",
    iconColor: "text-purple-300",
  },
  {
    icon: Zap,
    title: "7-Day Turnaround",
    desc: "From approved design to packed carton in 7 days. Express options for urgent events.",
    accent: "from-amber-400/20 to-orange-600/20",
    iconColor: "text-amber-300",
  },
  {
    icon: Globe2,
    title: "50+ Countries",
    desc: "Established shipping routes to USA, EU, UK, AU, and beyond. Tracking on every order.",
    accent: "from-emerald-400/20 to-teal-600/20",
    iconColor: "text-emerald-300",
  },
];

export function Features() {
  return (
    <section className="relative bg-[#0a0e1a] py-24 text-white">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Why VividPrint
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Four advantages, one factory.
          </h2>
          <p className="mt-4 text-white/60">
            We control every step from ink to doorstep. That means faster delivery, better prices, and zero customs headaches for you.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 transition-opacity group-hover:opacity-100`} />
              <div className="relative">
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${feature.iconColor}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
