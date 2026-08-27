/**
 * Carica gli acquerelli del museo e li assegna a tutte le sezioni del sito,
 * sostituendo le fotografie precedenti.
 *
 *   npm run sanity:immagini              # anteprima
 *   npm run sanity:immagini -- --apply
 *
 * Le quattro immagini sono meno degli spazi disponibili, quindi qualcuna
 * ricorre più volte. L'assegnazione qui sotto evita che la stessa immagine
 * compaia due volte nella stessa pagina — tranne che come sfondo di una
 * citazione, dove il velo scuro la rende comunque diversa a vedersi.
 */
import { createReadStream } from 'node:fs';
import { basename, resolve } from 'node:path';

import { client, dataset, projectId } from './lib/client';

type Immagini = Record<string, string>;

const SORGENTI: Record<string, { file: string; alt: string }> = {
  masseria: {
    file: 'public/immagini/masseria.png',
    alt: 'La masseria Margarita in pietra, con il vigneto accanto',
  },
  vigneto: {
    file: 'public/immagini/vigneto.jpg',
    alt: 'Filari di vigneto nella campagna pugliese',
  },
  damigiane: {
    file: 'public/immagini/damigiane.png',
    alt: 'Damigiane in vetro verde in una stanza in pietra',
  },
  cucina: {
    file: 'public/immagini/cucina.png',
    alt: 'La cucina del museo con focolare, ceste e utensili in rame',
  },
};

async function caricaTutte(): Promise<Immagini> {
  const caricate: Immagini = {};

  for (const [nome, { file }] of Object.entries(SORGENTI)) {
    const percorso = resolve(process.cwd(), file);
    const asset = await client.assets.upload('image', createReadStream(percorso), {
      filename: basename(percorso),
    });
    caricate[nome] = asset._id;
    console.log(`  ✓ ${nome} → ${asset._id}`);
  }

  return caricate;
}

/** Valore del campo `immagine` a partire dal nome logico. */
function img(caricate: Immagini, nome: keyof typeof SORGENTI) {
  return {
    _type: 'immagine',
    alt: SORGENTI[nome].alt,
    asset: { _type: 'reference', _ref: caricate[nome] },
  };
}

async function main(): Promise<void> {
  const apply = process.argv.includes('--apply');

  console.log(
    `Progetto ${projectId}, dataset ${dataset} — ` +
      (apply ? 'carico e assegno' : 'anteprima (nessuna scrittura)')
  );

  if (!apply) {
    console.log('\nCaricherei 4 immagini e le assegnerei a:');
    console.log('  home     hero=masseria · mosaico=cucina/damigiane/vigneto · mission=vigneto');
    console.log('  storia   hero=vigneto · sezioni=masseria/damigiane/vigneto · citazione=cucina');
    console.log('  percorsi hero=cucina · oltre=vigneto');
    console.log('\nRilancia con --apply per scrivere.');
    return;
  }

  console.log('\n▸ Caricamento');
  const c = await caricaTutte();

  console.log('\n▸ Assegnazione');

  // Home: la masseria apre, le altre tre riempiono il mosaico.
  await client
    .patch('homePage')
    .set({
      heroImmagine: img(c, 'masseria'),
      'mosaico.immagineGrande': img(c, 'cucina'),
      'mosaico.immagineAlta': img(c, 'damigiane'),
      'mosaico.immagineQuadrata': img(c, 'vigneto'),
      'introduzione.immagine': img(c, 'damigiane'),
      'mission.immagine': img(c, 'vigneto'),
    })
    .commit();
  console.log('  ✓ homePage');

  // Storia: ogni sezione prende l'immagine che le corrisponde per contenuto.
  const sezioni = await client.fetch<{ _key: string }[] | null>(
    '*[_id == "storiaPage"][0].sezioni[]{_key}'
  );
  const perSezione = ['masseria', 'damigiane', 'vigneto'] as const;

  const patchStoria = client.patch('storiaPage').set({
    'hero.immagine': img(c, 'vigneto'),
    pullQuoteImmagine: img(c, 'cucina'),
  });
  (sezioni ?? []).forEach((s, i) => {
    const nome = perSezione[i];
    if (nome) patchStoria.set({ [`sezioni[_key=="${s._key}"].immagine`]: img(c, nome) });
  });
  await patchStoria.commit();
  console.log('  ✓ storiaPage');

  await client
    .patch('percorsiPage')
    .set({ heroImmagine: img(c, 'cucina'), oltreImmagine: img(c, 'vigneto') })
    .commit();
  console.log('  ✓ percorsiPage');

  console.log('\n✓ Fatto. Le immagini precedenti non sono più usate da nessuna pagina.');
}

main().catch((error: unknown) => {
  console.error('\n✗ Interrotto:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
