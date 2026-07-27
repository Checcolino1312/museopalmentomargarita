import { Fragment } from 'react';
import { sanityFetch } from '@/lib/sanity-fetch';
import { contattiPageQuery, siteSettingsQuery, TAGS } from '@/lib/queries';
import { formatOrario, righeIndirizzo } from '@/lib/site';
import type { ContattiPage, SiteSettings } from '@/lib/types';

export const metadata = {
  title: 'Contatti — Museo Palmento Margarita',
};

export default async function ContattiPage() {
  const [contatti, settings] = await Promise.all([
    sanityFetch<ContattiPage | null>(contattiPageQuery, {}, [TAGS.contattiPage]),
    sanityFetch<SiteSettings | null>(siteSettingsQuery, {}, [TAGS.siteSettings]),
  ]);

  const indirizzo = righeIndirizzo(settings?.indirizzo);
  const orari = settings?.orari ?? [];

  return (
    <>
      <section className="contatti-hero">
        <div className="container">
          {contatti?.label && <p className="contatti-label">{contatti.label}</p>}
          <h1>{contatti?.titolo}</h1>
        </div>
      </section>

      <section className="contatti-body">
        <div className="container contatti-grid">

          <div className="contatti-card">
            <h2>{contatti?.doveSiamoTitolo ?? 'Dove siamo'}</h2>
            <p>
              {settings?.titolo}
              {indirizzo.map((riga) => (
                <Fragment key={riga}>
                  <br />
                  {riga}
                </Fragment>
              ))}
            </p>
          </div>

          {orari.length > 0 && (
            <div className="contatti-card">
              <h2>{contatti?.orariTitolo ?? 'Orari di apertura'}</h2>
              <dl className="orari-dl">
                {orari.map((o) => (
                  <Fragment key={o.giorni}>
                    <dt>{o.giorni}</dt>
                    <dd className={o.chiuso ? 'closed' : undefined}>{formatOrario(o)}</dd>
                  </Fragment>
                ))}
              </dl>
            </div>
          )}

          <div className="contatti-card contatti-card--email">
            <h2>{contatti?.scriviciTitolo ?? 'Scrivici'}</h2>
            <p>{contatti?.scriviciTesto}</p>
            {settings?.email && (
              <a className="btn contatti-btn" href={`mailto:${settings.email}`}>
                {settings.email}
              </a>
            )}
            {settings?.telefono && (
              <p className="contatti-tel">
                <a href={`tel:${settings.telefono.replace(/\s/g, '')}`}>{settings.telefono}</a>
              </p>
            )}
          </div>

        </div>
      </section>

      <style>{`
        .contatti-hero {
          padding: clamp(64px, 10vw, 120px) 0 clamp(32px, 4vw, 56px);
          border-bottom: 1px solid var(--rule-soft);
        }
        .contatti-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin: 0 0 16px;
        }
        .contatti-hero h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-style: italic;
          font-size: clamp(3rem, 7vw, 7rem);
          line-height: 0.95;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin: 0;
        }

        .contatti-body {
          padding-block: clamp(48px, 7vw, 96px);
        }
        .contatti-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(32px, 5vw, 64px);
          align-items: start;
        }
        .contatti-card h2 {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin: 0 0 20px;
          font-weight: 400;
        }
        .contatti-card p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--ink-soft);
          margin: 0 0 28px;
        }
        .contatti-card--email {
          background: var(--crema-2);
          padding: clamp(28px, 4vw, 44px);
          border-radius: 2px;
        }
        .contatti-card--email h2 { color: var(--ink-mute); }

        .orari-dl {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px 20px;
          margin: 0;
        }
        .orari-dl dt {
          font-family: var(--font-mono);
          font-size: 0.76rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink-mute);
          align-self: center;
        }
        .orari-dl dd {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 1rem;
          color: var(--ink);
          text-align: right;
        }
        .orari-dl dd.closed { color: var(--ink-mute); }

        /* Mostrati solo se email/telefono sono compilati nelle Impostazioni */
        .contatti-btn {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.76rem;
          letter-spacing: 0.08em;
          word-break: break-all;
        }
        .contatti-tel {
          margin: 16px 0 0;
          font-family: var(--font-mono);
          font-size: 0.82rem;
        }

        @media (max-width: 860px) {
          .contatti-grid { grid-template-columns: 1fr 1fr; }
          .contatti-card--email { grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .contatti-grid { grid-template-columns: 1fr; }
          .contatti-card--email { grid-column: auto; }
          .contatti-hero h1 { font-size: clamp(2.4rem, 10vw, 4rem); }
        }
      `}</style>
    </>
  );
}
