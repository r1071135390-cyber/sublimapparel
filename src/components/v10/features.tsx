const FEATURES = [
  { id: "01", name: "FULL_PRINT_COTTON", spec: "100% cotton, all-over print, ink in fabric" },
  { id: "02", name: "DDP_SHIPPING", spec: "Customs + duties + last mile, all in" },
  { id: "03", name: "INHOUSE_CHAIN", spec: "Print, cut, sew, pack, one facility" },
  { id: "04", name: "FLEX_MOQ", spec: "From 50 pieces to 50,000, same quality" },
];

export function V10Features() {
  return (
    <section className="bg-black py-32 border-t border-cyan-500/20 relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="font-mono text-xs text-cyan-400 tracking-widest mb-4">
            &gt; /CAPABILITIES
          </div>
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight">
            CORE<span className="text-cyan-400">.</span>STACK
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-cyan-500/30">
          {FEATURES.map((f) => (
            <div key={f.id} className="bg-black p-8 hover:bg-cyan-500/5 transition group">
              <div className="flex items-start justify-between mb-4">
                <div className="font-mono text-xs text-fuchsia-400">/{f.id}</div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition animate-pulse"></div>
              </div>
              <h3 className="text-cyan-300 text-2xl font-black tracking-wider mb-3 group-hover:[text-shadow:0_0_20px_rgba(0,255,255,0.5)] transition">
                {f.name}
              </h3>
              <p className="text-cyan-100/60 font-mono text-sm leading-relaxed">
                {f.spec}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
