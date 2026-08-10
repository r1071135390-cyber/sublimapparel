import { JsonLd } from "@/components/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Palette, Ruler, Sparkles, Shirt, Trophy, Layers, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Bowling Jerseys | Sublimated League & Tournament Shirts | SublimApparel",
  description:
    "Custom sublimated bowling jerseys for leagues, tournaments, and retro-style nights. Loose fit, contrasting side panels, name & number front and back. MOQ 50 pcs, 15-20 day lead time, DDP shipping.",
  keywords: [
    "custom bowling jersey",
    "bowling shirt",
    "sublimated bowling jersey",
    "bowling league shirts",
    "bowling tournament apparel",
    "retro bowling shirt",
    "name number bowling",
    "all over print bowling",
    "boutique bowling apparel",
    "DDP bowling jerseys",
  ],
};

const stats = [
  { value: "50", label: "MOQ (PCS)", note: "league / centre", color: "orange" },
  { value: "15–20", label: "DAYS LEAD TIME", note: "from art approval", color: "white" },
  { value: "160–180", label: "GSM POLY", note: "loose, retro fit", color: "white" },
  { value: "$14–18", label: "STARTING JERSEY", note: "vs $45 retail", color: "orange" },
];

const styles = [
  { name: "Classic Bowling Jersey", desc: "Loose retro fit, contrasting side panels, V-neck or button placket. The workhorse for leagues, tournaments, and boutique centres.", gsm: "160–180 GSM" },
  { name: "Name & Number Front/Back", desc: "Player name across upper back, big number on chest and back. Sublimated — no stitching, no peeling, no weight.", gsm: "160–180 GSM" },
  { name: "Raglan Sleeve", desc: "Diagonal contrast sleeves, athletic throwback look. Popular with mid-century modern bowling centres.", gsm: "160–180 GSM" },
  { name: "Button Placket", desc: "Traditional 3-button henley-style placket. Throwback Friday leagues, retro apparel brands.", gsm: "160–180 GSM" },
  { name: "Women's Cut", desc: "Same retro look, tapered waist and narrower shoulders. Mix in the same order at no surcharge.", gsm: "160–180 GSM" },
  { name: "Matching Shorts", desc: "Coordinating side-panel shorts. Full kit ready for team photos and tournament day.", gsm: "180–200 GSM" },
];

const fabricChoices = [
  { name: "Birdseye Mesh Knit", best: "Hot lanes · max airflow · classic bowling look", moq: "50 pcs" },
  { name: "Interlock Poly", best: "Smooth hand · premium feel · screen-print ready backing", moq: "50 pcs" },
  { name: "Pique Poly", best: "Textured retro feel · tournament shirts", moq: "50 pcs" },
  { name: "Performance Poly-Spandex", best: "Athletic cut · 4-way stretch · modern centres", moq: "50 pcs" },
  { name: "Recycled Poly (rPET)", best: "Eco-aware centres · sustainability story", moq: "100 pcs" },
];

const customisation = [
  { icon: Shirt, title: "Name & number", desc: "Sublimated, not stitched. Won't peel, won't add weight, won't fade. Up to 2-line name on back." },
  { icon: Palette, title: "All-over print", desc: "Sponsor panels, league logos, retro patterns, team colours. Unlimited colours, no setup fees." },
  { icon: Trophy, title: "League & tournament", desc: "Easy re-orders for next season — same template, new roster, no setup fee on re-orders." },
  { icon: Star, title: "Roster-friendly", desc: "We can vary names/numbers within one order. Send us your roster spreadsheet, we lay it out." },
];

const useCases = [
  { who: "Bowling leagues", what: "Weekly league night shirts, mixed skill divisions, season kits" },
  { who: "Bowling centres", what: "House shirts, retro Friday nights, tournament staff uniforms" },
  { who: "Boutique bowling", what: "Modern hipster lanes, themed nights, brand merchandise" },
  { who: "Charity tournaments", what: "Fundraiser events, sponsor-heavy layouts, one-off event apparel" },
  { who: "Bowling apparel brands", what: "Retail lines, capsule drops, themed collections" },
  { who: "Pro shops & coaches", what: "Coaching staff shirts, pro shop merchandise, instructional events" },
];

const pricing = [
  { qty: "50 pcs", jersey: "$14.00", shirt: "$11.50", note: "league / centre" },
  { qty: "100 pcs", jersey: "$11.50", shirt: "$9.50", note: "tournament kit" },
  { qty: "300 pcs", jersey: "$9.50", shirt: "$7.80", note: "multi-centre" },
  { qty: "500 pcs", jersey: "$8.50", shirt: "$7.00", note: "retail / pro shop" },
  { qty: "1,000+ pcs", jersey: "$7.00", shirt: "$5.80", note: "brand drop" },
];

