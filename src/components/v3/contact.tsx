"use client";

import { useState } from "react";

export function V3Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    product: "Custom T-Shirts",
    quantity: "100-500",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      setForm({
        name: "",
        email: "",
        company: "",
        product: "Custom T-Shirts",
        quantity: "100-500",
        message: "",
      });
    } catch (err) {
      setStatus("err");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section className="border-b-2 border-black bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Left: bold statement */}
          <div className="md:col-span-5">
            <div className="mb-3 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Get in touch
            </div>
            <h2 className="text-5xl font-black leading-[0.95] tracking-tight text-black md:text-7xl">
              Got a
              <br />
              <span className="text-[#ff4d00]">project?</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-black/70">
              Send us your design, your quantity, and your deadline. We&apos;ll reply with a
              quote within 24 hours.
            </p>

            <div className="mt-10 space-y-4 border-t-2 border-black pt-6 text-sm">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-black/50">
                  WhatsApp
                </div>
                <div className="mt-1 text-base font-bold text-black">
                  +86 138 XXXX XXXX
                </div>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-black/50">
                  Email
                </div>
                <div className="mt-1 text-base font-bold text-black">
                  hello@vividprint.cn
                </div>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-black/50">
                  Address
                </div>
                <div className="mt-1 text-base font-bold text-black">
                  Yiwu, Zhejiang, China
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="md:col-span-7">
            <form
              onSubmit={onSubmit}
              className="border-2 border-black bg-white p-8 md:p-10"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Name *">
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                    className="w-full border-b-2 border-black bg-transparent py-2 text-base font-medium text-black placeholder:text-black/30 focus:border-[#ff4d00] focus:outline-none"
                  />
                </Field>
                <Field label="Email *">
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@company.com"
                    className="w-full border-b-2 border-black bg-transparent py-2 text-base font-medium text-black placeholder:text-black/30 focus:border-[#ff4d00] focus:outline-none"
                  />
                </Field>
                <Field label="Company">
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={onChange}
                    placeholder="Company / brand"
                    className="w-full border-b-2 border-black bg-transparent py-2 text-base font-medium text-black placeholder:text-black/30 focus:border-[#ff4d00] focus:outline-none"
                  />
                </Field>
                <Field label="Product *">
                  <select
                    name="product"
                    value={form.product}
                    onChange={onChange}
                    className="w-full border-b-2 border-black bg-transparent py-2 text-base font-medium text-black focus:border-[#ff4d00] focus:outline-none"
                  >
                  <option>Custom T-Shirts (Polyester)</option>
                    <option>Custom T-Shirts (Cotton)</option>
                    <option>Sports Jerseys</option>
                    <option>Hoodies &amp; Sweatshirts</option>
                    <option>Tank Tops &amp; Vests</option>
                    <option>Pants &amp; Shorts</option>
                    <option>Polo Shirts</option>
                    <option>Hats &amp; Caps</option>
                    <option>Bags &amp; Backpacks</option>
                    <option>Flags &amp; Banners</option>
                    <option>Home Textiles (Pillows, Throws, Curtains)</option>
                    <option>Mousepads &amp; Coasters</option>
                    <option>Phone Cases &amp; Small Accessories</option>
                    <option>Custom Project (Other)</option>
                  </select>
                </Field>
                <Field label="Quantity">
                  <select
                    name="quantity"
                    value={form.quantity}
                    onChange={onChange}
                    className="w-full border-b-2 border-black bg-transparent py-2 text-base font-medium text-black focus:border-[#ff4d00] focus:outline-none"
                  >
                    <option>50-100</option>
                    <option>100-500</option>
                    <option>500-1000</option>
                    <option>1000-5000</option>
                    <option>5000+</option>
                  </select>
                </Field>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-xs font-black uppercase tracking-widest text-black">
                  Project details
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={4}
                  placeholder="Tell us about your project, design, deadline..."
                  className="w-full border-2 border-black bg-transparent p-3 text-base font-medium text-black placeholder:text-black/30 focus:border-[#ff4d00] focus:outline-none"
                />
              </div>

              <div className="mt-8 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-xs text-black/50">
                  We reply within 24 hours. No spam.
                </p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center justify-center gap-2 bg-[#ff4d00] px-8 py-4 text-base font-black uppercase tracking-wider text-white transition-colors hover:bg-black disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send inquiry"}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>

              {status === "ok" && (
                <div className="mt-4 border-2 border-[#00c2ff] bg-[#00c2ff]/10 p-3 text-sm font-bold text-black">
                  ✓ Thanks! We&apos;ll be in touch within 24 hours.
                </div>
              )}
              {status === "err" && (
                <div className="mt-4 border-2 border-[#ff4d00] bg-[#ff4d00]/10 p-3 text-sm font-bold text-black">
                  ✗ {errorMsg || "Something went wrong. Please try again."}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs font-black uppercase tracking-widest text-black">
        {label}
      </label>
      {children}
    </div>
  );
}
