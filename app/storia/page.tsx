import Link from 'next/link';

export const metadata = {
  title: 'Storia del palmento — Museo Palmento Margarita',
};

const VITIGNI = [
  { lbl: '01 / autoctono', nm: 'Primitivo', ds: 'Intenso e avvolgente. Il rosso che dà il nome al primo a maturare.', autoctono: true },
  { lbl: '02 / autoctono', nm: 'Negroamaro', ds: 'Carattere deciso, note mediterranee. Spina dorsale dei rossi salentini.', autoctono: true },
  { lbl: '03 / autoctono', nm: 'Malvasia Nera', ds: 'Elegante e aromatica. In blend con il Negroamaro.', autoctono: true },
  { lbl: '04 / italiano', nm: 'Aglianico', ds: 'Diffuso, apprezzato per la qualità dei vini strutturati.', autoctono: false },
  { lbl: '05 / italiano', nm: 'Montepulciano', ds: 'Versatile, generoso. Si adatta alla terra calcarea della Murgia.', autoctono: false },
  { lbl: '06 / internazionale', nm: 'Chardonnay', ds: "Introdotto e adattato per ampliare lo stile dei bianchi locali.", autoctono: false },
  { lbl: '07 / internazionale', nm: 'Cabernet Sauvignon', ds: 'Aggiunge struttura e longevità alle cuvée pugliesi contemporanee.', autoctono: false },
];

const TIMELINE = [
  { year: 'XVI sec.', title: 'I primi palmenti', desc: 'Nelle campagne tra Francavilla Fontana e Villa Castelli si diffondono le prime costruzioni in pietra dedicate alla pigiatura.' },
  { year: '1700', title: "L'apogeo della tradizione", desc: 'Il palmento diventa parte integrante della masseria: nasce il sistema integrato di vendemmia, pigiatura, conservazione e trasporto.' },
  { year: '1800', title: 'Le famiglie Margarita & Carissimo', desc: "L'unione delle due famiglie segna la continuità del sito e introduce nuovi vitigni internazionali — Chardonnay, Cabernet Sauvignon — accanto a Primitivo e Negroamaro." },
  { year: '1950', title: 'La fine delle masserie', desc: "L'industrializzazione e l'esodo rurale segnano il declino: molti palmenti vengono abbandonati, alcuni perduti per sempre." },
  { year: '2024', title: 'Nasce il Museo', desc: 'Il Palmento Margarita riapre come spazio di memoria, custodia e racconto. Cinquantanove reperti diventano la voce di un\'intera civiltà.' },
];

