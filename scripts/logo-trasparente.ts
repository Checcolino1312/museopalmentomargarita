/**
 * Rende trasparente lo sfondo di un logo a tinta unita su fondo chiaro.
 *
 *   npx tsx scripts/logo-trasparente.ts <ingresso.png> <uscita.png>
 *
 * Il file consegnato dal grafico ha un canale alpha, ma interamente opaco: lo
 * sfondo è un bianco freddo pieno che sul crema del sito si vedrebbe come un
 * rettangolo. Qui lo sfondo viene tolto davvero.
 *
 * Come: ogni pixel di un'immagine antialiasata è una miscela fra sfondo e
 * colore del tratto, `pixel = sfondo·(1−α) + tratto·α`. Invertendo la formula si
 * ricava α per ciascun pixel. Si usa il canale verde perché è quello dove i due
 * colori distano di più (250 contro 25), quindi dà il risultato meno rumoroso.
 * I bordi sfumati restano sfumati, senza l'alone che lascerebbe una soglia secca.
 */
import sharp from 'sharp';

/** Campiona lo sfondo dai quattro angoli: lì non c'è mai il disegno. */
function coloreSfondo(dati: Buffer, larghezza: number, altezza: number, canali: number) {
  const angoli = [
    [2, 2],
    [larghezza - 3, 2],
    [2, altezza - 3],
    [larghezza - 3, altezza - 3],
  ];

  const somma = [0, 0, 0];
  for (const [x, y] of angoli) {
    const i = (y * larghezza + x) * canali;
    somma[0] += dati[i];
    somma[1] += dati[i + 1];
    somma[2] += dati[i + 2];
  }
  return somma.map((v) => Math.round(v / angoli.length)) as [number, number, number];
}

/**
 * Colore del tratto: media dei pixel pienamente coperti dal disegno.
 *
 * Non il pixel più scuro in assoluto: un singolo valore anomalo — e ce n'è
 * sempre qualcuno nelle immagini esportate — falserebbe la tinta di tutto il
 * logo. Si prende invece la fascia più scura e se ne fa la media.
 */
function coloreTratto(dati: Buffer, canali: number): [number, number, number] {
  let minimo = Infinity;
  let massimo = -Infinity;

  for (let i = 0; i < dati.length; i += canali) {
    const luminosita = dati[i] + dati[i + 1] + dati[i + 2];
    if (luminosita < minimo) minimo = luminosita;
    if (luminosita > massimo) massimo = luminosita;
  }

  // Fascia entro il 12% più scuro dell'intervallo: è il pieno del tratto.
  const soglia = minimo + (massimo - minimo) * 0.12;
  const somma = [0, 0, 0];
  let quanti = 0;

  for (let i = 0; i < dati.length; i += canali) {
    if (dati[i] + dati[i + 1] + dati[i + 2] > soglia) continue;
    somma[0] += dati[i];
    somma[1] += dati[i + 1];
    somma[2] += dati[i + 2];
    quanti++;
  }

  return somma.map((v) => Math.round(v / quanti)) as [number, number, number];
}

async function main(): Promise<void> {
  const [ingresso, uscita] = process.argv.slice(2);
  if (!ingresso || !uscita) {
    throw new Error('Uso: tsx scripts/logo-trasparente.ts <ingresso.png> <uscita.png>');
  }

  const { data, info } = await sharp(ingresso).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  const { width, height, channels } = info;

  const sfondo = coloreSfondo(data, width, height, channels);
  const tratto = coloreTratto(data, channels);

  // Canale con la distanza maggiore fra sfondo e tratto.
  let canale = 0;
  for (let c = 1; c < 3; c++) {
    if (Math.abs(sfondo[c] - tratto[c]) > Math.abs(sfondo[canale] - tratto[canale])) canale = c;
  }
  const distanza = sfondo[canale] - tratto[canale];
  if (Math.abs(distanza) < 40) {
    throw new Error('Sfondo e tratto sono troppo simili: il ritaglio non sarebbe affidabile.');
  }

  console.log(`sfondo rgb(${sfondo})  tratto rgb(${tratto})  canale ${'RGB'[canale]}`);

  const fuori = Buffer.alloc(width * height * 4);
  for (let p = 0; p < width * height; p++) {
    const i = p * channels;
    const alpha = Math.round(((sfondo[canale] - data[i + canale]) / distanza) * 255);

    fuori[p * 4] = tratto[0];
    fuori[p * 4 + 1] = tratto[1];
    fuori[p * 4 + 2] = tratto[2];
    fuori[p * 4 + 3] = Math.min(255, Math.max(0, alpha));
  }

  await sharp(fuori, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(uscita);

  console.log(`✓ ${uscita} — ${width}×${height}, sfondo trasparente`);
}

main().catch((error: unknown) => {
  console.error('✗', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
