"use client";

import React, { useMemo } from "react";
import { Trophy, X, Award, Users } from "lucide-react";
import { Match } from "@/data/matches";
import { getMatchDetailById } from "@/data/matchDetails";
import { getPlayerName, getPlayerNumber } from "@/utils/playerUtils";
import { formatMatchDate } from "@/utils/matchUtils";

interface MatchModalProps {
  match: Match;
  onClose: () => void;
}

export function MatchModal({ match, onClose }: MatchModalProps) {
  const detail = getMatchDetailById(match.detailId);

  if (!detail) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <div className="bg-[#111827] border border-slate-800 rounded-2xl w-full max-w-sm p-6 text-center">
          <p className="text-slate-400">Detalji nisu dostupni.</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg text-white text-sm"
          >
            Zatvori
          </button>
        </div>
      </div>
    );
  }

  const teams = Object.keys(detail.teams);
  const pirliTeamKey = teams.find((t) => t === "PIRLI" || t === "PRILI") || "";
  const opponentTeamKey =
    teams.find((t) => t !== "PIRLI" && t !== "PRILI") || "";
  const pirliStats = pirliTeamKey ? detail.teams[pirliTeamKey] : null;
  const opponentStats = opponentTeamKey ? detail.teams[opponentTeamKey] : null;

  const [rawHome, rawAway] = detail.match.split(" — ");
  const homeTeamKey =
    teams.find((t) => t.toUpperCase() === rawHome?.trim().toUpperCase()) ||
    rawHome?.trim() ||
    "";
  const awayTeamKey =
    teams.find((t) => t.toUpperCase() === rawAway?.trim().toUpperCase()) ||
    rawAway?.trim() ||
    "";
  const isPirliHome = homeTeamKey === pirliTeamKey;

  // Build timeline events
  const timelineEvents = useMemo(() => {
    const events: {
      type: string;
      minute: string;
      player: string;
      team: "left" | "right";
      assist: string | null;
    }[] = [];
    let homeIdx = 0,
      awayIdx = 0;
    const homeAssists: string[] = [];
    const awayAssists: string[] = [];

    if (pirliStats?.assists)
      pirliStats.assists.forEach((a) => {
        for (let i = 0; i < a.count; i++)
          homeAssists.push(getPlayerName(a.player));
      });
    if (opponentStats?.assists)
      opponentStats.assists.forEach((a) => {
        for (let i = 0; i < a.count; i++)
          awayAssists.push(getPlayerName(a.player));
      });

    const addEvents = (
      stats: any,
      team: "left" | "right",
      assistPool: string[],
    ) => {
      let idx = 0;
      stats?.goals.forEach((g: any) => {
        g.minutes.forEach((m: string) => {
          events.push({
            type: "goal",
            minute: m,
            player: getPlayerName(g.player),
            team,
            assist: assistPool[idx] || null,
          });
          idx++;
        });
      });
      stats?.yellow_cards.forEach((yc: any) => {
        events.push({
          type: "yellow",
          minute: yc.minute,
          player: getPlayerName(yc.player),
          team,
          assist: null,
        });
      });
      stats?.red_cards.forEach((rc: any) => {
        events.push({
          type: "red",
          minute: rc.minute,
          player: getPlayerName(rc.player),
          team,
          assist: null,
        });
      });
    };

    // 🔥 BITNO: Pirli ide na DESNU stranu ako je gost
    if (isPirliHome) {
      addEvents(pirliStats, "left", homeAssists);
      addEvents(opponentStats, "right", awayAssists);
    } else {
      addEvents(opponentStats, "left", awayAssists);
      addEvents(pirliStats, "right", homeAssists);
    }

    return events.sort(
      (a, b) => (parseInt(a.minute) || 0) - (parseInt(b.minute) || 0),
    );
  }, [detail, pirliStats, opponentStats, isPirliHome]);

  const mvpId = pirliStats?.mvp || opponentStats?.mvp;
  const mvpTeam = pirliStats?.mvp
    ? pirliTeamKey
    : opponentStats?.mvp
      ? opponentTeamKey
      : null;

  // 🏆 LEVI i DESNI tim - Pirli je desno ako je gost
  const leftTeam = isPirliHome ? homeTeamKey : awayTeamKey;
  const rightTeam = isPirliHome ? awayTeamKey : homeTeamKey;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#111827] border border-slate-800 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#111827] border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy size={15} className="text-yellow-500" />
            <div>
              <h3 className="text-xs font-black uppercase text-white">
                Detaljna Statistika
              </h3>
              <span className="text-[9px] text-slate-500">
                {formatMatchDate(match.date)} • Novi Sad
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* Score */}
          <div className="bg-[#1E293B]/50 border border-slate-800/80 rounded-xl p-3 text-center">
            <div className="flex items-center justify-between px-4">
              <span className="text-sm font-bold text-white">
                {homeTeamKey}
              </span>
              <span className="text-2xl font-black font-mono text-white bg-[#0B1220] px-4 py-1 rounded-lg border border-slate-800">
                {detail.score}
              </span>
              <span className="text-sm font-bold text-white">
                {awayTeamKey}
              </span>
            </div>
            <span className="text-[8px] text-slate-500 font-mono uppercase">
              Konačan Rezultat
            </span>
          </div>

          {/* MVP */}
          {mvpId && mvpTeam && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-center gap-3">
              <Award size={18} className="text-yellow-400" />
              <div>
                <p className="text-[10px] font-black text-amber-400 uppercase">
                  IGRAČ UTAKMICE (MVP)
                </p>
                <p className="text-sm font-bold text-white">
                  {getPlayerName(mvpId)}
                </p>
                <span className="text-[8px] text-slate-400 bg-[#0B1220] px-2 py-0.5 rounded">
                  {mvpTeam}
                </span>
              </div>
            </div>
          )}

          {/* TIMELINE - DVE KOLONE SA IKONICAMA */}
          <div>
            <h4 className="text-[10px] font-black uppercase text-[#94A3B8] border-b border-slate-800 pb-1">
              ⏱️ TOK UTAKMICE
            </h4>

            {/* Header timova */}
            <div className="flex justify-between text-[9px] font-black uppercase text-blue-400 mt-2 px-2">
              <span>{leftTeam}</span>
              <span className="text-slate-500">VS</span>
              <span>{rightTeam}</span>
            </div>

            <div className="relative mt-2">
              {/* Centralna linija */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-700/50 -translate-x-1/2" />

              <div className="space-y-2">
                {timelineEvents.map((ev, i) => {
                  const isLeft = ev.team === "left";
                  const isGoal = ev.type === "goal";
                  const isYellow = ev.type === "yellow";
                  const isRed = ev.type === "red";

                  // 🎯 IKONICE
                  let icon = "";
                  let label = "";
                  if (isGoal) {
                    icon = "⚽";
                    label = "";
                  } else if (isYellow) {
                    icon = "🟨";
                    label = "Žuti karton";
                  } else if (isRed) {
                    icon = "🟥";
                    label = "Crveni karton";
                  }

                  return (
                    <div
                      key={i}
                      className={`grid grid-cols-2 gap-0 items-start ${isLeft ? "text-right" : "text-left"}`}
                    >
                      {isLeft ? (
                        <>
                          <div className="pr-3">
                            <p className="text-xs font-bold text-white">
                              {icon} {ev.player}
                            </p>
                            {isGoal && ev.assist && (
                              <p className="text-[9px] text-slate-400">
                                A: {ev.assist}
                              </p>
                            )}
                            {!isGoal && (
                              <p className="text-[9px] text-slate-400">
                                {label}
                              </p>
                            )}
                          </div>
                          <div className="pl-3">
                            <span className="font-mono text-yellow-400 font-bold text-sm">
                              {ev.minute}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="pr-3 text-right">
                            <span className="font-mono text-yellow-400 font-bold text-sm">
                              {ev.minute}
                            </span>
                          </div>
                          <div className="pl-3">
                            <p className="text-xs font-bold text-white">
                              {icon} {ev.player}
                            </p>
                            {isGoal && ev.assist && (
                              <p className="text-[9px] text-slate-400">
                                A: {ev.assist}
                              </p>
                            )}
                            {!isGoal && (
                              <p className="text-[9px] text-slate-400">
                                {label}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Početni sastavi */}
          <div>
            <h4 className="text-[10px] font-black uppercase text-[#94A3B8] border-b border-slate-800 pb-1">
              👥 POČETNI SASTAVI
            </h4>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {pirliStats && (
                <div className="bg-[#1e293b]/15 rounded-xl border border-slate-800 p-2">
                  <p className="text-[9px] font-bold text-blue-400 uppercase">
                    {pirliTeamKey}
                  </p>
                  {pirliStats.lineup.map((pId) => (
                    <div
                      key={pId}
                      className="text-xs text-slate-300 flex justify-between"
                    >
                      <span>{getPlayerName(pId)}</span>
                      {pirliStats.mvp === pId && (
                        <span className="text-[8px] text-yellow-400">★</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {opponentStats && (
                <div className="bg-[#1e293b]/5 rounded-xl border border-slate-800/80 p-2">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">
                    {opponentTeamKey}
                  </p>
                  {opponentStats.lineup.map((pId) => (
                    <div
                      key={pId}
                      className="text-xs text-slate-400 flex justify-between"
                    >
                      <span>{getPlayerName(pId)}</span>
                      {opponentStats.mvp === pId && (
                        <span className="text-[8px] text-yellow-400">★</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0B1220]/60 border-t border-slate-800 p-2 text-center text-[8px] text-slate-500">
          KMF Pirli Match Engine v2.0 · Sezona 2026/2027
        </div>
      </div>
    </div>
  );
}
