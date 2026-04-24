import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Londrina_Solid, Londrina_Outline, Londrina_Shadow, Londrina_Sketch } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Footer } from "@/components/footer";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const londrinaSolid = Londrina_Solid({
  variable: "--font-londrina-solid",
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
});

const londrinaOutline = Londrina_Outline({
  variable: "--font-londrina-outline",
  weight: "400",
  subsets: ["latin"],
});

const londrinaShadow = Londrina_Shadow({
  variable: "--font-londrina-shadow",
  weight: "400",
  subsets: ["latin"],
});

const londrinaSketch = Londrina_Sketch({
  variable: "--font-londrina-sketch",
  weight: "400",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Linkai Wu",
  description: "A student, software engineer, and designer.",
  openGraph: {
    title: "Linkai Wu",
    description: "A student, software engineer, and designer.",
    images: [{ url: "/assets/wallpaper.png" }],
  },
  twitter: {
    card: "summary_large_image",
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
        className={cn(
          bricolageGrotesque.variable, 
          geistMono.variable, 
          londrinaSolid.variable, 
          londrinaOutline.variable,
          londrinaShadow.variable, 
          londrinaSketch.variable, 
          "antialiased"
        )}
      >
        <main className="min-h-screen">
          {children}
        </main>

        <Footer/>
      </body>
    </html>
  );
}
