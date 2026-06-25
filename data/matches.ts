export interface Goalscorer {
  playerName: string;
  minute: number;
  isOwnGoal: boolean;
}

export interface Match {
  id: string;
  detailId: string;
  date: string;
  opponent: string;
  isHome: boolean;
  competition: string;
  venue: string;
  pirliScore: number | null;
  opponentScore: number | null;
  result: 'W' | 'D' | 'L' | null;
  goalscorers: Goalscorer[];
  referee?: string;
  notes?: string;
}

export const matches: Match[] = [
  {
    id: 'vitorog-promet-pirli-2',
    detailId: 'vitorog-promet-pirli-2',
    date: '2026-06-23T19:00:00.000Z',
    opponent: 'Vitorog Promet',
    isHome: false,
    competition: 'II Liga Novi Sad',
    venue: 'SC Hattrick, I teren 5+1',
    pirliScore: 3,
    opponentScore: 6,
    result: 'L',
    referee: 'Dragan Majkić',
    goalscorers: [
      { playerName: 'Miodrag Belopavlović', minute: 29, isOwnGoal: false },
      { playerName: 'Marko Papović', minute: 42, isOwnGoal: false },
      { playerName: 'Pavle Rudić', minute: 49, isOwnGoal: false },
    ],
  },
  {
    id: 'korvex-pirli',
    detailId: 'korvex-pirli',
    date: '2026-06-19T19:00:00.000Z',
    opponent: 'Korvex',
    isHome: false,
    competition: 'II Liga Novi Sad',
    venue: 'SC Hattrick, I teren 5+1',
    pirliScore: 3,
    opponentScore: 8,
    result: 'L',
    referee: 'Nikola Morača',
    goalscorers: [
      { playerName: 'Filip Popadić', minute: 7, isOwnGoal: false },
      { playerName: 'Miodrag Belopavlović', minute: 9, isOwnGoal: false },
      { playerName: 'Miodrag Belopavlović', minute: 32, isOwnGoal: false },
      { playerName: 'Andrej Vuković', minute: 33, isOwnGoal: false },
      { playerName: 'Nikola Komnenović', minute: 40, isOwnGoal: false },
    ],
  },
  {
    id: 'codolis-pirli-4',
    detailId: 'codolis-pirli-4',
    date: '2026-05-20T20:00:00.000Z',
    opponent: 'Codolis',
    isHome: false,
    competition: 'II Liga Novi Sad',
    venue: 'SC Hattrick, I teren 5+1',
    pirliScore: 7,
    opponentScore: 9,
    result: 'L',
    goalscorers: [
      { playerName: 'Miloš Majdevac', minute: 12, isOwnGoal: false },
      { playerName: 'Miloš Majdevac', minute: 30, isOwnGoal: false },
      { playerName: 'Marko Papović', minute: 31, isOwnGoal: false },
      { playerName: 'Andrej Vuković', minute: 40, isOwnGoal: false },
      { playerName: 'Marko Vejinović', minute: 44, isOwnGoal: false },
      { playerName: 'Ivan Kuzmanović', minute: 49, isOwnGoal: false },
    ],
  },
  {
    id: 'graditelj-ns-fenseri-2',
    detailId: 'graditelj-ns-fenseri-2',
    date: '2026-04-29T19:00:00.000Z',
    opponent: 'Graditelj NS',
    isHome: false,
    competition: 'II Liga Novi Sad',
    venue: 'SC Hattrick, II teren 5+1',
    pirliScore: 8,
    opponentScore: 7,
    result: 'W',
    goalscorers: [
      { playerName: 'Pavle Rudić', minute: 7, isOwnGoal: false },
      { playerName: 'Pavle Rudić', minute: 20, isOwnGoal: false },
      { playerName: 'Pavle Rudić', minute: 29, isOwnGoal: false },
      { playerName: 'Andrej Vuković', minute: 12, isOwnGoal: false },
      { playerName: 'Andrej Vuković', minute: 35, isOwnGoal: false },
      { playerName: 'Miloš Majdevac', minute: 38, isOwnGoal: false },
      { playerName: 'Ivan Stepanov', minute: 45, isOwnGoal: false },
    ],
  },
  {
    id: 'black-star-pirli-2',
    detailId: 'black-star-pirli-2',
    date: '2026-04-21T21:15:00.000Z',
    opponent: 'Black Star',
    isHome: false,
    competition: 'II Liga Novi Sad',
    venue: 'SC Hattrick, I teren 5+1',
    pirliScore: 5,
    opponentScore: 10,
    result: 'L',
    goalscorers: [
      { playerName: 'Pavle Rudić', minute: 24, isOwnGoal: false },
      { playerName: 'Andrej Vuković', minute: 28, isOwnGoal: false },
      { playerName: 'Ivan Kuzmanović', minute: 35, isOwnGoal: false },
      { playerName: 'Miloš Majdevac', minute: 41, isOwnGoal: false },
      { playerName: 'Ivan Stepanov', minute: 48, isOwnGoal: false },
    ],
  },
  {
    id: 'gol-razlika-milenijum',
    detailId: 'gol-razlika-milenijum',
    date: '2026-03-29T18:00:00.000Z',
    opponent: 'Milenijum',
    isHome: true,
    competition: 'II Liga Novi Sad',
    venue: 'SC Hattrick, I teren 5+1',
    pirliScore: 1,
    opponentScore: 5,
    result: 'L',
    goalscorers: [{ playerName: 'Ivan Kuzmanović', minute: 39, isOwnGoal: false }],
  },
  {
    id: 'pirli-rubinstajn',
    detailId: 'pirli-rubinstajn',
    date: '2026-03-24T19:00:00.000Z',
    opponent: 'Brke',
    isHome: true,
    competition: 'II Liga Novi Sad',
    venue: 'SC Hattrick, I teren 5+1',
    pirliScore: 5,
    opponentScore: 7,
    result: 'L',
    goalscorers: [
      { playerName: 'Andrej Vuković', minute: 7, isOwnGoal: false },
      { playerName: 'Andrej Vuković', minute: 30, isOwnGoal: false },
      { playerName: 'Miloš Majdevac', minute: 33, isOwnGoal: false },
      { playerName: 'Ivan Stepanov', minute: 40, isOwnGoal: false },
      { playerName: 'Ivan Kuzmanović', minute: 49, isOwnGoal: false },
    ],
  },
  {
    id: 'ujedinjeni-021',
    detailId: 'ujedinjeni-021',
    date: '2026-03-19T20:00:00.000Z',
    opponent: 'Burazeri',
    isHome: true,
    competition: 'II Liga Novi Sad',
    venue: 'SC Hattrick, I teren 5+1',
    pirliScore: 4,
    opponentScore: 4,
    result: 'D',
    notes: 'Penali 2-3',
    goalscorers: [
      { playerName: 'Marko Vejinović', minute: 2, isOwnGoal: false },
      { playerName: 'Miloš Majdevac', minute: 25, isOwnGoal: false },
      { playerName: 'Andrej Vuković', minute: 28, isOwnGoal: false },
      { playerName: 'Marko Papović', minute: 45, isOwnGoal: false },
    ],
  },
  {
    id: 'pirli-kontra-fc-2',
    detailId: 'pirli-kontra-fc-2',
    date: '2026-03-10T19:00:00.000Z',
    opponent: 'Kontra FC',
    isHome: true,
    competition: 'II Liga Novi Sad',
    venue: 'SC Hattrick, I teren 5+1',
    pirliScore: 5,
    opponentScore: 6,
    result: 'L',
    goalscorers: [
      { playerName: 'Marko Papović', minute: 23, isOwnGoal: false },
      { playerName: 'Marko Papović', minute: 27, isOwnGoal: false },
      { playerName: 'Marko Papović', minute: 30, isOwnGoal: false },
      { playerName: 'Marko Papović', minute: 44, isOwnGoal: false },
      { playerName: 'Uroš Bugarski', minute: 46, isOwnGoal: false },
    ],
  },
  {
    id: 'milenijum-pirli',
    detailId: 'milenijum-pirli',
    date: '2026-03-01T19:00:00.000Z',
    opponent: 'Dark Knights',
    isHome: false,
    competition: 'II Liga Novi Sad',
    venue: 'SC Hattrick, I teren 5+1',
    pirliScore: 1,
    opponentScore: 6,
    result: 'L',
    goalscorers: [{ playerName: 'Ivan Kuzmanović', minute: 49, isOwnGoal: false }],
  },
];

export function getRecentMatches(limit = 5): Match[] {
  return [...matches]
    .filter((m) => m.result !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getNextMatch(): Match | undefined {
  const now = new Date();
  return [...matches]
    .filter((m) => m.result === null && new Date(m.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
}

export function getMatchById(id: string): Match | undefined {
  return matches.find((m) => m.id === id);
}

// ⭐ NOVA FUNKCIJA
export function getSeasonStats() {
  const played = matches.filter((m) => m.result !== null);
  const wins = played.filter((m) => m.result === 'W').length;
  const draws = played.filter((m) => m.result === 'D').length;
  const losses = played.filter((m) => m.result === 'L').length;
  const goalsFor = played.reduce((acc, m) => acc + (m.pirliScore ?? 0), 0);
  const goalsAgainst = played.reduce((acc, m) => acc + (m.opponentScore ?? 0), 0);
  const points = wins * 3 + draws;

  return {
    played: played.length,
    wins,
    draws,
    losses,
    goalsFor,
    goalsAgainst,
    goalDifference: goalsFor - goalsAgainst,
    points,
    winRate: played.length > 0 ? Math.round((wins / played.length) * 100) + '%' : '0%',
  };
}