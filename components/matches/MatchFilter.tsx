"use client";

import React, { useState, useMemo } from "react";
import { matches, Match } from "@/data/matches";
import { MatchCard } from "./MatchCard";
import { MatchModal } from "./MatchModal";

export default function MatchFilter() {
  const [activeTab, setActiveTab] = useState<"all" | "results" | "schedule">(
    "results",
  );
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const isPlayed = m.result !== null;
      if (activeTab === "all") return true;
      if (activeTab === "results") return isPlayed;
      return !isPlayed;
    });
  }, [activeTab]);

  return (
    <div className="space-y-4 font-sans max-w-md mx-auto">
      {/* Tabs */}
      <div className="flex bg-[#111827] p-1 rounded-xl border border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
            activeTab === "all"
              ? "bg-[#1F2937] text-white border border-slate-700/50 shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Sve
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("results")}
          className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
            activeTab === "results"
              ? "bg-[#1F2937] text-white border border-slate-700/50 shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Rezultati
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("schedule")}
          className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
            activeTab === "schedule"
              ? "bg-[#1F2937] text-white border border-slate-700/50 shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Raspored
        </button>
      </div>

      {/* Counter */}
      <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono px-1">
        <span>Broj utakmica u izboru:</span>
        <span className="text-white bg-[#1F2937] px-2 py-0.5 rounded font-bold border border-slate-800">
          {filteredMatches.length}
        </span>
      </div>

      {/* Match List */}
      <div className="space-y-3">
        {filteredMatches.map((m) => (
          <MatchCard key={m.id} match={m} onClick={() => setSelectedMatch(m)} />
        ))}
      </div>

      {/* Modal */}
      {selectedMatch && (
        <MatchModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
}
