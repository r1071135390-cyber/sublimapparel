"use client";

import { useState } from "react";

export function V9Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      product: formData.get("product"),
      quantity: formData.get("quantity"),
      message: formData.get("message"),
    };
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-[#faf8f3] py-32 border-t border-stone-200">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-stone-400 text-xs tracking-[0.3em] font-light mb-8">
          — Get in touch
        </div>
        <h2 className="text-stone-900 text-3xl md:text-5xl font-light leading-tight mb-12">
          Tell us about your project.
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input
              required
              name="name"
              type="text"
              placeholder="Your name"
              className="bg-transparent border-b border-stone-300 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition font-light"
            />
            <input
              required
              name="email"
              type="email"
              placeholder="Email"
              className="bg-transparent border-b border-stone-300 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition font-light"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input
              name="company"
              type="text"
              placeholder="Company (optional)"
              className="bg-transparent border-b border-stone-300 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition font-light"
            />
            <input
              name="product"
              type="text"
              placeholder="Product (e.g. T-Shirt)"
              className="bg-transparent border-b border-stone-300 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition font-light"
            />
          </div>
          <input
            name="quantity"
            type="text"
            placeholder="Quantity (e.g. 100-500)"
            className="w-full bg-transparent border-b border-stone-300 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition font-light"
          />
          <textarea
            required
            name="message"
            rows={4}
            placeholder="Tell us about your project"
            className="w-full bg-transparent border-b border-stone-300 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition font-light resize-none"
          />
          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="text-stone-900 text-sm font-light border-b border-stone-900 pb-1 hover:opacity-60 transition disabled:opacity-40"
            >
              {status === "sending" ? "Sending..." : "Send inquiry →"}
            </button>
            <div className="text-stone-400 text-xs font-light">
              {status === "sent" && "✓ Thank you, we'll reply within 24 hours."}
              {status === "error" && "Something went wrong. Please try again."}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
