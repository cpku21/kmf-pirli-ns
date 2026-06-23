import React from 'react';
import type { Metadata } from 'next';
import Providers from '@/components/Providers.tsx';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'KMF PIRLI | Novi Sad',
  description: 'Zvanični sajt futsal kluba KMF PIRLI iz Novog Sada. II Liga Novi Sad, Meridianbet Liga.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="sr" className="bg-[#030712]">
      <body className="bg-[#030712] min-h-screen text-white select-none">
        <Providers>
          {/* Mobile App Frame Container / Shell */}
          <div className="relative min-h-screen max-w-md mx-auto bg-[#0B1220] shadow-2xl border-x border-slate-800/60 flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
