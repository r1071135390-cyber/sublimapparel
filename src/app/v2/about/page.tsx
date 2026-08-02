import V2Navbar from '@/components/v2/navbar';
import V2Footer from '@/components/v2/footer';
import V2Switcher from '@/components/v2/switcher';
import { Sparkles, Scissors, Shirt, Package } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | VividPrint',
  description:
    'A Yiwu-based sublimation factory with full production chain. Digital design, sublimation printing, laser cutting, and garment sewing — all under one roof.',
};

const capabilities = [
  {
    icon: <Sparkles size={22} />,
    title: 'Digital Design Studio',
    description:
      'Our in-house design team prepares your files for production. Pattern mapping, color matching, and print-ready output.',
  },
  {
    icon: <Scissors size={22} />,
    title: 'Sublimation Printing',
    description:
      'Industrial sublimation printers using CMYK inks. Vivid, photo-quality, all-over print on polyester or cotton.',
  },
  {
    icon: <Scissors size={22} />,
    title: 'Laser Cutting',
    description:
      'Precision laser cutting for custom shapes, panels, and apparel components. No fraying, clean edges.',
  },
  {
    icon: <Shirt size={22} />,
    title: 'Garment Sewing',
    description:
      'Full garment construction — from cut panels to finished apparel. Quality control at every stitch.',
  },
  {
    icon: <Package size={22} />,
    title: 'Packaging & DDP',
    description:
      'Folding, poly-bagging, carton packing, and door-to-door DDP logistics to 50+ countries.',
  },
];

export default function V2AboutPage() {
  return (
    <>
      <V2Navbar />
      <main className="bg-[#faf9f6]">
        {/* Hero */}
        <section className="pt-32 lg:pt-40 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-4 block">
              About us
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-[#0a0a0a] leading-[0.95] tracking-tight max-w-3xl">
              A factory in
              <br />
              <span className="italic text-stone-500">Yiwu, China.</span>
            </h1>
            <p className="text-stone-600 text-lg mt-10 max-w-2xl leading-relaxed">
              We&apos;ve spent over a decade building a complete sublimation
              apparel supply chain under one roof. From the first design file to
              the final package at your door — every step is ours.
            </p>
          </div>
        </section>

        {/* Numbers */}
        <section className="border-y border-stone-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '10+', label: 'Years in business' },
                { number: '50+', label: 'Countries shipped' },
                { number: '200K+', label: 'Garments per month' },
                { number: '5', label: 'Production stages' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl lg:text-5xl font-light text-[#0a0a0a]">
                    {stat.number}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-stone-500 mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-4 block">
                What we do in-house
              </span>
              <h2 className="text-4xl sm:text-5xl font-light text-[#0a0a0a] leading-tight tracking-tight">
                Five capabilities.
                <br />
                <span className="italic text-stone-500">One facility.</span>
              </h2>
            </div>

            <div className="border-t border-stone-300">
              {capabilities.map((cap, i) => (
                <div
                  key={cap.title}
                  className="grid grid-cols-12 gap-6 py-8 lg:py-10 border-b border-stone-200"
                >
                  <div className="col-span-2 sm:col-span-1 text-xs font-mono text-stone-400">
                    0{i + 1}
                  </div>
                  <div className="col-span-10 sm:col-span-3 text-stone-500">
                    {cap.icon}
                  </div>
                  <div className="col-span-12 sm:col-span-8">
                    <h3 className="text-xl font-medium text-[#0a0a0a] mb-2">
                      {cap.title}
                    </h3>
                    <p className="text-stone-600 leading-relaxed text-[15px]">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DDP story */}
        <section className="bg-[#0a0a0a] text-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4 block">
                  Why DDP matters
                </span>
                <h2 className="text-4xl sm:text-5xl font-light leading-tight tracking-tight">
                  Most foreign buyers
                  <br />
                  <span className="italic text-stone-400">hate customs.</span>
                </h2>
              </div>
              <div>
                <p className="text-white/70 text-lg leading-relaxed">
                  We get it. Customs paperwork, duty calculation, broker fees,
                  unexpected holds — it&apos;s a hassle. That&apos;s why we
                  built our own DDP logistics arm. We clear customs, pay duties,
                  and deliver. Your job is to receive boxes at your door.
                </p>
                <p className="text-white/40 text-sm mt-6 italic">
                  It feels like buying from a local supplier — except our
                  pricing is factory-direct.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <V2Footer />
      <V2Switcher />
    </>
  );
}
