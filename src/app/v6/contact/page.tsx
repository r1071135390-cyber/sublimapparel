import { V6Contact } from "@/components/v6/contact";

export default function V6ContactPage() {
  return (
    <>
      <section className="bg-black py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs font-black uppercase tracking-widest text-[#00ff88]">
            Contact
          </div>
          <h1 className="mt-2 text-5xl font-black uppercase leading-none sm:text-6xl">
            Get In Touch
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Email us or use the form below. We respond within 24 hours.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="border-2 border-white/20 p-5">
              <div className="text-xs font-black uppercase tracking-widest text-[#00ff88]">
                Email
              </div>
              <div className="mt-1 text-sm font-bold text-white">sales@vividprint.com</div>
            </div>
            <div className="border-2 border-white/20 p-5">
              <div className="text-xs font-black uppercase tracking-widest text-[#00ff88]">
                Hours
              </div>
              <div className="mt-1 text-sm font-bold text-white">Mon-Fri 9-18 (GMT+8)</div>
            </div>
            <div className="border-2 border-white/20 p-5">
              <div className="text-xs font-black uppercase tracking-widest text-[#00ff88]">
                Location
              </div>
              <div className="mt-1 text-sm font-bold text-white">Yiwu, China</div>
            </div>
          </div>
        </div>
      </section>
      <V6Contact />
    </>
  );
}
