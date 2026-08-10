import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flag, Users, Palette, Ruler, Layers, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Racing Apparel | Sublimation Motorsport, Auto Club, Track Day",
  description:
    "Custom sublimation racing apparel for motorsport teams, auto clubs, track days, and racing series. Full all-over print, no setup fee, MOQ 50 pcs. Crew tees, polos, mechanic shirts, fan wear.",
  keywords: [
    "custom racing shirts",
    "motorsport apparel",
    "sublimation racing",
    "auto club shirts",
    "track day apparel",
    "racing team uniforms",
    "motorsport fan wear",
    "driving team shirts",
    "all over print racing",
    "race day uniform",
  ],
};

const stats = [
  { value: "50", label: "MOQ (PCS)", note: "true low-MOQ", color: "orange" },
  { value: "10–15", label: "DAYS LEAD TIME", note: "production + QC", color: "white" },
  { value: "180–220", label: "GSM POLY", note: "moisture-wicking", color: "white" },
  { value: "100+", label: "COUNTRIES DDP", note: "ships race-week", color: "orange" },
];

const styles = [
  { name: "Crew Neck Tee", desc: "The workhorse. Sponsor logos front + back + sleeves, all in one sublimation.", gsm: "180–200 GSM" },
  { name: "Polo Shirt", desc: "For team principals, sponsors, hospitality. Button placket, collar, side vents.", gsm: "200–220 GSM" },
  { name: "Long Sleeve Tee", desc: "Cooler race-day morning wear. Sub-sponsor cuffs, fire-resistant option.", gsm: "180–200 GSM" },
  { name: "Mechanic / Pit Shirt", desc: "Loose fit, reinforced seams, lots of cargo pocket real estate. Pit crew + hospitality.", gsm: "220–240 GSM" },
  { name: "Fan Wear Tee", desc: "Retail-fit, fashion-forward cuts, packed in polybag. Resale and merchandise.", gsm: "160–180 GSM" },
  { name: "Kids' Race Day", desc: "CPSIA-compliant, sized for 2Y–14Y, matching adult designs.", gsm: "160–180 GSM" },
];

const fabricChoices = [
  { name: "Polyester Interlock", best: "All-around · smooth · true all-over print", moq: "50 pcs" },
  { name: "Birdseye Mesh", best: "Hot pit lanes · breathability · quick-dry", moq: "50 pcs" },
  { name: "Fire-Resistant (Nomex IIIA)", best: "Pit crew · track-side · FR-rated", moq: "100 pcs" },
  { name: "Coolmax Performance", best: "Long race days · premium · moisture-wicking", moq: "100 pcs" },
  { name: "Recycled Poly", best: "Eco story · paddock-friendly · retail", moq: "100 pcs" },
];

const customisation = [
  { icon: Palette, title: "All-over print", desc: "Sponsor panels, hero logo, car silhouette, lap chart — all printed, no decals. Up to 6+ logos in one design." },
  { icon: Flag, title: "Car & track graphics", desc: "Send us your car photo, livery, or track layout. We redraw it for free as part of the design service." },
  { icon: Award, title: "Number panels + flags", desc: "Driver numbers, country flags, series logos, championship patches. All sublimated, not stitched." },
  { icon: Ruler, title: "Crew + driver sizing", desc: "Standard men's, women's, and youth sizing. Custom size charts on request for sponsor fits." },
];

const useCases = [
  { who: "Pro racing teams", what: "Pro-tier team kits for endurance, GT, open-wheel, rally" },
  { who: "Track day clubs", what: "Member shirts, event apparel, instructor polos" },
  { who: "Sponsorship activations", what: "Sponsor-branded hospitality wear, paddock merch" },
  { who: "Auto clubs & enthusiasts", what: "BMW CCA, Porsche Club, vintage racing associations" },
  { who: "Sim racing & esports", what: "Sim league team kits, streamer merch" },
  { who: "Race series + promoters", what: "Official series merchandise, official race tees" },
];

const pricing = [
  { qty: "50 pcs", crew: "$13.50", polo: "$17.00", note: "true low-MOQ" },
  { qty: "100 pcs", crew: "$11.20", polo: "$14.50", note: "sponsor orders" },
  { qty: "300 pcs", crew: "$9.50", polo: "$12.50", note: "team bulk" },
  { qty: "500 pcs", crew: "$8.40", polo: "$11.20", note: "fan / retail" },
  { qty: "1,000+ pcs", crew: "$7.50", polo: "$10.00", note: "series-wide" },
];

