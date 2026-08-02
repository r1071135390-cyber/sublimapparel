export function Features() {
  const features = [
    {
      number: "01",
      title: "Full Cotton, Full Print",
      body: "Most factories print only on polyester. We are specialists in full-colour sublimation on 100% cotton — a rare capability that opens new creative possibilities.",
    },
    {
      number: "02",
      title: "Door-to-Door Delivery",
      body: "We offer DDP shipping to the US, UK, EU, AU and beyond. Your team receives boxes at the door, no customs paperwork, no surprise duties.",
    },
    {
      number: "03",
      title: "Whole Supply Chain",
      body: "Design, printing, cutting, sewing, packing, shipping — one factory, one accountable team. No middlemen, no coordination overhead.",
    },
    {
      number: "04",
      title: "Fifty Pieces Minimum",
      body: "Small MOQ means you can test, iterate and scale. We work with race organisers, marketing teams, and small brands without quantity demands.",
    },
  ];

  return (
    <section className="border-t border-stone-300 bg-[#f5f1e8] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
            Chapter 02 — Capabilities
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light tracking-tight text-stone-900 md:text-5xl">
            What we are <span className="italic">good</span> at.
          </h2>
        </div>

        <div className="grid gap-px bg-stone-300 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="bg-[#f5f1e8] p-8 transition-colors hover:bg-[#ede7d6] md:p-12"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-stone-500">
                {feature.number}
              </p>
              <h3 className="mt-4 font-serif text-2xl font-medium text-stone-900">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-stone-600">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
