'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowUpRight, ChevronDown, Shield } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', href: '/', icon: null },
    { name: 'Services', href: '#services', icon: ChevronDown, submenu: [
      { name: 'Dératisation', href: '#services' },
      { name: 'Désinsectisation', href: '#services' },
      { name: 'Désinfection', href: '#services' },
    ]},
    { name: 'Devis', href: '/devis', icon: null },
    { name: 'Contact', href: '#contact', icon: null },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-[#C6A75E]/20 bg-[#1F2A44]/95 backdrop-blur-xl shadow-2xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden border border-[#C6A75E]/40 bg-[#C6A75E]/10 transition-all duration-300 group-hover:border-[#C6A75E] group-hover:shadow-lg sm:h-10 sm:w-10">
              <Shield size={18} className="text-[#C6A75E] transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-black tracking-tight text-white transition-colors duration-300 group-hover:text-[#C6A75E] sm:text-base">
                Dératisation Pro
              </p>
              <p className="font-mono text-[8px] uppercase tracking-widest text-[#C6A75E]/60 sm:text-[10px]">
                Experts certifiés
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.15em] text-white/70 transition-colors duration-300 hover:text-[#C6A75E] lg:text-xs"
                >
                  {item.name}
                  {item.icon && <item.icon size={12} className="transition-transform duration-300 group-hover:rotate-180" />}
                </Link>
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-[#1F2A44] border border-[#C6A75E]/20 rounded-lg overflow-hidden shadow-xl">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-2 text-xs text-white/70 hover:text-[#C6A75E] hover:bg-[#2A3855] transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <a
              href="tel:0123456789"
              className="hidden items-center gap-2 border border-[#C6A75E]/40 px-3 py-1.5 font-mono text-[10px] text-[#C6A75E] transition-all duration-300 hover:border-[#C6A75E] hover:bg-[#C6A75E]/10 hover:shadow-lg sm:flex sm:px-4 sm:py-2 sm:text-[11px]"
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

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-[#C6A75E]/20 bg-[#1F2A44]/95 backdrop-blur-xl">
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
      </div>
    </header>
  );
}
