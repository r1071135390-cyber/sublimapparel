// One-off length audit (post-Round-5). Verifies the new descriptions
// and titles stay within Google's 60-char title / 160-char description
// SERP caps.
const checks = [
  ["/industries/sports-teams-leagues/", "Custom sports team apparel manufacturer for clubs, leagues, and athletes. Sublimated jerseys, uniforms, and training wear. Flexible MOQ and reliable production."],
  ["/industries/events-conferences/", "Event apparel manufacturer for conferences, corporate events, and community activities. Bulk T-shirts, staff uniforms, and branded clothing. Reliable production."],
  ["/industries/music-festival-tour-merchandise/", "Custom tour merch manufacturer for musicians, festivals, and entertainment brands. Band T-shirts, festival apparel, and event merchandise with flexible MOQ."],
  ["/industries/corporate-employee-programs/", "Corporate uniform manufacturer for employee apparel and branded workwear. Custom polos, office apparel, and company uniforms. Reliable production, global delivery."],
  ["/industries/schools-universities-greek-life/", "School apparel manufacturer for universities, schools, Greek life, and student organizations. Bulk T-shirts, hoodies, and student merch with reliable delivery."],
  ["/industries/breweries-coffee-hospitality/", "Hospitality apparel manufacturer for breweries, coffee shops, bars, and restaurants. Staff uniforms, branded merchandise, and venue apparel with flexible MOQ."],
  ["/industries/promotional-marketing-agencies/", "Promotional apparel manufacturer for marketing and promo agencies. Branded merch, campaign apparel, and client gifts with flexible MOQ and reliable delivery."],
  ["/industries/trade-shows-display/", "Trade show apparel manufacturer for booth staff, exhibitors, and event displays. Custom branded shirts, giveaways, and team uniforms with reliable production."],
  ["/industries/apparel-brands-agencies/", "Apparel manufacturing partner for brands, agencies, and designers. Private label, ODM, and custom manufacturing with flexible MOQ and reliable delivery."],
  ["/industries/political-campaigns/", "Political campaign apparel manufacturer for campaigns, parties, and PACs. Custom yard signs, campaign shirts, hats, and rally merchandise with fast production."],
  ["/industries/e-commerce-fulfillment/", "Apparel manufacturing for e-commerce brands, dropshippers, and B2B sellers. Custom, white-label, private label, and dropship fulfillment with global shipping."],
  ["/compare/sublimation-vs-dtg/", "Sublimation vs DTG for custom apparel: cost, color vibrancy, fabric compatibility, MOQ, hand feel, and durability. Which one fits your order?"],
  ["/compare/ddp-vs-fob/", "DDP (Delivered Duty Paid) vs FOB (Free on Board) shipping for overseas apparel: who pays duties, who handles customs, risk, and which saves money."],
  ["/production/", "How long custom apparel takes to produce at SublimApparel: standard lead time, rush options, the PO-to-delivery calendar, and Chinese holiday slowdowns."],
  ["/pricing/", "How SublimApparel quotes custom apparel: pricing tiers, MOQ by fabric, what's included in the DDP price, and what's extra (samples, rush, custom labels)."],
  ["/shipping/us-warehouse/", "An honest note about our US warehouse address in Fontana, CA. A placeholder service for occasional overstock buffer storage, not a standard feature."],
];
console.log("=== DESCRIPTION LENGTHS ===");
let problems = 0;
for (const [path, desc] of checks) {
  const len = desc.length;
  const flag = len > 160 ? "❌ TOO LONG" : (len < 70 ? "⚠ SHORT" : "✓");
  if (len > 160) problems++;
  console.log(`${flag}  ${len}ch  ${path}`);
}
console.log();
console.log("=== TITLE LENGTHS ===");
const titles = [
  ["/terms/", "Terms of Sale — Quotes, Orders & Liability"],
  ["/privacy/", "Privacy Policy — Data, Cookies & Inquiries"],
  ["/shipping-policy/", "Shipping Policy — DDP, Lead Times & Tracking"],
];
for (const [path, title] of titles) {
  const len = title.length;
  const flag = len < 20 ? "❌ TOO SHORT" : (len > 60 ? "❌ TOO LONG" : "✓");
  if (len < 20 || len > 60) problems++;
  console.log(`${flag}  ${len}ch  ${path}`);
}
console.log();
console.log(problems === 0 ? "✅ ALL WITHIN LIMITS" : `❌ ${problems} problem(s) remaining`);
process.exit(problems === 0 ? 0 : 1);
