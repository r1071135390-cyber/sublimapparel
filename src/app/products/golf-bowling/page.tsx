import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golf Apparel ",
  description: "Page moved. Custom golf polos, mock necks, and quarter-zips.",
  robots: { index: false, follow: false },
};

export default function GolfBowlingMoved() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6 text-white">
      <div className="max-w-xl text-center">
        <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
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
          className="mt-8 inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#cc3d00]"
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
