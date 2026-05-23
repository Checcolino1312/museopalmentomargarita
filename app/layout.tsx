import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const poligrapher = localFont({
  src: [
    { path: '../public/brand/fonts/poligraphergrotesk-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/brand/fonts/poligraphergrotesk-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/brand/fonts/poligraphergrotesk-MediumItalic.ttf', weight: '500', style: 'italic' },
    { path: '../public/brand/fonts/poligraphergrotesk-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../public/brand/fonts/poligraphergrotesk-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../public/brand/fonts/poligraphergrotesk-ExtraBold.ttf', weight: '800', style: 'normal' },
  ],
  variable: '--font-poligrapher',
  display: 'swap',
});

const ibmMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Museo Palmento Margarita — Francavilla Fontana',
  description:
    'Un viaggio nella storia del vino, nelle tradizioni agricole e nella vita quotidiana delle comunità rurali pugliesi.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${poligrapher.variable} ${ibmMono.variable}`}>
      <head>
        <style>{`
          :root {
            --font-display: var(--font-poligrapher), "Helvetica Neue", Helvetica, Arial, sans-serif;
            --font-body: var(--font-poligrapher), "Helvetica Neue", Helvetica, Arial, sans-serif;
            --font-mono: var(--font-ibm-mono), ui-monospace, "SFMono-Regular", Menlo, monospace;
          }
        `}</style>
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
