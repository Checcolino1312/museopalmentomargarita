import Link from 'next/link';

export const metadata = {
  title: 'Museo Palmento Margarita — Francavilla Fontana',
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__copy">
              <h1>La memoria<br />prende forma.</h1>
              <span className="diamond" aria-hidden="true">◆</span>
              <p className="hero__lead">Il Museo Palmento Margarita racconta la storia della tradizione vitivinicola pugliese, custodendo cultura, passione e territorio tra il XVI e il XIX secolo.</p>
              <div className="cta-row">
                <Link className="btn" href="/storia">Scopri il museo</Link>
              </div>
            </div>
            <div className="hero__image">
              <div className="hero__image-inner" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section">
        <div className="container">
          <div className="intro-block">
            <div className="intro-block__head">
              <h2>Pietra, mosto, memoria.</h2>
              <Link className="btn btn--ghost" href="/storia" style={{ marginTop: 36, display: 'inline-flex' }}>
                Continua a leggere
              </Link>
            </div>
            <div className="intro-block__body">
              <p>Diffuso per secoli nelle campagne pugliesi, il palmento rappresenta una testimonianza preziosa della civiltà contadina e del lavoro dei «viddani», i contadini che con esperienza e dedizione trasformavano l'uva in vino. La vendemmia era un momento centrale, tramandato di generazione in generazione, fatto di gesti antichi, collaborazione e profondo legame con la terra.</p>
              <p>Nel territorio di Francavilla Fontana, queste costruzioni in pietra locale erano parte integrante del paesaggio rurale tra il XVI e il XIX secolo. Il Museo Palmento Margarita custodisce questa eredità: un viaggio nella storia del vino, nelle tradizioni agricole e nella vita quotidiana delle comunità rurali pugliesi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VISIT / ORARI */}
      <section className="visit">
        <div className="container">
          <div className="visit__inner">
            <div className="visit__copy">
              <h2>Vieni a sentire il mosto.</h2>
              <p className="body">Visite guidate ogni venerdì e sabato, in gruppi piccoli. Percorsi per scuole, degustazioni con i vini del territorio e laboratori per famiglie nei mesi della vendemmia.</p>
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
        .hero { padding: clamp(56px, 8vw, 110px) 0 clamp(56px, 7vw, 90px); }
        .hero__grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
          min-height: 55vh;
        }
        .hero h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-style: italic;
          font-size: clamp(3rem, 6.5vw, 5.8rem);
          line-height: 1.05;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: var(--verdes);
          margin: 0;
        }
        .diamond {
          display: block;
          color: var(--verdes);
          font-size: 0.8rem;
          margin: 22px 0;
          opacity: 0.65;
        }
        .hero__lead {
          font-size: 1.15rem;
          line-height: 1.65;
          color: var(--ink-soft);
          max-width: 44ch;
          margin: 0 0 36px;
        }
        .hero .cta-row { display: flex; gap: 16px; flex-wrap: wrap; }
        .hero__image { position: relative; }
        .hero__image-inner {
          aspect-ratio: 5 / 4;
          background: linear-gradient(160deg, #d4c5a0 0%, #c0ae88 28%, #9aaa80 60%, #6a7a52 100%);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }
        .hero__image-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, var(--bg) 0%, transparent 18%);
        }

        /* ── Intro ── */
        .intro-block {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: clamp(40px, 6vw, 96px);
          align-items: start;
        }
        .intro-block h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2rem, 4vw, 3.4rem);
          line-height: 1.1;
          letter-spacing: 0.01em;
          margin: 0;
        }
        .intro-block__body {
          font-size: 1.12rem;
          line-height: 1.7;
          max-width: 60ch;
          color: var(--ink-soft);
        }
        .intro-block__body p + p { margin-top: 1.1em; }

        /* ── Visit ── */
        .visit { background: #F5E8A0; color: var(--ink); padding-block: clamp(64px, 9vw, 110px); }
        .visit__inner { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(48px, 7vw, 96px); align-items: start; }
        .visit__copy h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2rem, 4.5vw, 3.6rem);
          line-height: 1.1;
          margin: 0;
        }
        .visit__copy .body { font-size: 1.1rem; line-height: 1.65; max-width: 48ch; margin-top: 24px; }
        .visit__hours { background: var(--verdes); color: var(--crema); padding: clamp(32px, 4vw, 48px); border-radius: 2px; }
        .visit__hours h3 { font-family: var(--font-display); font-weight: 600; font-size: 1.5rem; margin: 0 0 28px; letter-spacing: 0.01em; }
        .visit__hours dl { display: grid; grid-template-columns: 1fr auto; gap: 12px 24px; margin: 0; }
        .visit__hours dt { font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; color: color-mix(in oklab, var(--crema) 65%, transparent); align-self: center; }
        .visit__hours dd { margin: 0; font-family: var(--font-display); font-weight: 500; font-size: 1.1rem; }
        .visit__hours dd.closed { color: color-mix(in oklab, var(--crema) 45%, transparent); }

        /* ── Responsive ── */
        @media (max-width: 920px) {
          .hero__grid { grid-template-columns: 1fr; min-height: auto; }
          .hero__image { order: -1; }
          .hero__image-inner { aspect-ratio: 16/9; }
          .hero__image-inner::after { background: linear-gradient(to bottom, var(--bg) 0%, transparent 22%); }
          .intro-block { grid-template-columns: 1fr; }
          .visit__inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .hero { padding: 36px 0 32px; }
          .hero h1 { font-size: clamp(2.4rem, 10vw, 3.4rem); }
          .hero .cta-row { flex-direction: column; align-items: stretch; }
          .hero .cta-row .btn { width: 100%; justify-content: center; }
          .diamond { margin: 16px 0; }
          .intro-block { gap: 24px; }
          .intro-block h2 { font-size: clamp(1.8rem, 7vw, 2.4rem); }
          .intro-block__body { font-size: 1rem; }
          .visit { padding-block: 48px; }
          .visit__copy h2 { font-size: clamp(1.8rem, 7vw, 2.4rem); }
          .visit__hours { padding: 24px 20px; }
          .visit__hours dt { font-size: 0.72rem; }
        }
      `}</style>
    </>
  );
}
