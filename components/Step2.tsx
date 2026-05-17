'use client';

import { DevisFormData, Nuisible, Urgence } from '@/types';

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
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Détails de l'intervention</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Types de nuisibles * (Plusieurs choix possibles)
        </label>
        <div className="space-y-2">
          {nuisiblesList.map((nuisible) => (
            <label key={nuisible} className="flex items-center">
              <input
                type="checkbox"
                checked={data.nuisibles?.includes(nuisible) || false}
                onChange={() => handleNuisibleChange(nuisible)}
                className="mr-2"
              />
              {nuisible}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">
          Type d'urgence *
        </label>
        <div className="space-y-2">
          {urgenceList.map((urgence) => (
            <label key={urgence} className="flex items-center">
              <input
                type="radio"
                name="urgence"
                value={urgence}
                checked={data.urgence === urgence}
                onChange={(e) => updateData({ urgence: e.target.value as Urgence })}
                className="mr-2"
              />
              {urgence}
            </label>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
        >
          Précédent
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Suivant
        </button>
      </div>
    </form>
  );
}
