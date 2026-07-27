import { defineField, defineType } from 'sanity';

export const collezionePage = defineType({
  name: 'collezionePage',
  title: 'Pagina Collezione',
  type: 'document',
  fields: [
    defineField({
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
    }),
    defineField({
      name: 'lead',
      title: 'Testo introduttivo',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'etichettaTotale',
      title: 'Etichetta «Totale reperti»',
      type: 'string',
      initialValue: 'Totale reperti',
      description: 'Il numero è calcolato automaticamente dai reperti pubblicati.',
    }),
    defineField({
      name: 'etichettaProvenienza',
      title: 'Etichetta «Provenienza»',
      type: 'string',
      initialValue: 'Provenienza',
    }),
    defineField({
      name: 'valoreProvenienza',
      title: 'Valore della provenienza',
      type: 'string',
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Testo nel campo di ricerca',
      type: 'string',
      initialValue: 'Cerca un oggetto, un’epoca…',
    }),
    defineField({
      name: 'editorialCard',
      title: 'Riquadro editoriale',
      type: 'object',
      description: 'Il riquadro colorato inserito fra le schede della collezione.',
      fields: [
        defineField({ name: 'titolo', title: 'Titolo', type: 'string' }),
        defineField({ name: 'testo', title: 'Testo', type: 'text', rows: 3 }),
        defineField({ name: 'linkLabel', title: 'Etichetta del link', type: 'string' }),
        defineField({ name: 'linkHref', title: 'Indirizzo del link', type: 'string' }),
        defineField({
          name: 'posizione',
          title: 'Posizione',
          type: 'number',
          initialValue: 6,
          description:
            'Dopo quante schede inserire il riquadro. Con 6 compare al settimo posto, come ora.',
          validation: (Rule) => Rule.min(0).integer(),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Pagina Collezione' }),
  },
});
