"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCw, Home, Mail } from "lucide-react";

// 2026-09-11 (R24): global client-side error boundary. Catches any
// uncaught render errors in child route segments and presents a branded
// recovery screen instead of Next.js's default error overlay. This is
// the App Router equivalent of the old pages/_error.tsx.
//
// Notes:
//   - Must be a Client Component ("use client") so React can re-render
//     it with a fresh state after reset().
//   - The error() callback in App Router surfaces the error to the
//     nearest error.tsx; we log it here so Sentry-equivalent monitoring
//     (manual error console + /api/log hooks) can pick it up.
//   - Status code is 500 by default — emitted via the response headers
//     automatically by Next.js.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to browser console so the developer can find it in dev tools.
    // In production this would also post to an error-reporting endpoint.
    // eslint-disable-next-line no-console
    console.error("[GlobalError boundary]", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0a0a0a]">
      <section className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-6 text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
            [ error / 500 / server-error ]
          </div>
          <div className="flex items-start gap-4">
            <AlertTriangle
              className="h-12 w-12 shrink-0 text-[#ff4d00] md:h-16 md:w-16"
              strokeWidth={2.25}
            />
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
              <span className="block">Something broke</span>
              <span className="block text-[#ff4d00]">on our end.</span>
            </h1>
          </div>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0] md:text-xl">
            We hit an unexpected error rendering this page. Our team has been
            notified. You can retry now, or jump to a different section — the
            site is still working elsewhere.
          </p>
          {error.digest && (
            <p className="mt-4 font-mono text-xs text-[#6b6b6b]">
              Error reference: {error.digest}
            </p>
          )}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#e64400] hover:border-[#e64400]"
            >
              <RotateCw className="h-5 w-5" strokeWidth={2.5} />
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]"
            >
              <Home className="h-5 w-5" strokeWidth={2.5} />
              Back to home
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]"
            >
              <Mail className="h-5 w-5" strokeWidth={2.5} />
              Report this
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-3 text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
            [ Safe to browse ]
          </div>
          <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
            The rest of the site is fine.
          </h2>
          <div className="mt-8 grid gap-px bg-[#0a0a0a] md:grid-cols-3">
            {[
              { href: "/products/all/", label: "Browse 100 products" },
              { href: "/fabric/", label: "Open fabric library" },
              { href: "/industries/", label: "Explore 12 industries" },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="bg-[#faf9f6] p-8 transition-colors hover:bg-[#ff4d00]"
              >
                <h3 className="text-lg font-bold leading-snug">{card.label}</h3>
                <p className="mt-2 text-sm text-[#3a3a3a]">Click to continue browsing.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
