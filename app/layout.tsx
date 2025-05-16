import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Leona Motyer - Portfolio',
  description: 'Platform Engineer & Software Developer Portfolio',
  openGraph: {
    title: 'Leona Motyer - Portfolio',
    description: 'Platform Engineer & Software Developer Portfolio',
    type: 'website',
    url: 'https://motyer.ca',
    siteName: 'Leona Motyer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leona Motyer - Portfolio',
    description: 'Platform Engineer & Software Developer Portfolio',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
} 