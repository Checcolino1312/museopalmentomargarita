import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import SanityImage from '@/components/SanityImage';
import { sanityFetch } from '@/lib/sanity-fetch';
import { repertiIdsQuery, repertiListQuery, repertoQuery, TAGS } from '@/lib/queries';
import { titleCase } from '@/lib/format';
import type { Reperto, RepertoCard } from '@/lib/types';

export async function generateStaticParams() {
  const ids = await sanityFetch<string[]>(repertiIdsQuery, {}, [TAGS.reperto]);
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = await sanityFetch<Reperto | null>(repertoQuery, { id }, [TAGS.reperto, `reperto:${id}`]);
  if (!r) return {};
  return { title: `${titleCase(r.nome)} — Museo Palmento Margarita` };
}

export default async function RepertoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [reperto, all] = await Promise.all([
    sanityFetch<Reperto | null>(repertoQuery, { id }, [TAGS.reperto, `reperto:${id}`]),
    sanityFetch<RepertoCard[]>(repertiListQuery, {}, [TAGS.reperto]),
  ]);

  if (!reperto) notFound();

  const idx = all.findIndex((r) => r.inventoryId === id);

  const prevR = all[(idx - 1 + all.length) % all.length];
  const nextR = all[(idx + 1) % all.length];

  // I quattro successivi in ordine di inventario, scorrendo in modo circolare
  const adjacent = [...all.slice(idx + 1), ...all.slice(0, Math.max(idx, 0))].slice(0, 4);

  // La citazione va dopo il primo paragrafo, come nel resto del sito
  const blocchi = reperto.noteCorpo ?? [];
  const [primoBlocco, ...altriBlocchi] = blocchi;

  const titleHtml = titleCase(reperto.nome);

  return (
    <>
      {/* BREADCRUMB */}
      <div className="container container--wide crumb">
        <Link href="/home" className="crumb__root">palmentomargarita.it</Link>
        <span className="sep">/</span>
        <Link href="/collezione">Collezione</Link>
        <span className="sep">/</span>
        <span>{reperto.inventoryId}</span>
      </div>

      {/* HERO */}
      <section className="reperto-hero">
        <div className="container container--wide">
          <div className="reperto-hero__grid">
            <div className="reperto-hero__media">
              {reperto.foto ? (
                <SanityImage image={reperto.foto} alt={reperto.nome} sizes="50vw" priority />
              ) : (
                <div className="media-placeholder">Foto in archivio<br />{reperto.inventoryId}</div>
              )}
              <span className="badge">{reperto.inventoryId}</span>
            </div>
            <div className="reperto-hero__copy">
              <h1>{titleHtml}</h1>
              <p className="lead">{reperto.descrizione || reperto.noteTitolo}</p>
              <div className="meta-grid">
                <div><small>Codice Inventario</small><strong style={{ fontFamily: 'var(--font-mono)' }}>{reperto.inventoryId}</strong></div>
                <div><small>Epoca</small><strong>{reperto.epoca || '—'}</strong></div>
                <div><small>Provenienza</small><strong>{reperto.provenienza || '—'}</strong></div>
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
              {primoBlocco && <PortableText value={[primoBlocco]} />}
              {reperto.pullQuote && (
                <blockquote className="pull">
                  «{reperto.pullQuote}»
                  <cite>— Note di archivio</cite>
                </blockquote>
              )}
              {altriBlocchi.length > 0 && <PortableText value={altriBlocchi} />}
            </div>
          </div>
        </div>
      </section>

      {/* ADJACENT */}
      <section className="adjacent">
        <div className="container container--wide">
          <h2>Continua a esplorare.</h2>
          <div className="adj-grid">
            {adjacent.map((it) => (
              <Link key={it.inventoryId} className="card-reperto" href={`/reperti/${it.inventoryId}`}>
                <div className="card-reperto__media">
                  {it.foto ? (
                    <SanityImage image={it.foto} alt={it.nome} sizes="25vw" width={800} />
                  ) : (
                    <div className="media-placeholder">Foto in archivio</div>
                  )}
                </div>
                <div className="card-reperto__body">
                  <h3 className="card-reperto__title">{titleCase(it.nome)}</h3>
                  {it.epoca && <span className="card-reperto__epoca">{it.epoca}</span>}
                </div>
              </Link>
            ))}
          </div>
          <div className="nav-pair">
            <Link className="nav-link" href={`/reperti/${prevR.inventoryId}`}>
              <small>← Reperto precedente</small>
              <strong>{titleCase(prevR.nome)}</strong>
            </Link>
            <Link className="nav-link next" href={`/reperti/${nextR.inventoryId}`}>
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

        .reperto-hero { padding: 36px 0 clamp(60px, 7vw, 100px); }
        .reperto-hero__grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(40px, 5vw, 80px); align-items: start; }
        .reperto-hero__media { aspect-ratio: 4/5; background: var(--bg-paper); border-radius: var(--radius-2); overflow: hidden; position: relative; }
        .reperto-hero__media .badge { position: absolute; top: 18px; left: 18px; background: var(--crema); padding: 7px 13px 6px; border-radius: var(--radius-pill); font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.06em; }
        .reperto-hero__copy { padding-top: 12px; }
        .reperto-hero__copy h1 { font-family: var(--font-display); font-weight: 800; font-size: clamp(2.6rem, 5.4vw, 4.8rem); line-height: 0.93; letter-spacing: -0.03em; margin: 0 0 28px; text-wrap: balance; }
        /* pre-line: alcune descrizioni d'archivio sono elenchi su più righe
           (es. INV-001), che altrimenti finirebbero tutti su una riga sola */
        .reperto-hero__copy .lead { font-size: 1.22rem; line-height: 1.5; color: var(--ink-soft); margin: 0; text-wrap: pretty; white-space: pre-line; }
        .reperto-hero__copy .meta-grid { margin-top: 40px; padding-top: 28px; border-top: 1px solid var(--rule); display: grid; grid-template-columns: 1fr 1fr; gap: 20px 24px; }
        .meta-grid > div small { display: block; font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 4px; }
        .meta-grid strong { font-family: var(--font-display); font-weight: 600; font-size: 1.06rem; letter-spacing: -0.005em; }
        .reperto-hero__copy .actions { margin-top: 32px; }

        .storia-section { background: var(--bg-paper); padding-block: clamp(70px, 8vw, 110px); }
        .storia__grid { display: grid; grid-template-columns: 220px 1fr; gap: clamp(40px, 6vw, 80px); align-items: start; }
        .storia__label { font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); position: sticky; top: 96px; }
        .storia__label small { display: block; font-family: var(--font-display); font-weight: 700; font-size: 1.4rem; letter-spacing: -0.01em; color: var(--ink); margin-top: 8px; }
        .storia__body { max-width: 64ch; font-size: 1.16rem; line-height: 1.6; color: var(--ink); }
        .storia__body p { margin: 0 0 1.1em; }
        .pull { margin: 40px 0; padding: 32px 36px; background: var(--crema); border-left: 4px solid var(--magenta); border-radius: 0 var(--radius-2) var(--radius-2) 0; font-family: var(--font-display); font-weight: 500; font-style: italic; font-size: 1.5rem; line-height: 1.25; letter-spacing: -0.01em; color: var(--ink); }
        .pull cite { display: block; margin-top: 14px; font-style: normal; font-weight: 500; font-size: 0.9rem; font-family: var(--font-mono); letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-mute); }

        .adjacent { padding-block: clamp(60px, 7vw, 90px); }
        .adjacent h2 { font-family: var(--font-display); font-weight: 800; font-size: clamp(2rem, 3.5vw, 3.2rem); line-height: 0.95; letter-spacing: -0.03em; margin: 0 0 36px; }
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
          .reperto-hero__media { aspect-ratio: 3 / 2; }
          .storia__grid { grid-template-columns: 1fr; }
          .storia__label { position: relative; top: 0; }
          .adj-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .crumb { font-size: 0.66rem; padding: 16px 0 0; }
          .crumb .sep { padding: 0 4px; }
          .reperto-hero { padding: 12px 0 36px; }
          .reperto-hero__media { aspect-ratio: 4 / 3; }
          .reperto-hero__media .badge { font-size: 0.7rem; padding: 5px 10px; top: 12px; left: 12px; }
          .reperto-hero__copy h1 { font-size: clamp(1.8rem, 8vw, 2.6rem); margin-bottom: 16px; }
          .reperto-hero__copy .lead { font-size: 1rem; }
          .reperto-hero__copy .meta-grid { grid-template-columns: 1fr 1fr; gap: 16px 12px; margin-top: 24px; padding-top: 20px; }
          .meta-grid > div small { font-size: 0.62rem; }
          .meta-grid strong { font-size: 0.92rem; }
          .reperto-hero__copy .actions .btn { width: 100%; justify-content: center; }
          .storia-section { padding-block: 40px; }
          .storia__label small { font-size: 1.1rem; }
          .storia__body { font-size: 0.98rem; }
          .pull { padding: 18px 20px; font-size: 1.1rem; margin: 28px 0; }
          .adjacent { padding-block: 36px; }
          .adjacent h2 { font-size: clamp(1.5rem, 6vw, 2rem); margin-bottom: 20px; }
          .adj-grid { grid-template-columns: 1fr 1fr; gap: 20px 12px; }
          .nav-pair { grid-template-columns: 1fr; gap: 10px; margin-top: 36px; padding-top: 28px; }
          .nav-link { padding: 20px; }
          .nav-link strong { font-size: 1rem; }
          .nav-link.next { text-align: left; }
        }
      `}</style>
    </>
  );
}
