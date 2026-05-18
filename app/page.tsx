'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Phone, Shield, Star, ArrowRight, ShieldCheck, Zap, Users, Clock,
  Building, Home as HomeIcon, Hotel, Bug, Rat, Flame, Award, Truck, Calendar,
  TrendingUp, CheckCircle, ChevronDown, ChevronUp, HelpCircle
} from 'lucide-react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { icon: Rat, title: "Dératisation", desc: "Élimination totale des rongeurs avec garantie 2 ans" },
    { icon: Bug, title: "Désinsectisation", desc: "Traitement anti-cafards, punaises, fourmis" },
    { icon: Shield, title: "Désinfection", desc: "Nettoyage et assainissement professionnel" },
    { icon: Building, title: "Copropriété", desc: "Contrats annuels pour immeubles" },
    { icon: Hotel, title: "Hôtels & Restaurants", desc: "Solutions adaptées aux professionnels" },
    { icon: Flame, title: "Urgence 24/7", desc: "Intervention en moins de 2 heures" },
  ];

  const stats = [
    { value: "5 000+", label: "Clients satisfaits", icon: Users },
    { value: "24/7", label: "Disponibilité", icon: Clock },
    { value: "< 2h", label: "Intervention", icon: Zap },
    { value: "100%", label: "Garantie", icon: ShieldCheck },
  ];

  const faqs = [
    {
      question: "Comment obtenir un devis gratuit ?",
      answer: "Vous pouvez obtenir un devis gratuit en remplissant notre formulaire en ligne sur la page 'Demande de devis'. Nous vous répondrons sous 24h avec une offre personnalisée adaptée à vos besoins."
    },
    {
      question: "Quels sont vos délais d'intervention ?",
      answer: "Nous intervenons 24h/24, 7j/7. En cas d'urgence, notre équipe peut être sur place en moins de 2 heures. Pour les interventions programmées, nous nous engageons à intervenir sous 48h."
    },
    {
      question: "Vos traitements sont-ils sans danger ?",
      answer: "Oui, tous nos produits sont certifiés et homologués. Nous utilisons des traitements respectueux de l'environnement et sans danger pour les humains et les animaux domestiques."
    },
    {
      question: "Proposez-vous des contrats d'entretien ?",
      answer: "Oui, nous proposons des contrats annuels d'entretien préventif pour les entreprises, copropriétés et particuliers. Ces contrats incluent des visites régulières et une intervention prioritaire en cas d'urgence."
    },
    {
      question: "Quelle est votre zone d'intervention ?",
      answer: "Nous intervenons sur Paris et toute l'Île-de-France : Paris intramuros, petite et grande couronne. Pour les zones hors Île-de-France, contactez-nous pour étudier votre demande."
    },
    {
      question: "Garantissez-vous vos interventions ?",
      answer: "Oui, toutes nos interventions sont garanties 2 ans. Si le problème persiste après notre passage, nous revenons gratuitement pour un nouveau traitement."
    }
  ];

  return (
    <div className="min-h-screen bg-[#E8DCC8]">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1F2A44]">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#C6A75E] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C6A75E] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C6A75E]/10 backdrop-blur-sm rounded-full text-[#C6A75E] text-sm mb-6">
                <ShieldCheck size={16} />
                <span>Expert certifié depuis 2010</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Désinfection &
                <span className="block text-[#C6A75E]">
                  Dératisation Paris
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
                Intervention rapide 24h/24, 7j/7. Devis gratuit et sans engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/devis" className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-[#1F2A44] bg-[#C6A75E] rounded-full hover:bg-[#B8963A] transition-all duration-300 hover:scale-105">
                  Devis gratuit
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#services" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-[#C6A75E]/30 rounded-full hover:bg-[#C6A75E]/10 transition-all duration-300">
                  Nos services
                </a>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-8 mt-8">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-[#C6A75E] border-2 border-white flex items-center justify-center text-[#1F2A44] font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-gray-300">
                  <span className="font-bold text-white">1000+</span> clients nous font confiance
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-[#2A3855] rounded-3xl p-8 border border-[#C6A75E]/20">
                <div className="flex justify-center gap-4 mb-6">
                  <div className="w-24 h-24 bg-[#C6A75E]/10 rounded-2xl flex items-center justify-center">
                    <Shield size={48} className="text-[#C6A75E]" />
                  </div>
                  <div className="w-24 h-24 bg-[#C6A75E]/10 rounded-2xl flex items-center justify-center">
                    <Rat size={48} className="text-[#C6A75E]" />
                  </div>
                  <div className="w-24 h-24 bg-[#C6A75E]/10 rounded-2xl flex items-center justify-center">
                    <Bug size={48} className="text-[#C6A75E]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1F2A44] rounded-xl p-4 text-center border border-[#C6A75E]/20">
                    <Star size={24} className="text-[#C6A75E] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">4.9</div>
                    <div className="text-sm text-gray-400">Note moyenne</div>
                  </div>
                  <div className="bg-[#1F2A44] rounded-xl p-4 text-center border border-[#C6A75E]/20">
                    <Zap size={24} className="text-[#C6A75E] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">24h</div>
                    <div className="text-sm text-gray-400">Intervention</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#1F2A44] border-y border-[#C6A75E]/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center text-white">
                  <Icon size={40} className="mx-auto mb-3 text-[#C6A75E]" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#E8DCC8]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1F2A44] mb-4">
              Nos <span className="text-[#C6A75E]">services</span>
            </h2>
            <p className="text-xl text-[#1F2A44]/60 max-w-2xl mx-auto">
              Des solutions professionnelles adaptées à tous vos besoins
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-[#C6A75E]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} className="text-[#C6A75E]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F2A44] mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <Link href="/devis" className="inline-flex items-center gap-1 text-[#C6A75E] font-semibold group-hover:gap-2 transition-all duration-300">
                    Devis gratuit <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#1F2A44]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Pourquoi nous <span className="text-[#C6A75E]">choisir ?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Des raisons qui font la différence
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Certifié", desc: "Qualibat et certification professionnelle" },
              { icon: Truck, title: "Rapide", desc: "Intervention en moins de 2h" },
              { icon: Calendar, title: "Sans engagement", desc: "Devis gratuit et personnalisé" },
              { icon: TrendingUp, title: "Garantie", desc: "2 ans sur tous nos traitements" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center group">
                  <div className="w-20 h-20 bg-[#2A3855] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#C6A75E]/20 group-hover:border-[#C6A75E] group-hover:scale-110 transition-all duration-300">
                    <Icon size={40} className="text-[#C6A75E]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-[#E8DCC8]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C6A75E]/10 rounded-full text-[#C6A75E] text-sm mb-4">
              <HelpCircle size={16} />
              <span>Questions fréquentes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1F2A44] mb-4">
              Foire aux <span className="text-[#C6A75E]">questions</span>
            </h2>
            <p className="text-xl text-[#1F2A44]/60 max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#C6A75E]/10 rounded-full flex items-center justify-center">
                      <HelpCircle size={16} className="text-[#C6A75E]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1F2A44]">{faq.question}</h3>
                  </div>
                  {openFaq === index ? (
                    <ChevronUp size={20} className="text-[#C6A75E]" />
                  ) : (
                    <ChevronDown size={20} className="text-[#C6A75E]" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 bg-white/50 rounded-xl border border-[#C6A75E]/10 ml-11">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional FAQ CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Vous avez d'autres questions ? N'hésitez pas à nous contacter
            </p>
            <a
              href="tel:0123456789"
              className="inline-flex items-center gap-2 text-[#C6A75E] font-semibold hover:gap-3 transition-all duration-300"
            >
              <Phone size={18} />
              01 23 45 67 89
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#1F2A44]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ce que disent <span className="text-[#C6A75E]">nos clients</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ils nous font confiance et recommandent nos services
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Jean Dupont", role: "Restaurant Le Gourmet", comment: "Intervention rapide et efficace. Plus aucun rat depuis 6 mois !", rating: 5 },
              { name: "Marie Martin", role: "Hôtel Plaza", comment: "Service professionnel, équipe à l'écoute. Je recommande vivement.", rating: 5 },
              { name: "Pierre Durand", role: "Syndic Copropriété", comment: "Contrat annuel très avantageux. Travail sérieux et ponctuel.", rating: 5 },
            ].map((testimonial, i) => (
              <div key={i} className="bg-[#2A3855] rounded-2xl p-6 border border-[#C6A75E]/20 hover:border-[#C6A75E]/50 transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} size={18} className="fill-[#C6A75E] text-[#C6A75E]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-[#C6A75E]">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#E8DCC8] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#C6A75E] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C6A75E] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <Shield size={48} className="mx-auto mb-4 text-[#C6A75E]" />
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2A44] mb-4">
            Prêt à résoudre votre problème ?
          </h2>
          <p className="text-xl text-[#1F2A44]/60 mb-8 max-w-2xl mx-auto">
            Obtenez votre devis gratuit en moins de 2 minutes
          </p>
          <Link href="/devis" className="inline-flex items-center gap-2 bg-[#C6A75E] text-[#1F2A44] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#B8963A] hover:scale-105 transition-all duration-300">
            Commencer maintenant <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
