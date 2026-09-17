import type { PortableTextBlock } from '@portabletext/react';

/** Caratteri di un blocco Portable Text, ignorando la formattazione. */
function lunghezza(blocco: PortableTextBlock): number {
  const figli = (blocco as { children?: { text?: string }[] }).children ?? [];
  return figli.reduce((somma, f) => somma + (f.text?.length ?? 0), 0);
}

interface Divisione {
  visibile: PortableTextBlock[];
  resto: PortableTextBlock[];
}

/**
 * Divide un testo fra la parte sempre visibile e il seguito da rivelare.
 *
 * Si aggiungono capoversi interi finché il visibile raggiunge `minimoVisibile`:
 * il lettore deve trovare qualcosa di compiuto da leggere, non due righe mozze.
 *
 * Se quel che resterebbe nascosto è più corto di `restoMinimo`, non si nasconde
 * niente: un comando che rivela due righe fa perdere più tempo di quanto ne
 * faccia risparmiare. In quel caso `resto` torna vuoto e il chiamante non mostra
 * alcun comando.
 */
export function dividiTesto(
  blocchi: PortableTextBlock[] | undefined,
  { minimoVisibile = 250, restoMinimo = 200 } = {}
): Divisione {
  if (!blocchi?.length) return { visibile: [], resto: [] };

  let caratteri = 0;
  let taglio = 0;

  while (taglio < blocchi.length && caratteri < minimoVisibile) {
    caratteri += lunghezza(blocchi[taglio]);
    taglio++;
  }

  const resto = blocchi.slice(taglio);
  const caratteriResto = resto.reduce((somma, b) => somma + lunghezza(b), 0);

  if (caratteriResto < restoMinimo) return { visibile: blocchi, resto: [] };

  return { visibile: blocchi.slice(0, taglio), resto };
}
