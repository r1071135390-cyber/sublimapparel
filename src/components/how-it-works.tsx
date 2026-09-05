"use client";

import Link from "next/link";
import { RequestQuoteLink } from "@/components/request-quote-link";
import { ArrowRight, Layers, Brush, Calculator, Truck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Layers,
    title: "Pick",
    headline: "Choose template or upload art.",
    desc: "Start from one of our 200+ apparel templates, or send us your own artwork in any format — AI, PSD, PDF, PNG, JPG, even a hand sketch. We accept it.",
    bullets: ["200+ templates", "All file formats", "Free artwork check"],
  },
  {
    num: "02",
    icon: Brush,
    title: "Customize",
    headline: "We mock it up. You approve it.",
    desc: "Our designers place your art on the actual garment, adjust colors for fabric, and send back a 3D mockup with measurements. You review, request edits, and lock the design.",
    bullets: ["Free 3D mockup", "Unlimited revisions", "Soft-proof for cotton"],
  },
  {
    num: "03",
    icon: Calculator,
    title: "Quote",
    headline: "Landed, duty-paid price.",
    desc: "You get a single line item — unit price + shipping + duties — no hidden fees, no surprise add-ons. We confirm in writing. No setup fee, no screen charge.",
    bullets: ["DDP price", "No setup fee", "Reply in 1 business day"],
  },
  {
    num: "04",
    icon: Truck,
    title: "Receive",
    headline: "7–15 days to your door.",
    desc: "Production in our Yiwu factory. QC at every step. Air, sea, or express — you choose. We handle customs, duties, and last-mile for 100+ countries.",
    bullets: ["Production 7–15 days", "DDP to 100+ countries", "US domestic 2–5 days"],
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-b-2 border-black bg-[#0a0a0a] text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        {/* Section header */}
        <div className="mb-12 flex items-end justify-between border-b border-white/15 pb-6 md:mb-16">
          <div>
            <div className="mb-2 text-xs font-black uppercase tracking-widest text-white/80">
              [ 006 / How it works ]
            </div>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
              From artwork to door.
              <br />
              <span className="text-[#cc3d00]">Four steps.</span>
            </h2>
          </div>
          <div className="hidden text-right text-xs font-bold uppercase tracking-widest text-white/80 md:block">
            <div>Average lead time</div>
            <div className="mt-1 text-3xl font-black text-white">7–15 days</div>
          </div>
        </div>

        {/* 4-step grid */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="group relative flex flex-col border-2 border-white/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#ff4d00] hover:bg-white/10"
              >
                {/* Top row: number + icon */}
                <div className="mb-6 flex items-start justify-between">
                  <span className="font-black text-[#cc3d00] text-6xl leading-none md:text-7xl">
                    {s.num}
                  </span>
                  <Icon className="h-7 w-7 text-white/80 transition-colors group-hover:text-[#cc3d00]" strokeWidth={1.5} />
                </div>

                {/* Step name */}
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                  Step {s.num} · {s.title}
                </div>

                {/* Headline */}
                <h3 className="mb-3 text-2xl font-black leading-tight md:text-3xl">
                  {s.headline}
                </h3>

                {/* Description */}
                <p className="mb-5 text-sm leading-relaxed text-white/75">
                  {s.desc}
                </p>

                {/* Bullets */}
                <ul className="mt-auto space-y-1.5 border-t border-white/10 pt-4">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white/70"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#ff4d00]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Connector line on desktop between steps */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 md:mt-14">
          <p className="max-w-2xl text-sm text-white/70">
            <span className="font-bold text-white">No setup fee.</span>{" "}
            <span className="font-bold text-white">No minimum reprints.</span>{" "}
            Production starts after artwork approval and deposit — typically within 1–3
            business days.
          </p>
          <RequestQuoteLink label="Site / Get a quote" className="group inline-flex items-center gap-2 rounded-sm border-2 border-[#ff4d00] bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wider text-black shadow-[4px_4px_0_0_#ffffff] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#e64500] hover:shadow-[2px_2px_0_0_#ffffff]">Start your project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></RequestQuoteLink>
        </div>
      </div>
    </section>
  );
}