const faq = [
  {
    q: "Can you handle different names and numbers in one order?",
    a: "Yes. Send us a spreadsheet with name, number, and size for each player. We lay it out per garment, so each shirt in the order is unique. There's a small $1/unique garment layout fee for very large rosters, but no per-name setup.",
  },
  {
    q: "Will the names and numbers peel?",
    a: "No. Because the name and number are sublimated into the fabric (not stitched or screen-printed on top), they become part of the shirt. They won't peel, crack, or fade — even after 100+ washes.",
  },
  {
    q: "Can I re-order the same design next season?",
    a: "Yes — we keep your design on file for 2 years. Re-orders have no setup fee, just the per-unit production cost. New names/numbers are free, just send us the new roster.",
  },
  {
    q: "What about women's cut?",
    a: "We do women's cut bowling jerseys with a tapered waist and shorter sleeves. You can mix men's and women's in the same order, same design, no surcharge.",
  },
  {
    q: "Can you make matching shorts?",
    a: "Yes — coordinating side-panel shorts in the same fabric, same sublimation, ready for team photos. Sold as part of the kit or separately.",
  },
];

export default function BowlingPage() {
  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Custom Bowling Jerseys — League, Tournament, Retro",
        "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/og-default.jpg`,
        "description": "Custom sublimation bowling jerseys — loose fit, side panels, name & number. MOQ 50 pcs, DDP shipping worldwide.",
        "brand": { "@type": "Brand", "name": "SublimApparel" },
        "manufacturer": { "@type": "Organization", "name": "SublimApparel" },
        "offers": {
          "@type": "Offer",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/products/bowling/`,
          "priceCurrency": "USD",
          "priceRange": "$",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition"
        }
      }} />

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl gap-0 px-6 md:grid-cols-12">
          <div className="md:col-span-7 py-16 md:py-24">
            <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              07 / Apparel · Bowling
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
              Custom bowling.
              <br />
              <span className="text-[#ff4d00]">Loose fit. Loud print.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-neutral-700 md:text-lg">
              Sublimated bowling jerseys and retro shirts for leagues, tournaments, and boutique centres. Contrasting side panels, name & number front and back, all printed — not stitched. At factory-direct pricing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/get-a-quote" className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black">
                Get a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link href="/products" className="inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white">
                See All Apparel
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 border-t-2 border-black md:border-l-2 md:border-t-0 bg-[#0a0a0a] flex items-center justify-center p-10">
            <div className="text-center">
              <Sparkles className="mx-auto h-24 w-24 text-[#ff4d00] md:h-32 md:w-32" strokeWidth={1.5} />
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white">Bowling Leagues</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white">Tournaments · Retro</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-0 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`p-8 ${i < 3 ? "border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 border-black md:border-b-0" : ""}`}>
              <div className={`text-4xl font-black md:text-5xl ${s.color === "orange" ? "text-[#ff4d00]" : "text-black"}`}>{s.value}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-widest text-black">{s.label}</div>
              <div className="mt-1 text-xs text-neutral-500">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 001.5 / Gallery ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">From <span className="text-[#ff4d00]">the lanes</span> to the league wall.</h2>
          <div className="mt-10 grid gap-0 md:grid-cols-3">
            <div className="border-2 border-black bg-white">
              <img src="/bowling-jersey-striker.webp" alt="Custom sublimated cream bowling jersey with retro print, name and number" className="aspect-[4/5] w-full object-cover" />
              <div className="border-t-2 border-black p-3 text-xs font-black uppercase tracking-widest text-black">Classic Jersey · Striker</div>
            </div>
            <div className="border-2 border-t-0 border-black bg-white md:border-t-2 md:border-l-0">
              <img src="/bowling-raglan-retro.webp" alt="Custom sublimated raglan sleeve bowling shirt with retro geometric print" className="aspect-[4/5] w-full object-cover" />
              <div className="border-t-2 border-black p-3 text-xs font-black uppercase tracking-widest text-black">Raglan Sleeve · Retro</div>
            </div>
            <div className="border-2 border-t-0 border-black bg-white md:border-t-2 md:border-l-0">
              <img src="/bowling-womens-queen.webp" alt="Custom sublimated women's black bowling jersey with neon geometric print" className="aspect-[4/5] w-full object-cover" />
              <div className="border-t-2 border-black p-3 text-xs font-black uppercase tracking-widest text-black">Women's · Queen</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 002 / Styles ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">From <span className="text-[#ff4d00]">classic jersey</span> to raglan retro.</h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">The full range of bowling tops — all sublimation-ready, all with name & number options.</p>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-3">
            {styles.map((s, i) => (
              <div key={s.name} className={`border-black p-6 ${i % 3 !== 2 ? "lg:border-r-2" : ""} ${i < 3 ? "border-b-2" : ""} ${i % 2 === 0 ? "md:border-r-2 lg:border-r-0" : "md:border-r-0"} bg-white`}>
                <div className="text-xl font-black text-black">{s.name}</div>
                <p className="mt-2 text-sm text-neutral-700">{s.desc}</p>
                <div className="mt-3 inline-block border-2 border-black bg-[#faf9f6] px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-black">{s.gsm}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 003 / Fabric ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Light. <span className="text-[#ff4d00]">Breathable.</span> Built to throw strikes.</h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">All fabrics are poly or poly-spandex — we never use cotton for performance bowling jerseys.</p>
          <div className="mt-10 border-2 border-black bg-white">
            <div className="grid grid-cols-12 border-b-2 border-black bg-black text-xs font-black uppercase tracking-widest text-white">
              <div className="col-span-3 p-3">Fabric</div>
              <div className="col-span-6 border-l-2 border-white p-3">Best for</div>
              <div className="col-span-3 border-l-2 border-white p-3">MOQ</div>
            </div>
            {fabricChoices.map((f, i) => (
              <div key={f.name} className={`grid grid-cols-12 text-sm ${i < fabricChoices.length - 1 ? "border-b-2 border-black" : ""}`}>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-black">{f.name}</div>
                <div className="col-span-6 border-r-2 border-black p-3 text-neutral-700">{f.best}</div>
                <div className="col-span-3 p-3 font-black text-[#ff4d00]">{f.moq}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 004 / Customisation ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Roster-ready <span className="text-[#ff4d00]">detail.</span></h2>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
            {customisation.map((c, i) => (
              <div key={c.title} className={`p-6 ${i < 3 ? "lg:border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 lg:border-b-0 border-black" : ""} ${i === 2 ? "border-b-2 lg:border-b-0 border-black" : ""}`}>
                <c.icon className="h-8 w-8 text-[#ff4d00]" strokeWidth={2} />
                <div className="mt-3 text-xl font-black text-black">{c.title}</div>
                <p className="mt-2 text-sm text-neutral-700">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-400">[ 005 / Who orders this ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">From <span className="text-[#ff4d00]">the lanes</span> to the pro shop.</h2>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <div key={u.who} className={`p-6 ${i < 3 ? "lg:border-r-2 border-neutral-800" : ""} ${i < 3 ? "border-b-2 lg:border-b-0 border-neutral-800" : ""} ${i === 3 || i === 4 ? "border-b-2 lg:border-b-0 border-neutral-800 md:border-r-2 md:border-b-0" : ""}`}>
                <Users className="h-6 w-6 text-[#ff4d00]" strokeWidth={2} />
                <div className="mt-3 text-lg font-black text-white">{u.who}</div>
                <p className="mt-1 text-sm text-neutral-400">{u.what}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 006 / Pricing ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">A fraction of <span className="text-[#ff4d00]">retail.</span></h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">Starting prices for sublimation bowling jerseys and shirts. Retail equivalent is $45+ — you get the same fabric and quality, factory-direct.</p>
          <div className="mt-10 border-2 border-black bg-white">
            <div className="grid grid-cols-12 border-b-2 border-black bg-black text-xs font-black uppercase tracking-widest text-white">
              <div className="col-span-3 p-3">Quantity</div>
              <div className="col-span-3 border-l-2 border-white p-3">Classic Jersey</div>
              <div className="col-span-3 border-l-2 border-white p-3">Retro Shirt</div>
              <div className="col-span-3 border-l-2 border-white p-3">Note</div>
            </div>
            {pricing.map((p, i) => (
              <div key={p.qty} className={`grid grid-cols-12 text-sm ${i < pricing.length - 1 ? "border-b-2 border-black" : ""}`}>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-black">{p.qty}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#ff4d00]">{p.jersey}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#ff4d00]">{p.shirt}</div>
                <div className="col-span-3 p-3 text-neutral-600">{p.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 007 / FAQ ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Common questions.</h2>
          <div className="mt-10 space-y-0 border-2 border-black bg-white">
            {faq.map((f, i) => (
              <details key={f.q} className={`group p-6 ${i < faq.length - 1 ? "border-b-2 border-black" : ""}`}>
                <summary className="flex cursor-pointer items-start justify-between gap-4">
                  <span className="text-lg font-black text-black">{f.q}</span>
                  <span className="ml-4 shrink-0 text-2xl font-black text-[#ff4d00] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-base text-neutral-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ff4d00] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-white/80">[ 008 / Next step ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-7xl">Got a tournament? <br />Get a quote in 1 business day.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-a-quote" className="group inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#ff4d00]">
              Get a Bowling Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 border-2 border-black bg-transparent px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white">
              See All Apparel
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
