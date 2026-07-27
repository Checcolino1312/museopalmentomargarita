/**
 * Import una volta sola dei contenuti locali su Sanity.
 *
 *   npm run sanity:import
 *
 * È idempotente: usa `_id` deterministici (es. `reperto-INV-001`), quindi
 * rieseguirlo sovrascrive i documenti invece di duplicarli. Attenzione: così
 * sovrascrive anche le modifiche fatte a mano nello Studio.
 *
 * Serve SANITY_API_WRITE_TOKEN in `.env.local`.
 */
import { createClient } from '@sanity/client';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';

import { toPortableText } from './lib/portable-text';
import { singletons, type ImagePlaceholder } from './seed-content';

// ─── Env ──────────────────────────────────────────────────────────────────────
// Caricato a mano: questo script gira fuori da Next, che altrimenti
// si occuperebbe di leggere .env.local.
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
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Variabile d'ambiente mancante in .env.local: ${name}`);
  return value;
}

const client = createClient({
  projectId: requireEnv('NEXT_PUBLIC_SANITY_PROJECT_ID'),
  dataset: requireEnv('NEXT_PUBLIC_SANITY_DATASET'),
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-07-27',
  token: requireEnv('SANITY_API_WRITE_TOKEN'),
  useCdn: false,
});

// ─── Immagini ─────────────────────────────────────────────────────────────────

type ImageValue = {
  _type: 'immagine';
  asset: { _type: 'reference'; _ref: string };
  alt?: string;
};

/** Evita di ricaricare lo stesso file più volte nella stessa esecuzione. */
const uploaded = new Map<string, string>();

async function uploadImage(relPath: string): Promise<string | null> {
  const cached = uploaded.get(relPath);
  if (cached) return cached;

  const absPath = resolve(process.cwd(), relPath);
  if (!existsSync(absPath)) {
    console.warn(`  ⚠ immagine non trovata, la salto: ${relPath}`);
    return null;
  }

  const asset = await client.assets.upload('image', createReadStream(absPath), {
    filename: basename(absPath),
  });

  uploaded.set(relPath, asset._id);
  return asset._id;
}

function isImagePlaceholder(value: unknown): value is ImagePlaceholder {
  return typeof value === 'object' && value !== null && '__image' in value;
}

/**
 * Sostituisce ricorsivamente i segnaposto `img(...)` con i riferimenti
 * agli asset caricati su Sanity.
 */
async function resolveImages<T>(node: T): Promise<T> {
  if (Array.isArray(node)) {
    return (await Promise.all(node.map((item) => resolveImages(item)))) as T;
  }

  if (isImagePlaceholder(node)) {
    const assetId = await uploadImage(node.__image);
    if (!assetId) return undefined as T;

    const value: ImageValue = {
      _type: 'immagine',
      asset: { _type: 'reference', _ref: assetId },
      alt: node.alt,
    };
    return value as unknown as T;
  }

  if (typeof node === 'object' && node !== null) {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node)) {
      const resolved = await resolveImages(value);
      if (resolved !== undefined) out[key] = resolved;
    }
    return out as T;
  }

  return node;
}

// ─── Reperti ──────────────────────────────────────────────────────────────────

type RepertoJson = {
  id: string;
  nome: string;
  epoca: string;
  provenienza: string;
  descrizione: string;
  noteTitolo: string;
  noteCorpo: string;
};

async function importReperti(): Promise<void> {
  const reperti: RepertoJson[] = JSON.parse(
    readFileSync(resolve(process.cwd(), 'public/data/reperti.json'), 'utf-8')
  );

  console.log(`\n▸ Reperti (${reperti.length})`);

  let senzaFoto = 0;

  for (const r of reperti) {
    const assetId = await uploadImage(`public/data/oggetti/${r.id}.jpg`);
    if (!assetId) senzaFoto++;

    await client.createOrReplace({
      _id: `reperto-${r.id}`,
      _type: 'reperto',
      inventoryId: r.id,
      nome: r.nome,
      epoca: r.epoca,
      provenienza: r.provenienza,
      descrizione: r.descrizione,
      noteTitolo: r.noteTitolo,
      noteCorpo: toPortableText(r.noteCorpo),
      ...(assetId
        ? {
            foto: {
              _type: 'immagine',
              asset: { _type: 'reference', _ref: assetId },
              alt: r.nome,
            },
          }
        : {}),
    });

    console.log(`  ✓ ${r.id} — ${r.nome}${assetId ? '' : ' (senza foto)'}`);
  }

  console.log(`  ${reperti.length} reperti importati, ${senzaFoto} senza foto.`);
}

// ─── Singleton ────────────────────────────────────────────────────────────────

async function importSingletons(): Promise<void> {
  console.log(`\n▸ Pagine e impostazioni (${singletons.length})`);

  for (const doc of singletons) {
    const resolved = await resolveImages(doc);
    await client.createOrReplace(resolved as Parameters<typeof client.createOrReplace>[0]);
    console.log(`  ✓ ${doc._id}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log(
    `Import su progetto ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}, ` +
      `dataset ${process.env.NEXT_PUBLIC_SANITY_DATASET}`
  );

  await importReperti();
  await importSingletons();

  console.log('\n✓ Import completato. Apri /studio per controllare i contenuti.');
}

main().catch((error: unknown) => {
  console.error('\n✗ Import interrotto:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
