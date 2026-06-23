import React from 'react';
import PlayerCard from '@/components/players/PlayerCard.tsx';

interface Player {
  name: string;
  slug: string;
  number: number;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward' | string;
  photo?: string;
  stats: {
    goals: number;
    appearances: number;
  };
}

interface PlayerGridProps {
  players: Player[];
}

export default function PlayerGrid({ players }: PlayerGridProps) {
  if (players.length === 0) {
    return (
      <div className="text-center py-12 bg-[#1F2937]/35 rounded-xl border border-dashed border-slate-700/60 p-6">
        <span className="text-3xl">👥</span>
        <h3 className="mt-2 text-sm font-extrabold text-white uppercase tracking-tight">Nema rezultata</h3>
        <p className="text-xs text-slate-400 mt-1">Nije pronađen nijedan igrač pretrage.</p>
      </div>
    );
  }

  return (
    <div id="players-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {players.map((player) => (
        <PlayerCard key={player.slug} player={player} />
      ))}
    </div>
  );
}
