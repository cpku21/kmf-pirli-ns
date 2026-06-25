import React from "react";
import { ResultBadge } from "@/components/UI/Badge";

interface StatsOverviewProps {
  season?: any;
  pirliStanding?: any;
}

export default function StatsOverview({
  season,
  pirliStanding,
}: StatsOverviewProps) {
  const seasonName = season?.name || "30. SEZONA NOVI SAD";
  const played = season?.stats?.played !== undefined ? season.stats.played : 14;
  const wins = season?.stats?.wins !== undefined ? season.stats.wins : 8;
  const draws = season?.stats?.draws !== undefined ? season.stats.draws : 0;
  const losses = season?.stats?.losses !== undefined ? season.stats.losses : 6;
  const goalsFor =
    season?.stats?.goalsFor !== undefined ? season.stats.goalsFor : 58;
  const goalsAgainst =
    season?.stats?.goalsAgainst !== undefined ? season.stats.goalsAgainst : 62;
  const points = season?.stats?.points !== undefined ? season.stats.points : 24;
  const position = pirliStanding?.position || season?.finalPosition || 7;
  const form = pirliStanding?.form || ["L", "L", "W", "W", "L"];

  return (
    <div id="home-stats-overview" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-white uppercase tracking-tight">
          Tekuća Sezona • <span className="text-blue-500">{seasonName}</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Matches and Wins */}
        <div className="bg-[#1F2937] border border-slate-705 border-slate-700 rounded-xl p-5 flex flex-col justify-between space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Odigrano / Pobede
          </span>
          <div>
            <span className="text-3xl font-black text-white font-mono">
              {played}
            </span>
            <span className="text-xs text-slate-500 font-medium block mt-0.5">
              <strong className="text-green-500 font-mono font-bold">
                {wins}
              </strong>{" "}
              Pobeda,{" "}
              <strong className="text-yellow-500 font-mono font-bold">
                {draws}
              </strong>{" "}
              Nerešenih
            </span>
          </div>
        </div>

        {/* Card 2: Losses and Form */}
        <div className="bg-[#1F2937] border border-slate-705 border-slate-700 rounded-xl p-5 flex flex-col justify-between space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Porazi & Forma
          </span>
          <div>
            <span className="text-3xl font-black text-rose-500 font-mono">
              {losses}
            </span>
            <div className="flex items-center space-x-1 mt-1">
              {form.slice(0, 5).map((badge: string, fIdx: number) => (
                <ResultBadge
                  key={fIdx}
                  result={badge}
                  className="w-5 h-5 text-[9px]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Goals ratio */}
        <div className="bg-[#1F2937] border border-slate-705 border-slate-700 rounded-xl p-5 flex flex-col justify-between space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Postignuti / Primljeni
          </span>
          <div>
            <span className="text-3xl font-black text-white font-mono">
              {goalsFor}:{goalsAgainst}
            </span>
            <span className="text-xs text-slate-500 font-medium block mt-0.5">
              Gol-razlika:{" "}
              <span
                className={
                  goalsFor - goalsAgainst >= 0
                    ? "text-emerald-500 font-bold font-mono"
                    : "text-rose-500 font-bold font-mono"
                }
              >
                {goalsFor - goalsAgainst > 0
                  ? `+${goalsFor - goalsAgainst}`
                  : goalsFor - goalsAgainst}
              </span>
            </span>
          </div>
        </div>

        {/* Card 4: Position and Points */}
        <div className="bg-[#1F2937] border border-slate-705 border-slate-700 rounded-xl p-5 flex flex-col justify-between space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Bodovi & Pozicija
          </span>
          <div>
            <span className="text-3xl font-black text-blue-400 font-mono">
              {points} <span className="text-lg text-slate-400">bod</span>
            </span>
            <span className="text-xs text-slate-500 font-medium block mt-0.5">
              Pozicija:{" "}
              <strong className="text-white font-mono">
                {position}. mesto
              </strong>{" "}
              / 16
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
