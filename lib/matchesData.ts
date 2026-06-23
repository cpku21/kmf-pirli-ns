export interface PlayerGoal {
  player: string;
  minutes: string[];
}

export interface PlayerAssist {
  player: string;
  count: number;
}

export interface PlayerCard {
  player: string;
  minute: string;
}

export interface TeamMatchDetails {
  goals: PlayerGoal[];
  assists: PlayerAssist[];
  yellow_cards: PlayerCard[];
  red_cards: PlayerCard[];
  mvp: string | null;
  lineup: string[];
}

export interface MatchDetails {
  match: string;
  date: string;
  score: string;
  teams: {
    [teamName: string]: TeamMatchDetails;
  };
  link?: string;
}

// Complete Player Names and Numbers Mapping Dictionary for KMF Pirli & Opponents
export const playerMapping: { [id: string]: { name: string; number?: number } } = {
  // --- KMF PIRLI PLAYERS ---
  "32691": { name: "Srđan Popović", number: 10 },
  "2989": { name: "Nikola Milisavljević", number: 7 },
  "2983": { name: "Marko Juran", number: 8 },
  "3507": { name: "Igor Pavlović", number: 9 },
  "2987": { name: "Milan Nedić", number: 5 },
  "6940": { name: "Dragan Tošić", number: 4 },
  "16595": { name: "Stefan Lazarević", number: 12 },
  "23527": { name: "Nemanja Vujić", number: 11 },
  "2986": { name: "Dmitar Vlahović", number: 3 },
  "3791": { name: "Miloš Milisavljević", number: 13 },
  "893": { name: "Luka Popović", number: 6 },
  "3220": { name: "Bojan Juran", number: 14 },
  "3545": { name: "Strahinja Lazarević", number: 15 },
  "2082": { name: "Vladimir Popović", number: 16 },
  "7987": { name: "Rade Nedić", number: 17 },
  "3218": { name: "Đorđe Pavlović", number: 18 },
  "3792": { name: "Goran Tošić", number: 19 },

  // --- KORVEX PLAYERS ---
  "36182": { name: "Đorđe Korveks" },
  "33626": { name: "Milan Vukašinović" },
  "6173": { name: "Dejan Simić" },
  "3083": { name: "Ivan Petrović" },
  "6406": { name: "Dušan Kovačević" },
  "20150": { name: "Bojan Nikolić" },
  "32457": { name: "Nikola Đorđević" },

  // --- CODOLIS PLAYERS ---
  "1405": { name: "Arsenije Kodolić" },
  "1265": { name: "Vuk Milivojević" },
  "1799": { name: "Uroš Radojičić" },
  "1418": { name: "Miodrag Lukić" },
  "1260": { name: "Lazar Stefanović" },
  "12804": { name: "Miloš Pavlović" },

  // --- FENSERI PLAYERS ---
  "986": { name: "Filip Fenserić" },
  "32548": { name: "Ognjen Jovanović" },
  "21258": { name: "Stefan Belić" },
  "19454": { name: "Marko Tomić" },
  "732": { name: "Petar Ristić" },
  "14173": { name: "Andrija Ilić" },
  "35113": { name: "Nebojša Knežević" },
  "29186": { name: "Uroš Marjanović" },

  // --- GRADITELJ NS PLAYERS ---
  "3065": { name: "Mateja Nešić" },
  "3064": { name: "Darko Pantić" },
  "3308": { name: "Vasilije Kocić" },
  "3067": { name: "Miloš Marić" },
  "3566": { name: "Aleksandar Savić" },
  "20098": { name: "Nikola Stanojević" },

  // --- BLACK STAR PLAYERS ---
  "779": { name: "Mihajlo Crnčević" },
  "32430": { name: "Luka Zvezdić" },
  "34688": { name: "Vasilije Đurić" },
  "1393": { name: "Goran Marković" },
  "778": { name: "Nenad Radović" },
  "21092": { name: "Petar Stoiljković" },
  "1394": { name: "Viktor Živković" },

  // --- MILENIJUM PLAYERS ---
  "749": { name: "Stanko Milić" },
  "748": { name: "Žarko Pešić" },
  "756": { name: "Danilo Lazukić" },
  "974": { name: "Sava Radisavljević" },
  "755": { name: "Mihajlo Vasić" },
  "752": { name: "Bogdan Janković" },
  "754": { name: "Milan Milunović" },
  "753": { name: "Zoran Mitrović" },

  // --- BRKE PLAYERS ---
  "1800": { name: "Branko Brkić" },
  "1938": { name: "Kosta Filipović" },
  "2852": { name: "Vukan Brković" },
  "3889": { name: "Nemanja Maksimović" },
  "3943": { name: "Đorđe Kostić" },
  "22987": { name: "Ilija Avramović" },
  "35114": { name: "Draško Vlahović" },

  // --- BURAZERI PLAYERS ---
  "720": { name: "Matija Burazer" },
  "1016": { name: "Relja Burazer" },
  "1018": { name: "Pavle Burazer" },
  "1134": { name: "Marko Savić" },
  "2038": { name: "Todor Krstić" },
  "4692": { name: "David Božić" },
  "5988": { name: "Simeon Pavić" },
  "2105": { name: "Jakov Grujić" },

  // --- KONTRA FC PLAYERS ---
  "11676": { name: "Kosta Kontić" },
  "31262": { name: "Filip Kontić" },
  "6248": { name: "Ignjat Petrović" },
  "35624": { name: "Damjan Đorđević" },
  "17573": { name: "Andrej Lazić" },
  "19133": { name: "Rastko Kovačić" },
  "28442": { name: "Matej Vuković" },

  // --- DARK KNIGHTS PLAYERS ---
  "836": { name: "Nemanja Vitezović" },
  "11881": { name: "Viktor Mračić" },
  "829": { name: "Vojin Crnović" },
  "661": { name: "Uroš Tamnjanović" },
  "16520": { name: "Gavrilo Vitez" },
  "35423": { name: "Sergej Bošković" },
  "11229": { name: "Arsenije Mač" },
  "19466": { name: "Strahinja Štit" },

  // --- KMF PIRLI REAL SQUAD & NEW ENTRANTS ---
  "rudic": { name: "Pavle Rudić", number: 1 },
  "vukovic": { name: "Andrej Vuković", number: 2 },
  "papovic": { name: "Marko Papović", number: 3 },
  "majdevac": { name: "Miloš Majdevac", number: 4 },
  "vejinovic": { name: "Marko Vejinović", number: 6 },
  "belopavlovic": { name: "Miodrag Belopavlović", number: 8 },
  "kuzmanovic": { name: "Ivan Kuzmanović", number: 9 },
  "filipovic": { name: "Vladimir Filipović", number: 10 },
  "pomoriski": { name: "Pomoriški" },
  "gataric": { name: "Gatarić" },
  "jovanovic": { name: "Jovanović" },
  "pejakovic": { name: "Pejaković" },
  "ivkovic": { name: "Milan Ivković" },
  "dragic": { name: "Dušan Dragić" },
  "srdjan_vejinovic": { name: "Srđan Vejinović" }
};

