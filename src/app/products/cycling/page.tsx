import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bike, Users, Palette, Ruler, Layers, Wind } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Cycling Jerseys | Sublimation Cycling Apparel for Teams & Clubs | SublimPrint",
  description:
    "Premium custom cycling jerseys, shorts, and kits via sublimation. Italian-performance fabric, full hidden zip, race-cut or club-cut, padded shorts. MOQ 50 pcs. Free design redraw.",
  keywords: [
    "custom cycling jerseys",
    "sublimation cycling kit",
    "cycling team apparel",
    "cycling uniform",
    "bike jersey custom",
    "road cycling kit",
    "triathlon suit",
    "cycling club uniform",
    "all over print cycling",
    "racing cycling jersey",
  ],
};

const stats = [
  { value: "50", label: "MOQ (PCS)", note: "team kit MOQ", color: "orange" },
  { value: "15–20", label: "DAYS LEAD TIME", note: "premium build", color: "white" },
  { value: "120–180", label: "GSM ITALIAN", note: "performance fabric", color: "white" },
  { value: "$25–50", label: "STARTING JERSEY", note: "vs $100–335 retail", color: "orange" },
];

const styles = [
  { name: "Race-Cut Short Sleeve Jersey", desc: "Tight aero fit, dropped hem, full hidden zip, 3 rear pockets. The pro-tier cut.", gsm: "120–140 GSM" },
  { name: "Club-Cut Short Sleeve Jersey", desc: "Relaxed fit, longer hem, easy-entry zip. Best for events, charity rides, weekly group rides.", gsm: "140–160 GSM" },
  { name: "Long Sleeve Jersey", desc: "Cooler-weather racing, spring classics, gravel. Same race or club cut with thermal option.", gsm: "160–180 GSM" },
  { name: "Sleeveless Base Layer", desc: "Mesh under-jersey, printed or solid, used in pro peloton. Brand undergarment option.", gsm: "100–120 GSM" },
  { name: "Cycling Vest", desc: "Wind-front, mesh-back, race fit. Shoulder season staple.", gsm: "120–150 GSM" },
  { name: "Padded Cycling Shorts", desc: "8h Italian chamois, 4-way stretch, 6-panel cut. Bib or waist.", gsm: "200–220 GSM" },
];

const fabricChoices = [
  { name: "Italian Performance Poly", best: "Pro race jerseys · moisture-wicking · 4-way stretch", moq: "50 pcs" },
  { name: "Birdseye Mesh Panels", best: "Side panels · under-arm gussets · max ventilation", moq: "50 pcs" },
  { name: "UPF 50+ Sun Protection", best: "Long-distance · UV-rated · mid-day rides", moq: "50 pcs" },
  { name: "Recycled Poly (rPET)", best: "Eco story · carbon-conscious teams · retail-friendly", moq: "100 pcs" },
  { name: "Compression Lycra", best: "Shorts · base layers · body-hugging fit", moq: "100 pcs" },
];

const customisation = [
  { icon: Bike, title: "Race or club cut", desc: "Pick the silhouette. Race cut is tight and aero; club cut is roomy and forgiving. You can mix within an order (drivers/racers race, weekend warriors club)." },
  { icon: Palette, title: "Sponsor panels", desc: "Sub-sponsor chest strip, sleeve bands, side panels, back yoke. All sublimated — no stitched-on decals to peel." },
  { icon: Wind, title: "Aerodynamic print", desc: "All-over pattern print that doesn't catch wind or weigh you down. Tested by amateur road teams in real racing." },
  { icon: Ruler, title: "6+ European sizes", desc: "XS to 3XL in men's and women's cuts. Tall and petite options. Send your size sheet — we'll match to our grading." },
];

const useCases = [
  { who: "Road racing teams", what: "Pro-team and amateur-race kit design" },
  { who: "Cycling clubs", what: "Member kits, weekly group ride, charity rides" },
  { who: "Triathlon squads", what: "Tri suits and race-day apparel" },
  { who: "Gravel & MTB crews", what: "Looser cuts, dirty jerseys, trail-ready" },
  { who: "Bike shops & sponsors", what: "Shop jerseys, brand co-marketing, event tees" },
  { who: "Charity & event rides", what: "Century rides, MS Society, Tour de France viewing parties" },
];

