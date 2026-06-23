import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/db/mongoose';
import Gallery from '@/lib/model/Gallery';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const query: any = {};
    if (category) {
      query.category = category;
    }

    // Since timestamps mapping used 'uploadedAt' as the createdAt field, we sort by uploadedAt
    const gallery = await Gallery.find(query).sort({ uploadedAt: -1 });
    return NextResponse.json({ gallery });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Greška na serveru' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Neovlašćen pristup' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const { url, caption, category, season, match } = body;

    if (!url || !category) {
      return NextResponse.json({ error: 'Nedostaju obavezna polja: url, category' }, { status: 400 });
    }

    const galleryItem = new Gallery({
      url,
      caption: caption || '',
      category,
      season: season || undefined,
      match: match || undefined,
    });

    await galleryItem.save();
    return NextResponse.json({ gallery: galleryItem, message: 'Slika je sačuvana u galeriju' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Greška na serveru' }, { status: 500 });
  }
}
