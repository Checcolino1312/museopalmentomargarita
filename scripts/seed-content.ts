/**
 * Contenuto iniziale dei singleton, trascritto dai testi che erano hardcoded
 * nel JSX prima della migrazione. Serve a non perdere nulla al primo import.
 *
 * Le immagini sono indicate con `img(percorso, alt)`: lo script di import le
 * carica su Sanity e sostituisce il segnaposto con il riferimento all'asset.
 */
import { toPortableText } from './lib/portable-text';

export type ImagePlaceholder = { __image: string; alt: string };

export const img = (path: string, alt: string): ImagePlaceholder => ({ __image: path, alt });

export const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  titolo: 'Museo Palmento Margarita',
  descrizione:
    'Un viaggio nella storia del vino, nelle tradizioni agricole e nella vita quotidiana delle comunità rurali pugliesi.',
  logo: img('public/brand/logo/logonuovo.png', 'Museo Palmento Margarita'),
  indirizzo: {
    via: 'S.P. Francavilla Fontana – Villa Castelli',
    cap: '72021',
    citta: 'Francavilla Fontana',
    provincia: 'BR',
    regione: 'Puglia',
  },
  // Volutamente vuoti: la casella e il numero non sono ancora attivi.
  // Finché restano vuoti, il sito non mostra i relativi link.
  email: '',
  telefono: '',
  orari: [
    { giorni: 'Lunedì — martedì', orario: '', chiuso: true },
    { giorni: 'Mercoledì — giovedì', orario: '10:00 — 13:00', chiuso: false },
    { giorni: 'Venerdì — sabato', orario: '10:00 — 18:30', chiuso: false },
    { giorni: 'Domenica', orario: '10:00 — 14:00', chiuso: false },
  ],
  nav: [
    { label: 'Museo', href: '/home' },
    { label: 'Storia', href: '/storia' },
    { label: 'Contatti', href: '/contatti' },
  ],
  footerScopri: [{ label: 'Storia del palmento', href: '/storia' }],
  copyright: '© 2026 Museo Palmento Margarita · Famiglie Margarita & Carissimo',
};

export const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  heroLabel: 'Francavilla Fontana, Puglia',
  heroTitoloRighe: ['La memoria', 'prende forma.'],
  heroImmagine: img('public/transformed_MUSEO-22.jpg', 'Facciata della masseria Margarita'),
  heroCta: { label: 'Scopri', href: '/storia' },
  mosaico: {
    immagineGrande: img('public/MUSEO-10.jpg', "Sala ad archi del museo con abiti d'epoca"),
    immagineAlta: img('public/MUSEO-7.jpg', 'Teca con oggetti storici e anfore'),
    immagineQuadrata: img('public/MUSEO-13.jpg', 'Camino con ceramiche antiche'),
    caption: 'Il palmento di Francavilla Fontana · XVI–XIX sec.',
  },
  pullQuote: {
    // Senza virgolette: le « » le aggiunge il componente
    testo:
      'Cinquantanove oggetti raccolti dalle masserie della provincia. Ognuno con la sua storia.',
    linkLabel: 'Leggi la storia',
    linkHref: '/storia',
  },
  visita: {
    titolo: 'Vieni a trovarci.',
    sottotitolo: 'Visite guidate ogni venerdì e sabato.',
    titoloOrari: 'Orari di apertura',
  },
};

