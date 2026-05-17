import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  
  if (!token || token !== 'token_admin_super_securise_123') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  // Données factices pour la démo
  return NextResponse.json({
    total24h: 12,
    nouveau: 5,
    traite: 4,
    archive: 3,
  });
}
