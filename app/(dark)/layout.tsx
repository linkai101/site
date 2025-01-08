import '../globals.css';
import { cn } from '@/lib/utils';
import { Epilogue, Koulen, Geist_Mono, Pinyon_Script } from "next/font/google";
import Navbar from '@/components/navbar';

const epilogue = Epilogue({
  variable: "--font-epilogue",
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

export default function DarkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className={cn("antialiased bg-dark text-light", epilogue.variable, koulen.variable, geistMono.variable, pinyonScript.variable)}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
