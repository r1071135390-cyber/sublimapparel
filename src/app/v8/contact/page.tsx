import { Contact } from "@/components/v8/contact";

export default function V8ContactPage() {
  return (
    <>
      <section className="border-b-4 border-black bg-white py-12 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4">
          <p className="text-xs font-black uppercase tracking-widest text-black">
            [006] CONTACT
          </p>
          <h1 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-tight text-black md:text-7xl">
            WRITE US
          </h1>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="border-2 border-black bg-[#ffeb00] p-5">
              <p className="text-[10px] font-black uppercase tracking-widest">→ EMAIL</p>
              <p className="mt-2 text-lg font-black">HELLO@VIVIDPRINT.CN</p>
            </div>
            <div className="border-2 border-black bg-white p-5">
              <p className="text-[10px] font-black uppercase tracking-widest">→ PHONE</p>
              <p className="mt-2 text-lg font-black">+86 0579-8888 9999</p>
            </div>
            <div className="border-2 border-black bg-white p-5">
              <p className="text-[10px] font-black uppercase tracking-widest">→ STUDIO</p>
              <p className="mt-2 text-lg font-black">YIWU // ZHEJIANG // CN</p>
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}
