import { createImageUrlBuilder } from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId } from './env';

const builder = createImageUrlBuilder({ projectId, dataset });

/** Costruisce un URL della CDN Sanity per un'immagine, con crop/hotspot applicati. */
export function urlFor(source: Image) {
  return builder.image(source).auto('format').fit('max');
}

/**
 * URL pronto per `next/image` con larghezza massima.
 * Le trasformazioni le fa la CDN Sanity, non l'optimizer di Next.
 */
export function imageUrl(source: Image | undefined | null, width = 1600): string | null {
  if (!source) return null;
  return urlFor(source).width(width).url();
}
