'use client';

import React, { useState, useMemo } from 'react';
import PlayerGrid from '@/components/players/PlayerGrid.tsx';
import { Search } from 'lucide-react';

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

interface PlayerFilterProps {
  initialPlayers: Player[];
}

export default function PlayerFilter({ initialPlayers }: PlayerFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'>('all');

  const tabs = [
    { id: 'all', label: 'Svi' },
    { id: 'Goalkeeper', label: 'Golman' },
    { id: 'Defender', label: 'Odbrana' },
    { id: 'Midfielder', label: 'Vezni' },
    { id: 'Forward', label: 'Napad' },
  ] as const;

  const filteredPlayers = useMemo(() => {
    return initialPlayers.filter((player) => {
      // 1. Position match
      const positionMatch = activeTab === 'all' || player.position === activeTab;
      
      // 2. Search match
      const stringToSearch = player.name.toLowerCase();
      const searchMatch = stringToSearch.includes(searchTerm.toLowerCase()) || 
                          player.number.toString().includes(searchTerm);

      return positionMatch && searchMatch;
    });
  }, [initialPlayers, searchTerm, activeTab]);

  return (
    <div id="player-filterable-container" className="space-y-6">
      {/* Search Input Box */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Pretraži igrača po imenu ili broju..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#1F2937] border border-slate-700/60 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-all font-sans"
        />
      </div>

      {/* Tabs list (sliding horizontal scroll on mobile) */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-800/60">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all uppercase tracking-wider shrink-0 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results meta & count */}
      <div className="flex items-center justify-between text-[11px] text-slate-400/90 font-mono">
        <span>Rezultati pretrage:</span>
        <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
          {filteredPlayers.length} {filteredPlayers.length === 1 ? 'igrač' : 'igrača'}
        </span>
      </div>

      {/* Filtered Grid */}
      <PlayerGrid players={filteredPlayers} />
    </div>
  );
}
