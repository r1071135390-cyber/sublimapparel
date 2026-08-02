import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="bg-[#f5f1e8] py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-end gap-12 md:grid-cols-12">
          {/* Left: Title + meta */}
          <div className="md:col-span-7">
            <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
              <span>Volume 01</span>
              <span className="h-px w-12 bg-stone-400" />
              <span>Sublimation Atelier</span>
            </div>

            <h1 className="font-serif text-5xl font-light leading-[0.95] tracking-tight text-stone-900 md:text-7xl lg:text-[5.5rem]">
              A printing
              <br />
              house for
              <br />
              <span className="italic text-stone-700">brilliant</span> events.
            </h1>

            <p className="mt-8 max-w-md text-base leading-relaxed text-stone-600">
              We are a dye-sublimation factory in Yiwu. We print on cotton and
              polyester, sew into garments, and ship to your door — duties
              included. <span className="font-medium text-stone-900">No customs, no friction.</span>
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/v7/contact"
                className="border border-stone-900 bg-stone-900 px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-[#f5f1e8] transition-colors hover:bg-transparent hover:text-stone-900"
              >
                Begin a Project
              </Link>
              <Link
                href="/v7/products"
                className="text-xs uppercase tracking-[0.2em] text-stone-700 underline underline-offset-4 hover:text-stone-900"
              >
                Browse the Catalogue →
              </Link>
            </div>
          </div>

          {/* Right: Editorial image + caption */}
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/v7-editorial.jpg"
                alt="Editorial portrait"
                fill
                priority
                className="object-cover"
              />
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-stone-500">
              Fig. 01 — A study in cotton sublimation, 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
