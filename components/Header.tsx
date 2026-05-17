'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'Devis', href: '/devis' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-gradient-to-r from-blue-900 to-purple-900'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🦠</span>
            </div>
            <div>
              <span className={`text-xl font-bold ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                Dératisation Pro
              </span>
              <span className={`block text-xs ${scrolled ? 'text-gray-500' : 'text-blue-200'}`}>
                Paris 24h/24
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'} transition font-medium`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/devis"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition"
            >
              Devis gratuit
            </Link>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden ${scrolled ? 'text-gray-800' : 'text-white'} text-2xl`}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block ${scrolled ? 'text-gray-700' : 'text-white'} py-2`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/devis"
              onClick={() => setIsOpen(false)}
              className="block bg-blue-600 text-white px-6 py-2 rounded-full text-center"
            >
              Devis gratuit
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
