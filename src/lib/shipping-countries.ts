// 2026-09-11 (R21-A): country-specific shipping data shared by the 5
// /shipping/{usa,uk,eu,au,canada}/ pages. Keeps all country facts in one
// place so we can fix a wrong duty rate or transit time once instead of
// five times.

export type CountryShipping = {
  /** Slug used in the URL — must match the directory name. */
  slug: "usa" | "uk" | "eu" | "au" | "canada";
  /** Human-readable country/region name shown in the H1. */
  countryName: string;
  /** Short keyword (used in H1 + meta title). */
  keyword: string;
  /** Flag emoji or short code for the hero badge. */
  flag: string;
  /** Hero H1 — must lead with the buyer-search query. */
  h1: string;
  /** Meta description (≤ 160 chars). */
  metaDescription: string;
  /** Page intro paragraph (1–2 sentences). */
  intro: string;
  /** Bullet list of "what's included in our DDP to this country". */
  includes: string[];
  /** Typical duties + tax rates (for buyer education, PAA "what's the
   *  import duty on sublimated shirts to <country>" queries). */
  dutiesAndTax: { label: string; value: string }[];
  /** Transit time range per mode (door-to-door). */
  transit: { mode: string; time: string; price: string }[];
  /** 3–4 country-specific FAQs (PAA + featured snippet targeting). */
  faqs: { q: string; a: string }[];

  // 2026-09-13 (R55): country-specific DDP HowTo spec for the
  // page's #howto structured-data node. The shared template
  // (country-shipping-page.tsx) calls buildCountryDdpHowToNode
  // with this data to emit a 7-step DDP-shipping-to-<country>
  // HowTo in the @graph. The field is optional so older
  // callers that don't pass it stay byte-equivalent to the
  // pre-R55 baseline.
  // 2026-09-13 (R58): added optional estimatedCost (per-kg
  // DDP cost range) so the HowTo node can carry a typed
  // MonetaryAmount.estimatedCost for rich-result eligibility.
  // Omitted when undefined → no behavior change for callers
  // that don't opt in.
  howto?: {
    /** Total DDP lead time as ISO 8601 duration, e.g. "P14D". */
    totalTime: string;
    /** Short duty/VAT context, e.g. "Section 301 + import duty". */
    dutyVatLine: string;
    /** Transit options, e.g. "express, air, or sea (Pacific)". */
    transitMode: string;
    /** Per-kg DDP cost range, e.g. "2–15". */
    estimatedCost?: string;
  };

  // 2026-09-12 (R33-A1): region-level facts for ServiceArea + Country
  // schema nodes. Drives areaServed / addressCountry / identifier in
  // the Service + Country JSON-LD nodes that the shared template now
  // emits. Coordinates point at the country's administrative
  // capital (or Brussels for EU), so the GeoCoordinates are
  // verifiable on a public map and Google trusts them as canonical.
  regionFacts: {
    /** ISO 3166-1 alpha-2 country code (e.g. "US", "GB"), or
     *  "EU" for the supranational region. Used as the
     *  Country.identifier and the ServiceArea.addressCountry
     *  value so Google can match a country-level service surface. */
    isoCountryCode: string;
    /** Administrative capital city shown in the page footer + the
     *  Country.address. */
    capital: string;
    /** Latitude / longitude of the capital — used in
     *  Country.geo. Verifiable on any public map. */
    latitude: number;
    longitude: number;
    /** Local currency code (ISO 4217) — used in the
     *  ServiceArea / Offer priceCurrency references. */
    currency: string;
    /** Short human-readable region label, used in the
     *  Country.name and ServiceArea.name fields. */
    regionLabel: string;
  };
};

