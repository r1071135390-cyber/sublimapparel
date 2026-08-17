import type { Metadata } from "next";
import Link from "next/link";
import { RequestQuoteLink } from "@/components/request-quote-link";
import {
  CalendarDays,
  Megaphone,
  Trophy,
  Music2,
  Presentation,
  Briefcase,
  Shirt,
  GraduationCap,
  Flag,
  Coffee,
  Bike,
  ShoppingBag,
  ArrowRight,
  Camera,
} from "lucide-react";
import { industries } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Case Studies ",
  description:
    "Browse sublimation printing case studies by industry. See real examples of custom apparel, DDP shipping and full-bleed cotton prints we've produced for events, sports, brands, campaigns and more.",
};

const iconMap: Record<string, typeof CalendarDays> = {
  CalendarDays,
  Megaphone,
  Trophy,
  Music2,
  Presentation,
  Briefcase,
  Shirt,
  GraduationCap,
  Flag,
  Coffee,
  Bike,
  ShoppingBag,
};

export default function CasesPage() {
  return (
    <>
      {/* Top utility bar */}
      <div className="border-b-2 border-black bg-black text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>Global DDP shipping</span>
            <span className="text-[#00c2ff]">·</span>
            <span>US stock in Fontana, CA</span>
            <span className="text-[#00c2ff]">·</span>
            <span>MOQ from 50 pcs</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>WhatsApp · +86 198 1793 0190</span>
            <span className="text-[#00c2ff]">·</span>
            <span>Replies within 1 business day</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
            [ Case Studies ]
          </div>
          <h1 className="mb-6 text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">
            See what we&apos;ve<br />
            <span className="italic text-[#ff4d00]">made.</span>
          </h1>
          <p className="max-w-2xl text-lg font-bold leading-relaxed md:text-xl">
            A growing gallery of real sublimation prints produced for events, sports, brands, campaigns and more. Browse by industry — every project is a working example of full-bleed colour, cut-and-sew construction and DDP delivery.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <RequestQuoteLink label="Cases / page / Get a quote" className="inline-flex items-center gap-2 border-2 border-black bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-black hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1">Start your project
              <ArrowRight size={16} strokeWidth={3} /></RequestQuoteLink>
            <a
              href="https://wa.me/8619817930190"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-wider transition-all hover:bg-black hover:text-white"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Industry grid */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-10 flex items-end justify-between border-b-2 border-black pb-4">
            <h2 className="text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
              Browse by industry
            </h2>
            <div className="text-xs font-black uppercase tracking-widest text-black/60">
              {industries.length} categories
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => {
              const Icon = iconMap[ind.icon] ?? Camera;
              return (
                <Link
                  key={ind.slug}
                  href={`/cases/${ind.slug}`}
                  className="group flex items-center justify-between border-2 border-black bg-white p-5 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:bg-[#ff4d00] hover:text-white hover:shadow-[6px_6px_0_0_#000]"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={24} strokeWidth={2.5} />
                    <span className="text-base font-black uppercase leading-tight">
                      {ind.title}
                    </span>
                  </div>
                  <ArrowRight
                    size={20}
                    strokeWidth={3}
                    className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-b-2 border-black bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
            [ Your project next? ]
          </div>
          <h2 className="mx-auto mb-6 max-w-3xl text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
            Add your story to the gallery.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base font-bold leading-relaxed text-white/80 md:text-lg">
            Send us your artwork, quantity and delivery deadline. We&apos;ll send a free mockup and a landed, duty-paid quote within 1 business day.
          </p>
          <RequestQuoteLink label="Cases / page / Get a quote" className="inline-flex items-center gap-2 border-2 border-white bg-[#ff4d00] px-8 py-4 text-base font-black uppercase tracking-wider transition-all hover:bg-white hover:text-black hover:shadow-[6px_6px_0_0_#00c2ff] hover:-translate-x-1 hover:-translate-y-1">Get a quote
            <ArrowRight size={18} strokeWidth={3} /></RequestQuoteLink>
        </div>
      </section>
    </>
  );
}
