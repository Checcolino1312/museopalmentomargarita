import { defineArrayMember, defineField, defineType } from 'sanity';

export const percorsiPage = defineType({
  name: 'percorsiPage',
  title: 'Pagina Percorsi',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Apertura', default: true },
    { name: 'attivita', title: 'Attività' },
    { name: 'oltre', title: 'Oltre il museo' },
  ],
  fields: [
    defineField({
      name: 'label',
      title: 'Sopratitolo',
      type: 'string',
      group: 'hero',
      description: 'La riga piccola sopra il titolo.',
    }),
    defineField({
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'intro',
      title: 'Testo introduttivo',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'hero',
    }),
    defineField({
      name: 'heroImmagine',
      title: 'Immagine di apertura',
      type: 'immagine',
      group: 'hero',
      description: 'Facoltativa. Se manca, la pagina si apre direttamente con il testo.',
    }),

    defineField({
      name: 'attivitaTitolo',
      title: 'Titolo del blocco attività',
      type: 'string',
      group: 'attivita',
      initialValue: 'Vivi il museo',
    }),
    defineField({
      name: 'attivitaIntro',
      title: 'Testo introduttivo',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'attivita',
    }),
    defineField({
      name: 'gruppiAttivita',
      title: 'Attività, raggruppate',
      type: 'array',
      group: 'attivita',
      description:
        'Ogni gruppo diventa una voce a fisarmonica: si apre cliccando sul titolo. ' +
        'Il primo gruppo è aperto di partenza, così si capisce che gli altri si aprono.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'gruppoAttivita',
          fields: [
            defineField({
              name: 'titolo',
              title: 'Titolo del gruppo',
              type: 'string',
              description: 'Es. «Visite e percorsi»',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'voci',
              title: 'Attività del gruppo',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { title: 'titolo', voci: 'voci' },
            prepare: ({ title, voci }: { title?: string; voci?: string[] }) => ({
              title: title ?? 'Gruppo senza titolo',
              subtitle: `${voci?.length ?? 0} attività`,
            }),
          },
        }),
      ],
    }),

    defineField({
      name: 'oltreTitolo',
      title: 'Titolo',
      type: 'string',
      group: 'oltre',
      initialValue: 'Oltre il museo',
    }),
    defineField({
      name: 'oltreTesto',
      title: 'Testo',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'oltre',
    }),
    defineField({
      name: 'oltreImmagine',
      title: 'Immagine',
      type: 'immagine',
      group: 'oltre',
      description: 'Facoltativa. Senza immagine il testo occupa tutta la larghezza.',
    }),

    defineField({
      name: 'ctaFinale',
      title: 'Invito finale',
      type: 'object',
      group: 'oltre',
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
    prepare: () => ({ title: 'Pagina Percorsi' }),
  },
});
