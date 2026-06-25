import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { matches } from "@/data/matches";
import MatchFilter from "@/components/matches/MatchFilter";

export default function MatchesPage() {
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
            Klupske Utakmice
          </h1>
        </div>
        <span className="text-[10px] bg-blue-600/10 border border-blue-500/20 text-blue-400 tracking-wider font-extrabold uppercase px-2 py-1 rounded">
          MEČEVI
        </span>
      </div>
      <div className="px-4 mt-6">
        <MatchFilter />
      </div>
    </div>
  );
}
