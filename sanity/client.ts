import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from './env';

/**
 * `useCdn: false` è intenzionale: la cache la gestisce Next tramite `next: { tags, revalidate }`
 * in `lib/sanity-fetch.ts`. Passando dalla CDN, dopo un webhook di revalidation si rischierebbe
 * di rileggere contenuto stantio.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
