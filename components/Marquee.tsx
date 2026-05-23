const VITIGNI = ['Primitivo', 'Negroamaro', 'Malvasia Nera', 'Aglianico', 'Montepulciano', 'Chardonnay', 'Cabernet Sauvignon'];

export default function Marquee() {
  const text = VITIGNI.join(' · ') + ' · ';
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <span>
          {VITIGNI.map((v, i) => (
            <span key={i}>{v}{i < VITIGNI.length - 1 && <span className="dot"> · </span>}</span>
          ))}
          <span className="dot"> · </span>
        </span>
        <span>
          {VITIGNI.map((v, i) => (
            <span key={i}>{v}{i < VITIGNI.length - 1 && <span className="dot"> · </span>}</span>
          ))}
          <span className="dot"> · </span>
        </span>
      </div>
    </div>
  );
}
