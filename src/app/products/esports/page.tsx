import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Palette, Ruler, Sparkles, Shirt, Gamepad2, Crown, Layers, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Esports Apparel | Sublimated Jerseys & Team Kits",
  description:
    "Custom sublimated esports jerseys, hoodies, and team kits for gaming teams, tournaments, and streamers. Bold all-over print, poly-spandex stretch, name & gamer tag front and back. MOQ 50 pcs, 15-25 day lead time, DDP shipping.",
  keywords: [
    "esports jersey custom",
    "gaming jersey",
    "custom esports apparel",
    "gaming team jerseys",
    "esports tournament shirts",
    "sublimated gaming jersey",
    "gamer tag jersey",
    "esports hoodie custom",
    "all over print esports",
    "gaming team kit",
    "college esports apparel",
    "twitch streamer merch",
  ],

  openGraph: {
    images: ["/hero-jersey.webp"],
  },
};

const stats = [
  { value: "50", label: "MOQ (PCS)", note: "team / event", color: "orange" },
  { value: "15–20", label: "DAYS LEAD TIME", note: "from art approval", color: "white" },
  { value: "180–220", label: "GSM POLY-SPANDEX", note: "4-way stretch", color: "white" },
  { value: "$15–22", label: "STARTING JERSEY", note: "vs $50 retail", color: "orange" },
];

const styles = [
  { name: "Esports Jersey", desc: "Loose-athletic fit, bold all-over print, mesh ventilation panels at sides and underarm. The standard for competitive gaming kit.", gsm: "180–200 GSM" },
  { name: "Gamer Hoodie", desc: "Heavyweight 320 GSM brushed poly-cotton blend (or 100% poly for full sublimation). Tournament-warm, couch-ready, photo-ready.", gsm: "300–340 GSM" },
  { name: "Practice Tee", desc: "Lightweight training shirt, same all-over print as the jersey, lower-cost option for scrim and casual play.", gsm: "140–160 GSM" },
  { name: "Streamer Tee", desc: "Premium hand-feel tee with full all-over sublimation. Designed for on-camera, photo shoots, and merch drops.", gsm: "160–180 GSM" },
  { name: "Coach / Staff Polo", desc: "Matching staff apparel — coaches, managers, analysts, content team. Same palette as player kit.", gsm: "180–200 GSM" },
  { name: "Travel Hoodie", desc: "Heavyweight full-zip hoodie for LAN events, travel days, off-stream content. Sponsor-ready front and back.", gsm: "320–360 GSM" },
];

const fabricChoices = [
  { name: "Poly-Spandex Stretch", best: "Jerseys · 4-way stretch · all-over print", moq: "50 pcs" },
  { name: "Birdseye Mesh Knit", best: "Side panels · max airflow · long sessions", moq: "50 pcs" },
  { name: "Performance Interlock", best: "Smooth hand · premium feel · tournament jerseys", moq: "50 pcs" },
  { name: "Brushed Poly Fleece", best: "Hoodies · 320 GSM · cold LAN halls", moq: "50 pcs" },
  { name: "Recycled Poly (rPET)", best: "Eco-aware orgs · sustainability story", moq: "50 pcs" },
];

const customisation = [
  { icon: Gamepad2, title: "Gamer tag & number", desc: "Sublimated, not stitched. Special characters supported (xX_, _, etc). Won't peel or fade through washes." },
  { icon: Palette, title: "Full all-over print", desc: "Sponsor panels, neon gradients, geometric patterns, character art. Unlimited colours, no setup fees, no minimum print area." },
  { icon: Crown, title: "Sponsor-ready", desc: "Front, back, sleeves, and pant legs. Re-up a sponsor mid-season for the next event without redoing the design." },
  { icon: Zap, title: "Roster-friendly", desc: "Different names/gamer tags per shirt in one order. Send us your roster, we lay it out per garment." },
];

