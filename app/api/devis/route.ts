import { NextRequest, NextResponse } from 'next/server';
import { devisSchema, sanitizeInput } from '@/lib/validation';
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

    // Valider les données entrantes
    const body = await request.json();
    const validation = devisSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.errors },
        { status: 400 }
      );
    }

    // Sanitizer les données texte
    const sanitizedData = {
      ...validation.data,
      nom: sanitizeInput(validation.data.nom),
      email: validation.data.email.toLowerCase().trim(),
      telephone: sanitizeInput(validation.data.telephone),
      message: validation.data.message ? sanitizeInput(validation.data.message) : undefined,
    };

    // Générer un ID unique
    const id = randomUUID();
    
    // Stocker la soumission
    submissions.set(ip, [...recentSubmissions, now]);
    
    // Sauvegarder la demande (dans un vrai projet, ici on enverrait à Supabase)
    console.log('📝 Nouvelle demande de devis reçue:', {
      id,
      ...sanitizedData,
      ip,
      date: new Date().toISOString()
    });

    // Retourner la réponse
    return NextResponse.json({
      success: true,
      id: id,
      message: 'Votre demande a bien été enregistrée',
      devis: sanitizedData
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
