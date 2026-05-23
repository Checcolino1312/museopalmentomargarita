export type Category = 'pigiatura' | 'conservazione' | 'masseria' | 'utensili' | 'strada';

export interface Reperto {
  id: string;
  nome: string;
  epoca: string;
  provenienza: string;
  descrizione: string;
  noteTitolo: string;
  noteCorpo: string;
  cat?: Category;
}

export const ROOM_INFO: Record<Category, { name: string; sub: string; chip: string; desc: string }> = {
  pigiatura: {
    name: 'La Pigiatura',
    sub: 'il palmento',
    chip: 'chip--verde',
    desc: "Le strutture in pietra, le staffe e le leve di supporto utilizzate per pigiare l'uva a piedi nudi.",
  },
  conservazione: {
    name: 'La Conservazione',
    sub: 'vino & mosto',
    chip: 'chip--magenta',
    desc: 'Anfore, capasoni, fiaschi rivestiti di paglia e bottiglie per i liquori tradizionali.',
  },
  masseria: {
    name: "L'Acqua & il fuoco",
    sub: 'masseria',
    chip: 'chip--giallo',
    desc: 'Pompe per il pozzo, fontane in ghisa, lampade a olio, attrezzi per la cucina contadina.',
  },
  utensili: {
    name: 'Il Lavoro nei campi',
    sub: 'utensili',
    chip: 'chip--lilla',
    desc: 'Falci, vanghe, contenitori per la conservazione di marmellate, miele e conserve sottolio.',
  },
  strada: {
    name: 'La Strada',
    sub: 'via Appia',
    chip: 'chip--viola',
    desc: 'Il crocevia con la via Appia: viandanti, mercanti, ristoro. Le mappe del territorio.',
  },
};
