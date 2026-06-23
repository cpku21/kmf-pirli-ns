import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Star, Trophy, Flag, Calendar, Circle } from 'lucide-react';
import connectToDatabase from '@/lib/db/mongoose.tsx';
import ClubHistory from '@/lib/model/ClubHistory.tsx';

export const revalidate = 120; // cached for 120 seconds

interface ClubHistoryItem {
  year: number;
  title: string;
  description: string;
  type: 'founding' | 'achievement' | 'milestone' | 'season' | 'other';
  order: number;
}

export default async function HistoryPage() {
  let dbHistory: any[] = [];

  try {
    await connectToDatabase();
    dbHistory = await ClubHistory.find({})
      .sort({ order: 1, year: 1 })
      .lean();
  } catch (err) {
    console.error('Došlo je do greške pri učitavanju istorijskih zapisa:', err);
  }

  const plainHistory = dbHistory.map((item) => ({
    year: item.year,
    title: item.title,
    description: item.description,
    type: item.type,
    order: item.order,
  }));

  // Handcrafted premium fallback historical records in Serbian if MongoDB is unseeded.
  const historyList: ClubHistoryItem[] = plainHistory.length > 0 ? plainHistory : [
    { year: 2011, type: 'founding', title: 'Osnivanje kluba', description: 'Grupa entuzijasta i drugara iz Novog Sada okuplja se i zvanično osniva KMF Pirli. Početak jedne velike futsal avanture.', order: 1 },
    { year: 2015, type: 'milestone', title: 'Ulazak u zvaničan sistem', description: 'Nakon godina rekreativnog igranja turnira, klub zvanično konkuriše i pristupa regularnom takmičarskom sistemu minifudbala.', order: 2 },
    { year: 2019, type: 'achievement', title: 'Prvi veliki trofej', description: 'Osvajanje Kupa Novog Sada u dramatičnoj završnici penal serije. Ekipa dokazuje da poseduje kvalitet za najveće ciljeve.', order: 3 },
    { year: 2022, type: 'season', title: 'Pristupanje II Ligi', description: 'Promocija u drugu diviziju Novog Sada. Sezonu završavamo kao četvrti i obezbeđujemo stabilno mesto u takmičenju.', order: 4 },
    { year: 2525, type: 'achievement', title: 'Vicešampioni Meridianbet Lige', description: 'Istorijski uspeh i plasman na drugo mesto u ligi, sa tek 3 poraza i najboljom odbranom u celom novosadskom takmičenju.', order: 5 },
    { year: 2026, type: 'other', title: 'Modernizacija i Jubilej', description: 'Proslava 15 godina postojanja sa novim klupskim logom i modernizacijom digitalne platforme za najvernije navijače.', order: 6 },
  ];

  // Helper to map event type to Lucide Icon
  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'founding':
        return <Star size={14} className="text-yellow-500" />;
      case 'achievement':
        return <Trophy size={14} className="text-amber-500 animate-pulse" />;
      case 'milestone':
        return <Flag size={14} className="text-emerald-500" />;
      case 'season':
        return <Calendar size={14} className="text-blue-500" />;
      default:
        return <Circle size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="flex-grow flex flex-col bg-[#0B1220] pb-12 w-full text-white">
      {/* Page Header */}
      <div className="py-6 px-5 bg-[#111827] border-b border-slate-700/60 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-xl font-black text-white uppercase tracking-tight">Klupska Istorija</h1>
        </div>
        <span className="text-[10px] bg-blue-600/10 border border-blue-500/20 text-blue-400 font-extrabold uppercase px-2 py-1 rounded">
          ISTORIJA
        </span>
      </div>

      {/* Narrative Section Header */}
      <div className="px-5 mt-6 font-sans">
        <p className="text-xs text-slate-450 leading-relaxed text-slate-400">
          Upoznajte put tima KMF Pirli od novosadskih lokalnih betonskih terena do respektabilne tekuće druge divizije novosadskog minifudbala. Dosledni borbenom duhu i fer-plej igri od 2011. godine.
        </p>
      </div>

      {/* Custom Vertical Timeline Block */}
      <div className="px-5 mt-8 relative">
        {/* Left vertical timeline pipe */}
        <div className="absolute left-[85px] top-2 bottom-2 w-0.5 bg-slate-800" />

        <div className="space-y-8 relative">
          {historyList.map((item, index) => (
            <div key={index} className="flex gap-4">
              {/* Left Column: Year */}
              <div className="w-16 text-right shrink-0">
                <span className="text-lg font-black text-blue-400 font-mono block">
                  {item.year}
                </span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">
                  godina
                </span>
              </div>

              {/* Center Dot with type-specific icon wrapping */}
              <div className="relative z-10 w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                {getTimelineIcon(item.type)}
              </div>

              {/* Right Column: Narrative Panel */}
              <div className="flex-grow bg-[#1F2937]/50 rounded-xl p-4 border border-slate-800/60 shadow-sm space-y-1">
                <h3 className="font-extrabold text-sm text-white uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
