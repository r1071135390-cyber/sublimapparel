export function V12DDP() {
  return (
    <section className="border-b-2 border-black bg-[#ff4d00] text-black">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Section header */}
        <div className="mb-12 border-b-2 border-black pb-6">
          <div className="mb-2 text-xs font-black uppercase tracking-widest">
            [ 005 / Logistics ]
          </div>
          <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
            You order. We deliver.<br />
            <span className="italic underline decoration-4 decoration-black underline-offset-4">
              No customs. No duties. No wait.
            </span>
          </h2>
        </div>

        {/* Two shipping paths */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Path 1: DDP Worldwide */}
          <div className="border-2 border-black bg-[#ff4d00] p-6 shadow-[6px_6px_0_0_#000] md:p-8">
            <div className="mb-4 inline-block -rotate-2 border-2 border-black bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              ★ Path A
            </div>
            <h3 className="mb-3 text-2xl font-black uppercase leading-tight md:text-3xl">
              DDP Shipping<br />to 200+ Countries
            </h3>
            <p className="mb-6 text-sm font-bold leading-relaxed md:text-base">
              From our Yiwu factory — the heart of China&apos;s logistics network — we handle everything. Customs paperwork, duties, door delivery. You just open the box.
            </p>

            <ul className="space-y-2 text-sm font-bold">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-block h-5 w-5 flex-shrink-0 border-2 border-black bg-white text-center text-xs font-black leading-4">✓</span>
                <span>No customs paperwork on your end</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-block h-5 w-5 flex-shrink-0 border-2 border-black bg-white text-center text-xs font-black leading-4">✓</span>
                <span>No surprise duty bills at delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-block h-5 w-5 flex-shrink-0 border-2 border-black bg-white text-center text-xs font-black leading-4">✓</span>
                <span>Single invoice, one price, door to door</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-block h-5 w-5 flex-shrink-0 border-2 border-black bg-white text-center text-xs font-black leading-4">✓</span>
                <span>Tracking from factory floor to your door</span>
              </li>
            </ul>

            <div className="mt-6 border-2 border-black bg-white p-3">
              <div className="text-[10px] font-black uppercase tracking-widest text-black/60">
                Best for
              </div>
              <div className="mt-1 text-sm font-black uppercase">
                EU · UK · AU · CA · Middle East · Asia
              </div>
            </div>
          </div>

          {/* Path 2: LA US Domestic */}
          <div className="relative border-2 border-black bg-black p-6 text-white shadow-[6px_6px_0_0_#00c2ff] md:p-8">
            <div className="absolute -right-3 -top-3 rotate-[8deg] border-2 border-[#00c2ff] bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
              ★ NEW
            </div>
            <div className="mb-4 inline-block -rotate-2 border-2 border-white bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
              ★ Path B
            </div>
            <h3 className="mb-3 text-2xl font-black uppercase leading-tight md:text-3xl">
              US Domestic<br />from LA Warehouse
            </h3>
            <p className="mb-6 text-sm font-bold leading-relaxed md:text-base">
              Your order ships from our Los Angeles warehouse. No customs. No duties. No ocean freight wait. Your team gets it in 2-5 days, like a domestic order.
            </p>

            <ul className="space-y-2 text-sm font-bold">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-block h-5 w-5 flex-shrink-0 border-2 border-[#00c2ff] bg-[#00c2ff] text-center text-xs font-black leading-4 text-black">✓</span>
                <span>2-5 day delivery to anywhere in the US</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-block h-5 w-5 flex-shrink-0 border-2 border-[#00c2ff] bg-[#00c2ff] text-center text-xs font-black leading-4 text-black">✓</span>
                <span>Zero customs, zero duties, zero border delays</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-block h-5 w-5 flex-shrink-0 border-2 border-[#00c2ff] bg-[#00c2ff] text-center text-xs font-black leading-4 text-black">✓</span>
                <span>Stock up in LA, replenish in days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-block h-5 w-5 flex-shrink-0 border-2 border-[#00c2ff] bg-[#00c2ff] text-center text-xs font-black leading-4 text-black">✓</span>
                <span>Perfect for last-minute event needs</span>
              </li>
            </ul>

            <div className="mt-6 border-2 border-[#00c2ff] bg-black p-3">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#00c2ff]">
                Best for
              </div>
              <div className="mt-1 text-sm font-black uppercase text-white">
                US-based clients · Rush orders · POD platforms
              </div>
            </div>
          </div>
        </div>

        {/* Yiwu advantage strip */}
        <div className="mt-8 border-2 border-black bg-white p-4 text-center md:p-6">
          <div className="text-[10px] font-black uppercase tracking-widest text-black/60">
            Why we can do this
          </div>
          <div className="mt-2 text-base font-black uppercase leading-tight md:text-xl">
            Yiwu = World&apos;s Largest Small- Commodity Hub.<br />
            <span className="text-[#ff4d00]">Daily flights · Container ships · Express couriers</span> — all at our doorstep.
          </div>
        </div>
      </div>
    </section>
  );
}
