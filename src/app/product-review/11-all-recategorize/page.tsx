import Link from "next/link";

export const metadata = {
  title: "All-Products Recategorize · VividPrint Product Review",
  description: "119 products · 13 categories · 25 scenarios · bulk recategorize",
};

const SCENARIO_POOL = [
  "Promotional Swag", "Political Campaign", "Event & Festival",
  "Corporate & Branding", "School & Education", "Uniform & Workwear",
  "Team & Club", "Sports League", "Construction & Engineering",
  "Hospitality & F&B", "Medical & Healthcare", "Security & Property",
  "Retail & Fashion", "Gift & Souvenir", "Wedding & Party",
  "Military", "Festival & Holiday", "Express & Logistics",
  "Fundraiser & Charity", "Transit & Transport", "Music & Merch",
  "Studio & Gym", "Retail & Supermarket", "Education & School",
  "Corporate & Promo",
  // 41 sports (合并)
  "AFL", "Athletics", "Australian Football", "Badminton", "Baseball",
  "Basketball", "Bowling", "Boxing", "Cheerleading", "Cricket",
  "Cycling", "Diving", "Esports", "Fishing", "Football",
  "Golf", "Gymnastics", "Hockey", "Hunting", "Lacrosse",
  "Martial Arts", "MMA", "Motorsport", "Netball", "Pickleball",
  "Racing", "Rodeo", "Rowing", "Rugby", "Sailing",
  "Ski & Snow", "Soccer", "Softball", "Squash", "Swimming",
  "Table Tennis", "Tennis", "Track & Field", "Triathlon", "Volleyball",
  "Water Polo", "Wrestling", "Yoga",
];

const CATEGORIES = [
  "T-Shirt", "Hoodie", "Polo Shirt", "Sweatshirt", "Jacket",
  "Tank Top & Camis", "Pants", "Skirt", "Shirt", "Cap",
  "Home", "Uniform & Workwear", "Sportswear",
];

export default function AllRecategorizePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link href="/product-review/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to /product-review
        </Link>

        <h1 className="mt-4 text-3xl font-bold">119 Products · Bulk Recategorize</h1>
        <p className="mt-2 text-muted-foreground">
          Two-dimension model: <b>Category</b> (style) + <b>Scenarios</b> (use cases). Each product picks 1 category + 1-5 scenarios.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold">119</div>
            <div className="text-xs text-muted-foreground">Total products</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold">13</div>
            <div className="text-xs text-muted-foreground">Categories</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold">70</div>
            <div className="text-xs text-muted-foreground">Scenarios (25 + 41 sports + 4)</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold text-orange-500">29</div>
            <div className="text-xs text-muted-foreground">ALL_SPORTS need retag</div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">How to use</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-sm text-muted-foreground">
            <li>Click the big orange button below to open the interactive decision page</li>
            <li>For each of 119 products, pick 1 category (from 13) and 1-5 scenarios (from 70)</li>
            <li>Press ✓ Accept after each product</li>
            <li>Use bulk tools (filter by category, accept-all, reset) to speed up</li>
            <li>When done, click <b>Copy to clipboard</b> to get the final TSV</li>
            <li>Paste the TSV back to me — I will update <code>src/lib/products-data.ts</code></li>
            <li>After update, I will regenerate 6 TSVs and deploy to sublimapparel.com</li>
          </ol>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/product-review/11-all-recategorize/"
              className="inline-flex items-center rounded-md bg-orange-500 px-6 py-3 text-base font-semibold text-white hover:bg-orange-600"
            >
              Open Decision Page →
            </a>
            <a
              href="/product-review/11-all-recategorize/products-data.js"
              className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm hover:bg-muted"
            >
              View products data
            </a>
            <a
              href="/product-review/10-sportswear-decisions/"
              className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm hover:bg-muted"
            >
              ← 38 Sportswear (sub-page)
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Category pool (13)</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <span key={c} className="rounded-full border border-border px-3 py-1 text-xs">{c}</span>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Scenario pool (70)</h2>
          <p className="mt-1 text-xs text-muted-foreground">25 base scenarios + 41 sports (merged) + 4 to-remove</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SCENARIO_POOL.map((s) => (
              <span key={s} className="rounded-full border border-border px-3 py-1 text-xs">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
