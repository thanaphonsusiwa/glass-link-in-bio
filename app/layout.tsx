import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Glass Thanaphon Susiwa — Content Creator",
  description: "Glass Thanaphon Susiwa | Content Creator | TikTok · Instagram · YouTube",
  openGraph: {
    title: "Glass Thanaphon Susiwa",
    description: "Content Creator — Follow me on TikTok, Instagram & YouTube",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#03091a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={`${inter.variable} antialiased`}>
      <body style={{ fontFamily: "var(--font-inter), -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
