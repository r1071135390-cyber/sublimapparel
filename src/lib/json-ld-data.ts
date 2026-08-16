// Centralized JSON-LD data for Organization, LocalBusiness, etc.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "SublimApparel",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  foundingDate: "2014",
  description:
    "Yiwu-based sublimation printing factory. All-over print on polyester and cotton, MOQ 50, DDP to 100+ countries, US warehouse in Fontana CA.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Yiwu",
    addressRegion: "Zhejiang",
    addressCountry: "CN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "info@sublimapparel.com",
    availableLanguage: ["English"],
  },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Australia" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "France" },
  ],
  sameAs: [
    "https://www.linkedin.com/company/sublimapparel",
    "https://www.instagram.com/sublimapparel",
    "https://www.facebook.com/sublimapparel",
    "https://www.pinterest.com/sublimapparel",
    "https://www.alibaba.com/showroom/sublimapparel",
    "https://www.youtube.com/@sublimapparel",
  ],
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/shipping/us-warehouse/#localbusiness`,
  name: "SublimApparel US Warehouse",
  image: `${SITE_URL}/icon.png`,
  description:
    "SublimApparel US fulfillment warehouse in Fontana, California. 2-5 day domestic shipping, no customs, no duties for US customers.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Fontana Distribution Center",
    addressLocality: "Fontana",
    addressRegion: "CA",
    postalCode: "92335",
    addressCountry: "US",
  },
  parentOrganization: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

export const techniqueData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Sublimation Printing Process at SublimApparel",
  description: "How we dye-sublimate polyester and 100% cotton apparel in 6 steps: artwork separation, wide-format print, cut & assemble, heat-press transfer, cut & sew, quality check.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Artwork separation",
      text: "CMYK + 8 extended spot colors are pre-flighted. Underbase white added automatically for polyester.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Wide-format print",
      text: "1.9m wide roll-to-roll sublimation printer lays the design onto transfer paper at 4,800 × 1,200 DPI.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Cut & assemble",
      text: "Printed paper is cut to garment panel size. Front, back, sleeves kept aligned.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Heat-press transfer",
      text: "200°C / 30 sec cycle on an 80 × 100 cm platen. Dye sublimates from solid to gas, bonds with polyester fibers.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Cut & sew",
      text: "Each garment is cut, assembled and sewn on the same floor. Panels match perfectly because printed together.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Quality check",
      text: "Every piece inspected. Colors verified against your proof. Defects removed before poly-bagging.",
    },
  ],
};
