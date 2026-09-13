import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { RequestQuoteLink } from "@/components/request-quote-link";
import { ArrowRight, Globe, Anchor, Container, Ship, MapPin, FileCheck, Package, Truck, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { buildFobShippingPageGraph } from "@/lib/breadcrumb";

export const metadata = buildPageMetadata({
  // 2026-09-13 (R55): title rewritten for CTR — leads with
  // "FOB shipping from China" (the dominant search query),
  // tightens the spelling ("Incoterms" / "FOB Yiwu"), and
  // adds the year-dynamic brand suffix in ogTitle. 56 chars.
  title: "FOB Shipping from China — FOB Yiwu, CIF, EXW Incoterms",
  // 2026-09-13 (R55): description rewritten — leads with
  // "FOB shipping from China" + "CIF" + "EXW" for PAA
  // coverage, names the buyer profile (own US/EU customs
  // broker), and ends with the three hand-off points so the
  // snippet matches every incoterm query. 156 chars.
  description:
    "FOB (Free On Board), CIF, and EXW shipping from Yiwu, China. For buyers with their own US/EU customs broker. Hand off at the factory, origin port, or destination port.",
  // 2026-09-13 (R55): explicit ogTitle/ogDescription for
  // social-share CTR — the search title leads with the
  // primary keyword, the social title is shorter and
  // action-oriented.
  ogTitle: "FOB Shipping from China — FOB Yiwu Terms | Yiwu Factory",
  ogDescription:
    "FOB / CIF / EXW shipping from Yiwu, China. 9-step buyer-controlled process. Hand off at the gate, origin port, or destination port.",
  keywords: [
    "FOB shipping from China",
    "FOB Yiwu",
    "Free On Board shipping",
    "CIF shipping China",
    "EXW shipping Yiwu",
    "FOB Ningbo",
    "buyer arranged freight",
    "incoterms FOB CIF EXW",
    "FOB vs DDP",
  ],
});

// 2026-09-12 (R54): Incoterm comparison strip on the FOB page.
// Mirrors the DDP page's `whatDdp` table but with the three
// incoterms the FOB page actually covers (FOB, CIF, EXW) — DDP
// is the fourth option but lives on its own page.
const whatFob = [
  { tag: "FOB", label: "Free On Board", whoPaysShipping: "Factory to origin port", whoPaysDuties: "You", riskTransfersAt: "Origin port" },
  { tag: "CIF", label: "Cost, Insurance & Freight", whoPaysShipping: "Factory to destination port", whoPaysDuties: "You", riskTransfersAt: "Destination port" },
  { tag: "EXW", label: "Ex Works", whoPaysShipping: "You (from our gate)", whoPaysDuties: "You", riskTransfersAt: "Our Yiwu factory floor" },
];

// 2026-09-12 (R54): What we hand off vs what the buyer handles
// under FOB. Distinct from the DDP page's `weHandle` block — that
// page promises four things the factory does end-to-end. This
// page promises three specific hand-off points (factory gate,
// origin port, destination port) and is honest that the buyer
// arranges freight + customs + last-mile.
const weHandoff = [
  {
    icon: Package,
    title: "Pickup at our Yiwu factory",
    desc: "EXW: buyer collects at our 2,000 m² Yiwu facility. We pack, palletize, and load onto the buyer's truck.",
  },
  {
    icon: Container,
    title: "Origin port hand-off (FOB)",
    desc: "FOB Yiwu or FOB Ningbo: we deliver the goods across the ship's rail. Bill of lading is issued in the buyer's name.",
  },
  {
    icon: Ship,
    title: "Destination port hand-off (CIF)",
    desc: "CIF: we pay ocean freight + insurance to your destination port. You take it from the dock to your warehouse.",
  },
];

// 2026-09-12 (R54): The 8 core countries we ship to under FOB.
// Mirrors the DDP page's `regions` block, but framed as the
// "destination ports we deliver to" instead of "we handle
// customs here" — because under FOB the buyer handles customs
// at every one of these destinations.
const destinations = [
  {
    region: "North America",
    icon: MapPin,
    rows: [
      { country: "United States", fob: "FOB Yiwu/Ningbo → US ports", note: "LA, Long Beach, NY/NJ, Seattle, Houston" },
      { country: "Canada", fob: "FOB Yiwu/Ningbo → Vancouver / Toronto", note: "West-coast or East-coast routing" },
      { country: "Mexico", fob: "FOB Yiwu/Ningbo → Manzanillo / Veracruz", note: "Limited DDP; FOB is the standard term" },
    ],
  },
  {
    region: "Europe",
    icon: Globe,
    rows: [
      { country: "United Kingdom", fob: "FOB Yiwu/Ningbo → Felixstowe / Southampton", note: "Post-Brexit, your broker files CDS" },
      { country: "EU (DE, FR, IT, ES, NL…)", fob: "FOB Yiwu/Ningbo → Hamburg / Rotterdam / Antwerp", note: "Your IOR files via TARIC; we don't pay duties" },
      { country: "Nordic / Eastern Europe", fob: "FOB Yiwu/Ningbo → Helsinki / Gdansk / Piraeus", note: "Tighter transit windows; book forwarder early" },
    ],
  },
  {
    region: "Asia Pacific & ROW",
    icon: Globe,
    rows: [
      { country: "Australia / New Zealand", fob: "FOB Yiwu/Ningbo → Sydney / Melbourne / Auckland", note: "GST payable by you; Section 321-style entries don't apply" },
      { country: "Japan / South Korea", fob: "FOB Yiwu → Yokohama / Busan", note: "5–8 day transit; many buyers use their own NVOCC" },
      { country: "UAE / Saudi Arabia", fob: "FOB Yiwu/Ningbo → Jebel Ali / Dammam", note: "GCC importers typically have their own broker + IOR" },
    ],
  },
];

// 2026-09-12 (R54): FOB shipping process as a 9-step HowTo. Each
// step is one phase of the real buyer-controlled journey from
// initial PO through delivery and post-delivery support. The
// process differs from the DDP HowTo (R53) in two important
// places:
//  - Step 5/6: factory pickup + FOB port hand-off (no DDP
//    customs bundle).
//  - Step 7/8: buyer-arranged ocean freight + buyer-arranged
//    import customs (where the factory no longer touches the
//    shipment once it crosses the ship's rail).
// 9 steps falls comfortably in Google's recommended HowTo
// range (3-10 ideal, up to ~25 supported).
const fobHowTo = {
  name: "How FOB Shipping from China to Your Port Works — Step by Step",
  description:
    "The 9-step FOB (Free On Board) shipping process for custom apparel from our Yiwu factory to a buyer-arranged destination port: PO, sample, production, QC, factory pickup, FOB origin-port hand-off, buyer ocean freight, buyer import customs + duties, and last-mile delivery.",
  totalTime: "P35D",
  steps: [
    {
      name: "Issue the purchase order and confirm FOB terms",
      text: "Send the PO with FOB Yiwu (or FOB Ningbo) as the agreed incoterm. We confirm the price, lead time, packing, and the specific origin port the goods will be loaded at. FOB Yiwu is the most common; FOB Ningbo is the alternative if the container needs to stage at Ningbo-Zhoushan port.",
    },
    {
      name: "Approve the pre-production sample",
      text: "We send a 3-7 day pre-production sample so you can confirm hand-feel, color vibrancy, fit, and print placement before bulk production starts. Existing customers with a design + fabric on file can skip this step and move directly to bulk.",
    },
    {
      name: "Production at our Yiwu factory",
      text: "Bulk production runs 10-20 days at our 2,000 m² Yiwu facility depending on technique (sublimation 10-15 days, screen-print 12-18 days, embroidery 8-12 days, DTF 7-10 days). Daily status updates and milestone photos for full transparency.",
    },
    {
      name: "100% final QC and AQL inspection",
      text: "Every garment is individually inspected against the AQL 2.5 sampling plan. Defect rate must be below 2.5% (or below 1.0% for critical defects) before the order can ship. Defect photos are shared with you for transparency and pre-clearance approval.",
    },
    {
      name: "Factory pickup at our Yiwu warehouse",
      text: "Your freight forwarder (or our recommended one) picks up the packed cartons at our Yiwu warehouse. EXW buyers: pickup is at our factory gate. FOB buyers: we deliver the cargo to Yiwu or Ningbo port and load it across the ship's rail.",
    },
    {
      name: "FOB origin-port hand-off across the ship's rail",
      text: "For FOB Yiwu or FOB Ningbo, the goods cross the ship's rail at the origin port. We issue the Bill of Lading (B/L) in your name (or your forwarder's). From this moment on, the cargo and the transit risk are yours — that is the FOB risk transfer point defined by Incoterms 2020.",
    },
    {
      name: "Ocean freight booked by your forwarder",
      text: "Your forwarder books the ocean freight (FCL or LCL) to your destination port. Transit is typically 14-22 days to US West Coast, 22-30 days to US East Coast, 28-35 days to EU, 20-25 days to Australia. Your forwarder buys freight at the rate you negotiated — that is the main cost saving vs. DDP for high-volume importers.",
    },
    {
      name: "Import customs clearance + duties + taxes (you)",
      text: "Your customs broker (or your in-house compliance team) files the import entry, classifies under HTS / TARIC / Schedule B, pays all import duties, VAT, GST, and brokerage fees. The shipment is in your name the whole time — if customs holds it, you (or your broker) resolve it. This is the buyer's side of FOB that first-time importers find hardest.",
    },
    {
      name: "Last-mile delivery to your warehouse + re-order support",
      text: "From the destination port, your forwarder dispatches the container (FCL) or deconsolidated cartons (LCL) to your warehouse. You arrange drayage, devanning, and final-mile yourself. Re-orders from the same design are quoted in 24 hours with the same FOB terms locked in. We keep your spec on file for 24 months.",
    },
  ],
};

// 2026-09-12 (R54): FAQ inlined into the page @graph via
// buildFaqPageNode (same R47 contract used on /compare/ddp-vs-fob/,
// /shipping/ddp/, and every other FAQ-bearing page).
// 2026-09-13 (R55): FAQs expanded from 5 to 7 to capture more
// PAA surfaces. New Q6 targets "FOB vs CIF" intent (high-
// volume PAA query on the buyer's-incoterm page). New Q7
// targets commercial-intent "FOB shipping cost per kg" —
// the kind of question a buyer asks after the definitions
// and before the quote request. Both fit Google's PAA
// "people also ask" boxes for the dominant FOB queries.
const fobFaqs = [
  {
    q: "What is FOB shipping from China?",
    a: "FOB (Free On Board) is an international shipping term (incoterm) where the factory (seller) is responsible for delivering the goods to the origin port — Yiwu or Ningbo for our shipments — and loading them across the ship's rail. From that point on, the buyer takes ownership of the cargo, arranges ocean freight, clears import customs, pays duties, and handles last-mile delivery. FOB is one of the most common incoterms for B2B apparel orders where the buyer already has a freight forwarder and customs broker relationship.",
  },
  {
    q: "What is the difference between FOB, CIF, and EXW shipping?",
    a: "FOB (Free On Board): the factory delivers the goods across the ship's rail at the origin port. You arrange ocean freight, customs, duties, and last-mile. CIF (Cost, Insurance, Freight): the factory pays ocean freight + insurance to your destination port; you still handle customs, duties, and last-mile. EXW (Ex Works): the buyer picks up cartons at our 2,000 m² Yiwu factory gate and arranges everything from the factory floor onwards. EXW gives the buyer maximum control; CIF is the most balanced; FOB is the most common for mid-size B2B apparel orders.",
  },
  {
    q: "Why choose FOB shipping over DDP?",
    a: "FOB is typically chosen by experienced importers who (1) have their own customs broker and freight forwarder relationships and want to keep using them, (2) negotiate ocean freight at NVOCC trade rates and pass the savings on, (3) need to control the import side of the supply chain for compliance or Section 301 reasons, or (4) are doing 5+ containers per year and have a US/EU broker on retainer. First-time importers almost always do better on DDP because the forwarder's bundled duty rate is often cheaper than the buyer's first-time single-shipment quote.",
  },
  {
    q: "Can I switch from FOB to DDP mid-order?",
    a: "Yes, but only before the goods leave the origin port. Once the cargo is on the vessel under FOB terms, ownership has transferred to the buyer (the Bill of Lading is in your name). If you realize mid-production that you cannot handle customs on the destination side, you can re-route the cargo to a DDP forwarder at the origin port — but expect a 10-20% premium for the late change. Best practice: pick DDP vs FOB at quote time, not at ship time.",
  },
  {
    q: "Do I need a US customs broker to do FOB shipping from China?",
    a: "Yes. Under FOB terms the import entry is in your name and you (or your broker) are the Importer of Record (IOR). If you don't have a US customs broker, we can recommend one — but the broker relationship is yours, not ours. This is the single biggest practical reason first-time importers start on DDP and migrate to FOB once they're doing 5+ containers per year and have a broker they trust. The same applies to EU buyers (EORI requirement) and UK buyers post-Brexit.",
  },
  {
    q: "FOB vs CIF — which is better for first-time importers?",
    a: "Neither — first-time importers should use DDP. CIF is closer to FOB than to DDP: the factory still pays ocean freight and insurance to your destination port, but you still clear customs, pay duties, and arrange last-mile. If you've never imported before, you don't have a customs broker, you don't know HTS classification, and you don't have a duty-payment account set up. DDP lets you receive the goods at your warehouse with one invoice. CIF is appropriate once you have a broker but want the factory to negotiate ocean freight on your behalf. FOB is appropriate once you negotiate ocean freight yourself at NVOCC trade rates.",
  },
  {
    q: "How much does FOB shipping from China cost per kg?",
    a: "FOB cost has two components: the factory's FOB price (per piece) and the ocean freight (per kg or per CBM) you book separately. Ocean freight for a 20' FCL from Yiwu to the US West Coast runs $1,200-2,200 (about $0.30-0.55/kg for a full container); to the US East Coast $2,500-4,500; to UK / EU $1,800-3,500; to Australia $1,500-2,800. LCL is more expensive per kg ($0.80-1.50/kg) but lets you ship under one container. We quote FOB Yiwu / FOB Ningbo on every inquiry — the freight portion is yours to book with your own forwarder or our recommended NVOCC partner.",
  },
  // 2026-09-13 (R57): 2 new PAA questions added. Q8 targets the
  // dedicated "FOB vs EXW" intent — Q2 covered the three
  // incoterms in one pass, but Google's PAA shows the EXW-vs-FOB
  // pair as its own distinct box (high search volume from
  // first-time importers weighing the two buyer-controlled
  // options). Q9 targets the "FOB shipping documents" intent —
  // a routine pre-shipment question from a buyer's compliance
  // team that wants to know which paperwork the factory
  // prepares vs which the buyer arranges. Both fit cleanly
  // alongside the existing 7 FAQs and keep the FAQPage node
  // at 9 entries, which is within Google's recommended
  // 3-10 range for PAA extraction.
  {
    q: "What is the difference between FOB and EXW shipping?",
    a: "FOB (Free On Board) and EXW (Ex Works) are both buyer-controlled incoterms — the seller does not arrange ocean freight or customs — but the hand-off point and the buyer's responsibility differ. Under FOB Yiwu or FOB Ningbo, the factory delivers the goods to the origin port and loads them across the ship's rail; the seller still handles export clearance from China and inland trucking to the port. Under EXW (Ex Works), the buyer takes ownership at our 2,000 m² Yiwu factory floor — the buyer is responsible for pickup at our gate, inland trucking, export clearance from China, ocean freight, and import customs. EXW gives the buyer maximum control and the lowest FOB price (we do not bill for trucking or export clearance), but it requires the buyer to coordinate factory pickup, which is impractical for first-time importers. FOB is the most common compromise: the factory still handles the China-side logistics, and the buyer takes over once the goods cross the ship's rail.",
  },
  {
    q: "What documents are required for FOB shipping from China?",
    a: "Under FOB terms the factory prepares five China-side documents: (1) Commercial Invoice — the buyer's named invoice with the agreed FOB unit price, total, currency, and incoterm code; (2) Packing List — per-carton weight, dimensions, and SKU breakdown; (3) Bill of Lading (B/L) — issued in the buyer's name (or their forwarder's) once the goods cross the ship's rail; (4) Certificate of Origin (C/O) — China-issued, may be required for tariff preference in the destination country; (5) Customs Export Declaration — China-side, filed by us or our export agent. The buyer (or the buyer's customs broker) prepares the import-side paperwork: import entry, HTS / TARIC / Schedule B classification, duty payment, and any destination-country certificates (e.g. FCC for electronics, FDA for food-contact items). Fumigation Certificate and ISPM-15 wood-pallet treatment are only required if the cargo is packed on raw-wood pallets — most apparel shipments use plastic pallets or carton-only packing and skip this step.",
  },
];

export default function FobPage() {
  // 2026-09-12 (R54): consolidate the FOB page's structured
  // data into a single @graph block via buildFobShippingPageGraph.
  // The new graph:
  //   - joins WebPage #webpage (mainEntity round-trip to Service
  //     #service), Service #service (areaServed for 8 core
  //     countries + hasOfferCatalog with FOB/CIF/EXW incoterms),
  //     FAQPage #faq, HowTo #howto (9-step buyer-controlled flow),
  //     and BreadcrumbList into a single @graph with all @id
  //     cross-linking
  //   - The Service node targets "FOB shipping from China" /
  //     "buyer-arranged freight" intent queries for Google's
  //     shipping-terms knowledge panel enrichment
  //   - WebPage + mainEntity → Service round-trip so Google
  //     knows this page IS the authoritative FOB / CIF / EXW
  //     service page (sibling to /shipping/ddp/ in the brand
  //     entity graph)
  //   - The HowTo is gated on fobHowTo being present, so removing
  //     it (or passing undefined) drops the HowTo node entirely
  //     and the schema stays byte-equivalent to the no-HowTo
  //     baseline. Same R53 contract used on /shipping/ddp/.
  const fobGraph = buildFobShippingPageGraph({
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Shipping", path: "/shipping/" },
      { name: "FOB / CIF / EXW", path: "/shipping/fob/" },
    ],
    faq: fobFaqs,
    howto: fobHowTo,
  });
  return (
    <main>
      <JsonLd data={fobGraph} />
      {/* HERO */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
            FOB / CIF / EXW Shipping
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
            FOB shipping
            <br />
            <span className="text-[#0078a8]">from China.</span>
            <br />
            Your freight.
            <br />
            Your forwarder.
            <br />
            Your terms.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/70 md:text-lg">
            For buyers who already have a US/EU customs broker and a freight
            forwarder relationship. We hand off the goods at our Yiwu factory
            (EXW), at the origin port (FOB Yiwu / Ningbo), or at your
            destination port (CIF). From there, you take it. Lower per-unit
            cost, full control, full responsibility.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <RequestQuoteLink
              label="fob / page / Get a FOB quote"
              className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
            >
              Get FOB Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </RequestQuoteLink>
            <Link
              href="/compare/ddp-vs-fob/"
              className="group inline-flex items-center gap-2 border-2 border-white bg-transparent px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
            >
              DDP vs FOB
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED SNIPPET — direct answer for "what is FOB shipping" */}
      <section id="quick-answer" className="border-b-2 border-black bg-[#e6f7ff]">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <div className="mb-3 inline-block border-2 border-black bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
            Quick answer
          </div>
          <h2 className="mb-4 text-3xl font-black leading-[0.95] tracking-tight md:text-4xl">
            What is FOB shipping?
          </h2>
          <p className="text-lg leading-relaxed text-black">
            <strong>FOB (Free On Board) is an international shipping term where the factory is responsible for delivering the goods to the origin port and loading them across the ship&apos;s rail.</strong> From that moment on, the buyer takes ownership of the cargo, arranges ocean freight, clears import customs, pays duties, and handles last-mile delivery to their warehouse. FOB is the standard incoterm for experienced B2B importers with their own customs broker and freight forwarder.
          </p>
        </div>
      </section>

      {/* INCOTERMS comparison */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            Incoterms
          </div>
          <h2 className="mb-8 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            FOB, CIF, or EXW —
            <br />
            <span className="text-[#cc3d00]">which hand-off point fits you?</span>
          </h2>
          <p className="mb-10 max-w-2xl text-base text-black/70">
            All three incoterms transfer the import side to you. They differ
            in where the factory&apos;s responsibility ends — at the gate
            (EXW), at the origin port (FOB), or at the destination port (CIF).
          </p>

          <div className="overflow-x-auto border-2 border-black">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-black bg-black text-left text-xs font-black uppercase tracking-widest text-white">
                  <th className="px-4 py-3">Term</th>
                  <th className="px-4 py-3">Factory delivers to</th>
                  <th className="px-4 py-3">Who pays duties</th>
                  <th className="px-4 py-3">Risk transfers at</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {whatFob.map((r, i) => (
                  <tr
                    key={i}
                    className={
                      "border-b border-black/10 " +
                      (i % 2 === 0 ? "bg-white" : "bg-neutral-50")
                    }
                  >
                    <td className="px-4 py-3 font-black">{r.tag}</td>
                    <td className="px-4 py-3 text-black/80">{r.whoPaysShipping}</td>
                    <td className="px-4 py-3 text-black/80">You</td>
                    <td className="px-4 py-3 text-black/80">{r.riskTransfersAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs font-medium text-black/60">
            Looking for the all-in option? See{" "}
            <Link href="/shipping/ddp/" className="font-black underline">DDP shipping</Link>{" "}
            where we handle customs, duties, and last-mile for you.
          </p>
        </div>
      </section>

      {/* WHAT WE HAND OFF */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-12 flex items-end justify-between border-b border-black/10 pb-6">
            <div>
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-black/60">
                [ 002 / Hand-off points ]
              </div>
              <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
                Three places
                <br />
                <span className="text-[#cc3d00]">we hand the cargo over.</span>
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {weHandoff.map((w, i) => {
              const Icon = w.icon;
              return (
                <div key={i} className="border-2 border-black bg-white p-6">
                  <Icon className="mb-4 h-7 w-7 text-[#cc3d00]" strokeWidth={1.5} />
                  <h3 className="mb-2 text-lg font-black leading-tight">{w.title}</h3>
                  <p className="text-sm leading-relaxed text-black/70">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DESTINATIONS — where we ship under FOB */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 flex items-end justify-between border-b border-black/10 pb-6">
            <div>
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-black/60">
                [ 003 / Coverage ]
              </div>
              <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
                FOB to
                <br />
                <span className="text-[#cc3d00]">100+ destination ports.</span>
              </h2>
            </div>
            <div className="hidden text-right md:block">
              <div className="text-xs font-bold uppercase tracking-widest text-black/60">Average lead time</div>
              <div className="mt-1 text-3xl font-black">25–40 days</div>
            </div>
          </div>

          <div className="space-y-8">
            {destinations.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className="border-2 border-black">
                  <div className="flex items-center gap-3 border-b-2 border-black bg-black px-5 py-3 text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                    <h3 className="text-lg font-black uppercase tracking-wider">{r.region}</h3>
                  </div>
                  <div className="divide-y divide-black/10">
                    {r.rows.map((row, j) => (
                      <div key={j} className="grid gap-1 px-5 py-4 md:grid-cols-3 md:gap-4">
                        <div className="font-black">{row.country}</div>
                        <div className="text-sm text-black/80">{row.fob}</div>
                        <div className="text-xs font-medium uppercase tracking-wider text-black/70">
                          {row.note}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-sm text-black/60">
            Transit times are estimates for production-ready orders under FOB
            terms. Your forwarder&apos;s contracted rate + your customs
            broker&apos;s release speed determine the final delivery date.
          </p>
        </div>
      </section>

      {/* WHY FOB — for the right buyer */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
            Why FOB
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            FOB is for the buyer
            <br />
            <span className="text-[#cc3d00]">who already has a broker.</span>
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="border-2 border-white/20 bg-white/5 p-6">
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#cc3d00]">
                For high-volume importers
              </div>
              <h3 className="mb-2 text-xl font-black">Trade-rate ocean freight</h3>
              <p className="text-sm leading-relaxed text-white/70">
                If you ship 5+ containers per year, your forwarder&apos;s
                contracted rate is cheaper than the bundled DDP rate. FOB
                lets you keep that savings.
              </p>
            </div>
            <div className="border-2 border-white/20 bg-white/5 p-6">
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#cc3d00]">
                For compliance teams
              </div>
              <h3 className="mb-2 text-xl font-black">Importer of Record in your name</h3>
              <p className="text-sm leading-relaxed text-white/70">
                The cargo is yours from the ship&apos;s rail. Your compliance
                team owns the HTS classification, the country-of-origin
                declaration, and the duty payment. Clean for the audit.
              </p>
            </div>
            <div className="border-2 border-white/20 bg-white/5 p-6">
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#cc3d00]">
                For brands with warehouses
              </div>
              <h3 className="mb-2 text-xl font-black">Direct port-to-warehouse</h3>
              <p className="text-sm leading-relaxed text-white/70">
                Your forwarder delivers from the destination port straight
                to your 3PL. No factory-side consolidation delay, no
                intermediate deconsolidation warehouse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Country-specific destination pages — internal cross-link */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="mb-2 text-xs font-black uppercase tracking-widest text-black/60">
            [ 008 / By destination ]
          </div>
          <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-3xl">
            FOB / CIF / EXW to specific countries
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-black/70">
            For full DDP-style door-to-door service, see the country pages below.
            For FOB, your forwarder takes it from the destination port to your door.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/shipping/usa/"
              className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#00c2ff] hover:shadow-[3px_3px_0_0_#000]"
            >
              🇺🇸 USA <ArrowRight size={14} strokeWidth={3} />
            </Link>
            <Link
              href="/shipping/uk/"
              className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#00c2ff] hover:shadow-[3px_3px_0_0_#000]"
            >
              🇬🇧 UK <ArrowRight size={14} strokeWidth={3} />
            </Link>
            <Link
              href="/shipping/eu/"
              className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#00c2ff] hover:shadow-[3px_3px_0_0_#000]"
            >
              🇪🇺 EU <ArrowRight size={14} strokeWidth={3} />
            </Link>
            <Link
              href="/shipping/au/"
              className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#00c2ff] hover:shadow-[3px_3px_0_0_#000]"
            >
              🇦🇺 Australia <ArrowRight size={14} strokeWidth={3} />
            </Link>
            <Link
              href="/shipping/canada/"
              className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#00c2ff] hover:shadow-[3px_3px_0_0_#000]"
            >
              🇨🇦 Canada <ArrowRight size={14} strokeWidth={3} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ff4d00] text-black">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <h2 className="text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Get a FOB / CIF quote
            <br />
            within 1 business day.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-lg">
            Tell us the destination port, incoterm (FOB / CIF / EXW),
            and quantity. We&apos;ll come back with the factory-side
            price and the agreed hand-off point.
          </p>
          <RequestQuoteLink
            label="fob / page / Get a quote"
            className="mt-8 inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
          >
            Get FOB Quote
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </RequestQuoteLink>
        </div>
      </section>
    </main>
  );
}
