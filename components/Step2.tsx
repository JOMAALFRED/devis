'use client';

import { DevisFormData, Nuisible, Urgence } from '@/types';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Step2Props {
  data: Partial<DevisFormData>;
  updateData: (data: Partial<DevisFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const nuisiblesList: Nuisible[] = ['Rats', 'Cafards', 'Punaises de lit', 'Frelons', 'Autre'];
const urgenceList: Urgence[] = ['Intervention sous 24h', 'Contrat annuel', 'Simple devis'];

export default function Step2({ data, updateData, onNext, onPrev }: Step2Props) {
  const handleNuisibleChange = (nuisible: Nuisible) => {
    const current = data.nuisibles || [];
    const updated = current.includes(nuisible)
      ? current.filter(n => n !== nuisible)
      : [...current, nuisible];
    updateData({ nuisibles: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.nuisibles?.length && data.urgence) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-[#1F2A44]/60 mb-3">
          Types de nuisibles * (Plusieurs choix possibles)
        </label>
        <div className="space-y-2">
          {nuisiblesList.map((nuisible) => (
            <label key={nuisible} className="flex items-center gap-3 p-3 bg-[#E8DCC8]/30 border border-[#C6A75E]/30 rounded-lg cursor-pointer hover:border-[#C6A75E] transition-all duration-200">
              <input
                type="checkbox"
                checked={data.nuisibles?.includes(nuisible) || false}
                onChange={() => handleNuisibleChange(nuisible)}
                className="w-4 h-4 accent-[#C6A75E]"
              />
              <span className="text-[#1F2A44] text-sm">{nuisible}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-[#1F2A44]/60 mb-3">
          Type d'urgence *
        </label>
        <div className="space-y-2">
          {urgenceList.map((urgence) => (
            <label key={urgence} className="flex items-center gap-3 p-3 bg-[#E8DCC8]/30 border border-[#C6A75E]/30 rounded-lg cursor-pointer hover:border-[#C6A75E] transition-all duration-200">
              <input
                type="radio"
                name="urgence"
                value={urgence}
                checked={data.urgence === urgence}
                onChange={(e) => updateData({ urgence: e.target.value as Urgence })}
                className="w-4 h-4 accent-[#C6A75E]"
              />
              <span className="text-[#1F2A44] text-sm">{urgence}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 bg-[#1F2A44] text-white py-3 rounded-lg font-semibold uppercase tracking-[0.15em] text-sm flex items-center justify-center gap-2 hover:bg-[#2A3855] transition-all duration-300 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Précédent
        </button>
        <button
          type="submit"
          className="flex-1 bg-[#C6A75E] text-[#1F2A44] py-3 rounded-lg font-semibold uppercase tracking-[0.15em] text-sm flex items-center justify-center gap-2 hover:bg-[#B8963A] transition-all duration-300 group"
        >
          Suivant
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  );
}