const faq = [
  {
    q: "Can you print my car's livery and sponsor logos?",
    a: "Yes — we redraw your livery for free as part of the design service. Send a clear photo or vector file and we'll set it up for the shirt panels. For sponsor logos, we need at least 300 DPI vector or PNG with transparent background.",
  },
  {
    q: "Do you offer fire-resistant (FR) fabric?",
    a: "Yes. We stock Nomex IIIA for pit crew and track-side work. It is significantly more expensive than standard polyester and is priced on request. For fans and most non-crew apparel, standard polyester is fine.",
  },
  {
    q: "How fast can you turn around a race-week rush?",
    a: "Standard lead time is 10–15 days. For race-week emergencies we offer a 7-day rush at +20% surcharge, subject to capacity. We've shipped to teams mid-season when a supplier let them down — we get it.",
  },
  {
    q: "Can each driver have a different number and name?",
    a: "Yes, no extra cost. Send a CSV with driver names, numbers, country flags, and sizes. We'll mockup each unique design for your approval before production.",
  },
  {
    q: "Do you do mechanic shirts with pockets?",
    a: "Yes. We can add chest pockets, sleeve pockets, and radio loops. The pockets are sewn (not sublimated) since they need to function — but the pocket fabric can be a printed panel matching the shirt design.",
  },
];

export default function RacingPage() {
  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Racing Kits", path: "/products/racing" },
      ])} />
      <JsonLd data={buildFaqJsonLd(faq)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Custom Racing Apparel",
        "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/og-default.jpg`,
        "description": "Custom sublimation printing, low MOQ 50 pcs, DDP shipping worldwide.",
        "brand": { "@type": "Brand", "name": "SublimApparel" },
        "manufacturer": { "@type": "Organization", "name": "SublimApparel" },
        "offers": {
          "@type": "Offer",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/products/racing/`,
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
              04 / Apparel · Racing
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
              Custom
              <br />
              sublimation
              <br />
              <span className="text-[#ff4d00]">racing.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-neutral-700 md:text-lg">
              All-over print racing apparel for pro teams, track day clubs, sponsors, and series. Sponsor logos, car liveries, driver numbers — all printed, never stitched decals. MOQ 50 pcs, race-week rush available.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/get-a-quote" className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black">
                Get a Racing Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link href="/cases/sports-teams" className="inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white">
                See Team Case Studies
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 border-t-2 border-black md:border-l-2 md:border-t-0 bg-[#0a0a0a] flex items-center justify-center p-10">
            <div className="text-center">
              <Flag className="mx-auto h-24 w-24 text-[#ff4d00] md:h-32 md:w-32" strokeWidth={1.5} />
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white">Pro Teams · Track Days</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white">Sponsors · Race Series</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-0 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`p-8 ${i < 3 ? "border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 border-black md:border-b-0" : ""}`}>
              <div className={`text-5xl font-black md:text-6xl ${s.color === "orange" ? "text-[#ff4d00]" : "text-black"}`}>{s.value}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-widest text-black">{s.label}</div>
              <div className="mt-1 text-xs text-neutral-500">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 002 / Styles ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">From crew to <span className="text-[#ff4d00]">hospitality.</span></h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">Six cuts covering every role on race day — driver, crew, sponsor, fan.</p>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-3">
            {styles.map((s, i) => (
              <div key={s.name} className={`border-black p-6 ${i % 3 !== 2 ? "lg:border-r-2" : ""} ${i < 3 ? "border-b-2" : ""} ${i % 2 === 0 ? "md:border-r-2 lg:border-r-0" : "md:border-r-0"} bg-white`}>
                <div className="text-2xl font-black text-black">{s.name}</div>
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Pit-lane tough. <span className="text-[#ff4d00]">Track-cool.</span></h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">From standard interlock to FR-rated Nomex for working pit crew.</p>
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Sponsors, liveries, <span className="text-[#ff4d00]">all in one print.</span></h2>
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl"><span className="text-[#ff4d00]">Pro teams to fan</span> · paddock to grandstand.</h2>
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Transparent. <span className="text-[#ff4d00]">Race-week ready.</span></h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">Starting prices for full-print sublimation crew tees and polos with sponsor logos and driver numbers.</p>
          <div className="mt-10 border-2 border-black bg-white">
            <div className="grid grid-cols-12 border-b-2 border-black bg-black text-xs font-black uppercase tracking-widest text-white">
              <div className="col-span-3 p-3">Quantity</div>
              <div className="col-span-3 border-l-2 border-white p-3">Crew Tee</div>
              <div className="col-span-3 border-l-2 border-white p-3">Polo</div>
              <div className="col-span-3 border-l-2 border-white p-3">Note</div>
            </div>
            {pricing.map((p, i) => (
              <div key={p.qty} className={`grid grid-cols-12 text-sm ${i < pricing.length - 1 ? "border-b-2 border-black" : ""}`}>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-black">{p.qty}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#ff4d00]">{p.crew}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#ff4d00]">{p.polo}</div>
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
          <h2 className="text-4xl font-black leading-tight md:text-7xl">Got a livery?<br />Get a quote in 1 business day.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-a-quote" className="group inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#ff4d00]">
              Get a Racing Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
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
