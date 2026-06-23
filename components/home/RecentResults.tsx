import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ResultBadge } from '@/components/UI/Badge.tsx';

interface MatchRow {
  opponent: string;
  isHome: boolean;
  pirliScore: number | null;
  opponentScore: number | null;
  result: 'W' | 'D' | 'L' | null;
  date: string | Date;
}

interface RecentResultsProps {
  matches?: MatchRow[];
}

export default function RecentResults({ matches }: RecentResultsProps) {
  // If undefined or empty, fallback to the default mock data requested by the user
  const defaultMatches: MatchRow[] = [
    { opponent: 'KORVEX', pirliScore: 3, opponentScore: 8, result: 'L', date: '2026-06-19', isHome: false },
    { opponent: 'CODOLIS', pirliScore: 5, opponentScore: 3, result: 'W', date: '2026-05-20', isHome: false },
    { opponent: 'GRADITELJ NS', pirliScore: 8, opponentScore: 7, result: 'W', date: '2026-04-29', isHome: false },
    { opponent: 'BLACK STAR', pirliScore: 5, opponentScore: 10, result: 'L', date: '2026-04-21', isHome: false },
    { opponent: 'MILENIJUM', pirliScore: 1, opponentScore: 5, result: 'L', date: '2026-03-29', isHome: true },
  ];

  const list = matches && matches.length > 0 ? matches.slice(0, 5) : defaultMatches;

  const formatDateString = (dateStr: string | Date) => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div id="home-recent-results" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-white uppercase tracking-tight">
          Poslednji Rezultati
        </h2>
        <Link href="/matches" className="text-xs text-blue-400 font-bold hover:underline flex items-center gap-0.5">
          Sve utakmice <ChevronRight size={14} />
        </Link>
      </div>

      <div className="bg-[#1F2937] rounded-xl border border-slate-705 border-slate-700/60 overflow-hidden shadow-sm divide-y divide-slate-800">
        {list.map((match, idx) => {
          const dateFormatted = formatDateString(match.date);
          const pirliLabel = <span className="text-blue-400 font-extrabold text-xs">PIRLI</span>;
          const opponentLabel = <span className="text-slate-300 font-bold text-xs">{match.opponent}</span>;

          const homeTeam = match.isHome ? pirliLabel : opponentLabel;
          const awayTeam = match.isHome ? opponentLabel : pirliLabel;

          const homeScore = match.isHome ? match.pirliScore : match.opponentScore;
          const awayScore = match.isHome ? match.opponentScore : match.pirliScore;

          const scoreString = homeScore !== null && awayScore !== null ? `${homeScore} - ${awayScore}` : 'v';

          return (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-[#1F2937] hover:bg-[#374151] transition-all duration-150"
            >
              {/* Date */}
              <div className="text-[10px] text-slate-500 font-mono font-bold shrink-0">
                {dateFormatted}
              </div>

              {/* Matchup & Score */}
              <div className="flex-1 px-4 flex items-center justify-between min-w-0">
                <div className="flex-1 text-right truncate pr-2">
                  {homeTeam}
                </div>
                <div className="px-3 py-1 bg-[#111827]/40 rounded-lg text-white font-mono font-black text-sm tracking-tighter whitespace-nowrap">
                  {scoreString}
                </div>
                <div className="flex-1 text-left truncate pl-2">
                  {awayTeam}
                </div>
              </div>

              {/* Result Badge */}
              <div className="shrink-0 flex items-center justify-end w-8">
                {match.result ? (
                  <ResultBadge result={match.result} />
                ) : (
                  <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">N/A</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