export const storiaPage = {
  _id: 'storiaPage',
  _type: 'storiaPage',
  hero: {
    immagine: img('public/MUSEO-19.jpg', 'Vigneto pugliese al tramonto'),
    titolo: 'Il palmento e la tradizione del vino.',
    lead: "Tra il XVI e il XIX secolo, nelle campagne pugliesi, il palmento in pietra era il cuore della trasformazione dell'uva in vino.",
  },
  sezioni: [
    {
      _type: 'sezione',
      label: '01 · La civiltà contadina',
      titolo: 'I «viddani» e la vendemmia.',
      testo: toPortableText(
        "La vendemmia era il momento centrale dell'anno rurale pugliese — tramandato oralmente, fatto di gesti antichi e collaborazione profonda con la terra. Il palmento non era solo uno strumento: era il luogo dove la comunità si ritrovava."
      ),
      immagine: img('public/MUSEO-14.jpg', 'Sala del museo con carrozza e ritratti di famiglia'),
      layout: 'imgLeft',
    },
    {
      _type: 'sezione',
      label: '02 · La terra e la vite',
      titolo: 'Primitivo, Negroamaro, Malvasia Nera.',
      testo: toPortableText(
        "Il territorio pugliese, tra Salento e Valle d'Itria, porta con sé una vocazione antica per la coltivazione della vite. Uve autoctone che raccontano secoli di lavoro, di sole abbondante e di terreni calcarei."
      ),
      immagine: img('public/MUSEO-18.jpg', 'Vigneto pugliese di giorno'),
      layout: 'imgRight',
    },
    {
      _type: 'sezione',
      label: '03 · Una famiglia, un nome',
      // Questa sezione non ha titolo nel design attuale
      titolo: '',
      testo: toPortableText(
        "«Margarita» è la famiglia originaria di Francavilla Fontana, unita ai Carissimo di origini beneventane. Un nome che intreccia radici familiari, tradizione agricola e identità locale — non un'astrazione, ma una storia con un cognome e una pietra."
      ),
      immagine: img('public/MUSEO-4.jpg', 'Anfore e pompa antica nel palmento'),
      layout: 'fullWidth',
    },
  ],
  pullQuote: "Puoi ancora sentire l'odore del mosto nelle pietre di questo cortile.",
  timelineTitolo: 'Quattro secoli.',
  timeline: [
    {
      anno: 'XVI sec.',
      titolo: 'I primi palmenti',
      descrizione:
        'Nelle campagne tra Francavilla Fontana e Villa Castelli si diffondono le prime costruzioni in pietra.',
    },
    {
      anno: '1700',
      titolo: "L'apogeo della tradizione",
      descrizione:
        'Il palmento diventa parte integrante della masseria: vendemmia, pigiatura, conservazione, trasporto.',
    },
    {
      anno: '1800',
      titolo: 'Margarita & Carissimo',
      descrizione:
        "L'unione delle due famiglie segna la continuità del sito — Francavilla Fontana incontra Benevento.",
    },
    {
      anno: '1950',
      titolo: 'La fine delle masserie',
      descrizione:
        "L'industrializzazione e l'esodo rurale segnano il declino. Molti palmenti vengono abbandonati.",
    },
    {
      anno: '2024',
      titolo: 'Nasce il Museo',
      descrizione:
        "Il Palmento Margarita riapre. Cinquantanove oggetti diventano la voce di un'intera civiltà.",
    },
  ],
  ctaFinale: {
    titolo: 'Vieni a trovarci.',
    testo: 'Visite guidate ogni venerdì e sabato, in piccoli gruppi.',
    linkLabel: 'Contattaci',
    // Prima puntava a mailto:info@palmentomargarita.it, casella che non esiste:
    // ora rimanda alla pagina contatti, coerentemente con il resto del sito.
    linkHref: '/contatti',
  },
};

export const collezionePage = {
  _id: 'collezionePage',
  _type: 'collezionePage',
  titolo: 'Cinquantanove oggetti, una sola vendemmia.',
  lead: 'Ogni reperto è una traccia: un gesto antico, un mestiere scomparso, un sapore conservato. Sfoglia la collezione o cerca un oggetto specifico.',
  etichettaTotale: 'Totale reperti',
  etichettaProvenienza: 'Provenienza',
  valoreProvenienza: 'Francavilla Fontana',
  searchPlaceholder: "Cerca un oggetto, un'epoca…",
  editorialCard: {
    titolo: 'La masseria come fabbrica di conservazione.',
    testo:
      'Fino alla metà del Novecento, frutta, ortaggi, vino e olio venivano lavorati seguendo pratiche tradizionali tramandate di generazione in generazione.',
    linkLabel: 'Leggi la storia',
    linkHref: '/storia',
    posizione: 6,
  },
};

export const contattiPage = {
  _id: 'contattiPage',
  _type: 'contattiPage',
  label: 'Francavilla Fontana, Puglia',
  titolo: 'Contatti.',
  doveSiamoTitolo: 'Dove siamo',
  orariTitolo: 'Orari di apertura',
  scriviciTitolo: 'Scrivici',
  scriviciTesto: 'Per informazioni, prenotazioni di gruppi e visite guidate.',
};

export const singletons = [siteSettings, homePage, storiaPage, collezionePage, contattiPage];
