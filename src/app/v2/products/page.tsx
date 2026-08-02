import V2Navbar from '@/components/v2/navbar';
import V2Footer from '@/components/v2/footer';
import V2Switcher from '@/components/v2/switcher';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | VividPrint',
  description: 'Sublimation apparel catalog — t-shirts, jerseys, hoodies, vests, flags, and accessories.',
};

const productCategories = [
  {
    number: '01',
    title: 'Custom T-Shirts',
    description:
      'Edge-to-edge all-over print tees. Available in 100% polyester performance fabric or 100% cotton. The core product for events, campaigns, and retail.',
    capabilities: ['Polyester or cotton', 'All-over print', 'Sizes XS – 3XL'],
  },
  {
    number: '02',
    title: 'Sports Jerseys',
    description:
      'Performance sublimated jerseys with permanent team colors, logos, names, and numbers. No peeling, no fading — the print becomes part of the fabric.',
    capabilities: ['Permanent sublimation', 'Player personalization', 'Multiple sports'],
  },
  {
    number: '03',
    title: 'Hoodies & Sweatshirts',
    description:
      'Premium fleece hoodies with full-surface graphics. Heavyweight cotton-poly blend interior. Perfect for merchandise and brand drops.',
    capabilities: ['Full-surface print', 'Soft fleece interior', 'Premium weight'],
  },
  {
    number: '04',
    title: 'Vests & Tanks',
    description:
      'Lightweight quick-dry vests for marathons, races, and outdoor events. Budget-friendly at scale with full print capability.',
    capabilities: ['Quick-dry fabric', 'Race-ready', 'Cost-effective'],
  },
  {
    number: '05',
    title: 'Flags & Banners',
    description:
      'Large-format fabric prints for trade shows, sporting events, and storefronts. Indoor and outdoor options available.',
    capabilities: ['Custom sizes', 'Indoor & outdoor', 'Pole & hem finishing'],
  },
  {
    number: '06',
    title: 'Accessories',
    description:
      'Bags, caps, scarves, aprons, and more. Complete your brand collection with matching sublimated accessories.',
    capabilities: ['Bags & totes', 'Caps & hats', 'Scarves & bandanas'],
  },
];

export default function V2ProductsPage() {
  return (
    <>
      <V2Navbar />
      <main className="bg-[#faf9f6]">
        {/* Header */}
        <section className="pt-32 lg:pt-40 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-4 block">
              Our catalog
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-[#0a0a0a] leading-[0.95] tracking-tight max-w-3xl">
              Every category,
              <br />
              <span className="italic text-stone-500">one factory.</span>
            </h1>
            <p className="text-stone-600 text-lg mt-8 max-w-2xl leading-relaxed">
              We make anything that can be sublimated. Browse the categories
              below or send us your custom request.
            </p>
          </div>
        </section>

        {/* Products list */}
        <section className="pb-20 lg:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-stone-300">
              {productCategories.map((cat) => (
                <div
                  key={cat.number}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-10 lg:py-14 border-b border-stone-200"
                >
                  <div className="lg:col-span-1 text-xs font-mono text-stone-400">
                    {cat.number}
                  </div>
                  <div className="lg:col-span-4">
                    <h2 className="text-3xl sm:text-4xl font-light text-[#0a0a0a]">
                      {cat.title}
                    </h2>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-stone-600 leading-relaxed text-[15px]">
                      {cat.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {cat.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="text-xs text-stone-500 border border-stone-300 px-3 py-1 rounded-full"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-2 lg:text-right">
                    <Link
                      href="/v2/contact"
                      className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-[#0a0a0a] transition-colors"
                    >
                      Request quote
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fabric comparison */}
        <section className="bg-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-4 block">
                Fabric comparison
              </span>
              <h2 className="text-4xl sm:text-5xl font-light text-[#0a0a0a] leading-tight tracking-tight">
                Polyester or cotton.
                <br />
                <span className="italic text-stone-500">You choose.</span>
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed mt-6">
                Most factories only do polyester. We do both — with full
                sublimation print on either fabric.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Polyester */}
              <div className="border border-stone-200 rounded-2xl p-8 lg:p-10">
                <h3 className="text-2xl font-medium text-[#0a0a0a] mb-2">
                  Polyester
                </h3>
                <p className="text-stone-500 text-sm mb-8">
                  Performance & Sports
                </p>
                <ul className="space-y-3 text-stone-600 text-sm">
                  <li className="flex gap-3">
                    <span className="text-stone-400">·</span>
                    <span>Lightweight, moisture-wicking, quick-dry</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-stone-400">·</span>
                    <span>Ideal for sports, jerseys, race wear</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-stone-400">·</span>
                    <span>Vivid color saturation, permanent print</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-stone-400">·</span>
                    <span>Lower minimum order quantity</span>
                  </li>
                </ul>
              </div>

              {/* Cotton */}
              <div className="border-2 border-[#0a0a0a] rounded-2xl p-8 lg:p-10 relative">
                <div className="absolute -top-3 left-8 bg-[#0a0a0a] text-white text-xs uppercase tracking-widest px-3 py-1 rounded">
                  Our Specialty
                </div>
                <h3 className="text-2xl font-medium text-[#0a0a0a] mb-2">
                  Cotton
                </h3>
                <p className="text-stone-500 text-sm mb-8">
                  Premium & Lifestyle
                </p>
                <ul className="space-y-3 text-stone-600 text-sm">
                  <li className="flex gap-3">
                    <span className="text-stone-400">·</span>
                    <span>100% cotton, soft natural hand-feel</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-stone-400">·</span>
                    <span>Ideal for fashion, premium retail, brand drops</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-stone-400">·</span>
                    <span>Full all-over print — rare capability</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-stone-400">·</span>
                    <span>Higher perceived value for end customers</span>
                  </li>
                </ul>
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
