"use client";

import dynamic from "next/dynamic";

// Below-fold client components: lazy-load on the client so the initial
// HTML payload is much smaller. Each gets a lightweight skeleton so
// layout doesn't jump when the real content hydrates.
const VideoShowcase = dynamic(
  () => import("@/components/home-extras").then((m) => m.VideoShowcase),
  { ssr: false, loading: () => <SectionSkeleton aspect="video" /> },
);
const InquiryCTA = dynamic(
  () => import("@/components/inquiry-cta").then((m) => m.InquiryCTA),
  { ssr: false, loading: () => <SectionSkeleton aspect="narrow" /> },
);
const FreeDesignService = dynamic(
  () => import("@/components/home-extras").then((m) => m.FreeDesignService),
  { ssr: false, loading: () => <SectionSkeleton aspect="narrow" /> },
);
const RecentCaseStudies = dynamic(
  () => import("@/components/home-extras").then((m) => m.RecentCaseStudies),
  { ssr: false, loading: () => <SectionSkeleton aspect="wide" /> },
);
const LogoWall = dynamic(
  () => import("@/components/home-extras").then((m) => m.LogoWall),
  { ssr: false, loading: () => <SectionSkeleton aspect="narrow" /> },
);
const Industries = dynamic(
  () => import("@/components/industries").then((m) => m.Industries),
  { ssr: false, loading: () => <SectionSkeleton aspect="wide" /> },
);
const HomeExtras = dynamic(
  () => import("@/components/home-extras").then((m) => m.HomeExtras),
  { ssr: false, loading: () => <SectionSkeleton aspect="narrow" /> },
);
const Contact = dynamic(
  () => import("@/components/contact").then((m) => m.Contact),
  { ssr: false, loading: () => <SectionSkeleton aspect="narrow" /> },
);
const Newsletter = dynamic(
  () => import("@/components/home-extras").then((m) => m.Newsletter),
  { ssr: false, loading: () => <SectionSkeleton aspect="narrow" /> },
);

function SectionSkeleton({ aspect }: { aspect: "wide" | "narrow" | "video" }) {
  const h =
    aspect === "video"
      ? "aspect-video"
      : aspect === "wide"
        ? "h-64 md:h-80"
        : "h-32 md:h-40";
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
      <VideoShowcase />
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
