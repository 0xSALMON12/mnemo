import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MNEMO — The Daily Name Game",
  description:
    "You walk into a party. You walk out knowing every single person's name. A daily memory game built on real memory-athlete techniques — face files, name-images, memory palaces, and spaced review.",
  keywords: ["memory game", "mnemonics", "daily puzzle", "memory palace", "names", "spaced repetition"],
  authors: [{ name: "MNEMO" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "MNEMO — The Daily Name Game",
    description: "One crowd a day. Your memory is the save file.",
    siteName: "MNEMO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF3E4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
