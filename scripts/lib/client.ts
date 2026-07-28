/**
 * Client Sanity con permessi di scrittura, condiviso dagli script di manutenzione.
 *
 * Questi script girano fuori da Next, che altrimenti si occuperebbe di leggere
 * `.env.local`: il caricamento va quindi fatto a mano.
 */
import { createClient } from '@sanity/client';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnvLocal(): void {
  const path = resolve(process.cwd(), '.env.local');
  if (!existsSync(path)) {
    throw new Error(
      'File .env.local non trovato.\n' +
        'Copia .env.local.example in .env.local e compila i valori del progetto Sanity.'
    );
  }

  for (const line of readFileSync(path, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    const value = trimmed
      .slice(eq + 1)
      .trim()
      .replace(/^["']|["']$/g, '');
    if (!(key in process.env)) process.env[key] = value;
  }
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Variabile d'ambiente mancante in .env.local: ${name}`);
  return value;
}

loadEnvLocal();

export const projectId = requireEnv('NEXT_PUBLIC_SANITY_PROJECT_ID');
export const dataset = requireEnv('NEXT_PUBLIC_SANITY_DATASET');

export const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-07-27',
  token: requireEnv('SANITY_API_WRITE_TOKEN'),
  useCdn: false,
});
