import { NextRequest, NextResponse } from 'next/server';

// Données de démonstration
const devisList = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    etablissement: 'Restaurant Le Gourmet',
    surface: 180,
    nuisibles: ['Rats', 'Cafards'],
    urgence: 'Intervention sous 24h',
    nom: 'Jean Dupont',
    email: 'jean@example.com',
    telephone: '0612345678',
    statut: 'nouveau'
  },
  {
    id: '2',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    etablissement: 'Hôtel Plaza',
    surface: 1200,
    nuisibles: ['Punaises de lit'],
    urgence: 'Contrat annuel',
    nom: 'Marie Martin',
    email: 'marie@example.com',
    telephone: '0698765432',
    statut: 'traité'
  }
];

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  
  // Accepte le token par défaut
  if (!token || token !== 'token_admin_super_securise_123') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  return NextResponse.json({
    data: devisList,
    total: devisList.length,
    page: 1,
    totalPages: 1,
  });
}

export async function PATCH(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  
  if (!token || token !== 'token_admin_super_securise_123') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
