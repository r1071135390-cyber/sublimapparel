"use client";

import Link from "next/link";
import {
  PartyPopper,
  Shirt,
  Tent,
  Building2,
  Flag,
  Medal,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// 2026-09-15 (R69): New homepage "By Use Case" section that gives
// every one of the 7 R69 scenario / use-case landing pages a direct
// homepage entry point. The navbar Solutions dropdown also links to
// these pages (so every page surface carries an internal link), but
// a dedicated homepage section makes the new pages visible above
// the fold for human visitors and gives Googlebot a confirmed
// first-page link target with matching anchor text — strengthening
// the topical-relevance signal for the buyer-intent keywords each
// page targets (wedding, church, fundraiser, fraternity, sorority,
// camp, marathon).
//
// Distinct from the Industries section above it, which links to the
// 12 /industries/* vertical pages (broad B2B buyer profiles). This
// section links to the 7 /[use-case]/ pages (narrow buyer-intent
// landing pages with their own keyword focus).
export function UseCases() {
  const useCases = [
    {
      slug: "event-apparel",
      title: "Event Apparel",
      desc: "Fundraiser, charity, community & awareness walk shirts",
      icon: PartyPopper,
      accent: "orange",
    },
    {
      slug: "custom-event-t-shirts",
      title: "Custom Event T-Shirts",
      desc: "Wedding party, family reunion, event-day tees",
      icon: Shirt,
      accent: "cyan",
    },
    {
      slug: "summer-camp-shirts",
      title: "Summer Camp Shirts",
      desc: "Camp counselor, staff, color-coded group shirts",
      icon: Tent,
      accent: "orange",
    },
    {
      slug: "corporate-event-apparel",
      title: "Corporate Event Apparel",
      desc: "Retreats, trade shows, church & wedding events",
      icon: Building2,
      accent: "cyan",
    },
    {
      slug: "race-shirts",
      title: "Race Shirts",
      desc: "5K, 10K, fun runs, charity races, club kits",
      icon: Flag,
      accent: "orange",
    },
    {
      slug: "marathon-shirts",
      title: "Marathon Shirts",
      desc: "Marathon, half-marathon, ultra finisher tees",
      icon: Medal,
      accent: "cyan",
    },
    {
      slug: "private-label-sportswear",
      title: "Private Label Sportswear",
      desc: "Fraternity, sorority, Greek life, esports brands",
      icon: Sparkles,
      accent: "orange",
    },
  ];

  return (
    <section className="border-b-2 border-black bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        {/* Header */}
        <div className="mb-10 border-b-2 border-white/20 pb-6">
          <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
            [ 010 / By Use Case ]
          </div>
          <h2 className="text-4xl font-black uppercase leading-none tracking-tight text-white md:text-5xl">
            Made for<br />
            <span className="italic text-[#00c2ff]">your occasion.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base font-bold leading-relaxed text-white/80 md:text-lg">
            From wedding parties to marathon finishers, from Greek rush week to summer camp color groups — pick your occasion, we&apos;ll handle the rest.
          </p>
        </div>

        {/* Use-cases grid: 3 cols desktop, 2 cols tablet, 1 col mobile.
            7 items split: 3 + 3 + 1 (last one centers on its own row). */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            const accentClass =
              uc.accent === "orange"
                ? "border-[#ff4d00] hover:shadow-[6px_6px_0_0_#ff4d00]"
                : "border-[#00c2ff] hover:shadow-[6px_6px_0_0_#00c2ff]";
            const iconBgClass =
              uc.accent === "orange"
                ? "bg-[#ff4d00] group-hover:bg-black"
                : "bg-[#00c2ff] group-hover:bg-black";
            return (
              <Link
                key={uc.slug}
                href={`/${uc.slug}/`}
                className={`group flex items-start gap-4 border-2 ${accentClass} bg-white p-5 transition-all hover:-translate-x-1 hover:-translate-y-1`}
              >
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center border-2 border-black ${iconBgClass} text-black transition-colors`}
                >
                  <Icon size={22} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-black uppercase leading-tight tracking-tight text-black">
                    {uc.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-black/75">
                    {uc.desc}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#cc3d00] transition-transform group-hover:translate-x-1">
                    See use case
                    <ArrowRight size={14} strokeWidth={3} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}