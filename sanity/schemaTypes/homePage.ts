import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Pagina Home',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'testi', title: 'Introduzione e mission' },
    { name: 'mosaico', title: 'Galleria immagini' },
    { name: 'resto', title: 'Sezione visita' },
  ],
  fields: [
    defineField({
      name: 'heroLabel',
      title: 'Sopratitolo',
      type: 'string',
      group: 'hero',
      description: 'La riga piccola sopra il titolo. Es. «Francavilla Fontana, Puglia»',
    }),
    defineField({
      name: 'heroTitoloRighe',
      title: 'Titolo (una voce per riga)',
      type: 'array',
      group: 'hero',
      of: [{ type: 'string' }],
      description:
        'Ogni voce è una riga del titolo. Con due voci il titolo va su due righe, come ora: «La memoria» / «prende forma.»',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'heroImmagine',
      title: 'Immagine di sfondo',
      type: 'immagine',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta',
      title: 'Pulsante',
      type: 'object',
      group: 'hero',
      options: { columns: 2 },
      fields: [
        defineField({ name: 'label', title: 'Etichetta', type: 'string' }),
        defineField({ name: 'href', title: 'Indirizzo', type: 'string' }),
      ],
    }),

    defineField({
      name: 'introduzione',
      title: 'Introduzione',
      type: 'object',
      group: 'testi',
      description: 'Il blocco di presentazione subito sotto l’immagine di apertura.',
      fields: [
        defineField({ name: 'titolo', title: 'Titolo', type: 'string' }),
        defineField({
          name: 'testo',
          title: 'Testo',
          type: 'array',
          of: [{ type: 'block' }],
        }),
        defineField({
          name: 'immagine',
          title: 'Immagine',
          type: 'immagine',
          description: 'Facoltativa. Senza immagine il testo occupa tutta la larghezza.',
        }),
        defineField({
          name: 'apribile',
          title: 'Nascondi il seguito dietro il «+»',
          type: 'boolean',
          initialValue: false,
          description:
            'Titolo e inizio del testo restano comunque visibili: si nasconde solo ' +
            'il seguito, che si apre con «Continua a leggere». Se il seguito è ' +
            'breve non viene nascosto per niente.',
        }),
      ],
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'object',
      group: 'testi',
      fields: [
        defineField({ name: 'titolo', title: 'Titolo', type: 'string' }),
        defineField({
          name: 'citazione',
          title: 'Citazione',
          type: 'text',
          rows: 4,
          description: 'Le virgolette « » vengono aggiunte da sole: scrivere il testo senza.',
        }),
        defineField({
          name: 'testo',
          title: 'Testo di accompagnamento',
          type: 'array',
          of: [{ type: 'block' }],
        }),
        defineField({
          name: 'immagine',
          title: 'Foto di sfondo',
          type: 'immagine',
          description:
            'La citazione viene scritta sopra questa foto. Senza foto resta su fondo verde.',
        }),
      ],
    }),

    defineField({
      name: 'galleria',
      title: 'Galleria',
      type: 'object',
      group: 'mosaico',
      description:
        'Le immagini vengono mostrate in griglia, tutte della stessa dimensione: ' +
        'tre per riga su computer, due su tablet, una su telefono.',
      fields: [
        defineField({
          name: 'immagini',
          title: 'Immagini',
          type: 'array',
          of: [{ type: 'immagine' }],
          description:
            'Il numero migliore è un multiplo di tre, così le righe restano piene. ' +
            'Con due immagini la griglia si adatta a due colonne.',
        }),
        defineField({
          name: 'caption',
          title: 'Didascalia',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'visita',
      title: 'Sezione «Vieni a trovarci»',
      type: 'object',
      group: 'resto',
      description:
        'Il museo riceve su appuntamento: qui non ci sono orari, ma un invito a contattare.',
      fields: [
        defineField({ name: 'titolo', title: 'Titolo', type: 'string' }),
        defineField({ name: 'sottotitolo', title: 'Sottotitolo', type: 'string' }),
        defineField({
          name: 'linkLabel',
          title: 'Etichetta del pulsante',
          type: 'string',
          description: 'Il pulsante appare solo se etichetta e indirizzo sono compilati.',
        }),
        defineField({
          name: 'linkHref',
          title: 'Indirizzo del pulsante',
          type: 'string',
          description: 'Es. /contatti',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Pagina Home' }),
  },
});
