import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import SanityImage from '@/components/SanityImage';
import Fisarmonica from '@/components/Fisarmonica';
import { sanityFetch } from '@/lib/sanity-fetch';
import { percorsiPageQuery, TAGS } from '@/lib/queries';
import type { PercorsiPage } from '@/lib/types';

export const metadata = {
  title: 'Percorsi ed esperienze — Museo Palmento Margarita',
};

export default async function PercorsiPage() {
  const percorsi = await sanityFetch<PercorsiPage | null>(percorsiPageQuery, {}, [
    TAGS.percorsiPage,
  ]);

  const gruppi = percorsi?.gruppiAttivita ?? [];
  const cta = percorsi?.ctaFinale;

  return (
    <>
      {/* APERTURA */}
      <section className="perc-hero">
        {percorsi?.heroImmagine && (
          <div className="perc-hero__img">
            <SanityImage
              image={percorsi.heroImmagine}
              objectPosition="center 45%"
              priority
              sizes="100vw"
            />
          </div>
        )}
        <div className="container">
          <div className="perc-hero__testo">
            {percorsi?.label && <span className="perc-label">{percorsi.label}</span>}
            <h1>{percorsi?.titolo}</h1>
            {percorsi?.intro && (
              <div className="perc-lead">
                <PortableText value={percorsi.intro} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ATTIVITÀ — un gruppo per voce a fisarmonica */}
      {(percorsi?.attivitaIntro || gruppi.length > 0) && (
        <section className="perc-attivita">
          <div className="container">
            {percorsi?.attivitaTitolo && <h2>{percorsi.attivitaTitolo}</h2>}
            {percorsi?.attivitaIntro && (
              <div className="perc-attivita__intro">
                <PortableText value={percorsi.attivitaIntro} />
              </div>
            )}
            {gruppi.length > 0 && (
              <div className="perc-gruppi">
                {gruppi.map((gruppo, i) => (
                  // Il primo aperto: fa capire a colpo d'occhio che gli altri si aprono.
                  <Fisarmonica key={gruppo._key} titolo={gruppo.titolo} apertoDiDefault={i === 0}>
                    <ul className="perc-elenco">
                      {(gruppo.voci ?? []).map((voce) => (
                        <li key={voce}>{voce}</li>
                      ))}
                    </ul>
                  </Fisarmonica>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* OLTRE IL MUSEO */}
      {(percorsi?.oltreTitolo || percorsi?.oltreTesto) && (
        <section className="perc-oltre">
          <div className="container">
            <div className={`perc-oltre__grid${percorsi.oltreImmagine ? '' : ' perc-oltre__grid--solo-testo'}`}>
              <div className="perc-oltre__testo">
                {percorsi.oltreTitolo && <h2>{percorsi.oltreTitolo}</h2>}
                {percorsi.oltreTesto && <PortableText value={percorsi.oltreTesto} />}
              </div>
              {percorsi.oltreImmagine && (
                <div className="perc-oltre__img">
                  <SanityImage
                    image={percorsi.oltreImmagine}
                    sizes="(max-width: 860px) 100vw, 45vw"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* INVITO FINALE */}
      {(cta?.titolo || cta?.testo) && (
        <section className="perc-cta">
          <div className="container">
            {cta.titolo && <h2>{cta.titolo}</h2>}
            {cta.testo && <p>{cta.testo}</p>}
            {cta.linkLabel && cta.linkHref && (
              <Link className="btn" href={cta.linkHref}>
                {cta.linkLabel}
              </Link>
            )}
          </div>
        </section>
      )}

      <style>{`
        .perc-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 14px;
        }

        /* ── Apertura ── */
        .perc-hero__img {
          position: relative;
          width: 100%;
          aspect-ratio: 21 / 8;
          overflow: hidden;
        }
        .perc-hero__testo {
          padding: clamp(48px, 7vw, 96px) 0 clamp(32px, 4vw, 48px);
          max-width: 72ch;
        }
        .perc-hero h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2.2rem, 5vw, 4.2rem);
          line-height: 1.05;
          color: var(--ink);
          margin: 0 0 20px;
          text-wrap: balance;
        }
        .perc-lead p {
          font-size: 1.1rem;
          line-height: 1.75;
          color: var(--ink-soft);
          margin: 0 0 14px;
        }
        .perc-lead p:last-child { margin-bottom: 0; }

        /* ── Attività ── */
        .perc-attivita { background: var(--crema-2); padding-block: clamp(48px, 6vw, 88px); }
        .perc-attivita h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.8rem, 3.6vw, 2.8rem);
          line-height: 1.1;
          color: var(--ink);
          margin: 0 0 20px;
        }
        .perc-attivita__intro {
          max-width: 68ch;
          margin-bottom: clamp(28px, 4vw, 44px);
        }
        .perc-attivita__intro p {
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--ink-soft);
          margin: 0 0 14px;
        }
        .perc-attivita__intro p:last-child { margin-bottom: 0; }

        .perc-gruppi { max-width: 92ch; }
        .perc-elenco {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px clamp(28px, 4vw, 56px);
        }
        .perc-elenco li {
          position: relative;
          padding-left: 26px;
          font-size: 1rem;
          line-height: 1.55;
          color: var(--ink-soft);
        }
        /* Il trattino sostituisce il punto elenco rimosso con list-style: none. */
        .perc-elenco li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--verdes);
        }

        /* ── Oltre il museo ── */
        .perc-oltre { padding-block: clamp(48px, 6vw, 88px); }
        .perc-oltre__grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: clamp(32px, 5vw, 64px);
          align-items: center;
        }
        .perc-oltre__grid--solo-testo { grid-template-columns: minmax(0, 68ch); }
        .perc-oltre__testo h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.8rem, 3.4vw, 2.6rem);
          line-height: 1.1;
          color: var(--ink);
          margin: 0 0 18px;
        }
        .perc-oltre__testo p {
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--ink-soft);
          margin: 0 0 16px;
        }
        .perc-oltre__testo p:last-child { margin-bottom: 0; }
        .perc-oltre__img {
          position: relative;
          aspect-ratio: 3 / 4;
          border-radius: 2px;
          overflow: hidden;
        }

        /* ── Invito finale ── */
        .perc-cta {
          background: var(--verdes);
          color: var(--crema);
          padding-block: clamp(56px, 7vw, 90px);
          text-align: center;
        }
        .perc-cta h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.1;
          margin: 0 0 12px;
        }
        .perc-cta p {
          font-size: 1.05rem;
          color: color-mix(in oklab, var(--crema) 75%, transparent);
          margin: 0 0 28px;
        }
        .perc-cta .btn {
          background: var(--crema);
          color: var(--verdes);
          border-color: var(--crema);
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .perc-hero__img { aspect-ratio: 16 / 9; }
          .perc-oltre__grid { grid-template-columns: 1fr; }
          .perc-oltre__img { aspect-ratio: 16 / 9; }
        }
        @media (max-width: 560px) {
          .perc-elenco { grid-template-columns: 1fr; }
          .perc-hero h1 { font-size: clamp(1.9rem, 8vw, 2.6rem); }
          .perc-attivita, .perc-oltre, .perc-cta { padding-block: 44px; }
        }
      `}</style>
    </>
  );
}
