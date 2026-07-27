import { randomUUID } from 'node:crypto';

export type PortableTextSpan = {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
};

export type PortableTextBlock = {
  _type: 'block';
  _key: string;
  style: 'normal';
  markDefs: never[];
  children: PortableTextSpan[];
  listItem?: 'bullet';
  level?: number;
};

const key = () => randomUUID().replace(/-/g, '').slice(0, 12);

/**
 * Converte il testo piatto dell'archivio in Portable Text.
 *
 * Ogni riga non vuota diventa un paragrafo. Le righe che iniziano con «- »
 * (presenti per esempio in INV-001) diventano voci di un elenco puntato.
 */
export function toPortableText(text: string | undefined | null): PortableTextBlock[] {
  if (!text) return [];

  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const isBullet = line.startsWith('- ');
      const content = isBullet ? line.slice(2).trim() : line;

      return {
        _type: 'block' as const,
        _key: key(),
        style: 'normal' as const,
        markDefs: [],
        children: [{ _type: 'span' as const, _key: key(), text: content, marks: [] }],
        ...(isBullet ? { listItem: 'bullet' as const, level: 1 } : {}),
      };
    });
}
