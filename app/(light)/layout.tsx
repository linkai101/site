import '../globals.css';
import { cn } from '@/lib/utils';
import { Geist, Koulen, Geist_Mono, Pinyon_Script } from "next/font/google";
import Navbar from '@/components/navbar';

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const koulen = Koulen({
  variable: "--font-koulen",
  subsets: ["latin"],
  weight: ["400"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon-script",
  subsets: ["latin"],
  weight: ["400"],
});

export default function LightLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className={cn("bg-light text-dark", geist.variable, koulen.variable, geistMono.variable, pinyonScript.variable)}>
        {children}
        <Navbar/>
      </body>
    </html>
  )
}
