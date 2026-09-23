import { defineQuery } from 'next-sanity';

/** Tag di cache: coincidono con i `_type` dello schema, così il webhook li ricava dal payload. */
export const TAGS = {
  siteSettings: 'siteSettings',
  homePage: 'homePage',
  storiaPage: 'storiaPage',
  percorsiPage: 'percorsiPage',
  contattiPage: 'contattiPage',
  popupEvento: 'popupEvento',
} as const;

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    titolo, descrizione, logo, indirizzo, email, telefono, whatsapp,
    orari[] { giorni, orario, chiuso },
    nav[] { label, href },
    footerScopri[] { label, href },
    copyright
  }
`);

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    heroLabel, heroTitoloRighe, heroImmagine, heroCta,
    introduzione, mission,
    galleria { immagini[] { _key, alt, asset }, caption },
    visita
  }
`);

export const storiaPageQuery = defineQuery(`
  *[_type == "storiaPage"][0] {
    hero,
    sezioni[] { _key, label, titolo, testo, immagine, layout, apribile },
    pullQuote, pullQuoteImmagine,
    ctaFinale
  }
`);

export const contattiPageQuery = defineQuery(`
  *[_type == "contattiPage"][0] {
    label, titolo, intro, doveSiamoTitolo, orariTitolo,
    scriviciTitolo, scriviciTesto,
    contattaciTitolo, contattaciVoci, chiusura
  }
`);

export const percorsiPageQuery = defineQuery(`
  *[_type == "percorsiPage"][0] {
    label, titolo, intro, heroImmagine,
    attivitaTitolo, attivitaIntro,
    gruppiAttivita[] { _key, titolo, voci },
    oltreTitolo, oltreTesto, oltreImmagine,
    ctaFinale
  }
`);

/** Il pop-up è servito solo quando è acceso: da spento la query non torna nulla. */
export const popupEventoQuery = defineQuery(`
  *[_type == "popupEvento" && attivo == true][0] {
    titolo, testo, immagine, linkLabel, linkHref
  }
`);
