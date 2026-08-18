import Link from "next/link";
import { RequestQuoteLink } from "@/components/request-quote-link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const fabrics = [
  { name: "POLYESTER", note: "Standard", href: "/fabric/polyester" },
  { name: "100% COTTON", note: "Our specialty", highlight: true, href: "/fabric/cotton" },
  { name: "RECYCLED", note: "rPET & organic", href: "/fabric/cotton" },
];

const categories = [
  { num: "01", name: "T-shirts", href: "/tag/category/t-shirt/" },
  { num: "02", name: "Hoodies", href: "/tag/category/hoodie/" },
  { num: "03", name: "Polos", href: "/tag/category/polo-shirt/" },
  { num: "04", name: "Sportswear", href: "/tag/category/sportswear/" },
  { num: "05", name: "Cycling", href: "/tag/sport/cycling/" },
  { num: "06", name: "Soccer", href: "/tag/sport/soccer/" },
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
      className="relative overflow-hidden bg-[#0a0a0a] text-white"
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
            fetchPriority="high"
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

      <div className="relative mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10 lg:py-14">
        {/* Top label */}
        <div className="mb-2 flex items-center gap-3 md:mb-4">
          <span className="inline-flex h-6 items-center rounded-sm border border-white/30 bg-white/10 px-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm md:h-7 md:px-3 md:text-xs">
            Yiwu factory · LA warehouse
          </span>
        </div>

        {/* Status line */}
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/70 md:mb-6 md:text-sm">
          <span>
            <span className="font-bold text-white">DDP to 100+ countries</span>
            <span className="mx-2 text-white/40">·</span>
            <span>US domestic in 2–5 days</span>
            <span className="mx-2 text-white/40">·</span>
            <span>Replies within 1 business day</span>
          </span>
        </div>

        {/* Headline — 3 lines, flat / full width */}
        <h1 className="mb-4 max-w-4xl whitespace-nowrap text-2xl font-black leading-[1.22] tracking-tight md:mb-5 md:text-4xl lg:text-5xl xl:text-6xl">
          <span className="block pb-2 text-white md:pb-2.5">Yiwu custom sublimate apparel factory</span>
          <span className="block pb-2 text-[#ff4d00] md:pb-2.5">
            <Link href="/fabric/polyester" className="hover:underline hover:underline-offset-4">polyester sublimation</Link> &amp;
          </span>
          <span className="block pb-2 text-[#ff4d00] md:pb-2.5">
            <Link href="/fabric/cotton" className="hover:underline hover:underline-offset-4">allover digital print cotton</Link>.
          </span>
        </h1>

        {/* Subhead */}
        <p className="mb-4 max-w-2xl text-sm text-white/80 md:mb-5 md:text-lg">
          <Link href="/tag/category/t-shirt/" className="font-semibold text-white underline-offset-4 hover:text-[#ff4d00] hover:underline">T-shirts</Link>,{" "}
          <Link href="/tag/category/hoodie/" className="font-semibold text-white underline-offset-4 hover:text-[#ff4d00] hover:underline">hoodies</Link>,{" "}
          <Link href="/tag/category/polo-shirt/" className="font-semibold text-white underline-offset-4 hover:text-[#ff4d00] hover:underline">polo shirts</Link>,{" "}
          <Link href="/tag/category/sweatshirt/" className="font-semibold text-white underline-offset-4 hover:text-[#ff4d00] hover:underline">sweatshirts</Link>,{" "}
          <Link href="/tag/category/tank-top-and-camis/" className="font-semibold text-white underline-offset-4 hover:text-[#ff4d00] hover:underline">tank tops</Link>,{" "}
          <Link href="/tag/sport/cycling/" className="font-semibold text-white underline-offset-4 hover:text-[#ff4d00] hover:underline">cycling kits</Link>,{" "}
          <Link href="/tag/sport/soccer/" className="font-semibold text-white underline-offset-4 hover:text-[#ff4d00] hover:underline">soccer</Link>,{" "}
          <Link href="/tag/sport/basketball/" className="font-semibold text-white underline-offset-4 hover:text-[#ff4d00] hover:underline">basketball</Link>,{" "}
          <Link href="/tag/sport/esports/" className="font-semibold text-white underline-offset-4 hover:text-[#ff4d00] hover:underline">esports</Link>
          {" "}&mdash; full sublimation on{" "}
          <Link href="/fabric/polyester" className="font-semibold text-white underline-offset-4 hover:text-[#ff4d00] hover:underline">polyester</Link>{" "}
          and{" "}
          <Link href="/fabric/cotton" className="font-semibold text-white underline-offset-4 hover:text-[#ff4d00] hover:underline">allover digital print on 100% cotton</Link>.
          From a 50-piece rush job to a 10,000-piece event run. This is where we
          started, and it&rsquo;s still what we do best.
        </p>

        {/* Answer capsule — for AI engines + skim readers (ChatGPT AEO/GEO) */}
        <p className="mb-4 max-w-2xl rounded border-l-4 border-[#ff4d00] bg-white/5 px-4 py-3 text-sm text-white/90 md:mb-5 md:text-base">
          <strong>What you get:</strong> custom sublimated apparel, MOQ 50 pcs (DTG/DTF) or 100 pcs (sublimation cut &amp; sew), 30-day production, DDP shipping to 100+ countries, US warehouse in Fontana CA. 12 production lines in Yiwu since 2018.
        </p>

        {/* FABRICS bar */}
        <div className="mb-2 flex flex-wrap items-center gap-2.5 md:mb-3 md:gap-4">
          <span className="border-l-4 border-[#ff4d00] pl-3 text-xs font-black uppercase tracking-widest text-white">
            Fabrics
          </span>
          {fabrics.map((f) => (
            <Link
              key={f.name}
              href={f.href}
              className={
                f.highlight
                  ? "rounded-sm border border-[#ff4d00] bg-[#ff4d00] px-2.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-black shadow-[3px_3px_0_0_rgba(255,255,255,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.45)] md:px-3 md:text-xs"
                  : "rounded-sm border border-white/25 bg-white/5 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#ff4d00] hover:bg-[#ff4d00]/20 md:px-3 md:text-xs"
              }
            >
              {f.name}{" "}
              <span className="ml-1 font-medium normal-case opacity-80">
                {f.note}
              </span>
            </Link>
          ))}
        </div>

        {/* 6 apparel category chips */}
        <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:mb-5 md:flex md:flex-wrap md:gap-3">
          {categories.map((c) => (
            <Link
              key={c.num}
              href={c.href}
              className="inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/5 px-2.5 py-2 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#ff4d00] hover:bg-[#ff4d00]/20 md:px-3 md:text-sm"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm border border-white/30 bg-white/10 text-[10px] font-black">
                {c.num}
              </span>
              {c.name}
            </Link>
          ))}
        </div>

        {/* Stats row */}
        <div className="mb-4 grid grid-cols-2 gap-x-6 gap-y-4 py-4 md:mb-5 md:grid-cols-4 md:gap-x-8 md:py-5">
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
        <div className="mb-4 flex flex-col gap-3 sm:flex-row md:mb-5">
          <RequestQuoteLink
            label="Home hero / Get a quote"
            className="group inline-flex items-center justify-center gap-2 rounded-sm border-2 border-[#ff4d00] bg-[#ff4d00] px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-[4px_4px_0_0_#ffffff] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#e64500] hover:shadow-[2px_2px_0_0_#ffffff] md:px-8 md:py-4 md:text-base"
          >
            Get a quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5" />
          </RequestQuoteLink>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white bg-transparent px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-white hover:text-[#0a0a0a] md:px-8 md:py-4 md:text-base"
          >
            See all apparel
          </Link>
        </div>

        {/* "We don't stop at apparel" — link to full product range */}
        <div className="pt-2 md:pt-3">
          <Link
            href="/products/"
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
