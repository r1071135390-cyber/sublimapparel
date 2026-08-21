import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { RequestQuoteLink } from "@/components/request-quote-link";
import {
  Trophy,
  Vote,
  GraduationCap,
  Bike,
  Flag,
  Shirt,
  Building2,
  Tent,
  Heart,
  Music,
  Dumbbell,
  Layers,
  Users,
  Globe,
  Award,
} from "lucide-react";

export const metadata = buildPageMetadata({
    title: "Industries We Serve · 12 Verticals, 1,000+ B2B Clients",
    description: "12 industries we serve: race events, sports clubs, schools, ecommerce brands, political campaigns, trade shows, esports, churches, fitness, cycling, gaming, ho…",
    keywords: ["industries we serve", "sublimation apparel clients", "race team apparel", "school uniforms sublimation", "political campaign merch", "esports jersey", "yoga wear manufacturer", "cycling jersey factory"],
  });;

const stats = [
  { value: "12", unit: "VERTICALS", label: "Industries served" },
  { value: "1,000+", unit: "CLIENTS", label: "Active B2B buyers" },
  { value: "5M+", unit: "PIECES", label: "Produced last 12 months" },
  { value: "50+", unit: "COUNTRIES", label: "Delivered to" },
];

const industries = [
  { icon: <Trophy className="h-5 w-5" />, name: "Race events & 5K organizers", desc: "Marathons, 5K/10K, ultra races, triathlons. Sublimated singlets, tech tees, finisher shirts. Event-day logistics including race-morning drop-ship." },
  { icon: <Flag className="h-5 w-5" />, name: "Sports clubs & teams", desc: "Soccer, baseball, basketball, volleyball, rugby, hockey, lacrosse, football clubs. Match kits, training wear, fan merch." },
  { icon: <Bike className="h-5 w-5" />, name: "Cycling teams & clubs", desc: "Road, gravel, mountain, e-bike. Full-zip jerseys, bibs, base layers. Sponsor-clean construction, hidden seams, race-fit." },
  { icon: <Dumbbell className="h-5 w-5" />, name: "Fitness & yoga brands", desc: "Boutique studios, gym chains, athleisure startups. Cropped tanks, leggings, sports bras. Brushed-poly, four-way stretch, squat-proof." },
  { icon: <Vote className="h-5 w-5" />, name: "Political & campaign merch", desc: "Local elections, congressional races, advocacy campaigns. Yard signs + matching tee combos, last-mile rush, voter-targeted regional variants." },
  { icon: <GraduationCap className="h-5 w-5" />, name: "Schools, colleges, Greek life", desc: "Orientation, homecoming, finals week, rush, bid day, philanthropy. Bulk orders, size mix per chapter, rush reorders from US warehouse." },
  { icon: <Layers className="h-5 w-5" />, name: "Ecommerce brands & POD", desc: "Shopify, Etsy, Amazon Merch, Printful competitors. White-label packing, blind drop-ship, weekly batched runs, no MOQ on reorders." },
  { icon: <Tent className="h-5 w-5" />, name: "Trade shows & events", desc: "Booth staff tees, swag giveaways, sample-sized pre-orders. Floor samples in 5-7 days, bulk to ship before doors open." },
  { icon: <Music className="h-5 w-5" />, name: "Festivals & concerts", desc: "Festival merch, tour merch, artist drops, fan-club exclusives. CMYK-faithful print matching album art, numbered editions." },
  { icon: <Heart className="h-5 w-5" />, name: "Churches & non-profits", desc: "Mission trips, retreats, youth groups, charity events. Bulk pricing, donor recognition, cross-denominational variants." },
  { icon: <Building2 className="h-5 w-5" />, name: "Corporate & hospitality", desc: "Hotel staff, restaurant uniforms, conference tees, client gifts. Branded apparel with retail-quality finish, name personalization." },
  { icon: <Shirt className="h-5 w-5" />, name: "Resort & souvenir", desc: "Beach clubs, ski resorts, theme parks, tourist destinations. High-color retail prints, retail-quality finishing, repeatable reorders." },
];

const useCases = [
  { title: "Soccer club season kit + training pack", body: "20 teams, 25 players each, 3 kits (home/away/training) + 2 staff kits. We split across 3 production lines, ship in 18 days, store in CA warehouse for the season-long reorders." },
  { title: "Marathon series 5,000 finisher shirts", body: "Race morning delivery to 5 US cities, full bib integration on the back, sponsor-clean chest. We pack per-event, label per-bib, ship via our CA warehouse 48h before." },
  { title: "Yoga studio chain 200 pieces/month", body: "Standing monthly production, 4 SKUs, recycled poly-spandex, 1×1 rib. Packed retail-ready with hangtag, shipped to 12 studio locations in 10 days." },
  { title: "Local political campaign 3,000 pieces", body: "Sample Tuesday, approval Friday, bulk ship following Monday. We've done 5K-piece campaign orders in 8 days for tight election windows." },
  { title: "Gaming / esports tournament", body: "Sponsor-clean jersey, 8 team designs, 50 pieces per team, 400 total. Numbered editions, woven labels, retail-quality poly-bag. Drops in 14 days." },
  { title: "Greek life rush week rush order", body: "Chapter-specific designs, 200 pieces per chapter, 6 chapters. We template by chapter, pre-print common sizes, surge capacity for last-minute count changes." },
];

