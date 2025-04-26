import '../globals.css';
import { cn } from '@/lib/utils';
import { Epilogue, Koulen, Geist_Mono, Pinyon_Script } from "next/font/google";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

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

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className={cn("bg-light text-dark", epilogue.variable, koulen.variable, geistMono.variable, pinyonScript.variable)}>
        <Navbar/>

        <main className="container max-w-3xl px-4 pt-20 md:pt-24 pb-16 prose prose-theme prose-h1:text-3xl prose-h2:mb-2 prose-h3:text-lg prose-h3:mb-2 prose-code:text-xs">
          {children}
        </main>

        <Footer/>
      </body>
    </html>
  )
}