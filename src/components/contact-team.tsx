export function TeamSection() {
  return (
    <section className="border-b-2 border-black bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Header */}
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Your team in Yiwu
            </div>
            <h2 className="text-5xl font-black leading-[0.95] tracking-tight text-black md:text-7xl">
              Eight people.
              <br />
              <span className="text-[#ff4d00]">Ten years</span>
              <br />
              of trade.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-black/70">
              The eight people you&apos;ll actually work with — not a sales
              rep who hands your order to a stranger. Our business team has
              shipped custom apparel for European, American, Australian and
              Japanese brands for an average of ten years each. We know what
              your end customer expects.
            </p>
          </div>

          {/* Stats grid */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-px bg-black">
              <Stat label="Average tenure" value="10+ yrs" sub="per account manager" />
              <Stat label="Markets served" value="50+" sub="countries since 2018" />
              <Stat label="Languages" value="3" sub="EN · ES · CN" />
              <Stat label="Reply time" value="< 24 h" sub="business hours" />
            </div>
            <p className="mt-3 text-[11px] font-medium leading-snug text-black/50">
              Average tenure covers our four senior account managers (Ramon, Lily, Mark,
              Chris). Junior coordinators reply faster; final quotes always come from
              a senior.
            </p>
          </div>
        </div>

        {/* Team cards — horizontal with small photo avatar */}
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <Person
            image="/team-ramon.webp"
            name="Ramon"
            role="Account Director · LATAM + EU"
            bio="12 years in export trade. Native Spanish, fluent English. Ran our Mexico & Spain distribution before joining SublimApparel in 2020. The one who signs off on the final quote."
            tag="EN · ES"
            tagColor="bg-[#ff4d00]"
          />
          <Person
            image="/team-lily.webp"
            name="Lily"
            role="Senior Account Manager · US + UK"
            bio="9 years servicing US event merchandisers, UK sports clubs and NA advertising agencies. Spent 4 years in a Yiwu trading company before us. Owns our US & UK book."
            tag="EN"
            tagColor="bg-[#00c2ff]"
          />
          <Person
            image="/team-mark.webp"
            name="Mark"
            role="Account Manager · AU + NZ + JP"
            bio="7 years focused on the Pacific. Works with Australian uniform suppliers, NZ rugby clubs and Japanese promo houses. Knows the AU compliance paperwork inside-out."
            tag="EN · JP"
            tagColor="bg-[#00c2ff]"
          />
          <Person
            image="/team-chris.webp"
            name="Chris"
            role="Account Manager · EU + sample coordination"
            bio="6 years handling European DTC brands and event agencies. Runs the sample room — every mockup, color proof and pre-production sample goes through Chris."
            tag="EN · DE"
            tagColor="bg-[#00c2ff]"
          />
        </div>

        {/* The wider team — full-bleed group photo */}
        <figure className="relative mt-14 overflow-hidden border-2 border-black bg-[#f5f5f5]">
          <div className="relative aspect-[16/9] w-full">
            <img
              src="/team-group.webp"
              alt="SublimApparel team photo — production floor and account staff, Yiwu factory"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          </div>
          <figcaption className="absolute inset-y-0 left-0 flex flex-col justify-end p-6 md:p-10 max-w-[55%]">
            <div className="mb-3 inline-block w-fit bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              The wider team
            </div>
            <h3 className="text-2xl md:text-3xl font-black leading-tight text-white">
              These four are the tip.
            </h3>
            <p className="mt-2 text-base md:text-lg font-semibold text-white/95">
              And 30+ more on the production floor —
              <br />
              <span className="text-white/75 font-medium">printers, cutters, sewers, QC, packing, shipping.</span>
            </p>
          </figcaption>
        </figure>

        {/* What to expect */}
        <div className="mt-12 border-2 border-black bg-[#faf9f6] p-8 md:p-10">
          <div className="mb-6 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            What you can expect
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <ExpectItem
              num="01"
              title="One point of contact"
              body="The account manager you first hear from stays with your order all the way to delivery. No handoffs to strangers, no phone-trees."
            />
            <ExpectItem
              num="02"
              title="English-first communication"
              body="All our account managers and production coordinators write and speak fluent English. Spanish on request. No machine-translated emails."
            />
            <ExpectItem
              num="03"
              title="Honest pushback"
              body="If a brief won't work — wrong fabric for the print method, unrealistic deadline, design that won't survive sublimation — we'll tell you upfront, with an alternative."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-white p-6">
      <div className="text-[10px] font-black uppercase tracking-widest text-black/50">
        {label}
      </div>
      <div className="mt-1 text-4xl font-black leading-none text-black md:text-5xl">
        {value}
      </div>
      <div className="mt-1 text-xs font-medium text-black/60">{sub}</div>
    </div>
  );
}

function Person({
  image,
  name,
  role,
  bio,
  tag,
  tagColor,
}: {
  image: string;
  name: string;
  role: string;
  bio: string;
  tag: string;
  tagColor: string;
}) {
  return (
    <div className="flex gap-4 border-2 border-black bg-white p-4">
      {/* Small photo avatar */}
      <div
        className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-[#e5e5e5]"
        style={{ filter: "grayscale(0.15) contrast(0.96)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`${name}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <div className="text-lg font-black text-black">{name}</div>
          <div className={`${tagColor} px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-white flex-shrink-0`}>
            {tag}
          </div>
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-black/60">
          {role}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-black/75">{bio}</p>
      </div>
    </div>
  );
}

function ExpectItem({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div>
      <div className="mb-2 text-3xl font-black text-[#ff4d00] md:text-4xl">{num}</div>
      <div className="text-base font-black text-black md:text-lg">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-black/70">{body}</p>
    </div>
  );
}
