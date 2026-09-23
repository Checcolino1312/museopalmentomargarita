/**
 * Verifica che schema, dati su Sanity e query del sito siano allineati.
 *
 *   npx tsx scripts/verifica-coerenza.ts
 *
 * Tre disallineamenti possibili, tutti silenziosi finché non si rompe qualcosa:
 *  - un campo nei dati che lo schema non prevede più → avviso nello Studio
 *  - un campo nello schema che nessuna query chiede → il museo lo compila e
 *    non compare da nessuna parte, senza capire perché
 *  - un tipo di documento senza tag di cache → il webhook non lo aggiorna mai
 */
import { client } from './lib/client';
import { schemaTypes, singletonTypes } from '../sanity/schemaTypes';
import { TAGS } from '../lib/queries';
import { readFileSync } from 'node:fs';

type Doc = Record<string, unknown> & { _id: string; _type: string };

/** Nomi dei campi di primo livello dichiarati nello schema. */
function campiDelloSchema(tipo: string): string[] {
  const def = schemaTypes.find((s) => s.name === tipo) as
    | { fields?: { name: string }[] }
    | undefined;
  return (def?.fields ?? []).map((f) => f.name);
}

async function main(): Promise<void> {
  // Insieme degli identificatori citati nelle query, non una ricerca testuale:
  // cercare la sottostringa darebbe falsi positivi («intro» dentro
  // «introduzione»), e i confini di parola in espressione regolare qui si
  // comportano male perché `` viene letto come carattere di backspace.
  const query = new Set(
    (readFileSync('lib/queries.ts', 'utf-8').match(/[a-zA-Z_][a-zA-Z0-9_]*/g) ?? [])
  );
  const docs = await client.fetch<Doc[]>(
    '*[!(_type match "sanity.*") && !(_type match "system.*")]'
  );

  let problemi = 0;
  const segnala = (s: string) => { problemi++; console.log(`  ⚠ ${s}`); };

  console.log('▸ Documenti attesi');
  for (const tipo of singletonTypes) {
    const trovati = docs.filter((d) => d._type === tipo);
    if (trovati.length === 0) segnala(`${tipo}: nessun documento`);
    else if (trovati.length > 1) segnala(`${tipo}: ${trovati.length} documenti, dovrebbe essere uno`);
    else console.log(`  ✓ ${tipo}`);
  }

  console.log('\n▸ Campi nei dati che lo schema non prevede');
  for (const doc of docs) {
    const previsti = campiDelloSchema(doc._type);
    if (previsti.length === 0) continue;
    const presenti = Object.keys(doc).filter((k) => !k.startsWith('_'));
    const orfani = presenti.filter((c) => !previsti.includes(c));
    orfani.forEach((c) => segnala(`${doc._id}.${c} — non è nello schema`));
  }
  if (problemi === 0) console.log('  ✓ nessuno');

  const prima = problemi;
  console.log('\n▸ Campi dello schema che nessuna query chiede');
  for (const tipo of singletonTypes) {
    for (const campo of campiDelloSchema(tipo)) {
      if (!query.has(campo)) {
        segnala(`${tipo}.${campo} — compilabile nello Studio ma mai mostrato`);
      }
    }
  }
  if (problemi === prima) console.log('  ✓ nessuno');

  const prima2 = problemi;
  console.log('\n▸ Tag di cache per il webhook');
  for (const tipo of singletonTypes) {
    if (!(tipo in TAGS)) segnala(`${tipo} — senza tag: il webhook non lo aggiornerebbe`);
  }
  if (problemi === prima2) console.log('  ✓ tutti i tipi hanno il loro tag');

  console.log(problemi === 0 ? '\n✓ Tutto allineato.' : `\n${problemi} disallineamenti.`);
}

main().catch((e: unknown) => {
  console.error('\n✗', e instanceof Error ? e.message : e);
  process.exitCode = 1;
});