const pricing = [
  { qty: "50 pcs", jersey: "$25.00", shorts: "$32.00", note: "club / event" },
  { qty: "100 pcs", jersey: "$22.50", shorts: "$28.00", note: "team bulk" },
  { qty: "300 pcs", jersey: "$19.50", shorts: "$24.50", note: "series-wide" },
  { qty: "500 pcs", jersey: "$17.00", shorts: "$21.50", note: "retail / charity" },
  { qty: "1,000+ pcs", jersey: "$15.00", shorts: "$19.00", note: "national team" },
];

const faq = [
  {
    q: "What's the difference between race-cut and club-cut?",
    a: "Race-cut is tight and aerodynamic, sleeves hit mid-bicep, hem dropped at the back. Club-cut is more relaxed — easier entry, no compression, longer body. For mixed teams, racers wear race-cut, casual members wear club-cut. Both can be sublimated with the same design.",
  },
  {
    q: "Can you make padded shorts?",
    a: "Yes. We work with 8h Italian chamois as standard (suitable for rides up to 8 hours). For ultra-endurance events we offer a 12h chamois upgrade. Bibs and waist-cut both available.",
  },
  {
    q: "Do you offer women's specific cuts?",
    a: "Yes. Women's cut has narrower shoulders, longer back, shorter front zip, and a women-specific chamois. We can mix men's and women's cuts in one order at no surcharge.",
  },
  {
    q: "Can I get a fully custom chamois?",
    a: "We can source most major chamois brands (Elastic Interface, Cytech, etc.) at additional cost. Default is a high-quality Italian 8h chamois which is what 95% of teams go with.",
  },
  {
    q: "Is the fabric sweat-wicking?",
    a: "Yes. All our cycling fabrics are moisture-wicking polyester with 4-way stretch. We don't use cotton in cycling kits — cotton stays wet, weighs you down, and chafes.",
  },
];

export default function CyclingPage() {
  return (
    <main>
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl gap-0 px-6 md:grid-cols-12">
          <div className="md:col-span-7 py-16 md:py-24">
            <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              05 / Apparel · Cycling
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
              Custom
              <br />
              sublimation
              <br />
              <span className="text-[#ff4d00]">cycling.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-neutral-700 md:text-lg">
              Italian-performance fabric, full hidden zip, race-cut or club-cut. Premium cycling kits for road teams, triathlon squads, gravel crews, charity rides — at factory-direct pricing, not $335 retail.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/get-a-quote" className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black">
                Get a Cycling Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link href="/cases/endurance-race-events" className="inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white">
                See Cycling Cases
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 border-t-2 border-black md:border-l-2 md:border-t-0 bg-[#0a0a0a] flex items-center justify-center p-10">
            <div className="text-center">
              <Bike className="mx-auto h-24 w-24 text-[#ff4d00] md:h-32 md:w-32" strokeWidth={1.5} />
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white">Road · Triathlon · Gravel</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white">Club · Pro · Charity</p>
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
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 002 / Styles ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">From race-cut to <span className="text-[#ff4d00]">padded bibs.</span></h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">Every piece in a full kit — jerseys, vests, base layers, shorts, bibs.</p>
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Italian. <span className="text-[#ff4d00]">Peloton-grade.</span></h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">We use the same fabric families as $100+ retail cycling kits — just without the brand markup.</p>
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Team kit. <span className="text-[#ff4d00]">Built your way.</span></h2>
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl">From <span className="text-[#ff4d00]">peloton</span> to back of pack.</h2>
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
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">Starting prices for full sublimation cycling jerseys and padded shorts. Retail equivalent is $100–335 — you get the same fabric, factory-direct.</p>
          <div className="mt-10 border-2 border-black bg-white">
            <div className="grid grid-cols-12 border-b-2 border-black bg-black text-xs font-black uppercase tracking-widest text-white">
              <div className="col-span-3 p-3">Quantity</div>
              <div className="col-span-3 border-l-2 border-white p-3">Jersey</div>
              <div className="col-span-3 border-l-2 border-white p-3">Padded Shorts</div>
              <div className="col-span-3 border-l-2 border-white p-3">Note</div>
            </div>
            {pricing.map((p, i) => (
              <div key={p.qty} className={`grid grid-cols-12 text-sm ${i < pricing.length - 1 ? "border-b-2 border-black" : ""}`}>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-black">{p.qty}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#ff4d00]">{p.jersey}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#ff4d00]">{p.shorts}</div>
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
          <h2 className="text-4xl font-black leading-tight md:text-7xl">Got a team? <br />Get a quote in 1 business day.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-a-quote" className="group inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#ff4d00]">
              Get a Cycling Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
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
