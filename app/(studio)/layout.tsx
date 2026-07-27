/**
 * Root layout dello Studio: volutamente separato da quello del sito.
 * Non importa globals.css né i font del museo, altrimenti interferirebbero
 * con l'interfaccia di Sanity.
 *
 * `metadata` e `viewport` stanno qui e non nella pagina perché la pagina è un
 * Client Component (deve esserlo: `sanity.config` usa API React lato client) e
 * i Client Component non possono esportare metadata.
 */
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
