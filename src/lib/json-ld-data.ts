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
    email: "sales@sublimapparel.com",
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
  sameAs: [],
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
