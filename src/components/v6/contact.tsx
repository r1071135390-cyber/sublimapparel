"use client";

import { useState } from "react";

export function V6Contact() {
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
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <div className="inline-block bg-[#00ff88] px-3 py-1.5 text-xs font-black uppercase tracking-widest text-black">
            Get Started
          </div>
          <h2 className="mt-4 text-4xl font-black uppercase leading-none sm:text-5xl">
            Request a Quote
          </h2>
          <p className="mt-4 text-lg text-white/70">
            24-hour response. No commitment. Just details.
          </p>
        </div>

        {submitted ? (
          <div className="mt-12 border-4 border-[#00ff88] bg-black p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center bg-[#00ff88] text-black">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-black uppercase">Inquiry Received</h3>
            <p className="mt-2 text-sm text-white/70">
              We&apos;ll be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                required
                placeholder="NAME"
                className="border-2 border-white bg-black px-4 py-3 text-sm font-bold uppercase tracking-wider text-white placeholder-white/40 focus:border-[#00ff88] focus:outline-none"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="EMAIL"
                className="border-2 border-white bg-black px-4 py-3 text-sm font-bold uppercase tracking-wider text-white placeholder-white/40 focus:border-[#00ff88] focus:outline-none"
              />
            </div>
            <input
              type="text"
              name="company"
              placeholder="COMPANY / TEAM"
              className="w-full border-2 border-white bg-black px-4 py-3 text-sm font-bold uppercase tracking-wider text-white placeholder-white/40 focus:border-[#00ff88] focus:outline-none"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <select
                name="product"
                required
                className="border-2 border-white bg-black px-4 py-3 text-sm font-bold uppercase tracking-wider text-white focus:border-[#00ff88] focus:outline-none"
              >
                <option value="">PRODUCT</option>
                <option value="race-jerseys">Race Jerseys</option>
                <option value="cycling">Cycling Kits</option>
                <option value="training">Training Tees</option>
                <option value="compression">Compression</option>
                <option value="singlets">Running Singlets</option>
                <option value="hoodies">Hoodies</option>
              </select>
              <select
                name="quantity"
                required
                className="border-2 border-white bg-black px-4 py-3 text-sm font-bold uppercase tracking-wider text-white focus:border-[#00ff88] focus:outline-none"
              >
                <option value="">QUANTITY</option>
                <option value="50-100">50-100</option>
                <option value="100-500">100-500</option>
                <option value="500-1000">500-1000</option>
                <option value="1000-5000">1000-5000</option>
                <option value="5000+">5000+</option>
              </select>
            </div>
            <textarea
              name="message"
              rows={4}
              placeholder="MESSAGE / PROJECT DETAILS"
              className="w-full border-2 border-white bg-black px-4 py-3 text-sm font-bold uppercase tracking-wider text-white placeholder-white/40 focus:border-[#00ff88] focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00ff88] px-6 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:translate-x-1 hover:translate-y-1 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Inquiry →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
