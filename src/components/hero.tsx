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
  { num: "15–25", label: "Days lead time", color: "text-black" },
  { num: "100+", label: "Fabric options", color: "text-black" },
  { num: "100%", label: "Cotton capable", color: "text-[#ff4d00]" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-black bg-[#faf9f6]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-12 md:gap-12 md:px-8 md:py-20 lg:py-24">
        {/* Left: copy */}
        <div className="md:col-span-7">
          {/* Top badge row */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 border-2 border-black bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
              ★ Our core
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-black/60">
              Yiwu factory · LA warehouse
            </span>
          </div>

          {/* Status line */}
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-wider text-black/70">
            <span>DDP to 100+ countries</span>
            <span className="text-black/30">·</span>
            <span>US domestic in 2–5 days</span>
            <span className="text-black/30">·</span>
            <span>Reply within 1 business day</span>
          </div>

          {/* Big 3-line headline */}
          <h1 className="mb-8 text-5xl font-black leading-[0.95] tracking-tight text-black md:text-6xl lg:text-7xl">
            <span className="block">We sublimate apparel.</span>
            <span className="block text-[#ff4d00]">not only polyester,</span>
            <span className="block text-[#ff4d00]">but also cotton.</span>
          </h1>

          {/* Subhead */}
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-black/75 md:text-xl">
            T-shirts, hoodies, jerseys, racing kits, cycling kits, golf / bowling — full sublimation on{" "}
            <span className="font-bold text-black">polyester and 100% cotton</span>. From a 50-piece rush job to a 10,000-piece event run: this is where we started, and it&apos;s still what we do best.
          </p>

          {/* FABRICS bar */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="mr-2 inline-flex items-center border-l-4 border-[#ff4d00] pl-2 text-xs font-black uppercase tracking-wider text-black">
              Fabrics
            </span>
            {fabrics.map((f) => (
              <span
                key={f.name}
                className={
                  f.highlight
                    ? "inline-flex items-center gap-1.5 border-2 border-[#ff4d00] bg-[#ff4d00] px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white"
                    : "inline-flex items-center gap-1.5 border-2 border-black bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-black"
                }
              >
                <span>{f.name}</span>
                <span className={f.highlight ? "text-white/80" : "text-black/50"}>
                  {f.note}
                </span>
              </span>
            ))}
          </div>

          {/* 6 apparel category chips */}
          <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
            {categories.map((c) => (
              <Link
                key={c.num}
                href="/products"
                className="group flex items-center gap-2 border-2 border-black bg-white px-3 py-2.5 text-xs font-black uppercase tracking-wider text-black transition-all hover:bg-[#ff4d00] hover:text-white"
              >
                <span className="font-black text-black/40 group-hover:text-white/60">
                  {c.num}
                </span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <Link
              href="/get-a-quote"
              className="group inline-flex items-center gap-2 border-2 border-black bg-[#ff4d00] px-8 py-5 text-base font-black uppercase tracking-wider text-white transition-all hover:bg-black"
            >
              Get a quote
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 border-2 border-black bg-white px-8 py-5 text-base font-black uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white"
            >
              See all apparel options
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 4 stats */}
          <div className="grid max-w-xl grid-cols-2 gap-6 border-t-2 border-black pt-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className={`text-3xl font-black ${s.color}`}>{s.num}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-black/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image collage */}
        <div className="relative md:col-span-5">
          <div className="relative aspect-[5/4] w-full overflow-hidden bg-[#f5f1e8]">
            <Image
              src="/hero-products.jpg"
              alt="Full range of custom sublimation printed apparel — T-shirts, hoodies, jerseys, racing kits, cycling kits and golf polos in vibrant full-bleed designs"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          {/* Image caption */}
          <div className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/60">
            <span className="inline-block h-1.5 w-1.5 bg-[#ff4d00]" />
            <span>50+ sample SKUs in the grid above</span>
          </div>
        </div>
      </div>

      {/* Bottom hook — transition to next section */}
      <div className="border-t-2 border-black bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 md:flex-row md:px-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-wider text-black">
              And we don&apos;t stop at apparel →
            </span>
            <span className="text-xs font-bold text-black/60">
              Flags, banners, mugs, mousepads, phone cases, pillows and more
            </span>
          </div>
          <Link
            href="#capabilities"
            className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white"
          >
            See what else
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
