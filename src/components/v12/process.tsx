export function V12Process() {
  const steps = [
    {
      num: "01",
      title: "Send Your Design",
      desc: "AI, PSD, PDF, or even a napkin sketch. We work with what you have.",
      icon: "📐",
    },
    {
      num: "02",
      title: "Sample & Confirm",
      desc: "Free sample in 3-5 days. Approve colors, fabric, fit — then we go.",
      icon: "🎨",
    },
    {
      num: "03",
      title: "Print & Sew",
      desc: "Sublimation, cutting, and sewing under one roof. Full chain, no middlemen.",
      icon: "🧵",
    },
    {
      num: "04",
      title: "Quality Check",
      desc: "Every piece inspected. Colors verified against your proof. No surprises.",
      icon: "✓",
    },
    {
      num: "05",
      title: "Pack & Ship",
      desc: "Folded, poly-bagged, boxed. From our Yiwu floor or LA warehouse — your call.",
      icon: "📦",
    },
    {
      num: "06",
      title: "Delivered to Door",
      desc: "DDP to 200+ countries. US orders ship domestically from LA — no customs wait.",
      icon: "🚚",
    },
  ];

  return (
    <section className="border-b-2 border-black bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Section header */}
        <div className="mb-12 flex items-end justify-between border-b-2 border-white pb-6">
          <div>
            <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              [ 004 / Process ]
            </div>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
              How it <span className="italic text-[#ff4d00]">works.</span>
            </h2>
          </div>
          <div className="hidden text-right text-xs font-bold uppercase tracking-widest text-white/60 md:block">
            6 steps.<br />One factory.
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`group relative border-2 border-white bg-black p-6 ${
                i % 2 === 0 ? "md:rotate-[-1deg]" : "md:rotate-[0.5deg]"
              } transition-transform hover:rotate-0 hover:bg-white hover:text-black`}
            >
              {/* Number */}
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-5xl font-black leading-none text-[#ff4d00] group-hover:text-[#ff4d00]">
                  {step.num}
                </span>
                <span className="text-3xl">{step.icon}</span>
              </div>

              {/* Title */}
              <h3 className="mb-2 text-xl font-black uppercase tracking-tight">{step.title}</h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-white/70 group-hover:text-black/70">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline summary */}
        <div className="mt-12 grid grid-cols-2 gap-4 border-2 border-white p-6 md:grid-cols-4">
          <div>
            <div className="text-2xl font-black text-[#00c2ff] md:text-3xl">3-5 days</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/60">
              Sample
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-[#00c2ff] md:text-3xl">7-15 days</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/60">
              Production
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-[#00c2ff] md:text-3xl">5-10 days</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/60">
              DDP shipping
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-[#ff4d00] md:text-3xl">2-5 days</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/60">
              US domestic (LA)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
