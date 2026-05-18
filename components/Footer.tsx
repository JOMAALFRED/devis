'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { Mail, MapPin, Phone, ArrowUpRight, CheckCircle2, Send } from 'lucide-react';

const LINKS_NAV = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos services', href: '#services' },
  { label: 'Demande de devis', href: '/devis' },
  { label: 'Contact', href: '#contact' },
  { label: 'Urgence 24h/24', href: '#urgence' },
];

const LINKS_RESOURCES = [
  'Actualités', 'Blog', 'Guides pratiques',
  'Témoignages clients', 'FAQ', 'Vente Pro'
];

const SOCIALS = [
  { label: 'Facebook', href: '#', abbr: 'Fb' },
  { label: 'Instagram', href: '#', abbr: 'Ig' },
  { label: 'LinkedIn', href: '#', abbr: 'Li' },
  { label: 'YouTube', href: '#', abbr: 'Yt' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'loading'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 800));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <footer className="relative overflow-hidden bg-[#0A0A0A] text-white">
      {/* Grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Gold top border */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      {/* Newsletter band */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-lg">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#C9A84C]">
                Newsletter mensuelle
              </p>
              <h2
                className="text-4xl font-black leading-[1.05] tracking-tight md:text-5xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Conseils & offres<br />
                <span className="italic text-[#C9A84C]">en exclusivité</span>
              </h2>
            </div>
            <form onSubmit={handleNewsletter} className="w-full max-w-md">
              <div className="group relative flex items-center">
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  required
                  className="w-full border border-white/10 bg-white/[0.04] px-5 py-4 pr-14 text-sm text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-[#C9A84C]/50 focus:bg-white/[0.07]"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="absolute right-0 flex h-full w-12 items-center justify-center bg-[#C9A84C] text-black transition-all duration-200 hover:bg-[#E6C76A] disabled:opacity-60"
                  aria-label="S'abonner"
                >
                  {status === 'loading' ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  ) : (
                    <Send size={15} />
                  )}
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  status === 'success' ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="mt-3 flex items-center gap-2 font-mono text-xs text-emerald-400">
                  <CheckCircle2 size={13} />
                  Inscription confirmée — merci !
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="group mb-8 inline-block">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden border border-[#C9A84C]/40">
                  <div className="absolute inset-0 bg-[#C9A84C]/10" />
                  <span
                    className="relative text-lg font-black text-[#C9A84C]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    D
                  </span>
                </div>
                <div>
                  <p className="text-base font-black tracking-tight text-white">Dératisation Pro</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">Experts certifiés</p>
                </div>
              </div>
            </Link>
            <p className="mb-8 max-w-xs text-sm leading-relaxed text-white/45">
              Désinfection, dératisation et désinsectisation à Paris & Île-de-France.
              Intervention d'urgence 24h/24, 7j/7.
            </p>
            <ul className="space-y-3">
              {[
                { icon: Phone, value: '01 23 45 67 89' },
                { icon: Mail, value: 'contact@deratisation-paris.fr' },
                { icon: MapPin, value: '75 001 Paris, France' },
              ].map(({ icon: Icon, value }) => (
                <li key={value} className="flex items-center gap-3">
                  <Icon size={13} className="shrink-0 text-[#C9A84C]" />
                  <span className="font-mono text-[12px] text-white/40">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="hidden md:col-span-1 md:flex md:justify-center">
            <div className="w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Navigation</p>
            <ul className="space-y-1">
              {LINKS_NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between border-b border-white/[0.04] py-2 text-sm text-white/50 transition-all duration-200 hover:border-[#C9A84C]/30 hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-4">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Ressources</p>
            <ul className="space-y-1">
              {LINKS_RESOURCES.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="group flex items-center justify-between border-b border-white/[0.04] py-2 text-sm text-white/50 transition-all duration-200 hover:border-[#C9A84C]/30 hover:text-white"
                  >
                    <span>{item}</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-6 md:px-12">
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-[11px] text-white/20">
              © 2026 Dératisation Pro · Tous droits réservés
            </p>
            <nav className="flex flex-wrap gap-x-6 gap-y-1">
              {['Confidentialité', 'Conditions', 'Cookies', 'Accessibilité'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="font-mono text-[11px] text-white/20 transition-colors duration-200 hover:text-white/60"
                >
                  {item}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center border border-white/10 font-mono text-[10px] text-white/30 transition-all duration-200 hover:border-[#C9A84C]/50 hover:text-[#C9A84C]"
                >
                  {s.abbr}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
