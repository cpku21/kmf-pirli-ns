export interface IPlayer {
  _id: string;
  name: string;
  slug: string;
  number: number;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  bio: string;
  photo: string;
  birthYear?: number;
  joinedYear?: number;
  isActive: boolean;
  stats: {
    appearances: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
  };
  achievements: string[];
  createdAt: string;
}

export interface IMatch {
  _id: string;
  date: string;
  opponent: string;
  isHome: boolean;
  competition: string;
  season: string;
  venue: string;
  pirliScore: number | null;
  opponentScore: number | null;
  result: 'W' | 'D' | 'L' | null;
  goalscorers: Array<{
    player: string;
    playerName: string;
    minute: number;
    isOwnGoal: boolean;
  }>;
  notes?: string;
  gallery: string[];
  createdAt: string;
}

export interface ISeason {
  _id: string;
  name: string;
  year: number;
  competition: string;
  isActive: boolean;
  finalPosition?: number;
  stats: {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
  };
}

export interface IStanding {
  _id: string;
  season: string;
  position: number;
  team: string;
  isPirli: boolean;
  logo?: string;
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

export interface IGallery {
  _id: string;
  url: string;
  caption?: string;
  category: 'matches' | 'training' | 'celebrations' | 'team';
  uploadedAt: string;
}

export interface IClubHistory {
  _id: string;
  year: number;
  title: string;
  description: string;
  type: 'founding' | 'achievement' | 'milestone' | 'season' | 'other';
  image?: string;
  order: number;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}
