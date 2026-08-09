import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — SublimPrint",
  description:
    "How SublimPrint collects, uses, and protects your personal data across our website, inquiry form, and order workflow.",
};

const SECTIONS = [
  {
    id: "controller",
    title: "1. Who we are",
    body: (
      <>
        <p>
          This website (sublimprint.com) is operated by{" "}
          <strong>Yiwu HomeDorm Commodity Manufacturing Co., Ltd.</strong>, a
          company registered in Yiwu, Zhejiang, China (the &ldquo;Company&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). We are the data controller for
          the personal information you provide through this website.
        </p>
        <p>
          <strong>Registered address:</strong> 35 Lingyun Road, Yiwu, Zhejiang,
          China
          <br />
          <strong>US warehouse:</strong> 13052 Jurupa Ave, Fontana, CA 92335,
          United States
          <br />
          <strong>Email:</strong> ramon@sublimprint.com
          <br />
          <strong>WhatsApp:</strong> +86 137 6459 3988
        </p>
      </>
    ),
  },
  {
    id: "what",
    title: "2. What personal data we collect",
    body: (
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Identity &amp; contact:</strong> name, email, phone/WhatsApp,
          company name, country, postal/ZIP code.
        </li>
        <li>
          <strong>Project details:</strong> product type, fabric, quantity, size
          breakdown, design status, delivery deadline, shipping country, message
          text, and any artwork files you upload.
        </li>
        <li>
          <strong>Technical data:</strong> IP address, browser type, pages
          visited, referring URL, and approximate location (derived from IP).
          Collected automatically via cookies and server logs.
        </li>
        <li>
          <strong>Communications:</strong> any messages you send us via email,
          WhatsApp, or the inquiry form.
        </li>
      </ul>
    ),
  },
  {
    id: "why",
    title: "3. Why we use your data (legal basis)",
    body: (
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>To respond to your inquiry and provide a quote</strong> —
          legal basis: performance of a contract / pre-contractual steps.
        </li>
        <li>
          <strong>To produce and ship your order</strong> — legal basis:
          performance of a contract; legal and tax obligations.
        </li>
        <li>
          <strong>To send service messages</strong> (order updates, production
          status, tracking) — legal basis: performance of a contract.
        </li>
        <li>
          <strong>To improve our website</strong> — legal basis: legitimate
          interest in operating and improving our service.
        </li>
        <li>
          <strong>To comply with tax, customs, and trade regulations</strong> —
          legal basis: legal obligation.
        </li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "4. Who we share your data with",
    body: (
      <>
        <p>
          We do not sell your personal data. We only share it with the
          following categories of recipients, to the extent strictly necessary:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Logistics partners</strong> (e.g. DHL, FedEx, UPS, freight
            forwarders) — to ship your order and complete customs clearance.
          </li>
          <li>
            <strong>Payment processors</strong> (e.g. PayPal, T/T bank channels)
            — to process your payment securely.
          </li>
          <li>
            <strong>Cloud service providers</strong> (e.g. hosting, file
            storage, email) — to operate the website and store artwork files.
          </li>
          <li>
            <strong>Government authorities</strong> — when required by law
            (customs, tax, anti-fraud).
          </li>
        </ul>
        <p>
          Some of these recipients may be located outside your home country,
          including in China. Where required (e.g. for EEA/UK data subjects),
          we rely on Standard Contractual Clauses or equivalent safeguards.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookies",
    body: (
      <p>
        We use a minimal set of cookies and similar technologies: (a)
        strictly-necessary cookies for site operation, (b) optional analytics
        cookies to understand traffic and improve the site. You can disable
        non-essential cookies in your browser settings without affecting core
        site functionality.
      </p>
    ),
  },
  {
    id: "retention",
    title: "6. How long we keep your data",
    body: (
      <p>
        We keep your inquiry and order data for as long as needed to provide
        our service, comply with legal and tax obligations (typically 5–10
        years for accounting records), and resolve disputes. Artwork files are
        retained for the duration of the order and may be deleted on request
        after fulfillment.
      </p>
    ),
  },
  {
    id: "rights",
    title: "7. Your rights",
    body: (
      <>
        <p>
          Depending on your jurisdiction, you have the right to: (a) access
          the personal data we hold about you; (b) correct inaccurate data;
          (c) request deletion; (d) restrict or object to processing; (e)
          request data portability; (f) withdraw consent at any time (where
          processing is based on consent); (g) lodge a complaint with your
          local data protection authority.
        </p>
        <p>
          To exercise any of these rights, contact us at{" "}
          <strong>ramon@sublimprint.com</strong>. We will respond within 30
          days.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "8. How we protect your data",
    body: (
      <p>
        We use industry-standard technical and organizational safeguards,
        including HTTPS encryption, access controls, and limited employee
        access on a need-to-know basis. No method of transmission over the
        internet, however, is 100% secure — we cannot guarantee absolute
        security.
      </p>
    ),
  },
  {
    id: "changes",
    title: "9. Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The &ldquo;Last
        updated&rdquo; date at the top will reflect the latest revision.
        Material changes will be highlighted on the homepage for at least 30
        days.
      </p>
    ),
  },
];

export default function PrivacyPage() {
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
            [ 005 / LEGAL ]
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Privacy policy.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#0a0a0a]/70">
            How we collect, use, and protect your personal data. Plain
            English. Last updated August 2026.
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
              QUESTIONS?
            </p>
            <h3 className="mt-3 text-2xl font-extrabold text-[#0a0a0a]">
              Email our team.
            </h3>
            <p className="mt-2 text-sm text-[#0a0a0a]/70">
              We respond to privacy &amp; data requests within 30 days.
            </p>
            <a
              href="mailto:ramon@sublimprint.com?subject=Privacy%20request"
              className="mt-5 inline-flex items-center gap-2 bg-[#ff4d00] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#e64500]"
            >
              <Mail className="h-4 w-4" />
              ramon@sublimprint.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
