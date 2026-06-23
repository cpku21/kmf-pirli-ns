import React from 'react';
import Link from 'next/link';

interface PlayerCardProps {
  key?: any;
  player: {
    name: string;
    slug: string;
    number: number;
    position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward' | string;
    photo?: string;
    stats: {
      goals: number;
      appearances: number;
    };
  };
}

export default function PlayerCard({ player }: PlayerCardProps) {
  // Translate position to Serbian label
  const getPositionLabel = (pos: string) => {
    switch (pos) {
      case 'Goalkeeper':
        return 'Golman';
      case 'Defender':
        return 'Odbrana';
      case 'Midfielder':
        return 'Vezni';
      case 'Forward':
        return 'Napad';
      default:
        return pos;
    }
  };

  // Get position-based styling classes
  const getPositionClasses = (pos: string) => {
    switch (pos) {
      case 'Goalkeeper':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'Defender':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'Midfielder':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'Forward':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border border-slate-500/30';
    }
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <Link
      id={`player-card-${player.slug}`}
      href={`/players/${player.slug}`}
      className="group block bg-[#1F2937] border border-slate-705 border-slate-700/65 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-200 shadow-lg"
    >
      {/* Top Photo Section (aspect-[3/4]) */}
      <div className="relative aspect-[3/4] w-full bg-[#111827] flex items-center justify-center overflow-hidden">
        {player.photo ? (
          <img
            src={player.photo}
            alt={player.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-slate-600 tracking-tight font-mono">
              {getInitials(player.name)}
            </span>
          </div>
        )}

        {/* Big jersey number absolute backdrop */}
        <span className="absolute top-3 right-3 text-6xl font-black text-white/10 select-none pointer-events-none font-mono">
          {player.number}
        </span>
      </div>

      {/* Bottom info section */}
      <div className="p-4 space-y-2">
        <h3 className="font-extrabold text-white text-sm tracking-tight truncate">
          {player.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${getPositionClasses(player.position)}`}>
            {getPositionLabel(player.position)}
          </span>
          <span className="text-xs font-black text-slate-400/90 font-mono">
            #{player.number}
          </span>
        </div>

        {/* Stats Row */}
        <div className="flex items-center space-x-3 pt-1 border-t border-slate-800/60 text-slate-400 text-xs font-semibold">
          <span className="flex items-center gap-1">
            <span className="text-blue-500">⚽</span> {player.stats.goals} {player.stats.goals === 1 ? 'gol' : 'gola'}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-blue-550 text-blue-400">📋</span> {player.stats.appearances} {player.stats.appearances === 1 ? 'nastup' : 'nastupa'}
          </span>
        </div>
      </div>
    </Link>
  );
}
