import { JsonLd } from "@/components/json-ld";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RequestQuoteLink } from "@/components/request-quote-link";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Sample Policy: Free & Pre-Production Samples | SublimApparel",
  description:
    "How SublimApparel handles samples: free stock-color swatches, pre-production samples with your design ($25-60), refund policy, and what to expect on lead time.",
  openGraph: {
    title: "Sample Policy — How We Handle Samples",
    description:
      "Free stock swatches, paid pre-production samples with your design, refund on bulk orders, and express shipping worldwide.",
    type: "article",
  },
};

const breadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", path: "https://sublimapparel.com/" },
  { name: "Sample policy", path: "https://sublimapparel.com/samples/" },
]);

const faqItems = [
  {
    q: "Are samples really free?",
    a:
      "Stock-color blank samples (no printing, no design) are free — you only pay $35-65 express shipping depending on destination. Pre-production samples with your design are $25-60 per piece plus express shipping, but we refund the sample cost when you place a bulk order of 100+ pieces.",
  },
  {
    q: "How long does a pre-production sample take?",
    a:
      "7-12 business days from artwork approval. We send you photos of the finished sample and ship it via DHL / FedEx. Total door-to-door to most countries: 12-16 days from approval.",
  },
  {
    q: "Can I see multiple fabric swatches before deciding?",
    a:
      "Yes — request a free swatch card showing 4-6 of our most common fabrics (polyester interlock, brushed poly, pbt stretch, cotton jersey, poly-spandex). We mail it with color chips and a GSM / spec sheet. Most clients keep these for client-facing presentations.",
  },
  {
    q: "What if the bulk order doesn't match the sample?",
    a:
      "We QC every bulk piece against the approved pre-production sample. If more than 3% of the bulk order deviates from the sample in color, size, or finishing, we re-produce the affected pieces at our cost. In 18 months of operation, this has happened fewer than 8 times.",
  },
  {
    q: "Can I skip the pre-production sample and go straight to bulk?",
    a:
      "We strongly recommend against it. The pre-production sample is where you sign off on color, fit, and finishing. Skipping it is the #1 cause of bulk rejections. Exception: if you've already done 5+ orders with us on the same fabric and design, we waive the sample step.",
  },
  {
    q: "Do you do design mock-ups for free?",
    a:
      "Yes — initial layout, color rendering, and flat mock-up are free. Once you approve the layout, the first pre-production sample is the paid step. We don't charge for design iterations on the mock-up itself.",
  },
];

const faqJsonLd = buildFaqJsonLd(faqItems);

const sampleTypes = [
  {
    title: "Stock-color blank",
    cost: "Free",
    fee: "Pay $35-65 express shipping",
    lead: "5-7 days",
    when: "Choose fabric & style",
    refund: "Always free",
    color: "border-[#a0a0a0]",
  },
  {
    title: "Pre-production sample",
    cost: "$25-60 / piece",
    fee: "Plus $35-65 express shipping",
    lead: "7-12 days",
    when: "Test your design, color, fit",
    refund: "Refunded on 100+ pc bulk order",
    color: "border-[#ff4d00]",
    highlight: true,
  },
  {
    title: "Customized sample (multiple designs)",
    cost: "$40-90 / piece",
    fee: "Plus express shipping",
    lead: "10-15 days",
    when: "Test 2-3 design variants",
    refund: "Refunded on 200+ pc bulk order",
    color: "border-[#00c2ff]",
  },
];

export default function SamplesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black">
        <section className="border-b-4 border-black bg-[#f5f5f5] py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4d00]">
              Buyer&apos;s Guide · Samples
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
              Sample policy: what we send, what it costs
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-[#6b6b6b] md:text-xl">
              Samples are how you de-risk a bulk order. We offer three tiers — free
              stock swatches, paid pre-production samples, and multi-design
              comparison packs. Here&apos;s the full breakdown.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Three sample tiers
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {sampleTypes.map((s) => (
                <div
                  key={s.title}
                  className={`rounded-lg border-2 ${s.color} bg-white p-6 ${s.highlight ? "shadow-[4px_4px_0_0_#ff4d00]" : ""}`}
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-[#6b6b6b]">
                    {s.title}
                  </p>
                  <p className="mt-3 text-2xl font-extrabold">{s.cost}</p>
                  <p className="mt-1 text-xs text-[#6b6b6b]">{s.fee}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    <li>
                      <span className="font-bold">Lead time:</span> {s.lead}
                    </li>
                    <li>
                      <span className="font-bold">When to use:</span> {s.when}
                    </li>
                    <li>
                      <span className="font-bold">Refund:</span> {s.refund}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y-2 border-black bg-white py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              How a sample order flows
            </h2>
            <ol className="mt-8 space-y-6">
              {[
                ["Request the sample", "Tell us the fabric, style, decoration method, and quantity. We send a confirmation within 4 hours."],
                ["We confirm cost & lead time", "Sample fee + express shipping. You pay via PayPal or T/T. We schedule the line."],
                ["Design mock-up (free)", "If it's a pre-production sample, we send a digital mock-up first. You approve the layout."],
                ["Sample production", "We cut, print, sew, and QC the sample on the same line as your bulk order will run."],
                ["Photo proof", "We send high-res photos of the finished sample. You confirm or request changes."],
                ["Ship via DHL / FedEx", "Tracking sent same day. Door-to-door 3-5 days to most countries."],
                ["Approve & order bulk", "You sign off on the sample, we deduct the sample cost from your bulk PO, and we go to production."],
              ].map((step, i) => (
                <li key={step[0]} className="flex gap-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff4d00] text-base font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-lg font-bold">{step[0]}</p>
                    <p className="mt-1 text-base text-[#3a3a3a]">{step[1]}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#0a0a0a] py-16 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              What we don&apos;t do
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                "Send samples without a confirmed shipping address",
                "Refuse to iterate on a sample that doesn't match your design (we re-do, not you accept it)",
                "Charge separately for the design mock-up",
                "Hold your sample hostage for bulk order commitments",
                "Ship bulk without sending a pre-shipment sample on first orders",
                "Substitute fabric or GSM without telling you in writing",
              ].map((item) => (
                <li key={item} className="rounded border border-[#1a1a1a] p-4 text-sm text-[#a0a0a0]">
                  ✗ {item}
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
              Ready to request a sample?
            </h2>
            <p className="mt-4 text-lg text-[#3a3a3a]">
              Send us the fabric, style, decoration method, and your delivery address.
              We&apos;ll confirm cost and lead time within 4 hours.
            </p>
            <div className="mt-8">
              <RequestQuoteLink
                label="Request a sample"
                className="inline-flex items-center gap-2 bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-widest text-white hover:bg-[#ff5d1a]"
              >
                Request a sample
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
      <JsonLd data={buildBreadcrumbJsonLd([{name: "Home", path: "/"}, {name: "Samples", path: "/samples/"}])} />
    </>
  );
}
