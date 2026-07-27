'use client';

/**
 * Sanity Studio incorporato nel sito, su /studio.
 * La rotta è catch-all perché lo Studio gestisce la propria navigazione interna.
 *
 * `'use client'` è necessario: `sanity.config` importa l'interfaccia dello Studio,
 * che usa `createContext` e altre API React non disponibili nel build server.
 * Per lo stesso motivo `metadata` e `viewport` stanno nel layout.
 */
import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
