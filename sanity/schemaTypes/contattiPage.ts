import { defineField, defineType } from 'sanity';

export const contattiPage = defineType({
  name: 'contattiPage',
  title: 'Pagina Contatti',
  type: 'document',
  description: 'Indirizzo, email, telefono e orari vengono dalle Impostazioni del sito.',
  fields: [
    defineField({
      name: 'label',
      title: 'Sopratitolo',
      type: 'string',
    }),
    defineField({
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
    }),
    defineField({
      name: 'doveSiamoTitolo',
      title: 'Titolo del blocco indirizzo',
      type: 'string',
      initialValue: 'Dove siamo',
    }),
    defineField({
      name: 'orariTitolo',
      title: 'Titolo del blocco orari',
      type: 'string',
      initialValue: 'Orari di apertura',
    }),
    defineField({
      name: 'scriviciTitolo',
      title: 'Titolo del blocco contatto',
      type: 'string',
      initialValue: 'Scrivici',
    }),
    defineField({
      name: 'scriviciTesto',
      title: 'Testo del blocco contatto',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Pagina Contatti' }),
  },
});
