import React from 'react';
import Link from 'next/link';

interface Scorer {
  name: string;
  slug: string;
  photo?: string;
  goals: number;
  appearances: number;
}

interface TopScorersProps {
  scorers?: Scorer[];
}

export default function TopScorers({ scorers }: TopScorersProps) {
  const defaultScorers: Scorer[] = [
    { name: 'Srdjan Popović', slug: 'srdjan-popovic', goals: 18, appearances: 14 },
    { name: 'Nikola Milisavljević', slug: 'nikola-milisavljevic', goals: 12, appearances: 14 },
    { name: 'Marko Juran', slug: 'marko-juran', goals: 9, appearances: 12 },
    { name: 'Igor Pavlović', slug: 'igor-pavlovic', goals: 7, appearances: 13 },
    { name: 'Milan Nedić', slug: 'milan-nedic', goals: 5, appearances: 11 },
  ];

  const players = scorers && scorers.length > 0 ? scorers.slice(0, 5) : defaultScorers;

  // Function to extract initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div id="home-top-scorers" className="space-y-3">
      <h2 className="text-lg font-black text-white uppercase tracking-tight">
        Top Strelci
      </h2>

      <div className="bg-[#1F2937] rounded-xl border border-slate-705 border-slate-700/60 overflow-hidden shadow-sm divide-y divide-slate-800">
        {players.map((player, index) => (
          <Link
            key={player.slug}
            href={`/players/${player.slug}`}
            className="flex items-center justify-between p-4 bg-[#1F2937] hover:bg-[#374151] transition-all duration-150"
          >
            <div className="flex items-center gap-3">
              {/* Avatar position index badge */}
              <span className="text-xs font-mono font-bold text-slate-500 w-4 text-center">
                {index + 1}.
              </span>

              {/* Avatar Photo or initials */}
              {player.photo ? (
                <div className="relative w-10 h-10 rounded-full border border-slate-700 overflow-hidden shrink-0">
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full border border-slate-705 bg-slate-800 flex items-center justify-center shrink-0">
                  <span className="text-xs font-extrabold text-blue-400 font-mono">
                    {getInitials(player.name)}
                  </span>
                </div>
              )}

              {/* Name and context */}
              <div>
                <span className="font-extrabold text-white text-xs block hover:text-blue-400 transition-colors">
                  {player.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide block">
                  Nastupa: {player.appearances}
                </span>
              </div>
            </div>

            {/* Goals badge */}
            <div className="flex items-center gap-1 bg-blue-600/10 text-blue-400 border border-blue-500/25 px-3 py-1 rounded-lg">
              <span className="text-[10px] font-black font-mono">⚽</span>
              <span className="text-xs font-black font-mono">{player.goals}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
