import { Contact } from "@/components/v4/contact";
import { DDP } from "@/components/v4/ddp";

export const metadata = {
  title: "Contact | VividPrint",
  description: "Get in touch with VividPrint. 24-hour quote turnaround. DDP shipping worldwide.",
};

export default function V4ContactPage() {
  return (
    <>
      <section className="bg-[#0a0e1a] pt-20 pb-12 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Contact</div>
          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">Let's talk.</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60">
            Email, call, or fill out the form. We respond within 24 hours with a quote and timeline.
          </p>
        </div>
      </section>
      <Contact />
      <DDP />
    </>
  );
}
