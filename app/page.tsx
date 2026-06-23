import React from 'react';
import connectToDatabase from '@/lib/db/mongoose.tsx';
import Match from '@/lib/model/Match.tsx';
import Season from '@/lib/model/Season.tsx';
import Standing from '@/lib/model/Standing.tsx';
import Player from '@/lib/model/Player.tsx';

import HeroSection from '@/components/home/HeroSection.tsx';
import StatsOverview from '@/components/home/StatsOverview.tsx';
import RecentResults from '@/components/home/RecentResults.tsx';
import StandingsPreview from '@/components/home/StandingsPreview.tsx';
import TopScorers from '@/components/home/TopScorers.tsx';

export const revalidate = 60; // cached for 60 seconds

export default async function HomePage() {
  let activeSeason: any = null;
  let standingRows: any[] = [];
  let pirliStanding: any = null;
  let recentMatches: any[] = [];
  let nextMatch: any = null;
  let topScorers: any[] = [];

  try {
    await connectToDatabase();

    // 1. Fetch active season (or most recent)
    activeSeason = await Season.findOne({ isActive: true }).lean();
    if (!activeSeason) {
      activeSeason = await Season.findOne({}).sort({ year: -1 }).lean();
    }

    // 2. Fetch standings for active season
    if (activeSeason) {
      standingRows = await Standing.find({ season: activeSeason._id })
        .sort({ position: 1 })
        .lean();
      
      pirliStanding = standingRows.find(row => row.isPirli);
    }

    // 3. Fetch recent results (completed matches)
    recentMatches = await Match.find({ pirliScore: { $ne: null } })
      .sort({ date: -1 })
      .limit(5)
      .lean();

    // Convert dates to ISO strings for child compatibility
    recentMatches = recentMatches.map(m => ({
      ...m,
      _id: m._id.toString(),
      date: m.date instanceof Date ? m.date.toISOString() : m.date,
      season: m.season ? m.season.toString() : null,
    }));

    // 4. Fetch next match (future or unscheduled/not played)
    const now = new Date();
    nextMatch = await Match.findOne({ pirliScore: null, date: { $gte: now } })
      .sort({ date: 1 })
      .lean();

    if (!nextMatch) {
      // If no upcoming matches found, fallback to any unplayed match or the last scheduled one
      nextMatch = await Match.findOne({ pirliScore: null })
        .sort({ date: 1 })
        .lean();
    }

    if (nextMatch) {
      nextMatch = {
        ...nextMatch,
        _id: nextMatch._id.toString(),
        date: nextMatch.date instanceof Date ? nextMatch.date.toISOString() : nextMatch.date,
        season: nextMatch.season ? nextMatch.season.toString() : null,
      };
    }

    // 5. Fetch top scorers from Player
    const players = await Player.find({ isActive: true })
      .sort({ 'stats.goals': -1 })
      .limit(5)
      .lean();

    topScorers = players.map(p => ({
      name: p.name,
      slug: p.slug,
      photo: p.photo || '',
      goals: p.stats.goals || 0,
      appearances: p.stats.appearances || 0,
    }));

  } catch (error) {
    console.error('Došlo je do greške prilikom preuzimanja podataka za početnu stranu:', error);
  }

  // Final sanitizing of mongo objects to plain data
  const plainSeason = activeSeason ? {
    name: activeSeason.name,
    year: activeSeason.year,
    competition: activeSeason.competition,
    isActive: activeSeason.isActive,
    stats: activeSeason.stats || { played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    finalPosition: activeSeason.finalPosition
  } : null;

  const plainStandingRows = standingRows.map(row => ({
    position: row.position,
    team: row.team,
    isPirli: row.isPirli,
    played: row.played,
    wins: row.wins,
    draws: row.draws,
    losses: row.losses,
    goalsFor: row.goalsFor,
    goalsAgainst: row.goalsAgainst,
    goalDifference: row.goalDifference,
    points: row.points,
  }));

  const plainPirliStanding = pirliStanding ? {
    position: pirliStanding.position,
    points: pirliStanding.points,
    form: pirliStanding.form || [],
  } : null;

  return (
    <div className="flex-grow flex flex-col bg-[#0B1220] pb-12 w-full">
      {/* 1. Hero Section */}
      <HeroSection nextMatch={nextMatch} />

      {/* 2. Main Content Blocks */}
      <div className="px-4 mt-6 space-y-8">
        {/* Stats Grid */}
        <StatsOverview season={plainSeason} pirliStanding={plainPirliStanding} />

        {/* Recent Matches */}
        <RecentResults matches={recentMatches} />

        {/* Standings Table Preview */}
        <StandingsPreview standings={plainStandingRows} seasonName={plainSeason?.name} />

        {/* Top Scorers */}
        <TopScorers scorers={topScorers} />
      </div>
    </div>
  );
}
