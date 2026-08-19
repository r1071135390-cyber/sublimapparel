import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  Layers,
  MapPin,
  Package,
  Ruler,
  Shirt,
  Shield,
  Sparkles,
  Sun,
  Timer,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { forEventsFaqJsonLd } from "@/lib/json-ld-data";

export const metadata: Metadata = {
  title:
    "Custom Summer Camp Apparel | Counselor, Camper, Staff Shirts | MOQ 50",
  description:
    "Custom summer camp apparel for camps of all sizes. Counselor shirts, camper tees, staff uniforms, color team apparel. Multiple designs per camp, year-over-year re-orders, MOQ 50 pcs, fast US shipping from Fontana CA.",
  keywords: [
    "custom summer camp shirts",
    "camp counselor shirts",
    "camper apparel",
    "summer camp uniforms",
    "color team shirts",
    "camp staff apparel",
    "youth camp clothing",
    "camp merchandise",
    "overnight camp shirts",
    "day camp apparel",
  ],
  alternates: {
    canonical: "https://sublimapparel.com/summer-camp-shirts/",
  },
  openGraph: {
    title: "Custom Summer Camp Apparel Manufacturer | SublimApparel",
    description:
      "Counselor, camper, staff, and color team apparel. Multiple designs, year-over-year re-orders, MOQ 50.",
    url: "https://sublimapparel.com/summer-camp-shirts/",
    images: ["/esports-jersey-prodigy.webp"],
  },
};

const campSegments = [
  {
    icon: Sun,
    title: "Overnight / Sleepaway Camps",
    desc: "Multi-week programs. Camper shirts, counselor uniforms, color team apparel, name labels. Re-orders for next summer's session.",
  },
  {
    icon: Sparkles,
    title: "Day Camps",
    desc: "Single-day or weekly programs. Lightweight tees, all-cotton for hot weather. Branded with the camp's identity.",
  },
  {
    icon: Heart,
    title: "Sports & Adventure Camps",
    desc: "Soccer camps, basketball camps, surf camps, rock-climbing camps. Performance fabrics, color team graphics.",
  },
  {
    icon: Users,
    title: "Specialty & Theme Camps",
    desc: "STEM, art, music, drama camps. Sublimated designs, custom artwork, no minimum for re-orders.",
  },
];

const whatWeMake = [
  {
    label: "Camper Tees",
    examples: "All-cotton, lightweight, screen-friendly graphics",
    icon: Shirt,
  },
  {
    label: "Counselor Uniforms",
    examples: "Performance polos, branded caps, identifier colors",
    icon: Users,
  },
  {
    label: "Color Team / Tribe Shirts",
    examples: "Multiple designs, distinct colorways, easy to identify",
    icon: Layers,
  },
  {
    label: "Staff & Director Apparel",
    examples: "Polo shirts, performance tees, branded outerwear",
    icon: Shield,
  },
];

const painPoints = [
  {
    icon: Timer,
    title: "Camper numbers change weekly.",
    pain: "You order 500 shirts for 500 campers. Then 50 more register. Or 30 cancel. You're stuck with extras or short on day one.",
    fix: "Our 90-Day Program with a 30-day final-count lock. We adjust production to your real headcount, within 5% above or below your estimate.",
    link: { label: "See 90-Day Program", href: "/90-day-program" },
  },
  {
    icon: Ruler,
    title: "Sizing kids + teens + adults is chaos.",
    pain: "Camp shirts go from youth XS to adult XXL. A youth M and an adult S could be the same chest measurement on different size charts.",
    fix: "US-spec measurement charts from youth XS to adult 5XL. Free size sample sets. Excel template for your registration system to collect sizes automatically.",
    link: { label: "Get US Size Guide", href: "/us-size-guide" },
  },
  {
    icon: Sparkles,
    title: "We need 6 different color team designs.",
    pain: "Six color teams, six designs, one deadline. Most factories charge per design setup and the cost blows up.",
    fix: "Sublimation cut & sew is built for multiple designs. No setup fees. Same price per piece whether you have 1 design or 10.",
    link: { label: "How we print", href: "/technique" },
  },
  {
    icon: Calendar,
    title: "We need this before session starts in 6 weeks.",
    pain: "You forgot. Or registrations were slower than expected. Now you're 6 weeks out and most suppliers need 10-12 weeks.",
    fix: "Rush production available. 30-day emergency orders via air freight. US warehouse in Fontana, CA for same-day domestic emergency orders.",
    link: { label: "Check your timeline", href: "/event-timeline" },
  },
];

