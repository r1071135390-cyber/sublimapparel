"use client";

import { useState } from "react";

export function V5Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
      // keep simple error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Request a Free Quote
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Tell us what you need. We respond within 24 hours with a detailed quote.
          </p>
        </div>

        {submitted ? (
          <div className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-neutral-900">Inquiry received</h3>
            <p className="mt-2 text-sm text-neutral-600">
              We&apos;ll get back to you within 24 hours with a detailed quote.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1.5 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1.5 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Company</label>
              <input
                type="text"
                name="company"
                className="mt-1.5 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Product type</label>
                <select
                  name="product"
                  required
                  className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
                >
                  <option value="">Select a product</option>
                  <option value="t-shirts">Custom T-Shirts</option>
                  <option value="jerseys">Sports Jerseys</option>
                  <option value="hoodies">Hoodies</option>
                  <option value="tanks">Tank Tops</option>
                  <option value="flags">Flags & Banners</option>
                  <option value="accessories">Bags & Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Quantity</label>
                <select
                  name="quantity"
                  required
                  className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
                >
                  <option value="">Select quantity</option>
                  <option value="50-100">50-100 pcs</option>
                  <option value="100-500">100-500 pcs</option>
                  <option value="500-1000">500-1,000 pcs</option>
                  <option value="1000-5000">1,000-5,000 pcs</option>
                  <option value="5000+">5,000+ pcs</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Message</label>
              <textarea
                name="message"
                rows={4}
                className="mt-1.5 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-neutral-900 focus:outline-none"
                placeholder="Tell us about your project, timeline, and any specific requirements..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Request Quote"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
