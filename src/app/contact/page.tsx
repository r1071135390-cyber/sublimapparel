import { Contact } from "@/components/contact";

export const metadata = {
  title: "Contact SublimApparel — Yiwu Factory, US Warehouse & 24h Response",
  description:
    "Talk to a real production manager in Yiwu, China — or our Fontana, CA team — within 24h. WhatsApp, email, WeChat. Quote in 12h, sample in 5 days, bulk in 21 days.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Contact
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-black md:text-8xl">
            Let&apos;s
            <br />
            <span className="text-[#ff4d00]">talk.</span>
          </h1>
        </div>
      </section>
      <Contact />
    </main>
  );
}
