'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function V2Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      product: formData.get('product') as string,
      quantity: formData.get('quantity') as string,
      message: formData.get('message') as string,
    };

    try {
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="bg-white py-32">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <CheckCircle size={48} className="text-[#0a0a0a] mx-auto mb-6" />
          <h3 className="text-3xl font-light text-[#0a0a0a] mb-3">
            Thank you.
          </h3>
          <p className="text-stone-500">
            We&apos;ll be in touch within 24 hours with pricing and DDP
            shipping details.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left - heading */}
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-4 block">
              Get in touch
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#0a0a0a] leading-tight tracking-tight mb-6">
              Tell us
              <br />
              <span className="italic text-stone-500">about your project.</span>
            </h2>
            <p className="text-stone-600 leading-relaxed max-w-md">
              Send us your design, quantity, and event date. We&apos;ll respond
              within 24 hours with detailed pricing, samples, and DDP delivery
              options.
            </p>

            <div className="mt-10 space-y-2 text-sm text-stone-500">
              <div>sales@vividprint.com</div>
              <div>+86 579 8888 8888</div>
              <div>Yiwu, Zhejiang, China</div>
            </div>
          </div>

          {/* Right - form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-stone-300 py-3 text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-stone-300 py-3 text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  className="w-full bg-transparent border-b border-stone-300 py-3 text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-colors"
                  placeholder="Company name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                    Product
                  </label>
                  <select
                    name="product"
                    className="w-full bg-transparent border-b border-stone-300 py-3 text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-colors"
                  >
                    <option value="">Select</option>
                    <option value="t-shirts">T-Shirts</option>
                    <option value="jerseys">Jerseys</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="vests">Vests</option>
                    <option value="flags">Flags & Banners</option>
                    <option value="accessories">Accessories</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                    Quantity
                  </label>
                  <select
                    name="quantity"
                    className="w-full bg-transparent border-b border-stone-300 py-3 text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-colors"
                  >
                    <option value="">Select</option>
                    <option value="50-100">50 - 100 pcs</option>
                    <option value="100-500">100 - 500 pcs</option>
                    <option value="500-1000">500 - 1,000 pcs</option>
                    <option value="1000-5000">1,000 - 5,000 pcs</option>
                    <option value="5000+">5,000+ pcs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                  Project Details
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-stone-300 py-3 text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-colors resize-none"
                  placeholder="Event type, deadline, design notes..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center gap-3 bg-[#0a0a0a] text-white px-8 py-4 rounded-md text-sm font-medium hover:bg-[#262626] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
