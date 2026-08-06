"use client";

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
} from "lucide-react";

export function Industries() {
  const industries = [
    {
      title: "Events & Conferences",
      icon: CalendarDays,
      products: "Staff & volunteer tees, lanyards, table throws, step-and-repeat backdrops, feather flags",
      pitch: "Your date does not move. Our Fontana warehouse stock absorbs the headcount that changes in the final fortnight.",
    },
    {
      title: "Promotional Products Distributors",
      icon: Megaphone,
      products: "Apparel, bags, towels, blankets, flags, table covers, lanyards",
      pitch: "Landed duty-paid pricing protects your margin; blind drop-ship from LA protects your client relationship.",
    },
    {
      title: "Sports Teams & Leagues",
      icon: Trophy,
      products: "Sublimated jerseys, shorts, warm-ups, singlets, socks, sideline banners",
      pitch: "Cut-and-sew patterns that fit, named and numbered per unit, delivered before the season opens.",
    },
    {
      title: "Music, Tour & Festival Merch",
      icon: Music2,
      products: "All-over-print tees and hoodies, bandanas, tote bags, stage backdrops",
      pitch: "Full-bleed printing on 100% cotton — merch your fans will actually want to wear.",
    },
    {
      title: "Trade Show & Display",
      icon: Presentation,
      products: "SEG tension fabric, backdrop walls, table throws, counter covers, tent walls",
      pitch: "Silicone edge is a sewing operation. We sew, so we can make it — and DDP handles the bulky freight.",
    },
    {
      title: "Corporate & Employee Programs",
      icon: Briefcase,
      products: "Uniforms, polos, onboarding kits, conference apparel, branded gifting",
      pitch: "Finance gets a fixed landed cost; multi-site restocks pull from our LA warehouse.",
    },
    {
      title: "Apparel Brands & Agencies",
      icon: Shirt,
      products: "Custom cut-and-sew, all-over-print apparel, private-label packaging",
      pitch: "Your pattern, your labels, your packaging. Cotton included.",
    },
    {
      title: "Schools, Universities & Greek Life",
      icon: GraduationCap,
      products: "Rush shirts, bid day tees, game-day and alumni apparel, dorm goods",
      pitch: "Campus orders are cotton orders, and they are always urgent. We cover both.",
    },
    {
      title: "Political Campaigns",
      icon: Flag,
      products: "Rally tees, fabric banners, hand-held flags, canvasser vests, hats, rally towels",
      pitch: "Our LA warehouse turns a five-day requirement into a domestic shipment.",
    },
    {
      title: "Breweries, Coffee & Hospitality",
      icon: Coffee,
      products: "Merch tees and hoodies, aprons, bar towels, patio covers, tap-room banners",
      pitch: "Cotton merch, staff wear, and soft signage from one supplier — landed duty paid.",
    },
    {
      title: "Endurance & Race Events",
      icon: Bike,
      products: "Finisher tees in cotton and technical, race shirts, cycling kits, route banners",
      pitch: "Final numbers land two weeks out. LA stock absorbs the difference.",
    },
    {
      title: "E-commerce & Fulfillment",
      icon: ShoppingBag,
      products: "Blankets, pillow covers, towels, tapestries, pet goods, aprons, tote bags",
      pitch: "DDP removes the import problem; LA warehouse covers domestic replenishment.",
    },
  ];

  return (
    <section className="border-b-2 border-black bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12 border-b-2 border-black pb-6">
          <div className="mb-2 text-xs font-black uppercase tracking-widest">
            [ 006 / Industries We Serve ]
          </div>
          <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
            Who we work<br />
            <span className="italic text-[#ff4d00]">with.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base font-bold leading-relaxed md:text-lg">
            From marathon organizers to wedding parties, from streetwear brands to political campaigns — if you need vibrant custom printing, we&apos;ve probably already done it.
          </p>
        </div>

        {/* Industries grid: 3 columns × 4 rows on desktop, 2 cols on tablet, 1 on mobile */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.title}
                className="group flex flex-col border-2 border-black bg-white p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#ff4d00]"
              >
                {/* Icon + title */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center border-2 border-black bg-[#ff4d00] text-white transition-colors group-hover:bg-black">
                    <Icon size={22} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-black uppercase leading-tight tracking-tight">
                    {ind.title}
                  </h3>
                </div>

                {/* Products */}
                <p className="mb-4 text-sm font-medium leading-relaxed text-black/75">
                  {ind.products}
                </p>

                {/* Value pitch (the orange-bordered highlight) */}
                <div className="mt-auto border-l-4 border-[#ff4d00] bg-[#fff7f0] px-3 py-2.5 text-sm font-bold leading-relaxed text-black">
                  {ind.pitch}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <div className="mt-10 border-2 border-black bg-black p-6 text-center text-white md:p-8">
          <div className="text-xs font-black uppercase tracking-widest text-[#00c2ff]">
            Not on the list?
          </div>
          <div className="mt-2 text-2xl font-black uppercase leading-tight md:text-3xl">
            If it can be sublimated, we can print it.
          </div>
          <div className="mt-3 text-sm font-bold text-white/70">
            Tell us what you need. We&apos;ll figure it out.
          </div>
        </div>
      </div>
    </section>
  );
}
