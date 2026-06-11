import repertiJson from '@/public/data/reperti.json';
import type { Reperto } from './types';

export function titleCase(s: string): string {
  return s.toLowerCase().replace(/\b([a-zàèéìòù])/g, (_, c: string) => c.toUpperCase());
}

export function imgPath(id: string): string | null {
  if (id === 'INV-001') return null;
  return `/data/oggetti/${id}.jpg`;
}

export function getAllReperti(): Reperto[] {
  return repertiJson as Reperto[];
}

export function getReperto(id: string): Reperto | undefined {
  return getAllReperti().find((r) => r.id === id);
}
