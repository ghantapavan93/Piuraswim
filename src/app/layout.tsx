import type { Metadata } from 'next';
import { Archivo, Instrument_Sans } from 'next/font/google';
import Script from 'next/script';
import { CartDrawer } from '@/components/commerce/CartDrawer';
import { CartProvider } from '@/components/commerce/CartProvider';
import { FitGuideDrawer } from '@/components/fit/FitGuideDrawer';
import { FitGuideProvider } from '@/components/fit/FitGuideProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { BRAND, SITE_URL } from '@/data/site';
import { organizationJsonLd } from '@/lib/structured-data';
import './globals.css';

// Archivo carries the display voice: a wide grotesk with a true italic.
// Instrument Sans carries labels, body and interface text.
const archivo = Archivo({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name}, Luxury Swimwear Designed in Miami, Crafted in Peru`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    'A love letter to the water. The Signature Triangle set and timeless, flattering swim, designed in Miami, crafted in Peru, the city of eternal heat.',
  icons: { icon: '/icon.svg' },
  openGraph: {
    siteName: BRAND.name,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/images/piura/lifestyle/life-02.jpg', width: 1050, height: 1239, alt: 'Piura Swim at dusk' }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrumentSans.variable}`}>
      <body>
        {/* Marks the document as scripted before first paint so reveals can hide safely. */}
        <Script id="scripted" strategy="beforeInteractive">{`document.documentElement.setAttribute('data-js','')`}</Script>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <FitGuideProvider>
            {children}
            <CartDrawer />
            <FitGuideDrawer />
          </FitGuideProvider>
        </CartProvider>
        <RevealObserver />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
