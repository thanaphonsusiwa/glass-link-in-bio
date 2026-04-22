import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Glass — Content Creator",
  description: "Glass | Age 34 | 173cm | 84kg | Content Creator",
  // Open Graph for link previews
  openGraph: {
    title: "Glass — Content Creator",
    description: "Drag to spin. Tap to connect.",
    type: "website",
  },
};

// Prevent zoom on mobile double-tap; force portrait on phones
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0A0A0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${geistMono.variable} h-full antialiased`}>
      <body className="h-full bg-black overflow-hidden">{children}</body>
    </html>
  );
}
