'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  X, 
  AlertTriangle, 
  Shield, 
  Star,
  Award,
  BookOpen
} from 'lucide-react';
import { staticMatches, MatchDetails, getPlayerName, getPlayerNumber } from '@/lib/matchesData.ts';
import Image from 'next/image';

interface MatchFilterProps {
  initialMatches?: any[];
}

export default function MatchFilter({ initialMatches }: MatchFilterProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'results' | 'schedule'>('results');
  const [selectedMatch, setSelectedMatch] = useState<MatchDetails | null>(null);

  // Parse static matches with formatted names
  const allMatches = useMemo(() => {
    // Dynamic list including static real historic ones, plus upcoming if needed
    const list: any[] = [];
    
    // Add played static matches from JSON
    staticMatches.forEach((m, idx) => {
      list.push({
        _id: `static-${idx}`,
        opponent: m.match.replace('PIRLI — ', '').replace(' — PIRLI', '').replace('PRILI — ', ''),
        isHome: m.match.startsWith('PIRLI'),
        date: `${m.date}T20:00:00.000Z`,
        competition: 'II Liga Novi Sad',
        venue: 'SC Hattrick, I teren 5+1',
        pirliScore: parseInt(m.score.split(':')[0]) || 0,
        opponentScore: parseInt(m.score.split(':')[1]) || 0,
        // Keep result character
        result: m.score.includes('penali') ? 'D' : (parseInt(m.score.split(':')[0]) > parseInt(m.score.split(':')[1]) ? 'W' : 'L'),
        details: m
      });
    });

    // Add upcoming schedules
    list.push({
      _id: 'future-1',
      opponent: 'Vitorog PROMET',
      isHome: false,
      date: '2026-06-23T19:00:00.000Z',
      competition: 'II Liga Novi Sad',
      venue: 'SC Hattrick, I teren 5+1',
      pirliScore: null,
      opponentScore: null,
      result: null,
      details: null
    });

    list.push({
      _id: 'future-2',
      opponent: 'Milenijum II',
      isHome: true,
      date: '2026-06-30T21:00:00.000Z',
      competition: 'II Liga Novi Sad',
      venue: 'SC Hattrick, II teren 5+1',
      pirliScore: null,
      opponentScore: null,
      result: null,
      details: null
    });

    // Sort by date descending
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const filteredMatches = useMemo(() => {
    return allMatches.filter((match) => {
      const isPlayed = match.pirliScore !== null && match.opponentScore !== null;
      if (activeTab === 'all') {
        return true;
      } else if (activeTab === 'results') {
        return isPlayed;
      } else {
        return !isPlayed;
      }
    });
  }, [allMatches, activeTab]);

  // Clean title for opponent
  const getCleanMatchTitle = (m: MatchDetails) => {
    return m.match;
  };

  const getResultBadgeType = (m: any) => {
    if (m.pirliScore === null || m.opponentScore === null) return 'future';
    
    // Check if match was a draw
    const scorePart = m.details?.score || '';
    if (scorePart.includes('penali') || m.pirliScore === m.opponentScore) {
      return 'draw';
    }

    const homeTeam = m.details?.match.split(' — ')[0] || '';
    const isPirliHome = homeTeam === 'PIRLI' || homeTeam === 'PRILI';
    
    if (isPirliHome) {
      return m.pirliScore > m.opponentScore ? 'win' : 'loss';
    } else {
      return m.pirliScore < m.opponentScore ? 'win' : 'loss';
    }
  };

  return (
    <div id="match-filter-container" className="space-y-4 font-sans max-w-md mx-auto">
      
      {/* Tab select slider */}
      <div className="flex bg-[#111827] p-1 rounded-xl border border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
            activeTab === 'all'
              ? 'bg-[#1F2937] text-white border border-slate-700/50 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Sve
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('results')}
          className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
            activeTab === 'results'
              ? 'bg-[#1F2937] text-white border border-slate-700/50 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Rezultati
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
            activeTab === 'schedule'
              ? 'bg-[#1F2937] text-white border border-slate-700/50 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Raspored
        </button>
      </div>

      {/* Meta state info banner */}
      <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono px-1">
        <span>Broj utakmica u izboru:</span>
        <span className="text-white bg-[#1F2937] px-2 py-0.5 rounded font-bold border border-slate-800">
          {filteredMatches.length}
        </span>
      </div>

      {/* Matches List Grid */}
      <div className="space-y-3">
        {filteredMatches.map((m) => {
          const isPlayed = m.pirliScore !== null && m.opponentScore !== null;
          const matchDate = new Date(m.date);
          const dateStr = matchDate.toLocaleDateString('sr-RS', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });

          const badgeType = getResultBadgeType(m);

          // Split Match Teams
          const homeTeam = m.details?.match.split(' — ')[0] || (m.isHome ? 'PIRLI' : m.opponent);
          const awayTeam = m.details?.match.split(' — ')[1] || (m.isHome ? m.opponent : 'PIRLI');

          // Highlight score in correct order (Home vs Away scores)
          const isHomePirli = homeTeam === 'PIRLI' || homeTeam === 'PRILI';
          const displayHomeScore = isHomePirli ? m.pirliScore : m.opponentScore;
          const displayAwayScore = isHomePirli ? m.opponentScore : m.pirliScore;

          return (
            <div
              key={m._id}
              onClick={() => {
                if (m.details) {
                  setSelectedMatch(m.details);
                }
              }}
              className={`p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col space-y-3 shadow-md ${
                m.details 
                  ? 'bg-[#1E293B]/45 border-slate-800 cursor-pointer hover:bg-[#334155]/30 hover:border-slate-700' 
                  : 'bg-[#111827]/50 border-slate-800'
              }`}
            >
              {/* Top Row: Date & Details Note */}
              <div className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1 font-mono text-slate-400 font-bold">
                  <Calendar size={10} className="text-blue-500" />
                  {dateStr}
                </span>

                <div className="flex items-center gap-1.5 font-mono">
                  {m.details && (
                    <span className="text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1 py-0.5 rounded uppercase font-bold tracking-wider">
                      Klik za detalje
                    </span>
                  )}
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest bg-[#0B1220] px-1.5 py-0.5 rounded border border-slate-800/60">
                    {m.competition}
                  </span>
                </div>
              </div>

              {/* Middle Row: Matchup comparison with Logo */}
              <div className="grid grid-cols-12 items-center gap-1 py-0.5">
                {/* Home */}
                <div className="col-span-5 text-right flex items-center justify-end gap-1.5 min-w-0">
                  <span className={`text-xs truncate uppercase font-extrabold ${isHomePirli ? 'text-blue-400 font-black' : 'text-slate-350 text-slate-300'}`}>
                    {homeTeam}
                  </span>
                  {isHomePirli && (
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

                {/* Score badge / VS */}
                <div className="col-span-2 flex justify-center">
                  {isPlayed ? (
                    <div className="bg-[#0B1220]/90 text-white border border-slate-800 px-2 py-0.5 rounded-md text-xs font-black font-mono tracking-tighter">
                      {m.details?.score || `${displayHomeScore}:${displayAwayScore}`}
                    </div>
                  ) : (
                    <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[8px] font-black px-1.5 py-0.5 rounded font-mono uppercase tracking-wider">
                      Uskoro
                    </span>
                  )}
                </div>

                {/* Away */}
                <div className="col-span-5 text-left flex items-center gap-1.5 min-w-0">
                  {!isHomePirli && (
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
                  <span className={`text-xs truncate uppercase font-extrabold ${!isHomePirli ? 'text-blue-400 font-black' : 'text-slate-350 text-slate-300'}`}>
                    {awayTeam}
                  </span>
                </div>
              </div>

              {/* Bottom Row: Location and Result Pill */}
              <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px] text-slate-400 font-semibold font-mono">
                <span className="flex items-center gap-1 max-w-[70%] truncate">
                  <MapPin size={10} className="text-blue-500 shrink-0" />
                  {m.venue}
                </span>

                <div className="shrink-0">
                  {badgeType === 'win' && (
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                      POBEDA
                    </span>
                  )}
                  {badgeType === 'loss' && (
                    <span className="bg-rose-500/10 text-rose-450 text-rose-400 border border-rose-500/20 text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                      PORAZ
                    </span>
                  )}
                  {badgeType === 'draw' && (
                    <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                      NEREŠENO
                    </span>
                  )}
                  {badgeType === 'future' && (
                    <span className="text-[9px] text-slate-500 bg-[#0B1220] px-1.5 rounded uppercase border border-slate-800">
                      RUG
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETALJI UTAKMICE - HIGHLY DETAILED MODAL */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl w-full max-w-sm max-h-[85vh] overflow-y-auto flex flex-col shadow-2xl shadow-blue-500/5 relative antialiased">
            
            {/* Modal Sticky Header Block */}
            <div className="sticky top-0 bg-[#111827] border-b border-slate-800/80 z-20 px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy size={15} className="text-yellow-500" />
                <div>
                  <h3 className="text-xs font-black uppercase text-white tracking-widest leading-none">
                    Detaljna Statistika
                  </h3>
                  <span className="text-[9px] text-slate-500 font-mono font-semibold mt-1 block">
                    {selectedMatch.date} • Novi Sad
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMatch(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 space-y-5 flex-grow overflow-y-auto font-sans leading-normal">
              
              {/* Score Duel Panel */}
              {(() => {
                const hTeam = selectedMatch.match.split(' — ')[0];
                const aTeam = selectedMatch.match.split(' — ')[1];
                const isPirliHome = hTeam === 'PIRLI' || hTeam === 'PRILI';
                
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
                        <span className={`text-[11px] font-black uppercase truncate w-full px-1 ${isPirliHome ? 'text-blue-400' : 'text-white'}`}>
                          {hTeam}
                        </span>
                      </div>

                      {/* Display Score center */}
                      <div className="flex-none px-3 flex flex-col items-center justify-center">
                        <span className="text-xl font-black font-mono tracking-tight text-white bg-[#0B1220] px-3 py-1 rounded-lg border border-slate-800 shadow">
                          {selectedMatch.score}
                        </span>
                        <span className="text-[8px] text-slate-500 font-mono block mt-1 uppercase font-bold tracking-wider">
                          Konačan Rezultat
                        </span>
                        {selectedMatch.link && (
                          <a
                            href={selectedMatch.link}
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
                        <span className={`text-[11px] font-black uppercase truncate w-full px-1 ${!isPirliHome ? 'text-blue-400' : 'text-white'}`}>
                          {aTeam}
                        </span>
                      </div>

                    </div>
                  </div>
                );
              })()}

              {/* STATS BREAKDOWN GRIDS */}
              {(() => {
                const teams = Object.keys(selectedMatch.teams);
                const pirliTeamKey = teams.find(t => t === 'PIRLI' || t === 'PRILI') || '';
                const opponentTeamKey = teams.find(t => t !== 'PIRLI' && t !== 'PRILI') || '';
                const pirliStats = pirliTeamKey ? selectedMatch.teams[pirliTeamKey] : null;
                const opponentStats = opponentTeamKey ? selectedMatch.teams[opponentTeamKey] : null;

                // Determine Home and Away based on the match split
                const [rawHome, rawAway] = selectedMatch.match.split(' — ');
                const homeTeamKey = teams.find(t => t.toUpperCase() === rawHome?.trim().toUpperCase()) || rawHome?.trim() || '';
                const awayTeamKey = teams.find(t => t.toUpperCase() === rawAway?.trim().toUpperCase()) || rawAway?.trim() || '';
                
                const homeStats = selectedMatch.teams[homeTeamKey];
                const awayStats = selectedMatch.teams[awayTeamKey];
                
                const isPirliHome = homeTeamKey === pirliTeamKey;

                // Create a map of available assists for this team to map to goals
                const teamAssistsPool = {
                  home: [] as string[],
                  away: [] as string[]
                };

                if (homeStats && homeStats.assists) {
                  homeStats.assists.forEach(as => {
                    for (let i = 0; i < as.count; i++) {
                      teamAssistsPool.home.push(getPlayerName(as.player));
                    }
                  });
                }

                if (awayStats && awayStats.assists) {
                  awayStats.assists.forEach(as => {
                    for (let i = 0; i < as.count; i++) {
                      teamAssistsPool.away.push(getPlayerName(as.player));
                    }
                  });
                }

                interface TimelineEvent {
                  type: 'goal' | 'yellow_card' | 'red_card';
                  minute: number;
                  minuteStr: string;
                  playerName: string;
                  playerNumber: string;
                  team: 'home' | 'away';
                  assistantName: string | null;
                }

                const timelineEvents: TimelineEvent[] = [];
                let homeGoalCount = 0;
                let awayGoalCount = 0;

                if (homeStats) {
                  // Goals
                  homeStats.goals.forEach(g => {
                    g.minutes.forEach(mStr => {
                      const assistant = teamAssistsPool.home[homeGoalCount++] || null;
                      timelineEvents.push({
                        type: 'goal',
                        minute: parseInt(mStr) || 0,
                        minuteStr: mStr,
                        playerName: getPlayerName(g.player),
                        playerNumber: getPlayerNumber(g.player),
                        team: 'home',
                        assistantName: assistant
                      });
                    });
                  });

                  // Yellow Cards
                  homeStats.yellow_cards.forEach(yc => {
                    timelineEvents.push({
                      type: 'yellow_card',
                      minute: parseInt(yc.minute) || 0,
                      minuteStr: yc.minute,
                      playerName: getPlayerName(yc.player),
                      playerNumber: getPlayerNumber(yc.player),
                      team: 'home',
                      assistantName: null
                    });
                  });

                  // Red Cards
                  homeStats.red_cards.forEach(rc => {
                    timelineEvents.push({
                      type: 'red_card',
                      minute: parseInt(rc.minute) || 0,
                      minuteStr: rc.minute,
                      playerName: getPlayerName(rc.player),
                      playerNumber: getPlayerNumber(rc.player),
                      team: 'home',
                      assistantName: null
                    });
                  });
                }

                if (awayStats) {
                  // Goals
                  awayStats.goals.forEach(g => {
                    g.minutes.forEach(mStr => {
                      const assistant = teamAssistsPool.away[awayGoalCount++] || null;
                      timelineEvents.push({
                        type: 'goal',
                        minute: parseInt(mStr) || 0,
                        minuteStr: mStr,
                        playerName: getPlayerName(g.player),
                        playerNumber: getPlayerNumber(g.player),
                        team: 'away',
                        assistantName: assistant
                      });
                    });
                  });

                  // Yellow Cards
                  awayStats.yellow_cards.forEach(yc => {
                    timelineEvents.push({
                      type: 'yellow_card',
                      minute: parseInt(yc.minute) || 0,
                      minuteStr: yc.minute,
                      playerName: getPlayerName(yc.player),
                      playerNumber: getPlayerNumber(yc.player),
                      team: 'away',
                      assistantName: null
                    });
                  });

                  // Red Cards
                  awayStats.red_cards.forEach(rc => {
                    timelineEvents.push({
                      type: 'red_card',
                      minute: parseInt(rc.minute) || 0,
                      minuteStr: rc.minute,
                      playerName: getPlayerName(rc.player),
                      playerNumber: getPlayerNumber(rc.player),
                      team: 'away',
                      assistantName: null
                    });
                  });
                }

                // Sort chronological
                timelineEvents.sort((a, b) => a.minute - b.minute);

                // Helper stats for players
                const getPlayerGoals = (pId: string) => {
                  if (!pirliStats) return 0;
                  const g = pirliStats.goals.find(x => x.player === pId);
                  return g ? g.minutes.length : 0;
                };

                const getPlayerAssists = (pId: string) => {
                  if (!pirliStats) return 0;
                  const a = pirliStats.assists.find(x => x.player === pId);
                  return a ? a.count : 0;
                };

                const getPlayerYellow = (pId: string) => {
                  if (!pirliStats) return false;
                  return pirliStats.yellow_cards.some(x => x.player === pId);
                };

                const getPlayerRed = (pId: string) => {
                  if (!pirliStats) return false;
                  return pirliStats.red_cards.some(x => x.player === pId);
                };

                // Opponent helper stats (simple representation inside roster)
                const getOpponentGoals = (pId: string) => {
                  if (!opponentStats) return 0;
                  const g = opponentStats.goals.find(x => x.player === pId);
                  return g ? g.minutes.length : 0;
                };

                const getOpponentYellow = (pId: string) => {
                  if (!opponentStats) return false;
                  return opponentStats.yellow_cards.some(x => x.player === pId);
                };

                const getOpponentRed = (pId: string) => {
                  if (!opponentStats) return false;
                  return opponentStats.red_cards.some(x => x.player === pId);
                };

                return (
                  <div className="space-y-6">

                    {/* 1. MAN OF THE MATCH (MVP) - HIGHLIGHTED AMBER CARD AT TOP */}
                    {(() => {
                      const mvpId = pirliStats?.mvp || opponentStats?.mvp;
                      const mvpTeam = pirliStats?.mvp ? pirliTeamKey : (opponentStats?.mvp ? opponentTeamKey : null);
                      
                      if (mvpId && mvpTeam) {
                        return (
                          <div className="bg-gradient-to-r from-amber-500/15 via-yellow-500/5 to-transparent border border-amber-500/30 rounded-xl p-3 flex items-center gap-3 shadow-sm shadow-amber-500/5">
                            <div className="p-2 bg-amber-500/20 rounded-xl border border-amber-500/30 text-yellow-500 shrink-0">
                              <Award size={18} className="animate-pulse text-yellow-400" />
                            </div>
                            <div className="min-w-0">
                              <h5 className="text-[10px] font-black text-amber-400 uppercase tracking-widest leading-none font-mono">
                                IGRAČ UTAKMICE (MVP)
                              </h5>
                              <p className="text-xs font-black text-white mt-1 leading-none tracking-tight">
                                {getPlayerName(mvpId)} {getPlayerNumber(mvpId) ? `(${getPlayerNumber(mvpId)})` : ''}
                              </p>
                              <span className="text-[8px] text-slate-400 font-mono inline-block mt-1 font-bold bg-[#0B1220] px-1.5 py-0.5 rounded border border-slate-800 uppercase tracking-wider">
                                {mvpTeam}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}

                    {/* 2. CHRONOLOGICAL TIMELINE (SIDE BY SIDE - HOME VS AWAY) */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] border-b border-slate-800 pb-1 flex items-center gap-1.5">
                        <span className="text-xs">⏱️</span> TOK UTAKMICE (TIMELINE)
                      </h4>

                      {/* Header Badge */}
                      <div className="grid grid-cols-11 items-center bg-[#1e293b]/10 border border-slate-800/80 rounded-xl py-2 px-3 text-center">
                        <div className="col-span-5 text-right font-black text-[11px] text-slate-200 uppercase truncate">
                          {isPirliHome ? (
                            <span className="text-blue-400">👕 {homeTeamKey} (MI)</span>
                          ) : (
                            <span className="text-slate-400">🛡️ {homeTeamKey}</span>
                          )}
                        </div>
                        <div className="col-span-1 text-slate-500 font-mono text-[9px] uppercase font-black">
                          VS
                        </div>
                        <div className="col-span-5 text-left font-black text-[11px] text-slate-200 uppercase truncate">
                          {!isPirliHome ? (
                            <span className="text-blue-400">👕 {awayTeamKey} (MI)</span>
                          ) : (
                            <span className="text-slate-400">🛡️ {awayTeamKey}</span>
                          )}
                        </div>
                      </div>
                      
                      {timelineEvents.length > 0 ? (
                        <div className="relative py-2 mt-2">
                          {/* Centered vertical line */}
                          <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-slate-800/85 -translate-x-1/2 z-0" />

                          <div className="space-y-4">
                            {timelineEvents.map((ev, index) => {
                              const isHome = ev.team === 'home';
                              
                              // Stylings based on event type and team
                              let colorClasses = "";
                              let eventIcon = null;
                              
                              if (ev.type === 'goal') {
                                if (isHome) {
                                  colorClasses = "border-emerald-500/50 text-emerald-450 bg-emerald-500/5";
                                  eventIcon = (
                                    <span className="w-6 h-6 rounded-full border-1.5 border-emerald-500 bg-slate-950 flex items-center justify-center font-bold text-[11px] shadow-sm shadow-emerald-500/30" title="GOL!">
                                      ⚽
                                    </span>
                                  );
                                } else {
                                  colorClasses = "border-rose-500/50 text-rose-450 bg-rose-500/5";
                                  eventIcon = (
                                    <span className="w-6 h-6 rounded-full border-1.5 border-rose-500 bg-slate-950 flex items-center justify-center font-bold text-[11px] shadow-sm shadow-rose-500/30" title="GOL!">
                                      ⚽
                                    </span>
                                  );
                                }
                              } else if (ev.type === 'yellow_card') {
                                colorClasses = "border-yellow-500/50 text-yellow-500 bg-yellow-500/5";
                                eventIcon = (
                                  <span className="w-3.5 h-4.5 bg-yellow-400 rounded-[2px] inline-block shadow-sm border border-yellow-500/50" title="Žuti karton" />
                                );
                              } else if (ev.type === 'red_card') {
                                colorClasses = "border-rose-600/50 text-rose-550 bg-rose-600/5";
                                eventIcon = (
                                  <span className="w-3.5 h-4.5 bg-rose-650 bg-rose-600 rounded-[2px] inline-block shadow-sm animate-pulse border border-rose-600/50" title="CRVENI KARTON" />
                                );
                              }

                              return (
                                <div key={index} className="grid grid-cols-11 items-center relative z-10 w-full animate-fade-in py-1">
                                  
                                  {/* Left side column */}
                                  <div className="col-span-5 flex items-center justify-end gap-3.5 text-right pr-1">
                                    {isHome ? (
                                      /* Home Goal Scorer Info */
                                      <div className="min-w-0">
                                        <p className="font-extrabold text-[11px] text-slate-100 uppercase tracking-tight truncate max-w-[140px] leading-tight">
                                          {ev.playerName}
                                        </p>
                                        {ev.assistantName && (
                                          <p className="text-[9px] text-[#94A3B8] font-normal leading-none mt-0.5 whitespace-nowrap">
                                            A: {ev.assistantName}
                                          </p>
                                        )}
                                      </div>
                                    ) : (
                                      /* Away Scorer Minute (Left side of center line) */
                                      <span className={`px-2 py-0.5 rounded-full border font-mono font-bold text-[9px] min-w-[34px] text-center shadow-xs ${colorClasses}`}>
                                        {ev.minuteStr}
                                      </span>
                                    )}
                                  </div>

                                  {/* Center section (Event Circular Badge directly on center line) */}
                                  <div className="col-span-1 flex justify-center z-10">
                                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#111827]">
                                      {eventIcon}
                                    </div>
                                  </div>

                                  {/* Right side column */}
                                  <div className="col-span-5 flex items-center justify-start gap-3.5 text-left pl-1">
                                    {isHome ? (
                                      /* Home Scorer Minute (Right side of center line) */
                                      <span className={`px-2 py-0.5 rounded-full border font-mono font-bold text-[9px] min-w-[34px] text-center shadow-xs ${colorClasses}`}>
                                        {ev.minuteStr}
                                      </span>
                                    ) : (
                                      /* Away Goal Scorer Info */
                                      <div className="min-w-0">
                                        <p className="font-extrabold text-[11px] text-slate-100 uppercase tracking-tight truncate max-w-[140px] leading-tight">
                                          {ev.playerName}
                                        </p>
                                        {ev.assistantName && (
                                          <p className="text-[9px] text-[#94A3B8] font-medium leading-none mt-0.5 whitespace-nowrap">
                                            A: {ev.assistantName}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="text-[10px] text-center p-3 text-slate-500 italic bg-slate-900/40 rounded-lg border border-slate-800/50">
                          Nema registrovanih golova ili kartona na ovom meču.
                        </div>
                      )}
                    </div>

                    {/* 3. ROSTERS & MATCH SQUAD PERFORMANCE */}
                    <div className="space-y-4 pt-1">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] border-b border-slate-800 pb-1 flex items-center gap-1.5">
                        <Users size={11} className="text-blue-400" /> SASTAV I POJEDINAČNI UČINAK
                      </h4>

                      {/* PIRLI ROSTER BLOCK WITH INTEGRATED ASSISTS (A) AND GOALS */}
                      {pirliStats && (
                        <div className="bg-[#1e293b]/15 rounded-xl border border-slate-800 p-3.5 space-y-2.5">
                          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-1.5">
                            <h5 className="text-[10px] font-black uppercase font-mono text-blue-400 tracking-wider">
                              👕 {pirliTeamKey} SASTAV & STATS
                            </h5>
                            <span className="text-[8px] bg-blue-500/10 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/20 font-bold font-mono">
                              Golovi, Asistencije (A), Kartoni
                            </span>
                          </div>

                          <div className="space-y-2">
                            {pirliStats.lineup.map((pId) => {
                              const goalsCount = getPlayerGoals(pId);
                              const assistsCount = getPlayerAssists(pId);
                              const hasYellow = getPlayerYellow(pId);
                              const hasRed = getPlayerRed(pId);

                              return (
                                <div key={pId} className="flex items-center justify-between py-1 border-b border-slate-800/20 text-[11px] font-bold text-slate-200">
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="text-[9px] bg-[#0c1322] border border-slate-800 font-mono rounded text-slate-450 text-slate-400 w-5 h-5 flex items-center justify-center font-black shrink-0 shadow-sm">
                                      {getPlayerNumber(pId) || '•'}
                                    </span>
                                    <span className="truncate text-slate-100 font-semibold text-xs">
                                      {getPlayerName(pId)}
                                    </span>
                                    {pirliStats.mvp === pId && (
                                      <span className="shrink-0 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[8px] px-1 py-0.2 rounded font-mono font-black uppercase tracking-tight scale-90">
                                        MVP
                                      </span>
                                    )}
                                  </div>

                                  {/* Performance indicators - Goals, Assists (A), Bookings directly grouped! */}
                                  <div className="flex items-center gap-1.5 shrink-0 scale-95 origin-right">
                                    {/* Goals */}
                                    {goalsCount > 0 && (
                                      <span className="flex items-center gap-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-black text-[9px] shrink-0" title={`${goalsCount} gol(a)`}>
                                        ⚽ <span className="text-[8px] font-mono font-black text-emerald-400 ml-0.5">x{goalsCount}</span>
                                      </span>
                                    )}
                                    
                                    {/* Assist Badge directly beside name so it is unified */}
                                    {assistsCount > 0 && (
                                      <span className="flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-black text-[9px] shrink-0" title={`${assistsCount} asistencija`}>
                                        <span className="text-[8px] text-blue-300 font-black font-mono">A</span>
                                        <span className="text-[8px] font-mono font-black text-blue-400">x{assistsCount}</span>
                                      </span>
                                    )}

                                    {/* Cards */}
                                    {hasYellow && (
                                      <span className="w-2.5 h-3.5 bg-yellow-450 bg-yellow-400 rounded-sm inline-block shrink-0 shadow" title="Žuti karton" />
                                    )}
                                    {hasRed && (
                                      <span className="w-2.5 h-3.5 bg-rose-500 rounded-sm inline-block shrink-0 shadow" title="Crveni karton" />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* OPPONENT Compact Simple Roster Roster list (User is not super interested in but details preserved) */}
                      {opponentStats && (
                        <div className="bg-[#1e293b]/5 rounded-xl border border-slate-800/80 p-3 space-y-1">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-1">
                            <h5 className="text-[10px] font-black uppercase font-mono text-slate-400 tracking-wider">
                              🛡️ {opponentTeamKey} SASTAV
                            </h5>
                          </div>

                          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                            {opponentStats.lineup.map((pId) => {
                              const goalsCount = getOpponentGoals(pId);
                              const hasYellow = getOpponentYellow(pId);
                              const hasRed = getOpponentRed(pId);

                              return (
                                <div key={pId} className="flex items-center justify-between py-1 border-b border-slate-800/10 text-slate-400">
                                  <span className="truncate text-slate-400 font-medium">
                                    {getPlayerName(pId)}
                                  </span>

                                  <div className="flex items-center gap-1 shrink-0 scale-90">
                                    {goalsCount > 0 && (
                                      <span className="text-[8px] font-bold text-slate-300">
                                        ⚽ x{goalsCount}
                                      </span>
                                    )}
                                    {hasYellow && (
                                      <span className="w-2 h-3 bg-yellow-400 rounded-xs shadow" />
                                    )}
                                    {hasRed && (
                                      <span className="w-2 h-3 bg-rose-500 rounded-xs shadow" />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    </div>

                  </div>
                );
              })()}

            </div>

            {/* Modal Bottom note */}
            <div className="bg-[#0B1220]/60 border-t border-slate-800 p-3 text-center text-[9px] text-slate-400 font-mono rounded-b-2xl">
              KMF Pirli Match Engine v2.0 · Sezona 2026/2027
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
