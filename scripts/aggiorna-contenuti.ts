/**
 * Carica su Sanity i testi consegnati dalla proprietaria.
 *
 *   npm run sanity:contenuti              # anteprima, non scrive nulla
 *   npm run sanity:contenuti -- --apply
 *
 * Scrive campo per campo con `patch().set()`, mai `createOrReplace`: tocca solo
 * ciò che è elencato qui e lascia intatto tutto il resto del documento.
 *
 * ATTENZIONE: i testi di storia e contatti vengono *sostituiti*. Eventuali
 * modifiche fatte a mano nello Studio su quei campi vanno perse. L'anteprima
 * serve a rendersene conto prima di scrivere.
 */
import { client, dataset, projectId } from './lib/client';
import { addMissingKeys } from './lib/keys';
import { toPortableText } from './lib/portable-text';
import {
  contatti,
  homeIntroduzione,
  homeMission,
  homeVisita,
  impostazioni,
  percorsi,
  storiaSezioni,
} from './contenuti-nuovi';

type Campi = Record<string, unknown>;
type Modifica = { tipo: string; campi: Campi };

/**
 * Documenti che devono esistere prima di poterli modificare.
 * `patch()` fallisce su un documento inesistente, e `percorsiPage` e
 * `popupEvento` sono tipi nuovi: nel dataset non c'è ancora nulla.
 */
const DA_CREARE: Record<string, string> = {
  homePage: 'homePage',
  storiaPage: 'storiaPage',
  percorsiPage: 'percorsiPage',
  contattiPage: 'contattiPage',
  siteSettings: 'siteSettings',
  // Creato vuoto e spento; i suoi campi non vengono mai sovrascritti da questo
  // script, così un pop-up acceso dalla proprietaria non si spegne da solo.
  popupEvento: 'popupEvento',
};

/**
 * Campi rimossi dallo schema, da cancellare anche dai documenti.
 * Lasciarli renderebbe lo Studio pieno di avvisi «campo non previsto».
 */
const DA_CANCELLARE: Record<string, string[]> = {
  storiaPage: ['timeline', 'timelineTitolo'],
  percorsiPage: ['attivita'],
  // `pullQuote`: la citazione «Cinquantanove oggetti…» è stata rimossa dalla
  // home. `mosaico`: sostituito dalla galleria a celle uguali.
  homePage: ['visita.titoloOrari', 'pullQuote', 'mosaico'],
};

/** Immagini già presenti nelle sezioni della storia, per posizione. */
async function immaginiStoriaEsistenti(): Promise<unknown[]> {
  const sezioni = await client.fetch<{ immagine?: unknown }[] | null>(
    '*[_id == "storiaPage"][0].sezioni[]{immagine}'
  );
  return (sezioni ?? []).map((s) => s?.immagine);
}

async function raccogliModifiche(): Promise<Map<string, Modifica>> {
  const modifiche = new Map<string, Modifica>();

  // ── Home ──
  modifiche.set('homePage', {
    tipo: 'homePage',
    campi: {
      introduzione: {
        titolo: homeIntroduzione.titolo,
        apribile: homeIntroduzione.apribile,
        testo: toPortableText(homeIntroduzione.testo),
      },
      mission: {
        titolo: homeMission.titolo,
        citazione: homeMission.citazione,
        testo: toPortableText(homeMission.testo),
      },
      visita: homeVisita,
    },
  });

  // ── Storia ──
  // Le sezioni sono sostituite, ma le fotografie già caricate vengono
  // riagganciate per posizione: rifarle sarebbe una perdita inutile.
  const immagini = await immaginiStoriaEsistenti();
  modifiche.set('storiaPage', {
    tipo: 'storiaPage',
    campi: {
      sezioni: storiaSezioni.map((s, i) => ({
        _type: 'sezione',
        titolo: s.titolo,
        layout: s.layout,
        apribile: s.apribile,
        testo: toPortableText(s.testo),
        ...(immagini[i] ? { immagine: immagini[i] } : {}),
      })),
    },
  });

  // ── Percorsi ──
  modifiche.set('percorsiPage', {
    tipo: 'percorsiPage',
    campi: {
      label: percorsi.label,
      titolo: percorsi.titolo,
      intro: toPortableText(percorsi.intro),
      attivitaTitolo: percorsi.attivitaTitolo,
      attivitaIntro: toPortableText(percorsi.attivitaIntro),
      gruppiAttivita: percorsi.gruppiAttivita.map((g) => ({
        _type: 'gruppoAttivita',
        titolo: g.titolo,
        voci: g.voci,
      })),
      oltreTitolo: percorsi.oltreTitolo,
      oltreTesto: toPortableText(percorsi.oltreTesto),
    },
  });

  // ── Contatti ──
  modifiche.set('contattiPage', {
    tipo: 'contattiPage',
    campi: {
      label: contatti.label,
      titolo: contatti.titolo,
      intro: toPortableText(contatti.intro),
      orariTitolo: contatti.orariTitolo,
      contattaciTitolo: contatti.contattaciTitolo,
      contattaciVoci: contatti.contattaciVoci,
      chiusura: contatti.chiusura,
    },
  });

  // ── Impostazioni ──
  modifiche.set('siteSettings', {
    tipo: 'siteSettings',
    campi: {
      whatsapp: impostazioni.whatsapp,
      orari: impostazioni.orari,
      nav: impostazioni.nav,
      footerScopri: impostazioni.footerScopri,
      copyright: impostazioni.copyright,
    },
  });

  return modifiche;
}

/** Riassunto leggibile di un valore, per l'anteprima. */
function riassumi(valore: unknown): string {
  if (Array.isArray(valore)) return `${valore.length} elementi`;
  if (valore && typeof valore === 'object') return 'oggetto';
  const testo = String(valore);
  return testo.length > 60 ? `«${testo.slice(0, 57)}…»` : `«${testo}»`;
}

async function main(): Promise<void> {
  const apply = process.argv.includes('--apply');

  console.log(
    `Progetto ${projectId}, dataset ${dataset} — ` +
      (apply ? 'applico i contenuti' : 'anteprima (nessuna scrittura)')
  );

  const modifiche = await raccogliModifiche();

  if (apply) {
    // I documenti devono esistere prima della patch. `createIfNotExists` non
    // tocca quelli già presenti, quindi è sicuro rieseguirlo.
    for (const [id, tipo] of Object.entries(DA_CREARE)) {
      await client.createIfNotExists({ _id: id, _type: tipo });
    }
  }

  for (const [id, { campi }] of modifiche) {
    console.log(`\n▸ ${id}`);
    for (const [campo, valore] of Object.entries(campi)) {
      console.log(`    ${campo}: ${riassumi(valore)}`);
    }

    const daCancellare = DA_CANCELLARE[id] ?? [];
    for (const campo of daCancellare) {
      console.log(`    ${campo}: RIMOSSO`);
    }

    if (apply) {
      // `addMissingKeys`: gli array di oggetti scritti qui non hanno `_key`,
      // che Sanity richiede per ogni elemento di un array.
      let patch = client.patch(id).set(addMissingKeys(campi) as Campi);
      if (daCancellare.length > 0) patch = patch.unset(daCancellare);
      await patch.commit();
    }
  }

  console.log(`\n▸ popupEvento`);
  console.log('    creato vuoto e spento, se non esiste già');

  console.log(
    apply
      ? `\n✓ ${modifiche.size} documenti aggiornati. Controlla su /studio.`
      : `\n${modifiche.size} documenti da aggiornare. Rilancia con --apply per scrivere.`
  );
}

main().catch((error: unknown) => {
  console.error('\n✗ Interrotto:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
