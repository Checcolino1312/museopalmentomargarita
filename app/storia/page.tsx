import Image from 'next/image';

export const metadata = {
  title: 'Storia del palmento — Museo Palmento Margarita',
};

const TIMELINE = [
  { year: 'XVI sec.', title: 'I primi palmenti', desc: 'Nelle campagne tra Francavilla Fontana e Villa Castelli si diffondono le prime costruzioni in pietra.' },
  { year: '1700', title: "L'apogeo della tradizione", desc: 'Il palmento diventa parte integrante della masseria: vendemmia, pigiatura, conservazione, trasporto.' },
  { year: '1800', title: 'Margarita & Carissimo', desc: "L'unione delle due famiglie segna la continuità del sito — Francavilla Fontana incontra Benevento." },
  { year: '1950', title: 'La fine delle masserie', desc: "L'industrializzazione e l'esodo rurale segnano il declino. Molti palmenti vengono abbandonati." },
  { year: '2024', title: 'Nasce il Museo', desc: "Il Palmento Margarita riapre. Cinquantanove oggetti diventano la voce di un'intera civiltà." },
];

export default function StoriaPage() {
  return (
    <>
      {/* HERO — immagine larga, testo sotto */}
      <section className="storia-hero">
        <div className="storia-hero__img-wrap">
          <Image
            src="/hero-storia_21x8.png"
            alt="Vigneto pugliese"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="container">
          <div className="storia-hero__text">
            <h1>Il palmento e la tradizione del vino.</h1>
            <p className="lead">Tra il XVI e il XIX secolo, nelle campagne pugliesi, il palmento in pietra era il cuore della trasformazione dell'uva in vino.</p>
          </div>
        </div>
      </section>

      {/* SEZIONE 1 — immagine grande (5/8), testo stretto */}
      <section className="s1">
        <div className="container">
          <div className="s1__grid">
            <div className="s1__img-wrap">
              <Image
                src="/storia-sezione-1_4x3.png"
                alt="Vendemmia tradizionale pugliese"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="s1__text">
              <span className="label">01 · La civiltà contadina</span>
              <h2>I «viddani» e la vendemmia.</h2>
              <p>La vendemmia era il momento centrale dell'anno rurale pugliese — tramandato oralmente, fatto di gesti antichi e collaborazione profonda con la terra. Il palmento non era solo uno strumento: era il luogo dove la comunità si ritrovava.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <div className="storia-pull">
        <div className="container">
          <blockquote>«Puoi ancora sentire l'odore del mosto nelle pietre di questo cortile.»</blockquote>
        </div>
      </div>

      {/* SEZIONE 2 — testo più stretto, immagine ritratto */}
      <section className="s2">
        <div className="container">
          <div className="s2__grid">
            <div className="s2__text">
              <span className="label">02 · La terra e la vite</span>
              <h2>Primitivo, Negroamaro, Malvasia Nera.</h2>
              <p>Il territorio pugliese, tra Salento e Valle d'Itria, porta con sé una vocazione antica per la coltivazione della vite. Uve autoctone che raccontano secoli di lavoro, di sole abbondante e di terreni calcarei.</p>
            </div>
            <div className="s2__img-wrap">
              <Image
                src="/storia-sezione-2_3x4.png"
                alt="Grappolo d'uva rossa"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 3 — immagine full-width + testo sotto */}
      <section className="s3">
        <div className="s3__img-wrap">
          <Image
            src="/storia-sezione-3_16x7.png"
            alt="Portale in pietra della masseria"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="container">
          <div className="s3__text">
            <span className="label">03 · Una famiglia, un nome</span>
            <p>«Margarita» è la famiglia originaria di Francavilla Fontana, unita ai Carissimo di origini beneventane. Un nome che intreccia radici familiari, tradizione agricola e identità locale — non un'astrazione, ma una storia con un cognome e una pietra.</p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section">
        <div className="container">
          <h2>Quattro secoli.</h2>
          <div className="timeline-list">
            {TIMELINE.map((t) => (
              <div key={t.year} className="timeline-row">
                <div className="year">{t.year}</div>
                <div className="tl-body">
                  <div className="title">{t.title}</div>
                  <div className="desc">{t.desc}</div>
                </div>
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
        .label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 14px;
        }

        /* ── Hero ── */
        .storia-hero__img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 21 / 8;
          overflow: hidden;
        }
        .storia-hero__text {
          padding: clamp(36px, 5vw, 64px) 0 clamp(40px, 5vw, 56px);
          max-width: 70ch;
        }
        .storia-hero h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2.2rem, 4.5vw, 4rem);
          line-height: 1.05;
          letter-spacing: 0.01em;
          color: var(--ink);
          margin: 0 0 18px;
        }
        .storia-hero .lead {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--ink-soft);
          margin: 0;
        }

        /* ── Sezione 1 — immagine grande ── */
        .s1 { padding-block: clamp(40px, 5vw, 64px); }
        .s1__grid {
          display: grid;
          grid-template-columns: 5fr 3fr;
          gap: clamp(28px, 4vw, 52px);
          align-items: center;
        }
        .s1__img-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: 2px;
          overflow: hidden;
        }
        .s1__text h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.6rem, 3vw, 2.6rem);
          line-height: 1.1;
          color: var(--ink);
          margin: 0 0 16px;
        }
        .s1__text p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--ink-soft);
          margin: 0;
        }

        /* ── Pull quote ── */
        .storia-pull { padding-block: clamp(48px, 6vw, 80px); background: var(--crema-2); }
        .storia-pull blockquote {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(1.5rem, 3.2vw, 2.6rem);
          line-height: 1.3;
          color: var(--verdes);
          margin: 0;
          padding: 0;
          max-width: 28ch;
        }

        /* ── Sezione 2 ── */
        .s2 { padding-block: clamp(40px, 5vw, 64px); }
        .s2__grid {
          display: grid;
          grid-template-columns: 2fr 3fr;
          gap: clamp(28px, 4vw, 52px);
          align-items: center;
        }
        .s2__img-wrap {
          position: relative;
          aspect-ratio: 3 / 4;
          border-radius: 2px;
          overflow: hidden;
        }
        .s2__text h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          line-height: 1.1;
          color: var(--ink);
          margin: 0 0 16px;
        }
        .s2__text p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--ink-soft);
          margin: 0;
        }

        /* ── Sezione 3 — full-width ── */
        .s3 { background: var(--crema-2); }
        .s3__img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 7;
          overflow: hidden;
        }
        .s3__text {
          padding: clamp(32px, 4vw, 52px) 0 clamp(40px, 5vw, 64px);
          max-width: 60ch;
        }
        .s3__text p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--ink-soft);
          margin: 0;
        }

        /* ── Timeline ── */
        .timeline-section { background: var(--verdes); color: var(--crema); padding-block: clamp(56px, 7vw, 96px); }
        .timeline-section h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-style: italic;
          font-size: clamp(2.4rem, 5vw, 4.8rem);
          line-height: 0.95;
          letter-spacing: 0.02em;
          margin: 0 0 52px;
        }
        .timeline-list { display: grid; gap: 0; }
        .timeline-row {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 32px;
          padding: 20px 0;
          border-top: 1px solid rgba(247,244,239,0.12);
          align-items: baseline;
        }
        .timeline-row:last-child { border-bottom: 1px solid rgba(247,244,239,0.12); }
        .timeline-row .year {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(247,244,239,0.45);
          padding-top: 3px;
        }
        .tl-body .title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 4px;
        }
        .tl-body .desc {
          font-size: 0.92rem;
          line-height: 1.55;
          color: rgba(247,244,239,0.65);
        }

        /* ── CTA ── */
        .cta-final { padding-block: clamp(56px, 7vw, 90px); text-align: center; }
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
          .s1__grid { grid-template-columns: 1fr; }
          .s2__grid { grid-template-columns: 1fr; }
          .s2__img-wrap { aspect-ratio: 16/9; order: -1; }
          .storia-hero__img-wrap { aspect-ratio: 16 / 9; }
          .s3__img-wrap { aspect-ratio: 4 / 3; }
        }
        @media (max-width: 560px) {
          .storia-hero h1 { font-size: clamp(1.8rem, 7vw, 2.4rem); }
          .storia-pull blockquote { font-size: clamp(1.2rem, 5vw, 1.6rem); }
          .timeline-section h2 { font-size: clamp(1.8rem, 7vw, 2.6rem); margin-bottom: 32px; }
          .timeline-row { grid-template-columns: 1fr; gap: 4px; padding: 16px 0; }
          .cta-final { padding-block: 44px; }
        }
      `}</style>
    </>
  );
}
