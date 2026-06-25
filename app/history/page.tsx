import React from "react";
import Link from "next/link";
import { ChevronLeft, Star } from "lucide-react";
import { clubHistory, clubInfo } from "@/data/club";

const typeColor: Record<string, string> = {
  founding: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  achievement: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  milestone: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  season: "text-slate-300 bg-slate-700/40 border-slate-600/30",
  other: "text-slate-400 bg-slate-800/40 border-slate-700/30",
};

const typeLabel: Record<string, string> = {
  founding: "Osnivanje",
  achievement: "Dostignuće",
  milestone: "Prekretnica",
  season: "Sezona",
  other: "Ostalo",
};

export default function HistoryPage() {
  const sorted = [...clubHistory].sort((a, b) => a.order - b.order);

  return (
    <div className="flex-grow flex flex-col bg-[#0B1220] pb-12 w-full text-white">
      <div className="py-6 px-5 bg-[#111827] border-b border-slate-700/60 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-xl font-black text-white uppercase tracking-tight">
            Istorijat Kluba
          </h1>
        </div>
        <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/25 tracking-wider font-extrabold uppercase px-2 py-1 rounded">
          KMF PIRLI
        </span>
      </div>

      <div className="px-4 mt-6 space-y-4">
        <div className="bg-[#1F2937]/50 rounded-xl p-4 border border-slate-800">
          <p className="text-sm text-slate-300 leading-relaxed">
            {clubInfo.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400 font-mono">
            <span>📍 {clubInfo.city}</span>
            <span>🏟 {clubInfo.venue}</span>
            <span>📅 Osnovano {clubInfo.founded}.</span>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {sorted.map((entry) => (
            <div
              key={entry.id}
              className="bg-[#1F2937]/50 border border-slate-800 rounded-xl p-4 flex gap-4"
            >
              <div className="flex flex-col items-center shrink-0">
                <span className="text-xs font-black font-mono text-blue-400">
                  {entry.year}
                </span>
                <div className="w-px flex-1 bg-slate-700/60 mt-2" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${typeColor[entry.type]}`}
                  >
                    {typeLabel[entry.type]}
                  </span>
                </div>
                <h3 className="text-sm font-black text-white">{entry.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
