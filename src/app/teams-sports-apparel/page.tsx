import type { Metadata } from "next";
import Link from "next/link";
import {
  Flag,
  Clock,
  Award,
  Layers,
  Zap,
  TrendingUp,
  DollarSign,
  Globe,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  MessageSquare,
  PackageCheck,
  Users,
  Timer,
  Trophy,
} from "lucide-react";
import { forEventsFaqJsonLd } from "@/lib/json-ld-data";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { Contact } from "@/components/contact";

export const dynamic = "force-static";

const siteUrl = "https://sublimapparel.com";

export const metadata: Metadata = {
  title: "Custom Team Sports Apparel Manufacturer | Sublimation Jerseys & Uniforms — SublimApparel",
  description:
    "Custom team sports apparel manufacturer for clubs, leagues and athletes. We produce sublimated soccer jerseys, basketball uniforms, cycling kits, running shirts and training wear with flexible quantities and global DDP shipping.",
  keywords: [
    "custom team apparel",
    "custom sports apparel manufacturer",
    "sublimated sports jerseys",
    "custom team uniforms",
    "sportswear manufacturer",
    "custom soccer jerseys",
    "custom basketball uniforms",
    "cycling team apparel",
    "running club shirts",
    "baseball team uniforms",
    "volleyball jerseys",
    "youth sports apparel",
  ],
  alternates: { canonical: `${siteUrl}/teams-sports-apparel/` },
  openGraph: {
    title: "Custom Team Sports Apparel Manufacturer | Sublimation Jerseys & Uniforms",
    description:
      "Custom sublimated soccer jerseys, basketball uniforms, cycling kits, running shirts and training wear. Built for clubs, leagues and athletes. Flexible MOQ. DDP worldwide.",
    url: `${siteUrl}/teams-sports-apparel/`,
    siteName: "SublimApparel",
    type: "website",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Custom Team Sports Apparel — SublimApparel" }],
  },
};

const pains = [
  { icon: Timer, title: "Season opener deadlines don't slip", body: "You can't move kickoff, tip-off, or race day. We plan backwards from your first fixture and lock the production window 60 days out." },
  { icon: Layers, title: "Sponsor + crest graphics stack", body: "Front crest, back sponsor wall, sleeve badge, captain's armband — multiple panels per garment, all printed in one continuous run." },
  { icon: Users, title: "Last-minute roster changes", body: "20 new players sign up two weeks out, or your race registration doubles. We hold a buffer in production for adds up to 10 days before delivery." },
];

const delivers = [
  { icon: TrendingUp, title: "25-day production", body: "From approved design to your team, club, league HQ or race venue. We guarantee a date and back it with a written delivery commitment." },
  { icon: PackageCheck, title: "Direct to club or venue", body: "DDP shipping to your team manager, club HQ, league office, tournament hotel or race expo. Unbox and start handing out." },
  { icon: Trophy, title: "Match + training tiers", body: "Different fabrics, different graphics, same production run. Tiered pricing for premium game kits and entry-level training wear." },
  { icon: DollarSign, title: "Volume pricing", body: "From 50 pieces (single team) to 30,000 pieces (national league). Tiered pricing kicks in at 500, 2,000, and 10,000." },
];

const scenarios = [
  { title: "Soccer clubs & academies", body: "Match kits, training kit, travel wear. Full roster sublimation, sponsor panels, federation marks.", icon: Flag },
  { title: "Basketball teams & leagues", body: "Reversible game jerseys, shooter shirts, warmups. Home/away colorways, number ranges locked to your roster.", icon: Trophy },
  { title: "Cycling clubs & race teams", body: "Aero jerseys + bib shorts, full-zip race fit, sponsor placement, race-day turnaround for stage races.", icon: Zap },
  { title: "Running clubs & race teams", body: "Singlets, tees, tanks, hoodies for training groups, 5K/10K teams, marathon training clubs.", icon: TrendingUp },
];

const process = [
  { day: "Day 1", title: "Brief & roster intake", body: "Tell us your sport, roster size, tier breakdown and delivery deadline. We propose a production slot." },
  { day: "Day 3", title: "Artwork & sponsor lock", body: "Free artwork prep. We accept sponsor logos in any format and align all panels to your club, league or federation brand guide." },
  { day: "Day 5", title: "Pre-production sample", body: "Optional physical sample shipped in 3 days. Critical for color-sensitive crests and sponsor marks." },
  { day: "Day 7", title: "Bulk production", body: "12 lines running in parallel. Home + away + training in one continuous print run." },
  { day: "Day 20", title: "Buffer stock", body: "We hold 10% buffer for late roster adds, exchange sizes, and replacement orders." },
  { day: "Day 25", title: "DDP delivery", body: "Direct to your club, league HQ, team manager, tournament hotel or race venue. Duties and customs included." },
];

