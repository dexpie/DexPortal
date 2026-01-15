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
import { SocialDock } from "@/components/social-dock";
import { SoundProvider } from "@/components/sound-system";
import { EasterEggs } from "@/components/easter-eggs";
import { AchievementsProvider } from "@/components/achievements";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { FabMenu } from "@/components/fab-menu";
import { ScrollToTop } from "@/components/scroll-to-top";
import { RandomTip } from "@/components/random-tip";
import { ChatBot } from "@/components/chat-bot";
import { OfflineIndicator } from "@/components/offline-indicator";
import { ReadingProgress } from "@/components/reading-progress";
import { CursorReactions } from "@/components/cursor-reactions";
import { SpotlightCard } from "@/components/spotlight-card";
import { AlertContainer } from "@/components/alert";
import { PomodoroTimer } from "@/components/pomodoro-timer";
import { ZenMode } from "@/components/zen-mode";
import { AccessibilityMenu } from "@/components/accessibility-menu";
import { KeyboardVisualizer } from "@/components/keyboard-visualizer";
import { JsonLd } from "@/components/json-ld";
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
  verification: {
    google: "agO2vFVgbizzTaquR_kQqCsxd8n7dM0yGCAm98ZHvGQ",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DexPortal",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  openGraph: {
    title: "DexPie Portfolio | Creative Technologist",
    description: "Exploring the frontiers of web development, AI, and digital experiences.",
    url: "https://dexportal.vercel.app",
    siteName: "DexPortal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DexPie Portfolio",
    description: "Creative Tech by DexPie",
    creator: "@dexpie",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SoundProvider>
          <AchievementsProvider>
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

            {/* Core UI Components */}
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

            {/* Wave 1 Components */}
            <SocialDock />
            <KeyboardShortcuts />
            <EasterEggs />
            <FabMenu />
            <ScrollToTop />

            {/* Wave 2 Components */}
            <RandomTip />
            <ChatBot />
            <OfflineIndicator />

            {/* Wave 3 Components */}
            <ReadingProgress />
            <CursorReactions />
            <SpotlightCard />

            {/* Wave 4 Components */}
            <AlertContainer />

            {/* Wave 5 Components */}
            <PomodoroTimer />
            <ZenMode />
            <KeyboardVisualizer />

            {/* Corner Utilities */}
            <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
              <AccessibilityMenu />
            </div>

            <div className="pb-16 md:pb-0">
              {children}
            </div>
          </AchievementsProvider>
        </SoundProvider>
        <JsonLd />
      </body>
    </html>
  );
}
