"use client";

import { useState } from "react";

const initial = {
  name: "",
  email: "",
  company: "",
  product: "",
  quantity: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
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
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="border-b-4 border-black bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-6 border-b-2 border-black pb-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-black">
              [006] CONTACT
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-black md:text-5xl">
              SEND INQUIRY
            </h2>
          </div>
          <p className="hidden text-right text-xs font-bold uppercase tracking-widest text-black md:block">
            REPLY &lt; 24H
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="NAME *" name="name" value={form.name} onChange={handleChange} required />
            <Field label="EMAIL *" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <Field label="COMPANY" name="company" value={form.company} onChange={handleChange} />
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="PRODUCT"
              name="product"
              value={form.product}
              onChange={handleChange}
              options={["Cotton T-Shirts", "Sports Jerseys", "Hoodies", "Tank Tops", "Flags & Banners", "Other"]}
            />
            <Select
              label="QUANTITY"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              options={["50-200", "200-500", "500-1000", "1000-5000", "5000+"]}
            />
          </div>
          <TextArea
            label="PROJECT DETAILS *"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <div className="mt-4 flex flex-col-reverse items-stretch gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-black">
              → REPLY WITHIN 24 HOURS, MON-FRI
            </p>
            <button
              type="submit"
              disabled={status === "loading"}
              className="border-2 border-black bg-[#ffeb00] px-8 py-4 text-base font-black uppercase tracking-widest text-black shadow-[4px_4px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-50"
            >
              {status === "loading" ? "SENDING…" : "SEND INQUIRY →"}
            </button>
          </div>

          {status === "success" && (
            <div className="border-2 border-black bg-[#ffeb00] p-4 text-sm font-black uppercase tracking-widest text-black">
              ✓ INQUIRY RECEIVED — WE WILL REPLY SHORTLY.
            </div>
          )}
          {status === "error" && (
            <div className="border-2 border-black bg-black p-4 text-sm font-black uppercase tracking-widest text-[#ffeb00]">
              ✗ ERROR — PLEASE TRY AGAIN OR EMAIL US DIRECTLY.
            </div>
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
      <span className="text-[10px] font-black uppercase tracking-widest text-black">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1.5 w-full border-2 border-black bg-white px-3 py-3 text-sm font-bold text-black outline-none transition-colors focus:bg-[#ffeb00]"
      />
    </label>
  );
}

function Select({
  label, name, value, onChange, options,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-widest text-black">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1.5 w-full border-2 border-black bg-white px-3 py-3 text-sm font-bold text-black outline-none transition-colors focus:bg-[#ffeb00]"
      >
        <option value="">SELECT…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function TextArea({
  label, name, value, onChange, required,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-widest text-black">{label}</span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={5}
        className="mt-1.5 w-full resize-none border-2 border-black bg-white px-3 py-3 text-sm font-bold text-black outline-none transition-colors focus:bg-[#ffeb00]"
      />
    </label>
  );
}
