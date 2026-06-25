import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/UI/Footer";
import Header from "@/components/UI/Header";

export const metadata: Metadata = {
  title: "KMF PIRLI | Novi Sad",
  description:
    "Zvanični sajt futsal kluba KMF PIRLI iz Novog Sada. II Liga Novi Sad, Meridianbet Liga.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className="bg-[#030712]">
      <body className="bg-[#030712] min-h-screen text-white select-none">
        <div className="relative min-h-screen max-w-md mx-auto bg-[#0B1220] shadow-2xl border-x border-slate-800/60 flex flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