const faqs = [
  {
    q: "What's the minimum order for custom team sports apparel?",
    a: "MOQ is 50 pieces per design. For tiered programs (e.g., home kit + away kit + training top), each tier can start at 50 pieces and we run them in one production batch to keep your per-unit cost down. Re-orders can start as low as 30 pieces.",
  },
  {
    q: "Which sports do you produce apparel for?",
    a: "Soccer, basketball, cycling, running, baseball, volleyball, rugby, hockey, wrestling, track & field, esports, and most team sports. If your team plays it, we can kit it.",
  },
  {
    q: "Can you add individual player names and numbers?",
    a: "Yes. Player names, squad numbers, captain's 'C' and referee marks are sublimated into the fabric — not printed on top — so there's no per-name setup cost. We accept your roster CSV/Excel and run variable data at the print stage.",
  },
  {
    q: "Do you handle sponsor logos and federation marks?",
    a: "Yes. We accept sponsor logos in any format (AI, PDF, PNG, SVG) and align all panels to your league or federation brand guide. Pre-production samples are available for color-sensitive sponsor marks.",
  },
  {
    q: "What fabrics are available for team uniforms?",
    a: "Performance polyester interlock (140–160gsm) for breathable match-day kits, micro-pique (180gsm) for premium hand-feel, and poly-cotton blends for off-field and training wear. We help you choose based on sport, climate and budget.",
  },
  {
    q: "Do you ship directly to the team, club or league HQ?",
    a: "Yes. DDP shipping to 100+ countries means we deliver to your club, league HQ, tournament hotel or team manager's address with duties and customs fully included. You don't arrange local transport or clear customs.",
  },
  {
    q: "Can you do reversible basketball uniforms?",
    a: "Yes. Reversible basketball jerseys use a lightweight mesh interlock with sublimation on both faces. Different colors, logos and numbers per side, stitched and finished in one production run.",
  },
  {
    q: "How fast can you turn around a season opener order?",
    a: "Standard production is 25 days from approved artwork. For pre-season or in-season re-orders, we run a 15-day expedited lane at a small premium. Lock your slot early — production windows fill 60–90 days out for major sports.",
  },
];

