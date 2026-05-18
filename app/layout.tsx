import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://devis-gray.vercel.app'),
  title: {
    default: 'Dératisation Pro Paris | Désinfection 24h/24',
    template: '%s | Dératisation Pro'
  },
  description: 'Service professionnel de désinfection, dératisation et désinsectisation à Paris et Île-de-France. Intervention rapide 24h/24, 7j/7. Devis gratuit et sans engagement.',
  keywords: 'désinfection, dératisation, paris, nuisibles, rats, cafards, punaises de lit, frelons, désinsectisation, urgence',
  authors: [{ name: 'Dératisation Pro' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Dératisation Pro Paris - Devis Gratuit 24h/24',
    description: 'Experts en désinfection et dératisation à Paris.',
    url: 'https://devis-gray.vercel.app',
    siteName: 'Dératisation Pro',
    locale: 'fr_FR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#C6A75E' },
    { media: '(prefers-color-scheme: dark)', color: '#1F2A44' },
  ],
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} ${montserrat.variable} scroll-smooth`}>
      <body className={`${inter.className} antialiased bg-[#E8DCC8]`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
