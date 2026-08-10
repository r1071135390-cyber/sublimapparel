import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const fabrics = [
  { name: "POLYESTER", note: "Standard" },
  { name: "100% COTTON", note: "Our specialty", highlight: true },
  { name: "RECYCLED", note: "rPET & organic" },
];

const categories = [
  { num: "01", name: "T-shirts" },
  { num: "02", name: "Hoodies" },
  { num: "03", name: "Jerseys" },
  { num: "04", name: "Racing" },
  { num: "05", name: "Cycling" },
  { num: "06", name: "Golf / Bowling" },
];

const stats = [
  { num: "50", label: "MOQ (pcs)", color: "text-[#ff4d00]" },
  { num: "15–25", label: "Days lead time", color: "text-white" },
  { num: "0", label: "Setup fee", color: "text-[#ff4d00]" },
  { num: "100%", label: "Cotton capable", color: "text-white" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b-2 border-black bg-[#0a0a0a] text-white"
    >
      {/* Desktop background image (full bleed) — hidden on mobile */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/factory-floor.webp"
          alt="Row of sublimation printers in Yiwu factory — 24/7 production lines"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-90 brightness-110"
        />
        {/* Brighter gradient mask — image clearly visible, text still readable */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.18) 100%)",
          }}
        />
      </div>

      {/* Mobile hero image — vivid sublimated jersey (no overlay, max impact) */}
      <div className="relative block w-full lg:hidden">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/hero-jersey.webp"
            alt="Vivid full-sublimation jersey"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-105"
          />
          {/* Subtle bottom-to-top darken so it joins the dark section seamlessly */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-16"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,1) 100%)",
            }}
          />
        </div>
        {/* Tiny caption strip — anchors the image as "our factory" */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white drop-shadow">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-black/55 px-2 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d00]" />
            Our Yiwu factory
          </span>
          <span className="rounded-sm bg-black/55 px-2 py-1 backdrop-blur-sm">
            12 lines · 24/7
          </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-20 lg:py-28">
        {/* Top label */}
        <div className="mb-5 flex items-center gap-3 md:mb-8">
          <span className="inline-flex h-6 items-center rounded-sm border border-white/30 bg-white/10 px-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm md:h-7 md:px-3 md:text-xs">
            Yiwu factory · LA warehouse
          </span>
        </div>

        {/* Status line */}
        <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/70 md:mb-14 md:text-sm">
          <span>
            <span className="font-bold text-white">DDP to 100+ countries</span>
            <span className="mx-2 text-white/40">·</span>
            <span>US domestic in 2–5 days</span>
            <span className="mx-2 text-white/40">·</span>
            <span>Replies within 1 business day</span>
          </span>
        </div>

        {/* Headline — 3 lines, flat / full width */}
        <h1 className="mb-7 max-w-4xl text-4xl font-black leading-[0.95] tracking-tight md:mb-10 md:text-7xl lg:text-[88px]">
          <span className="block whitespace-nowrap text-white">We sublimate apparel.</span>
          <span className="block text-[#ff4d00]">not only polyester,</span>
          <span className="block text-[#ff4d00]">but also cotton.</span>
        </h1>

        {/* Subhead */}
        <p className="mb-8 max-w-2xl text-sm text-white/80 md:mb-12 md:text-lg">
          T-shirts, hoodies, jerseys, racing kits, cycling kits, golf, bowling, esports
          &mdash; full sublimation on polyester and 100% cotton. From a 50-piece
          rush job to a 10,000-piece event run. This is where we started, and
          it&rsquo;s still what we do best.
        </p>

        {/* FABRICS bar */}
        <div className="mb-5 flex flex-wrap items-center gap-2.5 md:mb-8 md:gap-4">
          <span className="border-l-4 border-[#ff4d00] pl-3 text-xs font-black uppercase tracking-widest text-white">
            Fabrics
          </span>
          {fabrics.map((f) => (
            <span
              key={f.name}
              className={
                f.highlight
                  ? "rounded-sm border border-[#ff4d00] bg-[#ff4d00] px-2.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-white shadow-[3px_3px_0_0_rgba(255,255,255,0.25)] md:px-3 md:text-xs"
                  : "rounded-sm border border-white/25 bg-white/5 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm md:px-3 md:text-xs"
              }
            >
              {f.name}{" "}
              <span className="ml-1 font-medium normal-case opacity-80">
                {f.note}
              </span>
            </span>
          ))}
        </div>

        {/* 6 apparel category chips */}
        <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:mb-12 md:flex md:flex-wrap md:gap-3">
          {categories.map((c) => (
            <span
              key={c.num}
              className="inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/5 px-2.5 py-2 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm md:px-3 md:text-sm"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm border border-white/30 bg-white/10 text-[10px] font-black">
                {c.num}
              </span>
              {c.name}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-white/15 py-6 md:mb-12 md:grid-cols-4 md:gap-x-8 md:py-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className={"text-3xl font-black leading-none md:text-5xl " + s.color}>
                {s.num}
              </div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 md:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row md:mb-12">
          <Link
            href="/get-a-quote"
            className="group inline-flex items-center justify-center gap-2 rounded-sm border-2 border-[#ff4d00] bg-[#ff4d00] px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-[4px_4px_0_0_#ffffff] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#e64500] hover:shadow-[2px_2px_0_0_#ffffff] md:px-8 md:py-4 md:text-base"
          >
            Get a quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white bg-transparent px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-white hover:text-[#0a0a0a] md:px-8 md:py-4 md:text-base"
          >
            See all apparel
          </Link>
        </div>

        {/* "We don't stop at apparel" — desktop + mobile (text only, image carries the visual on mobile) */}
        <div className="border-t border-white/15 pt-5 md:pt-8">
          <Link
            href="#capabilities"
            className="group inline-flex items-center gap-3 text-xs text-white/80 transition-colors hover:text-[#ff4d00] md:text-sm"
          >
            <span className="font-bold uppercase tracking-[0.18em]">
              And we don&rsquo;t stop at apparel
            </span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition-all group-hover:border-[#ff4d00] group-hover:bg-[#ff4d00]">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
