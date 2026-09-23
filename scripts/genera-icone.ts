/**
 * Genera favicon e immagine di condivisione a partire dal logo.
 *
 *   npx tsx scripts/genera-icone.ts
 *
 * Due immagini con esigenze opposte, entrambe ricavate dallo stesso file:
 *
 * - **favicon** (`app/(site)/icon.png`): si vede a 16-32 pixel. Il logo intero è
 *   orizzontale e contiene tre righe di testo, che a quelle dimensioni
 *   diventano una macchia grigia. Si usa quindi il solo stemma del barile,
 *   ritagliato quadrato: a icona piccola è l'unica parte che resta
 *   riconoscibile.
 *
 * - **condivisione** (`app/(site)/opengraph-image.png`): 1200×630, la misura che
 *   Facebook, WhatsApp, LinkedIn e X si aspettano. Qui il logo va per intero,
 *   composto sul crema del sito: senza sfondo apparirebbe su bianco o nero a
 *   seconda del social, e il bordeaux su nero si legge male.
 */
import sharp from 'sharp';

/** Stessa cartella del layout che definisce i metadati del sito. */
const DESTINAZIONE_ICONA = 'app/(site)/icon.png';
const DESTINAZIONE_OG = 'app/(site)/opengraph-image.png';

const LOGO = 'public/brand/logo/logo-laterale.png';
const CREMA = '#F7F4EF';

/** Riquadro che racchiude il disegno, entro un intervallo di colonne. */
async function riquadro(file: string, daX: number, aX: number) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;

  let top = H, bottom = -1;
  for (let y = 0; y < H; y++) {
    for (let x = daX; x < aX; x++) {
      if (data[(y * W + x) * 4 + 3] > 20) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        break;
      }
    }
  }
  return { left: daX, top, width: aX - daX, height: bottom - top + 1 };
}

async function main() {
  // ── Favicon: solo lo stemma, quadrato ──
  // 63-622 è lo stemma: fra 622 e 659 il logo ha una colonna vuota che lo
  // separa dal testo (misurata sul file, non stimata a occhio).
  const st = await riquadro(LOGO, 63, 622);
  const lato = Math.max(st.width, st.height);
  const margine = Math.round(lato * 0.08);

  const orizzontale = Math.round((lato - st.width) / 2) + margine;
  const verticale = Math.round((lato - st.height) / 2) + margine;

  // Due passaggi, non una catena sola: sharp applica `resize` **prima** di
  // `extend`, a prescindere dall'ordine in cui li si scrive. Concatenandoli lo
  // stemma verrebbe prima schiacciato a 512×512, perdendo le proporzioni, e
  // solo dopo imbottito — con un risultato deformato e della misura sbagliata.
  const quadrato = await sharp(LOGO)
    .extract(st)
    .extend({
      top: verticale,
      bottom: verticale,
      left: orizzontale,
      right: orizzontale,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp(quadrato).resize(512, 512).png().toFile(DESTINAZIONE_ICONA);
  console.log(`✓ ${DESTINAZIONE_ICONA} — stemma ${st.width}×${st.height} → 512×512, sfondo trasparente`);

  // ── Condivisione: logo intero sul crema ──
  const largo = Math.round(1200 * 0.62);
  const logo = await sharp(LOGO).resize({ width: largo }).toBuffer();
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: CREMA },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(DESTINAZIONE_OG);
  console.log(`✓ ${DESTINAZIONE_OG} — 1200×630, logo largo ${largo}px su ${CREMA}`);
}

main().catch((e: unknown) => {
  console.error('✗', e instanceof Error ? e.message : e);
  process.exitCode = 1;
});
