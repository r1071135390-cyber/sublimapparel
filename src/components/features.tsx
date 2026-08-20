import Link from "next/link";
import { ArrowRight, Shirt } from "lucide-react";

const features = [
  {
    number: "01",
    title: "B2B sublimation, decoded",
    headline: "8 years. 1,000+ briefs. One playbook.",
    desc: "Sports teams, race events, festivals, schools, breweries, trade shows, apparel brands, e-commerce — we've printed for all of them, repeatedly. We know which designs print well, which fabrics survive 50 wash cycles, and which deadlines are actually realistic. Tell us the problem; we'll bring the playbook.",
    color: "bg-[#ff4d00]",
    tags: ["8 years B2B", "12+ industries", "1,000+ briefs solved", "Brief-first approach"],
    href: "/industries",
  },
  {
    number: "02",
    title: "Polyester AND 100% cotton",
    headline: "Most factories can't. We do.",
    desc: "Polyester sublimation is easy. But 100% cotton all-over print? That's a different beast — and most factories can't deliver it. We invested in the technology and the technique. The result: vibrant, soft-hand, all-over prints on real cotton.",
    color: "bg-[#00c2ff]",
    tags: ["100% cotton sublimation", "Polyester 135–220 GSM", "No-fade print", "MOQ 50"],
    href: "/fabric/cotton",
  },
  {
    number: "03",
    title: "Your eyes in the factory",
    headline: "We QC. You approve. Nothing ships blind.",
    desc: "Every order goes through 4 QC stages — incoming fabric, in-line print, pre-final, and pre-shipment AQL 2.5. You get photo evidence at every milestone, and your final approval before anything leaves. The shirt doesn't ship until you've seen it.",
    color: "bg-[#ff4d00]",
    tags: ["4-stage QC", "AQL 2.5", "Photo proof at each stage", "Final approval required"],
    href: "/about/quality",
  },
  {
    number: "04",
    title: "DDP worldwide, US in days",
    headline: "No customs. No duties. No headache.",
    desc: "We ship DDP — Delivered Duty Paid — to 100+ countries. Your team never touches customs paperwork, never pays a surprise tariff. And for US-destined orders, we bulk-ship to our Fontana warehouse, then fulfill domestically in 2–5 business days. No ocean transit, no customs — your order lands in the States fast.",
    color: "bg-[#00c2ff]",
    tags: ["DDP 100+ countries", "Customs cleared", "Fontana warehouse", "US in 2–5 days"],
    href: "/shipping",
  },
];

export function Features() {
  return (
    <section id="capabilities" className="scroll-mt-20 border-b-2 border-black bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Section header */}
        <div className="mb-12 flex items-end justify-between border-b-2 border-black pb-6">
          <div>
            <div className="mb-2 text-xs font-black uppercase tracking-widest text-black/60">
              [ 004 / Capabilities ]
            </div>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tight text-black md:text-6xl">
              Why work with us?
            </h2>
          </div>
          <div className="hidden text-right text-xs font-bold uppercase tracking-widest text-black/60 md:block">
            4 reasons to choose us.
          </div>
        </div>

        {/* 4 capability cards in 2x2 grid */}
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

              {/* Learn more link */}
              {f.href && (
                <Link
                  href={f.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-black uppercase tracking-wider text-[#cc3d00] transition-colors hover:text-black"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
