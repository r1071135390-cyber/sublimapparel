"use client";

import { useState } from "react";

export function V10Contact() {
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
    <section className="bg-black py-32 relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="relative max-w-3xl mx-auto px-6">
        <div className="font-mono text-xs text-fuchsia-400 tracking-widest mb-4">
          &gt; /TRANSMIT.INQUIRY
        </div>
        <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight mb-12">
          OPEN_CHANNEL<span className="text-cyan-400">.</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              required
              name="name"
              type="text"
              placeholder="&gt; NAME"
              className="bg-cyan-500/5 border border-cyan-500/30 px-4 py-3 text-cyan-100 placeholder-cyan-500/40 focus:outline-none focus:border-cyan-400 transition font-mono text-sm"
            />
            <input
              required
              name="email"
              type="email"
              placeholder="&gt; EMAIL"
              className="bg-cyan-500/5 border border-cyan-500/30 px-4 py-3 text-cyan-100 placeholder-cyan-500/40 focus:outline-none focus:border-cyan-400 transition font-mono text-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="company"
              type="text"
              placeholder="&gt; COMPANY"
              className="bg-cyan-500/5 border border-cyan-500/30 px-4 py-3 text-cyan-100 placeholder-cyan-500/40 focus:outline-none focus:border-cyan-400 transition font-mono text-sm"
            />
            <input
              name="product"
              type="text"
              placeholder="&gt; PRODUCT_TYPE"
              className="bg-cyan-500/5 border border-cyan-500/30 px-4 py-3 text-cyan-100 placeholder-cyan-500/40 focus:outline-none focus:border-cyan-400 transition font-mono text-sm"
            />
          </div>
          <input
            name="quantity"
            type="text"
            placeholder="&gt; QUANTITY_RANGE"
            className="w-full bg-cyan-500/5 border border-cyan-500/30 px-4 py-3 text-cyan-100 placeholder-cyan-500/40 focus:outline-none focus:border-cyan-400 transition font-mono text-sm"
          />
          <textarea
            required
            name="message"
            rows={4}
            placeholder="&gt; MESSAGE"
            className="w-full bg-cyan-500/5 border border-cyan-500/30 px-4 py-3 text-cyan-100 placeholder-cyan-500/40 focus:outline-none focus:border-cyan-400 transition font-mono text-sm resize-none"
          />
          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-6 py-3 bg-cyan-400 text-black font-black font-mono text-sm tracking-wider hover:shadow-[0_0_30px_#00ffff] transition disabled:opacity-40"
            >
              {status === "sending" ? "TRANSMITTING..." : "&gt; SEND"}
            </button>
            <div className="font-mono text-xs text-cyan-400">
              {status === "sent" && "✓ ACK_RECEIVED — REPLY_IN_24H"}
              {status === "error" && "✗ TRANSMIT_FAILED — RETRY"}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
