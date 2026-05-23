import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllReperti, getReperto, imgPath, titleCase } from '@/lib/reperti';
import { ROOM_INFO } from '@/lib/types';

export async function generateStaticParams() {
  return getAllReperti().map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = getReperto(id);
  if (!r) return {};
  return { title: `${titleCase(r.nome)} — Museo Palmento Margarita` };
}

const MATERIALS = ['terracotta', 'ghisa', 'ferro battuto', 'legno', 'rame', 'vetro', 'pietra', 'paglia'];

export default async function RepertoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const reperto = getReperto(id);
  if (!reperto) notFound();

  const all = getAllReperti();
  const idx = all.findIndex((r) => r.id === id);
  const room = ROOM_INFO[reperto.cat!];
  const src = imgPath(reperto.id);

  const prevR = all[(idx - 1 + all.length) % all.length];
  const nextR = all[(idx + 1) % all.length];

  const sameRoom = all.filter((r) => r.cat === reperto.cat && r.id !== reperto.id);
  const adjacent = sameRoom.slice(0, 4);
  while (adjacent.length < 4) adjacent.push(all[(idx + adjacent.length + 1) % all.length]);

  const bodyText = (reperto.noteCorpo || reperto.descrizione || '').trim();
  const parts = bodyText.split(/\n\s*\n|\n/).filter(Boolean);

  const matchedMaterial = MATERIALS.find((m) =>
    (reperto.descrizione + ' ' + reperto.noteCorpo).toLowerCase().includes(m)
  );

  const titleHtml = titleCase(reperto.nome);
  const chipLabel = room.name.replace('La ', '').replace("L'", '').replace('Il ', '');

  return (
    <>
      {/* BREADCRUMB */}
      <div className="container container--wide crumb">
        <Link href="/home">Home</Link>
        <span className="sep">/</span>
        <Link href="/collezione">Collezione</Link>
        <span className="sep">/</span>
        <span>{room.name}</span>
        <span className="sep">/</span>
        <span>{reperto.id}</span>
      </div>

      {/* HERO */}
      <section className="reperto-hero">
        <div className="container container--wide">
          <div className="reperto-hero__grid">
            <div className="reperto-hero__media">
              {src ? (
                <Image src={src} alt={reperto.nome} fill style={{ objectFit: 'cover' }} sizes="50vw" priority />
              ) : (
                <div className="media-placeholder">Foto in archivio<br />{reperto.id}</div>
              )}
              <span className="badge">{reperto.id}</span>
              <span className="scale">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--giallo)', display: 'inline-block' }} />
                Fotografia in archivio
              </span>
            </div>
            <div className="reperto-hero__copy">
              <div className="chips">
                <span className={`chip ${room.chip}`}><span className="dot" />{chipLabel}</span>
                {reperto.epoca && <span className="chip">{reperto.epoca}</span>}
              </div>
              <h1>{titleHtml}</h1>
              <p className="lead">{reperto.descrizione || reperto.noteTitolo}</p>
              <div className="meta-grid">
                <div><small>Codice Inventario</small><strong style={{ fontFamily: 'var(--font-mono)' }}>{reperto.id}</strong></div>
                <div><small>Epoca</small><strong>{reperto.epoca || '—'}</strong></div>
                <div><small>Provenienza</small><strong>{reperto.provenienza || '—'}</strong></div>
                <div><small>Sezione del museo</small><strong>{room.name} <span style={{ color: 'var(--ink-mute)' }}>· {room.sub}</span></strong></div>
              </div>
              <div className="actions">
                <Link className="btn" href="/collezione">
                  <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>→</span> Torna alla collezione
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOTE STORICHE */}
      <section className="storia-section">
        <div className="container container--wide">
          <div className="storia__grid">
            <div className="storia__label">
              — Note storiche
              <small>{reperto.noteTitolo || titleHtml}</small>
            </div>
            <div className="storia__body">
              {parts.map((p, i) => (
                <>
                  <p key={i}>{p.trim()}</p>
                  {i === 0 && parts.length > 2 && parts[1] && (
                    <blockquote key="pull" className="pull">
                      «{parts[1].split(/(?<=\.) /)[0].replace(/[«»]/g, '').trim()}»
                      <cite>— Note di sala, {room.name}</cite>
                    </blockquote>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECH STRIPE */}
      <section className="tech-row">
        <div className="container container--wide">
          <div className="tech-grid">
            <div><small>Sezione</small><strong>{room.name} <em>{room.sub}</em></strong></div>
            <div><small>Materiale</small><strong>{matchedMaterial ? matchedMaterial : <em>indagine in corso</em>}</strong></div>
            <div><small>Tecnica</small><strong>lavorazione <em>artigianale</em></strong></div>
            <div><small>Stato</small><strong>conservato</strong></div>
          </div>
        </div>
      </section>

      {/* SALA */}
      <section className="sala">
        <div className="container container--wide">
          <div className="sala__inner">
            <div>
              <span className="t-eyebrow">— Sala del museo —</span>
              <h2 style={{ marginTop: 14 }}>{room.name} <em>{room.sub}.</em></h2>
            </div>
            <div>
              <p className="t-body" style={{ color: 'var(--ink-soft)', maxWidth: '56ch' }}>{room.desc}</p>
              <Link className="btn btn--accent" href={`/collezione?cat=${reperto.cat}`} style={{ marginTop: 18, display: 'inline-flex' }}>
                Vedi altri reperti della sala <span className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ADJACENT */}
      <section className="adjacent">
        <div className="container container--wide">
          <h2>Continua a <em>esplorare.</em></h2>
          <div className="adj-grid">
            {adjacent.slice(0, 4).map((it) => {
              const adjRoom = ROOM_INFO[it.cat!];
              const adjSrc = imgPath(it.id);
              const adjLabel = adjRoom.name.replace('La ', '').replace("L'", '').replace('Il ', '');
              return (
                <Link key={it.id} className="card-reperto" href={`/reperti/${it.id}`}>
                  <div className="card-reperto__media">
                    {adjSrc ? (
                      <Image src={adjSrc} alt={it.nome} fill style={{ objectFit: 'cover' }} sizes="25vw" />
                    ) : (
                      <div className="media-placeholder">Foto in archivio</div>
                    )}
                    <span className="card-reperto__id">{it.id}</span>
                  </div>
                  <div className="card-reperto__body">
                    <span className={`chip ${adjRoom.chip}`} style={{ alignSelf: 'flex-start' }}>
                      <span className="dot" />{adjLabel}
                    </span>
                    <h3 className="card-reperto__title">{titleCase(it.nome)}</h3>
                    <div className="card-reperto__meta">{it.epoca}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="nav-pair">
            <Link className="nav-link" href={`/reperti/${prevR.id}`}>
              <small>← Reperto precedente</small>
              <strong>{titleCase(prevR.nome)}</strong>
            </Link>
            <Link className="nav-link next" href={`/reperti/${nextR.id}`}>
              <small>Reperto successivo →</small>
              <strong>{titleCase(nextR.nome)}</strong>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .crumb { padding: 28px 0 0; font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-mute); display: flex; gap: 0; align-items: center; }
        .crumb a { color: inherit; border-bottom: 1px solid transparent; }
        .crumb a:hover { color: var(--ink); border-color: var(--ink); }
        .crumb .sep { padding: 0 8px; opacity: 0.5; }

        .reperto-hero { padding: 36px 0 clamp(60px, 7vw, 100px); position: relative; }
        .reperto-hero__grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(40px, 5vw, 80px); align-items: start; }
        .reperto-hero__media { aspect-ratio: 4/5; background: var(--bg-paper); border-radius: var(--radius-2); overflow: hidden; position: relative; }
        .reperto-hero__media .badge { position: absolute; top: 18px; left: 18px; background: var(--crema); padding: 7px 13px 6px; border-radius: var(--radius-pill); font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.06em; }
        .reperto-hero__media .scale { position: absolute; bottom: 18px; right: 18px; background: var(--verdes); color: var(--crema); padding: 9px 14px; border-radius: var(--radius-pill); font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.08em; text-transform: uppercase; display: inline-flex; gap: 8px; align-items: center; }
        .reperto-hero__copy { padding-top: 12px; }
        .reperto-hero__copy .chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
        .reperto-hero__copy h1 { font-family: var(--font-display); font-weight: 800; font-size: clamp(2.6rem, 5.4vw, 4.8rem); line-height: 0.93; letter-spacing: -0.03em; margin: 0 0 28px; text-wrap: balance; }
        .reperto-hero__copy h1 em { font-style: italic; font-weight: 700; color: var(--verde); }
        .reperto-hero__copy .lead { font-size: 1.22rem; line-height: 1.5; color: var(--ink-soft); margin: 0; text-wrap: pretty; }
        .reperto-hero__copy .meta-grid { margin-top: 40px; padding-top: 28px; border-top: 1px solid var(--rule); display: grid; grid-template-columns: 1fr 1fr; gap: 20px 24px; }
        .meta-grid > div small { display: block; font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 4px; }
        .meta-grid strong { font-family: var(--font-display); font-weight: 600; font-size: 1.06rem; letter-spacing: -0.005em; }
        .reperto-hero__copy .actions { margin-top: 32px; display: flex; gap: 12px; flex-wrap: wrap; }

        .storia-section { background: var(--bg-paper); padding-block: clamp(70px, 8vw, 110px); position: relative; overflow: hidden; }
        .storia-section .foglia-x { top: 60px; right: -40px; width: 240px; transform: rotate(-15deg); opacity: 0.55; }
        .storia__grid { display: grid; grid-template-columns: 220px 1fr; gap: clamp(40px, 6vw, 80px); align-items: start; }
        .storia__label { font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); position: sticky; top: 96px; }
        .storia__label small { display: block; font-family: var(--font-display); font-weight: 700; font-size: 1.4rem; letter-spacing: -0.01em; color: var(--ink); margin-top: 8px; }
        .storia__body { max-width: 64ch; font-size: 1.16rem; line-height: 1.6; color: var(--ink); }
        .storia__body p { margin: 0 0 1.1em; }
        .storia__body p:first-child::first-letter { font-family: var(--font-display); font-weight: 800; font-size: 4em; float: left; line-height: 0.86; padding: 4px 12px 0 0; color: var(--verde); }
        .pull { margin: 40px 0; padding: 32px 36px; background: var(--crema); border-left: 4px solid var(--magenta); border-radius: 0 var(--radius-2) var(--radius-2) 0; font-family: var(--font-display); font-weight: 500; font-style: italic; font-size: 1.5rem; line-height: 1.25; letter-spacing: -0.01em; color: var(--ink); }
        .pull cite { display: block; margin-top: 14px; font-style: normal; font-weight: 500; font-size: 0.9rem; font-family: var(--font-mono); letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-mute); }

        .tech-row { background: var(--verdes); color: var(--crema); padding-block: clamp(56px, 6vw, 80px); }
        .tech-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 0; }
        .tech-grid > div { padding: 0 28px; border-right: 1px solid color-mix(in oklab, var(--crema) 18%, transparent); }
        .tech-grid > div:last-child { border-right: 0; }
        .tech-grid > div:first-child { padding-left: 0; }
        .tech-grid small { display: block; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--giallo); margin-bottom: 12px; }
        .tech-grid strong { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.6rem, 2.4vw, 2.4rem); letter-spacing: -0.02em; line-height: 1.05; display: block; }
        .tech-grid em { font-style: italic; color: var(--lilla); font-weight: 500; }

        .sala { padding-block: clamp(70px, 8vw, 100px); }
        .sala__inner { display: grid; grid-template-columns: 1fr 1.2fr; gap: clamp(40px, 6vw, 80px); align-items: end; padding-bottom: 40px; border-bottom: 1px solid var(--rule); }
        .sala__inner h2 { font-family: var(--font-display); font-weight: 700; font-size: clamp(2rem, 3.5vw, 3.2rem); line-height: 0.95; letter-spacing: -0.025em; margin: 0; }
        .sala__inner h2 em { font-style: italic; color: var(--verde); }

        .adjacent { padding-block: clamp(60px, 7vw, 90px); }
        .adjacent h2 { font-family: var(--font-display); font-weight: 800; font-size: clamp(2rem, 3.5vw, 3.2rem); line-height: 0.95; letter-spacing: -0.03em; margin: 0 0 36px; }
        .adjacent h2 em { font-style: italic; color: var(--magenta); }
        .adj-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .nav-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 56px; padding-top: 36px; border-top: 1px solid var(--rule); }
        .nav-link { display: block; padding: 28px; border-radius: var(--radius-2); background: var(--bg-paper); transition: background .2s ease; }
        .nav-link:hover { background: var(--ink); color: var(--crema); }
        .nav-link small { font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); }
        .nav-link:hover small { color: color-mix(in oklab, var(--crema) 65%, transparent); }
        .nav-link strong { display: block; font-family: var(--font-display); font-weight: 700; font-size: 1.4rem; margin-top: 8px; letter-spacing: -0.015em; }
        .nav-link.next { text-align: right; }

        @media (max-width: 1000px) {
          .reperto-hero__grid { grid-template-columns: 1fr; }
          .storia__grid { grid-template-columns: 1fr; }
          .storia__label { position: relative; top: 0; }
          .tech-grid { grid-template-columns: 1fr 1fr; gap: 32px 0; }
          .tech-grid > div { border-right: 0; padding-left: 0 !important; }
          .sala__inner { grid-template-columns: 1fr; }
          .adj-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .crumb { font-size: 0.7rem; gap: 0; flex-wrap: wrap; }
          .crumb .sep { padding: 0 4px; }

          .reperto-hero { padding: 24px 0 48px; }
          .reperto-hero__copy h1 { font-size: clamp(2rem, 8vw, 3rem); }
          .reperto-hero__copy .meta-grid { grid-template-columns: 1fr; gap: 14px; }
          .reperto-hero__copy .actions { flex-direction: column; }
          .reperto-hero__copy .actions .btn { width: 100%; justify-content: center; }

          .pull { padding: 20px 22px; font-size: 1.2rem; }

          .tech-grid { grid-template-columns: 1fr 1fr; }
          .tech-grid strong { font-size: 1.2rem; }

          .sala__inner { gap: 24px; }

          .adj-grid { grid-template-columns: 1fr 1fr; gap: 16px 12px; }
          .adjacent h2 { font-size: clamp(1.6rem, 6vw, 2.4rem); margin-bottom: 24px; }

          .nav-pair { grid-template-columns: 1fr; gap: 12px; }
          .nav-link strong { font-size: 1.1rem; }
          .nav-link.next { text-align: left; }
        }
      `}</style>
    </>
  );
}
