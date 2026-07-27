import { defineArrayMember, defineField, defineType } from 'sanity';

export const storiaPage = defineType({
  name: 'storiaPage',
  title: 'Pagina Storia',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'sezioni', title: 'Sezioni' },
    { name: 'timeline', title: 'Timeline' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'immagine', title: 'Immagine', type: 'immagine' }),
        defineField({ name: 'titolo', title: 'Titolo', type: 'string' }),
        defineField({ name: 'lead', title: 'Testo introduttivo', type: 'text', rows: 3 }),
      ],
    }),

    defineField({
      name: 'sezioni',
      title: 'Sezioni',
      type: 'array',
      group: 'sezioni',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sezione',
          fields: [
            defineField({
              name: 'label',
              title: 'Etichetta',
              type: 'string',
              description: 'Es. «01 · La civiltà contadina»',
            }),
            defineField({ name: 'titolo', title: 'Titolo', type: 'string' }),
            defineField({
              name: 'testo',
              title: 'Testo',
              type: 'array',
              of: [{ type: 'block' }],
            }),
            defineField({ name: 'immagine', title: 'Immagine', type: 'immagine' }),
            defineField({
              name: 'layout',
              title: 'Disposizione',
              type: 'string',
              initialValue: 'imgLeft',
              options: {
                list: [
                  { title: 'Immagine a sinistra, testo a destra', value: 'imgLeft' },
                  { title: 'Testo a sinistra, immagine a destra', value: 'imgRight' },
                  { title: 'Immagine a tutta larghezza, testo sotto', value: 'fullWidth' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'titolo', subtitle: 'label', media: 'immagine' },
          },
        }),
      ],
    }),
    defineField({
      name: 'pullQuote',
      title: 'Citazione',
      type: 'text',
      rows: 3,
      group: 'sezioni',
      description: 'Mostrata fra la prima e la seconda sezione. Le virgolette « » sono automatiche.',
    }),

    defineField({
      name: 'timelineTitolo',
      title: 'Titolo della timeline',
      type: 'string',
      group: 'timeline',
      initialValue: 'Quattro secoli.',
    }),
    defineField({
      name: 'timeline',
      title: 'Voci della timeline',
      type: 'array',
      group: 'timeline',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'anno',
              title: 'Anno',
              type: 'string',
              description: 'Es. «XVI sec.» oppure «1700»',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'titolo', title: 'Titolo', type: 'string' }),
            defineField({ name: 'descrizione', title: 'Descrizione', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'titolo', subtitle: 'anno' } },
        }),
      ],
    }),
    defineField({
      name: 'ctaFinale',
      title: 'Invito finale',
      type: 'object',
      group: 'timeline',
      fields: [
        defineField({ name: 'titolo', title: 'Titolo', type: 'string' }),
        defineField({ name: 'testo', title: 'Testo', type: 'string' }),
        defineField({
          name: 'linkLabel',
          title: 'Etichetta del pulsante',
          type: 'string',
          description: 'Il pulsante appare solo se questa etichetta è compilata.',
        }),
        defineField({ name: 'linkHref', title: 'Indirizzo del pulsante', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Pagina Storia' }),
  },
});
