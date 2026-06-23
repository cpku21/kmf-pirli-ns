/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/UI/Header.tsx';
import BottomNavigation from '@/components/UI/BottomNavigation.tsx';
import { ResultBadge, PositionBadge } from '@/components/UI/Badge.tsx';
import { cn } from '@/utils/cn.tsx';
import { 
  Users, Calendar, Trophy, BarChart3, Clock, 
  MapPin, ShieldAlert, Award, Star, History, 
  Image as ImageIcon, BookOpen, Activity, Play, 
  ChevronRight, X, ArrowUpRight, Zap 
} from 'lucide-react';
import Image from 'next/image';
import MatchFilter from '@/components/matches/MatchFilter.tsx';

// REAL CLUB ROSTER & INITIAL STATS
interface IPlayerItem {
  number: number;
  name: string;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  goals: number;
  appearances: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  winPercentage: string;
  birthYear: number;
  joinedYear: number;
  bio: string;
  nickname?: string;
}

const PLAYER_ROSTER: IPlayerItem[] = [
  { number: 1, name: 'Pavle Rudić', position: 'Goalkeeper', goals: 3, appearances: 10, assists: 1, yellowCards: 0, redCards: 0, winPercentage: '40.00%', birthYear: 1999, joinedYear: 2023, bio: 'Pouzdani čuvar mreže, poznat po izvanrednim refleksima na liniji i komandovanju odbranom. Ove sezone pokazao izobilje ofanzivnih vrlina sa postignuta 3 gola!', nickname: 'Ruda' },
  { number: 2, name: 'Andrej Vuković', position: 'Defender', goals: 5, appearances: 7, assists: 1, yellowCards: 0, redCards: 0, winPercentage: '42.86%', birthYear: 1997, joinedYear: 2023, bio: 'Stub odbrane, neprelazan u duelima i izuzetno čvrst na lopti. Pouzdan u zadnjoj liniji sa sjajnih 5 golova ove sezone.', nickname: 'Vuk' },
  { number: 3, name: 'Marko Papović', position: 'Defender', goals: 1, appearances: 7, assists: 6, yellowCards: 0, redCards: 0, winPercentage: '42.86%', birthYear: 1998, joinedYear: 2023, bio: 'Pouzdani bek sa odličnim pregledom igre, preciznim pasovima i fantastičnim rešenjima. Jedan od vodećih asistenata tima sa 6 asistencija.' },
  { number: 4, name: 'Miloš Majdevac', position: 'Defender', goals: 9, appearances: 6, assists: 6, yellowCards: 0, redCards: 3, winPercentage: '66.67%', birthYear: 1996, joinedYear: 2024, bio: 'Najbolji strelac tima sa neverovatnih 9 golova i 6 asistencija u svega 6 mečeva! Fantastičan i izuzetno dominantan igrač na svim poljima.' },
  { number: 5, name: 'Ivan Stepanov', position: 'Midfielder', goals: 3, appearances: 6, assists: 2, yellowCards: 0, redCards: 0, winPercentage: '66.67%', birthYear: 1995, joinedYear: 2023, bio: 'Motor ekipe u sredini terena. Odličan tehničar sa sjajnim osećajem za asistenciju i gol koji donosi mirnoću.', nickname: 'Stepi' },
  { number: 6, name: 'Marko Vejinović', position: 'Midfielder', goals: 3, appearances: 6, assists: 4, yellowCards: 0, redCards: 0, winPercentage: '33.33%', birthYear: 1997, joinedYear: 2023, bio: 'Kreativni vezista koji donosi mirnoću u igri i perfektno kreira napadne akcije iz dubine terena.' },
  { number: 7, name: 'Aleksandar Cetić', position: 'Midfielder', goals: 5, appearances: 4, assists: 3, yellowCards: 0, redCards: 1, winPercentage: '75.00%', birthYear: 1996, joinedYear: 2023, bio: 'Kreator igre i motor ekipe sa raznovrsnim pasom. Ima najbolji procenat pobeda u ekipi sa čak 75% uspešnosti!', nickname: 'Ceta' },
  { number: 8, name: 'Miodrag Belopavlović', position: 'Midfielder', goals: 3, appearances: 4, assists: 0, yellowCards: 0, redCards: 0, winPercentage: '50.00%', birthYear: 1998, joinedYear: 2024, bio: 'Izuzetan radnik na sredini terena, neumorno preseca protivničke napade i brzo transformiše tranziciju ka golu.' },
  { number: 9, name: 'Ivan Kuzmanović', position: 'Forward', goals: 4, appearances: 4, assists: 0, yellowCards: 0, redCards: 0, winPercentage: '0.00%', birthYear: 1997, joinedYear: 2023, bio: 'Ubojit napadač sa vrhunskim snalaženjem u šesnaestercu, spreman da kazni svaku grešku protivničke odbrane.', nickname: 'Kuzma' },
  { number: 10, name: 'Vladimir Filipović', position: 'Forward', goals: 1, appearances: 3, assists: 1, yellowCards: 0, redCards: 0, winPercentage: '66.67%', birthYear: 1996, joinedYear: 2023, bio: 'Kapiten i lider na terenu. Dokazani majstor malog fudbala sa kreativnim driblingom koji pravi razliku.', nickname: 'Fića' },
  { number: 11, name: 'Aleksandar Vrbaški', position: 'Forward', goals: 2, appearances: 3, assists: 2, yellowCards: 0, redCards: 0, winPercentage: '33.33%', birthYear: 1998, joinedYear: 2024, bio: 'Ubojit špic, izuzetno brz na kratkom prostoru sa snažnim i hirurški preciznim šutem.' },
  { number: 12, name: 'Filip Popadić', position: 'Goalkeeper', goals: 0, appearances: 2, assists: 0, yellowCards: 1, redCards: 0, winPercentage: '50.00%', birthYear: 2001, joinedYear: 2024, bio: 'Mladi i perspektivni golman, sjajan u igri nogom i brz u situacijama jedan na jedan.' },
  { number: 13, name: 'Uroš Bugarski', position: 'Defender', goals: 2, appearances: 2, assists: 1, yellowCards: 0, redCards: 1, winPercentage: '0.00%', birthYear: 2000, joinedYear: 2023, bio: 'Brzonogi bek sa fantastičnim kretanjem i čestim ulascima iz drugog plana.' },
  { number: 14, name: 'Nikola Komnenović', position: 'Defender', goals: 1, appearances: 2, assists: 2, yellowCards: 1, redCards: 0, winPercentage: '0.00%', birthYear: 1999, joinedYear: 2024, bio: 'Fizički dominantan bek, ključan igrač u prekidima i opasnim vazdušnim duelima.' },
  { number: 15, name: 'Danilo Reko', position: 'Midfielder', goals: 0, appearances: 1, assists: 0, yellowCards: 0, redCards: 0, winPercentage: '0.00%', birthYear: 2000, joinedYear: 2025, bio: 'Tehnički potkovan i stabilan vezista koji unosi potrebnu energiju i tempo sa klupe.' },
  { number: 16, name: 'Srđan Skala', position: 'Forward', goals: 1, appearances: 1, assists: 0, yellowCards: 0, redCards: 0, winPercentage: '0.00%', birthYear: 1997, joinedYear: 2024, bio: 'Snalažljiv napadač, vrhunski igra leđima prema golu i perfektno razigrava saigrače utrčale iz drugog plana.' },
  { number: 17, name: 'Vuk Barišić', position: 'Defender', goals: 2, appearances: 1, assists: 0, yellowCards: 0, redCards: 0, winPercentage: '0.00%', birthYear: 2002, joinedYear: 2025, bio: 'Perspektivni defanzivac sa brzom tranzicijom i agresivnim, odgovornim pokrivanjem prostora.' },
  { number: 18, name: 'Danilo Grubor', position: 'Midfielder', goals: 0, appearances: 1, assists: 0, yellowCards: 0, redCards: 0, winPercentage: '0.00%', birthYear: 2001, joinedYear: 2024, bio: 'Stabilan vezni igrač sa vrhunskim pozicioniranjem i odličnim čitanjem protivničke igre.' },
  { number: 19, name: 'Luka Ladišić', position: 'Forward', goals: 1, appearances: 1, assists: 2, yellowCards: 0, redCards: 0, winPercentage: '0.00%', birthYear: 2001, joinedYear: 2025, bio: 'Mlad i izuzetno prodoran napadač koji unosi stalnu nemir u protivničku odbranu.' }
];

