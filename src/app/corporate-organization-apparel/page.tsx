import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  Layers,
  Package,
  Palette,
  Ruler,
  Shirt,
  Shield,
  Sparkles,
  Star,
  Timer,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { forEventsFaqJsonLd } from "@/lib/json-ld-data";

export const metadata: Metadata = {
  title:
    "Custom Corporate Apparel Manufacturer | Employee Uniform Supplier — SublimApparel",
  description:
    "Custom corporate apparel manufacturer for companies, schools, clubs and organizations. Employee uniforms, branded work shirts, company polo shirts and team clothing with flexible quantities, brand-color matching and DDP worldwide shipping.",
  keywords: [
    "corporate apparel",
    "custom company shirts",
    "employee uniforms",
    "organization apparel",
    "branded work shirts",
    "company polo shirts",
    "corporate uniforms",
    "team clothing",
    "custom corporate apparel",
    "company uniforms",
    "branded merchandise supplier",
  ],
  alternates: {
    canonical: "https://sublimapparel.com/corporate-organization-apparel/",
  },
  openGraph: {
    title: "Custom Corporate Apparel Manufacturer | Employee Uniform Supplier",
    description:
      "Employee uniforms, branded work shirts, company polo shirts, team clothing. Brand-color matching, flexible quantities, DDP worldwide.",
    url: "https://sublimapparel.com/corporate-organization-apparel/",
    images: ["/esports-hoodie-circuit.webp"],
  },
};

const useCases = [
  {
    icon: Users,
    title: "Employee Apparel",
    desc: "Polo shirts, performance tees, branded outerwear for everyday wear. Standardize sizing across departments, new hire kits monthly.",
  },
  {
    icon: Building2,
    title: "Organization Uniforms",
    desc: "Schools, clubs, faith organizations, non-profits. Branded identity apparel that doesn't look like generic swag.",
  },
  {
    icon: Sparkles,
    title: "Company Events",
    desc: "Conferences, trade shows, company kick-offs, client-facing programs. Color-matched to your brand standards.",
  },
  {
    icon: Award,
    title: "Team Building Apparel",
    desc: "Off-site retreats, company Olympics, group volunteer days, charity events. Custom designs that build team identity.",
  },
];

const whatWeMake = [
  {
    label: "Polo Shirts",
    examples: "Sublimated or embroidered logo, brand-color matching",
    icon: Shirt,
  },
  {
    label: "Performance Tees",
    examples: "Moisture-wicking for wellness programs, gym events",
    icon: Shirt,
  },
  {
    label: "Hoodies & Crewnecks",
    examples: "Premium feel, all-over print, embroidered logos",
    icon: Package,
  },
  {
    label: "Caps & Accessories",
    examples: "Embroidered or sublimated. Trade show giveaways.",
    icon: Award,
  },
];

const painPoints = [
  {
    icon: Palette,
    title: "&ldquo;Will the color match our brand book?&rdquo;",
    pain: "Pantone 286 looks navy on screen but arrives royal blue in the box. You only see it after 1,000 shirts ship.",
    fix: "We match to Pantone, with physical lab dips for orders over 500 pcs. Sample approval is the contract — bulk only ships after you sign off on the actual fabric color.",
    link: { label: "Color matching process", href: "/quality-control" },
  },
  {
    icon: Ruler,
    title: "&ldquo;How do we handle 200 new hires a month?&rdquo;",
    pain: "Buying in bulk means 100 size-M shirts in a closet. New hires arrive in all sizes. Re-orders take weeks.",
    fix: "Our 90-Day Program reserves capacity with a 30-day final-count lock. New hire orders slot in without restarting production. Re-order MOQ is 30 pcs.",
    link: { label: "See 90-Day Program", href: "/90-day-program" },
  },
  {
    icon: Shield,
    title: "&ldquo;What if the bulk doesn't match the sample?&rdquo;",
    pain: "Most suppliers charge extra for in-line inspections, or skip them entirely. You find out at delivery.",
    fix: "Every order goes through 4 inspection stages with AQL 2.5 standards. Photo evidence at every step. Defects caught before packing, not after.",
    link: { label: "Our QC process", href: "/quality-control" },
  },
  {
    icon: Timer,
    title: "&ldquo;When do we need to start for Q4?&rdquo;",
    pain: "Holiday gifts, year-end events, trade show season. The deadline is fixed, the in-house procurement timeline is unclear.",
    fix: "Event Timeline Calculator. Enter your deadline, get the exact order date, design lock date, and final-count lock date.",
    link: { label: "Check your timeline", href: "/event-timeline" },
  },
];

const whyUs = [
  {
    title: "One vendor, every apparel type",
    desc: "Polo + tee + hoodie + cap on one purchase order, one invoice, one shipment, one contact. No juggling 4 different printers.",
  },
  {
    title: "Brand book adherence is non-negotiable",
    desc: "We lock Pantone, sizing chart, and placement before cutting. Your last 5 vendors couldn't say that — we say it in writing.",
  },
  {
    title: "Scalable from 50 to 50,000",
    desc: "Same factory, same quality. The team-building tees for 50 people get the same production line as your 5,000-piece trade show order.",
  },
  {
    title: "US warehouse for emergencies",
    desc: "Forgot someone for a board meeting? Need 20 extra polos by Friday? Fontana, CA warehouse ships same-day domestically.",
  },
];

