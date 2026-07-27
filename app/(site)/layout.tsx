import type { Metadata } from 'next';
import { IBM_Plex_Mono, Cormorant_Garamond } from 'next/font/google';
import localFont from 'next/font/local';
import '../globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { sanityFetch } from '@/lib/sanity-fetch';
import { siteSettingsQuery, TAGS } from '@/lib/queries';
import type { SiteSettings } from '@/lib/types';

/**
 * Letto sia da `generateMetadata` che dal layout: le due chiamate condividono
 * la cache di Next, quindi la query parte una volta sola.
 */
function getSiteSettings() {
  return sanityFetch<SiteSettings | null>(siteSettingsQuery, {}, [TAGS.siteSettings]);
}

const poligrapher = localFont({
  src: [
    { path: '../../public/brand/fonts/poligraphergrotesk-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/brand/fonts/poligraphergrotesk-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/brand/fonts/poligraphergrotesk-MediumItalic.ttf', weight: '500', style: 'italic' },
    { path: '../../public/brand/fonts/poligraphergrotesk-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/brand/fonts/poligraphergrotesk-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../../public/brand/fonts/poligraphergrotesk-ExtraBold.ttf', weight: '800', style: 'normal' },
  ],
  variable: '--font-poligrapher',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-cormorant',
  display: 'swap',
});

const ibmMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-mono',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `${settings?.titolo ?? 'Museo Palmento Margarita'} — Francavilla Fontana`,
    description: settings?.descrizione,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <html lang="it" className={`${poligrapher.variable} ${cormorant.variable} ${ibmMono.variable}`}>
      <head>
        <style>{`
          :root {
            --font-display: var(--font-cormorant), "Cormorant Garamond", Georgia, "Times New Roman", serif;
            --font-body: var(--font-cormorant), "Cormorant Garamond", Georgia, serif;
            --font-mono: var(--font-ibm-mono), ui-monospace, "SFMono-Regular", Menlo, monospace;
          }
        `}</style>
      </head>
      <body>
        <SiteHeader settings={settings} />
        {children}
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
