'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV: Array<{ href: string; label: string; external?: boolean }> = [
  { href: '/home', label: 'Museo' },
  { href: '/storia', label: 'Storia' },
  { href: '/contatti', label: 'Contatti' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="container container--wide site-header__inner">
          <Link href="/home" className="site-logo" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo/logonuovo.png"
              alt="Museo Palmento Margarita"
              style={{ height: 64, width: 'auto', flexShrink: 0 }}
            />
            <div className="site-logo__text">
              <span className="site-logo__museo">Museo</span>
              <span className="site-logo__name">Palmento Margarita</span>
            </div>
          </Link>

          <nav className="site-nav">
            {NAV.map(({ href, label, external }) =>
              external ? (
                <a key={label} href={href}>{label}</a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  aria-current={pathname === href || pathname.startsWith(href + '/') ? 'page' : undefined}
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
            {NAV.map(({ href, label, external }) =>
              external ? (
                <a key={label} href={href} className="mobile-drawer__link" onClick={() => setOpen(false)}>{label}</a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className={`mobile-drawer__link${pathname === href || pathname.startsWith(href + '/') ? ' is-active' : ''}`}
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
        .site-logo { display: inline-flex; align-items: center; gap: 14px; }
        .site-logo__text { display: flex; flex-direction: column; gap: 2px; }
        .site-logo__museo {
          font-family: var(--font-display);
          font-size: 0.62rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--ink-mute);
          font-weight: 600;
        }
        .site-logo__name {
          font-family: var(--font-display);
          font-size: 1.08rem;
          font-weight: 500;
          font-style: italic;
          letter-spacing: 0.01em;
          color: var(--ink);
          line-height: 1;
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
          .site-logo__text { display: none; }
        }
      `}</style>
    </>
  );
}
