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
import { ScrollProgress } from "@/components/scroll-progress";
import { MobileNav } from "@/components/mobile-nav";
import { Toaster } from "sonner";

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
  themeColor: "#06b6d4",
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
        <ScrollProgress />
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
            },
          }}
        />
        <CommandMenu />
        <MusicPlayer />
        <KonamiListener />
        <NeonCursor />
        <BootSequence />
        <CRTOverlay />
        <MatrixRain />
        <ParticleNetwork />
        <HackerTerminal />
        <MobileNav />
        <div className="pb-16 md:pb-0">
          {children}
        </div>
      </body>
    </html>
  );
}
