'use client';

import { useState, useEffect, useCallback } from 'react';
import { Devis, Statut } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Download, Search, Filter, ChevronLeft, ChevronRight,
  Eye, CheckCircle, Archive, RefreshCw, TrendingUp,
  Users, FileText, Clock, Calendar, DollarSign,
  Star, Phone, Mail, MapPin, Building, Zap, Shield
} from 'lucide-react';

export default function AdminPage() {
  const [devis, setDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);
  const [statut, setStatut] = useState<Statut | 'tous'>('tous');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({ 
    total24h: 0, 
    nouveau: 0, 
    traite: 0, 
    archive: 0,
    total: 0,
    revenu: 0
  });
  const [selectedDevis, setSelectedDevis] = useState<Devis | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const getToken = () => {
    return 'token_admin_super_securise_123';
  };

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
    d.email.toLowerCase().includes(search.toLowerCase()) ||
    d.telephone?.includes(search)
  );

  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Établissement', 'Surface', 'Nuisibles', 'Urgence', 'Nom', 'Email', 'Téléphone', 'Statut', 'Message'];
    const csvData = filteredDevis.map(d => [
      d.id,
      format(new Date(d.created_at), 'dd/MM/yyyy HH:mm'),
      d.etablissement,
      d.surface,
      d.nuisibles.join(', '),
      d.urgence,
      d.nom,
      d.email,
      d.telephone,
      d.statut,
      d.message || ''
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(';')).join('\n');
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `devis_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`;
    link.click();
  };

  const getStatutConfig = (statut: string) => {
    switch(statut) {
      case 'nouveau':
        return { label: '🆕 Nouveau', bg: 'bg-[#C6A75E]/20 text-[#C6A75E]', icon: Eye };
      case 'traité':
        return { label: '✓ Traité', bg: 'bg-green-500/20 text-green-400', icon: CheckCircle };
      case 'archivé':
        return { label: '📦 Archivé', bg: 'bg-gray-500/20 text-gray-400', icon: Archive };
      default:
        return { label: statut, bg: 'bg-gray-500/20 text-gray-400', icon: FileText };
    }
  };

  const getUrgenceColor = (urgence: string) => {
    switch(urgence) {
      case 'Intervention sous 24h':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'Contrat annuel':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F2A44] to-[#2A3855] pt-24 pb-8">
      {/* Ajout d'un espacement en haut (pt-24) pour compenser le header fixe */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header avec séparateur visuel */}
        <div className="mb-10 pb-6 border-b border-[#C6A75E]/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-1 bg-[#C6A75E] rounded-full"></div>
            <h1 className="text-3xl font-black text-white font-serif-title">Tableau de bord</h1>
          </div>
          <p className="text-[#C6A75E]/60 font-mono text-sm ml-4">Gérez les demandes de devis</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
          <div className="bg-[#1F2A44] border border-[#C6A75E]/20 rounded-xl p-4 hover:shadow-lg transition-all group hover:border-[#C6A75E]/40">
            <div className="flex items-center justify-between">
              <FileText className="text-[#C6A75E] opacity-60 group-hover:opacity-100 transition" size={20} />
              <span className="text-2xl font-bold text-white font-serif-title">{stats.total || devis.length}</span>
            </div>
            <p className="text-white/40 text-xs font-mono mt-2">Total demandes</p>
          </div>
          
          <div className="bg-[#1F2A44] border border-[#C6A75E]/20 rounded-xl p-4 hover:shadow-lg transition-all group hover:border-[#C6A75E]/40">
            <div className="flex items-center justify-between">
              <Clock className="text-[#C6A75E] opacity-60 group-hover:opacity-100 transition" size={20} />
              <span className="text-2xl font-bold text-white font-serif-title">{stats.total24h || 0}</span>
            </div>
            <p className="text-white/40 text-xs font-mono mt-2">Dernières 24h</p>
          </div>
          
          <div className="bg-[#1F2A44] border border-[#C6A75E]/20 rounded-xl p-4 hover:shadow-lg transition-all group hover:border-[#C6A75E]/40">
            <div className="flex items-center justify-between">
              <Eye className="text-yellow-400 opacity-60 group-hover:opacity-100 transition" size={20} />
              <span className="text-2xl font-bold text-white font-serif-title">{stats.nouveau || 0}</span>
            </div>
            <p className="text-white/40 text-xs font-mono mt-2">Nouvelles</p>
          </div>
          
          <div className="bg-[#1F2A44] border border-[#C6A75E]/20 rounded-xl p-4 hover:shadow-lg transition-all group hover:border-[#C6A75E]/40">
            <div className="flex items-center justify-between">
              <CheckCircle className="text-green-400 opacity-60 group-hover:opacity-100 transition" size={20} />
              <span className="text-2xl font-bold text-white font-serif-title">{stats.traite || 0}</span>
            </div>
            <p className="text-white/40 text-xs font-mono mt-2">Traitées</p>
          </div>
          
          <div className="bg-[#1F2A44] border border-[#C6A75E]/20 rounded-xl p-4 hover:shadow-lg transition-all group hover:border-[#C6A75E]/40">
            <div className="flex items-center justify-between">
              <Archive className="text-gray-400 opacity-60 group-hover:opacity-100 transition" size={20} />
              <span className="text-2xl font-bold text-white font-serif-title">{stats.archive || 0}</span>
            </div>
            <p className="text-white/40 text-xs font-mono mt-2">Archivées</p>
          </div>
          
          <div className="bg-[#1F2A44] border border-[#C6A75E]/20 rounded-xl p-4 hover:shadow-lg transition-all group hover:border-[#C6A75E]/40">
            <div className="flex items-center justify-between">
              <TrendingUp className="text-[#C6A75E] opacity-60 group-hover:opacity-100 transition" size={20} />
              <span className="text-2xl font-bold text-white font-serif-title">+32%</span>
            </div>
            <p className="text-white/40 text-xs font-mono mt-2">Taux conversion</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#1F2A44] rounded-xl border border-[#C6A75E]/20 p-5 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher par nom, email ou téléphone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#2A3855] border border-[#C6A75E]/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#C6A75E] transition-colors"
                />
              </div>
            </div>
            
            <select
              value={statut}
              onChange={(e) => setStatut(e.target.value as Statut | 'tous')}
              className="px-4 py-2.5 bg-[#2A3855] border border-[#C6A75E]/20 rounded-lg text-white focus:outline-none focus:border-[#C6A75E] transition-colors"
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
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            
            <button
              onClick={() => fetchDevis()}
              className="flex items-center gap-2 px-5 py-2.5 border border-[#C6A75E]/40 text-[#C6A75E] rounded-lg hover:bg-[#C6A75E]/10 transition-all"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Actualiser</span>
            </button>
          </div>
        </div>

        {/* Table/Cards View */}
        <div className="bg-[#1F2A44] rounded-xl border border-[#C6A75E]/20 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C6A75E]"></div>
            </div>
          ) : filteredDevis.length === 0 ? (
            <div className="text-center py-32">
              <FileText size={64} className="mx-auto text-white/20 mb-4" />
              <p className="text-white/40">Aucune demande trouvée</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#2A3855] border-b border-[#C6A75E]/20">
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
                  {filteredDevis.map((devisItem) => {
                    const StatutIcon = getStatutConfig(devisItem.statut).icon;
                    return (
                      <tr key={devisItem.id} className="hover:bg-[#2A3855]/30 transition-colors">
                        <td className="px-6 py-5">
                          <div className="text-white text-sm font-mono">
                            {format(new Date(devisItem.created_at), 'dd/MM/yyyy', { locale: fr })}
                          </div>
                          <div className="text-white/40 text-xs font-mono mt-1">
                            {format(new Date(devisItem.created_at), 'HH:mm', { locale: fr })}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="font-semibold text-white">{devisItem.nom}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <Building size={12} className="text-[#C6A75E]" />
                            <span className="text-white/60 text-xs">{devisItem.etablissement}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Mail size={12} className="text-[#C6A75E]" />
                            <span className="text-white/40 text-xs">{devisItem.email}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Phone size={12} className="text-[#C6A75E]" />
                            <span className="text-white/40 text-xs">{devisItem.telephone}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-white text-sm">{devisItem.surface} m²</div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {devisItem.nuisibles.slice(0, 2).map(n => (
                              <span key={n} className="px-2 py-0.5 bg-[#2A3855] text-white/60 text-xs rounded-full">
                                {n}
                              </span>
                            ))}
                            {devisItem.nuisibles.length > 2 && (
                              <span className="px-2 py-0.5 bg-[#2A3855] text-white/40 text-xs rounded-full">
                                +{devisItem.nuisibles.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono border ${getUrgenceColor(devisItem.urgence)}`}>
                            <Zap size={10} />
                            {devisItem.urgence === 'Intervention sous 24h' ? 'Urgence' : 
                             devisItem.urgence === 'Contrat annuel' ? 'Annuel' : 'Devis'}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono ${getStatutConfig(devisItem.statut).bg}`}>
                            <StatutIcon size={12} />
                            {getStatutConfig(devisItem.statut).label}
                          </span>
                         </td>
                        <td className="px-6 py-5">
                          <div className="flex gap-2">
                            <select
                              value={devisItem.statut}
                              onChange={(e) => handleStatutChange(devisItem.id, e.target.value as Statut)}
                              className="px-3 py-1.5 bg-[#2A3855] border border-[#C6A75E]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A75E] cursor-pointer"
                            >
                              <option value="nouveau">🆕 Nouveau</option>
                              <option value="traité">✓ Traité</option>
                              <option value="archivé">📦 Archivé</option>
                            </select>
                          </div>
                         </td>
                       </tr>
                    );
                  })}
                </tbody>
               </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center px-6 py-5 border-t border-[#C6A75E]/20 bg-[#2A3855]">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-4 py-2 bg-[#1F2A44] border border-[#C6A75E]/20 rounded-lg text-white/60 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#C6A75E] transition-all"
              >
                <ChevronLeft size={14} />
                <span className="text-sm">Précédent</span>
              </button>
              <span className="text-white/40 text-sm font-mono">
                Page {page} sur {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-4 py-2 bg-[#1F2A44] border border-[#C6A75E]/20 rounded-lg text-white/60 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#C6A75E] transition-all"
              >
                <span className="text-sm">Suivant</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal détails */}
      {isModalOpen && selectedDevis && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1F2A44] rounded-xl max-w-2xl w-full max-h-[80vh] overflow-auto border border-[#C6A75E]/20">
            <div className="sticky top-0 bg-[#1F2A44] border-b border-[#C6A75E]/20 p-5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white font-serif-title">Détails de la demande</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/60 hover:text-white transition-colors text-xl">✕</button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/40 text-xs font-mono mb-1 uppercase tracking-wider">Nom</label>
                  <p className="text-white font-medium">{selectedDevis.nom}</p>
                </div>
                <div>
                  <label className="block text-white/40 text-xs font-mono mb-1 uppercase tracking-wider">Email</label>
                  <p className="text-white">{selectedDevis.email}</p>
                </div>
                <div>
                  <label className="block text-white/40 text-xs font-mono mb-1 uppercase tracking-wider">Téléphone</label>
                  <p className="text-white">{selectedDevis.telephone}</p>
                </div>
                <div>
                  <label className="block text-white/40 text-xs font-mono mb-1 uppercase tracking-wider">Établissement</label>
                  <p className="text-white">{selectedDevis.etablissement} - {selectedDevis.surface} m²</p>
                </div>
                <div>
                  <label className="block text-white/40 text-xs font-mono mb-1 uppercase tracking-wider">Nuisibles</label>
                  <div className="flex flex-wrap gap-1">
                    {selectedDevis.nuisibles.map(n => (
                      <span key={n} className="px-2 py-1 bg-[#2A3855] text-white/80 text-xs rounded-full">{n}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-white/40 text-xs font-mono mb-1 uppercase tracking-wider">Urgence</label>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono border ${getUrgenceColor(selectedDevis.urgence)}`}>
                    <Zap size={10} />
                    {selectedDevis.urgence}
                  </span>
                </div>
              </div>
              {selectedDevis.message && (
                <div>
                  <label className="block text-white/40 text-xs font-mono mb-1 uppercase tracking-wider">Message</label>
                  <p className="text-white bg-[#2A3855] p-4 rounded-lg leading-relaxed">{selectedDevis.message}</p>
                </div>
              )}
              <div className="pt-4 border-t border-[#C6A75E]/10">
                <label className="block text-white/40 text-xs font-mono mb-1 uppercase tracking-wider">Date de création</label>
                <p className="text-white/60 text-sm">
                  {format(new Date(selectedDevis.created_at), 'dd/MM/yyyy à HH:mm', { locale: fr })}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
