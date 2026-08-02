export function V3Features() {
  const features = [
    {
      number: "01",
      color: "#ff4d00",
      title: "Full cotton all-over print",
      desc: "We print on 100% cotton — not just polyester. Most factories can't do this. We can.",
    },
    {
      number: "02",
      color: "#00c2ff",
      title: "DDP to your door",
      desc: "You order, we deliver. No customs, no duties, no hidden fees. Sit back, receive boxes.",
    },
    {
      number: "03",
      color: "#ffd400",
      title: "One factory, full chain",
      desc: "Printing, cutting, sewing, packing, shipping — all under one roof in Yiwu.",
    },
    {
      number: "04",
      color: "#000000",
      title: "MOQ from 50 pcs",
      desc: "Small batch friendly. Test a new design or run a campaign without overcommitting.",
    },
  ];

  return (
    <section className="border-b-2 border-black bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Section header */}
        <div className="mb-16 grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-3 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Why us
            </div>
            <h2 className="text-5xl font-black leading-[0.95] tracking-tight text-black md:text-7xl">
              Four things
              <br />
              we do
              <span className="text-[#ff4d00]"> differently.</span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-base leading-relaxed text-black/70">
              We&apos;re not the cheapest factory in China. We&apos;re the one you can rely
              on when quality, fabric flexibility, and end-to-end logistics all matter.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid gap-px bg-black md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.number}
              className="group relative flex flex-col gap-4 bg-white p-8 transition-colors hover:bg-[#faf9f6]"
            >
              <div
                className="inline-flex h-12 w-12 items-center justify-center text-base font-black text-white"
                style={{ backgroundColor: f.color }}
              >
                {f.number}
              </div>
              <h3 className="text-2xl font-black leading-tight text-black">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-black/70">{f.desc}</p>
              <div className="mt-auto pt-4 text-xs font-black uppercase tracking-widest text-black/40 transition-colors group-hover:text-[#ff4d00]">
                Learn more →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
