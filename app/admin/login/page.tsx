'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    
    if (password === adminPassword) {
      document.cookie = 'admin_auth=authenticated; path=/; max-age=28800';
      router.push('/admin');
    } else {
      setError('Mot de passe incorrect');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E8DCC8] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#C6A75E] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#1F2A44] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-[#C6A75E]/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#C6A75E]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield size={40} className="text-[#C6A75E]" />
            </div>
            <h1 className="text-3xl font-bold text-[#1F2A44] mb-2">Accès Admin</h1>
            <p className="text-[#1F2A44]/50 text-sm">Veuillez vous authentifier</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#1F2A44] mb-2 font-semibold text-sm">Mot de passe</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1F2A44]/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#E8DCC8]/30 border border-[#C6A75E]/20 rounded-xl text-[#1F2A44] placeholder-[#1F2A44]/30 focus:outline-none focus:ring-2 focus:ring-[#C6A75E] focus:border-transparent transition"
                  placeholder="Entrez votre mot de passe"
                  required
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C6A75E] text-[#1F2A44] py-3 rounded-xl font-semibold hover:bg-[#B8963A] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Connexion...'
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[#1F2A44]/40 text-xs mt-6">
            Accès réservé au personnel autorisé
          </p>
        </div>
      </div>
    </div>
  );
}
