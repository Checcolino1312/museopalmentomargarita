'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import SanityImage from '@/components/SanityImage';
import type { PopupEvento as PopupEventoData } from '@/lib/types';

const RITARDO_MS = 1500;
const CHIAVE = 'popup-evento-chiuso';

/**
 * `localStorage` può lanciare in navigazione privata o con i cookie di terze
 * parti bloccati: in quel caso il pop-up si comporta come se non fosse mai
 * stato chiuso, che è preferibile a una pagina che va in errore.
 */
function giaChiuso(firma: string): boolean {
  try {
    return window.localStorage.getItem(CHIAVE) === firma;
  } catch {
    return false;
  }
}

function ricordaChiusura(firma: string): void {
  try {
    window.localStorage.setItem(CHIAVE, firma);
  } catch {
    /* Spazio non disponibile: pazienza, ricomparirà al prossimo caricamento. */
  }
}

export default function PopupEvento({ popup }: { popup: PopupEventoData | null }) {
  const [aperto, setAperto] = useState(false);
  const chiudiRef = useRef<HTMLButtonElement>(null);

  // La firma lega il ricordo al contenuto: cambiando titolo, il pop-up
  // ricompare anche a chi aveva chiuso quello precedente.
  const firma = popup?.titolo ?? '';

  useEffect(() => {
    if (!firma || giaChiuso(firma)) return;

    const timer = window.setTimeout(() => setAperto(true), RITARDO_MS);
    return () => window.clearTimeout(timer);
  }, [firma]);

  const chiudi = useCallback(() => {
    setAperto(false);
    if (firma) ricordaChiusura(firma);
  }, [firma]);

  useEffect(() => {
    if (!aperto) return;

    chiudiRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') chiudi();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [aperto, chiudi]);

  if (!popup || !firma || !aperto) return null;

  const { linkLabel, linkHref } = popup;

  return (
    <div className="popup-velo" onClick={chiudi} role="presentation">
      <div
        className="popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-titolo"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={chiudiRef} className="popup__chiudi" onClick={chiudi} aria-label="Chiudi">
          ×
        </button>

        {popup.immagine && (
          <div className="popup__img">
            <SanityImage image={popup.immagine} sizes="(max-width: 560px) 92vw, 460px" />
          </div>
        )}

        <div className="popup__corpo">
          <h2 id="popup-titolo">{popup.titolo}</h2>
          {popup.testo && <p>{popup.testo}</p>}
          {linkLabel && linkHref && (
            <Link className="btn popup__btn" href={linkHref} onClick={chiudi}>
              {linkLabel}
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .popup-velo {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(20, 12, 8, 0.55);
          display: grid;
          place-items: center;
          padding: 20px;
          animation: popup-velo-in .25s ease;
        }
        .popup {
          position: relative;
          width: min(460px, 100%);
          max-height: calc(100dvh - 40px);
          overflow-y: auto;
          background: var(--crema);
          border-radius: 2px;
          box-shadow: 0 20px 60px rgba(20, 12, 8, 0.3);
          animation: popup-in .28s ease;
        }
        .popup__chiudi {
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 1;
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          font-size: 1.6rem;
          line-height: 1;
          color: var(--ink);
          background: var(--crema);
          border: 1px solid var(--rule-soft);
          border-radius: 50%;
          cursor: pointer;
        }
        .popup__chiudi:hover { background: var(--crema-2); }
        .popup__img {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }
        .popup__corpo { padding: clamp(24px, 5vw, 36px); }
        .popup__corpo h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.5rem, 4vw, 2rem);
          line-height: 1.15;
          color: var(--ink);
          margin: 0 0 12px;
        }
        .popup__corpo p {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--ink-soft);
          margin: 0;
          white-space: pre-line;
        }
        .popup__btn { margin-top: 22px; }

        @keyframes popup-velo-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popup-in {
          from { opacity: 0; transform: translateY(12px) }
          to   { opacity: 1; transform: none }
        }
        @media (prefers-reduced-motion: reduce) {
          .popup-velo, .popup { animation: none }
        }
      `}</style>
    </div>
  );
}
