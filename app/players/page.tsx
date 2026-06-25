"use client";

import React, { useState, useMemo } from "react";
import { Search, Users, Shield, Swords, Target, Sparkles } from "lucide-react";
import { players, Player } from "@/data/players";

type Position = "SVI" | "GOLMAN" | "ODBRANA" | "VEZNI" | "NAPAD";

export default function PlayersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<Position>("SVI");

  const filteredPlayers = useMemo(() => {
    return players.filter((p) => {
      // Filtriranje po poziciji
      if (selectedPosition !== "SVI") {
        const posMap: Record<string, string> = {
          GOLMAN: "Golman",
          ODBRANA: "Odbrana",
          VEZNI: "Vezni",
          NAPAD: "Napadač",
        };
        if (p.position !== posMap[selectedPosition]) return false;
      }

      // Pretraga po imenu ili broju
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        const nameMatch = p.name.toLowerCase().includes(term);
        const numberMatch = p.number ? String(p.number).includes(term) : false;
        if (!nameMatch && !numberMatch) return false;
      }

      return true;
    });
  }, [searchTerm, selectedPosition]);

  const positions: Position[] = ["SVI", "GOLMAN", "ODBRANA", "VEZNI", "NAPAD"];
  const positionIcons = {
    SVI: <Users size={14} />,
    GOLMAN: <Shield size={14} />,
    ODBRANA: <Shield size={14} />,
    VEZNI: <Swords size={14} />,
    NAPAD: <Target size={14} />,
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Users size={28} className="text-blue-400" />
          <div>
            <h1 className="text-2xl font-black uppercase tracking-wider">
              IGRAČI
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              ROSTER • SEZONA 2026/2027
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={16}
          />
          <input
            type="text"
            placeholder="Pretraži igrača po imenu ili broju..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1E293B] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>

        {/* Position filters */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => setSelectedPosition(pos)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                selectedPosition === pos
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : "bg-[#1E293B] text-slate-400 hover:text-white hover:bg-[#2A3A4A] border border-slate-800"
              }`}
            >
              {positionIcons[pos]}
              {pos === "SVI" ? "SVI" : pos}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-[10px] text-slate-500 font-mono mb-3">
          Rezultati pretrage:{" "}
          <span className="text-white font-bold">{filteredPlayers.length}</span>{" "}
          igrača
        </div>

        {/* Player grid */}
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredPlayers.map((p) => (
              <div
                key={p.id}
                className="bg-[#1E293B]/50 border border-slate-800 rounded-xl p-3 hover:bg-[#2A3A4A] hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0B1220] border border-slate-800 rounded-full flex items-center justify-center text-sm font-black text-blue-400">
                      {p.number || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{p.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-medium">
                        {p.position}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <span>⚽ {p.stats.goals}</span>
                      <span>🅰 {p.stats.assists}</span>
                      {p.stats.mvpCount > 0 && (
                        <span className="text-yellow-400">
                          ★ {p.stats.mvpCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1E293B]/30 border border-slate-800 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm font-bold text-white">NEMA REZULTATA</p>
            <p className="text-xs text-slate-400">
              Nije pronađen nijedan igrač za zadatu pretragu.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
