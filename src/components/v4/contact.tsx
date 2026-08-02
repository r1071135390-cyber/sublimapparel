"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
      // noop
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-[#0a0e1a] py-24 text-white">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
              Get in Touch
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Let's print something great.
            </h2>
            <p className="mt-6 max-w-md text-white/60">
              Tell us about your project. We respond within 24 hours with a quote and timeline.
            </p>
            <div className="mt-10 space-y-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-white/40">Email</div>
                <a href="mailto:hello@vividprint.cn" className="mt-1 block text-lg text-white hover:text-cyan-300">
                  hello@vividprint.cn
                </a>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-white/40">Phone / WhatsApp</div>
                <a href="tel:+86138XXXXXXXX" className="mt-1 block text-lg text-white hover:text-cyan-300">
                  +86 138 XXXX XXXX
                </a>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-white/40">Factory</div>
                <p className="mt-1 text-lg text-white">Yiwu, Zhejiang, China</p>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold">Inquiry received</h3>
              <p className="mt-2 text-white/60">We'll respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  name="name"
                  required
                  placeholder="Full name"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <input
                name="company"
                placeholder="Company (optional)"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
              />
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  name="product"
                  required
                  placeholder="Product (e.g. T-Shirts)"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
                />
                <input
                  name="quantity"
                  required
                  placeholder="Quantity"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Inquiry"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
