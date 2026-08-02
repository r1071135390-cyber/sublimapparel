const steps = [
  ["01", "CONSULTATION", "Tell us about your event, design and timeline."],
  ["02", "MOCKUP", "Digital proof with your artwork on the actual garment."],
  ["03", "SAMPLING", "Optional physical sample shipped for approval."],
  ["04", "PRODUCTION", "Sublimation, cutting, sewing, finishing."],
  ["05", "QUALITY CHECK", "Each piece inspected before packing."],
  ["06", "DDP DELIVERY", "Customs, duties, last-mile — all on us."],
];

export function Process() {
  return (
    <section className="border-b-4 border-black bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-6 border-b-2 border-white pb-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#ffeb00]">
              [004] METHOD
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight md:text-5xl">
              <span className="text-[#ffeb00]">6</span> STEPS
            </h2>
          </div>
          <p className="hidden text-right text-xs font-bold uppercase tracking-widest md:block">
            BRIEF → DOOR
          </p>
        </div>

        <div className="grid gap-px bg-white md:grid-cols-2 lg:grid-cols-3">
          {steps.map(([num, title, body]) => (
            <article key={num} className="bg-black p-6 transition-colors hover:bg-[#ffeb00] hover:text-black md:p-7">
              <p className="text-5xl font-black leading-none">
                {num}
              </p>
              <h3 className="mt-6 text-xl font-black uppercase tracking-tight">
                {title}
              </h3>
              <p className="mt-3 text-sm font-medium leading-relaxed">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
