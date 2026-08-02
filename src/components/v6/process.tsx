const STEPS = [
  { num: "01", title: "Brief", desc: "Share your design, sizes, and timeline." },
  { num: "02", title: "Sample", desc: "7-day sample delivered to your door." },
  { num: "03", title: "Production", desc: "Bulk production with quality control." },
  { num: "04", title: "Delivery", desc: "DDP shipping, boxes arrive at your door." },
];

export function V6Process() {
  return (
    <section className="bg-white py-20 text-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <div className="text-xs font-black uppercase tracking-widest text-[#00ff88]">Process</div>
          <h2 className="mt-2 text-4xl font-black uppercase leading-none sm:text-5xl">
            Four Steps.
            <br />
            Zero Hassle.
          </h2>
        </div>

        <div className="grid gap-0 border-2 border-black sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              className={`p-6 ${i > 0 ? "border-t-2 border-black sm:border-l-2 sm:border-t-0 lg:border-t-0" : ""} ${
                i % 2 === 0 ? "sm:border-t-0" : ""
              }`}
            >
              <div className="text-5xl font-black text-[#00ff88]">{s.num}</div>
              <h3 className="mt-4 text-xl font-black uppercase">{s.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