export default function StoriaPage() {
  return (
    <>
      {/* HERO */}
      <section className="storia-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1>Il palmento e la tradizione del vino in Puglia.</h1>
          <p className="lead">Tra il XVI e il XIX secolo, nelle campagne pugliesi i palmenti in pietra erano il cuore della trasformazione dell'uva in vino. Oggi molti sono scomparsi. Il museo è il nostro modo di non dimenticarli.</p>
        </div>
      </section>

      {/* CAPITOLO 01 */}
      <section className="chapter chapter-1">
        <div className="container">
          <header className="chapter__head">
            <div className="num">CAPITOLO<strong>01</strong></div>
            <h2>Una testimonianza della civiltà contadina.</h2>
          </header>
          <div className="chapter__body">
            <div className="side">
              <strong>I «viddani»</strong>
              I contadini pugliesi che con esperienza e dedizione trasformavano l'uva in vino, gesto dopo gesto, in una catena di mestieri tramandata oralmente.
            </div>
            <div className="prose">
              <p>Diffuso per secoli nelle campagne pugliesi, il palmento rappresenta una testimonianza preziosa della civiltà contadina e del lavoro dei «viddani», i contadini che con esperienza e dedizione trasformavano l'uva in vino. La vendemmia era un momento centrale, tramandato di generazione in generazione, fatto di gesti antichi, collaborazione e profondo legame con la terra.</p>
              <p>Nel territorio di Francavilla Fontana, queste costruzioni, realizzate in pietra locale, erano parte integrante del paesaggio rurale tra il XVI e il XIX secolo. Oggi, molti palmenti sono scomparsi o abbandonati, ma restano simbolo di un patrimonio culturale e produttivo che ha segnato profondamente l'identità del territorio.</p>
              <p>Il Museo Palmento Margarita nasce proprio per valorizzare e custodire questa eredità, offrendo ai visitatori un viaggio nella storia del vino, nelle tradizioni agricole e nella vita quotidiana delle comunità rurali pugliesi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CAPITOLO 02 */}
      <section className="chapter chapter-2">
        <div className="container">
          <header className="chapter__head">
            <div className="num">CAPITOLO<strong>02</strong></div>
            <h2>Le uve tipiche del territorio.</h2>
          </header>
          <div className="chapter__body">
            <div className="side">
              <strong>Tra Salento e Valle d&apos;Itria</strong>
              Il clima mediterraneo, il sole abbondante e i terreni fertili rendono questa terra da sempre vocata alla coltivazione della vite.
            </div>
            <div className="prose">
              <p>Il territorio pugliese, tra Salento e Valle d'Itria, è da sempre vocato alla coltivazione della vite grazie al clima mediterraneo, al sole abbondante e ai terreni fertili. Queste uve raccontano il legame profondo tra natura e tradizione, contribuendo alla produzione di vini che sono oggi un simbolo riconosciuto della cultura pugliese.</p>
              <p>A questi vitigni autoctoni si affiancano anche vitigni internazionali, introdotti e adattati con successo al territorio — come lo Chardonnay e il Cabernet Sauvignon — utilizzati per ampliare la varietà e lo stile della produzione enologica locale.</p>
            </div>
          </div>
          <div className="vitigni-grid">
            {VITIGNI.map((v) => (
              <div key={v.nm} className={`vitigno${v.autoctono ? ' autoctono' : ''}`}>
                <div className="lbl">{v.lbl}</div>
                <div className="nm">{v.nm}</div>
                <div className="ds">{v.ds}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPITOLO 03 */}
      <section className="chapter chapter-3">
        <div className="container">
          <header className="chapter__head">
            <div className="num">CAPITOLO<strong>03</strong></div>
            <h2>Crocevia tra storia e territorio.</h2>
          </header>
          <div className="chapter__body">
            <div className="side">
              <strong>Via Appia</strong>
              L'antica arteria romana che collegava Roma al sud Italia. Lungo il percorso, viandanti e mercanti si fermavano per ristorarsi e degustare il vino locale.
            </div>
            <div className="prose">
              <p>Il Museo Palmento Margarita si trova lungo la strada provinciale Francavilla Fontana – Villa Castelli, in una posizione strategica tra le province di Taranto e Brindisi. Questo territorio rappresentava in passato un importante crocevia della via Appia, antica arteria romana che collegava Roma al sud Italia.</p>
              <p>Lungo questo percorso transitavano viandanti, mercanti e pellegrini, che trovavano ristoro nelle campagne circostanti, fermandosi per recuperare le energie e degustare il vino locale. La posizione del palmento testimonia dunque non solo una funzione agricola, ma anche un ruolo sociale e culturale, legato all'accoglienza e alla condivisione.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CAPITOLO 04 */}
      <section className="chapter chapter-4">
        <div className="container">
          <header className="chapter__head">
            <div className="num">CAPITOLO<strong>04</strong></div>
            <h2>L&apos;origine del nome.</h2>
          </header>
          <div className="chapter__body">
            <div className="side">
              <strong>Margarita &amp; Carissimo</strong>
              Due famiglie, due rotte: Francavilla Fontana e Benevento. Una storia che si intreccia in una sola memoria.
            </div>
            <div className="prose">
              <p>Il nome «Palmento Margarita» racchiude l'identità e la memoria del luogo. «Margarita» deriva dall'omonima famiglia originaria di Francavilla Fontana, unita alla famiglia Carissimo, di origini beneventane, che insieme hanno contribuito alla storia e alla continuità del sito.</p>
              <p>Un nome che intreccia radici familiari, tradizione agricola e identità locale, rendendo il museo un autentico simbolo del territorio: non un'astrazione, ma una storia con un cognome, una pietra e un raccolto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section">
        <div className="container">
          <h2>Quattro secoli di pietra, pigiatura e memoria.</h2>
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
        <div className="container cta-final__inner">
          <h2>Vieni a sentire il mosto.</h2>
          <div>
            <p>Visita guidata in piccoli gruppi, ogni venerdì e sabato. Disponibili percorsi per scuole, degustazioni con i vini del territorio e laboratori per famiglie nei mesi della vendemmia.</p>
            <div className="row" style={{ gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
              <Link className="btn btn--lg btn--accent" href="/collezione">Sfoglia la collezione <span className="arrow" /></Link>
              <a className="btn btn--lg btn--ghost" href="mailto:info@palmentomargarita.it">Contattaci</a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .storia-hero { padding: clamp(100px, 14vw, 200px) 0 clamp(80px, 9vw, 120px); position: relative; overflow: hidden; background: var(--bg); }
        .storia-hero .foglia-a { top: 80px; right: 6%; width: 280px; transform: rotate(-15deg); opacity: 0.5; }
        .storia-hero .foglia-b { bottom: -30px; left: 5%; width: 200px; transform: rotate(28deg); opacity: 0.45; }
        .storia-hero h1 { font-family: var(--font-display); font-weight: 800; font-size: clamp(3.6rem, 10vw, 10rem); line-height: 0.82; letter-spacing: -0.045em; margin: 22px 0 0; max-width: 14ch; text-wrap: balance; }
        .storia-hero .lead { margin-top: 56px; font-size: 1.32rem; line-height: 1.45; max-width: 60ch; color: var(--ink-soft); }

        .chapter { padding-block: clamp(80px, 9vw, 130px); position: relative; overflow: hidden; }
        .chapter__head { display: grid; grid-template-columns: 220px 1fr; gap: clamp(40px, 5vw, 80px); margin-bottom: 56px; align-items: end; padding-bottom: 32px; border-bottom: 1px solid var(--rule); }
        .chapter__head .num { font-family: var(--font-mono); font-size: 0.84rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); }
        .chapter__head .num strong { display: block; font-family: var(--font-display); font-weight: 800; font-size: clamp(3.5rem, 7vw, 6rem); line-height: 1; letter-spacing: -0.04em; color: var(--ink); margin-top: 8px; }
        .chapter__head h2 { font-family: var(--font-display); font-weight: 800; font-size: clamp(2.2rem, 4.4vw, 4.4rem); line-height: 0.92; letter-spacing: -0.03em; margin: 0; max-width: 18ch; }
        .chapter__body { display: grid; grid-template-columns: 220px 1fr; gap: clamp(40px, 5vw, 80px); align-items: start; }
        .chapter__body .side { font-family: var(--font-mono); font-size: 0.84rem; line-height: 1.6; color: var(--ink-mute); position: sticky; top: 100px; }
        .chapter__body .side strong { display: block; font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; color: var(--ink); letter-spacing: -0.01em; margin-bottom: 8px; }
        .chapter__body .prose { max-width: 64ch; font-size: 1.2rem; line-height: 1.55; color: var(--ink); }
        .chapter__body .prose p { margin: 0 0 1.2em; }
        .chapter-2 { background: var(--bg-paper); }
        .chapter-2 .chapter__head { border-bottom-color: var(--rule); }
        .chapter-4 { background: var(--viola); color: var(--crema); }
        .chapter-4 .chapter__head .num { color: color-mix(in oklab, var(--crema) 65%, transparent); }
        .chapter-4 .chapter__head .num strong { color: var(--crema); }
        .chapter-4 .chapter__head { border-bottom-color: color-mix(in oklab, var(--crema) 22%, transparent); }
        .chapter-4 .chapter__body .side { color: color-mix(in oklab, var(--crema) 65%, transparent); }
        .chapter-4 .chapter__body .side strong { color: var(--crema); }
        .chapter-4 .prose { color: var(--crema); }

        .vitigni-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-top: 56px; }
        .vitigno { padding: 24px 18px 22px; background: var(--crema); border-radius: var(--radius-2); min-height: 220px; display: flex; flex-direction: column; }
        .vitigno .lbl { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); }
        .vitigno .nm { font-family: var(--font-display); font-weight: 800; font-size: 1.3rem; line-height: 0.98; letter-spacing: -0.015em; margin: 14px 0 8px; }
        .vitigno .ds { font-size: 0.9rem; line-height: 1.4; color: var(--ink-soft); margin-top: auto; }
        .vitigno.autoctono { background: var(--magenta); color: var(--crema); }
        .vitigno.autoctono .lbl { color: var(--giallo); }
        .vitigno.autoctono .ds { color: color-mix(in oklab, var(--crema) 85%, transparent); }

        .timeline-section { background: var(--verdes); color: var(--crema); padding-block: clamp(80px, 9vw, 130px); position: relative; overflow: hidden; }
        .timeline-section .foglia-x { bottom: 30px; right: -20px; width: 240px; opacity: 0.18; transform: rotate(-20deg); }
        .timeline-section h2 { font-family: var(--font-display); font-weight: 800; font-size: clamp(2.4rem, 4.4vw, 4.2rem); line-height: 0.95; letter-spacing: -0.03em; margin: 0 0 64px; max-width: 22ch; }
        .timeline-list { display: grid; gap: 0; }
        .timeline-row { display: grid; grid-template-columns: 140px 200px 1fr; gap: 48px; padding: 28px 0; border-top: 1px solid color-mix(in oklab, var(--crema) 20%, transparent); align-items: baseline; }
        .timeline-row:last-child { border-bottom: 1px solid color-mix(in oklab, var(--crema) 20%, transparent); }
        .timeline-row .year { font-family: var(--font-display); font-weight: 800; font-size: 2rem; letter-spacing: -0.02em; color: var(--giallo); }
        .timeline-row .title { font-family: var(--font-display); font-weight: 700; font-size: 1.4rem; letter-spacing: -0.015em; line-height: 1.05; }
        .timeline-row .desc { color: color-mix(in oklab, var(--crema) 78%, transparent); line-height: 1.45; max-width: 52ch; }

        .cta-final { padding-block: clamp(80px, 9vw, 130px); position: relative; overflow: hidden; }
        .cta-final__inner { display: grid; grid-template-columns: 1.2fr 1fr; gap: 64px; align-items: end; }
        .cta-final h2 { font-family: var(--font-display); font-weight: 800; font-size: clamp(2.8rem, 6vw, 5.4rem); line-height: 0.92; letter-spacing: -0.035em; margin: 0; max-width: 14ch; }
        .cta-final p { font-size: 1.2rem; line-height: 1.5; color: var(--ink-soft); max-width: 44ch; }
        .cta-final .foglia-x { top: 20px; right: 4%; width: 180px; transform: rotate(-15deg); opacity: 0.5; }

        @media (max-width: 1000px) {
          .chapter__head, .chapter__body { grid-template-columns: 1fr; }
          .chapter__body .side { position: relative; top: 0; }
          .vitigni-grid { grid-template-columns: repeat(3, 1fr); }
          .timeline-row { grid-template-columns: 1fr; gap: 8px; padding: 24px 0; }
          .cta-final__inner { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 600px) {
          .storia-hero { padding: 40px 0 36px; }
          .storia-hero h1 { font-size: clamp(2.4rem, 10vw, 3.6rem); margin-top: 12px; }
          .storia-hero .lead { font-size: 1rem; margin-top: 20px; }

          .chapter { padding-block: 44px; }
          .chapter__head { gap: 16px; margin-bottom: 24px; padding-bottom: 16px; }
          .chapter__head .num { font-size: 0.74rem; }
          .chapter__head .num strong { font-size: clamp(2rem, 9vw, 3rem); }
          .chapter__head h2 { font-size: clamp(1.7rem, 7vw, 2.4rem); }
          .chapter__body .side { display: none; }
          .chapter__body .prose { font-size: 1rem; }

          .vitigni-grid { grid-template-columns: 1fr 1fr; gap: 4px; }
          .vitigno { min-height: auto; padding: 14px 12px; }
          .vitigno .lbl { display: none; }
          .vitigno .nm { font-size: 1rem; margin: 0 0 6px; }
          .vitigno .ds { font-size: 0.82rem; }

          .timeline-section { padding-block: 48px; }
          .timeline-section h2 { font-size: clamp(1.8rem, 7vw, 2.6rem); margin-bottom: 32px; }
          .timeline-row { padding: 18px 0; }
          .timeline-row .year { font-size: 1.2rem; }
          .timeline-row .title { font-size: 1.05rem; }
          .timeline-row .desc { font-size: 0.9rem; }

          .cta-final { padding-block: 48px; }
          .cta-final h2 { font-size: clamp(2rem, 8vw, 3rem); }
          .cta-final p { font-size: 1rem; }
          .cta-final .row { flex-direction: column; align-items: stretch; }
          .cta-final .btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </>
  );
}
