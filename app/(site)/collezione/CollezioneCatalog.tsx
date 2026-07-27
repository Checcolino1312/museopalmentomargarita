'use client';

import { Fragment, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { titleCase } from '@/lib/format';
import type { CollezionePage } from '@/lib/types';

/**
 * Scheda già pronta per il client: gli URL delle immagini sono calcolati sul
 * server, così il builder di Sanity non finisce nel bundle del browser.
 */
export interface SchedaReperto {
  inventoryId: string;
  nome: string;
  epoca?: string;
  descrizione?: string;
  fotoUrl: string | null;
}

interface Props {
  reperti: SchedaReperto[];
  searchPlaceholder?: string;
  editorialCard?: CollezionePage['editorialCard'];
}

export default function CollezioneCatalog({ reperti, searchPlaceholder, editorialCard }: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return reperti;
    return reperti.filter((it) =>
      [it.nome, it.epoca, it.descrizione].filter(Boolean).join(' ').toLowerCase().includes(q)
    );
  }, [query, reperti]);

  // Il riquadro editoriale compare solo nell'elenco completo, non nei risultati di ricerca
  const posizioneCard = editorialCard?.posizione ?? 6;
  const mostraCard = Boolean(editorialCard?.titolo) && !query;

  return (
    <>
      {/* SEARCH BAR */}
      <div className="filter-bar">
        <div className="container container--wide">
          <div className="filter-bar__inner">
            <div className="search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16, color: 'var(--ink-mute)', flexShrink: 0 }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              <input
                placeholder={searchPlaceholder ?? 'Cerca…'}
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
              {filtered.map((it, idx) => (
                <Fragment key={it.inventoryId}>
                  {mostraCard && idx === posizioneCard && (
                    <div className="editorial-card">
                      <div>
                        <div className="ec-title">{editorialCard!.titolo}</div>
                        <p>{editorialCard!.testo}</p>
                      </div>
                      {editorialCard!.linkLabel && editorialCard!.linkHref && (
                        <Link href={editorialCard!.linkHref}>{editorialCard!.linkLabel} →</Link>
                      )}
                    </div>
                  )}
                  <Link className="card-reperto" href={`/reperti/${it.inventoryId}`}>
                    <div className="card-reperto__media">
                      {it.fotoUrl ? (
                        <Image src={it.fotoUrl} alt={it.nome} fill style={{ objectFit: 'cover' }} sizes="25vw" />
                      ) : (
                        <div className="media-placeholder">Foto in archivio</div>
                      )}
                    </div>
                    <div className="card-reperto__body">
                      <h3 className="card-reperto__title">{titleCase(it.nome)}</h3>
                      {it.epoca && <span className="card-reperto__epoca">{it.epoca}</span>}
                    </div>
                  </Link>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
