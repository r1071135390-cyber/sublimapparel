import { V5Contact } from "@/components/v5/contact";

export default function V5ContactPage() {
  return (
    <>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">
            Reach out via the form below or email us directly. We respond within 24 hours, Monday
            through Friday.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Email
              </div>
              <div className="mt-1 text-sm font-medium text-neutral-900">sales@vividprint.com</div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Hours
              </div>
              <div className="mt-1 text-sm font-medium text-neutral-900">Mon-Fri, 9:00-18:00 (GMT+8)</div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Location
              </div>
              <div className="mt-1 text-sm font-medium text-neutral-900">Yiwu, Zhejiang, China</div>
            </div>
          </div>
        </div>
      </section>
      <V5Contact />
    </>
  );
}
