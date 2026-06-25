"use client";

import React from "react";
import {
  Home,
  Users,
  Calendar,
  Trophy,
  ChevronRight,
  Activity,
} from "lucide-react";
import { cn } from "@/utils/cn";

interface BottomNavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function BottomNavigation({
  currentPath,
  onNavigate,
}: BottomNavigationProps) {
  const tabs = [
    { name: "Početna", path: "/", icon: Home },
    { name: "Igrači", path: "/players", icon: Users },
    { name: "Rezultati", path: "/matches", icon: Calendar },
    { name: "Tabela", path: "/standings", icon: Trophy },
    { name: "Klub", path: "/club", icon: Activity },
  ];

  const handleTabClick = (path: string) => {
    onNavigate(path);
    // Sync with router state of browser
    window.history.pushState({}, "", path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#111827] border-t border-slate-800 flex items-center justify-around px-2 z-50 max-w-md mx-auto shadow-lg pb-safe">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          currentPath === tab.path ||
          (tab.path === "/" && (currentPath === "" || currentPath === "/home"));

        return (
          <button
            key={tab.path}
            onClick={() => handleTabClick(tab.path)}
            className="flex flex-col items-center justify-center flex-1 h-full py-2 active:scale-95 transition-all text-center focus:outline-none"
          >
            <div
              className={cn(
                "p-1 rounded-lg transition-colors flex items-center justify-center",
                isActive
                  ? "text-blue-400 bg-blue-500/10"
                  : "text-slate-450 text-slate-400",
              )}
            >
              <Icon
                size={20}
                className={cn(
                  "transition-transform duration-200",
                  isActive && "scale-110",
                )}
              />
            </div>
            <span
              className={cn(
                "text-[10px] font-bold mt-1 uppercase tracking-wider font-sans",
                isActive ? "text-blue-400 font-extrabold" : "text-slate-500",
              )}
            >
              {tab.name}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
