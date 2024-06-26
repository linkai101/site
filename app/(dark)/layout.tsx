import '../globals.css';
import Navbar from '@/components/navbar';

export default function DarkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className="bg-dark text-light">
        {children}
        <Navbar/>
      </body>
    </html>
  )
}
