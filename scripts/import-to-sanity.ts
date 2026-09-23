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
import { createReadStream, existsSync } from 'node:fs';
import { basename, resolve } from 'node:path';

import { client } from './lib/client';
import { addMissingKeys } from './lib/keys';
import { singletons, type ImagePlaceholder } from './seed-content';

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

// ─── Singleton ────────────────────────────────────────────────────────────────

async function importSingletons(): Promise<void> {
  console.log(`\n▸ Pagine e impostazioni (${singletons.length})`);

  for (const doc of singletons) {
    // `addMissingKeys`: gli array di `seed-content` sono scritti senza `_key`,
    // che invece Sanity richiede per ogni oggetto dentro un array.
    const resolved = addMissingKeys(await resolveImages(doc));
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

  await importSingletons();

  console.log('\n✓ Import completato. Apri /studio per controllare i contenuti.');
}

main().catch((error: unknown) => {
  console.error('\n✗ Import interrotto:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
