import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes, singletonTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

const singletons = new Set<string>(singletonTypes);

export default defineConfig({
  basePath: '/studio',
  title: 'Museo Palmento Margarita',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // I singleton non compaiono fra i tipi creabili con «+»
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  document: {
    // Sui singleton non si può duplicare, eliminare o creare
    actions: (actions, { schemaType }) =>
      singletons.has(schemaType)
        ? actions.filter(
            ({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action ?? '')
          )
        : actions,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
