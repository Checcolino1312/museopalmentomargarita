'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/collezione', label: 'Collezione' },
  { href: '/storia', label: 'Storia' },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container container--wide site-header__inner">
        <Link href="/home" className="site-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo/verdes.png"
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
      </div>
    </header>
  );
}
