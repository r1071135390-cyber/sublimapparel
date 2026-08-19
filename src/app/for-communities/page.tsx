import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  Layers,
  MapPin,
  Music,
  Package,
  Ruler,
  Shirt,
  Shield,
  Sparkles,
  Star,
  Timer,
  Trophy,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { forEventsFaqJsonLd } from "@/lib/json-ld-data";

export const metadata: Metadata = {
  title:
    "Custom Club & Community Apparel | Sports Teams, Schools, Groups | MOQ 50",
  description:
    "Custom apparel for clubs, schools, community groups, faith organizations, and amateur teams. Branded identity that doesn't look like generic sports swag. MOQ 50 pcs, fast 25-day production, US warehouse.",
  keywords: [
    "custom club apparel",
    "sports team uniforms",
    "school club shirts",
    "community group apparel",
    "amateur team uniforms",
    "cycling club jerseys",
    "running club shirts",
    "church group apparel",
    "non-profit merchandise",
    "organization t-shirts",
  ],
  alternates: {
    canonical: "https://sublimapparel.com/for-communities/",
  },
  openGraph: {
    title: "Custom Club & Community Apparel | SublimApparel",
    description:
      "Branded identity for clubs, schools, community groups, faith organizations. Sublimated, durable, designed for your group.",
    url: "https://sublimapparel.com/for-communities/",
    images: ["/bowling-jersey-striker.webp"],
  },
};

const communitySegments = [
  {
    icon: Trophy,
    title: "Amateur Sports Teams & Clubs",
    desc: "Cycling clubs, running clubs, climbing gyms, rowing crews, amateur rugby, ultimate frisbee. Performance fabrics, team identity that lasts.",
  },
  {
    icon: Users,
    title: "School & University Organizations",
    desc: "Clubs, Greek life, student government, sports clubs, debate teams. Branded apparel that members actually want to wear on campus.",
  },
  {
    icon: Heart,
    title: "Faith-Based & Church Groups",
    desc: "Service trips, youth groups, retreats, mission teams. Group identity, family-friendly designs, modest cuts available.",
  },
  {
    icon: Music,
    title: "Music, Arts & Cultural Groups",
    desc: "Bands, choirs, theater groups, cultural organizations. Custom artwork, tour merch, performance apparel.",
  },
  {
    icon: Sparkles,
    title: "Hobby & Local Groups",
    desc: "Book clubs, gaming groups, hobby communities, local meetups. Branded identity that turns your members into ambassadors.",
  },
  {
    icon: Star,
    title: "Local Non-Profits & Charities",
    desc: "Volunteer apparel, fundraiser merchandise, donor gifts. Cost-effective bulk pricing for tight budgets.",
  },
];

const whatWeMake = [
  {
    label: "Team Jerseys",
    examples: "Sublimated full-kit, sponsor logos, performance fabric",
    icon: Trophy,
  },
  {
    label: "Club Polos & Tees",
    examples: "Branded identity, performance cotton blend",
    icon: Shirt,
  },
  {
    label: "Hoodies & Crewnecks",
    examples: "Group identity, members-only merchandise",
    icon: Package,
  },
  {
    label: "Event & Trip Shirts",
    examples: "Service trips, tours, retreats, conferences",
    icon: MapPin,
  },
];

const painPoints = [
  {
    icon: Sparkles,
    title: "&ldquo;It looks like generic team swag.&rdquo;",
    pain: "Most club apparel looks the same — big logo, two colors, all-over print of nothing. Your members don't want to wear it outside of game day.",
    fix: "Sublimation cut & sew gives you edge-to-edge design freedom. All-over prints, gradients, custom artwork, your group's personality — not a stock template.",
    link: { label: "See our work", href: "/products" },
  },
  {
    icon: Ruler,
    title: "&ldquo;Members are 18 to 65, all sizes.&rdquo;",
    pain: "Your cycling club has 22-year-old riders and 60-year-old enthusiasts. Sizing range is chaos, and the small-size charge breaks budgets.",
    fix: "Full size run from youth XS to adult 5XL. No size surcharge. Same price per piece whether you're printing a youth small or an adult 3XL.",
    link: { label: "Get US Size Guide", href: "/us-size-guide" },
  },
  {
    icon: Heart,
    title: "&ldquo;We need this for the season opener.&rdquo;",
    pain: "Seasons have hard start dates. Late registrations, last-minute design approvals, and a 12-week supplier lead time don't work.",
    fix: "25-day standard production. Rush available. US warehouse for the last-minute additions that always happen.",
    link: { label: "Check your timeline", href: "/event-timeline" },
  },
  {
    icon: Trophy,
    title: "&ldquo;Sponsors want their logos visible.&rdquo;",
    pain: "Local bike shop, pub, gym, business sponsor the team. They want their brand visible. Putting 6 logos on a jersey looks like a NASCAR coat.",
    fix: "Sponsor logo placement is part of the design. We work with you to place sponsor logos in zones that look intentional, not crowded.",
    link: { label: "Custom design process", href: "/how-to-source" },
  },
];

const whyUs = [
  {
    title: "Branded identity, not stock templates",
    desc: "Every design starts with your group's personality. Custom artwork, your colors, your vibe. Not a template with your logo dropped in.",
  },
  {
    title: "Sponsors are part of the design",
    desc: "We work sponsor logos into the layout as design elements, not afterthoughts. Your team looks pro, your sponsors get visibility.",
  },
  {
    title: "Members want to wear it off the field",
    desc: "Sublimated apparel is comfortable, durable, and looks good in coffee shops, not just at practice. Members become walking ambassadors.",
  },
  {
    title: "Multi-year archiving",
    desc: "We archive your designs, Pantones, and even the exact fabric blend. Next season's reorder is a 1-week process, not a new project.",
  },
];

