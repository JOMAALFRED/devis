'use client';

import { DevisFormData, Etablissement } from '@/types';
import { ArrowRight } from 'lucide-react';

interface Step1Props {
  data: Partial<DevisFormData>;
  updateData: (data: Partial<DevisFormData>) => void;
  onNext: () => void;
}

export default function Step1({ data, updateData, onNext }: Step1Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.etablissement && data.surface && data.surface >= 10 && data.surface <= 50000) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-white/50 mb-2">
          Type d'établissement *
        </label>
        <select
          value={data.etablissement || ''}
          onChange={(e) => updateData({ etablissement: e.target.value as Etablissement })}
          className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/[0.06] rounded-lg text-white focus:border-[#C9A84C]/50 focus:outline-none transition-all duration-200"
          required
        >
          <option value="">Sélectionnez votre type d'établissement</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Hôtel">Hôtel</option>
          <option value="Copropriété">Copropriété</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div>
        <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-white/50 mb-2">
          Surface (m²) * - Min 10, Max 50000
        </label>
        <input
          type="number"
          value={data.surface || ''}
          onChange={(e) => updateData({ surface: parseInt(e.target.value) })}
          min="10"
          max="50000"
          placeholder="Ex: 150"
          className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/[0.06] rounded-lg text-white placeholder-white/20 focus:border-[#C9A84C]/50 focus:outline-none transition-all duration-200"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#C9A84C] text-black py-3 rounded-lg font-black uppercase tracking-[0.15em] text-sm flex items-center justify-center gap-2 hover:bg-[#E6C76A] transition-all duration-300 group"
      >
        Continuer
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}
