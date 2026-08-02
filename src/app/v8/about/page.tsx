import { Process } from "@/components/v8/process";
import { Contact } from "@/components/v8/contact";

export default function V8AboutPage() {
  return (
    <>
      <section className="border-b-4 border-black bg-white py-12 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4">
          <p className="text-xs font-black uppercase tracking-widest text-black">
            [004] ABOUT
          </p>
          <h1 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-tight text-black md:text-7xl">
            THE FACTORY
          </h1>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="border-2 border-black bg-[#ffeb00] p-6">
              <p className="text-xs font-black uppercase tracking-widest">→ WHO</p>
              <p className="mt-3 text-lg font-black leading-snug">
                A 30-PERSON SUBLIMATION FACTORY IN YIWU, CHINA. EST. 2014.
              </p>
            </div>
            <div className="border-2 border-black bg-white p-6">
              <p className="text-xs font-black uppercase tracking-widest">→ WHAT</p>
              <p className="mt-3 text-lg font-black leading-snug">
                DESIGN, PRINTING, CUTTING, SEWING, PACKING, SHIPPING. ALL UNDER ONE ROOF.
              </p>
            </div>
            <div className="border-2 border-black bg-white p-6">
              <p className="text-xs font-black uppercase tracking-widest">→ WHERE</p>
              <p className="mt-3 text-lg font-black leading-snug">
                50+ COUNTRIES. DDP SHIPPING. DOOR-TO-DOOR.
              </p>
            </div>
            <div className="border-2 border-black bg-black p-6 text-[#ffeb00]">
              <p className="text-xs font-black uppercase tracking-widest">→ WHY</p>
              <p className="mt-3 text-lg font-black leading-snug">
                BECAUSE INTERNATIONAL PRINTING SHOULDN'T BE A HEADACHE.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Process />
      <Contact />
    </>
  );
}
