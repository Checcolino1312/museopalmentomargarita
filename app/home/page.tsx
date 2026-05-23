import Image from 'next/image';
import Link from 'next/link';
import Marquee from '@/components/Marquee';
import CardReperto from '@/components/CardReperto';
import { getAllReperti } from '@/lib/reperti';

export const metadata = {
  title: 'Museo Palmento Margarita — Francavilla Fontana',
};

const PREVIEW_IDS = ['INV-002', 'INV-004', 'INV-007', 'INV-024'];

const UVE = [
  { n: '01 / autoctono', name: 'Primitivo', desc: 'Intenso e avvolgente. Il rosso che dà il nome al primo a maturare nell\'estate pugliese.' },
  { n: '02 / autoctono', name: 'Negroamaro', desc: 'Carattere deciso, note mediterranee. La spina dorsale dei rossi del Salento.' },
  { n: '03 / autoctono', name: 'Malvasia Nera', desc: 'Elegante e aromatica. Tradizionalmente in blend con il Negroamaro.' },
  { n: '04 / italiano', name: 'Aglianico', desc: 'Diffuso e apprezzato per la qualità dei vini strutturati che produce.' },
  { n: '05 / italiano', name: 'Montepulciano', desc: 'Versatile, generoso. Adattato alla terra calcarea della Murgia.' },
];

const ROOMS = [
  { n: '01', name: 'La Pigiatura', sub: 'il palmento', desc: "Le strutture in pietra, le staffe e le leve di supporto utilizzate per pigiare l'uva a piedi nudi.", count: 12 },
  { n: '02', name: 'La Conservazione', sub: 'vino & mosto', desc: 'Anfore, capasoni, fiaschi rivestiti di paglia e bottiglie per i liquori tradizionali.', count: 15 },
  { n: '03', name: "L'Acqua & il fuoco", sub: 'masseria', desc: 'Pompe per il pozzo, fontane in ghisa, lampade a olio, attrezzi per la cucina contadina.', count: 14 },
  { n: '04', name: 'Il Lavoro nei campi', sub: 'utensili', desc: 'Falci, vanghe, contenitori per la conservazione di marmellate, miele e conserve sottolio.', count: 11 },
  { n: '05', name: 'La Strada', sub: 'via Appia', desc: 'Il crocevia con la via Appia: viandanti, mercanti, ristoro. Le mappe e i documenti del territorio.', count: 7 },
];

