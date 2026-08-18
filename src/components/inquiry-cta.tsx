"use client";

import Image from "next/image";
import { ArrowRight, Clock, Globe2, Warehouse } from "lucide-react";
import { useRequestQuote } from "@/components/request-quote-modal";
import { RequestSampleButton } from "@/components/request-sample-button";

export function InquiryCTA() {
  const { openQuote } = useRequestQuote();
  return (
    <section className="border-b-2 border-black bg-[#ff4d00] text-black">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="mb-4 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Get a quote
            </p>
            <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-black md:text-6xl">
              Tell us your product, quantity and deadline.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/85 md:text-xl">
              You will have a landed, duty-paid price within one business day.
              If your deadline is not achievable, we will say so in the same
              reply rather than take the order and manage the problem later.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openQuote({ label: "Home page / Inquiry CTA" })}
                className="group inline-flex items-center gap-2 bg-black px-7 py-4 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
              >
                Get a quote
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <RequestSampleButton
                className="inline-flex items-center gap-2 border-2 border-black bg-transparent px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-colors hover:bg-black hover:text-[#cc3d00]"
              >
                Request a sample kit
              </RequestSampleButton>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="relative aspect-[3/2] w-full overflow-hidden border-2 border-black bg-black/10">
              <Image
                src="/order-folder-desk.webp"
                alt="SublimApparel order folder on desk — single line-item quote with logo, pricing, shipping and duties"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <ul className="mt-4 space-y-3 border-2 border-black bg-black/15 p-5 text-sm font-bold text-black">
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
