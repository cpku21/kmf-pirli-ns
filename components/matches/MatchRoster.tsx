"use client";

import { getPlayerName, getPlayerNumber } from "@/utils/playerUtils";
import React from "react";

interface MatchRosterProps {
  teamName: string;
  lineup: string[];
  goals: Record<string, number>;
  assists: Record<string, number>;
  yellows: string[];
  reds: string[];
  mvp: string | null;
  isPirli: boolean;
  opponentMode?: boolean;
}

export function MatchRoster({
  teamName,
  lineup,
  goals,
  assists,
  yellows,
  reds,
  mvp,
  isPirli,
  opponentMode = false,
}: MatchRosterProps) {
  if (opponentMode) {
    return (
      <div className="bg-[#1e293b]/5 rounded-xl border border-slate-800/80 p-3 space-y-1">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-1">
          <h5 className="text-[10px] font-black uppercase font-mono text-slate-400 tracking-wider">
            🛡️ {teamName} SASTAV
          </h5>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
          {lineup.map((pId) => {
            const goalsCount = goals[pId] || 0;
            const hasYellow = yellows.includes(pId);
            const hasRed = reds.includes(pId);

            return (
              <div
                key={pId}
                className="flex items-center justify-between py-1 border-b border-slate-800/10 text-slate-400"
              >
                <span className="truncate text-slate-400 font-medium">
                  {getPlayerName(pId)}
                </span>

                <div className="flex items-center gap-1 shrink-0 scale-90">
                  {goalsCount > 0 && (
                    <span className="text-[8px] font-bold text-slate-300">
                      ⚽ x{goalsCount}
                    </span>
                  )}
                  {hasYellow && (
                    <span className="w-2 h-3 bg-yellow-400 rounded-xs shadow" />
                  )}
                  {hasRed && (
                    <span className="w-2 h-3 bg-rose-500 rounded-xs shadow" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e293b]/15 rounded-xl border border-slate-800 p-3.5 space-y-2.5">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-1.5">
        <h5 className="text-[10px] font-black uppercase font-mono text-blue-400 tracking-wider">
          👕 {teamName} SASTAV & STATS
        </h5>
        <span className="text-[8px] bg-blue-500/10 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/20 font-bold font-mono">
          Golovi, Asistencije (A), Kartoni
        </span>
      </div>

      <div className="space-y-2">
        {lineup.map((pId) => {
          const goalsCount = goals[pId] || 0;
          const assistsCount = assists[pId] || 0;
          const hasYellow = yellows.includes(pId);
          const hasRed = reds.includes(pId);

          return (
            <div
              key={pId}
              className="flex items-center justify-between py-1 border-b border-slate-800/20 text-[11px] font-bold text-slate-200"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[9px] bg-[#0c1322] border border-slate-800 font-mono rounded text-slate-400 w-5 h-5 flex items-center justify-center font-black shrink-0 shadow-sm">
                  {getPlayerNumber(pId) || "•"}
                </span>
                <span className="truncate text-slate-100 font-semibold text-xs">
                  {getPlayerName(pId)}
                </span>
                {mvp === pId && (
                  <span className="shrink-0 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[8px] px-1 py-0.2 rounded font-mono font-black uppercase tracking-tight scale-90">
                    MVP
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0 scale-95 origin-right">
                {goalsCount > 0 && (
                  <span
                    className="flex items-center gap-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-black text-[9px] shrink-0"
                    title={`${goalsCount} gol(a)`}
                  >
                    ⚽{" "}
                    <span className="text-[8px] font-mono font-black text-emerald-400 ml-0.5">
                      x{goalsCount}
                    </span>
                  </span>
                )}

                {assistsCount > 0 && (
                  <span
                    className="flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-black text-[9px] shrink-0"
                    title={`${assistsCount} asistencija`}
                  >
                    <span className="text-[8px] text-blue-300 font-black font-mono">
                      A
                    </span>
                    <span className="text-[8px] font-mono font-black text-blue-400">
                      x{assistsCount}
                    </span>
                  </span>
                )}

                {hasYellow && (
                  <span
                    className="w-2.5 h-3.5 bg-yellow-400 rounded-sm inline-block shrink-0 shadow"
                    title="Žuti karton"
                  />
                )}
                {hasRed && (
                  <span
                    className="w-2.5 h-3.5 bg-rose-500 rounded-sm inline-block shrink-0 shadow"
                    title="Crveni karton"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
