import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import Link from "next/link";

export const metadata = buildPageMetadata({
    title: "Sign In | SublimApparel Account",
    description: "Sign in to your SublimApparel account to view order history, request reprints, and manage shipping addresses.",
    alternates: { canonical: "./" },
    robots: { index: false },
  });;

export default function LoginPage() {
  return (
    <section className="border-b-2 border-black bg-[#faf9f6] py-14 md:py-20">
      <div className="mx-auto max-w-md px-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#cc3d00]">
          Welcome back
        </p>
        <h1 className="mb-3 text-4xl font-extrabold leading-tight md:text-5xl">
          Sign in.
        </h1>
        <p className="mb-8 text-sm text-black/70">
          Order history, saved artwork, reprints, faster re-quotes.
        </p>

        <form className="space-y-4" action="#" method="post">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm focus:border-[#ff4d00] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm focus:border-[#ff4d00] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff4d00] py-3 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#e64500]"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-black/70">
          New here?{" "}
          <Link
            href="/register/"
            className="font-bold text-[#cc3d00] underline-offset-2 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
