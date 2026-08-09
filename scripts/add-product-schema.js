// scripts/add-product-schema.js
// 给 6 个产品页加 Product JSON-LD，us-warehouse 加 LocalBusiness
const fs = require('fs');
const path = require('path');

const products = [
  { slug: 'jerseys',        name: 'Custom Team Jerseys',        moq: 50 },
  { slug: 'cycling',        name: 'Custom Cycling Jerseys',     moq: 50 },
  { slug: 'racing',         name: 'Custom Racing Apparel',      moq: 50 },
  { slug: 't-shirts',       name: 'Custom Sublimation T-Shirts',moq: 50 },
  { slug: 'hoodies',        name: 'Custom Sublimation Hoodies', moq: 50 },
  { slug: 'golf-bowling',   name: 'Custom Golf & Bowling Apparel', moq: 50 },
];

const SITE = 'https://sublimapparel.com';

for (const p of products) {
  const file = `src/app/products/${p.slug}/page.tsx`;
  let src = fs.readFileSync(file, 'utf8');
  // 跳过已经加过的
  if (src.includes('"@type": "Product"')) {
    console.log(`✓ ${p.slug} 已有 Product schema，跳过`);
    continue;
  }
  const schema = `
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "${p.name}",
        "image": \`\${process.env.NEXT_PUBLIC_SITE_URL || "${SITE}"}/og-default.jpg\`,
        "description": "Custom sublimation printing, low MOQ ${p.moq} pcs, DDP shipping worldwide.",
        "brand": { "@type": "Brand", "name": "SublimApparel" },
        "manufacturer": { "@type": "Organization", "name": "SublimApparel" },
        "offers": {
          "@type": "Offer",
          "url": \`\${process.env.NEXT_PUBLIC_SITE_URL || "${SITE}"}/products/${p.slug}/\`,
          "priceCurrency": "USD",
          "priceRange": "$$",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition"
        }
      }} />
`;
  // 插到第一个 <main> 之后
  src = src.replace(/(  return \(\n    <main>)/, `$1${schema}`);
  fs.writeFileSync(file, src);
  console.log(`✓ ${p.slug} 加 Product JSON-LD`);
}

// us-warehouse: LocalBusiness
{
  const file = 'src/app/shipping/us-warehouse/page.tsx';
  let src = fs.readFileSync(file, 'utf8');
  if (src.includes('"@type": "LocalBusiness"')) {
    console.log('✓ us-warehouse 已有 LocalBusiness schema');
  } else {
    const schema = `
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://sublimapparel.com/shipping/us-warehouse/",
        "name": "SublimApparel US Warehouse",
        "image": "https://sublimapparel.com/og-default.jpg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Fontana Distribution Center",
          "addressLocality": "Fontana",
          "addressRegion": "CA",
          "postalCode": "92335",
          "addressCountry": "US"
        },
        "areaServed": ["US", "CA"],
        "openingHours": "Mo-Fr 09:00-18:00",
        "priceRange": "$$"
      }} />
`;
    src = src.replace(/(  return \(\n    <main>)/, `$1${schema}`);
    fs.writeFileSync(file, src);
    console.log('✓ us-warehouse 加 LocalBusiness JSON-LD');
  }
}
