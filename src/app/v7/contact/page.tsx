import { Contact } from "@/components/v7/contact";

export default function V7ContactPage() {
  return (
    <>
      <section className="bg-[#f5f1e8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
            Correspondence
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl font-light leading-tight tracking-tight text-stone-900 md:text-6xl">
            Write to us,
            <br />
            <span className="italic">we write back.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-stone-600">
            We respond to every inquiry within one working day. Share a few
            details about your project and we will follow up with pricing
            guidance, fabric recommendations, and next steps.
          </p>
          <div className="mt-12 grid gap-8 text-sm md:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Email</p>
              <p className="mt-2 text-stone-900">hello@vividprint.cn</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Phone</p>
              <p className="mt-2 text-stone-900">+86 0579-8888 9999</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Studio</p>
              <p className="mt-2 text-stone-900">Yiwu, Zhejiang, China</p>
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}
