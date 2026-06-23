import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import connectToDatabase from '@/lib/db/mongoose.tsx';
import Match from '@/lib/model/Match.tsx';
import MatchFilter from '@/components/matches/MatchFilter.tsx';

export const revalidate = 30; // validate every 30s

export default async function MatchesPage() {
  let dbMatches: any[] = [];

  try {
    await connectToDatabase();
    dbMatches = await Match.find({})
      .sort({ date: -1 })
      .lean();
  } catch (err) {
    console.error('Došlo je do greške pri učitavanju utakmica:', err);
  }

  // Format MongoDB documents for React safety
  let plainMatches = dbMatches.map((m) => ({
    _id: m._id.toString(),
    opponent: m.opponent,
    isHome: m.isHome,
    date: m.date instanceof Date ? m.date.toISOString() : m.date,
    competition: m.competition || 'II Liga Novi Sad',
    venue: m.venue || 'SC Hattrick, I teren 5+1',
    pirliScore: m.pirliScore,
    opponentScore: m.opponentScore,
    result: m.result,
  }));

  // Handcrafted premium fallback match database if MongoDB hasn't been seeded yet
  if (plainMatches.length === 0) {
    plainMatches = [
      // Upcoming
      { _id: 'future-1', opponent: 'Vitorog PROMET', isHome: false, date: '2026-06-23T19:00:00.000Z', competition: 'II Liga Novi Sad', venue: 'SC Hattrick, I teren 5+1', pirliScore: null, opponentScore: null, result: null },
      { _id: 'future-2', opponent: 'Milenijum II', isHome: true, date: '2026-06-30T21:00:00.000Z', competition: 'II Liga Novi Sad', venue: 'SC Hattrick, II teren 5+1', pirliScore: null, opponentScore: null, result: null },
      // Completed / Played
      { _id: 'past-1', opponent: 'KORVEX', isHome: false, date: '2026-06-19T18:30:00.000Z', competition: 'II Liga Novi Sad', venue: 'SC Hattrick, I teren 5+1', pirliScore: 3, opponentScore: 8, result: 'L' },
      { _id: 'past-2', opponent: 'CODOLIS', isHome: false, date: '2026-05-20T20:00:00.000Z', competition: 'II Liga Novi Sad', venue: 'SC Hattrick, I teren 5+1', pirliScore: 5, opponentScore: 3, result: 'W' },
      { _id: 'past-3', opponent: 'GRADITELJ NS', isHome: false, date: '2026-04-29T19:00:00.000Z', competition: 'II Liga Novi Sad', venue: 'SC Hattrick, II teren 5+1', pirliScore: 8, opponentScore: 7, result: 'W' },
      { _id: 'past-4', opponent: 'BLACK STAR', isHome: false, date: '2026-04-21T21:15:00.000Z', competition: 'II Liga Novi Sad', venue: 'SC Hattrick, I teren 5+1', pirliScore: 5, opponentScore: 10, result: 'L' },
      { _id: 'past-5', opponent: 'MILENIJUM', isHome: true, date: '2026-03-29T18:00:00.000Z', competition: 'II Liga Novi Sad', venue: 'SC Hattrick, I teren 5+1', pirliScore: 1, opponentScore: 5, result: 'L' },
    ];
  }

  return (
    <div className="flex-grow flex flex-col bg-[#0B1220] pb-12 w-full text-white">
      {/* Page Header */}
      <div className="py-6 px-5 bg-[#111827] border-b border-slate-700/60 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-xl font-black text-white uppercase tracking-tight">Klupske Utakmice</h1>
        </div>
        <span className="text-[10px] bg-blue-600/10 border border-blue-500/20 text-blue-400 tracking-wider font-extrabold uppercase px-2 py-1 rounded">
          MEČEVI
        </span>
      </div>

      {/* Main filterable list content */}
      <div className="px-4 mt-6">
        <MatchFilter initialMatches={plainMatches} />
      </div>
    </div>
  );
}
