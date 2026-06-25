export const metadata = {
  title: 'Storia del palmento — Museo Palmento Margarita',
};

const TIMELINE = [
  { year: 'XVI sec.', title: 'I primi palmenti', desc: 'Nelle campagne tra Francavilla Fontana e Villa Castelli si diffondono le prime costruzioni in pietra dedicate alla pigiatura.' },
  { year: '1700', title: "L'apogeo della tradizione", desc: 'Il palmento diventa parte integrante della masseria: nasce il sistema integrato di vendemmia, pigiatura, conservazione e trasporto.' },
  { year: '1800', title: 'Le famiglie Margarita & Carissimo', desc: "L'unione delle due famiglie segna la continuità del sito, intrecciando radici di Francavilla Fontana e Benevento." },
  { year: '1950', title: 'La fine delle masserie', desc: "L'industrializzazione e l'esodo rurale segnano il declino: molti palmenti vengono abbandonati, alcuni perduti per sempre." },
  { year: '2024', title: 'Nasce il Museo', desc: "Il Palmento Margarita riapre come spazio di memoria, custodia e racconto." },
];

export default function StoriaPage() {
  return (
    <>
      {/* HERO */}
      <section className="storia-hero">
        <div className="storia-hero__img" aria-hidden="true" />
        <div className="container storia-hero__content">
          <h1>Pietra, mosto, memoria.</h1>
          <p className="lead">Tra il XVI e il XIX secolo i palmenti in pietra erano il cuore della campagna pugliese. Il museo è il nostro modo di non dimenticarli.</p>
        </div>
      </section>

      {/* SEZIONE 1 */}
      <section className="s-block">
        <div className="container">
          <div className="s-block__grid">
            <div className="s-block__img" style={{ background: '#B8A898' }} aria-hidden="true" />
            <div className="s-block__text">
              <h2>La civiltà contadina.</h2>
              <p>Il palmento rappresenta una testimonianza preziosa del lavoro dei «viddani», i contadini che con esperienza e dedizione trasformavano l'uva in vino. La vendemmia era un momento centrale nella vita delle comunità rurali pugliesi — fatto di gesti antichi, collaborazione e profondo legame con la terra.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 2 */}
      <section className="s-block s-block--alt">
        <div className="container">
          <div className="s-block__grid">
            <div className="s-block__text">
              <h2>La terra e la vite.</h2>
              <p>Il territorio pugliese, tra Salento e Valle d'Itria, è da sempre vocato alla coltivazione della vite. Primitivo, Negroamaro, Malvasia Nera: uve autoctone che raccontano il legame profondo tra natura e tradizione di questa terra.</p>
            </div>
            <div className="s-block__img" style={{ background: '#8A9870' }} aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* SEZIONE 3 */}
      <section className="s-block">
        <div className="container">
          <div className="s-block__grid">
            <div className="s-block__img" style={{ background: '#9A8878' }} aria-hidden="true" />
            <div className="s-block__text">
              <h2>Un luogo, una famiglia.</h2>
              <p>Il nome «Palmento Margarita» porta con sé l'identità e la memoria del luogo. «Margarita» è la famiglia originaria di Francavilla Fontana, unita ai Carissimo di origini beneventane: un nome che intreccia radici familiari, tradizione agricola e identità locale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section">
        <div className="container">
          <h2>Quattro secoli di storia.</h2>
          <div className="timeline-list">
            {TIMELINE.map((t) => (
              <div key={t.year} className="timeline-row">
                <div className="year">{t.year}</div>
                <div className="title">{t.title}</div>
                <div className="desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-final">
        <div className="container">
          <h2>Vieni a trovarci.</h2>
          <p>Visite guidate ogni venerdì e sabato, in piccoli gruppi.</p>
          <a className="btn" href="mailto:info@palmentomargarita.it">Contattaci</a>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .storia-hero { position: relative; }
        .storia-hero__img {
          width: 100%;
          aspect-ratio: 21 / 9;
          background: linear-gradient(160deg, #c8b8a0 0%, #a89070 45%, #706050 100%);
        }
        .storia-hero__content {
          padding: clamp(40px, 6vw, 80px) 0 clamp(48px, 7vw, 90px);
        }
        .storia-hero h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-style: italic;
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          line-height: 1.0;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--verdes);
          margin: 0 0 20px;
        }
        .storia-hero .lead {
          font-size: 1.12rem;
          line-height: 1.65;
          color: var(--ink-soft);
          max-width: 54ch;
          margin: 0;
        }

        /* ── Sezioni alternanti ── */
        .s-block { padding-block: clamp(48px, 6vw, 80px); }
        .s-block--alt { background: var(--crema-2); }
        .s-block__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 64px);
          align-items: center;
        }
        .s-block__img {
          aspect-ratio: 4 / 3;
          border-radius: 2px;
        }
        .s-block__text h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          line-height: 1.1;
          letter-spacing: 0.01em;
          color: var(--ink);
          margin: 0 0 20px;
        }
        .s-block__text p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--ink-soft);
          max-width: 52ch;
          margin: 0;
        }

        /* ── Timeline ── */
        .timeline-section { background: var(--verdes); color: var(--crema); padding-block: clamp(64px, 8vw, 110px); }
        .timeline-section h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2rem, 4vw, 3.4rem);
          line-height: 1.05;
          letter-spacing: 0.01em;
          margin: 0 0 56px;
        }
        .timeline-list { display: grid; gap: 0; }
        .timeline-row {
          display: grid;
          grid-template-columns: 120px 1fr 2fr;
          gap: 40px;
          padding: 24px 0;
          border-top: 1px solid rgba(247,244,239,0.15);
          align-items: baseline;
        }
        .timeline-row:last-child { border-bottom: 1px solid rgba(247,244,239,0.15); }
        .timeline-row .year {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.4rem;
          color: var(--crema);
          opacity: 0.55;
        }
        .timeline-row .title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.15rem;
          line-height: 1.2;
        }
        .timeline-row .desc {
          font-size: 0.95rem;
          line-height: 1.55;
          color: rgba(247,244,239,0.7);
        }

        /* ── CTA ── */
        .cta-final { padding-block: clamp(56px, 7vw, 90px); text-align: center; background: var(--crema-2); }
        .cta-final h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.1;
          margin: 0 0 12px;
        }
        .cta-final p { font-size: 1.05rem; color: var(--ink-soft); margin: 0 0 28px; }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .storia-hero__img { aspect-ratio: 16 / 9; }
          .s-block__grid { grid-template-columns: 1fr; }
          .s-block--alt .s-block__img { order: -1; }
          .timeline-row { grid-template-columns: 80px 1fr; gap: 16px; }
          .timeline-row .desc { grid-column: 2; }
        }
        @media (max-width: 600px) {
          .storia-hero h1 { font-size: clamp(2.2rem, 9vw, 3rem); }
          .storia-hero .lead { font-size: 1rem; }
          .s-block { padding-block: 36px; }
          .s-block__text h2 { font-size: clamp(1.6rem, 7vw, 2.2rem); }
          .s-block__text p { font-size: 1rem; }
          .timeline-section { padding-block: 44px; }
          .timeline-section h2 { font-size: clamp(1.6rem, 6vw, 2.2rem); margin-bottom: 32px; }
          .timeline-row { grid-template-columns: 1fr; gap: 4px; padding: 18px 0; }
          .timeline-row .year { opacity: 0.45; font-size: 1rem; }
          .timeline-row .title { font-size: 1rem; }
          .cta-final { padding-block: 44px; }
        }
      `}</style>
    </>
  );
}
