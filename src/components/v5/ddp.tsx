import Link from "next/link";

export function V5DDP() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-700 p-8 text-white sm:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                DDP — Delivered Duty Paid
              </div>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                No customs. No duties. No paperwork.
              </h2>
              <p className="mt-4 text-lg text-neutral-300">
                Most European and US customers have never imported from China. We make it feel like
                ordering locally — boxes arrive at your door, all costs included.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-sm font-semibold">Customs clearance</div>
                  <div className="mt-1 text-xs text-neutral-400">We handle all paperwork</div>
                </div>
                <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-sm font-semibold">Duty & tax payment</div>
                  <div className="mt-1 text-xs text-neutral-400">Already included in your quote</div>
                </div>
                <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-sm font-semibold">Last-mile delivery</div>
                  <div className="mt-1 text-xs text-neutral-400">UPS, FedEx, or local couriers</div>
                </div>
                <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-sm font-semibold">Tracking & insurance</div>
                  <div className="mt-1 text-xs text-neutral-400">Full visibility door-to-door</div>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-2xl bg-white p-6 text-neutral-900 shadow-2xl">
                <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <div className="ml-2 text-xs text-neutral-500">Shipping Quote</div>
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">500 T-Shirts (Polyester)</span>
                    <span className="font-semibold">$4,250.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Production</span>
                    <span className="font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Customs & duties</span>
                    <span className="font-semibold text-emerald-600">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Door delivery (US/EU)</span>
                    <span className="font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-200 pt-3">
                    <span className="font-bold">Total landed cost</span>
                    <span className="text-lg font-bold">$4,250.00</span>
                  </div>
                </div>
                <Link
                  href="/v5/contact"
                  className="mt-4 block rounded-lg bg-neutral-900 px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Get Your Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
