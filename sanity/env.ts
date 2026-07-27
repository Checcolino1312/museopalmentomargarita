/**
 * Configurazione Sanity letta dalle variabili d'ambiente.
 * I valori stanno in `.env.local` (vedi `.env.local.example`).
 */

function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Variabile d'ambiente mancante: ${name}.\n` +
        `Copia .env.local.example in .env.local e compila i valori del progetto Sanity ` +
        `(li trovi su https://manage.sanity.io).`
    );
  }
  return value;
}

export const projectId = required(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_PROJECT_ID'
);

export const dataset = required(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'NEXT_PUBLIC_SANITY_DATASET'
);

/** Data fissa: blocca la versione delle API così un aggiornamento lato Sanity non cambia le risposte. */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-07-27';