export const COUNTRY_SHIPPING: Record<CountryShipping["slug"], CountryShipping> = {
  usa: {
    slug: "usa",
    countryName: "United States",
    keyword: "DDP shipping to USA",
    flag: "🇺🇸",
    h1: "DDP Shipping to USA — Custom Apparel from Yiwu, Delivered to Your Door",
    metaDescription:
      "DDP shipping from China to USA: customs cleared, duties prepaid, door-to-door in 7–14 days. We hold buffer stock at our Fontana, CA warehouse for 2–5 day domestic.",
    intro:
      "We ship custom sublimated apparel from our 2,000 m² Yiwu factory to every US state — mainland, Alaska, and Hawaii included. For most orders we route via the Pacific express, and for repeat or rush orders we pull from our Fontana, CA warehouse for 2–5 day domestic delivery.",
    includes: [
      "Section 301 tariff handling (HTS 6109/6110 — currently duty-free for most apparel under temporary exclusions)",
      "Customs brokerage filed under our US Importer of Record",
      "Prepaid duties + Section 301 freight — no surprise bills on delivery",
      "Last-mile via FedEx Ground, UPS, or LTL freight depending on weight",
      "End-to-end tracking number from Yiwu → your warehouse",
    ],
    dutiesAndTax: [
      { label: "Most apparel (HTS 6109/6110)", value: "0% — duty free under current exclusions" },
      { label: "Section 301 tariff (China origin)", value: "0% to 7.5% depending on category" },
      { label: "MPF (Merchandise Processing Fee)", value: "0.3464% of value, capped at $634.62" },
      { label: "HMF (Harbor Maintenance Fee)", value: "0.125% of value (sea only)" },
    ],
    transit: [
      { mode: "Sea freight (FCL/LCL)", time: "15–28 days", price: "$2–4 / kg" },
      { mode: "Air freight", time: "5–9 days", price: "$5–9 / kg" },
      { mode: "Express (DHL/FedEx)", time: "3–5 days", price: "$8–15 / kg" },
      { mode: "US warehouse (Fontana, CA)", time: "2–5 days", price: "Per UPS / FedEx Ground rate" },
    ],
    faqs: [
      {
        q: "How much is import duty on sublimated apparel from China to the USA?",
        a: "Most sublimated apparel (HTS 6109, 6110, 6111, 6104) is currently 0% duty under the Section 301 tariff exclusions. The 25% Section 301 tariff that applied from 2018–2025 has been suspended for apparel through 2026. You still pay the Merchandise Processing Fee (0.3464% of value, capped at $634.62) and HMF on sea freight. We pay all of these upfront under our DDP terms and include them in the per-piece quote.",
      },
      {
        q: "How long does shipping from China to the USA take?",
        a: "Sea freight from Yiwu to the US west coast: 15–20 days. To the east coast: 22–28 days. Air freight: 5–9 days door-to-door. Express (DHL/FedEx): 3–5 days. From our Fontana, CA warehouse: 2–5 days anywhere in the continental US via FedEx Ground or UPS. We always confirm the actual ETA in your quote based on the destination ZIP code.",
      },
      {
        q: "Do you have a US warehouse for faster delivery?",
        a: "Yes. We hold buffer stock at our 3PL warehouse in Fontana, California for re-orders and rush customers. Note: this is overstock and is not a standard service for all orders — we typically ship first-time orders direct from Yiwu. For repeat customers we offer a stocking program: you pay for the inventory upfront, we hold it, and you get 2–5 day domestic shipping on every release.",
      },
      {
        q: "Can I ship to a US residential address instead of a commercial one?",
        a: "Yes. We can deliver to both. Residential deliveries sometimes add $4–8 per shipment in carrier surcharges, which we include in the DDP quote. If you have a loading dock or can accept LTL freight at a commercial address, sea freight on full pallets is significantly cheaper per kg.",
      },
      // 2026-09-13 (R58): PAA expansion to 7 entries (was 4) — captures
      // the three next-most-asked US DDP questions: Section 301 status
      // (high-volume query from US apparel buyers), the Section 321
      // $800 de minimis loophole for small dropshippers, and US
      // warehouse stocking program timing. All three feed the
      // FAQPage node without disturbing the existing 4 entries.
      {
        q: "Is the Section 301 tariff still applied to apparel from China?",
        a: "For most apparel categories (HTS 6109, 6110, 6111, 6104) the 25% Section 301 tariff that applied 2018–2025 has been suspended through 2026. The current effective rate is 0% for the majority of sublimated apparel, plus the standard 0.3464% MPF and 0.125% HMF. We confirm the exact line-item rate in every quote based on the destination ZIP code and the HTS chapter your product falls under.",
      },
      {
        q: "What is Section 321 de minimis and can I use it for small orders?",
        a: "Section 321 allows shipments under $800 per consignee per day to enter the US duty-free with a single informal entry — this is what most dropshippers and small brands use. Once your shipment exceeds $800 (per consignee, per day), full customs clearance kicks in and DDP becomes the more efficient path. We support both models and route your order to the right lane based on size and destination.",
      },
      {
        q: "How does the US warehouse stocking program work?",
        a: "You pay for the production run upfront, we ship to our Fontana, CA 3PL warehouse, and we hold the inventory in your name. When you release an order, we pick, pack, and ship via FedEx Ground or UPS within 2–5 business days to any US address. Stocking terms are typically 6–12 months, with quarterly inventory reports. It's a good fit for brands doing $50K+ per year in re-orders.",
      },
    ],
    // 2026-09-13 (R55): 7-step DDP HowTo spec for the
    // /shipping/usa/ page's #howto structured-data node.
    // 2026-09-13 (R58): estimatedCost range per kg for DDP
    // (added to the #howto node for Google's rich-result
    // cost-range eligibility — bundled in the buildCountryDdpHowToNode
    // helper as optional, omitted when not supplied).
    howto: {
      totalTime: "P14D",
      dutyVatLine: "Section 301 + import duty (currently 0% for most apparel)",
      transitMode: "express (DHL/FedEx), air, or sea to the US West Coast",
      estimatedCost: "USD 2–15 per kg (transit mode dependent)",
    },
    regionFacts: {
      isoCountryCode: "US",
      capital: "Washington, D.C.",
      latitude: 38.9072,
      longitude: -77.0369,
      currency: "USD",
      regionLabel: "United States of America",
    },
  },
  uk: {
    slug: "uk",
    countryName: "United Kingdom",
    keyword: "DDP shipping to UK",
    flag: "🇬🇧",
    h1: "DDP Shipping to UK — Custom Apparel from Yiwu, Post-Brexit Ready",
    metaDescription:
      "DDP shipping from China to UK: customs cleared, VAT + duties prepaid, door-to-door in 10–18 days. Post-Brexit EORI handled, no surprise bills.",
    intro:
      "We ship custom sublimated apparel from our Yiwu factory to the UK with full DDP — VAT, import duty, and customs clearance all bundled into one price. After Brexit we register every shipment under our EORI number, so you don't need a UK importer of record or a separate customs broker.",
    includes: [
      "Post-Brexit EORI registration handled by us",
      "UK VAT (20%) pre-paid and recovered on resale",
      "Import duty (typically 12% on apparel) included",
      "CDS (Customs Declaration Service) filing included",
      "Last-mile via DHL UK, DPD, or Hermes depending on weight",
    ],
    dutiesAndTax: [
      { label: "Import duty (apparel, CN code 6109/6110)", value: "12%" },
      { label: "VAT", value: "20% (on goods + duty + shipping)" },
      { label: "UK EORI requirement", value: "Required — we use ours for DDP" },
      { label: "CDS (Customs Declaration Service)", value: "Filed under our EORI" },
    ],
    transit: [
      { mode: "Sea freight (FCL/LCL)", time: "28–35 days", price: "$2–4 / kg" },
      { mode: "Air freight", time: "6–8 days", price: "$6–10 / kg" },
      { mode: "Express (DHL/FedEx)", time: "4–6 days", price: "$9–16 / kg" },
      { mode: "Rail (Yiwu → London via Duisburg)", time: "22–28 days", price: "$3–5 / kg" },
    ],
    faqs: [
      {
        q: "How much is UK import duty + VAT on apparel from China?",
        a: "Import duty on most sublimated apparel (UK CN codes 6109, 6110, 6111) is 12% of the CIF value. VAT is 20% applied to the total (goods + duty + shipping). On a £10,000 shipment landed at £100/kg shipping, the import duty is £1,200, VAT is £2,400 — total £3,600 of fees, all of which we pay upfront under our DDP terms. You see one all-inclusive price.",
      },
      {
        q: "Do I need a UK EORI number to import from China after Brexit?",
        a: "If you use our DDP service, no. We file the customs declaration under our EORI number, so you don't need to set one up. If you want to clear customs yourself and reclaim VAT on resale, you'll need to register for a UK EORI (£0, free but takes 3–5 working days) and use DAP or CIF terms instead. Most buyers prefer DDP for simplicity.",
      },
      {
        q: "How long does shipping from China to the UK take?",
        a: "Sea freight from Yiwu to UK ports (Felixstowe, Southampton): 28–32 days. Air freight: 6–8 days. Express (DHL/FedEx): 4–6 days. Rail freight via the China Railway Express to Duisburg then trucked to UK: 22–28 days. We confirm exact ETAs based on your UK postcode in the quote.",
      },
      {
        q: "Is there a UK customs broker fee on top of the DDP price?",
        a: "No. Our DDP quote is all-inclusive — customs broker fees, CDS filing, port handling, and last-mile delivery are all bundled. The price you receive is the price you pay. We don't add a customs clearance surcharge after the fact.",
      },
      // 2026-09-13 (R58): PAA expansion to 7 entries (was 4) — covers
      // the three next-most-asked UK DDP questions: VAT recovery on
      // resale (every UK B2B buyer asks this once), the China Railway
      // Express rail option (a PAA surface that grew through 2024 as
      // sea freight rates fluctuated), and UK customs commodity code
      // lookup (CN codes 6109/6110 are the high-volume apparel entries).
      {
        q: "Can I reclaim the UK VAT my DDP shipment paid?",
        a: "Only if you switch from DDP to DAP/CIF and clear customs yourself under your own EORI. Under DDP we pay the 20% VAT upfront and don't reclaim it — the cost is bundled into your per-piece quote. If you're a VAT-registered UK business doing 6+ shipments a year, DAP may be cheaper overall because you recover the VAT on your next VAT return. We model both options in your quote if you ask.",
      },
      {
        q: "What is the China Railway Express rail option to the UK?",
        a: "The China Railway Express (also called YXE or CRE) runs Yiwu → Duisburg (Germany) by rail in 18–22 days, then trucks to UK via the Channel Tunnel or ferry. Total transit 22–28 days, priced between sea and air (typically $3–5/kg). It's a good middle option for 500–2,000 kg orders where sea is too slow and air is too expensive. We book space on the Yiwu → Duisburg block train and overland to Felixstowe or London.",
      },
      {
        q: "What is the UK customs commodity code for sublimated apparel?",
        a: "Most sublimated apparel enters the UK under commodity codes 6109 (T-shirts, singlets), 6110 (jerseys, pullovers, cardigans), or 6111 (babies' garments). 6109 attracts 12% import duty, 6110 attracts 12%, 6111 attracts 12%. We classify your product under the correct code based on fabric composition and garment construction, and we file CDS using that code so you don't have to.",
      },
    ],
    // 2026-09-13 (R55): 7-step DDP HowTo spec for /shipping/uk/.
    // 2026-09-13 (R58): estimatedCost range per kg for DDP — see
    // usa entry for rationale on this optional field.
    howto: {
      totalTime: "P18D",
      dutyVatLine: "12% import duty + 20% VAT",
      transitMode: "express, air, sea, or rail (via the China Railway Express to Duisburg)",
      estimatedCost: "USD 2–16 per kg (transit mode dependent)",
    },
    regionFacts: {
      isoCountryCode: "GB",
      capital: "London",
      latitude: 51.5074,
      longitude: -0.1278,
      currency: "GBP",
      regionLabel: "United Kingdom of Great Britain and Northern Ireland",
    },
  },
  eu: {
    slug: "eu",
    countryName: "European Union",
    keyword: "DDP shipping to EU",
    flag: "🇪🇺",
    h1: "DDP Shipping to EU — Custom Apparel from Yiwu, IOSS VAT Pre-Paid",
    metaDescription:
      "DDP shipping from China to EU: customs cleared, IOSS VAT pre-paid, no surprise fees. Delivered to DE, FR, IT, ES, NL in 12–20 days from Yiwu.",
    intro:
      "We ship custom sublimated apparel to every EU country with full DDP — IOSS-registered so VAT is pre-paid, customs cleared at the EU border, and delivered to your warehouse via DHL, DPD, or GLS. One invoice, one tracking number, no surprise bills from your local customs office.",
    includes: [
      "IOSS (Import One-Stop Shop) VAT pre-payment for orders ≤ €150",
      "Standard VAT + duty handling for orders > €150",
      "EORI number registered for EU customs",
      "Last-mile via DHL EU, DPD, or GLS depending on country",
      "Multi-country distribution handled under one PO",
    ],
    dutiesAndTax: [
      { label: "Import duty (apparel, HS 6109/6110)", value: "12%" },
      { label: "VAT (standard rate)", value: "19–25% (country dependent)" },
      { label: "VAT reduced rates", value: "DE 19% · NL 21% · FR 20% · IT 22% · ES 21%" },
      { label: "IOSS threshold", value: "€150 per consignment (lower-value orders)" },
    ],
    transit: [
      { mode: "Sea freight (FCL/LCL)", time: "30–40 days", price: "$2–4 / kg" },
      { mode: "Air freight", time: "7–9 days", price: "$6–10 / kg" },
      { mode: "Express (DHL/FedEx)", time: "5–7 days", price: "$9–16 / kg" },
      { mode: "Rail (Yiwu → Duisburg/Hamburg/Madrid)", time: "18–22 days", price: "$3–5 / kg" },
    ],
    faqs: [
      {
        q: "How much VAT do I pay on apparel imported from China to the EU?",
        a: "Standard EU VAT is country-specific: Germany 19%, France 20%, Italy 22%, Spain 21%, Netherlands 21%, Poland 23%, Sweden 25%. We pre-pay all VAT under our DDP terms so you don't deal with import paperwork. For orders ≤ €150 per consignment, we use IOSS (Import One-Stop Shop) which simplifies the process dramatically and is included in the per-piece quote.",
      },
      {
        q: "How long does shipping from China to Germany / France / Spain take?",
        a: "Sea freight to Hamburg/Rotterdam: 30–35 days, then trucked to inland EU addresses (1–3 extra days). Air freight: 7–9 days door-to-door. Express (DHL/FedEx): 5–7 days. Rail freight via China Railway Express to Duisburg: 18–22 days, then trucked. Spain/Italy/Poland add 2–4 days on top of the Germany baseline because of the extra transit distance.",
      },
      {
        q: "Can you ship to multiple EU countries under one PO?",
        a: "Yes. We regularly split a single production run across 3–5 EU destination warehouses under one purchase order. You get one invoice, and we route each carton group to the right country with its own tracking number and customs filing. The per-piece price is the same — you only pay the extra last-mile cost for the split destinations.",
      },
      {
        q: "Do I need an EU EORI number to import from China?",
        a: "If you use our DDP service, no. We file the customs declaration under our EORI number, so you don't need to register your own. If you want to clear customs yourself and reclaim VAT on resale, you'll need an EU EORI (free, issued by your national customs authority in 3–10 working days). Most EU buyers prefer DDP for the first 12 months while they scale.",
      },
      // 2026-09-13 (R58): PAA expansion to 7 entries (was 4) — covers
      // the three next-most-asked EU DDP questions: IOSS vs standard
      // VAT (the €150 threshold is the most-clicked PAA), CBAM carbon
      // levy (new 2026 — a forward-looking EU question every apparel
      // importer is now asking), and reverse-charge VAT for B2B
      // intra-EU transfers.
      {
        q: "What is IOSS and when does it apply to my EU shipment?",
        a: "IOSS (Import One-Stop Shop) is an EU VAT scheme for consignments valued at €150 or less per shipment. The seller registers once with a single EU member state and collects VAT at point of sale — no customs paperwork at the border. For consignments above €150, the standard import procedure applies: customs declaration, duty + VAT at the border, then last-mile. We use IOSS automatically for sub-€150 orders and the standard channel above.",
      },
      {
        q: "Does the EU CBAM carbon levy apply to apparel from China?",
        a: "CBAM (Carbon Border Adjustment Mechanism) currently covers steel, aluminium, cement, fertilizers, electricity, and hydrogen — apparel is not in scope as of 2026. Future CBAM expansion is being discussed but no concrete timeline for textiles has been published. We monitor EU customs policy weekly and update DDP quotes the day any textile-relevant carbon levy is signed into law. For now, your EU apparel DDP quote includes 12% duty + 19–25% VAT and nothing else.",
      },
      {
        q: "Can I use reverse-charge VAT for B2B EU deliveries?",
        a: "Reverse-charge VAT only applies to intra-EU B2B transactions (one EU VAT-registered business selling to another). Goods imported from China are not eligible — the import VAT is always payable at the EU border by the importer of record (us, under DDP). The reverse-charge mechanism cannot be used to defer the import VAT on a China-origin shipment. If you need to recover the VAT, switch to DAP and self-clear under your own EORI.",
      },
    ],
    // 2026-09-13 (R55): 7-step DDP HowTo spec for /shipping/eu/.
    // 2026-09-13 (R58): estimatedCost range per kg for DDP — see
    // usa entry for rationale on this optional field.
    howto: {
      totalTime: "P20D",
      dutyVatLine: "12% import duty + 19-25% VAT (IOSS pre-registered)",
      transitMode: "express, air, sea, or rail (China Railway Express to Duisburg)",
      estimatedCost: "USD 2–16 per kg (transit mode dependent)",
    },
    regionFacts: {
      // EU isn't an ISO 3166-1 alpha-2 country (it's a supranational
      // region), so we use "EU" as the Country.identifier. Google
      // understands this as the European Union region and the
      // ServiceArea.addressCountry value can still be "EU" without
      // triggering a country-code validity error. Coordinates point
      // at Brussels, the de facto EU administrative capital.
      isoCountryCode: "EU",
      capital: "Brussels",
      latitude: 50.8503,
      longitude: 4.3517,
      currency: "EUR",
      regionLabel: "European Union (27 member states)",
    },
  },
  au: {
    slug: "au",
    countryName: "Australia",
    keyword: "DDP shipping to Australia",
    flag: "🇦🇺",
    h1: "DDP Shipping to Australia — GST Pre-Paid, Delivered to Your Door",
    metaDescription:
      "DDP shipping from China to Australia: GST pre-paid, customs cleared, door-to-door in 12–22 days. We ship to Sydney, Melbourne, Brisbane, Perth, and NZ.",
    intro:
      "We ship custom sublimated apparel from Yiwu to Australia with full DDP — GST (10%), import duty, and customs clearance all bundled into one landed price. We also deliver to New Zealand on the same DDP lane with GST-equivalent treatment.",
    includes: [
      "Australian GST (10%) pre-paid under our DDP terms",
      "Import duty (typically 5% on apparel) included",
      "Customs clearance at the port of entry (Sydney/Melbourne/Perth)",
      "Last-mile via Toll, StarTrack, or DHL AU depending on destination",
      "NZ delivery available (GST 15%) under the same DDP quote",
    ],
    dutiesAndTax: [
      { label: "Import duty (apparel, HS 6109/6110)", value: "5%" },
      { label: "GST", value: "10% (on goods + duty + shipping)" },
      { label: "Customs entry fee", value: "Waived for shipments > AUD $1,000" },
      { label: "NZ equivalent (GST 15%)", value: "Available — we ship trans-Tasman" },
    ],
    transit: [
      { mode: "Sea freight (FCL/LCL)", time: "20–28 days", price: "$2–5 / kg" },
      { mode: "Air freight", time: "6–8 days", price: "$6–10 / kg" },
      { mode: "Express (DHL/FedEx)", time: "4–6 days", price: "$10–18 / kg" },
      { mode: "Sea-air hybrid (Yiwu → Sydney)", time: "12–16 days", price: "$4–7 / kg" },
    ],
    faqs: [
      {
        q: "How much GST do I pay on apparel imported from China to Australia?",
        a: "GST is 10% applied to the total landed value (goods + duty + shipping). Import duty is 5% on most apparel. On an AUD $20,000 shipment at AUD $5/kg shipping: import duty is AUD $1,000, GST is AUD $2,150 — total AUD $3,150 of fees, all of which we pre-pay under our DDP terms. You see one landed price.",
      },
      {
        q: "How long does shipping from China to Sydney / Melbourne take?",
        a: "Sea freight to Sydney/Melbourne: 20–25 days. To Perth: 25–28 days. Air freight: 6–8 days door-to-door. Express (DHL/FedEx): 4–6 days. Sea-air hybrid via Singapore: 12–16 days, a good middle option for orders 300–1,000 kg where air is too expensive and full sea is too slow.",
      },
      {
        q: "Do you ship to New Zealand as well?",
        a: "Yes. New Zealand is on the same DDP lane, with GST 15% (instead of AU's 10%) and 0% duty on most apparel under the China-NZ FTA. Typical transit times: sea 25–30 days to Auckland, air 7–9 days door-to-door. We file NZ customs under our NZ IRD number, so you don't need to register as an importer.",
      },
      {
        q: "Is there a low-value threshold under AUD $1,000?",
        a: "Yes — shipments under AUD $1,000 to Australia are currently GST-free on entry. We can split orders into AUD $999 consignments for very small samples and rush orders, but for production runs above 50 kg the per-shipment overhead makes splitting uneconomical. The 10% GST on production orders is included in our DDP quote — you don't pay extra.",
      },
      // 2026-09-13 (R58): PAA expansion to 7 entries (was 4) — covers
      // the three next-most-asked AU DDP questions: ABF biosecurity
      // inspection (every AU apparel shipment is potentially subject
      // to this — high-volume PAA), the China-Australia FTA tariff
      // schedule (often mis-quoted as 0% — actually still 5% for
      // apparel), and Perth vs Sydney routing (Fremantle vs
      // Port Botany transit difference).
      {
        q: "Does Australia inspect Chinese apparel for biosecurity?",
        a: "Yes — the Australian Border Force (ABF) can request an inspection on any imported shipment under the Biosecurity Act 2015. Apparel is generally low-risk (no live plant material, no animal products), but wooden pallets (ISPM-15 stamp) and used garments can trigger holds. We ship on plastic pallets or heat-treated wooden pallets with the ISPM-15 mark, and we declare every shipment as new unworn garments to keep the inspection rate near zero. If your cargo is held, we pay the inspection fee and pass it through at-cost.",
      },
      {
        q: "Is apparel from China duty-free under the China-Australia FTA?",
        a: "No — most apparel (HS 6109, 6110, 6111) attracts 5% MFN duty regardless of origin. The China-Australia Free Trade Agreement (ChAFTA) has been in force since 2015 and has been reducing the rate annually, but as of 2026 the duty is still 5% for most apparel categories. We include the 5% duty + 10% GST in the DDP quote so you see one landed price.",
      },
      {
        q: "Perth vs Sydney — which AU port is cheaper to ship to?",
        a: "Perth (Fremantle) is 4–6 days faster from Yiwu via the Indian Ocean direct lane, but Sydney (Port Botany) and Melbourne have more frequent sailings and lower per-container rates because of higher volume. For 1–2 pallets (LCL), Sydney is typically $0.20–0.40/kg cheaper overall because of consolidation density. For full container (FCL) orders, the per-container rate is similar — pick by destination warehouse, not by port.",
      },
    ],
    // 2026-09-13 (R55): 7-step DDP HowTo spec for /shipping/au/.
    // 2026-09-13 (R58): estimatedCost range per kg for DDP — see
    // usa entry for rationale on this optional field.
    howto: {
      totalTime: "P22D",
      dutyVatLine: "5% import duty + 10% GST",
      transitMode: "express, air, sea, or sea-air hybrid via Singapore",
      estimatedCost: "USD 2–18 per kg (transit mode dependent)",
    },
    regionFacts: {
      isoCountryCode: "AU",
      capital: "Canberra",
      latitude: -35.2809,
      longitude: 149.13,
      currency: "AUD",
      regionLabel: "Commonwealth of Australia",
    },
  },
  canada: {
    slug: "canada",
    countryName: "Canada",
    keyword: "DDP shipping to Canada",
    flag: "🇨🇦",
    h1: "DDP Shipping to Canada — GST/HST Pre-Paid, Delivered to Your Door",
    metaDescription:
      "DDP shipping from China to Canada: customs cleared, GST + HST + duties prepaid, door-to-door in 10–20 days. We ship to Toronto, Vancouver, Montreal, Calgary.",
    intro:
      "We ship custom sublimated apparel from Yiwu to Canada with full DDP — GST (5%), provincial sales tax (HST/QST/PST), and import duty all bundled into one landed price. Customs brokerage is filed at the port of entry (Vancouver for western Canada, Toronto/Montreal for central and east).",
    includes: [
      "Canadian GST (5%) pre-paid under our DDP terms",
      "Provincial sales tax (HST/QST/PST) handled based on destination province",
      "Import duty (typically 17–18% on apparel) included",
      "Customs brokerage at port of entry (Vancouver / Toronto / Montreal)",
      "Last-mile via Canada Post, Purolator, or Day & Ross",
    ],
    dutiesAndTax: [
      { label: "Import duty (apparel, HS 6109/6110)", value: "17–18%" },
      { label: "GST (federal)", value: "5% (on goods + duty + shipping)" },
      { label: "HST (Ontario 13%, Atlantic 15%)", value: "Combined with GST at point of sale" },
      { label: "QST (Quebec 9.975%)", value: "On top of GST for QC destinations" },
      { label: "PST (BC 7%, SK 6%, MB 7%)", value: "On top of GST for western provinces" },
    ],
    transit: [
      { mode: "Sea freight (FCL/LCL)", time: "20–28 days", price: "$2–5 / kg" },
      { mode: "Air freight", time: "6–9 days", price: "$6–10 / kg" },
      { mode: "Express (DHL/FedEx)", time: "4–6 days", price: "$10–18 / kg" },
      { mode: "Sea-air hybrid (Yiwu → Vancouver)", time: "12–16 days", price: "$4–7 / kg" },
    ],
    faqs: [
      {
        q: "How much is Canadian import duty + GST on apparel from China?",
        a: "Import duty on most sublimated apparel (HS 6109, 6110) is 17–18% of the CIF value. GST is 5% applied to the total. On a CAD $15,000 shipment landed at CAD $5/kg shipping: import duty is CAD $2,625, GST is CAD $881, plus provincial sales tax (HST/QST/PST) of CAD $300–$700 depending on province — total CAD $3,800–$4,200 of fees, all pre-paid under our DDP terms.",
      },
      {
        q: "How long does shipping from China to Toronto / Vancouver take?",
        a: "Sea freight to Vancouver: 20–25 days. To Toronto via Vancouver rail/truck: 25–30 days. To Montreal: 28–32 days. Air freight: 6–9 days door-to-door. Express (DHL/FedEx): 4–6 days. Sea-air hybrid via Vancouver: 12–16 days. We confirm exact ETAs in your quote based on the destination province.",
      },
      {
        q: "What provincial taxes apply on top of GST?",
        a: "Ontario, New Brunswick, Nova Scotia, PEI, Newfoundland: HST 13–15% (GST + provincial). Quebec: QST 9.975% on top of GST. British Columbia, Saskatchewan, Manitoba: PST 6–7% on top of GST. Alberta: no provincial sales tax (GST only). All of these are bundled into our DDP quote — you don't have to figure out which province the shipment is going to.",
      },
      {
        q: "Do I need a Canadian Business Number (BN) to import from China?",
        a: "If you use our DDP service, no. We file the customs declaration under our own Business Number, so you don't need to register for one. If you want to clear customs yourself and recover GST/HST on resale, you'll need a BN from CRA (free, 1–2 weeks by mail). Most Canadian buyers prefer DDP for the first year to keep import paperwork off their finance team's desk.",
      },
      // 2026-09-13 (R58): PAA expansion to 7 entries (was 4) — covers
      // the three next-most-asked CA DDP questions: CUSMA/USMCA
      // preferential origin (every CA importer asks this once — the
      // rules of origin are strict and don't apply to China-origin
      // apparel), the CBSA Assessment and Revenue Management (CARM)
      // system that went live in 2024, and Vancouver vs Toronto
      // routing for the western/eastern warehouse split.
      {
        q: "Does the CUSMA / USMCA trade agreement apply to apparel from China?",
        a: "No — CUSMA (Canada-United States-Mexico Agreement, formerly NAFTA) only applies to goods originating in Canada, the US, or Mexico. Apparel manufactured in China is not CUSMA-eligible regardless of the buyer or destination. You pay the full 17–18% MFN import duty. We don't flag shipments as CUSMA because China-origin apparel never qualifies. If you're sourcing from a US or Mexican cut-and-sew factory instead, the rules of origin are different and we can advise on the right tariff treatment.",
      },
      {
        q: "What is CARM and how does it affect my import?",
        a: "CARM (CBSA Assessment and Revenue Management) is the Canada Border Services Agency's new importer portal that went fully live in 2024. It replaces the old paper-based process with a digital Business Number (BN15) requirement, a 9-digit Business Account number, and a duty-payment bond for high-volume importers. We use our own CARM-registered BN for all DDP shipments, so you don't need to interact with the system. Self-clear importers must now register on the CARM portal before they can release a shipment.",
      },
      {
        q: "Vancouver vs Toronto — which Canadian port is cheaper?",
        a: "Vancouver is 5–7 days faster from Yiwu via the Pacific direct lane, but Toronto (via the CN or CP rail network) has more frequent sailings and lower per-container rates because of higher east-coast consolidation volume. For 1–2 pallets (LCL), Vancouver is typically $0.30–0.50/kg cheaper overall. For full container (FCL) orders, Toronto is similar in price. Pick by destination warehouse: ship to Vancouver if your 3PL is in BC/AB, and to Toronto if it's in ON/QE.",
      },
    ],
    // 2026-09-13 (R55): 7-step DDP HowTo spec for /shipping/canada/.
    // 2026-09-13 (R58): estimatedCost range per kg for DDP — see
    // usa entry for rationale on this optional field.
    howto: {
      totalTime: "P20D",
      dutyVatLine: "17-18% import duty + 5% GST + provincial sales tax (HST/QST/PST)",
      transitMode: "express, air, sea, or sea-air hybrid via Vancouver",
      estimatedCost: "USD 2–18 per kg (transit mode dependent)",
    },
    regionFacts: {
      isoCountryCode: "CA",
      capital: "Ottawa",
      latitude: 45.4215,
      longitude: -75.6972,
      currency: "CAD",
      regionLabel: "Canada",
    },
  },
};
