export function V3Features() {
  const features = [
    {
      number: "01",
      title: "Any sublimatable product",
      headline: "Print on anything.",
      desc: "Apparel is our bread and butter — but we print on anything sublimation can handle. T-shirts, jerseys, hoodies, flags, banners, mousepads, mugs, phone cases, puzzles, cushions, throws, scarves, bags, hats… If it takes sublimation ink, we make it.",
      color: "bg-[#ff4d00]",
      tags: ["Apparel", "Home textile", "Hard goods", "Flags & banners"],
    },
    {
      number: "02",
      title: "Polyester AND 100% cotton",
      headline: "Most factories can't. We do.",
      desc: "Polyester sublimation is easy. But 100% cotton all-over print? That's a different beast — and most factories can't deliver it. We invested in the technology and the technique. The result: vibrant, soft-hand, all-over prints on real cotton.",
      color: "bg-[#00c2ff]",
      tags: ["Polyester", "100% Cotton", "Cotton blend", "Recycled fabric"],
    },
    {
      number: "03",
      title: "DDP worldwide from Yiwu",
      headline: "No customs. No duties. No headache.",
      desc: "Yiwu is China's small-commodity capital — one of the world's most connected logistics hubs. We leverage that to ship DDP (Delivered Duty Paid) to 100+ countries. Your team never deals with customs, tariffs, or import paperwork.",
      color: "bg-[#ff4d00]",
      tags: ["DDP shipping", "Customs cleared", "Door-to-door", "100+ countries"],
    },
    {
      number: "04",
      title: "LA warehouse for US domestic",
      headline: "US delivery in 2–5 days.",
      desc: "Need it fast in the States? We bulk-ship to our Los Angeles warehouse, then fulfill from there. No ocean transit, no customs — your order arrives at the US destination in 2–5 business days. Perfect for tight event deadlines and repeat POD orders.",
      color: "bg-[#00c2ff]",
      tags: ["LA warehouse", "US domestic", "2-5 day delivery", "POD ready"],
    },
  ];

  return (
    <section className="border-b-2 border-black bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Section header */}
        <div className="mb-12 flex items-end justify-between border-b-2 border-black pb-6">
          <div>
            <div className="mb-2 text-xs font-black uppercase tracking-widest text-black/60">
              [ 002 / Capabilities ]
            </div>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tight text-black md:text-6xl">
              Why work with us?
            </h2>
          </div>
          <div className="hidden text-right text-xs font-bold uppercase tracking-widest text-black/60 md:block">
            4 things we&apos;re<br />best at.
          </div>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.number}
              className={`group relative border-2 border-black bg-white p-6 md:p-8 ${
                i % 2 === 0 ? "md:rotate-[-1deg]" : "md:rotate-[1deg]"
              } transition-transform hover:rotate-0 hover:shadow-[8px_8px_0_0_#000]`}
            >
              {/* Number badge */}
              <div
                className={`absolute -top-5 -left-3 ${f.color} border-2 border-black px-3 py-1 text-sm font-black text-white`}
              >
                {f.number}
              </div>

              {/* Subtitle */}
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-black/60">
                {f.title}
              </div>

              {/* Headline */}
              <h3 className="mb-4 text-3xl font-black leading-tight text-black md:text-4xl">
                {f.headline}
              </h3>

              {/* Description */}
              <p className="mb-6 text-base leading-relaxed text-black/70">{f.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {f.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-2 border-black bg-[#faf9f6] px-3 py-1 text-xs font-bold text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
