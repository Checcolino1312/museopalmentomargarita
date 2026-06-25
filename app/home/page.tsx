import Link from 'next/link';

export const metadata = {
  title: 'Museo Palmento Margarita — Francavilla Fontana',
};

const STRIP = [
  { label: 'Il palmento', bg: '#B8A898' },
  { label: 'La vigna',    bg: '#8A9870' },
  { label: 'La pietra',   bg: '#9A8878' },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__image">
              <div className="hero__image-inner" aria-hidden="true" />
            </div>
            <div className="hero__copy">
              <h1>La memoria<br />prende forma.</h1>
              <span className="diamond" aria-hidden="true">◆</span>
              <p className="hero__lead">Museo della tradizione vitivinicola pugliese — Francavilla Fontana.</p>
              <Link className="btn" href="/storia">Scopri il museo</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STRIP IMMAGINI */}
      <section className="img-strip">
        <div className="container">
          <div className="img-strip__grid">
            {STRIP.map(({ label, bg }) => (
              <figure key={label} className="img-strip__item">
                <div className="img-strip__ph" style={{ background: bg }} aria-hidden="true" />
                <figcaption>{label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* NOTA BREVE */}
      <section className="museum-note">
        <div className="container container--narrow">
          <p>Custode di cinquantanove reperti raccolti dalle masserie della provincia, il museo racconta la vendemmia pugliese attraverso gli strumenti, i luoghi e i volti di chi l'ha vissuta. <Link href="/storia" className="t-link">Leggi la storia →</Link></p>
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
        .hero { padding: clamp(32px, 4vw, 52px) 0 clamp(48px, 6vw, 80px); }
        .hero__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 64px);
          align-items: center;
        }
        .hero__image-inner {
          aspect-ratio: 2 / 3;
          background: linear-gradient(170deg, #c8b8a0 0%, #a89880 40%, #887060 100%);
          border-radius: 2px;
        }
        .hero h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-style: italic;
          font-size: clamp(3.2rem, 7vw, 7rem);
          line-height: 0.92;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--verdes);
          margin: 0;
        }
        .diamond {
          display: block;
          color: var(--verdes);
          font-size: 0.78rem;
          margin: 20px 0 18px;
          opacity: 0.6;
        }
        .hero__lead {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--ink-soft);
          margin: 0 0 32px;
        }

        /* ── Strip immagini ── */
        .img-strip { padding-block: clamp(40px, 5vw, 64px); background: var(--crema-2); }
        .img-strip__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 2vw, 24px);
        }
        .img-strip__item { margin: 0; }
        .img-strip__ph {
          aspect-ratio: 4 / 3;
          border-radius: 2px;
          margin-bottom: 10px;
        }
        .img-strip__item figcaption {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }

        /* ── Nota breve ── */
        .museum-note { padding-block: clamp(48px, 6vw, 80px); }
        .museum-note p {
          font-size: 1.18rem;
          line-height: 1.7;
          color: var(--ink-soft);
          text-align: center;
          max-width: 60ch;
          margin: 0 auto;
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
          .hero__image-inner { aspect-ratio: 16 / 9; }
          .visit__inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .hero { padding: 24px 0 36px; }
          .hero h1 { font-size: clamp(2.6rem, 11vw, 3.6rem); }
          .img-strip__grid { grid-template-columns: 1fr; gap: 8px; }
          .museum-note p { font-size: 1rem; text-align: left; }
          .visit { padding-block: 44px; }
          .visit__copy h2 { font-size: clamp(1.8rem, 7vw, 2.4rem); }
          .visit__hours { padding: 22px 18px; }
        }
      `}</style>
    </>
  );
}
