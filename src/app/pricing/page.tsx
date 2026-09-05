import { JsonLd } from "@/components/json-ld";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RequestQuoteLink } from "@/components/request-quote-link";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Pricing & MOQ: How Quotes Are Built | SublimApparel",
  description:
    "How SublimApparel quotes custom apparel: pricing tiers, MOQ by fabric, what's included (sublimation, sewing, DDP shipping), and what's extra (samples, rush, labels).",
  openGraph: {
    title: "Pricing & MOQ — How Quotes Are Built at SublimApparel",
    description:
      "Per-unit pricing tiers, MOQ by fabric, what's included in the quote, and what costs extra. Real ranges, not vague 'contact us' answers.",
    type: "article",
  },
};

const breadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", path: "https://sublimapparel.com/" },
  { name: "Pricing & MOQ", path: "https://sublimapparel.com/pricing/" },
]);

const faqItems = [
  {
    q: "Why don't you show a per-shirt price on the website?",
    a:
      "Because the price depends on five variables: fabric, decoration method, design complexity, quantity, and destination. A polyester sublimated jersey at 100 pieces to the US is one number. A cotton DTG tee at 50 pieces to Germany is another. We give exact quotes within 24 hours because any fixed number on a website would be misleading. Use the calculator below to get a realistic range.",
  },
  {
    q: "What is the minimum order quantity (MOQ)?",
    a:
      "50 pieces per design for sublimation on polyester. 30 pieces per design for DTG on cotton. We can do smaller runs but per-unit cost jumps sharply below these thresholds because setup doesn't amortize.",
  },
  {
    q: "Do you charge for samples?",
    a:
      "Pre-production samples (with your design, before bulk) cost $25-60 per piece plus express shipping. We refund the sample cost when you place a bulk order of 100+ pieces. Stock-color samples without your design are free — just pay the $35-65 express shipping.",
  },
  {
    q: "Are duties and shipping included in the per-unit price?",
    a:
      "Our DDP quotes include everything: factory production, ocean or air freight, US/EU import duties, customs clearance, and last-mile delivery to your warehouse or 3PL. You see one delivered number per shirt.",
  },
  {
    q: "What payment terms do you offer?",
    a:
      "30% deposit on order confirmation, 70% balance before shipment for new clients. After 3 successful orders, we offer Net 30 for buyers in the US, UK, EU, AU, and CA. We accept T/T (wire), PayPal (small orders), and LC (large orders).",
  },
  {
    q: "Can I get a discount for 1,000+ pieces?",
    a:
      "Yes. Per-unit cost typically drops 25-40% from the 50-piece tier to the 1,000+ tier on the same fabric and design. We also have standing-order pricing for buyers placing 2,000+ pieces per quarter — ask us about it.",
  },
];

const faqJsonLd = buildFaqJsonLd(faqItems);