const faqs = [
  {
    q: "Can you handle team kits with sponsor logos?",
    a: "Yes. We regularly work with cycling, running, and amateur sports clubs that have 3-6 sponsors per kit. Sponsor logos are integrated as design elements, not afterthoughts. Send us the sponsor logo files and we'll mock them into your kit design.",
  },
  {
    q: "What's the typical MOQ for club apparel?",
    a: "50 pieces per design for sublimation cut & sew. For teams of 10-15 members, we often run the same design with member-specific customization (name, number) within that minimum. Re-orders for new members start at 30 pieces.",
  },
  {
    q: "How long does a typical club order take?",
    a: "25 days from artwork approval. Rush available for 15-day turnaround. We recommend starting 60 days before your season opener or major event. The Event Timeline Calculator shows your specific dates.",
  },
  {
    q: "Can we order custom apparel in small batches as our group grows?",
    a: "Yes. Our 90-Day Program reserves production capacity based on your growth estimate. We run the main order, then add new members via re-orders at the same per-piece price (MOQ 30) as your group grows.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. DDP shipping to 100+ countries. Most international clubs use ocean freight (25-40 days, lowest cost) with air freight available for urgent orders. We handle all customs paperwork so you don't deal with import duties.",
  },
];

export default function ForCommunitiesPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    {
      name: "Custom Apparel for Communities & Clubs",
      path: "/for-communities/",
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
            src="/bowling-jersey-striker.webp"
            alt="Custom club and community apparel — team jerseys and branded group identity"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#00c2ff]/40 bg-[#00c2ff]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00c2ff]">
              <Users className="h-3.5 w-3.5" />
              For clubs, schools, and community groups
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Custom apparel that
              <br />
              <span className="text-[#00c2ff]">your members actually wear.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl">
              Branded identity for clubs, schools, faith groups, and amateur
              teams. <strong className="text-white">Custom designs, not stock
              templates</strong>, 25-day production, full size run from youth XS
              to adult 5XL. MOQ 50 pcs.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff] hover:shadow-[0_8px_24px_rgba(0,194,255,0.4)]"
              >
                Get a quote for your group
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                <Sparkles className="h-4 w-4" />
                See custom design work
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">2018</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Year founded
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">XS-5XL</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Full size run, no surcharge
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">25d</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Standard production
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">DDP</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  100+ countries
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY SEGMENTS */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              What we make
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Custom apparel for every kind of group.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From a 12-person climbing club to a 500-person Greek organization.
              Same factory, same craft.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {communitySegments.map((s) => (
              <div
                key={s.title}
                className="group bg-white p-6 transition-all hover:bg-[#0a0a0a] hover:text-white"
              >
                <s.icon className="h-8 w-8 text-[#00c2ff] transition-transform group-hover:scale-110" />
                <h3 className="mt-4 text-lg font-black">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70 group-hover:text-white/80">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-8">
            <h3 className="text-xl font-black">What we make for your group</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whatWeMake.map((w) => (
                <div key={w.label} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#00c2ff] text-white">
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
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              The 4 problems every club organizer hits
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              And exactly how we solve them.
            </h2>
            <p className="mt-3 text-base text-black/70">
              Other vendors give you a template. We give you identity.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-sm border-2 border-black/10 bg-white p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#00c2ff]/10 text-[#00c2ff]">
                    <p.icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg font-black"
                      dangerouslySetInnerHTML={{ __html: p.title }}
                    />
                    <p className="mt-2 text-sm leading-relaxed text-black/70">
                      <span className="font-bold text-black">The pain:</span>{" "}
                      <span dangerouslySetInnerHTML={{ __html: p.pain }} />
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-black/70">
                      <span className="font-bold text-[#00c2ff]">Our fix:</span>{" "}
                      {p.fix}
                    </p>
                    <Link
                      href={p.link.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#00c2ff] hover:gap-2.5"
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
            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
                90-Day Club Apparel Program
              </div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Plan your season, re-order as you grow.
              </h2>
              <p className="mt-3 text-base text-white/70">
                Your roster changes. Your apparel supplier shouldn&apos;t have
                to.
              </p>

              <ol className="mt-8 space-y-4">
                {[
                  {
                    t: "T-90: Reserve",
                    d: "Submit your estimated roster. We hold production capacity. Design direction locked in early.",
                  },
                  {
                    t: "T-60: Sponsor + sample",
                    d: "Send sponsor logo files. We mock them into your kit as design elements. Physical sample for sign-off.",
                  },
                  {
                    t: "T-30: Final roster",
                    d: "Your membership list is set. We adjust production within 5% of your estimate. New members added via re-order.",
                  },
                  {
                    t: "T-0: Season opener",
                    d: "Shipped to your clubhouse, gym, or office. Sorted by member if needed. Name labels available.",
                  },
                ].map((s) => (
                  <li key={s.t} className="flex items-start gap-4">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#00c2ff] text-xs font-black text-black">
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
                className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[#00c2ff] px-6 py-3 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff]"
              >
                Full 90-Day Program
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border-2 border-[#00c2ff]/30">
              <Image
                src="/bowling-raglan-retro.webp"
                alt="Custom club jerseys with sponsor logos and team identity"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Why clubs choose us
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Built for community identity.
            </h2>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((w) => (
              <li
                key={w.title}
                className="flex items-start gap-4 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-6"
              >
                <CheckCircle2
                  className="mt-1 h-6 w-6 shrink-0 text-[#00c2ff]"
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
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Common questions from clubs and groups
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Quick answers.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-sm border-2 border-black/10 bg-white p-6 open:border-[#00c2ff]"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-black">
                  <span>{f.q}</span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#00c2ff] transition-transform group-open:rotate-90" />
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
