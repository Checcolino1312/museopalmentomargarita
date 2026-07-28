/**
 * Aggiunge i `_key` mancanti agli elementi degli array già presenti su Sanity.
 *
 *   npm run sanity:fix-keys           # mostra cosa cambierebbe, senza scrivere
 *   npm run sanity:fix-keys -- --apply
 *
 * Serve a riparare i documenti creati dal primo import, che li scriveva senza:
 * lo Studio li segnala con «Missing keys» e impedisce di modificarli.
 *
 * A differenza di `sanity:import`, questo script è sicuro sui contenuti già
 * modificati nello Studio: tocca solo i campi che contengono elementi privi di
 * chiave, e lascia inalterato tutto il resto.
 */
import { client, dataset, projectId } from './lib/client';
import { addMissingKeys } from './lib/keys';

type SanityDoc = Record<string, unknown> & { _id: string; _type: string };

/** Elenca i campi di primo livello che contengono oggetti senza `_key`. */
function campiDaRiparare(doc: SanityDoc): string[] {
  const campi: string[] = [];

  for (const [campo, valore] of Object.entries(doc)) {
    if (campo.startsWith('_')) continue;
    if (JSON.stringify(valore) !== JSON.stringify(addMissingKeys(valore))) {
      campi.push(campo);
    }
  }

  return campi;
}

async function main(): Promise<void> {
  const apply = process.argv.includes('--apply');

  console.log(
    `Progetto ${projectId}, dataset ${dataset} — ` +
      (apply ? 'applico le correzioni' : 'anteprima (nessuna scrittura)')
  );

  // Include le bozze: hanno lo stesso problema e vanno riparate anch'esse.
  const docs = await client.fetch<SanityDoc[]>('*[!(_type match "system.**")]');

  let daRiparare = 0;

  for (const doc of docs) {
    const campi = campiDaRiparare(doc);
    if (campi.length === 0) continue;

    daRiparare++;
    console.log(`  ${doc._id} → ${campi.join(', ')}`);

    if (apply) {
      const patch: Record<string, unknown> = {};
      for (const campo of campi) patch[campo] = addMissingKeys(doc[campo]);
      await client.patch(doc._id).set(patch).commit();
    }
  }

  if (daRiparare === 0) {
    console.log('\n✓ Nessun documento da riparare.');
  } else if (apply) {
    console.log(`\n✓ ${daRiparare} documenti riparati.`);
  } else {
    console.log(`\n${daRiparare} documenti da riparare. Rilancia con --apply per scrivere.`);
  }
}

main().catch((error: unknown) => {
  console.error('\n✗ Interrotto:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
