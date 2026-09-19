import type { Metadata } from 'next';
import { Archivo, Instrument_Sans } from 'next/font/google';
import { CartDrawer } from '@/components/commerce/CartDrawer';
import { CartProvider } from '@/components/commerce/CartProvider';
import { FitGuideDrawer } from '@/components/fit/FitGuideDrawer';
import { FitGuideProvider } from '@/components/fit/FitGuideProvider';
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
  metadataBase: new URL('https://piuraswim.vercel.app'),
  title: {
    default: 'Piura Swim, Luxury Swimwear Designed in Miami, Crafted in Peru',
    template: '%s · Piura Swim',
  },
  description:
    'A love letter to the water. The Signature Triangle set and timeless, flattering swim, designed in Miami, crafted in Peru, the city of eternal heat.',
  icons: { icon: '/icon.svg' },
  openGraph: {
    siteName: 'Piura Swim',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrumentSans.variable}`}>
      <body>
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
      </body>
    </html>
  );
}
