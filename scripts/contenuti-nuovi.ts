/**
 * Testi consegnati dalla proprietaria (agosto 2026), trascritti integralmente.
 *
 * Rispetto all'originale sono stati corretti solo gli artefatti del copia-incolla:
 * le entità `&#39;` tornate apostrofi, un'emoji corrotta rimossa, i capoversi
 * ricomposti (il documento di partenza andava a capo a metà frase) e un doppio
 * punto finale. Nessuna frase è stata riscritta, accorciata o riordinata.
 *
 * I paragrafi sono separati da `\n`: `toPortableText` li trasforma in blocchi.
 */

// ─── Home ─────────────────────────────────────────────────────────────────────

export const homeIntroduzione = {
  titolo: 'La storia prende vita',
  apribile: true,
  testo: [
    "Il Museo Palmento Margarita nasce dal desiderio di custodire e tramandare la memoria di un mondo che ha rappresentato per secoli il cuore della vita rurale pugliese. Un patrimonio fatto di lavoro, sacrificio, saperi tramandati di generazione in generazione e di un profondo legame con la terra.",
    "Attraverso la raccolta di attrezzi agricoli, oggetti d'uso quotidiano, fotografie storiche, documenti e testimonianze, il museo racconta la storia dell'agricoltura pugliese tra Ottocento e Novecento, con particolare attenzione alle attività che hanno caratterizzato l'economia e la cultura del territorio: la produzione del vino, dell'olio d'oliva, delle conserve e di molti altri prodotti che ancora oggi rappresentano l'identità gastronomica della Puglia.",
    'Ogni oggetto esposto porta con sé una storia da raccontare...',
  ].join('\n'),
};

export const homeMission = {
  titolo: 'La mission del museo',
  citazione:
    'Trasformare la memoria rurale in esperienza culturale, preservando il patrimonio agricolo pugliese e rendendolo accessibile attraverso percorsi coinvolgenti, educativi e turistici capaci di connettere passato, territorio e innovazione',
  testo:
    'Il museo non è soltanto un luogo di conservazione, ma uno spazio vivo dedicato alla conoscenza e alla valorizzazione della cultura rurale. La ricostruzione degli ambienti e dei processi produttivi consente infatti di creare il contesto ideale per percorsi didattici, esperienze culturali e itinerari turistici, offrendo ai visitatori un viaggio autentico nella storia e nelle tradizioni della civiltà contadina pugliese.',
};

/** Il museo riceve su appuntamento: al posto degli orari, un invito a contattare. */
export const homeVisita = {
  titolo: 'Vieni a trovarci.',
  sottotitolo: 'Visite su appuntamento.',
  linkLabel: 'Prenota la tua visita',
  linkHref: '/contatti',
};

// ─── Storia ───────────────────────────────────────────────────────────────────

/**
 * Sostituiscono le tre sezioni precedenti. I `layout` riprendono quelli già in
 * uso, così l'impaginazione resta quella conosciuta; le immagini attuali vengono
 * conservate dallo script e riagganciate per posizione.
 */
