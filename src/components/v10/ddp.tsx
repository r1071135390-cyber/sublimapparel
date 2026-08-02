export function V10DDP() {
  return (
    <section className="relative bg-gradient-to-br from-cyan-950/50 to-fuchsia-950/50 border-y border-cyan-500/30 py-32 overflow-hidden">
      <div className="absolute top-10 left-10 text-9xl font-black text-cyan-400/10 select-none">DDP</div>
      <div className="absolute bottom-10 right-10 text-9xl font-black text-fuchsia-400/10 select-none">SHIP</div>
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="font-mono text-xs text-cyan-400 tracking-widest mb-8">
          &gt; /SHIPPING_PROTOCOL.DDP
        </div>
        <h2 className="text-white text-3xl md:text-5xl font-black leading-tight mb-8 tracking-tight">
          ORDER<span className="text-cyan-400">.</span>SHIP<span className="text-fuchsia-400">.</span>DELIVER<span className="text-cyan-400">.</span>
        </h2>
        <p className="text-cyan-100/70 font-mono leading-relaxed max-w-2xl mx-auto">
          &gt; No customs forms. No duties. No brokerage.<br />
          &gt; Your boxes arrive at your door, ready for the event.<br />
          &gt; We handle everything in between.
        </p>
        <div className="mt-12 inline-flex items-center gap-2 border border-cyan-400 bg-cyan-400/10 px-4 py-2 font-mono text-xs text-cyan-300">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
          <span>STATUS: DELIVERED_GLOBALLY_SINCE_2018</span>
        </div>
      </div>
    </section>
  );
}
