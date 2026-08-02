import Image from "next/image";
import Link from "next/link";

export function V5Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              DDP Shipping to 50+ Countries
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Full-color custom apparel.
              <br />
              <span className="text-neutral-500">Delivered to your door.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Professional dye-sublimation printing on polyester and cotton. We handle design,
              production, and shipping — you handle the rest of your business.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/v5/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Request a Quote
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/v5/products"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
              >
                Browse Products
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>MOQ 50 pcs</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>7-day sample</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No customs hassle</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src="/v5-product.jpg"
                alt="Custom sublimation printed t-shirt"
                width={1000}
                height={1200}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg sm:block">
              <div className="text-2xl font-bold text-neutral-900">2,500+</div>
              <div className="text-xs text-neutral-500">Brands served</div>
            </div>
            <div className="absolute -right-6 top-8 hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg sm:block">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-orange-400 to-red-500"></div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-cyan-500"></div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-emerald-500"></div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-900">4.9/5</div>
                  <div className="text-[10px] text-neutral-500">Customer rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
