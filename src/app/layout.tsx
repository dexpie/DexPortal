import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} antialiased min-h-screen`}
      >
        <ThemeProvider>
          <SmoothScroll>
            <Toaster position="bottom-right" richColors closeButton />
            <div className="relative">
              {children}
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
