import Image from 'next/image';
import { imageUrl } from '@/sanity/image';
import type { Immagine } from '@/lib/types';

interface Props {
  image?: Immagine;
  /** Sovrascrive il testo alternativo salvato sull'immagine in Sanity. */
  alt?: string;
  /** Es. 'center 35%'. Riprende i valori usati finora nei CSS delle pagine. */
  objectPosition?: string;
  sizes?: string;
  priority?: boolean;
  /** Larghezza richiesta alla CDN Sanity. */
  width?: number;
}

/**
 * Immagine di Sanity in modalità `fill`: il contenitore deve avere
 * `position: relative` e dimensioni proprie, come nei CSS esistenti.
 * Se l'immagine manca non rende nulla, così il chiamante può mostrare un segnaposto.
 */
export default function SanityImage({
  image,
  alt,
  objectPosition = 'center center',
  sizes,
  priority,
  width,
}: Props) {
  const src = imageUrl(image, width);
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt ?? image?.alt ?? ''}
      fill
      style={{ objectFit: 'cover', objectPosition }}
      sizes={sizes}
      priority={priority}
    />
  );
}
