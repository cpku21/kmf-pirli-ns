"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Trophy, Medal } from "lucide-react";
import { standings } from "@/data/standings";
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
  form: string[] | string;
}

interface StandingsTableProps {
  standings?: StandingRow[];
}

type SortKey =
  | "position"
  | "team"
  | "played"
  | "wins"
  | "draws"
  | "losses"
  | "goalsFor"
  | "goalsAgainst"
  | "goalDifference"
  | "points";

export default function StandingsTable({
  standings: propStandings,
}: StandingsTableProps) {
  const rows =
    propStandings && propStandings.length > 0 ? propStandings : standings;
  const [sortKey, setSortKey] = useState<SortKey>("position");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  if (!rows || rows.length === 0) {
    return (
      <div className="bg-[#1F2937] rounded-xl border border-slate-700/60 p-8 text-center">
        <p className="text-slate-400">Nema podataka za tabelu.</p>
      </div>
    );
  }

  const sortedRows = [...rows].sort((a, b) => {
    let aVal = a[sortKey];
    let bVal = b[sortKey];
    if (sortKey === "team") {
      aVal = a.team.toLowerCase();
      bVal = b.team.toLowerCase();
    }
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    return 0;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column)
      return <ChevronDown size={12} className="opacity-30" />;
    return sortDirection === "asc" ? (
      <ChevronUp size={12} />
    ) : (
      <ChevronDown size={12} />
    );
  };

  const getFormDots = (form: string[] | string) => {
    const formArray = typeof form === "string" ? form.split("") : form;
    if (!formArray || formArray.length === 0) return null;
    const colors: Record<string, string> = {
      W: "bg-emerald-500",
      D: "bg-yellow-500",
      L: "bg-red-500",
    };
    return (
      <div className="flex gap-1">
        {formArray.slice(0, 5).map((letter, idx) => (
          <div
            key={idx}
            className={cn(
              "w-2.5 h-2.5 rounded-full",
              colors[letter] || "bg-slate-600",
            )}
            title={
              letter === "W" ? "Pobeda" : letter === "D" ? "Nerešeno" : "Poraz"
            }
          />
        ))}
      </div>
    );
  };

  const getPositionIcon = (position: number) => {
    if (position === 1) return <Trophy size={14} className="text-yellow-400" />;
    if (position === 2) return <Medal size={14} className="text-slate-300" />;
    if (position === 3) return <Medal size={14} className="text-amber-600" />;
    return <span className="text-xs font-mono text-slate-500">{position}</span>;
  };

  return (
    <div className="bg-[#1F2937] rounded-xl border border-slate-700/60 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-[#111827] text-[10px] text-slate-400 font-extrabold uppercase border-b border-slate-800 font-mono">
              {/* 🔥 FIKSNE KOLONE - POZICIJA I KLUB */}
              <th className="sticky left-0 z-20 bg-[#111827] px-3 py-3 text-center w-12 min-w-[44px]">
                <button
                  onClick={() => handleSort("position")}
                  className="flex items-center justify-center gap-1 w-full hover:text-white transition-colors"
                >
                  Poz <SortIcon column="position" />
                </button>
              </th>
              <th className="sticky left-[44px] z-20 bg-[#111827] px-3 py-3 text-left min-w-[120px]">
                <button
                  onClick={() => handleSort("team")}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  Klub <SortIcon column="team" />
                </button>
              </th>
              {/* OSTALE KOLONE - SKROLUJU SE */}
              <th className="px-2 py-3 text-center w-12 min-w-[40px]">
                <button
                  onClick={() => handleSort("played")}
                  className="flex items-center justify-center gap-1 w-full hover:text-white transition-colors"
                >
                  OU <SortIcon column="played" />
                </button>
              </th>
              <th className="px-2 py-3 text-center w-10 min-w-[32px]">
                <button
                  onClick={() => handleSort("wins")}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  P
                </button>
              </th>
              <th className="px-2 py-3 text-center w-10 min-w-[32px]">
                <button
                  onClick={() => handleSort("draws")}
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  N
                </button>
              </th>
              <th className="px-2 py-3 text-center w-10 min-w-[32px]">
                <button
                  onClick={() => handleSort("losses")}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  I
                </button>
              </th>
              <th className="px-2 py-3 text-center w-12 min-w-[40px]">
                <button
                  onClick={() => handleSort("goalsFor")}
                  className="hover:text-white transition-colors"
                >
                  G+
                </button>
              </th>
              <th className="px-2 py-3 text-center w-12 min-w-[40px]">
                <button
                  onClick={() => handleSort("goalsAgainst")}
                  className="hover:text-white transition-colors"
                >
                  G-
                </button>
              </th>
              <th className="px-2 py-3 text-center w-12 min-w-[40px]">
                <button
                  onClick={() => handleSort("goalDifference")}
                  className="hover:text-white transition-colors"
                >
                  GR
                </button>
              </th>
              <th className="px-3 py-3 text-center w-14 min-w-[44px]">
                <button
                  onClick={() => handleSort("points")}
                  className="text-blue-400 hover:text-blue-300 transition-colors font-black"
                >
                  BOD
                </button>
              </th>
              <th className="px-3 py-3 text-center w-28 min-w-[100px]">
                <span className="text-slate-500">FORMA</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {sortedRows.map((row) => (
              <tr
                key={row.position}
                className={cn(
                  "transition-colors",
                  row.isPirli
                    ? "bg-blue-600/10 border-l-4 border-blue-500 text-white font-bold"
                    : "hover:bg-slate-800/15 border-l-4 border-transparent",
                )}
              >
                {/* 🔥 FIKSNE KOLONE */}
                <td className="sticky left-0 z-10 bg-[#1F2937] px-3 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {getPositionIcon(row.position)}
                  </div>
                </td>
                <td className="sticky left-[44px] z-10 bg-[#1F2937] px-3 py-3 font-bold truncate max-w-[140px]">
                  {row.isPirli ? (
                    <span className="text-blue-400">KMF PIRLI</span>
                  ) : (
                    <span className="text-white">{row.team}</span>
                  )}
                </td>
                {/* OSTALE KOLONE */}
                <td className="px-2 py-3 text-center font-mono text-slate-300">
                  {row.played}
                </td>
                <td className="px-2 py-3 text-center font-mono text-emerald-400">
                  {row.wins}
                </td>
                <td className="px-2 py-3 text-center font-mono text-yellow-400">
                  {row.draws}
                </td>
                <td className="px-2 py-3 text-center font-mono text-red-400">
                  {row.losses}
                </td>
                <td className="px-2 py-3 text-center font-mono text-slate-300">
                  {row.goalsFor}
                </td>
                <td className="px-2 py-3 text-center font-mono text-slate-300">
                  {row.goalsAgainst}
                </td>
                <td
                  className={cn(
                    "px-2 py-3 text-center font-mono font-bold",
                    row.goalDifference > 0
                      ? "text-emerald-400"
                      : row.goalDifference < 0
                        ? "text-red-400"
                        : "text-slate-500",
                  )}
                >
                  {row.goalDifference > 0
                    ? `+${row.goalDifference}`
                    : row.goalDifference}
                </td>
                <td className="px-3 py-3 text-center font-mono font-black text-blue-400">
                  {row.points}
                </td>
                <td className="px-3 py-3">{getFormDots(row.form)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
