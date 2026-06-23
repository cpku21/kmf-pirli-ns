import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/db/mongoose';
import Season from '@/lib/model/Season';
import Standing from '@/lib/model/Standing';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const seasonParam = searchParams.get('season') || 'current';

    let seasonDoc = null;
    if (seasonParam === 'current') {
      seasonDoc = await Season.findOne({ isActive: true });
      if (!seasonDoc) {
        seasonDoc = await Season.findOne({}).sort({ year: -1 });
      }
    } else {
      seasonDoc = await Season.findById(seasonParam);
    }

    if (!seasonDoc) {
      return NextResponse.json({ standings: [], season: null });
    }

    const standings = await Standing.find({ season: seasonDoc._id }).sort({ position: 1 });
    return NextResponse.json({ standings, season: seasonDoc });
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
    const { season, standings } = body;

    if (!season || !Array.isArray(standings)) {
      return NextResponse.json({ error: 'Nedostaju obavezna polja: season i standings (niz)' }, { status: 400 });
    }

    const upsertPromises = standings.map((item) => {
      const position = Number(item.position);
      return Standing.findOneAndUpdate(
        { season, position },
        {
          season,
          position,
          team: item.team,
          isPirli: !!item.isPirli,
          logo: item.logo || '',
          played: Number(item.played || 0),
          wins: Number(item.wins || 0),
          draws: Number(item.draws || 0),
          losses: Number(item.losses || 0),
          goalsFor: Number(item.goalsFor || 0),
          goalsAgainst: Number(item.goalsAgainst || 0),
          goalDifference: Number(item.goalDifference || 0),
          points: Number(item.points || 0),
          form: item.form || [],
        },
        { upsert: true, new: true }
      );
    });

    const savedStandings = await Promise.all(upsertPromises);
    return NextResponse.json({ standings: savedStandings, message: 'Tabela uspešno osvežena' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Greška na serveru' }, { status: 500 });
  }
}
