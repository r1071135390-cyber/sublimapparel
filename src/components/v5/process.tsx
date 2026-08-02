const STEPS = [
  { num: "01", title: "Send Your Design", desc: "Upload artwork, share sketches, or describe your idea. Free design support included." },
  { num: "02", title: "Approve Sample", desc: "We produce a physical sample and ship it to you. Confirm quality before bulk." },
  { num: "03", title: "Mass Production", desc: "Sublimation printing, laser cutting, sewing, and quality control — all in-house." },
  { num: "04", title: "DDP Shipping", desc: "We handle customs and duties. Boxes arrive at your door, ready to use." },
];

export function V5Process() {
  return (
    <section className="bg-neutral-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            From idea to doorstep in 4 steps
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            A simple process designed for busy teams. No chasing, no surprises.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="relative rounded-2xl border border-neutral-200 bg-white p-6"
            >
              <div className="text-3xl font-bold text-neutral-200">{s.num}</div>
              <h3 className="mt-3 text-lg font-semibold text-neutral-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