const useCases = [
  { who: "Pro / semi-pro teams", what: "Competitive roster kit, tournament drops, season reveals" },
  { who: "Amateur leagues & clubs", what: "College esports, community leagues, high school teams" },
  { who: "Tournament organizers", what: "LAN events, online cups, charity tournaments, expo booths" },
  { who: "Streamers & content creators", what: "Merch drops, subscriber rewards, brand collaborations" },
  { who: "Gaming brands", what: "Promotional apparel, retail capsule, IP collaborations" },
  { who: "Sponsors & partners", what: "Co-branded staff apparel, event giveaways, hospitality kits" },
];

const pricing = [
  { qty: "50 pcs", jersey: "$15.00", hoodie: "$24.00", note: "team / event" },
  { qty: "100 pcs", jersey: "$12.50", hoodie: "$20.00", note: "season kit" },
  { qty: "300 pcs", jersey: "$10.50", hoodie: "$17.00", note: "league / merch" },
  { qty: "500 pcs", jersey: "$9.00", hoodie: "$15.00", note: "tournament bulk" },
  { qty: "1,000+ pcs", jersey: "$7.50", hoodie: "$12.50", note: "brand drop" },
];

const faq = [
  {
    q: "Can you print gamer tags with special characters (xX_, _, etc)?",
    a: "Yes. We support any UTF-8 characters including underscores, brackets, periods, and most non-Latin scripts. Just send us the exact spelling — we'll proof it back to you before production.",
  },
  {
    q: "What about non-English characters (Korean, Japanese, Chinese)?",
    a: "All supported. We work with esports teams from Korea, Japan, China, SEA, EU, and NA — we handle CJK characters, hangul, kana, and combining marks cleanly.",
  },
  {
    q: "Can the sponsor logos be changed mid-season?",
    a: "Yes. We keep the master file on file for 2 years. New sponsor versions are just the per-unit print difference — no setup fee, no design fee. You can have multiple sponsor variants in one order.",
  },
  {
    q: "Will neon / bright colours fade?",
    a: "No. Sublimation dyes the fabric itself (not surface print), so colours are part of the fibre. They won't crack, peel, or fade — even after 100+ washes. Neon pinks, cyans, and electric greens stay vibrant.",
  },
  {
    q: "Can you match a Twitch / YouTube colour palette exactly?",
    a: "Yes. Send us the brand swatch (hex codes or Pantone) and we'll match. Most esports brand colours are CMYK-friendly so we can hit them precisely.",
  },
];

