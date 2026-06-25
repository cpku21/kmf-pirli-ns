"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Calendar, Trophy, Info } from "lucide-react";
import { cn } from "@/utils/cn";

const navItems = [
  { name: "Početna", href: "/", icon: Home },
  { name: "Igrači", href: "/players", icon: Users },
  { name: "Rezultati", href: "/matches", icon: Calendar },
  { name: "Tabela", href: "/standings", icon: Trophy },
  { name: "Klub", href: "/club", icon: Info },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B1220] border-t border-slate-800/80 px-2 py-1.5">
      <nav className="max-w-md mx-auto">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-lg transition-all duration-200",
                    isActive
                      ? "text-blue-400"
                      : "text-slate-500 hover:text-slate-300",
                  )}
                >
                  <Icon
                    size={22}
                    className={cn(
                      "transition-all duration-200",
                      isActive ? "scale-110" : "scale-100",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[8px] font-black uppercase tracking-wider transition-all duration-200",
                      isActive ? "text-blue-400" : "text-slate-500",
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}
