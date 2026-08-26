import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Impostazioni condivise da tutto il sito.
 * Orari e indirizzo stanno SOLO qui: prima erano duplicati fra home, contatti e footer.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Impostazioni del sito',
  type: 'document',
  groups: [
    { name: 'generale', title: 'Generale', default: true },
    { name: 'contatti', title: 'Contatti e orari' },
    { name: 'navigazione', title: 'Menu e footer' },
  ],
  fields: [
    defineField({
      name: 'titolo',
      title: 'Titolo del sito',
      type: 'string',
      group: 'generale',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione (SEO)',
      type: 'text',
      rows: 3,
      group: 'generale',
      description: 'Usata come meta description predefinita.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'immagine',
      group: 'generale',
    }),

    defineField({
      name: 'indirizzo',
      title: 'Indirizzo',
      type: 'object',
      group: 'contatti',
      options: { columns: 2 },
      fields: [
        defineField({ name: 'via', title: 'Via', type: 'string' }),
        defineField({ name: 'cap', title: 'CAP', type: 'string' }),
        defineField({ name: 'citta', title: 'Città', type: 'string' }),
        defineField({ name: 'provincia', title: 'Provincia', type: 'string' }),
        defineField({ name: 'regione', title: 'Regione', type: 'string' }),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contatti',
      description: 'Lasciare vuoto se non c’è una casella attiva: il link non verrà mostrato.',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'telefono',
      title: 'Telefono',
      type: 'string',
      group: 'contatti',
      description: 'Lasciare vuoto se non c’è un numero attivo: il link non verrà mostrato.',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      group: 'contatti',
      description:
        'Numero senza prefisso internazionale, es. «338 834 6910». ' +
        'Il collegamento a WhatsApp viene composto da solo.',
    }),
    defineField({
      name: 'orari',
      title: 'Orari di contatto',
      type: 'array',
      group: 'contatti',
      description:
        'Quando si può telefonare o scrivere. Il museo riceve su appuntamento, ' +
        'quindi questi non sono orari di apertura al pubblico. Compaiono nella pagina Contatti.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'giorni',
              title: 'Giorni',
              type: 'string',
              description: 'Es. «Mercoledì — giovedì»',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'orario',
              title: 'Orario',
              type: 'string',
              description: 'Es. «10:00 — 13:00». Lasciare vuoto se chiuso.',
            }),
            defineField({
              name: 'chiuso',
              title: 'Chiuso',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'giorni', subtitle: 'orario' },
          },
        }),
      ],
    }),

    defineField({
      name: 'nav',
      title: 'Voci del menu',
      type: 'array',
      group: 'navigazione',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Etichetta',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Indirizzo',
              type: 'string',
              description: 'Percorso interno, es. /storia',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        }),
      ],
    }),
    defineField({
      name: 'footerScopri',
      title: 'Footer — colonna «Scopri»',
      type: 'array',
      group: 'navigazione',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Etichetta', type: 'string' }),
            defineField({ name: 'href', title: 'Indirizzo', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        }),
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Riga di copyright',
      type: 'string',
      group: 'navigazione',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Impostazioni del sito' }),
  },
});
