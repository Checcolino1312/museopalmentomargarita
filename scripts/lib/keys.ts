import { randomUUID } from 'node:crypto';

export const newKey = (): string => randomUUID().replace(/-/g, '').slice(0, 12);

/**
 * Aggiunge `_key` agli oggetti contenuti in array che ne sono privi.
 *
 * Sanity identifica gli elementi di un array tramite `_key`: senza, lo Studio
 * mostra l'errore «Missing keys» e non consente di riordinarli o modificarli.
 * L'API invece accetta i documenti senza protestare, quindi il problema si
 * manifesta solo aprendo l'editor.
 *
 * Gli array di stringhe non sono interessati: la chiave serve solo agli oggetti.
 */
export function addMissingKeys<T>(node: T): T {
  if (Array.isArray(node)) {
    return node.map((item) => {
      const fixed = addMissingKeys(item);
      const isPlainObject = fixed !== null && typeof fixed === 'object' && !Array.isArray(fixed);

      if (isPlainObject && (fixed as Record<string, unknown>)._key === undefined) {
        return { ...(fixed as Record<string, unknown>), _key: newKey() };
      }
      return fixed;
    }) as T;
  }

  if (node !== null && typeof node === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node)) out[k] = addMissingKeys(v);
    return out as T;
  }

  return node;
}
