"use client";

import React from "react";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { Match } from "@/data/matches";
import {
  formatMatchDate,
  getResultBadgeType,
  getResultLabel,
  getResultColor,
  getResultEmoji,
  getTeamNames,
} from "@/utils/matchUtils";

interface MatchCardProps {
  match: Match;
  onClick: () => void;
}

export function MatchCard({ match, onClick }: MatchCardProps) {
  const isPlayed = match.pirliScore !== null && match.opponentScore !== null;
  const dateStr = formatMatchDate(match.date);
  const badgeType = getResultBadgeType(match);
  const { home, away } = getTeamNames(match);

  return (
    <div
      onClick={onClick}
      className="p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col space-y-3 shadow-md bg-[#1E293B]/45 border-slate-800 cursor-pointer hover:bg-[#334155]/30 hover:border-slate-700"
    >
      {/* Top Row: Date */}
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1 font-mono text-slate-400 font-bold">
          <Calendar size={10} className="text-blue-500" />
          {dateStr}
        </span>
        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest bg-[#0B1220] px-1.5 py-0.5 rounded border border-slate-800/60">
          {match.competition}
        </span>
      </div>

      {/* Middle Row: Matchup */}
      <div className="grid grid-cols-12 items-center gap-1 py-0.5">
        <div className="col-span-5 text-right flex items-center justify-end gap-1.5 min-w-0">
          <span
            className={`text-xs truncate uppercase font-extrabold ${
              match.isHome ? "text-blue-400 font-black" : "text-slate-300"
            }`}
          >
            {home}
          </span>
          {match.isHome && (
            <div className="w-5 h-5 bg-[#0B1220] rounded-full flex items-center justify-center p-0.5 shadow-inner">
              <Image
                src="https://minifudbalsrbije.rs/wp-content/uploads/2023/01/Pirli-logo-transparentni.png"
                alt="Pirli Logo"
                width={14}
                height={14}
                referrerPolicy="no-referrer"
                className="object-contain"
              />
            </div>
          )}
        </div>

        <div className="col-span-2 flex justify-center">
          {isPlayed ? (
            <div className="bg-[#0B1220]/90 text-white border border-slate-800 px-2 py-0.5 rounded-md text-xs font-black font-mono tracking-tighter">
              {match.pirliScore}:{match.opponentScore}
            </div>
          ) : (
            <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[8px] font-black px-1.5 py-0.5 rounded font-mono uppercase tracking-wider">
              Uskoro
            </span>
          )}
        </div>

        <div className="col-span-5 text-left flex items-center gap-1.5 min-w-0">
          {!match.isHome && (
            <div className="w-5 h-5 bg-[#0B1220] rounded-full flex items-center justify-center p-0.5 shadow-inner">
              <Image
                src="https://minifudbalsrbije.rs/wp-content/uploads/2023/01/Pirli-logo-transparentni.png"
                alt="Pirli Logo"
                width={14}
                height={14}
                referrerPolicy="no-referrer"
                className="object-contain"
              />
            </div>
          )}
          <span
            className={`text-xs truncate uppercase font-extrabold ${
              !match.isHome ? "text-blue-400 font-black" : "text-slate-300"
            }`}
          >
            {away}
          </span>
        </div>
      </div>

      {/* Bottom Row: Location and Result */}
      <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px] text-slate-400 font-semibold font-mono">
        <span className="flex items-center gap-1 max-w-[70%] truncate">
          <MapPin size={10} className="text-blue-500 shrink-0" />
          {match.venue}
        </span>
        <div className="shrink-0 flex items-center gap-1.5">
          <span className="text-xs">{getResultEmoji(badgeType)}</span>
          <span
            className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider border ${getResultColor(
              badgeType,
            )}`}
          >
            {getResultLabel(badgeType)}
          </span>
        </div>
      </div>
    </div>
  );
}
