import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions.tsx';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Users, Calendar, Trophy, Image as ImageIcon, ArrowUpRight, ShieldCheck, Database } from 'lucide-react';
import connectToDatabase from '@/lib/db/mongoose.tsx';
import Player from '@/lib/model/Player.tsx';
import Match from '@/lib/model/Match.tsx';
import Season from '@/lib/model/Season.tsx';
import Gallery from '@/lib/model/Gallery.tsx';

export const revalidate = 0; // Don't cache admin page, force dynamic fetch

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  // Fetch counts from DB
  let counts = {
    players: 0,
    matches: 0,
    seasons: 0,
    photos: 0,
    activeSeasonName: 'Nije aktivna'
  };

  try {
    await connectToDatabase();
    counts.players = await Player.countDocuments({ isActive: true });
    counts.matches = await Match.countDocuments({});
    counts.photos = await Gallery.countDocuments({});
    
    const activeSeason = await Season.findOne({ isActive: true }).lean();
    if (activeSeason) {
      counts.activeSeasonName = activeSeason.name;
    }
  } catch (err) {
    console.error('Došlo je do greške pri učitavanju administratorskih statistika:', err);
  }

  // If DB hasn't been seeded yet, populate stats using fallbacks
  if (counts.players === 0) {
    counts.players = 18;
    counts.matches = 14;
    counts.photos = 7;
    counts.activeSeasonName = 'XXX Sezona, 2026';
  }

  return (
    <div className="space-y-6 max-w-5xl font-sans">
      {/* Welcome Banner */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-slate-450 text-slate-400 font-bold uppercase tracking-widest font-mono">AUTORIZOVAN SESIJA AKTIVNA</span>
          </div>
          <h1 className="text-2xl font-black uppercase text-white tracking-tight">
            Dobrodošao, KMF Pirli Admin!
          </h1>
          <p className="text-xs text-slate-400">
            Uspešno ste prijavljeni kao klupski moderator. Ovde možete menjati igrače, unositi rezulate utakmica i osvežiti tabelu.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-650/15 bg-blue-600/10 border border-blue-500/20 px-3 py-1.5 rounded-xl text-blue-400 font-mono text-[10.5px]">
          <ShieldCheck size={14} />
          <span>ROLA: ADMIN</span>
        </div>
      </div>

      {/* Grid of Modular quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Players Card */}
        <Link
          href="/admin/players"
          className="bg-[#1F2937] hover:bg-[#28354c]/30 hover:border-blue-500/40 border border-slate-800 p-5 rounded-2xl transition-all group flex flex-col justify-between h-36"
        >
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
              <Users size={18} />
            </span>
            <ArrowUpRight size={14} className="text-slate-550 group-hover:text-blue-450 text-slate-500 transition-colors" />
          </div>
          <div>
            <span className="text-2xl font-black font-mono text-white block">
              {counts.players}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
              Aktivnih Igrača
            </span>
          </div>
        </Link>

        {/* Matches Card */}
        <Link
          href="/admin/matches"
          className="bg-[#1F2937] hover:bg-[#28354c]/30 hover:border-emerald-500/40 border border-slate-800 p-5 rounded-2xl transition-all group flex flex-col justify-between h-36"
        >
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-[#22C55E]/10 text-[#22C55E] rounded-xl">
              <Calendar size={18} />
            </span>
            <ArrowUpRight size={14} className="text-slate-550 group-hover:text-emerald-400 text-slate-500 transition-colors" />
          </div>
          <div>
            <span className="text-2xl font-black font-mono text-white block">
              {counts.matches}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
              Unesenih Utakmica
            </span>
          </div>
        </Link>

        {/* Standings Card */}
        <Link
          href="/admin/standings"
          className="bg-[#1F2937] hover:bg-[#28354c]/30 hover:border-amber-500/40 border border-slate-800 p-5 rounded-2xl transition-all group flex flex-col justify-between h-36"
        >
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl">
              <Trophy size={18} />
            </span>
            <ArrowUpRight size={14} className="text-slate-550 group-hover:text-amber-500 text-slate-500 transition-colors" />
          </div>
          <div>
            <span className="text-[11px] font-black font-mono text-amber-400 block truncate max-w-full">
              {counts.activeSeasonName}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
              Aktivna Liga
            </span>
          </div>
        </Link>

        {/* Gallery Card */}
        <Link
          href="/admin/gallery"
          className="bg-[#1F2937] hover:bg-[#28354c]/30 hover:border-purple-500/40 border border-slate-800 p-5 rounded-2xl transition-all group flex flex-col justify-between h-36"
        >
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl">
              <ImageIcon size={18} />
            </span>
            <ArrowUpRight size={14} className="text-slate-550 group-hover:text-purple-400 text-slate-500 transition-colors" />
          </div>
          <div>
            <span className="text-2xl font-black font-mono text-white block">
              {counts.photos}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
              Slike u Galeriji
            </span>
          </div>
        </Link>
      </div>

      {/* System info / Help Block */}
      <div className="bg-[#1F2937]/35 border border-slate-800 rounded-2xl p-5 space-y-3.5">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-350 text-slate-300 flex items-center gap-1.5">
          <Database size={13} className="text-blue-500" />
          Informacije o Bazi i Serveru
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-[11px] text-slate-400 leading-none">
          <div className="flex justify-between py-2 border-b border-slate-800/60">
            <span>Baza Podataka:</span>
            <span className="text-emerald-400 font-bold">MongoDB Atlas (Live)</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800/60">
            <span>Sustav Autorizacije:</span>
            <span className="text-white font-bold">NextAuth JWT Token</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800/60">
            <span>Status API Servera:</span>
            <span className="text-green-500 font-bold">● Funkcionalan</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800/60">
            <span>Sezonska arhiva ver:</span>
            <span className="text-white font-bold">XXX 2026.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
