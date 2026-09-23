import type { SchemaTypeDefinition } from 'sanity';

import { immagine } from './objects/immagine';
import { siteSettings } from './siteSettings';
import { homePage } from './homePage';
import { storiaPage } from './storiaPage';
import { contattiPage } from './contattiPage';
import { percorsiPage } from './percorsiPage';
import { popupEvento } from './popupEvento';

/** Documenti che esistono in una sola copia: nello Studio non si possono creare o eliminare. */
export const singletonTypes = [
  'siteSettings',
  'homePage',
  'storiaPage',
  'percorsiPage',
  'contattiPage',
  'popupEvento',
] as const;

export const schemaTypes: SchemaTypeDefinition[] = [
  immagine,
  siteSettings,
  homePage,
  storiaPage,
  percorsiPage,
  contattiPage,
  popupEvento,
];
