import { client } from '@/sanity/client';

/**
 * Wrapper su `client.fetch` che aggiunge la cache di Next.
 *
 * In Next 16 `fetch` non è più cachato di default: senza `next: { tags }`
 * ogni richiesta ripartirebbe da zero. I tag permettono al webhook in
 * `app/api/revalidate/route.ts` di invalidare solo ciò che è cambiato.
 *
 * `revalidate` è una rete di sicurezza per il caso in cui il webhook non
 * arrivi: senza di essa un contenuto modificato resterebbe vecchio a lungo.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = []
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { tags, revalidate: 3600 },
  });
}
