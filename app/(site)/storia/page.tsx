import { Fragment } from 'react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import SanityImage from '@/components/SanityImage';
import SeguitoTesto from '@/components/SeguitoTesto';
import TestoSuFoto from '@/components/TestoSuFoto';
import { dividiTesto } from '@/lib/testo';
import { sanityFetch } from '@/lib/sanity-fetch';
import { storiaPageQuery, TAGS } from '@/lib/queries';
import type { StoriaPage, StoriaSezione } from '@/lib/types';

export const metadata = {
  title: 'Storia del palmento — Museo Palmento Margarita',
};

/**
 * Le tre disposizioni hanno markup diverso, non solo CSS diverso:
 * `fullWidth` mette l'immagine fuori dal container per occupare tutta la larghezza.
 * Le classi s1/s2/s3 restano quelle di prima, così il CSS non cambia.
 */
function Sezione({ sezione }: { sezione: StoriaSezione }) {
  const { label, titolo, testo, immagine, layout, apribile } = sezione;

  // Titolo e inizio del testo restano sempre visibili: il «+» rivela il seguito.
  // Se il seguito è troppo breve, `dividiTesto` non ne nasconde nessuno.
  const { visibile, resto } = apribile
    ? dividiTesto(testo)
    : { visibile: testo ?? [], resto: [] };

  const testoBlocco = (
    <>
      {label && <span className="label">{label}</span>}
      {titolo && <h2>{titolo}</h2>}
      {visibile.length > 0 && <PortableText value={visibile} />}
      {resto.length > 0 && (
        <SeguitoTesto>
          <PortableText value={resto} />
        </SeguitoTesto>
      )}
    </>
  );

  if (layout === 'fullWidth') {
    return (
      <section className="s3">
        <div className="s3__img-wrap">
          <SanityImage image={immagine} sizes="100vw" />
        </div>
        <div className="container">
          <div className="s3__text">{testoBlocco}</div>
        </div>
      </section>
    );
  }

  if (layout === 'imgRight') {
    return (
      <section className="s2">
        <div className="container">
          <div className="s2__grid">
            <div className="s2__text">{testoBlocco}</div>
            <div className="s2__img-wrap">
              <SanityImage
                image={immagine}
                objectPosition="center 55%"
                sizes="(max-width: 860px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="s1">
      <div className="container">
        <div className="s1__grid">
          <div className="s1__img-wrap">
            <SanityImage image={immagine} sizes="(max-width: 860px) 100vw, 60vw" />
          </div>
          <div className="s1__text">{testoBlocco}</div>
        </div>
      </div>
    </section>
  );
}

export default async function StoriaPage() {
  const storia = await sanityFetch<StoriaPage | null>(storiaPageQuery, {}, [TAGS.storiaPage]);

  const sezioni = storia?.sezioni ?? [];
  const cta = storia?.ctaFinale;

  return (
    <>
      {/* HERO — immagine larga, testo sotto */}
      <section className="storia-hero">
        <div className="storia-hero__img-wrap">
          <SanityImage
            image={storia?.hero?.immagine}
            objectPosition="center 40%"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container">
          <div className="storia-hero__text">
            <h1>{storia?.hero?.titolo}</h1>
            {storia?.hero?.lead && <p className="lead">{storia.hero.lead}</p>}
          </div>
        </div>
      </section>

      {/* Sezioni, con la citazione inserita dopo la prima */}
      {sezioni.map((sezione, i) => (
        <Fragment key={sezione._key}>
          <Sezione sezione={sezione} />
          {i === 0 && storia?.pullQuote && (
            <TestoSuFoto immagine={storia.pullQuoteImmagine}>
              <blockquote className="storia-pull__quote">«{storia.pullQuote}»</blockquote>
            </TestoSuFoto>
          )}
        </Fragment>
      ))}

      {/* CTA */}
      <section className="cta-final">
        <div className="container">
          <h2>{cta?.titolo}</h2>
          <p>{cta?.testo}</p>
          {cta?.linkLabel && cta.linkHref && (
            <Link className="btn" href={cta.linkHref}>
              {cta.linkLabel}
            </Link>
          )}
        </div>
      </section>

      <style>{`
        .label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 14px;
        }

        /* ── Hero ── */
        .storia-hero__img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 21 / 8;
          overflow: hidden;
        }
        .storia-hero__text {
          padding: clamp(36px, 5vw, 64px) 0 clamp(40px, 5vw, 56px);
          max-width: 70ch;
        }
        .storia-hero h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2.2rem, 4.5vw, 4rem);
          line-height: 1.05;
          letter-spacing: 0.01em;
          color: var(--ink);
          margin: 0 0 18px;
        }
        .storia-hero .lead {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--ink-soft);
          margin: 0;
        }

        /* ── Sezione 1 — immagine grande ── */
        .s1 { padding-block: clamp(40px, 5vw, 64px); }
        .s1__grid {
          display: grid;
          grid-template-columns: 5fr 3fr;
          gap: clamp(28px, 4vw, 52px);
          align-items: center;
        }
        .s1__img-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: 2px;
          overflow: hidden;
        }
        .s1__text h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.6rem, 3vw, 2.6rem);
          line-height: 1.1;
          color: var(--ink);
          margin: 0 0 16px;
        }
        .s1__text p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--ink-soft);
          margin: 0;
        }

        /* ── Pull quote ── */
        /* Il colore lo dà TestoSuFoto: su fotografia il testo è chiaro. */
        .storia-pull__quote {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(1.5rem, 3.2vw, 2.6rem);
          line-height: 1.3;
          margin: 0;
          padding: 0;
          border: none;
          max-width: 28ch;
          text-wrap: pretty;
        }

        /* ── Sezione 2 ── */
        .s2 { padding-block: clamp(40px, 5vw, 64px); }
        .s2__grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: clamp(28px, 4vw, 52px);
          align-items: center;
        }
        .s2__img-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: 2px;
          overflow: hidden;
        }
        .s2__text h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          line-height: 1.1;
          color: var(--ink);
          margin: 0 0 16px;
        }
        .s2__text p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--ink-soft);
          margin: 0;
        }

        /* ── Sezione 3 — full-width ── */
        .s3 { background: var(--crema-2); }
        .s3__img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 7;
          overflow: hidden;
        }
        .s3__text {
          padding: clamp(32px, 4vw, 52px) 0 clamp(40px, 5vw, 64px);
          max-width: 60ch;
        }
        .s3__text p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--ink-soft);
          margin: 0;
        }

        /* ── CTA ── */
        .cta-final { padding-block: clamp(56px, 7vw, 90px); text-align: center; }
        .cta-final h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.1;
          margin: 0 0 12px;
        }
        .cta-final p { font-size: 1.05rem; color: var(--ink-soft); margin: 0 0 28px; }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .s1__grid { grid-template-columns: 1fr; }
          .s2__grid { grid-template-columns: 1fr; }
          .s2__img-wrap { order: -1; }
          .storia-hero__img-wrap { aspect-ratio: 16 / 9; }
          .s3__img-wrap { aspect-ratio: 4 / 3; }
        }
        @media (max-width: 560px) {
          .storia-hero h1 { font-size: clamp(1.8rem, 7vw, 2.4rem); }
          .storia-pull__quote { font-size: clamp(1.2rem, 5vw, 1.6rem); }
          .cta-final { padding-block: 44px; }
        }
      `}</style>
    </>
  );
}
