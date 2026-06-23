import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/db/mongoose';
import Match from '@/lib/model/Match';
import Season from '@/lib/model/Season'; // ensure Season model is registered for populate

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const resultParam = searchParams.get('result');
    const upcomingParam = searchParams.get('upcoming');
    const seasonParam = searchParams.get('season');

    const query: any = {};
    if (resultParam) {
      query.result = resultParam;
    }
    if (seasonParam) {
      query.season = seasonParam;
    }
    if (upcomingParam === 'true') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      query.date = { $gte: today };
    } else if (upcomingParam === 'false') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      query.date = { $lt: today };
    }

    const matches = await Match.find(query)
      .sort({ date: -1 })
      .populate('season', 'name year');

    return NextResponse.json({ matches });
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
    const {
      date,
      opponent,
      isHome,
      competition,
      season,
      venue,
      pirliScore,
      opponentScore,
      goalscorers,
      notes,
      gallery,
    } = body;

    if (!date || !opponent) {
      return NextResponse.json({ error: 'Nedostaju obavezna polja: date, opponent' }, { status: 400 });
    }

    // Auto-compute result from pirliScore vs opponentScore
    let calculatedResult = null;
    if (
      pirliScore !== null &&
      opponentScore !== null &&
      pirliScore !== undefined &&
      opponentScore !== undefined
    ) {
      const pScore = Number(pirliScore);
      const oScore = Number(opponentScore);
      if (pScore > oScore) {
        calculatedResult = 'W';
      } else if (pScore < oScore) {
        calculatedResult = 'L';
      } else {
        calculatedResult = 'D';
      }
    }

    const match = new Match({
      date,
      opponent,
      isHome: isHome !== undefined ? isHome : true,
      competition: competition || 'II Liga Novi Sad',
      season: season || undefined,
      venue: venue || 'SC Hattrick, I teren 5+1',
      pirliScore: pirliScore !== undefined ? pirliScore : null,
      opponentScore: opponentScore !== undefined ? opponentScore : null,
      result: calculatedResult,
      goalscorers: goalscorers || [],
      notes: notes || '',
      gallery: gallery || [],
    });

    await match.save();
    return NextResponse.json({ match, message: 'Utakmica je uspešno sačuvana' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Greška na serveru' }, { status: 500 });
  }
}
