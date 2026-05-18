'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight, Bug, Building, Clock, Hotel,
  Phone, Rat, Shield, ShieldCheck, Star,
  Users, Zap, Flame, Award, Truck, Calendar, TrendingUp,
} from 'lucide-react';

type Service = { icon: React.ElementType; title: string; desc: string; tag: string };
type Stat = { value: string; label: string; icon: React.ElementType };
type Feature = { icon: React.ElementType; title: string; desc: string };

const SERVICES: Service[] = [
  { icon: Rat,      title: 'Dératisation',    desc: 'Élimination totale des rongeurs avec garantie 2 ans.', tag: '01' },
  { icon: Bug,      title: 'Désinsectisation',desc: 'Cafards, punaises de lit, fourmis, moustiques.',       tag: '02' },
  { icon: Shield,   title: 'Désinfection',    desc: 'Assainissement et nettoyage professionnel certifié.',  tag: '03' },
  { icon: Building, title: 'Copropriété',     desc: 'Contrats annuels adaptés aux immeubles.',              tag: '04' },
  { icon: Hotel,    title: 'Hôtels & Resto',  desc: 'Solutions sur-mesure pour les professionnels.',        tag: '05' },
  { icon: Flame,    title: 'Urgence 24/7',    desc: 'Intervention garantie en moins de 2 heures.',          tag: '06' },
];

const STATS: Stat[] = [
  { value: '5 000+', label: 'Clients satisfaits', icon: Users },
  { value: '24 / 7', label: 'Disponibilité',       icon: Clock },
  { value: '< 2 h',  label: 'Délai intervention',  icon: Zap },
  { value: '100 %',  label: 'Garantie traitement', icon: ShieldCheck },
];

const FEATURES: Feature[] = [
  { icon: Award,      title: 'Certifié',       desc: 'Qualibat — accréditation nationale' },
  { icon: Truck,      title: 'Équipe mobile',   desc: 'Déploiement 24h/24, secteur Île-de-France' },
  { icon: Calendar,   title: 'Sans engagement', desc: 'Devis gratuit, personnalisé, sous 1h' },
  { icon: TrendingUp, title: 'Garantie 2 ans',  desc: "Sur l'ensemble de nos traitements" },
];

function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#C9A84C]">
      <span className="block h-[1px] w-8 bg-[#C9A84C]" />
      {children}
    </p>
  );
}

