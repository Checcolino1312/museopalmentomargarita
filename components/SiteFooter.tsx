import Link from 'next/link';
import type { SiteSettings } from '@/lib/types';
import { formatOrario, righeIndirizzo } from '@/lib/site';

export default function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const indirizzo = righeIndirizzo(settings?.indirizzo);
  const orari = settings?.orari ?? [];
  const scopri = settings?.footerScopri ?? [];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h6>{settings?.titolo ?? 'Museo Palmento Margarita'}</h6>
            {indirizzo.length > 0 && (
              <p style={{ maxWidth: '36ch', lineHeight: 1.5, color: 'color-mix(in oklab, var(--crema) 80%, transparent)' }}>
                {indirizzo.map((riga, i) => (
                  <span key={riga}>
                    {i > 0 && <br />}
                    {riga}
                  </span>
                ))}
              </p>
            )}
          </div>
          {orari.length > 0 && (
            <div>
              <h6>Orari</h6>
              <ul>
                {orari.map((o) => (
                  <li key={o.giorni}>
                    <span
                      style={
                        o.chiuso
                          ? { color: 'color-mix(in oklab, var(--crema) 55%, transparent)' }
                          : undefined
                      }
                    >
                      {o.giorni}: {formatOrario(o)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {scopri.length > 0 && (
            <div>
              <h6>Scopri</h6>
              <ul>
                {scopri.map((voce) => (
                  <li key={voce.href}>
                    <Link href={voce.href}>{voce.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(settings?.email || settings?.telefono) && (
            <div>
              <h6>Contatti</h6>
              <ul>
                {settings.email && (
                  <li>
                    <a href={`mailto:${settings.email}`}>{settings.email}</a>
                  </li>
                )}
                {settings.telefono && (
                  <li>
                    <a href={`tel:${settings.telefono.replace(/\s/g, '')}`}>{settings.telefono}</a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="footer-wordmark">Palmento<br />Margarita.</div>
        <div className="footer-meta">
          <div>{settings?.copyright}</div>
          <div>Sito · Privacy · Cookie · Crediti</div>
        </div>
      </div>
    </footer>
  );
}
