'use client';

import Link from 'next/link';
import { useState } from 'react';

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
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-6 py-12">
        {/* Grid principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Section 1 - Infos société */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Dératisation Pro</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Experts en désinfection, dératisation et désinsectisation à Paris et Île-de-France.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📞 01 23 45 67 89</p>
              <p>✉️ contact@deratisation-paris.fr</p>
              <p>📍 75 001 Paris, France</p>
            </div>
          </div>

          {/* Section 2 - Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-blue-400">Accueil</Link></li>
              <li><Link href="/devis" className="text-gray-400 hover:text-blue-400">Demande de devis</Link></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400">Nos services</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          {/* Section 3 - Ressources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Actualités</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Témoignages</a></li>
            </ul>
          </div>

          {/* Section 4 - Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Recevez nos conseils et offres chaque mois !
            </p>
            <form onSubmit={handleNewsletter} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Je m'abonne
              </button>
            </form>
            {subscribed && (
              <p className="text-green-400 text-sm mt-2">✓ Merci !</p>
            )}
          </div>
        </div>

        {/* Liens sociaux et légaux */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">📘 Facebook</a>
              <a href="#" className="text-gray-400 hover:text-blue-400">🐦 Twitter</a>
              <a href="#" className="text-gray-400 hover:text-blue-400">📷 Instagram</a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">Mentions légales</a>
              <a href="#" className="text-gray-400 hover:text-blue-400">Confidentialité</a>
              <a href="#" className="text-gray-400 hover:text-blue-400">Cookies</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-500 text-sm">
          <p>© 2026 Dératisation Pro — Intervention 24h/24 — Devis gratuit</p>
        </div>
      </div>
    </footer>
  );
}
