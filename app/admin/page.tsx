'use client';

import { useState, useEffect, useCallback } from 'react';
import { Devis, Statut } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function AdminPage() {
  const [devis, setDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);
  const [statut, setStatut] = useState<Statut | 'tous'>('tous');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({ total24h: 0, nouveau: 0, traite: 0, archive: 0 });

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
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      });
      
      if (!response.ok) throw new Error('Erreur de chargement');
      
      const data = await response.json();
      setDevis(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [page, statut]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Back-office - Demandes de devis
          </h1>
          <p className="text-gray-600 mt-2">Gérez les demandes de vos clients</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100">Demandes 24h</p>
                <p className="text-3xl font-bold mt-2">{stats.total24h}</p>
              </div>
              <span className="text-4xl">📊</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-yellow-100">Nouvelles</p>
                <p className="text-3xl font-bold mt-2">{stats.nouveau}</p>
              </div>
              <span className="text-4xl">🆕</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-100">Traitées</p>
                <p className="text-3xl font-bold mt-2">{stats.traite}</p>
              </div>
              <span className="text-4xl">✓</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-100">Archivées</p>
                <p className="text-3xl font-bold mt-2">{stats.archive}</p>
              </div>
              <span className="text-4xl">📦</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="🔍 Rechercher par nom ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            />
            <select
              value={statut}
              onChange={(e) => setStatut(e.target.value as Statut | 'tous')}
              className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            >
              <option value="tous">📋 Tous les statuts</option>
              <option value="nouveau">🆕 Nouveau</option>
              <option value="traité">✓ Traité</option>
              <option value="archivé">📦 Archivé</option>
            </select>
            <button
              onClick={exportCSV}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition"
            >
              📥 Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Établissement</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Nuisibles</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Urgence</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Nom</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Statut</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDevis.map((devisItem, index) => (
                    <tr key={devisItem.id} className={`border-b border-gray-100 hover:bg-purple-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {format(new Date(devisItem.created_at), 'dd/MM/yyyy HH:mm', { locale: fr })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">{devisItem.etablissement}</div>
                        <div className="text-xs text-gray-500">{devisItem.surface} m²</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {devisItem.nuisibles.map(n => (
                            <span key={n} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg">
                              {n}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          devisItem.urgence === 'Intervention sous 24h' ? 'bg-red-100 text-red-700' :
                          devisItem.urgence === 'Contrat annuel' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {devisItem.urgence}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">{devisItem.nom}</div>
                        <div className="text-xs text-gray-500">{devisItem.telephone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{devisItem.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          devisItem.statut === 'nouveau' ? 'bg-yellow-100 text-yellow-800' :
                          devisItem.statut === 'traité' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {devisItem.statut === 'nouveau' ? '🆕 Nouveau' : devisItem.statut === 'traité' ? '✓ Traité' : '📦 Archivé'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={devisItem.statut}
                          onChange={(e) => handleStatutChange(devisItem.id, e.target.value as Statut)}
                          className="px-3 py-1 border-2 border-gray-200 rounded-lg text-sm focus:border-purple-500 transition"
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
        </div>
      </div>
    </div>
  );
}
