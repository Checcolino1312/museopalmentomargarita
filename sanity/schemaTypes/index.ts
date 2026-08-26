import type { SchemaTypeDefinition } from 'sanity';

import { immagine } from './objects/immagine';
import { reperto } from './reperto';
import { siteSettings } from './siteSettings';
import { homePage } from './homePage';
import { storiaPage } from './storiaPage';
import { collezionePage } from './collezionePage';
import { contattiPage } from './contattiPage';
import { percorsiPage } from './percorsiPage';
import { popupEvento } from './popupEvento';

/** Documenti che esistono in una sola copia: nello Studio non si possono creare o eliminare. */
export const singletonTypes = [
  'siteSettings',
  'homePage',
  'storiaPage',
  'percorsiPage',
  'collezionePage',
  'contattiPage',
  'popupEvento',
] as const;

export const schemaTypes: SchemaTypeDefinition[] = [
  immagine,
  reperto,
  siteSettings,
  homePage,
  storiaPage,
  percorsiPage,
  collezionePage,
  contattiPage,
  popupEvento,
];
