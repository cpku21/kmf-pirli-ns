import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/db/mongoose';
import Season from '@/lib/model/Season';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const seasons = await Season.find({}).sort({ year: -1 });
    return NextResponse.json({ seasons });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Greška na serveru' }, { status: 500 }); // user: return status 500
  }
}

// Ensure return pattern: try/catch, return NextResponse.json({ error }, { status: 500 })
// Let's explicitly catch and format errors
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Neovlašćen pristup' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const { name, year, competition, isActive, finalPosition, stats } = body;

    if (!name || year === undefined || year === null || !competition) {
      return NextResponse.json({ error: 'Nedostaju obavezna polja: name, year, competition' }, { status: 400 });
    }

    if (isActive) {
      await Season.updateMany({}, { isActive: false });
    }

    const season = new Season({
      name,
      year,
      competition,
      isActive: !!isActive,
      finalPosition,
      stats: stats || { played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    });

    await season.save();
    return NextResponse.json({ season, message: 'Sezona je uspešno kreirana' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Greška na serveru' }, { status: 500 });
  }
}
