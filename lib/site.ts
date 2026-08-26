import type { Orario, SiteSettings } from './types';

/** «10:00 — 13:00» oppure «Chiuso» per i giorni di chiusura. */
export function formatOrario(o: Orario): string {
  if (o.chiuso) return 'Chiuso';
  return o.orario ?? '—';
}

/**
 * Link `wa.me` dal numero scritto nelle Impostazioni.
 *
 * Accetta le forme in cui un numero italiano viene scritto di solito
 * («338 834 6910», «+39 338 8346910», «0039…») e le riduce al formato
 * internazionale senza segni che wa.me richiede. Senza prefisso assume l'Italia.
 */
export function linkWhatsApp(numero: string | undefined): string | null {
  if (!numero) return null;

  const scritto = numero.trim();
  const soloCifre = scritto.replace(/\D/g, '');
  if (!soloCifre) return null;

  // Solo un «+» o uno «00» iniziali indicano un prefisso già presente. Non ci si
  // può basare sulle cifre: i cellulari italiani 391, 392, 393… iniziano per «39»
  // pur non avendo prefisso, e verrebbero troncati.
  const haPrefisso = scritto.startsWith('+') || soloCifre.startsWith('00');
  const internazionale = haPrefisso ? soloCifre.replace(/^00/, '') : `39${soloCifre}`;

  return `https://wa.me/${internazionale}`;
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
