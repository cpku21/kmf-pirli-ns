"use client";

import React from "react";
import { Shield } from "lucide-react";
import Image from "next/image";

interface MatchScoreHeaderProps {
  homeTeam: string;
  awayTeam: string;
  score: string;
  isPirliHome: boolean;
  link?: string;
}

export function MatchScoreHeader({
  homeTeam,
  awayTeam,
  score,
  isPirliHome,
  link,
}: MatchScoreHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-[#1E293B]/70 to-[#0B1220]/85 border border-slate-800/80 rounded-xl p-3 shadow-inner">
      <div className="flex items-center justify-between text-center">
        {/* Home Team Column */}
        <div className="flex-1 flex flex-col items-center min-w-0">
          <div className="w-10 h-10 bg-[#0B1220] rounded-full border border-slate-800 p-1 flex items-center justify-center mb-1">
            {isPirliHome ? (
              <Image
                src="https://minifudbalsrbije.rs/wp-content/uploads/2023/01/Pirli-logo-transparentni.png"
                alt="Pirli"
                width={24}
                height={24}
                referrerPolicy="no-referrer"
              />
            ) : (
              <Shield size={16} className="text-slate-400" />
            )}
          </div>
          <span
            className={`text-[11px] font-black uppercase truncate w-full px-1 ${
              isPirliHome ? "text-blue-400" : "text-white"
            }`}
          >
            {homeTeam}
          </span>
        </div>

        {/* Display Score center */}
        <div className="flex-none px-3 flex flex-col items-center justify-center">
          <span className="text-xl font-black font-mono tracking-tight text-white bg-[#0B1220] px-3 py-1 rounded-lg border border-slate-800 shadow">
            {score}
          </span>
          <span className="text-[8px] text-slate-500 font-mono block mt-1 uppercase font-bold tracking-wider">
            Konačan Rezultat
          </span>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 bg-blue-500/10 hover:bg-blue-500/20 text-[#60A5FA] text-[8px] font-extrabold px-2 py-0.5 rounded border border-blue-500/20 hover:border-blue-500/40 transition-all uppercase tracking-widest font-mono shadow-sm"
            >
              Zapisnik 🔗
            </a>
          )}
        </div>

        {/* Away Team Column */}
        <div className="flex-grow flex-1 flex flex-col items-center min-w-0">
          <div className="w-10 h-10 bg-[#0B1220] rounded-full border border-slate-800 p-1 flex items-center justify-center mb-1">
            {!isPirliHome ? (
              <Image
                src="https://minifudbalsrbije.rs/wp-content/uploads/2023/01/Pirli-logo-transparentni.png"
                alt="Pirli"
                width={24}
                height={24}
                referrerPolicy="no-referrer"
              />
            ) : (
              <Shield size={16} className="text-slate-400" />
            )}
          </div>
          <span
            className={`text-[11px] font-black uppercase truncate w-full px-1 ${
              !isPirliHome ? "text-blue-400" : "text-white"
            }`}
          >
            {awayTeam}
          </span>
        </div>
      </div>
    </div>
  );
}
