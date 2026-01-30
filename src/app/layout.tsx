import type { Metadata } from "next";
import { Outfit, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { CommandMenu } from "@/components/command-menu";
import { MusicPlayer } from "@/components/music-player";
import { KonamiListener } from "@/components/konami-listener";
import { NeonCursor } from "@/components/neon-cursor";
import { BootSequence } from "@/components/boot-sequence";
import { CRTOverlay } from "@/components/crt-overlay";
import { MatrixRain } from "@/components/matrix-rain";
import { ParticleNetwork } from "@/components/particle-network";
import { EmojiBurst } from "@/components/emoji-burst";
import { AchievementsWrapper } from "@/components/achievements-wrapper";
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
import { TicTacToe } from "@/components/tic-tac-toe";
import { JsonLd } from "@/components/json-ld";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/smooth-scroll";
import { GhostCursors } from "@/components/ghost-cursors";
import { InspectorMode } from "@/components/inspector-mode";
import { TechScanner } from "@/components/tech-scanner";
import { SourceCodeModal } from "@/components/source-code-modal";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
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
    url: "https://dexpie.web.id",
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
        className={`${outfit.variable} ${inter.variable} ${spaceMono.variable} antialiased`}
      >
        <SoundProvider>
          <SmoothScroll>
            <AchievementsProvider>
              <ScrollProgress />
              <ScrollProgress />
              <Toaster
                position="bottom-right"
                // Removed hardcoded theme="dark" and custom styles to let Sonner adapt to system theme or use its own default styles which are usually good
                richColors
                closeButton
              />

              {/* Core UI Components */}
              <CommandMenu />
              <MusicPlayer />
              <KonamiListener />
              <NeonCursor />
              <BootSequence />
              {/* Hide heavy cyber overlays in light mode for a cleaner look */}
              <BootSequence />
              {/* Hide heavy cyber overlays in light mode for a cleaner look */}
              <div className="hidden dark:block">
                <CRTOverlay />
                <MatrixRain />
                <ParticleNetwork />
              </div>
              <HackerTerminal />
              <MobileNav />

              {/* Wave 1 Components */}
              <SocialDock />
              <KeyboardShortcuts />
              <EasterEggs />
              <EmojiBurst />
              <AchievementsWrapper />
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
              <TicTacToe />
              <KeyboardVisualizer />
              <TicTacToe />
              <GhostCursors />
              <InspectorMode />
              <TechScanner />
              <SourceCodeModal />

              {/* Corner Utilities */}
              <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
                <AccessibilityMenu />
              </div>

              <div className="pb-16 md:pb-0">
                {children}
              </div>
            </AchievementsProvider>
          </SmoothScroll>
        </SoundProvider>
        <JsonLd />
      </body>
    </html>
  );
}
