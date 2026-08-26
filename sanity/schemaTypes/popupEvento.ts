import { defineField, defineType } from 'sanity';

/**
 * Avviso che compare in sovrimpressione sulla home, per eventi e comunicazioni.
 * Resta spento finché non lo si accende: `attivo` è l'unico interruttore.
 */
export const popupEvento = defineType({
  name: 'popupEvento',
  title: 'Pop-up eventi',
  type: 'document',
  fields: [
    defineField({
      name: 'attivo',
      title: 'Mostra il pop-up',
      type: 'boolean',
      initialValue: false,
      description:
        'Finché è spento il pop-up non appare, anche se i campi sotto sono compilati. ' +
        'Si può quindi preparare in anticipo e accendere al momento giusto.',
    }),
    defineField({
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
      description:
        'Chi ha già chiuso il pop-up non lo rivede più, a meno che il titolo non cambi: ' +
        'per un evento nuovo, cambiare il titolo lo fa ricomparire a tutti.',
      validation: (Rule) =>
        Rule.custom((titolo, context) => {
          const attivo = (context.document as { attivo?: boolean } | undefined)?.attivo;
          if (attivo && !titolo) return 'Serve un titolo per poter mostrare il pop-up.';
          return true;
        }),
    }),
    defineField({
      name: 'testo',
      title: 'Testo',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'immagine',
      title: 'Immagine',
      type: 'immagine',
      description: 'Facoltativa. Senza immagine il pop-up mostra solo il testo.',
    }),
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
      description: 'Es. /percorsi oppure https://…',
    }),
  ],
  preview: {
    select: { titolo: 'titolo', attivo: 'attivo', media: 'immagine' },
    prepare: ({ titolo, attivo, media }) => ({
      title: 'Pop-up eventi',
      subtitle: attivo ? `Acceso — ${titolo ?? 'senza titolo'}` : 'Spento',
      media,
    }),
  },
});
