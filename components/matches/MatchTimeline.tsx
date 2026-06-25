"use client";

import React from "react";

interface TimelineEvent {
  type: "goal" | "yellow_card" | "red_card";
  minute: string;
  playerName: string;
  team: "home" | "away";
  assistantName: string | null;
}

interface MatchTimelineProps {
  events: TimelineEvent[];
  homeTeam: string;
  awayTeam: string;
  isPirliHome: boolean;
}

export function MatchTimeline({
  events,
  homeTeam,
  awayTeam,
  isPirliHome,
}: MatchTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="text-center text-slate-500 text-sm py-6">
        Nema registrovanih događaja na ovoj utakmici.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] border-b border-slate-800 pb-1 flex items-center gap-1.5">
        <span className="text-xs">⏱️</span> TOK UTAKMICE
      </h4>

      <div className="relative pl-6 border-l-2 border-slate-700/60 space-y-4 py-1">
        {events.map((ev, idx) => {
          const isGoal = ev.type === "goal";
          const isYellow = ev.type === "yellow_card";
          const isRed = ev.type === "red_card";

          // Boje za različite tipove
          let dotColor = "bg-blue-500";
          let borderColor = "border-blue-500/30";
          let textColor = "text-white";

          if (isGoal) {
            dotColor = ev.team === "home" ? "bg-emerald-500" : "bg-rose-500";
            borderColor =
              ev.team === "home"
                ? "border-emerald-500/30"
                : "border-rose-500/30";
          } else if (isYellow) {
            dotColor = "bg-yellow-400";
            borderColor = "border-yellow-400/30";
            textColor = "text-yellow-400";
          } else if (isRed) {
            dotColor = "bg-red-600";
            borderColor = "border-red-600/30";
            textColor = "text-red-500";
          }

          // Ikona
          let icon = "";
          if (isGoal) icon = "⚽";
          else if (isYellow) icon = "🟨";
          else if (isRed) icon = "🟥";

          return (
            <div key={idx} className="relative flex items-start gap-4 group">
              {/* Vertikalna linija između događaja (već je od parenta) */}

              {/* Tačka na liniji */}
              <div
                className={`absolute left-[-1.65rem] top-1.5 w-3 h-3 rounded-full ${dotColor} border-2 border-slate-800 shadow-md z-10`}
              />

              {/* Sadržaj događaja */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 bg-[#1e293b]/20 rounded-lg px-3 py-2 border border-slate-800/50 hover:bg-[#1e293b]/40 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-base shrink-0">{icon}</span>
                  <div>
                    <span className="font-bold text-sm text-white block leading-tight">
                      {ev.playerName}
                    </span>
                    {isGoal && ev.assistantName && (
                      <span className="text-[11px] text-slate-400 font-medium block">
                        Asistencija: {ev.assistantName}
                      </span>
                    )}
                    {isYellow && (
                      <span className="text-[11px] text-yellow-400 font-medium">
                        Žuti karton
                      </span>
                    )}
                    {isRed && (
                      <span className="text-[11px] text-red-400 font-medium">
                        Crveni karton
                      </span>
                    )}
                  </div>
                </div>

                {/* Minut sa desne strane */}
                <div className="shrink-0 font-mono font-bold text-sm text-yellow-400 bg-[#0B1220] px-2 py-0.5 rounded border border-slate-800">
                  {ev.minute}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
