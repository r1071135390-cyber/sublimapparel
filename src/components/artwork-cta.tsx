"use client";

import Link from "next/link";
import { RequestQuoteLink } from "@/components/request-quote-link";
import { RequestSampleButton } from "@/components/request-sample-button";
import { ArrowRight } from "lucide-react";

export function ArtworkCTA() {
  return (
    <section className="border-y-2 border-black bg-[#0a0a0a] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:py-12">
        <h2 className="max-w-2xl text-3xl font-black leading-tight md:text-4xl">
          Send us your artwork. Get a landed, duty-paid quote within one
          business day.
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <RequestQuoteLink label="Site / Get a quote" className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black">Get a quote
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            /></RequestQuoteLink>
          <RequestSampleButton variant="outline-light" className="inline-flex items-center gap-2 border-2 border-white px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black">Request a sample kit</RequestSampleButton>
        </div>
      </div>
    </section>
  );
}
