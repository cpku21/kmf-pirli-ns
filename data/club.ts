export const clubInfo = {
  name: 'KMF Pirli',
  city: 'Novi Sad',
  founded: 2015,
  venue: 'SC Hattrick, I teren 5+1',
  competition: 'II Liga Novi Sad',
  description:
    'KMF Pirli je minifudbalski klub iz Novog Sada koji se takmiči u II Ligi Novi Sad. Klub je osnovan sa ciljem da ocupi prijatelje i ljubitelje fudbala i stvori kompetitivnu ekipu na lokalnoj sceni.',
};

export interface ClubHistoryEntry {
  id: string;
  year: number;
  title: string;
  description: string;
  type: 'founding' | 'achievement' | 'milestone' | 'season' | 'other';
  order: number;
}

export const clubHistory: ClubHistoryEntry[] = [
  {
    id: '1',
    year: 2015,
    title: 'Osnivanje kluba',
    description: 'KMF Pirli je osnovan u Novom Sadu. Ekipa se okupila oko grupe prijatelja sa željom da se takmiče u organizovanom minifudbalu.',
    type: 'founding',
    order: 1,
  },
  {
    id: '2',
    year: 2022,
    title: 'Ulazak u II Ligu Novi Sad',
    description: 'Pirli obezbeđuje plasman u Meridianbet II Ligu Novi Sad i postaje stalni učesnik takmičenja.',
    type: 'milestone',
    order: 2,
  },
  {
    id: '3',
    year: 2024,
    title: '27. Sezona — 2024/2025',
    description: 'Klub nastavlja takmičenje u II Ligi Novi Sad. Ekipa beleži nekoliko zapaženih pobeda.',
    type: 'season',
    order: 3,
  },
  {
    id: '4',
    year: 2026,
    title: '30. Sezona — 2026',
    description: 'Tekuća sezona. Pirli se bori za opstanak u II Ligi Novi Sad.',
    type: 'season',
    order: 4,
  },
];