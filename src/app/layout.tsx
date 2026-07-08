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
  title: {
    default: "Athens Creative English — English lessons for kids through art, music & play in Athens",
    template: "%s — Athens Creative English",
  },
  description:
    "English lessons for children in Gkyzi, Athens — taught through art, music, theatre and play instead of textbooks. Private & semi-private seminars, field trips, events and online lessons. Free trial lesson.",
  keywords: [
    "English lessons for children Athens",
    "English tutor Athens",
    "creative English lessons",
    "μαθήματα αγγλικών για παιδιά Αθήνα",
    "ιδιαίτερα αγγλικά Γκύζη",
    "αγγλικά μέσω τέχνης",
    "English through art and play",
    "kids English classes Gkyzi",
    "ESL children Athens",
    "English school Gkyzi Athens",
  ],
  authors: [{ name: "Athens Creative English", url: "https://athens-creative.com" }],
  creator: "Athens Creative English",
  publisher: "Athens Creative English",
  category: "education",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Athens Creative English — English, taught like an art",
    description:
      "Children paint, sing, build and perform their way into English — no textbooks, no drills. An English studio in Gkyzi, Athens. Free trial lesson.",
    url: "https://athens-creative.com",
    siteName: "Athens Creative English",
    locale: "en_GR",
    alternateLocale: "el_GR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Athens Creative English — English, taught like an art",
    description:
      "Children paint, sing, build and perform their way into English. An English studio in Gkyzi, Athens.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "GR-I",
    "geo.placename": "Gkyzi, Athens, Greece",
    "geo.position": "37.9946;23.7492",
    ICBM: "37.9946, 23.7492",
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
