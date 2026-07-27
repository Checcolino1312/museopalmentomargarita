import { Fragment } from 'react';
import Link from 'next/link';
import SanityImage from '@/components/SanityImage';
import { sanityFetch } from '@/lib/sanity-fetch';
import { homePageQuery, siteSettingsQuery, TAGS } from '@/lib/queries';
import { formatOrario } from '@/lib/site';
import type { HomePage, SiteSettings } from '@/lib/types';

export default async function HomePage() {
  const [home, settings] = await Promise.all([
    sanityFetch<HomePage | null>(homePageQuery, {}, [TAGS.homePage]),
    sanityFetch<SiteSettings | null>(siteSettingsQuery, {}, [TAGS.siteSettings]),
  ]);

  const mosaico = home?.mosaico;
  const orari = settings?.orari ?? [];

  return (
    <>
      {/* HERO — immagine full-height, testo sovrapposto */}
      <section className="hero">
        <SanityImage
          image={home?.heroImmagine}
          objectPosition="center 35%"
          priority
          sizes="100vw"
        />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="container hero__content">
          {home?.heroLabel && <p className="hero__label">{home.heroLabel}</p>}
          <h1>
            {home?.heroTitoloRighe?.map((riga, i) => (
              <span key={riga}>
                {i > 0 && <br />}
                {riga}
              </span>
            ))}
          </h1>
          {home?.heroCta?.label && home.heroCta.href && (
            <Link className="btn hero__btn" href={home.heroCta.href}>
              {home.heroCta.label}
            </Link>
          )}
        </div>
      </section>

      {/* IMMAGINI ASIMMETRICHE */}
      <section className="img-mosaic">
        <div className="container">
          <div className="img-mosaic__grid">
            <div className="img-mosaic__wide">
              <SanityImage image={mosaico?.immagineGrande} sizes="(max-width: 860px) 100vw, 70vw" />
            </div>
            <div className="img-mosaic__stack">
              <div className="img-mosaic__tall">
                <SanityImage image={mosaico?.immagineAlta} sizes="30vw" />
              </div>
              <div className="img-mosaic__sq">
                <SanityImage
                  image={mosaico?.immagineQuadrata}
                  objectPosition="center top"
                  sizes="30vw"
                />
              </div>
            </div>
          </div>
          {mosaico?.caption && <p className="img-mosaic__caption">{mosaico.caption}</p>}
        </div>
      </section>

      {/* PULL QUOTE */}
      {home?.pullQuote?.testo && (
        <section className="pull-section">
          <div className="container container--narrow">
            <blockquote className="pull-quote">«{home.pullQuote.testo}»</blockquote>
            {home.pullQuote.linkLabel && home.pullQuote.linkHref && (
              <Link href={home.pullQuote.linkHref} className="pull-link">
                {home.pullQuote.linkLabel} →
              </Link>
            )}
          </div>
        </section>
      )}

      {/* ORARI */}
      <section className="visit">
        <div className="container">
          <div className="visit__inner">
            <div className="visit__copy">
              <h2>{home?.visita?.titolo}</h2>
              <p>{home?.visita?.sottotitolo}</p>
            </div>
            {orari.length > 0 && (
              <div className="visit__hours">
                <h3>{home?.visita?.titoloOrari ?? 'Orari di apertura'}</h3>
                <dl>
                  {orari.map((o) => (
                    <Fragment key={o.giorni}>
                      <dt>{o.giorni}</dt>
                      <dd className={o.chiuso ? 'closed' : undefined}>{formatOrario(o)}</dd>
                    </Fragment>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .hero {
          position: relative;
          height: clamp(500px, 88vh, 900px);
          overflow: hidden;
        }
        .hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(20, 12, 8, 0.72) 0%,
            rgba(20, 12, 8, 0.28) 45%,
            rgba(20, 12, 8, 0.04) 100%
          );
        }
        .hero__content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding-bottom: clamp(88px, 14vh, 180px);
        }
        .hero__label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(247, 244, 239, 0.6);
          margin: 0 0 16px;
        }
        .hero h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-style: italic;
          font-size: clamp(2.2rem, 7vw, 7rem);
          line-height: 1.0;
          letter-spacing: -0.01em;
          color: var(--crema);
          margin: 0 0 32px;
        }
        .hero__btn {
          background: transparent !important;
          border: 1px solid rgba(247,244,239,0.7) !important;
          color: var(--crema) !important;
        }
        .hero__btn:hover {
          background: var(--crema) !important;
          color: var(--verdes) !important;
        }

        /* ── Mosaico immagini asimmetrico ── */
        .img-mosaic { padding-block: clamp(32px, 4vw, 56px); background: var(--crema-2); }
        .img-mosaic__grid {
          display: grid;
          grid-template-columns: 5fr 2fr;
          gap: 6px;
          align-items: stretch;
        }
        .img-mosaic__wide {
          position: relative;
          aspect-ratio: 16 / 9;
          border-radius: 2px;
          overflow: hidden;
        }
        .img-mosaic__stack {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .img-mosaic__tall {
          position: relative;
          flex: 2;
          min-height: 0;
          border-radius: 2px;
          overflow: hidden;
        }
        .img-mosaic__sq {
          position: relative;
          flex: 1;
          min-height: 0;
          border-radius: 2px;
          overflow: hidden;
        }
        .img-mosaic__caption {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin: 12px 0 0;
        }

        /* ── Pull quote ── */
        .pull-section { padding-block: clamp(56px, 8vw, 100px); }
        .pull-quote {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(1.6rem, 3.5vw, 2.8rem);
          line-height: 1.3;
          color: var(--ink);
          margin: 0 0 24px;
          padding: 0;
          border: none;
        }
        .pull-link {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--verdes);
          border-bottom: 1px solid var(--verdes);
          padding-bottom: 2px;
        }

        /* ── Orari ── */
        .visit { background: var(--crema-2); padding-block: clamp(56px, 7vw, 96px); }
        .visit__inner { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 6vw, 80px); align-items: start; }
        .visit__copy h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.1;
          margin: 0 0 12px;
        }
        .visit__copy p { font-size: 1.05rem; color: var(--ink-soft); margin: 0; }
        .visit__hours { background: var(--verdes); color: var(--crema); padding: clamp(28px, 4vw, 44px); border-radius: 2px; }
        .visit__hours h3 { font-family: var(--font-display); font-weight: 600; font-size: 1.4rem; margin: 0 0 24px; }
        .visit__hours dl { display: grid; grid-template-columns: 1fr auto; gap: 11px 20px; margin: 0; }
        .visit__hours dt { font-family: var(--font-mono); font-size: 0.76rem; letter-spacing: 0.1em; text-transform: uppercase; color: color-mix(in oklab, var(--crema) 60%, transparent); align-self: center; }
        .visit__hours dd { margin: 0; font-family: var(--font-display); font-weight: 500; font-size: 1.05rem; }
        .visit__hours dd.closed { color: color-mix(in oklab, var(--crema) 40%, transparent); }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .hero { height: clamp(380px, 75vw, 600px); }
          .hero h1 { font-size: clamp(3rem, 12vw, 5.5rem); }
          .img-mosaic__grid { grid-template-columns: 1fr; }
          .img-mosaic__stack { flex-direction: row; }
          .img-mosaic__tall, .img-mosaic__sq { aspect-ratio: 1; flex: 1; }
          .visit__inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .hero { height: clamp(320px, 90vw, 480px); }
          .hero h1 { font-size: clamp(2rem, 10vw, 3.2rem); margin-bottom: 20px; white-space: normal; }
          .hero__content { padding-bottom: 28px; }
          .img-mosaic__stack { display: none; }
          .img-mosaic__grid { grid-template-columns: 1fr; }
          .pull-quote { font-size: clamp(1.3rem, 5.5vw, 1.8rem); }
          .visit { padding-block: 44px; }
        }
      `}</style>
    </>
  );
}
