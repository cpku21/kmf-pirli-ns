import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Info, Trophy } from 'lucide-react';
import connectToDatabase from '@/lib/db/mongoose.tsx';
import Season from '@/lib/model/Season.tsx';
import Standing from '@/lib/model/Standing.tsx';
import StandingsTable from '@/components/standings/StandingsTable.tsx';

export const revalidate = 60; // cached for 60 seconds

export default async function StandingsPage() {
  let activeSeason: any = null;
  let standingRows: any[] = [];

  try {
    await connectToDatabase();
    activeSeason = await Season.findOne({ isActive: true }).lean();
    if (!activeSeason) {
      activeSeason = await Season.findOne({}).sort({ year: -1 }).lean();
    }

    if (activeSeason) {
      standingRows = await Standing.find({ season: activeSeason._id })
        .sort({ position: 1 })
        .lean();
    }
  } catch (err) {
    console.error('Došlo je do greške pri učitavanju tabele sezone:', err);
  }

  // Format Standings Rows
  const plainStandings = standingRows.map((row) => ({
    position: row.position,
    team: row.team,
    isPirli: row.isPirli,
    played: row.played,
    wins: row.wins,
    draws: row.draws,
    losses: row.losses,
    goalsFor: row.goalsFor,
    goalsAgainst: row.goalsAgainst,
    goalDifference: row.goalDifference,
    points: row.points,
    form: row.form || [],
  }));

  const activeSeasonName = activeSeason?.name || '30. SEZONA NOVI SAD';
  const activeSeasonComp = activeSeason?.competition || 'II LIGA NOVI SAD';

  return (
    <div className="flex-grow flex flex-col bg-[#0B1220] pb-12 w-full text-white">
      {/* Header */}
      <div className="py-6 px-5 bg-[#111827] border-b border-slate-700/60 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-black text-white uppercase tracking-tight">Tabela Lige</h1>
          </div>
        </div>
        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 tracking-wider font-extrabold uppercase px-2 py-1 rounded">
          {activeSeasonComp}
        </span>
      </div>

      {/* Main Table Screen Layout */}
      <div className="px-4 mt-6 space-y-4">
        {/* Season Description Tag */}
        <div className="bg-[#1F2937]/50 rounded-xl p-4 border border-slate-800 flex items-start gap-3">
          <Trophy size={18} className="text-amber-500 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <h3 className="text-xs font-black uppercase text-white">{activeSeasonName}</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Zvanični plasman timova u Meridianbet minifudbal ligi Novog Sada. Prvoplasirana ekipa obezbeđuje direktan plasman u viši rang takmičenja, dok poslednje tri ispadaju u nižu diviziju.
            </p>
          </div>
        </div>

        {/* Live League Standings Component */}
        <StandingsTable standings={plainStandings.length > 0 ? plainStandings : undefined} />

        {/* Legend */}
        <div className="flex flex-col sm:flex-row justify-between text-[11px] text-slate-500 gap-2 font-mono px-1">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <span><strong>OU</strong>: Odigrane utakmice</span>
            <span><strong>P</strong>: Pobede</span>
            <span><strong>N</strong>: Nerešene</span>
            <span><strong>I</strong>: Izgubljene</span>
          </div>
          <div>
            <span><strong>GR</strong>: Gol razlika</span>
          </div>
        </div>
      </div>
    </div>
  );
}
