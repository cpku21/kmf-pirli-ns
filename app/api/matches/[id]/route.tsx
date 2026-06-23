import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/db/mongoose';
import Match from '@/lib/model/Match';
import Player from '@/lib/model/Player'; // ensure Player model is registered for populate
import Season from '@/lib/model/Season'; // ensure Season model is registered for populate

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } | any }
) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const match = await Match.findById(id)
      .populate('season')
      .populate('goalscorers.player', 'name slug');

    if (!match) {
      return NextResponse.json({ error: 'Utakmica nije pronađena' }, { status: 404 });
    }

    return NextResponse.json({ match });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Greška na serveru' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } | any }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Neovlašćen pristup' }, { status: 401 });
    }

    await connectToDatabase();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await req.json();

    const match = await Match.findById(id);
    if (!match) {
      return NextResponse.json({ error: 'Utakmica nije pronađena' }, { status: 404 });
    }

    // Determine final score values to calculate result
    const pScore = body.pirliScore !== undefined ? body.pirliScore : match.pirliScore;
    const oScore = body.opponentScore !== undefined ? body.opponentScore : match.opponentScore;

    let calculatedResult = null;
    if (pScore !== null && oScore !== null && pScore !== undefined && oScore !== undefined) {
      const p = Number(pScore);
      const o = Number(oScore);
      if (p > o) {
        calculatedResult = 'W';
      } else if (p < o) {
        calculatedResult = 'L';
      } else {
        calculatedResult = 'D';
      }
    }
    body.result = calculatedResult;

    const updatedMatch = await Match.findByIdAndUpdate(id, body, { new: true })
      .populate('season')
      .populate('goalscorers.player', 'name slug');

    return NextResponse.json({ match: updatedMatch, message: 'Utakmica uspešno ažurirana' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Greška na serveru' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } | any }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Neovlašćen pristup' }, { status: 401 });
    }

    await connectToDatabase();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const match = await Match.findByIdAndDelete(id);
    if (!match) {
      return NextResponse.json({ error: 'Utakmica nije pronađena' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Utakmica uspešno obrisana' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Greška na serveru' }, { status: 500 });
  }
}
