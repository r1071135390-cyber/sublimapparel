import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your SublimApparel account to manage orders, request reprints, and access saved shipping addresses.",
  keywords:
    "SublimApparel account, create account, B2B client registration, sample kit request, order tracking",
  robots: { index: false },
  alternates: { canonical: "./" },
};

export default function RegisterPage() {
  return (
    <section className="border-b-2 border-black bg-[#faf9f6] py-14 md:py-20">
      <div className="mx-auto max-w-md px-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#cc3d00]">
          Join SublimApparel
        </p>
        <h1 className="mb-3 text-4xl font-extrabold leading-tight md:text-5xl">
          Create account.
        </h1>
        <p className="mb-8 text-sm text-black/70">
          Faster re-quotes, save artwork, track orders.
        </p>

        <form className="space-y-4" action="#" method="post">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider">
              Full name
            </label>
            <input
              type="text"
              required
              placeholder="Jane Doe"
              className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm focus:border-[#ff4d00] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider">
              Company
            </label>
            <input
              type="text"
              placeholder="Acme Marketing Inc."
              className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm focus:border-[#ff4d00] focus:outline-none"
            />
          </div>
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
              placeholder="At least 8 characters"
              className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm focus:border-[#ff4d00] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff4d00] py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#e64500]"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-black/70">
          Already have an account?{" "}
          <Link
            href="/login/"
            className="font-bold text-[#cc3d00] underline-offset-2 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
