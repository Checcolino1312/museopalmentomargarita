'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllReperti, imgPath, titleCase } from '@/lib/reperti';

const ALL_REPERTI = getAllReperti();

export default function CollezioneClient() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return ALL_REPERTI;
    return ALL_REPERTI.filter((it) =>
      (it.nome + ' ' + it.epoca + ' ' + it.descrizione).toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__head">
            <div>
              <h1>Cinquantanove oggetti, una sola vendemmia.</h1>
            </div>
            <p className="lead">Ogni reperto è una traccia: un gesto antico, un mestiere scomparso, un sapore conservato. Sfoglia la collezione o cerca un oggetto specifico.</p>
          </div>
          <div className="page-hero__meta">
            <div><small>Totale reperti</small><strong>59</strong></div>
            <div><small>Provenienza</small><strong>Francavilla Fontana</strong></div>
          </div>
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="filter-bar">
        <div className="container container--wide">
          <div className="filter-bar__inner">
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
                const src = imgPath(it.id);
                return (
                  <>
                    {idx === 6 && !query && (
                      <div key="editorial" className="editorial-card">
                        <div>
                          <div className="ec-title">La masseria come fabbrica di conservazione.</div>
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
                        {it.epoca && <span className="card-reperto__epoca">{it.epoca}</span>}
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
        .page-hero__head { display: grid; grid-template-columns: 1.4fr 1fr; gap: clamp(40px, 6vw, 80px); align-items: end; }
        .page-hero h1 { font-family: var(--font-display); font-weight: 800; font-size: clamp(3.4rem, 8vw, 7.5rem); line-height: 0.86; letter-spacing: -0.04em; margin: 18px 0 0; }
        .page-hero .lead { font-size: 1.18rem; line-height: 1.5; color: var(--ink-soft); max-width: 44ch; }
        .page-hero__meta { margin-top: 52px; padding-top: 28px; border-top: 1px solid var(--rule); display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-6); }
        .page-hero__meta > div small { display: block; font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 6px; }
        .page-hero__meta strong { font-family: var(--font-display); font-weight: 700; font-size: 1.6rem; letter-spacing: -0.02em; }

        .filter-bar { position: sticky; top: 73px; z-index: 20; background: color-mix(in oklab, var(--crema) 96%, transparent); backdrop-filter: blur(12px); border-block: 1px solid var(--rule-soft); padding: 14px 0; }
        .filter-bar__inner { display: flex; align-items: center; }
        .search-box { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border: 1px solid var(--rule); border-radius: var(--radius-pill); background: var(--crema); width: 100%; max-width: 400px; }
        .search-box input { border: none; outline: none; background: transparent; font-family: var(--font-display); font-weight: 500; font-size: 0.92rem; color: var(--ink); width: 100%; }
        .search-box input::placeholder { color: var(--ink-mute); }

        .catalog { padding: 56px 0 100px; }
        .catalog__head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 32px; }
        .catalog__head .count { font-family: var(--font-mono); font-size: 0.92rem; letter-spacing: 0.04em; }
        .catalog__head .count strong { font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; }
        .catalog-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 36px 24px; }
        .catalog-grid--empty { display: flex; align-items: center; justify-content: center; padding: 80px 0; font-family: var(--font-mono); font-size: 0.92rem; color: var(--ink-mute); }

        .editorial-card { grid-column: span 2; background: var(--viola); color: var(--crema); border-radius: var(--radius-2); padding: clamp(28px, 3vw, 48px); display: flex; flex-direction: column; justify-content: space-between; min-height: 100%; position: relative; overflow: hidden; }
        .editorial-card .ec-title { font-family: var(--font-display); font-weight: 800; font-size: clamp(1.9rem, 2.6vw, 2.6rem); line-height: 0.96; letter-spacing: -0.025em; }
        .editorial-card p { line-height: 1.5; margin: 22px 0 0; max-width: 42ch; color: color-mix(in oklab, var(--crema) 85%, transparent); }
        .editorial-card a { margin-top: 24px; display: inline-flex; gap: 8px; font-family: var(--font-display); font-weight: 500; font-size: 0.98rem; color: var(--giallo); align-self: flex-start; border-bottom: 1px solid var(--giallo); padding-bottom: 2px; }

        @media (max-width: 1100px) { .catalog-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 800px) {
          .page-hero__head { grid-template-columns: 1fr; }
          .catalog-grid { grid-template-columns: repeat(2, 1fr); gap: 28px 16px; }
          .editorial-card { grid-column: span 2; }
          .filter-bar { top: 0; }
          .search-box { max-width: 100%; }
        }
        @media (max-width: 600px) {
          .page-hero { padding: 36px 0 28px; }
          .page-hero h1 { font-size: clamp(2.2rem, 9vw, 3.4rem); }
          .page-hero .lead { font-size: 1rem; }
          .page-hero__meta { gap: var(--space-4); margin-top: 24px; }
          .page-hero__meta strong { font-size: 1.2rem; }
          .search-box { min-height: 44px; }
          .catalog { padding: 32px 0 80px; }
          .catalog__head { margin-bottom: 20px; }
          .catalog-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 12px; }
          .editorial-card { grid-column: span 2; min-height: 180px; padding: 20px; }
          .editorial-card .ec-title { font-size: clamp(1.3rem, 5vw, 1.7rem); }
          .editorial-card p { display: none; }
        }
      `}</style>
    </>
  );
}
