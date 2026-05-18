'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, MapPin, Phone, Shield, ArrowRight, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#1F2A44] text-white border-t border-[#C6A75E]/20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Colonne 1 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#C6A75E]/10 rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-[#C6A75E]" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Dératisation Pro</h3>
                <p className="text-xs text-[#C6A75E]/60">Experts certifiés</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Experts en désinfection, dératisation et désinsectisation à Paris et Île-de-France. 
              Intervention rapide 24h/24, 7j/7.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size="16" className="text-[#C6A75E]" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size="16" className="text-[#C6A75E]" />
                <span>contact@deratisation-paris.fr</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin size="16" className="text-[#C6A75E]" />
                <span>75 001 Paris, France</span>
              </div>
            </div>
          </div>

          {/* Colonne 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#C6A75E]"></span>
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Accueil', href: '/' },
                { name: 'Nos services', href: '#services' },
                { name: 'Demande de devis', href: '/devis' },
                { name: 'FAQ', href: '#faq' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-[#C6A75E] transition text-sm flex items-center gap-2 group">
                    <ArrowRight size="12" className="opacity-0 group-hover:opacity-100 transition" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#C6A75E]"></span>
              Ressources
            </h3>
            <ul className="space-y-3">
              {[
                'Actualités', 'Blog', 'Guides pratiques', 
                'Témoignages clients', 'FAQ', 'Contact'
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-[#C6A75E] transition text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#C6A75E]"></span>
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Recevez nos conseils et offres spéciales chaque mois !
            </p>
            <form onSubmit={handleNewsletter} className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-2 bg-[#2A3855] border border-[#C6A75E]/20 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C6A75E] text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C6A75E] text-[#1F2A44] rounded-r-lg hover:bg-[#B8963A] transition text-sm font-semibold"
                >
                  OK
                </button>
              </div>
              {subscribed && (
                <p className="text-green-400 text-sm flex items-center gap-1">
                  <CheckCircle size="14" />
                  Merci de votre inscription !
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-[#C6A75E]/10 pt-8 text-center text-gray-500 text-sm">
          <p>© 2026 Dératisation Pro — Intervention 24h/24 — Devis gratuit</p>
        </div>
      </div>
    </footer>
  );
}
