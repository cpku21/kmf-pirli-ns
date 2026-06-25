export interface MatchDetailTeam {
  goals: { player: string; minutes: string[] }[];
  assists: { player: string; count: number }[];
  yellow_cards: { player: string; minute: string }[];
  red_cards: { player: string; minute: string }[];
  mvp: string | null;
  lineup: string[];
}

export interface MatchDetail {
  id: string;
  match: string;
  date: string;
  score: string;
  link?: string;
  teams: Record<string, MatchDetailTeam>;
}

export const matchDetails: MatchDetail[] = [
  {
    id: 'korvex-pirli',
    match: 'KORVEX — PIRLI',
    date: '2026-06-19',
    score: '8:3',
    link: 'https://minifudbalsrbije.rs/event/korvex-pirli/',
    teams: {
      KORVEX: {
        goals: [
          { player: '36182', minutes: ["6'", "8'", "39'"] },
          { player: '33626', minutes: ["14'"] },
          { player: '6173', minutes: ["36'", "38'"] },
          { player: '3083', minutes: ["44'"] },
          { player: '20150', minutes: ["50'"] },
        ],
        assists: [
          { player: '6173', count: 1 },
          { player: '3083', count: 1 },
          { player: '6406', count: 2 },
          { player: '32457', count: 1 },
        ],
        yellow_cards: [{ player: '33626', minute: "50'" }],
        red_cards: [],
        mvp: '36182',
        lineup: ['36182', '33626', '6173', '3083', '6406', '20150', '32457'],
      },
      PIRLI: {
        goals: [
          { player: '32691', minutes: ["33'"] },
          { player: '2983', minutes: ["9'", "32'"] },
        ],
        assists: [
          { player: '893', count: 1 },
          { player: '3220', count: 2 },
        ],
        yellow_cards: [
          { player: '3791', minute: "7'" },
          { player: '3220', minute: "40'" },
        ],
        red_cards: [],
        mvp: null,
        lineup: ['32691', '2983', '3791', '3507', '893', '3220'],
      },
    },
  },
  {
    id: 'codolis-pirli-4',
    match: 'CODOLIS — PIRLI',
    date: '2026-05-20',
    score: '3:5',
    link: 'https://minifudbalsrbije.rs/event/codolis-pirli-4/',
    teams: {
      CODOLIS: {
        goals: [
          { player: '1405', minutes: ["20'", "30'"] },
          { player: '1265', minutes: ["4'"] },
        ],
        assists: [{ player: '1405', count: 1 }],
        yellow_cards: [],
        red_cards: [],
        mvp: null,
        lineup: ['1799', '1405', '1418', '1265', '1260', '12804'],
      },
      PIRLI: {
        goals: [
          { player: '32691', minutes: ["6'", "28'"] },
          { player: '2989', minutes: ["15'"] },
          { player: '2983', minutes: ["37'"] },
          { player: '3507', minutes: ["43'"] },
        ],
        assists: [
          { player: '2987', count: 2 },
          { player: '2989', count: 1 },
        ],
        yellow_cards: [],
        red_cards: [],
        mvp: '2989',
        lineup: ['32691', '2989', '2983', '3545', '3507', '2987', '2082', '6940'],
      },
    },
  },
  {
    id: 'fenseri-pirli',
    match: 'FENSERI — PIRLI',
    date: '2026-02-22',
    score: '9:7',
    link: 'https://minifudbalsrbije.rs/event/fenseri-pirli/',
    teams: {
      FENSERI: {
        goals: [
          { player: '986', minutes: ["13'", "26'", "28'"] },
          { player: '32548', minutes: ["22'"] },
        ],
        assists: [
          { player: '986', count: 1 },
          { player: '21258', count: 1 },
        ],
        yellow_cards: [],
        red_cards: [],
        mvp: null,
        lineup: ['19454', '732', '14173', '35113', '986', '21258', '32548', '29186'],
      },
      PIRLI: {
        goals: [
          { player: '32691', minutes: ["1'", "19'", "37'"] },
          { player: '2989', minutes: ["11'", "46'"] },
          { player: '2983', minutes: ["31'"] },
          { player: '3507', minutes: ["48'"] },
        ],
        assists: [
          { player: '2987', count: 3 },
          { player: '2989', count: 1 },
        ],
        yellow_cards: [],
        red_cards: [],
        mvp: '32691',
        lineup: ['32691', '2986', '3507', '2987', '893', '2082', '6940'],
      },
    },
  },
  {
    id: 'graditelj-ns-fenseri-2',
    match: 'GRADITELJ NS — PIRLI',
    date: '2026-04-29',
    score: '7:8',
    link: 'https://minifudbalsrbije.rs/event/graditelj-ns-fenseri-2/',
    teams: {
      'GRADITELJ NS': {
        goals: [
          { player: '3065', minutes: ["18'"] },
          { player: '3064', minutes: ["30'"] },
          { player: '3308', minutes: ["49'", "50'"] },
        ],
        assists: [{ player: '3308', count: 3 }],
        yellow_cards: [],
        red_cards: [],
        mvp: null,
        lineup: ['3067', '3065', '3566', '3064', '3308', '20098'],
      },
      PIRLI: {
        goals: [
          { player: '32691', minutes: ["7'", "20'", "29'"] },
          { player: '2989', minutes: ["12'", "35'"] },
          { player: '2987', minutes: ["38'"] },
          { player: '6940', minutes: ["45'"] },
        ],
        assists: [
          { player: '2987', count: 2 },
          { player: '2989', count: 1 },
        ],
        yellow_cards: [],
        red_cards: [],
        mvp: '32691',
        lineup: ['32691', '16595', '2989', '3507', '2987', '2082', '6940'],
      },
    },
  },
  {
    id: 'black-star-pirli-2',
    match: 'BLACK STAR — PIRLI',
    date: '2026-04-21',
    score: '10:5',
    link: 'https://minifudbalsrbije.rs/event/black-star-pirli-2/',
    teams: {
      'BLACK STAR': {
        goals: [
          { player: '779', minutes: ["31'", "49'"] },
          { player: '32430', minutes: ["38'"] },
          { player: '34688', minutes: ["10'", "36'", "44'", "50'"] },
          { player: '1393', minutes: ["12'"] },
        ],
        assists: [
          { player: '778', count: 1 },
          { player: '779', count: 1 },
          { player: '32430', count: 1 },
          { player: '1393', count: 2 },
        ],
        yellow_cards: [],
        red_cards: [],
        mvp: '34688',
        lineup: ['778', '779', '32430', '34688', '1393', '21092', '1394'],
      },
      PIRLI: {
        goals: [
          { player: '32691', minutes: ["24'"] },
          { player: '2989', minutes: ["28'"] },
          { player: '3507', minutes: ["35'"] },
          { player: '2987', minutes: ["41'"] },
          { player: '6940', minutes: ["48'"] },
        ],
        assists: [
          { player: '2987', count: 2 },
          { player: '2989', count: 1 },
        ],
        yellow_cards: [],
        red_cards: [],
        mvp: null,
        lineup: ['32691', '7987', '3545', '3507', '2987', '3218', '3220'],
      },
    },
  },
  {
    id: 'gol-razlika-milenijum',
    match: 'PIRLI — MILENIJUM',
    date: '2026-03-29',
    score: '1:5',
    link: 'https://minifudbalsrbije.rs/event/gol-razlika-milenijum/',
    teams: {
      PIRLI: {
        goals: [{ player: '3507', minutes: ["39'"] }],
        assists: [],
        yellow_cards: [],
        red_cards: [],
        mvp: null,
        lineup: ['16595', '23527', '2989', '2983', '2986', '3507', '2987', '6940'],
      },
      MILENIJUM: {
        goals: [
          { player: '749', minutes: ["9'", "15'", "48'"] },
          { player: '748', minutes: ["24'"] },
          { player: '756', minutes: ["34'"] },
        ],
        assists: [
          { player: '749', count: 2 },
          { player: '748', count: 1 },
        ],
        yellow_cards: [],
        red_cards: [],
        mvp: '749',
        lineup: ['749', '748', '974', '756', '755', '752', '754', '753'],
      },
    },
  },
  {
    id: 'pirli-rubinstajn',
    match: 'PIRLI — BRKE',
    date: '2026-03-24',
    score: '5:7',
    link: 'https://minifudbalsrbije.rs/event/pirli-rubinstajn/',
    teams: {
      PIRLI: {
        goals: [
          { player: '2989', minutes: ["7'", "30'"] },
          { player: '2987', minutes: ["33'"] },
          { player: '6940', minutes: ["40'"] },
          { player: '3507', minutes: ["49'"] },
        ],
        assists: [
          { player: '2989', count: 1 },
          { player: '2987', count: 3 },
        ],
        yellow_cards: [],
        red_cards: [],
        mvp: null,
        lineup: ['32691', '2989', '2986', '3507', '2987', '6940'],
      },
      BRKE: {
        goals: [
          { player: '1800', minutes: ["4'", "16'", "25'", "44'"] },
          { player: '1938', minutes: ["18'"] },
          { player: '2852', minutes: ["22'", "38'"] },
        ],
        assists: [
          { player: '1800', count: 2 },
          { player: '1938', count: 1 },
        ],
        yellow_cards: [],
        red_cards: [],
        mvp: '1800',
        lineup: ['1800', '1938', '2852', '3889', '3943', '22987', '35114'],
      },
    },
  },
  {
    id: 'ujedinjeni-021',
    match: 'PRILI — BURAZERI',
    date: '2026-03-19',
    score: '4:4 (penali 2-3)',
    link: 'https://minifudbalsrbije.rs/event/ujedinjeni-021/',
    teams: {
      PRILI: {
        goals: [
          { player: '16595', minutes: ["2'"] },
          { player: '23527', minutes: ["45'"] },
          { player: '2989', minutes: ["28'"] },
          { player: '2986', minutes: ["25'"] },
        ],
        assists: [{ player: '3507', count: 2 }],
        yellow_cards: [],
        red_cards: [],
        mvp: null,
        lineup: ['16595', '23527', '2989', '2986', '3507', '2987', '2082'],
      },
      BURAZERI: {
        goals: [
          { player: '720', minutes: ["12'", "44'"] },
          { player: '1016', minutes: ["18'"] },
          { player: '1018', minutes: ["30'"] },
        ],
        assists: [
          { player: '720', count: 1 },
          { player: '1016', count: 1 },
        ],
        yellow_cards: [],
        red_cards: [],
        mvp: null,
        lineup: ['720', '1016', '1018', '1134', '2038', '4692', '5988', '2105'],
      },
    },
  },
  {
    id: 'pirli-kontra-fc-2',
    match: 'PIRLI — KONTRA FC',
    date: '2026-03-10',
    score: '6:3',
    link: 'https://minifudbalsrbije.rs/event/pirli-kontra-fc-2/',
    teams: {
      PIRLI: {
        goals: [
          { player: '23527', minutes: ["11'"] },
          { player: '2989', minutes: ["33'", "46'", "49'"] },
        ],
        assists: [
          { player: '16595', count: 1 },
          { player: '2989', count: 2 },
          { player: '2987', count: 1 },
        ],
        yellow_cards: [],
        red_cards: [],
        mvp: '2989',
        lineup: ['16595', '23527', '32691', '2989', '3791', '3507', '2987', '2082'],
      },
      'KONTRA FC': {
        goals: [
          { player: '11676', minutes: ["13'", "45'"] },
          { player: '31262', minutes: ["34'"] },
        ],
        assists: [],
        yellow_cards: [],
        red_cards: [],
        mvp: null,
        lineup: ['11676', '31262', '6248', '35624', '17573', '19133', '28442'],
      },
    },
  },
  {
    id: 'milenijum-pirli',
    match: 'DARK KNIGHTS — PIRLI',
    date: '2026-03-01',
    score: '6:1',
    link: 'https://minifudbalsrbije.rs/event/milenijum-pirli/',
    teams: {
      'DARK KNIGHTS': {
        goals: [
          { player: '836', minutes: ["20'", "41'", "45'"] },
          { player: '11881', minutes: ["30'"] },
        ],
        assists: [
          { player: '829', count: 2 },
          { player: '11881', count: 1 },
        ],
        yellow_cards: [],
        red_cards: [],
        mvp: '836',
        lineup: ['829', '661', '836', '16520', '11881', '35423', '11229', '19466'],
      },
      PIRLI: {
        goals: [{ player: '3507', minutes: ["49'"] }],
        assists: [],
        yellow_cards: [],
        red_cards: [],
        mvp: null,
        lineup: ['3792', '3545', '2986', '3507', '2987', '2082', '6940'],
      },
    },
  },
];

export function getMatchDetailById(id: string): MatchDetail | undefined {
  return matchDetails.find((m) => m.id === id);
}