import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CommandMenu } from "@/components/command-menu";
import { MusicPlayer } from "@/components/music-player";
import { KonamiListener } from "@/components/konami-listener";
import { NeonCursor } from "@/components/neon-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DexPortal | Your Project Hub",
  description: "A centralized portal for DexPDF, DexKomik, and more.",
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
        {children}
      </body>
    </html>
  );
}
