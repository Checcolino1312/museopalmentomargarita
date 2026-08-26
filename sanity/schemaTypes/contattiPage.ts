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
      name: 'intro',
      title: 'Testo introduttivo',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Compare sotto il titolo, prima dei riquadri.',
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
      initialValue: 'Orari di contatto',
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
    defineField({
      name: 'contattaciTitolo',
      title: 'Titolo dell’elenco «Contattaci per»',
      type: 'string',
      initialValue: 'Contattaci per',
    }),
    defineField({
      name: 'contattaciVoci',
      title: 'Voci dell’elenco',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Una voce per motivo di contatto. L’elenco sparisce se lasciato vuoto.',
    }),
    defineField({
      name: 'chiusura',
      title: 'Frase di chiusura',
      type: 'text',
      rows: 2,
      description: 'L’ultima riga della pagina, sotto l’elenco.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Pagina Contatti' }),
  },
});
