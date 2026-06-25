import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Museo Palmento Margarita — Francavilla Fontana',
};

export default function HomePage() {
  return (
    <>
      {/* HERO — immagine dominante, testo stretto */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__image">
              <div className="hero__image-inner">
                <Image
                  src="/transformed_MUSEO-4.jpg"
                  alt="Anfore e pompa antica nel palmento"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center center' }}
                  priority
                />
              </div>
            </div>
            <div className="hero__copy">
              <p className="hero__label">Francavilla Fontana, Puglia</p>
              <h1>La<br />memo&shy;ria<br />prende<br />forma.</h1>
              <Link className="btn" href="/storia">Scopri</Link>
            </div>
          </div>
        </div>
      </section>

      {/* IMMAGINI ASIMMETRICHE */}
      <section className="img-mosaic">
        <div className="container">
          <div className="img-mosaic__grid">
            <div className="img-mosaic__wide">
              <Image
                src="/transformed_MUSEO-10.jpg"
                alt="Sala ad archi del museo con abiti d'epoca"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center center' }}
              />
            </div>
            <div className="img-mosaic__stack">
              <div className="img-mosaic__tall">
                <Image
                  src="/transformed_MUSEO-7.jpg"
                  alt="Teca con oggetti storici e anfore"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center center' }}
                />
              </div>
              <div className="img-mosaic__sq">
                <Image
                  src="/transformed_MUSEO-13.jpg"
                  alt="Camino con ceramiche antiche"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>
            </div>
          </div>
          <p className="img-mosaic__caption">Il palmento di Francavilla Fontana · XVI–XIX sec.</p>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="pull-section">
        <div className="container container--narrow">
          <blockquote className="pull-quote">
            «Cinquantanove oggetti raccolti dalle masserie della provincia. Ognuno con la sua storia.»
          </blockquote>
          <Link href="/storia" className="pull-link">Leggi la storia →</Link>
        </div>
      </section>

      {/* ORARI */}
      <section className="visit">
        <div className="container">
          <div className="visit__inner">
            <div className="visit__copy">
              <h2>Vieni a trovarci.</h2>
              <p>Visite guidate ogni venerdì e sabato.</p>
            </div>
            <div className="visit__hours">
              <h3>Orari di apertura</h3>
              <dl>
                <dt>Lunedì — martedì</dt><dd className="closed">Chiuso</dd>
                <dt>Mercoledì — giovedì</dt><dd>10:00 — 13:00</dd>
                <dt>Venerdì — sabato</dt><dd>10:00 — 18:30</dd>
                <dt>Domenica</dt><dd>10:00 — 14:00</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .hero { padding: clamp(24px, 3vw, 40px) 0 clamp(40px, 5vw, 64px); }
        .hero__grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: clamp(24px, 4vw, 48px);
          align-items: end;
        }
        .hero__image-inner {
          position: relative;
          aspect-ratio: 3 / 4;
          border-radius: 2px;
          overflow: hidden;
        }
        .hero__copy {
          padding-bottom: clamp(16px, 2vw, 28px);
        }
        .hero__label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin: 0 0 20px;
        }
        .hero h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-style: italic;
          font-size: clamp(3.6rem, 8vw, 7.5rem);
          line-height: 0.9;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: var(--verdes);
          margin: 0 0 36px;
          hyphens: manual;
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
          .hero__grid { grid-template-columns: 1fr; }
          .hero__image { order: -1; }
          .hero__image-inner { aspect-ratio: 4 / 3; }
          .hero h1 { font-size: clamp(3rem, 12vw, 5rem); }
          .img-mosaic__grid { grid-template-columns: 1fr; }
          .img-mosaic__stack { flex-direction: row; }
          .img-mosaic__tall, .img-mosaic__sq { aspect-ratio: 1; flex: 1; }
          .visit__inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .hero { padding: 16px 0 28px; }
          .hero h1 { font-size: clamp(2.8rem, 14vw, 4rem); margin-bottom: 24px; }
          .img-mosaic__stack { display: none; }
          .img-mosaic__grid { grid-template-columns: 1fr; }
          .pull-quote { font-size: clamp(1.3rem, 5.5vw, 1.8rem); }
          .visit { padding-block: 44px; }
        }
      `}</style>
    </>
  );
}
