"use client";

import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  company: "",
  product: "",
  quantity: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="border-t border-stone-300 bg-[#f5f1e8] py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
          Chapter 06 — Correspondence
        </p>
        <h2 className="mt-4 font-serif text-4xl font-light tracking-tight text-stone-900 md:text-5xl">
          Begin a <span className="italic">conversation.</span>
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-stone-600">
          Share a few details about your project. We reply within one working day,
          with pricing guidance, mockup references, and a clear path forward.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
            <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <Field label="Company" name="company" value={form.company} onChange={handleChange} />
          <div className="grid gap-6 md:grid-cols-2">
            <SelectField
              label="Product"
              name="product"
              value={form.product}
              onChange={handleChange}
              options={["Cotton T-Shirts", "Sports Jerseys", "Hoodies", "Tank Tops", "Flags & Banners", "Other"]}
            />
            <SelectField
              label="Quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              options={["50-200", "200-500", "500-1000", "1000-5000", "5000+"]}
            />
          </div>
          <TextAreaField
            label="Tell us about your project"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <div className="flex items-center justify-between pt-4">
            <p className="font-mono text-xs uppercase tracking-widest text-stone-500">
              We reply within 24 hours.
            </p>
            <button
              type="submit"
              disabled={status === "loading"}
              className="border border-stone-900 bg-stone-900 px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-[#f5f1e8] transition-colors hover:bg-transparent hover:text-stone-900 disabled:opacity-50"
            >
              {status === "loading" ? "Sending…" : "Send Inquiry"}
            </button>
          </div>

          {status === "success" && (
            <p className="border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900">
              Thank you. Your inquiry has reached our studio — we will be in touch shortly.
            </p>
          )}
          {status === "error" && (
            <p className="border border-red-300 bg-red-50 p-4 text-sm text-red-900">
              Something went wrong. Please try again, or email us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", value, onChange, required,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
        {label}{required && <span className="text-stone-900"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full border-0 border-b border-stone-300 bg-transparent px-0 py-2 text-base text-stone-900 outline-none transition-colors focus:border-stone-900"
      />
    </label>
  );
}

function SelectField({
  label, name, value, onChange, options,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full border-0 border-b border-stone-300 bg-transparent px-0 py-2 text-base text-stone-900 outline-none transition-colors focus:border-stone-900"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label, name, value, onChange, required,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
        {label}{required && <span className="text-stone-900"> *</span>}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={5}
        className="mt-2 w-full resize-none border-0 border-b border-stone-300 bg-transparent px-0 py-2 text-base text-stone-900 outline-none transition-colors focus:border-stone-900"
      />
    </label>
  );
}
