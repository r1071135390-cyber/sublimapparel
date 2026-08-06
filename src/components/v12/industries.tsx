export function V12Industries() {
  const industries = [
    {
      title: "Events & Festivals",
      items: ["Concerts & Music Festivals", "Sporting Events & Marathons", "Corporate Conferences", "Trade Shows & Expos", "Food & Cultural Festivals", "Charity Runs & Walks"],
      emoji: "🎪",
    },
    {
      title: "Sports & Teams",
      items: ["Race Teams & Athletes", "Club Teams & Leagues", "Gyms & Fitness Studios", "Yoga & Dance Studios", "Cheer & Dance Teams", "Coaching Academies"],
      emoji: "🏃",
    },
    {
      title: "Brand & Marketing",
      items: ["Brand Agencies", "Marketing Teams", "Promotional Products", "Corporate Gifts", "Launch Events", "Pop-up Activations"],
      emoji: "📢",
    },
    {
      title: "Campaigns & Causes",
      items: ["Political Campaigns", "Charity Organizations", "Advocacy Groups", "Awareness Drives", "Community Initiatives", "Fundraising Events"],
      emoji: "🗳️",
    },
    {
      title: "Education & Community",
      items: ["Universities & Schools", "Fraternities & Sororities", "Clubs & Societies", "Graduation Events", "Alumni Reunions", "Religious Organizations"],
      emoji: "🎓",
    },
    {
      title: "E-commerce & POD",
      items: ["Print-on-Demand Platforms", "Etsy Sellers", "Independent Brands", "Influencer Merch", "Streetwear Drops", "Subscription Boxes"],
      emoji: "🛒",
    },
    {
      title: "Hospitality & Retail",
      items: ["Hotels & Resorts", "Restaurants & Cafés", "Bars & Nightclubs", "Retail Stores", "Tourist Attractions", "Real Estate"],
      emoji: "🏨",
    },
    {
      title: "Lifestyle & Personal",
      items: ["Weddings & Bachelorettes", "Family Reunions", "Birthday Parties", "Anniversaries", "Memorial Events", "Custom Gifts"],
      emoji: "💍",
    },
  ];

  return (
    <section className="border-b-2 border-black bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12 border-b-2 border-black pb-6">
          <div className="mb-2 text-xs font-black uppercase tracking-widest">
            [ 006 / Industries We Serve ]
          </div>
          <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
            Who we work<br />
            <span className="italic text-[#ff4d00]">with.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base font-bold leading-relaxed md:text-lg">
            From marathon organizers to wedding parties, from streetwear brands to political campaigns — if you need vibrant custom printing, we&apos;ve probably already done it.
          </p>
        </div>

        {/* Industries grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <div
              key={ind.title}
              className="group border-2 border-black bg-white p-5 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:bg-[#ff4d00] hover:text-white hover:shadow-[4px_4px_0_0_#000]"
              style={{ transform: i % 2 === 0 ? "rotate(-0.5deg)" : "rotate(0.5deg)" }}
            >
              <div className="mb-3 text-3xl">{ind.emoji}</div>
              <h3 className="mb-3 text-lg font-black uppercase leading-tight">{ind.title}</h3>
              <ul className="space-y-1 text-xs font-bold">
                {ind.items.map((item) => (
                  <li key={item} className="flex items-start gap-1.5">
                    <span className="mt-1.5 inline-block h-1 w-1 flex-shrink-0 bg-current" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="mt-10 border-2 border-black bg-black p-6 text-center text-white md:p-8">
          <div className="text-xs font-black uppercase tracking-widest text-[#00c2ff]">
            Not on the list?
          </div>
          <div className="mt-2 text-2xl font-black uppercase leading-tight md:text-3xl">
            If it can be sublimated, we can print it.
          </div>
          <div className="mt-3 text-sm font-bold text-white/70">
            Tell us what you need. We&apos;ll figure it out.
          </div>
        </div>
      </div>
    </section>
  );
}
