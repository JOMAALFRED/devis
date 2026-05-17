'use client';

import { DevisFormData, Etablissement } from '@/types';

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
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Type d'établissement *
        </label>
        <select
          value={data.etablissement || ''}
          onChange={(e) => updateData({ etablissement: e.target.value as Etablissement })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-gray-50 hover:bg-white"
          required
        >
          <option value="">Sélectionnez votre type d'établissement</option>
          <option value="Restaurant">🍽️ Restaurant</option>
          <option value="Hôtel">🏨 Hôtel</option>
          <option value="Copropriété">🏢 Copropriété</option>
          <option value="Autre">📋 Autre</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Surface (m²) * - Min 10, Max 50000
        </label>
        <input
          type="number"
          value={data.surface || ''}
          onChange={(e) => updateData({ surface: parseInt(e.target.value) })}
          min="10"
          max="50000"
          placeholder="Ex: 150"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-gray-50 hover:bg-white"
          required
        />
        <p className="text-sm text-gray-500 mt-1">Surface en mètres carrés</p>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Continuer →
      </button>
    </form>
  );
}
