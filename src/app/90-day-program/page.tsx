import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  Package,
  Plane,
  Shield,
  Sparkles,
  Target,
  Timer,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title:
    "90-Day Custom Apparel Production Program | 2-Phase Model | SublimApparel",
  description:
    "Our 90-day custom apparel production program in detail. 2-Phase model: reserve early, lock late. Designed for events, corporate, and brand apparel with deadline-driven production.",
  keywords: [
    "90 day production program",
    "custom apparel lead time",
    "2 phase production model",
    "apparel manufacturing timeline",
    "deadline driven production",
    "apparel production planning",
  ],
  alternates: {
    canonical: "https://sublimapparel.com/90-day-program/",
  },
  openGraph: {
    title: "90-Day Custom Apparel Production Program | SublimApparel",
    description:
      "Reserve early, lock late. 2-Phase Production Model designed for events, corporate, and brand apparel.",
    url: "https://sublimapparel.com/90-day-program/",
  },
};

const breadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "90-Day Production Program", path: "/90-day-program/" },
]);

const phaseOne = {
  title: "Phase 1: Reservation (T-90 to T-30)",
  subtitle: "Lock capacity, lock design, defer the count.",
  desc: "Most custom apparel programs fail because the customer is forced to commit to a final count before they have the data. We don't. Phase 1 is about locking the production line, not the count.",
  deliverables: [
    "Inquiry submitted with event date and estimated quantity",
    "Production capacity reserved in our schedule (you don't owe us a final number)",
    "Free digital mockup of your design",
    "Physical sample on production fabric (paid, refunded on bulk)",
    "Pantone, sizing, and placement locked. Sample sign-off is the contract.",
    "Estimated count updated monthly. We hold the line for you.",
  ],
  advantage:
    "If your event is 90+ days out, you get the best fabric choices, the most production-line flexibility, and the lowest pricing tier.",
};

const phaseTwo = {
  title: "Phase 2: Production (T-30 to T-0)",
  subtitle: "Lock the count, produce, ship.",
  desc: "By T-30, your registration numbers (or staff list, or member count) are real. We adjust production to your actual headcount within 5% of your estimate. No penalty, no panic.",
  deliverables: [
    "Final count locked 30 days before your event",
    "Production cut, printed, sewn, and inspected in 15 business days",
    "4-stage quality control with photo evidence at each stage",
    "Pack-out, poly-bag, and carton labeling",
    "DDP shipping arranged. Ocean, air, or US warehouse domestic — your choice.",
    "On-time delivery for 96% of orders in 2024",
  ],
  advantage:
    "You only pay for what you produce. If your estimate was 500 and the real count is 472, you pay for 472 + 5% buffer.",
};

const whenToUse = [
  {
    icon: Calendar,
    title: "Fixed event date",
    desc: "Marathon, race, festival, conference, trade show, camp session. The date is set, the apparel is one piece of a larger event.",
  },
  {
    icon: Users,
    title: "Rolling registration",
    desc: "Registration opens 6 months out, attendees sign up gradually. You need a supplier who can hold capacity without forcing a final count early.",
  },
  {
    icon: Target,
    title: "Season-based ordering",
    desc: "Camps, sports teams, clubs. The season opener is fixed, but the roster is fluid. Lock late, produce fast.",
  },
  {
    icon: Sparkles,
    title: "Test-and-scale brands",
    desc: "New brands testing 3-5 designs. Sell-through data informs which designs to scale. 90-day program allows for that.",
  },
];

const comparisonRows = [
  {
    aspect: "Final count due",
    traditional: "60-90 days out",
    ninetyDay: "30 days out",
  },
  {
    aspect: "Design changes after lock",
    traditional: "Penalty + restart",
    ninetyDay: "Minor tweaks OK",
  },
  {
    aspect: "Count over/under estimate",
    traditional: "Full penalty, pay for 100%",
    ninetyDay: "±5% absorbed, no penalty",
  },
  {
    aspect: "Rush order for late additions",
    traditional: "New 12-week lead time",
    ninetyDay: "30-day re-order, same per-piece",
  },
  {
    aspect: "Pricing stability",
    traditional: "Quote locks for 7 days",
    ninetyDay: "Quote locks for 30 days",
  },
  {
    aspect: "Best for",
    traditional: "Stock designs, in-house buyers",
    ninetyDay: "Events, reg-driven orders, growing brands",
  },
];

