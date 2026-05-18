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
    
    // Vérification plus explicite
    const hasEtablissement = !!data.etablissement;
    const hasSurface = !!data.surface && data.surface >= 10 && data.surface <= 50000;
    
    console.log('=== STEP1 VALIDATION ===');
    console.log('etablissement:', data.etablissement, 'valid:', hasEtablissement);
    console.log('surface:', data.surface, 'valid:', hasSurface);
    
    if (hasEtablissement && hasSurface) {
      console.log('✅ Validation OK, passage à l\'étape 2');
      onNext();
    } else {
      console.log('❌ Validation échouée');
      alert('Veuillez remplir tous les champs correctement :\n- Type d\'établissement requis\n- Surface entre 10 et 50000 m²');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-[#1F2A44]/60 mb-2">
          Type d'établissement *
        </label>
        <select
          value={data.etablissement || ''}
          onChange={(e) => {
            console.log('Etablissement changé:', e.target.value);
            updateData({ etablissement: e.target.value as Etablissement });
          }}
          className="w-full px-4 py-3 bg-[#E8DCC8]/30 border border-[#C6A75E]/30 rounded-lg text-[#1F2A44] focus:border-[#C6A75E] focus:outline-none transition-all duration-200"
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
        <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-[#1F2A44]/60 mb-2">
          Surface (m²) * - Min 10, Max 50000
        </label>
        <input
          type="number"
          value={data.surface || ''}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            console.log('Surface changée:', value);
            updateData({ surface: value });
          }}
          min="10"
          max="50000"
          placeholder="Ex: 150"
          className="w-full px-4 py-3 bg-[#E8DCC8]/30 border border-[#C6A75E]/30 rounded-lg text-[#1F2A44] placeholder-[#1F2A44]/30 focus:border-[#C6A75E] focus:outline-none transition-all duration-200"
          required
        />
        <p className="text-xs text-[#1F2A44]/40 mt-1">Surface minimale : 10 m², maximale : 50 000 m²</p>
      </div>

      <button
        type="submit"
        className="w-full bg-[#C6A75E] text-[#1F2A44] py-3 rounded-lg font-semibold uppercase tracking-[0.15em] text-sm flex items-center justify-center gap-2 hover:bg-[#B8963A] transition-all duration-300 group"
      >
        Continuer
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}
