import { Contact } from "@/components/contact";
import { Check, Clock, FileText, MessageCircle } from "lucide-react";

export const metadata = { title: "Get a Quote — SublimPrint" };

const whatHappens = [
  {
    icon: FileText,
    time: "Within 1 hour",
    title: "We read your inquiry",
    desc: "Our team reads every inquiry. We flag any missing info (size breakdown, deadline, destination) and reply with a confirmation.",
  },
  {
    icon: MessageCircle,
    time: "Within 1 business day",
    title: "We send a landed quote + free mockup",
    desc: "A single line item — unit price + shipping + duties. No setup fee. Plus a free 3D mockup of your design on the actual garment.",
  },
  {
    icon: Clock,
    time: "Production: 7–15 days",
    title: "We start production",
    desc: "After artwork approval + 30% deposit. We send photos of the bulk sample before shipping the full run.",
  },
  {
    icon: Check,
    time: "Delivered to your door",
    title: "DDP to 100+ countries",
    desc: "We handle customs, duties, and last-mile. Or US domestic from our Fontana, CA warehouse in 2–5 days.",
  },
];

const tips = [
  { tag: "ESSENTIAL", text: "Destination country + postal code — so we can calculate the actual DDP shipping cost." },
  { tag: "ESSENTIAL", text: "Quantity + size breakdown (S/M/L/XL counts) — even an estimate is fine." },
  { tag: "ESSENTIAL", text: "Required delivery date — so we can tell you honestly whether 7, 15, or 30 days is realistic." },
  { tag: "HELPFUL", text: "Fabric preference (polyester / 100% cotton / recycled) — most projects have a clear answer." },
  { tag: "HELPFUL", text: "Design status (ready / need help / template) — so we know if mockup is needed." },
  { tag: "OPTIONAL", text: "Pantone colors, reference images, brand guidelines — anything that helps us match your vision." },
];

export default function GetAQuotePage() {
  return (
    <main>
      {/* HERO */}
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

      {/* WHAT HAPPENS NEXT — sets expectations */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 flex items-end justify-between border-b border-white/15 pb-6">
            <div>
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-white/60">
                [ 001 / Process ]
              </div>
              <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
                What happens
                <br />
                <span className="text-[#ff4d00]">after you submit.</span>
              </h2>
            </div>
            <div className="hidden text-right text-xs font-bold uppercase tracking-widest text-white/60 md:block">
              <div>From inquiry to door</div>
              <div className="mt-1 text-3xl font-black text-white">7–15 days</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {whatHappens.map((w, i) => {
              const Icon = w.icon;
              return (
                <div
                  key={i}
                  className="group relative flex flex-col border-2 border-white/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#ff4d00] hover:bg-white/10"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-black text-[#ff4d00] text-5xl leading-none">
                      0{i + 1}
                    </span>
                    <Icon className="h-6 w-6 text-white/40 transition-colors group-hover:text-[#ff4d00]" strokeWidth={1.5} />
                  </div>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff4d00]">
                    {w.time}
                  </div>
                  <h3 className="mb-2 text-xl font-black leading-tight">{w.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIPS — what to include for fastest quote */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                Pro tip
              </div>
              <h2 className="text-4xl font-black leading-[0.95] tracking-tight text-black md:text-5xl">
                What to include for
                <br />
                <span className="text-[#ff4d00]">the fastest quote.</span>
              </h2>
              <p className="mt-4 text-base text-black/70">
                You don&apos;t need everything — start with the essentials below.
                We&apos;ll ask follow-up questions only if needed.
              </p>
            </div>

            <div className="md:col-span-7">
              <ul className="space-y-3">
                {tips.map((t, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 border-2 border-black bg-white p-4"
                  >
                    <span
                      className={
                        "shrink-0 px-2 py-1 text-[10px] font-black uppercase tracking-widest " +
                        (t.tag === "ESSENTIAL"
                          ? "bg-[#ff4d00] text-white"
                          : t.tag === "HELPFUL"
                          ? "bg-[#00c2ff] text-black"
                          : "bg-black/10 text-black/70")
                      }
                    >
                      {t.tag}
                    </span>
                    <span className="text-sm leading-relaxed text-black/80">{t.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE FORM */}
      <Contact />
    </main>
  );
}
