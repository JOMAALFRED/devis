import { z } from 'zod';

const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

export const devisSchema = z.object({
  etablissement: z.enum(['Restaurant', 'Hôtel', 'Copropriété', 'Autre']),
  surface: z.number().min(10, 'Surface minimum 10m²').max(50000, 'Surface maximum 50000m²'),
  nuisibles: z.array(z.enum(['Rats', 'Cafards', 'Punaises de lit', 'Frelons', 'Autre'])).min(1, 'Sélectionnez au moins un nuisible'),
  urgence: z.enum(['Intervention sous 24h', 'Contrat annuel', 'Simple devis']),
  nom: z.string().min(2, 'Nom requis').max(100),
  email: z.string().email('Email invalide'),
  telephone: z.string().regex(phoneRegex, 'Format téléphone français invalide (ex: 0612345678)'),
  message: z.string().max(500, 'Message trop long (max 500 caractères)').optional(),
});

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '').trim().slice(0, 1000);
}
