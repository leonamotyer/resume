import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Leona Motyer - Portfolio',
  description: 'Platform Engineer, Software Developer Portfolio',
  openGraph: {
    title: 'Leona Motyer - Portfolio',
    description: 'Platform Engineer, Software Developer Portfolio',
    type: 'website',
    url: 'https://motyer.ca',
    siteName: 'Leona Motyer',
    locale: 'en_US',
    images: [
      {
        url: 'https://motyer.ca/bikeplane.jpg',
        width: 1200,
        height: 630,
        alt: 'Leona Motyer - Platform Engineer, Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leona Motyer - Portfolio',
    description: 'Platform Engineer, Software Developer Portfolio',
    images: ['https://motyer.ca/bikeplane.jpg'],
  },
  other: {
    'og:title': 'Leona Motyer - Portfolio',
    'og:description': 'Platform Engineer, Software Developer Portfolio',
    'og:type': 'website',
    'og:url': 'https://motyer.ca',
    'og:site_name': 'Leona Motyer',
    'og:image': 'https://motyer.ca/bikeplane.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Leona Motyer - Portfolio" />
        <meta property="og:description" content="Platform Engineer, Software Developer Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://motyer.ca" />
        <meta property="og:site_name" content="Leona Motyer" />
        <meta property="og:image" content="https://motyer.ca/bikeplane.jpg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
} 