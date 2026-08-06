import Link from "next/link";
import { ArrowRight, Clock, Globe2, Warehouse } from "lucide-react";

export function InquiryCTA() {
  return (
    <section className="border-b-2 border-black bg-[#ff4d00] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="mb-4 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Get a quote
            </p>
            <h2 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Tell us your product, quantity and deadline.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
              You will have a landed, duty-paid price within one business day.
              If your deadline is not achievable, we will say so in the same
              reply rather than take the order and manage the problem later.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/get-a-quote"
                className="group inline-flex items-center gap-2 bg-black px-7 py-4 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
              >
                Get a quote
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/get-a-quote"
                className="inline-flex items-center gap-2 border-2 border-white bg-transparent px-7 py-4 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
              >
                Request a sample kit
              </Link>
            </div>
          </div>

          <div className="md:col-span-4">
            <ul className="space-y-3 border-2 border-white bg-black/15 p-5 text-sm font-bold">
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-black" />
                <span>Reply within 1 business day</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe2 size={18} className="text-black" />
                <span>Team hours overlap US Pacific and UK</span>
              </li>
              <li className="flex items-center gap-3">
                <Warehouse size={18} className="text-black" />
                <span>Yiwu factory + Fontana, CA warehouse</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
