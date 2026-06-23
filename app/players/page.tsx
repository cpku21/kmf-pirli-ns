import React from 'react';
import connectToDatabase from '@/lib/db/mongoose.tsx';
import Player from '@/lib/model/Player.tsx';
import PlayerFilter from '@/components/players/PlayerFilter.tsx';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const revalidate = 60; // Cache for 60 seconds

export default async function PlayersPage() {
  let players: any[] = [];

  try {
    await connectToDatabase();
    players = await Player.find({ isActive: true })
      .sort({ 'stats.goals': -1 })
      .lean();
  } catch (err) {
    console.error('Greška pri učitavanju igrača:', err);
  }

  // Format database players into plain objects for React
  let plainPlayers = players.map(p => ({
    name: p.name,
    slug: p.slug,
    number: p.number,
    position: p.position,
    photo: p.photo || '',
    stats: {
      goals: p.stats?.goals || 0,
      appearances: p.stats?.appearances || 0,
    }
  }));

  // Handcrafted fallback player profile rosters if the database hasn't been seeded yet
  if (plainPlayers.length === 0) {
    plainPlayers = [
      { name: 'Srdjan Popović', slug: 'srdjan-popovic', number: 10, position: 'Forward', photo: '', stats: { goals: 18, appearances: 14 } },
      { name: 'Nikola Milisavljević', slug: 'nikola-milisavljevic', number: 7, position: 'Midfielder', photo: '', stats: { goals: 12, appearances: 14 } },
      { name: 'Marko Juran', slug: 'marko-juran', number: 8, position: 'Midfielder', photo: '', stats: { goals: 9, appearances: 12 } },
      { name: 'Igor Pavlović', slug: 'igor-pavlovic', number: 9, position: 'Forward', photo: '', stats: { goals: 7, appearances: 13 } },
      { name: 'Milan Nedić', slug: 'milan-nedic', number: 5, position: 'Defender', photo: '', stats: { goals: 5, appearances: 11 } },
      { name: 'Stefan Lazarević', slug: 'stefan-lazarevic', number: 12, position: 'Goalkeeper', photo: '', stats: { goals: 0, appearances: 14 } },
      { name: 'Dragan Tošić', slug: 'dragan-tosic', number: 4, position: 'Defender', photo: '', stats: { goals: 3, appearances: 10 } },
      { name: 'Nemanja Vujić', slug: 'nemanja-vujic', number: 11, position: 'Forward', photo: '', stats: { goals: 4, appearances: 9 } },
    ];
  }

  return (
    <div className="flex-grow flex flex-col bg-[#0B1220] pb-12 w-full">
      {/* Page Header */}
      <div className="py-6 px-5 bg-[#111827] border-b border-slate-700/60 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-white uppercase tracking-tight">Igrači</h1>
            <span className="bg-blue-600/10 text-blue-400 border border-blue-650/20 px-2 py-0.5 rounded-full text-xs font-black font-mono">
              {plainPlayers.length}
            </span>
          </div>
        </div>
        <span className="text-[10px] bg-slate-800 text-slate-400 tracking-widest font-extrabold uppercase px-2 py-1 rounded">
          ROSTER
        </span>
      </div>

      {/* Main filter container */}
      <div className="px-4 mt-6">
        <PlayerFilter initialPlayers={plainPlayers} />
      </div>
    </div>
  );
}
