import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions.tsx';
import Link from 'next/link';
import { Shield, Home, Users, Calendar, Trophy, Image as ImageIcon, LogOut } from 'lucide-react';
import Providers from '@/components/Providers.tsx';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // If not logged in, just render children directly.
  // This allows /admin/login to render beautifully without showing the sidebar.
  if (!session) {
    return <div className="bg-[#0B1220] min-h-screen text-white">{children}</div>;
  }

  return (
    <div className="bg-[#0B1220] min-h-screen flex flex-col md:flex-row text-white">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#111827] border-b md:border-b-0 md:border-r border-slate-800 shrink-0 flex flex-col justify-between">
        <div className="p-5 font-sans space-y-6">
          {/* Headline */}
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/25 flex items-center justify-center text-blue-500">
              <Shield size={16} />
            </span>
            <div>
              <h2 className="text-sm font-black uppercase text-white tracking-tight">Pirli Admin</h2>
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">{session.user?.name || 'Klub Menadžer'}</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 border-b md:border-b-0 border-slate-800 font-sans text-xs">
            <Link
              href="/admin"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-350 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shrink-0"
            >
              <Home size={14} className="text-slate-500" />
              <span>Kontrolna tabla</span>
            </Link>
            <Link
              href="/admin/players"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-350 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shrink-0"
            >
              <Users size={14} className="text-slate-500" />
              <span>Uredi Igrače</span>
            </Link>
            <Link
              href="/admin/matches"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-350 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shrink-0"
            >
              <Calendar size={14} className="text-slate-500" />
              <span>Uredi Utakmice</span>
            </Link>
            <Link
              href="/admin/standings"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-350 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shrink-0"
            >
              <Trophy size={14} className="text-slate-500" />
              <span>Uredi Tabelu</span>
            </Link>
            <Link
              href="/admin/gallery"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-350 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shrink-0"
            >
              <ImageIcon size={14} className="text-slate-500" />
              <span>Slike i Galerija</span>
            </Link>
          </nav>
        </div>

        {/* Logout and home footer link */}
        <div className="p-4 border-t border-slate-800 space-y-2 font-sans text-xs">
          <Link
            href="/"
            className="flex items-center justify-between text-slate-400 hover:text-white transition-colors duration-150 py-1.5 px-2"
          >
            <span>Nazad na sajt</span>
            <span className="text-[9px] bg-slate-850 px-1 rounded">PRO</span>
          </Link>
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-2 text-rose-450 text-rose-400 hover:text-rose-300 bg-rose-500/5 hover:bg-rose-505 hover:bg-red-500/10 transition-colors p-2 rounded-lg font-bold"
          >
            <LogOut size={13} />
            <span>Odjavi se</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Frame */}
      <main className="flex-1 min-h-[50vh] p-5 md:p-8 flex flex-col overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