const whyUs = [
  {
    title: "Multi-design, no setup fees",
    desc: "6 color teams, 10 different staff shirts, 1 design per cabin — all on one PO. Sublimation is built for this.",
  },
  {
    title: "Re-order year-over-year, easy",
    desc: "We archive your designs, Pantones, sizing charts, and even the exact fabric. Next summer's reorder is a 1-week process.",
  },
  {
    title: "All-cotton for hot weather",
    desc: "Camper tees default to 100% cotton (DTG-printed) for comfort and screen-friendliness. Counselor uniforms default to performance polyester for durability.",
  },
  {
    title: "Stuff you'll need that you forgot",
    desc: "Lanyards, name labels, water bottles, drawstring bags. We can add these to the same shipment so you don't chase 5 vendors.",
  },
];

const faqs = [
  {
    q: "How do you handle last-minute camper registrations?",
    a: "Our 90-Day Program reserves production capacity based on your estimate. Final counts lock 30 days before your session starts. After that, we run smaller re-orders at the same per-piece price (MOQ 30 for re-orders) for any new registrations.",
  },
  {
    q: "Can you print different designs for each color team?",
    a: "Yes. Sublimation cut & sew supports any number of designs on a single PO. No setup fees. We just need the artwork for each design — same deadline for all of them.",
  },
  {
    q: "What's the typical lead time for camp apparel?",
    a: "Standard: 25-30 days from artwork approval. Rush: 15-20 days via air freight. We recommend starting 60-90 days before your session to get the best pricing. Use the Event Timeline Calculator to see your specific dates.",
  },
  {
    q: "Do you have a US warehouse for emergencies?",
    a: "Yes. Our Fontana, CA warehouse stocks basics (white tees, black tees, blank polos) for last-minute needs. Same-day shipping for orders under 100 pcs. Great for forgotten staff members, lost luggage replacement, or new-camper emergencies.",
  },
  {
    q: "Can you handle large sleepaway camps (1,000+ campers)?",
    a: "Yes. We've shipped orders of 5,000+ pcs to large camps. Multi-session camps can split their order across production runs (e.g. 500 pcs/session for 8 sessions) at no extra cost. We also offer name labels and individual packaging for session-by-session delivery.",
  },
];