export default function NinetyDayProgramPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* HERO */}
      <section className="border-b border-black/10 bg-[#0a0a0a] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#ff4d00]/40 bg-[#ff4d00]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ff4d00]">
            <Layers className="h-3.5 w-3.5" />
            2-Phase Production Model
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
            The 90-Day
            <br />
            <span className="text-[#ff4d00]">Custom Apparel Program</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            Reserve early, lock late. Designed for event-driven apparel where
            the deadline is fixed but the count is fluid. Used by race
            organizers, summer camps, corporate buyers, and growing brands
            since 2018.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            <div>
              <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">2-Phase</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                Reserve, then lock
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">T-30</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                Final count lock
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">±5%</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                Buffer, no penalty
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">96%</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                On-time, 2024
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY 90-DAY */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Why the 90-day program exists.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-black/70">
            Traditional custom apparel production assumes you have a final
            count 60-90 days before delivery. Most event-driven apparel
            doesn&apos;t have that data. The 90-day program fixes the mismatch
            between how suppliers want to plan and how buyers actually know
            their numbers.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {whenToUse.map((w) => (
              <div
                key={w.title}
                className="flex items-start gap-4 rounded-sm border-2 border-black/10 bg-[#faf9f6] p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#ff4d00] text-black">
                  <w.icon className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-black">{w.title}</h3>
                  <p className="mt-1 text-sm text-black/70">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASE 1 */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-sm border-2 border-[#ff4d00] bg-white p-8 md:p-12">
            <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              {phaseOne.title}
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              {phaseOne.subtitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-black/70">
              {phaseOne.desc}
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-black/50">
                  Deliverables
                </h3>
                <ul className="mt-3 space-y-2">
                  {phaseOne.deliverables.map((d, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-black/80"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#ff4d00]"
                        strokeWidth={2.5}
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-sm border-2 border-[#ff4d00]/30 bg-[#ff4d00]/5 p-6">
                <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#ff4d00]">
                  <Sparkles className="h-4 w-4" />
                  The advantage
                </h3>
                <p className="mt-2 text-sm font-bold leading-relaxed text-black">
                  {phaseOne.advantage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 2 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-sm border-2 border-[#0a0a0a] bg-[#0a0a0a] p-8 text-white md:p-12">
            <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#00c2ff]">
              {phaseTwo.title}
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              {phaseTwo.subtitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              {phaseTwo.desc}
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white/50">
                  Deliverables
                </h3>
                <ul className="mt-3 space-y-2">
                  {phaseTwo.deliverables.map((d, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-white/80"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#00c2ff]"
                        strokeWidth={2.5}
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-sm border-2 border-[#00c2ff]/30 bg-[#00c2ff]/5 p-6">
                <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#00c2ff]">
                  <Sparkles className="h-4 w-4" />
                  The advantage
                </h3>
                <p className="mt-2 text-sm font-bold leading-relaxed text-white">
                  {phaseTwo.advantage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            90-day vs. traditional.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-black/70">
            Side-by-side comparison of how we work versus the typical
            China-direct custom apparel model.
          </p>

          <div className="mt-10 overflow-x-auto rounded-sm border-2 border-black/10 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-black/10 bg-white">
                  <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-black/60">
                    Aspect
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-black/40">
                    Traditional
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-[#ff4d00]">
                    90-Day Program
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((r, idx) => (
                  <tr
                    key={r.aspect}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#faf9f6]/50"}
                  >
                    <td className="px-4 py-4 font-black">{r.aspect}</td>
                    <td className="px-4 py-4 text-black/60">{r.traditional}</td>
                    <td className="px-4 py-4 font-bold text-[#ff4d00]">
                      {r.ninetyDay}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Common 90-day program questions.
          </h2>

          <div className="mt-10 space-y-4">
            {[
              {
                q: "What if I&apos;m under 60 days out?",
                a: "You can still join the 90-day program in compressed form. Phase 1 (sample + design lock) is shortened to 15 days. Phase 2 (production) is compressed to 15-20 days via air freight. Pricing is 20-30% higher due to rush fees and air freight.",
              },
              {
                q: "What if I&apos;m under 30 days out?",
                a: "We recommend the US warehouse drop-ship model. We stock blanks (white tees, black tees, blank polos) in Fontana, CA. We decorate and ship domestically in 2-5 days. Best for true emergencies. Limited to stock designs and a small color palette.",
              },
              {
                q: "Can I cancel the reservation?",
                a: "Yes, up to T-45 with no penalty. We just open the production slot to the next customer. After T-45, we&apos;ve started sample production and can&apos;t refund the sample fee, but you&apos;re not committed to bulk production.",
              },
              {
                q: "Do you offer the 90-day program for re-orders?",
                a: "Yes. Re-orders run on a 30-day compressed version. Same per-piece pricing, same AQL 2.5 QC, but reduced lead time because we&apos;ve already locked the design, fabric, and Pantone in the first run.",
              },
            ].map((f) => (
              <details
                key={f.q}
                className="group rounded-sm border-2 border-black/10 bg-[#faf9f6] p-6 open:border-[#ff4d00]"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-black">
                  <span dangerouslySetInnerHTML={{ __html: f.q }} />
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#ff4d00] transition-transform group-open:rotate-90" />
                </summary>
                <p
                  className="mt-3 text-sm leading-relaxed text-black/70"
                  dangerouslySetInnerHTML={{ __html: f.a }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
