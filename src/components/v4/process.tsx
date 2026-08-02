const steps = [
  { num: "01", title: "Design", desc: "Send us your artwork or use our free design service." },
  { num: "02", title: "Sample", desc: "We produce a pre-production sample for your approval." },
  { num: "03", title: "Print", desc: "Industrial sublimation presses transfer ink into fabric." },
  { num: "04", title: "Cut & Sew", desc: "Laser cutting and skilled sewing into finished garments." },
  { num: "05", title: "Quality Check", desc: "Every piece inspected before packing." },
  { num: "06", title: "DDP Ship", desc: "Customs cleared, delivered to your door." },
];

export function Process() {
  return (
    <section className="relative bg-[#0a0e1a] py-24 text-white">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
            The Process
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            From screen to doorstep, in 7 days.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="bg-[#0a0e1a] p-8 transition-colors hover:bg-white/[0.02]">
              <div className="text-5xl font-bold text-cyan-300/40">{step.num}</div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-white/60">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
