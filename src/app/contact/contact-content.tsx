import InquiryForm from '@/components/home/inquiry-form';

export default function ContactPageContent() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[#0a0a0a] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[#ff4d00] text-sm font-semibold uppercase tracking-wider">
              Contact Us
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4">
              Let&apos;s Start Your Project
            </h1>
            <p className="text-white/60 text-lg">
              Send us your design and requirements. We will respond within 24
              hours with pricing, samples, and DDP shipping details.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-[#f5f5f5] rounded-xl p-6 text-center">
              <div className="w-10 h-10 bg-[#ff4d00]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-5 h-5 text-[#ff4d00]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0a0a0a] text-sm mb-1">
                Email
              </h3>
              <p className="text-[#6b6b6b] text-sm">sales@vividprint.com</p>
            </div>
            <div className="bg-[#f5f5f5] rounded-xl p-6 text-center">
              <div className="w-10 h-10 bg-[#00c2ff]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-5 h-5 text-[#00c2ff]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0a0a0a] text-sm mb-1">
                Location
              </h3>
              <p className="text-[#6b6b6b] text-sm">Yiwu, Zhejiang, China</p>
            </div>
            <div className="bg-[#f5f5f5] rounded-xl p-6 text-center">
              <div className="w-10 h-10 bg-[#10b981]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-5 h-5 text-[#10b981]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0a0a0a] text-sm mb-1">
                Response Time
              </h3>
              <p className="text-[#6b6b6b] text-sm">Within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <InquiryForm />
    </>
  );
}
