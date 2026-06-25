export interface Player {
  id: number;
  name: string;
  slug: string;
  number: number;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  stats: {
    appearances: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    mvpCount: number;
  };
}

export const players: Player[] = [
  {
    id: 32691,
    name: 'Pavle Rudić',
    slug: 'pavle-rudic',
    number: 10,
    position: 'Forward',
    stats: { appearances: 14, goals: 10, assists: 3, yellowCards: 1, redCards: 0, mvpCount: 0 },
  },
  {
    id: 2989,
    name: 'Andrej Vuković',
    slug: 'andrej-vukovic',
    number: 7,
    position: 'Midfielder',
    stats: { appearances: 14, goals: 7, assists: 5, yellowCards: 1, redCards: 0, mvpCount: 0 },
  },
  {
    id: 2983,
    name: 'Marko Papović',
    slug: 'marko-papovic',
    number: 3,
    position: 'Midfielder',
    stats: { appearances: 14, goals: 7, assists: 1, yellowCards: 6, redCards: 0, mvpCount: 0 },
  },
  {
    id: 3507,
    name: 'Miloš Majdevac',
    slug: 'milos-majdevac',
    number: 4,
    position: 'Forward',
    stats: { appearances: 14, goals: 6, assists: 9, yellowCards: 6, redCards: 0, mvpCount: 3 },
  },
  {
    id: 2987,
    name: 'Ivan Stepanov',
    slug: 'ivan-stepanov',
    number: 5,
    position: 'Midfielder',
    stats: { appearances: 14, goals: 6, assists: 3, yellowCards: 2, redCards: 0, mvpCount: 0 },
  },
  {
    id: 6940,
    name: 'Marko Vejinović',
    slug: 'marko-vejinovic',
    number: 6,
    position: 'Midfielder',
    stats: { appearances: 14, goals: 6, assists: 3, yellowCards: 4, redCards: 0, mvpCount: 0 },
  },
  {
    id: 16595,
    name: 'Aleksandar Cetić',
    slug: 'aleksandar-cetic',
    number: 2,
    position: 'Defender',
    stats: { appearances: 14, goals: 4, assists: 5, yellowCards: 3, redCards: 0, mvpCount: 1 },
  },
  {
    id: 23527,
    name: 'Miodrag Belopavlović',
    slug: 'miodrag-belopavlovic',
    number: 8,
    position: 'Defender',
    stats: { appearances: 14, goals: 4, assists: 3, yellowCards: 0, redCards: 0, mvpCount: 0 },
  },
  {
    id: 3791,
    name: 'Ivan Kuzmanović',
    slug: 'ivan-kuzmanovic',
    number: 9,
    position: 'Defender',
    stats: { appearances: 14, goals: 4, assists: 4, yellowCards: 0, redCards: 0, mvpCount: 0 },
  },
  {
    id: 893,
    name: 'Vladimir Filipović',
    slug: 'vladimir-filipovic',
    number: 11,
    position: 'Midfielder',
    stats: { appearances: 14, goals: 3, assists: 1, yellowCards: 1, redCards: 0, mvpCount: 0 },
  },
  {
    id: 2082,
    name: 'Aleksandar Vrbaški',
    slug: 'aleksandar-vrbaski',
    number: 12,
    position: 'Midfielder',
    stats: { appearances: 14, goals: 3, assists: 2, yellowCards: 2, redCards: 0, mvpCount: 0 },
  },
  {
    id: 3220,
    name: 'Filip Popadić',
    slug: 'filip-popadic',
    number: 1,
    position: 'Goalkeeper',
    stats: { appearances: 14, goals: 2, assists: 0, yellowCards: 0, redCards: 1, mvpCount: 0 },
  },
  {
    id: 3545,
    name: 'Uroš Bugarski',
    slug: 'uros-bugarski',
    number: 13,
    position: 'Defender',
    stats: { appearances: 14, goals: 2, assists: 2, yellowCards: 1, redCards: 0, mvpCount: 1 },
  },
  {
    id: 7987,
    name: 'Nikola Komnenović',
    slug: 'nikola-komnenovic',
    number: 14,
    position: 'Defender',
    stats: { appearances: 14, goals: 2, assists: 1, yellowCards: 2, redCards: 1, mvpCount: 0 },
  },
  {
    id: 3218,
    name: 'Danilo Reko',
    slug: 'danilo-reko',
    number: 15,
    position: 'Midfielder',
    stats: { appearances: 14, goals: 1, assists: 0, yellowCards: 0, redCards: 0, mvpCount: 0 },
  },
  {
    id: 2986,
    name: 'Srđan Skala',
    slug: 'srdjan-skala',
    number: 16,
    position: 'Midfielder',
    stats: { appearances: 14, goals: 1, assists: 1, yellowCards: 0, redCards: 0, mvpCount: 0 },
  },
  {
    id: 3792,
    name: 'Vuk Barišić',
    slug: 'vuk-baric',
    number: 17,
    position: 'Forward',
    stats: { appearances: 14, goals: 1, assists: 2, yellowCards: 0, redCards: 0, mvpCount: 0 },
  },
  {
    id: 99999,
    name: 'Srđan Vasić',
    slug: 'srdjan-vasic',
    number: 18,
    position: 'Defender',
    stats: { appearances: 10, goals: 0, assists: 0, yellowCards: 0, redCards: 0, mvpCount: 0 },
  },
];

export function getPlayerBySlug(slug: string): Player | undefined {
  return players.find((p) => p.slug === slug);
}

export function getTopScorers(limit = 5) {
  return [...players]
    .sort((a, b) => b.stats.goals - a.stats.goals)
    .slice(0, limit)
    .map((p) => ({
      name: p.name,
      slug: p.slug,
      photo: null,
      stats: {
        goals: p.stats.goals,
        appearances: p.stats.appearances,
      },
    }));
}