import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

/**
 * Webhook chiamato da Sanity a ogni pubblicazione.
 *
 * Invalida solo i tag del documento modificato, così le altre pagine
 * restano in cache. I tag coincidono con i `_type` dello schema (vedi
 * `lib/queries.ts`), quindi basta leggere `_type` dal payload.
 *
 * Configurazione su manage.sanity.io -> API -> Webhooks:
 *   URL:      https://<dominio>/api/revalidate
 *   Dataset:  production
 *   Trigger:  create, update, delete
 *   Secret:   lo stesso valore di SANITY_REVALIDATE_SECRET
 *   Projection: {_type, inventoryId}
 */
type WebhookPayload = {
  _type?: string;
  inventoryId?: string;
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return new NextResponse('SANITY_REVALIDATE_SECRET non configurato', { status: 500 });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret);

    if (!isValidSignature) {
      return new NextResponse('Firma non valida', { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse('Payload senza _type: controlla la projection del webhook', {
        status: 400,
      });
    }

    // 'max' = stale-while-revalidate: serve il contenuto vecchio mentre rigenera.
    // La forma a un argomento è deprecata in Next 16.
    const tags = [body._type];
    if (body._type === 'reperto' && body.inventoryId) {
      tags.push(`reperto:${body.inventoryId}`);
    }

    for (const tag of tags) {
      revalidateTag(tag, 'max');
    }

    return NextResponse.json({ revalidated: true, tags });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Errore sconosciuto';
    return new NextResponse(message, { status: 500 });
  }
}
