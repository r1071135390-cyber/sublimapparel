'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/v2', label: 'Home' },
  { href: '/v2/products', label: 'Products' },
  { href: '/v2/about', label: 'About' },
  { href: '/v2/contact', label: 'Contact' },
];

export default function V2Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-stone-200/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/v2" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#0a0a0a] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-wider">
                VP
              </span>
            </div>
            <span
              className={`font-bold text-xl tracking-tight transition-colors ${
                isScrolled ? 'text-[#0a0a0a]' : 'text-[#0a0a0a]'
              }`}
            >
              VividPrint
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#0a0a0a]/70 hover:text-[#0a0a0a] text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/v2/contact"
              className="bg-[#0a0a0a] hover:bg-[#262626] text-white px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200"
            >
              Start a Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#0a0a0a] p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t border-stone-200">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[#0a0a0a] text-base font-medium py-2"
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/v2/contact"
              className="block bg-[#0a0a0a] text-white text-center px-5 py-3 rounded-md text-base font-medium mt-4"
              onClick={() => setIsMobileOpen(false)}
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
