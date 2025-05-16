import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

declare global {
  interface Window {
    __track_sdk__: any;
  }
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://motyer.ca'),
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
    'author': 'Leona Motyer',
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
      <body className={inter.className}>
        {children}
        <Script id="tracking-script" strategy="afterInteractive">
          {`
            (function(siteId){
              window.__track_sdk__=window.__track_sdk__||{temp:[],report:function(){this.temp.push([].slice.call(arguments))},};
              (function(doc,tagName){
                var ele=doc.getElementsByTagName(tagName)[0];
                function onLoad(){
                  if(window.__track_sdk__){
                    window.__track_sdk__.setDefaultConfig({siteId:siteId,})
                  }
                }
                function insert(){
                  var s=document.createElement('script');
                  s.type='text/javascript';
                  s.async=true;
                  s.src='https://vr.leadsnavi.com/track-sdk.js';
                  s.onload=onLoad;
                  ele.parentNode.insertBefore(s,ele)
                }
                insert()
              })(document,'script')
            })('de698c2d1b7c475b9208d1461479f842');
          `}
        </Script>
      </body>
    </html>
  );
} 