'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, User, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Molimo popunite sva polja.');
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setError('Netačno korisničko ime ili lozinka.');
        setSubmitting(false);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('Došlo je do greške prilikom prijave.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-5 text-white">
      <div id="login-card" className="w-full max-w-md bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        
        {/* Header Logo & Greetings */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/25 text-blue-500 rounded-xl flex items-center justify-center mx-auto shadow-inner">
            <Shield size={24} />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight text-white mt-3">Admin Panel</h2>
          <p className="text-[11px] text-slate-450 text-slate-400 font-mono tracking-wider">KMF PIRLI — UPRAVLJAČKA STRANA</p>
        </div>

        {/* Action Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          {error && (
            <div className="bg-red-500/15 border border-red-500/20 rounded-xl p-3 flex items-start gap-2 text-red-400 font-sans">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span className="text-[11px] font-bold">{error}</span>
            </div>
          )}

          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Korisničko Ime</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                <User size={14} />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="npr. admin"
                className="w-full bg-[#1F2937]/50 border border-slate-800/80 rounded-xl py-2.5 pl-9 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5 mt-4">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Lozinka</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                <Lock size={14} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1F2937]/50 border border-slate-800/80 rounded-xl py-2.5 pl-9 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 rounded-xl font-bold uppercase tracking-wider transition-all shadow-md mt-6 flex items-center justify-center gap-2 cursor-pointer font-sans text-xs"
          >
            {submitting ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Povezivanje...
              </>
            ) : (
              'Prijavi se'
            )}
          </button>
        </form>

        <div className="text-center font-mono text-[9px] text-slate-650 text-slate-500">
          Ukoliko nemate nalog obratite se Srpskoj Asocijaciji Minifudbala.
        </div>
      </div>
    </div>
  );
}
