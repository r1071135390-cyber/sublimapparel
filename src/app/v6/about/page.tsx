import { V6Features } from "@/components/v6/features";
import { V6Process } from "@/components/v6/process";
import { V6Contact } from "@/components/v6/contact";

export default function V6AboutPage() {
  return (
    <>
      <section className="bg-black py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs font-black uppercase tracking-widest text-[#00ff88]">
            About
          </div>
          <h1 className="mt-2 text-5xl font-black uppercase leading-none sm:text-6xl">
            Built by Athletes.
            <br />
            <span className="text-[#00ff88]">For Athletes.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            We started in a Yiwu factory floor in 2014. Today we serve 2,500+ teams across 50+
            countries — all from the same place.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="border-2 border-[#00ff88] p-6">
              <div className="text-4xl font-black text-[#00ff88]">10+</div>
              <div className="mt-1 text-xs font-black uppercase tracking-widest text-white/60">
                Years
              </div>
            </div>
            <div className="border-2 border-[#00ff88] p-6">
              <div className="text-4xl font-black text-[#00ff88]">50+</div>
              <div className="mt-1 text-xs font-black uppercase tracking-widest text-white/60">
                Countries
              </div>
            </div>
            <div className="border-2 border-[#00ff88] p-6">
              <div className="text-4xl font-black text-[#00ff88]">2,500+</div>
              <div className="mt-1 text-xs font-black uppercase tracking-widest text-white/60">
                Teams Served
              </div>
            </div>
          </div>
        </div>
      </section>
      <V6Features />
      <V6Process />
      <V6Contact />
    </>
  );
}
