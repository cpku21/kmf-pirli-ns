import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions.tsx';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/db/mongoose.tsx';
import Player from '@/lib/model/Player.tsx';
import { Users, Plus, Edit2, Trash2, ShieldAlert } from 'lucide-react';

export const revalidate = 0; // force dynamic rendering

export default async function AdminPlayersPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/admin/login');
  }

  let dbPlayers: any[] = [];
  try {
    await connectToDatabase();
    dbPlayers = await Player.find({}).sort({ name: 1 }).lean();
  } catch (err) {
    console.error('Greška pri učitavanju igrača u adminu:', err);
  }

  // Fallback players roster if MongoDB is still empty
  let playersList = dbPlayers.map((p) => ({
    _id: p._id.toString(),
    name: p.name,
    number: p.number,
    position: p.position,
    photo: p.photo || '',
    isActive: p.isActive,
    stats: p.stats || { goals: 0, appearances: 0 }
  }));

  if (playersList.length === 0) {
    playersList = [
      { _id: 'mock-1', name: 'Srdjan Popović', number: 10, position: 'Forward', photo: '', isActive: true, stats: { goals: 18, appearances: 14 } },
      { _id: 'mock-2', name: 'Nikola Milisavljević', number: 7, position: 'Midfielder', photo: '', isActive: true, stats: { goals: 12, appearances: 14 } },
      { _id: 'mock-3', name: 'Marko Juran', number: 8, position: 'Midfielder', photo: '', isActive: true, stats: { goals: 9, appearances: 12 } },
      { _id: 'mock-4', name: 'Stefan Lazarević', number: 12, position: 'Goalkeeper', photo: '', isActive: true, stats: { goals: 0, appearances: 14 } },
    ];
  }

  return (
    <div className="space-y-6 max-w-5xl font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-black uppercase text-white tracking-tight flex items-center gap-2">
            <Users size={22} className="text-blue-500" />
            Upravljanje Igračima
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ovde možete videti spisak, dodavati nove i menjati statistiku postojećih igrača kluba.
          </p>
        </div>
        <button
          className="px-4 py-2.5 bg-blue-650/15 bg-blue-600 border border-blue-500/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          type="button"
        >
          <Plus size={14} /> Dodaj Novog Igrača
        </button>
      </div>

      {/* Players List Table representation */}
      <div className="bg-[#1f2937]/50 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-350 text-slate-350">
            <thead>
              <tr className="bg-[#111827] text-[10px] text-slate-400 font-extrabold uppercase tracking-wider font-mono border-b border-slate-800">
                <th className="px-5 py-3 text-center w-12">Broj</th>
                <th className="px-5 py-3">Ime i Prezime</th>
                <th className="px-5 py-3">Pozicija</th>
                <th className="px-5 py-3 text-center">Nastupi</th>
                <th className="px-5 py-3 text-center text-emerald-400">Golovi</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-center w-28">Akcije</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {playersList.map((player) => (
                <tr key={player._id} className="hover:bg-slate-800/10 transition-colors">
                  <td className="px-5 py-4 text-center font-mono font-black text-blue-400 text-sm">
                    #{player.number}
                  </td>
                  <td className="px-5 py-4 font-bold text-white">
                    {player.name}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                      {player.position}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center font-mono">
                    {player.stats?.appearances || 0}
                  </td>
                  <td className="px-5 py-4 text-center font-mono font-bold text-emerald-400">
                    {player.stats?.goals || 0}
                  </td>
                  <td className="px-5 py-4 text-center">
                    {player.isActive ? (
                      <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded uppercase font-mono font-bold">
                        AKTIVAN
                      </span>
                    ) : (
                      <span className="text-[9px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded uppercase font-mono font-bold">
                        NEAKTIVAN
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 hover:text-white rounded transition-colors text-slate-300"
                        title="Uredi"
                        type="button"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        className="p-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-600 hover:text-white rounded transition-colors"
                        title="Ukloni"
                        type="button"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guide Card */}
      <div className="bg-[#111827]/40 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
        <ShieldAlert size={16} className="text-blue-500 mt-0.5 shrink-0" />
        <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
          NAPOMENA: Sve kreacije se direktno upisuju u MongoDB Atlas produkcionu bazu. Možete otvoriti i admin API rute za testiranje izvan standardnog interfejsa.
        </p>
      </div>
    </div>
  );
}
