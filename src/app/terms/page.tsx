import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Sale ",
  description:
    "Terms and conditions governing quotes, orders, payment, production, shipping, returns, and liability for custom sublimation apparel from SublimApparel.",
};

const SECTIONS = [
  {
    id: "agreement",
    title: "1. Acceptance of these terms",
    body: (
      <p>
        These Terms of Sale (&ldquo;Terms&rdquo;) govern all quotes, orders,
        and contracts between <strong>Yiwu HomeDorm Commodity Manufacturing Co., Ltd.</strong>
        (&ldquo;the Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) and the
        buyer (&ldquo;Customer&rdquo;, &ldquo;you&rdquo;) for custom apparel,
        accessories, and related printed products sold through sublimapparel.com
        or via direct email/WhatsApp quotation. By placing an order with us,
        you accept these Terms in full.
      </p>
    ),
  },
  {
    id: "quotes",
    title: "2. Quotes, pricing & validity",
    body: (
      <ul className="list-disc space-y-2 pl-6">
        <li>
          All quotes are provided in writing (email or PDF) and are valid for{" "}
          <strong>30 calendar days</strong> from the date of issue unless
          otherwise stated.
        </li>
        <li>
          Prices are quoted per piece, exclusive of shipping and applicable
          taxes unless the quote is explicitly marked as &ldquo;DDP&rdquo;
          (Delivered Duty Paid).
        </li>
        <li>
          Prices are subject to change after the validity period if raw
          material, labor, or logistics costs change materially.
        </li>
        <li>
          Sample fees (if any) are stated separately and are typically
          deductible from the bulk order upon confirmation.
        </li>
      </ul>
    ),
  },
  {
    id: "orders",
    title: "3. Orders, artwork & approval",
    body: (
      <ul className="list-disc space-y-2 pl-6">
        <li>
          An order becomes binding once both parties confirm: (a) the price
          quote, (b) the specification (fabric, size run, design, finishing),
          and (c) the deposit payment is received.
        </li>
        <li>
          You are responsible for ensuring that the artwork, logos, and
          content you provide do not infringe any third-party intellectual
          property rights. We reserve the right to refuse designs that we
          reasonably believe to be infringing, illegal, defamatory, or
          otherwise objectionable.
        </li>
        <li>
          We will issue a pre-production mockup / digital proof for your
          approval before cutting fabric. Production begins only after written
          approval of the proof.
        </li>
        <li>
          Sublimation color may vary slightly from screen to print and from
          print to print. Such variation within industry-standard tolerance
          is not grounds for rejection.
        </li>
      </ul>
    ),
  },
  {
    id: "payment",
    title: "4. Payment terms",
    body: (
      <ul className="list-disc space-y-2 pl-6">
        <li>
          New customers: <strong>30% deposit</strong> to start production,{" "}
          <strong>70% balance</strong> before shipment.
        </li>
        <li>
          Established customers (after 3 completed orders): 30/70 or 50/50
          terms may be offered at our discretion.
        </li>
        <li>
          Accepted methods: T/T (bank wire), PayPal (samples &amp; small
          orders), Alibaba Trade Assurance, and L/C at sight for orders above
          USD 20,000.
        </li>
        <li>
          All bank charges outside China (intermediary &amp; beneficiary
          bank fees) are borne by the Customer.
        </li>
      </ul>
    ),
  },
  {
    id: "production",
    title: "5. Production & delivery times",
    body: (
      <ul className="list-disc space-y-2 pl-6">
        <li>
          Production lead time: typically <strong>7–25 days</strong> from
          proof approval and deposit receipt, depending on order quantity,
          fabric availability, and finishing complexity.
        </li>
        <li>
          Quoted lead times are estimates, not guarantees. We are not liable
          for delays caused by force majeure (see Section 11), customer
          change requests, or carrier disruptions.
        </li>
        <li>
          If a hard deadline is critical, please flag it before placing the
          order so we can confirm or decline.
        </li>
      </ul>
    ),
  },
  {
    id: "shipping",
    title: "6. Shipping, customs & duties",
    body: (
      <p>
        We offer EXW, FOB, CIF, and DDP shipping terms. For DDP orders, the
        quoted price includes freight, customs clearance, duties, and final
        delivery to the address you provide. For non-DDP orders, you are
        responsible for any import duties, taxes, and clearance fees in your
        country. See our full{" "}
        <Link href="/shipping-policy" className="font-bold underline">
          Shipping Policy
        </Link>{" "}
        for details.
      </p>
    ),
  },
  {
    id: "inspection",
    title: "7. Inspection, defects & returns",
    body: (
      <ul className="list-disc space-y-2 pl-6">
        <li>
          You must inspect the goods within <strong>7 days</strong> of
          receipt and report any defects in writing with photos.
        </li>
        <li>
          For verified manufacturing defects, our liability is limited to:
          (a) free replacement of the defective units, (b) credit toward a
          future order, or (c) a partial refund of the affected unit price —
          at our discretion.
        </li>
        <li>
          We do not accept returns of: (a) custom-made or personalized
          goods, (b) goods damaged by the customer, (c) goods where the
          defect falls within industry-acceptable tolerance.
        </li>
        <li>
          Shipping costs for replacement of defective goods are borne by us;
          return shipping of non-defective goods is borne by the customer.
        </li>
      </ul>
    ),
  },
  {
    id: "ip",
    title: "8. Intellectual property",
    body: (
      <p>
        You retain all rights to the artwork, logos, and brand assets you
        provide to us. We retain all rights to our manufacturing know-how,
        fabric source code, and product photography. Neither party may use
        the other&rsquo;s brand name, logo, or trademarks in marketing or
        publicity without prior written consent.
      </p>
    ),
  },
  {
    id: "warranty",
    title: "9. Warranties & disclaimers",
    body: (
      <p>
        We warrant that goods will be produced in accordance with the
        approved specification and free from manufacturing defects. Except
        as expressly stated in these Terms, we make no other warranties,
        express or implied, including warranties of merchantability or
        fitness for a particular purpose.
      </p>
    ),
  },
  {
    id: "liability",
    title: "10. Limitation of liability",
    body: (
      <p>
        To the maximum extent permitted by law, our total liability for any
        claim arising from or related to an order shall not exceed the total
        amount you paid for that order. We are not liable for indirect,
        incidental, special, or consequential damages, including lost profits
        or business interruption.
      </p>
    ),
  },
  {
    id: "force",
    title: "11. Force majeure",
    body: (
      <p>
        Neither party is liable for delay or failure to perform caused by
        events beyond reasonable control, including but not limited to:
        natural disasters, pandemic, war, government action, port closure,
        labor strike, carrier disruption, raw material shortage, or power
        outage. The affected party shall notify the other promptly.
      </p>
    ),
  },
  {
    id: "law",
    title: "12. Governing law & disputes",
    body: (
      <p>
        These Terms are governed by the laws of the People&rsquo;s Republic
        of China (excluding conflict-of-laws rules). Any dispute that cannot
        be resolved amicably within 30 days shall be submitted to the China
        International Economic and Trade Arbitration Commission (CIETAC) for
        arbitration in Yiwu, China, in English. The arbitral award is final
        and binding on both parties.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0a0a0a]">
      <section className="border-b-2 border-[#0a0a0a] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-[#0a0a0a] hover:text-[#ff4d00]"
          >
            <ArrowLeft className="h-4 w-4" /> BACK TO HOME
          </Link>
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-[#ff4d00]">
            [ 006 / LEGAL ]
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Terms of sale.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#0a0a0a]/70">
            The rules that govern quotes, orders, payment, production, and
            shipping for custom sublimation orders. Plain English. Last
            updated August 2026.
          </p>
        </div>
      </section>

      <section className="bg-[#faf9f6]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <article key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-extrabold leading-tight text-[#0a0a0a] md:text-3xl">
                  {section.title}
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-[#0a0a0a]/80">
                  {section.body}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 border-2 border-[#0a0a0a] bg-white p-6 md:p-8">
            <p className="text-xs font-bold tracking-[0.2em] text-[#ff4d00]">
              QUESTIONS ABOUT AN ORDER?
            </p>
            <h3 className="mt-3 text-2xl font-extrabold text-[#0a0a0a]">
              Email our sales team.
            </h3>
            <p className="mt-2 text-sm text-[#0a0a0a]/70">
              We respond to commercial and contractual questions within one
              business day.
            </p>
            <a
              href="mailto:info@sublimapparel.com?subject=Terms%20of%20sale%20question"
              className="mt-5 inline-flex items-center gap-2 bg-[#ff4d00] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#e64500]"
            >
              <Mail className="h-4 w-4" />
              info@sublimapparel.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
