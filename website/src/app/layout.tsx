import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "fastai-stack",
  description: "AI-native FastAPI stack generator. Ship production backends in minutes.",
  metadataBase: new URL("https://fastai-stack.dev"),
  openGraph: {
    title: "fastai-stack",
    description: "Interactive FastAPI stack builder for AI engineers.",
    url: "https://fastai-stack.dev",
    siteName: "fastai-stack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "fastai-stack",
    description: "AI-native FastAPI stack generator.",
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
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}
