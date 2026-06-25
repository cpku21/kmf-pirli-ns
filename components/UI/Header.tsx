"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#111827] border-b border-slate-800/80 flex items-center justify-between px-4 z-50 max-w-md mx-auto shadow-sm">
      {/* Logo i naziv - vodi na početnu */}
      <Link
        href="/"
        className="flex items-center space-x-2.5 active:opacity-80 transition-opacity"
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Image
            src="https://minifudbalsrbije.rs/wp-content/uploads/2023/01/Pirli-logo-transparentni.png"
            alt="KMF Pirli"
            width={28}
            height={28}
            priority
            className="object-contain"
          />
        </div>
        <div>
          <span className="text-white font-black text-sm tracking-wide block leading-none">
            KMF PIRLI
          </span>
          <span className="text-[9px] text-blue-400 font-bold tracking-wider uppercase block mt-0.5 font-mono">
            Novi Sad
          </span>
        </div>
      </Link>

      {/* Instagram logo - desno */}
      <a
        href="https://www.instagram.com/kmfpirli"
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 text-slate-400 hover:text-white rounded-lg active:bg-slate-800 transition-colors"
        aria-label="Instagram"
      >
        <Instagram size={17} className="text-pink-500/90" />
      </a>
    </header>
  );
}
