const STEPS = [
  { id: "01", name: "UPLOAD_DESIGN", detail: "Drop your artwork, we handle the rest" },
  { id: "02", name: "SAMPLE_RUN", detail: "We print and ship a sample for approval" },
  { id: "03", name: "BULK_PROD", detail: "Print, cut, sew in our Yiwu facility" },
  { id: "04", name: "QC_SCAN", detail: "Every piece checked, zero defects policy" },
  { id: "05", name: "DDP_DEPLOY", detail: "Customs handled, door delivery worldwide" },
];

export function V10Process() {
  return (
    <section className="bg-black py-32 border-y border-fuchsia-500/20 relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.04)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="font-mono text-xs text-cyan-400 tracking-widest mb-4">
            &gt; /EXECUTION_PIPELINE
          </div>
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight">
            PROCES<span className="text-cyan-400">S</span>
          </h2>
        </div>
        <div className="space-y-0">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className="group grid grid-cols-12 gap-4 py-6 border-b border-cyan-500/20 hover:bg-cyan-500/5 transition"
            >
              <div className="col-span-2 font-mono text-cyan-400 text-sm">/{s.id}</div>
              <div className="col-span-4 text-white font-black tracking-wider group-hover:[text-shadow:0_0_20px_rgba(0,255,255,0.5)] transition">
                {s.name}
              </div>
              <div className="col-span-6 font-mono text-sm text-cyan-100/60">
                {s.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
