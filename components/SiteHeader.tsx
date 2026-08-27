'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { imageUrl } from '@/sanity/image';
import type { LinkVoce, SiteSettings } from '@/lib/types';

/** Voci di riserva: usate solo se le Impostazioni del sito non sono ancora compilate. */
const NAV_FALLBACK: LinkVoce[] = [
  { href: '/home', label: 'Museo' },
  { href: '/storia', label: 'Storia' },
  { href: '/contatti', label: 'Contatti' },
];

/** Un indirizzo scritto nello Studio può anche puntare fuori dal sito. */
const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

const isCurrent = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(href + '/');

export default function SiteHeader({ settings }: { settings: SiteSettings | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = settings?.nav?.length ? settings.nav : NAV_FALLBACK;
  // Chiesta al doppio della misura a schermo, per gli schermi ad alta densità.
  const logoSrc = imageUrl(settings?.logo, 560);
  const titolo = settings?.titolo ?? 'Museo Palmento Margarita';

  return (
    <>
      <header className="site-header">
        <div className="container container--wide site-header__inner">
          {/* Il logo contiene già la scritta «Museo Palmento Margarita»:
              affiancargliela di nuovo la farebbe leggere due volte. */}
          <Link href="/home" className="site-logo" onClick={() => setOpen(false)}>
            {logoSrc ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img className="site-logo__img" src={logoSrc} alt={titolo} />
            ) : (
              <span className="site-logo__ripiego">{titolo}</span>
            )}
          </Link>

          <nav className="site-nav">
            {nav.map(({ href, label }) =>
              isExternal(href) ? (
                <a key={label} href={href}>{label}</a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  aria-current={isCurrent(pathname, href) ? 'page' : undefined}
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          <button
            className="burger"
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`burger__bar${open ? ' open' : ''}`} />
          </button>
        </div>
      </header>

      {open && (
        <div className="mobile-drawer" onClick={() => setOpen(false)}>
          <nav className="mobile-drawer__nav" onClick={(e) => e.stopPropagation()}>
            {nav.map(({ href, label }) =>
              isExternal(href) ? (
                <a key={label} href={href} className="mobile-drawer__link" onClick={() => setOpen(false)}>{label}</a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className={`mobile-drawer__link${isCurrent(pathname, href) ? ' is-active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}

      <style>{`
        .site-logo { display: inline-flex; align-items: center; flex-shrink: 0; }
        /* Il logo è orizzontale (rapporto 1,69) e contiene la scritta: sotto una
           certa altezza le tre righe diventano illeggibili, da qui i 72px. */
        .site-logo__img {
          height: 72px;
          width: auto;
          display: block;
        }
        /* Mostrato solo se nelle Impostazioni non c'è ancora un logo. */
        .site-logo__ripiego {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--ink);
        }

        .burger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          margin-left: auto;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 5px;
        }
        .burger__bar,
        .burger__bar::before,
        .burger__bar::after {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--ink);
          border-radius: 0;
          transition: transform .22s ease, opacity .18s ease;
          position: relative;
        }
        .burger__bar::before,
        .burger__bar::after {
          content: '';
          position: absolute;
          left: 0;
        }
        .burger__bar::before { top: -6px; }
        .burger__bar::after  { top:  6px; }
        .burger__bar.open { background: transparent; }
        .burger__bar.open::before { transform: translateY(6px) rotate(45deg); }
        .burger__bar.open::after  { transform: translateY(-6px) rotate(-45deg); }

        .mobile-drawer {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 49;
          background: rgba(58,26,42,0.22);
        }
        .mobile-drawer__nav {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(72vw, 280px);
          background: var(--crema);
          display: flex;
          flex-direction: column;
          padding: 100px 32px 40px;
          gap: 4px;
          border-left: 1px solid var(--rule-soft);
        }
        .mobile-drawer__link {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink);
          padding: 14px 0;
          border-bottom: 1px solid var(--rule-soft);
        }
        .mobile-drawer__link.is-active { color: var(--verdes); }
        .mobile-drawer__link:last-child { border-bottom: none; }

        @media (max-width: 700px) {
          .burger { display: inline-flex; }
          .mobile-drawer { display: block; }
          /* Il logo si rimpicciolisce invece di sparire: senza, in cima alla
             pagina non resterebbe scritto da nessuna parte il nome del museo. */
          .site-logo__img { height: 54px; }
        }
        @media (max-width: 380px) {
          .site-logo__img { height: 46px; }
        }
      `}</style>
    </>
  );
}
