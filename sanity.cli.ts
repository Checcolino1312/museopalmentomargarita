import { defineCliConfig } from 'sanity/cli';
import { dataset, projectId } from './sanity/env';

/**
 * Config della CLI Sanity: serve a comandi come
 * `npx sanity dataset export` (backup) e `npx sanity documents query`.
 */
export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: undefined,
});
