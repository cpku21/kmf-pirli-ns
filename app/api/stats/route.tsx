import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongoose';
import Match from '@/lib/model/Match';
import Season from '@/lib/model/Season';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    // 1. All-time general stats from played matches
    const matchHistory = await Match.find({ result: { $in: ['W', 'D', 'L'] } });

    const played = matchHistory.length;
    const wins = matchHistory.filter((m) => m.result === 'W').length;
    const draws = matchHistory.filter((m) => m.result === 'D').length;
    const losses = matchHistory.filter((m) => m.result === 'L').length;
    const goalsFor = matchHistory.reduce((sum, m) => sum + (m.pirliScore || 0), 0);
    const goalsAgainst = matchHistory.reduce((sum, m) => sum + (m.opponentScore || 0), 0);
    const winRate = played > 0 ? ((wins / played) * 100).toFixed(2) + '%' : '0.00%';

    const allTime = {
      played,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      winRate,
    };

    // 2. Per season: group by season, count W/D/L, sum goals
    const bySeasonAggregate = await Match.aggregate([
      { $match: { result: { $in: ['W', 'D', 'L'] } } },
      {
        $group: {
          _id: '$season',
          played: { $sum: 1 },
          wins: { $sum: { $cond: [{ $eq: ['$result', 'W'] }, 1, 0] } },
          draws: { $sum: { $cond: [{ $eq: ['$result', 'D'] }, 1, 0] } },
          losses: { $sum: { $cond: [{ $eq: ['$result', 'L'] }, 1, 0] } },
          goalsFor: { $sum: '$pirliScore' },
          goalsAgainst: { $sum: '$opponentScore' },
        },
      },
    ]);

    const byYearUnsorted = await Promise.all(
      bySeasonAggregate.map(async (item) => {
        if (item._id) {
          const seasonDoc = await Season.findById(item._id).select('name year');
          return {
            seasonId: item._id,
            seasonName: seasonDoc?.name || 'Nepoznata Sezona',
            seasonYear: seasonDoc?.year || 0,
            played: item.played,
            wins: item.wins,
            draws: item.draws,
            losses: item.losses,
            goalsFor: item.goalsFor,
            goalsAgainst: item.goalsAgainst,
          };
        }
        return {
          seasonId: null,
          seasonName: 'Bez Sezone',
          seasonYear: 0,
          played: item.played,
          wins: item.wins,
          draws: item.draws,
          losses: item.losses,
          goalsFor: item.goalsFor,
          goalsAgainst: item.goalsAgainst,
        };
      })
    );

    const byYear = byYearUnsorted.sort((a, b) => b.seasonYear - a.seasonYear);

    // 3. Top scorers: aggregate goalscorers array, group by playerName, sum count
    const topScorersAggregate = await Match.aggregate([
      { $unwind: '$goalscorers' },
      { $match: { 'goalscorers.isOwnGoal': { $ne: true } } },
      {
        $group: {
          _id: {
            playerName: '$goalscorers.playerName',
            player: '$goalscorers.player',
          },
          goals: { $sum: 1 },
        },
      },
      { $sort: { goals: -1 } },
      { $limit: 15 },
      {
        $project: {
          _id: 0,
          playerName: '$_id.playerName',
          player: '$_id.player',
          goals: 1,
        },
      },
    ]);

    return NextResponse.json({
      allTime,
      byYear,
      topScorers: topScorersAggregate,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Greška na serveru' }, { status: 500 });
  }
}
