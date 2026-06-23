import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/db/mongoose';
import Player from '@/lib/model/Player';
import mongoose from 'mongoose';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } | any }
) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    let player = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      player = await Player.findById(id);
    }
    if (!player) {
      player = await Player.findOne({ slug: id });
    }

    if (!player) {
      return NextResponse.json({ error: 'Igrač nije pronađen' }, { status: 404 });
    }

    return NextResponse.json({ player });
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

    let player = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      player = await Player.findByIdAndUpdate(id, body, { new: true });
    } else {
      player = await Player.findOneAndUpdate({ slug: id }, body, { new: true });
    }

    if (!player) {
      return NextResponse.json({ error: 'Igrač nije pronađen' }, { status: 404 });
    }

    return NextResponse.json({ player });
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

    let player = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      player = await Player.findByIdAndUpdate(id, { isActive: false }, { new: true });
    } else {
      player = await Player.findOneAndUpdate({ slug: id }, { isActive: false }, { new: true });
    }

    if (!player) {
      return NextResponse.json({ error: 'Igrač nije pronađen' }, { status: 404 });
    }

    return NextResponse.json({ player, message: 'Igrač je uspešno deaktiviran' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Greška na serveru' }, { status: 500 });
  }
}
