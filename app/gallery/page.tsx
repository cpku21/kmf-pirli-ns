'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { ChevronLeft, Grid, Image as ImageIcon, Loader2 } from 'lucide-react';
import Lightbox from '@/components/gallery/Lightbox.tsx';

interface GalleryItem {
  _id: string;
  url: string;
  caption: string;
  category: 'Utakmice' | 'Trening' | 'Slavlje' | 'Tim' | string;
}

export default function GalleryPage() {
  const [loading, setLoading] = useState(true);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Sve');
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get('/api/gallery');
        if (response.data && response.data.gallery) {
          setGalleryItems(response.data.gallery);
        }
      } catch (err) {
        console.error('Došlo je do greške pri učitavanju galerije:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const categories = ['Sve', 'Utakmice', 'Trening', 'Slavlje', 'Tim'];

  // Handcrafted premium fallback gallery pictures if the mongo collection is unseeded.
  const displayItems = useMemo(() => {
    let items = galleryItems;
    if (items.length === 0) {
      items = [
        { _id: 'fallback-1', category: 'Utakmice', caption: 'Pobedonosni penal u četvrtfinalu kupa Novog Sada.', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop' },
        { _id: 'fallback-2', category: 'Tim', caption: 'Ekipa KMF Pirli spremna za početak tekuće sezone.', url: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800&auto=format&fit=crop' },
        { _id: 'fallback-3', category: 'Trening', caption: 'Uigravanje taktičkih zamisli pre trening meča.', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop' },
        { _id: 'fallback-4', category: 'Slavlje', caption: 'Svlačionica gori nakon dobijene utakmice protiv Korvexa!', url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop' },
        { _id: 'fallback-5', category: 'Utakmice', caption: 'Sjajan gol iz voleja kapitena Srdjana Popovića.', url: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=800&auto=format&fit=crop' },
        { _id: 'fallback-6', category: 'Tim', caption: 'Kompletna postava stručnog štaba i igrača.', url: 'https://images.unsplash.com/photo-1516567727145-ab3c1a390024?q=80&w=800&auto=format&fit=crop' },
        { _id: 'fallback-7', category: 'Trening', caption: 'Večernji kondicioni drilovi u SC Hattrick.', url: 'https://images.unsplash.com/photo-1504305754058-2f08ccd89a0a?q=80&w=800&auto=format&fit=crop' },
      ];
    }

    if (activeCategory === 'Sve') {
      return items;
    }
    return items.filter(item => item.category === activeCategory);
  }, [galleryItems, activeCategory]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(-1);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? displayItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === displayItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex-grow flex flex-col bg-[#0B1220] pb-12 w-full text-white">
      {/* Page Header */}
      <div className="py-6 px-5 bg-[#111827] border-b border-slate-700/60 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-xl font-black text-white uppercase tracking-tight">Galerija Slika</h1>
        </div>
        <span className="text-[10px] bg-blue-600/10 border border-blue-500/20 text-blue-400 tracking-wider font-extrabold uppercase px-2 py-1 rounded">
          MEDS
        </span>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* Horizontal scrollable category filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-800/60">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-black rounded-lg transition-all uppercase tracking-wider shrink-0 ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Image layout */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 size={32} className="animate-spin text-blue-500 mx-auto" />
            <p className="text-xs text-slate-500 font-mono mt-3">Učitavanje slika...</p>
          </div>
        ) : (
          <div>
            <div className="columns-2 md:columns-3 gap-4">
              {displayItems.map((item, index) => (
                <div
                  key={item._id}
                  onClick={() => openLightbox(index)}
                  className="break-inside-avoid mb-4 overflow-hidden rounded-xl border border-slate-800/40 bg-slate-900 cursor-pointer group relative shadow-md"
                >
                  <img
                    src={item.url}
                    alt={item.caption || 'KMF PIRLI'}
                    className="w-full h-auto max-h-72 object-cover hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Subtle info card on hover or standard on mobile */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-[9px] bg-blue-600 text-white font-extrabold px-1.5 py-0.5 rounded uppercase font-mono tracking-wider">
                      {item.category}
                    </span>
                    <p className="text-[11px] text-slate-250 mt-1 truncate font-sans text-slate-200 font-bold">
                      {item.caption || 'KMF Pirli futsal klub'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {displayItems.length === 0 && (
              <div className="text-center py-16 bg-[#1F2937]/30 border border-dashed border-slate-800 rounded-xl p-6">
                <ImageIcon size={32} className="text-slate-500 mx-auto" />
                <h4 className="mt-2 text-xs font-black uppercase text-white tracking-widest">Nema slika</h4>
                <p className="text-[11px] text-slate-400 mt-1">U izabranoj kategoriji nema opisanih slika.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox dialog modal */}
      {lightboxIndex >= 0 && (
        <Lightbox
          images={displayItems.map(item => ({ url: item.url, caption: item.caption }))}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
