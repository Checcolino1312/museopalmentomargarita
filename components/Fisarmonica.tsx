/**
 * Blocco richiudibile.
 *
 * Usa `<details>`/`<summary>` nativi invece di un accordion in JavaScript:
 * funziona senza idratazione, è già accessibile da tastiera e da screen reader,
 * e soprattutto il testo resta nel documento anche da chiuso — quindi Google lo
 * indicizza e la ricerca del browser lo trova.
 */
export default function Fisarmonica({
  titolo,
  apertoDiDefault = false,
  children,
}: {
  titolo: string;
  apertoDiDefault?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details className="fisa" open={apertoDiDefault}>
      <summary className="fisa__testa">
        <span className="fisa__titolo">{titolo}</span>
        <span className="fisa__segno" aria-hidden="true" />
      </summary>
      <div className="fisa__corpo">{children}</div>

      <style>{`
        .fisa { border-top: 1px solid var(--rule-soft); }
        .fisa:last-of-type { border-bottom: 1px solid var(--rule-soft); }

        .fisa__testa {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px 0;
          cursor: pointer;
          list-style: none;
        }
        /* Il triangolino predefinito va tolto in entrambe le famiglie di browser. */
        .fisa__testa::-webkit-details-marker { display: none; }
        .fisa__testa::marker { content: ''; }

        .fisa__titolo {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          line-height: 1.25;
          color: var(--ink);
        }

        /* Croce che diventa segno meno da aperto: due tratti sovrapposti. */
        .fisa__segno {
          position: relative;
          flex: 0 0 auto;
          width: 16px;
          height: 16px;
        }
        .fisa__segno::before,
        .fisa__segno::after {
          content: '';
          position: absolute;
          background: var(--verdes);
          transition: transform .2s ease, opacity .2s ease;
        }
        .fisa__segno::before { inset: 7px 0; height: 2px; }
        .fisa__segno::after { inset: 0 7px; width: 2px; }
        .fisa[open] .fisa__segno::after { transform: scaleY(0); opacity: 0; }

        .fisa__corpo { padding: 0 0 24px; }
        .fisa__corpo > :last-child { margin-bottom: 0; }

        @media (prefers-reduced-motion: reduce) {
          .fisa__segno::before, .fisa__segno::after { transition: none; }
        }
      `}</style>
    </details>
  );
}
