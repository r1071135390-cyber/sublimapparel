import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { UnifiedContactCta } from "@/components/unified-contact-cta";
// 2026-09-18 (R73 GEO): TL;DR / Direct Answer block — see /lib/tldr-content.ts.
import { PageGeoAnswerBlock } from "@/components/geo-answer-block";

export const metadata = buildPageMetadata({
    title: "Golf Apparel ",
    description: "Page moved. Custom golf polos, mock necks, and quarter-zips.",
    robots: { index: false, follow: false },
  keywords: [
    "golf and bowling apparel",
    "golf polo bowling shirt combo",
    "mixed sport team apparel",
    "golf bowling event shirts",
    "golf and bowling team kit",
    "custom golf bowling apparel",
    "corporate golf bowling event",
    "tournament golf bowling shirts",
    "golf bowling merch",
    "mixed league apparel",
    "golf bowling uniform",
    "golf bowling club apparel",
    "recreational sports apparel",
    "country club bowling apparel",
    "golf bowling pro shop",
    "golf bowling jerseys",
    "bowling golf apparel",
    "sublimated golf bowling",
    "golf bowling team apparel",
    "golf bowling tournament apparel",
    "golf bowling polo",
    "custom golf bowling shirts",
    "golf bowling apparel factory",
    "golf bowling jersey printing",
    "golf bowling team jerseys",
    "golf bowling league apparel",
    "golf bowling clothing",
    "golf bowling custom apparel",
    "golf bowling merchandise",
    "golf bowling MOQ",
    "golf bowling B2B",
    "golf bowling sublimation",
    "golf bowling polo factory",
    "golf bowling uniform supplier",
    "golf bowling apparel manufacturer",
    "golf bowling apparel B2B",
  ]
});

export default function GolfBowlingMoved() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6 text-white">
      <div className="max-w-xl text-center">
        <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
          Page moved
        </div>
        <h1 className="text-4xl font-black leading-tight md:text-6xl">
          We&apos;ve split this page.
        </h1>
        <p className="mt-4 text-base text-neutral-400 md:text-lg">
          Golf apparel is now its own page, and bowling has its own page too. Redirecting you now…
        </p>
        <a
          href="/products/golf/"
          className="mt-8 inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-white hover:text-[#cc3d00]"
        >
          Go to Golf Apparel →
        </a>
        <p className="mt-6 text-xs text-neutral-500">
          Bowling? Visit <a href="/products/bowling/" className="text-[#0078a8] underline">/products/bowling/</a>.
        </p>
        <meta httpEquiv="refresh" content="2; url=/products/golf/" />
      </div>
    </main>
  );
}