export default function RaceShirtsPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Event Apparel", path: "/event-festivals-conferences/" },
    { name: "Race Shirts", path: "/teams-sports-apparel/" },
  ]);
  const faqJsonLd = forEventsFaqJsonLd(faqs);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,77,0,0.18),transparent_60%)]" aria-hidden />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),transparent_30%)]" aria-hidden />
        <div className="relative mx-auto max-w-screen-xl px-6 py-20 md:py-28">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80">
            <Trophy className="h-3.5 w-3.5 text-[#ff4d00]" /> Teams & Sports Apparel
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Custom team sports apparel <span className="text-[#ff4d00]">built for clubs, leagues & athletes.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 md:text-xl">
            From local teams to competitive leagues, we manufacture custom sublimation jerseys, uniforms and training
            apparel with consistent quality and flexible production. Soccer, basketball, cycling, running, training
            wear — one production line, one DDP delivery.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff4d00] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#ff4d00]/25 transition hover:bg-[#ff5d1a] hover:scale-[1.02]"
            >
              Get a quote for your team <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/event-timeline/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Plan backwards from your first match <Clock className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {[
              { v: "25 days", l: "Avg. production" },
              { v: "30,000", l: "Largest single run" },
              { v: "10% buffer", l: "Held for late adds" },
              { v: "100+", l: "Countries DDP" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-extrabold text-white md:text-3xl">{s.v}</div>
                <div className="text-xs uppercase tracking-wider text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPORTS APPAREL SOLUTIONS WE PROVIDE */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">Sports Apparel Solutions</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Custom team apparel for every sport we serve</h2>
            <p className="mt-3 text-neutral-600">
              Sublimated and stitched apparel for clubs, leagues and athletes — built to your roster, your colors and your budget.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { name: "Soccer Jerseys", body: "Pro-cut V-necks, crew necks, full kits with shorts and socks. Sponsor-ready chest and sleeve panels." },
              { name: "Basketball Uniforms", body: "Reversible jerseys, shooter shirts, warmups. Sublimated numbers, no peeling or cracking." },
              { name: "Cycling Kits", body: "Jerseys + bib shorts aero packages. Race-day fit, full-zip, three rear pockets. Club team pricing." },
              { name: "Running Shirts", body: "Singlets, tees and tanks for running clubs, 5K/10K teams, half-marathon and marathon training groups." },
              { name: "Training Wear", body: "Polos, hoodies, warmups and off-field kit. Match your on-field look for travel, practice and events." },
            ].map((s) => (
              <div key={s.name} className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-[#ff4d00] hover:shadow-sm">
                <h3 className="text-base font-bold">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TEAMS CHOOSE US */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">Why teams choose us</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for club, league and team realities</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { t: "Small team orders accepted", b: "MOQ 50 pieces per design — perfect for a single team, a club, or a multi-tier league roster." },
              { t: "Accurate sizing", b: "US-spec size runs from Youth XS to Adult 5XL. Sample sizing sets on request for first-time orders." },
              { t: "Full customization", b: "Names, numbers, sponsor logos, federation marks, country flags — all sublimated, not printed on top." },
              { t: "Fast production", b: "25-day standard lead time. Roster lock + sponsor freeze handled in days, not weeks." },
              { t: "DDP delivery", b: "Delivered duty-paid to your club, league HQ, tournament hotel or your team's front door in 100+ countries." },
            ].map((w) => (
              <div key={w.t} className="rounded-2xl border border-neutral-200 bg-white p-6">
                <CheckCircle2 className="mb-3 h-5 w-5 text-[#ff4d00]" />
                <h3 className="text-base font-bold">{w.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAINS */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">Why teams, clubs and leagues switch to us</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Your last team-apparel problem (and why it won't happen here)</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pains.map((p) => (
              <div key={p.title} className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff4d00]/10 text-[#ff4d00]">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">What you get</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything a team apparel program needs</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {delivers.map((d) => (
              <div key={d.title} className="rounded-2xl border border-neutral-200 p-6">
                <d.icon className="mb-3 h-6 w-6 text-[#ff4d00]" />
                <h3 className="text-base font-bold">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENARIOS */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">Which teams we serve</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">From club teams to national leagues</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {scenarios.map((s) => (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <s.icon className="mb-3 h-6 w-6 text-[#00c2ff]" />
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">How we work</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">A 25-day team-apparel plan, season-opener locked</h2>
          </div>
          <ol className="space-y-4">
            {process.map((p, i) => (
              <li key={p.day} className="grid grid-cols-[80px_1fr] gap-4 rounded-2xl border border-neutral-200 bg-white p-5 md:grid-cols-[120px_1fr] md:p-6">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#ff4d00]">Step {i + 1}</span>
                  <span className="text-lg font-bold text-neutral-900">{p.day}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TOOL LINKS */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Free tools for team managers and league admins</h2>
            <p className="mt-3 text-neutral-600">Stop guessing deadlines, sizes, and quality. Use the same tools our repeat team managers, club admins and league organizers do.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { href: "/event-timeline/", title: "Event Timeline Calculator", body: "Enter your season opener, tournament date or race day. Get a day-by-day production plan back." },
              { href: "/us-size-guide/", title: "US Size Guide + Excel Template", body: "Standard US sizing for athletes and runners. Download the collection sheet." },
              { href: "/quality-control/", title: "4-Step Quality Control", body: "How we check every team uniform before it ships. AQL 2.5 standard." },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-[#ff4d00] hover:shadow-md"
              >
                <h3 className="text-lg font-bold group-hover:text-[#ff4d00]">{t.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{t.body}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#ff4d00]">
                  Open tool <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">Case studies</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Teams & sports apparel we've shipped</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { href: "/teams-sports-apparel/", title: "Sports Teams & Leagues", body: "Club, school and league kits. Roster-locked production, name and number sublimation, sponsor panels." },
              { href: "/event-festivals-conferences/", title: "Endurance & Race Events", body: "5K, 10K, half-marathon, marathon and triathlon race shirts. Bib numbers, finisher graphics, sponsor walls." },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-[#ff4d00] hover:shadow-md"
              >
                <div>
                  <h3 className="text-lg font-bold group-hover:text-[#ff4d00]">{c.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{c.body}</p>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-[#ff4d00] transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff4d00]">FAQ</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Questions team managers and league admins ask us</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-neutral-200 bg-white p-6">
                <h3 className="flex items-start gap-2 text-base font-bold">
                  <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ff4d00]" />
                  {f.q}
                </h3>
                <p className="mt-3 pl-7 text-sm leading-relaxed text-neutral-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + FORM */}
      <Contact />
    </main>
  );
}
