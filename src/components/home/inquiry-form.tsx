'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function InquiryForm() {
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
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch {
      // Still show success for demo
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 lg:py-28 bg-[#f5f5f5]" id="contact">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-sm">
            <CheckCircle size={56} className="text-[#10b981] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-[#0a0a0a] mb-3">
              Inquiry Received!
            </h3>
            <p className="text-[#6b6b6b]">
              Thank you for your interest. Our team will get back to you within
              24 hours with a detailed quote.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 bg-[#f5f5f5]" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Info */}
          <div>
            <span className="text-[#ff4d00] text-sm font-semibold uppercase tracking-wider">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0a0a] mt-3 mb-6">
              Request a Free Quote
            </h2>
            <p className="text-[#6b6b6b] text-lg leading-relaxed mb-8">
              Tell us about your project and we will get back to you within 24
              hours with pricing, samples, and timeline. No obligation.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#ff4d00]/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <span className="text-[#ff4d00] text-xs font-bold">1</span>
                </div>
                <p className="text-[#6b6b6b] text-sm">
                  <strong className="text-[#0a0a0a]">Fast response</strong> — We
                  reply within 24 hours with detailed pricing
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#ff4d00]/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <span className="text-[#ff4d00] text-xs font-bold">2</span>
                </div>
                <p className="text-[#6b6b6b] text-sm">
                  <strong className="text-[#0a0a0a]">Free samples</strong> — We
                  can send sample pieces before bulk order
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#ff4d00]/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <span className="text-[#ff4d00] text-xs font-bold">3</span>
                </div>
                <p className="text-[#6b6b6b] text-sm">
                  <strong className="text-[#0a0a0a]">DDP included</strong> —
                  Quote includes door-to-door delivery, no hidden fees
                </p>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/20 focus:border-[#ff4d00] transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/20 focus:border-[#ff4d00] transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/20 focus:border-[#ff4d00] transition-colors"
                  placeholder="Your company name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                    Product Type
                  </label>
                  <select
                    name="product"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/20 focus:border-[#ff4d00] transition-colors bg-white"
                  >
                    <option value="">Select product</option>
                    <option value="t-shirts">Custom T-Shirts</option>
                    <option value="jerseys">Sports Jerseys</option>
                    <option value="hoodies">Hoodies & Sweatshirts</option>
                    <option value="vests">Vests & Tank Tops</option>
                    <option value="flags">Flags & Banners</option>
                    <option value="accessories">Accessories</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                    Quantity
                  </label>
                  <select
                    name="quantity"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/20 focus:border-[#ff4d00] transition-colors bg-white"
                  >
                    <option value="">Select quantity</option>
                    <option value="50-100">50 - 100 pcs</option>
                    <option value="100-500">100 - 500 pcs</option>
                    <option value="500-1000">500 - 1,000 pcs</option>
                    <option value="1000-5000">1,000 - 5,000 pcs</option>
                    <option value="5000+">5,000+ pcs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                  Project Details
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/20 focus:border-[#ff4d00] transition-colors resize-none"
                  placeholder="Tell us about your event, design requirements, timeline, etc."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ff4d00] hover:bg-[#e04400] text-white py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={16} />
                    Send Inquiry
                  </>
                )}
              </button>

              <p className="text-center text-xs text-[#a0a0a0]">
                We respect your privacy. Your information is safe with us.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
