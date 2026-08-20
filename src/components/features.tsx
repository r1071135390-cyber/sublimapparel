import Link from "next/link";
import { ArrowRight, Shirt, Check } from "lucide-react";

type Feature = {
  number: string;
  title: string;
  headline: string;
  desc: string;
  tags: string[];
  checklist?: string[];
  color: string;
  href?: string;
};

const features: Feature[] = [
  {
    number: "01",
    title: "Experience",
    headline: "We Understand Your Challenges",
    desc: "With years of experience working with international customers, we understand the challenges of overseas apparel sourcing — from sizing issues and communication gaps to production timelines and delivery deadlines.",
    tags: ["Experience", "Understanding customers", "Problem solving", "B2B sublimation"],
    color: "bg-[#ff4d00]",
    href: "/about",
  },
  {
    number: "02",
    title: "Capability",
    headline: "Full-Coverage Printing Expertise",
    desc: "We specialize in advanced full-print solutions, including polyester performance fabrics and 100% cotton applications. Our Full-Coverage Printing Expertise production technology allows us to create vibrant, all-over designs with consistent colors and details, helping customers achieve unique apparel solutions beyond traditional printing methods.",
    tags: ["Polyester + cotton", "All-over print", "8-color press", "Color-consistent"],
    color: "bg-[#00c2ff]",
    href: "/fabric/cotton",
  },
  {
    number: "03",
    title: "Quality",
    headline: "Quality Control From Design To Delivery",
    desc: "We manage every step of your project — from artwork confirmation and size checking to production inspection and final shipment — ensuring your apparel meets your expectations.",
    tags: ["4-stage QC", "Pre-shipment audit", "Photo proof", "Customer approval"],
    checklist: [
      "Design Confirmation",
      "Size Verification",
      "Production Monitoring",
      "Final Inspection",
    ],
    color: "bg-[#ff4d00]",
    href: "/about/quality",
  },
  {
    number: "04",
    title: "Logistics",
    headline: "Global DDP Shipping & On-Time Delivery",
    desc: "We provide global shipping solutions including DDP delivery options, helping customers receive their apparel with clear costs and reliable timelines.",
    tags: ["DDP 100+ countries", "Clear landed costs", "On-time delivery", "Customs cleared"],
    color: "bg-[#00c2ff]",
    href: "/shipping",
  },
];

export function Features() {
  return (
    <section className="relative overflow-hidden bg-[#faf9f6] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 grid grid-cols-1 items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black/60">
              <span className="inline-block h-px w-8 bg-black/40" />
              [ 004 / Why us ]
            </div>
            <h2 className="whitespace-nowrap text-4xl font-black leading-[1.05] tracking-tight text-black md:text-5xl lg:text-6xl">
              Why Work With SublimApparel
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-black/70 md:text-xl">
              More Than A Factory — A Partner Who Helps You Solve Problems
              <br />
              Reduce the risks of overseas apparel sourcing
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="text-xs font-black uppercase tracking-widest text-black/60">
              4 things we bring to the table
            </p>
          </div>
        </div>

        {/* 4 feature cards (2x2 grid) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.number}
              className="group relative flex h-full flex-col border-2 border-black bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000]"
            >
              {/* Top row: number + accent square */}
              <div className="mb-6 flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center ${f.color} text-white`}>
                  <Shirt className="h-5 w-5" />
                </div>
                <div className="text-5xl font-black leading-none text-black/10">
                  {f.number}
                </div>
              </div>

              {/* Subtitle */}
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-black/60">
                {f.title}
              </div>

              {/* Headline */}
              <h3 className="mb-4 text-2xl font-black leading-tight text-black md:text-3xl">
                {f.headline}
              </h3>

              {/* Description */}
              <p className="mb-6 text-base leading-relaxed text-black/70">{f.desc}</p>

              {/* Checklist (Card 03) */}
              {f.checklist && (
                <ul className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {f.checklist.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm font-bold text-black"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ff4d00]" strokeWidth={3} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

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
