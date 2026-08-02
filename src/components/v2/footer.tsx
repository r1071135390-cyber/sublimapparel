import Link from 'next/link';
import { ArrowUpRight, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function V2Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Top section - large CTA */}
        <div className="border-b border-white/10 pb-16 mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <h2 className="text-4xl sm:text-5xl font-light leading-tight tracking-tight">
                Let&apos;s make
                <br />
                something
                <br />
                <span className="italic text-stone-400">unforgettable.</span>
              </h2>
            </div>
            <div className="lg:text-right">
              <Link
                href="/v2/contact"
                className="inline-flex items-center gap-2 text-white border-b border-white/40 pb-1 hover:border-white transition-colors text-lg"
              >
                Start your project
                <ArrowUpRight size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Middle section - links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5">
              Sitemap
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/v2', label: 'Home' },
                { href: '/v2/products', label: 'Products' },
                { href: '/v2/about', label: 'About' },
                { href: '/v2/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5">
              Products
            </h4>
            <ul className="space-y-3">
              <li className="text-white/70 text-sm">T-Shirts</li>
              <li className="text-white/70 text-sm">Sports Jerseys</li>
              <li className="text-white/70 text-sm">Hoodies</li>
              <li className="text-white/70 text-sm">Vests</li>
              <li className="text-white/70 text-sm">Banners</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="text-white/70 text-sm">sales@vividprint.com</li>
              <li className="text-white/70 text-sm">+86 579 8888 8888</li>
              <li className="text-white/70 text-sm">Yiwu, China</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5">
              Follow
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} VividPrint. Yiwu, China.
          </p>
          <p className="text-white/40 text-sm">
            DDP shipping to 50+ countries
          </p>
        </div>
      </div>
    </footer>
  );
}
