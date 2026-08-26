import { Fragment } from 'react';
import { PortableText } from '@portabletext/react';
import { sanityFetch } from '@/lib/sanity-fetch';
import { contattiPageQuery, siteSettingsQuery, TAGS } from '@/lib/queries';
import { formatOrario, linkWhatsApp, righeIndirizzo } from '@/lib/site';
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
  const whatsapp = linkWhatsApp(settings?.whatsapp);
  const voci = contatti?.contattaciVoci ?? [];

  return (
    <>
      <section className="contatti-hero">
        <div className="container">
          {contatti?.label && <p className="contatti-label">{contatti.label}</p>}
          <h1>{contatti?.titolo}</h1>
          {contatti?.intro && (
            <div className="contatti-intro">
              <PortableText value={contatti.intro} />
            </div>
          )}
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
            {whatsapp && (
              <a
                className="btn contatti-btn"
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp {settings?.whatsapp}
              </a>
            )}
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

      {/* CONTATTACI PER */}
      {voci.length > 0 && (
        <section className="contattaci">
          <div className="container">
            {contatti?.contattaciTitolo && <h2>{contatti.contattaciTitolo}</h2>}
            <ul className="contattaci__elenco">
              {voci.map((voce) => (
                <li key={voce}>{voce}</li>
              ))}
            </ul>
            {contatti?.chiusura && <p className="contattaci__chiusura">{contatti.chiusura}</p>}
          </div>
        </section>
      )}

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
        /* Il titolo è una frase intera, non una parola: dimensioni contenute
           rispetto agli altri hero, altrimenti occuperebbe l'intera schermata. */
        .contatti-hero h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2rem, 4.2vw, 3.4rem);
          line-height: 1.1;
          color: var(--ink);
          margin: 0;
          max-width: 22ch;
          text-wrap: balance;
        }

        .contatti-intro {
          max-width: 70ch;
          margin-top: clamp(24px, 3vw, 36px);
        }
        .contatti-intro p {
          font-size: 1.08rem;
          line-height: 1.75;
          color: var(--ink-soft);
          margin: 0 0 14px;
        }
        .contatti-intro p:last-child { margin-bottom: 0; }

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
        /* Più pulsanti impilati: WhatsApp ed email hanno bisogno di respiro. */
        .contatti-btn + .contatti-btn { margin-top: 10px; }
        .contatti-tel {
          margin: 16px 0 0;
          font-family: var(--font-mono);
          font-size: 0.82rem;
        }

        /* ── Contattaci per ── */
        .contattaci {
          background: var(--crema-2);
          padding-block: clamp(48px, 6vw, 80px);
        }
        .contattaci h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          line-height: 1.1;
          color: var(--ink);
          margin: 0 0 24px;
        }
        .contattaci__elenco {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 clamp(28px, 4vw, 56px);
          max-width: 90ch;
        }
        .contattaci__elenco li {
          position: relative;
          padding: 14px 0 14px 26px;
          border-top: 1px solid var(--rule-soft);
          font-size: 1rem;
          line-height: 1.55;
          color: var(--ink-soft);
        }
        .contattaci__elenco li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--verdes);
        }
        .contattaci__chiusura {
          margin: clamp(28px, 4vw, 40px) 0 0;
          max-width: 70ch;
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1.15rem;
          line-height: 1.6;
          color: var(--ink);
        }

        @media (max-width: 860px) {
          .contatti-grid { grid-template-columns: 1fr 1fr; }
          .contatti-card--email { grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .contatti-grid { grid-template-columns: 1fr; }
          .contatti-card--email { grid-column: auto; }
          .contatti-hero h1 { font-size: clamp(1.7rem, 7vw, 2.2rem); max-width: none; }
          .contattaci__elenco { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
