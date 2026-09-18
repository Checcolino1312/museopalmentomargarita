/**
 * Carica gli acquerelli del museo e li assegna a tutte le sezioni del sito.
 *
 *   npm run sanity:immagini              # anteprima
 *   npm run sanity:immagini -- --apply
 *
 * Le immagini sono meno degli spazi disponibili, quindi qualcuna ricorre su
 * pagine diverse. La distribuzione qui sotto garantisce però che **nessuna
 * immagine compaia due volte nella stessa pagina**, e accosta a ogni sezione
 * quella che le corrisponde per contenuto: il palmento accanto al testo sul
 * palmento, la Via Appia accanto a quello sulla località.
 *
 * Rieseguirlo ricarica le immagini da zero: si ottengono asset nuovi e i
 * precedenti restano nella libreria, non più referenziati.
 */
import { createReadStream } from 'node:fs';
import { basename, resolve } from 'node:path';

import { client, dataset, projectId } from './lib/client';

type Immagini = Record<string, string>;

const SORGENTI = {
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
  palmento: {
    file: 'public/immagini/palmento.png',
    alt: 'Il palmento: la vasca di pigiatura in legno e il canale per il mosto',
  },
  vendemmia: {
    file: 'public/immagini/vendemmia.png',
    alt: 'Contadini durante la vendemmia, fra vigneto e uliveto',
  },
  viaAppia: {
    file: 'public/immagini/via-appia.png',
    alt: "Antica strada lastricata fra vigneto e uliveto, verso la masseria",
  },
  abiti: {
    file: 'public/immagini/abiti.png',
    alt: "Sala a volte del museo con abiti d'epoca, cassapanca e ceramiche",
  },
} satisfies Record<string, { file: string; alt: string }>;

type Nome = keyof typeof SORGENTI;

/** Chi va dove. Nessun nome si ripete all'interno della stessa pagina. */
const ASSEGNAZIONE = {
  home: {
    hero: 'masseria',
    introduzione: 'damigiane', // verticale, per la colonna stretta
    galleria: ['abiti', 'cucina', 'vendemmia'],
    mission: 'viaAppia',
  },
  storia: {
    hero: 'vigneto',
    sezioni: ['masseria', 'palmento', 'viaAppia'], // nome · palmento · località
    citazione: 'cucina',
  },
  percorsi: {
    hero: 'vendemmia',
    oltre: 'palmento',
  },
} as const;

/**
 * Carica un file, riprovando se la connessione cade.
 *
 * Gli acquerelli pesano qualche megabyte l'uno e la rete lascia cadere la
 * connessione a metà più spesso di quanto si creda (`ECONNRESET`). Senza
 * tentativi ripetuti l'intero script si interrompe per un singolo intoppo,
 * lasciando i documenti aggiornati a metà.
 *
 * Lo stream va ricreato a ogni tentativo: uno stream già consumato non si
 * rilegge, e riusarlo caricherebbe un file vuoto.
 */
async function caricaConTentativi(percorso: string, tentativi = 4): Promise<string> {
  for (let n = 1; ; n++) {
    try {
      const asset = await client.assets.upload('image', createReadStream(percorso), {
        filename: basename(percorso),
      });
      return asset._id;
    } catch (errore) {
      if (n >= tentativi) throw errore;
      const attesa = n * 2000;
      const motivo = errore instanceof Error ? errore.message : String(errore);
      console.log(`    tentativo ${n} non riuscito (${motivo}), riprovo fra ${attesa / 1000}s`);
      await new Promise((r) => setTimeout(r, attesa));
    }
  }
}

async function caricaTutte(): Promise<Immagini> {
  const caricate: Immagini = {};

  for (const [nome, { file }] of Object.entries(SORGENTI)) {
    caricate[nome] = await caricaConTentativi(resolve(process.cwd(), file));
    console.log(`  ✓ ${nome}`);
  }

  return caricate;
}

/** Valore del campo `immagine` a partire dal nome logico. */
function img(caricate: Immagini, nome: Nome) {
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

  console.log(`\n${Object.keys(SORGENTI).length} immagini, distribuite così:`);
  for (const [pagina, slot] of Object.entries(ASSEGNAZIONE)) {
    const righe = Object.entries(slot).map(
      ([dove, chi]) => `${dove}=${Array.isArray(chi) ? chi.join('/') : chi}`
    );
    console.log(`  ${pagina.padEnd(9)} ${righe.join(' · ')}`);
  }

  if (!apply) {
    console.log('\nRilancia con --apply per scrivere.');
    return;
  }

  console.log('\n▸ Caricamento');
  const c = await caricaTutte();

  console.log('\n▸ Assegnazione');

  const { home, storia, percorsi } = ASSEGNAZIONE;

  await client
    .patch('homePage')
    .set({
      heroImmagine: img(c, home.hero),
      'introduzione.immagine': img(c, home.introduzione),
      'mission.immagine': img(c, home.mission),
      galleria: {
        immagini: home.galleria.map((nome, i) => ({
          ...img(c, nome),
          // `_key`: Sanity lo richiede per ogni elemento di un array.
          _key: `gal${i}`,
        })),
        caption: 'Il palmento di Francavilla Fontana · XVI–XIX sec.',
      },
    })
    // Il mosaico a tre riquadri non esiste più nello schema.
    .unset(['mosaico'])
    .commit();
  console.log('  ✓ homePage');

  const sezioni = await client.fetch<{ _key: string }[] | null>(
    '*[_id == "storiaPage"][0].sezioni[]{_key}'
  );

  const patchStoria = client.patch('storiaPage').set({
    'hero.immagine': img(c, storia.hero),
    pullQuoteImmagine: img(c, storia.citazione),
  });
  (sezioni ?? []).forEach((s, i) => {
    const nome = storia.sezioni[i];
    if (nome) patchStoria.set({ [`sezioni[_key=="${s._key}"].immagine`]: img(c, nome) });
  });
  await patchStoria.commit();
  console.log('  ✓ storiaPage');

  await client
    .patch('percorsiPage')
    .set({
      heroImmagine: img(c, percorsi.hero),
      oltreImmagine: img(c, percorsi.oltre),
    })
    .commit();
  console.log('  ✓ percorsiPage');

  console.log('\n✓ Fatto. Controlla su /studio o sul sito.');
}

main().catch((error: unknown) => {
  console.error('\n✗ Interrotto:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
