import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import SanityImage from '@/components/SanityImage';
import SeguitoTesto from '@/components/SeguitoTesto';
import TestoSuFoto from '@/components/TestoSuFoto';
import { dividiTesto } from '@/lib/testo';
import { sanityFetch } from '@/lib/sanity-fetch';
import { homePageQuery, TAGS } from '@/lib/queries';
import type { HomePage } from '@/lib/types';

export default async function HomePage() {
  const home = await sanityFetch<HomePage | null>(homePageQuery, {}, [TAGS.homePage]);

  const galleria = home?.galleria;
  const immagini = galleria?.immagini ?? [];
  const intro = home?.introduzione;
  const mission = home?.mission;
  const visita = home?.visita;

  // Titolo e inizio del testo restano sempre visibili: il «+» rivela il seguito.
  const { visibile: introVisibile, resto: introResto } = intro?.apribile
    ? dividiTesto(intro.testo)
    : { visibile: intro?.testo ?? [], resto: [] };

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

      {/* MISSION — citazione scritta sopra la fotografia, se caricata */}
      {(mission?.citazione || mission?.testo) && (
        <TestoSuFoto immagine={mission.immagine}>
          <div className="mission">
            {mission.titolo && <span className="mission__label">{mission.titolo}</span>}
            {mission.citazione && (
              <blockquote className="mission__quote">«{mission.citazione}»</blockquote>
            )}
            {mission.testo && (
              <div className="mission__testo">
                <PortableText value={mission.testo} />
              </div>
            )}
          </div>
        </TestoSuFoto>
      )}

      {/* GALLERIA — immagini tutte della stessa dimensione, in griglia */}
      {immagini.length > 0 && (
        <section className="galleria">
          <div className="container">
            <div className="galleria__grid">
              {immagini.map((immagine) => (
                <div key={immagine._key} className="galleria__cella">
                  <SanityImage
                    image={immagine}
                    sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
            {galleria?.caption && <p className="galleria__caption">{galleria.caption}</p>}
          </div>
        </section>
      )}

      {/* INTRODUZIONE — «La storia prende vita» */}
      {(intro?.titolo || intro?.testo) && (
        <section className="intro">
          <div className="container">
            <div className={`intro__grid${intro.immagine ? '' : ' intro__grid--solo-testo'}`}>
              <div className="intro__testo">
                {intro.titolo && <h2>{intro.titolo}</h2>}
                {introVisibile.length > 0 && <PortableText value={introVisibile} />}
                {introResto.length > 0 && (
                  <SeguitoTesto>
                    <PortableText value={introResto} />
                  </SeguitoTesto>
                )}
              </div>
              {intro.immagine && (
                <div className="intro__img">
                  <SanityImage image={intro.immagine} sizes="(max-width: 860px) 100vw, 40vw" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* VISITA — su appuntamento, quindi un invito a contattare invece degli orari */}
      {(visita?.titolo || visita?.sottotitolo) && (
        <section className="visit">
          <div className="container">
            <div className="visit__inner">
              <div className="visit__copy">
                <h2>{visita.titolo}</h2>
                {visita.sottotitolo && <p>{visita.sottotitolo}</p>}
              </div>
              {visita.linkLabel && visita.linkHref && (
                <div className="visit__cta">
                  <Link className="btn" href={visita.linkHref}>
                    {visita.linkLabel}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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

        /* ── Galleria ──
           Celle tutte uguali, niente più una grande con due piccole accostate:
           ogni immagine ha lo stesso spazio e la stessa proporzione. */
        .galleria { padding-block: clamp(40px, 5vw, 72px); background: var(--crema-2); }
        .galleria__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .galleria__cella {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: 2px;
          overflow: hidden;
        }
        .galleria__caption {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin: 14px 0 0;
        }

        /* ── Pull quote ── */
        /* ── Introduzione ── */
        .intro { padding-block: clamp(56px, 7vw, 96px); }
        .intro__grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: clamp(32px, 5vw, 64px);
          align-items: start;
        }
        /* Senza immagine il testo non deve restare in una colonna stretta. */
        .intro__grid--solo-testo { grid-template-columns: minmax(0, 68ch); }
        .intro__testo h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.8rem, 3.4vw, 2.8rem);
          line-height: 1.1;
          color: var(--ink);
          margin: 0 0 20px;
        }
        .intro__testo p {
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--ink-soft);
          margin: 0 0 16px;
        }
        .intro__testo p:last-child { margin-bottom: 0; }
        .intro__img {
          position: relative;
          aspect-ratio: 3 / 4;
          border-radius: 2px;
          overflow: hidden;
        }

        /* ── Mission ── (sfondo e colore li dà TestoSuFoto) */
        .mission { max-width: 62ch; }
        .mission__label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: color-mix(in oklab, var(--crema) 55%, transparent);
          margin-bottom: 18px;
        }
        .mission__quote {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(1.4rem, 3vw, 2.3rem);
          line-height: 1.35;
          margin: 0 0 28px;
          padding: 0;
          border: none;
          text-wrap: pretty;
        }
        .mission__testo p {
          font-size: 1.02rem;
          line-height: 1.75;
          color: color-mix(in oklab, var(--crema) 78%, transparent);
          margin: 0 0 14px;
        }
        .mission__testo p:last-child { margin-bottom: 0; }

        /* ── Visita ── */
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
        .visit__cta { justify-self: start; align-self: center; }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .hero { height: clamp(380px, 75vw, 600px); }
          .hero h1 { font-size: clamp(3rem, 12vw, 5.5rem); }
          .galleria__grid { grid-template-columns: repeat(2, 1fr); }
          .intro__grid { grid-template-columns: 1fr; }
          .intro__img { aspect-ratio: 16 / 9; }
          .visit__inner { grid-template-columns: 1fr; }
          .visit__cta { align-self: start; }
        }
        @media (max-width: 560px) {
          .hero { height: clamp(320px, 90vw, 480px); }
          .hero h1 { font-size: clamp(2rem, 10vw, 3.2rem); margin-bottom: 20px; white-space: normal; }
          .hero__content { padding-bottom: 28px; }
          .galleria__grid { grid-template-columns: 1fr; }
          .intro { padding-block: 44px; }
          .visit { padding-block: 44px; }
        }
      `}</style>
    </>
  );
}
