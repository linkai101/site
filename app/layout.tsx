import type { Metadata } from "next";
import { Geist, Geist_Mono, Epilogue, Londrina_Solid } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const londrinaSolid = Londrina_Solid({
  variable: "--font-londrina-solid",
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linkai Wu",
  description: "A developer, designer, and student fascinated with the intersection of tech, art, and people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${epilogue.variable} ${londrinaSolid.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
