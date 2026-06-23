'use client';

import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxProps {
  images: Array<{
    url: string;
    caption?: string;
  }>;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext
}: LightboxProps) {
  // Key bindings for slider controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (images.length === 0 || currentIndex < 0 || currentIndex >= images.length) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <div
      id="gallery-lightbox-overlay"
      className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-4"
    >
      {/* Top Bar with counter & exit */}
      <div className="flex items-center justify-between text-white py-2 px-1">
        <span className="text-xs font-mono font-bold tracking-wider opacity-80">
          Uvećanje {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="p-1.5 bg-slate-900/60 text-slate-300 hover:text-white rounded-lg border border-slate-850 hover:bg-slate-800 transition-all cursor-pointer"
          type="button"
        >
          <X size={18} />
        </button>
      </div>

      {/* Centered Image viewport and sliders */}
      <div className="relative flex-grow flex items-center justify-center max-h-[80vh] w-full max-w-2xl mx-auto">
        {/* Prev Trigger */}
        <button
          onClick={onPrev}
          className="absolute left-1 z-10 p-2.5 bg-slate-900/50 hover:bg-slate-800 text-slate-300 hover:text-white rounded-full border border-slate-800/40 cursor-pointer"
          type="button"
        >
          <ChevronLeft size={20} />
        </button>

        {/* The Frame Element */}
        <img
          src={currentImage.url}
          alt={currentImage.caption || 'KMF Pirli'}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-slate-900"
          referrerPolicy="no-referrer"
        />

        {/* Next Trigger */}
        <button
          onClick={onNext}
          className="absolute right-1 z-10 p-2.5 bg-slate-900/50 hover:bg-slate-800 text-slate-300 hover:text-white rounded-full border border-slate-800/40 cursor-pointer"
          type="button"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Description / Caption Footer */}
      <div className="text-center pb-6 max-w-lg mx-auto">
        <p className="text-sm text-slate-300 font-bold leading-relaxed px-4">
          {currentImage.caption || 'Zvanične fotografije futsal kluba KMF Pirli.'}
        </p>
      </div>
    </div>
  );
}
