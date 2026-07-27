export const metadata = {
  title: 'Contatti — Museo Palmento Margarita',
};

export default function ContattiPage() {
  return (
    <>
      <section className="contatti-hero">
        <div className="container">
          <p className="contatti-label">Francavilla Fontana, Puglia</p>
          <h1>Contatti.</h1>
        </div>
      </section>

      <section className="contatti-body">
        <div className="container contatti-grid">

          <div className="contatti-card">
            <h2>Dove siamo</h2>
            <p>Museo Palmento Margarita<br />Francavilla Fontana (BR)<br />Puglia, Italia</p>
          </div>

          <div className="contatti-card">
            <h2>Orari di apertura</h2>
            <dl className="orari-dl">
              <dt>Lunedì — martedì</dt><dd className="closed">Chiuso</dd>
              <dt>Mercoledì — giovedì</dt><dd>10:00 — 13:00</dd>
              <dt>Venerdì — sabato</dt><dd>10:00 — 18:30</dd>
              <dt>Domenica</dt><dd>10:00 — 14:00</dd>
            </dl>
          </div>

          <div className="contatti-card contatti-card--email">
            <h2>Scrivici</h2>
            <p>Per informazioni, prenotazioni di gruppi e visite guidate.</p>
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
