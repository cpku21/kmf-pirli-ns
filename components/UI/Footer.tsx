'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, MapPin, Calendar, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] border-t border-slate-700 py-6 px-4 max-w-md mx-auto text-center space-y-4">
      {/* Club Meta info */}
      <div className="flex flex-col items-center space-y-2">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <Image
            src="https://minifudbalsrbije.rs/wp-content/uploads/2023/01/Pirli-logo-transparentni.png"
            alt="KMF Pirli Logo"
            width={44}
            height={44}
            className="object-contain"
          />
        </div>
        <h3 className="text-white font-extrabold text-base tracking-wide">KMF PIRLI</h3>
        <p className="text-xs text-slate-400 font-medium">Novi Sad, Srbija</p>
      </div>

      <div className="border-t border-slate-800/80 my-4" />

      {/* Info Rows */}
      <div className="text-xs text-slate-400 space-y-2 text-left max-w-xs mx-auto">
        <div className="flex items-center space-x-2">
          <MapPin size={14} className="text-blue-400 shrink-0" />
          <span>Domaći teren: <strong className="text-slate-300">SC Hattrick, I teren 5+1</strong></span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar size={14} className="text-blue-400 shrink-0" />
          <span>Liga: <strong className="text-slate-300">II Liga Novi Sad (Meridianbet)</strong></span>
        </div>
      </div>

      <div className="border-t border-slate-800/80 my-4" />

      {/* Social and Navigation */}
      <div className="flex flex-col items-center space-y-3">
        <a
          href="https://instagram.com/kmfpirli"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800/80 rounded-full border border-slate-700/60 text-slate-300 hover:text-white transition-all text-xs"
        >
          <Instagram size={14} className="text-pink-500" />
          <span>Pratite nas @kmfpirli</span>
        </a>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-400">
          <Link href="/players" className="hover:text-white">Igrači</Link>
          <Link href="/matches" className="hover:text-white">Utakmice</Link>
          <Link href="/standings" className="hover:text-white">Tabela</Link>
          <Link href="/history" className="hover:text-white">Istorija</Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="pt-4 text-[10px] text-slate-500 font-mono tracking-wider">
        <p>© {currentYear} KMF PIRLI Novi Sad</p>
        <p className="mt-1 flex items-center justify-center gap-1">
          Made for mobile with <Heart size={10} className="text-red-500 fill-red-500" /> in Novi Sad
        </p>
      </div>
    </footer>
  );
}
