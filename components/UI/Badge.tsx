"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface ResultBadgeProps {
  result: "W" | "D" | "L" | null | string;
  className?: string;
  key?: React.Key;
}

export function ResultBadge({ result, className }: ResultBadgeProps) {
  if (!result) return null;

  const normalized = result.toUpperCase();
  let bgClass = "bg-slate-700 text-white";
  let label = normalized;

  if (normalized === "W" || normalized === "POBEDA" || normalized === "P") {
    bgClass = "bg-green-500/10 text-green-500 border border-green-500/20";
    label = "W";
  } else if (
    normalized === "D" ||
    normalized === "NEREŠENO" ||
    normalized === "N"
  ) {
    bgClass = "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20";
    label = "D";
  } else if (
    normalized === "L" ||
    normalized === "PORAZ" ||
    normalized === "I"
  ) {
    bgClass = "bg-red-500/10 text-red-500 border border-red-500/20";
    label = "L";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold font-mono tracking-wider shadow-sm",
        bgClass,
        className,
      )}
    >
      {label}
    </span>
  );
}

interface PositionBadgeProps {
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward" | string;
  className?: string;
  key?: React.Key;
}

export function PositionBadge({ position, className }: PositionBadgeProps) {
  let bgClass = "bg-slate-800 text-slate-300";
  let localized = position;

  switch (position) {
    case "Goalkeeper":
      bgClass = "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20";
      localized = "GK";
      break;
    case "Defender":
      bgClass = "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      localized = "DEF";
      break;
    case "Midfielder":
      bgClass = "bg-green-500/10 text-green-400 border border-green-500/20";
      localized = "MID";
      break;
    case "Forward":
      bgClass = "bg-red-500/10 text-red-400 border border-red-500/10";
      localized = "FWD";
      break;
    default:
      localized = position?.substring(0, 3).toUpperCase();
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider font-mono uppercase shadow-sm",
        bgClass,
        className,
      )}
    >
      {localized}
    </span>
  );
}