export default function HomePage() {
  const allReperti = getAllReperti();
  const preview = PREVIEW_IDS.map((id) => allReperti.find((r) => r.id === id)).filter(Boolean) as NonNullable<typeof allReperti[0]>[];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div>
              <div className="hero__eyebrow">
                <span className="t-eyebrow">Museo agricolo di Puglia</span>
                <span className="t-mono t-muted">EST. 2024</span>
              </div>
              <h1>
                La memoria <span className="italic">viva</span><br />
                del <span className="accent">palmento</span> pugliese.
              </h1>
              <div className="cta-row">
                <Link className="btn btn--lg" href="/collezione">Esplora i 59 reperti <span className="arrow" /></Link>
                <Link className="btn btn--lg btn--ghost" href="/storia">Scopri la storia</Link>
              </div>
            </div>
          </div>

          <div className="hero__strip">
            <div><small>Luogo</small><strong>Francavilla Fontana (BR)</strong></div>
            <div><small>Periodo</small><strong>XVI — XIX secolo</strong></div>
            <div><small>Collezione</small><strong>59 reperti catalogati</strong></div>
            <div><small>Vitigni narrati</small><strong>Primitivo, Negroamaro, Malvasia +3</strong></div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* INTRO STORIA */}
      <section className="section">
        <div className="container">
          <div className="intro-block">
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>— UN&apos;EREDITÀ —</div>
              <h2>Pietra, mosto, <em>memoria.</em></h2>
              <Link className="btn btn--ghost" href="/storia" style={{ marginTop: 36, display: 'inline-flex' }}>
                Continua a leggere <span className="arrow" />
              </Link>
            </div>
            <div className="body">
              <p>Diffuso per secoli nelle campagne pugliesi, il palmento rappresenta una testimonianza preziosa della civiltà contadina e del lavoro dei «viddani», i contadini che con esperienza e dedizione trasformavano l'uva in vino. La vendemmia era un momento centrale, tramandato di generazione in generazione, fatto di gesti antichi, collaborazione e profondo legame con la terra.</p>
              <p>Nel territorio di Francavilla Fontana, queste costruzioni in pietra locale erano parte integrante del paesaggio rurale tra il XVI e il XIX secolo. Il Museo Palmento Margarita custodisce questa eredità: un viaggio nella storia del vino, nelle tradizioni agricole e nella vita quotidiana delle comunità rurali pugliesi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* UVE TIPICHE */}
      <section className="section uve-section">
        <div className="container">
          <div className="coll-head">
            <h2>I vitigni del <em>territorio.</em></h2>
            <div className="t-body" style={{ color: 'var(--ink-soft)', maxWidth: '48ch' }}>Il clima mediterraneo, il sole abbondante e i terreni fertili del Salento e della Valle d'Itria custodiscono cinque vitigni che raccontano il legame profondo tra natura e tradizione.</div>
          </div>
          <div className="uve-grid">
            {UVE.map((u, i) => (
              <div key={i} className="uva-card">
                <div className="n">{u.n}</div>
                <div className="name">{u.name}</div>
                <div className="desc">{u.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLEZIONE PREVIEW */}
      <section className="section">
        <div className="container">
          <div className="coll-head">
            <h2>La <em>collezione,</em><br />oggetto per oggetto.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 22 }}>
              <div className="t-body" style={{ color: 'var(--ink-soft)', maxWidth: '48ch' }}>Cinquantanove reperti raccolti dalle masserie della provincia: utensili, anfore, lampade, strutture di sostegno per la pigiatura. Ognuno con la sua scheda, la sua epoca, la sua storia.</div>
              <Link className="btn btn--accent" href="/collezione">Vedi tutta la collezione <span className="arrow" /></Link>
            </div>
          </div>
          <div className="coll-grid">
            {preview.map((r) => <CardReperto key={r.id} reperto={r} />)}
          </div>
        </div>
      </section>

      {/* SALE DEL MUSEO */}
      <section className="rooms">
        <div className="container">
          <div className="rooms__head">
            <div><span className="eyebrow">— Il percorso di visita —</span></div>
            <h2>Cinque sale, una <em>vendemmia</em> intera.</h2>
          </div>
          <div className="room-list">
            {ROOMS.map((r) => (
              <div key={r.n} className="room-row">
                <div className="n">{r.n}</div>
                <div className="name">{r.name} <em>{r.sub}</em></div>
                <div className="desc">{r.desc}</div>
                <div className="count">{r.count}<small>reperti</small></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT / ORARI */}
      <section className="visit">
        <div className="container">
          <div className="visit__inner">
            <div className="visit__copy">
              <span className="t-eyebrow">— Pianifica la visita —</span>
              <h2 style={{ marginTop: 18 }}>Vieni a sentire il <em>mosto</em>.</h2>
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
        /* Home page-local CSS */
        .hero { position: relative; padding: clamp(80px, 10vw, 140px) 0 clamp(80px, 10vw, 130px); overflow: hidden; }
        .hero .container { position: relative; z-index: 2; }
        .hero__grid { display: block; }
        .hero h1 { font-family: var(--font-display); font-weight: 800; font-size: clamp(3.6rem, 9.4vw, 9rem); line-height: 0.83; letter-spacing: -0.04em; margin: 0; max-width: 15ch; }
        .hero h1 .accent { color: var(--verde); }
        .hero h1 .italic { font-style: italic; font-weight: 700; color: var(--magenta); }
        .hero__eyebrow { display: flex; gap: 14px; align-items: center; margin-bottom: 32px; }
        .hero__media { aspect-ratio: 4/5; border-radius: var(--radius-2); overflow: hidden; position: relative; background: var(--crema-2); }
        .hero__media .caption { position: absolute; bottom: 18px; left: 18px; background: var(--crema); color: var(--ink); padding: 8px 14px 7px; border-radius: var(--radius-pill); font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; }
        .hero .cta-row { margin-top: 44px; display: flex; gap: 16px; flex-wrap: wrap; }
        .hero .foglia-1 { top: 80px; right: -50px; width: 320px; transform: rotate(-12deg); }
        .hero .foglia-2 { top: 38%; left: 36%; width: 90px; transform: rotate(28deg); opacity: 0.55; }
        .hero__strip { margin-top: clamp(60px, 8vw, 100px); padding-top: 32px; border-top: 1px solid var(--rule); display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); font-family: var(--font-mono); font-size: 0.88rem; }
        .hero__strip > div small { display: block; font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 6px; }
        .hero__strip strong { font-family: var(--font-display); font-weight: 600; font-size: 1.05rem; color: var(--ink); letter-spacing: -0.005em; }

        .intro-block { display: grid; grid-template-columns: 1fr 1.4fr; gap: clamp(40px, 6vw, 96px); align-items: start; }
        .intro-block .eyebrow { font-family: var(--font-mono); font-size: 0.84rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); }
        .intro-block h2 { font-family: var(--font-display); font-weight: 700; font-size: clamp(2.4rem, 5vw, 4.4rem); line-height: 0.92; letter-spacing: -0.025em; margin: 0; }
        .intro-block h2 em { font-style: italic; color: var(--verde); font-weight: 700; }
        .intro-block .body { font-size: 1.14rem; line-height: 1.55; max-width: 60ch; color: var(--ink-soft); }
        .intro-block .body p + p { margin-top: 1.1em; }
        .intro-block .body p:first-child::first-letter { font-family: var(--font-display); font-weight: 800; font-size: 4.6em; float: left; line-height: 0.86; padding: 4px 10px 0 0; color: var(--magenta); }

        .uve-section { background: var(--bg-paper); position: relative; overflow: hidden; }
        .uve-section .foglia-x { top: -40px; right: 5%; width: 220px; transform: rotate(20deg); opacity: 0.6; }
        .uve-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 56px; }
        .uva-card { background: var(--crema); border-radius: var(--radius-2); padding: 28px 24px 24px; display: flex; flex-direction: column; gap: 18px; min-height: 280px; transition: background .25s ease, color .25s ease; cursor: pointer; }
        .uva-card .n { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); }
        .uva-card .name { font-family: var(--font-display); font-weight: 700; font-size: 1.7rem; line-height: 1.0; letter-spacing: -0.02em; }
        .uva-card .desc { font-size: 0.96rem; line-height: 1.45; color: var(--ink-soft); margin-top: auto; }
        .uva-card:nth-child(1):hover { background: var(--magenta); color: var(--crema); }
        .uva-card:nth-child(2):hover { background: var(--viola); color: var(--crema); }
        .uva-card:nth-child(3):hover { background: var(--lilla); color: var(--verdes); }
        .uva-card:nth-child(4):hover { background: var(--verde); color: var(--crema); }
        .uva-card:nth-child(5):hover { background: var(--giallo); color: var(--verdes); }
        .uva-card:hover .n, .uva-card:hover .desc { color: inherit; opacity: .85; }

        .coll-head { display: grid; grid-template-columns: 1.4fr 1fr; gap: var(--space-6); align-items: end; margin-bottom: 56px; }
        .coll-head h2 { font-family: var(--font-display); font-weight: 800; font-size: clamp(2.6rem, 6vw, 5.4rem); line-height: 0.9; letter-spacing: -0.03em; margin: 0; }
        .coll-head h2 em { font-style: italic; font-weight: 700; color: var(--verde); }
        .coll-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px 24px; }

        .rooms { background: var(--verdes); color: var(--crema); padding-block: clamp(80px, 10vw, 130px); position: relative; overflow: hidden; }
        .rooms__head { display: grid; grid-template-columns: 1fr 1.4fr; gap: var(--space-6); margin-bottom: 64px; align-items: end; }
        .rooms__head h2 { font-family: var(--font-display); font-size: clamp(2.4rem, 5vw, 4.4rem); line-height: 0.92; letter-spacing: -0.025em; font-weight: 800; margin: 0; }
        .rooms__head .eyebrow { font-family: var(--font-mono); font-size: 0.84rem; letter-spacing: 0.14em; text-transform: uppercase; color: color-mix(in oklab, var(--crema) 65%, transparent); }
        .rooms__head h2 em { font-style: italic; color: var(--giallo); }
        .room-list { display: grid; gap: 0; }
        .room-row { display: grid; grid-template-columns: 80px 1.3fr 2fr 90px; align-items: center; gap: 24px; padding: 32px 0; border-top: 1px solid color-mix(in oklab, var(--crema) 18%, transparent); cursor: pointer; transition: padding .25s ease; }
        .room-row:last-child { border-bottom: 1px solid color-mix(in oklab, var(--crema) 18%, transparent); }
        .room-row:hover { padding-inline: 16px; }
        .room-row .n { font-family: var(--font-mono); color: var(--giallo); font-size: 0.86rem; letter-spacing: 0.1em; }
        .room-row .name { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.6rem, 2.2vw, 2.4rem); letter-spacing: -0.02em; line-height: 1; }
        .room-row .name em { font-style: italic; color: var(--lilla); font-weight: 500; font-size: 0.65em; letter-spacing: 0; }
        .room-row .desc { color: color-mix(in oklab, var(--crema) 75%, transparent); font-size: 1.02rem; line-height: 1.4; max-width: 52ch; }
        .room-row .count { font-family: var(--font-mono); font-size: 1.1rem; text-align: right; color: var(--crema); }
        .room-row .count small { display: block; font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: color-mix(in oklab, var(--crema) 55%, transparent); margin-top: 4px; }
        .rooms .foglia-x { bottom: 80px; right: -30px; width: 240px; opacity: 0.18; transform: rotate(15deg); }

        .visit { background: var(--giallo); color: var(--verdes); padding-block: clamp(64px, 9vw, 110px); }
        .visit__inner { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(48px, 7vw, 96px); align-items: start; }
        .visit__copy h2 { font-family: var(--font-display); font-weight: 800; font-size: clamp(2.6rem, 5.4vw, 4.6rem); line-height: 0.92; letter-spacing: -0.03em; margin: 0; }
        .visit__copy h2 em { font-style: italic; font-weight: 700; color: var(--magenta); }
        .visit__copy .body { font-size: 1.12rem; line-height: 1.5; max-width: 48ch; margin-top: 24px; }
        .visit__hours { background: var(--verdes); color: var(--crema); padding: clamp(32px, 4vw, 48px); border-radius: var(--radius-2); }
        .visit__hours h3 { font-family: var(--font-display); font-weight: 700; font-size: 1.4rem; margin: 0 0 28px; letter-spacing: -0.01em; }
        .visit__hours dl { display: grid; grid-template-columns: 1fr auto; gap: 12px 24px; margin: 0; }
        .visit__hours dt { font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: color-mix(in oklab, var(--crema) 65%, transparent); align-self: center; }
        .visit__hours dd { margin: 0; font-family: var(--font-display); font-weight: 500; font-size: 1.05rem; }
        .visit__hours dd.closed { color: color-mix(in oklab, var(--crema) 45%, transparent); }

        @media (max-width: 920px) {
          .hero__grid { grid-template-columns: 1fr; }
          .hero__strip { grid-template-columns: 1fr 1fr; }
          .intro-block { grid-template-columns: 1fr; }
          .uve-grid { grid-template-columns: 1fr 1fr; }
          .coll-grid { grid-template-columns: 1fr 1fr; }
          .coll-head, .rooms__head { grid-template-columns: 1fr; }
          .room-row { grid-template-columns: 50px 1fr 80px; gap: 12px; }
          .room-row .desc { display: none; }
          .visit__inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .hero { padding: 60px 0; }
          .hero .foglia-1, .hero .foglia-2 { display: none; }
          .hero__strip { grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-top: 40px; }
          .hero .cta-row { flex-direction: column; align-items: flex-start; gap: 12px; }
          .hero .cta-row .btn { width: 100%; justify-content: center; }

          .intro-block .body p:first-child::first-letter { font-size: 3.2em; }
          .coll-head { margin-bottom: 32px; }
          .coll-grid { grid-template-columns: 1fr 1fr; gap: 16px 12px; }

          .uve-grid { grid-template-columns: 1fr; gap: 8px; }
          .uva-card { min-height: auto; flex-direction: row; align-items: flex-start; gap: 12px; padding: 18px 16px; }
          .uva-card .n { display: none; }
          .uva-card .name { font-size: 1.3rem; }
          .uva-card .desc { font-size: 0.88rem; margin-top: 0; }

          .room-row { grid-template-columns: 40px 1fr; gap: 10px; padding: 20px 0; }
          .room-row .count { display: none; }
          .room-row:hover { padding-inline: 0; }

          .visit__hours dl { gap: 10px 16px; }
        }
      `}</style>
    </>
  );
}
