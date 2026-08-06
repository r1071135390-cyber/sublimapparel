export function Products() {
  const categories = [
    {
      label: "Apparel",
      headline: "From tees to team kits.",
      desc: "T-shirts, jerseys, hoodies, polos, tank tops, leggings, sports bras, kids wear, baby onesies — full sublimation on cotton or polyester.",
      items: ["T-shirts", "Jerseys", "Hoodies", "Polo", "Tank tops", "Kids"],
      color: "bg-[#ff4d00]",
    },
    {
      label: "Sports & Team",
      headline: "Built for game day.",
      desc: "Custom sublimated kits for cycling, running, soccer, basketball, rowing, esports. Full team packages with names and numbers.",
      items: ["Cycling jerseys", "Running singlets", "Soccer kits", "Esports"],
      color: "bg-[#00c2ff]",
    },
    {
      label: "Flags & Banners",
      headline: "Make a statement outdoors.",
      desc: "Custom flags, banners, pop-up displays, beach flags, feather banners. Fade-resistant for outdoor use.",
      items: ["Garden flags", "Trade show", "Beach flags", "Banners"],
      color: "bg-[#ff4d00]",
    },
    {
      label: "Home & Living",
      headline: "Print your art on soft goods.",
      desc: "Custom cushions, pillowcases, throws, curtains, bean bags, aprons. Perfect for boutique brands and home decor.",
      items: ["Cushions", "Throws", "Curtains", "Aprons"],
      color: "bg-[#00c2ff]",
    },
    {
      label: "Bags & Accessories",
      headline: "Carry your brand.",
      desc: "Drawstring bags, backpacks, tote bags, gym sacks, hats, scarves, bandanas, lanyards.",
      items: ["Drawstring bags", "Backpacks", "Caps", "Lanyards"],
      color: "bg-[#ff4d00]",
    },
    {
      label: "Hard Goods",
      headline: "Sublimation on hard surfaces.",
      desc: "Mousepads, coasters, puzzles, phone cases, ceramic mugs, metal plates, acrylic photo panels.",
      items: ["Mousepads", "Mugs", "Puzzles", "Phone cases"],
      color: "bg-[#00c2ff]",
    },
  ];

  return (
    <section className="border-b-2 border-black bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Section header */}
        <div className="mb-12 flex items-end justify-between border-b-2 border-black pb-6">
          <div>
            <div className="mb-2 text-xs font-black uppercase tracking-widest text-black/60">
              [ 003 / Products ]
            </div>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tight text-black md:text-6xl">
              What we make.
            </h2>
          </div>
          <div className="hidden text-right text-xs font-bold uppercase tracking-widest text-black/60 md:block">
            6 categories.<br />Endless customization.
          </div>
        </div>

        {/* Categories grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <div
              key={cat.label}
              className={`group relative border-2 border-black bg-white p-6 ${
                i % 3 === 0 ? "md:rotate-[-1.5deg]" : i % 3 === 1 ? "md:rotate-[0.5deg]" : "md:rotate-[-0.5deg]"
              } transition-transform hover:rotate-0 hover:shadow-[6px_6px_0_0_#000]`}
            >
              {/* Color label */}
              <div
                className={`inline-block ${cat.color} mb-4 border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white`}
              >
                {cat.label}
              </div>

              {/* Headline */}
              <h3 className="mb-3 text-2xl font-black leading-tight text-black md:text-3xl">
                {cat.headline}
              </h3>

              {/* Description */}
              <p className="mb-5 text-sm leading-relaxed text-black/70">{cat.desc}</p>

              {/* Items tags */}
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="border border-black bg-[#faf9f6] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-black"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 border-2 border-black bg-[#ff4d00] p-6 text-center text-white shadow-[6px_6px_0_0_#000]">
          <p className="text-lg font-black uppercase tracking-tight md:text-xl">
            Don&apos;t see your product? If it takes sublimation ink, we can print on it.
          </p>
          <p className="mt-2 text-sm font-bold text-white/90">
            Just send us your idea — we&apos;ll quote it in 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
