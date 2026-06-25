"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getSeasonStats } from "@/data/matches";
import { players } from "@/data/players";

const seasonStats = getSeasonStats();

const topScorers = [...players]
  .sort((a, b) => b.stats.goals - a.stats.goals)
  .slice(0, 7)
  .map((p) => ({ playerName: p.name, goals: p.stats.goals }));

const chartByYear = [
  { seasonName: "26. Sezona", goalsFor: 50, wins: 7 },
  { seasonName: "27. Sezona", goalsFor: 55, wins: 7 },
  { seasonName: "28. Sezona", goalsFor: 70, wins: 10 },
  { seasonName: "29. Sezona", goalsFor: 62, wins: 9 },
  {
    seasonName: "30. Sezona",
    goalsFor: seasonStats.goalsFor,
    wins: seasonStats.wins,
  },
];

export default function StatisticsPage() {
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
            Statistika Kluba
          </h1>
        </div>
        <span className="text-[10px] bg-blue-600/10 border border-blue-500/20 text-blue-400 font-extrabold uppercase px-2 py-1 rounded">
          STATS
        </span>
      </div>

      <div className="px-4 mt-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {[
            {
              label: "Odigrano",
              value: seasonStats.played,
              color: "text-white",
            },
            {
              label: "Pobede",
              value: seasonStats.wins,
              color: "text-green-500",
            },
            {
              label: "Porazi",
              value: seasonStats.losses,
              color: "text-red-500",
            },
            {
              label: "Golovi dat.",
              value: seasonStats.goalsFor,
              color: "text-emerald-400",
            },
            {
              label: "Golovi prim.",
              value: seasonStats.goalsAgainst,
              color: "text-rose-400",
            },
            {
              label: "% Pobeda",
              value: seasonStats.winRate,
              color: "text-blue-400",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#1F2937] border border-slate-700 rounded-xl p-4 flex flex-col justify-between"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {s.label}
              </span>
              <span
                className={`text-2xl font-black font-mono mt-1.5 ${s.color}`}
              >
                {s.value}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-[#1F2937] border border-slate-700 rounded-xl p-5 space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase text-slate-300 tracking-wider">
                Golovi po sezonama
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Broj postignutih golova kroz istoriju takmičenja
              </p>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartByYear}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#111827"
                    opacity={0.6}
                  />
                  <XAxis
                    dataKey="seasonName"
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 9 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      fontSize: 11,
                    }}
                  />
                  <Bar
                    dataKey="goalsFor"
                    fill="#2563EB"
                    radius={[4, 4, 0, 0]}
                    name="Golovi"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#1F2937] border border-slate-700 rounded-xl p-5 space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase text-slate-300 tracking-wider">
                Top strelci — tekuća sezona
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Rang-lista najefikasnijih igrača
              </p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={topScorers}
                  margin={{ left: 10, right: 10, top: 5, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#111827"
                    opacity={0.6}
                  />
                  <XAxis
                    type="number"
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="playerName"
                    stroke="#94A3B8"
                    tick={{ fill: "#94A3B8", fontSize: 9 }}
                    axisLine={false}
                    tickLine={false}
                    width={110}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      fontSize: 11,
                    }}
                  />
                  <Bar
                    dataKey="goals"
                    fill="#EF4444"
                    radius={[0, 4, 4, 0]}
                    name="Golovi"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
