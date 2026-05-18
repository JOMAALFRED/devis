'use client';

import { useState, useEffect, useCallback } from 'react';
import { Devis, Statut } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Download, Search, ChevronLeft, ChevronRight,
  Eye, CheckCircle, Archive, RefreshCw, TrendingUp,
  FileText, Clock, Users, Zap, ShieldCheck
} from 'lucide-react';

export default function AdminPage() {
  const [devis, setDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);
  const [statut, setStatut] = useState<Statut | 'tous'>('tous');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({ total24h: 0, nouveau: 0, traite: 0, archive: 0 });

  const getToken = () => 'token_admin_super_securise_123';

  const fetchDevis = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...(statut !== 'tous' && { statut }),
      });
      
      const response = await fetch(`/api/admin/devis?${params}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` },
      });
      
      if (!response.ok) throw new Error('Erreur de chargement');
      
      const data = await response.json();
      setDevis(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [page, statut]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${getToken()}` },
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Stats error:', error);
    }
  };

  useEffect(() => {
    fetchDevis();
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchDevis]);

  const handleStatutChange = async (id: string, newStatut: Statut) => {
    try {
      await fetch('/api/admin/devis', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ id, statut: newStatut }),
      });
      fetchDevis();
      fetchStats();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredDevis = devis.filter(d => 
    d.nom.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['Date', 'Établissement', 'Surface', 'Nuisibles', 'Urgence', 'Nom', 'Email', 'Téléphone', 'Statut'];
    const csvData = filteredDevis.map(d => [
      format(new Date(d.created_at), 'dd/MM/yyyy HH:mm'),
      d.etablissement,
      d.surface,
      d.nuisibles.join(', '),
      d.urgence,
      d.nom,
      d.email,
      d.telephone,
      d.statut,
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(';')).join('\n');
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `devis_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  const getStatutColor = (statut: string) => {
    switch(statut) {
      case 'nouveau': return 'bg-[#C6A75E]/20 text-[#C6A75E]';
      case 'traité': return 'bg-green-500/20 text-green-400';
      case 'archivé': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#E8DCC8] pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#C6A75E]/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-1 bg-[#C6A75E] rounded-full"></div>
            <h1 className="text-3xl font-bold text-[#1F2A44]">Tableau de bord</h1>
          </div>
          <p className="text-[#1F2A44]/60 ml-4">Gérez les demandes de devis</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl p-4 shadow-md border border-[#C6A75E]/10">
            <div className="flex items-center justify-between">
              <FileText className="text-[#C6A75E]" size={20} />
              <span className="text-2xl font-bold text-[#1F2A44]">{stats.total24h}</span>
            </div>
            <p className="text-[#1F2A44]/50 text-xs mt-2">Demandes 24h</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-[#C6A75E]/10">
            <div className="flex items-center justify-between">
              <Eye className="text-[#C6A75E]" size={20} />
              <span className="text-2xl font-bold text-[#1F2A44]">{stats.nouveau}</span>
            </div>
            <p className="text-[#1F2A44]/50 text-xs mt-2">Nouvelles</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-[#C6A75E]/10">
            <div className="flex items-center justify-between">
              <CheckCircle className="text-green-500" size={20} />
              <span className="text-2xl font-bold text-[#1F2A44]">{stats.traite}</span>
            </div>
            <p className="text-[#1F2A44]/50 text-xs mt-2">Traitées</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-[#C6A75E]/10">
            <div className="flex items-center justify-between">
              <Archive className="text-gray-500" size={20} />
              <span className="text-2xl font-bold text-[#1F2A44]">{stats.archive}</span>
            </div>
            <p className="text-[#1F2A44]/50 text-xs mt-2">Archivées</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md border border-[#C6A75E]/10 p-5 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1F2A44]/40" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher par nom ou email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#E8DCC8]/30 border border-[#C6A75E]/20 rounded-lg text-[#1F2A44] placeholder-[#1F2A44]/40 focus:outline-none focus:border-[#C6A75E] transition-colors"
                />
              </div>
            </div>
            
            <select
              value={statut}
              onChange={(e) => setStatut(e.target.value as Statut | 'tous')}
              className="px-4 py-2.5 bg-[#E8DCC8]/30 border border-[#C6A75E]/20 rounded-lg text-[#1F2A44] focus:outline-none focus:border-[#C6A75E] transition-colors"
            >
              <option value="tous">📋 Tous les statuts</option>
              <option value="nouveau">🆕 Nouveau</option>
              <option value="traité">✓ Traité</option>
              <option value="archivé">📦 Archivé</option>
            </select>
            
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#C6A75E] text-[#1F2A44] rounded-lg font-semibold hover:bg-[#B8963A] transition-all"
            >
              <Download size={16} />
              Export CSV
            </button>
            
            <button
              onClick={() => fetchDevis()}
              className="flex items-center gap-2 px-5 py-2.5 border border-[#C6A75E]/40 text-[#C6A75E] rounded-lg hover:bg-[#C6A75E]/10 transition-all"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Actualiser
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md border border-[#C6A75E]/10 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C6A75E]"></div>
            </div>
          ) : filteredDevis.length === 0 ? (
            <div className="text-center py-32">
              <FileText size={64} className="mx-auto text-[#1F2A44]/20 mb-4" />
              <p className="text-[#1F2A44]/50">Aucune demande trouvée</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#E8DCC8] border-b border-[#C6A75E]/20">
                  <tr>
                    <th className="px-6 py-5 text-left text-xs font-mono text-[#C6A75E] uppercase tracking-wider">Date</th>
                    <th className="px-6 py-5 text-left text-xs font-mono text-[#C6A75E] uppercase tracking-wider">Client / Établissement</th>
                    <th className="px-6 py-5 text-left text-xs font-mono text-[#C6A75E] uppercase tracking-wider">Détails</th>
                    <th className="px-6 py-5 text-left text-xs font-mono text-[#C6A75E] uppercase tracking-wider">Urgence</th>
                    <th className="px-6 py-5 text-left text-xs font-mono text-[#C6A75E] uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-5 text-left text-xs font-mono text-[#C6A75E] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C6A75E]/10">
                  {filteredDevis.map((devisItem, index) => (
                    <tr key={devisItem.id} className="hover:bg-[#E8DCC8]/30 transition-colors">
                      <td className="px-6 py-5">
                        <div className="text-[#1F2A44] text-sm font-mono">
                          {format(new Date(devisItem.created_at), 'dd/MM/yyyy', { locale: fr })}
                        </div>
                        <div className="text-[#1F2A44]/40 text-xs font-mono mt-1">
                          {format(new Date(devisItem.created_at), 'HH:mm', { locale: fr })}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-semibold text-[#1F2A44]">{devisItem.nom}</div>
                        <div className="text-sm text-[#1F2A44]/60">{devisItem.etablissement}</div>
                        <div className="text-xs text-[#1F2A44]/40 mt-1">{devisItem.email}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-[#1F2A44] text-sm">{devisItem.surface} m²</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {devisItem.nuisibles.slice(0, 2).map(n => (
                            <span key={n} className="px-2 py-0.5 bg-[#E8DCC8] text-[#1F2A44]/60 text-xs rounded-full">
                              {n}
                            </span>
                          ))}
                          {devisItem.nuisibles.length > 2 && (
                            <span className="px-2 py-0.5 bg-[#E8DCC8] text-[#1F2A44]/40 text-xs rounded-full">
                              +{devisItem.nuisibles.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono border ${
                          devisItem.urgence === 'Intervention sous 24h' ? 'border-red-500/20 text-red-500 bg-red-500/10' :
                          devisItem.urgence === 'Contrat annuel' ? 'border-blue-500/20 text-blue-500 bg-blue-500/10' :
                          'border-gray-500/20 text-gray-500 bg-gray-500/10'
                        }`}>
                          <Zap size={10} />
                          {devisItem.urgence === 'Intervention sous 24h' ? 'Urgence' : 
                           devisItem.urgence === 'Contrat annuel' ? 'Annuel' : 'Devis'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono ${getStatutColor(devisItem.statut)}`}>
                          {devisItem.statut === 'nouveau' ? '🆕 Nouveau' : 
                           devisItem.statut === 'traité' ? '✓ Traité' : '📦 Archivé'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <select
                          value={devisItem.statut}
                          onChange={(e) => handleStatutChange(devisItem.id, e.target.value as Statut)}
                          className="px-3 py-1.5 bg-[#E8DCC8]/50 border border-[#C6A75E]/20 rounded-lg text-[#1F2A44] text-sm focus:outline-none focus:border-[#C6A75E] cursor-pointer"
                        >
                          <option value="nouveau">🆕 Nouveau</option>
                          <option value="traité">✓ Traité</option>
                          <option value="archivé">📦 Archivé</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center px-6 py-5 border-t border-[#C6A75E]/20 bg-[#E8DCC8]/30">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-4 py-2 bg-white border border-[#C6A75E]/20 rounded-lg text-[#1F2A44]/60 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#C6A75E] transition-all"
              >
                <ChevronLeft size={14} />
                <span className="text-sm">Précédent</span>
              </button>
              <span className="text-[#1F2A44]/50 text-sm font-mono">
                Page {page} sur {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-4 py-2 bg-white border border-[#C6A75E]/20 rounded-lg text-[#1F2A44]/60 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#C6A75E] transition-all"
              >
                <span className="text-sm">Suivant</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
