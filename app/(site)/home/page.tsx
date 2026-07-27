import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Museo Palmento Margarita — Francavilla Fontana',
};

export default function HomePage() {
  return (
    <>
      {/* HERO — immagine full-height, testo sovrapposto */}
      <section className="hero">
        <Image
          src="/transformed_MUSEO-22.jpg"
          alt="Facciata della masseria Margarita"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
          priority
        />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="container hero__content">
          <p className="hero__label">Francavilla Fontana, Puglia</p>
          <h1>La memoria<br />prende forma.</h1>
          <Link className="btn hero__btn" href="/storia">Scopri</Link>
        </div>
      </section>

      {/* IMMAGINI ASIMMETRICHE */}
      <section className="img-mosaic">
        <div className="container">
          <div className="img-mosaic__grid">
            <div className="img-mosaic__wide">
              <Image
                src="/MUSEO-10.jpg"
                alt="Sala ad archi del museo con abiti d'epoca"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center center' }}
              />
            </div>
            <div className="img-mosaic__stack">
              <div className="img-mosaic__tall">
                <Image
                  src="/MUSEO-7.jpg"
                  alt="Teca con oggetti storici e anfore"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center center' }}
                />
              </div>
              <div className="img-mosaic__sq">
                <Image
                  src="/MUSEO-13.jpg"
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
