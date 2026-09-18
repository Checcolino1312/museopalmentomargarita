import type { Image } from 'sanity';
import type { PortableTextBlock } from '@portabletext/react';

/** Immagine con testo alternativo, come definita nello schema `immagine`. */
export type Immagine = Image & { alt?: string };

export interface Reperto {
  inventoryId: string;
  nome: string;
  epoca?: string;
  provenienza?: string;
  descrizione?: string;
  noteTitolo?: string;
  noteCorpo?: PortableTextBlock[];
  pullQuote?: string;
  foto?: Immagine;
}

/** Versione ridotta usata nelle griglie e per calcolare precedente/successivo. */
export interface RepertoCard {
  inventoryId: string;
  nome: string;
  epoca?: string;
  descrizione?: string;
  foto?: Immagine;
}

export interface Orario {
  giorni: string;
  orario?: string;
  chiuso?: boolean;
}

export interface LinkVoce {
  label: string;
  href: string;
}

export interface SiteSettings {
  titolo: string;
  descrizione?: string;
  logo?: Immagine;
  indirizzo?: {
    via?: string;
    cap?: string;
    citta?: string;
    provincia?: string;
    regione?: string;
  };
  email?: string;
  telefono?: string;
  whatsapp?: string;
  orari?: Orario[];
  nav?: LinkVoce[];
  footerScopri?: LinkVoce[];
  copyright?: string;
}

export interface HomePage {
  heroLabel?: string;
  heroTitoloRighe?: string[];
  heroImmagine?: Immagine;
  heroCta?: { label?: string; href?: string };
  galleria?: {
    immagini?: (Immagine & { _key: string })[];
    caption?: string;
  };
  introduzione?: {
    titolo?: string;
    testo?: PortableTextBlock[];
    immagine?: Immagine;
    apribile?: boolean;
  };
  mission?: {
    titolo?: string;
    citazione?: string;
    testo?: PortableTextBlock[];
    immagine?: Immagine;
  };
  visita?: { titolo?: string; sottotitolo?: string; linkLabel?: string; linkHref?: string };
}

export type SezioneLayout = 'imgLeft' | 'imgRight' | 'fullWidth';

export interface StoriaSezione {
  _key: string;
  label?: string;
  titolo?: string;
  testo?: PortableTextBlock[];
  immagine?: Immagine;
  layout: SezioneLayout;
  apribile?: boolean;
}

export interface StoriaPage {
  hero?: { immagine?: Immagine; titolo?: string; lead?: string };
  sezioni?: StoriaSezione[];
  pullQuote?: string;
  pullQuoteImmagine?: Immagine;
  ctaFinale?: { titolo?: string; testo?: string; linkLabel?: string; linkHref?: string };
}

export interface CollezionePage {
  titolo?: string;
  lead?: string;
  etichettaTotale?: string;
  etichettaProvenienza?: string;
  valoreProvenienza?: string;
  searchPlaceholder?: string;
  editorialCard?: {
    titolo?: string;
    testo?: string;
    linkLabel?: string;
    linkHref?: string;
    posizione?: number;
  };
}

export interface ContattiPage {
  label?: string;
  titolo?: string;
  intro?: PortableTextBlock[];
  doveSiamoTitolo?: string;
  orariTitolo?: string;
  scriviciTitolo?: string;
  scriviciTesto?: string;
  contattaciTitolo?: string;
  contattaciVoci?: string[];
  chiusura?: string;
}

export interface PercorsiPage {
  label?: string;
  titolo?: string;
  intro?: PortableTextBlock[];
  heroImmagine?: Immagine;
  attivitaTitolo?: string;
  attivitaIntro?: PortableTextBlock[];
  gruppiAttivita?: { _key: string; titolo: string; voci?: string[] }[];
  oltreTitolo?: string;
  oltreTesto?: PortableTextBlock[];
  oltreImmagine?: Immagine;
  ctaFinale?: { titolo?: string; testo?: string; linkLabel?: string; linkHref?: string };
}

export interface PopupEvento {
  titolo?: string;
  testo?: string;
  immagine?: Immagine;
  linkLabel?: string;
  linkHref?: string;
}
