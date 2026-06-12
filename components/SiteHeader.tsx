'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { href: '/storia', label: 'Storia' },
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
              style={{ height: 56, width: 'auto' }}
            />
          </Link>

          <nav className="site-nav">
            {NAV.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                aria-current={pathname === href || pathname.startsWith(href + '/') ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
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

      {/* Mobile drawer */}
      {open && (
        <div className="mobile-drawer" onClick={() => setOpen(false)}>
          <nav className="mobile-drawer__nav" onClick={(e) => e.stopPropagation()}>
            {NAV.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className={`mobile-drawer__link${pathname === href || pathname.startsWith(href + '/') ? ' is-active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <style>{`
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
          border-radius: 2px;
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
          background: rgba(116,18,62,0.18);
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
          font-weight: 700;
          font-size: 1.6rem;
          letter-spacing: -0.02em;
          color: var(--ink);
          padding: 10px 0;
          border-bottom: 1px solid var(--rule-soft);
        }
        .mobile-drawer__link.is-active { color: var(--verde); }
        .mobile-drawer__link:last-child { border-bottom: none; }

        @media (max-width: 700px) {
          .burger { display: inline-flex; }
          .mobile-drawer { display: block; }
        }
      `}</style>
    </>
  );
}