export default function EsportsPage() {
  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Esports Jerseys", path: "/products/esports" },
      ])} />
      <JsonLd data={buildFaqJsonLd(faq)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Custom Esports Apparel — Jerseys, Hoodies, Team Kits",
        "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/og-default.jpg`,
        "description": "Custom sublimation esports apparel — jerseys, hoodies, tees, team kits. MOQ 50 pcs, DDP shipping worldwide.",
        "brand": { "@type": "Brand", "name": "SublimApparel" },
        "manufacturer": { "@type": "Organization", "name": "SublimApparel" },
        "offers": {
          "@type": "Offer",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/products/esports/`,
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
              08 / Apparel · Esports
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
              Custom esports.
              <br />
              <span className="text-[#cc3d00]">Bold. Loud. On-camera.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-neutral-700 md:text-lg">
              Sublimated jerseys, hoodies, and team kits for pro teams, college esports, tournament organizers, and streamers. Full all-over print, gamer tag front and back, sponsor-ready. At factory-direct pricing.
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
              <Gamepad2 className="mx-auto h-24 w-24 text-[#cc3d00] md:h-32 md:w-32" strokeWidth={1.5} />
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white">Pro Teams · Tournaments</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white">Streamers · Colleges</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-0 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`p-8 ${i < 3 ? "border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 border-black md:border-b-0" : ""}`}>
              <div className={`text-4xl font-black md:text-5xl ${s.color === "orange" ? "text-[#cc3d00]" : "text-black"}`}>{s.value}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-widest text-black">{s.label}</div>
              <div className="mt-1 text-xs text-neutral-500">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 001.5 / Gallery ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">From <span className="text-[#cc3d00]">scrim server</span> to main stage.</h2>
          <div className="mt-10 grid gap-0 md:grid-cols-3">
            <div className="border-2 border-black bg-white">
              <img src="/esports-jersey-prodigy.webp" alt="Custom sublimated black esports jersey with neon geometric print and gamer tag" className="aspect-[4/5] w-full object-cover" />
              <div className="border-t-2 border-black p-3 text-xs font-black uppercase tracking-widest text-black">Match Jersey · Prodigy</div>
            </div>
            <div className="border-2 border-t-0 border-black bg-white md:border-t-2 md:border-l-0">
              <img src="/esports-hoodie-circuit.webp" alt="Custom sublimated charcoal gamer hoodie with circuit board pattern print" className="aspect-[4/5] w-full object-cover" />
              <div className="border-t-2 border-black p-3 text-xs font-black uppercase tracking-widest text-black">Gamer Hoodie · Circuit</div>
            </div>
            <div className="border-2 border-t-0 border-black bg-white md:border-t-2 md:border-l-0">
              <img src="/esports-travel-hoodie.webp" alt="Custom sublimated black full-zip travel hoodie with brand identity print" className="aspect-[4/5] w-full object-cover" />
              <div className="border-t-2 border-black p-3 text-xs font-black uppercase tracking-widest text-black">Travel Hoodie · LAN</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 002 / Styles ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">From <span className="text-[#cc3d00]">match jersey</span> to travel hoodie.</h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">The full range of esports apparel — all sublimation-ready, all built for the camera.</p>
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Stream-ready. <span className="text-[#cc3d00]">LAN-proof.</span></h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">Performance fabrics chosen for marathon sessions — breathable, stretch, and camera-friendly.</p>
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
                <div className="col-span-3 p-3 font-black text-[#cc3d00]">{f.moq}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 004 / Customisation ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Tournament-ready <span className="text-[#cc3d00]">detail.</span></h2>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
            {customisation.map((c, i) => (
              <div key={c.title} className={`p-6 ${i < 3 ? "lg:border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 lg:border-b-0 border-black" : ""} ${i === 2 ? "border-b-2 lg:border-b-0 border-black" : ""}`}>
                <c.icon className="h-8 w-8 text-[#cc3d00]" strokeWidth={2} />
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl">From <span className="text-[#cc3d00]">scrim server</span> to the main stage.</h2>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <div key={u.who} className={`p-6 ${i < 3 ? "lg:border-r-2 border-neutral-800" : ""} ${i < 3 ? "border-b-2 lg:border-b-0 border-neutral-800" : ""} ${i === 3 || i === 4 ? "border-b-2 lg:border-b-0 border-neutral-800 md:border-r-2 md:border-b-0" : ""}`}>
                <Users className="h-6 w-6 text-[#cc3d00]" strokeWidth={2} />
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl">A fraction of <span className="text-[#cc3d00]">retail.</span></h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">Starting prices for sublimation esports jerseys and hoodies. Retail equivalent is $50+ — you get the same fabric and quality, factory-direct.</p>
          <div className="mt-10 border-2 border-black bg-white">
            <div className="grid grid-cols-12 border-b-2 border-black bg-black text-xs font-black uppercase tracking-widest text-white">
              <div className="col-span-3 p-3">Quantity</div>
              <div className="col-span-3 border-l-2 border-white p-3">Esports Jersey</div>
              <div className="col-span-3 border-l-2 border-white p-3">Gamer Hoodie</div>
              <div className="col-span-3 border-l-2 border-white p-3">Note</div>
            </div>
            {pricing.map((p, i) => (
              <div key={p.qty} className={`grid grid-cols-12 text-sm ${i < pricing.length - 1 ? "border-b-2 border-black" : ""}`}>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-black">{p.qty}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#cc3d00]">{p.jersey}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#cc3d00]">{p.hoodie}</div>
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
                  <span className="ml-4 shrink-0 text-2xl font-black text-[#cc3d00] transition-transform group-open:rotate-45">+</span>
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
          <h2 className="text-4xl font-black leading-tight md:text-7xl">Got a roster? <br />Get a quote in 1 business day.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-a-quote" className="group inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#cc3d00]">
              Get an Esports Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
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
