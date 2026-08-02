import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#ff4d00] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VP</span>
              </div>
              <span className="font-bold text-xl tracking-tight">
                VividPrint
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Professional dye-sublimation apparel manufacturer with complete
              supply chain. From design to doorstep — we make it simple.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Products
            </h4>
            <ul className="space-y-3">
              <li className="text-white/70 text-sm">Custom T-Shirts</li>
              <li className="text-white/70 text-sm">Sports Jerseys</li>
              <li className="text-white/70 text-sm">Hoodies & Sweatshirts</li>
              <li className="text-white/70 text-sm">Flags & Banners</li>
              <li className="text-white/70 text-sm">Accessories</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#ff4d00] mt-0.5 shrink-0" />
                <span className="text-white/70 text-sm">
                  Yiwu, Zhejiang, China
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#ff4d00] shrink-0" />
                <span className="text-white/70 text-sm">
                  sales@vividprint.com
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#ff4d00] shrink-0" />
                <span className="text-white/70 text-sm">
                  +86 579 8888 8888
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} VividPrint. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/40 text-sm">
              DDP Shipping Worldwide
            </span>
            <span className="text-white/40 text-sm">|</span>
            <span className="text-white/40 text-sm">
              MOQ from 50 pcs
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
