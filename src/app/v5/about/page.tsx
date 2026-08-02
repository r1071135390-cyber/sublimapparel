import { V5Features } from "@/components/v5/features";
import { V5Process } from "@/components/v5/process";
import { V5Contact } from "@/components/v5/contact";

export default function V5AboutPage() {
  return (
    <>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
            About VividPrint
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">
            A full-stack sublimation apparel factory in Yiwu, China. 10+ years serving brands,
            events, and teams across 50+ countries.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 p-6">
              <div className="text-3xl font-bold text-neutral-900">10+</div>
              <div className="mt-1 text-sm text-neutral-600">Years in business</div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-6">
              <div className="text-3xl font-bold text-neutral-900">50+</div>
              <div className="mt-1 text-sm text-neutral-600">Countries served</div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-6">
              <div className="text-3xl font-bold text-neutral-900">2,500+</div>
              <div className="mt-1 text-sm text-neutral-600">Brands & teams</div>
            </div>
          </div>
        </div>
      </section>
      <V5Features />
      <V5Process />
      <V5Contact />
    </>
  );
}
