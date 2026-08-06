import Link from "next/link";
import { ArrowRight, Shirt, Star } from "lucide-react";

// Core capability — visually elevated, full-width, dark background.
// Renumbered as "00" so the four supporting cards below stay 01-04.
const core = {
  number: "00",
  badge: "★ Our core",
  headline: [
    { text: "We sublimate apparel.", color: "white" as const },
    { text: "not only polyester,", color: "orange" as const },
    { text: "but also cotton.", color: "orange" as const },
  ],
  desc: (
    <>
      T-shirts, hoodies, racing, cycling, golf, tank tops, singlets, leggings, baby onesies — and everything in between. All-over print, cut-and-sew, named &amp; numbered per unit. From a 50-piece rush job to a 10,000-piece event run: this is where we started, and it&apos;s still what we do best.
    </>
  ),
  fabrics: [
    { name: "Polyester", note: "Standard" },
    { name: "100% Cotton", note: "Our specialty", highlight: true },
    { name: "Recycled", note: "rPET & organic" },
  ],
  products: [
    { name: "T-shirts", slug: "tshirts" },
    { name: "Hoodies", slug: "hoodies" },
    { name: "Racing", slug: "racing" },
    { name: "Cycling", slug: "cycling" },
    { name: "Golf", slug: "golf" },
    { name: "Tank tops", slug: "tank-tops" },
  ],
  stats: [
    { value: "50", label: "MOQ (pcs)" },
    { value: "15–25", label: "Days lead time" },
    { value: "100+", label: "Fabric options" },
    { value: "100%", label: "Cotton capable" },
  ],
};

const features = [
  {
    number: "01",
    title: "Any sublimatable product",
    headline: "Print on anything.",
    desc: "Apparel is our bread and butter — but we print on anything sublimation can handle. T-shirts, jerseys, hoodies, flags, banners, mousepads, mugs, phone cases, puzzles, cushions, throws, scarves, bags, hats… If it takes sublimation ink, we make it.",
    color: "bg-[#ff4d00]",
    tags: ["Apparel", "Home textile", "Hard goods", "Flags & banners"],
  },
  {
    number: "02",
    title: "Polyester AND 100% cotton",
    headline: "Most factories can't. We do.",
    desc: "Polyester sublimation is easy. But 100% cotton all-over print? That's a different beast — and most factories can't deliver it. We invested in the technology and the technique. The result: vibrant, soft-hand, all-over prints on real cotton.",
    color: "bg-[#00c2ff]",
    tags: ["Polyester", "100% Cotton", "Recycled fabric"],
  },
  {
    number: "03",
    title: "DDP worldwide from Yiwu",
    headline: "No customs. No duties. No headache.",
    desc: "Yiwu is China's small-commodity capital — one of the world's most connected logistics hubs. We ship DDP to 100+ countries — Delivered Duty Paid, door to door. Your team never deals with customs, tariffs, or import paperwork.",
    color: "bg-[#ff4d00]",
    tags: ["DDP to 100+ countries", "Customs cleared", "Door-to-door", "No paperwork"],
  },
  {
    number: "04",
    title: "Fontana warehouse for US domestic",
    headline: "US delivery in 2–5 days.",
    desc: "Need it fast in the States? We bulk-ship to our Fontana warehouse, then fulfill from there. No ocean transit, no customs — your order arrives at the US destination in 2–5 business days. Perfect for tight event deadlines and repeat POD orders.",
    color: "bg-[#00c2ff]",
    tags: ["Fontana warehouse", "US domestic", "2-5 day delivery", "POD ready"],
  },
];

