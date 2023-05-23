import './globals.css'
import { Montserrat } from 'next/font/google'

const font = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Rentopia',
  description: 'Discover a World of Homes Away from Home',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
