import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CommandMenu } from "@/components/command-menu";
import { MusicPlayer } from "@/components/music-player";
import { KonamiListener } from "@/components/konami-listener";
import { NeonCursor } from "@/components/neon-cursor";
import { BootSequence } from "@/components/boot-sequence";
import { CRTOverlay } from "@/components/crt-overlay";
import { MatrixRain } from "@/components/matrix-rain";
import { ParticleNetwork } from "@/components/particle-network";
import { HackerTerminal } from "@/components/hacker-terminal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DexPie Portfolio | Creative Technologist",
  description: "A digital garden and portfolio showcasing the work of DexPie (Gading).",
  manifest: "/manifest.json",
  themeColor: "#E50914",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DexPortal",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CommandMenu />
        <MusicPlayer />
        <KonamiListener />
        <NeonCursor />
        <BootSequence />
        <CRTOverlay />
        <MatrixRain />
        <ParticleNetwork />
        <HackerTerminal />
        {children}
      </body>
    </html>
  );
}
