import './globals.css'
import { Montserrat } from 'next/font/google'
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import {RegisterModal} from "./components/modals/RegisterModal";
import React from "react";
import {ToasterProvider} from "@/app/providers/ToasterProvider";

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
      <body className={font.className}>
      <ClientOnly>
          <ToasterProvider/>
        <RegisterModal/>
        <Navbar/>
      </ClientOnly>
      {children}
      </body>
    </html>
  )
}
