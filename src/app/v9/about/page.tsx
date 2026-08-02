import { V9Process } from "@/components/v9/process";
import { V9Features } from "@/components/v9/features";

export default function V9AboutPage() {
  return (
    <>
      <section className="bg-[#faf8f3] py-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-stone-400 text-xs tracking-[0.3em] font-light mb-8">
            — About
          </div>
          <h1 className="text-stone-900 text-4xl md:text-6xl font-light leading-tight mb-8">
            A small factory,<br />
            <span className="text-stone-500 italic">a long story.</span>
          </h1>
          <p className="text-stone-600 text-base font-light leading-relaxed mb-6">
            We started in 2014 with one printer and a single client. Ten years later, we ship to fifty countries and employ forty people in Yiwu.
          </p>
          <p className="text-stone-600 text-base font-light leading-relaxed">
            We are not the largest factory. We are not the cheapest. We are the factory that remembers your name and ships on time.
          </p>
        </div>
      </section>
      <V9Features />
      <V9Process />
    </>
  );
}