// REAL MATCH RESULTS WITH SCORERS
interface IMatchResult {
  opponent: string;
  score: string;
  pirliScore: number;
  oppScore: number;
  result: 'W' | 'L' | 'D';
  date: string;
  isHome: boolean;
  competition: string;
  venue: string;
  scorers: Array<{ name: string; goals: number }>;
  notes?: string;
}

const PAST_MATCHES: IMatchResult[] = [
  {
    opponent: 'KORVEX',
    score: '3–8',
    pirliScore: 3,
    oppScore: 8,
    result: 'L',
    date: '19.06.2026',
    isHome: false,
    competition: 'Meridianbet Liga',
    venue: 'SC Hattrick, I teren 5+1',
    scorers: [
      { name: 'Ivan Kuzmanović', goals: 2 },
      { name: 'Vladimir Filipović', goals: 1 }
    ],
    notes: 'Izgubili smo korak u drugom poluvremenu protiv raspoloženog protivnika.'
  },
  {
    opponent: 'CODOLIS',
    score: '5–3',
    pirliScore: 5,
    oppScore: 3,
    result: 'W',
    date: '20.05.2026',
    isHome: false,
    competition: 'Meridianbet Liga',
    venue: 'SC Hattrick, I teren 5+1',
    scorers: [
      { name: 'Miloš Majdevac', goals: 2 },
      { name: 'Aleksandar Cetić', goals: 2 },
      { name: 'Pavle Rudić', goals: 1 }
    ],
    notes: 'Sjajno izdanje i timska igra. Golman Rudić postigao pogodak sa svoje polovine!'
  },
  {
    opponent: 'GRADITELJ NS',
    score: '8–7',
    pirliScore: 8,
    oppScore: 7,
    result: 'W',
    date: '29.04.2026',
    isHome: false,
    competition: 'Meridianbet Liga',
    venue: 'SC Hattrick, I teren 5+1',
    scorers: [
      { name: 'Miloš Majdevac', goals: 3 },
      { name: 'Andrej Vuković', goals: 2 },
      { name: 'Aleksandar Cetić', goals: 2 },
      { name: 'Ivan Stepanov', goals: 1 }
    ],
    notes: 'Neverovatna utakmica puna preokreta. Majdevac fantastičan sa het-trikom!'
  },
  {
    opponent: 'BLACK STAR',
    score: '5–10',
    pirliScore: 5,
    oppScore: 10,
    result: 'L',
    date: '21.04.2026',
    isHome: false,
    competition: 'Meridianbet Liga',
    venue: 'SC Hattrick, I teren 5+1',
    scorers: [
      { name: 'Andrej Vuković', goals: 2 },
      { name: 'Miloš Majdevac', goals: 2 },
      { name: 'Marko Vejinović', goals: 1 }
    ],
    notes: 'Poraz u teškoj utakmici u gostima. Rival je iskoristio svaku našu grešku u odbrani.'
  },
  {
    opponent: 'BRKE',
    score: '5–7',
    pirliScore: 5,
    oppScore: 7,
    result: 'L',
    date: '24.03.2026',
    isHome: false,
    competition: 'Meridianbet Liga',
    venue: 'SC Hattrick, I teren 5+1',
    scorers: [
      { name: 'Miloš Majdevac', goals: 2 },
      { name: 'Andrej Vuković', goals: 1 },
      { name: 'Ivan Stepanov', goals: 1 },
      { name: 'Aleksandar Vrbaški', goals: 1 }
    ],
    notes: 'Otvorena borba sa dosta golova. Brke su odnele pobedu zahvaljujući boljoj realizaciji šansi.'
  },
  {
    opponent: 'MILENIJUM',
    score: '1–5',
    pirliScore: 1,
    oppScore: 5,
    result: 'L',
    date: '29.03.2026',
    isHome: true,
    competition: 'Meridianbet Liga',
    venue: 'SC Hattrick, I teren 5+1',
    scorers: [
      { name: 'Ivan Kuzmanović', goals: 1 }
    ],
    notes: 'Zaslužena pobeda gostiju na otvaranju prolećnog dela sezone.'
  }
];

