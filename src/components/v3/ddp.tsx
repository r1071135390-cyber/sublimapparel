import Link from "next/link";

export function V3DDP() {
  return (
    <section className="relative overflow-hidden border-b-2 border-black bg-[#00c2ff]">
      {/* Decorative shapes */}
      <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#ff4d00] opacity-90" />
      <div className="absolute bottom-0 left-0 h-32 w-32 bg-[#ffd400]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-4 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
              ★ Our edge
            </div>
            <h2 className="text-5xl font-black leading-[0.9] tracking-tighter text-black md:text-8xl">
              We ship
              <br />
              <span className="italic">DDP.</span>
            </h2>
            <p className="mt-6 max-w-xl text-xl font-medium leading-snug text-black md:text-2xl">
              That means your order arrives at your door with{" "}
              <span className="bg-black px-1 text-[#00c2ff]">all duties paid.</span> No customs
              forms. No surprise fees. No headaches.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/v3/contact"
                className="group inline-flex items-center gap-3 bg-black px-8 py-5 text-base font-black uppercase tracking-wider text-white transition-all hover:bg-[#ff4d00]"
              >
                Get DDP quote
                <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="border-2 border-black bg-white p-8">
              <div className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black/60">
                <span className="h-2 w-2 rounded-full bg-[#ff4d00]" />
                How it works
              </div>
              <ul className="space-y-4 text-base font-bold text-black">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center bg-black text-xs font-black text-white">1</span>
                  <span>You send the order — we quote one all-in price.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center bg-black text-xs font-black text-white">2</span>
                  <span>We produce, pack, and clear export customs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center bg-black text-xs font-black text-white">3</span>
                  <span>Carrier handles import &amp; duties on our account.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center bg-[#ff4d00] text-xs font-black text-white">4</span>
                  <span className="font-black">Boxes land on your doorstep. Done.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
