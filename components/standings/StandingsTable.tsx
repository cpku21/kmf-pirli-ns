import React from 'react';
import { ResultBadge } from '@/components/UI/Badge.tsx';
import { cn } from '@/utils/cn.tsx';

interface StandingRow {
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
  form: string[];
}

interface StandingsTableProps {
  standings?: StandingRow[];
}

export default function StandingsTable({ standings }: StandingsTableProps) {
  // Handcrafted default full standings of the league if MongoDB is unseeded. Includes 16 teams.
  const defaultStandings: StandingRow[] = [
    { position: 1, team: 'VITOROG PROMET', isPirli: false, played: 14, wins: 12, draws: 1, losses: 1, goalsFor: 70, goalsAgainst: 30, goalDifference: 40, points: 37, form: ['W', 'W', 'W', 'D', 'W'] },
    { position: 2, team: 'KORVEX', isPirli: false, played: 14, wins: 11, draws: 0, losses: 3, goalsFor: 65, goalsAgainst: 41, goalDifference: 24, points: 33, form: ['W', 'L', 'W', 'W', 'W'] },
    { position: 3, team: 'CODOLIS', isPirli: false, played: 14, wins: 9, draws: 1, losses: 4, goalsFor: 50, goalsAgainst: 38, goalDifference: 12, points: 28, form: ['L', 'W', 'D', 'W', 'W'] },
    { position: 4, team: 'GRADITELJ NS', isPirli: false, played: 14, wins: 9, draws: 0, losses: 5, goalsFor: 61, goalsAgainst: 52, goalDifference: 9, points: 27, form: ['W', 'W', 'L', 'W', 'L'] },
    { position: 5, team: 'MILENIJUM II', isPirli: false, played: 14, wins: 8, draws: 1, losses: 5, goalsFor: 44, goalsAgainst: 40, goalDifference: 4, points: 25, form: ['L', 'W', 'L', 'L', 'W'] },
    { position: 6, team: 'BLACK STAR', isPirli: false, played: 14, wins: 8, draws: 1, losses: 5, goalsFor: 59, goalsAgainst: 59, goalDifference: 0, points: 25, form: ['W', 'W', 'W', 'L', 'L'] },
    { position: 7, team: 'KMF PIRLI', isPirli: true, played: 14, wins: 8, draws: 0, losses: 6, goalsFor: 58, goalsAgainst: 62, goalDifference: -4, points: 24, form: ['L', 'L', 'W', 'W', 'L'] },
    { position: 8, team: 'KABEL NS', isPirli: false, played: 14, wins: 7, draws: 1, losses: 6, goalsFor: 41, goalsAgainst: 38, goalDifference: 3, points: 22, form: ['W', 'D', 'L', 'W', 'W'] },
    { position: 9, team: 'PROLETER', isPirli: false, played: 14, wins: 6, draws: 2, losses: 6, goalsFor: 38, goalsAgainst: 42, goalDifference: -4, points: 20, form: ['L', 'D', 'W', 'L', 'W'] },
    { position: 10, team: 'MERIDIAN', isPirli: false, played: 14, wins: 6, draws: 0, losses: 8, goalsFor: 45, goalsAgainst: 50, goalDifference: -5, points: 18, form: ['W', 'L', 'L', 'W', 'L'] },
    { position: 11, team: 'DETELINARA', isPirli: false, played: 14, wins: 5, draws: 1, losses: 8, goalsFor: 35, goalsAgainst: 42, goalDifference: -7, points: 16, form: ['D', 'L', 'W', 'L', 'L'] },
    { position: 12, team: 'BUDUĆNOST', isPirli: false, played: 14, wins: 4, draws: 2, losses: 8, goalsFor: 30, goalsAgainst: 45, goalDifference: -15, points: 14, form: ['L', 'D', 'L', 'L', 'W'] },
    { position: 13, team: 'FUTOG', isPirli: false, played: 14, wins: 4, draws: 1, losses: 9, goalsFor: 32, goalsAgainst: 47, goalDifference: -15, points: 13, form: ['L', 'W', 'L', 'D', 'L'] },
    { position: 14, team: 'KAĆ', isPirli: false, played: 14, wins: 3, draws: 2, losses: 9, goalsFor: 29, goalsAgainst: 50, goalDifference: -21, points: 11, form: ['D', 'L', 'L', 'W', 'L'] },
    { position: 15, team: 'LIMAN', isPirli: false, played: 14, wins: 2, draws: 1, losses: 11, goalsFor: 25, goalsAgainst: 55, goalDifference: -30, points: 7, form: ['L', 'L', 'W', 'L', 'L'] },
    { position: 16, team: 'SAJLOVO', isPirli: false, played: 14, wins: 1, draws: 2, losses: 11, goalsFor: 20, goalsAgainst: 56, goalDifference: -36, points: 5, form: ['D', 'L', 'L', 'L', 'L'] },
  ];

  const rows = standings && standings.length > 0 ? standings : defaultStandings;

  return (
    <div id="standings-table-wrapper" className="bg-[#1F2937] rounded-xl border border-slate-705 border-slate-700/60 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs text-slate-350 text-slate-300">
          <thead>
            <tr className="bg-[#111827] text-[10px] text-slate-400 font-extrabold tracking-wider uppercase border-b border-slate-800 font-mono">
              <th className="px-3.5 py-3 text-center w-8">Poz</th>
              <th className="px-3.5 py-3">Klub</th>
              <th className="px-2 py-3 text-center w-10">OU</th>
              <th className="px-1.5 py-3 text-center w-8 hidden md:table-cell text-green-500">P</th>
              <th className="px-1.5 py-3 text-center w-8 hidden md:table-cell text-yellow-500 font-bold">N</th>
              <th className="px-1.5 py-3 text-center w-8 hidden md:table-cell text-red-500">I</th>
              <th className="px-2 py-3 text-center w-10 hidden sm:table-cell">G+</th>
              <th className="px-2 py-3 text-center w-10 hidden sm:table-cell">G-</th>
              <th className="px-2 py-3 text-center w-10 hidden sm:table-cell">GR</th>
              <th className="px-3 py-3 text-right w-12 text-blue-400">Bod</th>
              <th className="px-3.5 py-3 text-center w-28">Forma</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {rows.map((row) => (
              <tr
                key={row.position}
                className={cn(
                  "transition-all",
                  row.isPirli
                    ? "bg-blue-600/10 border-l-4 border-blue-500 text-white font-extrabold"
                    : "hover:bg-slate-800/15 border-l-4 border-transparent text-slate-300"
                )}
              >
                {/* Position */}
                <td className="px-3.5 py-3 text-center font-mono font-black text-slate-400">
                  {row.position}.
                </td>

                {/* Team Name */}
                <td className="px-3.5 py-3 font-bold truncate max-w-[120px]">
                  {row.isPirli ? <span className="text-blue-400">KMF PIRLI</span> : row.team}
                </td>

                {/* Played matches */}
                <td className="px-2 py-3 text-center font-mono text-slate-300">
                  {row.played}
                </td>

                {/* Wins, Draws, Losses (MD ONLY) */}
                <td className="px-1.5 py-3 text-center font-mono text-green-500/90 hidden md:table-cell">
                  {row.wins}
                </td>
                <td className="px-1.5 py-3 text-center font-mono text-yellow-500/90 hidden md:table-cell">
                  {row.draws}
                </td>
                <td className="px-1.5 py-3 text-center font-mono text-red-500/90 hidden md:table-cell">
                  {row.losses}
                </td>

                {/* G+, G-, GR (SM ONLY) */}
                <td className="px-2 py-3 text-center font-mono text-slate-500 hidden sm:table-cell">
                  {row.goalsFor}
                </td>
                <td className="px-2 py-3 text-center font-mono text-slate-500 hidden sm:table-cell">
                  {row.goalsAgainst}
                </td>
                <td className={cn(
                  "px-2 py-3 text-center font-mono font-bold hidden sm:table-cell",
                  row.goalDifference > 0 ? "text-emerald-500" : row.goalDifference < 0 ? "text-rose-500" : "text-slate-500"
                )}>
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>

                {/* Points */}
                <td className="px-3 py-3 text-right font-mono font-black text-blue-405 text-blue-400">
                  {row.points}
                </td>

                {/* Form Badge pills */}
                <td className="px-3.5 py-3">
                  <div className="flex items-center justify-center gap-1">
                    {row.form && row.form.length > 0 ? (
                      row.form.slice(0, 5).map((f, fIdx) => (
                        <ResultBadge key={fIdx} result={f} className="w-4.5 h-4.5 text-[9px]" />
                      ))
                    ) : (
                      <span className="text-[10px] text-slate-500 uppercase">-</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