export default function ForCampPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    {
      name: "Custom Apparel for Summer Camps",
      path: "/summer-camp-shirts/",
    },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={forEventsFaqJsonLd(faqs)} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0">
          <Image
            src="/esports-jersey-prodigy.webp"
            alt="Custom summer camp apparel — counselor, camper, and color team shirts"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#ff4d00]/40 bg-[#ff4d00]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ff4d00]">
              <Sun className="h-3.5 w-3.5" />
              For summer camps
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Custom camp apparel
              <br />
              <span className="text-[#ff4d00]">ready before opening day.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl">
              Counselor shirts, camper tees, color team apparel, staff
              uniforms. <strong className="text-white">Multi-design on one
              PO</strong>, 25-30 day production, year-over-year re-orders made
              easy. MOQ 50 pcs.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#ff4d00] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#ff6633] hover:shadow-[0_8px_24px_rgba(255,77,0,0.4)]"
              >
                Get a quote for your camp
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/us-size-guide"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#ff4d00] hover:bg-[#ff4d00]/10"
              >
                <Ruler className="h-4 w-4" />
                Download camper size template
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              <div>
                <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">2018</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Year founded
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">10+</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Designs on 1 PO, no setup
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">25d</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Standard production
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">US</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Fontana CA warehouse
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAMP SEGMENTS */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              What we make
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Custom apparel for every type of camp.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From a 50-camper day camp to a 2,000-camper sleepaway. Same
              factory, same quality.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-4">
            {campSegments.map((s) => (
              <div
                key={s.title}
                className="group bg-white p-6 transition-all hover:bg-[#0a0a0a] hover:text-white"
              >
                <s.icon className="h-8 w-8 text-[#ff4d00] transition-transform group-hover:scale-110" />
                <h3 className="mt-4 text-lg font-black">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70 group-hover:text-white/80">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-8">
            <h3 className="text-xl font-black">What we make for your camp</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whatWeMake.map((w) => (
                <div key={w.label} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#ff4d00] text-white">
                    <w.icon className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-sm font-black">{w.label}</div>
                    <div className="mt-0.5 text-xs text-black/60">
                      {w.examples}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              The 4 problems every camp director hits
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              And exactly how we solve them.
            </h2>
            <p className="mt-3 text-base text-black/70">
              You don&apos;t need a sales pitch. You need a vendor who has done
              this for hundreds of camps.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-sm border-2 border-black/10 bg-white p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#ff4d00]/10 text-[#ff4d00]">
                    <p.icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/70">
                      <span className="font-bold text-black">The pain:</span>{" "}
                      {p.pain}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-black/70">
                      <span className="font-bold text-[#ff4d00]">Our fix:</span>{" "}
                      {p.fix}
                    </p>
                    <Link
                      href={p.link.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#ff4d00] hover:gap-2.5"
                    >
                      {p.link.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 90-DAY PROGRAM (compact) */}
      <section className="bg-[#0a0a0a] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
                90-Day Camp Apparel Program
              </div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                From &ldquo;we need shirts&rdquo; to shirts at the bus drop-off.
              </h2>
              <p className="mt-3 text-base text-white/70">
                Camps don&apos;t run on corporate schedules. Your registration
                is open 4-6 months. We plan around that.
              </p>

              <ol className="mt-8 space-y-4">
                {[
                  {
                    t: "T-90: Reserve",
                    d: "Submit your camp headcount estimate, color teams, and design count. We hold production capacity.",
                  },
                  {
                    t: "T-60: Designs + samples",
                    d: "Free digital mockups for every design (color teams, counselors, staff). Pay for one physical sample set, refunded on bulk.",
                  },
                  {
                    t: "T-30: Lock final count",
                    d: "Your registrations are locked. We adjust production within 5% of your estimate. Late registrations are added via re-order.",
                  },
                  {
                    t: "T-0: Open day",
                    d: "Shipped to your camp address. Sorted by cabin / session if needed. Ready for the first bus.",
                  },
                ].map((s) => (
                  <li key={s.t} className="flex items-start gap-4">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#ff4d00] text-xs font-black text-black">
                      {s.t.split(":")[0]}
                    </span>
                    <div>
                      <div className="font-black">{s.t.split(":")[1]}</div>
                      <div className="mt-1 text-sm text-white/70">{s.d}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <Link
                href="/90-day-program"
                className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#ff6633]"
              >
                Full 90-Day Program
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border-2 border-[#ff4d00]/30">
                <Image
                  src="/esports-jersey-prodigy.webp"
                  alt="Color team and counselor apparel for summer camps"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Why camps choose us
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Built for the camp industry.
            </h2>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((w) => (
              <li
                key={w.title}
                className="flex items-start gap-4 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-6"
              >
                <CheckCircle2
                  className="mt-1 h-6 w-6 shrink-0 text-[#ff4d00]"
                  strokeWidth={2.5}
                />
                <div>
                  <div className="font-black">{w.title}</div>
                  <div className="mt-1 text-sm text-black/70">{w.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Common questions from camp directors
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Quick answers.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-sm border-2 border-black/10 bg-white p-6 open:border-[#ff4d00]"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-black">
                  <span>{f.q}</span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#ff4d00] transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-black/70">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
