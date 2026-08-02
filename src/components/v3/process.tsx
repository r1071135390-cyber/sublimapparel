const steps = [
  { num: "01", title: "Design", desc: "Send us your artwork or we design for you." },
  { num: "02", title: "Print", desc: "Sublimation onto fabric at full CMYK color." },
  { num: "03", title: "Cut", desc: "Laser-cut to your size chart, precision to 0.5mm." },
  { num: "04", title: "Sew", desc: "Hand-stitched assembly by experienced workers." },
  { num: "05", title: "Pack", desc: "Individual poly-bag, then export carton." },
  { num: "06", title: "Ship", desc: "DDP to your door — customs, duties handled." },
];

export function V3Process() {
  return (
    <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mb-16 grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Process
            </div>
            <h2 className="text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
              One factory.
              <br />
              <span className="text-[#00c2ff]">Six steps.</span> Zero
              <br />
              hand-offs.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-base leading-relaxed text-white/70">
              We don&apos;t outsource. Every step happens in our Yiwu facility, so quality stays
              consistent and timelines stay short.
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <div key={s.num} className="group bg-[#0a0a0a] p-8 transition-colors hover:bg-[#1a1a1a]">
              <div className="mb-4 flex items-baseline gap-3">
                <span className="text-5xl font-black text-[#ff4d00]">{s.num}</span>
                <span className="h-px flex-1 bg-white/20" />
              </div>
              <h3 className="mb-2 text-2xl font-black text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
