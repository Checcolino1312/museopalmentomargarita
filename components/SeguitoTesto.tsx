/**
 * Seguito di un testo, nascosto dietro un comando «+ Continua a leggere».
 *
 * L'inizio del testo sta fuori da questo componente ed è sempre visibile: qui
 * entra solo la parte da rivelare. Il titolo resta un titolo, non un comando.
 *
 * Come `Fisarmonica`, usa `<details>`/`<summary>` nativi: nessun JavaScript,
 * accessibile da tastiera, e il testo nascosto **resta nel documento** anche da
 * chiuso, quindi Google lo indicizza e la ricerca del browser lo trova.
 */
export default function SeguitoTesto({ children }: { children: React.ReactNode }) {
  return (
    <details className="seguito">
      {/* Le due etichette stanno entrambe nel documento e se ne nasconde una con
          il CSS. Generarle con `content:` le terrebbe fuori dal testo vero: non
          selezionabili, non traducibili, e annunciate male dai lettori di schermo. */}
      <summary className="seguito__comando">
        <span className="seguito__segno" aria-hidden="true" />
        <span className="seguito__apri">Continua a leggere</span>
        <span className="seguito__chiudi">Riduci</span>
      </summary>
      <div className="seguito__corpo">{children}</div>

      <style>{`
        /* Nel markup il <summary> deve stare per primo, ma il posto giusto dove
           trovarlo è sotto il testo rivelato: ci si arriva con l'ordine flex,
           senza toccare la semantica. */
        .seguito { display: flex; flex-direction: column; }
        /* Nessuna spaziatura in cima: da aperto il seguito deve attaccarsi al
           testo visibile con lo stesso passo fra capoversi, altrimenti si legge
           come un blocco staccato invece che come il proseguimento. */
        .seguito__corpo { order: 1; }
        .seguito__comando { order: 2; }
        .seguito__corpo > :last-child { margin-bottom: 0; }

        .seguito__comando {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          align-self: flex-start;
          /* Contenuto: il capoverso sopra porta già il proprio margine inferiore. */
          margin-top: 6px;
          padding: 4px 0;
          cursor: pointer;
          list-style: none;
          font-family: var(--font-mono);
          font-size: 0.76rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--verdes);
        }
        /* Il triangolino predefinito va tolto in entrambe le famiglie di browser. */
        .seguito__comando::-webkit-details-marker { display: none; }
        .seguito__comando::marker { content: ''; }
        .seguito__comando:hover .seguito__apri,
        .seguito__comando:hover .seguito__chiudi { text-decoration: underline; }

        .seguito__chiudi { display: none; }
        .seguito[open] .seguito__apri { display: none; }
        .seguito[open] .seguito__chiudi { display: inline; }

        /* Croce che perde il tratto verticale da aperto, diventando un meno. */
        .seguito__segno {
          position: relative;
          flex: 0 0 auto;
          width: 14px;
          height: 14px;
        }
        .seguito__segno::before,
        .seguito__segno::after {
          content: '';
          position: absolute;
          background: var(--verdes);
          transition: transform .2s ease, opacity .2s ease;
        }
        .seguito__segno::before { inset: 6px 0; height: 2px; }
        .seguito__segno::after { inset: 0 6px; width: 2px; }
        .seguito[open] .seguito__segno::after { transform: scaleY(0); opacity: 0; }

        @media (prefers-reduced-motion: reduce) {
          .seguito__segno::before, .seguito__segno::after { transition: none; }
        }
      `}</style>
    </details>
  );
}
