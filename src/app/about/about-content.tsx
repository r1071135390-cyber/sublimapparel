'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Palette,
  Scissors,
  Shirt,
  Package,
  Truck,
  CheckCircle2,
  Globe,
  Shield,
  Clock,
  Award,
  Users,
  Zap,
} from 'lucide-react';

const capabilities = [
  {
    icon: <Palette size={28} className="text-[#ff4d00]" />,
    title: 'Sublimation Printing',
    description:
      'Large-format dye-sublimation printers deliver photo-quality, full-color prints with exceptional detail and color accuracy.',
  },
  {
    icon: <Scissors size={28} className="text-[#ff4d00]" />,
    title: 'Laser Cutting',
    description:
      'Precision laser cutting ensures clean edges and consistent sizing across every piece — no fraying, no waste.',
  },
  {
    icon: <Shirt size={28} className="text-[#ff4d00]" />,
    title: 'Garment Sewing',
    description:
      'Experienced sewing teams assemble each garment with care. Quality checks at every stage of production.',
  },
  {
    icon: <Package size={28} className="text-[#ff4d00]" />,
    title: 'Packing & QC',
    description:
      'Individual poly-bag packing, custom labeling, and carton packaging ready for retail or event distribution.',
  },
];

const values = [
  {
    icon: <Shield size={24} className="text-[#ff4d00]" />,
    title: 'Quality First',
    description:
      'Every garment goes through strict QC. We use premium inks and fabrics that pass international standards.',
  },
  {
    icon: <Clock size={24} className="text-[#ff4d00]" />,
    title: 'On-Time Delivery',
    description:
      'Your event has a date — we respect it. 98% on-time delivery rate with DDP shipping worldwide.',
  },
  {
    icon: <Globe size={24} className="text-[#ff4d00]" />,
    title: 'Customer-Centric',
    description:
      'English-speaking sales team, 24-hour response, and dedicated project managers for every order.',
  },
  {
    icon: <Award size={24} className="text-[#ff4d00]" />,
    title: 'Continuous Innovation',
    description:
      'We invest in new equipment and techniques — like our full-cotton sublimation capability — to stay ahead.',
  },
];

export default function AboutPageContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeroVisible(true);
      },
      { threshold: 0.15 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#0a0a0a] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[#ff4d00] text-sm font-semibold uppercase tracking-wider">
              About VividPrint
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4">
              Your Sublimation Partner in Yiwu
            </h1>
            <p className="text-white/60 text-lg">
              A complete dye-sublimation apparel factory with design, printing,
              cutting, sewing, and DDP delivery — all under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          ref={heroRef}
        >
          <div
            className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${
              heroVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a] mb-6">
                Built for Event Apparel.
                <br />
                <span className="text-[#ff4d00]">Engineered for Simplicity.</span>
              </h2>
              <div className="space-y-4 text-[#6b6b6b] leading-relaxed">
                <p>
                  Located in Yiwu — the world&apos;s small-commodity capital —
                  we have spent over a decade perfecting the art of
                  dye-sublimation printing on apparel. Our factory houses the
                  complete production chain: from digital design and
                  large-format sublimation printing to laser cutting and
                  professional garment sewing.
                </p>
                <p>
                  What sets us apart is not just what we make, but how we
                  deliver. Our DDP (Delivered Duty Paid) service means you never
                  deal with customs, duties, or import paperwork. Your order
                  arrives at your door — as simple as ordering from a local
                  supplier.
                </p>
                <p>
                  We also offer something most factories cannot: full-cotton
                  all-over sublimation. While others are limited to polyester,
                  we deliver vibrant, color-fast prints on 100% cotton —
                  combining the softness your customers want with the visual
                  impact your brand demands.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '10+', label: 'Years Experience', icon: <Award size={20} className="text-[#ff4d00]" /> },
                { value: '50+', label: 'Countries Served', icon: <Globe size={20} className="text-[#00c2ff]" /> },
                { value: '500K+', label: 'Annual Output', icon: <Zap size={20} className="text-[#ff4d00]" /> },
                { value: '98%', label: 'On-Time Delivery', icon: <Clock size={20} className="text-[#00c2ff]" /> },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#f5f5f5] rounded-xl p-6 text-center"
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a]">
                    {stat.value}
                  </div>
                  <div className="text-[#6b6b6b] text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 lg:py-24 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#ff4d00] text-sm font-semibold uppercase tracking-wider">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] mt-3 mb-4">
              Complete Supply Chain Under One Roof
            </h2>
            <p className="text-[#6b6b6b] text-lg">
              No outsourcing, no middlemen. Every production step happens in our
              facility — giving us full control over quality and timeline.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#ff4d00]/20 transition-all duration-300 hover:shadow-md"
              >
                <div className="w-12 h-12 bg-[#ff4d00]/10 rounded-xl flex items-center justify-center mb-4">
                  {cap.icon}
                </div>
                <h3 className="font-bold text-[#0a0a0a] mb-2">{cap.title}</h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply Chain Flow */}
      <section className="py-16 lg:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#ff4d00] text-sm font-semibold uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
              From Your Design to Your Door
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: <Palette size={24} className="text-white" />, label: 'Design', step: '01' },
              { icon: <Scissors size={24} className="text-white" />, label: 'Print', step: '02' },
              { icon: <Shirt size={24} className="text-white" />, label: 'Sew', step: '03' },
              { icon: <CheckCircle2 size={24} className="text-white" />, label: 'QC', step: '04' },
              { icon: <Truck size={24} className="text-[#00c2ff]" />, label: 'DDP Ship', step: '05' },
              { icon: <Package size={24} className="text-[#10b981]" />, label: 'Receive', step: '06' },
            ].map((item, index) => (
              <div key={item.label} className="text-center">
                <div className="relative mx-auto w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-3">
                  {item.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#ff4d00] rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <p className="text-white/70 text-sm font-medium">{item.label}</p>
                {index < 5 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%+8px)] w-[calc(100%-32px)]">
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#ff4d00] text-sm font-semibold uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] mt-3 mb-4">
              Why Clients Come Back
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="w-12 h-12 bg-[#ff4d00]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-bold text-[#0a0a0a] mb-2">{value.title}</h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#ff4d00] text-sm font-semibold uppercase tracking-wider">
                Our Team
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a] mt-3 mb-6">
                A Team That Speaks Your Language
              </h2>
              <div className="space-y-4 text-[#6b6b6b] leading-relaxed">
                <p>
                  Our sales and project management team is fluent in English,
                  ensuring smooth communication from inquiry to delivery. No
                  language barriers, no misunderstandings.
                </p>
                <p>
                  With dedicated project managers assigned to each order, you
                  always have a single point of contact who knows your project
                  inside and out.
                </p>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-[#ff4d00]" />
                  <span className="text-sm font-medium text-[#0a0a0a]">
                    100+ Factory Staff
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={20} className="text-[#00c2ff]" />
                  <span className="text-sm font-medium text-[#0a0a0a]">
                    English-Speaking Sales
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#333] rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center">
                <Users size={48} className="text-white/30 mx-auto mb-3" />
                <p className="text-white/40 text-sm">Professional Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-white/60 mb-8">
            Whether you need 50 pieces or 50,000 — we are ready to bring your
            designs to life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#e04400] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
          >
            Start Your Project
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
