import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Trophy, Users, Tv, BarChart3, History, Image as ImageIcon, Settings, Shield } from 'lucide-react';

interface HeroSectionProps {
  nextMatch?: any;
}

export default function HeroSection({ nextMatch }: HeroSectionProps) {
  // Format Serbian date
  const formatDate = (dateStr?: string | Date) => {
    if (!dateStr) return '23. jun 2026.';
    const date = new Date(dateStr);
    return date.toLocaleDateString('sr-RS', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateStr?: string | Date) => {
    if (!dateStr) return '19:00';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('sr-RS', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const opponent = nextMatch?.opponent || 'Vitorog PROMET';
  const matchDateFormatted = nextMatch ? formatDate(nextMatch.date) : '23. jun 2026.';
  const matchTimeFormatted = nextMatch ? formatTime(nextMatch.date) : '19:00';
  const venue = nextMatch?.venue || 'SC Hattrick, I teren 5+1';

  return (
    <div id="home-hero-section" className="w-full bg-[#111827] border-b border-slate-800/80 py-6 px-4 font-sans">
      <div className="max-w-md mx-auto space-y-4">
        
        {/* Compact Branding Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="bg-[#0B1220]/80 p-1 rounded-lg border border-slate-800 flex items-center justify-center shrink-0">
              <Image
                src="https://minifudbalsrbije.rs/wp-content/uploads/2023/01/Pirli-logo-transparentni.png"
                alt="Pirli Logo"
                width={28}
                height={28}
                referrerPolicy="no-referrer"
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xs font-black text-white tracking-widest uppercase leading-none">
                KMF PIRLI
              </h1>
              <p className="text-[9px] text-slate-450 text-slate-400 font-bold tracking-widest font-mono uppercase mt-0.5">
                Novi Sad · II Liga NS
              </p>
            </div>
          </div>
          <div>
            <span className="text-[9px] bg-blue-600/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-black font-mono tracking-widest uppercase">
              2026
            </span>
          </div>
        </div>

        {/* Sledeća Utakmica Card */}
        <div className="bg-gradient-to-br from-[#1F2937]/90 to-[#111827]/95 border border-slate-700/60 rounded-2xl p-4.5 p-5 shadow-lg relative overflow-hidden backdrop-blur-sm">
          {/* Subtle glow effect */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>

          {/* Card Meta Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-600/10 text-blue-400 border border-blue-500/20 text-[9px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider font-mono">
              Sledeće Kolo
            </span>
            <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold font-mono uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              PRVENSTVO
            </div>
          </div>

          {/* VS Matchup graphic */}
          <div className="grid grid-cols-7 items-center text-center py-1">
            {/* Owner Club: KMF Pirli */}
            <div className="col-span-3 flex flex-col items-center gap-1.5 min-w-0">
              <div className="w-11 h-11 bg-[#0B1220]/80 rounded-full border border-slate-800 flex items-center justify-center p-1.5 shrink-0 shadow">
                <Image
                  src="https://minifudbalsrbije.rs/wp-content/uploads/2023/01/Pirli-logo-transparentni.png"
                  alt="Pirli logo"
                  width={28}
                  height={28}
                  referrerPolicy="no-referrer"
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-extrabold text-white uppercase tracking-wider truncate w-full px-1">
                Pirli
              </span>
            </div>

            {/* Middle decorative spacer */}
            <div className="col-span-1 flex flex-col items-center justify-center select-none">
              <div className="w-6.5 h-6.5 w-6 h-6 rounded-full bg-[#0B1220] border border-slate-700/50 flex items-center justify-center shadow">
                <span className="text-[8px] font-black font-mono text-blue-400">VS</span>
              </div>
            </div>

            {/* Away Club (Opponent) */}
            <div className="col-span-3 flex flex-col items-center gap-1.5 min-w-0">
              <div className="w-11 h-11 bg-[#0B1220]/80 rounded-full border border-slate-800 flex items-center justify-center text-blue-400 shrink-0 shadow">
                <Shield size={18} className="stroke-[2.5]" />
              </div>
              <span className="text-xs font-extrabold text-slate-200 uppercase tracking-wider truncate w-full px-1" title={opponent}>
                {opponent}
              </span>
            </div>
          </div>

          {/* Date / Location Info Row */}
          <div className="mt-4 pt-3.5 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">
            <div className="flex items-center gap-1.5 bg-[#0B1220]/60 px-2 py-1.5 rounded border border-slate-800/40">
              <Calendar size={11} className="text-blue-500 shrink-0" />
              <span className="truncate">{matchDateFormatted} • {matchTimeFormatted}h</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0B1220]/60 px-2 py-1.5 rounded border border-slate-800/40">
              <MapPin size={11} className="text-blue-500 shrink-0" />
              <span className="truncate" title={venue}>{venue}</span>
            </div>
          </div>
        </div>

        {/* Quick Menu Bento Links */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          <Link
            href="/matches"
            className="flex flex-col items-center justify-center py-2 pb-1.5 px-0.5 bg-[#1F2937]/35 border border-slate-800/70 hover:bg-[#1f2937]/60 hover:border-slate-700 rounded-xl transition-all group"
          >
            <Calendar size={16} className="text-blue-500 mb-1 group-hover:scale-110 transition-transform duration-150" />
            <span className="text-[8px] font-bold text-slate-400 font-mono uppercase tracking-wider text-center">Utakmice</span>
          </Link>
          
          <Link
            href="/standings"
            className="flex flex-col items-center justify-center py-2 pb-1.5 px-0.5 bg-[#1F2937]/35 border border-slate-800/70 hover:bg-[#1f2937]/60 hover:border-slate-700 rounded-xl transition-all group"
          >
            <Trophy size={16} className="text-yellow-500 mb-1 group-hover:scale-110 transition-transform duration-150" />
            <span className="text-[8px] font-bold text-slate-400 font-mono uppercase tracking-wider text-center">Tabela</span>
          </Link>
          
          <Link
            href="/players"
            className="flex flex-col items-center justify-center py-2 pb-1.5 px-0.5 bg-[#1F2937]/35 border border-slate-800/70 hover:bg-[#1f2937]/60 hover:border-slate-700 rounded-xl transition-all group"
          >
            <Users size={16} className="text-emerald-500 mb-1 group-hover:scale-110 transition-transform duration-150" />
            <span className="text-[8px] font-bold text-slate-400 font-mono uppercase tracking-wider text-center">Igrači</span>
          </Link>

          <Link
            href="/live"
            className="flex flex-col items-center justify-center py-2 pb-1.5 px-0.5 bg-[#1F2937]/35 border border-slate-800/70 hover:bg-[#1f2937]/60 hover:border-slate-700 rounded-xl transition-all group relative overflow-hidden"
          >
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            <Tv size={16} className="text-purple-500 mb-1 group-hover:scale-110 transition-transform duration-150" />
            <span className="text-[8px] font-bold text-slate-400 font-mono uppercase tracking-wider text-center">Uživo</span>
          </Link>

          <Link
            href="/statistics"
            className="flex flex-col items-center justify-center py-2 pb-1.5 px-0.5 bg-[#1F2937]/35 border border-slate-800/70 hover:bg-[#1f2937]/60 hover:border-slate-700 rounded-xl transition-all group"
          >
            <BarChart3 size={16} className="text-amber-500 mb-1 group-hover:scale-110 transition-transform duration-150" />
            <span className="text-[8px] font-bold text-slate-400 font-mono uppercase tracking-wider text-center">Statistika</span>
          </Link>

          <Link
            href="/history"
            className="flex flex-col items-center justify-center py-2 pb-1.5 px-0.5 bg-[#1F2937]/35 border border-slate-800/70 hover:bg-[#1f2937]/60 hover:border-slate-700 rounded-xl transition-all group"
          >
            <History size={16} className="text-indigo-400 mb-1 group-hover:scale-110 transition-transform duration-150" />
            <span className="text-[8px] font-bold text-slate-400 font-mono uppercase tracking-wider text-center">Istorija</span>
          </Link>

          <Link
            href="/gallery"
            className="flex flex-col items-center justify-center py-2 pb-1.5 px-0.5 bg-[#1F2937]/35 border border-slate-800/70 hover:bg-[#1f2937]/60 hover:border-slate-700 rounded-xl transition-all group"
          >
            <ImageIcon size={16} className="text-teal-400 mb-1 group-hover:scale-110 transition-transform duration-150" />
            <span className="text-[8px] font-bold text-slate-400 font-mono uppercase tracking-wider text-center">Galerija</span>
          </Link>

          <Link
            href="/admin"
            className="flex flex-col items-center justify-center py-2 pb-1.5 px-0.5 bg-[#1F2937]/35 border border-slate-800/70 hover:bg-[#1f2937]/60 hover:border-slate-700 rounded-xl transition-all group"
          >
            <Settings size={16} className="text-slate-400 mb-1 group-hover:rotate-45 transition-transform duration-350" />
            <span className="text-[8px] font-bold text-slate-400 font-mono uppercase tracking-wider text-center">Admin</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
