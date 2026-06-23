'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Shield, Instagram } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('/');
    window.history.pushState({}, '', '/');
  };

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newPath = currentPath === '/admin' ? '/' : '/admin';
    onNavigate(newPath);
    window.history.pushState({}, '', newPath);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#111827] border-b border-slate-800/80 flex items-center justify-between px-4 z-50 max-w-md mx-auto shadow-sm">
      {/* Brand & Logo Clickable for Home */}
      <a href="/" onClick={handleLogoClick} className="flex items-center space-x-2.5 active:opacity-80 transition-opacity">
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
      </a>

      {/* Utility Action Icons */}
      <div className="flex items-center space-x-3.5">
        <a
          href="https://instagram.com/kmfpirli"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-slate-400 hover:text-white rounded-lg active:bg-slate-800 transition-colors"
          title="Pratite nas na Instagramu"
        >
          <Instagram size={17} className="text-pink-500/90" />
        </a>
        <a
          href="/admin"
          onClick={handleAdminClick}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg active:bg-slate-800 transition-colors"
          title="Admin panel"
        >
          <Shield size={17} className={currentPath.startsWith('/admin') ? 'text-blue-400' : 'text-slate-400'} />
        </a>
      </div>
    </header>
  );
}
