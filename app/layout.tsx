import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter'
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: 'Désinfection & Dératisation Paris | Intervention 24h/24',
  description: 'Service professionnel de désinfection, dératisation et désinsectisation à Paris et Île-de-France. Devis gratuit et intervention rapide 24h/24.',
  keywords: 'désinfection, dératisation, paris, nuisibles, rats, cafards, punaises de lit',
  authors: [{ name: 'Dératisation Pro' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Dératisation Pro Paris',
    description: 'Experts en désinfection et dératisation 24h/24',
    type: 'website',
  },
};

// Séparer la configuration viewport (corrige l'avertissement)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} ${montserrat.variable}`}>
      <body className={`${inter.className} antialiased bg-[#0A0A0A]`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
