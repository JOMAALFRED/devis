import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// Stockage temporaire en mémoire (pour la démo)
const submissions = new Map();

export async function POST(request: NextRequest) {
  try {
    // Simuler une petite latence réseau
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Récupérer l'IP du client
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Rate limiting simplifié pour la démo
    const now = Date.now();
    const userSubmissions = submissions.get(ip) || [];
    const recentSubmissions = userSubmissions.filter((time: number) => now - time < 3600000);
    
    if (recentSubmissions.length >= 3) {
      return NextResponse.json(
        { error: 'Trop de soumissions. Limite: 3/heure.' },
        { status: 429 }
      );
    }

    // Récupérer et valider les données
    const body = await request.json();
    
    // Validation simple
    const requiredFields = ['etablissement', 'surface', 'nuisibles', 'urgence', 'nom', 'email', 'telephone'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          { status: 400 }
        );
      }
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Validation téléphone français
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!phoneRegex.test(body.telephone)) {
      return NextResponse.json(
        { error: 'Téléphone français invalide' },
        { status: 400 }
      );
    }

    // Validation surface
    const surface = parseInt(body.surface);
    if (isNaN(surface) || surface < 10 || surface > 50000) {
      return NextResponse.json(
        { error: 'Surface invalide (min 10, max 50000)' },
        { status: 400 }
      );
    }

    // Générer un ID unique
    const id = randomUUID();
    
    // Stocker la soumission
    submissions.set(ip, [...recentSubmissions, now]);
    
    // Sauvegarder la demande (dans un vrai projet, on enverrait à Supabase)
    const devisData = {
      id,
      created_at: new Date().toISOString(),
      etablissement: body.etablissement,
      surface: surface,
      nuisibles: body.nuisibles,
      urgence: body.urgence,
      nom: body.nom,
      email: body.email.toLowerCase(),
      telephone: body.telephone,
      message: body.message || '',
      statut: 'nouveau',
      ip_address: ip
    };
    
    console.log('📝 Nouvelle demande de devis reçue:', devisData);

    // Retourner la réponse
    return NextResponse.json({
      success: true,
      id: id,
      message: 'Votre demande a bien été enregistrée'
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
