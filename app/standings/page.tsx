import React from "react";
import Link from "next/link";
import { ChevronLeft, Trophy } from "lucide-react";
import { standings, seasonName, competition } from "@/data/standings";
import StandingsTable from "@/components/standings/StandingsTable";

export default function StandingsPage() {
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
            Tabela Lige
          </h1>
        </div>
        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 tracking-wider font-extrabold uppercase px-2 py-1 rounded">
          {competition}
        </span>
      </div>

      <div className="px-4 mt-6 space-y-4">
        <div className="bg-[#1F2937]/50 rounded-xl p-4 border border-slate-800 flex items-start gap-3">
          <Trophy size={18} className="text-amber-500 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <h3 className="text-xs font-black uppercase text-white">
              {seasonName}
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Zvanični plasman timova u Meridianbet minifudbal ligi Novog Sada.
            </p>
          </div>
        </div>

        <StandingsTable standings={standings} />

        <div className="flex flex-col sm:flex-row justify-between text-[11px] text-slate-500 gap-2 font-mono px-1">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <span>
              <strong>OU</strong>: Odigrane utakmice
            </span>
            <span>
              <strong>P</strong>: Pobede
            </span>
            <span>
              <strong>N</strong>: Nerešene
            </span>
            <span>
              <strong>I</strong>: Izgubljene
            </span>
          </div>
          <div>
            <span>
              <strong>GR</strong>: Gol razlika
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
