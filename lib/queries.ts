import { defineQuery } from 'next-sanity';

/** Tag di cache: coincidono con i `_type` dello schema, così il webhook li ricava dal payload. */
export const TAGS = {
  reperto: 'reperto',
  siteSettings: 'siteSettings',
  homePage: 'homePage',
  storiaPage: 'storiaPage',
  collezionePage: 'collezionePage',
  contattiPage: 'contattiPage',
} as const;

/** Campi mostrati nelle griglie di schede. */
const CARD_FIELDS = `inventoryId, nome, epoca, descrizione, foto`;

export const repertiListQuery = defineQuery(`
  *[_type == "reperto" && defined(inventoryId)] | order(inventoryId asc) {
    ${CARD_FIELDS}
  }
`);

/** Solo i codici, per generateStaticParams. */
export const repertiIdsQuery = defineQuery(`
  *[_type == "reperto" && defined(inventoryId)] | order(inventoryId asc).inventoryId
`);

export const repertoQuery = defineQuery(`
  *[_type == "reperto" && inventoryId == $id][0] {
    inventoryId, nome, epoca, provenienza, descrizione,
    noteTitolo, noteCorpo, pullQuote, foto
  }
`);

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    titolo, descrizione, logo, indirizzo, email, telefono,
    orari[] { giorni, orario, chiuso },
    nav[] { label, href },
    footerScopri[] { label, href },
    copyright
  }
`);

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    heroLabel, heroTitoloRighe, heroImmagine, heroCta,
    mosaico, pullQuote, visita
  }
`);

export const storiaPageQuery = defineQuery(`
  *[_type == "storiaPage"][0] {
    hero,
    sezioni[] { _key, label, titolo, testo, immagine, layout },
    pullQuote, timelineTitolo,
    timeline[] { _key, anno, titolo, descrizione },
    ctaFinale
  }
`);

export const collezionePageQuery = defineQuery(`
  *[_type == "collezionePage"][0] {
    titolo, lead, etichettaTotale, etichettaProvenienza,
    valoreProvenienza, searchPlaceholder, editorialCard
  }
`);

export const contattiPageQuery = defineQuery(`
  *[_type == "contattiPage"][0] {
    label, titolo, doveSiamoTitolo, orariTitolo, scriviciTitolo, scriviciTesto
  }
`);
