import { defineField, defineType } from 'sanity';

/**
 * Immagine con hotspot e testo alternativo.
 * Estende il tipo `image`, quindi resta compatibile con `urlFor()`.
 */
export const immagine = defineType({
  name: 'immagine',
  title: 'Immagine',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Testo alternativo',
      type: 'string',
      description: 'Descrive l’immagine per chi usa uno screen reader e per i motori di ricerca.',
      validation: (Rule) => Rule.required().warning('Consigliato per l’accessibilità.'),
    }),
  ],
});
