import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Désinfection & Dératisation Paris
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Service professionnel 24h/24, intervention rapide
          </p>
          <Link
            href="/devis"
            className="inline-block bg-blue-600 text-white text-lg px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </div>
    </div>
  );
}
