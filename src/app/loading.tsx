// 2026-09-11 (R24): global Suspense fallback shown while a route segment
// is loading. Without this, Next.js shows an unbranded "Loading..." text
// during navigation, which feels broken on a B2B site where buyers
// expect a polished experience. The progress bar uses the brand orange
// (#ff4d00) so the loading state stays on-brand.
//
// This is rendered as a Server Component, which means it can be used as
// a fallback for <Suspense> boundaries anywhere in the tree. It also
// satisfies the route-level `loading.tsx` convention so Next.js wraps
// every page in <Suspense fallback={<Loading />}> automatically.
export default function Loading() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-[#faf9f6]"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="w-full max-w-md px-6">
        <div className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-[#6b6b6b]">
          [ loading / sublimapparel ]
        </div>
        <div className="h-1 w-full overflow-hidden bg-[#0a0a0a]/10">
          <div
            className="h-full w-1/2 bg-[#ff4d00]"
            style={{
              animation: "sublimapparel-loading-bar 1.2s ease-in-out infinite",
            }}
          />
        </div>
        <p className="mt-6 text-center text-sm text-[#3a3a3a]">
          One moment — pulling in the catalog…
        </p>
        <style>{`
          @keyframes sublimapparel-loading-bar {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(300%); }
          }
        `}</style>
      </div>
    </main>
  );
}
