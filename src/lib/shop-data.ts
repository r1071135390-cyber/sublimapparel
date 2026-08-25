/**
 * Small-batch / off-the-shelf products that can be purchased directly via Stripe Checkout.
 * These are separate from the main /products (custom sublimation) catalog.
 */
export type ShopProduct = {
  sku: string;
  name: string;
  description: string;
  amount_cents: number;
  min_quantity: number;
  image_url?: string;
  badge?: string;
};

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    sku: "swatch-pack",
    name: "Fabric Swatch Pack",
    description:
      "8 polyester + cotton fabric samples, 4×4 inches each, with material specs on the back. Shipped in a branded envelope.",
    amount_cents: 2500, // $25
    min_quantity: 1,
    badge: "Most popular",
  },
  {
    sku: "blank-tee-mockup",
    name: "Stock Sublimated T-shirt (Mock-up design)",
    description:
      "Pre-printed blank tee with our sample design — to evaluate print quality, fabric hand-feel, and sizing. Ships in 3-5 days.",
    amount_cents: 1900, // $19 each
    min_quantity: 10,
    badge: "MOQ 10",
  },
  {
    sku: "name-tag-sample",
    name: "Custom Name Tag Sample",
    description:
      "1×3 inch custom sublimated name tag with pin backing. 50pcs minimum. Use to test color accuracy and edge quality.",
    amount_cents: 500, // $5 each
    min_quantity: 50,
    badge: "MOQ 50",
  },
  {
    sku: "rush-sample-run",
    name: "Express Sample Run (1 design, 5pcs)",
    description:
      "1 design, 5 finished samples in your size choice, shipped DHL Express in 7 days. Use to validate a design before committing to bulk.",
    amount_cents: 9900, // $99 flat
    min_quantity: 1,
    badge: "7-day rush",
  },
];
