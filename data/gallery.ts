// data/gallery.ts

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'Utakmice' | 'Trening' | 'Slavlje' | 'Tim';
}

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    category: 'Utakmice',
    caption: 'Pobedonosni penal u četvrtfinalu kupa Novog Sada.',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    category: 'Tim',
    caption: 'Ekipa KMF Pirli spremna za početak tekuće sezone.',
    url: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    category: 'Trening',
    caption: 'Uigravanje taktičkih zamisli pre trening meča.',
    url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    category: 'Slavlje',
    caption: 'Svlačionica gori nakon dobijene utakmice protiv Korvexa!',
    url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    category: 'Utakmice',
    caption: 'Sjajan gol iz voleja kapitena Srdjana Popovića.',
    url: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '6',
    category: 'Tim',
    caption: 'Kompletna postava stručnog štaba i igrača.',
    url: 'https://images.unsplash.com/photo-1516567727145-ab3c1a390024?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '7',
    category: 'Trening',
    caption: 'Večernji kondicioni drilovi u SC Hattrick.',
    url: 'https://images.unsplash.com/photo-1504305754058-2f08ccd89a0a?q=80&w=800&auto=format&fit=crop',
  },
];