function GoldButton({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 bg-[#C9A84C] px-7 py-3.5 text-sm font-black uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-[#E6C76A] hover:shadow-[0_0_40px_rgba(201,168,76,0.25)] ${className}`}
    >
      {children}
      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function OutlineButton({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 text-sm font-black uppercase tracking-[0.15em] text-white/70 transition-all duration-300 hover:border-white/50 hover:text-white ${className}`}
    >
      {children}
    </Link>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const statsSection    = useIntersection(0.1);
  const servicesSection = useIntersection(0.05);
  const featuresSection = useIntersection(0.1);
  const ctaSection      = useIntersection(0.1);

  return (
    <>
      {/* Hero - avec padding-top pour compenser le header fixe */}
      <section className="relative flex min-h-screen items-end overflow-hidden bg-[#0A0A0A] pb-24 pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C] opacity-[0.04] blur-[120px]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="block h-[1px] w-12 bg-[#C9A84C]" />
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#C9A84C]">
              Expert certifié depuis 2010
            </p>
          </div>
          <h1
            className="mb-10 max-w-4xl text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] tracking-tight text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Désinfection<br />
            &amp;&nbsp;<em className="text-[#C9A84C] not-italic">Dératisation</em><br />
            Paris
          </h1>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-sm text-base leading-relaxed text-white/40">
              Intervention 24h/24, 7j/7.<br />
              Devis gratuit et sans engagement.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <GoldButton href="/devis">Devis gratuit</GoldButton>
              <OutlineButton href="#services">Nos services</OutlineButton>
            </div>
          </div>
          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/[0.06] pt-8">
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D', 'E'].map((l) => (
                <div
                  key={l}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0A0A0A] bg-[#1A1A1A] text-xs font-black text-[#C9A84C]"
                >
                  {l}
                </div>
              ))}
            </div>
            <p className="font-mono text-[12px] text-white/30">
              <span className="text-white">1 000+</span> clients nous font confiance
            </p>
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-[#C9A84C] text-[#C9A84C]" />
              ))}
              <span className="ml-1 font-mono text-[11px] text-white/30">4.9 / 5</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
      </section>

      {/* Stats */}
      <section ref={statsSection.ref} className="border-b border-white/[0.06] bg-[#0E0E0E]">
        <div className="mx-auto max-w-7xl">
          <div className="grid divide-y divide-white/[0.06] md:grid-cols-4 md:divide-x md:divide-y-0">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-start gap-3 px-8 py-10"
                  style={{
                    opacity: statsSection.visible ? 1 : 0,
                    transform: statsSection.visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s`,
                  }}
                >
                  <Icon size={20} className="text-[#C9A84C]" />
                  <p
                    className="text-4xl font-black text-white"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/30">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-[#0A0A0A] py-28">
        <div ref={servicesSection.ref} className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Nos services</SectionLabel>
              <h2
                className="text-[clamp(2rem,5vw,4rem)] font-black leading-[1.05] tracking-tight text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Solutions<br />
                <em className="text-[#C9A84C] not-italic">professionnelles</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/35">
              Chaque intervention est menée par des techniciens certifiés,
              équipés des traitements homologués.
            </p>
          </div>
          <div className="grid gap-[1px] bg-white/[0.06] md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className="group relative bg-[#0A0A0A] p-8 transition-colors duration-300 hover:bg-[#111]"
                  style={{
                    opacity: servicesSection.visible ? 1 : 0,
                    transform: servicesSection.visible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `opacity 0.7s ${i * 0.08}s, transform 0.7s ${i * 0.08}s`,
                  }}
                >
                  <span className="mb-6 block font-mono text-[10px] text-white/15">{svc.tag}</span>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center border border-[#C9A84C]/20 bg-[#C9A84C]/5 transition-colors duration-300 group-hover:border-[#C9A84C]/40 group-hover:bg-[#C9A84C]/10">
                    <Icon size={22} className="text-[#C9A84C]" />
                  </div>
                  <h3 className="mb-3 text-xl font-black text-white">{svc.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-white/35">{svc.desc}</p>
                  <Link
                    href="/devis"
                    className="group/link inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#C9A84C] transition-all duration-200 hover:gap-2.5"
                  >
                    Devis gratuit
                    <ArrowUpRight size={13} />
                  </Link>
                  <div className="absolute inset-x-0 bottom-0 h-[1px] bg-[#C9A84C] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresSection.ref} className="border-y border-white/[0.06] bg-[#0E0E0E] py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <SectionLabel>Pourquoi nous choisir</SectionLabel>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="group flex flex-col gap-4"
                  style={{
                    opacity: featuresSection.visible ? 1 : 0,
                    transform: featuresSection.visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s`,
                  }}
                >
                  <div className="flex h-10 w-10 items-center justify-center border border-white/10 transition-colors duration-300 group-hover:border-[#C9A84C]/40">
                    <Icon size={18} className="text-white/40 transition-colors duration-300 group-hover:text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="mb-1 font-black text-white">{feat.title}</p>
                    <p className="text-sm leading-relaxed text-white/35">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaSection.ref} className="relative overflow-hidden bg-[#0A0A0A] py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C] opacity-[0.05] blur-[140px]"
        />
        <div
          className="relative mx-auto max-w-4xl px-6 text-center md:px-12"
          style={{
            opacity: ctaSection.visible ? 1 : 0,
            transform: ctaSection.visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s, transform 0.8s',
          }}
        >
          <SectionLabel>Prêt à agir ?</SectionLabel>
          <h2
            className="mb-6 text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Résolvez votre<br />
            problème <em className="text-[#C9A84C] not-italic">{"aujourd'hui"}</em>
          </h2>
          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-white/35">
            Obtenez votre devis personnalisé en moins de 2 minutes.
            Intervention garantie sous 2 heures.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <GoldButton href="/devis" className="px-9 py-4 text-base">
              Demander un devis
            </GoldButton>
            <a
              href="tel:0123456789"
              className="flex items-center gap-2.5 border border-white/15 px-9 py-4 text-sm font-black uppercase tracking-[0.15em] text-white/60 transition-all duration-200 hover:border-white/30 hover:text-white"
            >
              <Phone size={15} />
              01 23 45 67 89
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: ShieldCheck, text: 'Certifié Qualibat' },
              { icon: Zap,         text: 'Intervention < 2h' },
              { icon: Star,        text: 'Note 4.9 / 5' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={13} className="text-[#C9A84C]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/30">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
