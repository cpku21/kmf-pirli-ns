import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/db/mongoose';
import Player from '@/lib/model/Player';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const position = searchParams.get('position');
    const search = searchParams.get('search');

    const query: any = { isActive: true };
    if (position) {
      query.position = position;
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const players = await Player.find(query).sort({ 'stats.goals': -1 });
    return NextResponse.json({ players });
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
    const { name, position, number, bio, photo, birthYear, joinedYear, stats, achievements } = body;

    if (!name || !position || number === undefined || number === null) {
      return NextResponse.json({ error: 'Nedostaju obavezna polja: name, position, number' }, { status: 400 });
    }

    const baseSlug = name
      .toLowerCase()
      .replace(/č/g, 'c')
      .replace(/ć/g, 'c')
      .replace(/ž/g, 'z')
      .replace(/š/g, 's')
      .replace(/đ/g, 'dj')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    // Check if slug already exists to prevent duplication
    const existingPlayer = await Player.findOne({ slug: baseSlug });
    const finalSlug = existingPlayer ? `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}` : baseSlug;

    const player = new Player({
      name,
      slug: finalSlug,
      number,
      position,
      bio: bio || '',
      photo: photo || '',
      birthYear,
      joinedYear,
      isActive: true,
      stats: stats || { appearances: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      achievements: achievements || [],
    });

    await player.save();
    return NextResponse.json({ player, message: 'Igrač dodat' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Greška na serveru' }, { status: 500 });
  }
}
