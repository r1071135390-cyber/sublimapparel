const FEATURES = [
  {
    num: "01",
    title: "Full print on cotton",
    desc: "Not just polyester. We print on 100% cotton with a process that keeps the ink in the fabric, not on top of it.",
  },
  {
    num: "02",
    title: "Door-to-door shipping",
    desc: "We handle customs, duties, and the last mile. Your boxes arrive at your door, no paperwork required.",
  },
  {
    num: "03",
    title: "One factory, one chain",
    desc: "Print, cut, sew, pack. Every step happens in our Yiwu facility. No middlemen, no surprises.",
  },
  {
    num: "04",
    title: "Fifty pieces or fifty thousand",
    desc: "Small runs for local events. Large runs for global campaigns. We treat both with the same care.",
  },
];

export function V9Features() {
  return (
    <section className="bg-white py-32 border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <div className="text-stone-400 text-xs tracking-[0.3em] font-light mb-6">
              — What we do
            </div>
            <h2 className="text-stone-900 text-3xl md:text-4xl font-light leading-tight">
              Four things,<br />
              done carefully.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-12">
            {FEATURES.map((f) => (
              <div key={f.num} className="grid grid-cols-12 gap-6 pb-12 border-b border-stone-200 last:border-0">
                <div className="col-span-2">
                  <div className="text-stone-300 text-3xl font-light">{f.num}</div>
                </div>
                <div className="col-span-10">
                  <h3 className="text-stone-900 text-lg font-light mb-3">{f.title}</h3>
                  <p className="text-stone-500 text-sm font-light leading-relaxed max-w-lg">
                    {f.desc}
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
