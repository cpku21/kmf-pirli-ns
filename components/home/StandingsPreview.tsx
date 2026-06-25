import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

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
}

interface StandingsPreviewProps {
  standings?: StandingRow[];
  seasonName?: string;
}

export default function StandingsPreview({
  standings,
  seasonName,
}: StandingsPreviewProps) {
  // Classic default standings matching the requested 30th season stats pattern
  const defaultStandings: StandingRow[] = [
    {
      position: 1,
      team: "VITOROG PROMET",
      isPirli: false,
      played: 14,
      wins: 12,
      draws: 1,
      losses: 1,
      goalsFor: 70,
      goalsAgainst: 30,
      goalDifference: 45,
      points: 37,
    },
    {
      position: 2,
      team: "KORVEX",
      isPirli: false,
      played: 14,
      wins: 11,
      draws: 0,
      losses: 3,
      goalsFor: 65,
      goalsAgainst: 41,
      goalDifference: 24,
      points: 33,
    },
    {
      position: 3,
      team: "CODOLIS",
      isPirli: false,
      played: 14,
      wins: 9,
      draws: 1,
      losses: 4,
      goalsFor: 50,
      goalsAgainst: 38,
      goalDifference: 12,
      points: 28,
    },
    {
      position: 4,
      team: "GRADITELJ NS",
      isPirli: false,
      played: 14,
      wins: 9,
      draws: 0,
      losses: 5,
      goalsFor: 61,
      goalsAgainst: 52,
      goalDifference: 9,
      points: 27,
    },
    {
      position: 7,
      team: "KMF PIRLI",
      isPirli: true,
      played: 14,
      wins: 8,
      draws: 0,
      losses: 6,
      goalsFor: 58,
      goalsAgainst: 62,
      goalDifference: -4,
      points: 24,
    },
  ];

  const rows = standings && standings.length > 0 ? standings : defaultStandings;
  const currentSeasonLabel = seasonName || "30. SEZONA";

  return (
    <div id="home-standings-preview" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-white uppercase tracking-tight">
          Tabela — {currentSeasonLabel}
        </h2>
        <Link
          href="/standings"
          className="text-xs text-blue-400 font-bold hover:underline flex items-center gap-0.5"
        >
          Puna tabela <ChevronRight size={14} />
        </Link>
      </div>

      <div className="bg-[#1F2937] rounded-xl border border-slate-705 border-slate-700/60 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] border-collapse text-left text-xs text-slate-300">
            <thead>
              <tr className="bg-[#111827] text-[10px] text-slate-400 font-extrabold tracking-wider uppercase border-b border-slate-800 font-mono">
                <th className="px-3 py-3 text-center w-10">Poz</th>
                <th className="px-3 py-3">Klub</th>
                <th className="px-3 py-3 text-center w-12">OU</th>
                <th className="px-2 py-3 text-center w-10 text-green-500">P</th>
                <th className="px-2 py-3 text-center w-10 text-yellow-500">
                  N
                </th>
                <th className="px-2 py-3 text-center w-10 text-red-500">I</th>
                <th className="px-3 py-3 text-center w-12">G+</th>
                <th className="px-3 py-3 text-center w-12">G-</th>
                <th className="px-3 py-3 text-center w-12">GR</th>
                <th className="px-3 py-3 text-right w-16 text-blue-400">Bod</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rows.map((row) => (
                <tr
                  key={row.position}
                  className={cn(
                    "transition-all",
                    row.isPirli
                      ? "bg-blue-600/15 border-l-4 border-l-blue-500 text-white font-extrabold"
                      : "hover:bg-slate-800/25 border-l-4 border-l-transparent text-slate-300",
                  )}
                >
                  <td className="px-3 py-2.5 text-center font-mono font-bold text-slate-400">
                    {row.position}
                  </td>
                  <td className="px-3 py-2.5 font-bold truncate">{row.team}</td>
                  <td className="px-3 py-2.5 text-center font-mono">
                    {row.played}
                  </td>
                  <td className="px-2 py-2.5 text-center font-mono">
                    {row.wins}
                  </td>
                  <td className="px-2 py-2.5 text-center font-mono">
                    {row.draws}
                  </td>
                  <td className="px-2 py-2.5 text-center font-mono">
                    {row.losses}
                  </td>
                  <td className="px-3 py-2.5 text-center font-mono text-slate-400">
                    {row.goalsFor}
                  </td>
                  <td className="px-3 py-2.5 text-center font-mono text-slate-400">
                    {row.goalsAgainst}
                  </td>
                  <td
                    className={cn(
                      "px-3 py-2.5 text-center font-mono font-bold",
                      row.goalDifference > 0
                        ? "text-emerald-500"
                        : row.goalDifference < 0
                          ? "text-rose-500"
                          : "text-slate-500",
                    )}
                  >
                    {row.goalDifference > 0
                      ? `+${row.goalDifference}`
                      : row.goalDifference}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono font-extrabold text-blue-400">
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
