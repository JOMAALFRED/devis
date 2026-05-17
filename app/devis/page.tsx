'use client';

import { useState } from 'react';
import Step1 from '@/components/Step1';
import Step2 from '@/components/Step2';
import Step3 from '@/components/Step3';
import { DevisFormData } from '@/types';

export default function DevisPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; id?: string; error?: string } | null>(null);
  const [formData, setFormData] = useState<Partial<DevisFormData>>({ nuisibles: [] });

  const updateFormData = (data: Partial<DevisFormData>) => setFormData((prev) => ({ ...prev, ...data }));
  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (finalData: DevisFormData) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });
      const data = await response.json();
      if (response.ok) {
        setResult({ success: true, id: data.id });
        setStep(4);
      } else {
        setResult({ success: false, error: data.error || 'Une erreur est survenue' });
      }
    } catch (error) {
      setResult({ success: false, error: 'Erreur réseau' });
    } finally {
      setLoading(false);
    }
  };

  if (result?.success && step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform animate-fade-in-up">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Demande envoyée !</h2>
          <p className="text-gray-600 mb-4">Votre numéro de suivi :</p>
          <div className="bg-gray-100 p-3 rounded-lg mb-6">
            <code className="text-lg font-mono text-purple-600">{result.id}</code>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform animate-fade-in-up">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-center">Demande de devis</h1>
              <p className="text-center text-blue-100 mt-2">Gratuit • Rapide • Sans engagement</p>
              <div className="flex justify-center mt-8 space-x-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      s === step 
                        ? 'bg-white text-purple-600 shadow-lg transform scale-110' 
                        : s < step 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white/30 text-white'
                    }`}>
                      {s < step ? '✓' : s}
                    </div>
                    {s < 3 && <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${s < step ? 'bg-green-500' : 'bg-white/30'}`} />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            {step === 1 && <Step1 data={formData} updateData={updateFormData} onNext={nextStep} />}
            {step === 2 && <Step2 data={formData} updateData={updateFormData} onNext={nextStep} onPrev={prevStep} />}
            {step === 3 && <Step3 data={formData as DevisFormData} onSubmit={handleSubmit} onPrev={prevStep} loading={loading} />}
            
            {result?.error && !result.success && step !== 4 && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 animate-fade-in">
                {result.error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
