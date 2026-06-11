import Image from 'next/image';
import Link from 'next/link';
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
              <h1>La memoria viva del palmento pugliese.</h1>
              <div className="cta-row">
                <Link className="btn btn--lg" href="/collezione">Esplora i 59 reperti <span className="arrow" /></Link>
                <Link className="btn btn--lg btn--ghost" href="/storia">Scopri la storia</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STORIA */}
      <section className="section">
        <div className="container">
          <div className="intro-block">
            <div>
              <h2>Pietra, mosto, memoria.</h2>
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
            <h2>I vitigni del territorio.</h2>
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
            <h2>La collezione, oggetto per oggetto.</h2>
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
        /* Home page-local CSS */
        .hero { position: relative; padding: clamp(80px, 10vw, 140px) 0 clamp(80px, 10vw, 130px); overflow: hidden; }
        .hero .container { position: relative; z-index: 2; }
        .hero__grid { display: block; }
        .hero h1 { font-family: var(--font-display); font-weight: 800; font-size: clamp(3.6rem, 9.4vw, 9rem); line-height: 0.83; letter-spacing: -0.04em; margin: 0; max-width: 15ch; }
        .hero__media { aspect-ratio: 4/5; border-radius: var(--radius-2); overflow: hidden; position: relative; background: var(--crema-2); }
        .hero__media .caption { position: absolute; bottom: 18px; left: 18px; background: var(--crema); color: var(--ink); padding: 8px 14px 7px; border-radius: var(--radius-pill); font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; }
        .hero .cta-row { margin-top: 44px; display: flex; gap: 16px; flex-wrap: wrap; }
        .hero .foglia-1 { top: 80px; right: -50px; width: 320px; transform: rotate(-12deg); }
        .hero .foglia-2 { top: 38%; left: 36%; width: 90px; transform: rotate(28deg); opacity: 0.55; }
        .intro-block { display: grid; grid-template-columns: 1fr 1.4fr; gap: clamp(40px, 6vw, 96px); align-items: start; }
        .intro-block h2 { font-family: var(--font-display); font-weight: 700; font-size: clamp(2.4rem, 5vw, 4.4rem); line-height: 0.92; letter-spacing: -0.025em; margin: 0; }
        .intro-block .body { font-size: 1.14rem; line-height: 1.55; max-width: 60ch; color: var(--ink-soft); }
        .intro-block .body p + p { margin-top: 1.1em; }

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
        .coll-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px 24px; }

.visit { background: var(--giallo); color: var(--verdes); padding-block: clamp(64px, 9vw, 110px); }
        .visit__inner { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(48px, 7vw, 96px); align-items: start; }
        .visit__copy h2 { font-family: var(--font-display); font-weight: 800; font-size: clamp(2.6rem, 5.4vw, 4.6rem); line-height: 0.92; letter-spacing: -0.03em; margin: 0; }
        .visit__copy .body { font-size: 1.12rem; line-height: 1.5; max-width: 48ch; margin-top: 24px; }
        .visit__hours { background: var(--verdes); color: var(--crema); padding: clamp(32px, 4vw, 48px); border-radius: var(--radius-2); }
        .visit__hours h3 { font-family: var(--font-display); font-weight: 700; font-size: 1.4rem; margin: 0 0 28px; letter-spacing: -0.01em; }
        .visit__hours dl { display: grid; grid-template-columns: 1fr auto; gap: 12px 24px; margin: 0; }
        .visit__hours dt { font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: color-mix(in oklab, var(--crema) 65%, transparent); align-self: center; }
        .visit__hours dd { margin: 0; font-family: var(--font-display); font-weight: 500; font-size: 1.05rem; }
        .visit__hours dd.closed { color: color-mix(in oklab, var(--crema) 45%, transparent); }

        @media (max-width: 920px) {
          .hero__grid { grid-template-columns: 1fr; }
          .intro-block { grid-template-columns: 1fr; }
          .uve-grid { grid-template-columns: repeat(3, 1fr); }
          .coll-grid { grid-template-columns: 1fr 1fr; }
          .coll-head { grid-template-columns: 1fr; }
          .visit__inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .hero { padding: 44px 0 40px; }
          .hero h1 { font-size: clamp(2.8rem, 11vw, 4.2rem); }
          .hero .cta-row { flex-direction: column; align-items: stretch; gap: 10px; margin-top: 28px; }
          .hero .cta-row .btn { width: 100%; justify-content: center; }

          .intro-block { gap: 24px; }
          .intro-block h2 { font-size: clamp(2rem, 8vw, 3rem); }
          .intro-block .body { font-size: 1rem; }

          .coll-head { margin-bottom: 24px; }
          .coll-head h2 { font-size: clamp(2rem, 8vw, 3rem); }
          .coll-grid { grid-template-columns: 1fr 1fr; gap: 20px 12px; }

          .uve-grid { grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 28px; }
          .uva-card { min-height: auto; padding: 16px 14px; gap: 8px; }
          .uva-card .n { display: none; }
          .uva-card .name { font-size: 1.1rem; }
          .uva-card .desc { font-size: 0.84rem; }

.visit { padding-block: 48px; }
          .visit__copy h2 { font-size: clamp(2rem, 8vw, 3rem); }
          .visit__copy .body { font-size: 1rem; margin-top: 16px; }
          .visit__hours { padding: 24px 20px; }
          .visit__hours dl { gap: 10px 16px; }
          .visit__hours dt { font-size: 0.72rem; }
        }
      `}</style>
    </>
  );
}
