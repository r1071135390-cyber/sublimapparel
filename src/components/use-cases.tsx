"use client";

import Link from "next/link";
import {
  PartyPopper,
  Building2,
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
//
// 2026-11-17 (R137): trimmed from 7 cards to 3. The SEO plan's homepage
// internal-link architecture (plan lines 552-586) puts the five core
// commercial pages — Running / Marathon / Race / Summer Camp / Event
// T-Shirts — under a "Commercial Landing Pages" branch, and the new
// server-rendered SEO band in src/app/page.tsx now links exactly those
// five with the plan's recommended anchor texts (plan lines 2169-2175).
// Keeping all four overlapping cards here as well meant the homepage
// linked the same targets twice from two adjacent grids — diluted
// anchor signals and duplicated the visible use-case grid. The three
// cards below are the use-case pages that band does not cover, so every
// landing page still keeps exactly one homepage entry point.
//
// 2026-11-17 (R137): Running Shirts keeps its homepage entry via the
// SEO band (anchor "custom running shirts", target
// /products/running-shirts/) rather than a card here, because the band
// carries the plan's anchor text and the page is a catalog product
// page rather than a /[use-case]/ scenario page.
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
      slug: "corporate-event-apparel",
      title: "Corporate Event Apparel",
      desc: "Retreats, trade shows, church & wedding events",
      icon: Building2,
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
            From fundraiser walks to corporate retreats, from church groups to Greek life — pick your occasion, we&apos;ll handle the rest.
          </p>
        </div>

        {/* Use-cases grid: 3 cols desktop, 2 cols tablet, 1 col mobile.
            2026-11-17 (R137): 3 items, one full row on desktop. The five
            core commercial pages (Running / Marathon / Race / Summer Camp /
            Event T-Shirts) are linked by the server-rendered SEO band in
            src/app/page.tsx with the SEO plan's recommended anchor texts. */}
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