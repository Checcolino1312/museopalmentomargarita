/**
 * I nomi dei reperti arrivano dall'archivio in maiuscolo
 * (es. «UTENSILI di UTILIZZO QUODIANO»): questa funzione li rende leggibili.
 * Applicata a un testo già scritto normalmente, lo lascia invariato.
 */
export function titleCase(s: string): string {
  return s.toLowerCase().replace(/\b([a-zàèéìòù])/g, (_, c: string) => c.toUpperCase());
}
