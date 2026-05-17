import { NextRequest, NextResponse } from 'next/server';

// Stockage en mémoire pour la démo (dans un vrai projet, utilisez Supabase)
let devisList: any[] = [
  {
    id: 'demo-1',
    created_at: new Date().toISOString(),
    etablissement: 'Restaurant Le Gourmet',
    surface: 180,
    nuisibles: ['Rats', 'Cafards'],
    urgence: 'Intervention sous 24h',
    nom: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    telephone: '0612345678',
    message: 'Problème de rats en cuisine, urgence',
    statut: 'nouveau'
  },
  {
    id: 'demo-2',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    etablissement: 'Hôtel Plaza',
    surface: 1200,
    nuisibles: ['Punaises de lit'],
    urgence: 'Contrat annuel',
    nom: 'Marie Lambert',
    email: 'marie@hotelplaza.com',
    telephone: '0698765432',
    message: 'Demande de contrat annuel pour hôtel',
    statut: 'traité'
  },
  {
    id: 'demo-3',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    etablissement: 'Copropriété Les Cedres',
    surface: 3500,
    nuisibles: ['Frelons'],
    urgence: 'Simple devis',
    nom: 'Pierre Martin',
    email: 'pierre.martin@copropriete.fr',
    telephone: '0787654321',
    message: 'Nid de frelons dans les combles',
    statut: 'archivé'
  }
];

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    
    if (!token || token !== 'token_admin_super_securise_123') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const statut = searchParams.get('statut');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;
    
    let filteredDevis = [...devisList];
    
    if (statut && statut !== 'tous') {
      filteredDevis = filteredDevis.filter(d => d.statut === statut);
    }
    
    const start = (page - 1) * limit;
    const paginatedDevis = filteredDevis.slice(start, start + limit);
    
    return NextResponse.json({
      data: paginatedDevis,
      total: filteredDevis.length,
      page: page,
      totalPages: Math.ceil(filteredDevis.length / limit),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    
    if (!token || token !== 'token_admin_super_securise_123') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { id, statut } = await request.json();
    
    const devisIndex = devisList.findIndex(d => d.id === id);
    if (devisIndex === -1) {
      return NextResponse.json({ error: 'Devis non trouvé' }, { status: 404 });
    }
    
    devisList[devisIndex].statut = statut;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
