import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavLinks from '@/components/NavLinks';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'ServeTrack | Community Service Tracker',
    template: '%s | ServeTrack',
  },
  description:
    'Organize community service projects and track volunteer hours in one place.',
  openGraph: {
    title: 'ServeTrack',
    description:
      'Organize community service projects and track volunteer hours in one place.',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
        <a
          href="#main"
          className="sr-only rounded bg-white px-3 py-2 text-teal-800 focus:not-sr-only focus:absolute focus:left-2 focus:top-2"
        >
          Skip to main content
        </a>
        <Header userName={session?.user?.name ?? null} />
        <NavLinks signedIn={Boolean(session)} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