export const storiaSezioni = [
  {
    // Aperta: è la prima che si incontra, e trovare solo titoli chiusi
    // all'inizio della pagina scoraggia la lettura.
    titolo: 'Origine del nome',
    layout: 'imgLeft' as const,
    apribile: false,
    testo: [
      'Il nome "Palmento Margarita" racchiude l\'identità e la memoria di questo luogo.',
      '"Margarita" prende il nome dall\'omonima famiglia originaria di Francavilla Fontana che, unendosi alla famiglia Carissimo, di origini beneventane, ha contribuito a scrivere la storia e a garantire la continuità di questo patrimonio nel tempo.',
      'Un nome che intreccia radici familiari, tradizione agricola e identità locale, rendendo il museo un autentico simbolo del territorio e della sua memoria storica.',
    ].join('\n'),
  },
  {
    titolo: 'Il Palmento e la tradizione del vino in Puglia',
    layout: 'imgRight' as const,
    apribile: true,
    testo: [
      "Il palmento è un'antica struttura rurale utilizzata per la pigiatura dell'uva e la fermentazione del mosto, cuore della tradizione vinicola prima dell'avvento delle tecnologie moderne. Si tratta di un ambiente semplice ma ingegnoso, composto da vasche comunicanti: nella vasca superiore l'uva veniva pigiata, mentre il mosto scorreva naturalmente in quella inferiore, dove iniziava il processo di fermentazione.",
      'Diffuso per secoli nelle campagne pugliesi, il palmento rappresenta una testimonianza preziosa della civiltà contadina e del lavoro dei "villani", i contadini che con esperienza e dedizione trasformavano l\'uva in vino. La vendemmia era un momento centrale, tramandato di generazione in generazione, fatto di gesti antichi, collaborazione e profondo legame con la terra.',
      "Nel territorio di Francavilla Fontana, queste costruzioni, realizzate in pietra locale, erano parte integrante del paesaggio rurale tra il XVI e il XIX secolo. Oggi, molti palmenti sono scomparsi o abbandonati, ma restano simbolo di un patrimonio culturale e produttivo che ha segnato profondamente l'identità del territorio.",
      'Il Museo Palmento Margarita nasce proprio per valorizzare e custodire questa eredità, offrendo ai visitatori un viaggio nella storia del vino, nelle tradizioni agricole e nella vita quotidiana delle comunità rurali pugliesi.',
    ].join('\n'),
  },
  {
    // Su desktop tutte e tre le sezioni stanno a due colonne, testo da un lato
    // e immagine dall'altro, alternando il lato per non renderle monotone.
    titolo: 'La località: crocevia tra storia e territorio',
    layout: 'imgLeft' as const,
    apribile: true,
    testo: [
      'Il Museo Palmento Margarita è situato lungo la strada provinciale Francavilla Fontana – Villa Castelli, in una posizione strategica tra le province di Taranto e Brindisi.',
      'Questo territorio rappresentava in passato un importante crocevia della Via Appia, antica arteria romana che collegava Roma al sud Italia. Lungo questo percorso transitavano viandanti, mercanti e pellegrini, che trovavano ristoro nelle campagne circostanti, fermandosi per recuperare le energie e degustare il vino locale.',
      "La posizione del palmento testimonia dunque non solo una funzione agricola, ma anche un ruolo sociale e culturale, legato all'accoglienza e alla condivisione.",
    ].join('\n'),
  },
];

// ─── Percorsi ed esperienze ───────────────────────────────────────────────────

