'use client';

import { useState } from 'react';
import Step1 from '@/components/Step1';
import Step2 from '@/components/Step2';
import Step3 from '@/components/Step3';
import { DevisFormData } from '@/types';
import { Shield, Star, Zap, CheckCircle } from 'lucide-react';

export default function DevisPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; id?: string; error?: string } | null>(null);
  const [formData, setFormData] = useState<Partial<DevisFormData>>({ 
    etablissement: '',
    surface: 0,
    nuisibles: [],
    urgence: '',
    nom: '',
    email: '',
    telephone: '',
    message: ''
  });

  const updateFormData = (data: Partial<DevisFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    console.log('FormData updated:', { ...formData, ...data }); // Debug
  };

  const nextStep = () => {
    console.log('Next step clicked, current step:', step);
    console.log('Current form data:', formData);
    setStep((s) => s + 1);
  };
  
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (finalData: DevisFormData) => {
    console.log('Submitting:', finalData);
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
      <div className="min-h-screen bg-[#E8DCC8] flex items-center justify-center p-4">
        <div className="relative max-w-md w-full">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#C6A75E] rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#1F2A44] rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-[#C6A75E]/20">
            <div className="w-20 h-20 bg-[#C6A75E] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-[#1F2A44]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2A44] mb-2">Demande envoyée !</h2>
            <p className="text-[#1F2A44]/60 mb-4 text-sm">Votre numéro de suivi :</p>
            <div className="bg-[#E8DCC8] border border-[#C6A75E]/30 rounded-xl p-4 mb-6">
              <code className="text-lg font-mono text-[#C6A75E]">{result.id}</code>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-[#C6A75E] text-[#1F2A44] py-3 rounded-lg font-semibold hover:bg-[#B8963A] transition-all duration-300"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E8DCC8] py-20 px-4">
      <div className="relative overflow-hidden mb-12">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#C6A75E] rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#1F2A44] rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        </div>
        <div className="relative text-center max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C6A75E]/10 rounded-full mb-6">
            <Shield size={14} className="text-[#C6A75E]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#C6A75E]">Devis gratuit</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1F2A44] mb-4">
            Demande de devis
          </h1>
          <p className="text-[#1F2A44]/60 font-mono text-sm max-w-md mx-auto">
            Remplissez ce formulaire et nous vous recontacterons sous 24h
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#C6A75E]/20 to-transparent rounded-3xl blur-xl opacity-30" />
          <div className="relative bg-white border border-[#C6A75E]/20 rounded-2xl overflow-hidden shadow-xl">
            <div className="h-1 bg-[#E8DCC8]">
              <div className="h-full bg-[#C6A75E] transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
            </div>

            <div className="border-b border-[#C6A75E]/10 px-6 py-8 md:px-8 bg-white">
              <div className="flex justify-between items-center">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex-1 flex items-center">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        s === step 
                          ? 'bg-[#C6A75E] text-white ring-4 ring-[#C6A75E]/30' 
                          : s < step 
                            ? 'bg-[#C6A75E]/20 text-[#C6A75E] border border-[#C6A75E]/40' 
                            : 'bg-[#E8DCC8] text-[#1F2A44]/40'
                      }`}>
                        {s < step ? '✓' : s}
                      </div>
                      <p className={`text-[10px] font-mono uppercase mt-2 tracking-wider ${
                        s === step ? 'text-[#C6A75E]' : 'text-[#1F2A44]/40'
                      }`}>
                        Étape {s}
                      </p>
                    </div>
                    {s < 3 && <div className={`flex-1 h-[1px] mx-2 transition-all duration-300 ${s < step ? 'bg-[#C6A75E]' : 'bg-[#E8DCC8]'}`} />}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 bg-white">
              {step === 1 && (
                <Step1 
                  data={formData} 
                  updateData={updateFormData} 
                  onNext={nextStep} 
                />
              )}
              {step === 2 && (
                <Step2 
                  data={formData} 
                  updateData={updateFormData} 
                  onNext={nextStep} 
                  onPrev={prevStep} 
                />
              )}
              {step === 3 && (
                <Step3 
                  data={formData as DevisFormData} 
                  onSubmit={handleSubmit} 
                  onPrev={prevStep} 
                  loading={loading} 
                />
              )}
              
              {result?.error && !result.success && step !== 4 && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {result.error}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
            <Zap size={14} className="text-[#C6A75E]" />
            <span className="font-mono text-[10px] uppercase text-[#1F2A44]/60">Intervention moins de 2h</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
            <Shield size={14} className="text-[#C6A75E]" />
            <span className="font-mono text-[10px] uppercase text-[#1F2A44]/60">Certifié Qualibat</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
            <Star size={14} className="text-[#C6A75E]" />
            <span className="font-mono text-[10px] uppercase text-[#1F2A44]/60">Note 4.9 / 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
