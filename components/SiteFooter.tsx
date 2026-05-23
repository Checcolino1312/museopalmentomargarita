import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h6>Museo Palmento Margarita</h6>
            <p style={{ maxWidth: '36ch', lineHeight: 1.5, color: 'color-mix(in oklab, var(--crema) 80%, transparent)' }}>
              S.P. Francavilla Fontana – Villa Castelli<br />
              72021 Francavilla Fontana (BR)<br />
              Puglia · Italia
            </p>
          </div>
          <div>
            <h6>Orari</h6>
            <ul>
              <li><span>Mer — Gio: 10:00 — 13:00</span></li>
              <li><span>Ven — Sab: 10:00 — 18:30</span></li>
              <li><span>Dom: 10:00 — 14:00</span></li>
              <li><span style={{ color: 'color-mix(in oklab, var(--crema) 55%, transparent)' }}>Lun — Mar: Chiuso</span></li>
            </ul>
          </div>
          <div>
            <h6>Scopri</h6>
            <ul>
              <li><Link href="/collezione">La collezione</Link></li>
              <li><Link href="/storia">Storia del palmento</Link></li>
            </ul>
          </div>
          <div>
            <h6>Contatti</h6>
            <ul>
              <li><a href="mailto:info@palmentomargarita.it">info@palmentomargarita.it</a></li>
              <li><a href="tel:+390831000000">+39 0831 000 000</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-wordmark">Palmento<br />Margarita.</div>
        <div className="footer-meta">
          <div>© 2026 Museo Palmento Margarita · Famiglie Margarita &amp; Carissimo</div>
          <div>Sito · Privacy · Cookie · Crediti</div>
        </div>
      </div>
    </footer>
  );
}
