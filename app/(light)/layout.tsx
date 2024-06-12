import '../globals.css';
import Navbar from '@/components/navbar';

export default function LightLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className="bg-light text-dark">
        {children}
        <Navbar/>
      </body>
    </html>
  )
}
