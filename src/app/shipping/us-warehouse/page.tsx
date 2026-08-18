import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "US Buffer-Storage Address · Honest Note",
  description:
    "An honest note about our US warehouse address in Fontana, CA. It's a placeholder service for occasional overstock buffer storage — not a standard feature. Most orders don't use it.",
  alternates: {
    canonical: "https://sublimapparel.com/shipping/us-warehouse/",
  },
  robots: { index: true, follow: true },

  openGraph: {
    images: ["/shipping-hero.webp"],
  },
};

const usWarehouseData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "US Buffer-Storage Address · Honest Note",
  description:
    "An honest note about our US warehouse address in Fontana, CA. It's a placeholder service for occasional overstock buffer storage — not a standard feature.",
};

export default function UsWarehousePage() {
  return (
    <main className="bg-white text-[#0a0a0a]">
      <JsonLd data={usWarehouseData} />

      {/* HERO — brutally honest */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#cc3d00]">
            Honest note · Not a standard feature
          </p>
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            About our US warehouse.
            <br />
            <span className="text-[#cc3d00]">The short version.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            We have a small US address in Fontana, CA. It&apos;s a placeholder service we keep around for occasional overstock — not a core part of how we work, and we don&apos;t promote it.
          </p>
        </div>
      </section>

      {/* WHY IT'S NOT A CORE FEATURE */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <h2 className="mb-6 text-2xl font-black tracking-tight md:text-3xl">
            Why it&apos;s not a main feature.
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-[#3a3a3a]">
            <p>
              Most of our orders are <strong>custom-made to spec</strong> — your designs, your fabric, your sizes. Once they arrive in the US, they usually go straight to your warehouse, your customer, an Amazon FBA warehouse, or a 3PL. There&apos;s no &quot;restock later&quot; step, because the next batch is made to order, not pulled from inventory.
            </p>
            <p>
              For that reason, a US warehouse address is{" "}
              <strong>useful in narrow cases only</strong> — typically when a customer ordered more than they immediately needed and wants the surplus kept stateside for a later drop.
            </p>
          </div>
        </div>
      </section>

      {/* WHEN IT DOES HELP */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <h2 className="mb-6 text-2xl font-black tracking-tight md:text-3xl">
            When it does help.
          </h2>
          <ul className="space-y-3 text-base text-[#3a3a3a]">
            {[
              "You ordered 1,000 pieces but only need 500 for the next 4 weeks — keep the other 500 in the US.",
              "You run a small re-order cycle and want 2–3 weeks of buffer stock on hand for fast US re-shipping.",
              "You're shipping to multiple US customers and want one consolidated address before splitting.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ff4d00]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* THE HONEST BOTTOM LINE */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <h2 className="mb-6 text-2xl font-black tracking-tight md:text-3xl">
            The honest bottom line.
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-[#3a3a3a]">
            <p>
              The US warehouse address doesn&apos;t lower your unit price. It doesn&apos;t shorten production time. It doesn&apos;t unlock any volume discount. It&apos;s simply a place to park finished goods for a few weeks if you need that.
            </p>
            <p>
              If you don&apos;t need it, ignore this page. The 99% of our customers do.
            </p>
            <p>
              If you do need it, tell us in your RFQ — we&apos;ll quote the buffer-storage fee on top of the unit price, separately, with no markup. It&apos;s usually around <strong>$0.10–0.30 per piece per month</strong> depending on size and volume.
            </p>
          </div>
        </div>
      </section>

      {/* ADDRESS + CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <div className="rounded-sm border-2 border-[#0a0a0a] bg-[#faf9f6] p-6 md:p-8">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#6b6b6b]">
              US address
            </p>
            <p className="font-mono text-base leading-relaxed text-[#0a0a0a]">
              SublimApparel c/o [Your Company Name]
              <br />
              12345 Logistics Way
              <br />
              Fontana, CA 92335
              <br />
              United States
            </p>
            <p className="mt-3 text-xs text-[#6b6b6b]">
              (Address provided after RFQ confirmation. Not a walk-in location.)
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-a-quote/"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#ff4d00] px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-[#e64500]"
            >
              Ask in your RFQ <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shipping/"
              className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-[#0a0a0a] bg-white px-6 py-3.5 text-sm font-black uppercase tracking-wider text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a] hover:text-white"
            >
              Back to shipping <MapPin className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-8 text-center text-xs text-[#6b6b6b]">
            Last updated: when we felt like being honest about it.
          </p>
        </div>
      </section>
    </main>
  );
}
