'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock, Shield, Truck, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section avec padding-top pour compenser le header fixe */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="container mx-auto px-6 relative z-20 text-center pt-20">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Désinfection & Dératisation
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Paris 24h/24
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Intervention rapide, professionnelle et garantie. Devis gratuit sous 24h.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/devis" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-2xl transition transform hover:scale-105 inline-flex items-center gap-2">
                Demander un devis <ArrowRight size={20} />
              </Link>
              <a href="#services" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition">
                Nos services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nos services professionnels</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Des solutions adaptées à chaque situation</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🐀", title: "Dératisation", desc: "Élimination totale des rongeurs avec garantie", color: "from-blue-500 to-blue-600" },
              { icon: "🪳", title: "Désinsectisation", desc: "Traitement contre cafards, punaises, fourmis", color: "from-purple-500 to-purple-600" },
              { icon: "🦠", title: "Désinfection", desc: "Nettoyage et assainissement professionnel", color: "from-pink-500 to-pink-600" }
            ].map((service, i) => (
              <div key={i} className="group bg-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <Link href="/devis" className={`inline-flex items-center text-${service.color.split('-')[1]}-600 hover:text-${service.color.split('-')[1]}-700 font-semibold`}>
                  Devis gratuit <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Une urgence ?</h2>
          <p className="text-gray-600 mb-8">Appelez-nous 24h/24, 7j/7</p>
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl shadow-lg">
            <p className="text-2xl font-bold">📞 01 23 45 67 89</p>
          </div>
        </div>
      </section>
    </div>
  );
}
