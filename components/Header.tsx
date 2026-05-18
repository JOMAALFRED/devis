'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Services', href: '#services' },
    { name: 'Devis', href: '/devis' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-[#C6A75E]/20 bg-[#1F2A44]/95 backdrop-blur-xl shadow-lg'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden border border-[#C6A75E]/40 bg-[#C6A75E]/10 sm:h-10 sm:w-10">
              <span
                className="relative text-base font-black text-[#C6A75E] sm:text-lg"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                D
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-black tracking-tight text-white sm:text-base">
                Dératisation Pro
              </p>
              <p className="font-mono text-[8px] uppercase tracking-widest text-[#C6A75E]/60 sm:text-[10px]">
                Experts certifiés
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.15em] text-white/70 transition-colors duration-200 hover:text-[#C6A75E] lg:text-xs"
              >
                {item.name}
                <ArrowUpRight size={12} className="opacity-0 transition-all duration-200 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <a
              href="tel:0123456789"
              className="hidden items-center gap-2 border border-[#C6A75E]/40 px-3 py-1.5 font-mono text-[10px] text-[#C6A75E] transition-all duration-200 hover:border-[#C6A75E] hover:bg-[#C6A75E]/10 sm:flex sm:px-4 sm:py-2 sm:text-[11px]"
            >
              <Phone size={12} />
              01 23 45 67 89
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white transition-colors hover:text-[#C6A75E] md:hidden"
              aria-label="Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[#C6A75E]/20 bg-[#1F2A44]/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-3 font-mono text-sm uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-[#C6A75E]"
              >
                {item.name}
                <ArrowUpRight size={14} />
              </Link>
            ))}
            <a
              href="tel:0123456789"
              className="mt-4 flex items-center justify-center gap-2 border border-[#C6A75E]/40 py-3 font-mono text-sm text-[#C6A75E] transition-all hover:border-[#C6A75E] hover:bg-[#C6A75E]/10"
            >
              <Phone size={14} />
              01 23 45 67 89
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
