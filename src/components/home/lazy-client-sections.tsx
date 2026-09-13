"use client";

import dynamic from "next/dynamic";

// Below-fold client components: lazy-load on the client so the initial
// HTML payload is much smaller. Each gets a lightweight skeleton so
// layout doesn't jump when the real content hydrates.
//
// 2026-09-14 (R64d): removed `ssr: false` from every dynamic() import.
// The previous `ssr: false` setup caused 8 sequential client-side
// hydrations on the home page — each below-fold section shipped a
// 32/40/64/80px-tall `<SectionSkeleton>` in the SSR HTML, and when
// the real component chunk arrived on the client it replaced the
// skeleton at its real height, triggering one forced reflow per
// section. PageSpeed flagged the cumulative cost as 98 ms of TBT
// from the layout thrash. With `ssr: false` removed, every below-
// fold section now ships as part of the SSR HTML:
//   - one paint, no reflow chain, no CLS shift;
//   - 8 fewer client-side render passes after hydration;
//   - the chunk-size benefit of dynamic() is preserved (each
//     component still ships as its own client bundle and hydrates
//     on idle rather than on mount).
// Trade-off: the SSR HTML is ~30-50 KB heavier on the home page
// (gzip 8-15 KB), but the home page is the highest-traffic LCP
// surface so the perf win dominates. The components stay
// dynamic-imported so they still split the client bundle and do
// not block the main thread on initial mount.
const InquiryCTA = dynamic(
  () => import("@/components/inquiry-cta").then((m) => m.InquiryCTA),
  { loading: () => <SectionSkeleton aspect="narrow" /> },
);
const FreeDesignService = dynamic(
  () => import("@/components/home-extras").then((m) => m.FreeDesignService),
  { loading: () => <SectionSkeleton aspect="narrow" /> },
);
const RecentCaseStudies = dynamic(
  () => import("@/components/home-extras").then((m) => m.RecentCaseStudies),
  { loading: () => <SectionSkeleton aspect="wide" /> },
);
const LogoWall = dynamic(
  () => import("@/components/home-extras").then((m) => m.LogoWall),
  { loading: () => <SectionSkeleton aspect="narrow" /> },
);
const Industries = dynamic(
  () => import("@/components/industries").then((m) => m.Industries),
  { loading: () => <SectionSkeleton aspect="wide" /> },
);
const HomeExtras = dynamic(
  () => import("@/components/home-extras").then((m) => m.HomeExtras),
  { loading: () => <SectionSkeleton aspect="narrow" /> },
);
const Contact = dynamic(
  () => import("@/components/contact").then((m) => m.Contact),
  { loading: () => <SectionSkeleton aspect="narrow" /> },
);
const Newsletter = dynamic(
  () => import("@/components/home-extras").then((m) => m.Newsletter),
  { loading: () => <SectionSkeleton aspect="narrow" /> },
);

function SectionSkeleton({ aspect }: { aspect: "wide" | "narrow" }) {
  const h = aspect === "wide" ? "h-64 md:h-80" : "h-32 md:h-40";
  return (
    <div className="border-b-2 border-black/5 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className={`${h} w-full animate-pulse rounded-2xl bg-black/[0.04]`} />
      </div>
    </div>
  );
}

export function LazyClientSections() {
  return (
    <>
      <InquiryCTA />
      <FreeDesignService />
      <RecentCaseStudies />
      <LogoWall />
      <Industries />
      <HomeExtras />
      <Contact />
      <Newsletter />
    </>
  );
}