export function Features() {
  return (
    <section className="border-b-2 border-black bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Section header */}
        <div className="mb-12 flex items-end justify-between border-b-2 border-black pb-6">
          <div>
            <div className="mb-2 text-xs font-black uppercase tracking-widest text-black/60">
              [ 002 / Capabilities ]
            </div>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tight text-black md:text-6xl">
              Why work with us?
            </h2>
          </div>
          <div className="hidden text-right text-xs font-bold uppercase tracking-widest text-black/60 md:block">
            1 core capability<br />+ 4 reasons to choose us.
          </div>
        </div>

        {/* HERO: core capability — full-width dark card */}
        <div className="mb-10 border-2 border-black bg-black p-6 text-white shadow-[8px_8px_0_0_#ff4d00] md:p-12">
          {/* Top row: badge + number */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-3 py-1.5 text-xs font-black uppercase tracking-widest text-white">
              <Star size={14} strokeWidth={3} fill="white" />
              {core.badge}
            </div>
            <div className="text-2xl font-black leading-none text-white/30 md:text-3xl">
              {core.number}
            </div>
          </div>

          {/* Headline */}
          <h3 className="mb-5 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            {core.headline.map((line, i) => (
              <span
                key={i}
                className={
                  "block " +
                  (line.color === "orange" ? "text-[#ff4d00]" : "text-white")
                }
              >
                {line.text}
              </span>
            ))}
          </h3>

          {/* Description */}
          <p className="mb-6 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
            {core.desc}
          </p>

          {/* Fabric capability chips — cotton highlighted as the differentiator */}
          <div className="mb-10 flex flex-wrap items-center gap-2 border-l-4 border-[#ff4d00] pl-4">
            <span className="mr-2 text-[10px] font-black uppercase tracking-widest text-white/50">
              Fabrics
            </span>
            {core.fabrics.map((f) => (
              <div
                key={f.name}
                className={
                  "inline-flex items-center gap-2 border-2 px-3 py-1.5 text-xs font-black uppercase tracking-tight transition-all " +
                  (f.highlight
                    ? "border-[#ff4d00] bg-[#ff4d00] text-white"
                    : "border-white/25 bg-white/[0.04] text-white/80 hover:border-white hover:text-white")
                }
              >
                <span>{f.name}</span>
                <span className={"text-[10px] font-medium tracking-wider " + (f.highlight ? "text-white/80" : "text-white/50")}>
                  {f.note}
                </span>
              </div>
            ))}
          </div>

          {/* Product sub-categories grid */}
          <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {core.products.map((p, idx) => (
              <div
                key={p.name}
                className="group flex items-center gap-3 border-2 border-white/15 bg-white/[0.04] p-3 transition-all hover:border-[#ff4d00] hover:bg-[#ff4d00]"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-2 border-white/30 bg-white/10 text-white transition-colors group-hover:border-white group-hover:bg-white group-hover:text-[#ff4d00]">
                  <span className="text-xs font-black">{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <span className="text-sm font-black uppercase tracking-tight">
                  {p.name}
                </span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="mb-8 grid grid-cols-2 gap-3 border-t-2 border-white/10 pt-8 md:grid-cols-4">
            {core.stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black leading-none text-[#ff4d00] md:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 text-[10px] font-black uppercase tracking-widest text-white/60 md:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 border-t-2 border-white/10 pt-8">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 border-2 border-white bg-[#ff4d00] px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1"
            >
              Start your apparel project
              <ArrowRight size={16} strokeWidth={3} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white/80 transition-colors hover:text-[#ff4d00]"
            >
              See all apparel options
              <ArrowRight size={16} strokeWidth={3} />
            </Link>
          </div>
        </div>

        {/* Other 4 capabilities in 2x2 grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.number}
              className={`group relative border-2 border-black bg-white p-6 md:p-8 ${
                i % 2 === 0 ? "md:rotate-[-1deg]" : "md:rotate-[1deg]"
              } transition-transform hover:rotate-0 hover:shadow-[8px_8px_0_0_#000]`}
            >
              {/* Number badge */}
              <div
                className={`absolute -top-5 -left-3 ${f.color} border-2 border-black px-3 py-1 text-sm font-black text-white`}
              >
                {f.number}
              </div>

              {/* Subtitle */}
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-black/60">
                {f.title}
              </div>

              {/* Headline */}
              <h3 className="mb-4 text-3xl font-black leading-tight text-black md:text-4xl">
                {f.headline}
              </h3>

              {/* Description */}
              <p className="mb-6 text-base leading-relaxed text-black/70">{f.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {f.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-2 border-black bg-[#faf9f6] px-3 py-1 text-xs font-bold text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
