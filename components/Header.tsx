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
          ? 'border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - gauche */}
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden border border-[#C9A84C]/40 sm:h-10 sm:w-10">
              <div className="absolute inset-0 bg-[#C9A84C]/10" />
              <span
                className="relative text-base font-black text-[#C9A84C] sm:text-lg"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                D
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-black tracking-tight text-white sm:text-base">
                Dératisation Pro
              </p>
              <p className="font-mono text-[8px] uppercase tracking-widest text-white/30 sm:text-[10px]">
                Experts certifiés
              </p>
            </div>
          </Link>

          {/* Navigation Desktop - centre */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 transition-colors duration-200 hover:text-white lg:text-xs"
              >
                {item.name}
                <ArrowUpRight size={12} className="opacity-0 transition-all duration-200 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>

          {/* Téléphone et menu mobile - droite */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <a
              href="tel:0123456789"
              className="hidden items-center gap-2 border border-[#C9A84C]/40 px-3 py-1.5 font-mono text-[10px] text-[#C9A84C] transition-all duration-200 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 sm:flex sm:px-4 sm:py-2 sm:text-[11px]"
            >
              <Phone size={12} />
              01 23 45 67 89
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white transition-colors hover:text-[#C9A84C] md:hidden"
              aria-label="Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - menu déroulant */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-3 font-mono text-sm uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-[#C9A84C]"
              >
                {item.name}
                <ArrowUpRight size={14} />
              </Link>
            ))}
            <a
              href="tel:0123456789"
              className="mt-4 flex items-center justify-center gap-2 border border-[#C9A84C]/40 py-3 font-mono text-sm text-[#C9A84C] transition-all hover:border-[#C9A84C] hover:bg-[#C9A84C]/10"
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
