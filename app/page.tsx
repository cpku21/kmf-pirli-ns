import React from "react";
import { getRecentMatches, getNextMatch, getSeasonStats } from "@/data/matches";
import { standings, seasonName as SEASON_NAME } from "@/data/standings";
import { getTopScorers } from "@/data/players";
import HeroSection from "@/components/home/HeroSection";
import StatsOverview from "@/components/home/StatsOverview";
import RecentResults from "@/components/home/RecentResults";
import StandingsPreview from "@/components/home/StandingsPreview";
import TopScorers from "@/components/home/TopScorers";

export default function HomePage() {
  const recentMatches = getRecentMatches(5).map((m) => ({
    _id: m.id,
    opponent: m.opponent,
    isHome: m.isHome,
    date: m.date,
    competition: m.competition,
    venue: m.venue,
    pirliScore: m.pirliScore,
    opponentScore: m.opponentScore,
    result: m.result,
  }));

  const nextMatchRaw = getNextMatch();
  const nextMatch = nextMatchRaw
    ? {
        _id: nextMatchRaw.id,
        opponent: nextMatchRaw.opponent,
        isHome: nextMatchRaw.isHome,
        date: nextMatchRaw.date,
        competition: nextMatchRaw.competition,
        venue: nextMatchRaw.venue,
        pirliScore: nextMatchRaw.pirliScore,
        opponentScore: nextMatchRaw.opponentScore,
        result: nextMatchRaw.result,
      }
    : null;

  const seasonStats = getSeasonStats();

  const season = {
    name: SEASON_NAME,
    stats: seasonStats,
  };

  const pirliStanding = standings.find((s) => s.isPirli) ?? null;

  // ⭐ FIX: Dodat tip za p parametar
  const topScorers = getTopScorers(5).map(
    (p: {
      name: string;
      slug: string;
      photo: string | null;
      stats: { goals: number; appearances: number };
    }) => ({
      name: p.name,
      slug: p.slug,
      photo: p.photo || undefined,
      goals: p.stats.goals,
      appearances: p.stats.appearances,
    }),
  );

  const plainStandings = standings.map((s) => ({
    position: s.position,
    team: s.team,
    isPirli: s.isPirli,
    played: s.played,
    wins: s.wins,
    draws: s.draws,
    losses: s.losses,
    goalsFor: s.goalsFor,
    goalsAgainst: s.goalsAgainst,
    goalDifference: s.goalDifference,
    points: s.points,
  }));

  return (
    <div className="flex-grow flex flex-col bg-[#0B1220] pb-12 w-full">
      <HeroSection nextMatch={nextMatch} />
      <div className="px-4 mt-6 space-y-8">
        <StatsOverview season={season} pirliStanding={pirliStanding} />
        <RecentResults matches={recentMatches} />
        <StandingsPreview standings={plainStandings} seasonName={SEASON_NAME} />
        <TopScorers scorers={topScorers} />
      </div>
    </div>
  );
}
