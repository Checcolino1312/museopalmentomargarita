import { defineField, defineType } from 'sanity';

export const reperto = defineType({
  name: 'reperto',
  title: 'Reperto',
  type: 'document',
  fields: [
    defineField({
      name: 'inventoryId',
      title: 'Codice inventario',
      type: 'string',
      description: 'Formato INV-000. È anche l’indirizzo della pagina: /reperti/INV-001',
      validation: (Rule) =>
        Rule.required().regex(/^INV-\d{3}$/, {
          name: 'codice inventario',
          invert: false,
        }),
    }),
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'epoca',
      title: 'Epoca',
      type: 'string',
      description: 'Es. «fine ottocento/inizi novecento»',
    }),
    defineField({
      name: 'provenienza',
      title: 'Provenienza',
      type: 'string',
    }),
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'immagine',
    }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione',
      type: 'text',
      rows: 4,
      description: 'Testo breve mostrato in cima alla scheda.',
    }),
    defineField({
      name: 'noteTitolo',
      title: 'Titolo delle note storiche',
      type: 'string',
    }),
    defineField({
      name: 'noteCorpo',
      title: 'Note storiche',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'pullQuote',
      title: 'Citazione in evidenza',
      type: 'string',
      description:
        'Opzionale. Se compilata, viene mostrata come citazione dentro le note storiche. Se vuota, non appare nulla.',
    }),
  ],
  orderings: [
    {
      title: 'Codice inventario',
      name: 'inventoryIdAsc',
      by: [{ field: 'inventoryId', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'nome', subtitle: 'inventoryId', media: 'foto' },
  },
});
