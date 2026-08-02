import { V10Features } from "@/components/v10/features";
import { V10Process } from "@/components/v10/process";

export default function V10AboutPage() {
  return (
    <>
      <section className="bg-black py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="relative max-w-3xl mx-auto px-6">
          <div className="font-mono text-xs text-cyan-400 tracking-widest mb-4">
            &gt; /ABOUT.SYS
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-black tracking-tight mb-8">
            FACTORY<span className="text-cyan-400">.</span>DOSSIER
          </h1>
          <p className="text-cyan-100/70 font-mono leading-relaxed mb-4">
            &gt; established 2014<br />
            &gt; 40 employees, 1 facility in Yiwu<br />
            &gt; shipping to 50+ countries<br />
            &gt; 10+ years in dye-sublimation
          </p>
        </div>
      </section>
      <V10Features />
      <V10Process />
    </>
  );
}
