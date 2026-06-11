import Link from 'next/link';
import Image from 'next/image';
import type { Reperto } from '@/lib/types';
import { imgPath, titleCase } from '@/lib/reperti';

interface Props {
  reperto: Reperto;
}

export default function CardReperto({ reperto }: Props) {
  const src = imgPath(reperto.id);

  return (
    <Link className="card-reperto" href={`/reperti/${reperto.id}`}>
      <div className="card-reperto__media">
        {src ? (
          <Image src={src} alt={reperto.nome} fill style={{ objectFit: 'cover' }} sizes="(max-width: 800px) 50vw, 25vw" />
        ) : (
          <div className="media-placeholder">Foto in archivio</div>
        )}
      </div>
      <div className="card-reperto__body">
        <h3 className="card-reperto__title">{titleCase(reperto.nome)}</h3>
        {reperto.epoca && (
          <span className="card-reperto__epoca">{reperto.epoca}</span>
        )}
      </div>
    </Link>
  );
}
