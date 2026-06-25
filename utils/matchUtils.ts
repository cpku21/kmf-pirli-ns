import { Match } from '@/data/matches';

export interface FormattedMatch {
  id: string;
  opponent: string;
  isHome: boolean;
  date: string;
  competition: string;
  venue: string;
  pirliScore: number | null;
  opponentScore: number | null;
  result: 'W' | 'D' | 'L' | null;
  goalscorers: { playerName: string; minute: number; isOwnGoal: boolean }[];
  notes?: string;
}

export function formatMatchDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('sr-RS', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getResultBadgeType(match: FormattedMatch | Match): 'win' | 'loss' | 'draw' | 'future' {
  if (match.pirliScore === null || match.opponentScore === null) return 'future';
  if (match.result === 'D') return 'draw';
  return match.result === 'W' ? 'win' : 'loss';
}

export function getResultLabel(type: 'win' | 'loss' | 'draw' | 'future'): string {
  const map = {
    win: 'POBEDA',
    loss: 'PORAZ',
    draw: 'NEREŠENO',
    future: 'USKORO',
  };
  return map[type];
}

export function getResultColor(type: 'win' | 'loss' | 'draw' | 'future'): string {
  const map = {
    win: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    loss: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    draw: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    future: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };
  return map[type];
}

export function getResultEmoji(type: 'win' | 'loss' | 'draw' | 'future'): string {
  const map = {
    win: '✅',
    loss: '❌',
    draw: '➖',
    future: '⏳',
  };
  return map[type];
}

export function getTeamNames(match: FormattedMatch | Match): { home: string; away: string } {
  const home = match.isHome ? 'PIRLI' : match.opponent;
  const away = match.isHome ? match.opponent : 'PIRLI';
  return { home, away };
}