export function getPlayerName(id: string): string {
  return playerMapping[id]?.name || `Igrač #${id}`;
}

export function getPlayerNumber(id: string): string {
  const num = playerMapping[id]?.number;
  return num !== undefined ? `#${num}` : '';
}

export const staticMatches: MatchDetails[] = [
  {
    "match": "KORVEX — PIRLI",
    "date": "2026-06-19",
    "score": "3:4",
    "link": "https://minifudbalsrbije.rs/event/korvex-pirli/",
    "teams": {
      "KORVEX": {
        "goals": [
          {"player": "36182", "minutes": ["5'"]},
          {"player": "6173", "minutes": ["12'"]},
          {"player": "3083", "minutes": ["45'"]}
        ],
        "assists": [],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": null,
        "lineup": ["36182", "33626", "6173", "3083", "6406", "20150", "32457"]
      },
      "PIRLI": {
        "goals": [
          {"player": "papovic", "minutes": ["18'"]},
          {"player": "kuzmanovic", "minutes": ["28'"]},
          {"player": "majdevac", "minutes": ["36'", "38'"]}
        ],
        "assists": [
          {"player": "majdevac", "count": 1},
          {"player": "rudic", "count": 1}
        ],
        "yellow_cards": [
          {"player": "majdevac", "minute": "36'"}
        ],
        "red_cards": [],
        "mvp": "majdevac",
        "lineup": ["vukovic", "majdevac", "belopavlovic", "kuzmanovic", "rudic", "papovic", "jovanovic"]
      }
    }
  },
  {
    "match": "CODOLIS — PIRLI",
    "date": "2026-05-20",
    "score": "9:7",
    "link": "https://minifudbalsrbije.rs/event/codolis-pirli-4/",
    "teams": {
      "CODOLIS": {
        "goals": [
          {"player": "1405", "minutes": ["4'", "10'", "22'"]},
          {"player": "1265", "minutes": ["15'", "28'", "33'"]},
          {"player": "1260", "minutes": ["38'", "43'", "47'"]}
        ],
        "assists": [],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": "ivkovic",
        "lineup": ["1405", "1265", "1799", "1418", "1260", "12804"]
      },
      "PIRLI": {
        "goals": [
          {"player": "pomoriski", "minutes": ["2'", "40'"]},
          {"player": "vejinovic", "minutes": ["44'"]},
          {"player": "jovanovic", "minutes": ["49'"]},
          {"player": "majdevac", "minutes": ["12'", "30'"]},
          {"player": "papovic", "minutes": ["31'"]}
        ],
        "assists": [
          {"player": "rudic", "count": 1},
          {"player": "jovanovic", "count": 1}
        ],
        "yellow_cards": [
          {"player": "pejakovic", "minute": "18'"}
        ],
        "red_cards": [],
        "mvp": null,
        "lineup": ["filipovic", "majdevac", "gataric", "pomoriski", "rudic", "vejinovic", "jovanovic", "pejakovic"]
      }
    }
  },
  {
    "match": "FENSERI — PIRLI",
    "date": "2026-02-22",
    "score": "2:2",
    "link": "https://minifudbalsrbije.rs/event/fenseri-pirli/",
    "teams": {
      "FENSERI": {
        "goals": [
          {"player": "986", "minutes": ["5'"]},
          {"player": "32548", "minutes": ["40'"]}
        ],
        "assists": [],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": null,
        "lineup": ["19454", "732", "14173", "35113", "986", "21258", "32548", "29186"]
      },
      "PIRLI": {
        "goals": [
          {"player": "majdevac", "minutes": ["16'"]},
          {"player": "papovic", "minutes": ["24'"]}
        ],
        "assists": [
          {"player": "majdevac", "count": 1}
        ],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": "vejinovic",
        "lineup": ["vukovic", "majdevac", "belopavlovic", "kuzmanovic", "rudic", "papovic", "jovanovic"]
      }
    }
  },
  {
    "match": "GRADITELJ NS — PIRLI",
    "date": "2026-04-29",
    "score": "7:8",
    "teams": {
      "GRADITELJ NS": {
        "goals": [
          {"player": "3065", "minutes": ["18'"]},
          {"player": "3064", "minutes": ["30'"]},
          {"player": "3308", "minutes": ["49'", "50'"]}
        ],
        "assists": [{"player": "3308", "count": 3}],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": null,
        "lineup": ["3067", "3065", "3566", "3064", "3308", "20098"]
      },
      "PIRLI": {
        "goals": [
          {"player": "32691", "minutes": ["7'", "20'", "29'"]},
          {"player": "2989", "minutes": ["12'", "35'"]},
          {"player": "2987", "minutes": ["38'"]},
          {"player": "6940", "minutes": ["45'"]}
        ],
        "assists": [
          {"player": "2987", "count": 2},
          {"player": "2989", "count": 1}
        ],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": "32691",
        "lineup": ["32691", "16595", "2989", "3507", "2987", "2082", "6940"]
      }
    }
  },
  {
    "match": "BLACK STAR — PIRLI",
    "date": "2026-04-21",
    "score": "10:5",
    "teams": {
      "BLACK STAR": {
        "goals": [
          {"player": "779", "minutes": ["31'", "49'"]},
          {"player": "32430", "minutes": ["38'"]},
          {"player": "34688", "minutes": ["10'", "36'", "44'", "50'"]},
          {"player": "1393", "minutes": ["12'"]}
        ],
        "assists": [
          {"player": "778", "count": 1},
          {"player": "779", "count": 1},
          {"player": "32430", "count": 1},
          {"player": "1393", "count": 2}
        ],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": "34688",
        "lineup": ["778", "779", "32430", "34688", "1393", "21092", "1394"]
      },
      "PIRLI": {
        "goals": [
          {"player": "32691", "minutes": ["24'"]},
          {"player": "2989", "minutes": ["28'"]},
          {"player": "3507", "minutes": ["35'"]},
          {"player": "2987", "minutes": ["41'"]},
          {"player": "6940", "minutes": ["48'"]}
        ],
        "assists": [
          {"player": "2987", "count": 2},
          {"player": "2989", "count": 1}
        ],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": null,
        "lineup": ["32691", "7987", "3545", "3507", "2987", "3218", "3220"]
      }
    }
  },
  {
    "match": "PIRLI — MILENIJUM",
    "date": "2026-03-29",
    "score": "1:5",
    "teams": {
      "PIRLI": {
        "goals": [{"player": "3507", "minutes": ["39'"]}],
        "assists": [],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": null,
        "lineup": ["16595", "23527", "2989", "2983", "2986", "3507", "2987", "6940"]
      },
      "MILENIJUM": {
        "goals": [
          {"player": "749", "minutes": ["9'", "15'", "48'"]},
          {"player": "748", "minutes": ["24'"]},
          {"player": "756", "minutes": ["34'"]}
        ],
        "assists": [
          {"player": "749", "count": 2},
          {"player": "748", "count": 1}
        ],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": "749",
        "lineup": ["749", "748", "974", "756", "755", "752", "754", "753"]
      }
    }
  },
  {
    "match": "PIRLI — BRKE",
    "date": "2026-03-24",
    "score": "5:7",
    "teams": {
      "PIRLI": {
        "goals": [
          {"player": "2989", "minutes": ["7'", "30'"]},
          {"player": "2987", "minutes": ["33'"]},
          {"player": "6940", "minutes": ["40'"]},
          {"player": "3507", "minutes": ["49'"]}
        ],
        "assists": [
          {"player": "2989", "count": 1},
          {"player": "2987", "count": 3}
        ],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": null,
        "lineup": ["32691", "2989", "2986", "3507", "2987", "6940"]
      },
      "BRKE": {
        "goals": [
          {"player": "1800", "minutes": ["4'", "16'", "25'", "44'"]},
          {"player": "1938", "minutes": ["18'"]},
          {"player": "2852", "minutes": ["22'", "38'"]}
        ],
        "assists": [
          {"player": "1800", "count": 2},
          {"player": "1938", "count": 1}
        ],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": "1800",
        "lineup": ["1800", "1938", "2852", "3889", "3943", "22987", "35114"]
      }
    }
  },
  {
    "match": "PRILI — BURAZERI",
    "date": "2026-03-19",
    "score": "4:4 (penali 2-3)",
    "teams": {
      "PRILI": {
        "goals": [
          {"player": "16595", "minutes": ["2'"]},
          {"player": "23527", "minutes": ["45'"]},
          {"player": "2989", "minutes": ["28'"]},
          {"player": "2986", "minutes": ["25'"]}
        ],
        "assists": [{"player": "3507", "count": 2}],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": null,
        "lineup": ["16595", "23527", "2989", "2986", "3507", "2987", "2082"]
      },
      "BURAZERI": {
        "goals": [
          {"player": "720", "minutes": ["12'", "44'"]},
          {"player": "1016", "minutes": ["18'"]},
          {"player": "1018", "minutes": ["30'"]}
        ],
        "assists": [
          {"player": "720", "count": 1},
          {"player": "1016", "count": 1}
        ],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": null,
        "lineup": ["720", "1016", "1018", "1134", "2038", "4692", "5988", "2105"]
      }
    }
  },
  {
    "match": "PIRLI — KONTRA FC",
    "date": "2026-03-10",
    "score": "5:6",
    "link": "https://minifudbalsrbije.rs/event/pirli-kontra-fc-2/",
    "teams": {
      "PIRLI": {
        "goals": [
          {"player": "jovanovic", "minutes": ["23'", "27'"]},
          {"player": "papovic", "minutes": ["30'", "44'"]},
          {"player": "pomoriski", "minutes": ["46'"]}
        ],
        "assists": [
          {"player": "jovanovic", "count": 1},
          {"player": "rudic", "count": 1},
          {"player": "papovic", "count": 1}
        ],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": null,
        "lineup": ["filipovic", "majdevac", "gataric", "pomoriski", "rudic", "vejinovic", "jovanovic"]
      },
      "KONTRA FC": {
        "goals": [
          {"player": "11676", "minutes": ["10'", "14'", "35'"]},
          {"player": "31262", "minutes": ["18'", "42'", "48'"]}
        ],
        "assists": [],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": "dragic",
        "lineup": ["11676", "31262", "6248", "35624", "17573", "19133", "28442"]
      }
    }
  },
  {
    "match": "DARK KNIGHTS — PIRLI",
    "date": "2026-03-01",
    "score": "6:1",
    "teams": {
      "DARK KNIGHTS": {
        "goals": [
          {"player": "836", "minutes": ["20'", "41'", "45'"]},
          {"player": "11881", "minutes": ["30'"]}
        ],
        "assists": [
          {"player": "829", "count": 2},
          {"player": "11881", "count": 1}
        ],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": "836",
        "lineup": ["829", "661", "836", "16520", "11881", "35423", "11229", "19466"]
      },
      "PIRLI": {
        "goals": [{"player": "3507", "minutes": ["49'"]}],
        "assists": [],
        "yellow_cards": [],
        "red_cards": [],
        "mvp": null,
        "lineup": ["3792", "3545", "2986", "3507", "2987", "2082", "6940"]
      }
    }
  }
];
