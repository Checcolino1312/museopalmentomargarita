'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllReperti, imgPath, titleCase } from '@/lib/reperti';
import type { Category, Reperto } from '@/lib/types';
import { ROOM_INFO } from '@/lib/types';

const ALL_REPERTI = getAllReperti();

const CATS: { key: Category | 'all'; label: string }[] = [
  { key: 'all', label: 'Tutti' },
  { key: 'pigiatura', label: 'Pigiatura' },
  { key: 'conservazione', label: 'Conservazione' },
  { key: 'masseria', label: 'Masseria' },
  { key: 'utensili', label: 'Utensili' },
  { key: 'strada', label: 'Strada' },
];

export default function CollezioneClient() {
  const [cat, setCat] = useState<Category | 'all'>('all');
  const [query, setQuery] = useState('');

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: ALL_REPERTI.length };
    for (const it of ALL_REPERTI) c[it.cat!] = (c[it.cat!] || 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ALL_REPERTI.filter((it) => {
      if (cat !== 'all' && it.cat !== cat) return false;
      if (q && !(it.nome + ' ' + it.epoca + ' ' + it.descrizione).toLowerCase().includes(q)) return false;
      return true;
    });
  }, [cat, query]);

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__head">
            <div>
              <span className="t-eyebrow">— La collezione —</span>
              <h1>Cinquantanove <em>oggetti,</em><br />una sola vendemmia.</h1>
            </div>
            <p className="lead">Ogni reperto è una traccia: un gesto antico, un mestiere scomparso, un sapore conservato. Sfoglia per epoca, per sezione del museo, o cerca un oggetto specifico.</p>
          </div>
          <div className="page-hero__meta">
            <div><small>Totale reperti</small><strong>59</strong></div>
            <div><small>Epoca più antica</small><strong>Settecento</strong></div>
            <div><small>Provenienza</small><strong>Francavilla Fontana</strong></div>
            <div><small>Sezioni</small><strong>5 sale</strong></div>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="container container--wide">
          <div className="filter-bar__inner">
            <div className="filter-group">
              <span className="lbl">Sezione</span>
              {CATS.map(({ key, label }) => (
                <button
                  key={key}
                  className={`filter-chip${cat === key ? ' is-active' : ''}`}
                  onClick={() => setCat(key)}
                >
                  {label} <span className="ct">{counts[key] ?? 0}</span>
                </button>
              ))}
            </div>
            <div className="search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16, color: 'var(--ink-mute)', flexShrink: 0 }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              <input
                placeholder="Cerca un oggetto, un'epoca…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CATALOG */}
      <section className="catalog">
        <div className="container container--wide">
          <div className="catalog__head">
            <div className="count"><strong>{filtered.length}</strong> · risultati</div>
          </div>
          {filtered.length === 0 ? (
            <div className="catalog-grid--empty">Nessun reperto corrisponde alla ricerca.</div>
          ) : (
            <div className="catalog-grid">
              {filtered.map((it, idx) => {
                const room = ROOM_INFO[it.cat!];
                const src = imgPath(it.id);
                const label = room.name.replace('La ', '').replace("L'", '').replace('Il ', '');
                return (
                  <>
                    {idx === 6 && cat === 'all' && !query && (
                      <div key="editorial" className="editorial-card">
                        <div>
                          <span className="ec-eyebrow">— Approfondimento —</span>
                          <div className="ec-title">La <em>masseria</em> come fabbrica di conservazione.</div>
                          <p>Fino alla metà del Novecento, frutta, ortaggi, vino e olio venivano lavorati seguendo pratiche tradizionali tramandate di generazione in generazione.</p>
                        </div>
                        <Link href="/storia">Leggi la storia →</Link>
                      </div>
                    )}
                    <Link key={it.id} className="card-reperto" href={`/reperti/${it.id}`}>
                      <div className="card-reperto__media">
                        {src ? (
                          <Image src={src} alt={it.nome} fill style={{ objectFit: 'cover' }} sizes="25vw" />
                        ) : (
                          <div className="media-placeholder">Foto in archivio</div>
                        )}
                      </div>
                      <div className="card-reperto__body">
                        <h3 className="card-reperto__title">{titleCase(it.nome)}</h3>
                        <div className="card-reperto__footer">
                          <span className={`chip ${room.chip}`} style={{ alignSelf: 'flex-start' }}>
                            <span className="dot" />{label}
                          </span>
                          <span className="card-reperto__meta">{it.epoca}</span>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .page-hero { padding: clamp(72px, 9vw, 130px) 0 clamp(52px, 6vw, 80px); position: relative; overflow: hidden; }
        .page-hero .foglia-a { top: 90px; right: 4%; width: 200px; transform: rotate(-12deg); opacity: 0.6; }
        .page-hero__head { display: grid; grid-template-columns: 1.4fr 1fr; gap: clamp(40px, 6vw, 80px); align-items: end; }
        .page-hero h1 { font-family: var(--font-display); font-weight: 800; font-size: clamp(3.4rem, 8vw, 7.5rem); line-height: 0.86; letter-spacing: -0.04em; margin: 18px 0 0; }
        .page-hero h1 em { font-style: italic; font-weight: 700; color: var(--magenta); }
        .page-hero .lead { font-size: 1.18rem; line-height: 1.5; color: var(--ink-soft); max-width: 44ch; }
        .page-hero__meta { margin-top: 52px; padding-top: 28px; border-top: 1px solid var(--rule); display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); }
        .page-hero__meta > div small { display: block; font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 6px; }
        .page-hero__meta strong { font-family: var(--font-display); font-weight: 700; font-size: 1.6rem; letter-spacing: -0.02em; }

        .filter-bar { position: sticky; top: 73px; z-index: 20; background: color-mix(in oklab, var(--crema) 92%, transparent); backdrop-filter: blur(10px); border-block: 1px solid var(--rule-soft); padding: 18px 0; }
        .filter-bar__inner { display: flex; gap: 24px; align-items: center; flex-wrap: wrap; }
        .filter-group { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
        .filter-group .lbl { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-mute); padding-right: 8px; }
        .filter-chip { display: inline-flex; gap: 5px; align-items: center; padding: 7px 12px 6px; font-family: var(--font-display); font-weight: 500; font-size: 0.92rem; border: 1px solid var(--rule); border-radius: var(--radius-pill); background: transparent; color: var(--ink); cursor: pointer; transition: all .18s ease; letter-spacing: -0.005em; }
        .filter-chip:hover { border-color: var(--ink); }
        .filter-chip.is-active { background: var(--ink); color: var(--crema); border-color: var(--ink); }
        .filter-chip .ct { font-family: var(--font-mono); font-size: 0.7rem; opacity: 0.7; }
        .search-box { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border: 1px solid var(--rule); border-radius: var(--radius-pill); background: var(--crema); min-width: 220px; margin-left: auto; }
        .search-box input { border: none; outline: none; background: transparent; font-family: var(--font-display); font-weight: 500; font-size: 0.92rem; color: var(--ink); width: 100%; }
        .search-box input::placeholder { color: var(--ink-mute); }

        .catalog { padding: 56px 0 100px; }
        .catalog__head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 32px; }
        .catalog__head .count { font-family: var(--font-mono); font-size: 0.92rem; letter-spacing: 0.04em; }
        .catalog__head .count strong { font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; }
        .catalog-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 36px 24px; }
        .catalog-grid--empty { display: flex; align-items: center; justify-content: center; padding: 80px 0; font-family: var(--font-mono); font-size: 0.92rem; color: var(--ink-mute); }

        .editorial-card { grid-column: span 2; background: var(--viola); color: var(--crema); border-radius: var(--radius-2); padding: clamp(28px, 3vw, 48px); display: flex; flex-direction: column; justify-content: space-between; min-height: 100%; position: relative; overflow: hidden; }
        .editorial-card .ec-eyebrow { font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--giallo); }
        .editorial-card .ec-title { font-family: var(--font-display); font-weight: 800; font-size: clamp(1.9rem, 2.6vw, 2.6rem); line-height: 0.96; letter-spacing: -0.025em; margin-top: 16px; }
        .editorial-card .ec-title em { font-style: italic; color: var(--giallo); }
        .editorial-card p { line-height: 1.5; margin: 22px 0 0; max-width: 42ch; color: color-mix(in oklab, var(--crema) 85%, transparent); }
        .editorial-card a { margin-top: 24px; display: inline-flex; gap: 8px; font-family: var(--font-display); font-weight: 500; font-size: 0.98rem; color: var(--giallo); align-self: flex-start; border-bottom: 1px solid var(--giallo); padding-bottom: 2px; }
        .editorial-card .ec-foglia { position: absolute; bottom: -30px; right: -20px; width: 180px; transform: rotate(15deg); opacity: 0.35; }

        @media (max-width: 1100px) { .catalog-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 800px) {
          .page-hero__head { grid-template-columns: 1fr; }
          .page-hero__meta { grid-template-columns: 1fr 1fr; }
          .catalog-grid { grid-template-columns: repeat(2, 1fr); }
          .editorial-card { grid-column: span 2; }
          .filter-bar { position: relative; top: 0; }
          .search-box { margin-left: 0; width: 100%; }
        }
        @media (max-width: 600px) {
          .page-hero { padding: 48px 0 36px; }
          .page-hero h1 { font-size: clamp(2.6rem, 10vw, 4rem); }
          .page-hero__meta { grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-top: 32px; }
          .page-hero__meta strong { font-size: 1.2rem; }

          .filter-bar__inner { flex-direction: column; align-items: stretch; gap: 12px; }
          .filter-group { overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; -webkit-overflow-scrolling: touch; }
          .filter-group .lbl { display: none; }
          .search-box { margin-left: 0; }

          .catalog-grid { grid-template-columns: repeat(2, 1fr); gap: 20px 12px; }
          .editorial-card { grid-column: span 2; min-height: 200px; padding: 24px; }
          .editorial-card .ec-title { font-size: clamp(1.4rem, 5vw, 1.9rem); }

          .card-reperto__title { font-size: 1rem; }
        }
      `}</style>
    </>
  );
}
