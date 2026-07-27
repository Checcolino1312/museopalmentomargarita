import type { Orario, SiteSettings } from './types';

/** «10:00 — 13:00» oppure «Chiuso» per i giorni di chiusura. */
export function formatOrario(o: Orario): string {
  if (o.chiuso) return 'Chiuso';
  return o.orario ?? '—';
}

/**
 * Indirizzo su più righe, dai campi separati delle Impostazioni del sito.
 * Le parti mancanti vengono semplicemente omesse.
 */
export function righeIndirizzo(indirizzo: SiteSettings['indirizzo']): string[] {
  if (!indirizzo) return [];

  const { via, cap, citta, provincia, regione } = indirizzo;

  const localita = [cap, citta].filter(Boolean).join(' ');
  const conProvincia = provincia ? `${localita} (${provincia})`.trim() : localita;
  const regioneRiga = regione ? `${regione} · Italia` : null;

  return [via, conProvincia, regioneRiga].filter((riga): riga is string => Boolean(riga));
}
