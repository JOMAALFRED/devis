'use client';

import { useState } from 'react';
import { DevisFormData } from '@/types';

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
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Vos coordonnées</h2>
      
      <div className="mb-4">
        <label htmlFor="nom" className="block text-gray-700 mb-2">
          Nom complet *
        </label>
        <input
          type="text"
          id="nom"
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.nom ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="telephone" className="block text-gray-700 mb-2">
          Téléphone *
        </label>
        <input
          type="tel"
          id="telephone"
          value={formData.telephone}
          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
          placeholder="0612345678"
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.telephone ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 mb-2">
          Message (optionnel - max 500 caractères)
        </label>
        <textarea
          id="message"
          value={formData.message || ''}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          maxLength={500}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-gray-500 text-sm mt-1">
          {formData.message?.length || 0}/500 caractères
        </p>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
          disabled={loading}
        >
          Précédent
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Envoi en cours...' : 'Envoyer la demande'}
        </button>
      </div>
    </form>
  );
}