// ACTUAL STANDINGS TABLE
interface IStandingsRow {
  position: number;
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
  isPirli?: boolean;
}

const STANDINGS_TABLE: IStandingsRow[] = [
  { position: 1, team: 'DARK KNIGHTS', played: 13, wins: 13, draws: 0, losses: 0, goalsFor: 66, goalsAgainst: 21, goalDifference: 45, points: 39, form: ['W', 'W', 'W', 'W', 'W'] },
  { position: 2, team: 'FENSERI', played: 14, wins: 12, draws: 0, losses: 2, goalsFor: 84, goalsAgainst: 51, goalDifference: 33, points: 36, form: ['W', 'W', 'L', 'W', 'W'] },
  { position: 3, team: 'BLACK STAR', played: 14, wins: 11, draws: 0, losses: 3, goalsFor: 83, goalsAgainst: 56, goalDifference: 27, points: 33, form: ['W', 'L', 'W', 'W', 'L'] },
  { position: 4, team: 'VITOROG PROMET', played: 13, wins: 9, draws: 2, losses: 2, goalsFor: 73, goalsAgainst: 43, goalDifference: 30, points: 28, form: ['L', 'W', 'D', 'W', 'W'] },
  { position: 5, team: 'KONTRA FC', played: 15, wins: 9, draws: 0, losses: 6, goalsFor: 62, goalsAgainst: 46, goalDifference: 16, points: 27, form: ['L', 'L', 'W', 'L', 'L'] },
  { position: 6, team: 'KORVEX', played: 14, wins: 8, draws: 0, losses: 6, goalsFor: 66, goalsAgainst: 60, goalDifference: 6, points: 24, form: ['W', 'W', 'W', 'L', 'W'] },
  { position: 7, team: 'KMF PIRLI', played: 14, wins: 8, draws: 0, losses: 6, goalsFor: 58, goalsAgainst: 62, goalDifference: -4, points: 24, form: ['L', 'L', 'W', 'W', 'L'], isPirli: true },
  { position: 8, team: 'BRKE', played: 15, wins: 8, draws: 0, losses: 7, goalsFor: 67, goalsAgainst: 73, goalDifference: -6, points: 24, form: ['W', 'L', 'W', 'L', 'L'] },
  { position: 9, team: 'CODOLIS', played: 15, wins: 7, draws: 1, losses: 7, goalsFor: 71, goalsAgainst: 57, goalDifference: 14, points: 22, form: ['L', 'W', 'L', 'D', 'L'] },
  { position: 10, team: 'MILENIJUM', played: 15, wins: 7, draws: 1, losses: 7, goalsFor: 55, goalsAgainst: 51, goalDifference: 4, points: 22, form: ['L', 'L', 'W', 'L', 'W'] },
  { position: 11, team: 'GRADITELJ NS', played: 15, wins: 7, draws: 0, losses: 8, goalsFor: 75, goalsAgainst: 69, goalDifference: 6, points: 21, form: ['L', 'W', 'L', 'W', 'L'] },
  { position: 12, team: 'KOZAREV AGRO', played: 15, wins: 6, draws: 0, losses: 9, goalsFor: 41, goalsAgainst: 53, goalDifference: -12, points: 18, form: ['W', 'W', 'L', 'W', 'L'] },
  { position: 13, team: 'TAMO DALEKO', played: 15, wins: 5, draws: 0, losses: 10, goalsFor: 57, goalsAgainst: 87, goalDifference: -30, points: 15, form: ['L', 'W', 'L', 'L', 'L'] },
  { position: 14, team: 'GOL RAZLIKA', played: 15, wins: 3, draws: 0, losses: 12, goalsFor: 48, goalsAgainst: 93, goalDifference: -45, points: 9, form: ['L', 'L', 'L', 'L', 'L'] },
  { position: 15, team: 'KARMIN', played: 15, wins: 0, draws: 1, losses: 14, goalsFor: 0, goalsAgainst: 42, goalDifference: -42, points: 1, form: ['L', 'L', 'D', 'L', 'L'] },
  { position: 16, team: 'NEDOSTATAK', played: 15, wins: 0, draws: 1, losses: 14, goalsFor: 0, goalsAgainst: 42, goalDifference: -42, points: 1, form: ['L', 'L', 'L', 'L', 'D'] }
];