const tiers = [
  {
    qty: "30–49 pcs",
    sub: "Trial / sample run",
    polyesterSub: "$18 – $26 / shirt",
    cottonDtg: "$15 – $22 / shirt",
    label: "Prefer 50+ — setup cost doesn't amortize below this",
    color: "border-[#a0a0a0]",
  },
  {
    qty: "50–199 pcs",
    sub: "Small event run",
    polyesterSub: "$11 – $17 / shirt",
    cottonDtg: "$9 – $14 / shirt",
    label: "Our most common entry tier",
    color: "border-black",
  },
  {
    qty: "200–499 pcs",
    sub: "Team / league order",
    polyesterSub: "$8.50 – $12 / shirt",
    cottonDtg: "$7 – $10 / shirt",
    label: "Best price-per-piece for most buyers",
    color: "border-[#ff4d00]",
    highlight: true,
  },
  {
    qty: "500–999 pcs",
    sub: "Brand bulk order",
    polyesterSub: "$7 – $9.50 / shirt",
    cottonDtg: "$5.50 – $8 / shirt",
    label: "Volume discount kicks in",
    color: "border-black",
  },
  {
    qty: "1,000+ pcs",
    sub: "Standing / wholesale",
    polyesterSub: "$5.50 – $7.50 / shirt",
    cottonDtg: "$4.50 – $6.50 / shirt",
    label: "Best pricing; ask about quarterly contracts",
    color: "border-[#00c2ff]",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black">
        <section className="border-b-4 border-black bg-[#f5f5f5] py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4d00]">
              Buyer&apos;s Guide · Pricing
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
              Pricing &amp; MOQ: how quotes are built
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-[#6b6b6b] md:text-xl">
              Every quote is different because every order is different. Here&apos;s the
              honest price-per-piece range by quantity, what&apos;s included in a DDP
              quote, and what costs extra.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Per-piece price range by quantity
            </h2>
            <p className="mt-3 text-[#6b6b6b]">
              All-in delivered price to US/EU, including sublimation or DTG, poly or
              cotton blank, and DDP shipping. Excludes sales tax / VAT.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {tiers.map((tier) => (
                <div
                  key={tier.qty}
                  className={`rounded-lg border-2 ${tier.color} bg-white p-5 ${tier.highlight ? "shadow-[4px_4px_0_0_#ff4d00]" : ""}`}
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-[#6b6b6b]">
                    {tier.sub}
                  </p>
                  <p className="mt-1 text-2xl font-extrabold tracking-tight">
                    {tier.qty}
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#a0a0a0]">
                        Poly sublimation
                      </p>
                      <p className="font-bold">{tier.polyesterSub}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#a0a0a0]">
                        Cotton DTG
                      </p>
                      <p className="font-bold">{tier.cottonDtg}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-snug text-[#6b6b6b]">
                    {tier.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y-2 border-black bg-white py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              What&apos;s included in a DDP quote
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                ["Garment blank", "Polyester, cotton, or blend — your choice of style and GSM"],
                ["Digital printing", "All-over sublimation OR DTG (not extra charge for color count)"],
                ["Cut & sew", "In-house production, no middleman, no subcontractor markup"],
                ["Custom labels & tags", "Woven, printed, or heat-transfer — your logo, your care instructions"],
                ["Individual poly bag", "Each piece folded, bagged, and labeled with size"],
                ["Carton packing", "Export-quality 5-ply cartons, 50-100 pcs per carton"],
                ["Ocean or air freight", "Yiwu → destination port or airport"],
                ["Import duties", "Paid by us under DDP terms (Section 321 for US sub-$800)"],
                ["Customs clearance", "Handled by our forwarder, not your broker"],
                ["Last-mile delivery", "To your warehouse, 3PL, or even per-customer (DTC)"],
              ].map(([title, body]) => (
                <li key={title} className="rounded border-2 border-[#e5e5e5] p-4">
                  <p className="font-bold text-[#ff4d00]">✓ {title}</p>
                  <p className="mt-1 text-sm text-[#3a3a3a]">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#0a0a0a] py-16 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              What costs extra
            </h2>
            <p className="mt-3 text-[#a0a0a0]">
              We don&apos;t hide these in the per-piece number. We quote them as
              line items so you can decide.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                ["Pre-production sample", "$25–60 / piece, refunded on bulk order of 100+"],
                ["Rush production (under 10 days)", "+20% production surcharge, subject to capacity"],
                ["Custom fabric color (not stock)", "$300 dye-lot setup + 2 weeks added lead time"],
                ["Pantone-dedicated sublimation ink", "$200 setup per color (we usually CMYK-match instead)"],
                ["Personalization (per-name / per-number)", "$1.50–3.00 / piece depending on count"],
                ["Hang tags or size stickers (custom printed)", "$0.05–0.12 / piece"],
                ["Custom retail packaging (tissue, mailer, sticker)", "$0.30–0.80 / piece"],
              ].map(([title, body]) => (
                <li key={title} className="flex flex-col gap-1 border-b border-[#1a1a1a] pb-4 md:flex-row md:items-baseline md:gap-6">
                  <p className="font-bold md:w-1/3">{title}</p>
                  <p className="text-sm text-[#a0a0a0] md:w-2/3">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="mt-8 space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-lg border-2 border-[#e5e5e5] bg-white p-5 [&[open]]:border-black"
                >
                  <summary className="cursor-pointer text-lg font-bold marker:hidden">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-[#3a3a3a]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t-4 border-black bg-[#f5f5f5] py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Get an exact DDP quote
            </h2>
            <p className="mt-4 text-lg text-[#3a3a3a]">
              Send us your design, fabric choice, quantity, and delivery zip. We&apos;ll
              reply with one all-in number within 24 hours.
            </p>
            <div className="mt-8">
              <RequestQuoteLink
                label="Request a quote"
                className="inline-flex items-center gap-2 bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-widest text-black hover:bg-[#ff5d1a]"
              >
                Request a quote
              </RequestQuoteLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <JsonLd data={breadcrumb} />
    </>
  );
}
