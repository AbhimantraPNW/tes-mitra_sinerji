import type { Metadata } from 'next';
import { Poly } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const poly = Poly({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-poly',
});

export const metadata: Metadata = {
  title: 'Transaksi',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poly.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