export default function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayerItem | null>(null);
  const [playerFilter, setPlayerFilter] = useState<'All' | 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'>('All');
  const [expandedMatchIndex, setExpandedMatchIndex] = useState<number | null>(null);
  const [clubTab, setClubTab] = useState<'stats' | 'history' | 'gallery'>('stats');

  // Sync state with back button and browser history natively
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // COUNTDOWN IN HOME PAGE
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const matchDate = new Date('2026-06-23T19:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const difference = matchDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 65) % 60);
      setTimeLeft({ days, hours, minutes });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  // RENDER SECTIONS
  const renderHomeSegment = () => (
    <div className="flex-grow flex flex-col bg-[#0B1220] pb-10">
      {/* Dynamic Header Block */}
      <div className="relative py-7 px-4 bg-gradient-to-b from-[#111827] to-[#0B1220] flex flex-col items-center justify-center text-center border-b border-slate-800/60">
        <div className="relative w-24 h-24 flex items-center justify-center bg-[#1F2937]/35 rounded-full p-4 border border-slate-700/30">
          <Image
            src="https://minifudbalsrbije.rs/wp-content/uploads/2023/01/Pirli-logo-transparentni.png"
            alt="KMF Pirli Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <span className="absolute -bottom-1 -right-0.5 flex items-center justify-center bg-blue-600 text-white text-[10px] font-black w-6.5 h-6.5 rounded-full border border-[#0B1220] font-mono leading-none shadow-sm">
            7
          </span>
        </div>

        <h1 className="mt-3.5 text-[22px] font-black tracking-tight text-white uppercase">KMF PIRLI</h1>
        <p className="text-[10px] text-slate-450 text-slate-450 tracking-wider font-mono text-slate-450 mt-0.5">Novi Sad • Srbija</p>
        <div className="mt-2.5 inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-600/10 rounded-full border border-blue-600/20 text-[9px] font-bold tracking-wider text-blue-400 uppercase font-mono">
          <span>II LIGA NOVI SAD</span>
        </div>
      </div>

      <div className="px-3.5 mt-5 space-y-4">
        {/* Next Match Banner (Sofascore Style) */}
        <div className="bg-[#1F2937] border border-slate-700/60 rounded-xl p-3.5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-amber-500 font-extrabold tracking-widest uppercase flex items-center gap-1">
              <Zap size={11} className="animate-bounce" /> Sledeće kolo
            </span>
            <span className="text-[9px] font-semibold text-slate-400 uppercase font-mono bg-[#111827] px-2 py-0.5 rounded border border-slate-800">
              23. JUN • 19:00
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <div className="flex-1 text-center">
              <span className="text-[13px] font-black text-slate-250 block truncate text-slate-200">VITOROG</span>
              <span className="text-[11px] text-slate-500 font-medium block">PROMET</span>
            </div>
            
            <div className="px-3 py-1 bg-[#111827] rounded text-center min-w-[55px] border border-slate-800">
              <span className="text-xs font-black text-blue-400 font-mono">VS</span>
              <span className="text-[8px] text-slate-500 font-bold block leading-none mt-0.5">19:00</span>
            </div>

            <div className="flex-1 text-center font-bold">
              <span className="text-[13px] font-black text-blue-400 block tracking-tight">KMF</span>
              <span className="text-[11px] text-white font-black block">PIRLI</span>
            </div>
          </div>

          {/* Countdown Blocks */}
          <div className="grid grid-cols-3 gap-2 text-center py-2.5 bg-[#111827] rounded-xl border border-slate-800/80 font-mono">
            <div>
              <span className="text-sm font-black text-slate-300 block">{timeLeft.days}</span>
              <span className="text-[8px] text-slate-550 font-bold text-slate-500 uppercase tracking-widest block mt-0.5">Dana</span>
            </div>
            <div>
              <span className="text-sm font-black text-slate-300 block">{timeLeft.hours}</span>
              <span className="text-[8px] text-slate-550 font-bold text-slate-500 uppercase tracking-widest block mt-0.5">Sati</span>
            </div>
            <div>
              <span className="text-sm font-black text-slate-300 block">{timeLeft.minutes}</span>
              <span className="text-[8px] text-slate-550 font-bold text-slate-500 uppercase tracking-widest block mt-0.5">Minuta</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-[10px] text-slate-450 text-slate-400 pt-1.5 border-t border-slate-800/50">
            <MapPin size={11} className="text-blue-500 shrink-0" />
            <span className="truncate">Teren: <strong className="text-slate-300">SC Hattrick (Teren 1, 5+1)</strong></span>
          </div>
        </div>

        {/* Form list & statistics combo */}
        <div className="bg-[#111827] border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
          <div className="text-left font-sans">
            <span className="text-[9px] text-slate-550 font-bold text-slate-500 uppercase block tracking-wider">Forma (poslednjih 5)</span>
            <span className="text-xs font-bold text-slate-300 block mt-0.5">KMF Pirli</span>
          </div>
          <div className="flex items-center space-x-1">
            {['L', 'L', 'W', 'W', 'L'].map((res, i) => (
              <ResultBadge key={i} result={res} className="w-[22px] h-[22px] text-[10px]" />
            ))}
          </div>
        </div>

        {/* Quick Numbers Roster-at-a-glance */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-[#111827] border border-slate-800 p-3.5 rounded-xl">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Gol-razlika</span>
            <span className="text-lg font-black text-slate-300 font-mono block mt-1">58:62</span>
            <span className="text-[9px] text-slate-450 block text-slate-450 mt-0.5">Preko 4 daju po utakmici</span>
          </div>
          <div className="bg-[#111827] border border-slate-800 p-3.5 rounded-xl">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Ukupno bodova</span>
            <span className="text-lg font-black text-blue-400 font-mono block mt-1">24 boda</span>
            <span className="text-[9px] text-slate-450 block text-slate-450 mt-0.5">8 Pobeda u 14 mečeva</span>
          </div>
        </div>

        {/* Recent match row stack list */}
        <div className="bg-[#1F2937] border border-slate-700/60 rounded-xl p-3.5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-extrabold tracking-widest uppercase">Zadnje odigrane</span>
            <button onClick={() => navigateTo('/matches')} className="text-[10px] text-blue-400 font-bold tracking-wide uppercase hover:underline">
              Sve utakmice
            </button>
          </div>

          <div className="divide-y divide-slate-800/80">
            {PAST_MATCHES.slice(0, 3).map((match, idx) => (
              <div key={idx} className="flex items-center justify-between py-2.5 first:pt-1">
                <div className="flex flex-col text-left space-y-0.5">
                  <span className="text-[9px] text-slate-500 font-mono">{match.date}</span>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[8px] font-mono font-black text-slate-400 bg-[#111827] border border-slate-700/30 px-1 rounded uppercase">
                      {match.isHome ? 'KUĆA' : 'GOST'}
                    </span>
                    <strong className="text-xs font-black text-slate-200">{match.opponent}</strong>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold font-mono text-slate-200 bg-[#111827]/60 px-2 py-0.5 rounded border border-slate-850">
                    {match.score}
                  </span>
                  <ResultBadge result={match.result} className="w-5 h-5 text-[9px]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App footer informational text inside scroll */}
        <div className="py-4 text-center border-t border-slate-800/50">
          <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">KMF PIRLI Novi Sad</p>
          <p className="text-[9px] text-slate-650 mt-1 text-slate-600 font-medium">XXX Meridianbet Sezona 2026</p>
        </div>

      </div>
    </div>
  );

  const renderPlayersSegment = () => {
    // Categorize Filter
    const filteredPlayers = PLAYER_ROSTER.filter((p) => {
      if (playerFilter === 'All') return true;
      return p.position === playerFilter;
    });

    const positions = [
      { id: 'All', label: 'SVI' },
      { id: 'Goalkeeper', label: 'GOL' },
      { id: 'Defender', label: 'BEK' },
      { id: 'Midfielder', label: 'VEZ' },
      { id: 'Forward', label: 'ŠPIC' },
    ];

    return (
      <div className="flex-grow bg-[#0B1220] px-3.5 py-4 space-y-4 pb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black tracking-tight uppercase flex items-center gap-1">
            <Users size={16} className="text-blue-500" /> Sastav ekipe
          </h2>
          <span className="text-[9px] font-bold bg-blue-600/10 text-blue-400 border border-blue-600/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
            {PLAYER_ROSTER.length} IGRAČA
          </span>
        </div>

        {/* Filter Quick Tab selector (na dohvat ruke on top) */}
        <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          {positions.map((pos) => {
            const isSelected = playerFilter === pos.id;
            return (
              <button
                key={pos.id}
                onClick={() => setPlayerFilter(pos.id as any)}
                className={`px-3 py-1.5 text-[10px] font-black rounded-lg uppercase tracking-wider focus:outline-none transition-all ${
                  isSelected 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-[#1F2937] text-slate-400 border border-slate-700/60'
                }`}
              >
                {pos.label}
              </button>
            );
          })}
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-2 gap-2.5">
          {filteredPlayers.map((player) => (
            <div
              key={player.number}
              onClick={() => setSelectedPlayer(player)}
              className="bg-[#1F2937] p-3 rounded-xl border border-slate-700/50 hover:border-blue-500/40 active:bg-slate-800 transition-all flex flex-col justify-between h-[90px] relative pointer-events-auto cursor-pointer"
            >
              {/* Top Row inside card */}
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 w-6 h-6 rounded-full flex items-center justify-center">
                  #{player.number}
                </span>
                <PositionBadge position={player.position} className="text-[8px]" />
              </div>

              {/* Bot Row inside card */}
              <div className="mt-2 text-left">
                <span className="text-xs font-black text-slate-100 truncate block leading-none select-none">
                  {player.name}
                </span>
                <div className="flex items-center space-x-2 mt-1.5">
                  <span className="text-[9px] text-slate-400 font-mono font-black">
                    {player.appearances} meča
                  </span>
                  <span className="text-[9px] text-slate-650 text-slate-550 font-mono font-bold">
                    •
                  </span>
                  <span className="text-[9px] text-emerald-400 font-mono font-black flex items-center">
                    {player.goals} gol
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sheet / Drawer Modal popover which opens immediately (extremely fast, no page load, native mobile app style) */}
        {selectedPlayer && (
          <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/85 backdrop-blur-xs" 
              onClick={() => setSelectedPlayer(null)}
            />
            
            {/* Modal Body */}
            <div className="relative bg-[#1F2937] border border-slate-700 rounded-2xl w-full max-w-sm p-4 overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-250 select-none">
              <button 
                onClick={() => setSelectedPlayer(null)}
                className="absolute top-3.5 right-3.5 p-1 text-slate-400 hover:text-white rounded-full bg-[#111827] focus:outline-none"
              >
                <X size={16} />
              </button>

              <div className="flex items-start space-x-3 pt-1">
                <div className="w-[50px] h-[50px] rounded-full bg-blue-600/10 border border-blue-500/30 flex items-center justify-center font-mono font-black text-lg text-blue-400 shrink-0">
                  {selectedPlayer.number}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="text-base font-black text-white">{selectedPlayer.name}</h3>
                    {selectedPlayer.nickname && (
                      <span className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded">
                        "{selectedPlayer.nickname}"
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <PositionBadge position={selectedPlayer.position} />
                    <span className="text-[10px] text-slate-400 font-mono">Godište: {selectedPlayer.birthYear}</span>
                  </div>
                </div>
              </div>

              {/* Stats highlights */}
              <div className="bg-[#111827] rounded-xl border border-slate-800/80 my-3.5 divide-y divide-slate-800/40 font-mono">
                {/* Row 1: Primary Stats */}
                <div className="grid grid-cols-3 gap-1 py-2 text-center text-slate-300">
                  <div>
                    <span className="text-[13px] font-black text-white block">{selectedPlayer.appearances}</span>
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block">Nastupa</span>
                  </div>
                  <div>
                    <span className="text-[13px] font-black text-emerald-400 block">{selectedPlayer.goals}</span>
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block">Golova</span>
                  </div>
                  <div>
                    <span className="text-[13px] font-black text-blue-400 block">{selectedPlayer.assists}</span>
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block">Asist-a</span>
                  </div>
                </div>
                {/* Row 2: Card & Win Rate stats */}
                <div className="grid grid-cols-3 gap-1 py-1.5 text-center text-slate-350">
                  <div>
                    <span className="text-xs font-bold text-amber-500 block">🟨 {selectedPlayer.yellowCards}</span>
                    <span className="text-[7.5px] text-slate-500 font-bold uppercase tracking-wider block">Žuti K.</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-red-500 block">🟥 {selectedPlayer.redCards}</span>
                    <span className="text-[7.5px] text-slate-500 font-bold uppercase tracking-wider block">Crveni K.</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-300 block">{selectedPlayer.winPercentage}</span>
                    <span className="text-[7.5px] text-slate-500 font-bold uppercase tracking-wider block">Win %</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold tracking-widest uppercase block mb-1">O Igraču</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal bg-[#111827]/40 p-2.5 rounded-lg border border-slate-800/60">
                    {selectedPlayer.bio}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-450 border-t border-slate-800/80 pt-2.5">
                  <span className="text-slate-400">Član kluba od: <strong className="text-white">{selectedPlayer.joinedYear}.</strong></span>
                  <span className="text-blue-400 font-bold">KMF PIRLI Novi Sad</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMatchesSegment = () => {
    return (
      <div className="flex-grow bg-[#0B1220] px-3.5 py-4 space-y-4 pb-12 w-full text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black tracking-tight uppercase flex items-center gap-1">
            <Calendar size={16} className="text-blue-500" /> Utakmice & Rezultati
          </h2>
          <span className="text-[9px] font-bold bg-[#1F2937] text-slate-400 border border-slate-700/60 px-2 py-0.5 rounded font-mono uppercase tracking-wider font-extrabold">
            SEZONA 2026/2027
          </span>
        </div>

        {/* Dynamic and high-fidelity MatchFilter with detail modals (lineups, mvp, assists, bookings) */}
        <MatchFilter />
      </div>
    );
  };

  const renderStandingsSegment = () => {
    return (
      <div className="flex-grow bg-[#0B1220] px-3.5 py-4 space-y-4 pb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black tracking-tight uppercase flex items-center gap-1">
            <Trophy size={16} className="text-blue-500" /> Tabela Lige
          </h2>
          <span className="text-[9px] font-bold bg-[#1F2937] text-slate-400 border border-slate-700/60 px-2 py-0.5 rounded font-mono">
            30. SEZONA NOVI SAD • 2026
          </span>
        </div>

        {/* Swipe Hint indicator */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold bg-[#111827]/40 p-2 rounded-lg border border-slate-800/60">
          <span className="flex items-center gap-1 select-none">
            <Activity size={12} className="text-blue-500 shrink-0" />
            PIRLI na 7. mestu (II liga)
          </span>
          <span className="text-[9px] text-slate-450 uppercase animate-pulse flex items-center gap-1 font-mono">
            Povuci desno za detalje ➔
          </span>
        </div>

        {/* Table representation with horizontal scroll */}
        <div className="bg-[#1F2937] rounded-xl border border-slate-700/60 overflow-hidden shadow-sm">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="bg-[#111827] text-[10px] text-slate-400 font-extrabold tracking-wider uppercase border-b border-slate-700/80 font-mono">
                  {/* Sticky Position */}
                  <th className="sticky left-0 bg-[#111827] z-20 px-3 py-3 w-10 text-center border-r border-slate-800/40">#</th>
                  {/* Sticky Team Name */}
                  <th className="sticky left-10 bg-[#111827] z-20 px-3 py-3 w-36 border-r border-slate-800">Tim</th>
                  {/* Regular Columns */}
                  <th className="px-3 py-3 text-center">OU</th>
                  <th className="px-3 py-3 text-center text-emerald-400">P</th>
                  <th className="px-3 py-3 text-center text-amber-500">N</th>
                  <th className="px-3 py-3 text-center text-rose-500">I</th>
                  <th className="px-3 py-3 text-center">G+</th>
                  <th className="px-3 py-3 text-center">G-</th>
                  <th className="px-3 py-3 text-center">GR</th>
                  <th className="px-3 py-3 text-right font-black text-blue-400">BOD</th>
                  <th className="px-4 py-3 text-center w-[120px]">Forma</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {STANDINGS_TABLE.map((row) => {
                  const isPirli = row.isPirli;
                  // Dynamic background classes
                  const rowBgClass = isPirli 
                    ? "bg-blue-600/10 hover:bg-blue-600/15" 
                    : "hover:bg-slate-800/20";
                  
                  const stickyBgClass = isPirli
                    ? "bg-[#1C283F]"
                    : "bg-[#1F2937]";

                  const stickyHoverClass = isPirli
                    ? "group-hover:bg-[#22314E]"
                    : "group-hover:bg-[#243042]";

                  return (
                    <tr 
                      key={row.position} 
                      className={cn(
                        "group transition-all text-xs font-medium text-slate-300",
                        rowBgClass
                      )}
                    >
                      {/* Sticky Pos Cell */}
                      <td className={cn(
                        "sticky left-0 z-10 px-3 py-2.5 text-center font-bold font-mono border-r border-slate-800/40 text-slate-400 transition-colors",
                        stickyBgClass, stickyHoverClass
                      )}>
                        {row.position}
                      </td>

                      {/* Sticky Team Cell */}
                      <td className={cn(
                        "sticky left-10 z-10 px-3 py-2.5 font-bold border-r border-slate-800 transition-colors truncate",
                        stickyBgClass, stickyHoverClass
                      )}>
                        <div className="flex items-center space-x-1">
                          <span className={cn(
                            "truncate",
                            isPirli ? "text-blue-400 font-extrabold" : "text-slate-200"
                          )}>
                            {row.team}
                          </span>
                          {isPirli && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
                          )}
                        </div>
                      </td>

                      {/* Played (OU) */}
                      <td className="px-3 py-2.5 text-center font-mono text-slate-400">
                        {row.played}
                      </td>

                      {/* Wins (P) */}
                      <td className="px-3 py-2.5 text-center font-mono font-bold text-slate-200">
                        {row.wins}
                      </td>

                      {/* Draws (N) */}
                      <td className="px-3 py-2.5 text-center font-mono text-slate-400">
                        {row.draws}
                      </td>

                      {/* Losses (I) */}
                      <td className="px-3 py-2.5 text-center font-mono text-slate-450 text-slate-500">
                        {row.losses}
                      </td>

                      {/* Goals For */}
                      <td className="px-3 py-2.5 text-center font-mono text-slate-400">
                        {row.goalsFor}
                      </td>

                      {/* Goals Against */}
                      <td className="px-3 py-2.5 text-center font-mono text-slate-450 text-slate-500">
                        {row.goalsAgainst}
                      </td>

                      {/* Goal Difference */}
                      <td className={cn(
                        "px-3 py-2.5 text-center font-mono font-bold",
                        row.goalDifference > 0 
                          ? "text-emerald-400" 
                          : row.goalDifference < 0 
                          ? "text-rose-500" 
                          : "text-slate-500"
                      )}>
                        {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                      </td>

                      {/* Points (Bod) */}
                      <td className={cn(
                        "px-3 py-2.5 text-right font-mono font-black border-r border-slate-800/40",
                        isPirli ? "text-blue-400" : "text-slate-100"
                      )}>
                        {row.points}
                      </td>

                      {/* Form (Forma) */}
                      <td className="px-4 py-2.5 text-center">
                        <div className="flex items-center justify-center space-x-1 shrink-0">
                          {row.form.map((f, fidx) => {
                            let badgeBg = "bg-slate-750 text-slate-400 border border-slate-700/50";
                            if (f === 'W') badgeBg = "bg-green-500/10 text-green-400 border border-green-500/20";
                            if (f === 'D') badgeBg = "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20";
                            if (f === 'L') badgeBg = "bg-rose-500/10 text-rose-450 text-rose-500 border border-rose-500/20";
                            return (
                              <span 
                                key={fidx} 
                                className={cn(
                                  "w-[15px] h-[15px] rounded-full text-[8px] font-black font-mono flex items-center justify-center",
                                  badgeBg
                                )}
                              >
                                {f}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom explanation / stats bar */}
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2.5 bg-[#111827] rounded-xl border border-slate-800 text-left">
            <span className="block text-[8px] uppercase tracking-wider font-extrabold text-blue-400 mb-0.5">LEGENDA</span>
            <ul className="space-y-0.5 text-slate-400">
              <li>• <strong className="text-slate-300">OU</strong>: Odigrane utakmice</li>
              <li>• <strong className="text-slate-300">P / N / I</strong>: Pobednik / Nerešeno / Izgubljeno</li>
              <li>• <strong className="text-slate-300">GR</strong>: Gol-razlika</li>
            </ul>
          </div>
          <div className="p-2.5 bg-[#111827] rounded-xl border border-slate-800 text-left">
            <span className="block text-[8px] uppercase tracking-wider font-extrabold text-blue-400 mb-0.5">INFO</span>
            <p className="text-slate-400 leading-normal">
              Srpska Asocijacija Minifudbala (SAMF). SC Hattrick teren oivičen martinelama, 5+1 sistem sa 2x20min prenosom.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderClubSegment = () => {
    return (
      <div className="flex-grow bg-[#0B1220] px-3.5 py-4 space-y-4 pb-12">
        {/* Top swapper segments */}
        <div className="flex justify-between items-center">
          <h2 className="text-base font-black tracking-tight uppercase flex items-center gap-1 font-sans">
            <Activity size={16} className="text-blue-500" /> KMF PIRLI KLUB
          </h2>
        </div>

        {/* Club menu tab bar buttons */}
        <div className="grid grid-cols-3 gap-1 p-0.5 bg-[#111827] rounded-xl border border-slate-800">
          <button 
            onClick={() => setClubTab('stats')}
            className={cn(
              "py-1.5 text-[10px] font-black rounded-lg uppercase tracking-wider transition-all focus:outline-none",
              clubTab === 'stats' ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            )}
          >
            Statistika
          </button>
          <button 
            onClick={() => setClubTab('history')}
            className={cn(
              "py-1.5 text-[10px] font-black rounded-lg uppercase tracking-wider transition-all focus:outline-none",
              clubTab === 'history' ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            )}
          >
            Istorija
          </button>
          <button 
            onClick={() => setClubTab('gallery')}
            className={cn(
              "py-1.5 text-[10px] font-black rounded-lg uppercase tracking-wider transition-all focus:outline-none",
              clubTab === 'gallery' ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            )}
          >
            Galerija
          </button>
        </div>

        {clubTab === 'stats' && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            {/* Top Stats blocks */}
            <div className="bg-[#1F2937] p-3.5 rounded-xl border border-slate-700/60 text-center space-y-2">
              <span className="text-3xl font-black text-blue-500 font-mono block">58</span>
              <p className="text-[10px] font-extrabold text-white uppercase tracking-wider">Ukupno golova u ligi</p>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }} />
              </div>
              <p className="text-[9px] text-slate-500 font-mono">Prosek po utakmici: 4.14 gola</p>
            </div>

            {/* Top goalscorers listing */}
            <div className="bg-[#1F2937] p-3.5 rounded-xl border border-slate-700/60 space-y-3">
              <span className="text-[10px] text-slate-400 font-extrabold tracking-widest uppercase block">
                Najbolji Strelci (Sezona XXX)
              </span>

              <div className="divide-y divide-slate-800">
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-black text-slate-105 text-slate-200">1. Ivan Kuzmanović</span>
                  <span className="text-xs font-black text-blue-400 font-mono">12 golova ⚽</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-black text-slate-105 text-slate-200">2. Vladimir Filipović</span>
                  <span className="text-xs font-black text-blue-400 font-mono">9 golova ⚽</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-black text-slate-105 text-slate-200">3. Ivan Stepanov</span>
                  <span className="text-xs font-black text-blue-400 font-mono">8 golova ⚽</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-black text-slate-105 text-slate-200">4. Aleksandar Cetić</span>
                  <span className="text-xs font-black text-blue-400 font-mono">6 golova ⚽</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {clubTab === 'history' && (
          <div className="space-y-4 animate-in fade-in duration-200 text-left">
            <div className="relative border-l-2 border-slate-800 pl-4 ml-2.5 space-y-5">
              <div className="relative">
                <span className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-[#0B1220]" />
                <span className="text-[10px] font-mono font-black text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">2026</span>
                <h4 className="text-xs font-black text-white uppercase mt-1.5">XXX SEZONA MERIDIANBET</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                  KMF Pirli igra i takmiči se u jakom regionalnom prvenstvu sa sedištem u Novom Sadu, promovišući timski duh i čvrstu igru na SC Hattricku.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-slate-650 bg-slate-500 border-2 border-[#0B1220]" />
                <span className="text-[10px] font-mono font-black text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">2023</span>
                <h4 className="text-xs font-black text-white uppercase mt-1.5">Zvanično Pokretanje Kluba</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                  Početak formiranja tima i predstavljanje grba. Postavljen je temelj stabilne futsal ekipe s ciljem okupljanja najboljih malofudbalera iz Novog Sada.
                </p>
              </div>
            </div>
          </div>
        )}

        {clubTab === 'gallery' && (
          <div className="grid grid-cols-2 gap-2.5 animate-in fade-in duration-200">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item} 
                className="aspect-square bg-[#1F2937] rounded-xl border border-slate-700/50 flex flex-col items-center justify-center relative p-3 text-center overflow-hidden"
              >
                <ImageIcon size={20} className="text-slate-500 mb-1" />
                <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide">KMF PIRLI</span>
                <span className="text-[8px] text-slate-600 font-mono block mt-0.5">SLIKA {item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderAdminSegment = () => {
    return (
      <div className="flex-grow flex flex-col justify-center items-center py-10 px-5 text-center my-auto min-h-[450px]">
        <div className="w-14 h-14 bg-blue-600/10 rounded-full border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400 shadow-inner">
          <Clock size={20} />
        </div>
        <h2 className="text-lg font-black uppercase text-white tracking-tight mt-3.5">ADMIN PRIJAVA</h2>
        <p className="text-[11px] text-slate-450 leading-relaxed max-w-xs text-slate-400 mt-1">
          Kredencijali za administraciju Rostera sezone XXX.
        </p>

        <div className="mt-5 space-y-2.5 w-full max-w-xs">
          <input 
            type="text" 
            placeholder="Korisničko ime" 
            defaultValue="admin"
            className="w-full px-3.5 py-3 bg-[#111827] border border-slate-700 rounded-xl text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-white font-medium"
          />
          <input 
            type="password" 
            placeholder="Lozinka"
            defaultValue="••••••••"
            className="w-full px-3.5 py-3 bg-[#111827] border border-slate-700 rounded-xl text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-white font-medium"
          />
          <button className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-xs font-black rounded-xl transition-all tracking-wider uppercase text-white shadow-md">
            PRIJAVI SE
          </button>
        </div>
      </div>
    );
  };

  const renderRouteContent = () => {
    switch (currentPath) {
      case '/':
      case '/home':
        return renderHomeSegment();
      case '/players':
        return renderPlayersSegment();
      case '/matches':
        return renderMatchesSegment();
      case '/standings':
        return renderStandingsSegment();
      case '/club':
        return renderClubSegment();
      case '/admin':
      case '/admin/login':
        return renderAdminSegment();
      default:
        return renderHomeSegment();
    }
  };

  return (
    <>
      {/* Top compact bar */}
      <Header currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main viewport */}
      <main className="flex-grow pt-14 pb-16 flex flex-col">
        {renderRouteContent()}
      </main>

      {/* bottom nav bar within thumb reach */}
      <BottomNavigation currentPath={currentPath} onNavigate={navigateTo} />
    </>
  );
}