const faqs = [
  { q: "What's the smallest order you'll take?", a: "Per style: 50 pieces (sublimation), 50 pieces (mixed). Per order: 50 pieces across any styles. For sample runs, we have a 1-3 piece sample service at $35-65 freight via DHL." },
  { q: "Do you handle rush orders?", a: "Yes. 200 pieces in 5-7 days, 500 pieces in 7-9 days, 1,000 pieces in 9-12 days. Rush incurs a 15-25% surcharge but is available on most orders. We've done 5,000-piece campaign orders in 8 days." },
  { q: "Can you match our existing kit design?", a: "Yes. Send the original art file (AI, PSD, or layered PDF) and a reference garment. We reverse-engineer construction, fabric, color, and print placement. We can also build a tech-pack from scratch if you only have a sketch." },
  { q: "Do you sign NDAs?", a: "Yes, mutual NDA before any sensitive artwork is shared. Standard 2-year term, mutual confidentiality, no use of your design or brand for any purpose other than your order." },
];

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0a0a0a]">
      {/* 1 · HERO */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-6 text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
            [ 013 / About · industries ]
          </div>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            <span className="block">12 industries.</span>
            <span className="block text-[#cc3d00]">1,000+ clients.</span>
            <span className="block">5M+ pieces last year.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0] md:text-xl">
            From race events to political campaigns, from yoga studios to esports — we don't
            have one product, we have the ability to make any sublimated apparel you need.
            Same factory, same quality bar, twelve different briefs.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/cases/" className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e64400] hover:border-[#e64400]">
              See case studies →
            </Link>
            <RequestQuoteLink label="Cases / page / Get a quote" className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]">Get a quote →</RequestQuoteLink>
          </div>
        </div>
      </section>

      {/* 2 · STATS */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x-2 divide-[#0a0a0a] border-x-2 border-[#0a0a0a] md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-8 text-center md:py-10">
              <div className="text-3xl font-extrabold leading-none text-[#0a0a0a] md:text-5xl">
                {s.value}
                <span className="ml-1 text-base font-bold text-[#cc3d00] md:text-lg">{s.unit}</span>
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 · DESCRIPTION */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">[ Why breadth matters ]</div>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
            The same 12-line factory that builds Olympic-quality race singlets{" "}
            <span className="text-[#cc3d00]">also makes your Greek-life tees.</span>
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[#3a3a3a] md:text-lg">
            <p>
              Most sublimation factories pick a niche. They either do race events or they
              do fashion. They either do tech-apparel or they do corporate. We chose to be
              good at all of it — because the underlying skill is the same: take a complex
              design, render it accurately in CMYK, transfer it to fabric, and assemble a
              garment that looks retail.
            </p>
            <p>
              <strong className="text-[#0a0a0a]">B2B buyers come in 12 shapes.</strong>{" "}
              Race organizers need 5,000 finisher shirts in 21 days. Yoga studios need 200
              retail-quality leggings per month. Greek life needs 200 rush tees next week.
              Political campaigns need 3,000 pieces in 8 days. Different specs, different
              timelines, different packaging — same factory, same price band.
            </p>
            <p>
              What we don't do: we don't make screen-printed tees, we don't make fashion
              streetwear, we don't do wool or leather, we don't do cut-and-sew luxury.
              Sublimated performance and lifestyle apparel, at scale, B2B. That's it.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · INDUSTRIES GRID */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#1a1a1a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#0078a8]">[ 013.A / The 12 verticals ]</div>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">Who we already make for.</h2>
          </div>
          <div className="grid gap-px bg-[#0a0a0a] md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <div key={ind.name} className="bg-[#1a1a1a] p-8">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border-2 border-[#ff4d00] text-[#cc3d00]">
                  {ind.icon}
                </div>
                <h3 className="text-lg font-bold leading-snug">{ind.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#a0a0a0]">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · USE CASES */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">[ 013.B / Real client profiles ]</div>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">Six real orders we've run.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <div key={u.title} className="border-2 border-[#0a0a0a] bg-white p-6">
                <div className="mb-3 text-xs font-mono font-bold text-[#cc3d00]">0{i + 1}</div>
                <h3 className="text-lg font-bold leading-snug">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3a3a3a]">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · FAQ */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">[ 013.C / FAQ ]</div>
          <h2 className="mt-3 mb-10 text-3xl font-extrabold leading-tight md:text-5xl">The B2B starter questions.</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-2 border-[#0a0a0a] bg-white p-6">
                <div className="mb-2 text-xs font-mono font-bold text-[#cc3d00]">Q · {String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-lg font-bold leading-snug md:text-xl">{f.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3a3a3a] md:text-base">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · CTA */}
      <section className="bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-8 text-xs font-mono uppercase tracking-widest text-[#cc3d00]">[ 013.D / Start your project ]</div>
          <h2 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Don't see your industry? We probably still do it.</h2>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0]">
            If your business needs custom sublimated apparel, we can make it. Tell us your
            brief — we'll come back within 1 business day with a quote and a sample plan.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <RequestQuoteLink label="Cases / page / Get a quote" className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e64400] hover:border-[#e64400]">Start a project →</RequestQuoteLink>
            <Link href="/cases/" className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]">
              See case studies →
            </Link>
          </div>
        </div>
      </section>

      {/* 8 · RELATED */}
      <section className="border-t-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#6b6b6b]">Related</div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { href: "/products", title: "All products", desc: "6 apparel + 6 hard-surface categories" },
              { href: "/about/factory", title: "Factory", desc: "2,000 sqm, 12 lines, 24/7" },
              { href: "/fabric/cotton", title: "100% cotton", desc: "Our differentiator" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className="group block border-2 border-[#0a0a0a] bg-white p-6 transition-colors hover:bg-[#0a0a0a] hover:text-[#faf9f6]">
                <div className="text-xs font-mono uppercase tracking-wider text-[#cc3d00]">→</div>
                <div className="mt-2 text-lg font-bold">{r.title}</div>
                <div className="mt-1 text-sm text-[#6b6b6b] group-hover:text-[#a0a0a0]">{r.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
