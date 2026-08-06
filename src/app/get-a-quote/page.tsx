import { Contact } from "@/components/contact";

export const metadata = { title: "Get a Quote — SublimPrint" };

export default function GetAQuotePage() {
  return (
    <main>
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Get a Quote
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-black md:text-8xl">
            Tell us your
            <br />
            <span className="text-[#ff4d00]">product, quantity</span>
            <br />
            and deadline.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-neutral-600 md:text-lg">
            You will have a landed, duty-paid price within one business day.
            If your deadline is not achievable, we will say so in the same
            reply rather than take the order and manage the problem later.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-neutral-700">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ff4d00]" />
              Reply within 1 business day
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ff4d00]" />
              Team hours overlap US Pacific and UK
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ff4d00]" />
              Yiwu factory + Fontana, CA warehouse
            </span>
          </div>
        </div>
      </section>
      <Contact />
    </main>
  );
}