export const percorsi = {
  label: 'Percorsi ed esperienze',
  titolo: 'Esperienze su misura',
  intro: [
    'Il Museo Palmento Margarita non è solo uno spazio espositivo, ma un luogo dove storia, tradizioni e sapori del territorio prendono vita attraverso esperienze autentiche pensate per visitatori, famiglie e scuole.',
    "Contattaci per ricevere maggiori informazioni, organizzare una visita o progettare il tuo percorso didattico, culturale e turistico. Saremo lieti di costruire insieme un'esperienza su misura alla scoperta dell'autentica cultura rurale pugliese.",
  ].join('\n'),

  attivitaTitolo: 'Vivi il museo',
  attivitaIntro:
    "Ogni esperienza è pensata per far riscoprire il valore del lavoro della terra, delle antiche tecniche produttive e delle tradizioni che hanno contribuito a costruire l'identità culturale della Puglia. Tra le attività e i servizi offerti:",

  /**
   * Le tredici attività dell'elenco originale, raggruppate per tema: un elenco
   * unico di tredici righe si legge male. I titoli dei gruppi sono l'unica
   * aggiunta rispetto al testo consegnato, e si cambiano dallo Studio.
   */
  gruppiAttivita: [
    {
      titolo: 'Visite e itinerari',
      voci: [
        'Visite guidate al museo con approfondimenti sulla civiltà contadina tra Ottocento e Novecento.',
        'Itinerari turistici integrati alla scoperta del patrimonio rurale, delle masserie, dei vigneti e dei luoghi di interesse del territorio.',
        'Visite personalizzate per gruppi organizzati, associazioni e tour operator.',
      ],
    },
    {
      titolo: 'Scuole e famiglie',
      voci: [
        'Percorsi didattici per scuole, con attività interattive dedicate al mondo agricolo e alle tradizioni alimentari.',
        'Attività per famiglie e bambini, pensate per avvicinare le nuove generazioni alla cultura contadina.',
      ],
    },
    {
      titolo: 'Laboratori e degustazioni',
      voci: [
        'Laboratori sulla preparazione delle tradizionali orecchiette pugliesi e altre antiche ricette.',
        'Dimostrazioni sulla trasformazione del grano e altri cereali',
        "Attività dedicate alla cultura dell'olio extravergine d'oliva, con approfondimenti sui metodi di raccolta e trasformazione.",
        'Percorsi tematici sulla storia del vino, dalla vendemmia alla vinificazione nei palmenti.',
        'Degustazioni nelle vigne e negli spazi adiacenti al museo.',
      ],
    },
    {
      titolo: 'Eventi e stagioni',
      voci: [
        'Eventi culturali e rievocazioni storiche dedicati alle tradizioni popolari del territorio.',
        'Incontri, conferenze e mostre tematiche sulla storia agricola e sulle eccellenze pugliesi.',
        'Esperienze stagionali, legate alla vendemmia, alla raccolta delle olive e alle produzioni tipiche del territorio.',
      ],
    },
  ],

  oltreTitolo: 'Oltre il museo',
  oltreTesto: [
    "Oltre agli spazi espositivi, il Museo Palmento Margarita offre la possibilità di vivere un'esperienza immersiva nei vigneti adiacenti al fabbricato, dove le tradizioni raccontate tra le antiche mura trovano ancora oggi la loro espressione più autentica. Passeggiare tra i filari significa scoprire da vicino il ciclo della vite, conoscere le caratteristiche dei vitigni tipici del territorio, quali Primitivo, Negroamaro, Malvasia Nera, e comprendere il profondo legame che unisce da secoli la comunità locale alla coltivazione dell'uva e alla produzione del vino.",
    "Durante le visite guidate e le esperienze all'aperto, i partecipanti possono osservare il paesaggio rurale pugliese, ascoltare il racconto delle pratiche tradizionali della viticoltura e approfondire le tecniche che hanno dato origine ai vini simbolo della nostra terra. Il percorso può essere arricchito da incontri con produttori locali e attività stagionali legate alla vendemmia, offrendo un viaggio autentico tra natura, cultura e sapori.",
    "Un'esperienza che permette di completare la visita al museo, collegando la memoria del passato alla realtà viva del territorio.",
  ].join('\n'),
};

// ─── Contatti ─────────────────────────────────────────────────────────────────

export const contatti = {
  label: 'Francavilla Fontana, Puglia',
  titolo: 'Organizza la tua visita al Museo Palmento Margarita',
  intro: [
    "Il Museo Palmento Margarita riceve su appuntamento, per offrire a ogni visitatore un'esperienza autentica e personalizzata alla scoperta della storia, delle tradizioni e della cultura rurale pugliese.",
    "Che si tratti di una visita individuale, di gruppo, di un percorso didattico o di un'esperienza tra museo e vigneti, saremo lieti di costruire insieme un itinerario su misura.",
  ].join('\n'),
  orariTitolo: 'Orari di contatto',
  contattaciTitolo: 'Contattaci per',
  contattaciVoci: [
    'Prenotare la tua visita al museo',
    'Organizzare percorsi didattici per scuole e gruppi',
    'Richiedere visite guidate personalizzate',
    'Partecipare a laboratori, degustazioni ed esperienze nei vigneti',
    'Ricevere informazioni su eventi e attività culturali',
  ],
  // Nell'originale finiva con due punti fermi.
  chiusura:
    "Ti aspettiamo per accompagnarti in un viaggio tra storia, tradizioni, sapori e paesaggi dell'autentica Puglia rurale.",
};

// ─── Impostazioni del sito ────────────────────────────────────────────────────

export const impostazioni = {
  whatsapp: '338 834 6910',
  /** Non sono orari di apertura: il museo riceve su appuntamento. */
  orari: [
    { giorni: 'Lunedì — venerdì', orario: '09:30 — 12:30 / 17:00 — 19:00', chiuso: false },
  ],
  nav: [
    { label: 'Museo', href: '/home' },
    { label: 'Storia', href: '/storia' },
    { label: 'Percorsi', href: '/percorsi' },
    { label: 'Contatti', href: '/contatti' },
  ],
  footerScopri: [
    { label: 'Storia del palmento', href: '/storia' },
    { label: 'Percorsi ed esperienze', href: '/percorsi' },
  ],
  copyright: '© 2026 Museo Palmento Margarita',
};
