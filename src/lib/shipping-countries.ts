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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
  },
};
