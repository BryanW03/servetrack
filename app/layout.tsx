import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavLinks from '@/components/NavLinks';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  title: 'ServeTrack',
  description: 'Community service project and volunteer hour tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
        <Header />
        <NavLinks />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
