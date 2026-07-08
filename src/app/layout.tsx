import type { Metadata } from "next";
import { Fraunces, Karla, Gochi_Hand, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

const gochiHand = Gochi_Hand({
  variable: "--font-gochi",
  weight: "400",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://athens-creative.com"),
  title: "Athens Creative English — English, taught like an art",
  description:
    "An English studio in Gkyzi, Athens, where children learn English through art, music and play. Private & semi-private seminars, field trips, events and online lessons — for students of all ages.",
  openGraph: {
    title: "Athens Creative English",
    description:
      "Children paint, sing, build and perform their way into English — no textbooks, no drills.",
    locale: "en_GR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${karla.variable} ${gochiHand.variable} ${plexMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
