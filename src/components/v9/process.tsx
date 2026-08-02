const STEPS = [
  { num: "01", name: "Design", detail: "Send us your artwork, or work with our team to create it." },
  { num: "02", name: "Sample", detail: "We print a sample and ship it to you for approval." },
  { num: "03", name: "Production", detail: "Bulk printing, cutting, and sewing in our Yiwu facility." },
  { num: "04", name: "Quality check", detail: "Every piece is inspected before packing." },
  { num: "05", name: "DDP shipping", detail: "We handle customs and deliver to your door." },
];

export function V9Process() {
  return (
    <section className="bg-stone-900 py-32 text-stone-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <div className="text-stone-500 text-xs tracking-[0.3em] font-light mb-6">
              — Process
            </div>
            <h2 className="text-3xl md:text-4xl font-light leading-tight">
              From your sketch<br />
              to their doorstep.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-0">
            {STEPS.map((s) => (
              <div
                key={s.num}
                className="grid grid-cols-12 gap-6 py-8 border-b border-stone-800 last:border-0"
              >
                <div className="col-span-2">
                  <div className="text-stone-600 text-2xl font-light">{s.num}</div>
                </div>
                <div className="col-span-4">
                  <h3 className="text-stone-100 text-lg font-light">{s.name}</h3>
                </div>
                <div className="col-span-6">
                  <p className="text-stone-400 text-sm font-light leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
