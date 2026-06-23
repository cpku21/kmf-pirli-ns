'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { ChevronLeft, RefreshCw, Activity, Calendar, Trophy, Zap, AlertCircle } from 'lucide-react';
import StandingsTable from '@/components/standings/StandingsTable.tsx';
import ResultFormatter from '@/components/home/RecentResults.tsx';
import TopScorersList from '@/components/home/TopScorers.tsx';

export default function LiveSeasonPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [standings, setStandings] = useState<any[]>([]);
  const [season, setSeason] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Poll standings data every 60 seconds
  const fetchLiveStandings = async (showLoadingReset = false) => {
    if (showLoadingReset) setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/standings?season=current');
      if (response.data) {
        setStandings(response.data.standings || []);
        setSeason(response.data.season || null);
      }
    } catch (err: any) {
      console.error('Greška pri učitavanju live tabele:', err.message);
      setError('Nije moguće učitati najnoviju tabelu uživo.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLiveStandings(true);

    // Set polling interval
    const interval = setInterval(() => {
      setIsRefreshing(true);
      fetchLiveStandings(false);
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    fetchLiveStandings(false);
  };

  // Find PIRLI specific details for quick stats
  const pirliRow = standings.find((row) => row.isPirli) || {
    position: 7,
    points: 24,
    played: 14,
    wins: 8,
    draws: 0,
    losses: 6,
    goalDifference: -4,
  };

  const seasonLabel = season
    ? `${season.name}, ${season.year} — ${season.competition}`
    : '30. Sezona, 2026 — II Liga Novi Sad';

  return (
    <div className="flex-grow flex flex-col bg-[#0B1220] pb-12 w-full text-white">
      {/* Page Header */}
      <div className="py-6 px-5 bg-[#111827] border-b border-slate-700/60 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-white uppercase tracking-tight">Uživo Sezona</h1>
            {/* Pulsing Dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
          </div>
        </div>

        <button
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="p-1.5 bg-[#1F2937]/60 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all border border-slate-700/40"
          title="Osveži tabelu"
          type="button"
        >
          <RefreshCw size={14} className={isRefreshing ? 'animate-spin text-blue-400' : ''} />
        </button>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* Season Description Tag */}
        <div className="bg-[#1F2937]/45 rounded-xl p-4 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest block font-mono">TRENUTNA SEZONA</span>
            <span className="text-sm font-black text-white block mt-0.5">{seasonLabel}</span>
          </div>
          <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded font-black font-mono">
            POLLING UKLJUČEN
          </span>
        </div>

        {/* PIRLI Quick Stats */}
        <div className="bg-gradient-to-br from-blue-600/15 to-blue-900/5 border border-blue-500/15 rounded-xl p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between border-b border-blue-500/10 pb-2">
            <span className="text-[10.5px] text-blue-400 font-extrabold tracking-wider uppercase flex items-center gap-1">
              <Zap size={12} /> Live Pozicija Pirlija
            </span>
            <span className="text-[10px] text-slate-400 font-bold font-mono">KMF PIRLI</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-[#111827]/60 rounded-lg py-2 border border-slate-800/40">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Pozicija</span>
              <span className="text-xl font-black text-white font-mono">{pirliRow.position}.</span>
            </div>
            <div className="bg-[#111827]/60 rounded-lg py-2 border border-slate-800/40">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Bodovi</span>
              <span className="text-xl font-black text-blue-400 font-mono">{pirliRow.points}</span>
            </div>
            <div className="bg-[#111827]/60 rounded-lg py-2 border border-slate-800/40">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Skor (P-N-I)</span>
              <span className="text-xs font-bold text-white font-mono block mt-1">
                {pirliRow.wins}P {pirliRow.draws}N {pirliRow.losses}I
              </span>
            </div>
            <div className="bg-[#111827]/60 rounded-lg py-2 border border-slate-800/40">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Razlika</span>
              <span className={`text-xl font-black font-mono ${pirliRow.goalDifference >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {pirliRow.goalDifference > 0 ? `+${pirliRow.goalDifference}` : pirliRow.goalDifference}
              </span>
            </div>
          </div>
        </div>

        {/* Live League Standings Table */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
            <Trophy size={14} className="text-blue-500" />
            Tabela i Rang-Lista Uživo
          </h2>

          {loading ? (
            <div className="text-center py-16 bg-[#1F2937]/30 border border-slate-800 rounded-xl">
              <RefreshCw size={24} className="animate-spin text-blue-500 mx-auto" />
              <p className="text-xs text-slate-400 mt-3 font-mono">Učitavanje trenutnih plasmana uživo...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle size={16} />
              <span className="text-xs font-bold">{error}</span>
            </div>
          ) : (
            <StandingsTable standings={standings.length > 0 ? standings : undefined} />
          )}
        </div>

        {/* Sledeća utakmica & Recent Results & Top Scorers widgets */}
        <div className="space-y-6 pt-2">
          {/* Recent results and scorers fallback lists widgets */}
          <ResultFormatter />
          <TopScorersList />
        </div>
      </div>
    </div>
  );
}
