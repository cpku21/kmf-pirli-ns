export interface Standing {
  position: number;
  team: string;
  isPirli: boolean;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export const seasonName = '30. SEZONA, 2026';
export const competition = 'II Liga Novi Sad';

// Ažuriraj ručno nakon svake utakmice
export const standings: Standing[] = [
  { position: 1, team: 'Vitorog Promet', isPirli: false, played: 10, wins: 9, draws: 0, losses: 1, goalsFor: 82, goalsAgainst: 35, goalDifference: 47, points: 27, form: ['W', 'W', 'W', 'W', 'W'] },
  { position: 2, team: 'Korvex', isPirli: false, played: 10, wins: 8, draws: 1, losses: 1, goalsFor: 75, goalsAgainst: 40, goalDifference: 35, points: 25, form: ['W', 'W', 'D', 'W', 'W'] },
  { position: 3, team: 'Codolis', isPirli: false, played: 10, wins: 7, draws: 1, losses: 2, goalsFor: 68, goalsAgainst: 45, goalDifference: 23, points: 22, form: ['W', 'W', 'W', 'L', 'W'] },
  { position: 4, team: 'Black Star', isPirli: false, played: 10, wins: 6, draws: 0, losses: 4, goalsFor: 60, goalsAgainst: 50, goalDifference: 10, points: 18, form: ['W', 'L', 'W', 'W', 'L'] },
  { position: 5, team: 'Graditelj NS', isPirli: false, played: 10, wins: 5, draws: 1, losses: 4, goalsFor: 55, goalsAgainst: 52, goalDifference: 3, points: 16, form: ['D', 'W', 'L', 'W', 'L'] },
  { position: 6, team: 'Milenijum', isPirli: false, played: 10, wins: 5, draws: 0, losses: 5, goalsFor: 52, goalsAgainst: 55, goalDifference: -3, points: 15, form: ['W', 'L', 'W', 'L', 'W'] },
  { position: 7, team: 'Kontra FC', isPirli: false, played: 10, wins: 4, draws: 1, losses: 5, goalsFor: 48, goalsAgainst: 58, goalDifference: -10, points: 13, form: ['L', 'W', 'D', 'L', 'W'] },
  { position: 8, team: 'Pirli', isPirli: true, played: 10, wins: 2, draws: 1, losses: 7, goalsFor: 39, goalsAgainst: 68, goalDifference: -29, points: 7, form: ['L', 'L', 'L', 'D', 'L'] },
  { position: 9, team: 'Dark Knights', isPirli: false, played: 10, wins: 2, draws: 0, losses: 8, goalsFor: 35, goalsAgainst: 72, goalDifference: -37, points: 6, form: ['L', 'L', 'W', 'L', 'L'] },
  { position: 10, team: 'Brke', isPirli: false, played: 10, wins: 1, draws: 1, losses: 8, goalsFor: 30, goalsAgainst: 78, goalDifference: -48, points: 4, form: ['L', 'D', 'L', 'L', 'L'] },
];

export function getPirliStanding(): Standing | undefined {
  return standings.find((s) => s.isPirli);
}