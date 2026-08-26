import SanityImage from '@/components/SanityImage';
import type { Immagine } from '@/lib/types';

/**
 * Testo sovrapposto a una fotografia, con velo scuro per la leggibilità.
 *
 * Senza immagine ripiega sul fondo verde pieno: le foto di alcune sezioni non
 * sono ancora state caricate, e un riquadro vuoto sarebbe peggio di un colore.
 */
export default function TestoSuFoto({
  immagine,
  altezza = 'media',
  children,
}: {
  immagine?: Immagine;
  /** `piena` per i blocchi d'apertura, `media` per le citazioni nel corpo. */
  altezza?: 'media' | 'piena';
  children: React.ReactNode;
}) {
  const conFoto = Boolean(immagine);

  return (
    <section
      className={`sufoto sufoto--${altezza}${conFoto ? '' : ' sufoto--senza-foto'}`}
    >
      {conFoto && (
        <>
          <SanityImage image={immagine} objectPosition="center 45%" sizes="100vw" />
          <div className="sufoto__velo" aria-hidden="true" />
        </>
      )}
      <div className="container sufoto__corpo">{children}</div>

      <style>{`
        .sufoto {
          position: relative;
          display: grid;
          align-items: center;
          overflow: hidden;
          color: var(--crema);
        }
        .sufoto--media { min-height: clamp(320px, 46vw, 520px); }
        .sufoto--piena { min-height: clamp(420px, 62vw, 720px); }
        .sufoto--senza-foto {
          background: var(--verdes);
          min-height: 0;
          padding-block: clamp(56px, 7vw, 96px);
        }
        .sufoto__velo {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(20, 12, 8, 0.72) 0%,
            rgba(20, 12, 8, 0.45) 55%,
            rgba(20, 12, 8, 0.3) 100%
          );
        }
        .sufoto__corpo {
          position: relative;
          padding-block: clamp(48px, 6vw, 80px);
        }
      `}</style>
    </section>
  );
}
