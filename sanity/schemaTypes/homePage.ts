import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Pagina Home',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'mosaico', title: 'Mosaico immagini' },
    { name: 'resto', title: 'Citazione e visita' },
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
      name: 'mosaico',
      title: 'Mosaico',
      type: 'object',
      group: 'mosaico',
      fields: [
        defineField({
          name: 'immagineGrande',
          title: 'Immagine grande (sinistra)',
          type: 'immagine',
        }),
        defineField({
          name: 'immagineAlta',
          title: 'Immagine alta (destra, in alto)',
          type: 'immagine',
        }),
        defineField({
          name: 'immagineQuadrata',
          title: 'Immagine quadrata (destra, in basso)',
          type: 'immagine',
        }),
        defineField({
          name: 'caption',
          title: 'Didascalia',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'pullQuote',
      title: 'Citazione',
      type: 'object',
      group: 'resto',
      fields: [
        defineField({ name: 'testo', title: 'Testo', type: 'text', rows: 3 }),
        defineField({ name: 'linkLabel', title: 'Etichetta del link', type: 'string' }),
        defineField({ name: 'linkHref', title: 'Indirizzo del link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'visita',
      title: 'Sezione «Vieni a trovarci»',
      type: 'object',
      group: 'resto',
      description: 'Gli orari mostrati qui vengono dalle Impostazioni del sito.',
      fields: [
        defineField({ name: 'titolo', title: 'Titolo', type: 'string' }),
        defineField({ name: 'sottotitolo', title: 'Sottotitolo', type: 'string' }),
        defineField({
          name: 'titoloOrari',
          title: 'Titolo del riquadro orari',
          type: 'string',
          initialValue: 'Orari di apertura',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Pagina Home' }),
  },
});
