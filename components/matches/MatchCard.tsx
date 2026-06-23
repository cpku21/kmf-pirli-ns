import React from 'react';
import { IMatchDocument } from '@/lib/model/Match.tsx';
import { Calendar, MapPin, Map } from 'lucide-react';

interface MatchCardProps {
  key?: any;
  match: {
    _id: string;
    opponent: string;
    isHome: boolean;
    date: string | Date;
    venue: string;
    pirliScore: number | null;
    opponentScore: number | null;
    result: 'W' | 'D' | 'L' | null;
    competition?: string;
  };
}

export default function MatchCard({ match }: MatchCardProps) {
  const d = new Date(match.date);
  const dateFormatted = d.toLocaleDateString('sr-RS', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const timeFormatted = d.toLocaleTimeString('sr-RS', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const isPlayed = match.pirliScore !== null && match.opponentScore !== null;

  // Setup Home / Away labels
  const homeName = match.isHome ? 'KMF PIRLI' : match.opponent;
  const awayName = match.isHome ? match.opponent : 'KMF PIRLI';

  // Setup Home / Away scores
  const homeScore = match.isHome ? match.pirliScore : match.opponentScore;
  const awayScore = match.isHome ? match.opponentScore : match.pirliScore;

  // Let's style names
  const renderTeamName = (name: string) => {
    if (name === 'KMF PIRLI') {
      return <span className="font-extrabold text-blue-400">PIRLI</span>;
    }
    return <span className="text-slate-300 font-bold truncate">{name}</span>;
  };

  // Result styling
  const getResultBadge = () => {
    if (!match.result) return null;
    switch (match.result.toUpperCase()) {
      case 'W':
        return <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] font-black uppercase px-2 py-0.5 rounded font-mono">Pobeda</span>;
      case 'D':
        return <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[9px] font-black uppercase px-2 py-0.5 rounded font-mono font-mono">Nerešeno</span>;
      case 'L':
        return <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-black uppercase px-2 py-0.5 rounded font-mono">Poraz</span>;
      default:
        return null;
    }
  };

  return (
    <div
      id={`match-row-${match._id}`}
      className="p-4 bg-[#1F2937] hover:bg-[#374151] transition-all duration-150 rounded-xl border border-slate-700/60 flex flex-col space-y-2.5"
    >
      {/* Top Meta Details Container */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold tracking-tight">
        <span className="flex items-center gap-1 font-mono">
          <Calendar size={11} className="text-slate-500" />
          {dateFormatted} u {timeFormatted}h
        </span>
        <span className="text-[9px] text-slate-550 text-slate-500 uppercase tracking-widest bg-slate-800 px-1.5 py-0.5 rounded">
          {match.competition || 'II LIGA NOVI SAD'}
        </span>
      </div>

      {/* Scorers / Matchup Arena */}
      <div className="grid grid-cols-12 items-center gap-2 pt-1">
        {/* Home Team */}
        <div className="col-span-5 text-right font-extrabold truncate pr-1">
          {renderTeamName(homeName)}
        </div>

        {/* Score Column */}
        <div className="col-span-2 flex flex-col items-center justify-center">
          {isPlayed ? (
            <div className="bg-[#111827] text-white px-2.5 py-1 rounded-lg text-sm font-black font-mono tracking-tight shadow-inner">
              {homeScore} : {awayScore}
            </div>
          ) : (
            <span className="bg-blue-600/15 text-blue-400 border border-blue-500/20 text-[8px] font-extrabold px-1.5 py-1 rounded uppercase tracking-wider font-sans text-center shrink-0">
              ZAKAZANO
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="col-span-5 text-left font-extrabold truncate pl-1">
          {renderTeamName(awayName)}
        </div>
      </div>

      {/* Location Row / result display */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px] text-slate-450 text-slate-400">
        <span className="flex items-center gap-1 font-mono truncate max-w-[70%]">
          <MapPin size={11} className="text-blue-500 shrink-0" />
          {match.venue}
        </span>
        <div className="shrink-0">
          {isPlayed ? getResultBadge() : (
            <span className="text-[9px] text-slate-500 bg-slate-800 px-1.5 rounded font-mono">Predstojeće</span>
          )}
        </div>
      </div>
    </div>
  );
}
