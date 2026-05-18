'use client';

import { useState } from 'react';
import { DevisFormData } from '@/types';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Step3Props {
  data: DevisFormData;
  onSubmit: (data: DevisFormData) => Promise<void>;
  onPrev: () => void;
  loading: boolean;
}

export default function Step3({ data, onSubmit, onPrev, loading }: Step3Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState(data);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nom || formData.nom.length < 2) {
      newErrors.nom = 'Nom requis (minimum 2 caractères)';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Email valide requis';
    }
    
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!formData.telephone || !phoneRegex.test(formData.telephone)) {
      newErrors.telephone = 'Téléphone français valide requis (ex: 0612345678)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-white/50 mb-2">
          Nom complet *
        </label>
        <input
          type="text"
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          className={`w-full px-4 py-3 bg-[#1A1A1A] border rounded-lg text-white placeholder-white/20 focus:outline-none transition-all duration-200 ${
            errors.nom ? 'border-red-500/50 focus:border-red-500' : 'border-white/[0.06] focus:border-[#C9A84C]/50'
          }`}
          required
        />
        {errors.nom && <p className="text-red-400 text-xs mt-1 font-mono">{errors.nom}</p>}
      </div>

      <div>
        <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-white/50 mb-2">
          Email *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-4 py-3 bg-[#1A1A1A] border rounded-lg text-white placeholder-white/20 focus:outline-none transition-all duration-200 ${
            errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/[0.06] focus:border-[#C9A84C]/50'
          }`}
          required
        />
        {errors.email && <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>}
      </div>

      <div>
        <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-white/50 mb-2">
          Téléphone *
        </label>
        <input
          type="tel"
          value={formData.telephone}
          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
          placeholder="0612345678"
          className={`w-full px-4 py-3 bg-[#1A1A1A] border rounded-lg text-white placeholder-white/20 focus:outline-none transition-all duration-200 ${
            errors.telephone ? 'border-red-500/50 focus:border-red-500' : 'border-white/[0.06] focus:border-[#C9A84C]/50'
          }`}
          required
        />
        {errors.telephone && <p className="text-red-400 text-xs mt-1 font-mono">{errors.telephone}</p>}
      </div>

      <div>
        <label className="block font-mono text-[11px] uppercase tracking-[0.15em] text-white/50 mb-2">
          Message (optionnel - max 500 caractères)
        </label>
        <textarea
          value={formData.message || ''}
          onChange={(e) => setFormData({ ...formData, message: e.target.value.slice(0, 500) })}
          maxLength={500}
          rows={4}
          className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/[0.06] rounded-lg text-white placeholder-white/20 focus:border-[#C9A84C]/50 focus:outline-none transition-all duration-200 resize-none"
        />
        <p className="text-white/30 text-right text-xs mt-1 font-mono">
          {formData.message?.length || 0}/500 caractères
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 bg-white/[0.06] text-white py-3 rounded-lg font-black uppercase tracking-[0.15em] text-sm flex items-center justify-center gap-2 hover:bg-white/[0.1] transition-all duration-300 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Précédent
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#C9A84C] text-black py-3 rounded-lg font-black uppercase tracking-[0.15em] text-sm flex items-center justify-center gap-2 hover:bg-[#E6C76A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loading ? 'Envoi...' : 'Envoyer'}
          {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
        </button>
      </div>
    </form>
  );
}
