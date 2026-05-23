import repertiJson from '@/public/data/reperti.json';
import type { Reperto, Category } from './types';

export function categorize(item: { nome: string; descrizione: string; noteTitolo: string }): Category {
  const t = (item.nome + ' ' + item.descrizione + ' ' + item.noteTitolo).toLowerCase();
  if (/pigia|palment|staffa|leva|sosteg|torchi/.test(t)) return 'pigiatura';
  if (/bottigl|anfor|capason|fiasc|damigian|recipient|liquor|vino|grappa/.test(t)) return 'conservazione';
  if (/pompa|fontana|lampad|pozzo|cucin|focolar|fuoco|caldai|paiol|tegam/.test(t)) return 'masseria';
  if (/utensil|falc|vang|attrezz|imbuto|tritaghiacc|conserv/.test(t)) return 'utensili';
  return 'strada';
}

export function titleCase(s: string): string {
  return s.toLowerCase().replace(/\b([a-zàèéìòù])/g, (_, c: string) => c.toUpperCase());
}

export function imgPath(id: string): string | null {
  if (id === 'INV-001') return null;
  return `/data/oggetti/${id}.jpg`;
}

export function getAllReperti(): Reperto[] {
  return (repertiJson as Omit<Reperto, 'cat'>[]).map((it) => ({
    ...it,
    cat: categorize(it),
  }));
}

export function getReperto(id: string): Reperto | undefined {
  return getAllReperti().find((r) => r.id === id);
}
