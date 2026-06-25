import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Trophy, ChevronLeft, Shield, Award, Users } from "lucide-react";
import { getPlayerBySlug, players } from "@/data/players";

export async function generateStaticParams() {
  return players.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);
  return { title: player ? `${player.name} | KMF Pirli` : "Igrač | KMF Pirli" };
}

const positionLabel: Record<string, string> = {
  Goalkeeper: "Golman",
  Defender: "Odbrana",
  Midfielder: "Vezni",
  Forward: "Napad",
};

const positionColor: Record<string, string> = {
  Goalkeeper: "border-amber-500/30 text-amber-400 bg-amber-500/10",
  Defender: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  Midfielder: "border-green-500/30 text-green-400 bg-green-500/10",
  Forward: "border-red-500/30 text-red-500 bg-red-500/10",
};

export default async function PlayerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);

  if (!player) notFound();

  const getInitials = (n: string) =>
    n
      .split(" ")
      .map((p: string) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="flex-grow flex flex-col bg-[#0B1220] pb-12 w-full text-white">
      <div className="relative py-12 px-6 bg-[#111827] border-b border-slate-700 overflow-hidden">
        <Link
          href="/players"
          className="absolute top-4 left-4 z-50 p-2 bg-slate-800/40 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all flex items-center justify-center"
        >
          <ChevronLeft size={18} />
        </Link>

        <span className="absolute -bottom-6 -right-6 text-9xl font-extrabold text-slate-800/25 select-none pointer-events-none font-mono">
          {player.number}
        </span>

        <div className="relative flex flex-col items-center md:items-start text-center md:text-left gap-6 mt-4 md:flex-row">
          <div className="w-40 h-40 rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl shrink-0 bg-slate-800/50 flex items-center justify-center">
            <span className="text-5xl font-black text-slate-500 font-mono">
              {getInitials(player.name)}
            </span>
          </div>

          <div className="flex-1 space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-widest ${
                    positionColor[player.position] ??
                    "border-slate-500/30 text-slate-400 bg-slate-500/10"
                  }`}
                >
                  {positionLabel[player.position] ?? player.position}
                </span>
                <span className="text-sm font-black font-mono text-blue-400">
                  #{player.number}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mt-2">
                {player.name}
              </h2>
            </div>

            <div className="grid grid-cols-5 gap-2 pt-2 max-w-sm">
              {[
                {
                  label: "Nas",
                  value: player.stats.appearances,
                  color: "text-white",
                },
                {
                  label: "Gol",
                  value: player.stats.goals,
                  color: "text-emerald-500",
                },
                {
                  label: "Asi",
                  value: player.stats.assists,
                  color: "text-blue-400",
                },
                {
                  label: "Žut",
                  value: player.stats.yellowCards,
                  color: "text-yellow-500",
                },
                {
                  label: "Crv",
                  value: player.stats.redCards,
                  color: "text-rose-500",
                },
              ].map(
                (
                  stat: { label: string; value: number; color: string },
                  index: number,
                ) => (
                  <div
                    key={index}
                    className="bg-[#1F2937] rounded-lg p-2 text-center border border-slate-800"
                  >
                    <span className="text-[9px] font-bold text-slate-400 block uppercase font-mono">
                      {stat.label}
                    </span>
                    <span
                      className={`text-sm font-black font-mono ${stat.color}`}
                    >
                      {stat.value}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-8 space-y-8">
        <div className="space-y-3">
          <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Shield size={12} className="text-blue-500" />
            Statistika
          </h3>
          <div className="bg-[#1F2937] rounded-xl border border-slate-700/60 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#111827] text-slate-400 font-extrabold uppercase text-[9px] tracking-wider font-mono border-b border-slate-800">
                  <th className="px-3 py-3">Sezona</th>
                  <th className="px-3 py-3 text-center">Nas</th>
                  <th className="px-3 py-3 text-center">Gol</th>
                  <th className="px-3 py-3 text-center">Asi</th>
                  <th className="px-3 py-3 text-center">Žut</th>
                  <th className="px-3 py-3 text-center">Crv</th>
                  <th className="px-3 py-3 text-center text-yellow-400">MVP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="text-slate-200">
                  <td className="px-3 py-3.5 font-bold font-sans">
                    Tekuća sezona
                  </td>
                  <td className="px-3 py-3.5 text-center text-white">
                    {player.stats.appearances}
                  </td>
                  <td className="px-3 py-3.5 text-center font-bold text-emerald-500">
                    {player.stats.goals}
                  </td>
                  <td className="px-3 py-3.5 text-center font-bold text-blue-400">
                    {player.stats.assists}
                  </td>
                  <td className="px-3 py-3.5 text-center text-yellow-500">
                    {player.stats.yellowCards}
                  </td>
                  <td className="px-3 py-3.5 text-center text-red-500">
                    {player.stats.redCards}
                  </td>
                  <td className="px-3 py-3.5 text-center text-yellow-400 font-bold">
                    {player.stats.mvpCount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
