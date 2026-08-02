import { Process } from "@/components/v7/process";
import { Contact } from "@/components/v7/contact";

export default function V7AboutPage() {
  return (
    <>
      <section className="bg-[#f5f1e8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
            Atelier
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl font-light leading-tight tracking-tight text-stone-900 md:text-6xl">
            A small factory,
            <br />
            <span className="italic">a long story.</span>
          </h1>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <p className="text-base leading-relaxed text-stone-600">
              VividPrint began as a print finishing house in Yiwu, the
              small-commodity capital of China. Over a decade we grew into a
              full sublimation factory — design, printing, cutting, sewing,
              packing, shipping, all under one roof.
            </p>
            <p className="text-base leading-relaxed text-stone-600">
              Today we serve race organisers, marketing agencies, political
              campaigns and small brands across fifty countries. We are a
              thirty-person team. We answer emails. We ship boxes. We care
              about colour.
            </p>
          </div>
        </div>
      </section>
      <Process />
      <Contact />
    </>
  );
}