const faqs = [
  {
    q: "What's the typical MOQ for corporate orders?",
    a: "50 pieces per design for sublimation cut & sew. For embroidered polos, MOQ drops to 30 pieces. We can split larger orders across multiple production runs (e.g. 200 pcs/month for 3 months) at no extra cost.",
  },
  {
    q: "Can you match our brand Pantone colors?",
    a: "Yes. We work from Pantone, PMS, or physical swatches. For orders over 500 pcs, we provide lab-dip samples for sign-off before production. Re-orders maintain color consistency by archiving your approved color profile.",
  },
  {
    q: "Do you handle re-orders for new hires?",
    a: "Yes — that's the 90-Day Program in action. We reserve production capacity based on your quarterly estimate, and final counts lock 30 days out. New hire orders slot into the next run without restarting the line. Re-order MOQ is 30 pcs.",
  },
  {
    q: "What's the difference between sublimation and embroidery?",
    a: "Sublimation is best for all-over prints, complex logos, gradients, and polyester garments (performance tees, hoodies). Embroidery is best for polos, caps, and corporate-formal looks. We can do both, often in the same order.",
  },
  {
    q: "Can you produce one design with multiple variants (different colors, different sizes)?",
    a: "Yes. Sublimation cut & sew supports per-piece color, per-piece size, and per-piece print placement. No extra setup fee. Common for onboarding kits where new hires choose from 3 colorways.",
  },
];

export default function ForCorporatePage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    {
      name: "Custom Apparel for Corporate",
      path: "/corporate-organization-apparel/",
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
            src="/esports-hoodie-circuit.webp"
            alt="Custom sublimated corporate apparel — branded hoodies, polos, and event uniforms"
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
              <Building2 className="h-3.5 w-3.5" />
              For companies, HR, and brand teams
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              Custom apparel for companies
              <br />
              <span className="text-[#00c2ff]">and organizations.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl">
              Branded clothing solutions for employee teams, schools, clubs and organizations.
              <strong className="text-white"> Employee apparel, organization uniforms, company event & team building apparel</strong> —
              Pantone-matched colors, flexible quantities, DDP worldwide.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00c2ff] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#33d1ff] hover:shadow-[0_8px_24px_rgba(0,194,255,0.4)]"
              >
                Get a quote for your team
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/us-size-guide"
                className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#00c2ff] hover:bg-[#00c2ff]/10"
              >
                <Ruler className="h-4 w-4" />
                Download size template
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">2018</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Year founded in Yiwu
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">Pantone</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Color-matched standard
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">30 pcs</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Re-order minimum
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#00c2ff] md:text-4xl">100+</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                  Countries DDP shipped
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Apparel categories
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Custom apparel for every corporate & organization need.
            </h2>
            <p className="mt-3 text-base text-black/70">
              From a 50-person office to a 5,000-person enterprise. Employee apparel, organization uniforms,
              company events and team building — same factory, same quality, same production line.
            </p>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="group bg-white p-6 transition-all hover:bg-[#0a0a0a] hover:text-white"
              >
                <u.icon className="h-8 w-8 text-[#00c2ff] transition-transform group-hover:scale-110" />
                <h3 className="mt-4 text-lg font-black">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70 group-hover:text-white/80">
                  {u.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-8">
            <h3 className="text-xl font-black">What we make for your team</h3>
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
              The 4 problems every corporate buyer hits
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              And exactly how we solve them.
            </h2>
            <p className="mt-3 text-base text-black/70">
              Other vendors say &ldquo;we can do it.&rdquo; We give you the
              specific tool for each problem.
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
                The 90-Day Corporate Apparel Program
              </div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Reserve capacity, lock late, re-order fast.
              </h2>
              <p className="mt-3 text-base text-white/70">
                Procurement teams love predictable production. HR teams love
                fast re-orders. The 90-Day Program gives both.
              </p>

              <ol className="mt-8 space-y-4">
                {[
                  {
                    t: "T-90: Reserve",
                    d: "Submit your quarterly estimate. We hold production capacity, source fabric, and pre-print Pantone swatches.",
                  },
                  {
                    t: "T-60: Sample + lock",
                    d: "Physical samples on your exact fabric and Pantone. Sign-off is the contract.",
                  },
                  {
                    t: "T-30: Final count",
                    d: "Your new-hire numbers are real. We adjust production to your real count — no penalty, no panic.",
                  },
                  {
                    t: "T-0 onward: Re-orders",
                    d: "Monthly re-orders of 30+ pcs slot into the next run. Same factory, same color profile.",
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
                Full 90-Day Program details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border-2 border-[#00c2ff]/30">
              <Image
                src="/esports-travel-hoodie.webp"
                alt="Custom branded corporate hoodies and team apparel manufactured in Yiwu"
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
              Why corporate buyers choose us
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Built for the procurement nightmare.
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

      {/* CASE STUDIES */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Case studies
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Corporate & organization apparel we&apos;ve shipped.
            </h2>
          </div>

          <div className="grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/promotional-marketing-apparel/", title: "Trade Shows & Display", body: "Booth staff uniforms, attendee giveaways, brand-color-matched at scale." },
              { href: "/apparel-brands-agencies/", title: "Apparel Brands & Agencies", body: "Private label production for growing brands and creative agencies." },
              { href: "/e-commerce-fulfillment/", title: "E-commerce & Fulfillment", body: "Drop-ship, warehousing and inventory for online apparel brands." },
              { href: "/event-festivals-conferences/", title: "Events & Conferences", body: "Branded apparel for company events, conferences and team retreats." },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group block bg-white p-6 transition-all hover:bg-[#0a0a0a] hover:text-white"
              >
                <h3 className="text-lg font-black group-hover:text-[#00c2ff]">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70 group-hover:text-white/80">{c.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#00c2ff]">
                  View <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              Common questions from corporate buyers
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
