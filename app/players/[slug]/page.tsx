import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Trophy, ChevronLeft, Calendar, Shield, Award, Users } from 'lucide-react';
import connectToDatabase from '@/lib/db/mongoose.tsx';
import Player from '@/lib/model/Player.tsx';

interface PlayerProfileProps {
  params: Promise<{ slug: string }> | any;
}

export async function generateMetadata({ params }: PlayerProfileProps) {
  const { slug } = await params;
  try {
    await connectToDatabase();
    const player = await Player.findOne({ slug }).lean();
    if (player) {
      return { title: `${player.name} | KMF Pirli` };
    }
  } catch (e) {
    // fallback
  }
  return { title: 'Profil Igrača | KMF Pirli' };
}

export default async function PlayerProfilePage({ params }: PlayerProfileProps) {
  const { slug } = await params;
  let player: any = null;

  try {
    await connectToDatabase();
    player = await Player.findOne({ slug }).lean();
  } catch (err) {
    console.error('Greška pri učitavanju profila igrača:', err);
  }

  // Handcrafted premium fallback player descriptions in Serbian if no database matches slug
  if (!player) {
    const mockPlayers: Record<string, any> = {
      'srdjan-popovic': { name: 'Srdjan Popović', slug: 'srdjan-popovic', number: 10, position: 'Forward', bio: 'Najbolji strelac i kapiten ekipe, prepoznatljiv po sjajnom kretanju i ubojitom levom šutu.', photo: '', stats: { appearances: 14, goals: 18, assists: 11, yellowCards: 2, redCards: 0 }, achievements: ['Najbolji strelac 30. sezone', 'MVP sezone 2025'], joinedYear: 2021, birthYear: 1995 },
      'nikola-milisavljevic': { name: 'Nikola Milisavljević', slug: 'nikola-milisavljevic', number: 7, position: 'Midfielder', bio: 'Mozak ekipe na sredini terena. Odlična kontrola lopte i ključni pasovi koji razbijaju protivnički presing.', photo: '', stats: { appearances: 14, goals: 12, assists: 14, yellowCards: 1, redCards: 0 }, achievements: ['Najbolji asistent 29. sezone'], joinedYear: 2022, birthYear: 1997 },
      'marko-juran': { name: 'Marko Juran', slug: 'marko-juran', number: 8, position: 'Midfielder', bio: 'Svestran vezni igrač koji donosi stabilnost u odbrani i kreaciju u napadu. Pravi lider na terenu.', photo: '', stats: { appearances: 12, goals: 9, assists: 6, yellowCards: 3, redCards: 0 }, achievements: [], joinedYear: 2023, birthYear: 1996 },
      'igor-pavlovic': { name: 'Igor Pavlović', slug: 'igor-pavlovic', number: 9, position: 'Forward', bio: 'Klasni sidraš sa izuzetnim osećajem za gol. Izuzetan duel-igrač i prva linija presinga tima.', photo: '', stats: { appearances: 13, goals: 7, assists: 5, yellowCards: 2, redCards: 0 }, achievements: ['Zlatna kopačka 28. sezone'], joinedYear: 2020, birthYear: 1994 },
      'milan-nedic': { name: 'Milan Nedić', slug: 'milan-nedic', number: 5, position: 'Defender', photo: '', stats: { appearances: 11, goals: 5, assists: 3, yellowCards: 4, redCards: 1 }, achievements: ['Najbolji odbrambeni igrač 2025'], joinedYear: 2022, birthYear: 1998 },
      'stefan-lazarevic': { name: 'Stefan Lazarević', slug: 'stefan-lazarevic', number: 12, position: 'Goalkeeper', bio: 'Stub odbrane Pirlija, čuvar mreže koji unosi mirnoću ekipi sjajnim odbranama i igrom sa nogom.', photo: '', stats: { appearances: 14, goals: 0, assists: 2, yellowCards: 0, redCards: 0 }, achievements: ['Golman turnira Novi Sad 2025'], joinedYear: 2021, birthYear: 1995 }
    };

    player = mockPlayers[slug];
  }

  // If still not found, return 404
  if (!player) {
    notFound();
  }

  // Translate position to Serbian
  const positionLabel = {
    Goalkeeper: 'Golman',
    Defender: 'Odbrana',
    Midfielder: 'Vezni',
    Forward: 'Napad',
  }[player.position as 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'] || player.position;

  const positionColor = {
    Goalkeeper: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    Defender: 'border-blue-500/30 text-blue-450 text-blue-400 bg-blue-500/10',
    Midfielder: 'border-green-500/30 text-green-400 bg-green-500/10',
    Forward: 'border-red-500/30 text-red-500 bg-red-500/10',
  }[player.position as 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'] || 'border-slate-500/30 text-slate-400 bg-slate-500/10';

  const getInitials = (n: string) => {
    return n.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div className="flex-grow flex flex-col bg-[#0B1220] pb-12 w-full text-white">
      {/* Dynamic Header */}
      <div className="relative py-12 px-6 bg-[#111827] border-b border-slate-700 overflow-hidden">
        {/* Back Button */}
        <Link
          href="/players"
          className="absolute top-4 left-4 z-50 p-2 bg-slate-800/40 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all flex items-center justify-center"
        >
          <ChevronLeft size={18} />
        </Link>

        {/* Decorative absolute large jersey number */}
        <span className="absolute -bottom-6 -right-6 text-9*1.5 text-9xl font-extrabold text-slate-750/35 text-slate-800/25 select-none pointer-events-none font-mono">
          {player.number}
        </span>

        <div className="relative flex flex-col items-center md:items-start text-center md:text-left gap-6 mt-4 md:flex-row">
          {/* Photo Frame */}
          {player.photo ? (
            <div className="w-40 h-40 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shrink-0 bg-[#0B1220]">
              <img
                src={player.photo}
                alt={player.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="w-40 h-40 rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl shrink-0 bg-slate-800/50 flex items-center justify-center">
              <span className="text-5xl font-black text-slate-500 font-mono">
                {getInitials(player.name)}
              </span>
            </div>
          )}

          {/* Core Info */}
          <div className="flex-1 space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-widest ${positionColor}`}>
                  {positionLabel}
                </span>
                <span className="text-sm font-black font-mono text-blue-400">
                  #{player.number}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mt-2">
                {player.name}
              </h2>
            </div>

            {/* Quick stats mini cards */}
            <div className="grid grid-cols-5 gap-2 pt-2 max-w-sm">
              <div className="bg-[#1F2937] rounded-lg p-2 text-center border border-slate-800">
                <span className="text-[9px] font-bold text-slate-400 block uppercase font-mono">Nas</span>
                <span className="text-sm font-black text-white font-mono">{player.stats?.appearances || 0}</span>
              </div>
              <div className="bg-[#1F2937] rounded-lg p-2 text-center border border-slate-800">
                <span className="text-[9px] font-bold text-slate-400 block uppercase font-mono">Gol</span>
                <span className="text-sm font-black text-emerald-500 font-mono">{player.stats?.goals || 0}</span>
              </div>
              <div className="bg-[#1F2937] rounded-lg p-2 text-center border border-slate-800">
                <span className="text-[9px] font-bold text-slate-400 block uppercase font-mono">Asi</span>
                <span className="text-sm font-black text-blue-400 font-mono">{player.stats?.assists || 0}</span>
              </div>
              <div className="bg-[#1F2937] rounded-lg p-2 text-center border border-slate-800">
                <span className="text-[9px] font-bold text-slate-400 block uppercase font-mono">Žut</span>
                <span className="text-sm font-black text-yellow-500 font-mono">{player.stats?.yellowCards || 0}</span>
              </div>
              <div className="bg-[#1F2937] rounded-lg p-2 text-center border border-slate-800">
                <span className="text-[9px] font-bold text-slate-400 block uppercase font-mono">Crv</span>
                <span className="text-sm font-black text-rose-500 font-mono">{player.stats?.redCards || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Blocks */}
      <div className="px-5 mt-8 space-y-8">
        {/* BIO INFO */}
        <div className="space-y-2">
          <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Users size={12} className="text-blue-500" />
            O Igraču
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed bg-[#111827]/40 border border-slate-800/60 rounded-xl p-4">
            {player.bio || 'Trenutni član tima KMF Pirli. Ističe se velikom borbenošću na terenu i izuzetnom doprinosu klupskim uspesima u tekućoj takmičarskoj sezoni.'}
          </p>

          <div className="flex flex-col gap-2 pt-2 font-mono text-xs text-slate-400">
            {player.joinedYear && (
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span>Član kluba od:</span>
                <span className="text-white font-bold">{player.joinedYear}. godine</span>
              </div>
            )}
            {player.birthYear && (
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span>Godište:</span>
                <span className="text-white font-bold">{player.birthYear}. godine</span>
              </div>
            )}
          </div>
        </div>

        {/* CAREER STATS */}
        <div className="space-y-3">
          <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Shield size={12} className="text-blue-500" />
            Statistika
          </h3>
          <div className="bg-[#1F2937] rounded-xl border border-slate-705 border-slate-700/60 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#111827] text-slate-400 font-extrabold uppercase text-[9px] tracking-wider font-mono border-b border-slate-800">
                  <th className="px-3 py-3">Sezona</th>
                  <th className="px-3 py-3 text-center">Nastupi</th>
                  <th className="px-3 py-3 text-center">Golovi</th>
                  <th className="px-3 py-3 text-center">Asistencije</th>
                  <th className="px-3 py-3 text-center uppercase">Žuti</th>
                  <th className="px-3 py-3 text-center uppercase">Crveni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="text-slate-200">
                  <td className="px-3 py-3.5 font-bold font-sans">Tekuća sezona</td>
                  <td className="px-3 py-3.5 text-center text-white">{player.stats?.appearances || 0}</td>
                  <td className="px-3 py-3.5 text-center font-bold text-emerald-500">{player.stats?.goals || 0}</td>
                  <td className="px-3 py-3.5 text-center font-bold text-blue-400">{player.stats?.assists || 0}</td>
                  <td className="px-3 py-3.5 text-center text-yellow-500">{player.stats?.yellowCards || 0}</td>
                  <td className="px-3 py-3.5 text-center text-red-500">{player.stats?.redCards || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        {player.achievements && player.achievements.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Award size={12} className="text-amber-500 animate-pulse" />
              Dostignuća i Pehari
            </h3>
            <div className="space-y-2">
              {player.achievements.map((achievement: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-[#1F2937]/50 border border-slate-800 p-3.5 rounded-xl text-xs font-bold text-slate-200"
                >
                  <Trophy size={16} className="text-amber-500 shrink-0" />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
