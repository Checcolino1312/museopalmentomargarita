/**
 * Fa il punto sullo stato del dataset e ripulisce ciò che non serve più.
 *
 *   npm run sanity:pulizia              # solo referto, non tocca nulla
 *   npm run sanity:pulizia -- --apply   # cancella gli asset non usati
 *
 * Gli asset non referenziati da nessun documento restano a ingombrare la
 * libreria che la proprietaria vede nello Studio, rendendo difficile trovare
 * quelli buoni. Cancellarli è irreversibile, da qui l'anteprima come modo
 * normale di eseguire lo script.
 *
 * Sanity rifiuta comunque di cancellare un asset ancora in uso: è una rete di
 * sicurezza in più, oltre al calcolo dei riferimenti fatto qui.
 */
import { client, dataset, projectId } from './lib/client';

type Doc = Record<string, unknown> & { _id: string; _type: string };
type Asset = { _id: string; originalFilename?: string; size?: number; url?: string };

/** Tutti gli `_ref` ad asset presenti nei documenti, a qualsiasi profondità. */
function raccogliRiferimenti(nodo: unknown, trovati: Set<string>): void {
  if (Array.isArray(nodo)) {
    nodo.forEach((v) => raccogliRiferimenti(v, trovati));
    return;
  }
  if (nodo && typeof nodo === 'object') {
    const o = nodo as Record<string, unknown>;
    if (typeof o._ref === 'string' && /^(image|file)-/.test(o._ref)) trovati.add(o._ref);
    Object.values(o).forEach((v) => raccogliRiferimenti(v, trovati));
  }
}

const mb = (byte?: number) => ((byte ?? 0) / 1024 / 1024).toFixed(1);

async function main(): Promise<void> {
  const apply = process.argv.includes('--apply');

  console.log(
    `Progetto ${projectId}, dataset ${dataset} — ` +
      (apply ? 'cancello gli asset non usati' : 'referto (nessuna scrittura)')
  );

  // Include le bozze: un asset usato solo in una bozza è comunque in uso.
  const documenti = await client.fetch<Doc[]>('*[!(_type match "sanity.*")]');
  const asset = await client.fetch<Asset[]>(
    '*[_type in ["sanity.imageAsset","sanity.fileAsset"]]{_id, originalFilename, size}'
  );

  const usati = new Set<string>();
  documenti.forEach((d) => raccogliRiferimenti(d, usati));

  const nonUsati = asset.filter((a) => !usati.has(a._id));
  const pesoTotale = nonUsati.reduce((s, a) => s + (a.size ?? 0), 0);

  console.log(`\n▸ Documenti: ${documenti.length}`);
  const perTipo = new Map<string, number>();
  documenti.forEach((d) => perTipo.set(d._type, (perTipo.get(d._type) ?? 0) + 1));
  [...perTipo].sort().forEach(([t, n]) => console.log(`    ${t.padEnd(16)} ${n}`));

  const bozze = documenti.filter((d) => d._id.startsWith('drafts.'));
  if (bozze.length > 0) {
    console.log(`\n▸ Bozze non pubblicate: ${bozze.length}`);
    bozze.forEach((d) => console.log(`    ${d._id}`));
  }

  console.log(`\n▸ Asset: ${asset.length} in tutto, ${usati.size} usati, ${nonUsati.length} no`);
  nonUsati.forEach((a) =>
    console.log(`    ${(a.originalFilename ?? a._id).padEnd(34)} ${mb(a.size).padStart(6)} MB`)
  );

  if (nonUsati.length === 0) {
    console.log('\n✓ Niente da cancellare.');
    return;
  }

  if (!apply) {
    console.log(`\n${nonUsati.length} asset da cancellare, ${mb(pesoTotale)} MB in tutto.`);
    console.log('Rilancia con --apply per cancellarli. IRREVERSIBILE.');
    return;
  }

  console.log('\n▸ Cancellazione');
  let fatti = 0;
  for (const a of nonUsati) {
    try {
      await client.delete(a._id);
      fatti++;
      console.log(`  ✓ ${a.originalFilename ?? a._id}`);
    } catch (errore) {
      const motivo = errore instanceof Error ? errore.message : String(errore);
      console.log(`  ✗ ${a.originalFilename ?? a._id}: ${motivo}`);
    }
  }
  console.log(`\n✓ ${fatti} asset cancellati, ${mb(pesoTotale)} MB liberati.`);
}

main().catch((error: unknown) => {
  console.error('\n✗ Interrotto:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
