const steps = [
  { num: "I", title: "Consultation", body: "Tell us about your event, design and timeline." },
  { num: "II", title: "Mockup", body: "We create a digital proof with your artwork on the actual garment." },
  { num: "III", title: "Sampling", body: "Optional physical sample shipped for approval." },
  { num: "IV", title: "Production", body: "Sublimation, cutting, sewing, finishing in our Yiwu factory." },
  { num: "V", title: "Quality Check", body: "Each piece inspected before packing." },
  { num: "VI", title: "DDP Delivery", body: "Customs, duties, last-mile — all on us. Boxes arrive at your door." },
];

export function Process() {
  return (
    <section className="border-t border-stone-300 bg-[#1a1a1a] py-20 text-stone-100 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone-400">
            Chapter 04 — Method
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light tracking-tight md:text-5xl">
            From brief <span className="italic">to</span> door, in six steps.
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <article key={step.num} className="border-t border-stone-700 pt-6">
              <p className="font-serif text-3xl italic text-stone-400">
                {step.num}
              </p>
              <h3 className="mt-3 font-serif text-2xl font-medium text-stone-100">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-400">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
