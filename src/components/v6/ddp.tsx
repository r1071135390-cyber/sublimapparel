import Link from "next/link";

export function V6DDP() {
  return (
    <section className="relative overflow-hidden bg-[#00ff88] py-20 text-black">
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, black 20px, black 22px)",
          }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-block bg-black px-3 py-1.5 text-xs font-black uppercase tracking-widest text-[#00ff88]">
              DDP Shipping
            </div>
            <h2 className="mt-6 text-5xl font-black uppercase leading-[0.9] sm:text-6xl">
              No Customs.
              <br />
              No Duties.
              <br />
              <span className="bg-black px-2 text-[#00ff88]">No BS.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-black/80">
              We deliver door-to-door in 50+ countries. All customs paperwork, all duties, all
              tracking — handled. Your team opens boxes, not invoices.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {["Customs clearance", "Duty payment", "Last-mile", "Insurance", "Tracking", "Support"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 border-2 border-black bg-white px-3 py-2 text-sm font-black uppercase"
                  >
                    <span className="text-[#00ff88]">✓</span>
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>

            <Link
              href="/v6/contact"
              className="mt-8 inline-flex items-center gap-2 bg-black px-7 py-4 text-sm font-black uppercase tracking-widest text-[#00ff88] transition-all hover:translate-x-1 hover:translate-y-1"
            >
              Start Your Order
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="relative">
            <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_black]">
              <div className="text-xs font-black uppercase tracking-widest text-neutral-500">
                Landed Cost Example
              </div>
              <div className="mt-1 text-3xl font-black">500 Race Jerseys</div>
              <div className="mt-1 text-sm text-neutral-600">Delivered to New York, USA</div>

              <div className="mt-6 space-y-3 border-t-2 border-black pt-4 text-sm">
                <div className="flex justify-between font-bold">
                  <span>Production</span>
                  <span>$4,800</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Customs & Duties</span>
                  <span className="text-[#00ff88]">$0.00</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Door Delivery</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between border-t-2 border-black pt-3 text-lg font-black">
                  <span>TOTAL</span>
                  <span>$4,800</span>
                </div>
              </div>

              <div className="mt-4 bg-[#00ff88] p-3 text-center text-xs font-black uppercase tracking-widest">
                All-in price. No surprises.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
